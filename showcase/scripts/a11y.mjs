#!/usr/bin/env node
/* pnpm test                  build, serve dist, check every route in src/nav.ts
   pnpm test --no-build       reuse the existing dist
   pnpm test --update-shots   rewrite the visual baselines

   Each route runs axe-core at 1400x900, runs it again under
   prefers-contrast: more, and must not scroll sideways at 700px or 320px.
   The VISUAL routes are also diffed against visual-baselines/. The
   baselines depend on the system Chromium and its fonts, so look at them
   before committing a refresh. puppeteer-core never downloads a browser. */

import { spawn, spawnSync, execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { createRequire } from "node:module";
import { createServer } from "node:net";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";
import puppeteer from "puppeteer-core";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const axeSource = readFileSync(createRequire(import.meta.url).resolve("axe-core/axe.min.js"), "utf8");

const TAGS = ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"];
const DESKTOP = { width: 1400, height: 900 };
/* 700px is the desktop at 200% zoom, and 320px is the reflow width. They
   sit on different sides of the layout breakpoints. */
const NARROW = [{ width: 700, height: 900 }, { width: 320, height: 640 }];

/* Routes that show every shadow, plate, hairline and carve. VISUAL_LIMIT is
   the share of pixels that may differ, enough for antialiasing noise. */
const VISUAL = ["/depth", "/examples/dashboard"];
const VISUAL_THRESHOLD = 0.1;
const VISUAL_LIMIT = 0.001;
const baselines = join(root, "visual-baselines");
const diffs = join(root, "a11y-shots");
const shotName = (route) => route.replace(/^\//, "").replace(/[^\w-]+/g, "-");

/* Compares a capture with its baseline, or writes the baseline when
   updating. Returns a problem string or null. */
function visualDiff(route, png, update) {
  const file = join(baselines, `${shotName(route)}.png`);
  if (update) {
    mkdirSync(baselines, { recursive: true });
    writeFileSync(file, png);
    return null;
  }
  if (!existsSync(file)) return `no baseline at ${file}; run with --update-shots`;
  const [want, got] = [PNG.sync.read(readFileSync(file)), PNG.sync.read(Buffer.from(png))];
  if (want.width !== got.width || want.height !== got.height)
    return `size ${got.width}x${got.height} differs from the baseline's ${want.width}x${want.height}`;
  const diff = new PNG({ width: got.width, height: got.height });
  const n = pixelmatch(want.data, got.data, diff.data, got.width, got.height, { threshold: VISUAL_THRESHOLD });
  const share = n / (got.width * got.height);
  if (share <= VISUAL_LIMIT) return null;
  mkdirSync(diffs, { recursive: true });
  const out = join(diffs, `${shotName(route)}-diff.png`);
  writeFileSync(out, PNG.sync.write(diff));
  writeFileSync(join(diffs, `${shotName(route)}.png`), png);
  return `${n} pixels (${(share * 100).toFixed(2)}%) differ from the baseline, over ${VISUAL_LIMIT * 100}%; see ${out}`;
}

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

/* Wait for fonts and every finite animation, so axe and the capture see
   the page after its entrance. Spinners loop forever and are skipped. */
async function open(page, url) {
  await page.goto(url, { waitUntil: "load" });
  await page.waitForSelector("main h1", { timeout: 10000 });
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

/* Runs axe and returns one line per violation and per failing node. */
async function axe(page, mode = "") {
  await page.evaluate(axeSource);
  const { violations } = await page.evaluate(
    (tags) => window.axe.run(document, { runOnly: { type: "tag", values: tags }, resultTypes: ["violations"] }),
    TAGS,
  );
  return violations.flatMap((v) => [
    `  ${mode}${v.id} (${v.impact}) ${v.help}`,
    ...v.nodes.slice(0, 8).map((n) => `    ${n.target.join(" ")}`),
    ...(v.nodes.length > 8 ? [`    and ${v.nodes.length - 8} more`] : []),
  ]);
}

/* Every problem on one route, as printable lines. */
async function check(page, url, route, update) {
  await page.emulateMediaFeatures([]);
  await page.setViewport(DESKTOP);
  await open(page, url + route);
  const lines = await axe(page);
  if (VISUAL.includes(route)) {
    const problem = visualDiff(route, await page.screenshot({ fullPage: true }), update);
    if (problem) lines.push(`  visual: ${problem}`);
  }

  await page.emulateMediaFeatures([{ name: "prefers-contrast", value: "more" }]);
  await open(page, url + route);
  lines.push(...(await axe(page, "prefers-contrast: more: ")));
  await page.emulateMediaFeatures([]);

  for (const viewport of NARROW) {
    await page.setViewport(viewport);
    await open(page, url + route);
    const wide = await page.evaluate(() => document.documentElement.scrollWidth);
    if (wide > viewport.width) lines.push(`  overflow at ${viewport.width}px: scrollWidth ${wide}`);
  }
  return lines;
}

async function main() {
  const update = process.argv.includes("--update-shots");
  if (!process.argv.includes("--no-build") || !existsSync(join(root, "dist/index.html"))) {
    console.log("Building the showcase...");
    execFileSync("pnpm", ["build"], { cwd: root, stdio: "inherit" });
  }

  const { url, child } = await serve(await freePort());
  const launch = () => puppeteer.launch({ executablePath: chromium(), headless: true, args: ["--no-sandbox", "--disable-gpu"] });
  let browser = await launch();
  let page = await browser.newPage();
  const all = routes();
  let failed = VISUAL.filter((r) => !all.includes(r)).length;
  for (const r of VISUAL) if (!all.includes(r)) console.log(`FAIL ${r}\n  visual: not a route in src/nav.ts`);
  try {
    for (const route of all) {
      let lines;
      for (let attempt = 1; !lines; attempt++) {
        try {
          lines = await check(page, url, route, update);
        } catch (err) {
          /* Chromium can crash on a low-memory machine. Try once more in a fresh browser. */
          if (attempt === 2) throw err;
          console.log(`retry ${route}: ${err.message}`);
          await browser.close().catch(() => {});
          browser = await launch();
          page = await browser.newPage();
        }
      }
      if (lines.length) failed++;
      console.log(`${lines.length ? "FAIL" : "ok  "} ${route}`);
      for (const l of lines) console.log(l);
    }
  } finally {
    await browser.close().catch(() => {});
    child.kill();
  }

  if (failed) {
    console.log(`\n${failed} of ${all.length} routes fail.`);
    process.exit(1);
  }
  console.log(`\n${all.length} routes pass.${update ? ` Wrote the baselines for ${VISUAL.join(", ")}.` : ""}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
