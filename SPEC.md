# catppuccin-neu — design system spec

The formalization of the Catppuccin Mocha + neumorphic design language shared by
consenStat, harness-racer, salt, skill-issue, and varchar. This file is the
**single source of truth**: implementation, showcase, and backports follow it.
The skill at `~/.claude/skills/catppuccin-neu/` (SKILL.md + `reference/*.css`)
is the base layer this spec extends; where this spec and the skill differ, this
spec wins.

## Decision record (all approved)

1. **Showcase**: Preact + Vite, deployed as Cloudflare Workers static assets.
2. **Distribution**: consumed as an npm dependency via git URL
   (`github:BalajiLeninrajan/design#<tag>`). Zero-build consumers vendor the CSS
   via `scripts/sync.mjs`. No CDN.
3. **Depth canon — the consenStat dialect, toned down**: the hard offset shadow
   is available to *any* clickable control, and clickable controls in the shipped
   recipes default to it (primary, secondary, segmented at rest). The press is a
   **half-slide**: rest `box-shadow: 4px 4px 0 <offset-color>`; hover
   `translate(-1px, -1px)`; active `translate(2px, 2px)` with the shadow
   shrinking to `2px 2px 0 <offset-color>`. Primary buttons keep the hard offset
   fleet-wide — softening it is a violation.
4. **skill-issue** gets a full restyle into the system (separate backport).
5. **Naming**: `--entity-color` is the one per-entity property.
   `--lane-color`/`--track-color`/`--tier-color` are project-local legacy.
6. **Radii cap at 16px.** 12px arrives only via the density knob. The blessed
   scale is 16 / 13 / 10 / 8 / 4 / 999 / 50%.
7. **Button labels are sans.** The mono/sans split follows the skill exactly.
8. **Fonts**: Inter (100..900) + JetBrains Mono (100..800) via Google Fonts
   `<link>` on every public surface; system fallbacks per the token stacks.
9. **color-mix is `in srgb` everywhere.** `in oklab` is blessed *only* for
   data-visualization ramps (documented exception, salt's heatmap).

## Repo layout

```
design/
├── package.json          # name "catppuccin-neu", version, exports ./css/* ./tailwind/* ./scripts/*
├── SPEC.md               # this file
├── README.md             # short: what it is, how to consume (git dep + sync), layer model
├── css/
│   ├── tokens.css        # layer cn.tokens
│   ├── utilities.css     # layer cn.utilities
│   ├── recipes.css       # layer cn.recipes
│   └── index.css         # layer declaration + imports — the one-line entry point
├── tailwind/
│   ├── preset.cjs        # Tailwind v3 preset (consenStat)
│   └── theme.css         # Tailwind v4 @theme file (future)
├── scripts/
│   └── sync.mjs          # node sync.mjs <destDir> — copies css/*.css into a consumer's public/
└── showcase/             # Preact + Vite gallery (see § Showcase)
```

## Cascade model

`css/index.css`:

```css
@layer cn.tokens, cn.utilities, cn.recipes;
@import "./tokens.css" layer(cn.tokens);
@import "./utilities.css" layer(cn.utilities);
@import "./recipes.css" layer(cn.recipes);
```

Consumer CSS is unlayered (or in a later layer) and therefore always wins —
overrides never need `!important`. The three files must also work when loaded as
plain `<link>` tags in order (tokens → utilities → recipes) *without* index.css,
so each file must not depend on being inside a named layer to function
(no cross-file layer-order tricks beyond source order).

## css/tokens.css — layer `cn.tokens`

Start from the skill's `reference/tokens.css` **verbatim** (palette, aliases,
font stacks, the four neu shadows + primitives, reset, focus/selection,
`.scroll-well`, `.app-shell` wash, keyframes, `.page-enter`, `.live-dot`,
reduced-motion block). Then add, in the same `:root`:

```css
/* Promoted shadows — previously magic literals in 3+ projects */
--shadow-pop:  0 24px 70px rgb(17 17 27 / .78);                 /* popovers/modals/toasts float */
--shadow-cast: 0 5px 12px var(--neu-dark-soft);                 /* topbar cast */
--shadow-mark: 2px 2px 5px var(--neu-dark-soft), inset 0 1px rgb(255 255 255 / .1);  /* solid-mark mini-drop */

/* Contract properties — the documented extension points */
--entity-color: var(--mauve);      /* per-entity identity; set inline from data */
--tone: var(--peach);              /* semantic tint for chips/banners */
--accent: var(--mauve);            /* solid-mark fill */
--hard-offset-color: var(--crust); /* the hard offset's color; primary buttons override */

/* Density knobs */
--control-h: 46px;                 /* primary/secondary button height */
--control-h-sm: 34px;              /* small controls */
--input-h: 42px;
--pane-radius: 16px;               /* panel-tier radius */
```

And after `:root`:

```css
[data-density="compact"] {
  --control-h: 30px;
  --control-h-sm: 24px;
  --input-h: 30px;
  --pane-radius: 12px;
}
```

The entity color cycle (documented in a comment): `#cba6f7, #94e2d5, #f9e2af,
#89b4fa, #fab387, #f5c2e7` (mauve, teal, yellow, blue, peach, pink).

## css/utilities.css — layer `cn.utilities`

Single-purpose classes, **blessed values only** — no utility takes a numeric
parameter. Prefix `cn-`.

### Depth

| Class | Value |
|---|---|
| `.cn-raised` | `box-shadow: var(--neu-raised)` |
| `.cn-raised-soft` | `box-shadow: var(--neu-raised-soft)` |
| `.cn-raised-lit` | `box-shadow: var(--neu-raised), inset 1px 1px color-mix(in srgb, var(--surface-2) 30%, transparent)` |
| `.cn-inset` | `box-shadow: var(--neu-inset)` |
| `.cn-inset-soft` | `box-shadow: var(--neu-inset-soft)` |
| `.cn-pop` | `box-shadow: var(--shadow-pop)` |
| `.cn-cast` | `box-shadow: var(--shadow-cast), inset 0 1px color-mix(in srgb, var(--surface-1) 30%, transparent)` |
| `.cn-mark-drop` | `box-shadow: var(--shadow-mark)` |
| `.cn-hard` | `box-shadow: 4px 4px 0 var(--hard-offset-color)` |
| `.cn-hard-lg` | `box-shadow: 10px 10px 0 var(--hard-offset-color)` (tilted hero card) |
| `.cn-hard-sm` | `box-shadow: 3px 3px 0 var(--hard-offset-color)` (compact density) |
| `.cn-flat` | `box-shadow: none` |

### Interaction

- `.cn-pressable` — `transition: transform .16s, background .16s, border-color .16s, box-shadow .16s;` hover `translateY(-1px)`, active `translateY(1px)` + `box-shadow: var(--neu-inset-soft)`. The soft-control press.
- `.cn-pressable-slide` — same transition; hover `translate(-1px,-1px)`, active `translate(2px,2px)` + shadow `2px 2px 0 var(--hard-offset-color)`. **Legal only combined with `.cn-hard`.** The canonical half-slide.
- `.cn-engaged` — the selected/toggled state: `transform: translateY(1px); box-shadow: var(--neu-inset); border-color: color-mix(in srgb, var(--mauve) 56%, var(--surface-1)); background: color-mix(in srgb, var(--mauve) 7%, var(--base));`

Hover/active variants apply under `:hover:not(:disabled)` / `:active:not(:disabled)`.

### Type roles (no bare font-family utility exists)

Mono roles:
- `.cn-label` — `font: 650 11px/1 var(--mono); letter-spacing: .04em; text-transform: uppercase; color: var(--overlay-2);`
- `.cn-microlabel` — `font: 700 9px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--overlay-1);`
- `.cn-value` — `font: 650 21px/1 var(--mono); font-variant-numeric: tabular-nums;`
- `.cn-value-lg` — 28px variant, color `var(--entity-color, var(--mauve))` opt-out via color utilities.
- `.cn-meta` — `font: 550 11px/1.5 var(--mono); font-variant-numeric: tabular-nums; color: var(--overlay-1);`
- `.cn-eyebrow` — `font: 700 11px/1 var(--mono); letter-spacing: .08em; text-transform: uppercase; color: var(--mauve); display: flex; align-items: center; gap: 8px;`
- `.cn-code` — `font: 500 13px/1.6 var(--mono); font-variant-numeric: tabular-nums;`

Sans roles:
- `.cn-display` — `font-size: clamp(38px, 5vw, 64px); line-height: .98; letter-spacing: -.055em; font-weight: 820; text-wrap: balance;` (+ `em { color: var(--mauve); font-style: normal; }`)
- `.cn-display-sm` — `clamp(30px, 4.6vw, 46px)`, `-.045em`, weight 820.
- `.cn-title` — `font-size: 20px; font-weight: 800; letter-spacing: -.03em;`
- `.cn-name` — `font: 700 13px/1.3 var(--sans); color: var(--text);` (proper names inside mono contexts)
- `.cn-lede` — `font-size: 16px; line-height: 1.65; color: var(--subtext-1); max-width: 690px;`
- `.cn-copy` — `font-size: 13px; line-height: 1.6; color: var(--subtext-0);`

### Color

- Text: `.cn-text-{text,subtext-1,subtext-0,overlay-2,overlay-1,overlay-0,mauve,pink,red,green,peach,yellow,blue,teal,lavender}` plus `.cn-text-entity` (`var(--entity-color)`), `.cn-text-tone` (`var(--tone)`).
- Backgrounds: `.cn-bg-base`, `.cn-bg-mantle`, `.cn-bg-crust`, `.cn-bg-well` (`color-mix(in srgb, var(--crust) 38%, var(--mantle))`), `.cn-bg-head` (`color-mix(in srgb, var(--crust) 30%, var(--mantle))`), `.cn-tint` (`color-mix(in srgb, var(--tone) 7%, transparent)`), `.cn-tint-entity` (`linear-gradient(135deg, color-mix(in srgb, var(--entity-color) 8%, var(--mantle)), var(--mantle) 48%)`).
- Tone setters: `.cn-tone-{red,green,peach,yellow,blue,mauve}` set `--tone` only.

### Borders

- `.cn-edge` — `border: 1px solid color-mix(in srgb, var(--surface-2) 40%, transparent);`
- `.cn-edge-soft` — surface-1 38% mix (wells, inner separators).
- `.cn-edge-line` — `border: 1px solid var(--surface-0);` (row separators, footer rules)
- `.cn-edge-mauve` — mauve 30% mix. `.cn-edge-tone` — tone 25% into surface-0. `.cn-edge-entity` — entity 28% into surface-0.
- `.cn-edge-dashed` — `border: 1px dashed var(--surface-1);` (the only dashed border)

### Radii (role-named; no numeric escape hatch)

`.cn-r-panel` (`var(--pane-radius)`), `.cn-r-card` (13px), `.cn-r-control` (10px),
`.cn-r-mark` (8px), `.cn-r-chip` (4px), `.cn-r-pill` (999px), `.cn-r-round` (50%).

### Structure

- `.cn-spine` — position:relative; `::before` 4px left bar in `var(--entity-color)`, `inset: 12px auto 12px 0; border-radius: 0 6px 6px 0;`
- `.cn-scrim` — fixed inset overlay: `background: color-mix(in srgb, var(--crust) 74%, transparent); backdrop-filter: blur(6px); z-index: 70;`
- `.cn-sr-only` — standard clip pattern.
- `.cn-hidden` — `display: none !important;`
- (`.scroll-well`, `.app-shell`, `.page-enter`, `.live-dot` already live in tokens.css; do not duplicate.)

## css/recipes.css — layer `cn.recipes`

Geometry and depth from the skill's `reference/components.css`, updated to the
approved canon. Every recipe reads tokens/contract props only. The set:

**Surfaces**: `.panel` (+`.panel-heading`, `.panel-footer`, `.panel.is-tilted`
{ rotate 1.2deg + `.cn-hard-lg`-equivalent shadow, flattened ≤1060px }),
`.well`, `.terminal` (the skill's `.stream`, renamed; + `.terminal .caret`),
`.topbar`, `.app-shell` wash (tokens), `.empty-state`.

**Controls** (all button labels sans; heights from density knobs):
- `.btn` base + `.btn-primary` — solid mauve, crust text, hard offset
  `4px 4px 0 color-mix(in srgb, var(--mauve) 25%, var(--surface-0))` +
  `inset 1px 1px rgb(255 255 255 / .16)`; hover pink + `translate(-1px,-1px)`;
  active half-slide (shadow → `2px 2px 0 …`); disabled `.35` opacity + inset-soft.
- `.btn-secondary` — `--base` bg, `cn-edge` border, **hard offset crust** (the
  canon default); hover mauve-mix border + `translate(-1px,-1px)`; active
  half-slide. A project can soften by composing `.cn-flat .cn-raised-soft`.
- `.btn-ghost` — transparent, `--subtext-0`, surface-0 40% wash on hover.
- `.btn-flat` — toolbar button: transparent border, flat, `.cn-engaged`-style when `[aria-pressed="true"]`/`.active`.
- `.btn-text` — mauve inline text button.
- `.btn-icon` — 32px grid center, overlay-1, tints toward `var(--tone)` on hover.
- `.btn-add` — the dashed add affordance.
- `.field` / `.field label` / `.input` — 9-10px radius, inset well
  (`color-mix(in srgb, var(--crust) 62%, var(--mantle))`), height `var(--input-h)`,
  mauve 20% focus ring layered over the inset. `.input-lg` (58px hero variant),
  `.search` wrapper (absolute icon + padded input).
- `.segmented` + `.segmented > *` — options **hard offset at rest** (crust), min
  58px (respects density), hover `translate(-1px,-1px)`, active press = half-slide,
  selected `.active` = `.cn-engaged` treatment; `.is-stacked` variant.
- `.stepper` — phase track chips.

**Marks**: `.mark-solid` (28px, `var(--accent)` fill, `--shadow-mark`),
`.chip` (raised-soft mono pill), `.chip-tone` (tone-tinted 4px-radius tag),
`.banner` (tone tint band, inset-soft), `.live-dot` (tokens).

**Data**: `.entity-card` (entity border/gradient/spine per skill), `.metric`
(+`.is-hero`), `.stat-row`/`.stat-strip`, `.progress-track` (+ accent-gradient
fill span), `.table-neu` (opt-in class on `<table>` — mantle mono th, tabular td,
row hover inset; `td[data-label]` mobile card-collapse contract; `.cell-name`),
`.ranked-row`.

**Overlays** (all `--shadow-pop`, never neu): `.popover` (anchored),
`.modal` (centered in `.cn-scrim`, recessed header band), `.drawer` (side sheet),
`.toast` (fixed corner stack item).

**Furniture**: `.eyebrow`, `.display-title`, `.lede` (aliases of the type roles
kept for skill compatibility), `.footer-neu`, `main` width pattern documented
(not globally styled — recipes never style bare element selectors except the
existing tokens reset; `.table-neu` scopes all table styling).

Responsive: fold the skill's `reference/responsive.css` breakpoints
(1060/760/520) into the relevant recipes.

## tailwind/preset.cjs (v3)

`theme.extend`: colors (all palette names → `var(--…)`, plus `entity: "var(--entity-color)"`,
`tone: "var(--tone)"`), fontFamily `sans`/`mono` → token stacks,
borderRadius `{ panel: "var(--pane-radius)", card: "13px", control: "10px", mark: "8px", chip: "4px" }`,
boxShadow `{ "neu-raised", "neu-raised-soft", "neu-inset", "neu-inset-soft", "pop", "cast", "hard", "hard-lg" }` → the token values,
height/minHeight `{ control: "var(--control-h)", input: "var(--input-h)" }`.
No plugin logic; recipes come from the CSS files.

`tailwind/theme.css` (v4): the same mappings as `@theme` custom properties.

## scripts/sync.mjs

`node scripts/sync.mjs <destDir>` (also exposed as bin `catppuccin-neu-sync`):
copies `css/tokens.css`, `css/utilities.css`, `css/recipes.css`, `css/index.css`
into `<destDir>`, creating it if needed; prints what it copied; exits non-zero on
failure. Node ≥ 18, no dependencies.

## Showcase (`showcase/`)

Preact + Vite (`@preact/preset-vite`), pnpm, TypeScript optional (plain JSX is
fine). `wrangler.jsonc` deploying `dist/` as Cloudflare Workers static assets.
`index.html` links Google Fonts (Inter 100..900, JetBrains Mono 100..800).
Imports `../css/index.css` directly (relative — the showcase dogfoods the
package source).

One-page gallery, topbar + section nav, sections:

1. **Foundation** — palette swatches (name + hex, mono labels), type roles
   specimen, the four depth tokens on raised cubes, contract props explainer.
2. **Buttons & controls** — every `.btn-*` in rest/hover/active/disabled,
   segmented (default + stacked), stepper, the half-slide press documented.
3. **Forms** — field/label/input/input-lg/search, focus states.
4. **Marks** — chip, chip-tone (all tones), banner (all tones), mark-solid,
   live-dot.
5. **Data** — entity cards (full 6-color cycle), metric/stat variants, progress,
   table-neu with mobile collapse, ranked rows.
6. **Overlays** — popover, modal (open on demand), drawer, toast.
7. **Playground** — density toggle (`data-density`), tone picker, entity-color
   picker, applied live to a specimen panel.

Every specimen shows its class string in a copyable `.cn-code` line (click to
copy). The showcase is the visual-regression reference for backports: every
recipe × every state must appear at least once.

## Verification rules (what reviewers check)

1. Every `box-shadow` in utilities/recipes is one of: the four neu tokens,
   `--shadow-pop/cast/mark`, the hard-offset family, a focus-ring `0 0 0 2px`
   mauve-mix layered on an inset, or a documented composite of these.
2. Every color literal is a Mocha hex from tokens.css, `currentColor`,
   `transparent`, a `color-mix(in srgb, …)` of tokens, or the two blessed
   whites (`rgb(255 255 255 / .16)` primary highlight, `/.1` mark highlight).
3. Every radius resolves to the blessed scale (16/13/10/8/4/999/50% — 12 only
   via `--pane-radius` under compact density).
4. Mono/sans split: no sans in a mono role, no mono button labels, numbers get
   `tabular-nums`.
5. Transitions `.16–.2s` (`.35s` progress); all four keyframes only; the
   reduced-motion block survives.
6. `:focus-visible` outline never removed; `::selection` inversion intact.
7. Files parse standalone and via index.css layers; recipes reference only
   tokens/contract props; nothing depends on `!important`.
