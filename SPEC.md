# catppuccin-neu design system spec

The Catppuccin Mocha + neumorphic design language, packaged for all future
projects. This file and the CSS in `css/` are the single source of truth.

Ground rules:

- **Generic content.** The docs site, README, and CSS comments never reference
  the source projects. Examples use neutral product content (dashboards,
  settings, invoices, messages).
- **Names describe style, never purpose.** Class names describe appearance or
  genre (chip, banner, panel, dashed, tilted, spine), never an action or role
  (add, back, search, submit).
- **No exceptional elements.** Every recipe is general purpose. Nothing ships
  as single-use; anything that cannot be generalized lives in a project's own
  local layer instead.
- **Sans by default; mono is allowed, not assigned.** Every shipped role
  and recipe is sans except the code surfaces (`.cn-code`, `.terminal`,
  `.codeblock`). Mono is not forbidden elsewhere: in the rare right
  circumstance any text may take it, as a deliberate consumer-layer choice —
  the system just never makes that choice for you. Sans-face numbers keep
  `font-variant-numeric: tabular-nums`.
- **Uppercase is scarce.** Only two voices shout: `.cn-eyebrow` (one per
  page) and `.cn-microlabel` (caps buy legibility at 10px). Every other
  role — labels, field labels, chips, steppers — is sentence case.
- **Depth replaces borders on inset surfaces.** Inset surfaces are borderless
  and paint no background of their own; the carve defines them. Hairlines
  stay on raised surfaces (where the lit edge needs support) and on tinted
  semantic surfaces (chip-tone, banner). Exception: small selection controls
  (checkbox, radio) keep a hairline because at 20px the carve alone is
  invisible; the switch paddle keeps its edge for the same reason.
- **color-mix is `in srgb` everywhere.** `in oklab` is blessed only for
  data-visualization ramps (documented exception).
- **Radii cap at 16px.** 12px enters only via `--pane-radius` under compact
  density. Blessed scale: 16 / 13 / 10 / 8 / 4 / 999 / 50%, plus 6px on
  decorative sub-corners (spine tips, switch paddle) and the band pattern
  `calc(<parent radius> - 1px)`.
- **Fonts**: Inter (100..900) + JetBrains Mono (100..800) via Google Fonts
  `<link>` on every public surface; system fallbacks per the token stacks.

## Distribution

Consumed as an npm dependency via git URL
(`github:BalajiLeninrajan/catppuccin-neu#<tag>`) — the installed package is
the single source, and no consumer commits copies of its CSS. Bundled apps
import `catppuccin-neu/css/index.css` from node_modules and let the bundler
inline it. Zero-build surfaces generate their served copies from the
installed package via `catppuccin-neu-sync` in a pre-dev/pre-build/pre-deploy
hook, and the generated files are gitignored. A version bump is just the pin
bump.

The CDN is the third path, and only for zero-build surfaces with no
`package.json` at all — a handful of hand-written pages, where an install
step would exist solely to move four files. jsDelivr serves this repo's tags
straight from GitHub; there is no publish step and nothing to configure:

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.1.3/css/index.css">
```

Four rules govern it. Pin a full tag — `@main` and truncated ranges float and
cache for 12h, a full tag is immutable and cached for a year. Link
`index.css`, never the three files: the relative `@import`s resolve against
the CDN path and keep their `layer()` wrappers, so consumer CSS still wins
unlayered. Tags are never moved once pushed — a moved tag leaves the CDN
serving what it cached while the git dep resolves the new commit, and the two
disagree silently. Anything with a build uses node_modules regardless; the
pin belongs in one file, not in every `<head>`.

The repo is public at github.com/BalajiLeninrajan/catppuccin-neu, tagged
v0.1.3; the docs deploy as the `catppuccin-neu` Cloudflare Worker at
https://catppuccin-neu.balajileninrajan.dev.

## Repo layout

```
catppuccin-neu/
├── package.json          # name "catppuccin-neu", exports ./css/* ./tailwind/* ./scripts/*
├── SPEC.md               # this file
├── README.md             # short: what it is, how to consume, layer model
├── css/
│   ├── tokens.css        # layer cn.tokens
│   ├── utilities.css     # layer cn.utilities
│   ├── recipes.css       # layer cn.recipes
│   └── index.css         # layer declaration + imports, the one-line entry point
├── tailwind/
│   ├── preset.cjs        # Tailwind v3 preset
│   └── theme.css         # Tailwind v4 @theme file
├── scripts/
│   └── sync.mjs          # node sync.mjs <destDir> copies css/*.css into a consumer
└── showcase/             # Preact + Vite docs site (see Docs site)
```

## Cascade model

`css/index.css`:

```css
@layer cn.tokens, cn.recipes, cn.utilities;
@import "./tokens.css" layer(cn.tokens);
@import "./recipes.css" layer(cn.recipes);
@import "./utilities.css" layer(cn.utilities);
```

Utilities sit above recipes, Tailwind's order. A `cn-*` class on an element
beats the recipe on that element: `well cn-bg-well` fills the well,
`btn-secondary cn-raised-soft` softens the offset, `panel cn-p-16` pads the
panel. Utilities apply only where written, so nothing composes by accident;
what the order buys is that a consumer never restates a recipe to adjust it.
(Until v0.2.0 the order was the reverse, and three consumers carried the same
comment: "the recipe's own transparent ground wins the cascade order." The
one utility that had to move was `.cn-scrim`, whose exit un-blur lives with
the overlays in recipes; it is a recipe now, name unchanged.)

Consumer CSS is unlayered (or in a later layer) and always wins; overrides
never need `!important`. The three files also work as plain `<link>` tags in
order (tokens, recipes, utilities) without index.css: no file depends on being
inside a named layer. With Tailwind v4, import the package before
`tailwindcss` so its layers are declared first and Tailwind's utilities layer
stays on top.

## css/tokens.css (layer cn.tokens)

The foundation: Mocha palette (do not substitute hexes), semantic aliases
(`--line`, `--muted`, `--soft`), font stacks, depth tokens, contract props,
density knobs, reset, focus/selection, `.scroll-well`, `.app-shell` wash,
keyframes, `.page-enter`, `.live-dot`, reduced-motion block.

### Depth tokens

Light source is top-left: dark shadow bottom-right, lift highlight top-left.
Every elevation is one of these four (soft = smaller offset and blur at
reduced strength, so each pair reads as two distinct elevations at a glance):

```css
--neu-dark: rgb(17 17 27 / .66);
--neu-dark-soft: rgb(17 17 27 / .30);
--neu-raised: 8px 8px 18px var(--neu-dark), -4px -4px 10px rgb(69 71 90 / .22);
--neu-raised-soft: 3px 3px 8px rgb(17 17 27 / .44), -2px -2px 5px rgb(69 71 90 / .16);
--neu-inset: inset 3px 3px 7px var(--neu-dark), inset -3px -3px 7px rgb(69 71 90 / .24);
--neu-inset-soft: inset 2px 2px 5px rgb(17 17 27 / .52), inset -2px -2px 4px rgb(69 71 90 / .18);
```

Promoted shadows (shared composites, never magic literals):

```css
--shadow-pop:  0 24px 70px rgb(17 17 27 / .78);   /* popovers/modals/toasts float */
--shadow-cast: 0 5px 12px var(--neu-dark-soft);   /* topbar cast */
--shadow-mark: 2px 2px 5px var(--neu-dark-soft), inset 0 1px rgb(255 255 255 / .1);
```

### Contract properties

The documented extension points. Set them inline (or on a wrapper) to re-key a
whole subtree; every recipe reads them.

```css
--accent: var(--mauve);            /* per-instance accent: cards, spines, marks, hero values */
--tone: var(--peach);              /* semantic tint for chips/banners */
--hard-offset-color: var(--crust); /* the hard offset's color; primary buttons override */
--hard-offset: 4px;                /* the hard offset's distance; compact tightens it */
```

Accent cycle: `#cba6f7, #94e2d5, #f9e2af, #89b4fa, #fab387, #f5c2e7`
(mauve, teal, yellow, blue, peach, pink).

### Density knobs

```css
--control-h: 46px;                 /* primary/secondary button height */
--control-h-sm: 34px;              /* small controls */
--input-h: 42px;
--pane-radius: 16px;               /* panel-scale radius */

[data-density="compact"] {
  --hard-offset: 3px;
  --control-h: 30px;
  --control-h-sm: 24px;
  --input-h: 30px;
  --pane-radius: 12px;
}
[data-density="dense"] {
  --hard-offset: 2px;
  --control-h: 28px;
  --control-h-sm: 22px;
  --input-h: 28px;
  --pane-radius: 12px;
}
```

Compact was tuned for forms. Dense is for instrument panels, and the data
surfaces follow it from a block at the end of recipes.css: table cells and
headers `6px 9px` with 12px cells, chips `4px 8px`, tone chips `2px 4px`,
panel bands 44px with 14px titles, `.panel-body` `12px 14px`, flat buttons
26px, the topbar 44px, code wells and terminal pre tightened, empty states
at 120px. A consumer running dense should need no per-cell override.

Fixed-size exceptions that do not track density: checkbox and radio (20px),
switch (50x28), avatar (32px, 44px for `.is-lg`).

### Mix tokens

Four custom properties carry the `color-mix` expressions every surface
shares, so a change is one line and a Tailwind consumer gets them as
`border-edge`, `border-edge-soft`, `bg-tint`, `bg-wash`:

- `--edge`: surface-2 40% into transparent, the raised-surface hairline
  (panel, secondary button, `.cn-edge`).
- `--edge-soft`: surface-1 38% into transparent, inner separators
  (`.cn-edge-soft`, stat strips).
- `--tint`: the tone at 4% into transparent, every tinted surface
  (banner, tone chip, `.cn-tint`, the invalid field's well).
- `--wash`: mauve 7% into base, the engaged state (`.cn-engaged`, pressed
  flat buttons, the selected segment).

They resolve at the use site, so re-keying `--tone` on a subtree re-keys
`--tint` with it.

### Motion tokens

Two curves, a spring, and three durations, all on `:root`:

- `--ease-out: cubic-bezier(.16, 1, .3, 1)` for anything answering the
  pointer or arriving: it covers most of its travel early and lands.
- `--ease-in: cubic-bezier(.7, 0, .84, 0)` for anything leaving.
- `--ease-spring: cubic-bezier(.3, 1.4, .4, 1)` for anything returning; it
  overshoots by about a pixel, which is the difference between a picture of
  a button and a button.
- `--t-fast: .16s`, `--t-base: .22s`, `--t-slow: .32s`.

Presses go down on the fast-out in .08s and come back on the spring.
Entrances take the fast-out; exits take the ease-in in .14s. No transition
in the package rides the browser default curve.

### Depth canon: the hard offset and the half-slide

The hard offset shadow is available to any clickable control, and clickable
controls in the shipped recipes default to it (primary, secondary, segmented
at rest). The press is a half-slide, always half the offset:

- rest: `box-shadow: var(--hard-offset) var(--hard-offset) 0 var(--hard-offset-color)`
- hover: `translate(-1px, -1px)`
- active: `translate(calc(var(--hard-offset) / 2), calc(var(--hard-offset) / 2))`
  with the shadow shrinking to the same half offset
- timing: down on `--ease-out` in .08s, back up on `--ease-spring` over
  `--t-fast`

Primary buttons keep the hard offset fleet-wide; softening it is a violation.

### Global rules worth knowing

- `:focus-visible { outline: 2px solid var(--mauve); outline-offset: 3px; }`
  and `::selection` inversion (crust on mauve), everywhere, no exceptions.
  The ring settles outward: `:not(:focus-visible)` holds the offset at 0 and
  focus eases it to 3px over .15s on `--ease-out`, so focus arrives instead
  of blinking on.
- Bare links get `border-radius: 4px` so keyboard outlines follow the system
  geometry, never a sharp rectangle.
- Links ship styled from the tokens reset: mauve at rest, pink on hover
  (color transitions over `--t-fast`) —
  `.btn-text`'s pair exactly, never underlined, so every anchor in the
  system speaks one accent language. Recipes that restyle anchors
  (buttons, link-wrapped cards) win from their later layer.
- The copy voice is a given, not an opt-in: the tokens reset sets `body` to
  `400 14px/1.6 var(--sans)` in subtext-0, headings to `--text`, and lists
  to 20px indent, 8px row rhythm, overlay-1 markers. Bare content inside
  folds, panels, and modals just reads correctly. This is safe because
  every recipe pins its own `font` shorthand — chrome never inherits the
  voice; consumer chrome built on bare elements (a `ul` nav) opts out
  locally. The bare-element ban still binds the utility and recipe layers.
- `em` is the accent, everywhere: mauve, upright — the display-title
  treatment made a given by the tokens reset. True italics use `<i>`.
- `.app-shell` is a flex column and `.app-shell > main` absorbs the slack,
  so the footer sits at the viewport bottom even when a page runs short.
- `.page-enter` animates its children, not itself, 40ms apart (the sixth
  and later share the .2s delay) on `--ease-out`, so the page assembles
  instead of arriving as one slab. Fill is `backwards` only: the from-state
  holds through each child's delay and nothing is held after, so no element
  becomes a permanent containing block for fixed descendants (scrims,
  modals, drawers, toasts).
- Five keyframes only: `enter`, `spin`, `pulse`, `blink`, and `cast` (the
  topbar's scroll-driven shadow).
- The reduced-motion block collapses all animation and transitions.

## css/utilities.css (layer cn.utilities)

Single-purpose classes, blessed values only; no utility takes a numeric
parameter. Prefix `cn-`.

### Depth

| Class | Value |
|---|---|
| `.cn-raised` | `var(--neu-raised)` |
| `.cn-raised-soft` | `var(--neu-raised-soft)` |
| `.cn-inset` | `var(--neu-inset)` |
| `.cn-inset-soft` | `var(--neu-inset-soft)` |
| `.cn-pop` | `var(--shadow-pop)` (overlays only, never neu) |
| `.cn-cast` | `var(--shadow-cast)` + lit hairline (surface-1 30% mix) |
| `.cn-mark-drop` | `var(--shadow-mark)` |
| `.cn-hard` | `var(--hard-offset) var(--hard-offset) 0 var(--hard-offset-color)` |
| `.cn-hard-lg` | `10px 10px 0` (tilted hero card) |
| `.cn-hard-sm` | `3px 3px 0` (fixed small offset) |
| `.cn-flat` | `none` |

### Interaction

- `.cn-pressable`: transform and box-shadow on `--t-fast --ease-spring`,
  background and border-color on `--t-fast`; active switches to `--ease-out`
  at .08s (down crisp, up on the spring). Hover `translateY(-1px)`, active
  `translateY(1px)` + `--neu-inset-soft`. The soft-control press.
- `.cn-pressable-slide`: same transition; hover `translate(-1px,-1px)`, active
  the half-slide (`calc(var(--hard-offset) / 2)` translate and shadow). Legal
  only combined with `.cn-hard`.
- `.cn-engaged`: the selected/toggled state, pressed in, mauve-keyed,
  borderless: `transform: translateY(1px); box-shadow: var(--neu-inset);
  border-color: transparent; background: color-mix(in srgb, var(--mauve) 7%,
  var(--base));`. Declared after the edge utilities so the cleared
  border-color wins over a composed `.cn-edge-*`.

Hover/active variants apply under `:hover:not(:disabled)` /
`:active:not(:disabled)`.

### Type roles

No bare font-family utility exists: pick the role, not the face. Every role
is sans except `.cn-code`; mono elsewhere is a consumer-layer call. Uppercase
appears only on `.cn-eyebrow` and `.cn-microlabel`.

- `.cn-label`: `650 12px/1 var(--sans)`, `.01em`, sentence case, overlay-2.
- `.cn-microlabel`: `700 10px/1 var(--sans)` (the one exception to the 12px floor), `.08em`, uppercase, overlay-1.
- `.cn-value`: `650 21px/1 var(--sans)`, tabular-nums.
- `.cn-value-lg`: 28px variant, color `var(--accent)` (opt out via a color
  utility).
- `.cn-meta`: `550 12px/1.5 var(--sans)`, tabular-nums, overlay-1.
- `.cn-eyebrow`: `700 12px/1 var(--sans)`, `.08em`, uppercase, mauve, flex
  row with 8px gap.
- `.cn-code`: `500 13px/1.6 var(--mono)`, tabular-nums. The inline code
  voice, and the only shipped mono role.
- `.cn-display`: `clamp(32px, 4vw, 46px)`, line-height .98, `-.03em`, weight
  760, `text-wrap: balance`; `em` renders mauve, no italic. (820 with
  `-.055em` crashed punctuation into letters at 46px; Inter's optical size
  already tightens at display sizes, so the manual tracking doubled up.)
- `.cn-display-sm`: `clamp(26px, 3.4vw, 36px)`, `-.03em`, weight 760.
- `.cn-title`: 20px, weight 800, `-.03em`.
- `.cn-name`: `700 13px/1.3 var(--sans)`, `var(--text)` (emphasized proper
  names).
- `.cn-lede`: 16px/1.65, subtext-1, max-width 690px.
- `.cn-copy`: 14px/1.6, subtext-0.

### Color

- Text: `.cn-text-{text,subtext-1,subtext-0,overlay-2,overlay-1,overlay-0,
  mauve,pink,red,green,peach,yellow,blue,teal,lavender}`, `.cn-text-accent`
  (`var(--accent)`), `.cn-text-tone` (`var(--tone)`).
- Backgrounds: `.cn-bg-base`, `.cn-bg-mantle`, `.cn-bg-crust`, `.cn-bg-well`
  (crust 38% into mantle), `.cn-bg-head` (crust 30% into mantle), `.cn-tint`
  (tone 4% wash), `.cn-tint-accent` (135deg gradient, accent 8% into mantle
  fading to mantle at 48%).
- Tone setters: `.cn-tone-{red,green,peach,yellow,blue,mauve}` set `--tone`
  only.

### Borders

- `.cn-edge`: 1px solid, surface-2 40% mix.
- `.cn-edge-soft`: surface-1 38% mix (inner separators).
- `.cn-edge-line`: 1px solid surface-0 (row separators, footer rules).
- `.cn-edge-mauve`: mauve 30% mix. `.cn-edge-tone`: tone 25% into surface-0.
  `.cn-edge-accent`: accent 28% into surface-0.
- `.cn-edge-dashed`: 1px dashed surface-1 (the only dashed border).

### Radii (role-named, no numeric escape hatch)

`.cn-r-panel` (`var(--pane-radius)`), `.cn-r-card` (13px), `.cn-r-control`
(10px), `.cn-r-mark` (8px), `.cn-r-chip` (4px), `.cn-r-pill` (999px),
`.cn-r-round` (50%).

### Structure

- `.cn-spine`: relative; `::before` 4px left bar in `var(--accent)`,
  `inset: 12px auto 12px 0; border-radius: 0 6px 6px 0;`.
- `.cn-sr-only`: standard clip pattern.
- `.cn-hidden`: `display: none !important`.
- (`.scroll-well`, `.app-shell`, `.page-enter`, `.live-dot` live in
  tokens.css; `.cn-scrim` lives in recipes.css with the overlays it backs;
  do not duplicate.)

### Layout

Three primitives and one scale. The scale is the six values the recipes
already use, 4, 8, 12, 16, 22, 28; no utility takes a number outside it, and
there is nothing in between.

- `.cn-row`: flex, centered, gap 8. `.cn-stack`: grid, gap 12.
  `.cn-cluster`: flex, wrap, centered, gap 8. Modifiers only add:
  `.cn-between`, `.cn-center`, `.cn-end`, `.cn-top`, `.cn-baseline`,
  `.cn-wrap`.
- Children: `.cn-grow` (flex 1 with `min-width: 0`, the one that lets a
  child truncate), `.cn-fixed`, `.cn-min-0`, `.cn-auto-l` (margin-left auto).
  `.cn-w-full`, `.cn-fit`, `.cn-block`.
- `.cn-grid-2/3/4`: equal `minmax(0, 1fr)` columns, gap 14; three and four
  collapse to two at 760px and everything to one at 520px.
- `.cn-gap-{4,8,12,16,22,28}`; `.cn-p-{0,4,8,12,16,22,28}`; `.cn-px-*` and
  `.cn-py-*` from 8 up plus 0; `.cn-mt-*`, `.cn-mb-*` on the scale plus 0;
  `.cn-m-0`. No horizontal margin utility exists: centering is the page
  column's or a grid's job.
- `.cn-divide`: `> * + *` takes the surface-0 hairline (Tailwind's
  `divide-y`).
- `.cn-truncate` (overflow hidden, ellipsis, nowrap; needs a bounded width),
  `.cn-nowrap`, `.cn-tabular`.
- `.cn-icon-sm/.cn-icon/.cn-icon-lg`: 13/16/20px inline svg, `flex: none`.
  Buttons, chips, banners and the segmented control size their own svg.
- `.cn-code-meta`: the mono secondary line, `500 12px/1 var(--mono)` in
  overlay-2. The one mono role outside code surfaces: a model id, a path, a
  hash under a name. Every consumer had written it by hand.
- `.cn-text-center/-right/-left`; `.cn-list-none` (no marker, margin or
  padding); `.cn-scroll-x` (sideways scroll inside the box, system
  scrollbar color); `.cn-sticky-top` (sticky, top 0, z-index 2).
- Composition rule: the type roles pin a color and the color utilities come
  later in the file, so `cn-microlabel cn-text-accent` is a tracked label
  in the accent. A consumer never restates a role to recolor it.

## css/recipes.css (layer cn.recipes)

Every recipe reads tokens and contract props only (`--accent`, `--tone`,
`--hard-offset-color`, `--hard-offset`, the density knobs). Recipes never
style bare element selectors (the tokens reset aside); `.table-neu` scopes all
table styling.

### Surfaces

- `.panel`: the primary content container. 1px `cn-edge`-mix border,
  `var(--pane-radius)`, `--base` background, `--neu-raised`.
- `.panel.is-tilted`: `rotate(1.2deg)` with the hard offset composed over the
  neu raise — `10px 10px 0 var(--hard-offset-color), var(--neu-raised)` — so
  the hero still answers the top-left light instead of floating as a flat
  sticker. The one rotated hero card; flattened at 1060px and below.
- `.panel-heading` / `.panel-footer`: min-height 70px flex bands, padding
  14px 22px. The heading anchors with a fill: `cn-bg-head` mix, bottom
  divider (surface-1 40% mix), and `border-radius:
  calc(var(--pane-radius) - 1px) calc(var(--pane-radius) - 1px) 0 0` so the
  fill never pokes past the panel corners. The footer paints no fill and
  carries no depth: it sits on the panel's own ground, separated by the top
  divider alone. Never fix corner bleed with `overflow: hidden`; it clips
  anchored popovers and hard-offset shadows.
- Band corner rule, generally: any filled first/last child of a rounded
  surface takes `calc(<parent radius> - 1px)` on its outer corners. Applied
  to panel headings, modal headers, popover children, and tables or ranked
  rows that start or end a panel (the hover fill lives on cells so the radius
  can clip it).
- `.well`: inset container, 13px radius, `background: transparent` (carved
  from the parent surface; compose `cn-bg-well` when an explicit fill is
  wanted), full `--neu-inset`, borderless.
- `.well.scroll-well`: the bottom 34px dissolves via `mask-image` so content
  visibly runs past the fold.
- `.terminal`: the deepest well. 10px radius, `--crust` fill (deliberate: a
  code surface keeps its fill), `--neu-inset`, borderless. `pre` in
  `500 12px/1.65 var(--mono)`; `.caret` is a 6x14 blinking block in
  `var(--accent)`.
- `.topbar`: sticky, min-height 68px, translucent base (91%) + `blur(14px)`,
  bottom hairline, `--shadow-cast` + lit hairline. Three-column grid. Where
  `animation-timeline: scroll()` is supported the cast and the hairline fade
  in over the first 60px of scroll (the `cast` keyframe): nothing is under
  the bar at the top of the page, so nothing casts. Elsewhere the bar keeps
  its cast at rest.
- `.empty-state`: centered column, min-height 260px, overlay-1. An `svg`
  first child sits on a 56px round plate (`--neu-inset-soft`, 16px padding,
  overlay-1 stroke): the same material as every input on the page, so the
  emptiness becomes a place.

### Buttons

Compose `class="btn btn-primary"`. Element-agnostic: `<a class="btn">` is a
button that navigates, so the base sets `text-decoration: none` and each
variant carries its own color against the tokens-layer link mauve. All labels
sans; heights from the density knobs. `.btn`: min-height `var(--control-h)`,
padding 0 18px, 10px radius, `780 13px var(--sans)`; disabled is `.35`
opacity + `--neu-inset-soft`. Sizes: `.is-sm` is the toolbar height
(`--control-h-sm`, 12px type, 8px radius), `.is-lg` the one hero action
(`--control-h` + 12px, 14px type). An svg inside a button is sized by the
button: 16px in `.btn` (14 small, 18 large), 15 in `.btn-flat`, 16 in
`.btn-icon` (14 in `.is-sm`, 20 in `.is-lg`, which is `--control-h` square;
`.is-sm` is 28px), 13 in `.btn-text`. Never size an icon by hand.

- `.btn-primary`: crust text, solid mauve, hard offset in
  `color-mix(in srgb, var(--mauve) 25%, var(--surface-0))` plus
  `inset 1px 1px rgb(255 255 255 / .16)`; hover turns pink and lifts
  `translate(-1px,-1px)`; active is the half-slide.
- `.btn-secondary`: `--base` background, `cn-edge` border, hard offset in
  `var(--hard-offset-color)` (the canon default); hover mauve-mix border +
  lift; active half-slide. Softening one requires an unlayered consumer
  override (utility classes live in an earlier layer and cannot beat this
  rule).
- `.btn-ghost`: transparent until hovered (surface-0 40% wash); active
  `translateY(1px)` + `--neu-inset-soft`.
- `.btn-flat`: toolbar button at `var(--control-h-sm)`; flat at rest, the
  engaged treatment when `[aria-pressed="true"]` or `.active` (borderless:
  inset depth + mauve 7% wash).
- `.btn-text`: inline mauve text button, 8px radius (the focus ring traces
  it); active translates only.
- `.btn-icon`: `var(--control-h-sm)` square, grid-centered, overlay-1; hover
  tints toward `var(--tone)`; active `translateY(1px)` + inset-soft.
- `.btn-dashed`: the only dashed border. Open, low-emphasis slot of a control
  (drop zones, placeholder rows): min-height `calc(var(--control-h) + 18px)`,
  13px radius, surface-0 16% wash; hover goes mauve; active
  `translateY(1px)` + inset-soft.

### Inputs

`.field label`: block label, `650 12px/1 var(--sans)`, sentence case,
overlay-2.

`.input` (and `.field input/select/textarea`): a borderless inset well carved
from whatever surface it sits on. `border: 0`, `background: transparent`,
`--neu-inset`, height `var(--input-h)`, 13px radius, 14px inline padding, sans
13px with tabular-nums. Placeholder overlay-1: overlay-0 is 3.4:1 on base
on paper, but inside the carve the top-left of the well is darker than base,
so the ratio where a placeholder sits is lower still.

- Focus: `box-shadow: var(--neu-inset), 0 0 0 2px var(--mauve)`. The ring is
  the one focus indicator; the fields set `outline: none` on
  `:focus-visible` because text fields match it even on pointer focus, which
  doubled the ring. This is the sole sanctioned `:focus-visible` suppression.
- Disabled: overlay-0 text, `.6` opacity, `--neu-inset-soft` (the carve
  nearly fills in), `not-allowed` cursor.
- Textarea: auto height, min-height `calc(var(--input-h) * 2)`, vertical
  resize.
- Selects carry a chevron glyph (a data-URI SVG in the overlay-1 hex
  `#7f849c`; data URIs cannot reference custom properties) at
  `right 13px center`, 15px, with 40px trailing padding.
- `.input-lg`: the one oversized input on a page, 58px, 15px text.
- `.input-icon`: wrapper with an absolute 18px leading icon at left 16px;
  the input pads to 44px.
- Validation: `.is-error` / `.is-warning` on `.field` or a bare `.input` set
  `--tone` (red / peach) and wash the well in it, `color-mix(in srgb,
  var(--tone) 4%, transparent)`, the accordion's engaged rule. The carve is
  untouched: an inset surface stays defined by depth, and the old 2px tone
  ring was a border by another name that also doubled as the focus ring, so
  a focused invalid field looked like an unfocused one. Focus stays the
  mauve ring, layered over the wash. Label and `.field small` (the 12px
  helper or message line) tint with the tone, so the wash is never the only
  signal. Disabled wins over both by source order. Set `aria-invalid`
  alongside `.is-error`.

### Select picker

Where the browser supports customizable selects
(`@supports (appearance: base-select)`, Chromium 135+), the option list
becomes a styled popover: `appearance: base-select` on the select and its
`::picker(select)`; picker styled as a floating card (13px radius, surface-1
border, `--base`, `--shadow-pop`) entering via `@starting-style`; options
9px 11px with 8px radius, mauve on hover/checked; `::picker-icon` hidden (the
data-URI chevron stays). The closed control gets `display: flex; align-items:
center` because base-select pins the label to the top otherwise. Elsewhere
the native picker stays.

### Tooltip

`[data-tip]` draws the system tooltip as an absolutely positioned `::after`
bubble (max-width 240px, 8px radius, surface-1 border, `--shadow-pop`, sans
11px) above the element, shown on hover and `:focus-visible`. It waits .4s
(a pointer crossing a toolbar must not fire a row of them), then fades and
rises 2px into place on `--ease-out`; it leaves at once. Never use
`title=`; it renders the OS tooltip.

### Segmented and stepper

`.segmented`: equal-column grid, 7px gap. Options carry the hard offset at
rest (min-height `calc(var(--control-h) + 12px)`, 10px radius, `--base`),
lift on hover with a mauve-mix border, half-slide while held, and take the
engaged treatment when selected (`.active`, `[aria-pressed="true"]` or
`[aria-checked="true"]`: `translateY(1px)`, transparent border, the
`--wash`, `--neu-inset`; the `b` label turns mauve). An svg inside an
option is 16px. The half-slide is transient only; the settled state never
slides.
`label:has(input:focus-visible)` gets the standard outline. `.is-stacked`:
row flow, 12px gap, roomier rows, 17px labels.

`.stepper`: phase track of borderless inset pills (999px radius, `cn-bg-well`
mix, `--neu-inset-soft`, `650 12px var(--sans)`). Current phase via
`.active` or `[aria-current="step"]` (mauve + mauve 8% wash); completed via
`.is-done` (green).

### Marks, chips, banners

- `.mark-solid`: 28px solid square in `var(--accent)`, crust glyph, 8px
  radius, `--shadow-mark`, currentColor 14% edge, `800 12px var(--sans)`
  tabular.
- `.chip`: outlined pill, `--base`, `--neu-raised-soft`,
  `600 12px var(--sans)` tabular.
- `.chip-tone`: tinted status tag, 4px radius, tone 4% wash, tone 45%
  hairline, `650 12px var(--sans)`. Pass the color via `.cn-tone-*`.
- `.banner`: semantic tint band, 10px radius, tone 4% wash, tone 25% into
  surface-0 edge, `--neu-inset-soft`, 12px text.

### Selection controls

`.choice`: labeled row, `<label class="choice"><input …>Text</label>`, 10px
gap, sans 13px; `:has(:disabled)` dims to `.5`.

- `.checkbox`: 20px, 4px radius, transparent background, `--neu-inset-soft`,
  hairline (surface-2 55% mix). Held, the box presses like every other
  control (`translateY(1px)` + full `--neu-inset`; the radio too). Checked:
  mauve fill + border, crust checkmark (a masked `::after` that lands on
  `--ease-spring` from `scale(.4) rotate(-8deg)`, overshooting a hair), soft
  inset kept plus the `rgb(255 255 255 / .16)` top edge.
- `.radio`: same edged well, round. Deliberate asymmetry: the checkbox
  signals with its fill and stays on the soft inset; the radio only gets a
  dot, so checked deepens to full `--neu-inset` with a mauve-mix border. The
  dot is 9px mauve with the halo ring composite
  (`0 0 0 3px color-mix(in srgb, var(--mauve) 13%, transparent)`, the
  `.live-dot` pattern).
- `.switch`: an abstract light switch, 50x28, 8px radius, transparent carved
  plate (`--neu-inset`). The `::after` paddle (21x22, 6px radius, `--base`,
  raised-soft, hairline) tilts `perspective(120px) rotateY(16deg)`
  at rest; checked slides it `translate 23px` on `--ease-spring` (.24s, so
  it lands with a bounce), flips the tilt to -16deg on `--ease-out`, and
  lights it mauve with a whisper glow
  (`0 0 6px color-mix(in srgb, var(--mauve) 18%, transparent)` + the white
  inset edge). While pressed the paddle flattens
  (`rotateY(0) scale(.96)`); pressed while on, the glow blooms to
  `0 0 12px` at 28% for the frame it is held.

### Accordion

The whole open item sinks in place: the engaged treatment, full `--neu-inset`
with the mauve 4% wash and the title in mauve, title and body together,
vertical growth only. (The soft inset alone sank about as far as a coin on
a carpet, and the chevron was the only open signal.) Closed rows stay flat
with straight dividers; radius (10px), shadow and wash appear only while
open.

Mechanism: a label + hidden checkbox, with the fold transitioning
`grid-template-rows: 0fr` to `1fr` (.3s; the .2s carve runs with it, no
sequencing). Markup:

```html
<div class="accordion">
  <label><input type="checkbox">Title</label>
  <div class="fold"><div>…body…</div></div>
</div>
```

A trailing meta (a date, a tag set) rides against the chevron: wrap the
title — `<b>` for the bold variant, `<p>` for the regular-weight one (both
grow via `margin-right: auto`) — and follow it with
`<span class="cn-meta">`. Without the wrap, the label's `space-between`
would float a third child mid-row. At 520px the meta hides. An `em` inside
the title takes the given accent.

`.accordion-stack` groups accordions inside a panel: the panel supplies the
frame, the stack 10px 16px breathing room, and the closed last row's
divider yields to the panel edge (an open row is already borderless).

Radios sharing a name give an exclusive-open group. The input is visually
silent but keyboard-reachable; its focus ring draws on the label. A
framework that owns the state, or a hover-driven row, sets `.is-open` or
`data-open` on the accordion instead and gets the same treatment. Space
toggles natively; Enter support is one consumer line:

```js
el.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.matches(".accordion input")) e.target.click();
});
```

A radio cannot uncheck itself, so an exclusive group keeps one item open.
When the group must close fully, a second listener arms the radio that was
already checked on the press (capture, so it runs before the Enter
listener's click) and unchecks it on the click that follows. From the
keyboard, Enter closes the open item; Space on a checked radio is inert
natively. Narrow the selector to one group's name if another group must
stay sticky.

```js
let held = null;
const arm = e => {
  const r = e.target.closest?.(".accordion > label")?.querySelector("input[type=radio]");
  held = r?.checked ? r : null;
};
document.addEventListener("pointerdown", arm, true);
document.addEventListener("keydown", arm, true);
document.addEventListener("click", e => {
  const t = e.target;
  if (!t.matches(".accordion input[type=radio]")) return;
  if (t === held) t.checked = false;
  held = null;
});
```

Details that matter: the fold's inner wrapper is a single element with
`min-height: 0` and `overflow: clip`; closed content gets
`visibility: hidden` (flipping at the end of the close) so it leaves the tab
order and accessibility tree while still animating; bottom spacing lives on
the content's margin, since padding would floor the collapsed wrapper. The
trade: checkbox semantics instead of disclosure semantics.

### Avatar

`.avatar`: initials or an image on an accent-tinted round. 32px, accent 14%
into mantle, accent 38% edge, `--neu-raised-soft`, `700 12px var(--sans)`.
`.is-lg` is 44px. `.avatar-stack`: -8px overlap; stacked avatars ring
themselves with the page ground (`0 0 0 2px var(--base)` added to the soft
raise).

### Code block

`.codeblock`: a carved mono snippet well. Transparent background,
`--neu-inset`, 10px radius, `500 12px/1.75 var(--mono)` tabular. With the
terminal it is one of the two mono surfaces (plus `.cn-code`).
`.is-numbered` draws a line gutter with CSS counters: wrap each line in its
own element inside the `pre`; no JS. Five `.tok-*` classes carry the
highlight palette (keyword blue, string green, number peach, fn mauve,
comment overlay-0 italic); tokenizing itself is a consumer build step.
An optional copy control is a `.btn-icon` direct child: the recipe pins it
to the corner (26px, top/right 8px) and pads the block clear of it; the
clipboard write is one delegated consumer listener, documented on the page.

### Accent card

`.accent-card`: keyed by `--accent`. A raised card on a plate in its accent:
13px radius, base fill, accent 32% edge, and the hard offset in `--plate`
(accent 50% into surface-0, the primary button's own rule for a colored
offset) layered over `--neu-raised-soft`. Nothing is painted on the card: no
spine, no gradient, no eyebrow. Color and depth come from the material, and
the plate is the one thing a card in this system can sit on that no other
card can. Cards wrapped in a link lift off the plate on hover
(`translate(-1px, -1px)`, the plate grows by 1px, stronger edge) and
half-slide onto it on click, the canon press. `a:has(> .accent-card)` takes
the 13px radius so the focus ring traces the card. The spine survives as
`.cn-spine`, for position only: the current row, the selected item.

### Data display

- `.metric`: small label over an oversized tabular number
  (`650 21px var(--sans)`); `.is-hero` is 28px in `var(--accent)`.
- `.stat-row` / `.stat-strip`: label/value baseline rows separated by
  soft hairlines.
- `.progress-track`: 7px, 999px radius, `--crust` fill + `--neu-inset-soft`
  (the track keeps its fill; at 7px a carve reads as mud). The fill span
  inherits the radius (no overflow clipping) and defaults to `var(--accent)`;
  re-key it per instance via `--progress-fill` (any token color or token
  gradient — the `--ring-ground` pattern), e.g.
  `style="--progress-fill: var(--green)"`. The old mauve-pink-peach default
  was the only three-color object in a one-accent system, and because the
  gradient was sized to the fill, three bars on one page showed three
  colors at the same x. A gradient is an opt-in now. Width transitions .6s
  on `--ease-out`, decelerating into the value.
- `.table-neu`: opt-in class on `<table>`; scopes all table styling. Header:
  `cn-bg-head` mix, `650 12px var(--sans)`, overlay-1. Cells:
  `600 13px var(--sans)` tabular, subtext-1. Row hover presses in: mauve 6%
  wash + the row-press composite
  (`inset 0 4px 6px -4px var(--neu-dark), inset 0 -3px 5px -4px rgb(69 71 90 / .3)`)
  on the cells, not the row (with border-collapse a td radius cannot clip a
  tr background, so cell fills stay inside a rounded parent's corners). The
  composite shades only the top and bottom, so the cells join into one
  pressed strip; the per-cell soft inset carved every td into its own tile
  with seams at every column edge. Background and shadow fade over
  `--t-fast`. `.cell-name` for the emphasized two-line cell.
  Give each data cell `data-label`; it becomes the card label at 760px.
- `.ranked-row`: ordered list line (rank mark, name, trailing value), same
  hover press and fade.

### Overlays

All float on `--shadow-pop`, never neu.

- `.popover`: anchored to a relative parent, `min(390px, calc(100vw - 32px))`,
  13px radius, surface-1 border. First/last children take
  `calc(13px - 1px)` corners (band rule). Header is a flex band; compose
  `cn-bg-head` for the fill. Footer is divider-only.
- `.modal`: a child of `.cn-scrim`, self-centered,
  `min(520px, calc(100vw - 32px))`, `var(--pane-radius)`, surface-1 border.
  Its header keeps the recessed fill like a panel heading, with the
  `calc(var(--pane-radius) - 1px)` corners.
- `.drawer`: side sheet pinned to the right edge above the scrim,
  `min(420px, calc(100vw - 40px))`, left border, square corners (child bands
  need no radius treatment).
- `.toast-stack`: the toast viewport, fixed 20px from the right and bottom,
  z-index 90, column flex aligned to the end, 10px gap,
  `min(380px, calc(100vw - 40px))` wide; toasts append at the bottom. At rest
  the stack collapses: only the newest visible toast stays in flow (the
  stack is exactly its size); older visible toasts pin absolutely to that
  same box with `overflow: clip`, lifted behind it at `-12px scale(.96)` and
  `-22px scale(.92)`, the fourth and older hidden. Depth counts visible
  toasts only, so an exiting `[hidden]` toast never shifts the pile.
  `:hover` or `:focus-within` fans it back into the column. The package
  ships no toast JavaScript by design: spawning, timers, dismissal, the cap,
  and pause on hover are consumer code; the docs carry a Preact reference.
- `.toast`: one stack item, shadcn-shaped: a flex row holding a content
  column (`b` title over a span/p description) plus trailing controls
  (`.btn-text` action and/or `.btn-icon` close). 13px radius, neutral
  surface-1 border (no accent), base ground, `--shadow-pop`.

### Overlay motion

Overlays enter via `@starting-style` and exit via `[hidden]`. The exit does
not rely on display transitions: `[hidden]` keeps the element's `display`
(block, or flex for drawer/toast) and drops `visibility` instead. Visibility
transitions discretely everywhere, staying visible for the whole exit and
flipping at the end. A hidden overlay is invisible, unfocusable, and
pointer-inert (`pointer-events: none`), same as `display: none` for a fixed
element.

Specs: scrim fades and un-blurs; modal fades + rises 8px + scales .98 to 1;
popover fades + drops 4px; toast fades + slides 16px in from the right edge
it lives on. Entrances take `--ease-out`: modal, scrim and toast over
`--t-base`, popover `--t-fast`, drawer `--t-slow`, so each covers most of
its travel early and lands in the last stretch. Exits take `--ease-in` in
.14s: a dismissed thing is gone before the hand moves. A modal or drawer
inside a scrim rides the scrim's `[hidden]`. The motion rules sit after the
component blocks so `[hidden]` wins. Consumers that unmount instead of
hiding get the entrance only. The reduced-motion block collapses all of it.

`.cn-scrim` itself is a recipe: fixed inset, crust 80% mix,
`backdrop-filter: blur(2px)`, z-index 70. The crust does the work; the blur
is a whisper. Everything else in the system is opaque and lit from one
corner, and a 6px smear behind a modal read as a different substance. The
topbar keeps its 14px blur: content moving under it earns it.

### Native dialog hosts

`<dialog class="modal">` and `<dialog class="drawer">` ride the platform: the
top layer, focus trapping, Escape, and `::backdrop` styled as the scrim. No
scrim div, no `hidden` attribute; `showModal()` and `close()` are the whole
API, and a framework needs no class juggling. The closed state is
`display: none`, so entrance and exit ride discrete `display` and `overlay`
transitions (`allow-discrete`) with the same specs as the scrim-hosted
versions: modal fades and rises 8px on `--t-base --ease-out`, drawer slides
from the right on `--t-slow`, both leave on `--ease-in` in .14s, and the
backdrop fades with them. Where a browser lacks discrete transitions the
dialog appears and disappears in place. Padding is reset to 0 so the header
and footer bands land on the dialog's own edge; closed dialogs are
`display: none` explicitly, since the drawer recipe's `display: flex` would
otherwise beat the UA's closed state; and the drawer keeps only its left
hairline, since the UA draws a 3px border the recipe never asked for.

### Page furniture

- `.eyebrow`, `.display-title`, `.lede`: aliases of the type roles, kept for
  base-layer compatibility.
- `.page-main`: the page column, `min(var(--page-width, 1440px),
  calc(100% - 40px))`, centered, `min-width: 0`, relative with z-index 1,
  vertical padding `clamp(24px, 4vw, 46px)` (`--page-pad`). `is-narrow` is
  860px, `is-reading` 740px, `--page-width` anything else. At 760px the
  gutter drops to 14px a side. Every consumer had written this block; the
  SPEC used to call it the consumer's pattern.
- `.footer-neu`: page footer at the same `--page-width`, surface-0 top rule,
  sans meta; stacks at 760px. `.footer-brand` is its brand slot: an svg or
  mark in mauve, the name in `750 13px`, `b`/`em` in mauve, an optional
  trailing note in overlay-1.
- `.topbar nav` is a row of flat buttons. `.topbar.is-split` is the
  two-region bar, brand left and actions right, for a page with no center
  nav (the three-column grid would center whatever came second).
  `.topbar.is-compact` is the 52px app strip.
- `.wordmark` is the identity in the topbar corner (`800 16px`, tight
  tracking, `em` for the accent half). It is an inline flex row with a 9px
  gap, so a `.mark-solid` before the name is the brand tile (28px; 34px under
  `is-lg`, which is the 22px hero size). Anchors lose their underline.
- `.panel-body`: the panel's content band, `20px 22px`. The panel ships no
  padding so tables and ranked lists can fill it edge to edge; prose and
  controls go in a body. `cn-p-*` re-pads it.
- `.deck`: hash-routed views without JS. Direct children are the views —
  the `:target` one shows, the first child is the default, and a deep link
  into a view's content shows that view. State lives in the URL, so
  back/forward and refresh keep their place. Matching a nav link's engaged
  state to the visible view stays consumer CSS (per-id `body:has(...)`
  selectors — CSS cannot correlate an href to a target generically).


### Responsive

Three breakpoints, always these three. Each removes decoration before it
removes content.

- **1060**: the tilted card flattens (back to raised), secondary nav
  hides, topbar collapses to two columns.
- **760**: tighter topbar, glyph chips go icon-only (font-size 0, keep the
  glyph and an accessible name), display type steps down, panel footers
  stack, `.panel.is-shell` sheds its chrome for full-bleed phones, and
  `.table-neu` becomes stacked cards (thead drops; each `td[data-label]`
  carries its own micro-label via `::before`).
- **520**: display type shrinks again, segmented stacks, oversized numerals
  step down, footer meta hides.

## tailwind/preset.cjs (v3)

`theme.extend`: colors (all palette names to `var(--…)`, plus
`accent: "var(--accent)"`, `tone: "var(--tone)"`), fontFamily `sans`/`mono`
to the token stacks, borderRadius `{ panel: "var(--pane-radius)", card:
"13px", control: "10px", mark: "8px", chip: "4px" }`, boxShadow
`{ "neu-raised", "neu-raised-soft", "neu-inset", "neu-inset-soft", "pop",
"cast", "hard", "hard-lg" }` to the token values, height/minHeight
`{ control: "var(--control-h)", input: "var(--input-h)" }`. No plugin logic;
recipes come from the CSS files.

`tailwind/theme.css` (v4): the same mappings as `@theme` custom properties.

## scripts/sync.mjs

`node scripts/sync.mjs <destDir>` (also exposed as bin `catppuccin-neu-sync`):
copies `css/tokens.css`, `css/utilities.css`, `css/recipes.css`,
`css/index.css` into `<destDir>`, creating it if needed; prints what it
copied; exits non-zero on failure. Node 18+, no dependencies.

## Docs site (`showcase/`)

A shadcn-style multi-page docs site. Preact + Vite (`@preact/preset-vite`),
pnpm, TypeScript. Real-path routing via preact-iso; `wrangler.jsonc` deploys
`dist/` as Cloudflare Workers static assets with
`not_found_handling: "single-page-application"`. `index.html` links Google
Fonts (Inter 100..900, JetBrains Mono 100..800). Imports `../css/index.css`
directly; the site dogfoods the package source.

Fixed left sidebar nav, grouped:

- **Getting started**: Introduction (install + layer model), Density &
  contract props.
- **Foundation**: Colors, Typography, Depth.
- **Components**: one page per component. Button, Input & Field, Selection,
  Segmented, Stepper, Chip, Banner, Accordion, Surfaces (panel/well), Accent
  card, Avatar, Stat, Progress, Table, Terminal, Code block, Popover, Modal,
  Drawer, Toast, Empty state, Page furniture (topbar/footer/eyebrow/display).

Foundation also carries Layout (the primitives, the scale, the page shell),
and Containers carries Command (the copyable command line).

`src/nav.ts` is the single registry for routes, sidebar order, and titles.
Each page: short intro prose, specimens with copyable class strings
(`.cn-code`, click to copy), variants, states. Demo stages sit on `--base`:
components live on the page ground, and neumorphic depth only reads when the
surface matches its background (the well is shown as itself on its own page).
The stage is framed by a soft hairline and the copy line under it is a flat
row with a top rule: the system has one dashed border and the docs don't
add two more per page. Close and dismiss buttons carry a stroke glyph
(an inline `svg`, 14px, 1.8 stroke), the same drawing style as every other
icon, never a text character. Card specimens carry a name and a meta line
and no eyebrow. The soft depth pair is shown on a chip and a checkbox, the
objects it is tuned for. The site is the visual-regression reference: every
recipe and state appears at least once.

## Verification rules (what reviewers check)

1. Every `box-shadow` in utilities/recipes is one of: the four neu tokens,
   `--shadow-pop/cast/mark`, the hard-offset family (`var(--hard-offset)`
   and its half-press, `10px`, `3px`), the tilted-hero composite (the 10px
   hard offset layered with `--neu-raised`), the focus ring `0 0 0 2px` mauve
   layered on an inset, or a documented composite: the two blessed white
   insets, the accent-card plate (the hard offset in `--plate`, one pixel
   larger on hover, layered with `--neu-raised-soft`), the cast hairline, the halo ring
   `0 0 0 Npx color-mix(… 13%, transparent)` used by `.radio` and
   `.live-dot`, the avatar-stack ground ring `0 0 0 2px var(--base)`, the
   row-press composite (`inset 0 4px 6px -4px var(--neu-dark), inset 0 -3px
   5px -4px rgb(69 71 90 / .3)`) on hovered table cells and ranked rows,
   and the switch glow `0 0 6px` mauve 18% (`0 0 12px` at 28% while held).
2. Every color literal is a Mocha hex from tokens.css, `currentColor`,
   `transparent`, a `color-mix(in srgb, …)` of tokens, or the two blessed
   whites (`rgb(255 255 255 / .16)` primary highlight, `/ .1` mark
   highlight). Data-URI glyphs use palette hexes; mask images are exempt
   (alpha only).
3. Every radius resolves to the blessed scale (16/13/10/8/4/999/50%, 6px on
   decorative sub-corners, 12 only via `--pane-radius` under compact
   density) or the band pattern `calc(<parent radius> - 1px)`.
4. Voice discipline: in the package itself, `var(--mono)` appears only in
   `.cn-code`, `.terminal`, `.codeblock`. In consumer layers mono is legal
   anywhere as a rare, deliberate accent — flag it only when it reads as a
   default voice (prose, headings, or whole control sets in mono), not when
   one element earns it. Sans-face numbers get `tabular-nums`. Uppercase
   appears only on `.cn-eyebrow`/`.eyebrow` and `.cn-microlabel`; flag
   `text-transform: uppercase` anywhere else.
5. Anything that moves or changes depth (transform, translate, box-shadow,
   opacity, width, the fold) rides the motion tokens: `--t-fast/base/slow`
   on `--ease-out`, `--ease-in` or `--ease-spring`, .08s for the down-press,
   .14s for exits, .3s for the accordion fold, .6s for progress. Plain
   color fades (background, border-color, color) may stay a bare `.16s`.
   No named curve (`ease`, `linear`, `ease-in-out`) on any transition; the
   keyframes keep theirs (`cast` and `spin` linear, `pulse` ease-in-out).
   The five keyframes only; the reduced-motion block survives.
6. `:focus-visible` outline never removed, except the documented input case
   where the mauve ring replaces it; `::selection` inversion intact.
7. Files parse standalone and via index.css layers; recipes reference only
   tokens and contract props; nothing depends on `!important`.
8. No `overflow: hidden` to fix band corner bleed; no `title=` attributes;
   no purpose-named classes.

## Changelog

Decisions in order, one line each. Reverted experiments included; the body
above describes only what shipped.

1. Showcase on Preact + Vite, deployed as Cloudflare Workers static assets.
2. Distribution as a git-URL npm dep plus `sync.mjs` vendoring; no CDN
   (the CDN half reversed in 37).
3. Depth canon: hard offset for any clickable, half-slide press, primary
   buttons never soften.
4. Radii capped at 16; 12 only via compact density.
5. Scope widened from the original five projects to all future projects;
   content, names, and components made generic (style names, no single-use
   variants; `btn-add` to `btn-dashed`, `.search` to `.input-icon`).
6. `--entity-color` merged into `--accent`; `.entity-card` renamed
   `.accent-card`; `-entity` utilities renamed `-accent`.
7. Band corner rule: filled child bands take `calc(parent - 1px)` corners;
   `overflow: hidden` banned as the fix.
8. Depth contrast retuned; the soft pair strengthened twice (half-strength
   values were too faint on small surfaces).
9. One-page gallery replaced by the multi-page docs site; specimens moved
   onto `--base`.
10. Inset surfaces went borderless and transparent (input, well); the
    terminal keeps its crust fill as a code surface.
11. Carved progress track: tried and reverted; at 7px the carve reads as
    mud, the track keeps its crust fill.
12. Flat controls (`btn-ghost`, `btn-icon`, `btn-dashed`) gained the
    soft press; `btn-text` translates only.
13. Selects gained the data-URI chevron; the input focus ring became the
    sole field focus indicator; disabled fields flatten.
14. Scroll-well fade: a sticky `::after` band was tried and reverted (broke
    against the well's padding); replaced by `mask-image`.
15. `.page-enter` dropped its fill-mode; a held transform trapped fixed
    overlays.
16. Overlay exits via `[hidden]` + visibility; `display` + `allow-discrete`
    was tried and rejected for support. Modal/drawer ride the scrim.
17. Footer bands became divider-only after the A-E band study; headings keep
    the fill.
18. Selection controls added; three rocker switch variants (glyph halves,
    seesaw fold, hinged angled paddle) were tried and reverted, the sliding
    paddle stays canon.
19. `details`-based accordion tried and replaced; close cannot animate
    outside Chromium, so the label + checkbox + grid-rows fold shipped.
20. Avatar and codeblock added; hover card and tabs deliberately skipped
    (compose popover; segmented is the tab bar).
21. Select picker restyled via `base-select` where supported; `[data-tip]`
    tooltip replaces `title=`.
22. Mono restricted to code contexts; every other role went sans
    (mono scarcity check replaced the mono/sans split check).
23. `--hard-offset` promoted to a contract prop (4px, 3px compact); the
    press slides half of it.
24. Toast reworked shadcn-shaped: toast-stack viewport, title/description
    anatomy, slide-in from the edge, neutral border.
24. `.cn-engaged` went borderless (transparent border-color) as shipped.
25. Toast stack collapses newest-on-top with peeking older toasts; hover
    or keyboard focus fans it out.
26. Field validation states (.is-error / .is-warning: tone ring over the
    inset, replaced by the tone wash in item 63) and the code block copy
    control.
27. Toast behavior declared consumer code; the docs spawner became the
    Preact reference (cancelable timers, pause on hover, cap, guarded
    two-phase exit).
28. Type scale compressed twice: display clamps to 46px (was 64),
    display-sm to 36px; the type floor rose to 12px (cn-microlabel excepted
    at 10px), and cn-copy rose to 14px.
29. The lit top-left inset edge retired everywhere neutral: `.cn-raised-lit`
    deleted; panel, tilted-card fallback, and the switch paddle dropped it.
    Kept: the two blessed whites and the cast hairline. (The accent-card's
    accent-mix inset went with the plate redesign, item 52.)
30. Uppercase made scarce: only eyebrow and microlabel keep caps; cn-label,
    field labels, chip-tone, and stepper went sentence case (chip-tone
    750→650).
31. Mono expanded from code-only to code + data: cn-value, cn-value-lg,
    cn-meta, metric numbers, and stat-row values took the mono face
    (mono scarcity check replaced by the voice-discipline check).
32. Entry 31 reverted: the data roles went back to sans + tabular-nums.
    What survives is the relaxed doctrine — the package ships mono only on
    the code surfaces, but consumer layers may set mono on any text in the
    rare right circumstance; the anti-mono flag now targets mono-as-default,
    not mono-at-all.
33. Progress fill made customizable: `--progress-fill` on the track re-keys
    the span (any token color or gradient), defaulting to the
    mauve-pink-peach ramp — the `--ring-ground` fallback pattern.
34. The tilted hero composes its hard offset over `--neu-raised`: the flat
    offset alone ignored the top-left light and read as a sticker.
35. Vendoring became the rule for every consumer, bundled apps included:
    sync + commit the four CSS files, import them relatively; the git dep
    remains only to pin the version and drive the sync (and the Tailwind
    preset). No build imports the CSS from node_modules.
36. Entry 35 reverted and inverted: nothing is vendored, ever. Bundled apps
    import from node_modules; zero-build surfaces sync generated copies in
    pre-dev/pre-deploy hooks and gitignore them. The installed package is
    the single source of the CSS.
37. The CDN ban lifted, narrowly: a tag-pinned jsDelivr URL against
    `css/index.css` is the supported path for zero-build surfaces with no
    `package.json`. Full tags only, tags never move, and anything with a
    build still imports from node_modules. Entry 2's ban carried no recorded
    rationale; the third-party origin it avoided was already accepted for
    the mandatory Google Fonts link.
38. `.btn` gained `text-decoration: none`: anchor buttons showed the UA
    underline. Surfaced by the first real consumer page; the showcase had
    silently carried the same patch. `.btn-flat`, `.btn-text`, and
    `.btn-icon` carry it too — they are used standalone, without `.btn`.
39. Links implemented in the tokens reset (blue at rest, hover underline):
    the color spec assigned the semantic but shipped no mechanism, so every
    consumer re-invented it. Link-wrapped accent cards inherit instead.
40. Accordion labels learned trailing meta (`<b>` title grows, meta rides
    the chevron) and `.accordion-stack` shipped for grouping inside a
    panel — both re-derived by hand on the first consumer page.
41. `.prose` content region added: bare paragraphs and lists inside folds,
    panels, and modals read as system copy without per-element classes. The
    scoped exception to the bare-element ban.
42. `.dock` added: floating bottom-center chrome composed from the topbar's
    translucent blur, `--shadow-pop`, and flat buttons with the engaged
    active state.
43. Entry 41 reverted and inverted: `.prose` deleted, the copy voice became
    a given in the tokens reset (body voice, heading color, list geometry).
    An opt-in content class earns its keep when chrome would inherit the
    defaults; here every recipe pins its own font, so the class was pure
    ceremony.
44. Entry 42 reverted: `.dock` removed. Section-switching chrome didn't
    earn a recipe — a short page scrolls, and anything bigger takes the
    topbar as its spine.
45. Entry 39 amended: links flipped from blue to mauve with the pink hover
    and no underline in either state — `.btn-text`'s treatment exactly.
    Links are brand moments; blue stays a semantic tone (info), not the
    link color.
46. `em` became a given accent (mauve, upright) in the tokens reset; the
    display-title rule that pioneered it was absorbed. `<i>` keeps italics.
47. `.app-shell` became a flex column with `> main` absorbing the slack —
    the sticky footer stopped being a consumer pattern.
48. `.topbar nav` (flat-button row) and `.wordmark` shipped; the showcase
    and the first consumer page had each hand-rolled the same wordmark.
49. Accordion titles grew a second variant: `<b>` bold, `<p>` regular
    weight, both growing so the meta rides the chevron.
50. `.deck` shipped: hash-routed views on `:target`/`:has`, first child as
    default, deep links resolving to their view. Nav engaged-state mapping
    stays consumer CSS — CSS cannot correlate hrefs to targets.
51. 520px responsive: accordion stacks tighten and label metas hide —
    decoration yields before content.
52. The accent card became a plate card. The left spine, the corner
    gradient and the accent-mix lit inset were paint: three stock moves
    stacked on one card, and six of them in a grid read as a template. The
    accent now lives in the hard offset (`--plate`, accent 50% into
    surface-0, the primary button's rule for a colored offset) over
    `--neu-raised-soft`, and the card presses with the canon half-slide.
    Hover lifts the card off the plate and grows the plate by one pixel so
    the lift reads (1px alone did not). `.cn-spine` stays, for position only.
    The showcase dropped the "Team" microlabel from every card: the plate is
    the identity, the eyebrow was costume.
53. Motion tokens shipped: `--ease-out`, `--ease-in`, `--ease-spring`,
    `--t-fast/base/slow`. Before this every transition in the package rode
    `ease` (sixteen of them), `linear` or `ease-in-out`, and nothing had a
    custom curve, which is the single biggest reason the system moved like
    a template. Presses go down on the fast-out in .08s and return on the
    spring (buttons, segmented options, pressables, the accent card);
    overlays arrive on the fast-out and leave on the ease-in in .14s; the
    toast slides in from the edge it lives on instead of rising from
    nowhere; the focus ring settles outward from 0 to 3px; the checkbox
    presses and its check lands on the spring; the switch paddle lands with
    a bounce and its glow blooms while held; tooltips wait .4s and rise
    2px; table rows and links fade instead of snapping; `.page-enter`
    staggers its children 40ms apart; the topbar's cast fades in over the
    first 60px of scroll where scroll-driven animation is supported; the
    progress fill decelerates over .6s.
54. Display type loosened: `.cn-display`, `.cn-display-sm` and
    `.display-title` went from 820/-.055em to 760/-.03em. Inter's optical
    size already tightens at display sizes; the manual tracking doubled up
    and closed the counters.
55. The progress fill defaults to `var(--accent)`; the mauve-pink-peach
    gradient became an opt-in via `--progress-fill`. It was the only
    three-color object in a one-accent system.
56. Row hover carves the whole row, not each cell: the row-press composite
    replaced the per-cell soft inset, which drew seams at every column edge.
    Wash 5% to 6%.
57. An open accordion wears the engaged treatment (full inset, mauve 4%
    wash, mauve title). The soft inset alone was invisible on base.
58. Placeholders moved from overlay-0 to overlay-1: the carve darkens the
    ground they sit on.
59. The scrim went from crust 74% + 6px blur to crust 80% + 2px blur. The
    blurred scrim was the one surface behaving like a different substance.
60. `.empty-state` learned a glyph plate: an `svg` first child on a 56px
    carved round.
61. Docs chrome: demo stages lost their dashed frame for a soft hairline and
    the copy line became a flat row; close and dismiss buttons draw a
    stroke glyph instead of a text character; the depth page shows the soft
    pair on a chip and a checkbox.
62. Reviewed and withdrawn: lighting the primary button's hover by mixing
    mauve toward rosewater (it makes a hex Mocha doesn't have; the pink
    hover stays), and a numbered-mark stepper (the pills stay).
63. Validation states dropped the 2px tone ring for a 4% tone wash on the
    well, the accordion's engaged rule. An inset surface stays defined by
    depth, and the ring had been doing two jobs (validity and focus) at
    once. Focus is the mauve ring again, over the wash. A tinted carve was
    tried and rejected: a colored inner shadow reads as a glowing pit, not
    as material.
64. The tone tint became one number. `.cn-tint`, `.banner` (7%) and
    `.chip-tone` (8%) all went to 4%, the input wash's number. Rendered side
    by side the banners lost nothing, because the hairline and the tone text
    were carrying them; the rule is now one sentence: a tinted surface is
    the tone at 4% over whatever it sits on. The mauve engaged wash
    (`.cn-engaged`, `.btn-flat` pressed, `.segmented > .active`) stays at 7%.
65. v0.2.0. The layer order flipped to tokens, recipes, utilities, so a
    utility on an element beats the recipe on it. An audit of the six
    consumers (about 1,900 lines of custom CSS) found three of them carrying
    the same comment about the well's transparent ground winning the
    cascade, and two restating the whole engaged treatment because
    `.cn-engaged` could not beat a recipe. `.cn-scrim` moved to recipes.
66. Mix tokens: `--edge`, `--edge-soft`, `--tint`, `--wash` carry the
    shared color-mix expressions and map into the Tailwind preset as
    `border-edge`, `bg-tint`, `bg-wash`.
67. Layout utilities on a six-step scale (4, 8, 12, 16, 22, 28): row, stack,
    cluster, column grids, gap, padding, top and bottom margin, divide,
    truncate, icon sizes, and `cn-code-meta`. The consumers had over thirty
    hand-written flex rows and about ten truncations between them.
68. `.page-main` and `.footer-brand` shipped; the footer follows
    `--page-width`; `.app-shell` fills the viewport. All six consumers had
    written the page column.
69. `.command` shipped: the copyable command line that harness-racer, salt,
    varchar and the docs site had each built.
70. Native `dialog.modal` and `dialog.drawer` hosts, with `::backdrop` as the
    scrim and the overlay motion on discrete transitions.
71. Sizes: `.btn.is-sm`, `.btn.is-lg`, `.btn-icon.is-sm`, `.btn-icon.is-lg`.
    Buttons, flat and text buttons, icon buttons, chips, banners, segments
    and the wordmark size their own svg; no consumer sizes an icon by hand.
72. Topbar `is-split` and `is-compact`; the wordmark takes a mark and an
    `is-lg` size; `.panel-body` is the panel's content band.
73. States as attributes: the segmented selection answers to
    `aria-pressed` and `aria-checked` as well as `.active`; flat buttons to
    `aria-current`; the accordion opens on `.is-open` or `data-open` as
    well as its checkbox; a field is in error when any control inside it is
    `aria-invalid`, and a bare input when it is.
74. `data-density="dense"`: 28px controls, 2px offset, and the data surfaces
    tightened with them (table cells 6px 9px, chips, panel bands, flat
    buttons, the topbar). Compact was tuned for forms; varchar ran compact
    and still overrode every readout.
75. Tailwind: the preset and theme gained the motion tokens, the spacing
    scale, the type roles and the mix colors, and the v4 import order is
    documented: package first, then Tailwind, or a utility loses to a
    recipe on the same element.
76. v0.2.1. The preset's spacing keys came back out. Pixel-named keys
    (`4: "4px"`) extended over Tailwind's own `4` (16px), `8`, `12`, `16`
    and `28`, so every `gap-4` in a consumer shrank on upgrade; found by
    the consenStat upgrade. Tailwind's default steps already hold the six
    values (1, 2, 3, 4, 5.5, 7), so nothing is remapped.
77. v0.2.2. Two native-dialog gaps found by the varchar upgrade: a closed
    `dialog.drawer` kept the recipe's `display: flex` over the UA's closed
    state and stayed in the tree off screen, and the UA's 3px border showed
    on the drawer's three unstyled sides. Closed dialogs are `display: none`
    and the drawer keeps only its left hairline. `.command.is-wrap` wraps a
    long statement instead of scrolling it.
78. v0.3.0. What the consumers were still restating after v0.2 became
    classes: `.cn-text-center/-right/-left`, `.cn-list-none`,
    `.cn-scroll-x`, `.cn-sticky-top`; `.metric.is-value-first` (value over
    label); `.empty-state.is-fill` (fills its pane); `.chip.is-glyph`
    (icon-only at any width; the 760 collapse uses the same rule);
    `.table-scroll` as a recipe, with the panel corner rules reaching
    through it so a wrapped table keeps the panel's corners. Documented
    that `cn-microlabel cn-text-*` composes, since the color utilities come
    after the type roles; harness-racer had restated the tracked label six
    times for six colors.
79. v0.3.1. `.command-copy` is 34px at every density. It had tracked
    `--control-h-sm`, so under dense it shrank to 22px inside a well built
    for 34 and the glyph floated bare with the wrong gap (varchar).
80. v0.3.2. An exclusive accordion group can close fully. Radios cannot
    uncheck themselves, so the docs had said "use checkboxes" and lost the
    exclusivity; the closable listener (arm the checked radio on press,
    uncheck it on the click that follows) keeps both. The showcase runs it.
