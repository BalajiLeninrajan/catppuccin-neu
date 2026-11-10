# catppuccin-neu spec

A dark neumorphic design system in Catppuccin Mocha. This file and the CSS
in `css/` are the source of truth. [CHANGELOG.md](./CHANGELOG.md) records
how each rule got here.

## Ground rules

- **Generic content.** Docs, README and CSS comments never name a consumer project. Examples use neutral product content: dashboards, settings, invoices, messages.
- **Names describe style.** A class names an appearance (chip, banner, panel, dashed, tilted), or a slot inside one fixed pattern, never an action (add, back, search, submit). The slot names are listed under [Special cases](#special-cases).
- **No single-use recipes.** Anything that cannot be generalized lives in the consumer's own CSS.
- **Mono is for code.** The package sets `var(--mono)` only on `.cn-code`, `.cn-code-meta`, `.cn-code-inline`, `.terminal`, `.codeblock` and `.command`, and on `code` inside `.cn-prose` and `kbd` in a `.menu`. A consumer may put mono on one element that earns it, never on prose, headings or a whole control set. Sans numbers use `tabular-nums`.
- **Uppercase is scarce.** Only `.cn-microlabel` is uppercase. It labels a fact or heads a group of links in navigation, never a page section.
- **Readable text is overlay-2 or lighter.** Overlay-2 (`--cn-fg-placeholder`) is for placeholders and the code line-number gutter only; meta is subtext-0, `.cn-label` and field labels are subtext-1, and component labels (stat labels, key-value keys, chips, the stepper, table heads) stay on `--cn-fg-muted`. overlay-0 and overlay-1 are for icons, borders, control edges and disabled text. Recipes name the job (`--cn-fg-muted`), not the hex.
- **Dark only.** The package sets `color-scheme: dark` and does not answer `prefers-color-scheme: light`. It answers `prefers-contrast` (and `data-contrast="more"` on the root element, the same step as an opt-in a page can toggle), `prefers-reduced-motion`, `prefers-reduced-transparency`, `forced-colors`, `pointer: coarse` and `hover: none`, and resolution queries size the grain tile. Light text on a dark ground blooms for readers with astigmatism, so the system holds the mitigations that fit dark mode: body text is subtext-1, not white; body weight is 400; leading is 1.6; and `prefers-contrast: more` lifts every role a stop.
- **The page is mantle and raised surfaces are base.** Panels, plated controls and the tilted panel sit one fill step (1.07:1) above the mantle page, so a panel separates from the page by its fill as well as its foot. Nothing raised is lighter than base; overlays alone take a lighter step. Anything below the ground, a well, a skeleton or the sidebar, is darker than the page, and crust is that darker step.
- **Depth replaces borders on inset surfaces.** Transparent carves (fields, tabs) paint no border and no background of their own. The filled carves are the exception: wells, the mono wells, stepper pills, skeletons and the switch plate take `--cn-surface-sunken`, because a shadow alone tops out near 1.2:1 on a dark page and a transparent well reads as an outlined panel; the progress and slider tracks take crust. The fill is only 1.07:1 under the page, so a well and the mono wells also take `--cn-well-ring`, a quiet even ring halfway between surface-0 and surface-1, 1.7:1 on the fill and quieter than any field's. Tinted carves (the banner, an invalid field, the open accordion) take their tone's tint, and the status tag its tone's wash. Hairlines stay on raised surfaces and tinted surfaces. The tag is a shallow carve with no outline. The checkbox, radio and switch keep an edge, because at 20px the carve alone is invisible.
- **A carve is darkness only.** Every carve (fields, selects, textareas, wells, the mono wells, the tabs carve, the switch plate, stepper pills, skeletons, the status tag, the disabled primary's soft carve, the engaged press and the row press) is one dark wall falling from the top left. It has no light side: no light lip on its bottom and right walls and no light inner glow, because that pair reads as a sunken box from an old desktop. A carve may take a quiet even hairline, and only where a rule below names one. Bright light lines are not a depth cue anywhere: a raised surface's lit edge is a quiet 1.5:1 line, and rank comes from darkness. The one sanctioned step in line strength is the hairline ladder, `--edge` below `--edge-strong`; nothing adds a bright rim or lip on top of it. A carved field at rest takes `--cn-field-ring`, and the tabs carve and a disabled field the quieter `--cn-carve-ring`. Hover rings a field that is not disabled or focused, and focus draws the focus ring alone.
- **One signal per item.** Color goes on plates and data marks such as a progress fill. Text takes the accent only when the text is itself the mark, and there are four: the hero value, avatar initials in `--accent`, a status `.tag` in its tone, and the one `em` in `.cn-display`, `.display-title` and `.wordmark`, mauve and upright. A sentence never does: a banner's message and a field's help text stay `--cn-fg-body` with the tone on the glyph. A view keeps one mauve text mark, so a view with a mauve hero value drops the `em`. [Special cases](#special-cases) has the hero value's two exceptions. An accent comes from the item's identity, so the same item has the same accent on every page. A plate takes color only when its block is the accent signal: the one primary and accent cards. Every neutral clickable (the secondary, segmented options, chips) stands on ink, so a colored plate stays a rank and marks the one primary.
- **The ornaments stay, and they are one idea.** Every ornament is a physical object under the one top-left light: a carve sits below the ground; a plate is the side of a block standing on it; the tilt lifts one card off it; the rocker is a wall switch in a carved plate; the gloss and the ramp are that light on a solid fill; grain is the fill's tooth; the spring is the block settling back. The tilted panel, colored plates, the switch rocker, the primary gloss, the fill grain, the empty-state carve, the spring curve, page-enter, the toast pile and the scrim blur are the package's identity.
- **One tilted panel per page**, holding a summary or an aside in prose, not the page's main data and not ruled rows: rotated rules drift against the text on them at 1x. Its heading takes the name role, no larger than the panel titles beside it, and its prose sets at 15px, the compact body size, on the body leading: rotated 14px text renders soft at 1x, and 15px stays under the 16px body, so the tilt does the lifting and the data panel beside it stays the louder block.
- **`color-mix` is `in srgb`.** `in oklab` is allowed only for data-visualization ramps. `oklch(from …)` is allowed only in `--cn-fill-ramp`, where it moves lightness and chroma, never hue.
- **Fonts.** Every page links IBM Plex Sans (`IBM+Plex+Sans:ital,wght@0,400..700;1,400..700`) and JetBrains Mono (100..800) from Google Fonts. The package ships no font files.
- **Ornament budget.** A view holds one tilted panel, one primary and at most one `.is-lg`. Each ornament kind has one job: grain only on solid accent fills; blur only on the topbar, the folded sidebar and the scrim; plates only under clickables, accent cards and the one tilted panel. The ramp and grain always travel together on a solid accent fill, so they count as one kind, the fill; the switch paddle and chart bars take the ramp without grain. A solid accent fill takes its gloss, a data or status mark takes none, and the plate, the rocker and the tilt each add one physical part; every other element holds one kind. The composites this allows are listed under [Special cases](#special-cases). `.is-lg` here means a hero control: a large button or `.input-lg`; a large stat or avatar does not count, and neither does `.btn.is-icon.is-lg`, which only reaches `--control-h`. The tilt never sits on a panel with a table or a form.

### Special cases

The ground rules state each family as one rule. These are the instances
the rules allow, in one place.

| Rule | Case | Why |
| --- | --- | --- |
| A class may name a slot inside one fixed pattern | `.command-copy`, `.copy-glyph` and `.done-glyph` in the command; `.sidebar-toggle` in the sidebar head; `td.cell-select` in a table row | the copy button and its two glyph states, the fold control, and the row-select checkbox cell |
| Text takes the accent only when it is itself the mark | the hero value, `.cn-value-lg` and `.stat.is-lg`, in `--accent` | the figure is the mark; inside an `.accent-card` it is text-colored, since the card already carries the accent, and it goes text-colored (`.cn-fg` on its `strong`) when the view's mauve primary sits in the same band, so mauve stays on the primary |
| A solid accent fill takes its gloss; a data or status mark takes none; plate, rocker and tilt add one part each | fill and gloss: the checked or indeterminate checkbox and `.mark`. Plus the plate: the primary. Plus the rocker: the on switch, with its ramp and glow. Fill alone: the progress fill, chart bars and `.tag.is-solid`. Tilt and plate, no accent fill: the tilted panel | the glow belongs to the rocker, as its on state. A progress fill and a bar are data marks and the solid tag is a status mark, so none of them takes a gloss, grain, plate or raise, and the solid tag never reads as a button |
| A solid status tag marks one urgent status per view | `.tag.is-solid` on Overdue, in a status tone and never in mauve | every other status keeps the washed tag, so the solid one outranks them by lightness as well as hue; mauve stays the only primary. A solid danger tag never shares a band or a row with the primary: red and mauve sit at dE 12.5 in OKLab, so it stays in a status column, and the word, the glyph and the missing plate and gloss tell it from a button |
| A mark with a word and a glyph may sit beside its hue family | status tags and banners | a "Due soon" warning may sit above an "Overdue" danger. The same word and glyph let a danger tag share a view with the mauve primary, though a solid one keeps out of its band and row |

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
- The CSS needs no script to look right, but tabs, menus, listboxes and comboboxes are required to have a keyboard model. A stylesheet cannot run script, so one tag wires them, and a static page with none of those widgets can leave it out. Bundled apps add `import "catppuccin-neu/js/auto"`. Pages with no `package.json` put `<script type="module" src="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.1/js/auto.js"></script>` beside the stylesheet link, pinned to the same tag. Either wires every widget in the document and the ones added later. `init()` from `catppuccin-neu/js` does the same on the app's own schedule, and the consumer's own widget library replaces both. See [Behavior](#behavior).
- Nobody commits copies of the CSS. Tags never move once pushed.

The docs deploy as the `catppuccin-neu` Cloudflare Worker at
https://catppuccin-neu.balajileninrajan.dev.

## Tokens

`css/tokens.css`, layer `cn.tokens`. Everything else reads these.

Naming. A token's prefix says what it is. Bare names are the Mocha
palette stops (`--mauve`, `--surface-0`) and the public knobs a consumer
sets: `--accent`, `--tone`, `--series`, `--plate`, `--hard-offset`,
`--grain`, `--space-*`, `--t-*`, `--ease-*`, `--control-h` and the other
density knobs, and `--edge`. `--neu-*` are the shadow stacks and their
inks. `--cn-*` are semantic roles and internals, which recipes read and a
consumer rarely sets. Classes follow one rule: a recipe is an unprefixed
component name (`.btn`, `.panel`), and a utility or helper class is
`cn-`. Three `cn-` helpers live in `recipes.css` because they style
descendants: `.cn-divide`, `.cn-prose` and `.cn-skip-link`. 0.4.0 renamed
once and 0.5.0 removes those aliases, so the names hold for this
release; a single-prefix rename is a 0.6 decision.

The surface and shadow tokens are frozen for 0.5.0: `--edge`,
`--edge-strong`, `--cn-lit-edge`, the `--neu-*` shadows, `--cn-plate` and
the `--cn-surface-*` ladder. Their values are the ones below, and the
CHANGELOG lists them. The values lock at the 0.5.0 tag, and the
CHANGELOG's "Changed after the freeze" list records every move before
it. `pnpm lint` holds a snapshot of each token's resolved value and fails
when one differs, so a change edits the snapshot and adds its own
CHANGELOG line in the same commit. The mantle page ground, the 70%
`--edge`, the crust sunken fill, the 80% recessed step, the lead's
6px 8px foot and the plain panel's 1px contact are such changes.

### Palette and faces

All 26 Mocha hexes: twelve neutrals, `--crust` through `--text`, and fourteen hues, `--rosewater` through `--lavender`. Do not substitute a
hex. `--sans` is IBM Plex Sans first and `--mono` is JetBrains Mono first.
Each falls back to a local face (`IBM Plex Sans Fallback`, `JetBrains Mono
Fallback`) whose metrics are overridden to match, so the swap does not
reflow, and then to system faces. The Plex fallback is Arial or Liberation
Sans at a 101.13% size adjust, with a 101.36% ascent, a 27.19% descent and
no line gap: Plex's 1.025 and .275 on its 1000 em, divided by the adjust.
Type roles gives the reasons the face is Plex.

Every hue has a job, so none is a free decoration:

| Hue | Job |
| --- | --- |
| mauve | interaction: links, the primary, checked and engaged states; series 6, the last slot; and two text marks, the `em` in a display title or wordmark and the hero value through `--accent`. Outside the page chrome's wordmark, a view holds at most one of these mauve text marks, so a view with a mauve hero value sets its title without the `em`. Data marks such as a series 6 bar or swatch don't count |
| pink | the interactive hover; series 5 |
| red | danger |
| yellow | warning; series 2 |
| green | success |
| blue | info; series 3 |
| teal | series 1 |
| peach | series 4 |
| rosewater, flamingo, maroon, sky, sapphire, lavender | record identity only: an `--accent` for a team, project or person beyond the six series, never status or interaction |

### Semantic roles

Recipes read these instead of palette names. Ratios are on base, the
panel fill, which is the lower of the two grounds; on the mantle page each
reads about 7% higher (text 12.1:1, subtext-1 9.9:1, subtext-0 7.9:1,
overlay-2 6.2:1, overlay-1 4.8:1). `prefers-contrast: more` moves each
text role one stop lighter.
`--cn-fg-soft` is a job alias of `--cn-fg-body`: Mocha has no stop between
subtext-1 and text, so the two share a value, and the alias follows body
under `prefers-contrast: more`. Recipes still name the job.

| Token | Value | Job | Ratio |
| --- | --- | --- | --- |
| `--cn-fg` | text | headings, names, values | 11.3:1 |
| `--cn-fg-soft` | `--cn-fg-body` | lede, table cells, code, `.cn-label` and field labels | 9.3:1 |
| `--cn-fg-body` | subtext-1 | running text | 9.3:1 |
| `--cn-fg-muted` | subtext-0 | meta, help, table heads | 7.4:1 |
| `--cn-fg-placeholder` | overlay-2 | placeholders, code line numbers; the floor for text | 5.8:1 |
| `--cn-fg-faint` | overlay-1 | decorative icons | 4.4:1 |
| `--cn-fg-disabled` | overlay-1 | disabled text, a stop under the placeholder on purpose; WCAG 1.4.3 exempts inactive controls | 4.4:1 |
| `--cn-interactive` | mauve | links, the primary, checked controls | 8.1:1 |
| `--cn-interactive-hover` | pink | their hover | |
| `--cn-focus` | text | the focus ring, the one bright neutral no state uses | 11.3:1 |
| `--cn-danger`, `-warning`, `-success`, `-info` | red, yellow, green, blue | status tones | |

Crust on the mauve primary is 9.2:1; `--cn-fg-on-accent` names it. Placeholders are `--cn-fg-placeholder`: 5.8:1 on a panel, 6.2:1 on the page and 4.6:1 on an overlay. Meta, help and component labels (stat labels, key-value keys, chips, the stepper, table heads) sit a stop above the floor, on subtext-0. `.cn-label` and field labels sit a stop above that, on subtext-1, 9.3:1 on base and 10.3:1 on the recessed sidebar. Warning is yellow, Catppuccin's
warning, which sits 1.8:1 from red where peach sits 1.3:1.

Non-text contrast: WCAG 1.4.11 asks for 3:1 on the visual information a
reader needs to identify a control and its state. A resting field is
identified by the label above it and the dark carve under the label, and
its bounds by `--cn-field-ring`, surface-2 at 85%: 2.2:1 on the page
and 2.1:1 on a panel. On the lighter overlay fill that mix is only
1.7:1, so a popover, modal or drawer swaps in
`--cn-field-ring-overlay`, overlay-0 at 75%, 2.1:1 there. A panel or a
well inside one takes the surface-2 ring back. Every ground
stays quieter than 3:1 on purpose (see the token). That hairline is not a 3:1 edge; the bounds are not
the only way to find the field. Its state shows at 3:1 the moment a
reader reaches for it: hover closes
`--cn-field-hover-ring`, a full 1px `--control-edge` ring, 4.8:1 on the
page, 4.4:1 on a panel and 3.5:1 on an overlay, and focus draws the
focus ring, with the resting hairline inside it and no second bright ring. So every field needs a visible label. A field in a table
cell has none above it, so it takes its name from the column header
instead. Under `prefers-contrast: more` a resting field closes into a full overlay-2
ring, 5.8:1 on a panel and 4.6:1 on an overlay. Unchecked control edges and the slider thumb are
`--control-edge`, overlay-1, at the same 4.4:1 and 3.5:1, because a box
with no label inside it is the whole control. The focus ring is 11.3:1
on a panel, 12.1:1 on the page and 9.0:1 on an overlay. A button is
identified by its label, so its resting hairline is decoration.

### Surfaces

Each step has one token. The page is mantle, and panels and plated
controls sit on base, one fill step above it (1.07:1). A raised surface
lifts by that step and by its edges and shadow: the contact edge and near
shadow, the cast, the lit top edge and the `--edge` hairline. Nothing
raised is lighter than base. Overlays float free of the page, so they
alone take a lighter step. Anything below the ground is darker than the
page: crust is the darker step.

| Token | Value | Holds |
| --- | --- | --- |
| `--cn-surface-sunken` | crust, 1.07:1 under the page and 1.14:1 under base | wells, the mono wells, the switch plate, stepper pills, skeletons, the disabled primary |
| `--cn-surface-band` | crust 30% over transparent, one step under its parent, 1.05:1 under base | table heads |
| `--cn-surface-recessed` | crust 80% into mantle, 1.05:1 under the page and 1.13:1 under base | the sidebar |
| `--cn-surface-page` | mantle | the page ground: the body, the app shell, the topbar, stat bands, transparent carves on the page |
| `--cn-surface-raised` | base, 1.07:1 on the page | panels, the lead panel, the tilted panel, secondary buttons, segmented options, chips, accent cards, the selected tab, the switch paddle |
| `--cn-surface-overlay` | surface-0 90% into base, 1.27:1 on base and 1.36:1 on the page | popovers, dialogs, drawers, toasts, tooltips |

Body text stays above 7:1 and placeholders above 4.5:1 on the overlay. A
lighter overlay would drop the placeholder role under 4.5:1, so the ladder
stops at 1.27:1.
`--hover` is surface-1 60% over transparent: 1.40:1 on base, 1.44:1 on the
page and 1.23:1 on an overlay, so a menu row still lights. It is a wash
over the ground, never a lighter raised fill. Bands never take
a darker fill than the surface they title; panel, modal and drawer headers
sit on their parent's fill behind a divider.

Elevation, low to high: carved (`--neu-inset`, transparent or sunken), page, raised
and overlay (overlay fill and `--shadow-pop`). Raised stands on a soft
foot (the base fill, `--edge` and `--neu-raised`; the lead is a raised panel
with a deeper foot, `--edge-strong`, `--neu-lifted` and more room) or on a
hard plate (the hard offset; the tilted panel, one per page, stands on the same plate). A cast shadow barely registers on a dark page, since even
black is only 1.2:1 on mantle, so the base fill does the separating and
height rides on a dark foot along the bottom and right edges: the 1px
full-ink contact edge under the panel's 1px ink border side, and the near
shadow, 4 to 6px of near black where the cast fades. The lit top edge and `--edge` cut the panel's outline, at 1.5:1
and 1.85:1 on base; with the fill step doing the separating, the hairline
stays quiet so a panel never reads as an outlined box. The lead keeps the
same lit edge, takes `--edge-strong` (2.5:1) on its top and left and stands
on a hard foot past the 4px plate: an 8px by 6px contact plus its 1px
`--neu-ink` border sides, 9px deep and 7px wide, so it ranks by darkness
on the side away from the light, not by a brighter line or a line all
round. It also ranks by room: its header band is `--lead-band-h` tall, its
header, body and footer pad `--lead-pad`, and its band title steps up to
`--lead-title-size` at the heading weight.

### Mix steps

Every tint of a hue uses one step, so a wash means one strength
everywhere: `--cn-step-tint` 4%, `--cn-step-status-tint` 6% (the four status tints), `--cn-step-wash` 12%, `--cn-step-row` 16% (the row hover, 1.39:1 for mauve on base), `--cn-step-engaged` 23% (the engaged wash), `--cn-step-plate` 25%, `--cn-step-edge` 40%, `--cn-step-strong` 50%, `--cn-step-vivid` 70% (accent plates, the engaged rim).
The switch glow reads `--cn-step-plate`, and `--cn-step-edge` while held.
`--cn-step-wash` stays at 12% while the other hovers rise: it is also the
status tag ground, where red text on its own wash over an overlay is
4.54:1, and 13% takes that to 4.45:1. It also mixes the avatar ground, the
radio and live-dot halos and the `.mark` border, which had their own 14%
step, `--cn-step-fill`, until 0.5.0 folded it in.
`--cn-step-engaged` stops at 23%: muted text on the engaged wash, such as
a chosen segmented option's hint, is 4.52:1 there, and 24% takes it to
4.41:1.

Status ladders name the stops of each status role:
`--cn-<role>-tint` (the role at `--cn-step-status-tint` over transparent), `-wash`
(`--cn-step-wash`), `-edge` (`--cn-step-edge`) and `-border` (the role at
`--cn-step-plate` into surface-0), for danger, warning, success and info.
Recipes read whichever stop the job needs through `--tint`, `--tone-wash`,
`--tone-edge` and `--tone-border`. Those default to the same mixes of the
element's `--tone`, and a status `.cn-tone-*` swaps in its ladder, so one
hue's stop can be tuned without moving the shared steps. Lint holds each
role at 4.5:1 on its own tint and wash.

The status tints sit at 6%, a step past the 4% `--cn-step-tint`, so a
toned banner shows its tone before its glyph: 1.10:1 (red) to 1.16:1
(yellow) against a panel, where 4% gave 1.07:1 to 1.10:1. Body text on
them is 8.0:1 or better on a panel, 8.6:1 on the page and 6.2:1 on an
overlay, where the untinted overlay holds it at 7.3:1 and the 4% tint
already took it to 6.6:1; each role
on its own tint is 6.4:1 or better on a panel and 5.0:1 on an overlay.
8% was tried and stopped at 5.9:1 for body text on a warning banner in a
dialog. An invalid field, the untoned `--tint` and the open accordion
stay at 4%.

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

display and display-sm share one weight, leading and tracking token. name
is the ui role in `--cn-fg`: its four tokens alias the ui tokens, so a
name never drifts from the control voice beside it. It is an alias of ui,
not a step of its own, so the table has no name row. The small band
has two sans sizes: 12px for the caps micro, and 14px at three weights,
400 for meta and table cells, 500 for the label and 600 for ui and name.
Label and meta share the size and differ by weight, ink and leading: the
label at 500 in `--cn-fg-soft` (subtext-1), meta at 400 in `--cn-fg-muted`
(subtext-0). One pixel between the two would read as a mistake, not a
step, so they share 14px.
13px is left to mono code, which matches Plex Sans at 14px in x-height,
and to compact density, where `--cell-font-size` steps table cells, heads
and the tags and small buttons in a cell down together as body steps to
15px. Small buttons and text buttons take the label size, so outside a
compact table they are 14px too.
Tracking is 0 through 18px, -.01em at 20 and -.02em from 24 up: the value,
the heading and both display sizes. value-lg alone is -.025em, since it
sets figures. Words at 700 stop at -.02em, because at -.03em Plex Sans
closes "tt" and "ng" until they touch. The large steps run
20, 24, 28, 36 (title, value, heading, value-lg), so a stat value
outweighs the panel title above it. value-lg is 1.5x the value, so the
hero stat reads as the largest figure in a row of four. It is 36px from
860px up and below that follows the page title down, `clamp(1.625rem, .67rem + 2.94vw, 2.25rem)`,
which is display-sm less 4px, so a hero stat is under a default page title
at every width and over the 28px lead title down to 655px, where that
title drops to 20px. At 520px both step down: the value to
the lede size (18px), the hero value to 24px and the band title to the body size (16px). Chrome (label, micro) is 500 and meta 400, so 600
belongs to names, controls and titles. A key beside its value is 400 in
`--cn-fg-muted` against the value's 500 in `--cn-fg`, in `.kv` and in a
`.stat.is-inline` row. Breadcrumbs and resting pagination items are 500,
so the current one at 600 is a weight step, as in the sidebar. 700 belongs to the
heading, display and the wordmark; the title is 600, so a panel title never
outweighs the page heading.
A band or a row holds one small size plus micro, and one 600. A stat is
14, 24, 14: the label, the value, and a note in the label's voice. A table
row is 14px in its head, its cells and its tags. The head follows
`--cell-font-size`, and so does a tag, a chip, a small button or a text
button in a cell, so at compact density the whole row is 13px and no tag
is larger than the cell text beside it;
the `.cell-name` is the row's one 600, and a key
figure in a `strong` is 500 in `--cn-fg`, marked by ink and alignment.
The face is IBM Plex Sans because it has a voice of its own: the angled
terminals, the squared curves of `a`, `g` and `t` and the engineered
figures read as a tool, not a default, and sit well beside JetBrains Mono.
It also stays clear at 13 and 14px on a dark ground, with open apertures
and true tabular figures, so a dense table keeps its columns. It was picked
over Inter, Instrument Sans, Onest, Figtree, Manrope and Schibsted Grotesk,
and over Space Grotesk and Bricolage Grotesque as display faces: Onest,
Manrope and Schibsted space a tabular 1 or comma too wide, Instrument Sans
runs tight at 13px, and a second display face added a third voice without
adding legibility. There is no heading step between title (20px) and heading (28px):
a 24px step would match the value role, so a section title would read as
a figure, and long views already set `h2` at 28 and `h3` at 20.
Compact density steps body to 15px. `.page-main.is-reading` sets the lede at 20px. Mono
surfaces turn ligatures off, so `=>` stays two characters.

### Spacing and radius

- `--space-1..6`: 4, 8, 12, 16, 24, 32, inside components. Page widths are tokens too: `--cn-width-page` 1440, `--cn-width-narrow` 860, `--cn-width-reading` 740, and `--cn-measure` 68ch for prose. `--space-7` 48 and `--space-8` 64 space sections and page regions. Every gap, padding and margin in recipes and utilities reads one of these, a density knob, 0 or 1px.
- `--cn-radius-panel` 16, `--cn-radius-card` 12, `--cn-radius-control` 8, `--cn-radius-chip` 4. Pills are 999px and rounds 50%.

### Depth

Light comes from the top left. Every elevation is one of five neu tokens:

```css
--neu-raised:      1px 1px 0 var(--neu-contact), 3px 4px 6px var(--neu-near), 10px 12px 24px var(--neu-shade), var(--cn-lit-edge);
--neu-lifted:      6px 8px 0 var(--neu-contact), 8px 14px 16px var(--neu-near), 18px 28px 48px var(--neu-shade), var(--cn-lit-edge);
--neu-raised-soft: 1px 1px 0 var(--neu-contact), 3px 4px 9px rgb(8 8 14 / .5);
--neu-inset:       inset 3px 3px 8px var(--neu-dark);
--neu-inset-soft:  inset 2px 2px 5px rgb(8 8 14 / .5);
```

A shadow must be darker than the darkest surface it falls on. A panel's
shadow falls on the mantle page, and crust sits only 1.07:1 under mantle.
So the raised shadows use crust taken halfway to black, `--neu-ink`
(`rgb(8 8 14)`, 1.14:1 on the page and 1.22:1 under base): `--neu-shade` at
.72 for the cast, `--neu-contact`, the full ink, for a 1px edge where the
surface meets the ground, and `--neu-near` at .8 (1.12:1 on the page) for a
3px 4px 6px shadow that lays a 4 to 6px dark foot along the bottom
and right edges, where the cast is too faint to show at 1x. Even black is
only 1.2:1 on the page, so the shadow cannot carry height alone: the base
fill a step above the page does the separating, and the foot says which
side is down. A carve's dark wall uses the same base (`--neu-dark` at .8),
because a well's wall falls on whatever holds it. A carve is that one wall: `--neu-inset` at
3px 3px 8px and `--neu-inset-soft` at 2px 2px 5px and .5, with no layer
from the bottom right and none lighter than the page, a panel or a well.

A panel shows its height with three signals: the fill step, the hairline
on its top and left, and the dark foot on its bottom and right. The foot
is one shape made of the contact, the near shadow and the cast. The lit
top edge (surface-2 at 45%, 1.5:1 on base) sits inside the hairline and
marks the light side; it adds no height.

The foot ladder is the one rule for how tall a raised thing stands. It
counts the full ink under the bottom edge at default density, and each
step is deeper than the one before it:

| Foot | Ink | Made of |
| --- | --- | --- |
| panel | 2px | the 1px contact of `--neu-raised` and the 1px ink border side |
| plate | 4px | `--hard-offset`, under a clickable and under the tilted panel |
| lead | 9px | the 6px 8px contact of `--neu-lifted` and the border side, 7px wide on the right |

Comments and recipe notes point at this ladder and do not compare two
feet any other way. The ink is capped near 1.14:1 on the page, so only
its area can grow, and each step at default density is at least 2px
past the one before: 2, 4 and 9px. Three feet are what the eye can tell
apart at 1x, so the ladder has no step between the plate and the lead.
A 2px contact would make the panel's foot 3px, 1px under the plate, and
at 1x the two read as one size. The panel and the plate differ by size
and by kind. A panel's thin ink runs into its near shadow and cast, and
a plate is a hard block with no cast. Density moves the plate only: 3px
at cozy and 2px at compact, where it is level with the panel's 2px and
kind alone tells them apart. The panel and the lead keep 2px and 9px at
every density.

`--neu-lifted` is the lead panel's: the same lit edge over the ladder's
deepest foot, spent on the bottom and right only, with an 8px 14px 16px
near shadow and an 18px 28px 48px cast. The lead is a resting panel, not
a height of its own; the foot is its rank.
A panel's own border joins the foot. Its right and bottom sides are
`--neu-ink`, not the hairline, so on the side away from the light the
fill meets the ink directly at 1.22:1, the darkest step the palette
allows, with no lighter line between them. The border side is the last
1px of the panel and lead feet in the ladder.
The top and left sides keep the hairline, `--edge` or `--edge-strong`,
unchanged. This is darkness only: nothing on the top or left is
brightened, so the lead ranks by height, not by a heavier outline, and
no rim brighter than `--edge-strong` is added. Under
`prefers-contrast: more` or `data-contrast="more"` all four sides return
to the hairline, overlay-0 or overlay-1, so the 3:1 boundary holds on
every side.
Checked at 1x on `/examples/dashboard`: a plain panel's fill ends on 2px
of full ink on its right and bottom, then the foot; the lead shows 9px
of full ink under its bottom edge and 7px on its right, then a longer
falloff, so it reads as standing clearly higher than the chart panel
below it. The band joins the panel's edge with no gap, so it reads as
the side of a block and not as a detached bar. The tilted aside
reads apart by its rotation and its 3px plate at cozy density, which
carries no soft shadow and stands under half the lead's foot, so the aside ranks below
the data beside it.
The quiet top and left hairline against the dark right and bottom
reads as a block lit from the top left, not as a bevel, because the
hairline is no brighter than before and the dark sides run into the
shadow.
`--neu-raised-soft` is contact and a short cast. No raise
draws a top-left highlight outside its edge, because on a dark ground that layer
reads as a grey glow; a caller that wants the lit side adds
`--cn-lit-edge`. `--neu-dark-soft` is crust at .30. Three shared composites float or
mark: `--shadow-pop` (overlays: a long cast and a tighter one on the same
base, so a float reads at 1x), `--shadow-cast` (the topbar) and
`--shadow-mark` (the `.mark` drop with a white top edge). A panel inside a
panel rests on its parent and takes `--neu-raised-soft` with the lit edge.

One model covers every depth on the page. The light is above and to the
top left; height is distance from the ground. There are four heights:
below the ground, the ground, raised and floating. A raised surface
stands on one of two feet, a soft foot or a hard plate, and the foot
ladder above sets its size: panel, plate or lead. The lead panel is the
ladder's deepest foot and the tilted panel stands on the plate, so
neither is a height of its own.

| Height | What draws it | Who |
| --- | --- | --- |
| below the ground | a carve: one dark wall from the top left, nothing on the bottom and right walls; wells, the mono wells, stepper pills, skeletons and the switch plate also take the sunken fill, crust, darker than the page and a panel, and a well takes the even `--cn-well-ring` | fields, selects, textareas, wells, the mono wells, skeletons, tabs, the switch plate, stepper pills, the disabled primary |
| the ground | mantle, and nothing else. A static chip is a flat label on it: the base fill and the `--edge` outline, no shadow | the page, the topbar, stat bands, static chips |
| raised, on a soft foot | the base fill a step above the page, the `--edge` hairline on the top and left with the lit top edge inside it, and `--neu-ink` border sides on the right and bottom that join the dark foot. The lead panel is the same height on the ladder's deepest foot, `--neu-lifted`, under the `--edge-strong` hairline, a taller header band and wider padding | panels, the selected tab, the one lead panel |
| raised, on a hard plate | the base fill and lit edge over a hard offset, which replaces the cast. The plate's side is `--neu-ink`, except where the block itself carries the item's color: the one primary (mauve 25% into surface-0) and accent cards (the accent 70% into surface-0). The tilted panel stands on the same plate, `--cn-plate`, tipped 1.2deg with its text, and takes no raised shadow | clickables, link and button chips, accent cards, the one tilted panel |
| floating | the overlay fill, no contact, the two-layer pop shadow | popovers, menus, dialogs, toasts |

So a shadow says one of two things. A soft foot and cast mean a panel
resting on the page. A hard plate means a clickable, an accent card, or
the one tilted aside. No static label is raised: a chip on a span is flat. The avatar
is the one small static thing on the soft raise.

A hairline stays on raised and floating surfaces: `--edge` on panels and
controls, `--edge-strong` on the lead panel and overlays. A panel draws
it on the top and left only; its right and bottom border sides are
`--neu-ink` and belong to the foot. It is the
surface's cut edge, not a border standing in for depth; carved surfaces
have none. The fill step shows a panel's bounds on the page; the hairline
and the lit edge cut them, so every panel keeps both, a nested panel
included, where the fill matches its parent's. A static chip keeps the
fill step and the `--edge` outline all round (1.92:1 on the page, 1.85:1
on a panel) and drops the lit edge with its shadow. The one exception is `.panel.is-shell`, which gives up its frame
at 760px and becomes the page.

### Contract properties

Set these on an element or a wrapper to re-key a subtree.

| Property | Default | Does |
| --- | --- | --- |
| `--accent` | mauve | Plates, marks, avatars, the hero value, the progress fill, the caret, and bars and legend swatches with no `--series` |
| `--tone` | `--cn-info` | Tags, banners, icon-button hover, validation. `.cn-tone-*` sets it |
| `--series` | unset, so `--accent` | The color of a `.bar` and its `.legend-item` swatch. Set it to a `--cn-series-*` for a series, or to a status role (`--cn-success`, `--cn-danger`, `--cn-warning`, `--cn-info`) for a status breakdown. A status with no role takes a palette tone |
| `--plate` | `--neu-ink` | The hard offset's color. Undeclared on `:root`; read it as `var(--plate, var(--neu-ink))`. The ink is crust halfway to black, 1.22:1 under base where crust is 1.14:1, and 1.14:1 on the page |
| `--hard-offset` | 4px | The hard offset's distance |
| `--page-gutter` | `clamp(12px, 3vw, 32px)` | Inline gutter of the page column, the footer and the topbar |
| `--page-pad` | `clamp(24px, 4vw, 48px)` | Block padding of the page column |
| `--page-width` | 1440px | Width of the page column and footer; unset on `:root` |
| `--progress-fill` | the accent ramp | The progress fill; any token color or gradient |
| `--grain` | .22 | Grain strength on solid accent fills; 0 turns it off |
| `--ring-ground` | `var(--base)`, the panel fill | The ring color between stacked avatars. Set it to `var(--mantle)` for a stack on the page |

### Mix tokens

The hairline and lit-edge ratios below are design floors that keep the depth ladder in order, not
WCAG 1.4.11 obligations: a hairline only cuts a surface's edge. Lint holds
`--edge` at 1.8:1 on the page and raised fills and 1.5:1 on an overlay,
`--edge-strong` at 2.4:1 and 1.9:1 and above `--edge` on every ground, and
the lit edge at 1.4:1 and 1.3:1, in both contrast modes.

- `--edge`: surface-2 at 70%, 1.85:1 on base, 1.92:1 on the page and 1.6:1 on an overlay. The raised-surface hairline, also the cut edge of plated controls and the ghost hover. A panel stands a fill step above the mantle page, so the hairline only cuts its outline; it dropped from 85% because a brighter line makes a panel read as an outlined box at 1x. `prefers-contrast: more` lifts it to overlay-0, 3.4:1 on base, 3.6:1 on the page and 2.6:1 on an overlay, so a panel shows a 3:1 boundary for the readers who ask for one.
- `--edge-soft`: surface-1 at 38%. Inner separators.
- `--tint`: the tone at `--cn-step-tint`, 4%; a status `.cn-tone-*` swaps in its ladder's tint at `--cn-step-status-tint`, 6%. Declared with the `--tone-*` stops on `.cn-tint`, `.tag`, `.banner`, `.input`, field controls, `.btn.is-icon` and `.cn-edge-tone`, so each reads its own `--tone`.
- `--wash`: `--cn-interactive` at `--cn-step-engaged` (23%) into base, 1.63:1 on base and 1.75:1 on the page. The engaged state, 1.17:1 past the 1.40:1 hover so the fill tells them apart as well as the rim. On it `--cn-fg` is 7.0:1, mauve 5.0:1 and `--cn-fg-muted` 4.52:1.
- `--hover`: surface-1 at 60% over whatever is under it, 1.40:1 on base, 1.44:1 on the page and 1.23:1 on an overlay, with `--cn-fg` on it at 8.1:1, 8.4:1 and 7.3:1. The ghost, menu, pagination and sidebar hover. It rose from 40% (1.24:1) and then 50% (1.31:1), which washed out on a dim screen, and it stays under the 1.63:1 engaged wash. Lint holds it at 1.35:1 on base.
- `--engaged-edge`: `--cn-interactive` at `--cn-step-vivid` (70%), 4.7:1 on base and 3.3:1 on its own wash, so the rim clears the 3:1 floor for the state it marks. The rim of every engaged state, so a chosen option outweighs the raised ones beside it. The selected tab wears it too.
- `--edge-strong`: solid surface-2, 2.5:1 on base, 2.6:1 on the page and 1.9:1 on an overlay, so it outranks `--edge` on every ground. The lead panel, overlay, drawer and blockquote hairline. `prefers-contrast: more` lifts it to overlay-1, 4.4:1 on base and 3.5:1 on an overlay, above the overlay-0 `--edge`.
- `--cn-stat-rule`: `var(--edge)`, surface-2 at 70%, 1.92:1 on the page, where the stat band sits: the 2px rule of `.stat-grid.is-ruled`. It is equal to `--edge`, so at twice the width it carries the band without stepping past the hairline ladder. `prefers-contrast: more` lifts it to surface-2, 2.6:1 on the page, between the surface-1 `--edge-soft` and the overlay-0 `--edge`.
- `--cn-well-ring`: the even ring of `.well` and the mono wells, `inset 0 0 0 1px color-mix(in srgb, var(--surface-1) 50%, var(--surface-0))`, halfway between surface-0 and surface-1 and never lighter than surface-1: 1.7:1 on the well's own crust fill, 1.6:1 on the page and 1.5:1 on base. The sunken fill is only 1.07:1 under the page, so the ring holds a well's shape on a dim display. It is the quietest of the three carve rings, a step under `--cn-carve-ring`, so a code block never reads as an outlined control. Every rule lists it before the carve, like the field ring, so it paints over the dark wall and stays even on all four sides. `prefers-contrast: more` closes it into a solid surface-2 ring.
- `--cn-lit-edge`: a 1px line of surface-2 at 45% inside the top rim, 1.5:1 on base. Part of `--neu-raised`, `--neu-lifted`, every recipe plate's `--hard-extra` except the primary's gloss, and `.cn-hard`. It marks the light side of a raised surface, quietly, never as a bright rim.
- `--control-edge`: overlay-1. The edge of an unchecked control, the off switch paddle and the slider thumb: 4.4:1 on base, 4.8:1 on the page and 3.5:1 on an overlay.
- `--disabled-opacity`: .7. A disabled ghost label stays at 5.2:1 on base and a disabled chip label at 4.3:1. `prefers-contrast: more` takes it to .8. The primary does not dim; it goes flat.
- `--cn-field-ring`: `inset 0 0 0 1px` of surface-2 at 85%, the resting ring of every live carved field, a table-cell field included: 2.1:1 on base and 2.2:1 on the page. The same mix is 1.7:1 on the lighter overlay fill, so `.popover`, `.modal` and `.drawer` set `--cn-field-ring` to `--cn-field-ring-overlay`, `inset 0 0 0 1px` of overlay-0 at 75%: 2.1:1 on an overlay, level with a field on a panel, where solid surface-2 stops at 1.9:1. A `.panel` or a `.well` inside one of the three is base or crust again, so it sets `--cn-field-ring` back to `--cn-field-ring-page`, which holds the same surface-2 mix and exists only for that reset. Overlay-0 never rings a resting field on the page, a panel or a well. It stops under 3:1 on purpose: an overlay-0 ring at rest read as an outlined box, and a deeper field fill read as a dark box, so the label and the carve identify a resting field and the 3:1 ring waits for hover, focus and `prefers-contrast: more`. The resting field edge has two homes, this token and `--cn-field-ring-overlay` for the overlay fill, and no rule mixes its own. `--cn-field-ring` is frozen; it moved once after the freeze, from solid surface-1 at 1.8:1. Every rule lists it before the carve, so it paints over the dark wall and stays even on all four sides: under the carve the top and left dimmed and the bottom and right read brighter, which is a lip. `prefers-contrast: more` closes it and the overlay ring into a full 1px overlay-2 ring, 5.8:1 on base and 4.6:1 on an overlay.
- `--cn-carve-ring`: `inset 0 0 0 1px var(--surface-1)`, the even hairline of the tabs carve and a disabled field: 1.8:1 on base, 1.9:1 on the page and 1.4:1 on an overlay. Neither is an input waiting for text, so they stay a step under the resting field and tabs never read as an outlined box. `prefers-contrast: more` closes it into overlay-2 like the field ring.
- `--cn-field-hover-ring`: `inset 0 0 0 1px var(--control-edge)`. A hovered field that is not disabled or focused swaps it in for `--cn-field-ring`: 4.4:1 on base, 4.8:1 on the page and 3.5:1 on an overlay. A validation ring and a read-only rule keep their own shadow.

### Data series

`--cn-series-1..6` are teal, yellow, blue, peach, pink and mauve: the six
accents. Mauve is the last slot, so a chart of up to five series holds no
bar in the interactive color, and a mauve bar appears only when a chart
needs all six. The first four alternate cool and warm. Peach and pink,
series 4 and 5, are the one pair of warm neighbors, the cost of keeping
teal first and mauve last; they sit a lightness step apart, 9.3:1 and
5.6:1 on base. Series 3 and 5 are blue and pink 70% into
base in oklab (4.3:1 and 5.6:1), a lightness step under the rest, because
full-strength blue collapses into mauve for a protan reader and pink into
teal for a deutan one. Under a full-severity simulation (Machado 2009)
every adjacent pair stays above dE 6 in OKLab. The closest is series 1
and 2, teal and yellow, at 6.6 for a protan reader. The pairs the reorder
made neighbors hold more: blue and peach 22.3, peach and pink 14.7, pink
and mauve 10.5, each the lowest of the protan, deutan and tritan figures.
Series 1 and 3, teal and blue, sit at dE 25 or more. Series 3 and 5, blue
and pink, are not neighbors but sit at 6.2 for a protan reader, so hatch
one when a chart sets them side by side. A chart takes them in order. `.is-hatched` on a `.bar` or `.legend-item` adds stripes, a
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
teal, mauve and lavender, blue and sapphire. Series 4 and 5 are the one
allowed pair, as above. A reader with a red-green
deficiency loses the warm family first, which is why every status tone
also carries a word and a shape. A mark that carries a word and a glyph
may sit beside its own hue family, because the word and the glyph tell
the two apart; [Special cases](#special-cases) names them.

Red beside mauve gets its own pairing rule, because danger and the
primary are both pale fills on a dark page: red and mauve sit at dE 12.5
in OKLab and 1.14:1 in lightness. A solid danger mark, `.tag.is-solid`
in the danger tone, does not share a band or a row with the primary. It
belongs in a status column, and a figure in the band that holds the
primary takes the washed danger tag. Where the two still share a view,
three things tell them apart: the tag's word, its glyph, and the plate
and gloss that only the primary has.

The status roles get the same audit. Under full-severity protan and deutan
simulation, warning and success, yellow and green, are the one pair that
collapses: dE 2.9 for a protan reader and 6.6 for a deutan one. Every
other pair of the four stays at 10.7 or more. The triangle and the checked
circle, and the word, tell those two apart. An svg that replaces a status
glyph must keep a shape distinct from the other three.

### Fill ramp and grain

Solid accent fills paint `--cn-fill-ramp` instead of a flat color: the
primary button, the checked checkbox, the switch paddle when on, `.mark`,
the progress fill and chart bars. The ramp lights `--cn-fill` from the top left at
165deg. It starts at lightness +.035, passes the fill at 50% and ends at
lightness -.045 with chroma +.015. `--cn-fill` is the accent, or mauve on
the primary, checkbox and switch, a bar's `--series`, and pink on primary
hover. It is a
registered `<color>`, so the hover transitions. Without relative color
support the flat `--cn-fill` stays.

Every ramp but the switch paddle's and the bars' carries grain in a `::before` under its
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
| `--neu-raised` contact | 1px 1px | 1px 1px | 1px 1px. The panel's ink border side adds 1px, so a panel shows 2px of ink at every density: under the default and cozy plates and level with the compact one, where it reads apart by its near shadow and cast |
| `--cn-radius-panel` | 16px | 16px | 12px |
| `--band-h` | 64px | 52px | 44px |
| `--band-pad` | 12px 24px | 8px 24px | 8px 16px |
| `--band-title-size` (cozy keeps the title size, which a 52px band holds, so a panel title is one size in every default and cozy view) | 20px | 20px | 14px |
| `--lead-title-size` (20px at 655px and under, where display-sm is under 34px) | 28px | 28px | 20px |
| `--lead-band-h`, the lead panel's header band | 72px | 60px | 48px |
| `--lead-pad`, the lead panel's header and footer inline padding, its body padding and a filling table's outer columns | 32px | 24px | 16px |
| `--body-pad` | 24px | 16px 24px | 12px 16px |
| `--cell-pad` | 12px 16px | 8px 12px | 4px 8px |
| `--cell-font-size` (the table head, cell text and the name cell's meta line) | 14px | 14px | 13px |
| `--chip-pad` | 8px 12px | 4px 12px | 4px 8px |
| `--well-pad` | 12px 16px | 12px 16px | 8px 12px |
| `--empty-h` | 260px | 180px | 120px |

Fixed sizes that ignore density: checkbox and radio 20px, switch 50x28,
avatar 32px (44px large), mark 28px, the command's copy control 34px. Wrap
a checkbox, radio or switch in `.choice` so the label row is the target.

Under `pointer: coarse`, `--control-h` is 46px and `--control-h-sm` 44px
at every density, the touch target Apple and WCAG 2.5.5 ask for. Field
text is 16px there at every density, a literal `1rem`, because iOS
Safari zooms the page when a focused field's text is smaller.

### Motion

- `--ease-out: cubic-bezier(.16, 1, .3, 1)` for anything that answers the pointer or arrives.
- `--ease-in: cubic-bezier(.7, 0, .84, 0)` for anything that leaves.
- `--ease-spring` for anything that returns. Where `linear()` works it is a damped spring that settles with one 8% overshoot; elsewhere `cubic-bezier(.3, 1.4, .4, 1)`.
- `--t-press` .08s, `--t-exit` .14s, `--t-fast` .16s, `--t-base` .22s, `--t-slow` .32s.
- Duration follows distance. Up to 4px of travel (a press, a lift, a settle) takes `--t-press` or `--t-fast`; up to about 24px (a toast, a modal's rise) takes `--t-base`, except the tab pill, which slides on `--t-fast` because it moves on every tab change; an element that crosses the viewport, the drawer, takes `--t-slow`. Exits take `--t-exit` at any distance.
- Frequent controls press without a hover lift. Controls used many times in one view (ghost, icon and text buttons, tabs, table and ranked rows, menu items) answer the pointer with a fill or a color and press when held. Only plated controls and `.cn-pressable` lift 1px on hover.

Route changes: a consumer that opts in with `@view-transition { navigation: auto; }` gets a root cross-fade over `--t-base` on the ease-out, cut under reduced motion. A single-page app gets the same cross-fade by running its route change inside `document.startViewTransition()`, as the showcase router does for link clicks and for back and forward. That cross-fade is the exit that pairs with `.page-enter`: the old view fades out as one piece while the new view staggers in, and there is no exit keyframe or exit stagger. A browser without view transitions swaps the views with no exit. `.cn-morph` on the lead panel and on the page's one primary names them `cn-lead` and `cn-primary`, so they morph between routes instead of cross-fading, at the same `--t-base` on the ease-out, also cut under reduced motion. It is opt-in per element: two elements with one name abort the whole transition, so put it on one primary per page.

A press goes down on the ease-out in `--t-press` and comes back on the
spring in `--t-fast`. Entrances take the ease-out. Exits take the ease-in in
`--t-exit`. Keyframe loops keep literal durations.

State changes use transitions, so a change reversed mid-flight retargets
from where the element is: a press released early springs back from its
current depth, and a toggle flipped back reverses from its current place.
Keyframes run only for page-enter and the loops (the spinner, the caret,
the live dot, the skeleton), and those restart.

The package ships no haptics. CSS cannot vibrate, iOS Safari has no
Vibration API, and haptics belong to the consumer or a native shell.

### Data changes

Data moves less than chrome. A reader is comparing numbers, and travel
pulls the eye off them.

- Progress eases to its new width over twice `--t-slow` on the ease-out, so a bar decelerates into the value.
- A changed number swaps in place. Values are tabular, so the width holds. Never count up or tween a figure.
- Content that replaces a skeleton, and a row that a live list inserts, take `.cn-arrive`: a fade and a 2px settle over `--t-fast`. The whole set arrives at once.
- A loading table keeps its head and its row count, with a skeleton in each cell, so the rows land where the skeletons were. An optimistic row shows at once with the values the reader entered and swaps in place on confirm, like any changed number. If the save fails it leaves at once, like any removed row.
- A removed row leaves at once. A dismissed toast or a closed overlay is the only exit that animates.
- A reorder the reader asked for (a sort, a filter, a page) cuts. A reorder that arrives from elsewhere may use a view transition with a `view-transition-name` per row, at `--t-base` on the ease-out.
- A tab change is a change the reader asked for, so the tab panel cuts to the new content. Only the selected tab's pill slides, over `--t-fast` on the ease-out.
- A filter that empties a table cuts to the `.empty-state` with no `.cn-arrive`, like any reorder the reader asked for.
- A layout change works the same way. A panel that grows because the reader opened something follows them; the accordion's height transition is the model. A layout that shifts on its own (a column appears, a banner lands above content) runs a view transition with names on the moving regions, at `--t-base`, so nothing jumps under the pointer. Never animate width or height on a box that holds text.
- `.page-enter` is the one stagger, for a view's first render: five steps 40ms apart, then everything from the sixth child on together, so no reveal runs past .2s plus `--t-slow`. Its exit is the route view transition under [Motion](#motion): where the browser supports view transitions, the outgoing view cross-fades as one piece over `--t-base`. A staggered exit would hold every navigation back, so there is none.
- Under reduced motion all of these land at once.

### Hard offset and the half-slide

A clickable control may rest on a plate. `.btn-primary`, `.btn-secondary`,
`.segmented > *` and a link-wrapped `.accent-card` share one rule:

- rest: `--cn-plate`, the plate color stacked at a quarter, half, three quarters and all of `var(--hard-offset)` on both axes, no blur, so the corners join into the solid side of a block rather than leaving the notch of a single offset copy
- hover: `translate(-1px, -1px)`; the secondary and a link-wrapped accent card also deepen the plate 1px to `--cn-plate-hover`
- held: translate by half the offset, and the plate shrinks to the same half, `--cn-plate-half`, with the same four layers so the press interpolates
- timing: down in `--t-press` on the ease-out, back in `--t-fast` on the spring

`--hard-extra` holds shadow layers drawn over the plate, such as the primary
gloss. `.cn-hard` with `.cn-pressable-slide` draws the same press. Primary
buttons never soften the offset. The fixed plates step in 1px layers:
`--cn-plate-sm` to 3px and `--cn-plate-lg` to 10px. Every layer is the same ink, so the plate is the same color and
reach as a single offset; only the corners fill in.

The light is physical, not logical. Every shadow, plate, carve and ramp
answers one light at the top left, so plates fall down and to the right in
right-to-left pages too. Layout mirrors; the light does not.

### Composition

A view is built from three gaps and one grid, so pages line up with each
other.

Compose a view in this order:

1. `<a class="cn-skip-link" href="#main">Skip to content</a>` as the first focusable element on the page, with `id="main"` and `tabindex="-1"` on the `main` it targets, so focus lands there. CSS cannot insert the link, so every page adds it in markup.
2. `.page-main` holding a stack 48px apart (`cn-gap-48`).
3. A `.cn-split.cn-top` holding a stack of the title and the lede, then the view's one primary. The primary sits on the title line, and when the split wraps on a narrow screen it lands after the lede, never between the title and the copy.
4. The key figures on the ground, in a `.stat-grid.is-ruled`.
5. One `.panel.is-lead`, the thing the view is about.
6. A `.cn-grid-12` row of 8 and 4: the data first, the aside last, tilted, in prose.
7. At most three raised panels in any region.

The [ornament budget](#ground-rules) and the [depth model](#depth) say
what each piece may wear. The rules below give the reasons.

- The page column is `.page-main` at `--page-width`, with `--page-gutter` inline and `--page-pad` above and below.
- Regions of a view (a header, a stat band, a row of panels, a table) are `--space-7` (48px) apart. Panels inside a region are `--cn-grid-gap`, `--space-5` (24px), apart. Content inside a panel is `--body-pad`: use `.panel-body`, not fixed padding utilities, so it follows density.
- A region holds at most three raised panels. More items go in one panel, a ruled grid on the ground, or a table, so raised stays a rank and not a texture. Supporting figures beside a data panel go on the ground under a section heading, not in a panel of their own, so the row reads in three levels: the data panel, the tilted aside, the figures on the ground. The ground figures take one form per section, a `.stat-grid.is-ruled` or `.stat.is-inline` rows in a `.cn-divide`, never both, so a column holds one containment style under its aside.
- Lay a region's panels on `.cn-grid-12`, one row per grid: a 7 and 5, an 8 and 4, or three 4s. Start a new grid for the next row. Equal-column sets may use `.cn-grid-2/3/4`. Pair panels of similar height in a row, or stack a second short panel in the shorter column with `.cn-stack`, rather than stretching a panel into an empty tail. A ground-level stack beside a panel packs to the top: its children stay `--cn-grid-gap` apart, and any slack falls at the end of the column, never between its children. A gap wider than the grid gap under a short aside reads as a hole, so do not stretch the stack or part its children to reach the panel's bottom line. If the slack at the end reads as a tail, change the split, say from 7 and 5 to 8 and 4, so the aside's prose wraps taller. Every grid reads `--cn-grid-gap`; a grid of small items, not panels, composes `.cn-gap-16`.
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
- `html` keeps `scrollbar-gutter: stable`. Smooth scrolling is on `html:focus-within` only, so a fragment link followed from a focused link glides, while a route change's `scrollTo` and find-in-page cut.
- `.scroll-well` sets the dark scrollbar color.
- Six keyframes: `enter`, `spin`, `pulse`, `blink`, `breathe`, `cast`.
- `.page-enter` is opt-in. It animates its children 40ms apart on the ease-out over `--t-slow`. The sixth child and later share a .2s delay. Fill is `backwards`, so no child stays a containing block for fixed overlays. Put it on a view's first render, not on every route change in an app.
- Reduced motion removes movement, not feedback. Animations and transitions run in .01ms with no delay, so presses, slides and page-enter land at once. View-transition pseudo-elements are cut by name, since the universal selector does not reach them. Popovers, toasts, dialogs, drawers and tooltips still fade over `--t-fast`, in place, with their travel and scale dropped. `.spinner` and a busy button keep a 2.4s spin. `.skeleton` holds still at .85 opacity, the midpoint of its breath.
- More contrast (`prefers-contrast: more`, or `data-contrast="more"` on the root element for a page that offers the step as a toggle; the two blocks declare the same tokens and lint holds them equal): each text role moves one stop lighter, `--edge` is overlay-0 (3.4:1, so a panel gets a 3:1 boundary), `--edge-strong` overlay-1 (4.4:1), `--edge-soft` solid surface-1, `--control-edge` and `--cn-fg-disabled` overlay-2, a resting field closes `--cn-field-ring`, and the tabs carve and a disabled field `--cn-carve-ring`, into a full overlay-2 ring, wells and the mono wells close `--cn-well-ring` into a surface-2 ring, `--neu-dark` deepens to .88, `--neu-shade` to .86 and `--neu-near` to .9, link underlines go solid, disabled opacity is .8, the grain goes, and the tilted panel stands upright on its plate, since rotated text renders soft.
- Reduced transparency: the topbar and folded sidebar go opaque, and the scrim stops blurring and darkens to crust at 88%.
- `p` and `li` wrap with `text-wrap: pretty`.
- Touch (`hover: none`): hover lifts on plated controls and `.cn-pressable` do not run, so a tapped control does not stay lifted. The press still runs.
- Forced colors: focus draws a `Highlight` outline. The checkbox, radio and switch draw a `CanvasText` edge, and so do carved fields, wells, the mono wells, tabs, stepper pills and the progress track. Checked and indeterminate states fill with `Highlight`. Engaged states (segmented, toggled ghost, the current page, `.cn-engaged`), the selected tab and a selected listbox option draw a `Highlight` rim, and the checks of a selected option or a checked menu row paint `CanvasText`. The current sidebar link's spine draws in `Highlight`.

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
| `.cn-label` | label | subtext-1 |
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
- Backgrounds: `.cn-bg-page` (`--cn-surface-page`, mantle), `.cn-bg-base`, `-mantle`, `-crust`, `.cn-bg-well` (`--cn-surface-sunken`), `.cn-bg-head` (`--cn-surface-band`), `.cn-bg-raised`, `.cn-bg-overlay`, `.cn-bg-recessed`, `.cn-bg-hover`, `.cn-tint`, `.cn-tint-accent` (accent at `--cn-step-wash` into mantle, fading to mantle at 48%).
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
- Modifiers only add: `.cn-between`, `.cn-center`, `.cn-end`, `.cn-top`, `.cn-baseline`, `.cn-wrap`. They also realign a `.cn-split`: `.cn-split.cn-top` puts both groups on the top line.
- Children: `.cn-grow` (flex 1, `min-width: 0`), `.cn-fixed`, `.cn-min-0`, `.cn-auto-l`, `.cn-mx-auto`, `.cn-w-full`, `.cn-fit`, `.cn-block`.
- `.cn-split`: two groups at opposite ends (gap 12 by 16) that wrap onto two lines when they no longer fit; the first takes the slack. A page or panel header with actions. A `.cn-lede` directly inside the first group does not widen it (`contain: inline-size`), so a header wraps on its title's width, not on the length of its copy. The rule needs an `h1`, an `h2`, a `.cn-display`, a `.cn-heading` or a `.cn-title` before the lede in the same group. A lede alone keeps its width, because without a title the group would have none and the split would squeeze the lede and never wrap.
- `.cn-measure`: a centered column at `--cn-measure`.
- `.cn-with-side`: a side of `--side-w` (16rem) beside fluid content. They stack when the content would drop under 60% of the row, with no breakpoint, so it works inside any container.
- `.cn-grid-12`: the page grid, twelve columns `--cn-grid-gap` (24px) apart. Children span with `.cn-span-3/4/5/6/7/8/9/12` and keep their content height (`align-items: start`), for the same reason the tilted panel does: a stretched panel shows an empty tail. Each `.cn-grid-12` holds one row. At 1060px and below, or in a `.cn-container` that narrow, splits go to halves, and a 9 and an odd last child take the row: a 7 and 5 or an 8 and 4 go to 6 and 6, four 3s go two by two, three 4s fold to two and one, and a 3 after a 9 takes the row. At 760px every span takes the row. In an `.app-shell.has-sidebar`, put `.cn-container` on the page column, so the step answers the column's width rather than the viewport's.
- `.cn-grid-2/3/4`: equal columns, gap `--cn-grid-gap` (24px). Compose `.cn-gap-16` for a grid of small items. Three and four become two at 760px; all become one at 520px. Inside a `.cn-container` (`container-type: inline-size`) the same folds answer the container's width, so a grid in a sidebar folds on its own.
- `.cn-gap-*`, `.cn-p-*`, `.cn-mt-*`, `.cn-mb-*` on 4, 8, 12, 16, 24, 32, plus 0 on padding and margins. `.cn-gap-*`, `.cn-mt-*`, `.cn-mb-*` and `.cn-py-*` also take 48 and 64 for section rhythm. `.cn-px-*` and `.cn-py-*` from 8 up, plus 0. `.cn-m-0`, and `.cn-mx-auto` for centering. Horizontal margins otherwise come from gaps, never from a margin on a child.
- `.cn-divide`: a surface-0 hairline between children.
- `.cn-list-none`, `.cn-scroll-x`, `.cn-sticky-top` (top 0, z-index 2).
- `.cn-icon-sm/.cn-icon/.cn-icon-lg`: 13, 16 and 20px svg. Recipes size their own icons.

## Recipes

`css/recipes.css`, layer `cn.recipes`. Recipes read tokens and contract
properties only and never style bare elements.

### Surfaces

- `.panel`: the main container. A 1px border, `--edge` on the top and left and `--neu-ink` on the right and bottom, where it joins the 1px contact as a 2px ink foot, panel radius, the raised fill (base, a step above the mantle page), `--neu-raised`, no padding. Under `prefers-contrast: more` or `data-contrast="more"` all four border sides are `--edge`.
- `.panel.is-tilted`: rotated 1.2deg, on the clickable's hard plate (`--cn-plate`: 4px, 3px at cozy and 2px at compact) under the lit edge, with no raised shadow since the plate replaces the cast, short enough that the aside never outweighs the data panel beside it, `align-self: start` so a grid row never stretches it into an empty tail. Flat at 1060px and below, and upright under `prefers-contrast: more` or `data-contrast="more"`. It holds prose with a heading in the name role: no table, form or ruled rows. Its prose, `.cn-copy` and `.cn-prose` included, sets at 15px (.9375rem, the compact body size) on the body leading: the panel sets `--cn-type-body-size` to 15px for its subtree, since rotated 14px text renders soft at 1x.
- `.panel-header`, `.panel-footer`: bands `--band-h` tall with `--band-pad`. Both sit on the panel's fill. The header has a bottom divider and the footer a top one. A band holding `.band-actions` wraps; the cluster is right-aligned and wraps inside itself. Other bands stay on one line. An `h2` in a header takes `--band-title-size`; in the lead panel it takes `--lead-title-size` at the heading weight and tracking. At 520px both step down to the body size.
- `.panel-body`: the content band, `--body-pad`.
- `.panel.is-lead`: the panel a view is about, at most one per view. The base fill with the `--edge-strong` hairline on its top and left and `--neu-ink` border sides on its right and bottom, on `--neu-lifted`, the 9px step of the [foot ladder](#depth), a header band `--lead-band-h` tall (72px, 60px cozy, 48px compact), `--lead-pad` (32px, 24px cozy, 16px compact) on its header and footer inline, around its body and on the outer columns of a table that fills it, directly or through a `.table-scroll` or a tab panel (above 760px), and a band title at `--lead-title-size` (the heading size, 28px, or the title size at 655px and under) at 700, so it outranks its neighbors by height, by its title and by its room, not by an ornament. Its one step in line strength is the hairline ladder, `--edge-strong` over `--edge`, with no bright rim, lip or dark outline on top. The deeper foot carries the rank, because a longer cast barely shows on a dark page.
- `.panel.is-shell`: drops its chrome at 760px so a phone page runs edge to edge.
- Band corner rule: a filled first or last child of a rounded surface takes the parent radius minus 1px on its outer corners. This covers popover children, and tables or ranked rows at a panel's edge, through `.table-scroll` too. Never fix corner bleed with `overflow: hidden`; it clips popovers and plates.
- `.well`: card radius, the sunken fill, and `--cn-well-ring` over `--neu-inset`. The fill, crust, puts it below the ground on the page and in a panel; without it the carve read as an outlined panel at 1x. The ring is a quiet even hairline halfway between surface-0 and surface-1, 1.7:1 on the fill, with no lighter side. `.well.scroll-well` fades its bottom 34px with a mask.
- `.terminal`, `.codeblock`, `.command`: the mono wells. Card radius, the sunken fill, `--cn-well-ring` over `--neu-inset`, the code role in `--cn-fg-soft`, no border, no ligatures.
- `.empty-state`: a centered column at least `--empty-h` tall, subtext-0 (`--cn-fg-muted`). An `svg` first child sits on a 56px carved round. Children stack 8px apart, and a `.btn` or `.btn-text` action adds `--space-4` above itself, so it stands 24px under the copy. `.is-fill` fills its pane instead, with a 4px gap and 12px above the action.

### Buttons

Compose `btn` with a variant. `<a class="btn">` works. Heights come from
the density knobs.

- `.btn`: `--control-h`, 16px inline padding, control radius, the ui role (14px at 600). Svg 16px.
- `.is-sm`: `--control-h-sm`, the label size (14px), svg 14px. `.is-lg`: `--control-h` plus 12px, the body size (16px), svg 18px. One `.is-lg` per page.
- `.btn-primary`: the mauve ramp under grain, `--cn-fg-on-accent` (crust) text, a transparent border and a plate of mauve 25% into surface-0. The gloss is a white rim at .3 on top and crust at 22% along the bottom 2px. Hover moves the ramp to pink.
- `.btn-secondary`: raised fill, `--edge` border, the `--neu-ink` plate. Hover warms the border toward mauve (4.1:1 on base) and deepens the plate 1px to `--cn-plate-hover` under the lift. The fill stays base, because nothing raised is lighter than base.
- `.btn-ghost`: no fill and no plate. At rest it has an `--edge-soft` hairline, surface-1 at 38%, 1.22:1 on a panel and 1.24:1 on the page, so it reads as a control beside a plated button and not as a bold label. Hover adds `--hover` and steps the hairline up to `--edge`. Nothing at rest is brighter than `--edge`. In `.topbar nav` and as an icon button (`.is-icon`) it has no resting hairline, so a nav row or an icon toolbar is not a row of boxes. Held, it sinks onto `--neu-inset-soft`. With `aria-pressed="true"`, `aria-current` or `aria-expanded="true"` (a toggle whose menu is open) it wears the engaged state, and keeps it under the pointer.
- `.btn-ghost.is-dashed`: a dashed surface-1 border, card radius, a faint fill. Hover goes mauve. It marks an open slot such as a drop zone.
- `.btn-ghost.is-danger`: red text, a red wash at `--cn-step-wash` on hover.
- `.btn.is-icon`: a `--control-h-sm` square, its glyph in subtext-0 (`--cn-fg-muted`, 7.4:1), because the icon is the control's only visible label. Hover tints toward `--tone`, info blue unless a `.cn-tone-*` on it or an ancestor sets one. `.is-icon.is-lg` is a `--control-h` square with a 20px svg. `.btn-secondary.is-icon` is a plated icon button for an icon beside plated buttons: it keeps the secondary's `--cn-fg` glyph, hover and plate press instead of the tone tint.
- `.btn-text`: inline mauve text at 14px 600 with no padding, so a button and an anchor sit flush with the content edge, pink on hover. Held, it moves 1px. Svg 13px. It is a standalone action in a row, footer or toast. A link inside running prose is a plain `a`, which takes the global link style at the prose size.
- Disabled: `--disabled-opacity` and `not-allowed`. No disabled button or button chip keeps a plate, since a plate says the block can be pressed. The secondary drops its plate and lit edge and its outline falls to `--edge-soft`, a flat dimmed outline on the base fill like the disabled file button; a busy secondary keeps its plate. The primary instead goes flat and sinks. It drops the plate, ramp, grain, gloss and edge, keeps a transparent 1px border so the size holds, and takes the sunken fill under the soft carve, `--cn-well-ring` over `--neu-inset-soft`, the depth of a disabled field, so it reads as an empty slot pressed into the page beside the disabled secondary's flat outline, and stays shallower than any press, so it never reads as held. The ring is the well's quiet even hairline, 1.7:1 on the fill. Darkness only, no lip and no dashed edge, since dashed marks an open slot; `prefers-contrast: more` closes the well ring into surface-2. `--cn-fg-disabled` text, 5.1:1 on the sunken fill, at full opacity, so it never reads as a second primary or outshines a live secondary. A busy primary keeps its fill. `aria-disabled="true"` looks the same, skips hover and press, and stays focusable, so a `[data-tip]` on it can say why the action is unavailable. The consumer ignores its clicks.
- Busy: `aria-busy="true"` clears the label so the width holds, hides any svg, and turns a 16px spinner (14px on `.is-sm`) in the label's place: `--cn-fg` ink on a surface-2 ring, crust on the primary. The spinner reads `--btn-busy-ink` and `--btn-busy-ring`, so a variant can re-key it. Clicks stop and focus stays. Use it with `aria-disabled`, not `disabled`, which would drop focus mid-action.

### Inputs

- `.field label`: the label role in subtext-1 (`--cn-fg-soft`), 8px above the control.
- `.input` and `.field input/select/textarea`: a carved well. No border, transparent, `--cn-field-ring` over `--neu-inset` (2.1:1 on a panel; inside a popover, modal or drawer the ring is `--cn-field-ring-overlay`, 2.1:1 on the overlay fill), `--control-h` tall, 16px inline padding, card radius, 14px at 500, tabular. Under `pointer: coarse` the text is 16px, a literal `1rem`, at every density, in a table cell too, so iOS Safari does not zoom the page on focus. Hover, unless the field is disabled or focused, swaps `--cn-field-hover-ring` into `--cn-field-ring`, a full 1px `--control-edge` ring at 4.8:1 on the page, 4.4:1 on a panel and 3.5:1 on an overlay. A focused field keeps its resting hairline, so the focus ring is the only bright ring around it.
- Placeholder `--cn-fg-placeholder` (overlay-2): 6.2:1 on the page, 5.8:1 on a panel, 4.6:1 on an overlay.
- Focus: the global ring, on pointer focus as well as keyboard focus, since typing follows either way. Under the pointer, select options and menu rows light with `--hover` and no outline. A checked option wears `--wash`, so it outranks the hovered one. Under the keyboard they also draw the ring, inset 2px.
- Textarea: at least twice `--control-h`, vertical resize.
- Select: a chevron, `--cn-chevron-image`, a data URI in the overlay-1 hex, 12px from the right. Where `appearance: base-select` works, the picker is a floating card; the checked option is mauve on `--wash`.
- `.input-lg`: `--control-h` plus 12px (58px), the lede size (18px), on a bare `.input` or inside a `.field`. One per page.
- `.input-icon`: an 18px leading icon at 16px; the input pads to 44px.
- `.field small`: help text in the meta role, subtext-0 (`--cn-fg-muted`).
- Validation: `aria-invalid="true"` on the control sets `--tone` to red; `.is-warning` sets `--cn-warning` (yellow). The well takes `--tint` and a 1px ring in the tone at rest and under hover, and the help text moves up to `--cn-fg-body` and leads with the 12px glyph in the tone (`--cn-glyph-danger` or `-warning`). The label keeps `--cn-fg-soft`; only the glyph, the ring and the tint carry the tone. The carve and focus ring stay.
- Validation also needs `aria-describedby` from the control to its `small`, so the message is read with the field.
- Disabled: `--cn-fg-disabled` text and placeholder (4.4:1 on a panel, under 4.5:1 on purpose so a disabled value reads below a placeholder; WCAG 1.4.3 exempts inactive controls), no opacity, `--cn-carve-ring` over `--neu-inset-soft`, no hover ring. The field's label takes the disabled color too.
- In a table cell (`.data-table td .input`): the inline edit. `--control-h-sm` tall, 12px inline padding, control radius, `--cell-font-size`, and the soft carve, `--neu-inset-soft`. It has no label above it, so it names itself with `aria-labelledby` pointing at its column header (and the row's name cell), and takes `--cn-field-ring` over the soft carve like any resting field. Hover and focus ring it like any field, and validation, disabled and read-only still apply.
- Read-only (`readonly`): the value in `--cn-fg-soft` with no carve or fill, square corners and an `--edge` rule underneath, so it reads as printed text and only editable fields look cut in. Focus still rings it, at the control radius.
- Combobox (`input[role="combobox"]`, on `.input` or in a `.field`): a text field that opens a listbox. The field carve and every field state, with the select's chevron in the trailing padding. Give it `aria-controls` naming the listbox, `aria-expanded` and `aria-autocomplete`. The listbox sits on a `.popover`.
- `.listbox` (`role="listbox"`): `[role="option"]` rows on a `.popover`, or standalone in a carve with `.well`. Rows are menu rows: `--control-h-sm`, 14px at 500 in `--cn-fg-soft`, `--hover` under the pointer and on the active row (`data-active`, the row `aria-activedescendant` names), `aria-selected="true"` on `--wash` at 600 with a mauve check, and `aria-disabled` at `--disabled-opacity`. Under the keyboard the active row draws the focus ring inset 2px, and a focused listbox hands its own ring to that row. It scrolls past `min(320px, 50vh)`. `listbox()` in `catppuccin-neu/js` keeps the active row and selection in step.
- Date (`type="date"`, `datetime-local`, `month`, `week`): the field carve and its states as they are; the picker glyph is `--cn-calendar-image` in the overlay-1 icon color.
- File (`type="file"`): `::file-selector-button` is a small secondary-shaped control inside the field carve, `--control-h-sm` tall and inset evenly: the raised fill, the `--edge` hairline, the lit edge and the 3px ink plate, `--control-edge` on hover and the half plate when held. The field's hover, focus, disabled and invalid states cover the whole field; disabled drops the button to `--cn-fg-disabled` on `--edge-soft` with no plate.

### Tooltip

`[data-tip]` draws a bubble from the attribute: max 240px, control radius,
`--edge-strong` (surface-2) border, `--shadow-pop`, the meta role. It shows on hover, on
keyboard focus, and while a control inside it has keyboard focus, after
.4s, and rises 2px. On leave it lingers for `--t-slow` before fading, so the pointer can cross onto the bubble, which keeps it open (WCAG 1.4.13, hoverable); Escape hides it at once. CSS alone does not hide a tip on Escape: a CSS-only consumer must add the listener below or call `tooltips()` from `catppuccin-neu/js` (see [Behavior](#behavior)), or the tip fails WCAG 1.4.13. Never use `title=`.

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

- `.segmented`: equal columns, gap 8. Options are `--control-h` plus 12px, control radius, raised fill, and rest on the `--neu-ink` plate with the shared press. The chosen option (`.active`, `aria-pressed="true"` or `aria-checked="true"`) is the engaged state with a mauve `b` label. A `:disabled` or `aria-disabled="true"` option matches the disabled secondary: `--disabled-opacity`, no plate, an `--edge-soft` outline, `not-allowed`, no hover or press; a chosen one keeps the engaged carve and dims. `.is-stacked` makes rows `--control-h` plus 24px with lede-size (18px) labels.
- `.stepper`: inset pills (999px, well fill, `--neu-inset-soft`, label role, subtext-0 (`--cn-fg-muted`) text). `.active` or `aria-current="step"` is mauve on a mauve wash at `--cn-step-wash`. `.is-done` is green.

### Marks, chips, tags, banners

- `.mark`: a 28px square in the accent ramp under grain, a `--cn-fg-on-accent` (crust) glyph, a border of the glyph color at `--cn-step-wash`, control radius, `--shadow-mark`, 14px at 600.
- `.chip`: an outlined pill, `--chip-pad`, raised fill, the `--edge` outline, no shadow, label role in subtext-0 (`--cn-fg-muted`), svg 14px. A static chip is a flat label, so nothing about it says press: on a chip, raise and plate mean clickable. A chip that is an `a` or `button` is a clickable, so it stands on a plate: the hard offset in `--plate` under the lit edge, with the shared hover lift and half-slide press. On hover it also turns `--cn-fg` with a `--control-edge` border. Disabled or `aria-disabled="true"`, it matches the disabled secondary: `--disabled-opacity`, no plate or lit edge, an `--edge-soft` outline, `not-allowed`, no lift and no press. `.chip.is-glyph` is icon-only; keep an accessible name.
- `.tag`: a status tag in `--tone`. 4px padding, chip radius, label role, a 12px svg. A shallow carve in `--tone-wash`, no outline: `--neu-inset-soft`, darkness only with no lip, inside a transparent border that forced colors draws. The wash is 1.23:1 (red) to 1.37:1 (yellow) on a panel, and tone text on it 5.7:1 (red) to 9.4:1 (yellow); on the page the text reads higher, 6.2:1 to 10.2:1. The wash stays at `--cn-step-wash` (12%), not `--cn-step-engaged`: at 23%, red text on a tag over the overlay ground falls to 3.7:1, under the 4.5:1 a label needs. A toned tag marks a state that differs. A row's default or in-progress state, such as Pending, takes `.tag.is-quiet`, so a status column holds two fills, the wash and the one solid.
- `.tag.is-quiet`: the tag with no tone, no fill and no carve. A plain `--cn-fg-muted` label, 7.4:1 on a panel, 7.9:1 on the page and 5.8:1 on an overlay, with the tag's padding, transparent border, radius and label role, so the word lines up with the filled tags in its column. It draws no glyph and may bring a 12px svg in the word's ink. It has no hue and no box, so every toned tag outranks it and a column of tags never out-shouts the one that matters. It never takes a tone wash: hue is for a state that differs, and a neutral wash would be a lighter grey fill.
- `.tag.is-solid`: the one urgent status in a view, such as Overdue. The tone fills the tag, 7.1:1 (red) to 12.9:1 (yellow) on a panel, and the word and glyph take `--cn-fg-on-accent`: crust is 8.1:1 on red, 8.9:1 on blue, 12.6:1 on green and 14.8:1 on yellow. It keeps the tag's padding, radius and label role and drops the carve. It is a status mark, not a control: no plate, gloss, grain or raise, so it never reads as a button, and it takes a status tone, never mauve. One status per view is solid; the rest keep the wash, so danger outranks info by lightness as well as hue. A solid danger tag keeps out of the band or row that holds the primary, as [Data series](#data-series) says.
- `.banner`: a tinted band. 12px 16px padding, card radius, `--tint`, a `--tone-border` edge, `--neu-inset-soft`, the ui size, 14px, at 400 on the meta leading. A status banner's tint is 6%, `--cn-step-status-tint`: 1.10:1 (red) to 1.16:1 (yellow) on a panel, with the message at 8.0:1 or better. The message is `--cn-fg-body`, so the text stays text-colored; the 16px glyph, the edge and the tint carry the tone.
- Every tag and banner holds a word that states the status ("Past due", not a colored dot).
- A `.cn-tone-danger`, `-warning`, `-success` or `-info` tag or banner with no svg child draws its glyph first: `--cn-glyph-danger` (a crossed circle), `-warning` (a triangle with a bang), `-success` (a checked circle) or `-info` (a circle with an i), masked in the tone at 12px (16px on a banner). Bring an svg to use another shape. Palette tones draw none and may bring one. In forced colors the glyph paints `CanvasText`.

### Selection controls

- `.choice`: a label row, `<label class="choice"><input>Text</label>`, gap 8, 14px. When its input is disabled the label text takes `--cn-fg-disabled`; the control dims itself.
- `.checkbox`: 20px, chip radius, `--control-edge` border, `--neu-inset-soft`. Hover edge `--engaged-edge`. Checked is the mauve ramp under grain, a transparent border and a crust tick that lands on the spring from `scale(.4) rotate(-8deg)`. `:indeterminate` takes the same fill with a crust dash; set it from script and use it for a parent whose children are partly checked.
- `.radio`: the same well, round. Checked deepens to `--neu-inset` with a 9px mauve dot and a 3px halo at `--cn-step-wash`.
- `.switch`: 50x28, control radius, the sunken fill under `--neu-inset` with a 1px `--control-edge` ring. The plate is a filled carve, 1.14:1 under a panel and 1.07:1 under the page, so the base paddle stands a fill step above its track; neither paddle nor plate is ever lightened. The 21x22 paddle tilts 16deg at rest, with a 1px `--control-edge` edge, 5.1:1 against the plate around it, so off reads apart from disabled. Checked, it slides 23px on the spring, tilts the other way, takes the mauve ramp with a 2x8 crust bar at its center, the "I" of a wall switch, so on reads by a mark as well as color and position, and glows: `--cn-switch-glow`, an 8px blur of mauve at `--cn-step-plate` (25%) with no spread, so it lights the dark plate around the paddle as a soft bloom and never draws a ring. Held, it flattens; held while on, the glow blooms to 12px at `--cn-step-edge` (40%). Disabled, the paddle lies flat with no tilt and no raise, paddle and plate drop to the soft `--edge`, and the plate loses its sunken fill, so it never reads as an off switch. Disabled checkboxes and radios take `--edge` too. Every disabled checkbox, radio and switch dims to `--disabled-opacity` itself.
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
- Closed rows are flat with a divider. Open (`[open]`, a checked input in the label form, `.is-open` or `data-open`) is its own step, the open carve: card radius, full inset, mauve at `--cn-step-tint` into base (1.08:1) and a mauve title. It is not the engaged state: `--wash` behind the fold would drop body text to 5.7:1, under the 7:1 floor.
- The title row sets at `--cn-type-body-size` (16px, 15px compact) in the name weight, 600, on the name leading. It matches the answer in size and leads it by weight, by `--cn-fg` ink and by the mauve open state. It does not take the 20px title role, which would outrank a panel's band title in an `.accordion-stack`.
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

- `.avatar`: 32px round, accent at `--cn-step-wash` into mantle, an accent edge at `--cn-step-edge`, `--neu-raised-soft`, 14px at 600. `.is-lg` is 44px.
- `.avatar-stack`: overlaps by 8px and rings each avatar with `--ring-ground`.
- `.spinner`: a 16px ring with an accent top edge on `spin` at .8s.
- `.skeleton`: a carved placeholder for loading content. Control radius, the well carve: the sunken fill (1.14:1 under a panel, 1.07:1 under the page) and `--neu-inset`, darkness only with no ring. At least 16px tall, breathing to .7 opacity on `breathe` over 1.6s, so at its faintest it still sits 1.10:1 under a panel, past the 1.05:1 table head. Skeletons are `aria-hidden` inside an `aria-busy` region, so this is visibility, not a WCAG floor. `.is-text` is a 1em line with the chip radius; lines stack 8px apart and the last of several is 62% wide. `.is-round` is a 32px circle for an avatar. Give the loading region `aria-busy="true"` and the skeletons `aria-hidden="true"`.

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

- `.stat`: a label `span` over a value `strong` in the value role, with an optional note in a bare `p` under it. The label and the note share one voice, the label role in `--cn-fg-muted`, so a stat reads 14, 24, 14 and holds one small size at one weight; a `.cn-meta` on the note would drop it to 400, a second voice. `.is-lg` uses value-lg in the accent. `.is-inline` is a baseline row, label left and value (`b` or `strong`) right, both 14px: the label at 400 in `--cn-fg-muted`, 7.4:1 on a panel, and the value at 500 in `--cn-fg`, 11.3:1, a weight step and two ink stops apart as in `.kv`, so key and value do not read as one grey voice; stack rows in `.cn-divide`. `.is-inline.is-total` is the row the others add up to, placed after the `.cn-divide` list rather than inside it: the label in the name role and the value in the value role, both `--cn-fg`, under an `--edge` rule (1.85:1 on a panel against the 1.3:1 row hairlines) with 12px above and below the rule, so the total outweighs the rows over it. It stays text-colored; only the hero value takes the accent.
- `.stat-grid.is-ruled`: for stats on the page ground. Each stat hangs from a 2px rule on its start side, 16px in, so the row reads as one band without a panel. The rule is `--cn-stat-rule`, equal to `--edge`, 1.92:1 on the mantle page, so at twice the width it holds its weight beside a panel's hairline without stepping past the hairline ladder. Under `prefers-contrast: more` it lifts to surface-2 (2.6:1 on the page), between `--edge-soft` (surface-1) and `--edge` (overlay-0).
- `.stat-grid`: a grid of stats, `--stat-cols` across (4 by default) and two across at 760px and below. It never drops to one column. In a `.panel-body` an unruled grid's stats take no padding of their own, so they line up with the header title and the inline rows at every width.
- `.progress-track`: 7px, 999px, crust, `--neu-inset-soft`. The `span` fill is the accent ramp under grain; `--progress-fill` replaces the ramp. It eases its width over twice `--t-slow`. `.is-lg` is 12px.
- `.data-table`: the class scopes all table styling. Header cells: `--cell-pad`, head fill, the label weight at `--cell-font-size`, subtext-0 (`--cn-fg-muted`), over a 1px `--edge` rule, 1.85:1 on a panel and 1.9:1 on the head fill. The body rows part on surface-0, 1.3:1, so the head rule outranks them; the head fill alone is 1.05:1, one step under the panel. Body cells: `--cell-pad`, 400 at `--cell-font-size`, subtext-1, tabular, so a cell differs from a meta line by ink and from a name by two weight steps. A `strong` in a cell, such as an amount, is 500 in `--cn-fg`, marked by ink and right alignment, so the name cell is the row's one 600 and weight still marks what matters; a total keeps 600. `.cell-name` holds a 600 name over a meta line at `--cell-font-size`, 400 in `--cn-fg-muted`. Its `strong` and `small` are blocks, so the cell stacks them without a `<br>`. `.is-num` on a `th` and its `td`s right-aligns a numeric column; a sortable header keeps its label flush right and moves the chevron to its left. A loading table has no style of its own: set `aria-busy="true"` on the table, keep the head and the row count, and put an `aria-hidden` `.skeleton.is-text` in each cell, sized to its column. The loaded rows take `.cn-arrive`.
- Row hover presses the row: mauve at `--cn-step-row` (16%) into base, 1.39:1 on a panel, and the row's text steps from `--cn-fg-soft` to `--cn-fg`, 8.2:1 on the hovered fill, the ink step every `--hover` user and the selected row take, so the hover does not rest on the wash alone. Text that sets its own color keeps it: `--cn-fg-soft` is 6.7:1 and `--cn-fg-muted`, the name cell's second line, 5.3:1 while the pointer is on the row. The fill is level with the 1.40:1 hover, past the open carve's 1.08:1, and 1.18:1 under a selected row's 1.63:1 wash, plus a vertical gradient on each cell, dark at the top 5px and nothing at the bottom, since a press is a carve and has no light side. The edge color is registered with `@property` so it fades in. The 7:1 and 5.5:1 role floors are for text at rest. A hovered row is a passing state, so its text holds 4.5:1 instead, and lint checks that. A muted `kbd` on a hovered menu row over an overlay is the lowest case, 4.7:1. `tr[aria-selected="true"]` takes `--wash` and a deeper press.
- `th[aria-sort] > button`: a reset button with a chevron. The chevron hides while unsorted and flips for ascending.
- `.data-table.is-sticky-head`: header cells stick to the nearest scroll container, with the `--edge` rule drawn as an inset shadow, `--cn-sticky-rule`. Give the `.table-scroll` wrapper a `max-height` so it scrolls vertically and the header can pin. Body rows and the links, buttons, fields and `[tabindex]` elements in them take a `scroll-margin-top` of `--control-h` plus 4px, 50px by default against a 40px head, so a control that takes focus stops below the pinned head (WCAG 2.4.11).
- `.table-scroll`: scrolls a wide table sideways inside its wrapper. A table in it with no `td[data-label]` stays a table on phones.
- An `.input` in a cell is the inline edit; see Inputs.
- `td.cell-select`: a row-select checkbox cell. In phone mode it floats to the row's end.
- `td.is-trail`: a trailing cell for phone mode, such as the amount or the status. It leaves the label stack and rides beside the name: the last trailing cell sits on the title line, the one before it under it, and a `td.cell-select` at the far end of the title line. It keeps its `data-label` for the desktop header. On a desktop table it changes nothing.
- `.ranked-row`: a rank mark, a 600 name and a trailing value, with the same press. The mark shrinks to a 22px key at the label size, so a list of pastel accents reads as a key, not a row of competing tiles.
- `.bar-chart`: a label column and bar groups. `.bar-group` stacks `.bar` rows 4px apart; each `.bar` draws a 12px chip-radius bar, inside the 21px meta line so the row height stays, at `--value` of 80% of the track in its `--series` (or `--accent`), painted as `--cn-fill-ramp` without grain, so the top-left light lights its top edge, with the flat color where relative color is missing. Its value sits beside it as text in the meta role. Labels are meta in `--cn-fg-muted`. Bars ease to a new value over twice `--t-slow`.
- `.sparkline`: one measure over time. An inline row of a 96x24 `svg` (`aria-hidden`) and its value as text in the meta role in `--cn-fg-soft`, tabular, 8px apart. In a cell too narrow for both, the value wraps under the line. A `polyline` or `path` in it draws a 2px non-scaling stroke in its `--series` (or `--accent`) with round caps and joins; an optional `circle` marks the latest point in the same color. Each line scales to its own range, so it shows a shape, not a comparison between rows.
- `.legend` and `.legend-item`: a wrapping key. Each item draws a 10px swatch in its `--series` (or `--accent`), with a sentence-case label in the meta role.
- `.kv`: a `dl` grid at 14px, keys in a column that fits them. The key is 400 in `--cn-fg-muted`, 7.4:1 on a panel, and the value 500 in `--cn-fg`, 11.3:1, so the pair differs by weight and ink. Stacks at 520px.

### Overlays

All overlays float on `--shadow-pop`, never on neu depth, and fill with `--cn-surface-overlay`. `.popover`, `.modal` and `.drawer` set `--cn-field-ring` to `--cn-field-ring-overlay`, so a resting field inside one keeps a 2.1:1 hairline on the lighter fill. A `.panel` or `.well` nested in one sets it back to `--cn-field-ring-page`, the surface-2 ring.

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
- `.topbar`: sticky, `--band-h` plus 4px, `--page-gutter` inline, the page ground at 91% with a 14px blur, a hairline and `--shadow-cast`. A three-column grid. Where `animation-timeline: scroll()` works, the cast fades in over the first 60px of scroll. `.topbar nav` is a row of ghost buttons. `.is-split` is two regions, brand left and actions right. `.is-compact` is a 52px app strip, `--band-h` (44px) at compact density. A page that holds a topbar gets `scroll-padding-top` on `:root` through `:root:has(.topbar)`: the bar's minimum height plus 12px, which is 80px by default, 72px at 760px and below, and 64px for `.is-compact`. Focus, a fragment link and `scrollIntoView()` all stop that far short of the top, so the bar never covers a focused element or its ring (WCAG 2.4.11). A bar that grows past its minimum height needs the consumer's own `scroll-padding-top`.
- `.wordmark`: the name in the lede size (18px) at the display weight (700) with display tracking, because it is the brand, not a heading; `em` is the mauve half. A `.mark` before it is the brand tile (28px). `.is-lg` is 20px with a 34px tile. `.is-sm` is the footer brand at 14px: a 16px mauve glyph, the name, a mauve `b` suffix set .25em off the name, and an optional subtext-0 (`--cn-fg-muted`) note in a `span`.
- `.page-footer`: same width as the column, at least 72px, a surface-0 top rule, subtext-0 (`--cn-fg-muted`) text.
- `.display-title`: an alias of `.cn-display`. Both set `margin: 0`. `.lede`: the lede role, max `--cn-measure` (68ch), 24px above and below.
- `.app-shell`: a column at least the viewport tall; its `main` absorbs the slack so the footer sits at the bottom. `.is-fixed` makes the shell exactly the viewport and turns off the root's `scrollbar-gutter`.
- `.app-shell.has-sidebar` lays a `.sidebar` beside the content. The sidebar is `--sidebar-w` (264px) wide, the full viewport tall, sticky, on the recessed fill, a step under the mantle page, with an `--edge` rule on its inner side (1.92:1 on the page, up from the 1.24:1 `--edge-soft`, because the two fills are only 1.05:1 apart), and scrolls on its own. `.sidebar-head` holds the wordmark and a `.sidebar-toggle`; `.sidebar-body` scrolls. `.sidebar-nav` stacks groups 24px apart, each a `.cn-microlabel` over links at the ui size and 500 in `--cn-fg-muted`; hover is `--cn-fg` on the ghost wash and `aria-current="page"` is a position, not a press: 600 in `--cn-fg` with a spine, the 4px `--cn-interactive` bar of `.cn-spine` on the start edge, inset 8px to fit the row. No wash, rim or carve: the rank is the ink step from muted to `--cn-fg`, and the group that holds the current page lifts its microlabel to `--cn-fg` too, so the open section shows first. At 1060px and below the sidebar is a sticky blurred bar, the toggle shows, and the body opens under `.is-open`. The folded bar sets `scroll-padding-top` on `:root` through `:root:has(.sidebar)`, its closed height plus 12px, so focus and fragment links stop clear of it (WCAG 2.4.11). The body opens like an overlay: it fades in and settles 4px over `--t-base` on the ease-out and leaves on the ease-in over `--t-exit`, and lands at once under reduced motion. The breakpoint crossing itself does not animate. The consumer sets `.is-open` and `aria-expanded`.
- `.deck`: hash-routed views. The `:target` child shows, the first child is the default, and a deep link shows the view that contains it.
- `.live-dot`: a 7px green dot with a 4px halo at `--cn-step-wash`, pulsing every 1.5s on the ease-out.

### Tabs, menu, slider, pagination, breadcrumbs

- `.tabs` (`role="tablist"`): a shallow carve, `--cn-carve-ring` over `--neu-inset-soft`, holding `[role="tab"]` buttons at `--control-h-sm` in the ui role, `--cn-fg-muted`. The `aria-selected="true"` tab is the selected state, not the engaged one: it rises out of the carve on the raised fill with `--neu-raised-soft`, the lit edge and the `--engaged-edge` rim. That is the reverse of the segmented choice on purpose: a tab is a view and rises; a segmented choice is a setting and presses in. With `tabs()` wired, the raised fill is one pill, `.tabs::before`, that slides to the selected tab over `--t-fast` on the ease-out and lands at once under reduced motion; without it each tab draws its own fill. Roving tabindex and arrow keys come from `tabs()` in `catppuccin-neu/js`, or the consumer's own script.
- `.menu` on a `.popover` (`role="menu"`): `[role^="menuitem"]` rows at `--control-h-sm`, 14px at 500 in `--cn-fg-soft`. Hover and keyboard focus share `--hover`, 1.23:1 on the popover with the `--cn-fg` label at 7.3:1; keyboard focus also draws the focus ring inset 2px. An svg leads at 16px in `--cn-fg-faint`, a `kbd` trails as the shortcut, `aria-checked="true"` draws a mauve check, `.is-danger` is red with a red wash, `hr[role="separator"]` is an `--edge-soft` rule, and a `.cn-microlabel` heads a group. Once any row leads with an svg, rows without one and the group labels indent to the icon column, so every label starts on one line. Arrow keys, Home, End and Escape, with focus returning to the trigger, come from `menu()` in `catppuccin-neu/js`, or the consumer's own script.
- `.slider` (`input[type=range]`): a 7px carved crust track filled with `--cn-interactive` up to the thumb, and a 20px raised round thumb with a `--control-edge` rim and the lit edge that rims mauve on hover and shrinks to .92 when held. Firefox fills natively; elsewhere the consumer keeps `--value` in step. Pair it with a label and an `output`.
- `.pagination` (`nav`): square ghost targets at `--control-h-sm` with tabular figures, 14px at 500 in `--cn-fg-body`; `aria-current="page"` is the engaged state and steps to 600; a `span` is the ellipsis.
- `.breadcrumbs` (`nav > ol`): crumbs at 14px and 500, `--cn-fg-body` links, a 12px `--cn-fg-faint` chevron between them that flips in right-to-left text, and the `aria-current="page"` crumb in `--cn-fg` at 600, the weight step a sidebar link takes when current.

### Prose and skip link

- `.cn-prose`: an article from bare elements, the one recipe that styles bare elements and only inside itself. The body role at `--cn-measure`, 16px between blocks, `h2` in the heading role with 48px above, `h3` in the title role with 32px, `h4` in the name role with 24px, 12px under any heading, inline `code` in mono at .92em in `--cn-fg-soft`, a `blockquote` on a 2px `--edge-strong` inline-start rule, and `hr` as an `--edge-soft` rule.
- `.cn-skip-link`: the first focusable element. It sits above the viewport until it takes keyboard focus, then slides in at the top inline-start corner on the overlay fill with `--shadow-pop`.

### Writing direction

Recipes use logical properties (`padding-inline-start`, `margin-inline-end`, `border-inline-start`, `text-align: start`), so spacing and rules follow the writing direction. Positions, transforms and the switch travel are still physical.

## Behavior

The CSS reads ARIA state and never needs script to look right. What it
cannot do is keep that state and the keyboard model in step. Tabs, menus,
listboxes and comboboxes are required to have a keyboard model: either
`catppuccin-neu/js`, a framework-free module that follows the WAI-ARIA
patterns, or the consumer's own widget library. A stylesheet cannot run
script, so one tag wires them: a `<script type="module">` tag pointing at
`js/auto.js`, which the quick start prints in the same block as the
stylesheet link, or `import "catppuccin-neu/js/auto"` with a bundler. A
static page with none of those widgets can leave it out. `auto.js` wires every widget in the document
once the DOM is parsed, then watches the document, wires each widget
added later once, and removes the listeners of one that leaves. An app
that wants to choose the moment or keep the cleanup calls `init()`
instead; load one or the other for the same markup, not both.
Slider fill and toasts are optional. Each function returns a cleanup.

- `tabs(tablist)`: Left, Right, Home and End move focus and select (selection follows focus), mirrored in RTL. Only the selected tab is in the tab order. Each tab's `aria-controls` panel shows only while it is selected. Fires `cn-select`. On a `.tabs` carve it measures the selected tab into `--cn-tab-x` and `--cn-tab-w`, sets `data-cn-indicator` so the pill slides, and follows resizes.
- `menu(trigger)`: for a trigger with `aria-haspopup="menu"` and `aria-controls` naming a hidden `.menu[role="menu"]`. Click, Enter or Space opens on the first item, ArrowUp on the last. Arrows, Home and End move. Escape closes and returns focus. Tab or a press outside closes without moving focus. A `menuitemcheckbox` toggles `aria-checked` and stays open. `aria-expanded` on the trigger is its engaged state.
- `slider(input)`: keeps `--value` in step with the range.
- `listbox(list, { combobox })`: a `[role="listbox"]` of `[role="option"]` rows. Focus stays on the listbox, or on the combobox input that drives it, and `aria-activedescendant` names the active row, which also gets `data-active`. Up, Down, Home and End move it; Enter, or Space on a listbox, selects it (`aria-selected`, toggled under `aria-multiselectable`) and fires `cn-select`. With `combobox`, an `input[role="combobox"]`, ArrowDown, ArrowUp or typing opens the list; Escape, Tab, a pick or a press outside closes it, and a pick writes the option's text into the input. Filtering is the consumer's.
- `tooltips()`: Escape hides a showing `[data-tip]` until the pointer or focus leaves it (WCAG 1.4.13).
- `toast(stack, { title, body, timeout })`: appends a `.toast` with a dismiss button. The timeout runs only while neither the pointer nor focus is in the stack, and a toast appended under the pointer waits. A drag toward the end edge follows the pointer and dismisses past 80px or on a flick; short of that the toast springs back. The exit runs through `[hidden]`, then the node is removed.
- `init(root)`: wires every `[role="tablist"]`, menu button, `[role="listbox"]`, `[role="combobox"]` with `aria-controls` and `.slider` under `root`, plus `tooltips()`. It wires what is in the page when it runs.
- `catppuccin-neu/js/auto`: no exports. The same wiring for the whole document, run on `DOMContentLoaded` and again, once per frame at most, when nodes are added or removed. A menu trigger waits until the popup it names is in the page.

Disabled items are skipped everywhere. Focus return, outside-press and
Escape behave the same in every widget.

### Expected announcements

What a screen reader should speak for each widget, given the markup the
recipes document. These follow from the roles and states; nobody has yet
confirmed them with a screen reader, and readers differ in wording and
order. A human pass with NVDA and Firefox and with VoiceOver and Safari
on tabs, menu and combobox is still owed, and its reader, browser,
version and date go on the docs' Accessibility page.

- Tabs. Focus on a tab speaks its name, "tab", "selected" and its position, such as "2 of 3"; the first tab reached also speaks the tablist's `aria-label`. An arrow key moves focus and selection together, so the next tab speaks the same four things. A disabled tab is skipped and never spoken. Tab into the panel speaks the panel's name, taken from its tab through `aria-labelledby`, and "tab panel".
- Menu. The trigger speaks its name, "menu button" and "collapsed". Opening it speaks "expanded" or "menu", then the first item: its name, "menu item" and its position, such as "1 of 4". A `menuitemcheckbox` speaks "checked" or "not checked", and the new state when toggled. A disabled item is skipped. Escape returns focus, so the trigger speaks again with "collapsed".
- Listbox. Focus speaks the `aria-label`, "list box", then the active option: its name, "selected" when `aria-selected="true"`, and its position. Each arrow key speaks the newly active option the same way, though focus never leaves the listbox.
- Combobox. The input speaks its label, "combo box", "collapsed" and its value. ArrowDown speaks "expanded", then the active option's name and position. A pick writes the option's text into the input, which speaks "collapsed" and the new value.
- Toast. The stack is a polite live region, so a new toast's title and body are spoken once, after the current sentence, and focus does not move. Its button speaks the `closeLabel`, "Dismiss" by default, and "button". A dismissal is silent.
- Dialog. `showModal()` speaks the dialog's name, from `aria-labelledby`, and "dialog", then the control that takes focus. The page behind is inert and is not reachable. Closing returns focus to the control that opened it, which speaks again.

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
- a contrast pairing under its floor, computed from the tokens (hexes, `var()` and `color-mix` in srgb, transparent mixes composited) in the default and `prefers-contrast: more` values: `--cn-fg`, `-soft` and `-body` 7:1, `-muted` 5.5:1, `-placeholder` and every status role and link 4.5:1 on the page, raised and overlay grounds (the text roles also on the recessed and sunken fills, since the sidebar and the wells hold text); each status role 4.5:1 on its own tint and wash; the hovered field ring, focus ring, control edge and engaged rim 3:1 (the rim also on `--wash`), and the resting field ring 3:1 under `prefers-contrast: more`, on an overlay through `--cn-field-ring-overlay`; `--cn-fg-muted` and `--cn-interactive` 4.5:1 on the engaged `--wash`; the design floors for `--edge` (1.8:1 on the page and raised grounds, 1.5:1 on an overlay), `--edge-strong` (2.4:1 and 1.9:1) the lit edge (1.4:1 and 1.3:1), the resting field ring (2:1 on the page and raised grounds, and 2:1 for `--cn-field-ring-overlay` on an overlay) and the carve ring (1.7:1 on the page and raised grounds), with `--edge-strong` above `--edge` on every ground; the hover floors, `--hover` and the row hover (mauve at `--cn-step-row` into base) each 1.35:1 on base and each under the engaged `--wash`; `--cn-fg-soft` and `--cn-fg-muted` 4.5:1 on the hovered row, since the role floors above are for text at rest; the well ring 1.5:1 on the page, a panel and the sunken fill, and under the carve ring; `--cn-fg-on-accent` 4.5:1 on the primary and its hover
- a ratio in a token comment that is more than .06 off the computed ratio on base, or on the mantle page where the comment says "on the page"
- a `:root[data-contrast="more"]` block that does not declare the same tokens and values as the `prefers-contrast: more` block
- a layer of `--neu-inset` or `--neu-inset-soft`, in either mode, that falls from the bottom right or is lighter than the page, a panel or a well, since a carve is darkness only
- an APCA lightness contrast under its floor on the same grounds and in both modes: `--cn-fg` Lc 75, `-soft` and `-body` Lc 60 (APCA's level for content text), `-muted` Lc 50 and `-placeholder` Lc 40. Muted text holds labels and meta, never running copy, and a placeholder is never the only copy of a fact
- a `box-shadow` or `--hard-extra` in recipes or utilities that is not `none` or a comma list of `var()` tokens. Every layer has a name in `tokens.css`: the neu tokens, `--cn-lit-edge`, `--cn-field-ring`, `--cn-carve-ring`, `--cn-field-hover-ring`, `--cn-well-ring`, `--shadow-pop/cast/mark`, the plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`, `-tilt`), `--cn-primary-rim`, `--cn-gloss-inset`, `--cn-validation-ring`, `--cn-readonly-rule`, `--cn-sticky-rule`, `--cn-switch-ring`, `--cn-disabled-ring`, `--cn-halo-ring`, `--cn-live-halo`, `--cn-switch-glow`, `--cn-switch-glow-held` and `--cn-ground-ring`. The plates, the validation ring and the ground ring read `--plate`, `--hard-offset`, `--tone` or `--ring-ground`, so they are declared on the elements that draw them
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
5. No purpose-named classes beyond the slot names in [Special cases](#special-cases).

### Showcase

`showcase/` is a Preact and Vite site that imports `../css/index.css`
directly and deploys `dist/` as Cloudflare Workers static assets. It is the
visual reference: every recipe and state appears at least once, and every
page uses the current names. `src/nav.ts` registers routes, sidebar order
and titles. Specimens sit on the page ground, mantle, as they would in an app. Close buttons draw a 14px stroke
glyph, never a text character. Docs pages come from the kit in
`src/lib/doc.tsx`. Each page leads with its demo. The first `Demo` on a
page takes the `lead` prop: it takes the same frame and padding as every
other demo and leads by position, and nothing is added to it. `Doc` folds every
`p.cn-copy` that sits right before or after a `Demo` into a closed
`details.accordion` under that demo, titled by the demo's `why` prop. The
docs set that summary and the demo caption in one voice, the label role,
14px at 500 in `--cn-fg-muted`, so a docs page keeps 600 for headings and
controls; the summary's chevron and its place under the copy line tell the
two apart, and hovered or open it is mauve, as in the
package. Measured contrast ratios go in the `contrast` field of a `Props` row, which
adds a Contrast column to that table. The Values and Default columns work
the same way: a `Props` table drops a column that no row fills, so none is
a column of dots. A row demo shrinks only its stage to the specimens; the
caption, the copy line and the fold keep the column.
From 1448px a page with three or more h2 and demo titles starts 48px from
the sidebar and lists them in a sticky "On this page" nav on the right.
1448px is the first width where the 860px column fits beside the list:
264 sidebar, 48, 860, 32, 220 and 24. Below that width, and on the
examples, the column stays centered. The docs
column is 860px and the examples column 1040px. After each route change the
sidebar scrolls its current link into view. Run it with
`pnpm --dir showcase install && pnpm --dir showcase dev`; `pnpm --dir
showcase build` must pass.

`pnpm --dir showcase test:a11y` opens every route in Chromium and fails on
an axe violation (wcag2a through wcag22aa), by default and again under
`prefers-contrast: more`, on any box that clips its text under the WCAG
1.4.12 text-spacing override, on a focus ring that is not `Highlight`
under forced colors, on a transition or animation longer than 1ms under
`prefers-reduced-motion: reduce` (overlay fades and spinners excepted),
on sideways scroll or clipped text at 700px, the desktop at 200% zoom, on sideways scroll at 390px and 320px, on a parent holding more than three raised panels outside a docs demo stage, and on an example view with more than one primary, tilted panel or lead panel. axe covers WCAG 2.5.8 target size through wcag22aa. It saves
a forced-colors screenshot of every route to the ignored
`showcase/a11y-shots/forced-colors/` for review. It also captures `/depth`,
`/examples/dashboard` and `/examples/invoice` full page at 1400x900 and 1x
and fails when a capture changes size or more than 0.1% of its pixels
differ from the committed baseline in `showcase/visual-baselines/`
(pixelmatch, threshold .1). The baselines depend on the system Chromium
and fonts; `--update-shots` rewrites them after a deliberate change.
Each of the three captures is also saved to the ignored
`showcase/a11y-shots/dimmed/` at half the luminance under a 1.3 gamma,
as a dim, low-gamma display would show it. Nothing diffs those files.
Look at the panel hairline, the foot, the well ring and the sidebar rule
there before proposing a change to `--edge`.
A still capture cannot see motion, so the run starts with a motion check
in the default modes. It reads `getAnimations()`, not frames, which
flake. Each `.page-enter` child must run `enter` over `--t-slow` after
its step of the stagger: 0, 40, 80 and 120ms for the four children of
`/examples/dashboard`, and on through 160ms to the shared 200ms for the
children of the `/modal` docs page, which has more than six. An observer
installed before the page's script reads them in the task that renders
them. A modal on `/modal` and a toast on `/toast` are opened and
closed, and every transition they run must last `--t-base` on entry and
`--t-exit` on close. On `/tabs` the check wires a tablist with `tabs()`
from `js/index.js`, clicks the second tab and requires the pill,
`.tabs::before`, to move `translate` over `--t-fast`. On `/button` it
holds the pointer down on a primary and requires `transform` and
`box-shadow` to run over `--t-press`. `--motion` runs that check alone.
