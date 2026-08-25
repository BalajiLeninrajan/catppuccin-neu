# catppuccin-neu

`catppuccin-neu` is a dark-only CSS design system: [Catppuccin](https://catppuccin.com/) Mocha for color,
neumorphic depth lit from a fixed top-left, mauve as the only accent, and a hard
offset shadow that slides halfway in when you press a control. Around 1,700
lines of plain CSS in three cascade layers. No JavaScript, no build step, no
light mode.

```html
<link rel="stylesheet" href="/styles/index.css" />

<button class="btn btn-primary">Save changes</button>
<div class="panel"><input class="input" placeholder="Search" /></div>
```

[SPEC.md](./SPEC.md) is the source of truth for every rule and number in the
package. This file covers how to consume it.

## Install

As a git dependency, with a bundler:

```sh
pnpm add github:BalajiLeninrajan/design#<tag>
```

```js
import "catppuccin-neu/css/index.css";
```

Vendored, for zero-build consumers. This copies `tokens.css`, `utilities.css`,
`recipes.css`, and `index.css` into a directory you link from:

```sh
npx catppuccin-neu-sync public/styles
# from a clone: node scripts/sync.mjs public/styles
```

The git URL needs the repo pushed first, and it has no remote yet. Until then,
clone it and either sync the CSS or point the dependency at the local path.

Then link the fonts on every page that loads the CSS. Inter 100..900 and
JetBrains Mono 100..800:

```html
<link rel="preconnect" href="https://fonts.googleapis.com" />
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" />
```

## What ships

`css/index.css` declares three cascade layers and imports the three files in
order. Consumer CSS is unlayered and always wins, so overrides never need
`!important`. The files also work as three plain `<link>` tags in the same
order, without `index.css`.

| Layer | File | Contents |
| --- | --- | --- |
| `cn.tokens` | `css/tokens.css` | Mocha palette, font stacks, depth shadows, contract properties, density knobs, reset, focus and selection, motion |
| `cn.utilities` | `css/utilities.css` | Single-purpose `cn-*` classes for depth, press behavior, type roles, color, edges, role-named radii |
| `cn.recipes` | `css/recipes.css` | Components |

The recipes, by group:

| Group | Classes |
| --- | --- |
| Controls | `.btn` and its variants, `.input`, `.field`, `.checkbox`, `.radio`, `.switch`, `.choice`, `.segmented` |
| Status | `.chip`, `.banner`, `.progress-track`, `.stepper`, `.spinner`, `.toast`, `.empty-state` |
| Containers | `.panel`, `.well`, `.accent-card`, `.accordion`, `.avatar`, `.stat-row`, `.metric`, `.table-neu`, `.terminal`, `.codeblock` |
| Overlays | `.popover`, `.modal`, `.drawer`, `.cn-scrim` |
| Page | `.topbar`, `.footer-neu`, `.eyebrow`, `.display-title`, `.lede` |

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
`--pane-radius` from 16px to 12px. Nothing else changes.

## Tailwind

`tailwind/preset.cjs` (v3) and `tailwind/theme.css` (v4 `@theme`) map the token
vocabulary onto utility names. They are a convenience over the same tokens, not
a second implementation, and the recipes still come from `css/recipes.css`.

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
- `~/.claude/skills/catppuccin-neu/` is generated from this package, so Claude
  can apply the system without reading the CSS
