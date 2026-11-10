#!/usr/bin/env node
/* ── showcase accessibility check ───────────────────────────────────────────
   pnpm test:a11y               build, serve dist, check every route
   pnpm test:a11y --no-build    reuse the existing dist
   pnpm test:a11y --review      also list what axe could not decide
   pnpm test:a11y --update-shots  rewrite the visual baselines
   pnpm test:a11y --motion      only the motion check

   For every path in src/nav.ts it runs axe-core at 1400x900 with the
   wcag2a, wcag2aa, wcag21aa and wcag22aa tags. It then applies the WCAG
   1.4.12 text-spacing overrides and fails on any element that clips its
   text, reloads the route under forced colors, saves a full-page
   screenshot to a11y-shots/forced-colors/ for review and checks that a
   focused control rings in Highlight. It reloads under prefers-contrast:
   more and runs axe again, then under prefers-reduced-motion: reduce and
   fails on any transition or animation longer than 1ms, apart from the
   overlay fades and spinners the SPEC keeps. It reloads at 700px wide,
   which is the 1400px desktop at 200% zoom (WCAG 1.4.4), and fails on
   sideways scroll or clipped text, then at 390px and at 320px (WCAG
   1.4.10 reflow) and fails on sideways scroll. axe covers the WCAG 2.5.8
   target size through the wcag22aa tag.

   In the desktop pass it also captures the depth-sensitive routes (VISUAL)
   full page at 1400x900 and 1x in the default modes, and diffs each
   capture against its baseline in visual-baselines/ with pixelmatch. A
   route fails when its size changes or more than VISUAL_LIMIT of its
   pixels differ; the diff image goes to a11y-shots/visual/. The
   baselines depend on the system Chromium and its installed fonts, so
   refresh them with --update-shots after a deliberate visual change or
   on a new machine, and look at them before committing.

   In the desktop pass it also checks the composition rules the SPEC
   states: no parent holds more than three raised panels as direct
   children, outside the docs' demo stages, and an example view holds at
   most one primary, one tilted panel and one lead panel.

   Before the routes it checks motion in the default modes, from
   getAnimations() and not from frames: the .page-enter children of
   /examples/dashboard and of the /modal docs page stagger 0 to 200ms in
   40ms steps over --t-slow, and a modal and a toast enter over --t-base
   and leave over --t-exit.
   --motion runs that check alone.

   Uses the system Chromium; puppeteer-core never downloads a browser.
   Exits 1 on any violation that ALLOW does not list.                       */

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
const ZOOM = { width: 700, height: 900 };
const PHONE = { width: 390, height: 844 };
const NARROW = { width: 320, height: 640 };

/* Routes whose look rests on 1x depth cues: the foot, the plates, the
   hairline ladder. Their default-mode captures are diffed against
   baselines. VISUAL_THRESHOLD is pixelmatch's per-pixel color tolerance;
   VISUAL_LIMIT is the share of pixels that may differ before a route
   fails, enough for antialiasing noise and no more. */
const VISUAL = ["/depth", "/examples/dashboard", "/examples/invoice"];
const VISUAL_THRESHOLD = 0.1;
const VISUAL_LIMIT = 0.001;
const shotName = (route) => (route === "/" ? "index" : route.replace(/^\//, "").replace(/[^\w-]+/g, "-"));

/* Compares a capture with its baseline, or writes the baseline when
   updating. Returns a problem string or null. */
function visualDiff(route, png, baselines, diffs, update) {
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

/* WCAG 1.4.12: text must survive these overrides without loss. */
const TEXT_SPACING = `
  * { line-height: 1.5 !important; letter-spacing: .12em !important; word-spacing: .16em !important; }
  p { margin-bottom: 2em !important; }
`;

/* Elements that clip their text under the text-spacing overrides: an
   overflow of hidden or clip, visible, holding text of its own, and
   scrolling past its box. Clipping by design is skipped: the screen-reader
   clip, accordion folds, aria-hidden content and .cn-truncate, which ends a
   line in an ellipsis on purpose. */
function clippedText(page) {
  return page.evaluate(() => {
    const skip = (el) => el.closest(".cn-sr-only, .fold, [aria-hidden='true'], .cn-truncate");
    const path = (el) => {
      const parts = [];
      for (let e = el; e && e !== document.body && parts.length < 4; e = e.parentElement) {
        const cls = [...e.classList].slice(0, 2).map((c) => `.${c}`).join("");
        parts.unshift(e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + cls);
      }
      return parts.join(" > ");
    };
    const out = [];
    for (const el of document.body.querySelectorAll("*")) {
      const cs = getComputedStyle(el);
      const clipX = /hidden|clip/.test(cs.overflowX), clipY = /hidden|clip/.test(cs.overflowY);
      if (!clipX && !clipY) continue;
      if (!el.checkVisibility?.() || !el.clientWidth || !el.clientHeight || skip(el)) continue;
      if (!el.textContent.trim()) continue;
      const over = (clipX && el.scrollWidth > el.clientWidth + 1) || (clipY && el.scrollHeight > el.clientHeight + 1);
      if (over) out.push(`${path(el)} (${el.scrollWidth}x${el.scrollHeight} in ${el.clientWidth}x${el.clientHeight})`);
    }
    return out.slice(0, 8);
  });
}

/* Under reduced motion every transition and animation lands at once.
   The SPEC keeps three exceptions: overlays fade in place over --t-fast,
   and a spinner or a busy button's spinner keeps turning. Returns the
   elements that still move, with their longest duration. */
function motionLeft(page) {
  return page.evaluate(() => {
    const ms = (list) => Math.max(0, ...list.split(",").map((v) => (v.trim().endsWith("ms") ? parseFloat(v) : parseFloat(v) * 1000)));
    const keepsFade = (el, pseudo) =>
      (!pseudo && el.matches(".popover, .toast, dialog.modal, dialog.drawer")) || (pseudo === "::after" && el.matches("[data-tip]"));
    const keepsSpin = (el, pseudo) => (!pseudo && el.matches(".spinner")) || (pseudo === "::after" && el.matches('.btn[aria-busy="true"]'));
    const path = (el) => {
      const parts = [];
      for (let e = el; e && e !== document.body && parts.length < 4; e = e.parentElement) {
        const cls = [...e.classList].slice(0, 2).map((c) => `.${c}`).join("");
        parts.unshift(e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + cls);
      }
      return parts.join(" > ");
    };
    const out = [];
    for (const el of document.body.querySelectorAll("*")) {
      for (const pseudo of [null, "::before", "::after"]) {
        const cs = getComputedStyle(el, pseudo);
        if (pseudo && cs.content === "none") continue;
        const t = ms(cs.transitionDuration) + ms(cs.transitionDelay);
        const a = cs.animationName === "none" ? 0 : ms(cs.animationDuration) + ms(cs.animationDelay);
        const longest = Math.max(keepsFade(el, pseudo) ? 0 : t, keepsSpin(el, pseudo) ? 0 : a);
        if (longest > 1) out.push(`${path(el)}${pseudo ?? ""} (${longest}ms)`);
      }
    }
    return out.slice(0, 8);
  });
}

/* Composition rules from the SPEC. A region holds at most three raised
   panels: no element may hold more than three .panel children that sit on
   the page, not in another panel or a docs demo stage. An example view
   models the ornament budget: one primary, one tilted panel and one lead
   panel at most. */
function composition(page, isExample) {
  return page.evaluate((isExample) => {
    const path = (el) => {
      const parts = [];
      for (let e = el; e && e !== document.body && parts.length < 4; e = e.parentElement) {
        const cls = [...e.classList].slice(0, 2).map((c) => `.${c}`).join("");
        parts.unshift(e.tagName.toLowerCase() + (e.id ? `#${e.id}` : "") + cls);
      }
      return parts.join(" > ");
    };
    const out = [];
    const parents = new Map();
    for (const p of document.querySelectorAll("main .panel")) {
      if (p.parentElement.closest(".panel, .sc-demo-stage")) continue;
      parents.set(p.parentElement, (parents.get(p.parentElement) ?? 0) + 1);
    }
    for (const [parent, n] of parents) if (n > 3) out.push(`${path(parent)} holds ${n} raised panels, over 3`);
    if (isExample) {
      for (const [sel, what] of [[".btn-primary", "primaries"], [".panel.is-tilted", "tilted panels"], [".panel.is-lead", "lead panels"]]) {
        const n = document.querySelectorAll(`main ${sel}`).length;
        if (n > 1) out.push(`${n} ${what}, over 1`);
      }
    }
    return out;
  }, isExample);
}

/* Under forced colors the focus ring must be Highlight. Tab to the first
   focusable control and compare its outline with a Highlight probe. */
function focusRing(page) {
  return page.evaluate(() => {
    const el = document.activeElement;
    if (!el || el === document.body) return null;
    const probe = document.createElement("div");
    probe.style.color = "Highlight";
    document.body.append(probe);
    const want = getComputedStyle(probe).color;
    probe.remove();
    const got = getComputedStyle(el).outlineColor;
    return got === want ? null : `focus ring is ${got}, not Highlight (${want})`;
  });
}

/* Motion in the default modes, read from the animations the browser is
   running, never from frames. The .page-enter children of the dashboard
   example, which has four, and of the Modal docs page, which has more
   than six, must stagger 0, 40, 80, 120, 160 and then 200ms over
   --t-slow. A modal and a toast must enter over --t-base and leave over
   --t-exit. An observer installed
   before the page's own script reads the entrance in the task that renders
   it, so a slow machine cannot miss it. Returns a list of problems. */
async function motion(browser, url) {
  const out = [];
  const page = await browser.newPage();
  await page.setViewport(DESKTOP);
  try {
    await page.evaluateOnNewDocument(() => {
      new MutationObserver((_, mo) => {
        const host = document.querySelector(".page-enter");
        if (!host) return;
        mo.disconnect();
        window.__cnEnter = [...host.children].map((c) => {
          const a = c.getAnimations().find((x) => x.animationName === "enter");
          return a ? { delay: a.effect.getTiming().delay, duration: a.effect.getTiming().duration } : null;
        });
      }).observe(document, { childList: true, subtree: true });
    });
    const token = (name) =>
      page.evaluate((n) => {
        const v = getComputedStyle(document.documentElement).getPropertyValue(n).trim();
        return v.endsWith("ms") ? parseFloat(v) : parseFloat(v) * 1000;
      }, name);
    const near = (a, b) => Math.abs(a - b) < 0.5;

    /* Every .page-enter child the route rendered, against the stagger. */
    const STAGGER = [0, 40, 80, 120, 160, 200];
    const entrance = async (route, atLeast) => {
      await page.waitForFunction(() => window.__cnEnter, { timeout: 10000 });
      const enter = await page.evaluate(() => window.__cnEnter);
      if (enter.length < atLeast) out.push(`${route}: .page-enter has ${enter.length} children, and the check needs ${atLeast}`);
      enter.forEach((a, i) => {
        const want = STAGGER[Math.min(i, STAGGER.length - 1)];
        if (!a) out.push(`${route}: .page-enter child ${i + 1} runs no enter animation`);
        else if (!near(a.delay, want) || !near(a.duration, slow))
          out.push(`${route}: .page-enter child ${i + 1} enters after ${a.delay}ms over ${a.duration}ms, not ${want}ms over --t-slow (${slow}ms)`);
      });
    };

    await page.goto(url + "/examples/dashboard", { waitUntil: "load" });
    await page.waitForSelector("main h1", { timeout: 10000 });
    const [slow, base, exit] = [await token("--t-slow"), await token("--t-base"), await token("--t-exit")];
    await entrance("/examples/dashboard", 4);

    /* Opens and closes one overlay and returns its transitions at each
       end: [property, duration] pairs read as the state changes. */
    const read = (el) => el.getAnimations().filter((a) => a.transitionProperty).map((a) => [a.transitionProperty, a.effect.getTiming().duration]);
    const check = (route, what, when, list, want, name) => {
      if (!list.length) out.push(`${route}: ${what} runs no transition on ${when}`);
      for (const [prop, ms] of list) if (!near(ms, want)) out.push(`${route}: ${what} ${when} moves ${prop} over ${ms}ms, not ${name} (${want}ms)`);
    };

    /* A docs page has more than six children, so it reaches the last step. */
    await open(page, url + "/modal");
    await entrance("/modal", STAGGER.length);
    const modal = await page.evaluate(`(async () => {
      const read = ${read};
      const dialog = document.querySelector("main dialog.modal");
      dialog.previousElementSibling.click();
      const entry = read(dialog);
      await Promise.all(dialog.getAnimations().map((a) => a.finished.catch(() => {})));
      dialog.querySelector("footer .btn-ghost").click();
      return { entry, leave: read(dialog) };
    })()`);
    check("/modal", "the modal", "entry", modal.entry, base, "--t-base");
    check("/modal", "the modal", "close", modal.leave, exit, "--t-exit");

    await open(page, url + "/toast");
    const toast = await page.evaluate(`(async () => {
      const read = ${read};
      const stack = document.querySelector("main .toast-stack");
      /* Preact renders after the click, so wait for the change itself. */
      const changed = (options) => new Promise((resolve) => {
        new MutationObserver((_, mo) => { mo.disconnect(); resolve(); }).observe(stack, options);
        setTimeout(resolve, 2000);
      });
      const landed = changed({ childList: true });
      stack.previousElementSibling.click();
      await landed;
      const el = stack.querySelector(".toast");
      if (!el) return { entry: [], leave: [] };
      const entry = read(el);
      await Promise.all(el.getAnimations().map((a) => a.finished.catch(() => {})));
      const left = changed({ attributes: true, subtree: true, attributeFilter: ["hidden"] });
      el.querySelector("button").click();
      await left;
      return { entry, leave: read(el) };
    })()`);
    check("/toast", "the toast", "entry", toast.entry, base, "--t-base");
    check("/toast", "the toast", "close", toast.leave, exit, "--t-exit");
  } finally {
    await page.close();
  }
  return out;
}

async function main() {
  const skipBuild = process.argv.includes("--no-build");
  const showReview = process.argv.includes("--review");
  const updateShots = process.argv.includes("--update-shots");
  const onlyMotion = process.argv.includes("--motion");
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

  const shots = join(root, "a11y-shots/forced-colors");
  const baselines = join(root, "visual-baselines");
  const diffs = join(root, "a11y-shots/visual");
  let failures = 0;
  let skipped = 0;
  const review = new Map();
  try {
    const moved = await motion(browser, url);
    failures += moved.length;
    console.log(`${moved.length ? "FAIL" : "ok  "} motion`);
    for (const m of moved) console.log(`  ${m}`);

    const page = await browser.newPage();
    for (const route of onlyMotion ? [] : routes()) {
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
      /* Counts each violation node that ALLOW does not list. */
      const report = (found, mode = "") => {
        for (const v of found) {
          const nodes = v.nodes.filter((n) => {
            const target = n.target.join(" ");
            if (allowed(route, v.id, target)) return skipped++, false;
            return true;
          });
          if (!nodes.length) continue;
          failures += nodes.length;
          lines.push(`  ${mode}${v.id} (${v.impact}) ${v.help}`);
          for (const n of nodes.slice(0, 8)) {
            lines.push(`    ${n.target.join(" ")}`);
            const why = n.failureSummary?.split("\n").slice(1, 2).join(" ").trim();
            if (why) lines.push(`      ${why}`);
          }
          if (nodes.length > 8) lines.push(`    and ${nodes.length - 8} more`);
        }
      };
      report(violations);

      if (VISUAL.includes(route)) {
        const png = await page.screenshot({ fullPage: true });
        const problem = visualDiff(route, png, baselines, diffs, updateShots);
        if (problem) {
          failures++;
          lines.push(`  visual: ${problem}`);
        }
      }

      const composed = await composition(page, route.startsWith("/examples/"));
      if (composed.length) {
        failures += composed.length;
        lines.push(`  composition:`);
        for (const c of composed) lines.push(`    ${c}`);
      }

      await page.addStyleTag({ content: TEXT_SPACING });
      await new Promise((r) => setTimeout(r, 50));
      const clipped = await clippedText(page);
      if (clipped.length) {
        failures += clipped.length;
        lines.push(`  text spacing (1.4.12) clips text:`);
        for (const c of clipped) lines.push(`    ${c}`);
      }

      await page.emulateMediaFeatures([{ name: "forced-colors", value: "active" }]);
      await open(page, url + route);
      mkdirSync(shots, { recursive: true });
      await page.screenshot({ path: join(shots, `${shotName(route)}.png`), fullPage: true });
      await page.keyboard.press("Tab");
      const ring = await focusRing(page);
      if (ring) {
        failures++;
        lines.push(`  forced colors: ${ring}`);
      }
      await page.emulateMediaFeatures([{ name: "prefers-contrast", value: "more" }]);
      await open(page, url + route);
      report((await runAxe(page)).violations, "prefers-contrast: more: ");

      await page.emulateMediaFeatures([{ name: "prefers-reduced-motion", value: "reduce" }]);
      await open(page, url + route);
      const moving = await motionLeft(page);
      if (moving.length) {
        failures += moving.length;
        lines.push(`  reduced motion still moves:`);
        for (const m of moving) lines.push(`    ${m}`);
      }
      await page.emulateMediaFeatures([]);

      for (const [viewport, clips] of [[ZOOM, true], [PHONE, false], [NARROW, false]]) {
        await page.setViewport(viewport);
        await open(page, url + route);
        const o = await overflow(page);
        if (o) {
          failures++;
          lines.push(`  overflow at ${o.innerWidth}px: scrollWidth ${o.scrollWidth}`);
          for (const c of o.culprits) lines.push(`    ${c.selector} reaches ${c.right}px`);
        }
        const cut = clips ? await clippedText(page) : [];
        if (cut.length) {
          failures += cut.length;
          lines.push(`  clipped text at ${viewport.width}px:`);
          for (const c of cut) lines.push(`    ${c}`);
        }
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
  if (onlyMotion) return;
  console.log(`\nThe page entrance, the modal and the toast run on their duration tokens. All ${count} routes pass axe (${TAGS.join(", ")}) by default and under prefers-contrast: more, keep their text under 1.4.12 spacing, ring in Highlight under forced colors, land at once under reduced motion, fit 700px (200% zoom) without clipping, fit 390px and 320px, keep the composition budget${note}, and ${updateShots ? "wrote new visual baselines" : "match the visual baselines"} for ${VISUAL.join(", ")}.`);
  console.log(`Forced-colors screenshots for review: ${shots}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
