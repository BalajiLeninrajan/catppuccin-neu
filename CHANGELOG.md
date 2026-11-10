# Changelog

One line per change, newest version first. [SPEC.md](./SPEC.md) describes
what ships now. This file records how it got there.

## Unreleased

This becomes 0.5.0: it removes the 0.4 aliases.

**Frozen for 0.5.0.** The surface and shadow tokens hold these values for the 0.5.0 tag, and any later change to one of them needs its own line in this file. The values lock at the 0.5.0 tag, and the list under "Changed after the freeze" records every move before it. `pnpm lint` holds a snapshot of each resolved value and fails when one differs:

- `--edge`: surface-2 70% over transparent, 1.85:1 on base. `--edge-strong`: surface-2, 2.5:1. `--cn-lit-edge`: `inset 0 1px` surface-2 45% over transparent, 1.5:1.
- `--neu-ink` `rgb(8 8 14)`, `--neu-contact` the ink, `--neu-near` and `--neu-dark` the ink at .8, `--neu-shade` at .72, `--neu-dark-soft` `rgb(17 17 27 / .30)`.
- `--neu-raised`: `1px 1px 0` contact, `3px 4px 6px` near, `10px 12px 24px` shade, the lit edge. `--neu-lifted`: `6px 8px 0` contact, `8px 14px 16px` near, `18px 28px 48px` shade, the lit edge. `--neu-raised-soft`: `1px 1px 0` contact, `3px 4px 9px` ink at .5. `--neu-inset`: `inset 3px 3px 8px` `--neu-dark`. `--neu-inset-soft`: `inset 2px 2px 5px` ink at .5.
- `--cn-plate`: `--hard-offset` (4px at default density) on both axes, no blur, in `--plate` or the ink, stacked at a quarter, half and three quarters of the offset as well.
- `--cn-surface-page`: mantle. `--cn-surface-raised`: base, 1.07:1 on the page. `--cn-surface-overlay`: surface-0 90% into base, 1.27:1 on base. `--cn-surface-recessed`: crust 80% into mantle, 1.05:1 under the page. `--cn-surface-band`: crust 30% over transparent. `--cn-surface-sunken`: crust, 1.14:1 under base and 1.07:1 under the page.
- The `prefers-contrast: more` overrides of these stay as listed under Surfaces and depth.

**Changed after the freeze.**
- The page ground moves to mantle, overriding the 0.5.0 freeze of `--cn-surface-page`. Panels, plated controls, the tilted panel and the lead stay on base, so a panel stands one fill step (1.07:1) above the page as well as on its foot; on base alone a panel read as an outlined box at 1x, and no shadow gets darker than about 1.2:1 on a dark page. The body, the root, the topbar and its reduced-transparency fill read `--cn-surface-page`. Nothing raised is lighter than base, and the showcase `theme-color` is mantle.
- `--edge` drops from surface-2 85% to 70%: 1.85:1 on base, 1.92:1 on the page and 1.6:1 on an overlay, from 2.1:1 and 1.8:1. With the fill step separating a panel, a quieter hairline only cuts its outline. `--cn-stat-rule` follows it. Lint's `--edge` floors move to 1.8:1 and 1.5:1.
- `--cn-surface-sunken` deepens from crust 38% to 70% into mantle, so a well is darker than the mantle page (1.05:1) as well as a panel (1.12:1). `--cn-surface-recessed`, the sidebar, is crust 50% into mantle, a step under the page, where it was mantle 55% into base.
- The open accordion's mauve tint mixes over transparent instead of into base, so an open row on the mantle page never turns lighter than the page; on a panel it is unchanged.
- `--neu-lifted` deepened from a `3px 4px 0` contact and `4px 8px 10px` near shadow to `4px 6px 0` and `6px 12px 14px`, darkness only, with no fill or rim change. The lead's foot is now 6px deep against a plain panel's 2px, past the 4px plate and as deep as the tilted panel's 6px plate on the bottom and 2px narrower on the right, because at 1x the old 1 to 2px step left the lead ranking mostly by its title.
- `--cn-surface-sunken` deepens again, from crust 70% into mantle to crust itself: 1.07:1 under the page and 1.14:1 under a panel, from 1.05:1 and 1.12:1. Darkness only. Wells, code blocks, skeletons and the switch plate read a step darker without turning into black holes. The disabled primary's label is 5.1:1 on it, and the switch paddle edge 5.1:1 against the plate.
- `--cn-surface-recessed` deepens from crust 50% to 80% into mantle: 1.05:1 under the page, from 1.04:1, so the sidebar parts from the page by more than its rule.
- `--neu-lifted` deepens again, from a `4px 6px 0` contact and `6px 12px 14px` near shadow to `6px 8px 0` and `8px 14px 16px`. With its border the lead's foot is 9px deep and 7px wide, three times a plain panel's 3px on the bottom. The foot's contrast is capped near 1.14:1 on the page, so only its area could grow. The cast is unchanged.
- `--cn-field-ring` moves from solid surface-1 (1.8:1 on base) to surface-2 at 85%: 2.1:1 on base, 2.2:1 on the page and 1.7:1 on an overlay. It is still even on all four sides with no lip, and it stops under 3:1 on purpose, because an overlay-0 ring at rest read as an outlined box. Hover, focus and `prefers-contrast: more` still carry the 3:1 ring.
- The plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`) and the Tailwind `hard`, `hard-lg` and `hard-sm` shadows stack the same ink in steps of about 1px out to their offset, where they were one offset copy. The color, reach and press are unchanged; the top-right and bottom-left corners now join, so the plate reads as the side of a block instead of a drop shadow with a notch at each end. Rest, half and hover keep four layers each, so the press still interpolates.
- `--neu-raised` shortens its contact from `2px 2px 0` to `1px 1px 0` at default and cozy density. Compact already had 1px, so its override is gone. With the ink border side a plain panel shows 2px of ink at every density, and the foot ladder then read 2, 4, 6 and 9px with at least 2px between steps. At 3px the panel sat 1px under the 4px plate and the two read as one size. Darkness only: the near shadow, the cast and the lit edge are unchanged, and a panel stands 1px lower on its right and bottom.
- `--cn-plate-tilt` is removed. `.panel.is-tilted` stands on `--cn-plate`, the clickable's plate (4px, 3px at cozy, 2px at compact), down from 6px, so the aside ranks below the data beside it. The foot ladder is three feet: panel 2px, plate 4px, lead 9px. `--neu-raised-soft` stays, since it is the small-object foot and not a rank.
- A resting field on an overlay takes the new `--cn-field-ring-overlay`, overlay-0 at 75%: 2.1:1 on the overlay fill, up from 1.7:1 and level with the ring on a panel. `.popover`, `.modal` and `.drawer` set `--cn-field-ring` to it, and a `.panel` or `.well` inside one sets it back to `--cn-field-ring-page`, a copy of the surface-2 ring, because overlay-0 is about 2.6:1 over crust. Solid surface-2 stops at 1.94:1 there. The ring on the page and a panel is still surface-2 at 85%, and `prefers-contrast: more` keeps the overlay-2 ring on every ground. Lint's overlay floor moves from 1.6:1 to 2:1.

**Removed.** Every name deprecated in 0.4.0, including the `.cn-scrim` div modals and drawers, `data-density="dense"`, `--hard-offset-color`, `--pane-radius`, the `-22` and `-28` utilities and Tailwind `micro` and `input`. The [migration table](#migrating-to-040) maps each to its replacement. The legacy `--line`, `--muted` and `--soft` go too: use `--surface-0` (or `--edge`), `--cn-fg-muted` and `--cn-fg-soft`.

**Color**
- Semantic roles: `--cn-fg` (text), `-soft` (an alias of `-body`), `-body` (subtext-1), `-muted` (subtext-0), `-placeholder` (overlay-2), `-faint` (overlay-1), `-disabled` (overlay-1), `--cn-fg-on-accent`, `--cn-interactive`, `--cn-interactive-hover`, `--cn-focus` (text) and `--cn-danger`, `-warning` (yellow), `-success`, `-info`. Recipes read roles, never palette stops, and `.cn-fg-*`, `.cn-tone-*` and the Tailwind maps expose them.
- All 26 Mocha colors: `--flamingo`, `--maroon` and `--sapphire` join.
- Mix steps `--cn-step-tint/-wash/-row/-engaged/-plate/-edge/-strong/-vivid` (4, 12, 16, 23, 25, 40, 50, 70%) replace loose percentages. A 14% step, `--cn-step-fill`, is folded into `--cn-step-wash`, so avatar grounds, the radio and live-dot halos and the `.mark` border move 2 points: an avatar ground is 1.26:1 on the page, from 1.31:1. `--cn-step-wash` stays at 12% while the hovers rise, because it is also the status tag ground: red text on its own wash over an overlay is 4.54:1 there, and 13% takes it to 4.45:1. `--cn-step-status-tint` is 6%, and `--cn-danger-tint`, `--cn-warning-tint`, `--cn-success-tint` and `--cn-info-tint` read it, so a status banner's tint is 1.10:1 (red) to 1.16:1 (yellow) against a panel where 4% gave 1.07:1 to 1.10:1. Body text on it stays 8.0:1 on a panel and 6.2:1 in a dialog. 8% was tried and dropped body text to 5.9:1 in a dialog. An invalid field, a palette tone and the open accordion keep `--cn-step-tint`. `.cn-tint-accent` mixes at `--cn-step-wash`, `.cn-edge-mauve` and `.cn-edge-accent` at `--cn-step-plate`, and the `.mark` border and live-dot halo at `--cn-step-wash` too.
- Status ladders: `--cn-<role>-tint/-wash/-edge/-border`, read through `--tint`, `--tone-wash`, `--tone-edge` and `--tone-border`.
- Data colors: `--cn-series-1..6` (teal, yellow, blue 70%, peach, pink 70%, mauve). Mauve is the last slot, so a chart of up to five series holds no bar in the interactive color. The first four alternate cool and warm, and peach and pink are the one pair of warm neighbors, a lightness step apart. The closest adjacent pair is teal and yellow at dE 6.6 for a protan reader. `--cn-ramp-1..5` and `--cn-diverge-1..5` ship beside them, all with Tailwind keys. The SPEC names the hue pairs that never sit side by side; status tags and banners are exempt, because they carry a word and a glyph.
- `.bar` and `.legend-item` read `--series`, falling back to `--accent`, instead of `--tone`.
- `--tone` defaults to `--cn-info`, so an untoned tag, banner or icon-button hover no longer borrows series 4.
- The primary label, `.mark` glyph, checkbox tick, switch bar and busy spinner paint `--cn-fg-on-accent`.
- `.cn-spine` paints `--cn-interactive`, because it marks position, not identity.
- Code line numbers use `--cn-fg-placeholder`.
- The SPEC hue table lists mauve's two text marks, the display `em` and the hero value through `--accent`, and allows at most one of those mauve text marks per view outside the wordmark; a series 6 data mark doesn't count. Special cases lists the display `em` beside the hero value. The dashboard example has no mauve `em` in its title, and its hero figure is set in `--cn-fg`, because the mauve primary shares the top band.

**Surfaces and depth**
- A surface ladder: sunken, band, recessed, page, raised and overlay (surface-0 90% into base, 1.27:1). The page is mantle and raised is base, so panels and plated controls lift by a fill step and by the contact edge, cast, lit top edge and hairline, never by a fill lighter than base. Overlays float, so they keep the lighter fill.
- `--cn-lit-edge`, a 1px top rim of surface-2 at 45% (1.5:1 on base), joins `--neu-raised` and every plate but the primary, which has its gloss.
- `--neu-lifted`: the lead panel's raise, ranked by darkness on the bottom and right only: a 6px 8px contact in the full ink, a hard foot 8px deep and 6px wide, past the 4px plate at default density, an 8px 14px 16px near shadow, an 18px 28px 48px cast and the plain lit edge. `.panel.is-lead` stands on it with `--edge-strong` on its top and left, so the lead reads higher at 1x with no bright rim.
- Raised shadows use crust halfway to black (`--neu-shade`, and `--neu-contact`, the full ink at 1.22:1) with a 1px contact edge at every density, so the lift reads on base. `--neu-ink` names the ink, `rgb(8 8 14)`. The SPEC draws every depth as one height model.
- The engaged wash is mauve at `--cn-step-engaged` (23%, 1.63:1 on base), 1.17:1 past the 1.40:1 hover, up from 20% and 1.52:1, which sat too close to hover on a dim screen. It stops at 23% because `--cn-fg-muted` on it is 4.52:1 and 24% takes that to 4.41:1; a chosen segmented hint and a selected row's meta are muted text on the wash. Mauve text on it is 5.0:1 and the rim 3.3:1.
- `--cn-fg-muted` is subtext-0 (7.4:1); placeholders take `--cn-fg-placeholder` (overlay-2).
- `.bar-chart`, `.bar-group` and `.bar` for horizontal bar charts. Bars paint `--cn-fill-ramp` without grain, like the switch paddle. A `.bar` draws a 12px bar, up from 8px. The 21px meta line still sets the row, so a chart's height does not change.
- `--control-edge` and `--cn-fg-disabled` are overlay-1 (4.4:1), so unchecked controls and the slider thumb clear 3:1 on raised and overlay fills too. Lint checks the control edge on every ground. Disabled text sits a stop under the placeholder on purpose, and WCAG 1.4.3 exempts inactive controls; the token comment and the SPEC say so.
- An invalid or warning field draws a full ring in the tone, and its help text leads with the glyph in the tone. An invalid select keeps its chevron. The label and help text no longer take the tone: the label keeps `--cn-fg-soft` and the help text moves up to `--cn-fg-body`, as on a banner.
- Micro, label and ui lead at 1.25, so a wrapped label or text-spacing override never collides.
- `data-density="cozy"`: 38px controls between the default and compact.
- Bare `h1` to `h4` take the display-sm, heading, title and name roles at zero specificity; header-band titles are the title role.
- `prefers-contrast: more` stands the tilted panel upright.
- Focus is `--cn-focus` text, a bright neutral, so it differs from the mauve engaged rim by hue as well as shape. Lavender joins the identity hues.
- Raised shadows drop the top-left highlight, `--neu-raised-soft` included: contact, cast and the lit edge. Carves and the pop shadow share the halfway-to-black base; the pop has a tighter second layer. A panel inside a panel takes the soft raise with the lit edge.
- `--neu-near`, a 3px 4px 6px shadow at .8 (.9 under `prefers-contrast: more`), joins `--neu-raised` after its 1px 1px contact edge, and an 8px 14px 16px one joins `--neu-lifted`, so a plain panel stands on a 4 to 6px dark foot along its bottom and right edges at 1x where the cast fades. The plain contact is 1px at every density, under the lead's 6px 8px foot and the plate: 4px at default density, 3px at cozy and 2px at compact.
- A panel's right and bottom border sides are `--neu-ink`, so on the side away from the light the fill meets the ink at 1.22:1 with no lighter line between them, and the border joins the contact as a 2px ink foot. The lead's foot is 9px deep and 7px wide. The top and left keep `--edge`, or `--edge-strong` on the lead, and nothing there is brightened. Nested and tilted panels take the same two sides. `prefers-contrast: more` and `data-contrast="more"` keep the full outline. The two rules carry the same weight, so a `cn-edge-*` utility or `.cn-engaged` on a panel wins in both. This is a recipe change, and no frozen token moves.
- The `.switch` plate takes `--cn-surface-sunken`, 1.14:1 under a panel, so the base paddle stands a fill step above its track and its edge is 5.1:1 against the plate. A disabled switch plate stays transparent, so off and disabled still differ.
- `.well` takes the `--cn-surface-sunken` fill, so a well no longer reads as an outlined panel.
- `--cn-well-ring` is `inset 0 0 0 1px color-mix(in srgb, var(--surface-1) 50%, var(--surface-0))`, where it painted nothing at rest. It is halfway between surface-0 and surface-1 and never lighter than surface-1: 1.7:1 on the crust fill, 1.6:1 on the page and 1.5:1 on base, still the quietest of the three carve rings. The sunken fill is only 1.07:1 under the page, so the ring holds a well's shape on a dim display. Wells, the mono wells and the disabled primary list it before the carve, so it paints over the dark wall and is even on all four sides, with no lighter side. Solid surface-0 was 1.3:1 on base and too faint to hold the shape; solid surface-1 read as an outlined control at 2.1:1 on the fill. `prefers-contrast: more` still closes it into surface-2. Lint holds it at 1.5:1 on the page, a panel and the sunken fill, and under the carve ring.
- A carve is darkness only. `--neu-inset` is one layer, `inset 3px 3px 8px` in `--neu-dark` at .8 (.88 under `prefers-contrast: more`), and `--neu-inset-soft` is `inset 2px 2px 5px rgb(8 8 14 / .5)`. Neither draws a light layer on the bottom and right walls, so fields, selects, textareas, wells, the mono wells, the tabs carve, the switch plate, stepper pills, skeletons and engaged states no longer read as a sunken bevel. The row press drops its lit bottom edge too.
- The lead panel's band title is `--lead-title-size` at the heading weight and tracking: 28px at default and cozy density, 20px at compact and at 655px and under, where display-sm drops under 34px, and the body size at 520px.
- Every shadow layer in recipes and utilities has a token: the plates (`--cn-plate`, `-half`, `-hover`, `-lg`, `-sm`), `--cn-primary-rim`, `--cn-gloss-inset`, `--cn-validation-ring`, `--cn-readonly-rule`, `--cn-sticky-rule`, `--cn-switch-ring`, `--cn-disabled-ring`, `--cn-halo-ring`, `--cn-live-halo`, `--cn-switch-glow`, `--cn-switch-glow-held` and `--cn-ground-ring`, with the values the recipes used.
- Label and name are 14px, so micro is the one 12px role.
- Series 3 and 5, blue and pink, step down in lightness for color-vision deficiency; `.is-hatched` adds stripes to a bar or legend swatch.
- Dashed means an open slot only. The on switch paddle carries a crust bar.
- The on switch's glow is `0 0 8px` of mauve at `--cn-step-plate` (25%), and `0 0 12px` at `--cn-step-edge` (40%) while held, up from 6px at 14% and 12px at 25%, so the on paddle lights the dark plate around it. Blur only, with no ring, and the plate is not tinted.
- The `.sidebar` rule is `--edge`, 1.92:1 on the page, up from `--edge-soft` at 1.24:1, in the column and under the folded bar. It is a flat divider between two grounds.
- Component folds also answer `.cn-container`.
- The SPEC states the one idea behind the ornaments, a three-panel depth budget per region, and the halation mitigations.
- `.panel.is-lead`, `.stat-grid.is-ruled`, and the `.cn-grid-12` page grid with `.cn-span-*`. The SPEC adds composition rules and a job for every hue.
- Panel, modal, drawer and popover headers sit on their parent's fill behind a divider. `--cn-surface-band` darkens table heads one step under whatever holds them.
- Hairlines fold into `--edge` (surface-2 70%, 1.85:1 on base and 1.6:1 on an overlay, quiet enough that a panel never reads as outlined at 1x), `--edge-soft` and `--edge-strong` (solid surface-2, 2.5:1 on base), so the lead panel and overlays wear a brighter cut edge than a plain panel in both modes. Under `prefers-contrast: more`, `--edge` is overlay-0 (3.4:1) and `--edge-strong` overlay-1 (4.4:1), so panels get a 3:1 boundary. `--hover` is surface-1 60% over transparent: 1.40:1 on base, 1.44:1 on the page and 1.23:1 on an overlay, with `--cn-fg` on it at 8.1:1, 8.4:1 and 7.3:1. It rose from 40% (1.24:1) and then 50% (1.31:1), which washed out on a dim screen, and it stays under the 1.63:1 engaged wash; it is a wash over the ground, never a lighter raised fill.
- A resting field takes `--cn-field-ring`: a quiet even hairline of surface-2 at 85% (2.1:1 on base, 2.2:1 on the page), the same on all four sides, with no lip, on every device. Fields, the cell field, disabled fields and the tabs carve list the ring before the carve, so it paints over the dark wall and stays even; under the carve the top and left walls dimmed it and the bottom and right read brighter. A validation ring paints over the carve the same way. Hover swaps in `--cn-field-hover-ring`, a full 1px `--control-edge` ring (4.4:1 on base, 3.5:1 on an overlay), and focus draws the focus ring. A focused field skips the hover swap, so the focus ring is its only bright ring. On a popover, modal or drawer the ring is `--cn-field-ring-overlay`, overlay-0 at 75%, 2.1:1 on the overlay fill. Under `prefers-contrast: more` a resting field closes into a full overlay-2 ring. The tabs carve and disabled fields take `--cn-carve-ring`, solid surface-1 (1.8:1 on base, 1.4:1 on an overlay), because neither is an input waiting for text; it is overlay-2 under more contrast. Wells and the mono wells take `--cn-well-ring`, the quieter surface-0 ring listed above.
- Plates default to `--neu-ink`, crust halfway to black (1.22:1 under base, where crust is 1.14:1), so the plate's side reads at 1x. `--plate` still overrides it.
- Link and button chips stand on the ink plate with the shared hover lift and half-slide press; a static `.chip` is flat, the base fill and the `--edge` outline with no shadow or lit edge, so on a chip raise and plate mean clickable. Elsewhere a hard plate means a clickable, an accent card or the one tilted aside. A disabled or `aria-disabled="true"` link or button chip drops its plate and lit edge for a flat `--edge-soft` outline at `--disabled-opacity`, with no lift or press, like the disabled secondary.
- `.cn-grid-2/3/4` and `.cn-grid-12` read one `--cn-grid-gap` (24px), so equal-column grids of panels no longer need `cn-gap-24`; a grid of small items composes `.cn-gap-16`. This changes the `.cn-grid-2/3/4` default from 16px.
- `.cn-grid-12` holds one row, and its children keep their content height (`align-items: start`). At 1060px, or in a `.cn-container` that narrow, splits go to halves, and a 9 and an odd last child take the row, as does a 3 after a 9.
- Skeletons take the well carve: the sunken fill and `--neu-inset`, darkness only with no ring, 1.14:1 under a panel where the band fill was 1.05:1. They breathe between full and .7 opacity, up from .5, so at their faintest they still sit 1.10:1 under a panel.
- The `.data-table` head rule is `--edge` (1.85:1 on a panel, 1.9:1 on the head fill), up from surface-0 (1.3:1), so the head parts from the rows by a rule that outranks the row rules and not by text color alone. `--cn-sticky-rule` follows it. The head fill stays at 1.05:1, one step under the panel.
- The tilted panel takes content height in a grid, and its prose sets at 15px, the compact body size, on the body leading: rotated 14px text rendered soft at 1x, and 15px stays under the 16px body, so the data panel beside it stays the louder block.
- The tilted panel stands on `--cn-plate`, the clickable's plate: 4px, 3px at cozy and 2px at compact, down from 10px, so the aside ranks below the data panel beside it. `.cn-hard-lg` keeps its 10px. Its shadow is `--cn-plate` and `--cn-lit-edge` only: the plate replaces the raised shadow, as it does under a clickable, so the hard block is its one depth cue. At 1060px and below it still flattens to `--neu-raised`.
- The depth model has four heights: below the ground, the ground, raised and floating. Raised stands on a soft foot or a hard plate, and one foot ladder sets the size: panel 2px, plate 4px, lead 9px of ink under the bottom edge at default density, each step at least 2px past the one before. The panel also differs from the plate by kind, a soft foot against a hard block. The lead panel is a step on the ladder and the tilted panel stands on the plate; neither is a height of its own. A panel is documented as three height signals: the fill step, the hairline and the foot; the lit edge marks the light side and adds no height. The ladder change removed `--cn-plate-tilt`, listed under "Changed after the freeze". No static label is raised: a chip on a span is flat, and the avatar is the one small static thing on the soft raise.
- A ranked row at the top of a panel takes the panel's top corners too.
- A ranked row's `.mark` is a 22px key at the label size, down from the 28px tile, so a list of pastel accents stops reading as a row of competing blocks.
- The `.stat-grid.is-ruled` rule is the new `--cn-stat-rule` token, equal to `--edge` (1.92:1 on the page), up from `--edge-soft`, so at twice the width the figures read as one band beside panel hairlines. Under `prefers-contrast: more` it lifts to surface-2 (2.6:1 on the page), between `--edge-soft` and `--edge`.
- `.tag` is a shallow carve in `--tone-wash` (12%) with `--neu-inset-soft` and no outline, in place of the `--tone-edge` hairline on `--tint`. Tone text on the wash is 5.7:1 (red) to 9.4:1 (yellow), and lint checks each status role on its wash as well as its tint.

**Type**
- Sizes are rem. micro 12, label 14, meta 14, ui 14, name 14 (aliases of the ui tokens: the ui role in `--cn-fg`, not a step of its own), body 16 (15 at compact density), lede 18, title 20, value 24, heading 28 (new, `.cn-heading`), value-lg 26 to 36, code 13, display-sm 30 to 40, display 36 to 56 at 1.08.
- `--cn-type-label-size` is 14px, up from 13px, so the small band is two sans sizes: the 12px caps micro, and 14px at 400 (meta), 500 (label) and 600 (ui, name). One pixel between label and meta read as a mistake, not a step. Tags, chips, field labels, stat labels and notes, marks, avatars, small buttons and text buttons grow 1px; a tag is 27.5px tall, from 26.25px. Mono code stays 13px.
- `--cn-type-value-lg-size` is `clamp(1.625rem, .67rem + 2.94vw, 2.25rem)`: 36px from 860px up, up from 32px and 1.5x the 24px value. It is display-sm less 4px, so a hero stat stays under a default page title at every width. `.stat.is-lg` still steps to 24px at 520px.
- `.stat.is-inline` values are `--cn-fg` (11.3:1) at 500, up from `--cn-fg-soft` (9.3:1), and the label is `--cn-fg-muted` (7.4:1) at 400, the meta weight, so key and value differ by weight and by two ink stops, as in `.kv`. A `.is-total` row keeps the name role at 600.
- `.breadcrumbs li` and resting `.pagination` items are 14px at 500, the label weight, down from 600. The `aria-current="page"` crumb and page stay 600, so the current one is a weight step, as in the sidebar.
- Cozy `--band-title-size` is 20px, up from 14px, so a panel title is one size in every default and cozy view. Compact keeps 14px.
- `.data-table th` follows `--cell-font-size` at the label weight: 14px, and 13px at compact with its cells. `.kv dt` inherits the list's 14px at the meta weight, 400, under the `dd`'s 500. Compact `--cell-font-size` is a literal 13px and no longer aliases the label size, so a `.tag`, a `.chip`, a `.btn.is-sm` and a `.btn-text` in a `td` take `--cell-font-size` too: a compact row is 13px throughout, and no tag is larger than the cell text beside it.
- Weights: label and micro 500; meta 400. Label and meta share 14px and differ by weight, ink and leading. The label takes `--cn-fg-soft` (subtext-1) where meta keeps `--cn-fg-muted`; name, buttons and title 600; 700 for heading, display and the wordmark. Tracking is -.01em at 20px and -.02em from 24px up, on value, heading and both display sizes; value-lg, which sets figures, is -.025em. Heading and display were -.025em and -.03em, where Plex Sans at 700 closed "tt" and "ng" until they touched.
- At 520px, and in a 520px container, band titles step down to 16px with the stat value, so the value still outweighs the title.
- Display sizes reach their maximum at 860px: display `clamp(2.25rem, .34rem + 5.88vw, 3.5rem)` and display-sm `clamp(1.875rem, .92rem + 2.94vw, 2.5rem)`, so on desktop widths display is 2x the heading and display-sm 1.43x.
- The sans is IBM Plex Sans, in place of Inter, which graders marked down every round as a neutral default. Plex has angled terminals and engineered figures with a voice of its own, stays clear at 13 and 14px on a dark ground and has true tabular figures; it beat Inter, Instrument Sans, Onest, Figtree, Manrope and Schibsted Grotesk, and pairing a display face (Space Grotesk, Bricolage Grotesque) added a voice without adding legibility. Pages link `IBM+Plex+Sans:ital,wght@0,400..700;1,400..700`. `IBM Plex Sans Fallback` is Arial or Liberation Sans at a 101.13% size adjust, a 101.36% ascent, a 27.19% descent and no line gap. The swap itself moved no tracking. The root drops `font-optical-sizing: auto`, which is the initial value. Metric-matched local fallback for JetBrains Mono. Mono surfaces turn ligatures off. `p` and `li` wrap pretty.

**States**
- Links underline at 40% of their color and go solid on hover; links in `nav` stay bare.
- Focus is one shape everywhere: a 2px `--cn-focus` (text) outline 3px off the edge, text fields included. Menu rows and select options keep an inset ring under keyboard focus.
- Engaged states wear `--engaged-edge`, a mauve rim at 4.7:1, and keep it under hover. The selected tab wears it too. `aria-expanded="true"` engages a ghost button.
- `.btn-ghost` rests on an `--edge-soft` hairline, 1.22:1 on a panel, with no fill and no plate, so it reads as a control beside a plated button. Ghosts in `.topbar nav` and `.is-icon` buttons have no resting hairline. Ghost hover steps the hairline up to `--edge`. The secondary hover keeps the base fill, warms its border toward mauve and deepens its plate 1px to `--cn-plate-hover`, since nothing raised is lighter than base.
- A disabled primary goes flat and sinks like a well: the sunken fill under the soft carve, `--neu-inset-soft`, the depth of a disabled field, so it stays shallower than any press and never reads as held, and `--cn-well-ring`, the quiet even dark hairline painted over the carve, inside a transparent 1px border, no edge, plate, ramp, grain or gloss, so it no longer shares a silhouette with a resting secondary. Darkness only, no lip. Other buttons dim to `--disabled-opacity`, .7, up from .6, and .8 under more contrast, up from .7: a disabled ghost label is 5.2:1 on base and a disabled chip label 4.3:1. A disabled `.btn-secondary` also drops its plate and lit edge and its outline falls to `--edge-soft`, since a plate says the block can be pressed; a busy secondary keeps its plate. `.segmented` options with `:disabled` or `aria-disabled="true"` do the same, and a chosen one keeps the engaged carve and dims. Disabled fields use `--cn-fg-disabled` without opacity. Disabled checkboxes, radios and switches drop to the soft `--edge`; the off switch paddle has a 3:1 edge, and the on paddle a crust bar. Dashed means an open slot only.
- The icon button's resting glyph is `--cn-fg-muted` (subtext-0, 7.4:1). `--cn-fg-faint` is for decorative icons.
- `.btn-secondary.is-icon` keeps the secondary's `--cn-fg` glyph, hover and plate press, for an icon beside plated buttons.
- Compact `--control-h-sm` is `max(24px, 1.625rem)`, 26px at the default size, so small controls clear the WCAG 2.5.8 floor with room.
- `.btn[aria-busy="true"]` turns a spinner in the label's place. `aria-disabled="true"` looks disabled and keeps focus.
- Read-only fields read as printed text: no carve, a rule underneath.
- `.btn-text` has no padding, so a button and an anchor sit flush with the content edge of the row above.
- `.input-lg` also works inside a `.field`.
- `.data-table td .input` is the inline edit: `--control-h-sm`, the soft carve and `--cn-field-ring`, the even hairline (2.1:1 on a panel) of any resting field. A cell field has no label above it, so it takes its name from the column header through `aria-labelledby`.
- In a customizable select, a hovered option takes `--hover` like a menu row and the checked option takes `--wash`.
- The accordion question sets at `--cn-type-body-size` and 600, 16px or 15px at compact density, so it matches the answer in size and leads it by weight and ink. It was 14px.
- `.data-table td` is 400, and a `strong` in a cell is 500 in `--cn-fg`, for amounts, marked by ink and right alignment. The `.cell-name` is the row's one 600, and a total keeps 600.
- Under `pointer: coarse` field text is 1rem, table-cell fields included, so iOS Safari does not zoom the page on focus. It is a literal 1rem because compact density steps the body size to 15px.
- The open accordion is its own step, the open carve (mauve at `--cn-step-tint`), not the engaged state, so body text in the fold keeps 7:1.
- A name cell's meta line follows `--cell-font-size`: 14px at default and cozy density, 13px at compact. Its `strong` and `small` are blocks, so the cell needs no `<br>`.
- Table and ranked row hovers, desktop and phone row mode, take mauve at `--cn-step-row` (16%, up from 13%) into base: 1.39:1 on a panel, level with the 1.40:1 hover, past the open carve's 1.08:1, and 1.18:1 under a selected row's 1.63:1 wash, so pointer tracking holds on a dense table. The row's text steps from `--cn-fg-soft` to `--cn-fg`, 8.2:1 on the row fill, and the color fades with the fill, the same ink step every `--hover` user and the selected row take. Text with its own color keeps it: `--cn-fg-soft` at 6.7:1 and `--cn-fg-muted` at 5.3:1. No outline or edge is added. Those two are under the 7:1 and 5.5:1 role floors, which apply at rest; text on a hovered row holds 4.5:1, and lint now checks it.
- In phone mode a `td.is-trail` leaves the label stack and rides beside the name: the last trailing cell on the title line, the one before it under it.
- `.stat.is-inline.is-total`: a summary total in the name and value roles under an `--edge` rule.
- Sidebar links are 500 and rest in `--cn-fg-muted`; hover and the current page take `--cn-fg`. The group that holds the current page lifts its `.cn-microlabel` to `--cn-fg` through `--cn-microlabel-ink`, which `.cn-microlabel` now reads. The current page is 600 with a 4px mauve spine on its start edge, a position rather than a press, and draws it in `Highlight` under forced colors. Below 1060px the sidebar body fades in and settles 4px when it opens.
- A focused read-only field rings at the control radius.
- Banner text is `--cn-fg-body` at the ui size, 14px at 400; the glyph, edge and tint keep the tone.
- Checkboxes, radios and switches drop the user-agent margin, and a `legend` drops its inline padding, so a fieldset's legend, controls and message share one start edge.
- Under `hover: none`, a chosen segmented option keeps its 1px press after a tap.
- `.checkbox:indeterminate`; `aria-invalid` on a checkbox, radio or fieldset edges them in danger.
- Danger, warning, success and info tags and banners draw a glyph from `--cn-glyph-*` when the markup brings none.
- In a menu with any icon row, rows without an svg and the group labels indent to the icon column, so every label starts on one line.

**Motion**
- `--ease-spring` is a `linear()` damped spring where supported. An opt-in root view-transition cross-fade.
- The route cross-fade is documented as the exit that pairs with `.page-enter`: the old view fades out as one piece over `--t-base` while the new one staggers in. A single-page app gets it from `document.startViewTransition()`; the showcase runs it on link clicks and on back and forward. A browser without view transitions swaps with no exit. No exit keyframe or exit stagger was added, since one would hold every navigation back.
- Smooth scrolling is scoped to `html:focus-within`, so a fragment link glides while a route change's `scrollTo` and find-in-page cut. `scrollbar-gutter: stable` stays on `html`.
- Reduced motion keeps overlay fades, drops travel, keeps spinners turning and holds skeletons still at .85 opacity, the midpoint of their breath.
- A Data changes section in the SPEC, and `.cn-arrive` for content that replaces a skeleton. A tab change and a filter that empties a table cut; only the tab pill slides.
- `.cn-morph` on the lead panel and the page's one primary names them `cn-lead` and `cn-primary`, so they morph across routes at `--t-base` on the ease-out. The SPEC documents how the fanned toast pile closes over a dismissed middle toast.
- Reduced motion cuts view-transition pseudo-elements by name, since the universal selector does not reach them, so the root cross-fade and the morphs land at once.
- With `tabs()` wired, the selected tab's raised fill is one pill that slides to the new tab over `--t-fast` on the ease-out.
- The SPEC states that the package ships no haptics: CSS cannot vibrate, iOS Safari has no Vibration API, and haptics belong to the consumer or a native shell.

**Accessibility**
- `data-contrast="more"` on the root element applies the `prefers-contrast: more` step without the OS setting, link underlines and the upright tilted panel included, so a page can offer it as a toggle. The accessibility page has one.
- `prefers-contrast: more`, `prefers-reduced-transparency`, `forced-colors`, `pointer: coarse` (44px targets) and `hover: none` are answered.
- The tooltip shows while a control inside it has focus, keeps its text out of the accessible name, and has an Escape hook, `data-tip-dismissed`. The SPEC and the popover page say that CSS alone does not hide a tip on Escape, so a CSS-only consumer adds the listener or calls `tooltips()`.
- `.cn-skip-link`.
- Focus not obscured (WCAG 2.4.11): `:root:has(.topbar)` sets `scroll-padding-top` to the bar's minimum height plus 12px, 80px by default, 72px at 760px and below and 64px for `.topbar.is-compact`. At 1060px and below `:root:has(.sidebar)` does the same for the folded sidebar bar, 71px over its 59px. Rows and focusable controls in a `.data-table.is-sticky-head` body take `scroll-margin-top: calc(var(--control-h) + var(--space-1))`, 50px by default.
- The SPEC and the Accessibility page list the expected screen-reader announcements for tabs, menu, listbox, combobox, toast and dialog. They follow from the roles and are not yet confirmed with a screen reader.

**New recipes and utilities**
- `.listbox` (`role="listbox"`): option rows on a `.popover` or in a `.well`, with the menu's row states: `--hover` on the hovered and active row, `--wash` and a mauve check on a selected one, the focus ring inset 2px on the active row under the keyboard.
- A combobox, `input[role="combobox"]` on `.input` or in a `.field`, is a text field with the select's chevron that opens a listbox. Date fields keep the field carve and states and tint the picker glyph overlay-1. A file field's `::file-selector-button` is a small secondary-shaped button on a 3px ink plate inside the carve. `--cn-chevron-image` and `--cn-calendar-image` hold the two glyphs. Under forced colors a selected option draws a `Highlight` rim, and the checks of a selected option or a checked menu row paint `CanvasText`.
- `.tag.is-solid`: the one urgent status in a view, such as Overdue. Crust on the tone, 8.1:1 on red, with no plate, gloss, grain or raise, so it never reads as a button. It takes a status tone, never mauve.
- A solid danger tag does not share a band or a row with the primary: red and mauve sit at dE 12.5 in OKLab and 1.14:1 in lightness, so it stays in a status column and a figure beside the primary takes the washed danger tag. The SPEC Data series section and Special cases say so. No fill changed.
- `.tag.is-quiet`: a row's default or in-progress state, such as Pending. A plain `--cn-fg-muted` label, 7.4:1 on a panel, with no tone, fill or carve. It keeps the tag's padding and transparent border, so the word lines up with the filled tags, and a status column holds two fills, the wash and the one solid. It had the sunken fill under a soft carve, which made a third treatment in the column.
- `.stat > p`: a note under the value in the label voice, 14px at 500 in `--cn-fg-muted`, so a stat reads 14, 24, 14. Write the note as a bare `p`; a `.cn-meta` on it drops it to 400.
- A `.btn` or `.btn-text` in `.empty-state` adds `--space-4` above itself, 24px under the copy. In `.is-fill` it adds `--space-2`, 12px.
- `.cn-bg-page` paints `--cn-surface-page`, the mantle ground; `.cn-bg-base` stays raw base.
- The lead panel ranks by room as well as height and title: `--lead-band-h` (72px, 60px cozy, 48px compact) sets its header band and `--lead-pad` (32px, 24px cozy, 16px compact) its header and footer inline padding, its body padding and, above 760px, the outer columns of a table that fills it, so the table lines up with the title. The `--neu-*` shadows are unchanged.
- Stats in an unruled `.stat-grid` inside a `.panel-body` take no padding of their own, so they line up with the header title and the inline rows at every width, the 520px step included.
- `.sparkline`: a 2px line in `--series` or `--accent` beside its value as text. In a cell too narrow for both, the value wraps under the line.
- `.tabs`, `.menu`, `.slider`, `.pagination`, `.breadcrumbs`, `.cn-prose`, `.skeleton`, `details.accordion`, `.sidebar` in `.app-shell.has-sidebar`, `.stat-grid`, `.is-num` table columns, `.codeblock` `.is-copied`.
- `.cn-top` and `.cn-baseline` realign a `.cn-split`. The split rule sat after the modifiers at the same specificity, so its `align-items: center` won. A `.cn-lede` that follows a title (`h1`, `h2`, `.cn-display`, `.cn-heading` or `.cn-title`) directly inside a split's first group takes `contain: inline-size`, so a header that stacks its title over its lede wraps on the title's width and the primary stays on the title line until the title no longer fits.
- `.cn-split`, `.cn-measure`, `.cn-with-side`, `.cn-mx-auto`, `.cn-container` grid folds, 48 and 64 spacing (`--space-7`, `--space-8`), page width tokens and `--cn-measure`.
- Recipes use logical properties.

**Behavior.** The CSS needs no script to look right, and one tag wires the widgets that need a keyboard model. Tabs, menus, listboxes and comboboxes are required to have one, either `js/auto.js`, `init()` from `catppuccin-neu/js` or the consumer's own widget library; slider fill and toasts stay optional, and a static page with none of those widgets can leave the tag out. The README quick start prints the `js/auto.js` tag in the same block as the stylesheet link, and the SPEC, module header and showcase pages say the same. `catppuccin-neu/js` has `tabs()`, `menu()`, `listbox()`, `slider()`, `tooltips()`, `toast()` (with swipe to dismiss) and `init()`. `listbox()` keeps `aria-activedescendant`, `data-active` and `aria-selected` in step for a listbox or the combobox that drives it, and `init()` wires both. The toast timer runs only while neither the pointer nor focus is in the stack, and a swiped toast exits through `[hidden]`. `tabs()` measures the selected tab into `--cn-tab-x` and `--cn-tab-w` for the sliding pill. `catppuccin-neu/js/auto` (`js/auto.js`) is a side-effect entry that makes it one line, an `import` or a `<script type="module">` tag: it wires every tablist, menu button, listbox, combobox and slider once the DOM is parsed, wires the ones added later once each, and removes the listeners of one that leaves. Load it or call `init()`, not both, for the same markup.

**Lint.** Fails on palette text stops and bare accent hues in recipes, hand-mixed hairlines, `outline: none`, a SPEC type table that disagrees with the tokens, a token comment whose ratio is off, and any WCAG or APCA pairing under its floor, computed from the tokens in both contrast modes. It also fails on a box-shadow that is not a list of tokens, an off-scale radius, uppercase outside `.cn-microlabel`, a transform or box-shadow transition with no named curve, a transition keyword curve, `!important` outside its four allowed places, and `title=` or `overflow: hidden` in the showcase. It holds design floors for `--edge` (1.8:1, 1.5:1 on an overlay), `--edge-strong` (2.4:1, 1.9:1, and above `--edge` on every ground) the lit edge (1.4:1, 1.3:1), the resting field ring (2:1, on an overlay through `--cn-field-ring-overlay`), `--cn-fg-muted` and mauve text on the engaged wash (4.5:1), and the carve ring (1.7:1), the well ring (1.5:1 on the page, a panel and the sunken fill, and under the carve ring), `--hover` and the row hover (1.35:1 on base, and under the engaged wash), the hovered field ring at 3:1, the resting field ring at 3:1 under `prefers-contrast: more`, and fails on any carve layer that falls from the bottom right or is lighter than the page, a panel or a well. The text roles are checked on the mantle page, the base panel fill, the overlay, the recessed sidebar and the sunken wells, and a ratio in a token comment that says "on the page" is read against mantle. It fails when `:root[data-contrast="more"]` and the `prefers-contrast: more` block declare different tokens. `frozenTokens` holds a snapshot of every frozen token resolved down to hexes, `--edge`, `--edge-strong`, `--cn-lit-edge` and each `--neu-*`, `--cn-plate*` and `--cn-surface-*`, with the ones `data-contrast="more"` and compact density re-declare, and fails on any difference or on a new token in those families that the snapshot does not list.

**Showcase.** `test:a11y` captures `/depth`, `/examples/dashboard` and `/examples/invoice` full page at 1400x900 and 1x and diffs them against committed baselines in `showcase/visual-baselines/` with pixelmatch and pngjs, failing past 0.1% of pixels; `--update-shots` refreshes the baselines, which depend on the system Chromium and fonts. It saves a dimmed copy of each capture, half the luminance under a 1.3 gamma, to `showcase/a11y-shots/dimmed/` for review. The invoice's line-items panel puts a payment note left of the totals, which stay 320px wide under the Amount column; the note and the totals share a baseline through `cn-baseline`. The dashboard's "Last 4 months" caption in the chart header and the invoice's "4 items" count in the Line items header are `.cn-meta` text, not static chips, since a date range or a count is not a tag. On a docs page the first demo takes the same frame and padding as every other demo and leads by position, a row demo shrinks its stage to the specimens while the caption, copy line and fold keep the column, and the fold spans the column with its prose at 68ch. It also applies the WCAG 1.4.12 text-spacing override on every route and fails on clipped text, under forced colors checks the focus ring and saves a screenshot per route to `showcase/a11y-shots/forced-colors/`, runs axe again under `prefers-contrast: more`, and under reduced motion fails on any transition or animation longer than 1ms apart from overlay fades and spinners. It also fails on sideways scroll or clipped text at 700px (200% zoom), on sideways scroll at 390px and 320px, on more than three raised panels under one parent, and on an example view with more than one primary, tilted panel or lead panel. A Sparkline page. The depth specimens group at and below the ground, then off it. The whole dashboard runs at cozy density, its tilted aside holds prose under a name-role heading with the figures set on the ground under it as divided rows, the invoice's overflow menu is a plated `is-lg` icon button, the Surfaces swatches sit on a fixed 176px track, tokens in docs table cells never break at their hyphens, the invoice's Details and Activity panels end near one line, the example ledes sit 24px under the display, the colors page shows a seventh team on sapphire, and links inside running prose are plain links rather than `.btn-text`. The dashboard's header is a `.cn-split.cn-top` holding a stack of the title and lede and then the primary, so the primary sits on the title line and follows the lede when the split wraps on a phone. Docs prose stops at the 68ch measure, and the accessibility page shows forced-colors captures of the controls, fields and engaged states. The dashboard's h1 is the full `.cn-display`, 56px at desktop widths and twice the 28px lead title, so the view has one headline. The dashboard's headline figure is a `.stat.is-lg` at 36px, so it outranks the 28px lead title, set in `--cn-fg` because the mauve primary sits in the same band. The dashboard's "Payments this month" sits on the ground under the tilted aside, not in a panel: a section heading over five `.stat.is-inline` rows in one `.cn-divide`, with no ruled grid nested in it, since ground figures take one form per section. Its column packs to the top, 24px under the aside, and the slack falls at the end of the column. The region then reads chart panel, tilted aside and ground-level figures, three levels from existing recipes, and the SPEC layout rules say supporting figures beside a data panel go on the ground. The dashboard and invoice tables wrap amounts in `strong`. The docs sidebar puts the `.mark` brand tile before the wordmark. The input page demos a combobox, a listbox, a date field and a file field. The motion page says the Curves replay can be pressed mid-travel to reverse the blocks. The showcase wraps in-app link navigation in `document.startViewTransition` where the browser has it, and the dashboard and invoice examples put `.cn-morph` on their lead panel and primary, so the two morph between those routes. Demo captions use the label role in `--cn-fg-muted`, 14px at 500, the same voice as the fold summary, so 600 stays with headings and controls. Docs prose runs 16px apart from title to lede to paragraph, keeping the 32px gap for demos and sections. The table demo's status tags use the status tones, so they take the status ladders and glyphs. The introduction says the hairline cuts a surface's edge and the dark foot gives its height. Every docs page leads with its demo: the doc kit folds the prose beside a demo into a closed accordion under it, titled by the demo's `why` prop, and contrast ratios move from prose into a Contrast column of the Props tables. From 1448px, the first width where the 860px column fits beside it, the content column starts 48px from the sidebar and a sticky "On this page" list of the page's h2 and demo titles takes the right column, with the current one in mauve. `test:a11y` starts with a motion check read from `getAnimations()`, not frames: the page-entrance stagger over `--t-slow` on the dashboard and the `/modal` page, a modal and a toast on `--t-base` in and `--t-exit` out, the tab pill sliding over `--t-fast` once `tabs()` is wired, and a held primary pressing `transform` and `box-shadow` over `--t-press`; `--motion` runs it alone. The examples column is 1040px against the docs' 860px. Fold summaries under a demo set in the label role, 14px at 500 in `--cn-fg-muted`, and turn mauve hovered or open. The sidebar scrolls its current link into view after each route change. On the dashboard, Pending is a quiet tag with a clock and Overdue is the solid tag in the table only; the Past due stat takes the washed danger tag. Stat notes are bare `p`s. The depth page opens on its specimens, ordered along the foot ladder with a one-line caption each, on 128px cubes, and its utilities table sits in a closed accordion, and the settings example puts "Last saved" under the lede and leaves Discard and Save in the form footer. Props tables drop a Values or Default column no row fills. The table page demos a loading table, `aria-busy` with skeleton cells and rows arriving on `.cn-arrive`, and the motion page lists every component's curve and duration. The dashboard's lower row spans 8 and 4, from 7 and 5, so the chart leads and the columns end closer together, and its bar scale ends at 75, from 80, so the longest bar reaches the end of its track.

**Docs.** A Naming paragraph in the SPEC Tokens intro states the prefix rule in use: bare names are Mocha stops and public knobs, `--neu-*` the shadow stacks, `--cn-*` semantic roles and internals, recipes unprefixed and utilities and helpers `cn-`. Nothing is renamed; a single prefix is a 0.6 decision. The SPEC type table says name is an alias of ui and lists what 12 and 14px each carry, and a band or a row holds one small size plus micro and one 600. The Special cases table folds its repeated exceptions into rules, 15 rows to 5: the four text marks and the sentence rule live in the "One signal per item" ground rule. Composition says a ground-level stack beside a panel packs to the top, with its children `--cn-grid-gap` apart and the slack at the end of the column; the bottom-align rule is gone. A compose-a-view checklist at the top of Composition, linked from the introduction. Its first step is a `.cn-skip-link` to `#main` as the first focusable element, with `tabindex="-1"` on `main`, since CSS cannot insert the link. Its header step is a `.cn-split.cn-top` of the title stacked over the lede and then the primary, and its lower row is 8 and 4. Data changes says a loading table keeps its head and row count and an optimistic row swaps in place. A plate takes color only when its block is the accent signal, the one primary and accent cards; every neutral clickable stands on ink. `--cn-fg-soft` is documented as a job alias of `--cn-fg-body`. The tilted panel holds prose, not ruled rows, with a name-role heading. A status-tone color-vision audit: warning and success fall to dE 2.9 for a protan reader and stay apart by glyph and word. Motion ties duration to distance and keeps hover lifts off frequent controls. Two sentences on why IBM Plex Sans. An ornament budget (one job per ornament kind, the ramp and grain counted as one fill, five named composites) and dark-only stance in the ground rules, the inset rule narrowed to transparent carves, sanctioned slot names (`.command-copy`, `.sidebar-toggle`, `td.cell-select`, `.copy-glyph`, `.done-glyph`), the primary's place in forms and first-run screens, the physical light, icon guidance, and Accessibility, Behavior, Dashboard and Settings pages in the showcase. The accessibility page says why the system is dark only and lists the bloom mitigations. The SPEC says why a tab rises and a segmented choice presses in, lists the selected tab among the resting heights, and says to even out a grid row by pairing or stacking panels, not by stretching one. A SPEC ground rule puts the page on mantle and raised surfaces on base. Special cases lets the hero value go text-colored when the view's primary shares its band. The motion section says state changes are transitions, so a reversal retargets from where the element is, and only page-enter and the loops are keyframes, which restart.

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
