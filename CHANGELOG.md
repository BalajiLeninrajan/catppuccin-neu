# Changelog

One line per change, newest version first. [SPEC.md](./SPEC.md) describes
what ships now. This file records how it got there.

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
