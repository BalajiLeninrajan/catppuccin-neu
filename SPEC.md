# catppuccin-neu spec

A dark neumorphic design system in Catppuccin Mocha. This file and the CSS
in `css/` are the source of truth. [CHANGELOG.md](./CHANGELOG.md) records
how each rule got here.

## Ground rules

- **Generic content.** Docs, README and CSS comments never name a consumer project. Examples use neutral product content: dashboards, settings, invoices, messages.
- **Names describe style.** A class names an appearance (chip, banner, panel, dashed, tilted), never an action (add, back, search, submit). The sanctioned exceptions name a slot's job inside a fixed pattern: `.command-copy`, `.copy-glyph` and `.done-glyph` in the command, `.sidebar-toggle` in the sidebar head, and `td.cell-select` in a table row.
- **No single-use recipes.** Anything that cannot be generalized lives in the consumer's own CSS.
- **Mono is for code.** The package sets `var(--mono)` only on `.cn-code`, `.cn-code-meta`, `.cn-code-inline`, `.terminal`, `.codeblock` and `.command`, and on `code` inside `.cn-prose` and `kbd` in a `.menu`. A consumer may put mono on one element that earns it, never on prose, headings or a whole control set. Sans numbers use `tabular-nums`.
- **Uppercase is scarce.** Only `.cn-microlabel` is uppercase. It labels a fact or heads a group of links in navigation, never a page section.
- **Readable text is overlay-2 or lighter.** Overlay-2 (`--cn-fg-placeholder`) is for placeholders and the code line-number gutter only; labels and meta are subtext-0. overlay-0 and overlay-1 are for icons, borders, the field lip and disabled text. Recipes name the job (`--cn-fg-muted`), not the hex.
- **Dark only.** The package sets `color-scheme: dark` and does not answer `prefers-color-scheme: light`. It answers `prefers-contrast`, `prefers-reduced-motion`, `prefers-reduced-transparency`, `forced-colors`, `pointer: coarse` and `hover: none`, and resolution queries size the grain tile. Light text on a dark ground blooms for readers with astigmatism, so the system holds the mitigations that fit dark mode: body text is subtext-1, not white; body weight is 400; leading is 1.6; and `prefers-contrast: more` lifts every role a stop.
- **Depth replaces borders on inset surfaces.** Transparent carves (fields, tabs, the switch plate) paint no border and no background of their own. The filled carves are the exception: wells, the mono wells and stepper pills take `--cn-surface-sunken`, because a shadow alone tops out near 1.28:1 on a dark page and a transparent well reads as an outlined panel; skeletons take the lighter `--cn-surface-band`, and the progress and slider tracks take crust. Tinted carves (the banner, an invalid field, the open accordion) take their tone's tint. Hairlines stay on raised surfaces and tinted surfaces. The checkbox, radio and switch keep an edge, because at 20px the carve alone is invisible. A carved field keeps its lit lip (`--cn-field-ring`), because an empty field has no label inside it to show where it is.
- **One signal per item.** Color goes on plates and data marks such as a progress fill. Text stays text-colored, with three exceptions: the hero value (`.cn-value-lg`, `.stat.is-lg`) and avatar initials are set in `--accent`, and a status `.tag`, a two-word label that works as a mark, is set in its tone. A banner's message and an invalid or warning field's help text are sentences, so they stay `--cn-fg-body`, with the tone on the glyph. Inside an accent card the hero value is text-colored too, while avatars and marks keep the accent. An accent comes from the item's identity, so the same item has the same accent on every page.
- **The ornaments stay, and they are one idea.** Every ornament is a physical object under the one top-left light: a carve sits below the ground; a plate is the side of a block standing on it; the tilt lifts one card off it; the rocker is a wall switch in a carved plate; the gloss and the ramp are that light on a solid fill; grain is the fill's tooth; the spring is the block settling back. The tilted panel, colored plates, the switch rocker, the primary gloss, the fill grain, the empty-state carve, the spring curve, page-enter, the toast pile and the scrim blur are the package's identity.
- **One tilted panel per page**, holding a summary or an aside, not the page's main data.
- **`color-mix` is `in srgb`.** `in oklab` is allowed only for data-visualization ramps. `oklch(from …)` is allowed only in `--cn-fill-ramp`, where it moves lightness and chroma, never hue.
- **Fonts.** Every page links Inter with its optical-size axis (`Inter:opsz,wght@14..32,100..900`) and JetBrains Mono (100..800) from Google Fonts.
- **Ornament budget.** A view holds one tilted panel, one primary and at most one `.is-lg`. Each ornament kind has one job: grain only on solid accent fills; blur only on the topbar, the folded sidebar and the scrim; plates only under clickables, accent cards and the one tilted panel. The ramp and grain always travel together on a solid accent fill, so they count as one kind, the fill; the switch paddle takes the ramp without grain. Five elements are allowed composites and stack several kinds: the primary (plate, fill and gloss), the checked or indeterminate checkbox (fill and gloss), `.mark` (fill and gloss), the on switch (rocker, ramp, gloss and glow) and the tilted panel (tilt and plate). Every other element holds one kind; the progress fill is the fill alone. `.is-lg` here means a hero control: a large button or `.input-lg`; a large stat or avatar does not count. The tilt never sits on a panel with a table or a form.

### Cascade

`css/index.css` declares three layers and imports the files into them:

```css
@layer cn.tokens, cn.recipes, cn.utilities;
@import "./tokens.css" layer(cn.tokens);
@import "./recipes.css" layer(cn.recipes);
@import "./utilities.css" layer(cn.utilities);
```

A utility beats the recipe on the same element: `panel cn-flat` clears
the panel's shadow and `panel cn-p-16` pads the panel. Consumer CSS is unlayered and
beats both, so an override never needs `!important`. The three files also
work as plain `<link>` tags in the same order.

With Tailwind v4, import the package before `tailwindcss`, so Tailwind's
utilities layer lands on top.

### Distribution

- Bundled apps install the git tag (`github:BalajiLeninrajan/catppuccin-neu#v0.4.1`) and import `catppuccin-neu/css/index.css`.
- Zero-build pages with a `package.json` run `catppuccin-neu-sync <dir>` in a pre-build hook and ignore the copies in git.
- Pages with no `package.json` link `https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.1/css/index.css`. Pin a full tag. Link `index.css`, not the three files, so the layers survive.
- Behavior is optional: `import { init } from "catppuccin-neu/js"` wires the keyboard model the recipes assume. See [Behavior](#behavior).
- Nobody commits copies of the CSS. Tags never move once pushed.

The docs deploy as the `catppuccin-neu` Cloudflare Worker at
https://catppuccin-neu.balajileninrajan.dev.

## Tokens

`css/tokens.css`, layer `cn.tokens`. Everything else reads these.

### Palette and faces

All 26 Mocha hexes: twelve neutrals, `--crust` through `--text`, and fourteen hues, `--rosewater` through `--lavender`. Do not substitute a
hex. `--sans` is Inter first and `--mono` is JetBrains Mono first. The root
sets `font-optical-sizing: auto`, so Inter's opsz axis tightens display
sizes and opens small ones.
Each falls back to a local face (`Inter Fallback`, `JetBrains Mono
Fallback`) whose metrics are overridden to match, so the swap does not
reflow, and then to system faces.

Every hue has a job, so none is a free decoration:

| Hue | Job |
| --- | --- |
| mauve | interaction: links, the primary, checked and engaged states; series 1 |
| pink | the interactive hover; series 6 |
| red | danger |
| yellow | warning; series 2 |
| green | success |
| blue | info; series 5 |
| teal | series 3 |
| peach | series 4 |
| rosewater, flamingo, maroon, sky, sapphire, lavender | record identity only: an `--accent` for a team, project or person beyond the six series, never status or interaction |

### Semantic roles

Recipes read these instead of palette names. Ratios are on base.
`prefers-contrast: more` moves each text role one stop lighter.

| Token | Value | Job | Ratio |
| --- | --- | --- | --- |
| `--cn-fg` | text | headings, names, values | 11.3:1 |
| `--cn-fg-soft` | subtext-1 | lede, table cells, code | 9.3:1 |
| `--cn-fg-body` | subtext-1 | running text | 9.3:1 |
| `--cn-fg-muted` | subtext-0 | labels, meta, help, table heads | 7.4:1 |
| `--cn-fg-placeholder` | overlay-2 | placeholders, code line numbers; the floor for text | 5.8:1 |
| `--cn-fg-faint` | overlay-1 | decorative icons, the field lip | 4.4:1 |
| `--cn-fg-disabled` | overlay-1 | disabled text | 4.4:1 |
| `--cn-interactive` | mauve | links, the primary, checked controls | 8.1:1 |
| `--cn-interactive-hover` | pink | their hover | |
| `--cn-focus` | text | the focus ring, the one bright neutral no state uses | 11.3:1 |
| `--cn-danger`, `-warning`, `-success`, `-info` | red, yellow, green, blue | status tones | |

Crust on the mauve primary is 9.2:1; `--cn-fg-on-accent` names it. Placeholders are `--cn-fg-placeholder`: 5.8:1 on the page and on raised surfaces, which share its color, and 4.6:1 on an overlay. Chrome text (labels, table heads, meta) sits a stop above the floor, on subtext-0. Warning is yellow, Catppuccin's
warning, which sits 1.8:1 from red where peach sits 1.3:1.

Non-text contrast: the field lip is overlay-1, 4.4:1 on the page and on
raised surfaces and 3.5:1 on an overlay. Unchecked control edges and the
slider thumb are `--control-edge`, overlay-1, at the same 4.4:1 and 3.5:1.
The focus ring is 11.3:1 on the page and raised surfaces and 9.0:1 on an
overlay. A button is identified by its label, so its resting hairline is
decoration.

### Surfaces

Each step has one token. Panels and plated controls sit on the page color.
A raised surface lifts by its edges and shadow, never by a lighter fill:
the contact edge and near shadow, the cast, the lit top edge and the
`--edge` hairline.
Overlays float free of the page, so they take the one lighter step.

| Token | Value | Holds |
| --- | --- | --- |
| `--cn-surface-sunken` | crust 38% into mantle, 1.10:1 under base | wells, the mono wells, stepper pills, the disabled primary |
| `--cn-surface-band` | crust 30% over transparent, one step under its parent, 1.05:1 under base | table heads, skeletons |
| `--cn-surface-recessed` | mantle 55% into base | the sidebar |
| `--cn-surface-page` | base | the page ground and transparent carves |
| `--cn-surface-raised` | base, the page color | panels, the lead panel, secondary buttons, segmented options, chips, accent cards, the selected tab, the switch paddle |
| `--cn-surface-overlay` | surface-0 90% into base, 1.27:1 | popovers, dialogs, drawers, toasts, tooltips, the secondary hover |

Body text stays above 7:1 and placeholders above 4.5:1 on the overlay. A
lighter overlay would drop the placeholder role under 4.5:1, so the ladder
stops at 1.27:1.
`--hover` is surface-1 40% over transparent: 1.24:1 on the page and 1.15:1
on an overlay, so a menu row still lights. Bands never take a darker fill
than the surface they title; panel, modal and drawer headers sit on their
parent's fill behind a divider.

Elevation, low to high: carved (`--neu-inset`, transparent or sunken), page, raised
(`--edge` and `--neu-raised`), lead (`--edge-strong` and `--neu-lifted`),
plated (the hard offset), tilted (one per page), overlay (overlay fill and
`--shadow-pop`). Everything below overlay shares the page color. A cast
shadow barely registers on a dark page, since even black is only 1.28:1
under base, so rank rides on the edges: the lit top edge and `--edge` on a
panel, 1.5:1 and 1.6:1, and the bright rim and `--edge-strong` on the lead,
3.4:1 and 2.5:1. The near shadow keeps the bottom and right edges crisp
where the cast fades. The lead panel's band title also steps up to
`--lead-title-size` at the heading weight.

### Mix steps

Every tint of a hue uses one step, so a wash means one strength
everywhere: `--cn-step-tint` 4%, `--cn-step-wash` 12%, `--cn-step-engaged` 20% (the engaged wash), `--cn-step-fill`
14%, `--cn-step-row` 8% (the row hover), `--cn-step-plate` 25%, `--cn-step-edge` 40%, `--cn-step-strong` 50%, `--cn-step-vivid` 70% (accent plates, the engaged rim).
The switch glow reads `--cn-step-fill`, and `--cn-step-plate` while held.

Status ladders name the stops of each status role:
`--cn-<role>-tint` (the role at `--cn-step-tint` over transparent), `-wash`
(`--cn-step-wash`), `-edge` (`--cn-step-edge`) and `-border` (the role at
`--cn-step-plate` into surface-0), for danger, warning, success and info.
Recipes read whichever stop the job needs through `--tint`, `--tone-wash`,
`--tone-edge` and `--tone-border`. Those default to the same mixes of the
element's `--tone`, and a status `.cn-tone-*` swaps in its ladder, so one
hue's stop can be tuned without moving the shared steps. Lint holds each
role at 4.5:1 on its own tint.

### Type roles

Each role is four tokens: `--cn-type-<role>-size`, `-weight`, `-leading`
and `-tracking`. Weights are 400, 500, 600 and 700 only. Sizes are rem, so
the reader's browser font size scales every role; the table gives px at
the 16px default. Display sizes clamp between rem bounds, so zoom and
font size still reach them. They grow from 520px and reach their maximum
at 860px (`--cn-width-narrow`), so on desktop widths display is 2x the
heading and display-sm 1.43x.

| Role | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| micro | 12px | 500 | 1.25 | .08em |
| label | 13px | 500 | 1.25 | 0 |
| meta | 13px | 400 | 1.5 | 0 |
| ui | 14px | 600 | 1.25 | 0 |
| body | 16px | 400 | 1.6 | 0 |
| lede | 18px | 400 | 1.6 | 0 |
| title | 20px | 600 | 1.3 | -.01em |
| heading | 28px | 700 | 1.25 | -.025em |
| value | 24px | 600 | 1 | -.02em |
| value-lg | 32px | 600 | 1 | -.025em |
| code | 13px | 500 | 1.6 | 0 |
| display | 36 to 56px | 700 | 1.08 | -.03em |
| display-sm | 30 to 40px | 700 | 1.08 | -.03em |

display and display-sm share one weight, leading and tracking token. name
is the ui role in `--cn-fg`: its four tokens alias the ui tokens, so a
name never drifts from the control voice beside it. Label and meta share
13px and differ by weight as well as leading: the label at 500, meta at 400.
Tracking tightens with size: 0 through 18px, -.01em at 20, -.02em at 24,
-.025em at 28 and 32, and -.03em at display sizes. The large steps run
20, 24, 28, 32 (title, value, heading, value-lg), so a stat value
outweighs the panel title above it. At 520px both step down: the value to
the lede size (18px) and the band title to the body size (16px). Chrome (label, micro) is 500 and meta 400, so 600
belongs to names, controls and titles. 700 belongs to the
heading, display and the wordmark; the title is 600, so a panel title never
outweighs the page heading.
Compact density steps body to 15px. `.page-main.is-reading` sets the lede at 20px. Mono
surfaces turn ligatures off, so `=>` stays two characters.

### Spacing and radius

- `--space-1..6`: 4, 8, 12, 16, 24, 32, inside components. Page widths are tokens too: `--cn-width-page` 1440, `--cn-width-narrow` 860, `--cn-width-reading` 740, and `--cn-measure` 68ch for prose. `--space-7` 48 and `--space-8` 64 space sections and page regions. Every gap, padding and margin in recipes and utilities reads one of these, a density knob, 0 or 1px.
- `--cn-radius-panel` 16, `--cn-radius-card` 12, `--cn-radius-control` 8, `--cn-radius-chip` 4. Pills are 999px and rounds 50%.

### Depth

Light comes from the top left. Every elevation is one of five neu tokens:

```css
--neu-raised:      1px 1px 0 var(--neu-contact), 1px 2px 2px var(--neu-near), 10px 12px 24px var(--neu-shade), var(--cn-lit-edge);
--neu-lifted:      1px 1px 0 var(--neu-contact), 1px 2px 2px var(--neu-near), 14px 18px 36px var(--neu-shade), inset 0 1px var(--overlay-0);
--neu-raised-soft: 1px 1px 0 var(--neu-contact), 3px 4px 9px rgb(8 8 14 / .5);
--neu-inset:       inset 4px 4px 9px var(--neu-dark), inset -3px -3px 7px rgb(69 71 90 / .24);
--neu-inset-soft:  inset 2px 2px 5px rgb(17 17 27 / .52), inset -2px -2px 4px rgb(69 71 90 / .18);
```

A shadow must be darker than the darkest surface it falls on, and crust
sits only 1.1:1 under base. So the raised shadows use crust taken halfway
to black: `--neu-shade` at .72 for the cast, `--neu-contact` at .55
for a 1px edge where the surface meets the ground, and `--neu-near` at .8
for a tight 1px 2px 2px shadow that darkens the first pixels past the
bottom and right edges, where the cast is too faint to show at 1x. A
carve's dark wall uses the same base (`--neu-dark` at .8), because a
well's wall falls on the page. The raised token carries four cues:
contact, near shadow, cast and the lit top edge (surface-2 at 45%, 1.5:1
on base), which alone marks the light side. `--neu-lifted` is the same
four cues with a longer cast and a brighter rim, overlay-0 at 3.4:1, for
the lead panel. `--neu-raised-soft` is contact and a short cast. No raise
draws a top-left highlight outside its edge, because on base that layer
reads as a grey glow; a caller that wants the lit side adds
`--cn-lit-edge`. `--neu-dark-soft` is crust at .30. Three shared composites float or
mark: `--shadow-pop` (overlays: a long cast and a tighter one on the same
base, so a float reads at 1x), `--shadow-cast` (the topbar) and
`--shadow-mark` (the `.mark` drop with a white top edge). A panel inside a
panel rests on its parent and takes `--neu-raised-soft` with the lit edge.

One model covers every depth on the page. The light is above and to the
top left; height is distance from the ground.

| Height | What draws it | Who |
| --- | --- | --- |
| below the ground | a carve, the dark wall top left, the lit lip bottom right; a well also takes the sunken fill | fields, wells, tabs, the switch plate |
| the ground | nothing | the page |
| resting on it | the page color, the `--edge` hairline, the lit top edge, the contact edge and near shadow, a soft cast | panels, static chips, the selected tab |
| resting higher | the page color, the bright `--edge-strong` hairline, the bright overlay-0 rim, a longer cast (`--neu-lifted`) | the one lead panel |
| standing on a plate | the page color and lit edge over a hard offset, the plate's side, which replaces the cast | clickables, link and button chips, accent cards |
| lifted off it | the plate's side grows to 10px and the card tips 1.2deg | the one tilted panel |
| floating | the overlay fill, no contact, the two-layer pop shadow | popovers, menus, dialogs, toasts |

A hairline stays on raised and floating surfaces: `--edge` on panels and
controls, `--edge-strong` on the lead panel and overlays. It is the
surface's cut edge, not a border standing in for depth; carved surfaces
have none. On the page color the hairline and the lit edge are what show a
panel's bounds, so every panel and static chip keeps both, a nested panel
included. The one exception is `.panel.is-shell`, which gives up its frame
at 760px and becomes the page.

### Contract properties

Set these on an element or a wrapper to re-key a subtree.

| Property | Default | Does |
| --- | --- | --- |
| `--accent` | mauve | Plates, marks, avatars, the hero value, the progress fill, the caret, and bars and legend swatches with no `--series` |
| `--tone` | `--cn-info` | Tags, banners, icon-button hover, validation. `.cn-tone-*` sets it |
| `--series` | unset, so `--accent` | The color of a `.bar` and its `.legend-item` swatch. Set it to a `--cn-series-*` for a series, or to a status role (`--cn-success`, `--cn-danger`, `--cn-warning`, `--cn-info`) for a status breakdown. A status with no role takes a palette tone |
| `--plate` | crust | The hard offset's color. Undeclared on `:root`; read it as `var(--plate, var(--crust))` |
| `--hard-offset` | 4px | The hard offset's distance |
| `--page-gutter` | `clamp(12px, 3vw, 32px)` | Inline gutter of the page column, the footer and the topbar |
| `--page-pad` | `clamp(24px, 4vw, 48px)` | Block padding of the page column |
| `--page-width` | 1440px | Width of the page column and footer; unset on `:root` |
| `--progress-fill` | the accent ramp | The progress fill; any token color or gradient |
| `--grain` | .22 | Grain strength on solid accent fills; 0 turns it off |
| `--ring-ground` | `var(--base)` | The ring color between stacked avatars |

### Mix tokens

- `--edge`: surface-2 at 55%, 1.6:1 on base and 1.4:1 on an overlay. The raised-surface hairline.
- `--edge-soft`: surface-1 at 38%. Inner separators.
- `--tint`: the tone at `--cn-step-tint`. Declared with the `--tone-*` stops on `.cn-tint`, `.tag`, `.banner`, `.input`, field controls, `.btn.is-icon` and `.cn-edge-tone`, so each reads its own `--tone`.
- `--wash`: `--cn-interactive` at `--cn-step-engaged` (20%) into base, 1.52:1. The engaged state, a step past the 1.24:1 hover so the fill tells them apart as well as the rim.
- `--hover`: surface-1 at 40% over whatever is under it, 1.24:1 on base and 1.15:1 on an overlay. The ghost, menu, pagination and sidebar hover.
- `--engaged-edge`: `--cn-interactive` at `--cn-step-vivid` (70%), 4.7:1 on base and 3.5:1 on its own wash, so the rim clears the 3:1 floor for the state it marks. The rim of every engaged state, so a chosen option outweighs the raised ones beside it. The selected tab wears it too.
- `--edge-strong`: solid surface-2, 2.5:1 on base and 1.9:1 on an overlay, so it outranks `--edge` on every ground. The lead panel, overlay, drawer and blockquote hairline. `prefers-contrast: more` lifts it to overlay-0, 3.4:1, above the solid surface-2 `--edge`.
- `--cn-well-lip`: solid surface-2, 2.5:1 on base, on the bottom and right inner walls of `.well`, `.tabs` and the mono wells, so a carve reads on the page. It stays under the field lip's 4.4:1, so a well never reads as a field.
- `--cn-lit-edge`: a 1px line of surface-2 at 45% inside the top rim, 1.5:1 on base. Part of `--neu-raised`, every recipe plate's `--hard-extra` except the primary's gloss, and `.cn-hard`, so a raised surface reads as lifted where its dark shadow is lost on the page.
- `--control-edge`: overlay-1. The edge of an unchecked control, the off switch paddle and the slider thumb: 4.4:1 on the page and raised surfaces, 3.5:1 on an overlay.
- `--disabled-opacity`: .6. A disabled ghost label stays at 4.2:1. The primary does not dim; it goes flat.
- `--cn-field-ring`: the lit lip of a carved field, `inset -1px -1px 0 var(--overlay-1)`, on the bottom and right inner walls. `prefers-contrast: more` closes it into a full 1px overlay-2 ring and the well lip into a surface-2 ring.

### Data series

`--cn-series-1..6` are mauve, yellow, teal, peach, blue and pink: the six
accents, alternating cool and warm so neighbors never share a hue family.
Series 5 and 6 are blue and pink 70% into base in oklab (4.3:1 and 5.6:1),
a lightness step under the rest, because full-strength blue collapses into
mauve for a protan reader and pink into teal for a deutan one. Under a
full-severity simulation (Machado 2009) every adjacent pair stays above
dE 6 in OKLab, and series 1 and 5 move from 1.2 to 15. A chart takes them
in order. `.is-hatched` on a `.bar` or `.legend-item` adds stripes, a
second key for any series that must stand apart without color. A `.bar`
or `.legend-item` reads `--series`, falling back to `--accent`, so a
record with an identity leaves `--series` unset and keeps its own
accent: the same team is the same color in every chart.
`--cn-ramp-1..5` is a sequential ramp for one measure, mauve mixed into
surface-0 in oklab at 20, 40, 60, 80 and 100%. `--cn-diverge-1..5` runs
red, red half into surface-1, surface-1 at the midpoint, blue half into
surface-1, and blue, in oklab, for a measure with a meaningful zero. Series
and ramp marks keep a word or a value next to them; color is never the only
key.

Mocha's accents sit within 1.8:1 of each other in lightness, so hue does
the separating. Pairs from one hue family never sit side by side, as
neighboring series, adjacent tags or the two ends of a scale: the warm
family red, maroon, peach, pink, flamingo and yellow, and the cool pairs sky and
teal, mauve and lavender, blue and sapphire. A reader with a red-green
deficiency loses the warm family first, which is why every status tone
also carries a word and a shape. Status tags and banners are exempt from
the adjacency rule for that reason: a "Due soon" warning may sit above an
"Overdue" danger, because the word and the glyph tell them apart.

### Fill ramp and grain

Solid accent fills paint `--cn-fill-ramp` instead of a flat color: the
primary button, the checked checkbox, the switch paddle when on, `.mark`
and the progress fill. The ramp lights `--cn-fill` from the top left at
165deg. It starts at lightness +.035, passes the fill at 50% and ends at
lightness -.045 with chroma +.015. `--cn-fill` is the accent, or mauve on
the primary, checkbox and switch, and pink on primary hover. It is a
registered `<color>`, so the hover transitions. Without relative color
support the flat `--cn-fill` stays.

Every ramp but the switch paddle's carries grain in a `::before` under its
content. `--cn-grain-image` is a 160-unit greyscale `feTurbulence` tile
(fractal noise at .75, four octaves), blended with `overlay` at `--grain`.
A radial mask holds full strength for 14% from the bottom right and fades
to nothing by 115%, so the lit corner stays clean. Resolution queries set
`--cn-grain-tile` (160px at 1x, 80px at 2x) so the tile draws one device
pixel per unit. Forced colors hide the grain.

### Density

Control heights are rem, so a larger browser font size grows a control
with its label.

`data-density="cozy"` or `data-density="compact"` on any ancestor switches every knob. Cozy is for desktop data tools; compact is the dense strip. A coarse pointer keeps 46px and 44px controls at every density.

| Knob | Default | Cozy | Compact |
| --- | --- | --- | --- |
| `--control-h` | 46px (2.875rem) | 38px | 28px |
| `--control-h-sm` | 34px (2.125rem) | 28px | 26px, never under 24px |
| `--hard-offset` | 4px | 3px | 2px |
| `--cn-radius-panel` | 16px | 16px | 12px |
| `--band-h` | 64px | 52px | 44px |
| `--band-pad` | 12px 24px | 8px 24px | 8px 16px |
| `--band-title-size` | 20px | 14px | 14px |
| `--lead-title-size` | 28px | 28px | 20px |
| `--body-pad` | 24px | 16px 24px | 12px 16px |
| `--cell-pad` | 12px 16px | 8px 12px | 4px 8px |
| `--cell-font-size` | 14px | 14px | 13px |
| `--chip-pad` | 8px 12px | 4px 12px | 4px 8px |
| `--well-pad` | 12px 16px | 12px 16px | 8px 12px |
| `--empty-h` | 260px | 180px | 120px |

Fixed sizes that ignore density: checkbox and radio 20px, switch 50x28,
avatar 32px (44px large), mark 28px, the command's copy control 34px. Wrap
a checkbox, radio or switch in `.choice` so the label row is the target.

Under `pointer: coarse`, `--control-h` is 46px and `--control-h-sm` 44px
at every density, the touch target Apple and WCAG 2.5.5 ask for.

### Motion

- `--ease-out: cubic-bezier(.16, 1, .3, 1)` for anything that answers the pointer or arrives.
- `--ease-in: cubic-bezier(.7, 0, .84, 0)` for anything that leaves.
- `--ease-spring` for anything that returns. Where `linear()` works it is a damped spring that settles with one 8% overshoot; elsewhere `cubic-bezier(.3, 1.4, .4, 1)`.
- `--t-press` .08s, `--t-exit` .14s, `--t-fast` .16s, `--t-base` .22s, `--t-slow` .32s.

Route changes: a consumer that opts in with `@view-transition { navigation: auto; }` gets a root cross-fade over `--t-base` on the ease-out, cut under reduced motion. `.cn-morph` on the lead panel and on the page's one primary names them `cn-lead` and `cn-primary`, so they morph between routes instead of cross-fading, at the same `--t-base` on the ease-out, also cut under reduced motion. It is opt-in per element: two elements with one name abort the whole transition, so put it on one primary per page.

A press goes down on the ease-out in `--t-press` and comes back on the
spring in `--t-fast`. Entrances take the ease-out. Exits take the ease-in in
`--t-exit`. Keyframe loops keep literal durations.

### Data changes

Data moves less than chrome. A reader is comparing numbers, and travel
pulls the eye off them.

- Progress eases to its new width over twice `--t-slow` on the ease-out, so a bar decelerates into the value.
- A changed number swaps in place. Values are tabular, so the width holds. Never count up or tween a figure.
- Content that replaces a skeleton, and a row that a live list inserts, take `.cn-arrive`: a fade and a 2px settle over `--t-fast`. The whole set arrives at once.
- A removed row leaves at once. A dismissed toast or a closed overlay is the only exit that animates.
- A reorder the reader asked for (a sort, a filter, a page) cuts. A reorder that arrives from elsewhere may use a view transition with a `view-transition-name` per row, at `--t-base` on the ease-out.
- A layout change works the same way. A panel that grows because the reader opened something follows them; the accordion's height transition is the model. A layout that shifts on its own (a column appears, a banner lands above content) runs a view transition with names on the moving regions, at `--t-base`, so nothing jumps under the pointer. Never animate width or height on a box that holds text.
- `.page-enter` is the one stagger, for a view's first render: five steps 40ms apart, then everything from the sixth child on together, so no reveal runs past .2s plus `--t-slow`.
- Under reduced motion all of these land at once.

### Hard offset and the half-slide

A clickable control may rest on a plate. `.btn-primary`, `.btn-secondary`,
`.segmented > *` and a link-wrapped `.accent-card` share one rule:

- rest: `var(--hard-offset) var(--hard-offset) 0` in the plate color
- hover: `translate(-1px, -1px)`
- held: translate by half the offset, and the plate shrinks to the same half
- timing: down in `--t-press` on the ease-out, back in `--t-fast` on the spring

`--hard-extra` holds shadow layers drawn over the plate, such as the primary
gloss. `.cn-hard` with `.cn-pressable-slide` draws the same press. Primary
buttons never soften the offset.

The light is physical, not logical. Every shadow, plate, lip and ramp
answers one light at the top left, so plates fall down and to the right in
right-to-left pages too. Layout mirrors; the light does not.

### Composition

A view is built from three gaps and one grid, so pages line up with each
other.

- The page column is `.page-main` at `--page-width`, with `--page-gutter` inline and `--page-pad` above and below.
- Regions of a view (a header, a stat band, a row of panels, a table) are `--space-7` (48px) apart. Panels inside a region are `--cn-grid-gap`, `--space-5` (24px), apart. Content inside a panel is `--body-pad`: use `.panel-body`, not fixed padding utilities, so it follows density.
- A region holds at most three raised panels. More items go in one panel, a ruled grid on the ground, or a table, so raised stays a rank and not a texture.
- Lay a region's panels on `.cn-grid-12`: a 7 and 5, an 8 and 4, or three 4s. Equal-column sets may use `.cn-grid-2/3/4`. Pair panels of similar height in a row, or stack a second short panel in the shorter column with `.cn-stack`, rather than stretching a panel into an empty tail. Every grid reads `--cn-grid-gap`; a grid of small items, not panels, composes `.cn-gap-16`.
- A view reads in this order: the title and its one primary, the figures, the lead panel, then the rest. The tilted aside never comes before the data it comments on. Two kinds of view move the primary: a form puts it in the footer after the fields it submits, and a first-run screen puts it in the lead panel next to the setup it starts.

### Icons

The package ships no icon set and sizes every icon its recipes hold. Use
one stroke family throughout: round caps and joins, a stroke equal to 2
to 2.2 on a 24-unit grid (1.6 on an 18-unit one), `currentColor`, no
fills. Lucide matches it and is the default
recommendation. Recipes set 12px (tag), 13px (text button), 14px (chip,
small button), 16px (button, banner, menu row) and 18 to 20px (large
button, large icon button). An icon beside a word is `aria-hidden`; an
icon alone needs an accessible name on its control.

### Global rules

- `[hidden]` is `display: none !important`. The popover and toast are exempt so they can animate out, and so is `hidden="until-found"`. A consumer element that animates out through `[hidden]` opts out with `data-cn-animate-hidden`.
- Focus: a 2px `--cn-focus` (text) outline that eases from 0 to 3px offset over `--t-fast`. It is the one bright neutral no other state uses, so focus differs from the mauve engaged rim by hue and by shape: focus is a neutral 2px standing 3px off the edge, the rim 1px of mauve on it. No recipe draws focus any other way. `::selection` is crust on mauve.
- Links are mauve, pink on hover, with the chip radius so the focus ring follows them. Mauve on body text is 1.1:1, so a link carries a 1px underline in its color at 40%, `.22em` below the baseline, that goes solid on hover. Links inside `nav` drop it. Recipes that restyle an anchor (`.btn`, `.wordmark`, a link around an accent card) drop it too.
- `body` is the body role in `--cn-fg-body`. Headings are `--cn-fg`, and bare ones take a role at zero specificity: `h1` the small display, `h2` the heading, `h3` the title, `h4` the name. A header band's `h2` or `h3` is the title role at `--band-title-size`. Lists indent 20px with 8px between items and overlay-1 markers. Every recipe sets its own font, so chrome never inherits the body voice.
- A bare `em` is plain emphasis. Inside `.cn-display`, `.display-title` and `.wordmark` it is mauve and upright.
- `.scroll-well` sets the dark scrollbar color.
- Six keyframes: `enter`, `spin`, `pulse`, `blink`, `breathe`, `cast`.
- `.page-enter` is opt-in. It animates its children 40ms apart on the ease-out over `--t-slow`. The sixth child and later share a .2s delay. Fill is `backwards`, so no child stays a containing block for fixed overlays. Put it on a view's first render, not on every route change in an app.
- Reduced motion removes movement, not feedback. Animations and transitions run in .01ms with no delay, so presses, slides and page-enter land at once. View-transition pseudo-elements are cut by name, since the universal selector does not reach them. Popovers, toasts, dialogs, drawers and tooltips still fade over `--t-fast`, in place, with their travel and scale dropped. `.spinner` and a busy button keep a 2.4s spin. `.skeleton` holds still at .75 opacity, the midpoint of its breath.
- More contrast (`prefers-contrast: more`): each text role moves one stop lighter, `--edge` is solid surface-2, `--edge-strong` overlay-0, `--edge-soft` solid surface-1, `--control-edge` and `--cn-fg-disabled` overlay-2, carved fields take `--cn-field-ring`, `--neu-dark` deepens to .88, `--neu-shade` to .86, `--neu-contact` to .8 and `--neu-near` to .9, link underlines go solid, disabled opacity is .7, the grain goes, and the tilted panel stands upright on its plate, since rotated text renders soft.
- Reduced transparency: the topbar and folded sidebar go opaque, and the scrim stops blurring and darkens to crust at 88%.
- `p` and `li` wrap with `text-wrap: pretty`.
- Touch (`hover: none`): hover lifts on plated controls and `.cn-pressable` do not run, so a tapped control does not stay lifted. The press still runs.
- Forced colors: focus draws a `Highlight` outline. The checkbox, radio and switch draw a `CanvasText` edge, and so do carved fields, wells, the mono wells, tabs, stepper pills and the progress track. Checked and indeterminate states fill with `Highlight`. Engaged states (segmented, toggled ghost, the current page and sidebar link, `.cn-engaged`) and the selected tab draw a `Highlight` rim.

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

Each role reads its four tokens. Pick the role, not the face; there is no
font-family utility.

| Class | Role | Color |
| --- | --- | --- |
| `.cn-microlabel` | micro, uppercase | subtext-0 |
| `.cn-label` | label | subtext-0 |
| `.cn-meta` | meta, tabular | subtext-0 |
| `.cn-ui` | ui | inherited |
| `.cn-name` | name | text |
| `.cn-copy` | body | subtext-1 |
| `.cn-lede` | lede, max-width `--cn-measure` (68ch) | subtext-1 |
| `.cn-title` | title | inherited |
| `.cn-value` | value, tabular | inherited |
| `.cn-value-lg` | value-lg, tabular | accent, an exception to text-colored text; text inside an `.accent-card` |
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
- Backgrounds: `.cn-bg-base`, `-mantle`, `-crust`, `.cn-bg-well` (`--cn-surface-sunken`), `.cn-bg-head` (`--cn-surface-band`), `.cn-bg-raised`, `.cn-bg-overlay`, `.cn-bg-recessed`, `.cn-bg-hover`, `.cn-tint`, `.cn-tint-accent` (accent at `--cn-step-wash` into mantle, fading to mantle at 48%).
- `.cn-tone-{danger, warning, success, info}` set `--tone` from the status roles. The status setters also bring `--cn-glyph` and swap in their status ladder (`--tint`, `--tone-wash`, `--tone-edge`, `--tone-border` from `--cn-<role>-tint/-wash/-edge/-border`). `.cn-tone-{red, green, peach, yellow, blue, mauve}` set `--tone` from the palette and nothing else. A tone never carries meaning alone, because red, peach and pink sit close in lightness: the word in the tag or banner does, and every status tone also has a shape.
- Type: `.cn-heading` is the heading role, for a section title between the panel title and the display.

### Borders and radii

- `.cn-edge` (`--edge`), `.cn-edge-soft`, `.cn-edge-line` (surface-0), `.cn-edge-mauve` (mauve at `--cn-step-plate`), `.cn-edge-tone` (`--tone-border`), `.cn-edge-accent` (the accent at `--cn-step-plate` into surface-0), and `.cn-edge-dashed`. Dashed means an open slot (`.cn-edge-dashed`, the dashed ghost) and nothing else: disabled controls drop to the soft `--edge` instead.
- `.cn-r-panel`, `-card`, `-control`, `-mark` (control radius), `-chip`, `-pill` (999px), `-round` (50%).

### Structure

- `.cn-spine`: a 4px `--cn-interactive` bar on the left, inset 12px top and bottom. It marks position (the current row, the selected item), not identity, so it never takes the item's `--accent`.
- `.cn-sr-only` clips an element for screen readers. `.cn-hidden` is `display: none !important`.

### Layout

- `.cn-row` (flex, centered, gap 8), `.cn-stack` (grid, gap 12), `.cn-cluster` (wrapping flex, gap 8).
- Modifiers only add: `.cn-between`, `.cn-center`, `.cn-end`, `.cn-top`, `.cn-baseline`, `.cn-wrap`.
- Children: `.cn-grow` (flex 1, `min-width: 0`), `.cn-fixed`, `.cn-min-0`, `.cn-auto-l`, `.cn-mx-auto`, `.cn-w-full`, `.cn-fit`, `.cn-block`.
- `.cn-split`: two groups at opposite ends (gap 12 by 16) that wrap onto two lines when they no longer fit; the first takes the slack. A page or panel header with actions.
- `.cn-measure`: a centered column at `--cn-measure`.
- `.cn-with-side`: a side of `--side-w` (16rem) beside fluid content. They stack when the content would drop under 60% of the row, with no breakpoint, so it works inside any container.
- `.cn-grid-12`: the page grid, twelve columns `--cn-grid-gap` (24px) apart. Children span with `.cn-span-3/4/5/6/7/8/9/12` and keep their content height (`align-items: start`), for the same reason the tilted panel does: a stretched panel shows an empty tail. At 1060px and below, or in a `.cn-container` that narrow, every split becomes halves: a 7 and 5 or an 8 and 4 go to 6 and 6, four 3s go two by two, and a 9 takes the row. Two lone halves take the row: the odd last child of a grid whose children are all 3, 4, 5, 7 or 8 spans, so three 4s fold to two and one, and a 3 right after a 9. Other mixes, such as a 6 or 12 among splits, can leave a half beside an empty half, so give each row its own `.cn-grid-12`. At 760px every span takes the row. In an `.app-shell.has-sidebar`, put `.cn-container` on the page column, so the step answers the column's width rather than the viewport's.
- `.cn-grid-2/3/4`: equal columns, gap `--cn-grid-gap` (24px). Compose `.cn-gap-16` for a grid of small items. Three and four become two at 760px; all become one at 520px. Inside a `.cn-container` (`container-type: inline-size`) the same folds answer the container's width, so a grid in a sidebar folds on its own.
- `.cn-gap-*`, `.cn-p-*`, `.cn-mt-*`, `.cn-mb-*` on 4, 8, 12, 16, 24, 32, plus 0 on padding and margins. `.cn-gap-*`, `.cn-mt-*`, `.cn-mb-*` and `.cn-py-*` also take 48 and 64 for section rhythm. `.cn-px-*` and `.cn-py-*` from 8 up, plus 0. `.cn-m-0`, and `.cn-mx-auto` for centering. Horizontal margins otherwise come from gaps, never from a margin on a child.
- `.cn-divide`: a surface-0 hairline between children.
- `.cn-list-none`, `.cn-scroll-x`, `.cn-sticky-top` (top 0, z-index 2).
- `.cn-icon-sm/.cn-icon/.cn-icon-lg`: 13, 16 and 20px svg. Recipes size their own icons.

## Recipes

`css/recipes.css`, layer `cn.recipes`. Recipes read tokens and contract
properties only and never style bare elements.

### Surfaces

- `.panel`: the main container. `--edge` border, panel radius, the raised fill (the page color), `--neu-raised`, no padding.
- `.panel.is-tilted`: rotated 1.2deg, a 10px hard offset over `--neu-raised`, `align-self: start` so a grid row never stretches it into an empty tail. Flat at 1060px and below.
- `.panel-header`, `.panel-footer`: bands `--band-h` tall with `--band-pad`. Both sit on the panel's fill. The header has a bottom divider and the footer a top one. A band holding `.band-actions` wraps; the cluster is right-aligned and wraps inside itself. Other bands stay on one line. An `h2` in a header takes `--band-title-size`; in the lead panel it takes `--lead-title-size` at the heading weight and tracking. At 520px both step down to the body size.
- `.panel-body`: the content band, `--body-pad`.
- `.panel.is-lead`: the panel a view is about, at most one per view. The page color inside the bright `--edge-strong` hairline, on `--neu-lifted` with its bright overlay-0 rim, and a band title at `--lead-title-size` (the heading size, 28px) at 700, so it outranks its neighbors by height and by its title, not by an ornament. The edges and the title carry the rank because a longer cast barely shows on a dark page.
- `.panel.is-shell`: drops its chrome at 760px so a phone page runs edge to edge.
- Band corner rule: a filled first or last child of a rounded surface takes the parent radius minus 1px on its outer corners. This covers popover children, and tables or ranked rows at a panel's edge, through `.table-scroll` too. Never fix corner bleed with `overflow: hidden`; it clips popovers and plates.
- `.well`: card radius, the sunken fill, `--neu-inset` and the well lip. The fill puts it below the ground; without it the carve read as an outlined panel at 1x. `.well.scroll-well` fades its bottom 34px with a mask.
- `.terminal`, `.codeblock`, `.command`: the mono wells. Card radius, the sunken fill, `--neu-inset`, the code role in `--cn-fg-soft`, no border, no ligatures.
- `.empty-state`: a centered column at least `--empty-h` tall, subtext-0 (`--cn-fg-muted`). An `svg` first child sits on a 56px carved round. `.is-fill` fills its pane instead.

### Buttons

Compose `btn` with a variant. `<a class="btn">` works. Heights come from
the density knobs.

- `.btn`: `--control-h`, 16px inline padding, control radius, the ui role (14px at 600). Svg 16px.
- `.is-sm`: `--control-h-sm`, 13px type, svg 14px. `.is-lg`: `--control-h` plus 12px, the body size (16px), svg 18px. One `.is-lg` per page.
- `.btn-primary`: the mauve ramp under grain, `--cn-fg-on-accent` (crust) text, a transparent border and a plate of mauve 25% into surface-0. The gloss is a white rim at .3 on top and crust at 22% along the bottom 2px. Hover moves the ramp to pink.
- `.btn-secondary`: raised fill, `--edge` border, crust plate. Hover warms the border toward mauve (4.1:1 on the page, 3.2:1 against the overlay fill it lifts to) and lifts the fill to the overlay step.
- `.btn-ghost`: transparent until hovered, then `--hover` and an `--edge` hairline. Held, it sinks onto `--neu-inset-soft`. With `aria-pressed="true"`, `aria-current` or `aria-expanded="true"` (a toggle whose menu is open) it wears the engaged state, and keeps it under the pointer.
- `.btn-ghost.is-dashed`: a dashed surface-1 border, card radius, a faint fill. Hover goes mauve. It marks an open slot such as a drop zone.
- `.btn-ghost.is-danger`: red text, a red wash at `--cn-step-wash` on hover.
- `.btn.is-icon`: a `--control-h-sm` square, its glyph in subtext-0 (`--cn-fg-muted`, 7.4:1), because the icon is the control's only visible label. Hover tints toward `--tone`, info blue unless a `.cn-tone-*` on it or an ancestor sets one. `.is-icon.is-lg` is a `--control-h` square with a 20px svg.
- `.btn-text`: inline mauve text at 13px 600, pink on hover. Held, it moves 1px. Svg 13px.
- Disabled: `--disabled-opacity`, the variant's rest shadow, `not-allowed`. The primary instead goes flat and sinks: no plate, ramp, grain or gloss, the sunken fill pressed in by `--neu-inset-soft` inside a plain `--edge`, `--cn-fg-disabled` text, at full opacity, so it never reads as a second primary or outshines a live secondary. A busy primary keeps its fill. `aria-disabled="true"` looks the same, skips hover and press, and stays focusable, so a `[data-tip]` on it can say why the action is unavailable. The consumer ignores its clicks.
- Busy: `aria-busy="true"` clears the label so the width holds, hides any svg, and turns a 16px spinner (14px on `.is-sm`) in the label's place: `--cn-fg` ink on a surface-2 ring, crust on the primary. The spinner reads `--btn-busy-ink` and `--btn-busy-ring`, so a variant can re-key it. Clicks stop and focus stays. Use it with `aria-disabled`, not `disabled`, which would drop focus mid-action.

### Inputs

- `.field label`: the label role in subtext-0 (`--cn-fg-muted`), 8px above the control.
- `.input` and `.field input/select/textarea`: a carved well. No border, transparent, `--neu-inset` plus `--cn-field-ring`, `--control-h` tall, 16px inline padding, card radius, 14px at 500, tabular.
- Placeholder `--cn-fg-placeholder` (overlay-2): 5.8:1 on the page and on a panel, 4.6:1 on an overlay.
- Focus: the global ring, on pointer focus as well as keyboard focus, since typing follows either way. Under the pointer, select options and menu rows light with `--hover` and no outline. A checked option wears `--wash`, so it outranks the hovered one. Under the keyboard they also draw the ring, inset 2px.
- Textarea: at least twice `--control-h`, vertical resize.
- Select: a chevron data URI in the overlay-1 hex, 12px from the right. Where `appearance: base-select` works, the picker is a floating card; the checked option is mauve on `--wash`.
- `.input-lg`: `--control-h` plus 12px (58px), the lede size (18px), on a bare `.input` or inside a `.field`. One per page.
- `.input-icon`: an 18px leading icon at 16px; the input pads to 44px.
- `.field small`: help text in the meta role, subtext-0 (`--cn-fg-muted`).
- Validation: `aria-invalid="true"` on the control sets `--tone` to red; `.is-warning` sets `--cn-warning` (yellow). The well takes `--tint`, its lip closes into a 1px ring in the tone, and the help text moves up to `--cn-fg-body` and leads with the 12px glyph in the tone (`--cn-glyph-danger` or `-warning`). The label keeps `--cn-fg-muted`; only the glyph, the ring and the tint carry the tone. The carve and focus ring stay.
- Validation also needs `aria-describedby` from the control to its `small`, so the message is read with the field.
- Disabled: `--cn-fg-disabled` text and placeholder (4.4:1), no opacity, `--neu-inset-soft`. The field's label takes the disabled color too.
- Read-only (`readonly`): the value in `--cn-fg-soft` with no carve, lip or fill, square corners and an `--edge` rule underneath, so it reads as printed text and only editable fields look cut in. Focus still rings it, at the control radius.

### Tooltip

`[data-tip]` draws a bubble from the attribute: max 240px, control radius,
`--edge-strong` (surface-2) border, `--shadow-pop`, the meta role. It shows on hover, on
keyboard focus, and while a control inside it has keyboard focus, after
.4s, and rises 2px. On leave it lingers for `--t-slow` before fading, so the pointer can cross onto the bubble, which keeps it open (WCAG 1.4.13, hoverable); Escape hides it at once. Never use `title=`.

The bubble's text is generated content with empty alt text
(`content: attr(data-tip) / ""`), so it never joins the element's
accessible name. Carry the same words in `aria-describedby` or, on an icon
button, `aria-label`.

A tip is supplemental. Touch screens never hover, so a fact that matters
also lives in the page. Escape dismisses a showing tip (WCAG 1.4.13) with
this listener, which sets `data-tip-dismissed` and clears it when the
pointer or focus leaves:

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

- `.segmented`: equal columns, gap 8. Options are `--control-h` plus 12px, control radius, raised fill, and rest on the crust plate with the shared press. The chosen option (`.active`, `aria-pressed="true"` or `aria-checked="true"`) is the engaged state with a mauve `b` label. `.is-stacked` makes rows `--control-h` plus 24px with lede-size (18px) labels.
- `.stepper`: inset pills (999px, well fill, `--neu-inset-soft`, label role, subtext-0 (`--cn-fg-muted`) text). `.active` or `aria-current="step"` is mauve on a mauve wash at `--cn-step-wash`. `.is-done` is green.

### Marks, chips, tags, banners

- `.mark`: a 28px square in the accent ramp under grain, a `--cn-fg-on-accent` (crust) glyph, a border of the glyph color at `--cn-step-fill`, control radius, `--shadow-mark`, 13px at 600.
- `.chip`: an outlined pill, `--chip-pad`, raised fill, `--neu-raised-soft` with the lit edge, label role in subtext-0 (`--cn-fg-muted`), svg 14px. A static chip rests on the page. A chip that is an `a` or `button` is a clickable, so it stands on a plate: the hard offset in `--plate` under the lit edge, with the shared hover lift and half-slide press. On hover it also turns `--cn-fg` with a `--control-edge` border. `.chip.is-glyph` is icon-only; keep an accessible name.
- `.tag`: a status tag in `--tone`. 4px padding, chip radius, a tone hairline at `--cn-step-edge`, `--tint`, label role, a 12px svg.
- `.banner`: a tinted band. 12px 16px padding, card radius, `--tint`, a `--tone-border` edge, `--neu-inset-soft`, meta size. The message is `--cn-fg-body`, so the text stays text-colored; the 16px glyph, the edge and the tint carry the tone.
- Every tag and banner holds a word that states the status ("Past due", not a colored dot).
- A `.cn-tone-danger`, `-warning`, `-success` or `-info` tag or banner with no svg child draws its glyph first: `--cn-glyph-danger` (a crossed circle), `-warning` (a triangle with a bang), `-success` (a checked circle) or `-info` (a circle with an i), masked in the tone at 12px (16px on a banner). Bring an svg to use another shape. Palette tones draw none and may bring one. In forced colors the glyph paints `CanvasText`.

### Selection controls

- `.choice`: a label row, `<label class="choice"><input>Text</label>`, gap 8, 14px. When its input is disabled the label text takes `--cn-fg-disabled`; the control dims itself.
- `.checkbox`: 20px, chip radius, `--control-edge` border, `--neu-inset-soft`. Hover edge `--engaged-edge`. Checked is the mauve ramp under grain, a transparent border and a crust tick that lands on the spring from `scale(.4) rotate(-8deg)`. `:indeterminate` takes the same fill with a crust dash; set it from script and use it for a parent whose children are partly checked.
- `.radio`: the same well, round. Checked deepens to `--neu-inset` with a 9px mauve dot and a 3px halo.
- `.switch`: 50x28, control radius, `--neu-inset` with a 1px `--control-edge` ring. The 21x22 paddle tilts 16deg at rest, with a 1px `--control-edge` edge, 4.4:1 against the plate around it, so off reads apart from disabled. Checked, it slides 23px on the spring, tilts the other way, takes the mauve ramp with a 2x8 crust bar at its center, the "I" of a wall switch, so on reads by a mark as well as color and position, and glows at 6px. Held, it flattens; held while on, the glow blooms to 12px. Disabled, the paddle lies flat with no tilt and no raise, and paddle and plate drop to the soft `--edge`, so it never reads as an off switch. Disabled checkboxes and radios take `--edge` too. Every disabled checkbox, radio and switch dims to `--disabled-opacity` itself.
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

- `details` is a disclosure to assistive tech and takes Enter and Space with no script. A shared `name` makes an exclusive group whose open item can still close.
- Closed rows are flat with a divider. Open (`[open]`, a checked input in the label form, `.is-open` or `data-open`) is its own step, the open carve: card radius, full inset, mauve at `--cn-step-tint` into base (1.08:1) and a mauve title. It is not the engaged state: `--wash` behind the fold would drop body text to 6.1:1, under the 7:1 floor.
- Wrap the title in `<b>` (bold) or `<p>` (regular) so a trailing `.cn-meta` sits by the chevron. At 520px the meta wraps under the title.
- The fold's inner wrapper is one element with `min-height: 0`. `::details-content` keeps rendering until the close ends, so the fold animates both ways. Where `::details-content` is missing, the close is instant.
- `.accordion-stack` pads a group inside a panel and drops the last closed divider.

The label form is older and still renders: `div.accordion`, a `label`
holding a hidden checkbox or radio, and the same fold. Closed content is
`visibility: hidden`, so it leaves the tab order. It needs listeners that
`details` does not. Radios sharing a name make an exclusive group, and a
radio cannot uncheck itself, so a group that must close fully needs this:

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

Space toggles natively. Enter needs one consumer listener that clicks the
focused input.

### Avatar and spinner

- `.avatar`: 32px round, accent at `--cn-step-fill` into mantle, an accent edge at `--cn-step-edge`, `--neu-raised-soft`, 13px at 600. `.is-lg` is 44px.
- `.avatar-stack`: overlaps by 8px and rings each avatar with `--ring-ground`.
- `.spinner`: a 16px ring with an accent top edge on `spin` at .8s.
- `.skeleton`: a carved placeholder for loading content. Control radius, the band fill (one step under whatever holds it, 1.05:1 under base), `--neu-inset-soft`, at least 16px tall, breathing to .5 opacity on `breathe` over 1.6s. `.is-text` is a 1em line with the chip radius; lines stack 8px apart and the last of several is 62% wide. `.is-round` is a 32px circle for an avatar. Give the loading region `aria-busy="true"` and the skeletons `aria-hidden="true"`.

### Code

- `.terminal`: a flex column. `pre` pads with `--well-pad` and wraps. `.caret` is a 6x14 accent block on `blink`.
- `.codeblock`: pads with `--well-pad` and scrolls sideways. A direct `.btn.is-icon` child is a 26px copy control pinned 8px from the top right. `.is-numbered` draws a 3ch line gutter in `--cn-fg-placeholder` with CSS counters; wrap each line in its own element. `.tok-keyword` blue, `.tok-string` green, `.tok-number` peach, `.tok-fn` mauve, `.tok-comment` in `--cn-fg-muted` italic.
- A `.codeblock` copy button with `.is-copied` turns green, like the command's.
- `.command`: one command line, up to 480px wide and 50px tall. `.command-text` holds the line and scrolls sideways; `.command-prompt` inside it is mauve. `.command-copy` is a 34px icon button that turns green while the consumer holds `.is-copied`. It holds two glyphs: `.copy-glyph` shows at rest and `.done-glyph` while copied. `.is-full` fills the row and `.is-wrap` wraps a long statement.

### Accent card

`.accent-card` sits on a plate of its `--accent` mixed 70% (`--cn-step-vivid`) into surface-0, so six accents stay apart.
Card radius, 12px 16px padding, `--edge` border, raised fill. The plate is its
only depth cue. Text inside is text-colored, the hero value included. The accent shows
on the plate, on data marks such as a progress fill, and on avatars and
`.mark` squares, which keep it inside the card. Controls
inside rest on their own plate. Wrapped in a link, it takes the shared
press, and on hover the plate grows 1px.

### Data display

- `.stat`: a label `span` over a value `strong` in the value role. `.is-lg` uses value-lg in the accent. `.is-inline` is a baseline row, label left and value (`b` or `strong`) right; stack rows in `.cn-divide`. `.is-inline.is-total` is the row the others add up to, placed after the `.cn-divide` list rather than inside it: the label in the name role and the value in the value role, both `--cn-fg`, under an `--edge` rule (1.6:1 against the 1.3:1 row hairlines) with 12px above and below the rule, so the total outweighs the rows over it. It stays text-colored; only the hero value takes the accent.
- `.stat-grid.is-ruled`: for stats on the page ground. Each stat hangs from a 2px `--edge-soft` rule on its start side, 16px in, so the row reads as one band without a panel.
- `.stat-grid`: a grid of stats, `--stat-cols` across (4 by default) and two across at 760px and below. It never drops to one column.
- `.progress-track`: 7px, 999px, crust, `--neu-inset-soft`. The `span` fill is the accent ramp under grain; `--progress-fill` replaces the ramp. It eases its width over twice `--t-slow`. `.is-lg` is 12px.
- `.data-table`: the class scopes all table styling. Header cells: `--cell-pad`, head fill, label role, subtext-0 (`--cn-fg-muted`). Body cells: `--cell-pad`, 500 at `--cell-font-size`, subtext-1, tabular. `.cell-name` holds a 600 name over a meta line. `.is-num` on a `th` and its `td`s right-aligns a numeric column; a sortable header keeps its label flush right and moves the chevron to its left.
- Row hover presses the row: mauve at `--cn-step-row` (8%) into base, 1.17:1 on the page with `--cn-fg-soft` at 8.0:1, past the open carve's 1.08:1 and 1.30:1 under a selected row's wash, plus a vertical gradient on each cell, dark at the top 5px and lit at the bottom 4px. The edge colors are registered with `@property` so they fade in. `tr[aria-selected="true"]` takes `--wash` and a deeper press.
- `th[aria-sort] > button`: a reset button with a chevron. The chevron hides while unsorted and flips for ascending.
- `.data-table.is-sticky-head`: header cells stick to the nearest scroll container, with the rule drawn as an inset shadow. Give the `.table-scroll` wrapper a `max-height` so it scrolls vertically and the header can pin.
- `.table-scroll`: scrolls a wide table sideways inside its wrapper. A table in it with no `td[data-label]` stays a table on phones.
- `td.cell-select`: a row-select checkbox cell. In phone mode it floats to the row's end.
- `td.is-trail`: a trailing cell for phone mode, such as the amount or the status. It leaves the label stack and rides beside the name: the last trailing cell sits on the title line, the one before it under it, and a `td.cell-select` at the far end of the title line. It keeps its `data-label` for the desktop header. On a desktop table it changes nothing.
- `.ranked-row`: a rank mark, a 600 name and a trailing value, with the same press.
- `.bar-chart`: a label column and bar groups. `.bar-group` stacks `.bar` rows 4px apart; each `.bar` draws an 8px chip-radius bar at `--value` of 80% of the track in its `--series` (or `--accent`), with its value as text beside it in the meta role. Labels are meta in `--cn-fg-muted`. Bars ease to a new value over twice `--t-slow`.
- `.sparkline`: one measure over time. An inline row of a 96x24 `svg` (`aria-hidden`) and its value as text in the meta role in `--cn-fg-soft`, tabular, 8px apart. A `polyline` or `path` in it draws a 2px non-scaling stroke in its `--series` (or `--accent`) with round caps and joins; an optional `circle` marks the latest point in the same color. Each line scales to its own range, so it shows a shape, not a comparison between rows.
- `.legend` and `.legend-item`: a wrapping key. Each item draws a 10px swatch in its `--series` (or `--accent`), with a sentence-case label in the meta role.
- `.kv`: a `dl` grid, keys in a column that fits them, values in text. Stacks at 520px.

### Overlays

All overlays float on `--shadow-pop`, never on neu depth, and fill with `--cn-surface-overlay`.

- `.popover`: absolute, `min(390px, 100vw - 32px)`, card radius, `--edge-strong` (surface-2) border. Header and footer pad 12px 16px; the footer is divider-only.
- `dialog.modal`: centered, `min(520px, 100vw - 32px)`, panel radius, `--edge-strong` (surface-2) border. `.is-wide` is 760px. Its header is a band on the dialog's fill.
- `dialog.drawer`: pinned right, `min(420px, 100vw - 40px)`, full height, a left hairline, square corners.
- `showModal()` and `close()` are the whole dialog API. `::backdrop` is the scrim: crust at 80% with a 2px blur.
- `.toast-stack`: fixed 24px from the right and bottom, up to 380px wide. Toasts append at the bottom. At rest only the newest visible toast is in flow; the next two sit behind it at -12px and .96 and at -22px and .92, and older ones hide. Hover or focus fans the pile into a column. Depth counts visible toasts only, so dismissing a middle toast re-steps the pile on translate and scale. In the fanned column the leaving toast collapses its height and margin as it fades, so the toasts above it ride down instead of jumping.
- `.toast`: a row with a content column (`b` title over a `span` or `p`) and trailing controls. Card radius, `--edge-strong` (surface-2) border, overlay fill, meta role. `toast()` in `catppuccin-neu/js` appends one and times it out; the showcase has a Preact version.
- Give `.toast-stack` `role="region"`, `aria-live="polite"` and an `aria-label` such as "Notifications", so a new toast is announced. An error that needs action belongs in a dialog or a banner, not a toast that times out.

Overlay motion:

- Popover fades and drops 4px over `--t-fast`. Toast fades and slides 16px from the right over `--t-base`.
- Modal fades, rises 8px and scales from .98 over `--t-base`. Drawer slides in over `--t-slow`. The backdrop fades with them.
- Every exit takes the ease-in over `--t-exit`.
- Popovers and toasts enter with `@starting-style` and exit through `[hidden]`, which keeps `display` and drops `visibility`. Dialogs use discrete `display` and `overlay` transitions. Where a browser lacks them, a dialog appears in place.

### Page

- `.page-main`: the page column, `min(var(--page-width, 1440px), 100% - 2 * var(--page-gutter))`, centered, `--page-pad` above and below. `.is-narrow` is 860px. `.is-reading` is 740px and sets the lede at 20px.
- `.topbar`: sticky, `--band-h` plus 4px, `--page-gutter` inline, base at 91% with a 14px blur, a hairline and `--shadow-cast`. A three-column grid. Where `animation-timeline: scroll()` works, the cast fades in over the first 60px of scroll. `.topbar nav` is a row of ghost buttons. `.is-split` is two regions, brand left and actions right. `.is-compact` is a 52px app strip, `--band-h` (44px) at compact density.
- `.wordmark`: the name in the lede size (18px) at the display weight (700) with display tracking, because it is the brand, not a heading; `em` is the mauve half. A `.mark` before it is the brand tile (28px). `.is-lg` is 20px with a 34px tile. `.is-sm` is the footer brand at 14px: a 16px mauve glyph, the name, a mauve `b` suffix set .25em off the name, and an optional subtext-0 (`--cn-fg-muted`) note in a `span`.
- `.page-footer`: same width as the column, at least 72px, a surface-0 top rule, subtext-0 (`--cn-fg-muted`) text.
- `.display-title`: an alias of `.cn-display`. Both set `margin: 0`. `.lede`: the lede role, max `--cn-measure` (68ch), 24px above and below.
- `.app-shell`: a column at least the viewport tall; its `main` absorbs the slack so the footer sits at the bottom. `.is-fixed` makes the shell exactly the viewport and turns off the root's `scrollbar-gutter`.
- `.app-shell.has-sidebar` lays a `.sidebar` beside the content. The sidebar is `--sidebar-w` (264px) wide, the full viewport tall, sticky, on the recessed fill with an `--edge-soft` rule, and scrolls on its own. `.sidebar-head` holds the wordmark and a `.sidebar-toggle`; `.sidebar-body` scrolls. `.sidebar-nav` stacks groups 24px apart, each a `.cn-microlabel` over links at the ui size and 500; hover is the ghost wash and `aria-current="page"` is the engaged state at 600. At 1060px and below the sidebar is a sticky blurred bar, the toggle shows, and the body opens under `.is-open`: it fades in and settles 4px over `--t-base` on the ease-out and leaves on the ease-in over `--t-exit`, and lands at once under reduced motion. The breakpoint crossing itself does not animate. The consumer sets `.is-open` and `aria-expanded`.
- `.deck`: hash-routed views. The `:target` child shows, the first child is the default, and a deep link shows the view that contains it.
- `.live-dot`: a 7px green dot with a 4px halo at `--cn-step-fill`, pulsing every 1.5s on the ease-out.

### Tabs, menu, slider, pagination, breadcrumbs

- `.tabs` (`role="tablist"`): a shallow carve (`--neu-inset-soft` and the well lip) holding `[role="tab"]` buttons at `--control-h-sm` in the ui role, `--cn-fg-muted`. The `aria-selected="true"` tab is the selected state, not the engaged one: it rises out of the carve on the raised fill with `--neu-raised-soft`, the lit edge and the `--engaged-edge` rim. That is the reverse of the segmented choice on purpose: a tab is a view and rises; a segmented choice is a setting and presses in. With `tabs()` wired, the raised fill is one pill, `.tabs::before`, that slides to the selected tab over `--t-fast` on the ease-out and lands at once under reduced motion; without it each tab draws its own fill. Roving tabindex and arrow keys come from `tabs()` in `catppuccin-neu/js`, or the consumer's own script.
- `.menu` on a `.popover` (`role="menu"`): `[role^="menuitem"]` rows at `--control-h-sm`, 14px at 500 in `--cn-fg-soft`. Hover and keyboard focus share `--hover`; keyboard focus also draws the focus ring inset 2px. An svg leads at 16px in `--cn-fg-faint`, a `kbd` trails as the shortcut, `aria-checked="true"` draws a mauve check, `.is-danger` is red with a red wash, `hr[role="separator"]` is an `--edge-soft` rule, and a `.cn-microlabel` heads a group. Arrow keys, Home, End and Escape, with focus returning to the trigger, come from `menu()` in `catppuccin-neu/js`, or the consumer's own script.
- `.slider` (`input[type=range]`): a 7px carved crust track filled with `--cn-interactive` up to the thumb, and a 20px raised round thumb with a `--control-edge` rim and the lit edge that rims mauve on hover and shrinks to .92 when held. Firefox fills natively; elsewhere the consumer keeps `--value` in step. Pair it with a label and an `output`.
- `.pagination` (`nav`): square ghost targets at `--control-h-sm` with tabular figures; `aria-current="page"` is the engaged state; a `span` is the ellipsis.
- `.breadcrumbs` (`nav > ol`): crumbs in the ui role, `--cn-fg-body` links, a 12px `--cn-fg-faint` chevron between them that flips in right-to-left text, and the `aria-current="page"` crumb in `--cn-fg` at 600.

### Prose and skip link

- `.cn-prose`: an article from bare elements, the one recipe that styles bare elements and only inside itself. The body role at `--cn-measure`, 16px between blocks, `h2` in the heading role with 48px above, `h3` in the title role with 32px, `h4` in the name role with 24px, 12px under any heading, inline `code` in mono at .92em in `--cn-fg-soft`, a `blockquote` on a 2px `--edge-strong` inline-start rule, and `hr` as an `--edge-soft` rule.
- `.cn-skip-link`: the first focusable element. It sits above the viewport until it takes keyboard focus, then slides in at the top inline-start corner on the overlay fill with `--shadow-pop`.

### Writing direction

Recipes use logical properties (`padding-inline-start`, `margin-inline-end`, `border-inline-start`, `text-align: start`), so spacing and rules follow the writing direction. Positions, transforms and the switch travel are still physical.

## Behavior

The CSS reads ARIA state and never needs script to look right. What it
cannot do is keep that state and the keyboard model in step.
`catppuccin-neu/js` is an optional, framework-free module that does,
following the WAI-ARIA patterns. Each function returns a cleanup. Apps with
their own widget library skip it.

- `tabs(tablist)`: Left, Right, Home and End move focus and select (selection follows focus), mirrored in RTL. Only the selected tab is in the tab order. Each tab's `aria-controls` panel shows only while it is selected. Fires `cn-select`. On a `.tabs` carve it measures the selected tab into `--cn-tab-x` and `--cn-tab-w`, sets `data-cn-indicator` so the pill slides, and follows resizes.
- `menu(trigger)`: for a trigger with `aria-haspopup="menu"` and `aria-controls` naming a hidden `.menu[role="menu"]`. Click, Enter or Space opens on the first item, ArrowUp on the last. Arrows, Home and End move. Escape closes and returns focus. Tab or a press outside closes without moving focus. A `menuitemcheckbox` toggles `aria-checked` and stays open. `aria-expanded` on the trigger is its engaged state.
- `slider(input)`: keeps `--value` in step with the range.
- `tooltips()`: Escape hides a showing `[data-tip]` until the pointer or focus leaves it (WCAG 1.4.13).
- `toast(stack, { title, body, timeout })`: appends a `.toast` with a dismiss button. The timeout runs only while neither the pointer nor focus is in the stack, and a toast appended under the pointer waits. A drag toward the end edge follows the pointer and dismisses past 80px or on a flick; short of that the toast springs back. The exit runs through `[hidden]`, then the node is removed.
- `init(root)`: wires every `[role="tablist"]`, menu button and `.slider` under `root`, plus `tooltips()`.

Disabled items are skipped everywhere. Focus return, outside-press and
Escape behave the same in every widget.

## Responsive

Three breakpoints. Each removes decoration, never content.

Component folds (the stat grid and panel footer at 760px; the segmented control, stats, accordion meta and `.kv` at 520px) also answer a `.cn-container`'s width, so they fold inside a narrow pane on a wide screen. Page chrome and the table's row mode stay on the viewport.

- **1060px**: the tilted panel flattens to `--neu-raised`, the topbar goes to two columns, `.nav-secondary` hides, the sidebar folds into a bar with a menu toggle, and `.cn-grid-12` splits become halves.
- **760px**: the topbar is 60px (48px compact). Its nav scrolls sideways, and a split bar's actions wrap onto more rows. The footer stacks. The lede drops to the body size. Panel footers wrap. `.panel.is-shell` sheds its chrome. A `.data-table` becomes rows unless it sits in `.table-scroll` with no `td[data-label]`: the header hides, each `td[data-label]` puts its label in a 120px left column with the value beside it, a cell without a label spans the row, a `td.is-trail` rides beside the name, hairlines split rows, and the press moves to the row. `.cn-grid-3/4` and `.stat-grid` go to two columns; `.stat-grid` stays at two below 520px.
- **520px**: the segmented control stacks. Stat values drop to the lede size, 18px (24px on `.is-lg`), and band titles to the body size, 16px. The accordion stack tightens and its meta wraps under the title. `.kv` stacks. Every `.cn-grid-*` goes to one column.

## Verification

`pnpm lint` runs `scripts/lint.mjs` on `css/tokens.css`, `css/utilities.css`, `css/recipes.css` and `tailwind/theme.css` (not `css/index.css`, which only imports) and fails on:

- a custom property that references itself
- a raw duration in `transition`, `transition-duration` or `transition-delay` (only zero and the reduced-motion .01ms pass)
- a raw px value in a gap, padding or margin in recipes or utilities, other than 0 and ±1px
- a palette text stop (`--text`, `--subtext-*`, `--overlay-*`) in a recipe's `color`; recipes use a `--cn-fg-*` role
- a hand-mixed `color-mix` of surface-1 or surface-2 in recipes or utilities; hairlines use `--edge`, `--edge-soft` or `--edge-strong`
- an accent hue (`--mauve`, `--pink`, `--red`, `--green`, `--peach`, `--yellow`) in a recipe outside the `.tok-*` syntax colors; recipes use a `--cn-*` role
- `outline: none` or `outline: 0` anywhere
- a row of the type table above that disagrees with the tokens on size, weight, leading or tracking
- a contrast pairing under its floor, computed from the tokens (hexes, `var()` and `color-mix` in srgb, transparent mixes composited) in the default and `prefers-contrast: more` values: `--cn-fg`, `-soft` and `-body` 7:1, `-muted` 5.5:1, `-placeholder` and every status role and link 4.5:1 on the page, raised and overlay grounds; each status role 4.5:1 on its own tint; the field lip, focus ring, control edge and engaged rim 3:1 (the rim also on `--wash`); `--cn-fg-on-accent` 4.5:1 on the primary and its hover
- a ratio in a token comment that is more than .06 off the computed ratio on base
- an APCA lightness contrast under its floor on the same grounds and in both modes: `--cn-fg` Lc 75, `-soft` and `-body` Lc 60 (APCA's level for content text), `-muted` Lc 50 and `-placeholder` Lc 40. Muted text holds labels and meta, never running copy, and a placeholder is never the only copy of a fact
- a `box-shadow` or `--hard-extra` in recipes or utilities that is not `none` or a comma list of `var()` tokens. Every layer has a name in `tokens.css`: the neu tokens, `--cn-lit-edge`, `--cn-field-ring`, `--cn-well-lip`, `--shadow-pop/cast/mark`, the plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`), `--cn-primary-rim`, `--cn-gloss-inset`, `--cn-validation-ring`, `--cn-readonly-rule`, `--cn-sticky-rule`, `--cn-switch-ring`, `--cn-disabled-ring`, `--cn-halo-ring`, `--cn-live-halo`, `--cn-switch-glow`, `--cn-switch-glow-held` and `--cn-ground-ring`. The plates, the validation ring and the ground ring read `--plate`, `--hard-offset`, `--tone` or `--ring-ground`, so they are declared on the elements that draw them
- a radius in recipes or utilities that is not a `--cn-radius-*` token, 999px, 50%, 0, `inherit`, or a radius token minus 1px
- `text-transform: uppercase` anywhere but `.cn-microlabel`
- a transform or box-shadow transition with no `--ease-*` curve, or a transition that uses the `ease`, `linear` or `ease-in-out` keywords
- `!important` outside the `[hidden]` rule, `.cn-hidden`, and the reduced-motion and forced-colors blocks
- in `showcase/src`, a `title=` on an element or an `overflow: hidden`, since the showcase follows the same markup rules

Reviewers also check:

1. Recipes name text by role (`--cn-fg-*`), not by palette stop. Every color is a Mocha hex from tokens, `currentColor`, `transparent`, `color-mix(in srgb, …)` of tokens, `oklch(from …)` of a token inside `--cn-fill-ramp`, the white at .16, .1 or .3, or the crust, surface-1 and crust-halfway-to-black (`rgb(8 8 14)`) values the neu tokens and the row press use. Data-URI glyphs use palette hexes, and mask glyphs black strokes; the grain tile is greyscale. Mask gradients are exempt.
2. Mono follows the ground rule.
3. The `:focus-visible` outline is never removed, only made transparent where a ring replaces it. `::selection` stays.
4. Each file parses alone and through `index.css`.
5. No purpose-named classes beyond the slot exceptions in the ground rules.

### Showcase

`showcase/` is a Preact and Vite site that imports `../css/index.css`
directly and deploys `dist/` as Cloudflare Workers static assets. It is the
visual reference: every recipe and state appears at least once, and every
page uses the current names. `src/nav.ts` registers routes, sidebar order
and titles. Specimens sit on `--base`. Close buttons draw a 14px stroke
glyph, never a text character. Run it with
`pnpm --dir showcase install && pnpm --dir showcase dev`; `pnpm --dir
showcase build` must pass.

`pnpm --dir showcase test:a11y` opens every route in Chromium and fails on
an axe violation (wcag2a through wcag22aa), by default and again under
`prefers-contrast: more`, on any box that clips its text under the WCAG
1.4.12 text-spacing override, on a focus ring that is not `Highlight`
under forced colors, on a transition or animation longer than 1ms under
`prefers-reduced-motion: reduce` (overlay fades and spinners excepted),
and on sideways scroll at 390px. It saves
a forced-colors screenshot of every route to the ignored
`showcase/a11y-shots/forced-colors/` for review.
