# catppuccin-neu

The Catppuccin Mocha + neumorphic dark design system shared by consenStat,
harness-racer, salt, skill-issue, and varchar — formalized as a package.
Dark-only, one top-left light source, mauve as the sole accent, a strict
mono/sans split, and a hard offset shadow with a half-slide press on
clickable controls. [SPEC.md](./SPEC.md) is the single source of truth.

## Three layers

Everything ships as plain CSS in three cascade layers, declared by
`css/index.css`:

| Layer | File | Contents |
|---|---|---|
| `cn.tokens` | `css/tokens.css` | Mocha palette, font stacks, depth shadows, contract props, density knobs, reset, focus/selection, motion |
| `cn.utilities` | `css/utilities.css` | Single-purpose `cn-*` classes — depth, press behavior, type roles, color, borders, role-named radii |
| `cn.recipes` | `css/recipes.css` | Components — panels, buttons, inputs, segmented, marks, entity cards, tables, overlays |

Consumer CSS is unlayered and therefore always wins; overrides never need
`!important`. The three files also work as plain `<link>` tags in order
(tokens → utilities → recipes) without `index.css`.

## Consuming

**As a git dependency (Vite/bundler):**

```sh
pnpm add github:BalajiLeninrajan/design#<tag>
```

```js
import "catppuccin-neu/css/index.css";
```

**Vendored (zero-build):** copy the four CSS files into your static dir and
link them:

```sh
npx catppuccin-neu-sync public/styles
# or: node node_modules/catppuccin-neu/scripts/sync.mjs public/styles
```

Either way, link the fonts on every public surface: Inter (100..900) and
JetBrains Mono (100..800) via Google Fonts.

Tailwind users can additionally pull the token vocabulary into utility names
via `tailwind/preset.cjs` (v3) or `tailwind/theme.css` (v4 `@theme`).

## Contract properties

Recipes read four custom properties — set them inline or on a wrapper to
re-key a subtree:

- `--entity-color` — per-entity identity (cards, spines, hero metrics).
  Cycle: mauve, teal, yellow, blue, peach, pink.
- `--tone` — semantic tint for chips, banners, icon buttons
  (`.cn-tone-red` … set it for you).
- `--accent` — solid-mark fill.
- `--hard-offset-color` — the hard offset's color (crust by default;
  primary buttons override it).

## Density knob

`data-density="compact"` on any ancestor shrinks the control heights
(`--control-h`, `--control-h-sm`, `--input-h`) and drops the panel radius
`--pane-radius` from 16px to 12px. No other numbers change.
