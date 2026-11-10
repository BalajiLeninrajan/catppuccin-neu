# catppuccin-neu spec

A dark neumorphic design system in Catppuccin Mocha. This file and the CSS
in `css/` are the source of truth. [CHANGELOG.md](./CHANGELOG.md) records
how each rule got here.

## Ground rules

- **Generic content.** Docs, README and CSS comments never name a consumer project. Examples use neutral product content: dashboards, settings, invoices, messages.
- **Names describe style.** A class names an appearance (chip, banner, panel, dashed, tilted) or a slot inside one fixed pattern, never an action (add, back, search, submit).
- **No single-use recipes.** Anything that cannot be generalized lives in the consumer's own CSS.
- **Mono is for code.** The package sets `var(--mono)` only on `.cn-code`, `.cn-code-meta`, `.cn-code-inline`, `.terminal`, `.codeblock` and `.command`, on `code` inside `.cn-prose` and on `kbd` in a `.menu`. A consumer may put mono on one element that needs it, never on prose, headings or a whole control set. Sans numbers use `tabular-nums`.
- **Uppercase is scarce.** Only `.cn-microlabel` and the stacked `.stat` label are uppercase. The microlabel labels a fact or heads a group of navigation links, never a page section.
- **Readable text is overlay-2 or lighter.** overlay-0 and overlay-1 are for icons, borders, control edges and disabled text. Recipes name the job (`--cn-fg-muted`), not the hex.
- **Dark only.** The package sets `color-scheme: dark` and does not answer `prefers-color-scheme: light`. It answers `prefers-contrast`, `data-contrast="more"` on the root element, `prefers-reduced-motion`, `prefers-reduced-transparency`, `forced-colors`, `pointer: coarse` and `hover: none`.
- **The page is mantle and raised surfaces are base.** Nothing raised is lighter than base. Overlays alone take a lighter step. Anything below the ground is darker than the page.
- **Depth replaces borders, and a carve is darkness only.** A carve is one dark wall falling from the top left, with no border, no light lip and no inner glow. It takes an even ring only where [Mix tokens](#mix-tokens) names one. Tinted carves (the banner, an invalid field, the open accordion) take their tone's tint, and the status tag its tone's wash. Hairlines stay on raised and tinted surfaces. Bright lines are never a depth cue: rank comes from darkness, and the only step in line strength is `--edge` below `--edge-strong`. [Depth](#depth) has the model.
- **One signal per item.** Color goes on plates and data marks. Text takes the accent only when the text is the mark: the hero value, avatar initials, a status `.tag`, and the one `em` in `.cn-display`, `.display-title` and `.wordmark`. A sentence never takes it. Outside the wordmark a view keeps one mauve text mark, so a view with a mauve hero value drops the `em`. The same item has the same accent on every page. A plate takes color only on the one primary and on accent cards.
- **Ornament budget.** A view holds one tilted panel, one primary, one lead panel and at most one `.is-lg` hero control (a large button or `.input-lg`; a large stat, avatar or icon button does not count). Grain goes only on solid accent fills. Blur goes only on the topbar, the folded sidebar and the scrim. Plates go only under clickables, accent cards and the tilted panel.
- **The tilted panel holds prose.** A summary or an aside, never the page's main data, a table, a form or ruled rows. Its heading takes the name role.
- **`color-mix` is `in srgb`.** `in oklab` is allowed only for data-visualization ramps. `oklch(from …)` is allowed only in `--cn-fill-ramp` and series 3 and 5, where it never moves hue.
- **Fonts.** Every page links IBM Plex Sans (`IBM+Plex+Sans:ital,wght@0,400..700;1,400..700`) and JetBrains Mono (100..800) from Google Fonts. The package ships no font files.

### Special cases

| Rule | Allowed case |
| --- | --- |
| A class may name a slot inside one fixed pattern | `.command-copy`, `.copy-glyph` and `.done-glyph` in the command; `.sidebar-toggle` in the sidebar head; `td.cell-select` in a table row |
| The hero value (`.cn-value-lg`, `.stat.is-lg`) is in `--accent` | It is text-colored inside an `.accent-card`, and text-colored (`.cn-fg` on its `strong`) when the view's mauve primary sits in the same band |
| A solid accent fill takes the ramp, grain and a gloss | The primary adds a plate. The on switch takes the ramp, a rocker and a glow, with no grain. The progress fill and chart bars take no gloss, plate or raise, and bars no grain. `.tag.is-solid` is a flat tone with no ramp |
| One solid status tag per view | `.tag.is-solid` marks the one urgent status, in a status tone and never mauve. A solid danger tag never shares a band or a row with the primary. A figure there takes the washed danger tag |
| Pairs from one hue family never sit side by side as neighboring series, adjacent tags or the two ends of a scale | Status tags and banners may, because each carries a word and a glyph. Series 4 and 5 are the one allowed series pair |

### Cascade

`css/index.css` declares three layers and imports the files into them:

```css
@layer cn.tokens, cn.recipes, cn.utilities;
@import "./tokens.css" layer(cn.tokens);
@import "./recipes.css" layer(cn.recipes);
@import "./utilities.css" layer(cn.utilities);
```

A utility beats the recipe on the same element: `panel cn-flat` clears the
panel's shadow. Consumer CSS is unlayered and beats both, so an override
never needs `!important`. The three files also work as plain `<link>` tags
in the same order. With Tailwind v4, import the package before
`tailwindcss`.

### Distribution

- Bundled apps install the git tag (`github:BalajiLeninrajan/catppuccin-neu#v1.0.0`) and import `catppuccin-neu/css/index.css`.
- Zero-build pages with a `package.json` run `catppuccin-neu-sync <dir>` in a pre-build hook and ignore the copies in git.
- Pages with no `package.json` link `https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v1.0.0/css/index.css`. Pin a full tag. Link `index.css`, not the three files, so the layers survive.
- Tabs, menus, listboxes and comboboxes need script for their keyboard model. Bundled apps add `import "catppuccin-neu/js/auto"`. Pages with no `package.json` put `<script type="module" src="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v1.0.0/js/auto.js"></script>` beside the stylesheet link, pinned to the same tag. See [Behavior](#behavior).
- Nobody commits copies of the CSS. Tags never move once pushed.

The docs deploy as the `catppuccin-neu` Cloudflare Worker at
https://catppuccin-neu.balajileninrajan.dev.

## Tokens

`css/tokens.css`, layer `cn.tokens`. Everything else reads these.

| Prefix | Holds |
| --- | --- |
| bare | The Mocha palette stops (`--mauve`, `--surface-0`) and the public knobs: `--accent`, `--tone`, `--series`, `--plate`, `--hard-offset`, `--grain`, `--space-*`, `--t-*`, `--ease-*`, `--edge`, `--control-h` and the other density knobs |
| `--neu-*` | The shadow stacks and their inks |
| `--cn-*` | Semantic roles and internals, which recipes read and a consumer rarely sets |

A recipe class is an unprefixed component name (`.btn`, `.panel`). A
utility or helper class is `cn-`. Three `cn-` helpers live in
`recipes.css` because they style descendants: `.cn-divide`, `.cn-prose`
and `.cn-skip-link`.

The surface and shadow tokens are frozen: `--edge`, `--edge-strong`,
`--cn-lit-edge`, the `--neu-*` shadows and inks, the `--cn-plate` family
and the `--cn-surface-*` ladder. `pnpm lint` holds a snapshot of each
value and fails when one differs. A change edits the snapshot and adds a
CHANGELOG line in the same commit.

### Palette and faces

All 26 Mocha hexes: twelve neutrals, `--crust` through `--text`, and
fourteen hues, `--rosewater` through `--lavender`. Do not substitute a hex.

`--sans` is IBM Plex Sans first and `--mono` is JetBrains Mono first. Each
falls back to a local face with overridden metrics, so the swap does not
reflow, and then to system faces.

| Hue | Job |
| --- | --- |
| mauve | interaction: links, the primary, checked and engaged states; series 6; the `em` in a display title or wordmark and the hero value through `--accent` |
| pink | the interactive hover; series 5 |
| red | danger |
| yellow | warning; series 2 |
| green | success |
| blue | info; series 3 |
| teal | series 1 |
| peach | series 4 |
| rosewater, flamingo, maroon, sky, sapphire, lavender | record identity only: an `--accent` for a team, project or person beyond the six series, never status or interaction |

### Semantic roles

Recipes read these instead of palette names. More contrast moves each text
role one stop lighter.

| Token | Value | Job | On base | On the page |
| --- | --- | --- | --- | --- |
| `--cn-fg` | text | headings, names, values | 11.3:1 | 12.1:1 |
| `--cn-fg-soft` | `--cn-fg-body` | lede, table cells, code, `.cn-label` and field labels | 9.3:1 | 9.9:1 |
| `--cn-fg-body` | subtext-1 | running text | 9.3:1 | 9.9:1 |
| `--cn-fg-muted` | subtext-0 | meta, help, table heads, stat labels, key-value keys, chips, the stepper | 7.4:1 | 7.9:1 |
| `--cn-fg-placeholder` | overlay-2 | placeholders, code line numbers; the floor for text | 5.8:1 | 6.2:1 |
| `--cn-fg-faint` | overlay-1 | decorative icons | 4.4:1 | 4.8:1 |
| `--cn-fg-disabled` | overlay-1 | disabled text; WCAG 1.4.3 exempts inactive controls | 4.4:1 | 4.8:1 |
| `--cn-fg-on-accent` | crust | text on a solid accent fill | 9.2:1 on mauve | |
| `--cn-interactive` | mauve | links, the primary, checked controls | 8.1:1 | |
| `--cn-interactive-hover` | pink | their hover | | |
| `--cn-focus` | text | the focus ring, the one bright neutral no state uses | 11.3:1 | 12.1:1 |
| `--cn-danger`, `-warning`, `-success`, `-info` | red, yellow, green, blue | status tones | | |

On an overlay the placeholder is 4.6:1 and the focus ring 9.0:1.

A resting field's ring is under 3:1 on every ground, so every field needs
a visible label. A field in a table cell takes its name from the column
header. Hover, focus and more contrast each draw a ring at 3:1 or better.

### Surfaces

| Token | Value | Holds |
| --- | --- | --- |
| `--cn-surface-sunken` | crust, 1.07:1 under the page and 1.14:1 under base | wells, the mono wells, the switch plate, stepper pills, skeletons, the disabled primary |
| `--cn-surface-band` | crust 50% over transparent, 1.08:1 under base | table heads |
| `--cn-surface-recessed` | crust 80% into mantle, 1.05:1 under the page | the sidebar |
| `--cn-surface-page` | mantle | the body, the app shell, the topbar, stat bands |
| `--cn-surface-raised` | base, 1.07:1 on the page | panels, secondary buttons, segmented options, chips, accent cards, the selected tab, the switch paddle |
| `--cn-surface-overlay` | surface-0 90% into base, 1.27:1 on base and 1.36:1 on the page | popovers, dialogs, drawers, toasts, tooltips |

Bands never take a darker fill than the surface they title. Panel, modal
and drawer headers sit on their parent's fill behind a divider.

### Mix steps

Every tint of a hue uses one of these steps.

| Token | Value | Use |
| --- | --- | --- |
| `--cn-step-tint` | 4% | `--tint`, an invalid field, the open accordion |
| `--cn-step-status-tint` | 6% | the four status tints |
| `--cn-step-wash` | 12% | the status tag ground, the avatar ground, the radio and live-dot halos, the `.mark` border |
| `--cn-step-row` | 16% | the row hover |
| `--cn-step-engaged` | 23% | `--wash` |
| `--cn-step-plate` | 25% | the primary plate, tone borders, the switch glow |
| `--cn-step-edge` | 40% | tone edges, the held switch glow |
| `--cn-step-strong` | 50% | |
| `--cn-step-vivid` | 70% | accent plates, the engaged rim |

`--cn-step-wash` and `--cn-step-engaged` sit at their contrast limits: red
text on its own wash over an overlay is 4.54:1, and `--cn-fg-muted` on the
engaged wash is 4.52:1.

Each status role has a ladder: `--cn-<role>-tint`, `-wash` and `-edge`
(the role at the status-tint, wash and edge steps over transparent) and
`-border` (the role at the plate step into surface-0). Recipes read
`--tint`, `--tone-wash`, `--tone-edge` and `--tone-border`. Those default
to the same mixes of the element's `--tone`, with `--tint` at 4%, and a
status `.cn-tone-*` swaps in its ladder. They are declared on `.cn-tint`,
`.tag`, `.banner`, `.input`, field controls, `.btn.is-icon` and
`.cn-edge-tone`.

### Type roles

Each role is four tokens: `--cn-type-<role>-size`, `-weight`, `-leading`
and `-tracking`. Weights are 400, 500, 600 and 700 only. Sizes are rem.
The table gives px at the 16px default.

| Role | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| micro | 12px | 500 | 1.25 | .08em |
| label | 14px | 500 | 1.25 | 0 |
| meta | 14px | 400 | 1.5 | 0 |
| ui | 14px | 600 | 1.25 | 0 |
| body | 16px | 400 | 1.6 | 0 |
| lede | 18px | 400 | 1.6 | 0 |
| title | 20px | 600 | 1.3 | -.01em |
| heading | 28px | 700 | 1.25 | -.02em |
| value | 24px | 600 | 1 | -.02em |
| value-lg | 26 to 36px | 600 | 1 | -.025em |
| code | 13px | 500 | 1.6 | 0 |
| display | 36 to 56px | 700 | 1.08 | -.02em |
| display-sm | 30 to 40px | 700 | 1.08 | -.02em |

- display and display-sm share one weight, leading and tracking token. The clamped sizes grow from 520px and reach their maximum at 860px.
- name is the ui role in `--cn-fg`. Its four tokens alias the ui tokens.
- Label and meta share 14px. The label is 500 in `--cn-fg-soft`, meta 400 in `--cn-fg-muted`.
- 13px belongs to mono code and to compact density, where `--cell-font-size` steps table heads, cells, and the tags, chips, small buttons and text buttons in a cell down together.
- Small buttons and text buttons take the label size.
- A key beside its value is 400 in `--cn-fg-muted` against the value's 500 in `--cn-fg`, in `.kv` and in a `.stat.is-inline` row.
- 600 belongs to names, controls and titles. 700 belongs to the heading, the display and the wordmark.
- A band or a row holds one small size plus micro, and one 600. In a table row the `.cell-name` is that 600.
- There is no heading step between title and heading. Long views set `h2` at 28px and `h3` at 20px.
- Mono surfaces turn ligatures off.

### Spacing and radius

- `--space-1..6`: 4, 8, 12, 16, 24, 32, inside components. `--space-7` 48 and `--space-8` 64 space sections and page regions. Every gap, padding and margin in recipes and utilities reads one of these, a density knob, 0 or 1px.
- Widths: `--cn-width-page` 1440, `--cn-width-narrow` 860, `--cn-width-reading` 740, and `--cn-measure` 68ch for prose.
- `--cn-radius-panel` 16, `--cn-radius-card` 12, `--cn-radius-control` 8, `--cn-radius-chip` 4. Pills are 999px and rounds 50%.

### Depth

Light comes from the top left. Every elevation is one of five neu tokens:

```css
--neu-raised:      1px 1px 0 var(--neu-contact), 4px 6px 10px var(--neu-near), 10px 12px 24px var(--neu-shade);
--neu-lifted:      6px 8px 0 var(--neu-contact), 8px 14px 16px var(--neu-near), 18px 28px 48px var(--neu-shade), var(--cn-lit-edge);
--neu-raised-soft: 1px 1px 0 var(--neu-contact), 3px 4px 9px rgb(8 8 14 / .5);
--neu-inset:       inset 3px 3px 8px var(--neu-dark);
--neu-inset-soft:  inset 2px 2px 5px rgb(8 8 14 / .5);
```

| Ink | Value | More contrast |
| --- | --- | --- |
| `--neu-ink`, `--neu-contact` | `rgb(8 8 14)`, crust halfway to black, 1.14:1 under the page and 1.22:1 under base | |
| `--neu-near` | the ink at .8 | .9 |
| `--neu-shade` | the ink at .72 | .86 |
| `--neu-dark` | the ink at .8 | .88 |
| `--neu-dark-soft` | crust at .30 | |

Three shared composites float or mark: `--shadow-pop` (overlays),
`--shadow-cast` (the topbar) and `--shadow-mark` (the `.mark` drop with a
white top edge).

The foot ladder sets how tall a raised thing stands, counted as full ink
under its bottom edge.

| Foot | Ink | Made of |
| --- | --- | --- |
| panel | 1px | the 1px contact of `--neu-raised` |
| plate | 4px | `--hard-offset`, under a clickable and under the tilted panel |
| lead | 8px | the 6px 8px contact of `--neu-lifted`, 6px wide on the right |

Density moves the plate only: 3px at cozy and 2px at compact.

| Height | What draws it | Who |
| --- | --- | --- |
| below the ground | a carve: one dark wall from the top left. Filled carves also take the sunken fill | fields, selects, textareas, wells, the mono wells, skeletons, tabs, the switch plate, stepper pills, the disabled primary |
| the ground | mantle | the page, the topbar, stat bands, static chips |
| raised, on a soft foot | the base fill, the `--edge` hairline on all four sides and `--neu-raised`. The lead panel takes `--edge-strong` and `--neu-lifted` | panels, the selected tab, the lead panel |
| raised, on a hard plate | the base fill and the lit edge over `--cn-plate`, which replaces the cast. The plate is `--neu-ink`, except under the primary (mauve 25% into surface-0) and accent cards (the accent 70% into surface-0) | clickables, link and button chips, accent cards, the tilted panel |
| floating | the overlay fill, `--edge-strong`, no contact, `--shadow-pop` | popovers, menus, dialogs, toasts |

- A plain panel has no lit edge. The lit edge marks the light side of plates, the lead panel, the selected tab and a panel inside a panel.
- A panel inside a panel takes `--neu-raised-soft` with the lit edge.
- No raise draws a top-left highlight outside its edge.
- No side of a panel's border is darkened or brightened. Carved surfaces have no hairline.
- No static label is raised. A static chip is flat, and the avatar is the one small static thing on the soft raise.
- The light is physical. Plates fall down and to the right in right-to-left pages too.

### Contract properties

Set these on an element or a wrapper to re-key a subtree.

| Property | Default | Does |
| --- | --- | --- |
| `--accent` | mauve | Plates, marks, avatars, the hero value, the progress fill, the caret, and bars and legend swatches with no `--series` |
| `--tone` | `--cn-info` | Tags, banners, icon-button hover, validation. `.cn-tone-*` sets it |
| `--series` | unset, so `--accent` | The color of a `.bar` and its `.legend-item` swatch. Set it to a `--cn-series-*` for a series, or to a status role for a status breakdown. A status with no role takes a palette tone |
| `--plate` | `--neu-ink` | The hard offset's color. Undeclared on `:root`; read it as `var(--plate, var(--neu-ink))` |
| `--hard-offset` | 4px | The hard offset's distance |
| `--page-gutter` | `clamp(12px, 3vw, 32px)` | Inline gutter of the page column, the footer and the topbar |
| `--page-pad` | `clamp(24px, 4vw, 48px)` | Block padding of the page column |
| `--page-width` | 1440px | Width of the page column and footer; unset on `:root` |
| `--progress-fill` | the accent ramp | The progress fill; any token color or gradient |
| `--grain` | .22 | Grain strength on solid accent fills; 0 turns it off |
| `--ring-ground` | `var(--base)` | The ring color between stacked avatars. Set it to `var(--mantle)` for a stack on the page |

### Mix tokens

Ratios are on base, the page and an overlay, in that order. The hairline
and lit-edge ratios are design floors, not WCAG 1.4.11 obligations.

| Token | Value | Ratios | Use | More contrast |
| --- | --- | --- | --- | --- |
| `--edge` | surface-2 at 70% | 1.85, 1.92, 1.6 | the raised-surface hairline, the cut edge of plated controls | overlay-0: 3.4, 3.6, 2.6 |
| `--edge-soft` | surface-1 at 38% | 1.22, 1.24 | inner separators, the resting ghost | solid surface-1 |
| `--edge-strong` | surface-2 | 2.5, 2.6, 1.9 | the lead panel, overlay, drawer and blockquote hairline | overlay-1: 4.4 on base, 3.5 on an overlay |
| `--cn-lit-edge` | 1px of surface-2 at 45% inside the top rim | 1.5 on base | part of `--neu-lifted`, every recipe plate's `--hard-extra` except the primary's gloss, and `.cn-hard` | |
| `--cn-stat-rule` | `var(--edge)` | 1.92 on the page | the 2px rule of `.stat-grid.is-ruled` | surface-2, 2.6 on the page |
| `--hover` | surface-1 at 60% over transparent | 1.40, 1.44, 1.23 | the ghost, menu, pagination and sidebar hover | |
| `--wash` | `--cn-interactive` at 23% into base | 1.63, 1.75 | the engaged state. `--cn-fg-soft` on it is 5.68 and `--cn-fg-muted` 4.52, so a `small` on it takes `--cn-fg-soft` | |
| `--engaged-edge` | `--cn-interactive` at 70% | 4.7 on base, 3.3 on `--wash` | the rim of every engaged state and of the selected tab | |
| `--control-edge` | overlay-1 | 4.4, 4.8, 3.5 | the edge of an unchecked control, the off switch paddle and the slider thumb | overlay-2 |
| `--cn-field-ring` | `inset 0 0 0 1px` of surface-2 at 85% | 2.1, 2.2, 1.7 | the resting ring of every live carved field | overlay-2: 5.8 on base, 4.6 on an overlay |
| `--cn-field-ring-overlay` | `inset 0 0 0 1px` of overlay-0 at 75% | 2.1 on an overlay | `.popover`, `.modal` and `.drawer` set `--cn-field-ring` to it | overlay-2 |
| `--cn-field-ring-page` | the `--cn-field-ring` value | | a `.panel` or `.well` inside an overlay sets `--cn-field-ring` back to it | overlay-2 |
| `--cn-field-hover-ring` | `inset 0 0 0 1px var(--control-edge)` | 4.4, 4.8, 3.5 | replaces the resting ring on a hovered field that is not disabled or focused | |
| `--cn-carve-ring` | `inset 0 0 0 1px var(--surface-1)` | 1.8, 1.9, 1.4 | the tabs carve and a disabled field | overlay-2 |
| `--cn-well-ring` | `inset 0 0 0 1px` of surface-1 50% into surface-0 | 1.5, 1.6, and 1.7 on crust | `.well`, the mono wells and the disabled primary | surface-2 |
| `--disabled-opacity` | .7 | | disabled controls. The primary does not dim | .8 |

- Every rule lists a ring before the carve, so the ring paints over the dark wall and stays even on all four sides.
- No rule mixes its own field edge. A validation ring and a read-only rule keep their own shadow.
- A focused field keeps its resting ring inside the focus ring.

### Data series

`--cn-series-1..6` are teal, yellow, blue, peach, pink and mauve. A chart
takes them in order, so a chart of up to five series holds no bar in the
interactive color.

- Series 3 and 5 are blue and pink at .795 of their oklch lightness: about #5a83c5 and #ba8aad, 4.3:1 and 5.7:1 on base.
- Under a full-severity protan, deutan and tritan simulation (Machado 2009) every adjacent pair stays above dE 6 in OKLab. Series 3 and 5 sit at dE 7.5 for a protan reader, so hatch one when a chart sets them side by side.
- `.is-hatched` on a `.bar` or `.legend-item` adds stripes, a second key for a series that must stand apart without color.
- A `.bar` or `.legend-item` reads `--series`, falling back to `--accent`. A record with an identity leaves `--series` unset, so the same team is the same color in every chart.
- `--cn-ramp-1..5` is a sequential ramp for one measure: mauve mixed into surface-0 in oklab at 20, 40, 60, 80 and 100%.
- `--cn-diverge-1..5` is for a measure with a meaningful zero: red, red half into surface-1, surface-1, blue half into surface-1, and blue, in oklab.
- Series and ramp marks keep a word or a value next to them. Color is never the only key.
- The hue families are the warm one (red, maroon, peach, pink, flamingo, yellow) and the cool pairs sky and teal, mauve and lavender, blue and sapphire.
- Warning and success collapse for a red-green deficiency (dE 2.9 protan, 6.6 deutan). Every status tone carries a word and a shape, and an svg that replaces a status glyph keeps a shape distinct from the other three.

### Fill ramp and grain

Solid accent fills paint `--cn-fill-ramp`: the primary button, the checked
checkbox, the switch paddle when on, `.mark`, the progress fill and chart
bars. The ramp runs at 165deg from lightness +.035, through `--cn-fill` at
50%, to lightness -.045 with chroma +.015. `--cn-fill` is the accent,
mauve on the primary, checkbox and switch, a bar's `--series`, and pink on
primary hover. Without relative color support the flat `--cn-fill` stays.

Every ramp but the switch paddle's and the bars' carries grain in a
`::before` under its content: `--cn-grain-image`, a greyscale noise tile
blended with `overlay` at `--grain` and masked to fade toward the top
left. Forced colors and more contrast hide it.

### Density

`data-density="cozy"` or `data-density="compact"` on any ancestor switches
every knob. Cozy is for desktop data tools and compact is the dense strip.
Control heights are rem.

| Knob | Default | Cozy | Compact |
| --- | --- | --- | --- |
| `--control-h` | 46px (2.875rem) | 38px | 28px |
| `--control-h-sm` | 34px (2.125rem) | 28px | 26px, never under 24px |
| `--hard-offset` | 4px | 3px | 2px |
| `--cn-radius-panel` | 16px | 16px | 12px |
| `--band-h` | 64px | 52px | 44px |
| `--band-pad` | 12px 24px | 8px 24px | 8px 16px |
| `--band-title-size` | 20px | 20px | 14px |
| `--lead-title-size` | 28px | 28px | 20px |
| `--lead-band-h` | 72px | 60px | 48px |
| `--lead-pad` | 32px | 24px | 16px |
| `--body-pad` | 24px | 16px 24px | 12px 16px |
| `--cell-pad` | 12px 16px | 8px 12px | 4px 8px |
| `--cell-font-size` | 14px | 14px | 13px |
| `--cn-type-body-size` | 16px | 16px | 15px |
| `--chip-pad` | 8px 12px | 4px 12px | 4px 8px |
| `--well-pad` | 12px 16px | 12px 16px | 8px 12px |
| `--empty-h` | 260px | 180px | 120px |

- `--lead-title-size` is 20px at 655px and under.
- `--cell-font-size` sets the table head, the cell text and the name cell's meta line.
- Fixed sizes ignore density: checkbox and radio 20px, switch 50x28, avatar 32px (44px large), mark 28px, the command's copy control 34px. Wrap a checkbox, radio or switch in `.choice` so the label row is the target.
- Under `pointer: coarse`, `--control-h` is 46px and `--control-h-sm` 44px at every density, and field text is a literal `1rem`, so iOS Safari does not zoom on focus.

### Motion

- `--ease-out: cubic-bezier(.16, 1, .3, 1)` for anything that answers the pointer or arrives.
- `--ease-in: cubic-bezier(.7, 0, .84, 0)` for anything that leaves.
- `--ease-spring` for anything that returns. Where `linear()` works it is a damped spring that settles with one 8% overshoot; elsewhere `cubic-bezier(.3, 1.4, .4, 1)`.
- `--t-press` .08s, `--t-exit` .14s, `--t-fast` .16s, `--t-base` .22s, `--t-slow` .32s.
- Duration follows distance. Up to 4px of travel (a press, a lift, a settle) takes `--t-press` or `--t-fast`. Up to about 24px (a toast, a modal's rise) takes `--t-base`. The tab pill slides on `--t-fast`. The drawer takes `--t-slow`. Exits take the ease-in over `--t-exit` at any distance.
- A press goes down on the ease-out in `--t-press` and comes back on the spring in `--t-fast`.
- Only plated controls and `.cn-pressable` lift 1px on hover. Ghost, icon and text buttons, tabs, table and ranked rows and menu items answer the pointer with a fill or a color and press when held.
- State changes use transitions, so a change reversed mid-flight retargets. Keyframes run only for page-enter and the loops (the spinner, the caret, the live dot, the skeleton), and loops keep literal durations.
- `.page-enter` is opt-in, for a view's first render. Its children run `enter` over `--t-slow` on the ease-out with fill `backwards`, five steps 40ms apart, then everything from the sixth child on at .2s.
- Route changes: `@view-transition { navigation: auto; }`, or a route change run inside `document.startViewTransition()`, gets a root cross-fade over `--t-base` on the ease-out. There is no exit keyframe or stagger.
- `.cn-morph` on the lead panel and on the page's one primary names them `cn-lead` and `cn-primary`, so they morph between routes at the same timing. Two elements with one name abort the transition.
- The package ships no haptics.

### Data changes

Data moves less than chrome.

- Progress and bars ease to a new value over twice `--t-slow` on the ease-out.
- A changed number swaps in place. Never count up or tween a figure.
- Content that replaces a skeleton, and a row that a live list inserts, take `.cn-arrive`: a fade and a 2px settle over `--t-fast`. The whole set arrives at once.
- A loading table sets `aria-busy="true"`, keeps its head and its row count, and puts an `aria-hidden` `.skeleton.is-text` in each cell. An optimistic row shows at once and swaps in place on confirm. If the save fails it leaves at once.
- A removed row leaves at once. A dismissed toast or a closed overlay is the only exit that animates.
- A change the reader asked for cuts: a sort, a filter, a page, a tab change, a filter that empties a table to the `.empty-state`. Only the selected tab's pill slides.
- A reorder that arrives from elsewhere, or a layout that shifts on its own, may run a view transition with a `view-transition-name` per moving row or region, at `--t-base` on the ease-out.
- A panel that grows because the reader opened something follows them, as the accordion does. Never animate width or height on a box that holds text.

### Hard offset and the half-slide

`.btn-primary`, `.btn-secondary`, `.segmented > *`, a link or button
`.chip` and a link-wrapped `.accent-card` share one press:

- rest: `--cn-plate`, the plate color stacked at a quarter, half, three quarters and all of `var(--hard-offset)` on both axes with no blur, so the corners join into a solid side
- hover: `translate(-1px, -1px)`; the secondary and a link-wrapped accent card also deepen the plate 1px to `--cn-plate-hover`
- held: translate by half the offset, and the plate shrinks to `--cn-plate-half`
- timing: down in `--t-press` on the ease-out, back in `--t-fast` on the spring

`--hard-extra` holds shadow layers drawn over the plate, such as the
primary gloss. `.cn-hard` with `.cn-pressable-slide` draws the same press.
The fixed plates step in 1px layers: `--cn-plate-sm` to 3px and
`--cn-plate-lg` to 10px.

### Composition

Compose a view in this order:

1. `<a class="cn-skip-link" href="#main">Skip to content</a>` as the first focusable element, with `id="main"` and `tabindex="-1"` on the `main` it targets.
2. `.page-main` holding a stack 48px apart (`cn-gap-48`).
3. A `.cn-split.cn-top` holding a stack of the title and the lede, then the view's one primary.
4. The key figures on the ground, in a `.stat-grid.is-ruled`.
5. One `.panel.is-lead`, the thing the view is about.
6. A `.cn-grid-12` row of 8 and 4: the data first, the aside last, tilted, in prose.

- Regions of a view (a header, a stat band, a row of panels, a table) are `--space-7` (48px) apart. Panels inside a region are `--cn-grid-gap` (24px) apart. Content inside a panel uses `.panel-body`, not fixed padding utilities, so it follows density.
- A region holds at most three raised panels. More items go in one panel, a ruled grid on the ground, or a table.
- Supporting figures beside a data panel go on the ground under a section heading. They take one form per section: a `.stat-grid.is-ruled`, or `.stat.is-inline` rows in a `.cn-divide`.
- Lay a region's panels on `.cn-grid-12`, one row per grid: a 7 and 5, an 8 and 4, or three 4s. Equal-column sets may use `.cn-grid-2/3/4`. A grid of small items composes `.cn-gap-16`.
- Pair panels of similar height in a row, or stack a second short panel in the shorter column with `.cn-stack`. Never stretch a panel into an empty tail. A ground-level stack beside a panel packs to the top. If the slack at its end reads as a tail, change the split.
- The tilted aside never comes before the data it comments on.
- A form puts the primary in the footer after its fields. A first-run screen puts it in the lead panel next to the setup it starts.

### Icons

The package ships no icon set and sizes every icon its recipes hold. Use
one stroke family: round caps and joins, a stroke of 2 to 2.2 on a 24-unit
grid (1.6 on an 18-unit one), `currentColor`, no fills. Lucide matches it.
Recipes set 12px (tag), 13px (text button), 14px (chip, small button),
16px (button, banner, menu row) and 18 to 20px (large button, large icon
button). An icon beside a word is `aria-hidden`. An icon alone needs an
accessible name on its control.

### Global rules

- `[hidden]` is `display: none !important`. The popover, the toast and `hidden="until-found"` are exempt. A consumer element that animates out through `[hidden]` opts out with `data-cn-animate-hidden`.
- Focus is a 2px `--cn-focus` outline that eases from 0 to 3px offset over `--t-fast`. No recipe draws focus any other way. `::selection` is crust on mauve.
- Links are mauve, pink on hover, with the chip radius. A link carries a 1px underline in its color at 40%, `.22em` below the baseline, that goes solid on hover. Links inside `nav` drop it, and so do recipes that restyle an anchor.
- `body` is the body role in `--cn-fg-body`. Headings are `--cn-fg`, and bare ones take a role at zero specificity: `h1` the small display, `h2` the heading, `h3` the title, `h4` the name. Lists indent 20px with 8px between items and overlay-1 markers. Every recipe sets its own font.
- A bare `em` is plain emphasis. Inside `.cn-display`, `.display-title` and `.wordmark` it is mauve and upright.
- `html` keeps `scrollbar-gutter: stable`. Smooth scrolling is on `html:focus-within` only.
- `p` and `li` wrap with `text-wrap: pretty`. `.scroll-well` sets the dark scrollbar color.
- Six keyframes: `enter`, `spin`, `pulse`, `blink`, `breathe`, `cast`.
- Reduced motion removes movement, not feedback. Animations, transitions and view transitions run in .01ms with no delay. Popovers, toasts, dialogs, drawers and tooltips still fade over `--t-fast` in place. `.spinner` and a busy button keep a 2.4s spin. `.skeleton` holds still at .85 opacity.
- More contrast applies under `prefers-contrast: more` and under `data-contrast="more"` on the root element. Both blocks declare the same tokens. Each text role moves one stop lighter, `--cn-fg-disabled` is overlay-2, the edges, rings and inks take the values in [Mix tokens](#mix-tokens) and [Depth](#depth), link underlines go solid, the grain goes, and the tilted panel stands upright.
- Reduced transparency: the topbar and folded sidebar go opaque, and the scrim stops blurring and darkens to crust at 88%.
- Touch (`hover: none`): hover lifts do not run. The press still runs.
- Forced colors: focus draws a `Highlight` outline. The checkbox, radio, switch, carved fields, wells, the mono wells, tabs, stepper pills and the progress track draw a `CanvasText` edge. Checked and indeterminate states fill with `Highlight`. Engaged states, the selected tab and a selected listbox option draw a `Highlight` rim. Selection checks and status glyphs paint `CanvasText`. The current sidebar link's spine draws in `Highlight`.

### Tailwind

`tailwind/preset.cjs` (v3) and `tailwind/theme.css` (v4 `@theme inline`)
map the tokens onto Tailwind names. They add no recipes.

- Colors: the palette, the surfaces (`surface-page`, `-recessed`, `-band`, `-sunken`, `-raised`, `-overlay`), `hover`, the data series (`series-1..6`, `ramp-1..5`, `diverge-1..5`), the semantic roles (`fg`, `fg-soft`, `fg-body`, `fg-muted`, `fg-placeholder`, `fg-faint`, `fg-disabled`, `interactive`, `interactive-hover`, `focus`, `danger`, `warning`, `success`, `info`), `accent`, `tone`, `edge`, `edge-soft`, `tint`, `wash`, `control-edge`.
- Type: `text-microlabel`, `-label`, `-meta`, `-ui`, `-name`, `-body`, `-lede`, `-title`, `-value`, `-value-lg`, `-code`, `-display`, `-display-sm`, each with its weight, leading and tracking.
- Radii: `rounded-panel`, `-card`, `-control`, `-mark` (the control radius), `-chip`.
- Shadows: `neu-raised`, `neu-lifted`, `neu-raised-soft`, `neu-inset`, `neu-inset-soft`, `pop`, `cast`, `hard`, `hard-lg`, `hard-sm`, `mark`.
- Spacing: Tailwind's own `1, 2, 3, 4, 6, 8, 12, 16` are 4 to 64px, so the scale is not remapped. Added: `control`, `control-sm`, `band`, `gutter`, `page-pad`.
- Motion: `ease-out/in/spring`, `duration-press/exit/fast/base/slow`. v4 defines the durations with `@utility`.
- `opacity-disabled`.
- A v4 key that shares a token's name (`--ease-*`, `--shadow-pop`, `--shadow-cast`, `--shadow-mark`) holds the literal value, because `var()` of its own name is cyclic.

## Utilities

`css/utilities.css`, layer `cn.utilities`. Prefix `cn-`. No utility takes a
number outside the token scales.

### Depth

`.cn-raised`, `.cn-raised-soft`, `.cn-inset`, `.cn-inset-soft` read the
neu tokens. `.cn-pop` is for overlays only. `.cn-cast` adds a lit hairline
to the cast. `.cn-mark-drop` is `--shadow-mark`. `.cn-hard` is the hard
offset in the plate color. `.cn-hard-lg` is a fixed 10px offset and
`.cn-hard-sm` a fixed 3px one. `.cn-flat` clears the shadow.

### Interaction

- `.cn-pressable`: lifts 1px on hover and sinks 1px onto `--neu-inset-soft` when held.
- `.cn-pressable-slide`: the half-slide. Use it only with `.cn-hard`.
- `.cn-engaged`: the engaged state, the chosen or toggled option. Pressed 1px, full `--neu-inset`, `--wash`, an `--engaged-edge` rim. It comes after the edge utilities, so it clears a composed edge.

### Type roles

Each role reads its four tokens. There is no font-family utility.

| Class | Role | Color |
| --- | --- | --- |
| `.cn-microlabel` | micro, uppercase | subtext-0 |
| `.cn-label` | label | subtext-1 |
| `.cn-meta` | meta, tabular | subtext-0 |
| `.cn-ui` | ui | inherited |
| `.cn-name` | name | text |
| `.cn-copy` | body | subtext-1 |
| `.cn-lede` | lede, max-width `--cn-measure` (68ch) | subtext-1 |
| `.cn-title` | title | inherited |
| `.cn-heading` | heading | inherited |
| `.cn-value` | value, tabular | inherited |
| `.cn-value-lg` | value-lg, tabular | accent; text inside an `.accent-card` |
| `.cn-display` | display, balanced wrap | inherited |
| `.cn-display.is-sm` | display-sm | inherited |
| `.cn-code` | code, mono, tabular | inherited |
| `.cn-code-meta` | code at leading 1, mono | subtext-0 |
| `.cn-code-inline` | mono at .92em, weight 500 | `--cn-fg-soft` |

The color utilities come after the roles, so `cn-microlabel cn-text-accent`
is a tracked label in the accent. Compose; never restate a role to recolor
it. Also here: `.cn-tabular`, `.cn-nowrap`, `.cn-truncate` (needs a bounded
width) and `.cn-text-center/-right/-left`.

### Color

- Text by role: `.cn-fg`, `.cn-fg-soft`, `.cn-fg-body`, `.cn-fg-muted`, `.cn-fg-placeholder`, `.cn-fg-faint`. These follow `prefers-contrast`; prefer them for text.
- Text by palette: `.cn-text-{text, subtext-1, subtext-0, overlay-2, overlay-1, overlay-0, mauve, pink, red, green, peach, yellow, blue, teal, lavender, accent, tone}`.
- Backgrounds: `.cn-bg-page`, `.cn-bg-base`, `-mantle`, `-crust`, `.cn-bg-well` (`--cn-surface-sunken`), `.cn-bg-head` (`--cn-surface-band`), `.cn-bg-raised`, `.cn-bg-overlay`, `.cn-bg-recessed`, `.cn-bg-hover`, `.cn-tint`, `.cn-tint-accent` (accent at `--cn-step-wash` into mantle, fading to mantle at 48%).
- `.cn-tone-{danger, warning, success, info}` set `--tone` from the status roles, bring `--cn-glyph` and swap in the status ladder. `.cn-tone-{red, green, peach, yellow, blue, mauve}` set `--tone` from the palette and nothing else. A tone never carries meaning alone: the word in the tag or banner does.

### Borders and radii

- `.cn-edge` (`--edge`), `.cn-edge-soft`, `.cn-edge-line` (surface-0), `.cn-edge-mauve` (mauve at `--cn-step-plate`), `.cn-edge-tone` (`--tone-border`), `.cn-edge-accent` (the accent at `--cn-step-plate` into surface-0), and `.cn-edge-dashed`. Dashed means an open slot and nothing else.
- `.cn-r-panel`, `-card`, `-control`, `-mark` (control radius), `-chip`, `-pill` (999px), `-round` (50%).

### Structure

- `.cn-spine`: a 4px `--cn-interactive` bar on the left, inset 12px top and bottom. It marks position (the current row, the selected item), not identity, so it never takes the item's `--accent`.
- `.cn-sr-only` clips an element for screen readers. `.cn-hidden` is `display: none !important`.

### Layout

- `.cn-row` (flex, centered, gap 8), `.cn-stack` (grid, gap 12), `.cn-cluster` (wrapping flex, gap 8).
- Modifiers only add: `.cn-between`, `.cn-center`, `.cn-end`, `.cn-top`, `.cn-baseline`, `.cn-wrap`. They also realign a `.cn-split`.
- Children: `.cn-grow` (flex 1, `min-width: 0`), `.cn-fixed`, `.cn-min-0`, `.cn-auto-l`, `.cn-mx-auto`, `.cn-w-full`, `.cn-fit`, `.cn-block`.
- `.cn-split`: two groups at opposite ends (gap 12 by 16) that wrap onto two lines when they no longer fit; the first takes the slack. A `.cn-lede` directly inside the first group does not widen it (`contain: inline-size`), so a header wraps on its title's width. The rule needs an `h1`, an `h2`, a `.cn-display`, a `.cn-heading` or a `.cn-title` before the lede in the same group.
- `.cn-measure`: a centered column at `--cn-measure`.
- `.cn-with-side`: a side of `--side-w` (16rem) beside fluid content. They stack when the content would drop under 60% of the row, with no breakpoint.
- `.cn-grid-12`: the page grid, twelve columns `--cn-grid-gap` (24px) apart. Children span with `.cn-span-3/4/5/6/7/8/9/12` and keep their content height (`align-items: start`). Each grid holds one row. At 1060px and below, or in a `.cn-container` that narrow, a 7 and 5 or an 8 and 4 go to 6 and 6, four 3s go two by two, three 4s fold to two and one, and a 9 or an odd last child takes the row. At 760px every span takes the row. In an `.app-shell.has-sidebar`, put `.cn-container` on the page column.
- `.cn-grid-2/3/4`: equal columns, gap `--cn-grid-gap`. Three and four become two at 760px; all become one at 520px. Inside a `.cn-container` (`container-type: inline-size`) the folds answer the container's width.
- `.cn-gap-*`, `.cn-p-*`, `.cn-mt-*`, `.cn-mb-*` on 4, 8, 12, 16, 24, 32, plus 0 on padding and margins. `.cn-gap-*`, `.cn-mt-*`, `.cn-mb-*` and `.cn-py-*` also take 48 and 64. `.cn-px-*` and `.cn-py-*` from 8 up, plus 0. `.cn-m-0`. Horizontal margins otherwise come from gaps, never from a margin on a child.
- `.cn-divide`: a surface-0 hairline between children.
- `.cn-list-none`, `.cn-scroll-x`, `.cn-sticky-top` (top 0, z-index 2).
- `.cn-icon-sm/.cn-icon/.cn-icon-lg`: 13, 16 and 20px svg.

## Recipes

`css/recipes.css`, layer `cn.recipes`. Recipes read tokens and contract
properties only and never style bare elements.

### Surfaces

- `.panel`: a 1px `--edge` border, panel radius, the raised fill, `--neu-raised`, no padding.
- `.panel.is-tilted`: rotated 1.2deg on `--cn-plate` under the lit edge, with no raised shadow and `align-self: start`. Flat at 1060px and below, and upright under more contrast. It sets `--cn-type-body-size` to 15px for its subtree.
- `.panel-header`, `.panel-footer`: bands `--band-h` tall with `--band-pad`, on the panel's fill, behind a divider. A band holding `.band-actions` wraps; the cluster is right-aligned. Other bands stay on one line. An `h2` or `h3` in a header is the title role at `--band-title-size`.
- `.panel-body`: the content band, `--body-pad`.
- `.panel.is-lead`: the `--edge-strong` hairline, `--neu-lifted`, a header band `--lead-band-h` tall, and a band title at `--lead-title-size` at the heading weight and tracking. `--lead-pad` pads its header and footer inline, its body, and the outer columns of a table that fills it, directly or through a `.table-scroll` or a tab panel (above 760px).
- `.panel.is-shell`: drops its chrome at 760px so a phone page runs edge to edge.
- Band corner rule: a filled first or last child of a rounded surface takes the parent radius minus 1px on its outer corners. Never fix corner bleed with `overflow: hidden`; it clips popovers and plates.
- `.well`: card radius, the sunken fill, and `--cn-well-ring` over `--neu-inset`. `.well.scroll-well` fades its bottom 34px with a mask.
- `.terminal`, `.codeblock`, `.command`: the mono wells. The well's radius, fill, ring and carve, the code role in `--cn-fg-soft`, no ligatures.
- `.empty-state`: a centered column at least `--empty-h` tall in `--cn-fg-muted`. An `svg` first child sits on a 56px carved round. Children stack 8px apart, and a `.btn` or `.btn-text` action adds `--space-4` above itself. `.is-fill` fills its pane, with a 4px gap and 12px above the action.

### Buttons

Compose `btn` with a variant. `<a class="btn">` works.

- `.btn`: `--control-h`, 16px inline padding, control radius, the ui role. Svg 16px.
- `.is-sm`: `--control-h-sm`, the label size, svg 14px. `.is-lg`: `--control-h` plus 12px, the body size, svg 18px.
- `.btn-primary`: the mauve ramp under grain, `--cn-fg-on-accent` text, a transparent border and a plate of mauve 25% into surface-0. The gloss is a white rim at .3 on top and crust at 22% along the bottom 2px. Hover moves the ramp to pink.
- `.btn-secondary`: raised fill, `--edge` border, the `--neu-ink` plate. Hover warms the border toward mauve and deepens the plate 1px.
- `.btn-ghost`: no fill and no plate, with an `--edge-soft` hairline at rest. Hover adds `--hover` and steps the hairline up to `--edge`. In `.topbar nav` and as an icon button it has no resting hairline. Held, it sinks onto `--neu-inset-soft`. With `aria-pressed="true"`, `aria-current` or `aria-expanded="true"` it wears the engaged state.
- `.btn-ghost.is-dashed`: a dashed surface-1 border, card radius, a faint fill. Hover goes mauve. It marks an open slot such as a drop zone.
- `.btn-ghost.is-danger`: red text, a red wash at `--cn-step-wash` on hover.
- `.btn.is-icon`: a `--control-h-sm` square with its glyph in `--cn-fg-muted`. Hover tints toward `--tone`. `.is-icon.is-lg` is a `--control-h` square with a 20px svg. `.btn-secondary.is-icon` is a plated icon button that keeps the secondary's glyph color, hover and press.
- `.btn-text`: inline mauve text at 14px 600 with no padding, pink on hover. Held, it moves 1px. Svg 13px. It is a standalone action in a row, footer or toast. A link inside running prose is a plain `a`.
- Busy: `aria-busy="true"` clears the label so the width holds, hides any svg, and turns a 16px spinner (14px on `.is-sm`) in the label's place. The spinner reads `--btn-busy-ink` and `--btn-busy-ring`: `--cn-fg` on an `--edge` ring, `--cn-fg-on-accent` on the primary. Clicks stop and focus stays. Use it with `aria-disabled`, not `disabled`. A busy button keeps its fill and plate.

Disabled buttons take `--disabled-opacity` and `not-allowed` and never keep a plate. The primary does not dim.

| Control | Disabled look |
| --- | --- |
| secondary, segmented option, button chip | `--disabled-opacity`. No plate, lit edge or outline. The flat `--cn-surface-sunken` fill inside a transparent 1px border, with no carve and no ring |
| primary | Full opacity. No plate, ramp, grain, gloss or edge. A transparent 1px border, the sunken fill, `--cn-well-ring` over `--neu-inset-soft`, and `--cn-fg-disabled` text, 5.1:1 on the fill |

`aria-disabled="true"` looks the same, skips hover and press, and stays
focusable, so a `[data-tip]` on it can say why the action is unavailable.
The consumer ignores its clicks.

### Inputs

- `.field label`: the label role in `--cn-fg-soft`, 8px above the control.
- `.input` and `.field input/select/textarea`: a carved well. No border, transparent, `--cn-field-ring` over `--neu-inset`, `--control-h` tall, 16px inline padding, card radius, 14px at 500, tabular. Placeholder in `--cn-fg-placeholder`.
- Focus: the global ring, on pointer focus as well as keyboard focus. Under the pointer, select options and menu rows light with `--hover` and no outline. Under the keyboard they also draw the ring, inset 2px.
- Textarea: at least twice `--control-h`, vertical resize.
- Select: a chevron, `--cn-chevron-image`, 12px from the right. Where `appearance: base-select` works, the picker is a floating card and the checked option is mauve on `--wash`.
- `.input-lg`: `--control-h` plus 12px (58px), the lede size, on a bare `.input` or inside a `.field`.
- `.input-icon`: an 18px leading icon at 16px; the input pads to 44px.
- `.field small`: help text in the meta role, `--cn-fg-muted`.
- Validation: `aria-invalid="true"` on the control sets `--tone` to red; `.is-warning` sets `--cn-warning`. The well takes `--tint` and a 1px ring in the tone. The help text moves up to `--cn-fg-body` and leads with the 12px glyph in the tone. The label keeps its color. Point `aria-describedby` from the control to its `small`.
- Disabled: `--cn-fg-disabled` text and placeholder, no opacity, `--cn-carve-ring` over `--neu-inset-soft`, no hover ring. The field's label takes the disabled color too.
- In a table cell (`.data-table td .input`): `--control-h-sm` tall, 12px inline padding, control radius, `--cell-font-size`, `--cn-field-ring` over `--neu-inset-soft`. It names itself with `aria-labelledby` pointing at its column header and the row's name cell.
- Read-only (`readonly`): the value in `--cn-fg-soft` with no carve or fill, square corners and an `--edge` rule underneath. Focus still rings it, at the control radius.
- Combobox (`input[role="combobox"]`): the field carve and every field state, with the select's chevron. Give it `aria-controls` naming the listbox, `aria-expanded` and `aria-autocomplete`. The listbox sits on a `.popover`.
- `.listbox` (`role="listbox"`): `[role="option"]` rows on a `.popover`, or standalone in a `.well`. Rows are `--control-h-sm`, 14px at 500 in `--cn-fg-soft`. `--hover` under the pointer and on the active row (`data-active`), `aria-selected="true"` on `--wash` at 600 with a mauve check, and `aria-disabled` at `--disabled-opacity`. Under the keyboard the active row draws the focus ring inset 2px. It scrolls past `min(320px, 50vh)`.
- Date (`type="date"`, `datetime-local`, `month`, `week`): the field carve; the picker glyph is `--cn-calendar-image`.
- File (`type="file"`): `::file-selector-button` is a small secondary inside the field carve, `--control-h-sm` tall: the raised fill, the `--edge` hairline, the lit edge and the 3px ink plate, `--control-edge` on hover and the half plate when held. Disabled drops it to `--cn-fg-disabled` on `--edge-soft` with no plate.

### Tooltip

`[data-tip]` draws a bubble from the attribute: max 240px, control radius,
`--edge-strong` border, `--shadow-pop`, the meta role. It shows on hover,
on keyboard focus, and while a control inside it has keyboard focus, after
.4s, and rises 2px. On leave it lingers for `--t-slow`, so the pointer can
cross onto the bubble, which keeps it open. Never use `title=`.

The bubble's text is generated content with empty alt text
(`content: attr(data-tip) / ""`), so it never joins the element's
accessible name. Carry the same words in `aria-describedby` or, on an icon
button, `aria-label`. Touch screens never hover, so a fact that matters
also lives in the page.

WCAG 1.4.13 needs Escape to dismiss a showing tip, and CSS alone cannot do
that. Call `tooltips()` from `catppuccin-neu/js` or add this listener:

```js
const undismiss = (e) => {
  const el = e.target.closest?.("[data-tip-dismissed]");
  if (el && !el.contains(e.relatedTarget)) el.removeAttribute("data-tip-dismissed");
};
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll("[data-tip]:is(:hover, :focus-visible, :has(:focus-visible))")
    .forEach((el) => el.setAttribute("data-tip-dismissed", ""));
});
document.addEventListener("pointerleave", undismiss, true);
document.addEventListener("focusout", undismiss, true);
```

### Segmented and stepper

- `.segmented`: equal columns, gap 8. Options are `--control-h` plus 12px, control radius, raised fill, on the `--neu-ink` plate with the shared press. The chosen option (`.active`, `aria-pressed="true"` or `aria-checked="true"`) is the engaged state with a mauve `b` label, and a `small` hint in it steps to `--cn-fg-soft`. A disabled option follows the [disabled table](#buttons); a chosen one keeps the engaged carve and dims. `.is-stacked` makes rows `--control-h` plus 24px with lede-size labels.
- `.stepper`: inset pills (999px, the sunken fill, `--neu-inset-soft`, the label role in `--cn-fg-muted`). `.active` or `aria-current="step"` is mauve on a mauve wash at `--cn-step-wash`. `.is-done` is green.

### Marks, chips, tags, banners

- `.mark`: a 28px square in the accent ramp under grain, a `--cn-fg-on-accent` glyph, a border of the glyph color at `--cn-step-wash`, control radius, `--shadow-mark`, 14px at 600.
- `.chip`: an outlined pill, `--chip-pad`, raised fill, the `--edge` outline, no shadow, the label role in `--cn-fg-muted`, svg 14px. A chip that is an `a` or `button` stands on a plate with the shared press, and on hover turns `--cn-fg` with a `--control-edge` border. Disabled, it follows the [disabled table](#buttons). `.chip.is-glyph` is icon-only; keep an accessible name.
- `.tag`: a status tag in `--tone`. 4px padding, chip radius, the label role, a 12px svg. A shallow carve in `--tone-wash`: `--neu-inset-soft` inside a transparent border that forced colors draws.
- `.tag.is-quiet`: no tone, fill, carve or glyph. A `--cn-fg-muted` label with the tag's box, so it lines up with filled tags. It may bring a 12px svg.
- `.tag.is-solid`: the tone fills the tag, and the word and glyph take `--cn-fg-on-accent`. No carve, plate, gloss, grain or raise.
- `.banner`: a tinted band. 12px 16px padding, card radius, `--tint`, a `--tone-border` edge, `--neu-inset-soft`, 14px at 400 on the meta leading. The message is `--cn-fg-body`. The 16px glyph, the edge and the tint carry the tone.
- Every tag and banner holds a word that states the status ("Past due", not a colored dot).
- A `.cn-tone-danger`, `-warning`, `-success` or `-info` tag or banner with no svg child draws its glyph first: a crossed circle, a triangle with a bang, a checked circle or a circle with an i, masked in the tone at 12px (16px on a banner). Palette tones draw none and may bring an svg.

| State | Tag |
| --- | --- |
| the one urgent status in a view, such as Overdue | `.tag.is-solid` in a status tone |
| a state that differs without being urgent, such as Due soon | `.tag` with a tone |
| a default, in-progress or settled state, such as Pending or Paid | `.tag.is-quiet` |

### Selection controls

- `.choice`: a label row, `<label class="choice"><input>Text</label>`, gap 8, 14px. When its input is disabled the label text takes `--cn-fg-disabled`.
- `.checkbox`: 20px, chip radius, `--control-edge` border, `--neu-inset-soft`. Hover edge `--engaged-edge`. Checked is the mauve ramp under grain, a transparent border and a crust tick that lands on the spring. `:indeterminate` takes the same fill with a crust dash; set it from script for a parent whose children are partly checked.
- `.radio`: the same well, round. Checked deepens to `--neu-inset` with a 9px mauve dot and a 3px halo at `--cn-step-wash`.
- `.switch`: 50x28, control radius, the sunken fill under `--neu-inset` with a 1px `--control-edge` ring. The 21x22 paddle tilts 16deg at rest with a 1px `--control-edge` edge. Checked, it slides 23px on the spring, tilts the other way, takes the mauve ramp with a 2x8 crust bar at its center, and glows with `--cn-switch-glow`. Held, it flattens, and held while on the glow is `--cn-switch-glow-held`. Disabled, the paddle lies flat with no raise, paddle and plate drop to `--edge`, and the plate loses its fill.
- Disabled checkboxes and radios take `--edge`. Every disabled checkbox, radio and switch dims to `--disabled-opacity`.
- Error: `aria-invalid="true"` on a checkbox or radio, or on a `fieldset` holding them, edges each unchecked box in `--cn-danger`. Put the message in the field's `small` and point `aria-describedby` at it.
- Held checkbox and radio sink 1px onto the full inset.

### Accordion

A native `details`, with a fold that animates `grid-template-rows` from
`0fr` to `1fr` over `--t-slow`.

```html
<details class="accordion" name="faq">
  <summary><b>Title</b><span class="cn-meta">Meta</span></summary>
  <div class="fold"><div>Body</div></div>
</details>
```

- A shared `name` makes an exclusive group whose open item can still close.
- Closed rows are flat with a divider. Open (`[open]`, a checked input in the label form, `.is-open` or `data-open`) is the open carve: card radius, full inset, mauve at `--cn-step-tint` into base and a mauve title. It is not the engaged state.
- The title row sets at `--cn-type-body-size` at 600 on the name leading, in `--cn-fg`.
- Wrap the title in `<b>` (bold) or `<p>` (regular) so a trailing `.cn-meta` sits by the chevron. At 520px the meta wraps under the title.
- The fold's inner wrapper is one element with `min-height: 0`. Where `::details-content` is missing, the close is instant.
- `.accordion-stack` pads a group inside a panel and drops the last closed divider.

The older label form still renders: `div.accordion`, a `label` holding a
hidden checkbox or radio, and the same fold. Space toggles natively. Enter
needs one consumer listener that clicks the focused input. A radio cannot
uncheck itself, so a radio group that must close fully needs this:

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

### Avatar and spinner

- `.avatar`: 32px round, accent at `--cn-step-wash` into mantle, an accent edge at `--cn-step-edge`, `--neu-raised-soft`, 14px at 600. `.is-lg` is 44px.
- `.avatar-stack`: overlaps by 8px and rings each avatar with `--ring-ground`.
- `.spinner`: a 16px ring with an accent top edge on `spin` at .8s.
- `.skeleton`: control radius, the sunken fill and `--neu-inset`, no ring. At least 16px tall, breathing to .7 opacity on `breathe` over 1.6s. `.is-text` is a 1em line with the chip radius; lines stack 8px apart and the last of several is 62% wide. `.is-round` is a 32px circle. Give the loading region `aria-busy="true"` and the skeletons `aria-hidden="true"`.

### Code

- `.terminal`: a flex column. `pre` pads with `--well-pad` and wraps. `.caret` is a 6x14 accent block on `blink`.
- `.codeblock`: pads with `--well-pad` and scrolls sideways. A direct `.btn.is-icon` child is a 26px copy control pinned 8px from the top right, green with `.is-copied`. `.is-numbered` draws a 3ch line gutter in `--cn-fg-placeholder` with CSS counters; wrap each line in its own element. `.tok-keyword` blue, `.tok-string` green, `.tok-number` peach, `.tok-fn` mauve, `.tok-comment` in `--cn-fg-muted` italic.
- `.command`: one command line, up to 480px wide and 50px tall. `.command-text` holds the line and scrolls sideways; `.command-prompt` inside it is mauve. `.command-copy` is a 34px icon button that turns green while the consumer holds `.is-copied`. `.copy-glyph` shows at rest and `.done-glyph` while copied. `.is-full` fills the row and `.is-wrap` wraps a long statement.

### Accent card

`.accent-card` sits on a plate of its `--accent` mixed 70% into surface-0.
Card radius, 12px 16px padding, `--edge` border, raised fill. Text inside
is text-colored. The accent shows on the plate, on data marks such as a
progress fill, and on avatars and `.mark` squares. Controls inside rest on
their own plate. Wrapped in a link, it takes the shared press.

### Data display

- `.stat`: a label `span` in the micro role over a value `strong` in the value role, with an optional note in a bare `p` in the label role. Label and note are `--cn-fg-muted`. Do not put `.cn-meta` on the note. `.is-lg` uses value-lg in the accent.
- `.stat.is-inline`: a baseline row, label left and value (`b` or `strong`) right, both 14px. Stack rows in `.cn-divide`.
- `.stat.is-inline.is-total`: the row the others add up to, placed after the `.cn-divide` list. The label takes the name role and the value the value role, both `--cn-fg`, under an `--edge` rule with 12px above and below.
- `.stat-grid`: `--stat-cols` across (4 by default) and two across at 760px and below. It never drops to one column. In a `.panel-body` an unruled grid's stats take no padding of their own.
- `.stat-grid.is-ruled`: for stats on the page ground. Each stat hangs from a 2px `--cn-stat-rule` on its start side, 16px in.
- `.progress-track`: 7px, 999px, crust, `--neu-inset-soft`. The `span` fill is the accent ramp under grain; `--progress-fill` replaces the ramp. `.is-lg` is 12px.
- `.data-table`: the class scopes all table styling. Header cells: `--cell-pad`, the band fill, the label weight at `--cell-font-size` in `--cn-fg-muted`, over a 1px `--edge` rule. Body rows part on surface-0. Body cells: `--cell-pad`, 400 at `--cell-font-size`, `--cn-fg-soft`, tabular. A `strong` in a cell is 500 in `--cn-fg`; a total keeps 600. `.cell-name` holds a 600 name over a meta line, 400 in `--cn-fg-muted`; its `strong` and `small` are blocks. `.is-num` on a `th` and its `td`s right-aligns a numeric column.
- Row hover: mauve at `--cn-step-row` into base with a dark gradient over the top 5px of each cell, and the row's text steps from `--cn-fg-soft` to `--cn-fg`. Text that sets its own color keeps it.
- `tr[aria-selected="true"]`: `--wash` and a deeper press. The row's first data cell takes the name weight and a `small` in the row steps to `--cn-fg-soft`. No stripe or edge mark. A selectable row carries a checkbox in a `td.cell-select`, checked while the row is selected.
- `th[aria-sort] > button`: a reset button with a chevron on the label's left in a numeric column. The chevron hides while unsorted and flips for ascending.
- `.data-table.is-sticky-head`: header cells stick to the nearest scroll container, with the rule drawn as `--cn-sticky-rule`. Give the `.table-scroll` wrapper a `max-height`. Body rows and the focusable elements in them take a `scroll-margin-top` of `--control-h` plus 4px (WCAG 2.4.11).
- `.table-scroll`: scrolls a wide table sideways. A table in it with no `td[data-label]` stays a table on phones.
- `td.cell-select`: a row-select checkbox cell. In phone mode it floats to the row's end.
- `td.is-trail`: a trailing cell for phone mode, such as the amount or the status. The last trailing cell sits on the title line beside the name and the one before it under it.
- `.ranked-row`: a rank mark, a 600 name and a trailing value, with the row press. The mark shrinks to a 22px key at the label size.
- `.bar-chart`: a label column and bar groups. `.bar-group` stacks `.bar` rows 4px apart. Each `.bar` draws a 12px chip-radius bar at `--value` of 80% of the track in its `--series` (or `--accent`), painted as the ramp without grain. Its value sits beside it in the meta role. Labels are meta in `--cn-fg-muted`.
- `.sparkline`: an inline row of a 96x24 `svg` (`aria-hidden`) and its value in the meta role in `--cn-fg-soft`, tabular, 8px apart. A `polyline` or `path` draws a 2px non-scaling stroke in its `--series` (or `--accent`) with round caps and joins; an optional `circle` marks the latest point. Each line scales to its own range.
- `.legend` and `.legend-item`: a wrapping key. Each item draws a 10px swatch in its `--series` (or `--accent`), with a sentence-case label in the meta role.
- `.kv`: a `dl` grid at 14px, keys in a column that fits them. Stacks at 520px.

### Overlays

All overlays float on `--shadow-pop`, never on neu depth, and fill with
`--cn-surface-overlay`.

- `.popover`: absolute, `min(390px, 100vw - 32px)`, card radius, `--edge-strong` border. Header and footer pad 12px 16px; the footer is divider-only.
- `dialog.modal`: centered, `min(520px, 100vw - 32px)`, panel radius, `--edge-strong` border. `.is-wide` is 760px. Its header is a band on the dialog's fill.
- `dialog.drawer`: pinned right, `min(420px, 100vw - 40px)`, full height, a left hairline, square corners.
- `showModal()` and `close()` are the whole dialog API. `::backdrop` is the scrim: crust at 80% with a 2px blur.
- `.toast-stack`: fixed 24px from the right and bottom, up to 380px wide. Toasts append at the bottom. At rest only the newest visible toast is in flow; the next two sit behind it at -12px and .96 and at -22px and .92, and older ones hide. Hover or focus fans the pile into a column. In the fanned column a leaving toast collapses its height and margin as it fades.
- `.toast`: a row with a content column (`b` title over a `span` or `p`) and trailing controls. Card radius, `--edge-strong` border, overlay fill, meta role.
- Give `.toast-stack` `role="region"`, `aria-live="polite"` and an `aria-label` such as "Notifications". An error that needs action belongs in a dialog or a banner, not a toast that times out.
- Motion: a popover fades and drops 4px over `--t-fast`. A toast fades and slides 16px from the right over `--t-base`. A modal fades, rises 8px and scales from .98 over `--t-base`. A drawer slides in over `--t-slow`. The backdrop fades with them. Every exit takes the ease-in over `--t-exit`.
- Popovers and toasts enter with `@starting-style` and exit through `[hidden]`, which keeps `display` and drops `visibility`. Dialogs use discrete `display` and `overlay` transitions. Where a browser lacks them, a dialog appears in place.

### Page

- `.page-main`: the page column, `min(var(--page-width, 1440px), 100% - 2 * var(--page-gutter))`, centered, `--page-pad` above and below. `.is-narrow` is 860px. `.is-reading` is 740px and sets the lede at 20px.
- `.topbar`: sticky, `--band-h` plus 4px, `--page-gutter` inline, the page ground at 91% with a 14px blur, a hairline and `--shadow-cast`. A three-column grid. Where `animation-timeline: scroll()` works, the cast fades in over the first 60px of scroll. `.topbar nav` is a row of ghost buttons. `.is-split` is two regions, brand left and actions right. `.is-compact` is a 52px app strip, `--band-h` at compact density.
- A page that holds a topbar gets `scroll-padding-top` through `:root:has(.topbar)`: the bar's minimum height plus 12px, which is 80px by default, 72px at 760px and below, and 64px for `.is-compact` (WCAG 2.4.11). A bar that grows past its minimum height needs the consumer's own value.
- `.wordmark`: the name at 18px and 700 with display tracking; `em` is the mauve half. A `.mark` before it is the brand tile (28px). `.is-lg` is 20px with a 34px tile. `.is-sm` is the footer brand at 14px: a 16px mauve glyph, the name, a mauve `b` suffix set .25em off the name, and an optional `--cn-fg-muted` note in a `span`.
- `.page-footer`: same width as the column, at least 72px, a surface-0 top rule, `--cn-fg-muted` text.
- `.display-title`: an alias of `.cn-display`. Both set `margin: 0`. `.lede`: the lede role, max `--cn-measure`, 24px above and below.
- `.app-shell`: a column at least the viewport tall; its `main` absorbs the slack so the footer sits at the bottom. `.is-fixed` makes the shell exactly the viewport and turns off the root's `scrollbar-gutter`.
- `.app-shell.has-sidebar` lays a `.sidebar` beside the content: `--sidebar-w` (264px) wide, the full viewport tall, sticky, on the recessed fill, with an `--edge` rule on its inner side. `.sidebar-head` holds the wordmark and a `.sidebar-toggle`; `.sidebar-body` scrolls.
- `.sidebar-nav` stacks groups 24px apart, each a `.cn-microlabel` over links at the ui size and 500 in `--cn-fg-muted`. Hover is `--cn-fg` on `--hover`. `aria-current="page"` is 600 in `--cn-fg` with a 4px `--cn-interactive` spine on the start edge, inset 8px, and no wash, rim or carve. The group that holds the current page lifts its microlabel to `--cn-fg`.
- At 1060px and below the sidebar is a sticky blurred bar, the toggle shows, and the body opens under `.is-open`. It fades in and settles 4px over `--t-base` on the ease-out and leaves on the ease-in over `--t-exit`. The consumer sets `.is-open` and `aria-expanded`. The folded bar sets `scroll-padding-top` through `:root:has(.sidebar)`, its closed height plus 12px.
- `.deck`: hash-routed views. The `:target` child shows, the first child is the default, and a deep link shows the view that contains it.
- `.live-dot`: a 7px green dot with a 4px halo at `--cn-step-wash`, pulsing every 1.5s on the ease-out.

### Tabs, menu, slider, pagination, breadcrumbs

- `.tabs` (`role="tablist"`): a shallow carve, `--cn-carve-ring` over `--neu-inset-soft`, holding `[role="tab"]` buttons at `--control-h-sm` in the ui role, `--cn-fg-muted`. The `aria-selected="true"` tab rises out of the carve on the raised fill with `--neu-raised-soft`, the lit edge and the `--engaged-edge` rim. A tab is a view and rises; a segmented choice is a setting and presses in. With `tabs()` wired, the raised fill is one pill, `.tabs::before`, that slides to the selected tab over `--t-fast` on the ease-out.
- `.menu` on a `.popover` (`role="menu"`): `[role^="menuitem"]` rows at `--control-h-sm`, 14px at 500 in `--cn-fg-soft`. Hover and keyboard focus share `--hover`; keyboard focus also draws the focus ring inset 2px. An svg leads at 16px in `--cn-fg-faint`, a `kbd` trails as the shortcut, `aria-checked="true"` draws a mauve check, `.is-danger` is red with a red wash, `hr[role="separator"]` is an `--edge-soft` rule, and a `.cn-microlabel` heads a group. Once any row leads with an svg, rows without one and the group labels indent to the icon column.
- `.slider` (`input[type=range]`): a 7px carved crust track filled with `--cn-interactive` up to the thumb, and a 20px raised round thumb with a `--control-edge` rim and the lit edge that rims mauve on hover and shrinks to .92 when held. Firefox fills natively; elsewhere `slider()` or the consumer keeps `--value` in step. Pair it with a label and an `output`.
- `.pagination` (`nav`): square ghost targets at `--control-h-sm` with tabular figures, 14px at 500 in `--cn-fg-body`; `aria-current="page"` is the engaged state at 600; a `span` is the ellipsis.
- `.breadcrumbs` (`nav > ol`): crumbs at 14px and 500, `--cn-fg-body` links, a 12px `--cn-fg-faint` chevron between them that flips in right-to-left text, and the `aria-current="page"` crumb in `--cn-fg` at 600.

### Prose and skip link

- `.cn-prose`: an article from bare elements, the one recipe that styles bare elements and only inside itself. The body role at `--cn-measure`, 16px between blocks, `h2` in the heading role with 48px above, `h3` in the title role with 32px, `h4` in the name role with 24px, 12px under any heading, inline `code` in mono at .92em in `--cn-fg-soft`, a `blockquote` on a 2px `--edge-strong` inline-start rule, and `hr` as an `--edge-soft` rule.
- `.cn-skip-link`: the first focusable element. It sits above the viewport until it takes keyboard focus, then slides in at the top inline-start corner on the overlay fill with `--shadow-pop`.

### Writing direction

Recipes use logical properties (`padding-inline-start`, `margin-inline-end`, `border-inline-start`, `text-align: start`), so spacing and rules follow the writing direction. Positions, transforms and the switch travel are still physical.

## Behavior

The CSS reads ARIA state and needs no script to look right. Tabs, menus,
listboxes and comboboxes also need a keyboard model, from
`catppuccin-neu/js` (a framework-free module that follows the WAI-ARIA
patterns) or from the consumer's own widget library. Load
`catppuccin-neu/js/auto` or call `init()`, not both for the same markup.
Slider fill and toasts are optional. Each function returns a cleanup.

- `tabs(tablist)`: Left, Right, Home and End move focus and select, mirrored in RTL. Only the selected tab is in the tab order. Each tab's `aria-controls` panel shows only while it is selected. Fires `cn-select`. On a `.tabs` carve it measures the selected tab into `--cn-tab-x` and `--cn-tab-w`, sets `data-cn-indicator` so the pill slides, and follows resizes.
- `menu(trigger)`: for a trigger with `aria-haspopup="menu"` and `aria-controls` naming a hidden `.menu[role="menu"]`. Click, Enter or Space opens on the first item, ArrowUp on the last. Arrows, Home and End move. Escape closes and returns focus. Tab or a press outside closes without moving focus. A `menuitemcheckbox` toggles `aria-checked` and stays open. `aria-expanded` on the trigger is its engaged state.
- `slider(input)`: keeps `--value` in step with the range.
- `listbox(list, { combobox })`: a `[role="listbox"]` of `[role="option"]` rows. Focus stays on the listbox, or on the combobox input that drives it, and `aria-activedescendant` names the active row, which also gets `data-active`. Up, Down, Home and End move it. Enter, or Space on a listbox, selects it (`aria-selected`, toggled under `aria-multiselectable`) and fires `cn-select`. With `combobox`, an `input[role="combobox"]`, ArrowDown, ArrowUp or typing opens the list; Escape, Tab, a pick or a press outside closes it, and a pick writes the option's text into the input. Filtering is the consumer's.
- `tooltips()`: Escape hides a showing `[data-tip]` until the pointer or focus leaves it.
- `toast(stack, { title, body, timeout, closeLabel })`: appends a `.toast` with a dismiss button. `closeLabel` names it, "Dismiss" by default. The timeout runs only while neither the pointer nor focus is in the stack. A drag toward the end edge follows the pointer and dismisses past 80px or on a flick; short of that the toast springs back. The exit runs through `[hidden]`, then the node is removed.
- `init(root)`: wires every `[role="tablist"]`, menu button, `[role="listbox"]`, `[role="combobox"]` with `aria-controls` and `.slider` under `root`, plus `tooltips()`. It wires what is in the page when it runs.
- `catppuccin-neu/js/auto`: no exports. The same wiring for the whole document, run on `DOMContentLoaded` and again, once per frame at most, when nodes are added or removed. It removes the listeners of a widget that leaves. A menu trigger waits until the popup it names is in the page.

Disabled items are skipped everywhere. Focus return, outside-press and
Escape behave the same in every widget.

### Expected announcements

The docs' Accessibility page lists what a screen reader should speak for
tabs, menu, listbox, combobox, toast and dialog. The lists follow from the
roles and states.

## Responsive

Three breakpoints. Each removes decoration, never content.

Component folds (the stat grid and panel footer at 760px; the segmented control, stats, accordion meta and `.kv` at 520px) also answer a `.cn-container`'s width. Page chrome and the table's row mode stay on the viewport.

- **1060px**: the tilted panel flattens to `--neu-raised`, the topbar goes to two columns, `.nav-secondary` hides, the sidebar folds into a bar with a menu toggle, and `.cn-grid-12` splits become halves.
- **760px**: the topbar is 60px (48px compact). Its nav scrolls sideways, and a split bar's actions wrap onto more rows. The footer stacks. The lede drops to the body size. Panel footers wrap. `.panel.is-shell` sheds its chrome. A `.data-table` becomes rows unless it sits in `.table-scroll` with no `td[data-label]`: the header hides, each `td[data-label]` puts its label in a 120px left column with the value beside it, a cell without a label spans the row, a `td.is-trail` rides beside the name, hairlines split rows, and the press moves to the row. `.cn-grid-3/4` and `.stat-grid` go to two columns.
- **520px**: the segmented control stacks. Stat values drop to 18px (24px on `.is-lg`) and band titles to 16px. The accordion stack tightens and its meta wraps under the title. `.kv` stacks. Every `.cn-grid-*` goes to one column.

## Verification

`pnpm lint` runs `scripts/lint.mjs` on `css/tokens.css`, `css/utilities.css`, `css/recipes.css` and `tailwind/theme.css` and fails on:

- a custom property that references itself
- a raw duration in a transition (only zero and the reduced-motion .01ms pass)
- a raw px value in a gap, padding or margin in recipes or utilities, other than 0 and ±1px
- a palette text stop or a bare accent hue in a recipe, outside the `.tok-*` syntax colors
- a hand-mixed `color-mix` of surface-1 or surface-2 in recipes or utilities
- `outline: none` or `outline: 0` anywhere
- a row of the type table above that disagrees with the tokens
- a contrast pairing under its floor in the table below, in the default and more-contrast values
- a ratio in a token comment that is more than .06 off the computed ratio
- a frozen token whose value differs from the snapshot
- a `:root[data-contrast="more"]` block that differs from the `prefers-contrast: more` block
- a layer of `--neu-inset` or `--neu-inset-soft` that falls from the bottom right or is lighter than the page, a panel or a well
- a `box-shadow` or `--hard-extra` in recipes or utilities that is not `none` or a comma list of `var()` tokens. Every layer has a name in `tokens.css`: the neu tokens, `--cn-lit-edge`, `--cn-field-ring`, `--cn-carve-ring`, `--cn-field-hover-ring`, `--cn-well-ring`, `--shadow-pop/cast/mark`, the plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`), `--cn-primary-rim`, `--cn-gloss-inset`, `--cn-validation-ring`, `--cn-readonly-rule`, `--cn-sticky-rule`, `--cn-switch-ring`, `--cn-disabled-ring`, `--cn-halo-ring`, `--cn-live-halo`, `--cn-switch-glow`, `--cn-switch-glow-held` and `--cn-ground-ring`. The plates, the validation ring and the ground ring read `--plate`, `--hard-offset`, `--tone` or `--ring-ground`, so they are declared on the elements that draw them
- a radius in recipes or utilities that is not a `--cn-radius-*` token, 999px, 50%, 0, `inherit`, or a radius token minus 1px
- `text-transform: uppercase` anywhere but `.cn-microlabel` and the stacked `.stat` label
- a transform or box-shadow transition with no `--ease-*` curve, or a transition that uses the `ease`, `linear` or `ease-in-out` keywords
- `!important` outside the `[hidden]` rule, `.cn-hidden`, and the reduced-motion and forced-colors blocks
- in `showcase/src`, a `title=` on an element or an `overflow: hidden`

Contrast floors. "Every ground" is the page, raised and overlay fills.

| Pairing | Floor |
| --- | --- |
| `--cn-fg`, `-soft` and `-body` on every ground and on the recessed and sunken fills | 7:1 |
| `--cn-fg-muted` on the same grounds | 5.5:1 |
| `--cn-fg-placeholder`, every status role and the link on the same grounds | 4.5:1 |
| each status role on its own tint and wash | 4.5:1 |
| `--cn-fg-muted` and `--cn-interactive` on `--wash`; `--cn-fg-soft` and `--cn-fg-muted` on the hovered row | 4.5:1 |
| `--cn-fg-on-accent` on the primary and its hover | 4.5:1 |
| the hovered field ring, focus ring, control edge and engaged rim (the rim also on `--wash`) | 3:1 |
| the resting field ring under more contrast | 3:1 |
| `--edge` | 1.8:1 on the page and raised fills, 1.5:1 on an overlay |
| `--edge-strong`, always above `--edge` | 2.4:1 and 1.9:1 |
| the lit edge | 1.4:1 and 1.3:1 |
| the resting field ring, and `--cn-field-ring-overlay` on an overlay | 2:1 |
| the carve ring on the page and raised fills | 1.7:1 |
| the well ring on the page, a panel and the sunken fill, always under the carve ring | 1.5:1 |
| `--hover` and the row hover on base, each under `--wash` | 1.35:1 |
| APCA: `--cn-fg`; `-soft` and `-body`; `-muted`; `-placeholder` | Lc 75; 60; 50; 40 |

Reviewers also check:

1. Every color is a Mocha hex from tokens, `currentColor`, `transparent`, `color-mix(in srgb, …)` of tokens, `oklch(from …)` of a token, the white at .16, .1 or .3, or the crust, surface-1 and `rgb(8 8 14)` values the neu tokens and the row press use. Data-URI glyphs use palette hexes, and mask glyphs black strokes. Mask gradients are exempt.
2. The `:focus-visible` outline is never removed, only made transparent where a ring replaces it.
3. Each file parses alone and through `index.css`.
4. No purpose-named classes beyond the slot names in [Special cases](#special-cases).

### Showcase

`showcase/` is a Preact and Vite site that imports `../css/index.css` and
deploys `dist/` as Cloudflare Workers static assets. It is the visual
reference: every recipe and state appears at least once, and every page
uses the current names. `src/nav.ts` registers routes, and docs pages come
from the kit in `src/lib/doc.tsx`. Specimens sit on the page ground. Close
buttons draw a 14px stroke glyph, never a text character. The docs column
is 860px and the examples column 1040px. Run it with
`pnpm --dir showcase install && pnpm --dir showcase dev`.
`pnpm --dir showcase build` must pass.

`pnpm --dir showcase test:a11y` opens every route in Chromium. It fails on
an axe violation (wcag2a through wcag22aa) by default and under more
contrast, on clipped text under the WCAG 1.4.12 text-spacing override, on
a focus ring that is not `Highlight` under forced colors, on motion under
reduced motion, on sideways scroll at 700px, 390px and 320px, on a broken
composition rule, on a motion timing that is off, and on a capture of
`/depth`, `/examples/dashboard` or `/examples/invoice` that differs from
its baseline in `showcase/visual-baselines/` by more than 0.1% of its
pixels. `--update-shots` rewrites the baselines and `--motion` runs the
motion check alone. The header of `showcase/scripts/a11y.mjs` documents
every check.

The run saves a forced-colors screenshot of every route to the ignored
`showcase/a11y-shots/forced-colors/` and each capture to
`showcase/a11y-shots/dimmed/` at half the luminance under a 1.3 gamma.
Look at the panel hairline, the foot, the well ring and the sidebar rule
there before proposing a change to `--edge`.
