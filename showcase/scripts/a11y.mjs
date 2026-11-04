#!/usr/bin/env node
/* ── showcase accessibility check ───────────────────────────────────────────
   pnpm test:a11y               build, serve dist, check every route
   pnpm test:a11y --no-build    reuse the existing dist
   pnpm test:a11y --review      also list what axe could not decide

   For every path in src/nav.ts it runs axe-core at 1400x900 with the
   wcag2a, wcag2aa, wcag21aa and wcag22aa tags, then reloads the route at
   390px wide and fails if the page scrolls sideways. Uses the system
   Chromium; puppeteer-core never downloads a browser. Exits 1 on any
   violation that ALLOW does not list.                                      */

import { spawn, spawnSync, execFileSync } from "node:child_process";
import { existsSync, readFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import puppeteer from "puppeteer-core";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const axeSource = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

const TAGS = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1400, height: 900 };
const PHONE = { width: 390, height: 844 };

/* Known false positives, as rule + selector pairs. A violation node is
   skipped only when its rule and its full axe target both match. Each
   entry says why the real pair passes. Keep this list short and
   explained; anything not listed fails the run.                          */
const ALLOW = [];

const allowed = (route, rule, target) =>
  ALLOW.some((a) => a.rule === rule && a.selector === target && (!a.route || a.route === route));

/* Routes come from the path strings in nav.ts, so a new page is checked
   as soon as it is registered. */
function routes() {
  const src = readFileSync(join(root, "src/nav.ts"), "utf8");
  return [...src.matchAll(/\bpath:\s*"([^"]+)"/g)].map((m) => m[1]);
}

function chromium() {
  if (process.env.CHROMIUM_PATH) return process.env.CHROMIUM_PATH;
  for (const name of ["chromium-browser", "chromium", "google-chrome"]) {
    const r = spawnSync("sh", ["-c", `command -v ${name}`], { encoding: "utf8" });
    if (r.status === 0 && r.stdout.trim()) return r.stdout.trim();
  }
  throw new Error("No Chromium found. Install chromium-browser or set CHROMIUM_PATH.");
}

function freePort() {
  return new Promise((resolve, reject) => {
    const srv = createServer();
    srv.unref();
    srv.on("error", reject);
    srv.listen(0, "127.0.0.1", () => {
      const { port } = srv.address();
      srv.close(() => resolve(port));
    });
  });
}

async function serve(port) {
  const vite = join(root, "node_modules/.bin/vite");
  const child = spawn(vite, ["preview", "--host", "127.0.0.1", "--port", String(port), "--strictPort"], {
    cwd: root,
    stdio: ["ignore", "pipe", "pipe"],
  });
  let log = "";
  child.stdout.on("data", (d) => (log += d));
  child.stderr.on("data", (d) => (log += d));
  const url = `http://127.0.0.1:${port}`;
  for (let i = 0; i < 100; i++) {
    if (child.exitCode !== null) throw new Error(`vite preview exited:\n${log}`);
    try {
      if ((await fetch(url)).ok) return { url, child };
    } catch {}
    await new Promise((r) => setTimeout(r, 100));
  }
  child.kill();
  throw new Error(`vite preview did not answer on ${url}:\n${log}`);
}

/* Wait for fonts and for every finite animation, so axe reads the page
   after the entrance, not mid-fade. Spinners loop forever and are skipped. */
async function settle(page) {
  await page.evaluate(async () => {
    await document.fonts.ready;
    const finite = document
      .getAnimations()
      .filter((a) => Number.isFinite(a.effect?.getComputedTiming().endTime ?? Infinity));
    await Promise.race([
      Promise.all(finite.map((a) => a.finished.catch(() => {}))),
      new Promise((r) => setTimeout(r, 3000)),
    ]);
  });
}

async function open(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForSelector("main h1", { timeout: 10000 });
  await settle(page);
}

async function runAxe(page) {
  await page.evaluate(axeSource);
  return page.evaluate(
    (tags) =>
      window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations"] }),
    TAGS,
  );
}

/* Horizontal overflow at phone width, with the widest elements that stick
   out past the viewport and are not inside a scroller. */
function overflow(page) {
  return page.evaluate(() => {
    const vw = window.innerWidth;
    const sw = document.documentElement.scrollWidth;
    if (sw <= vw) return null;
    const clipped = (el) => {
      for (let p = el.parentElement; p && p !== document.body; p = p.parentElement) {
        const o = getComputedStyle(p).overflowX;
        if (o !== "visible") return true;
      }
      return false;
    };
    const path = (el) => {
      const parts = [];
      for (let e = el; e && e !== document.body && parts.length < 4; e = e.parentElement) {
        const cls = [...e.classList].slice(0, 2).map((c) => `.${c}`).join("");
        parts.unshift(e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + cls);
      }
      return parts.join(" > ");
    };
    const culprits = [...document.body.querySelectorAll("*")]
      .filter((el) => el.getBoundingClientRect().right > vw + 0.5 && !clipped(el))
      .map((el) => ({ selector: path(el), right: Math.round(el.getBoundingClientRect().right) }))
      .sort((a, b) => b.right - a.right)
      .slice(0, 5);
    return { scrollWidth: sw, innerWidth: vw, culprits };
  });
}

async function main() {
  const skipBuild = process.argv.includes("--no-build");
  const showReview = process.argv.includes("--review");
  if (!skipBuild || !existsSync(join(root, "dist/index.html"))) {
    console.log("Building the showcase...");
    execFileSync("pnpm", ["build"], { cwd: root, stdio: "inherit" });
  }

  const port = await freePort();
  const { url, child } = await serve(port);
  const browser = await puppeteer.launch({
    executablePath: chromium(),
    headless: true,
    args: ["--no-sandbox", "--disable-gpu"],
  });

  let failures = 0;
  let skipped = 0;
  const review = new Map();
  try {
    const page = await browser.newPage();
    for (const route of routes()) {
      const lines = [];
      const notes = [];

      await page.setViewport(DESKTOP);
      await open(page, url + route);
      const { violations, incomplete } = await runAxe(page);
      for (const v of incomplete) {
        review.set(v.id, (review.get(v.id) ?? 0) + v.nodes.length);
        if (showReview)
          for (const nd of v.nodes)
            notes.push(`  review ${v.id}: ${nd.target.join(" ")}\n    ${[...nd.any, ...nd.all, ...nd.none][0]?.message ?? ""}`);
      }
      for (const v of violations) {
        const nodes = v.nodes.filter((n) => {
          const target = n.target.join(" ");
          if (allowed(route, v.id, target)) return skipped++, false;
          return true;
        });
        if (!nodes.length) continue;
        failures += nodes.length;
        lines.push(`  ${v.id} (${v.impact}) ${v.help}`);
        for (const n of nodes.slice(0, 8)) {
          lines.push(`    ${n.target.join(" ")}`);
          const why = n.failureSummary?.split("\n").slice(1, 2).join(" ").trim();
          if (why) lines.push(`      ${why}`);
        }
        if (nodes.length > 8) lines.push(`    and ${nodes.length - 8} more`);
      }

      await page.setViewport(PHONE);
      await open(page, url + route);
      const o = await overflow(page);
      if (o) {
        failures++;
        lines.push(`  overflow at ${o.innerWidth}px: scrollWidth ${o.scrollWidth}`);
        for (const c of o.culprits) lines.push(`    ${c.selector} reaches ${c.right}px`);
      }

      console.log(`${lines.length ? "FAIL" : "ok  "} ${route}`);
      for (const l of [...lines, ...notes]) console.log(l);
    }
  } finally {
    await browser.close();
    child.kill();
  }

  const count = routes().length;
  const note = skipped ? `, ${skipped} allowlisted` : "";
  /* axe marks what it cannot decide, such as text over a gradient or a
     pseudo-element, as needing review. Those never fail the run. */
  if (review.size) {
    const list = [...review].map(([id, n]) => `${id} ${n}`).join(", ");
    console.log(`\naxe could not decide, not counted: ${list}.`);
  }
  if (failures) {
    console.log(`\n${failures} problem(s) across ${count} routes${note}.`);
    process.exit(1);
  }
  console.log(`\nAll ${count} routes pass axe (${TAGS.join(", ")}) and fit 390px${note}.`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
