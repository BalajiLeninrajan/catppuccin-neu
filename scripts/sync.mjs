#!/usr/bin/env node
/* ── catppuccin-neu-sync ─────────────────────────────────────────────────────
   Vendors the css layer into a zero-build consumer:

     node scripts/sync.mjs <destDir>       (or: npx catppuccin-neu-sync <destDir>)

   Copies css/tokens.css, css/utilities.css, css/recipes.css, css/index.css
   into <destDir>, creating it if needed. Node >= 18, no dependencies.       */

import { copyFile, mkdir } from "node:fs/promises";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import process from "node:process";

const FILES = ["tokens.css", "utilities.css", "recipes.css", "index.css"];

const dest = process.argv[2];
if (!dest) {
  console.error("usage: catppuccin-neu-sync <destDir>");
  console.error("       copies tokens.css, utilities.css, recipes.css, index.css into <destDir>");
  process.exit(1);
}

const srcDir = join(dirname(fileURLToPath(import.meta.url)), "..", "css");
const destDir = resolve(process.cwd(), dest);

try {
  await mkdir(destDir, { recursive: true });
  for (const file of FILES) {
    await copyFile(join(srcDir, file), join(destDir, file));
    console.log(`copied css/${file} -> ${join(destDir, file)}`);
  }
  console.log(`catppuccin-neu-sync: ${FILES.length} files synced to ${destDir}`);
} catch (err) {
  console.error(`catppuccin-neu-sync: ${err.message}`);
  process.exit(1);
}
