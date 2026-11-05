# Changelog

One line per change, newest version first. [SPEC.md](./SPEC.md) describes
what ships now. This file records how it got there.

## Unreleased

This becomes 0.5.0: it removes the 0.4 aliases.

**Frozen for 0.5.0.** The surface and shadow tokens hold these values for the 0.5.0 tag, and any later change to one of them needs its own line in this file:

- `--edge`: surface-2 85% over transparent, 2.1:1 on base. `--edge-strong`: surface-2, 2.5:1. `--cn-lit-edge`: `inset 0 1px` surface-2 45% over transparent, 1.5:1.
- `--neu-ink` `rgb(8 8 14)`, `--neu-contact` the ink, `--neu-near` and `--neu-dark` the ink at .8, `--neu-shade` at .72, `--neu-dark-soft` `rgb(17 17 27 / .30)`.
- `--neu-raised`: `2px 2px 0` contact, `3px 4px 6px` near, `10px 12px 24px` shade, the lit edge. `--neu-lifted`: `4px 6px 0` contact, `6px 12px 14px` near, `18px 28px 48px` shade, the lit edge. `--neu-raised-soft`: `1px 1px 0` contact, `3px 4px 9px` ink at .5. `--neu-inset`: `inset 3px 3px 8px` `--neu-dark`. `--neu-inset-soft`: `inset 2px 2px 5px` ink at .5.
- `--cn-plate`: `--hard-offset` (4px at default density) on both axes, no blur, in `--plate` or the ink, stacked at a quarter, half and three quarters of the offset as well.
- `--cn-surface-page` and `--cn-surface-raised`: base. `--cn-surface-overlay`: surface-0 90% into base, 1.27:1. `--cn-surface-recessed`: mantle 55% into base. `--cn-surface-band`: crust 30% over transparent. `--cn-surface-sunken`: crust 38% into mantle, 1.10:1 under base.
- The `prefers-contrast: more` overrides of these stay as listed under Surfaces and depth.

**Changed after the freeze.**
- `--neu-lifted` deepened from a `3px 4px 0` contact and `4px 8px 10px` near shadow to `4px 6px 0` and `6px 12px 14px`, darkness only, with no fill or rim change. The lead's foot is now 6px deep against a plain panel's 2px, past the 4px plate and as deep as the tilted panel's 6px plate on the bottom and 2px narrower on the right, because at 1x the old 1 to 2px step left the lead ranking mostly by its title.
- The plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`, `-tilt`) and the Tailwind `hard`, `hard-lg` and `hard-sm` shadows stack the same ink in steps of about 1px out to their offset, where they were one offset copy. The color, reach and press are unchanged; the top-right and bottom-left corners now join, so the plate reads as the side of a block instead of a drop shadow with a notch at each end. Rest, half and hover keep four layers each, so the press still interpolates.

**Removed.** Every name deprecated in 0.4.0, including the `.cn-scrim` div modals and drawers, `data-density="dense"`, `--hard-offset-color`, `--pane-radius`, the `-22` and `-28` utilities and Tailwind `micro` and `input`. The [migration table](#migrating-to-040) maps each to its replacement. The legacy `--line`, `--muted` and `--soft` go too: use `--surface-0` (or `--edge`), `--cn-fg-muted` and `--cn-fg-soft`.

**Color**
- Semantic roles: `--cn-fg` (text), `-soft` (an alias of `-body`), `-body` (subtext-1), `-muted` (subtext-0), `-placeholder` (overlay-2), `-faint` (overlay-1), `-disabled` (overlay-1), `--cn-fg-on-accent`, `--cn-interactive`, `--cn-interactive-hover`, `--cn-focus` (text) and `--cn-danger`, `-warning` (yellow), `-success`, `-info`. Recipes read roles, never palette stops, and `.cn-fg-*`, `.cn-tone-*` and the Tailwind maps expose them.
- All 26 Mocha colors: `--flamingo`, `--maroon` and `--sapphire` join.
- Mix steps `--cn-step-tint/-row/-wash/-engaged/-fill/-plate/-edge/-strong/-vivid` (4, 12, 12, 20, 14, 25, 40, 50, 70%) replace loose percentages. `.cn-tint-accent` mixes at `--cn-step-wash`, `.cn-edge-mauve` and `.cn-edge-accent` at `--cn-step-plate`, and the `.mark` border and live-dot halo at `--cn-step-fill`.
- Status ladders: `--cn-<role>-tint/-wash/-edge/-border`, read through `--tint`, `--tone-wash`, `--tone-edge` and `--tone-border`.
- Data colors: `--cn-series-1..6` (teal, yellow, mauve, peach, blue, pink, alternating cool and warm; series 1 is off mauve so a bar never reads as interactive), `--cn-ramp-1..5` and `--cn-diverge-1..5`, with Tailwind keys. The SPEC names the hue pairs that never sit side by side; status tags and banners are exempt, because they carry a word and a glyph.
- `.bar` and `.legend-item` read `--series`, falling back to `--accent`, instead of `--tone`.
- `--tone` defaults to `--cn-info`, so an untoned tag, banner or icon-button hover no longer borrows series 4.
- The primary label, `.mark` glyph, checkbox tick, switch bar and busy spinner paint `--cn-fg-on-accent`.
- `.cn-spine` paints `--cn-interactive`, because it marks position, not identity.
- Code line numbers use `--cn-fg-placeholder`.
- The SPEC hue table lists mauve's two text marks, the display `em` and the hero value through `--accent`, and allows at most one of those mauve text marks per view outside the wordmark; a series 3 data mark doesn't count. Special cases lists the display `em` beside the hero value. The dashboard example drops the mauve `em` from its title, since its hero figure is that mark.

**Surfaces and depth**
- A surface ladder: sunken, band, recessed, page, raised and overlay (surface-0 90% into base, 1.27:1). Raised is base, the page color: panels and plated controls lift by the contact edge, cast, lit top edge and hairline, not by a lighter fill. Overlays float, so they keep the lighter fill.
- `--cn-lit-edge`, a 1px top rim of surface-2 at 45% (1.5:1 on base), joins `--neu-raised` and every plate but the primary, which has its gloss.
- `--neu-lifted`: the lead panel's raise, ranked by darkness on the bottom and right only: a 4px 6px contact in the full ink, a hard foot 6px deep and 4px wide, past the 4px plate at default density and as deep as the tilted panel's 6px plate on the bottom, 2px narrower on the right, a 6px 12px 14px near shadow, an 18px 28px 48px cast and the plain lit edge. `.panel.is-lead` stands on it inside `--edge-strong`, so the lead reads higher at 1x with no bright rim and no dark outline all round.
- Raised shadows use crust halfway to black (`--neu-shade`, and `--neu-contact`, the full ink at 1.22:1) with a 2px contact edge, so the lift reads on base. Compact density drops the contact to 1px, under its 2px plate. `--neu-ink` names the ink, `rgb(8 8 14)`. The SPEC draws every depth as one height model.
- The engaged wash is mauve at `--cn-step-engaged` (20%, 1.52:1), a step past the 1.24:1 hover.
- `--cn-fg-muted` is subtext-0 (7.4:1); placeholders take `--cn-fg-placeholder` (overlay-2).
- `.bar-chart`, `.bar-group` and `.bar` for horizontal bar charts. Bars paint `--cn-fill-ramp` without grain, like the switch paddle.
- `--control-edge` and `--cn-fg-disabled` are overlay-1 (4.4:1), so unchecked controls and the slider thumb clear 3:1 on raised and overlay fills too. Lint checks the control edge on every ground.
- An invalid or warning field draws a full ring in the tone, and its help text leads with the glyph in the tone. An invalid select keeps its chevron. The label and help text no longer take the tone: the label keeps `--cn-fg-soft` and the help text moves up to `--cn-fg-body`, as on a banner.
- Micro, label and ui lead at 1.25, so a wrapped label or text-spacing override never collides.
- `data-density="cozy"`: 38px controls between the default and compact.
- Bare `h1` to `h4` take the display-sm, heading, title and name roles at zero specificity; header-band titles are the title role.
- `prefers-contrast: more` stands the tilted panel upright.
- Focus is `--cn-focus` text, a bright neutral, so it differs from the mauve engaged rim by hue as well as shape. Lavender joins the identity hues.
- Raised shadows drop the top-left highlight, `--neu-raised-soft` included: contact, cast and the lit edge. Carves and the pop shadow share the halfway-to-black base; the pop has a tighter second layer. A panel inside a panel takes the soft raise with the lit edge.
- `--neu-near`, a 3px 4px 6px shadow at .8 (.9 under `prefers-contrast: more`), joins `--neu-raised` after its 2px 2px contact edge, and a 6px 12px 14px one joins `--neu-lifted`, so a plain panel stands on a 4 to 6px dark foot along its bottom and right edges at 1x where the cast fades. The plain contact stays under the lead's 4px 6px foot and the plate, 4px at default density and 3px at cozy. Compact density drops the plate to 2px, so it drops the plain contact to 1px, and resting still reads lower than the lead and a plated control at every density.
- `.well` takes the `--cn-surface-sunken` fill, so a well no longer reads as an outlined panel.
- A carve is darkness only. `--neu-inset` is one layer, `inset 3px 3px 8px` in `--neu-dark` at .8 (.88 under `prefers-contrast: more`), and `--neu-inset-soft` is `inset 2px 2px 5px rgb(8 8 14 / .5)`. Neither draws a light layer on the bottom and right walls, so fields, selects, textareas, wells, the mono wells, the tabs carve, the switch plate, stepper pills, skeletons and engaged states no longer read as a sunken bevel. The row press drops its lit bottom edge too.
- The lead panel's band title is `--lead-title-size` at the heading weight and tracking: 28px at default and cozy density, 20px at compact and at 655px and under, where display-sm drops under 34px, and the body size at 520px.
- Every shadow layer in recipes and utilities has a token: the plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`, `-tilt`), `--cn-primary-rim`, `--cn-gloss-inset`, `--cn-validation-ring`, `--cn-readonly-rule`, `--cn-sticky-rule`, `--cn-switch-ring`, `--cn-disabled-ring`, `--cn-halo-ring`, `--cn-live-halo`, `--cn-switch-glow`, `--cn-switch-glow-held` and `--cn-ground-ring`, with the values the recipes used.
- Label is 13px and name 14px, so micro is the one 12px role.
- Series 5 and 6 step down in lightness for color-vision deficiency; `.is-hatched` adds stripes to a bar or legend swatch.
- Dashed means an open slot only. The on switch paddle carries a crust bar.
- Component folds also answer `.cn-container`.
- The SPEC states the one idea behind the ornaments, a three-panel depth budget per region, and the halation mitigations.
- `.panel.is-lead`, `.stat-grid.is-ruled`, and the `.cn-grid-12` page grid with `.cn-span-*`. The SPEC adds composition rules and a job for every hue.
- Panel, modal, drawer and popover headers sit on their parent's fill behind a divider. `--cn-surface-band` darkens table heads one step under whatever holds them.
- Hairlines fold into `--edge` (surface-2 85%, 2.1:1 on base and 1.8:1 on an overlay, the strongest it goes before a panel reads as outlined at 1x), `--edge-soft` and `--edge-strong` (solid surface-2, 2.5:1 on base), so the lead panel and overlays wear a brighter cut edge than a plain panel in both modes. Under `prefers-contrast: more`, `--edge` is overlay-0 (3.4:1) and `--edge-strong` overlay-1 (4.4:1), so panels get a 3:1 boundary. `--hover` is surface-1 40% over transparent.
- A resting field takes `--cn-field-ring`: a quiet even surface-1 hairline (1.8:1 on base, 1.4:1 on an overlay), the same on all four sides, with no lip, on every device. Fields, the cell field, disabled fields and the tabs carve list the ring before the carve, so it paints over the dark wall and stays even; under the carve the top and left walls dimmed it and the bottom and right read brighter. A validation ring paints over the carve the same way. Hover swaps in `--cn-field-hover-ring`, a full 1px `--control-edge` ring (4.4:1 on base, 3.5:1 on an overlay), and focus draws the focus ring. Under `prefers-contrast: more` a resting field closes into a full overlay-2 ring. The tabs carve takes the same `--cn-field-ring`. Wells and the mono wells take `--cn-well-ring`, which paints a surface-2 ring under `prefers-contrast: more` only, since their sunken fill already sets them apart.
- Plates default to `--neu-ink`, crust halfway to black (1.22:1 under base, where crust is 1.14:1), so the plate's side reads at 1x. `--plate` still overrides it.
- Link and button chips stand on the ink plate with the shared hover lift and half-slide press; static chips keep the soft raise and gain the lit edge, so the plate tells them apart.
- `.cn-grid-2/3/4` and `.cn-grid-12` read one `--cn-grid-gap` (24px), so equal-column grids of panels no longer need `cn-gap-24`; a grid of small items composes `.cn-gap-16`. This changes the `.cn-grid-2/3/4` default from 16px.
- `.cn-grid-12` holds one row, and its children keep their content height (`align-items: start`). At 1060px, or in a `.cn-container` that narrow, splits go to halves, and a 9 and an odd last child take the row, as does a 3 after a 9.
- Skeletons fill with `--cn-surface-band`, one step under whatever holds them, instead of the sunken fill.
- The `.data-table` head rule is `--edge` (2.1:1 on the page, 2.2:1 on the head fill), up from surface-0 (1.3:1), so the head parts from the rows by a rule that outranks the row rules and not by text color alone. `--cn-sticky-rule` follows it. The 1.05:1 head fill stays, since skeletons share it.
- The tilted panel takes content height in a grid, and its prose sets at the ui size, 14px on the body leading, so the data panel beside it stays the louder block.
- The tilted panel stands on a 6px plate, `--cn-plate-tilt`, down from 10px, so it no longer outweighs the data panel beside it. `.cn-hard-lg` keeps its 10px.
- A ranked row at the top of a panel takes the panel's top corners too.
- A ranked row's `.mark` is a 22px key at the label size, down from the 28px tile, so a list of pastel accents stops reading as a row of competing blocks.
- The `.stat-grid.is-ruled` rule is the new `--cn-stat-rule` token, equal to `--edge` (2.1:1 on the page), up from `--edge-soft`, so at twice the width the figures read as one band beside panel hairlines. Under `prefers-contrast: more` it lifts to surface-2 (2.5:1), between `--edge-soft` and `--edge`.
- `.tag` is a shallow carve in `--tone-wash` (12%) with `--neu-inset-soft` and no outline, in place of the `--tone-edge` hairline on `--tint`. Tone text on the wash is 5.7:1 (red) to 9.4:1 (yellow), and lint checks each status role on its wash as well as its tint.

**Type**
- Sizes are rem. micro 12, label 13, meta 14, ui 14, name 14 (aliases of the ui tokens: the ui role in `--cn-fg`), body 16 (15 at compact density), lede 18, title 20, value 24, heading 28 (new, `.cn-heading`), value-lg 32, code 13, display-sm 30 to 40, display 36 to 56 at 1.08.
- Weights: label and micro 500; meta 400. Meta is 14px, a size above the 13px label, so the two read apart at 1x; 12px and 13px stay on chrome. Compact table cells keep 13px through `--cn-type-label-size`. The label also takes `--cn-fg-soft` (subtext-1) where meta keeps `--cn-fg-muted`; name, buttons and title 600; 700 for heading, display and the wordmark. Tracking tightens with size, -.01em at 20px to -.03em at display.
- At 520px, and in a 520px container, band titles step down to 16px with the stat value, so the value still outweighs the title.
- Display sizes reach their maximum at 860px: display `clamp(2.25rem, .34rem + 5.88vw, 3.5rem)` and display-sm `clamp(1.875rem, .92rem + 2.94vw, 2.5rem)`, so on desktop widths display is 2x the heading and display-sm 1.43x.
- Inter loads its optical-size axis. Metric-matched local fallbacks for Inter and JetBrains Mono. Mono surfaces turn ligatures off. `p` and `li` wrap pretty.

**States**
- Links underline at 40% of their color and go solid on hover; links in `nav` stay bare.
- Focus is one shape everywhere: a 2px `--cn-focus` (text) outline 3px off the edge, text fields included. Menu rows and select options keep an inset ring under keyboard focus.
- Engaged states wear `--engaged-edge`, a mauve rim at 4.7:1, and keep it under hover. The selected tab wears it too. `aria-expanded="true"` engages a ghost button.
- Ghost hover adds an `--edge` hairline. The secondary hover lifts its fill.
- A disabled primary goes flat and sinks like a well: the sunken fill under `--neu-inset` and `--cn-well-ring` inside a transparent 1px border, no edge, plate, ramp, grain or gloss, so it no longer shares a silhouette with a resting secondary. Darkness only, no lip. Other buttons dim to .6. Disabled fields use `--cn-fg-disabled` without opacity. Disabled checkboxes, radios and switches drop to the soft `--edge`; the off switch paddle has a 3:1 edge, and the on paddle a crust bar. Dashed means an open slot only.
- The icon button's resting glyph is `--cn-fg-muted` (subtext-0, 7.4:1). `--cn-fg-faint` is for decorative icons.
- `.btn-secondary.is-icon` keeps the secondary's `--cn-fg` glyph, hover and plate press, for an icon beside plated buttons.
- Compact `--control-h-sm` is `max(24px, 1.625rem)`, 26px at the default size, so small controls clear the WCAG 2.5.8 floor with room.
- `.btn[aria-busy="true"]` turns a spinner in the label's place. `aria-disabled="true"` looks disabled and keeps focus.
- Read-only fields read as printed text: no carve, a rule underneath.
- `.btn-text` has no padding, so a button and an anchor sit flush with the content edge of the row above.
- `.input-lg` also works inside a `.field`.
- `.data-table td .input` is the inline edit: `--control-h-sm`, the soft carve and `--cn-field-ring`, the even surface-1 hairline (1.8:1 on the page) of any resting field. A cell field has no label above it, so it takes its name from the column header through `aria-labelledby`.
- In a customizable select, a hovered option takes `--hover` like a menu row and the checked option takes `--wash`.
- The open accordion is its own step, the open carve (mauve at `--cn-step-tint`), not the engaged state, so body text in the fold keeps 7:1.
- A name cell's meta line follows `--cell-font-size`: 14px at default and cozy density, 13px at compact. Its `strong` and `small` are blocks, so the cell needs no `<br>`.
- Table and ranked row hovers, desktop and phone row mode, take mauve at `--cn-step-row` (12%) into base: 1.27:1 on the page, past the 1.24:1 hover and the open carve's 1.08:1, and 1.20:1 under a selected row, so pointer tracking holds on a dense table.
- In phone mode a `td.is-trail` leaves the label stack and rides beside the name: the last trailing cell on the title line, the one before it under it.
- `.stat.is-inline.is-total`: a summary total in the name and value roles under an `--edge` rule.
- Sidebar links are 500. The current page is 600 with a 4px mauve spine on its start edge, a position rather than a press, and draws it in `Highlight` under forced colors. Below 1060px the sidebar body fades in and settles 4px when it opens.
- A focused read-only field rings at the control radius.
- Banner text is `--cn-fg-body` at the ui size, 14px at 400; the glyph, edge and tint keep the tone.
- Checkboxes, radios and switches drop the user-agent margin, and a `legend` drops its inline padding, so a fieldset's legend, controls and message share one start edge.
- Under `hover: none`, a chosen segmented option keeps its 1px press after a tap.
- `.checkbox:indeterminate`; `aria-invalid` on a checkbox, radio or fieldset edges them in danger.
- Danger, warning, success and info tags and banners draw a glyph from `--cn-glyph-*` when the markup brings none.
- In a menu with any icon row, rows without an svg and the group labels indent to the icon column, so every label starts on one line.

**Motion**
- `--ease-spring` is a `linear()` damped spring where supported. An opt-in root view-transition cross-fade.
- Reduced motion keeps overlay fades, drops travel, keeps spinners turning and holds skeletons still at .75 opacity, the midpoint of their breath.
- A Data changes section in the SPEC, and `.cn-arrive` for content that replaces a skeleton. A tab change and a filter that empties a table cut; only the tab pill slides.
- `.cn-morph` on the lead panel and the page's one primary names them `cn-lead` and `cn-primary`, so they morph across routes at `--t-base` on the ease-out. The SPEC documents how the fanned toast pile closes over a dismissed middle toast.
- Reduced motion cuts view-transition pseudo-elements by name, since the universal selector does not reach them, so the root cross-fade and the morphs land at once.
- With `tabs()` wired, the selected tab's raised fill is one pill that slides to the new tab over `--t-fast` on the ease-out.
- The SPEC states that the package ships no haptics: CSS cannot vibrate, iOS Safari has no Vibration API, and haptics belong to the consumer or a native shell.

**Accessibility**
- `prefers-contrast: more`, `prefers-reduced-transparency`, `forced-colors`, `pointer: coarse` (44px targets) and `hover: none` are answered.
- The tooltip shows while a control inside it has focus, keeps its text out of the accessible name, and has an Escape hook, `data-tip-dismissed`. The SPEC and the popover page say that CSS alone does not hide a tip on Escape, so a CSS-only consumer adds the listener or calls `tooltips()`.
- `.cn-skip-link`.

**New recipes and utilities**
- `.sparkline`: a 2px line in `--series` or `--accent` beside its value as text. In a cell too narrow for both, the value wraps under the line.
- `.tabs`, `.menu`, `.slider`, `.pagination`, `.breadcrumbs`, `.cn-prose`, `.skeleton`, `details.accordion`, `.sidebar` in `.app-shell.has-sidebar`, `.stat-grid`, `.is-num` table columns, `.codeblock` `.is-copied`.
- `.cn-split`, `.cn-measure`, `.cn-with-side`, `.cn-mx-auto`, `.cn-container` grid folds, 48 and 64 spacing (`--space-7`, `--space-8`), page width tokens and `--cn-measure`.
- Recipes use logical properties.

**Behavior.** `catppuccin-neu/js`, optional: `tabs()`, `menu()`, `slider()`, `tooltips()`, `toast()` (with swipe to dismiss) and `init()`. The toast timer runs only while neither the pointer nor focus is in the stack, and a swiped toast exits through `[hidden]`. `tabs()` measures the selected tab into `--cn-tab-x` and `--cn-tab-w` for the sliding pill.

**Lint.** Fails on palette text stops and bare accent hues in recipes, hand-mixed hairlines, `outline: none`, a SPEC type table that disagrees with the tokens, a token comment whose ratio is off, and any WCAG or APCA pairing under its floor, computed from the tokens in both contrast modes. It also fails on a box-shadow that is not a list of tokens, an off-scale radius, uppercase outside `.cn-microlabel`, a transform or box-shadow transition with no named curve, a transition keyword curve, `!important` outside its four allowed places, and `title=` or `overflow: hidden` in the showcase. It holds design floors for `--edge` (2.1:1, 1.7:1 on an overlay), `--edge-strong` (2.4:1, 1.9:1, and above `--edge` on every ground) and the lit edge (1.4:1, 1.3:1), the hovered field ring at 3:1, the resting field ring at 3:1 under `prefers-contrast: more`, and fails on any carve layer that falls from the bottom right or is lighter than the page.

**Showcase.** `test:a11y` captures `/depth`, `/examples/dashboard` and `/examples/invoice` full page at 1400x900 and 1x and diffs them against committed baselines in `showcase/visual-baselines/` with pixelmatch and pngjs, failing past 0.1% of pixels; `--update-shots` refreshes the baselines, which depend on the system Chromium and fonts. The invoice's line-items panel puts a payment note left of the totals, which stay 320px wide under the Amount column. It also applies the WCAG 1.4.12 text-spacing override on every route and fails on clipped text, under forced colors checks the focus ring and saves a screenshot per route to `showcase/a11y-shots/forced-colors/`, runs axe again under `prefers-contrast: more`, and under reduced motion fails on any transition or animation longer than 1ms apart from overlay fades and spinners. It also fails on sideways scroll or clipped text at 700px (200% zoom), on sideways scroll at 390px and 320px, on more than three raised panels under one parent, and on an example view with more than one primary, tilted panel or lead panel. A Sparkline page. The depth specimens group at and below the ground, then off it. The whole dashboard runs at cozy density, its tilted aside holds prose under a name-role heading with the ruled figures moved to the upright panel stacked under it, the invoice's overflow menu is a plated `is-lg` icon button, the Surfaces swatches sit on a fixed 176px track, tokens in docs table cells never break at their hyphens, the invoice's Details and Activity panels end near one line, the example ledes sit 24px under the display, the colors page shows a seventh team on sapphire, and links inside running prose are plain links rather than `.btn-text`. The dashboard's primary sits on the title line in a `.cn-split` with the lede below, docs prose stops at the 68ch measure, and the accessibility page shows forced-colors captures of the controls, fields and engaged states. The dashboard's headline figure is a `.stat.is-lg`, 32px in the accent, so it outranks the 28px lead title. The showcase wraps in-app link navigation in `document.startViewTransition` where the browser has it, and the dashboard and invoice examples put `.cn-morph` on their lead panel and primary, so the two morph between those routes. Demo captions use the name role, 14px at 600, instead of the label role. Docs prose runs 16px apart from title to lede to paragraph, keeping the 32px gap for demos and sections. The table demo's status tags use the status tones, so they take the status ladders and glyphs. The introduction says the hairline cuts a surface's edge and the dark foot gives its height.

**Docs.** A compose-a-view checklist at the top of Composition, linked from the introduction. Its first step is a `.cn-skip-link` to `#main` as the first focusable element, with `tabindex="-1"` on `main`, since CSS cannot insert the link. Its header step puts the primary on the title line in a `.cn-split` with the lede below. A plate takes color only when its block is the accent signal, the one primary and accent cards; every neutral clickable stands on ink. `--cn-fg-soft` is documented as a job alias of `--cn-fg-body`. The tilted panel holds prose, not ruled rows, with a name-role heading. A status-tone color-vision audit: warning and success fall to dE 2.9 for a protan reader and stay apart by glyph and word. Motion ties duration to distance and keeps hover lifts off frequent controls. A sentence on why Inter. An ornament budget (one job per ornament kind, the ramp and grain counted as one fill, five named composites) and dark-only stance in the ground rules, the inset rule narrowed to transparent carves, sanctioned slot names (`.command-copy`, `.sidebar-toggle`, `td.cell-select`, `.copy-glyph`, `.done-glyph`), the primary's place in forms and first-run screens, the physical light, icon guidance, and Accessibility, Behavior, Dashboard and Settings pages in the showcase. The accessibility page says why the system is dark only and lists the bloom mitigations. The SPEC says why a tab rises and a segmented choice presses in, lists the selected tab among the resting heights, and says to even out a grid row by pairing or stacking panels, not by stretching one.

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
