#!/usr/bin/env node
/* ── catppuccin-neu lint ─────────────────────────────────────────────────────
   node scripts/lint.mjs   (or: pnpm lint)
   Checks the shipped CSS. Exits 1 on any failure.                           */

import { readFile, readdir } from "node:fs/promises";
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

/* Top-level comma or space parts of a value, ignoring those inside
   parentheses. */
function splitAt(value, sep) {
  const parts = []; let depth = 0, cur = "";
  for (const ch of value) {
    if (ch === "(") depth++; if (ch === ")") depth--;
    if ((sep === " " ? /\s/.test(ch) : ch === sep) && !depth) { if (cur.trim()) parts.push(cur.trim()); cur = ""; } else cur += ch;
  }
  if (cur.trim()) parts.push(cur.trim());
  return parts;
}

/* Every box-shadow, and every --hard-extra a recipe sets, is none or a
   comma list of var() tokens. A new shadow layer gets a name in
   tokens.css first, so each layer has one job and one value. */
function shadowTokens(css) {
  return declarations(css, /box-shadow|--hard-extra/)
    .filter(({ value }) => value !== "none" && !splitAt(value, ",").every((part) => /^var\(--[\w-]+\)$/.test(part)))
    .map(({ line, prop, value }) => ({ line, message: `${prop}: ${value} is not a list of shadow tokens; name the layer in tokens.css` }));
}

/* Radii: a --cn-radius-* token, 999px, 50%, 0, inherit, or a radius
   token minus 1px. */
const RADIUS_OK = /^(?:var\(--cn-radius-[a-z]+\)|999px|50%|0|inherit|calc\(var\(--cn-radius-[a-z]+\) - 1px\))$/;
function radiusValues(css) {
  return declarations(css, /border(?:-[a-z]+)*-radius/)
    .filter(({ value }) => !splitAt(value.replace(/\s*\/\s*/g, " "), " ").every((part) => RADIUS_OK.test(part)))
    .map(({ line, prop, value }) => ({ line, message: `${prop}: ${value} is off the radius scale` }));
}

/* The selector and enclosing at-rules of each declaration, for checks
   that depend on where a declaration sits. */
function blocks(css) {
  const out = [];
  const stack = [];
  let start = 0;
  for (let i = 0; i < css.length; i++) {
    const ch = css[i];
    if (ch === "{") { stack.push(css.slice(start, i).trim().replace(/\s+/g, " ")); start = i + 1; }
    else if (ch === "}") { if (stack.length) out.push({ preludes: [...stack], body: css.slice(start, i), at: start }); stack.pop(); start = i + 1; }
    else if (ch === ";" && stack.length) { out.push({ preludes: [...stack], body: css.slice(start, i + 1), at: start }); start = i + 1; }
  }
  return out;
}

/* Uppercase is scarce: only .cn-microlabel sets it. */
function uppercase(css) {
  return blocks(css)
    .filter(({ body, preludes }) => /text-transform\s*:\s*uppercase/.test(body) && preludes.at(-1) !== ".cn-microlabel")
    .map(({ at, preludes }) => ({ line: lineOf(css, at), message: `text-transform: uppercase on ${preludes.at(-1)}; only .cn-microlabel is uppercase` }));
}

/* Transitions: a transform or box-shadow transition names a --ease-*
   curve, and no transition uses the ease, linear or ease-in-out
   keywords. Keyframe loops such as the spinner may run linear. */
function transitionCurves(css) {
  const out = [];
  for (const { prop, value, line } of declarations(css, /transition(?:-timing-function)?/)) {
    const bare = withoutVars(value).match(/(?<![\w-])(ease|ease-in|ease-out|ease-in-out|linear)(?![\w(-])/);
    if (bare) out.push({ line, message: `${prop} uses the ${bare[1]} keyword; use a --ease-* token` });
    if (prop !== "transition") continue;
    for (const part of splitAt(value, ",")) {
      const name = part.split(/\s+/)[0];
      if (/^(transform|translate|scale|rotate|box-shadow|all)$/.test(name) && !/var\(--ease-/.test(part))
        out.push({ line, message: `transition of ${name} names no curve; add a --ease-* token` });
    }
  }
  return out;
}

/* !important belongs to the [hidden] rule, .cn-hidden, and the
   reduced-motion and forced-colors blocks, nowhere else. */
function importantUse(css) {
  return blocks(css)
    .filter(({ body }) => /!important/.test(body))
    .filter(({ preludes }) => !preludes.some((p) => /prefers-reduced-motion|forced-colors/.test(p)) && !/^(\[hidden\]|\.cn-hidden$)/.test(preludes.at(-1)))
    .map(({ at, preludes }) => ({ line: lineOf(css, at), message: `!important in ${preludes.at(-1)}; only [hidden], .cn-hidden and the reduced-motion and forced-colors blocks may use it` }));
}

/* Which checks run on which file. tokens.css holds the base element reset,
   which sits outside the spacing scale on purpose (list indent). */
const CHECKS = {
  "css/tokens.css": [selfReference, rawTransitionDuration, outlineRemoved, uppercase, transitionCurves, importantUse],
  "css/utilities.css": [selfReference, rawTransitionDuration, rawSpacing, looseHairline, outlineRemoved, shadowTokens, radiusValues, uppercase, transitionCurves, importantUse],
  "css/recipes.css": [selfReference, rawTransitionDuration, rawSpacing, paletteText, paletteAccent, looseHairline, outlineRemoved, shadowTokens, radiusValues, uppercase, transitionCurves, importantUse],
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
    const rgb = r.match(/^rgb\(\s*([\d.]+)\s+([\d.]+)\s+([\d.]+)\s*(?:\/\s*([\d.]+)\s*)?\)$/);
    if (rgb) return [+rgb[1], +rgb[2], +rgb[3], rgb[4] == null ? 1 : +rgb[4]];
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

/* The page is mantle and raised surfaces are base, so text is checked on
   both, on the overlay, and below the ground on the recessed sidebar and
   the sunken wells, which hold code and the disabled primary's label. */
const GROUNDS = ["--cn-surface-page", "--cn-surface-raised", "--cn-surface-overlay"];
const TEXT_GROUNDS = [...GROUNDS, "--cn-surface-recessed", "--cn-surface-sunken"];
const ON_PAGE = ["--cn-surface-page", "--cn-surface-raised"];
const ON_OVERLAY = ["--cn-surface-overlay"];
/* [foreground, grounds, floor, what the SPEC promises, mode]. A name that
   starts with @ is the color of a one-layer shadow token: @field-ring reads
   --cn-field-ring. A row with a mode runs in that mode only. The --edge,
   --edge-strong, lit-edge, resting field-ring and carve-ring rows are
   design floors that keep the depth ladder in order, not WCAG
   obligations. */
const PAIRS = [
  ["--cn-fg", TEXT_GROUNDS, 7, "headings and values"],
  ["--cn-fg-soft", TEXT_GROUNDS, 7, "ledes and cells"],
  ["--cn-fg-body", TEXT_GROUNDS, 7, "running text"],
  ["--cn-fg-muted", TEXT_GROUNDS, 5.5, "meta, help and table heads"],
  ["--cn-fg-placeholder", TEXT_GROUNDS, 4.5, "placeholders"],
  ["@field-hover-ring", GROUNDS, 3, "a hovered field's ring (1.4.11)"],
  ["@field-ring", GROUNDS, 3, "a resting field's ring under prefers-contrast", "prefers-contrast"],
  ["@field-ring", ON_PAGE, 2, "a resting field's hairline (design floor)"],
  ["@field-ring", ON_OVERLAY, 1.6, "a resting field's hairline (design floor)"],
  ["@carve-ring", ON_PAGE, 1.7, "the tabs carve and disabled field hairline (design floor)"],
  ["--edge", ON_PAGE, 1.8, "the raised hairline (design floor)"],
  ["--edge", ON_OVERLAY, 1.5, "the raised hairline (design floor)"],
  ["--edge-strong", ON_PAGE, 2.4, "the lead and overlay hairline (design floor)"],
  ["--edge-strong", ON_OVERLAY, 1.9, "the lead and overlay hairline (design floor)"],
  ["@lit-edge", ON_PAGE, 1.4, "the lit top edge (design floor)"],
  ["@lit-edge", ON_OVERLAY, 1.3, "the lit top edge (design floor)"],
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
  const moreOwn = new Map();
  for (const b of blocks.filter((b) => b.more)) for (const [k, v] of customProps(b.body)) { more.set(k, v); moreOwn.set(k, v); }
  const out = [];
  /* :root[data-contrast="more"] is the prefers-contrast block as an
     opt-in attribute, so the two must declare the same tokens and values. */
  const attr = css.match(/(?:^|\n):root\[data-contrast="more"\]\s*\{([^}]*)\}/);
  if (!attr) out.push({ line: 1, message: `no :root[data-contrast="more"] block mirrors the prefers-contrast block` });
  else {
    const own = customProps(attr[1]);
    for (const [k, v] of moreOwn) if (own.get(k) !== v) out.push({ line: lineOf(text, text.indexOf(':root[data-contrast="more"]')), message: `:root[data-contrast="more"] sets ${k} to ${own.get(k) ?? "nothing"}, the prefers-contrast block to ${v}` });
    for (const k of own.keys()) if (!moreOwn.has(k)) out.push({ line: lineOf(text, text.indexOf(':root[data-contrast="more"]')), message: `:root[data-contrast="more"] sets ${k}, which the prefers-contrast block does not` });
  }
  for (const [mode, map] of [["default", base], ["prefers-contrast", more]]) {
    const { color } = resolver(map);
    const ground = (name) => { const c = color(`var(${name})`); return c && over(c, color("var(--cn-surface-page)")); };
    /* The color of a one-layer shadow: drop inset and the lengths. */
    const fgOf = (name) => name.startsWith("@")
      ? color((map.get(`--cn-${name.slice(1)}`) || "").replace(/^inset\s+/, "").replace(/^(?:-?[\d.]+(?:px)?\s+)+/, ""))
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
    for (const [fgName, grounds, floor, what, only] of PAIRS) if (!only || only === mode) check(fgName, fgOf(fgName), grounds, floor, what);
    /* A carve is darkness only: every layer of the inset tokens falls from
       the top left and is darker than the page, so no carve draws a light
       lip or glow on its far walls. */
    for (const name of ["--neu-inset", "--neu-inset-soft"]) {
      for (const layer of splitTop(map.get(name) || "")) {
        const parts = layer.replace(/^inset\s+/, "").match(/^((?:-?[\d.]+(?:px)?\s+)+)(.*)$/s);
        const [x, y] = parts ? parts[1].trim().split(/\s+/).map(parseFloat) : [];
        const c = parts && color(parts[2]);
        if (!c) { out.push({ line: 1, message: `${mode}: cannot resolve a layer of ${name}` }); continue; }
        if (x < 0 || y < 0) out.push({ line: 1, message: `${mode}: ${name} has a layer from the bottom right (${layer}); a carve has no lit side` });
        for (const g of ["--cn-surface-page", "--cn-surface-raised", "--cn-surface-sunken"]) {
          const bg = ground(g);
          if (bg && lum(over(c, bg)) > lum(bg)) out.push({ line: 1, message: `${mode}: ${name} has a layer lighter than ${g} (${layer}); a carve is darkness only` });
        }
      }
    }
    /* The lead and overlay hairline outranks the plain one on every ground. */
    for (const g of GROUNDS) {
      const bg = ground(g), [plain, strong] = ["--edge", "--edge-strong"].map((n) => color(`var(${n})`));
      if (!bg || !plain || !strong) { out.push({ line: 1, message: `${mode}: cannot resolve the hairlines on ${g}` }); continue; }
      const [rp, rs] = [plain, strong].map((c) => ratio(over(c, bg), bg));
      if (rs <= rp) out.push({ line: 1, message: `${mode}: --edge-strong on ${g} is ${rs.toFixed(2)}:1, not above --edge at ${rp.toFixed(2)}:1` });
    }
    for (const [fgName, floor] of APCA) {
      for (const g of GROUNDS) {
        const fg = color(`var(${fgName})`), bg = ground(g);
        const lc = fg && bg ? apca(over(fg, bg), bg) : 0;
        if (lc < floor) out.push({ line: 1, message: `${mode}: ${fgName} on ${g} is APCA Lc ${lc.toFixed(0)}, under Lc ${floor}` });
      }
    }
    /* A status tone's text on its own tint (fields, banners) and wash
       (tags), over each ground. */
    for (const t of TINTED) {
      for (const stop of ["tint", "wash"]) {
        const fill = color(`var(--cn-${t}-${stop})`);
        const grounds = GROUNDS.map((g) => ({ name: `--cn-${t}-${stop} over ${g}`, c: fill && ground(g) && over(fill, ground(g)) }));
        check(`--cn-${t}`, color(`var(--cn-${t})`), grounds, 4.5, `${t} text on its ${stop}`);
      }
    }
  }
  /* Ratios written in :root comments, read against base, or against the
     mantle page when the clause says "on the page". Only a ratio that ends
     its clause or names one of those grounds is checked. */
  const { color } = resolver(base);
  const panel = color("var(--base)"), page = color("var(--cn-surface-page)");
  for (const m of text.matchAll(/^\s*(--[\w-]+)\s*:[^;]*;\s*\/\*([^*]*)\*\//gm)) {
    const r = m[2].match(/([\d.]+):1(\s*(?:$|,|on base\b|on the page\b))?/);
    if (!r || r[2] === undefined) continue;
    const c = color(`var(${m[1]})`);
    if (!c) continue;
    const onPage = /on the page/.test(r[2]);
    const g = onPage ? page : panel;
    const got = ratio(over(c, g), g);
    if (Math.abs(got - +r[1]) > .06) out.push({ line: lineOf(text, m.index + m[0].indexOf(m[1])), message: `${m[1]} comment says ${r[1]}:1 but computes to ${got.toFixed(2)}:1 ${onPage ? "on the page" : "on base"}` });
  }
  return out.map((o) => ({ ...o, file }));
}

/* The showcase is the visual reference, so it follows the markup rules
   too: no title= tooltips on elements, and no overflow: hidden standing
   in for band corners. Skipped where showcase/src is not present, as in
   the published package. */
async function showcaseMarkup() {
  const dir = join(root, "showcase/src");
  let files;
  try { files = await readdir(dir, { recursive: true }); } catch { return []; }
  const out = [];
  for (const name of files.filter((f) => /\.(tsx|ts|css)$/.test(f))) {
    const text = await readFile(join(dir, name), "utf8");
    const file = `showcase/src/${name}`;
    const rules = name.endsWith(".css")
      ? [[/overflow(?:-[xy])?\s*:\s*hidden/g, "overflow: hidden; never clip band corners"]]
      : [
          [/<[a-z][\w-]*\b[^>]*\stitle=/g, "title= on an element; use [data-tip]"],
          [/style=[{"`][^}"`]*overflow(?:-[xy])?\s*:\s*hidden/g, "overflow: hidden in a style; never clip band corners"],
        ];
    for (const [re, message] of rules)
      for (const m of text.matchAll(re)) out.push({ file, line: lineOf(text, m.index), message });
  }
  return out;
}

let failures = 0;
for (const { file, line, message } of await showcaseMarkup()) {
  console.error(`${file}:${line}: showcaseMarkup: ${message}`);
  failures++;
}
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
