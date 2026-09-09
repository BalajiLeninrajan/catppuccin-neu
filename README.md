# catppuccin-neu

[![Latest tag](https://img.shields.io/github/v/tag/BalajiLeninrajan/catppuccin-neu?label=catppuccin-neu&color=cba6f7)](https://github.com/BalajiLeninrajan/catppuccin-neu/tags)
[![Docs](https://img.shields.io/badge/docs-live-cba6f7.svg)](https://catppuccin-neu.balajileninrajan.dev)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/BalajiLeninrajan/catppuccin-neu/blob/main/LICENSE)

A CSS-only design system in [Catppuccin](https://catppuccin.com/) Mocha.
Dark, soft, carved from shadow.

**See it live: [catppuccin-neu.balajileninrajan.dev](https://catppuccin-neu.balajileninrajan.dev)**

```html
<link rel="stylesheet" href="/styles/index.css" />

<button class="btn btn-primary">Save changes</button>
<div class="panel"><input class="input" placeholder="Search" /></div>
```

[SPEC.md](./SPEC.md) is the source of truth for every rule and number in the
package. This file covers how to consume it.

## Install

From the CDN, for a hand-written page with no `package.json`. jsDelivr serves
the repo's tags directly — no publish step, nothing to configure:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.2.0/css/index.css" />
```

Pin a full tag, not `@main` or `@v0.1` — those float and re-cache every 12
hours. Link `index.css` rather than the three files: its relative `@import`s
resolve against the CDN path and keep the layer wrappers, so your CSS still
wins unlayered.

As a git dependency, with a bundler:

```sh
pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.2.0
```

```js
import "catppuccin-neu/css/index.css";
```

Synced, for zero-build consumers that do have a build step to hang it on.
This copies `tokens.css`, `utilities.css`, `recipes.css`, and `index.css` into
a directory you link from — generate them in a pre-build hook and gitignore
them rather than committing copies:

```sh
npx catppuccin-neu-sync public/styles
# from a clone: node scripts/sync.mjs public/styles
```

Then link the fonts on every page that loads the CSS. Inter 100..900 and
JetBrains Mono 100..800:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" />
```

## What ships

`css/index.css` declares three cascade layers and imports the three files in
order: tokens, recipes, utilities. Utilities sit above recipes, Tailwind's
order, so a `cn-*` class on an element beats the recipe on that element
(`well cn-bg-well`, `btn-secondary cn-raised-soft`, `panel cn-p-16`).
Consumer CSS is unlayered and always wins, so overrides never need
`!important`. The files also work as three plain `<link>` tags in the same
order, without `index.css`.

| Layer | File | Contents |
| --- | --- | --- |
| `cn.tokens` | `css/tokens.css` | Mocha palette, font stacks, depth shadows, mix tokens, contract properties, density knobs, motion tokens, reset, focus and selection |
| `cn.recipes` | `css/recipes.css` | Components, the page column, native `dialog` hosts |
| `cn.utilities` | `css/utilities.css` | Single-purpose `cn-*` classes for depth, press behavior, type roles, color, edges, role-named radii, and layout on a six-step spacing scale |

The recipes, by group:

| Group | Classes |
| --- | --- |
| Controls | `.btn` and its variants, `.input`, `.field`, `.checkbox`, `.radio`, `.switch`, `.choice`, `.segmented` |
| Status | `.chip`, `.banner`, `.progress-track`, `.stepper`, `.spinner`, `.toast`, `.empty-state` |
| Containers | `.panel`, `.panel-body`, `.well`, `.accent-card`, `.accordion`, `.avatar`, `.stat-row`, `.metric`, `.table-neu`, `.terminal`, `.codeblock`, `.command` |
| Overlays | `.popover`, `.modal`, `.drawer`, `.cn-scrim`, and `dialog.modal` / `dialog.drawer` on the native element |
| Page | `.page-main`, `.topbar` (`is-split`, `is-compact`), `.wordmark`, `.footer-neu`, `.footer-brand`, `.eyebrow`, `.display-title`, `.lede` |

Layout comes from utilities: `cn-row`, `cn-stack`, `cn-cluster`, `cn-grid-2/3/4`,
`cn-divide`, `cn-truncate`, and `cn-gap-*`, `cn-p-*`, `cn-mt-*`, `cn-mb-*` on
the scale 4, 8, 12, 16, 22, 28. Nothing takes a number outside it.

## Contract properties

Recipes read four custom properties. Set them inline or on a wrapper to re-key
a whole subtree.

| Property | Default | Read by |
| --- | --- | --- |
| `--accent` | mauve | Accent cards, spines, solid marks, avatars, hero values, terminal caret |
| `--tone` | peach | Chips, banners, icon buttons. The `.cn-tone-*` classes set it |
| `--hard-offset-color` | crust | The hard offset shadow. Primary buttons override it |
| `--hard-offset` | 4px | How far the hard offset sits from the control |

The documented accent cycle is mauve, teal, yellow, blue, peach, pink.

Density is separate. `data-density="compact"` on any ancestor shrinks
`--control-h`, `--control-h-sm`, `--input-h`, and `--hard-offset`, and drops
`--pane-radius` from 16px to 12px. `data-density="dense"` goes further and
also tightens the data surfaces: table cells, chips, panel bands, flat
buttons and the topbar, for instrument panels.

Four mix tokens carry the shared `color-mix` expressions: `--edge` and
`--edge-soft` (hairlines), `--tint` (every tinted surface, the tone at 4%),
`--wash` (the engaged state). They resolve where used, so re-keying `--tone`
re-keys `--tint`.

## Tailwind

`tailwind/preset.cjs` (v3) and `tailwind/theme.css` (v4 `@theme`) map the token
vocabulary onto utility names: colors including `edge`, `tint` and `wash`,
radii, shadows, the spacing scale, the type roles, and the motion tokens as
`ease-out/in/spring` and `duration-fast/base/slow`. They are a convenience
over the same tokens, not a second implementation, and the recipes still come
from `css/recipes.css`.

Import order matters for v4. Cascade layers declared later win, so the
package must come before Tailwind:

```css
@import "catppuccin-neu/css/index.css";
@import "catppuccin-neu/tailwind/theme.css";
@import "tailwindcss";
```

With Tailwind first, its utilities layer sits under `cn.recipes` and
`class="panel p-4"` keeps the panel's padding. For v3, keep `@tailwind
utilities` unlayered (the default) and it wins regardless.

## Caveats

Recipe class names are unprefixed. `.btn`, `.panel`, `.input`, and `.table-neu`
will collide with anything else on the page claiming those names. Tokens and
utilities are namespaced `cn-*`; recipes deliberately are not, and that is the
trade you accept.

Other things to know before you commit to it:

- Dark only. The hexes are hardcoded Mocha, `color-scheme` is `dark`, and there
  is no light palette.
- No JavaScript ships. Selection controls and the accordion run on checkboxes,
  but the overlays are styling only. You toggle `hidden` and manage focus.
- Depth reads only when a surface sits on the background it was tuned for. A
  raised panel on the wrong ground looks like a sticker.
- The Google Fonts link is not optional if you want the intended result. The
  fallback stacks keep the page readable, but the sizes and tracking were tuned
  against Inter and JetBrains Mono.
- Mono is reserved for `.cn-code`, `.terminal`, `.codeblock`, and real code.
  `var(--mono)` anywhere else is a spec violation and reviewers check for it.

## Documentation

- [SPEC.md](./SPEC.md) covers every token, utility, recipe, and the rules that
  govern them, including the ones this README skips
- `showcase/` is a Preact docs site that imports `css/index.css` directly and
  shows every recipe and state at least once. Run it with
  `pnpm --dir showcase install && pnpm --dir showcase dev`
