# Changelog

One line per change, newest version first. [SPEC.md](./SPEC.md) describes
what ships now. This file records how it got there.

## 1.0.0

No visual or API change from 0.5.0. This release trims the files.

- The three CSS files lose about 70% of their comment lines, 213 KB to 156 KB in total. No declaration, selector or rule order changes.
- `SPEC.md` is cut to rules and tables, 137 KB to 81 KB.
- The 0.5.0 entry below is rewritten as the net change from 0.4.1.
- Showcase pages lose history and repeated reasoning. Demos and examples are unchanged.

## 0.5.0

**Breaking**
- Every name deprecated in 0.4.0 is gone. The [migration table](#migrating-to-040) maps each to its replacement.
- `--line`, `--muted` and `--soft` are gone. Use `--surface-0` or `--edge`, `--cn-fg-muted` and `--cn-fg-soft`.
- The sans is IBM Plex Sans in place of Inter. Pages link `IBM+Plex+Sans:ital,wght@0,400..700;1,400..700`.
- Type sizes are rem and most roles are larger, so re-check fixed-height rows. Type lists the sizes.
- The page ground is mantle. Panels and plated controls stay on base, one fill step above it.
- Body text is `--cn-fg-body`, subtext-1, in place of subtext-0.
- `.cn-grid-2/3/4` read `--cn-grid-gap`, 24px, in place of 16px. A grid of small items adds `.cn-gap-16`.
- `--tone` defaults to `--cn-info` in place of peach. `.legend-item` reads `--series`, then `--accent`, in place of `--tone`.

**Color**
- Text roles `--cn-fg`, `-soft`, `-body`, `-muted`, `-placeholder`, `-faint`, `-disabled` and `--cn-fg-on-accent`, with `.cn-fg-*` utilities.
- `--cn-interactive`, `--cn-interactive-hover` and `--cn-focus`. The focus ring is `--cn-focus`, the text color, in place of mauve.
- Status roles `--cn-danger`, `-warning`, `-success` and `-info`, each with `-tint`, `-wash`, `-edge` and `-border`. `.cn-tone-*` sets them.
- `--flamingo`, `--maroon` and `--sapphire` complete the 26 Mocha colors. Mix steps `--cn-step-*` run from 4 to 70%.
- Data colors `--cn-series-1..6` (teal, yellow, blue, peach, pink, mauve), `--cn-ramp-1..5` and `--cn-diverge-1..5`.
- `--wash`, the engaged fill, is mauve at 23% in place of 7%, with the `--engaged-edge` rim. `--hover` is surface-1 at 60%.

**Type**
- Micro is 12px, label, meta, ui and name 14px, body 16px, lede 18px, value 24px and code 13px.
- The heading role is new, 28px at 700: `--cn-type-heading-*`, `.cn-heading` and Tailwind `text-heading`.
- `value-lg` runs 26 to 36px and `display-sm` 30 to 40px. Both display sizes reach their maximum at 860px and lead at 1.08.
- Micro and label are 500, meta 400, title and name 600. Micro, label and ui lead at 1.25. Name aliases the ui tokens.
- Tracking is -.01em on title, -.02em on value, heading and display, and -.025em on `value-lg`.
- Bare `h1` to `h4` take the display-sm, heading, title and name roles. Compact density sets body at 15px, cells at 13px and small controls at 26px.

**Surfaces and depth**
- Surface tokens `--cn-surface-sunken`, `-band`, `-recessed`, `-page`, `-raised` and `-overlay`, with `.cn-bg-page`, `-raised`, `-recessed` and `-overlay`.
- Shadows mix from `--neu-ink`, `rgb(8 8 14)`, and drop the light top-left layer. `--neu-inset` and `--neu-inset-soft` are one dark layer.
- `--neu-raised` is a 1px contact, a near shadow and a cast. A panel wears the `--edge` hairline on all four sides.
- `--neu-lifted` and `.panel.is-lead` raise a lead panel, sized by `--lead-band-h`, `--lead-pad` and `--lead-title-size`.
- Plates are tokens, `--cn-plate`, `-half`, `-hover`, `-lg` and `-sm`. They default to `--neu-ink`, and `--cn-lit-edge` rims their top.
- `--edge` is surface-2 at 70% in place of 40%. `--edge-strong` is solid surface-2. `--control-edge` is overlay-1.
- Wells, skeletons and the switch plate take `--cn-surface-sunken`. `data-density="cozy"` sets 38px controls and a 3px plate.

**Fields and controls**
- A resting field wears `--cn-field-ring`, an even hairline. Hover swaps in `--cn-field-hover-ring`.
- An invalid or warning field draws a full ring in the tone. A read-only field drops the carve for a rule underneath.
- `.btn[aria-busy="true"]` shows a spinner. `aria-disabled="true"` looks disabled and keeps focus.
- `--disabled-opacity` is .7 in place of .5. A disabled primary is a shallow sunken carve at full opacity. A disabled secondary is a flat sunken slab.
- `.btn-ghost` rests on an `--edge-soft` hairline. Links underline at 40% of their color and go solid on hover.
- `.tag` is a shallow carve in the tone's wash, and status tags and banners draw a glyph from `--cn-glyph-*`. A static `.chip` is flat.
- `.checkbox:indeterminate`. Under `pointer: coarse` targets are 44px and field text is 1rem.

**New**
- Recipes: `.tabs`, `.menu`, `.listbox`, a combobox, `.slider`, `.pagination`, `.breadcrumbs`, `.skeleton`, `.cn-prose` and `.cn-skip-link`.
- `.sidebar` in `.app-shell.has-sidebar`, `.stat-grid` with `.is-ruled`, `.bar-chart`, `.sparkline` and `.is-hatched`. Date and file fields.
- Modifiers: `.tag.is-solid`, `.tag.is-quiet`, `.stat.is-inline.is-total`, `.is-num` table columns and `td.is-trail`.
- Layout: `.cn-grid-12` with `.cn-span-*`, `.cn-split`, `.cn-with-side`, `.cn-measure`, `.cn-mx-auto` and `.cn-container` folds.
- Spacing steps `--space-7` (48px) and `--space-8` (64px), and `--cn-width-page`, `-narrow`, `-reading` and `--cn-measure`.
- `catppuccin-neu/js` exports `tabs()`, `menu()`, `listbox()`, `slider()`, `tooltips()`, `toast()` and `init()`.
- `catppuccin-neu/js/auto` wires every widget on load. Tabs, menus, listboxes and comboboxes need it, `init()` or your own keyboard model.
- `--ease-spring` is a `linear()` spring where supported. `.cn-arrive` fades in loaded content and `.cn-morph` names route morphs.
- `data-contrast="more"` on the root applies the `prefers-contrast: more` step. Under `hover: none` hover lifts are off and only the press runs.

**Tooling**
- `pnpm lint` computes every WCAG and APCA pairing from the tokens in both contrast modes and fails under the floor.
- The showcase `test:a11y` diffs three routes against committed screenshots and checks text spacing, forced colors, reflow and motion.

## 0.4.1

- Solid accent fills paint `--cn-fill-ramp`: the fill lit from the top left, lightness +.035 to -.045 on one hue. It covers `.btn-primary`, the checked `.checkbox`, the on `.switch` paddle, `.mark` and the progress fill.
- Those fills, except the switch paddle, carry fractal film grain from the bottom right in a `::before` under their content. `--grain` sets its strength (.22); 0 turns it off.
- The primary gloss is a white rim at .3 on top and a crust shade along the bottom. The primary and checked checkbox borders are transparent so the ramp runs edge to edge.
- Primary hover transitions the ramp from mauve to pink through the registered `--cn-fill`.
- `oklch(from …)` is allowed in `--cn-fill-ramp` only, for lightness and chroma.

## 0.4.0

Every renamed class, token and key keeps working through 0.4.x as a
deprecated alias. The aliases go in 0.5.0. The one exception is
`--input-h`, which is gone now. See [Migrating to 0.4.0](#migrating-to-040).

- The package keeps its ornaments: the tilted panel, the colored plates, the switch rocker, the primary gloss, the empty-state plate, the spring, page-enter, the toast pile and the scrim blur.
- `--tint` is declared at each use site, so each element tints with its own `--tone`.
- The Tailwind v4 ease keys hold literal values. They referenced themselves and dropped every transition that read them.
- `pnpm lint` runs `scripts/lint.mjs`. It fails on self-referencing tokens, raw transition durations and off-scale spacing.
- Tailwind v4 gets `duration-press/exit/fast/base/slow` as utilities. v4 has no duration namespace, so the 0.3 keys produced no CSS.
- Field focus sets a transparent outline instead of `outline: none`, so forced-colors mode still shows focus.
- A `forced-colors` block gives focus a `Highlight` outline and gives the checkbox, radio and switch a `CanvasText` edge.
- Readable text is overlay-2 or lighter. Labels, meta, table heads, help text, chips and the footer moved up from overlay-1.
- Unchecked checkbox and radio edges use `--control-edge` (overlay-0, 3:1 on base). The switch plate gets a 1px inset ring.
- Under reduced motion, animation delays are zero and `.spinner` keeps a 2.4s spin.
- Type uses four weights (400, 500, 600, 700) and one size scale.
- Each type role is four tokens: `--cn-type-<role>-size/-weight/-leading/-tracking`.
- `.cn-display` and `.display-title` render the same, 36px to 56px at 700 with `margin: 0`. `.cn-display.is-sm` replaces `.cn-display-sm`.
- A bare `em` is plain emphasis. The mauve upright em applies only inside `.cn-display`, `.display-title` and `.wordmark`.
- Spacing tokens `--space-1..6` are 4, 8, 12, 16, 24, 32. Every recipe gap, padding and margin reads them.
- Utilities gain `-24` and `-32` steps. `-22` and `-28` are aliases that render 24 and 32.
- Radius tokens: panel 16, card 12, control 8, chip 4. Compact sets the panel radius to the card radius.
- Five duration tokens: press .08s, exit .14s, fast .16s, base .22s, slow .32s. Every transition reads one.
- `--plate` names the hard offset's color. `--hard-offset-color` still feeds it as a fallback.
- One press rule covers `.btn-primary`, `.btn-secondary`, `.segmented > *` and link-wrapped `.accent-card`.
- The primary button's plate is `--plate`. Its gloss stays.
- The accent card drops its soft raise and accent border. The plate is its only depth cue, and the value inside is text-colored.
- Controls inside an accent card rest on their own plate, not the card's.
- `.table-neu` is `.data-table`. Cells are 500 and the name cell is 600.
- The table row press is a vertical gradient on each cell, so it draws no seams. `.ranked-row` uses the same press.
- Tables gain sortable headers (`th[aria-sort] > button`), `.is-sticky-head` and selected rows (`tr[aria-selected="true"]`).
- At 760px a table becomes rows split by hairlines, each label in a 120px column beside its value. A table in `.table-scroll` with no `td[data-label]` stays a table. `td.cell-select` floats a row checkbox to the row's end.
- `.btn-flat`, `.btn-icon` and `.btn-dashed` become `.btn.btn-ghost.is-sm`, `.btn.is-icon` and `.btn.btn-ghost.is-dashed`.
- Disabled buttons, fields and choices use `--disabled-opacity` (.5). Buttons keep their rest shadow. Fields were .6.
- `.metric`, `.stat-row` and `.stat-strip` become `.stat`, `.stat.is-lg` and `.stat.is-inline` rows inside `.cn-divide`.
- `.footer-brand` is `.wordmark.is-sm`. `.footer-neu` is `.page-footer`.
- One band rule covers `.panel-header`, `.panel-footer`, `.modal > header` and `.drawer > header`. `.panel-heading` is an alias.
- Band heights are 64px, from `--band-h`. A header band holding `.band-actions` wraps, and the cluster wraps inside itself. Other bands stay on one line.
- The terminal, code block and command share one radius, one recess fill and the code type role. The code block now has a fill.
- Field and input rules collapse with `:is()`. Validation keys on `aria-invalid="true"`, and `.is-error` is an alias.
- `.chip-tone` is `.tag` and `.mark-solid` is `.mark`.
- `data-density="compact"` takes the old dense values: 28px controls, 24px small controls, a 2px plate. `dense` is an alias.
- Density knobs replace the dense patch block: `--band-h`, `--band-pad`, `--band-title-size`, `--body-pad`, `--cell-pad`, `--cell-font-size`, `--chip-pad`, `--well-pad`, `--empty-h`.
- `--input-h` is deleted. Inputs are `--control-h` tall: 42px to 46px at default density, 30px to 28px compact. Textareas go from 84px to 92px.
- `dialog.modal` and `dialog.drawer` are the canonical overlays. Div overlays inside `.cn-scrim` still work and are deprecated.
- `.app-shell` and `.live-dot` moved to recipes. The `.app-shell` bloom is gone; it drew the same pixels as base.
- Phones no longer hide content: chip labels, the footer paragraph and accordion meta stay. Accordion meta wraps under the title.
- A primary button in a panel footer is no longer full width at 760px.
- `[hidden]` is `display: none !important`, except on the overlays that animate out, on `until-found` and on `[data-cn-animate-hidden]`.
- New recipes: `.legend`, `.kv`, `.modal.is-wide`, `.progress-track.is-lg`, `.btn.btn-ghost.is-danger`.
- New utilities: `.cn-ui` and `.cn-code-inline`.
- At 760px a `.topbar.is-split` wraps its actions onto more rows. The phone topbar is 60px, 48px compact. `.topbar.is-compact` is 52px, 44px compact.
- `.app-shell.is-fixed` fills the viewport and turns off the page's scrollbar gutter.
- `.page-main` drops `z-index: 1`.
- `--page-gutter` sets the inline gutter for the page column, the footer and the topbar. `--page-pad` sets the column's block padding.
- `.eyebrow` and `.cn-eyebrow` are deprecated. A kicker above a display title repeats the lede.
- Tailwind: `text-microlabel` replaces `text-micro`, `h-control` replaces `h-input`, and new keys cover `control-sm`, `band`, `gutter`, `page-pad`, `control-edge` and `opacity-disabled`.
- Accent comes from an item's identity and stays the same wherever the item appears. The docs no longer cycle accents by list position.
- The SPEC changelog moved to this file.

### Migrating to 0.4.0

Find the old names with the search from the showcase's migration page, or
`rg "deprecated, removed in 0.5.0" node_modules/catppuccin-neu/css` to list
every alias.

| Old name | New name | Removed in |
| --- | --- | --- |
| `.btn-flat` | `.btn.btn-ghost.is-sm` | 0.5.0 |
| `.btn-flat.active` | `.btn.btn-ghost.is-sm[aria-pressed="true"]` | 0.5.0 |
| `.btn-icon` | `.btn.is-icon` | 0.5.0 |
| `.btn-icon.is-sm` (28px) | none; use compact density | 0.5.0 |
| `.btn-dashed` | `.btn.btn-ghost.is-dashed`; add `.cn-w-full` and `.is-lg` for the old full-width 62px slot (`.is-lg` is 58px) | 0.5.0 |
| `.metric` | `.stat` | 0.5.0 |
| `.metric.is-hero` | `.stat.is-lg` | 0.5.0 |
| `.metric.is-value-first` | none; label over value is the one order | 0.5.0 |
| `.stat-row` | `.stat.is-inline` | 0.5.0 |
| `.stat-strip` | `.cn-divide` around `.stat.is-inline` rows | 0.5.0 |
| `.panel-heading` | `.panel-header` | 0.5.0 |
| `.chip-tone` | `.tag` | 0.5.0 |
| `.mark-solid` | `.mark` | 0.5.0 |
| `.table-neu` | `.data-table` | 0.5.0 |
| `.footer-neu` | `.page-footer` | 0.5.0 |
| `.footer-brand` | `.wordmark.is-sm`; the `b` suffix keeps a .25em space | 0.5.0 |
| `.field.is-error`, `.input.is-error` | `aria-invalid="true"` on the control | 0.5.0 |
| `.cn-display-sm` | `.cn-display.is-sm` | 0.5.0 |
| `.eyebrow`, `.cn-eyebrow` | none; delete it | 0.5.0 |
| `.cn-{gap,p,px,py,mt,mb}-22` | `-24` | 0.5.0 |
| `.cn-{gap,p,px,py,mt,mb}-28` | `-32` | 0.5.0 |
| `div.modal`, `div.drawer` in `.cn-scrim` | `dialog.modal`, `dialog.drawer` | 0.5.0 |
| `.cn-scrim` | `::backdrop` on the dialog | 0.5.0 |
| `data-density="dense"` | `data-density="compact"` | 0.5.0 |
| `--hard-offset-color` | `--plate` | 0.5.0 |
| `--pane-radius` | `--cn-radius-panel` | 0.5.0 |
| `--input-h` | `--control-h` | 0.4.0 |
| Tailwind `text-micro` | `text-microlabel` | 0.5.0 |
| Tailwind `h-input`, `min-h-input`, spacing `input` | `h-control`, `min-h-control`, spacing `control` | 0.5.0 |

`.display-title` and `.lede` are not deprecated. They render the same as
`.cn-display` and the lede role.

These changes need an edit even though no name changed:

| Change | What to do |
| --- | --- |
| A bare `em` is italic in the text color, not mauve and upright | Use a `span.cn-text-mauve` for accent text, or plain text |
| `--tint` is only declared on `.cn-tint`, `.tag`, `.banner`, `.input` and field controls | Add `.cn-tint` or declare `--tint` locally where a rule reads `var(--tint)`; for a danger hover use `.btn.btn-ghost.is-danger` |
| A table in `.table-scroll` with `td[data-label]` cells becomes rows at 760px | Nothing, it did in 0.3. Drop the `data-label` attributes to keep a scrolling table |
| Inputs are 46px (28px compact), up from 42px (30px) | Re-check rows that align an input with a fixed-height neighbor |
| `[hidden]` is `display: none !important` from the first layer, so no later rule can show it | Put `data-cn-animate-hidden` on an element that animates out through `[hidden]` |
| `.display-title` and `.cn-display` zero the heading margin | Space the title with a gap or a margin utility |

## 0.3.2

- An exclusive accordion group can close fully. A listener arms the checked radio on press and unchecks it on the click that follows.

## 0.3.1

- `.command-copy` is 34px at every density. It had tracked `--control-h-sm` and shrank to 22px under dense.

## 0.3.0

- New utilities: `.cn-text-center/-right/-left`, `.cn-list-none`, `.cn-scroll-x`, `.cn-sticky-top`.
- New modifiers: `.metric.is-value-first`, `.empty-state.is-fill`, `.chip.is-glyph`.
- `.table-scroll` is a recipe, and the panel corner rules reach through it.
- `cn-microlabel cn-text-*` composes, because the color utilities come after the type roles.

## 0.2.2

- Closed `dialog.modal` and `dialog.drawer` are `display: none`. The drawer's `display: flex` had beaten the UA's closed state.
- The native drawer keeps only its left hairline. The UA drew a 3px border on the other sides.
- `.command.is-wrap` wraps a long statement instead of scrolling it.

## 0.2.1

- The Tailwind preset no longer remaps the spacing scale. Its pixel-named keys had shrunk every `gap-4` on upgrade.

## 0.2.0

- The layer order is tokens, recipes, utilities, so a utility beats the recipe on the same element.
- `.cn-scrim` moved to recipes.
- Mix tokens `--edge`, `--edge-soft`, `--tint` and `--wash` hold the shared `color-mix` expressions.
- Layout utilities on a six-step scale: row, stack, cluster, grids, gap, padding, margins, divide, truncate, icon sizes, `.cn-code-meta`.
- `.page-main` and `.footer-brand` ship. The footer follows `--page-width`, and `.app-shell` fills the viewport.
- `.command` ships: a copyable command line.
- Native `dialog.modal` and `dialog.drawer` hosts, with `::backdrop` as the scrim.
- Sizes: `.btn.is-sm`, `.btn.is-lg`, `.btn-icon.is-sm`, `.btn-icon.is-lg`. Recipes size their own svg.
- `.topbar.is-split`, `.topbar.is-compact`, `.wordmark.is-lg` with a mark, and `.panel-body`.
- States as attributes: `aria-pressed`, `aria-checked`, `aria-current`, `aria-invalid`, `.is-open` and `data-open`.
- `data-density="dense"` for instrument panels: 28px controls, a 2px offset, tighter data surfaces.
- Tailwind gains the motion tokens, the type roles and the mix colors. The v4 import order is documented.
- The accent card sits on a plate in its accent. The spine, corner gradient and accent inset are gone.
- Motion tokens: `--ease-out`, `--ease-in`, `--ease-spring`, `--t-fast/base/slow`. No transition uses the browser default curve.
- Display type went from 820 at -.055em to 760 at -.03em.
- The progress fill defaults to `var(--accent)`. The three-color gradient is opt-in through `--progress-fill`.
- A row press shades the top and bottom of each cell instead of carving each cell.
- An open accordion wears the engaged treatment: full inset, mauve wash, mauve title.
- Placeholders moved from overlay-0 to overlay-1.
- The scrim went from crust 74% with a 6px blur to crust 80% with a 2px blur.
- `.empty-state` draws an `svg` first child on a 56px carved round.
- Docs stages lost their dashed frame for a soft hairline. Close buttons draw a stroke glyph.
- Validation states drop the 2px tone ring for a 4% tone wash on the well.
- Every tinted surface is the tone at 4%.

## 0.1.5

- `em` is mauve and upright everywhere. `<i>` keeps italics.
- `.app-shell` is a flex column whose `main` absorbs the slack, so the footer sits at the bottom.
- `.topbar nav` and `.wordmark` ship.
- Accordion titles have a bold `<b>` and a regular `<p>` variant.
- `.deck` ships: hash-routed views with no JS.
- At 520px accordion stacks tighten.

## 0.1.4

- Nothing is vendored. Bundled apps import from `node_modules`, and zero-build pages sync generated copies and ignore them in git.
- A tag-pinned jsDelivr URL is the supported path for pages with no `package.json`.
- `.btn` sets `text-decoration: none` for anchor buttons.
- Links ship in the tokens reset: mauve at rest, pink on hover, no underline.
- Accordion labels take a trailing meta, and `.accordion-stack` groups accordions in a panel.
- The body copy voice is a given in the tokens reset.

## 0.1.3

- `--progress-fill` re-keys the progress fill.
- The tilted panel layers its hard offset over `--neu-raised`.

## 0.1.2

- The lit top-left inset is gone from neutral surfaces. `.cn-raised-lit` is deleted.
- Uppercase is scarce: only the eyebrow and the microlabel keep caps.
- The data roles stay sans with tabular numbers. Consumers may choose mono for a rare element.

## 0.1.1

- Version bump only.

## 0.1.0

- The showcase is a Preact and Vite site on Cloudflare Workers static assets.
- The package installs as a git-URL dependency, with `sync.mjs` for zero-build pages.
- Depth canon: clickable controls rest on a hard offset and press with the half-slide. Primary buttons never soften it.
- Radii cap at 16px.
- Names describe style, not purpose: `btn-add` became `btn-dashed`, `.search` became `.input-icon`.
- `--entity-color` merged into `--accent`, and `.entity-card` became `.accent-card`.
- Filled child bands take `calc(parent radius - 1px)` corners. `overflow: hidden` is banned as the fix.
- The soft depth pair was strengthened twice.
- The one-page gallery became a multi-page docs site with specimens on `--base`.
- Inset surfaces are borderless and transparent. The terminal keeps its fill.
- Flat controls gained the soft press. `.btn-text` translates only.
- Selects draw a chevron. The input focus ring is the only field focus indicator. Disabled fields flatten.
- A scrolling well fades its bottom edge with `mask-image`.
- `.page-enter` holds no fill after its animation, so it never traps fixed overlays.
- Overlays exit through `[hidden]` and `visibility`.
- Panel footers are divider-only. Headers keep the fill.
- Selection controls, the accordion, the avatar and the code block ship.
- Selects use `appearance: base-select` where supported. `[data-tip]` replaces `title=`.
- Mono is for code. Every other role is sans.
- `--hard-offset` is a contract property: 4px, 3px compact.
- The toast is a stack with a title and description. It slides in from its edge, and the pile fans out on hover or focus.
- Toast behavior is consumer code. The docs carry a Preact reference.
- Field validation states and the code block copy control ship.
- Display clamps to 46px and the type floor is 12px, except the 10px microlabel.

## Tried and rejected

- Removing the ornaments in 0.4.0 (tilt, gloss, scrim blur, spring, page-enter). They are the package's identity; slop was repetition and inconsistency.
- A carved progress track. At 7px the carve reads as mud.
- A sticky `::after` fade band on scrolling wells. It broke against the well's padding.
- `display` with `allow-discrete` for div overlays. Browser support was too thin in 0.1; native dialogs use it now.
- Three rocker switch designs: glyph halves, a seesaw fold and a hinged angled paddle. The sliding paddle reads clearest.
- A `details` accordion. Its close cannot animate outside Chromium.
- A hover card and tabs. A popover and the segmented control already cover them.
- Mono for data roles. Numbers read better in sans with tabular figures.
- Vendored CSS in every consumer. Copies drift from the installed package.
- A `.prose` content class. Every recipe sets its own font, so the class did nothing.
- A `.dock`. A short page scrolls, and a long one uses the topbar.
- Display type at 820 and -.055em. It closed the counters and crashed punctuation.
- A per-cell soft inset for the row press. It drew a seam at every column.
- A mauve, pink and peach progress gradient by default. Three bars on one page showed three colors at the same x.
- A rosewater mix for the primary hover. It makes a hex Mocha does not have.
- A numbered-mark stepper. The pills read fine.
- A tinted carve for invalid fields. A colored inner shadow looks like a glowing pit.
