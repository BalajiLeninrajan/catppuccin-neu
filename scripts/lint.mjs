#!/usr/bin/env node
/* node scripts/lint.mjs   (or: pnpm lint)
   Checks the shipped CSS. Exits 1 on any failure. */

import { readFile } from "node:fs/promises";
import { dirname, join, relative } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const stripComments = (css) => css.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, " "));
const lineOf = (css, index) => css.slice(0, index).split("\n").length;

/* A custom property that reads itself is cyclic and invalid at computed
   time, which silently drops every declaration that uses it. */
function selfReference(css) {
  const out = [];
  for (const m of css.matchAll(/(--[\w-]+)\s*:([^;{}]*)/g)) {
    const [, name, value] = m;
    if (new RegExp(`var\\(\\s*${name}\\s*[,)]`).test(value)) {
      out.push({ line: lineOf(css, m.index), message: `${name} references itself` });
    }
  }
  return out;
}

/* Declarations of the given properties, as { prop, value, line }. */
function declarations(css, props) {
  const re = new RegExp(`(?:^|[;{\\s])(${props.source})\\s*:([^;{}]*)`, "g");
  return [...css.matchAll(re)].map((m) => ({ prop: m[1], value: m[2].trim(), line: lineOf(css, m.index + 1) }));
}

/* Drop custom property names so digits in them don't count. */
const withoutVars = (value) => value.replace(/--[\w-]+/g, "");

/* Transitions read the --t-* tokens. The reduced-motion kill switch
   (.01ms) is the one literal allowed. */
const ZERO_DURATIONS = new Set(["0s", "0ms", ".01ms"]);
function rawTransitionDuration(css) {
  const out = [];
  for (const { prop, value, line } of declarations(css, /transition(?:-duration|-delay)?/)) {
    const raw = (withoutVars(value).match(/(?<![\w.-])-?\d*\.?\d+m?s\b/g) || []).filter((d) => !ZERO_DURATIONS.has(d));
    if (raw.length) out.push({ line, message: `${prop} uses raw ${raw.join(", ")}; use a --t-* token` });
  }
  return out;
}

/* Gap, padding and margin read --space-* or a density knob. 0 and 1px are
   the only raw lengths. */
const SPACING_PX_OK = new Set(["0px", "1px", "-1px"]);
function rawSpacing(css) {
  const out = [];
  for (const { prop, value, line } of declarations(css, /(?:row-|column-)?gap|padding(?:-[a-z-]+)?|margin(?:-[a-z-]+)?/)) {
    const raw = (withoutVars(value).match(/-?\d*\.?\d+px\b/g) || []).filter((v) => !SPACING_PX_OK.has(v));
    if (raw.length) out.push({ line, message: `${prop} uses raw ${raw.join(", ")}; use a --space-* token` });
  }
  return out;
}

/* Focus is never removed. A field that draws its own ring makes the
   outline transparent, so forced-colors mode still paints it. */
function outlineRemoved(css) {
  return declarations(css, /outline(?:-style)?/)
    .filter(({ value }) => /^(none|0)\b/.test(value))
    .map(({ line, prop, value }) => ({ line, message: `${prop}: ${value} removes focus; use a transparent outline` }));
}

/* prefers-contrast re-keys the --cn-fg-* roles. A palette text stop in a
   recipe's color skips that. */
const TEXT_STOPS = /var\(\s*--(text|subtext-[01]|overlay-[012])\s*\)/;
function paletteText(css) {
  return declarations(css, /color/)
    .filter(({ value }) => TEXT_STOPS.test(value))
    .map(({ line, value }) => ({ line, message: `color: ${value} names a palette stop; use a --cn-fg-* role` }));
}

const CHECKS = {
  "css/tokens.css": [selfReference, rawTransitionDuration, outlineRemoved],
  "css/utilities.css": [selfReference, rawTransitionDuration, rawSpacing, outlineRemoved],
  "css/recipes.css": [selfReference, rawTransitionDuration, rawSpacing, outlineRemoved, paletteText],
};

/* Contrast, computed from the :root tokens in tokens.css. Resolves hexes,
   var() and color-mix(in srgb), then checks each PAIRS row with the default
   tokens and with the prefers-contrast: more tokens. */
const GROUNDS = ["--cn-surface-page", "--cn-surface-raised", "--cn-surface-overlay"];
const TEXT_GROUNDS = [...GROUNDS, "--cn-surface-sunken"];
const STATUS = ["--cn-danger", "--cn-warning", "--cn-success", "--cn-info"];
const ROW_HOVER = "color-mix(in srgb, var(--cn-interactive) 16%, var(--base))";
const fill = (role, pct) => `color-mix(in srgb, var(${role}) ${pct}%, transparent)`;

/* [foreground, grounds, floor, what, mode]. A foreground or ground is a
   token name or a color expression. @name is the color of the one-layer
   shadow token --cn-name. A ground written as a list is layered, top first.
   A row with a mode runs in that mode only. */
const PAIRS = [
  ["--cn-fg", TEXT_GROUNDS, 7, "headings and values"],
  ["--cn-fg-body", TEXT_GROUNDS, 7, "running text, ledes and cells"],
  ["--cn-fg-muted", TEXT_GROUNDS, 5.5, "meta and help text"],
  ["--cn-fg-placeholder", TEXT_GROUNDS, 4.5, "placeholders"],
  ["--cn-fg-body", ["--wash", ROW_HOVER], 4.5, "body text on an engaged or hovered row"],
  ["--cn-fg-muted", ["--wash", ROW_HOVER], 4.5, "muted text on an engaged or hovered row"],
  ["--cn-interactive", [...GROUNDS, "--wash"], 4.5, "links and mauve text"],
  ["--cn-fg-on-accent", ["--cn-interactive", "--cn-interactive-hover"], 4.5, "text on the primary"],
  ...STATUS.map((s) => [s, GROUNDS, 4.5, "status text"]),
  ...STATUS.map((s) => [s, GROUNDS.flatMap((g) => [[fill(s, 4), g], [fill(s, 12), g]]), 4.5, "status text on its own tint and wash"]),
  ["--cn-focus", GROUNDS, 3, "the focus ring"],
  ["--control-edge", GROUNDS, 3, "control edges, the slider thumb and a hovered field's ring"],
  ["--engaged-edge", [...GROUNDS, "--wash"], 3, "the engaged rim"],
  ["@field-ring", GROUNDS, 3, "a resting field's ring", "prefers-contrast"],
];

function customProps(body, into = new Map()) {
  for (const m of body.matchAll(/(--[\w-]+)\s*:([^;{}]*);/g)) into.set(m[1], m[2].trim());
  return into;
}

/* Top-level comma parts of a value. */
function splitTop(s) {
  const parts = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++; if (ch === ")") depth--;
    if (ch === "," && !depth) { parts.push(cur.trim()); cur = ""; } else cur += ch;
  }
  return [...parts, cur.trim()];
}

/* A color expression as [r, g, b, alpha], or null when it cannot resolve. */
function resolver(map) {
  const raw = (v, seen = new Set()) => {
    const m = v.trim().match(/^var\(\s*(--[\w-]+)\s*(?:,(.*))?\)$/s);
    if (!m) return v.trim();
    const next = seen.has(m[1]) ? null : map.get(m[1]) ?? m[2];
    return next == null ? null : raw(next, new Set([...seen, m[1]]));
  };
  const color = (v) => {
    const r = raw(v);
    if (!r) return null;
    if (/^#[0-9a-f]{6}$/i.test(r)) return [1, 3, 5].map((i) => parseInt(r.slice(i, i + 2), 16)).concat(1);
    if (r === "transparent") return [0, 0, 0, 0];
    const mix = r.match(/^color-mix\(\s*in srgb\s*,(.*)\)$/s);
    if (!mix) return null;
    const [a, b] = splitTop(mix[1]).map((part) => {
      const pm = part.match(/^(.*?)\s+(var\([^)]*\)|[\d.]+%)$/s);
      const pct = pm && raw(pm[2])?.match(/^([\d.]+)%$/);
      return { c: color(pm ? pm[1] : part), p: pct ? +pct[1] / 100 : null };
    });
    if (!a?.c || !b?.c) return null;
    const p = a.p ?? (b.p == null ? .5 : 1 - b.p);
    const alpha = a.c[3] * p + b.c[3] * (1 - p);
    if (!alpha) return [0, 0, 0, 0];
    return [0, 1, 2].map((i) => (a.c[i] * a.c[3] * p + b.c[i] * b.c[3] * (1 - p)) / alpha).concat(alpha);
  };
  return color;
}

const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1);
const lum = (c) => c.slice(0, 3).reduce((sum, v, i) => {
  v /= 255; v = v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
  return sum + v * [.2126, .7152, .0722][i];
}, 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };

async function contrast() {
  const css = stripComments(await readFile(join(root, "css/tokens.css"), "utf8"));
  const base = new Map();
  for (const m of css.matchAll(/^:root\s*\{([^}]*)\}/gm)) customProps(m[1], base);
  const more = new Map(base);
  for (const m of css.matchAll(/@media\s*\(prefers-contrast:\s*more\)\s*\{\s*:root\s*\{([^}]*)\}/g)) customProps(m[1], more);
  if (more.size === base.size && [...more].every(([k, v]) => base.get(k) === v))
    return [`no @media (prefers-contrast: more) { :root { ... } } block found`];

  const out = [];
  for (const [mode, map] of [["default", base], ["prefers-contrast", more]]) {
    const color = resolver(map);
    const expr = (name) => (name.startsWith("--") ? `var(${name})` : name);
    /* The color of a one-layer shadow: drop inset and the lengths. */
    const fgOf = (name) => name.startsWith("@")
      ? color((map.get(`--cn-${name.slice(1)}`) || "").replace(/^inset\s+/, "").replace(/^(?:-?[\d.]+(?:px)?\s+)+/, ""))
      : color(expr(name));
    const page = color("var(--cn-surface-page)");
    const ground = (layers) => [layers].flat().reduceRight((bg, l) => { const c = color(expr(l)); return c && bg && over(c, bg); }, page);
    for (const [fgName, grounds, floor, what, only] of PAIRS) {
      if (only && only !== mode) continue;
      const fg = fgOf(fgName);
      for (const g of grounds) {
        const bg = ground(g), label = [g].flat().join(" over ");
        if (!fg || !bg) { out.push(`${mode}: cannot resolve ${fgName} or ${label}`); continue; }
        const r = ratio(over(fg, bg), bg);
        if (r < floor) out.push(`${mode}: ${fgName} on ${label} is ${r.toFixed(2)}:1, under ${floor}:1 for ${what}`);
      }
    }
  }
  return out;
}

let failures = 0;
for (const message of await contrast()) {
  console.error(`css/tokens.css: contrast: ${message}`);
  failures++;
}
for (const [file, checks] of Object.entries(CHECKS)) {
  const css = stripComments(await readFile(join(root, file), "utf8"));
  for (const check of checks) {
    for (const { line, message } of check(css)) {
      console.error(`${relative(process.cwd(), join(root, file))}:${line}: ${check.name}: ${message}`);
      failures++;
    }
  }
}

if (failures) {
  console.error(`catppuccin-neu lint: ${failures} problem${failures === 1 ? "" : "s"}`);
  process.exit(1);
}
console.log(`catppuccin-neu lint: ${Object.keys(CHECKS).length} files clean`);
