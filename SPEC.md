# catppuccin-neu design system spec

The Catppuccin Mocha + neumorphic design language, packaged for all future
projects. This file and the CSS in `css/` are the single source of truth; the
skill at `~/.claude/skills/catppuccin-neu/` (SKILL.md + `reference/*.css`) is
generated from this package and follows it.

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
- **Mono is scarce.** The mono face appears only in code-like contexts:
  `.cn-code`, `.terminal`, `.codeblock`. Every other role is sans. Numbers
  keep `font-variant-numeric: tabular-nums` on the sans face.
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
(`github:BalajiLeninrajan/catppuccin-neu#<tag>`). Zero-build consumers vendor the CSS
via `scripts/sync.mjs`. No CDN. The repo is public at
github.com/BalajiLeninrajan/catppuccin-neu, tagged v0.1.0; the docs deploy as
the `catppuccin-neu` Cloudflare Worker at
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
@layer cn.tokens, cn.utilities, cn.recipes;
@import "./tokens.css" layer(cn.tokens);
@import "./utilities.css" layer(cn.utilities);
@import "./recipes.css" layer(cn.recipes);
```

Consumer CSS is unlayered (or in a later layer) and always wins; overrides
never need `!important`. The three files also work as plain `<link>` tags in
order (tokens, utilities, recipes) without index.css: no file depends on being
inside a named layer.

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
```

Fixed-size exceptions that do not track density: checkbox and radio (20px),
switch (50x28), avatar (32px, 44px for `.is-lg`).

### Depth canon: the hard offset and the half-slide

The hard offset shadow is available to any clickable control, and clickable
controls in the shipped recipes default to it (primary, secondary, segmented
at rest). The press is a half-slide, always half the offset:

- rest: `box-shadow: var(--hard-offset) var(--hard-offset) 0 var(--hard-offset-color)`
- hover: `translate(-1px, -1px)`
- active: `translate(calc(var(--hard-offset) / 2), calc(var(--hard-offset) / 2))`
  with the shadow shrinking to the same half offset

Primary buttons keep the hard offset fleet-wide; softening it is a violation.

### Global rules worth knowing

- `:focus-visible { outline: 2px solid var(--mauve); outline-offset: 3px; }`
  and `::selection` inversion (crust on mauve), everywhere, no exceptions.
- Bare links get `border-radius: 4px` so keyboard outlines follow the system
  geometry, never a sharp rectangle.
- `.page-enter` has no animation fill-mode: a held transform would make the
  element a permanent containing block for every fixed descendant (scrims,
  modals, drawers, toasts).
- Four keyframes only: `enter`, `spin`, `pulse`, `blink`.
- The reduced-motion block collapses all animation and transitions.

## css/utilities.css (layer cn.utilities)

Single-purpose classes, blessed values only; no utility takes a numeric
parameter. Prefix `cn-`.

### Depth

| Class | Value |
|---|---|
| `.cn-raised` | `var(--neu-raised)` |
| `.cn-raised-soft` | `var(--neu-raised-soft)` |
| `.cn-raised-lit` | raised + `inset 1px 1px` surface-2 30% mix (larger surfaces only) |
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

- `.cn-pressable`: `transition: transform .16s, background .16s, border-color
  .16s, box-shadow .16s`; hover `translateY(-1px)`, active `translateY(1px)` +
  `--neu-inset-soft`. The soft-control press.
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

No bare font-family utility exists: pick the role, not the face. All roles are
sans except `.cn-code`.

- `.cn-label`: `650 11px/1 var(--sans)`, `.04em`, uppercase, overlay-2.
- `.cn-microlabel`: `700 9px/1 var(--sans)`, `.08em`, uppercase, overlay-1.
- `.cn-value`: `650 21px/1 var(--sans)`, tabular-nums.
- `.cn-value-lg`: 28px variant, color `var(--accent)` (opt out via a color
  utility).
- `.cn-meta`: `550 11px/1.5 var(--sans)`, tabular-nums, overlay-1.
- `.cn-eyebrow`: `700 11px/1 var(--sans)`, `.08em`, uppercase, mauve, flex
  row with 8px gap.
- `.cn-code`: `500 13px/1.6 var(--mono)`, tabular-nums. The one mono role.
- `.cn-display`: `clamp(38px, 5vw, 64px)`, line-height .98, `-.055em`, weight
  820, `text-wrap: balance`; `em` renders mauve, no italic.
- `.cn-display-sm`: `clamp(30px, 4.6vw, 46px)`, `-.045em`, weight 820.
- `.cn-title`: 20px, weight 800, `-.03em`.
- `.cn-name`: `700 13px/1.3 var(--sans)`, `var(--text)` (emphasized proper
  names).
- `.cn-lede`: 16px/1.65, subtext-1, max-width 690px.
- `.cn-copy`: 13px/1.6, subtext-0.

### Color

- Text: `.cn-text-{text,subtext-1,subtext-0,overlay-2,overlay-1,overlay-0,
  mauve,pink,red,green,peach,yellow,blue,teal,lavender}`, `.cn-text-accent`
  (`var(--accent)`), `.cn-text-tone` (`var(--tone)`).
- Backgrounds: `.cn-bg-base`, `.cn-bg-mantle`, `.cn-bg-crust`, `.cn-bg-well`
  (crust 38% into mantle), `.cn-bg-head` (crust 30% into mantle), `.cn-tint`
  (tone 7% wash), `.cn-tint-accent` (135deg gradient, accent 8% into mantle
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
- `.cn-scrim`: fixed inset overlay, crust 74% mix, `backdrop-filter:
  blur(6px)`, z-index 70.
- `.cn-sr-only`: standard clip pattern.
- `.cn-hidden`: `display: none !important`.
- (`.scroll-well`, `.app-shell`, `.page-enter`, `.live-dot` live in
  tokens.css; do not duplicate.)

## css/recipes.css (layer cn.recipes)

Every recipe reads tokens and contract props only (`--accent`, `--tone`,
`--hard-offset-color`, `--hard-offset`, the density knobs). Recipes never
style bare element selectors (the tokens reset aside); `.table-neu` scopes all
table styling.

### Surfaces

- `.panel`: the primary content container. 1px `cn-edge`-mix border,
  `var(--pane-radius)`, `--base` background, `--neu-raised` plus the lit
  top-left inset hairline (surface-2 30% mix).
- `.panel.is-tilted`: `rotate(1.2deg)` + `10px 10px 0 var(--hard-offset-color)`.
  The one rotated hero card; flattened at 1060px and below.
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
  `500 11px/1.65 var(--mono)`; `.caret` is a 6x14 blinking block in
  `var(--accent)`.
- `.topbar`: sticky, min-height 68px, translucent base (91%) + `blur(14px)`,
  bottom hairline, `--shadow-cast` + lit hairline. Three-column grid.
- `.empty-state`: centered column, min-height 260px, overlay-1.

### Buttons

Compose `class="btn btn-primary"`. All labels sans; heights from the density
knobs. `.btn`: min-height `var(--control-h)`, padding 0 18px, 10px radius,
`780 13px var(--sans)`; disabled is `.35` opacity + `--neu-inset-soft`.

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

`.field label`: block label, `650 11px/1 var(--sans)`, uppercase, overlay-2.

`.input` (and `.field input/select/textarea`): a borderless inset well carved
from whatever surface it sits on. `border: 0`, `background: transparent`,
`--neu-inset`, height `var(--input-h)`, 13px radius, 14px inline padding, sans
13px with tabular-nums. Placeholder overlay-0.

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
  `--tone` (red / peach) and ring the well `0 0 0 2px var(--tone)` over the
  inset, staying through focus; label and `.field small` (the 11px helper or
  message line) tint with it. Disabled wins over both by source order. Set
  `aria-invalid` alongside `.is-error`.

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
11px) above the element, shown on hover and `:focus-visible`, fading via
opacity + visibility. Never use `title=`; it renders the OS tooltip.

### Segmented and stepper

`.segmented`: equal-column grid, 7px gap. Options carry the hard offset at
rest (min-height `calc(var(--control-h) + 12px)`, 10px radius, `--base`),
lift on hover with a mauve-mix border, half-slide while held, and take the
engaged treatment when selected (`.active`: `translateY(1px)`, transparent
border, mauve 7% wash, `--neu-inset`; the `b` label turns mauve). The
half-slide is transient only; the settled state never slides.
`label:has(input:focus-visible)` gets the standard outline. `.is-stacked`:
row flow, 12px gap, roomier rows, 17px labels.

`.stepper`: phase track of borderless inset pills (999px radius, `cn-bg-well`
mix, `--neu-inset-soft`, `650 9px var(--sans)` uppercase). Current phase via
`.active` or `[aria-current="step"]` (mauve + mauve 8% wash); completed via
`.is-done` (green).

### Marks, chips, banners

- `.mark-solid`: 28px solid square in `var(--accent)`, crust glyph, 8px
  radius, `--shadow-mark`, currentColor 14% edge, `800 11px var(--sans)`
  tabular.
- `.chip`: outlined pill, `--base`, `--neu-raised-soft`,
  `600 11px var(--sans)` tabular.
- `.chip-tone`: tinted status tag, 4px radius, tone 8% wash, tone 45%
  hairline, `750 8px var(--sans)` uppercase. Pass the color via `.cn-tone-*`.
- `.banner`: semantic tint band, 10px radius, tone 7% wash, tone 25% into
  surface-0 edge, `--neu-inset-soft`, 12px text.

### Selection controls

`.choice`: labeled row, `<label class="choice"><input …>Text</label>`, 10px
gap, sans 13px; `:has(:disabled)` dims to `.5`.

- `.checkbox`: 20px, 4px radius, transparent background, `--neu-inset-soft`,
  hairline (surface-2 55% mix). Checked: mauve fill + border, crust checkmark
  (a masked `::after` scaling in), soft inset kept plus the
  `rgb(255 255 255 / .16)` top edge.
- `.radio`: same edged well, round. Deliberate asymmetry: the checkbox
  signals with its fill and stays on the soft inset; the radio only gets a
  dot, so checked deepens to full `--neu-inset` with a mauve-mix border. The
  dot is 9px mauve with the halo ring composite
  (`0 0 0 3px color-mix(in srgb, var(--mauve) 13%, transparent)`, the
  `.live-dot` pattern).
- `.switch`: an abstract light switch, 50x28, 8px radius, transparent carved
  plate (`--neu-inset`). The `::after` paddle (21x22, 6px radius, `--base`,
  raised-soft + lit edge, hairline) tilts `perspective(120px) rotateY(16deg)`
  at rest; checked slides it `translate 23px`, flips the tilt to -16deg, and
  lights it mauve with a whisper glow
  (`0 0 6px color-mix(in srgb, var(--mauve) 18%, transparent)` + the white
  inset edge). While pressed the paddle flattens
  (`rotateY(0) scale(.96)`).

### Accordion

The whole open item sinks in place: carved (`--neu-inset-soft`), title and
body together, vertical growth only. Closed rows stay flat with straight
dividers; radius (10px) and shadow appear only while open.

Mechanism: a label + hidden checkbox, with the fold transitioning
`grid-template-rows: 0fr` to `1fr` (.3s; the .2s carve runs with it, no
sequencing). Markup:

```html
<div class="accordion">
  <label><input type="checkbox">Title</label>
  <div class="fold"><div>…body…</div></div>
</div>
```

Radios sharing a name give an exclusive-open group. The input is visually
silent but keyboard-reachable; its focus ring draws on the label. Space
toggles natively; Enter support is one consumer line:

```js
el.addEventListener("keydown", e => {
  if (e.key === "Enter" && e.target.matches(".accordion input")) e.target.click();
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
into mantle, accent 38% edge, `--neu-raised-soft`, `700 11px var(--sans)`.
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

`.accent-card`: keyed by `--accent`. 13px radius, accent 28% edge, the
`cn-tint-accent` gradient, `--neu-raised-soft` plus an accent-mix lit inset,
and the left spine (`::before`, 4px, accent). Cards wrapped in a link lift on
hover (`--neu-raised`, stronger edge) and press in on click (inset-soft);
`a:has(> .accent-card)` takes the 13px radius so the focus ring traces the
card.

### Data display

- `.metric`: micro-label over an oversized tabular number
  (`650 21px var(--sans)`); `.is-hero` is 28px in `var(--accent)`.
- `.stat-row` / `.stat-strip`: label/value baseline rows separated by
  soft hairlines.
- `.progress-track`: 7px, 999px radius, `--crust` fill + `--neu-inset-soft`
  (the track keeps its fill; at 7px a carve reads as mud). The fill span
  inherits the radius (no overflow clipping) and runs the
  mauve-pink-peach gradient; width transitions .35s.
- `.table-neu`: opt-in class on `<table>`; scopes all table styling. Header:
  `cn-bg-head` mix, `650 10px var(--sans)`, overlay-1. Cells:
  `600 13px var(--sans)` tabular, subtext-1. Row hover presses in: mauve 5%
  wash + `--neu-inset-soft` on the cells, not the row (with border-collapse
  a td radius cannot clip a tr background, so cell fills stay inside a
  rounded parent's corners). `.cell-name` for the emphasized two-line cell.
  Give each data cell `data-label`; it becomes the card label at 760px.
- `.ranked-row`: ordered list line (rank mark, name, trailing value), same
  hover press.

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
  `:hover` or `:focus-within` fans it back into the column.
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

Specs: scrim fades and un-blurs .2s; modal fades + rises 8px + scales
.98 to 1 (.2s); drawer slides from the right edge (.26s); popover fades +
drops 4px (.16s); toast fades + rises 6px (.2s). A modal or drawer inside a
scrim rides the scrim's `[hidden]`. The motion rules sit after the component
blocks so `[hidden]` wins. Consumers that unmount instead of hiding get the
entrance only. The reduced-motion block collapses all of it.

### Page furniture

- `.eyebrow`, `.display-title`, `.lede`: aliases of the type roles, kept for
  base-layer compatibility.
- `.footer-neu`: page footer, `min(1440px, calc(100% - 40px))`, surface-0
  top rule, sans meta.
- The main-column pattern is applied by the consumer, not the package:
  `main { width: min(1440px, calc(100% - 40px)); min-width: 0; margin: 0
  auto; position: relative; z-index: 1; }`.

### Responsive

Three breakpoints, always these three. Each removes decoration before it
removes content.

- **1060**: the tilted card flattens (back to raised-lit), secondary nav
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

`src/nav.ts` is the single registry for routes, sidebar order, and titles.
Each page: short intro prose, specimens with copyable class strings
(`.cn-code`, click to copy), variants, states. Demo stages sit on `--base`:
components live on the page ground, and neumorphic depth only reads when the
surface matches its background (the well is shown as itself on its own page).
The site is the visual-regression reference: every recipe and state appears
at least once.

## Verification rules (what reviewers check)

1. Every `box-shadow` in utilities/recipes is one of: the four neu tokens,
   `--shadow-pop/cast/mark`, the hard-offset family (`var(--hard-offset)`
   and its half-press, `10px`, `3px`), the focus ring `0 0 0 2px` mauve
   layered on an inset, or a documented composite: the lit-edge insets
   (surface mixes and the two blessed whites), the halo ring
   `0 0 0 Npx color-mix(… 13%, transparent)` used by `.radio` and
   `.live-dot`, the avatar-stack ground ring `0 0 0 2px var(--base)`, and
   the switch glow `0 0 6px` mauve 18%.
2. Every color literal is a Mocha hex from tokens.css, `currentColor`,
   `transparent`, a `color-mix(in srgb, …)` of tokens, or the two blessed
   whites (`rgb(255 255 255 / .16)` primary highlight, `/ .1` mark
   highlight). Data-URI glyphs use palette hexes; mask images are exempt
   (alpha only).
3. Every radius resolves to the blessed scale (16/13/10/8/4/999/50%, 6px on
   decorative sub-corners, 12 only via `--pane-radius` under compact
   density) or the band pattern `calc(<parent radius> - 1px)`.
4. Mono scarcity: flag any `var(--mono)` outside `.cn-code`, `.terminal`,
   `.codeblock`. Numbers get `tabular-nums` on the sans face.
5. Transitions .16 to .3s per the documented values (.35s progress); the
   four keyframes only; the reduced-motion block survives.
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
2. Distribution as a git-URL npm dep plus `sync.mjs` vendoring; no CDN.
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
    inset) and the code block copy control.
