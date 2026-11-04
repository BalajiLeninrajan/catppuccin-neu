#!/usr/bin/env node
/* ── catppuccin-neu lint ─────────────────────────────────────────────────────
   node scripts/lint.mjs   (or: pnpm lint)
   Checks the shipped CSS. Exits 1 on any failure.                           */

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
  const decl = /(--[\w-]+)\s*:([^;{}]*)/g;
  for (const m of css.matchAll(decl)) {
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

/* Drop custom property names so digits in them don't count. Fallback
   values stay and are checked. */
const withoutVars = (value) => value.replace(/--[\w-]+/g, "");

/* Transitions read the --t-* tokens. Keyframe animation loops are exempt.
   The reduced-motion kill switch (.01ms) is the one literal allowed. */
const ZERO_DURATIONS = new Set(["0s", "0ms", ".01ms"]);
function rawTransitionDuration(css) {
  const out = [];
  for (const { prop, value, line } of declarations(css, /transition(?:-duration|-delay)?/)) {
    const raw = (withoutVars(value).match(/(?<![\w.-])-?\d*\.?\d+m?s\b/g) || []).filter((d) => !ZERO_DURATIONS.has(d));
    if (raw.length) out.push({ line, message: `${prop} uses raw ${raw.join(", ")}; use a --t-* token` });
  }
  return out;
}

/* Gap, padding and margin read --space-* or a density knob. 0 and 1px
   (hairline and screen-reader offsets) are the only raw lengths. */
const SPACING_PX_OK = new Set(["0px", "1px", "-1px"]);
function rawSpacing(css) {
  const out = [];
  for (const { prop, value, line } of declarations(css, /(?:row-|column-)?gap|padding(?:-[a-z-]+)?|margin(?:-[a-z-]+)?/)) {
    const raw = (withoutVars(value).match(/-?\d*\.?\d+px\b/g) || []).filter((v) => !SPACING_PX_OK.has(v));
    if (raw.length) out.push({ line, message: `${prop} uses raw ${raw.join(", ")}; use a --space-* token` });
  }
  return out;
}

/* Recipes color text by role (--cn-fg-*), so prefers-contrast can re-key
   it. A palette text stop in a recipe's color declaration bypasses that. */
const TEXT_STOPS = /var\(\s*--(text|subtext-[01]|overlay-[012])\s*\)/;
function paletteText(css) {
  return declarations(css, /color/)
    .filter(({ value }) => TEXT_STOPS.test(value))
    .map(({ line, value }) => ({ line, message: `color: ${value} names a palette stop; use a --cn-fg-* role` }));
}

/* Recipes reach the accent hues through roles (--cn-interactive,
   --cn-danger, --cn-success, --cn-warning) so they can be re-keyed. Syntax
   tokens (.tok-*) name their hue on purpose. */
const ACCENT_HUES = /var\(\s*--(mauve|pink|red|green|peach|yellow)\s*\)/;
function paletteAccent(css) {
  return css.split("\n").flatMap((text, i) =>
    ACCENT_HUES.test(text) && !text.includes("tok-")
      ? [{ line: i + 1, message: `${text.match(ACCENT_HUES)[0]} names a hue; use a --cn-* role` }]
      : []);
}

/* Hairlines come from --edge, --edge-soft and --edge-strong. A hand-mixed
   surface-1 or surface-2 in a recipe is a hairline drifting off the scale. */
function looseHairline(css) {
  return css.split("\n").flatMap((text, i) =>
    /color-mix\(in srgb, var\(--surface-[12]\)/.test(text)
      ? [{ line: i + 1, message: "hand-mixed surface hairline; use --edge, --edge-soft or --edge-strong" }]
      : []);
}

/* Focus is never removed. A field that draws its own ring makes the
   outline transparent instead, so forced-colors mode still paints it. */
function outlineRemoved(css) {
  return declarations(css, /outline(?:-style)?/)
    .filter(({ value }) => /^(none|0)\b/.test(value))
    .map(({ line, prop, value }) => ({ line, message: `${prop}: ${value} removes focus; use a transparent outline` }));
}

/* Which checks run on which file. tokens.css holds the base element reset,
   which sits outside the spacing scale on purpose (list indent). */
const CHECKS = {
  "css/tokens.css": [selfReference, rawTransitionDuration, outlineRemoved],
  "css/utilities.css": [selfReference, rawTransitionDuration, rawSpacing, looseHairline, outlineRemoved],
  "css/recipes.css": [selfReference, rawTransitionDuration, rawSpacing, paletteText, paletteAccent, looseHairline, outlineRemoved],
  "tailwind/theme.css": [selfReference, rawTransitionDuration],
};

/* SPEC.md's type table must match the tokens: size (px at the 16px
   default), weight, leading and tracking for every role. Display sizes are
   clamps and are checked by their bounds. */
async function specTypeTable() {
  const spec = await readFile(join(root, "SPEC.md"), "utf8");
  const tokens = stripComments(await readFile(join(root, "css/tokens.css"), "utf8"));
  const tok = (name) => tokens.match(new RegExp(`--${name}:\\s*([^;]+);`))?.[1].trim();
  const px = (v) => v?.endsWith("rem") ? `${parseFloat(v) * 16}px` : v;
  const clampPx = (v) => (v?.match(/clamp\(([\d.]+)rem,.*,\s*([\d.]+)rem\)/) || []).slice(1).map((n) => `${parseFloat(n) * 16}`);
  const out = [];
  const lines = spec.split("\n");
  lines.forEach((text, i) => {
    const m = text.match(/^\| ([a-z-]+) \| ([^|]+) \| (\d+) \| ([\d.]+) \| ([^|]+) \|$/);
    if (!m) return;
    const [, role, size, weight, leading, tracking] = m.map((c) => c.trim());
    const base = role.startsWith("display") ? "display" : role;
    if (!tok(`cn-type-${base}-weight`)) return;
    const want = { weight: tok(`cn-type-${base}-weight`), leading: tok(`cn-type-${base}-leading`), tracking: tok(`cn-type-${base}-tracking`) };
    const sizeTok = tok(`cn-type-${role}-size`);
    const sizeOk = role.startsWith("display")
      ? clampPx(sizeTok).join(" to ") + "px" === size
      : px(sizeTok) === size;
    if (!sizeOk) out.push({ line: i + 1, message: `${role} size is ${size} in SPEC but ${sizeTok} in tokens` });
    for (const [k, v] of Object.entries({ weight, leading, tracking })) {
      if (String(want[k]) !== v) out.push({ line: i + 1, message: `${role} ${k} is ${v} in SPEC but ${want[k]} in tokens` });
    }
  });
  return out;
}

/* ── Contrast, computed from the tokens ─────────────────────────────────────
   Resolves the :root custom properties (hexes, var() and color-mix in
   srgb, including mixes into transparent), then checks every pairing the
   SPEC promises, in the default and the prefers-contrast: more tokens. It
   also checks each ratio written in a token comment against the computed
   value on base, so a comment can't drift from the color it describes. */
function rootBlocks(css) {
  const blocks = [];
  for (const m of css.matchAll(/(^|\n)([ \t]*):root\s*\{/g)) {
    let depth = 1, i = m.index + m[0].length;
    const start = i;
    while (depth && i < css.length) { if (css[i] === "{") depth++; else if (css[i] === "}") depth--; i++; }
    const media = css.slice(0, m.index).lastIndexOf("@media");
    const inMore = media >= 0 && /prefers-contrast:\s*more/.test(css.slice(media, m.index)) && m[2].length > 0;
    blocks.push({ body: css.slice(start, i - 1), offset: start, more: inMore, nested: m[2].length > 0 });
  }
  return blocks;
}
function customProps(body) {
  const map = new Map();
  for (const m of body.matchAll(/(--[\w-]+)\s*:([^;{}]*);/g)) if (!map.has(m[1])) map.set(m[1], m[2].trim());
  return map;
}
const hexRGBA = (h) => [1, 3, 5].map((i) => parseInt(h.slice(i, i + 2), 16)).concat(1);
function splitTop(s) {
  const parts = []; let depth = 0, cur = "";
  for (const ch of s) {
    if (ch === "(") depth++; if (ch === ")") depth--;
    if (ch === "," && !depth) { parts.push(cur.trim()); cur = ""; } else cur += ch;
  }
  parts.push(cur.trim());
  return parts;
}
function resolver(map) {
  const raw = (v, seen = new Set()) => {
    v = v.trim();
    const m = v.match(/^var\(\s*(--[\w-]+)\s*(?:,(.*))?\)$/s);
    if (m) {
      if (seen.has(m[1])) return null;
      const next = map.get(m[1]) ?? m[2];
      return next == null ? null : raw(next, new Set([...seen, m[1]]));
    }
    return v;
  };
  const pct = (v) => { const r = raw(v); const n = r && r.match(/^([\d.]+)%$/); return n ? +n[1] / 100 : null; };
  const color = (v) => {
    const r = raw(v);
    if (!r) return null;
    if (/^#[0-9a-f]{6}$/i.test(r)) return hexRGBA(r);
    if (r === "transparent") return [0, 0, 0, 0];
    const mix = r.match(/^color-mix\(\s*in srgb\s*,(.*)\)$/s);
    if (!mix) return null;
    const [a, b] = splitTop(mix[1]).map((part) => {
      const pm = part.match(/^(.*?)\s+((?:var\([^)]*\))|[\d.]+%)$/s);
      return pm ? { c: color(pm[1]), p: pct(pm[2]) } : { c: color(part), p: null };
    });
    if (!a?.c || !b?.c) return null;
    let p = a.p ?? (b.p == null ? .5 : 1 - b.p);
    const alpha = a.c[3] * p + b.c[3] * (1 - p);
    if (!alpha) return [0, 0, 0, 0];
    const ch = [0, 1, 2].map((i) => (a.c[i] * a.c[3] * p + b.c[i] * b.c[3] * (1 - p)) / alpha);
    return [...ch, alpha];
  };
  return { color, raw };
}
const over = (fg, bg) => [0, 1, 2].map((i) => fg[i] * fg[3] + bg[i] * (1 - fg[3])).concat(1);
const lum = (c) => c.slice(0, 3).reduce((sum, v, i) => {
  v /= 255; v = v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4;
  return sum + v * [.2126, .7152, .0722][i];
}, 0);
const ratio = (a, b) => { const [x, y] = [lum(a), lum(b)].sort((m, n) => n - m); return (x + .05) / (y + .05); };

const GROUNDS = ["--cn-surface-page", "--cn-surface-raised", "--cn-surface-overlay"];
/* [foreground, grounds, floor, what the SPEC promises] */
const PAIRS = [
  ["--cn-fg", GROUNDS, 7, "headings and values"],
  ["--cn-fg-soft", GROUNDS, 7, "ledes and cells"],
  ["--cn-fg-body", GROUNDS, 7, "running text"],
  ["--cn-fg-muted", GROUNDS, 5.5, "labels, meta and table heads"],
  ["--cn-fg-placeholder", GROUNDS, 4.5, "placeholders"],
  ["@field-lip", GROUNDS, 3, "the field lip (1.4.11)"],
  ["--cn-focus", GROUNDS, 3, "the focus ring (1.4.11)"],
  ["--control-edge", GROUNDS, 3, "unchecked control edges and the slider thumb (1.4.11)"],
  ["--engaged-edge", [...GROUNDS, "--wash"], 3, "the engaged rim (1.4.11)"],
  ["--cn-interactive", GROUNDS, 4.5, "links"],
  ["--cn-danger", GROUNDS, 4.5, "danger text"],
  ["--cn-warning", GROUNDS, 4.5, "warning text"],
  ["--cn-success", GROUNDS, 4.5, "success text"],
  ["--cn-info", GROUNDS, 4.5, "info text"],
  ["--cn-fg-on-accent", ["--cn-interactive", "--cn-interactive-hover"], 4.5, "text on the primary"],
];
const TINTED = ["danger", "warning", "success", "info"];
/* APCA 0.0.98G lightness contrast (Lc), as a magnitude. WCAG 2 flatters
   light text on dark grounds; APCA does not, so text roles answer both. */
function apca(text, bg) {
  const y = (c) => {
    const v = c.slice(0, 3).reduce((s, ch, i) => s + (ch / 255) ** 2.4 * [.2126729, .7151522, .0721750][i], 0);
    return v < .022 ? v + (.022 - v) ** 1.414 : v;
  };
  const [yt, yb] = [y(text), y(bg)];
  const s = yb > yt ? (yb ** .56 - yt ** .57) * 1.14 : (yb ** .65 - yt ** .62) * 1.14;
  if (Math.abs(s) < .1) return 0;
  return Math.abs(s > 0 ? s - .027 : s + .027) * 100;
}
const APCA = [["--cn-fg", 75], ["--cn-fg-soft", 60], ["--cn-fg-body", 60], ["--cn-fg-muted", 50], ["--cn-fg-placeholder", 40]];

async function contrast() {
  const file = "css/tokens.css";
  const text = await readFile(join(root, file), "utf8");
  const css = stripComments(text);
  const blocks = rootBlocks(css);
  const base = new Map();
  for (const b of blocks.filter((b) => !b.nested)) for (const [k, v] of customProps(b.body)) if (!base.has(k)) base.set(k, v);
  const more = new Map(base);
  for (const b of blocks.filter((b) => b.more)) for (const [k, v] of customProps(b.body)) more.set(k, v);
  const out = [];
  for (const [mode, map] of [["default", base], ["prefers-contrast", more]]) {
    const { color } = resolver(map);
    const ground = (name) => { const c = color(`var(${name})`); return c && over(c, color("var(--base)")); };
    const fgOf = (name) => name === "@field-lip"
      ? color((map.get("--cn-field-ring") || "").match(/var\(--[\w-]+\)\s*$/)?.[0] ?? "")
      : color(`var(${name})`);
    const check = (fgName, fg, grounds, floor, what) => {
      for (const g of grounds) {
        const bg = typeof g === "string" ? ground(g) : g.c;
        const label = typeof g === "string" ? g : g.name;
        if (!fg || !bg) { out.push({ line: 1, message: `${mode}: cannot resolve ${fgName} or ${label}` }); continue; }
        const r = ratio(over(fg, bg), bg);
        if (r < floor) out.push({ line: 1, message: `${mode}: ${fgName} on ${label} is ${r.toFixed(2)}:1, under ${floor}:1 for ${what}` });
      }
    };
    for (const [fgName, grounds, floor, what] of PAIRS) check(fgName, fgOf(fgName), grounds, floor, what);
    for (const [fgName, floor] of APCA) {
      for (const g of GROUNDS) {
        const fg = color(`var(${fgName})`), bg = ground(g);
        const lc = fg && bg ? apca(over(fg, bg), bg) : 0;
        if (lc < floor) out.push({ line: 1, message: `${mode}: ${fgName} on ${g} is APCA Lc ${lc.toFixed(0)}, under Lc ${floor}` });
      }
    }
    /* A status tone's text on its own tint, over each ground. */
    for (const t of TINTED) {
      const tint = color(`var(--cn-${t}-tint)`);
      const grounds = GROUNDS.map((g) => ({ name: `--cn-${t}-tint over ${g}`, c: tint && ground(g) && over(tint, ground(g)) }));
      check(`--cn-${t}`, color(`var(--cn-${t})`), grounds, 4.5, `${t} text on its tint`);
    }
  }
  /* Ratios written in :root comments, read against base. Only a ratio
     that ends its clause or says "on base" is checked. */
  const { color } = resolver(base);
  const page = color("var(--base)");
  for (const m of text.matchAll(/^\s*(--[\w-]+)\s*:[^;]*;\s*\/\*([^*]*)\*\//gm)) {
    const r = m[2].match(/([\d.]+):1(\s*(?:$|,|on base\b|on the page\b))?/);
    if (!r || r[2] === undefined) continue;
    const c = color(`var(${m[1]})`);
    if (!c) continue;
    const got = ratio(over(c, page), page);
    if (Math.abs(got - +r[1]) > .06) out.push({ line: lineOf(text, m.index + m[0].indexOf(m[1])), message: `${m[1]} comment says ${r[1]}:1 but computes to ${got.toFixed(2)}:1 on base` });
  }
  return out.map((o) => ({ ...o, file }));
}

let failures = 0;
for (const { line, message } of await specTypeTable()) {
  console.error(`SPEC.md:${line}: specTypeTable: ${message}`);
  failures++;
}
for (const { file, line, message } of await contrast()) {
  console.error(`${file}:${line}: contrast: ${message}`);
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
