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

/* Which checks run on which file. tokens.css holds the base element reset,
   which sits outside the spacing scale on purpose (list indent). */
const CHECKS = {
  "css/tokens.css": [selfReference, rawTransitionDuration],
  "css/utilities.css": [selfReference, rawTransitionDuration, rawSpacing],
  "css/recipes.css": [selfReference, rawTransitionDuration, rawSpacing],
  "tailwind/theme.css": [selfReference, rawTransitionDuration],
};

let failures = 0;
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
