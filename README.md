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
pnpm add github:BalajiLeninrajan/catppuccin-neu#v2.0.1
```

```js
import "catppuccin-neu/css/index.css";
```

From the CDN, for a page with no `package.json`:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v2.0.1/css/index.css" />
```

Pin a full tag. `@main` and `@v2` float and re-cache every 12 hours. Link
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

## What ships

`css/index.css` puts three files into three cascade layers:

| Layer | File | Contents |
| --- | --- | --- |
| `cn.tokens` | `css/tokens.css` | Palette, type roles, spacing, radii, depth, density, motion, the base reset |
| `cn.recipes` | `css/recipes.css` | Components, the page column, native dialogs |
| `cn.utilities` | `css/utilities.css` | `cn-*` classes for depth, press, type roles, color, edges, radii and layout |

A utility beats the recipe on the same element (`panel cn-p-16`). Your own
CSS is unlayered and beats both, so overrides never need `!important`.

[SPEC.md](./SPEC.md) lists the properties that re-key a subtree, such as
`--accent` and `--tone`, and indexes every recipe class.

## Caveats

- Recipe classes are unprefixed. `.btn`, `.panel`, `.input` and `.data-table` collide with any other CSS that uses those names.
- Dark only. There is no light palette.
- No script ships. Overlays use `<dialog>`, `showModal()` and `close()`. Copy buttons and toasts need your own listener.
- Depth reads correctly only on the ground it was tuned for: a mantle page with panels and plated controls on base. Keep your page on `--cn-surface-page`.
- The sizes and tracking assume Inter and JetBrains Mono. The fallback stacks stay readable but look different.

## Development

```sh
pnpm lint                         # token and contrast checks on the CSS
pnpm --dir showcase build         # type-check and build the docs site
pnpm --dir showcase test          # axe and overflow checks on every docs route, in Chromium
```

Run the docs site with `pnpm --dir showcase install && pnpm --dir showcase dev`.

## Docs

- [SPEC.md](./SPEC.md): the design rules, the depth model and the recipe index.
- [CHANGELOG.md](./CHANGELOG.md): changes by version and ideas that were tried and rejected.
