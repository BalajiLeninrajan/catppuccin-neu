# catppuccin-neu

[![Latest tag](https://img.shields.io/github/v/tag/BalajiLeninrajan/catppuccin-neu?label=catppuccin-neu&color=cba6f7)](https://github.com/BalajiLeninrajan/catppuccin-neu/tags)
[![Docs](https://img.shields.io/badge/docs-live-cba6f7.svg)](https://catppuccin-neu.balajileninrajan.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/BalajiLeninrajan/catppuccin-neu/blob/main/LICENSE)

A CSS-only dark design system in [Catppuccin](https://catppuccin.com/)
Mocha. Surfaces are carved and raised with soft shadows, and clickable
controls rest on a solid plate.

Docs and every component: [catppuccin-neu.balajileninrajan.dev](https://catppuccin-neu.balajileninrajan.dev)

```html
<button class="btn btn-primary">Save changes</button>
<div class="panel"><div class="panel-body"><input class="input" placeholder="Search" /></div></div>
```

## Install

With a bundler:

```sh
pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.4.1
```

```js
import "catppuccin-neu/css/index.css";
```

From the CDN, for a page with no `package.json`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.1/css/index.css" />
<script type="module" src="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.1/js/auto.js"></script>
```

Copy both lines. Tabs, menus, listboxes and comboboxes need a keyboard
model, and a stylesheet cannot run script, so the second tag wires them. A
static page with none of those widgets can drop it.

Pin a full tag. `@main` and `@v0.4` float and re-cache every 12 hours. Link
`index.css`, not the three files, so the layer wrappers survive.

For a page with a `package.json` but no bundler, copy the CSS in a
pre-build hook and ignore the copies in git:

```sh
pnpm exec catppuccin-neu-sync public/styles
```

Then link the fonts on every page:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:ital,wght@0,400..700;1,400..700&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" />
```

## Upgrading from 0.3

The 0.4 aliases are gone as of 0.5.0: every class and token renamed in
0.4.0 answers only to its new name, and inputs read `--control-h` in place
of `--input-h`. The [migration table](./CHANGELOG.md#migrating-to-040)
lists each old name and its replacement.

## What ships

`css/index.css` puts three files into three cascade layers:

| Layer | File | Contents |
| --- | --- | --- |
| `cn.tokens` | `css/tokens.css` | Palette, type roles, spacing, radii, depth, contract properties, density, motion, the base reset |
| `cn.recipes` | `css/recipes.css` | Components, the page column, native dialogs |
| `cn.utilities` | `css/utilities.css` | `cn-*` classes for depth, press, type roles, color, edges, radii and layout |

A utility beats the recipe on the same element (`panel cn-p-16`). Your own
CSS is unlayered and beats both, so overrides never need `!important`.

Re-key a subtree with the contract properties: `--accent` (the item's
identity color), `--tone` (status color), `--series` (a bar or legend
swatch, falling back to `--accent`), `--plate` (the hard offset's
color), `--hard-offset` and `--grain` (grain strength on solid accent
fills, 0 for none). Set `data-density="compact"` on any ancestor
for 28px controls and tighter data surfaces.

`tailwind/preset.cjs` (v3) and `tailwind/theme.css` (v4) map the tokens to
Tailwind names. With v4, import the package first:

```css
@import "catppuccin-neu/css/index.css";
@import "catppuccin-neu/tailwind/theme.css";
@import "tailwindcss";
```

The CSS needs no script to look right, but tabs, menus, listboxes and
comboboxes are required to have a keyboard model. One import wires every
widget in the document and the ones added later:

```js
import "catppuccin-neu/js/auto";
```

Call `init()` yourself to choose the moment or keep the cleanup, or use
your own widget library:

```js
import { init, toast } from "catppuccin-neu/js";
const cleanup = init(); // tabs, menu buttons, listboxes and comboboxes, sliders and the tooltip Escape
```

## Caveats

- Recipe classes are unprefixed. `.btn`, `.panel`, `.input` and `.data-table` collide with any other CSS that uses those names.
- Dark only. There is no light palette.
- The CSS needs no script to look right, and overlays use `<dialog>`, `showModal()` and `close()`. Tabs, menus, listboxes and comboboxes are still required to have a keyboard model: `catppuccin-neu/js/auto`, `init()` from `catppuccin-neu/js`, or your own widget library. The same module has the tooltip Escape and, as optional extras, slider fill and toasts. Copy buttons need your own listener.
- Depth reads correctly only on the ground it was tuned for: a mantle page with panels and plated controls on base. Keep your page on `--cn-surface-page`.
- The sizes and tracking assume IBM Plex Sans and JetBrains Mono. The fallback stacks stay readable but look different.

## Docs

- [SPEC.md](./SPEC.md): every token, utility, recipe and rule.
- [CHANGELOG.md](./CHANGELOG.md): changes by version, the 0.4.0 migration table, and ideas that were tried and rejected.
- `showcase/`: the docs site. Run it with `pnpm --dir showcase install && pnpm --dir showcase dev`.
