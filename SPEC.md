# catppuccin-neu — design system spec

> **REVISION 2 — user design review (2026-08-24). This section OVERRIDES any
> conflicting text below it.** The system is for all future projects, not just
> the original five; the fleet inventory below remains as provenance only.

**R1 — Generic, project-neutral content.** The showcase, README, and all CSS
comments must never reference the source projects (no exams, races, benchmarks,
harness/word/skill content, no project names). Examples use neutral product
content (dashboards, settings, invoices, messages, generic data).

**R2 — Panel band corners.** `.panel-heading` / `.panel-footer` (and any child
band of a rounded surface) must respect the parent radius:
heading `border-radius: calc(var(--pane-radius) - 1px) calc(var(--pane-radius) - 1px) 0 0;`,
footer the mirror. Audit every recipe that places a filled child band inside a
rounded parent for the same bug. Do not fix with `overflow: hidden` (it clips
popovers and hard-offset shadows).

**R3 — Multi-page docs.** The showcase becomes a shadcn-style docs site: fixed
left sidebar nav (grouped: Getting started / Foundation / Components), one page
per topic, real-path routing (preact-iso) with wrangler
`not_found_handling: "single-page-application"`. Pages: Introduction (install +
layer model), Colors, Typography, Depth, Density & contract props; then one page
per component: Button, Input & Field, Segmented, Stepper, Chip, Banner, Surfaces
(panel/well), Accent card, Stat, Progress, Table, Terminal, Popover, Modal,
Drawer, Toast, Empty state, Page furniture (topbar/footer/eyebrow/display).
Each page: short intro prose, specimens with copyable class strings, variants,
states.

**R4 — Depth contrast retune.** The soft/regular pairs are visually
indistinguishable; separate them. New token values (tokens.css):
```css
--neu-raised:      8px 8px 18px rgb(17 17 27 / .66), -4px -4px 10px rgb(69 71 90 / .22);
--neu-raised-soft: 3px 3px 8px  rgb(17 17 27 / .44), -2px -2px 5px  rgb(69 71 90 / .16);
--neu-inset:       inset 3px 3px 7px rgb(17 17 27 / .66), inset -3px -3px 7px rgb(69 71 90 / .24);
--neu-inset-soft:  inset 2px 2px 5px rgb(17 17 27 / .52), inset -2px -2px 4px rgb(69 71 90 / .18);
/* Both soft tokens strengthened by review 2026-08-24: the earlier
   half-strength values were too faint on small surfaces. */
```
Rule of thumb going forward: soft ≈ half the offset/blur *and* half the
strength of its regular partner, so the pair reads as two distinct elevations
at a glance. `--neu-dark`/`--neu-dark-soft`/`--neu-light-soft` primitives update
consistently with these.

**R5 — Specimens sit on `--base`.** Components live on the page ground, and
neumorphic depth only reads when the surface matches its background. Demo
stages in the docs use `--base` (no well/mantle stage). The well remains a
component, shown as itself on its own page.

**R6 — Names describe style, never purpose.** `btn-add` → **`btn-dashed`**.
Audit every class: names must describe appearance/genre (chip, banner, panel,
dashed, tilted, spine), never an action or role (add, back, search, submit).
Genre names for component species (banner, chip, stat, terminal) are fine;
action/role names are not. The `.search` wrapper renames to a style name
(e.g. `.input-icon`). Update the Tailwind preset and all docs to match.

Contract props unify under the same rule: `--entity-color` and `--accent`
merge into one prop, **`--accent`** (default `var(--mauve)`) — the
per-instance accent read by the accent card's spine/gradient/border,
`mark-solid`'s fill, `.cn-value-lg`, the terminal caret, and the
`cn-text-accent` / `cn-tint-accent` / `cn-edge-accent` / `cn-spine`
utilities (renamed from their `-entity` forms). `.entity-card` renames to
**`.accent-card`**. Contract props are now: `--accent`, `--tone`,
`--hard-offset-color`, plus the density knobs.

**R7 — No exceptional elements.** Every recipe is a general-purpose component:
no variant may exist only as "the X from project Y" and none may be documented
as single-use. Anything that can't be generalized is deleted from the package
(projects keep such things in their own local layer).

**R8 — Borderless inset depth (the input rethink).** Inset surfaces get their
definition from depth, not strokes: `.input` (and select/textarea) drops its
1px border entirely, and — per the follow-up review — paints **no background of
its own**: `background: transparent`, so the field is carved from whatever
surface it sits on (panel, well, or the page), which is what makes the inset
read as depth rather than a dark slab. Geometry loosened to match: 13px radius,
14px inline padding, and `:focus` adds a solid 2px mauve ring over the inset
(no border swap). `.well` follows the same carved-transparent rule (compose
`cn-bg-well` when an explicit fill is wanted); `.terminal` keeps its crust fill
deliberately (code surface). *(Amended by R3 below: the progress track is also
carved-transparent.)*

> **REVISION 3 — follow-up review (2026-08-24).**
> 1. Flat controls press too: `btn-ghost`/`btn-icon`/`btn-dashed` get
>    `:active` → `translateY(1px)` + `--neu-inset-soft`; `btn-text` translates
>    only.
> 2. Selects carry a chevron glyph (overlay-1 hex in a data-URI SVG, right
>    13px, 15px) so they read as dropdowns; trailing padding 40px.
> 3. Inputs suppress the global `:focus-visible` outline — the solid mauve
>    ring over the inset is the one focus indicator (text fields match
>    `:focus-visible` even on pointer focus, which doubled the ring).
> 4. Disabled fields flatten: `--neu-inset-soft`, `--overlay-0` text, `.6`
>    opacity, `not-allowed` cursor.
> 5. `.well` deepens to full `--neu-inset`.
> 6. `.well.scroll-well` dissolves its bottom 34px via `mask-image` (a sticky
>    `::after` band was tried first and broke against the well's padding) —
>    the scroll cue.
> 7. ~~`.progress-track` carved-transparent~~ — tried and REVERTED: at 7px
>    tall the carve reads as mud; the track keeps its crust fill +
>    `--neu-inset-soft`.
> 8. `.page-enter` drops its animation fill-mode: a held transform made the
>    element a permanent containing block/stacking context, trapping fixed
>    overlays (the modal-in-an-iframe bug).

> **REVISION 4 — overlay motion (2026-08-24).** Popover, modal, drawer, toast,
> and the scrim animate on enter AND exit. Mechanism: transitions +
> `@starting-style` for entry; exit by setting `[hidden]`, which keeps the
> element's `display` and drops **`visibility`** instead — visibility
> transitions discretely everywhere (visible for the whole exit, flipping at
> the end), unlike `display` + `allow-discrete`, which was tried first and
> only works in the newest engines. A hidden overlay is invisible,
> unfocusable, and pointer-inert, same as display:none for a fixed element.
> Specs: scrim fades + un-blurs .2s; modal fades + rises 8px + scales .98→1
> (.2s); drawer slides from the right edge (.26s); popover fades + drops 4px
> (.16s); toast fades + rises 6px (.2s). A modal or drawer inside a scrim
> rides the scrim's `[hidden]`. Consumers that unmount instead of hiding get
> the entrance only. The tokens' reduced-motion block collapses all of it.

> **REVISION 5 — footer bands (2026-08-24, band study).** Headers and footers
> stop being twins. The **heading** keeps its crust-mix fill + divider +
> corner-following radius — it anchors. The **footer** paints no fill and
> carries no depth: it sits on the panel's own ground, separated by the
> divider line alone (`border-top: 1px solid` surface-1 40% mix). Applies to
> `.panel-footer` everywhere it composes (panels, modals) and to popover and
> drawer footer bands. Rationale: A/B/C/D/E were tried live; the raised-soft
> footer (E) won on looks, revealing its whole contribution was gentle
> separation — which the divider does honestly, without bending the depth
> grammar (inset = engaged, raised = untouched control).

> **REVISION 6 — new components (2026-08-24, gap review vs fiveoutofnine).**
> Selection controls: `.choice` label row, `.checkbox` and `.radio` as edged
> wells that fill mauve when selected (they keep a hairline: at 20px the
> carve alone is invisible), and `.switch` as an abstract light switch
> (50×28): a carved plate holding a raised paddle that slides across, flips
> its tilt (`perspective rotateY ±16°`), and lights mauve with a soft glow
> when on, the glow a whisper (6px at mauve 18%). ~~Three I/O rocker
> variants (glyph halves, seesaw fold, hinged angled paddle after uiverse)
> were tried and REVERTED~~: none read cleanly at control size; the sliding
> paddle stays canon. The whole open accordion item sinks in place: carved
> (inset-soft, title and body together), vertical growth only; closed rows
> stay flat with straight dividers, radius and shadow appear only while
> open. ~~`details.accordion` with `::details-content` height animation~~
> REPLACED: details cannot animate its close outside Chromium, so the
> accordion is a label + hidden checkbox and the fold transitions
> `grid-template-rows 0fr→1fr` (.3s; the .2s carve runs with it, no
> sequencing) — plays in every modern browser, no JS. The trade: checkbox
> semantics instead of disclosure semantics.
> `.avatar` (initials or image on an accent-tinted round, `.is-lg`,
> `.avatar-stack`). `.codeblock`, a carved mono snippet well; with the
> terminal it is one of the two mono surfaces. `.is-numbered` draws a line
> gutter with CSS counters (one element per line, no JS); five `.tok-*`
> classes carry the highlight palette, tokenizing itself is a consumer
> build step. Also: the select picker
> restyles via `appearance: base-select` + `::picker(select)` where
> supported (Chromium 135+), and `[data-tip]` draws the system tooltip, so
> `title=` is never used. Deliberately skipped: hover card (compose popover),
> tabs (segmented is the tab bar).

Apply the same
"depth replaces border" principle across inset surfaces (wells, terminal,
progress track, engaged states): remove hairlines where the depth already
separates the surface; keep hairline borders only on *raised* surfaces where
the lit edge needs support (panel, popover) and on tinted semantic surfaces
(chip-tone, banner) where the tint needs an edge.

**R9 — Mono is for code, rarely anything else.** The mono face is reserved for
code-like content: `.cn-code`, `.terminal`, actual code/CLI strings. Everything
previously mono — labels, microlabels, eyebrows, values, metadata, chips,
table headers and cells, footer meta, popover content — becomes **sans** (keep
the small sizes, weights, uppercase + letter-spacing where specified; numbers
keep `font-variant-numeric: tabular-nums`, now on the sans face). The type
roles table below is superseded accordingly: same class names, same
size/weight/tracking, `var(--sans)` instead of `var(--mono)` everywhere except
`.cn-code`. Table recipes (`.table-neu`) set sans + tabular-nums. Update the
verification rules: the old "mono/sans split" check becomes "mono scarcity" —
flag any `var(--mono)` outside code/terminal contexts.

---

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
   *(Superseded by R6: `--entity-color` merged into `--accent`.)*
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
/* (Superseded by R6: --entity-color and --accent merged into --accent.) */
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

The entity color cycle *(per R6 now the **accent cycle**)* (documented in a
comment): `#cba6f7, #94e2d5, #f9e2af, #89b4fa, #fab387, #f5c2e7`
(mauve, teal, yellow, blue, peach, pink).

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
- `.cn-value-lg` — 28px variant, color `var(--entity-color, var(--mauve))` opt-out via color utilities. *(Superseded by R6: reads `var(--accent)`.)*
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

- Text: `.cn-text-{text,subtext-1,subtext-0,overlay-2,overlay-1,overlay-0,mauve,pink,red,green,peach,yellow,blue,teal,lavender}` plus `.cn-text-entity` (`var(--entity-color)`) *(superseded by R6: `.cn-text-accent`, `var(--accent)`)*, `.cn-text-tone` (`var(--tone)`).
- Backgrounds: `.cn-bg-base`, `.cn-bg-mantle`, `.cn-bg-crust`, `.cn-bg-well` (`color-mix(in srgb, var(--crust) 38%, var(--mantle))`), `.cn-bg-head` (`color-mix(in srgb, var(--crust) 30%, var(--mantle))`), `.cn-tint` (`color-mix(in srgb, var(--tone) 7%, transparent)`), `.cn-tint-entity` (`linear-gradient(135deg, color-mix(in srgb, var(--entity-color) 8%, var(--mantle)), var(--mantle) 48%)`) *(superseded by R6: `.cn-tint-accent`, keyed by `--accent`)*.
- Tone setters: `.cn-tone-{red,green,peach,yellow,blue,mauve}` set `--tone` only.

### Borders

- `.cn-edge` — `border: 1px solid color-mix(in srgb, var(--surface-2) 40%, transparent);`
- `.cn-edge-soft` — surface-1 38% mix (wells, inner separators).
- `.cn-edge-line` — `border: 1px solid var(--surface-0);` (row separators, footer rules)
- `.cn-edge-mauve` — mauve 30% mix. `.cn-edge-tone` — tone 25% into surface-0. `.cn-edge-entity` — entity 28% into surface-0. *(Superseded by R6: `.cn-edge-accent`, keyed by `--accent`.)*
- `.cn-edge-dashed` — `border: 1px dashed var(--surface-1);` (the only dashed border)

### Radii (role-named; no numeric escape hatch)

`.cn-r-panel` (`var(--pane-radius)`), `.cn-r-card` (13px), `.cn-r-control` (10px),
`.cn-r-mark` (8px), `.cn-r-chip` (4px), `.cn-r-pill` (999px), `.cn-r-round` (50%).

### Structure

- `.cn-spine` — position:relative; `::before` 4px left bar in `var(--entity-color)` *(superseded by R6: `var(--accent)`)*, `inset: 12px auto 12px 0; border-radius: 0 6px 6px 0;`
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
- `.btn-add` — the dashed add affordance. *(Superseded by R6: `.btn-dashed`.)*
- `.field` / `.field label` / `.input` — 9-10px radius, inset well
  (`color-mix(in srgb, var(--crust) 62%, var(--mantle))`), height `var(--input-h)`,
  mauve 20% focus ring layered over the inset. `.input-lg` (58px hero variant),
  `.search` wrapper (absolute icon + padded input). *(Superseded by R6:
  `.search` → `.input-icon`; per R8 inputs are borderless.)*
- `.segmented` + `.segmented > *` — options **hard offset at rest** (crust), min
  58px (respects density), hover `translate(-1px,-1px)`, active press = half-slide,
  selected `.active` = `.cn-engaged` treatment; `.is-stacked` variant.
- `.stepper` — phase track chips.

**Marks**: `.mark-solid` (28px, `var(--accent)` fill, `--shadow-mark`),
`.chip` (raised-soft mono pill), `.chip-tone` (tone-tinted 4px-radius tag),
`.banner` (tone tint band, inset-soft), `.live-dot` (tokens).

**Data**: `.entity-card` (entity border/gradient/spine per skill) *(superseded
by R6: `.accent-card`, keyed by `--accent`)*, `.metric`
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

`theme.extend`: colors (all palette names → `var(--…)`, plus `entity: "var(--entity-color)"`
*(superseded by R6: `accent: "var(--accent)"`)*,
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
5. **Data** — entity cards *(per R6: accent cards)* (full 6-color cycle), metric/stat variants, progress,
   table-neu with mobile collapse, ranked rows.
6. **Overlays** — popover, modal (open on demand), drawer, toast.
7. **Playground** — density toggle (`data-density`), tone picker, entity-color
   picker *(per R6: accent picker, `--accent`)*, applied live to a specimen panel.

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
