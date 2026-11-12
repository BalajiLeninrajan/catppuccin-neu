# catppuccin-neu spec

A dark neumorphic design system in Catppuccin Mocha. This file holds the
rules the CSS cannot show and an index of the recipe classes. Values live
in `css/tokens.css`. Utilities are the `cn-*` classes in
`css/utilities.css`, and their names say what they do.

The [docs site](https://catppuccin-neu.balajileninrajan.dev) shows every
component, but it renders in the browser. Read this file when you cannot
run a browser. A page that loads the CSS from the CDN can fetch it at
`https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v2.0.1/SPEC.md`.

## Design rules

- **Names describe style.** A class names an appearance or a slot in one fixed pattern, never an action.
- **No single-use recipes.** Anything that cannot be generalized lives in the page's own CSS.
- **Generic content.** Docs, README and CSS comments never name a consumer project.
- **Dark only.** There is no light palette, and the CSS answers the contrast, motion, transparency, forced-colors, pointer and hover media queries.
- **The page is mantle and raised surfaces are base.** Only overlays take a lighter step, and anything below the ground is darker than the page.
- **A carve is darkness only.** One dark wall falls from the top left, with no light lip, inner glow or colored inner shadow.
- **Mauve is interaction.** Red, yellow, green and blue are danger, warning, success and info, and every other hue marks identity only, as an `--accent`.
- **One signal per item.** Color goes on plates and data marks, and text takes the accent only when the text is the mark, never in a sentence.
- **Status needs a word.** A tag or banner states its status in text, because color is never the only key.
- **Ornament budget.** A view holds one tilted panel, one primary and at most one `.is-lg` hero control.
- **The tilted panel holds prose.** It is a summary or an aside that comes after the data it comments on, never a table or a form.
- **Mono is for code.** Prose, headings and controls stay sans, and numbers in sans use tabular figures.
- **Uppercase is scarce.** Only `.cn-microlabel` and the stacked `.stat` label are uppercase.
- **Readable text is overlay-2 or lighter.** overlay-0 and overlay-1 are for icons, borders and disabled text.
- **`color-mix` is `in srgb`.** Every color is a Mocha value from the tokens or a mix of them.
- **No `overflow: hidden` to fix corner bleed.** It clips plates and tooltips, so a filled first or last child takes the parent radius minus 1px.

## Naming

| Prefix | Holds |
| --- | --- |
| bare | The Mocha palette (`--mauve`, `--surface-0`) and the knobs a page sets: `--accent`, `--tone`, `--series`, `--plate`, `--hard-offset`, `--grain`, `--page-width`, `--control-h`, `--space-*`, `--t-*`, `--ease-*`, `--edge` |
| `--neu-*` | The shadow stacks and their ink |
| `--cn-*` | Roles and internals that recipes read and a page rarely sets |

A recipe class is an unprefixed component name (`.btn`, `.panel`). A
utility is `cn-`. A modifier is `.is-*` on the recipe. Set `--accent`,
`--tone` or `--plate` on an element or a wrapper to re-key that subtree.
`data-density="compact"` on any ancestor gives 28px controls, a 2px plate
and tighter tables.

## Depth

Light comes from the top left. Every surface sits at one of five heights.

| Height | What draws it | Who |
| --- | --- | --- |
| below the ground | a carve, and for filled carves the sunken fill | fields, wells, the code wells, the switch plate, stepper pills, the disabled primary |
| the ground | mantle | the page, the topbar, static chips |
| raised on a soft foot | the base fill, the `--edge` hairline on all four sides, `--neu-raised` | panels |
| raised on a hard plate | the base fill and a lit top edge over a solid plate `--hard-offset` deep | buttons, segmented options, link and button chips, accent cards, the tilted panel |
| floating | the overlay fill, `--edge-strong`, `--shadow-pop` | dialogs, drawers, toasts, tooltips |

- A panel stands on 1px of ink and a plate on 4px. Compact density moves the plate to 2px and nothing else.
- The plate is ink. Under the primary it is mauve, and under an accent card it is the card's `--accent`.
- A plain panel has no lit edge and no darkened or brightened border side. A carved surface has no hairline.
- No static label is raised. A static chip is flat. The avatar is the one small static thing on a soft raise.
- A plated control lifts 1px on hover and slides half its plate when held. Ghost, icon and text buttons and table rows answer with a fill or a color.
- The light is physical. Plates fall down and to the right in right-to-left pages too.

## Composing a view

1. `<a class="cn-skip-link" href="#main">Skip to content</a>` first, then `.page-main` with `id="main"` and `tabindex="-1"`.
2. The title and the lede, then the view's one primary.
3. The key figures on the ground, as `.stat` blocks.
4. The panel the view is about.
5. Supporting panels with the data first. A tilted aside comes last.

- A region holds at most three raised panels. More items go in one panel or a table.
- Regions sit further apart than the panels inside one. Content in a panel uses `.panel-body`, not padding utilities, so it follows density.
- Pair panels of similar height in a row. Never stretch a panel into an empty tail.
- A form puts the primary in the footer after its fields.
- Every field needs a visible label. A resting field ring is too faint to mark the field alone.

## Motion and data

- Duration follows distance. A press or a lift takes `--t-press` or `--t-fast`, a toast or a modal `--t-base`, a drawer `--t-slow`. Exits take `--ease-in` over `--t-exit`.
- A press goes down on `--ease-out` and comes back on `--ease-spring`.
- State changes are transitions, so a change reversed halfway retargets. Keyframes run only for `.page-enter` and loops such as the spinner.
- Data moves less than chrome. A changed number swaps in place. Never count up or tween a figure.
- A change the reader asked for cuts with no animation: a sort, a filter, a new page of rows.
- A removed row leaves at once. A dismissed toast or a closed overlay is the only exit that animates.
- Never animate width or height on a box that holds text.
- Reduced motion removes movement, not feedback. Overlays still fade and the spinner still turns.
- Icons come from one stroke family: round caps and joins, a stroke near 2 on a 24-unit grid, `currentColor`, no fills. Lucide matches. An icon beside a word is `aria-hidden`, and an icon alone needs a name on its control.

## Responsive

Three breakpoints. Each removes decoration, never content.

- **1060px.** The tilted panel lies flat and the topbar goes to two columns.
- **760px.** The topbar shrinks and its nav scrolls sideways. A `.data-table` turns into stacked rows that read each `td[data-label]`, unless it sits in a `.table-scroll` with no `data-label`. `.cn-grid-3` and `.cn-grid-4` go to two columns.
- **520px.** The segmented control and `.kv` stack. Every `.cn-grid-*` goes to one column.

## Recipes

`css/recipes.css`. Each line gives the class, the markup it expects and
its modifiers. The CSS reads ARIA state, so set the attribute and the
look follows. Nothing here needs script except where a line says so.

**Surfaces**
- `.panel`: a raised box with no padding. Children `.panel-header` (an `h2` or `h3`, optional `.band-actions`), `.panel-body`, `.panel-footer`. `.is-tilted` for the one prose aside. `.is-shell` drops the chrome on phones.
- `.well`: a carved box. Add `.scroll-well` for a scrolling one with a faded bottom.
- `.accent-card`: a card on a plate in its `--accent`. Wrap it in an `a` to make it press.
- `.empty-state`: a centered column of an optional `svg`, a `strong`, a `span` and an optional `.btn`. `.is-fill` fills its pane.

**Buttons**
- `.btn` with one of `.btn-primary`, `.btn-secondary`, `.btn-ghost`, on a `button` or an `a`. Sizes `.is-sm` and `.is-lg`.
- `.btn.is-icon`: a square icon button with an `aria-label`. Add `.btn-secondary` for a plated one.
- `.btn-ghost.is-dashed` marks an open slot such as a drop zone. `.btn-ghost.is-danger` is red. `aria-pressed="true"`, `aria-current` or `aria-expanded="true"` on a ghost looks engaged.
- `.btn-text`: an inline mauve action in a row, footer or toast. A link in running prose is a plain `a`.
- `aria-busy="true"` swaps the label for a spinner and keeps the width. Pair it with `aria-disabled="true"`, which looks disabled and keeps focus. `disabled` works too.

**Fields**
- `.field`: a wrapper holding a `label`, then an `input`, `select` or `textarea`, then an optional `small` for help text. A bare `.input` works outside a field. `.input-icon` wraps an `svg` and an input.
- `aria-invalid="true"` on the control draws the error ring and marks the `small`. Point `aria-describedby` at the `small`.
- `readonly` shows the value as text on a rule. `disabled` dims the control and its label.
- `.choice`: `<label class="choice"><input class="checkbox">Text</label>`. The input is `.checkbox`, `.radio` or `.switch`.
- `.slider` on an `input type="range"`. Pair it with a label and an `output`.
- `.segmented`: a row of `button` or `label` options, each with a `b` label and an optional `small`. The chosen one takes `.active`, `aria-pressed="true"` or `aria-checked="true"`. `.is-stacked` makes tall rows.

**Status and labels**
- `.tag`: a small status label. `.banner`: a tinted message band. Both read `--tone` and take an optional `svg` first.
- Set the tone with `.cn-tone-danger`, `-warning`, `-success` or `-info`, or a palette tone such as `.cn-tone-peach`.
- `.chip`: an outlined pill. On an `a` or `button` it stands on a plate and presses.
- `.mark`: a small solid accent square holding a glyph or a letter.
- `.avatar`: a round with initials or an `img`, colored by `--accent`. `.avatar-stack` overlaps several.
- `.stepper`: a row of pills. The current one takes `.active` or `aria-current="step"`, finished ones `.is-done`.
- `.live-dot`: a pulsing green dot. `.spinner`: a loading ring.
- `[data-tip="Text"]`: a tooltip on hover and keyboard focus. The text is not read aloud, so repeat it in `aria-label` or `aria-describedby`. Touch never hovers, so a fact that matters also lives in the page. Never use `title`. To dismiss it on Escape, a listener sets `data-tip-dismissed` and removes it on blur.

**Data**
- `.stat`: a `span` label over a `strong` value, with an optional `p` note. `.is-lg` is the hero value in the accent. `.is-inline` is a label and value row. Stack rows in `.cn-divide`.
- `.data-table` on a `table`. Give each `td` a `data-label` for the phone layout. `.cell-name` holds a `strong` name over a `small` line. `th[aria-sort]` wraps its label in a `button`.
- `.table-scroll`: wraps a wide table so it scrolls sideways. With a `max-height`, `.data-table.is-sticky-head` pins the head inside it.
- `.ranked-row`: a `.mark` rank, a `strong` name and a trailing `b` value.
- `.progress-track`: a track holding one `span` whose width is the value. `.is-lg` is thicker.
- `.legend` holding `.legend-item` rows. Each swatch reads `--series`, then the item's own `--tone`, then `--accent`.
- `.kv`: a `dl` of `dt` keys and `dd` values.

**Code**
- `.terminal`: a mono well holding a `pre`. `.caret` is a blinking block.
- `.codeblock`: a `pre` that scrolls sideways. `.is-numbered` numbers lines when each line is its own element. Token colors are `.tok-keyword`, `.tok-string`, `.tok-number`, `.tok-fn` and `.tok-comment`. A direct `.btn.is-icon` child is the copy button.
- `.command`: one command line. `.command-text` holds the line with an optional `.command-prompt`. `.command-copy` is the copy button, holding `.copy-glyph` and `.done-glyph`. `.is-full` fills the row and `.is-wrap` wraps.
- Copying is the page's job. Add `.is-copied` to the button for the green done state.

**Accordion**

```html
<details class="accordion" name="faq">
  <summary><b>Title</b><span class="cn-meta">Meta</span></summary>
  <div class="fold"><div>Body</div></div>
</details>
```

- A shared `name` makes a group with one item open. `.accordion-stack` pads a group inside a panel. The fold's inner wrapper is one element.
- A label form also renders: `div.accordion` holding a `label` with a hidden checkbox or radio, then the same `.fold`.

**Overlays**
- `dialog.modal`: a centered dialog. `.is-wide` is wider. Open it with `showModal()` and close it with `close()`.
- `dialog.drawer`: the same API, pinned to the right edge at full height.
- `.toast-stack`: a fixed corner region with `role="region"`, `aria-live="polite"` and an `aria-label`. Each `.toast` is a row of a content column (a `b` title over a `span` or `p`) and trailing controls. Set `hidden` on a toast to play its exit, then remove it.

**Page**
- `.app-shell`: a column at least the viewport tall, so the footer sits at the bottom. `.is-fixed` locks it to the viewport for an app that scrolls inside.
- `.topbar`: a sticky bar of three columns, with a `nav` of ghost buttons. `.is-split` is brand left and actions right. `.is-compact` is a thin app strip.
- `.wordmark`: the product name, with an `em` for the mauve half and an optional `.mark` tile first. `.is-lg` and `.is-sm` resize it.
- `.page-main`: the centered page column. `.is-narrow` and `.is-reading` are narrower. Set `--page-width` to change the width.
- `.display-title` and `.lede`: the page title and the paragraph under it.
- `.page-footer`: a ruled footer the width of the column.
- `.page-enter`: staggers a view's children in on first render.
- `.cn-skip-link`: hidden until it takes keyboard focus.
