# catppuccin-neu

A Catppuccin Mocha + neumorphic dark design system, packaged as tokens,
utilities, and recipes in plain CSS. Dark-only, one top-left light source,
mauve as the sole accent, mono reserved for code (`.cn-code`, `.terminal`,
`.codeblock`), depth instead of borders,
and a hard offset shadow with a half-slide press on clickable controls.
[SPEC.md](./SPEC.md) is the single source of truth.

## Install

As a git dependency with a bundler:

```sh
pnpm add github:BalajiLeninrajan/design#<tag>
```

```js
import "catppuccin-neu/css/index.css";
```

Vendored, zero-build: copy the CSS files into your static dir and link them.

```sh
npx catppuccin-neu-sync public/styles
# or: node node_modules/catppuccin-neu/scripts/sync.mjs public/styles
```

Either way, link the fonts on every public surface. Inter 100..900 and
JetBrains Mono 100..800 via Google Fonts.

Tailwind users can pull the token vocabulary into utility names via
`tailwind/preset.cjs` for v3 or `tailwind/theme.css` for v4 `@theme`.

## Three layers

`css/index.css` declares three cascade layers:

| Layer | File | Contents |
|---|---|---|
| `cn.tokens` | `css/tokens.css` | Mocha palette, font stacks, depth shadows, contract props, density knobs, reset, focus/selection, motion |
| `cn.utilities` | `css/utilities.css` | Single-purpose `cn-*` classes for depth, press behavior, type roles, color, borders, role-named radii |
| `cn.recipes` | `css/recipes.css` | Components. Panels, buttons, inputs, segmented, selection controls, accordion, avatar, marks, accent cards, code block, tooltip, tables, overlays |

Consumer CSS is unlayered and always wins; overrides never need
`!important`. The three files also work as plain `<link>` tags in order,
tokens then utilities then recipes, without `index.css`.

## Contract properties

Recipes read three custom properties plus the density knobs. Set them inline
or on a wrapper to re-key a subtree.

- `--accent` is the per-instance accent, read by accent cards, spines, solid
  marks, avatars, hero values, and the terminal caret. Defaults to mauve. The
  documented cycle is mauve, teal, yellow, blue, peach, pink.
- `--tone` is the semantic tint for chips, banners, and icon buttons. The
  `.cn-tone-*` classes set it.
- `--hard-offset-color` is the hard offset's color. Crust by default;
  primary buttons override it.

## Mono scarcity

The mono face is reserved for code-like content, meaning `.cn-code`,
`.terminal`, `.codeblock`, and actual code or CLI strings. Every other role is sans at the
specified size, weight, and tracking; numbers keep
`font-variant-numeric: tabular-nums` on the sans face. Any `var(--mono)`
outside a code or terminal context is a violation.

## Depth over borders

Inset surfaces are borderless and transparent. Inputs, wells, the terminal,
progress tracks, and engaged states are defined by their inner shadow alone,
and input focus adds the mauve ring over the inset. Hairline borders appear
only on raised surfaces, panel and popover, and on tinted semantic surfaces,
chip-tone and banner. One exception: checkbox and radio keep an edge, because
at 20px the carve alone is invisible.

## Density knob

`data-density="compact"` on any ancestor shrinks the control heights
`--control-h`, `--control-h-sm`, and `--input-h`, and drops `--pane-radius`
from 16px to 12px. No other numbers change.
