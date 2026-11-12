# Changelog

Newest version first.

## 2.0.1

- A `.legend-item` swatch reads `--tone` again when the item sets no `--series`. 0.5.0 moved the swatch to `--series` and dropped `--tone`, so a legend written for 0.4.1 drew every swatch in the accent. `--series` still wins when both are set, and an item that sets neither keeps the accent. A `--tone` set above the item does not reach the swatch.

## 2.0.0

**Breaking.** This release removes what no page used. A page that used
1.0.0 without the names below looks the same.

- The sans is Inter again, in place of IBM Plex Sans. Pages link `Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900`.
- The `catppuccin-neu/js` and `catppuccin-neu/js/auto` modules are gone. No script ships.
- `tailwind/preset.cjs` and `tailwind/theme.css` are gone. `scripts/lint.mjs` no longer ships.
- Recipes removed: `.tabs`, `.menu`, `.listbox`, the combobox chevron, `.popover`, `.deck`, `.sidebar` and `.app-shell.has-sidebar`, `.bar-chart`, `.sparkline`, `.is-hatched`, `.pagination`, `.breadcrumbs`, `.skeleton`, `.cn-prose`, `.panel.is-lead` and `.stat-grid`.
- Modifiers removed: `.input-lg`, `.field.is-warning`, `.tag.is-solid`, `.tag.is-quiet`, `.chip.is-glyph`, `.avatar.is-lg`, `.nav-secondary`, `.stat.is-total`, and the table extras `.is-num`, `.is-trail`, `.cell-select` and `tr[aria-selected]`.
- Field styles removed: file inputs, the date picker icon and the indeterminate checkbox. They fall back to the plain field and checkbox.
- A status tag or banner draws no glyph by itself. Put an `svg` first.
- `aria-disabled="true"` styles buttons only. Chips, segmented options, checkboxes, radios and switches use `disabled`.
- Several open toasts stack as a plain column.
- A field in a `.panel` or `.well` inside a `.modal` or `.drawer` takes the overlay field ring.
- An `.input` in a `.data-table` cell is full size.
- `.accordion.is-open` no longer opens. Use `open`, `data-open` or the checkbox form.
- The `::view-transition` timing rules are gone. A page that opts in to view transitions sets its own.
- Layout removed: `.cn-grid-12` with `.cn-span-*`, `.cn-container` and the container folds, `.cn-split`, `.cn-with-side`, `.cn-measure` and `.cn-mx-auto`. `.cn-grid-2/3/4` stay. The `@container` folds of the grids, `.kv`, `.stat`, `.segmented`, `.accordion`, `.panel-footer` and the panel and dialog titles went with `.cn-container`. The viewport folds stay.
- Utilities removed: `.cn-fg*` and most `.cn-bg-*`, `.cn-heading`, `.cn-spine`, `.cn-flat`, `.cn-pop`, `.cn-cast`, `.cn-hard-sm`, `.cn-hard-lg`, `.cn-edge-line/-mauve/-accent/-tone`, `.cn-r-mark`, `.cn-arrive`, `.cn-morph`, `.cn-inset-soft`, `.cn-mark-drop`, `.cn-tint-accent`, `.cn-text-tone`, `.cn-p-4`, `.cn-px-32`, `.cn-py-0/16/24/32`, `.cn-mb-4`, the 48 and 64 spacing steps, and six `.cn-text-*` hues. `css/utilities.css` lists what stays.
- Modes removed: `data-contrast="more"` and `data-density="cozy"`. `prefers-contrast: more` and `data-density="compact"` stay.
- Tokens removed: `--cn-series-*`, `--cn-ramp-*`, `--cn-diverge-*`, `--cn-step-*`, the status `-tint/-wash/-edge/-border` ladders, `--cn-fg-soft` (use `--cn-fg-body`), `--cn-fg-disabled` (use `--cn-fg-faint`), `--space-8`, and other tokens that no recipe or page read. Set `--series` from a palette hue.
- `.cn-tone-danger`, `-warning`, `-success` and `-info` tint at 4%, the same as every other tone.
- `SPEC.md` is the design rules and a recipe index. Value tables live in `css/tokens.css`.

## 1.0.0

No visual or API change from 0.5.0. It trims comments and docs prose.

## 0.5.0

**Breaking**
- Every name deprecated in 0.4.0 is gone.
- `--line`, `--muted` and `--soft` are gone. Use `--surface-0` or `--edge`, `--cn-fg-muted` and `--cn-fg-body`.
- The sans is IBM Plex Sans in place of Inter. Pages link `IBM+Plex+Sans:ital,wght@0,400..700;1,400..700`.
- Type sizes are rem and most roles are larger, so re-check fixed-height rows.
- The page ground is mantle. Panels and plated controls stay on base, one fill step above it.
- Body text is `--cn-fg-body`, subtext-1, in place of subtext-0.
- `.cn-grid-2/3/4` gaps are 24px in place of 16px. A grid of small items adds `.cn-gap-16`.
- `--tone` defaults to `--cn-info` in place of peach. `.legend-item` reads `--series`, then `--accent`.

**New**
- Text roles `--cn-fg`, `-body`, `-muted`, `-placeholder` and `-faint`, and status roles `--cn-danger`, `-warning`, `-success` and `-info` with `.cn-tone-*` classes.
- The focus ring is `--cn-focus`, the text color, in place of mauve.
- Shadows mix from one ink and drop the light top-left layer. A panel wears the `--edge` hairline on all four sides.
- `.slider`, `.cn-skip-link`, `.btn[aria-busy="true"]`, and `aria-disabled="true"` on buttons.
- An invalid field draws a full ring in its tone. A read-only field shows its value on a rule.
- Under `pointer: coarse` targets are 44px. Under `hover: none` hover lifts are off.
- Other recipes and a script module arrived here and left in 2.0.0.

## Earlier

- 0.4.1: solid accent fills paint a lit ramp with film grain. `--grain` sets its strength.
- 0.4.0: renames classes and tokens. `git show v1.0.0:CHANGELOG.md` has the migration table.
- 0.1.0 to 0.3.2: see the git tags.

## Tried and rejected

- Recipes no page renders: tabs, a menu, a listbox, a sidebar, charts, pagination, breadcrumbs, skeletons, a prose class, a second panel rank, a 12-column grid. A recipe enters when a page needs it.
- A script module for keyboard models. The package is CSS only.
- Removing the ornaments (tilt, gloss, scrim blur, spring, page-enter). They are the package's identity. Slop was repetition and inconsistency.
- A carved progress track. At 7px the carve reads as mud.
- A sticky `::after` fade band on scrolling wells. It broke against the well's padding.
- `display` with `allow-discrete` for div overlays. Native dialogs use it instead.
- Three rocker switch designs: glyph halves, a seesaw fold and a hinged angled paddle. The sliding paddle reads clearest.
- A hover card. A tooltip or a dialog covers it.
- Mono for data roles. Numbers read better in sans with tabular figures.
- Vendored CSS in every consumer. Copies drift from the installed package.
- A `.dock`. A short page scrolls, and a long one uses the topbar.
- Display type at 820 and -.055em. It closed the counters and crashed punctuation.
- A per-cell soft inset for the row press. It drew a seam at every column.
- A mauve, pink and peach progress gradient by default. Three bars on one page showed three colors at the same x.
- A rosewater mix for the primary hover. It makes a hex Mocha does not have.
- A numbered-mark stepper. The pills read fine.
- A tinted carve for invalid fields. A colored inner shadow looks like a glowing pit.
