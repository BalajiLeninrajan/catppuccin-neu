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
pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.4.0
```

```js
import "catppuccin-neu/css/index.css";
```

From the CDN, for a page with no `package.json`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.0/css/index.css" />
```

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
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" />
```

## Upgrading from 0.3

Every renamed class and token still works through 0.4.x and is removed in
0.5.0. `--input-h` is the one removal now; inputs read `--control-h`. The
[migration table](./CHANGELOG.md#migrating-to-040) lists each old name and
its replacement.

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
identity color), `--tone` (status color), `--plate` (the hard offset's
color) and `--hard-offset`. Set `data-density="compact"` on any ancestor
for 28px controls and tighter data surfaces.

`tailwind/preset.cjs` (v3) and `tailwind/theme.css` (v4) map the tokens to
Tailwind names. With v4, import the package first:

```css
@import "catppuccin-neu/css/index.css";
@import "catppuccin-neu/tailwind/theme.css";
@import "tailwindcss";
```

## Caveats

- Recipe classes are unprefixed. `.btn`, `.panel`, `.input` and `.data-table` collide with any other CSS that uses those names.
- Dark only. There is no light palette.
- No JavaScript ships. Overlays use `<dialog>`, `showModal()` and `close()`; toasts and copy buttons need your own listeners.
- Depth reads correctly only on the `--base` ground it was tuned for.
- The sizes and tracking assume Inter and JetBrains Mono. The fallback stacks stay readable but look different.

## Docs

- [SPEC.md](./SPEC.md): every token, utility, recipe and rule.
- [CHANGELOG.md](./CHANGELOG.md): changes by version, the 0.4.0 migration table, and ideas that were tried and rejected.
- `showcase/`: the docs site. Run it with `pnpm --dir showcase install && pnpm --dir showcase dev`.
