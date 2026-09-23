# catppuccin-neu spec

A dark neumorphic design system in Catppuccin Mocha. This file and the CSS
in `css/` are the source of truth. [CHANGELOG.md](./CHANGELOG.md) records
how each rule got here.

## Ground rules

- **Generic content.** Docs, README and CSS comments never name a consumer project. Examples use neutral product content: dashboards, settings, invoices, messages.
- **Names describe style.** A class names an appearance (chip, banner, panel, dashed, tilted), never an action (add, back, search, submit).
- **No single-use recipes.** Anything that cannot be generalized lives in the consumer's own CSS.
- **Mono is for code.** The package sets `var(--mono)` only on `.cn-code`, `.cn-code-meta`, `.cn-code-inline`, `.terminal`, `.codeblock` and `.command`. A consumer may put mono on one element that earns it, never on prose, headings or a whole control set. Sans numbers use `tabular-nums`.
- **Uppercase is scarce.** Only `.cn-microlabel` is uppercase. It labels a fact, never a section.
- **Readable text is overlay-2 or lighter.** overlay-0 and overlay-1 are for placeholders, icons, borders and disabled text.
- **Depth replaces borders on inset surfaces.** Inset surfaces paint no border and no background of their own. Hairlines stay on raised surfaces and tinted surfaces. The checkbox, radio and switch keep an edge, because at 20px the carve alone is invisible.
- **One signal per item.** Color goes on plates and data marks such as a progress fill. Text stays text-colored. An accent comes from the item's identity, so the same item has the same accent on every page.
- **The ornaments stay.** The tilted panel, colored plates, the switch rocker, the primary gloss, the empty-state plate, the spring curve, page-enter, the toast pile and the scrim blur are the package's identity.
- **One tilted panel per page**, holding a summary or an aside, not the page's main data.
- **`color-mix` is `in srgb`.** `in oklab` is allowed only for data-visualization ramps.
- **Fonts.** Every page links Inter (100..900) and JetBrains Mono (100..800) from Google Fonts.

### Cascade

`css/index.css` declares three layers and imports the files into them:

```css
@layer cn.tokens, cn.recipes, cn.utilities;
@import "./tokens.css" layer(cn.tokens);
@import "./recipes.css" layer(cn.recipes);
@import "./utilities.css" layer(cn.utilities);
```

A utility beats the recipe on the same element: `well cn-bg-well` fills
the well and `panel cn-p-16` pads the panel. Consumer CSS is unlayered and
beats both, so an override never needs `!important`. The three files also
work as plain `<link>` tags in the same order.

With Tailwind v4, import the package before `tailwindcss`, so Tailwind's
utilities layer lands on top.

### Distribution

- Bundled apps install the git tag (`github:BalajiLeninrajan/catppuccin-neu#v0.4.0`) and import `catppuccin-neu/css/index.css`.
- Zero-build pages with a `package.json` run `catppuccin-neu-sync <dir>` in a pre-build hook and ignore the copies in git.
- Pages with no `package.json` link `https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.0/css/index.css`. Pin a full tag. Link `index.css`, not the three files, so the layers survive.
- Nobody commits copies of the CSS. Tags never move once pushed.

The docs deploy as the `catppuccin-neu` Cloudflare Worker at
https://catppuccin-neu.balajileninrajan.dev.

## Tokens

`css/tokens.css`, layer `cn.tokens`. Everything else reads these.

### Palette and faces

24 Mocha hexes, `--crust` through `--lavender`. Do not substitute a
hex. `--line`, `--muted` and `--soft` alias surface-0, subtext-0 and
subtext-1. `--sans` is Inter first and `--mono` is JetBrains Mono first,
each with system fallbacks.

### Type roles

Each role is four tokens: `--cn-type-<role>-size`, `-weight`, `-leading`
and `-tracking`. Weights are 400, 500, 600 and 700 only.

| Role | Size | Weight | Leading | Tracking |
| --- | --- | --- | --- | --- |
| micro | 10px | 700 | 1 | .08em |
| label | 12px | 600 | 1 | 0 |
| meta | 12px | 500 | 1.5 | 0 |
| ui | 13px | 600 | 1 | 0 |
| name | 13px | 700 | 1.3 | 0 |
| body | 14px | 400 | 1.6 | 0 |
| lede | 16px | 400 | 1.6 | 0 |
| title | 20px | 700 | 1.3 | -.03em |
| value | 20px | 600 | 1 | -.03em |
| value-lg | 28px | 600 | 1 | -.03em |
| code | 12px | 500 | 1.6 | 0 |
| display | `clamp(36px, 4.6vw, 56px)` | 700 | 1 | -.03em |
| display-sm | `clamp(26px, 3.4vw, 36px)` | 700 | 1 | -.03em |

display and display-sm share one weight, leading and tracking token.

### Spacing and radius

- `--space-1..6`: 4, 8, 12, 16, 24, 32. Every gap, padding and margin in recipes and utilities reads one of these, a density knob, 0 or 1px.
- `--cn-radius-panel` 16, `--cn-radius-card` 12, `--cn-radius-control` 8, `--cn-radius-chip` 4. Pills are 999px and rounds 50%. `--pane-radius` is a deprecated alias of the panel radius.

### Depth

Light comes from the top left. Every elevation is one of four neu tokens:

```css
--neu-raised:      8px 8px 18px var(--neu-dark), -4px -4px 10px rgb(69 71 90 / .22);
--neu-raised-soft: 3px 3px 8px rgb(17 17 27 / .44), -2px -2px 5px rgb(69 71 90 / .16);
--neu-inset:       inset 3px 3px 7px var(--neu-dark), inset -3px -3px 7px rgb(69 71 90 / .24);
--neu-inset-soft:  inset 2px 2px 5px rgb(17 17 27 / .52), inset -2px -2px 4px rgb(69 71 90 / .18);
```

`--neu-dark` is crust at .66 and `--neu-dark-soft` crust at .30. Three
shared composites float or mark: `--shadow-pop` (overlays), `--shadow-cast`
(the topbar) and `--shadow-mark` (the `.mark` drop with a white top edge).

### Contract properties

Set these on an element or a wrapper to re-key a subtree.

| Property | Default | Does |
| --- | --- | --- |
| `--accent` | mauve | Plates, marks, avatars, the hero value, the progress fill, the caret |
| `--tone` | peach | Tags, banners, icon-button hover, validation. `.cn-tone-*` sets it |
| `--plate` | crust | The hard offset's color. Undeclared on `:root`; read it as `var(--plate, var(--hard-offset-color, var(--crust)))` |
| `--hard-offset` | 4px | The hard offset's distance |
| `--page-gutter` | `clamp(12px, 3vw, 32px)` | Inline gutter of the page column, the footer and the topbar |
| `--page-pad` | `clamp(24px, 4vw, 48px)` | Block padding of the page column |
| `--page-width` | 1440px | Width of the page column and footer; unset on `:root` |
| `--progress-fill` | `var(--accent)` | The progress fill; any token color or gradient |
| `--ring-ground` | `var(--base)` | The ring color between stacked avatars |

### Mix tokens

- `--edge`: surface-2 at 40%. The raised-surface hairline.
- `--edge-soft`: surface-1 at 38%. Inner separators.
- `--tint`: the tone at 4%. Declared on `.cn-tint`, `.tag`, `.banner`, `.input` and field controls, so each reads its own `--tone`.
- `--wash`: mauve 7% into base. The engaged state.
- `--control-edge`: overlay-0. The edge of an unchecked control, 3:1 on base.
- `--disabled-opacity`: .5.

### Density

`data-density="compact"` on any ancestor switches every knob.
`data-density="dense"` is a deprecated alias of compact.

| Knob | Default | Compact |
| --- | --- | --- |
| `--control-h` | 46px | 28px |
| `--control-h-sm` | 34px | 24px |
| `--hard-offset` | 4px | 2px |
| `--cn-radius-panel` | 16px | 12px |
| `--band-h` | 64px | 44px |
| `--band-pad` | 12px 24px | 8px 16px |
| `--band-title-size` | 20px | 14px |
| `--body-pad` | 24px | 12px 16px |
| `--cell-pad` | 12px 16px | 4px 8px |
| `--cell-font-size` | 13px | 12px |
| `--chip-pad` | 8px 12px | 4px 8px |
| `--well-pad` | 12px 16px | 8px 12px |
| `--empty-h` | 260px | 120px |

Fixed sizes that ignore density: checkbox and radio 20px, switch 50x28,
avatar 32px (44px large), mark 28px, the command's copy control 34px.

### Motion

- `--ease-out: cubic-bezier(.16, 1, .3, 1)` for anything that answers the pointer or arrives.
- `--ease-in: cubic-bezier(.7, 0, .84, 0)` for anything that leaves.
- `--ease-spring: cubic-bezier(.3, 1.4, .4, 1)` for anything that returns. It overshoots by about a pixel.
- `--t-press` .08s, `--t-exit` .14s, `--t-fast` .16s, `--t-base` .22s, `--t-slow` .32s.

A press goes down on the ease-out in `--t-press` and comes back on the
spring in `--t-fast`. Entrances take the ease-out. Exits take the ease-in in
`--t-exit`. Keyframe loops keep literal durations.

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

### Global rules

- `[hidden]` is `display: none !important`. The popover, toast, `.cn-scrim`, div modal and div drawer are exempt so they can animate out, and so is `hidden="until-found"`. A consumer element that animates out through `[hidden]` opts out with `data-cn-animate-hidden`.
- Focus: a 2px mauve outline that eases from 0 to 3px offset over `--t-fast`. `::selection` is crust on mauve.
- Links are mauve, pink on hover, never underlined, with the chip radius so the focus ring follows them.
- `body` is `400 14px/1.6` sans in subtext-0. Headings are `--text`. Lists indent 20px with 8px between items and overlay-1 markers. Every recipe sets its own font, so chrome never inherits the body voice.
- A bare `em` is plain emphasis. Inside `.cn-display`, `.display-title` and `.wordmark` it is mauve and upright.
- `.scroll-well` sets the dark scrollbar color.
- Five keyframes: `enter`, `spin`, `pulse`, `blink`, `cast`.
- `.page-enter` animates its children 40ms apart on the ease-out over `--t-slow`. The sixth child and later share a .2s delay. Fill is `backwards`, so no child stays a containing block for fixed overlays.
- Reduced motion: animations and transitions run in .01ms with no delay. `.spinner` keeps a 2.4s spin.
- Forced colors: focus draws a `Highlight` outline, the checkbox, radio and switch draw a `CanvasText` edge, and checked states fill with `Highlight`.

### Tailwind

`tailwind/preset.cjs` (v3) and `tailwind/theme.css` (v4 `@theme inline`)
map the tokens onto Tailwind names. They add no recipes.

- Colors: the palette, `accent`, `tone`, `edge`, `edge-soft`, `tint`, `wash`, `control-edge`.
- Type: `text-microlabel`, `-label`, `-meta`, `-ui`, `-name`, `-body`, `-lede`, `-title`, `-value`, `-value-lg`, `-code`, `-display`, `-display-sm`, each with its weight, leading and tracking.
- Radii: `rounded-panel`, `-card`, `-control`, `-mark` (the control radius), `-chip`.
- Shadows: `neu-raised`, `neu-raised-soft`, `neu-inset`, `neu-inset-soft`, `pop`, `cast`, `hard`, `hard-lg`, `hard-sm`, `mark`.
- Spacing: Tailwind's own `1, 2, 3, 4, 6, 8` are 4 to 32px, so the scale is not remapped. Added: `control`, `control-sm`, `band`, `gutter`, `page-pad`.
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
- `.cn-engaged`: the selected state. Pressed 1px, full `--neu-inset`, `--wash`, transparent border. It comes after the edge utilities, so it clears a composed edge.

### Type roles

Each role reads its four tokens. Pick the role, not the face; there is no
font-family utility.

| Class | Role | Color |
| --- | --- | --- |
| `.cn-microlabel` | micro, uppercase | overlay-2 |
| `.cn-label` | label | overlay-2 |
| `.cn-meta` | meta, tabular | overlay-2 |
| `.cn-ui` | ui | inherited |
| `.cn-name` | name | text |
| `.cn-copy` | body | subtext-0 |
| `.cn-lede` | lede, max-width 690px | subtext-1 |
| `.cn-title` | title | inherited |
| `.cn-value` | value, tabular | inherited |
| `.cn-value-lg` | value-lg, tabular | accent; text inside an `.accent-card` |
| `.cn-display` | display, balanced wrap | inherited |
| `.cn-display.is-sm` | display-sm | inherited |
| `.cn-code` | code, mono, tabular | inherited |
| `.cn-code-meta` | code at leading 1, mono | overlay-2 |
| `.cn-code-inline` | mono at .92em, weight 500 | text |

The color utilities come after the roles, so `cn-microlabel cn-text-accent`
is a tracked label in the accent. Compose; never restate a role to recolor
it. Also here: `.cn-tabular`, `.cn-nowrap`, `.cn-truncate` (needs a bounded
width) and `.cn-text-center/-right/-left`.

### Color

- Text: `.cn-text-{text, subtext-1, subtext-0, overlay-2, overlay-1, overlay-0, mauve, pink, red, green, peach, yellow, blue, teal, lavender, accent, tone}`.
- Backgrounds: `.cn-bg-base`, `-mantle`, `-crust`, `.cn-bg-well` (crust 38% into mantle), `.cn-bg-head` (crust 30% into mantle), `.cn-tint`, `.cn-tint-accent` (accent 8% into mantle, fading to mantle at 48%).
- `.cn-tone-{red, green, peach, yellow, blue, mauve}` set `--tone` only.

### Borders and radii

- `.cn-edge` (`--edge`), `.cn-edge-soft`, `.cn-edge-line` (surface-0), `.cn-edge-mauve`, `.cn-edge-tone`, `.cn-edge-accent`, and `.cn-edge-dashed`, the only dashed border.
- `.cn-r-panel`, `-card`, `-control`, `-mark` (control radius), `-chip`, `-pill` (999px), `-round` (50%).

### Structure

- `.cn-spine`: a 4px accent bar on the left, inset 12px top and bottom. It marks position (the current row, the selected item), not identity.
- `.cn-sr-only` clips an element for screen readers. `.cn-hidden` is `display: none !important`.

### Layout

- `.cn-row` (flex, centered, gap 8), `.cn-stack` (grid, gap 12), `.cn-cluster` (wrapping flex, gap 8).
- Modifiers only add: `.cn-between`, `.cn-center`, `.cn-end`, `.cn-top`, `.cn-baseline`, `.cn-wrap`.
- Children: `.cn-grow` (flex 1, `min-width: 0`), `.cn-fixed`, `.cn-min-0`, `.cn-auto-l`, `.cn-w-full`, `.cn-fit`, `.cn-block`.
- `.cn-grid-2/3/4`: equal columns, gap 16. Three and four become two at 760px; all become one at 520px.
- `.cn-gap-*`, `.cn-p-*`, `.cn-mt-*`, `.cn-mb-*` on 4, 8, 12, 16, 24, 32, plus 0 on padding and margins. `.cn-px-*` and `.cn-py-*` from 8 up, plus 0. `.cn-m-0`. There is no horizontal margin utility.
- `.cn-divide`: a surface-0 hairline between children.
- `.cn-list-none`, `.cn-scroll-x`, `.cn-sticky-top` (top 0, z-index 2).
- `.cn-icon-sm/.cn-icon/.cn-icon-lg`: 13, 16 and 20px svg. Recipes size their own icons.

## Recipes

`css/recipes.css`, layer `cn.recipes`. Recipes read tokens and contract
properties only and never style bare elements. Deprecated names sit after a
`/* deprecated, removed in 0.5.0 */` comment in each selector list.

### Surfaces

- `.panel`: the main container. `--edge` border, panel radius, base fill, `--neu-raised`, no padding.
- `.panel.is-tilted`: rotated 1.2deg, a 10px hard offset over `--neu-raised`. Flat at 1060px and below.
- `.panel-header`, `.panel-footer`: bands `--band-h` tall with `--band-pad`. The header has the `cn-bg-head` fill, a divider, and the panel radius minus 1px on its top corners. The footer has only a top divider. A band holding `.band-actions` wraps; the cluster is right-aligned and wraps inside itself. Other bands stay on one line. An `h2` in a header takes `--band-title-size`.
- `.panel-body`: the content band, `--body-pad`.
- `.panel.is-shell`: drops its chrome at 760px so a phone page runs edge to edge.
- Band corner rule: a filled first or last child of a rounded surface takes the parent radius minus 1px on its outer corners. This covers panel headers, modal headers, popover children, and tables or ranked rows at a panel's edge, through `.table-scroll` too. Never fix corner bleed with `overflow: hidden`; it clips popovers and plates.
- `.well`: card radius, transparent, `--neu-inset`. Compose `cn-bg-well` for a fill. `.well.scroll-well` fades its bottom 34px with a mask.
- `.terminal`, `.codeblock`, `.command`: the mono wells. Card radius, crust 38% into mantle, `--neu-inset`, the code role in subtext-1, no border.
- `.empty-state`: a centered column at least `--empty-h` tall, overlay-2. An `svg` first child sits on a 56px carved round. `.is-fill` fills its pane instead.

### Buttons

Compose `btn` with a variant. `<a class="btn">` works. Heights come from
the density knobs.

- `.btn`: `--control-h`, 16px inline padding, control radius, 13px at 700. Svg 16px.
- `.is-sm`: `--control-h-sm`, 12px type, svg 14px. `.is-lg`: `--control-h` plus 12px, 14px type, svg 18px. One `.is-lg` per page.
- `.btn-primary`: mauve fill, crust text, a plate of mauve 25% into surface-0, and a white gloss inset at .16. Hover turns pink.
- `.btn-secondary`: base fill, `--edge` border, crust plate. Hover warms the border toward mauve.
- `.btn-ghost`: transparent until hovered. Held, it sinks onto `--neu-inset-soft`. With `aria-pressed="true"` or `aria-current` it wears the engaged state.
- `.btn-ghost.is-dashed`: a dashed surface-1 border, card radius, a faint fill. Hover goes mauve. It marks an open slot such as a drop zone.
- `.btn-ghost.is-danger`: red text, a red 9% wash on hover.
- `.btn.is-icon`: a `--control-h-sm` square in overlay-1. Hover tints toward `--tone`. `.is-icon.is-lg` is a `--control-h` square with a 20px svg.
- `.btn-text`: inline mauve text at 12px 700, pink on hover. Held, it moves 1px. Svg 13px.
- Disabled: `--disabled-opacity`, the variant's rest shadow, `not-allowed`.

### Inputs

- `.field label`: the label role in overlay-2, 8px above the control.
- `.input` and `.field input/select/textarea`: a carved well. No border, transparent, `--neu-inset`, `--control-h` tall, 16px inline padding, card radius, 13px at 500, tabular.
- Placeholder overlay-1, because the carve darkens the ground under it.
- Focus: `--neu-inset` plus a 2px mauve ring. The outline goes transparent, not `none`, so forced-colors mode still draws it. Field controls and select options are the only places the outline goes transparent, and each draws its own indicator.
- Textarea: at least twice `--control-h`, vertical resize.
- Select: a chevron data URI in the overlay-1 hex, 12px from the right. Where `appearance: base-select` works, the picker is a floating card with mauve checked options.
- `.input-lg`: 58px, 16px type. One per page.
- `.input-icon`: an 18px leading icon at 16px; the input pads to 44px.
- `.field small`: help text in the meta role, overlay-2.
- Validation: `aria-invalid="true"` on the control sets `--tone` to red; `.is-warning` sets peach. The well takes `--tint`, and the label and help text take the tone. The carve and focus ring stay.
- Disabled: overlay-0 text, `--disabled-opacity`, `--neu-inset-soft`.

### Tooltip

`[data-tip]` draws a bubble from the attribute: max 240px, control radius,
surface-1 border, `--shadow-pop`, the meta role. It shows on hover and
keyboard focus after .4s and rises 2px. It leaves at once. Never use
`title=`.

### Segmented and stepper

- `.segmented`: equal columns, gap 8. Options are `--control-h` plus 12px, control radius, base fill, and rest on the crust plate with the shared press. Selected (`.active`, `aria-pressed="true"` or `aria-checked="true"`) is the engaged state with a mauve `b` label. `.is-stacked` makes rows `--control-h` plus 24px with 16px labels.
- `.stepper`: inset pills (999px, well fill, `--neu-inset-soft`, label role, overlay-2 text). `.active` or `aria-current="step"` is mauve on a mauve 8% wash. `.is-done` is green.

### Marks, chips, tags, banners

- `.mark`: a 28px accent square, crust glyph, control radius, `--shadow-mark`, 12px at 700.
- `.chip`: an outlined pill, `--chip-pad`, base fill, `--neu-raised-soft`, label role in overlay-2, svg 14px. `.chip.is-glyph` is icon-only; keep an accessible name.
- `.tag`: a status tag in `--tone`. 4px padding, chip radius, tone 45% hairline, `--tint`, label role.
- `.banner`: a tinted band in `--tone`. 12px 16px padding, card radius, `--tint`, `--neu-inset-soft`, meta size.

### Selection controls

- `.choice`: a label row, `<label class="choice"><input>Text</label>`, gap 8, 13px. Dims to `--disabled-opacity` when its input is disabled.
- `.checkbox`: 20px, chip radius, `--control-edge` border, `--neu-inset-soft`. Hover edge overlay-1. Checked is a mauve fill with a crust tick that lands on the spring from `scale(.4) rotate(-8deg)`.
- `.radio`: the same well, round. Checked deepens to `--neu-inset` with a 9px mauve dot and a 3px halo.
- `.switch`: 50x28, control radius, `--neu-inset` with a 1px `--control-edge` ring. The 21x22 paddle tilts 16deg at rest. Checked, it slides 23px on the spring, tilts the other way, turns mauve, and glows at 6px. Held, it flattens; held while on, the glow blooms to 12px.
- Held checkbox and radio sink 1px onto the full inset.

### Accordion

A label and a hidden checkbox, with a fold that animates
`grid-template-rows` from `0fr` to `1fr` over `--t-slow`.

```html
<div class="accordion">
  <label><input type="checkbox"><b>Title</b><span class="cn-meta">Meta</span></label>
  <div class="fold"><div>Body</div></div>
</div>
```

- Closed rows are flat with a divider. Open (a checked input, `.is-open` or `data-open`) is the engaged state: card radius, full inset, mauve 4% wash, mauve title.
- Wrap the title in `<b>` (bold) or `<p>` (regular) so a trailing `.cn-meta` sits by the chevron. At 520px the meta wraps under the title.
- The fold's inner wrapper is one element with `min-height: 0`. Closed content is `visibility: hidden`, so it leaves the tab order.
- `.accordion-stack` pads a group inside a panel and drops the last closed divider.
- Radios sharing a name make an exclusive group. A radio cannot uncheck itself, so a group that must close fully needs this listener:

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

- `.avatar`: 32px round, accent 14% into mantle, accent 38% edge, `--neu-raised-soft`, 12px at 700. `.is-lg` is 44px.
- `.avatar-stack`: overlaps by 8px and rings each avatar with `--ring-ground`.
- `.spinner`: a 16px ring with an accent top edge on `spin` at .8s.

### Code

- `.terminal`: a flex column. `pre` pads with `--well-pad` and wraps. `.caret` is a 6x14 accent block on `blink`.
- `.codeblock`: pads with `--well-pad` and scrolls sideways. A direct `.btn.is-icon` child is a 26px copy control pinned 8px from the top right. `.is-numbered` draws a 3ch line gutter with CSS counters; wrap each line in its own element. `.tok-keyword` blue, `.tok-string` green, `.tok-number` peach, `.tok-fn` mauve, `.tok-comment` overlay-2 italic.
- `.command`: one command line, up to 480px wide and 50px tall. `.command-prompt` is mauve. `.command-copy` is a 34px icon button that turns green while the consumer holds `.is-copied`. `.is-full` fills the row and `.is-wrap` wraps a long statement.

### Accent card

`.accent-card` sits on a plate of its `--accent` mixed 50% into surface-0.
Card radius, 12px 16px padding, `--edge` border, base fill. The plate is its
only depth cue and the only place the accent shows. Text inside is
text-colored; data marks such as a progress fill keep the accent. Controls
inside rest on their own plate. Wrapped in a link, it takes the shared
press, and on hover the plate grows 1px.

### Data display

- `.stat`: a label `span` over a value `strong` in the value role. `.is-lg` uses value-lg in the accent. `.is-inline` is a baseline row, label left and value (`b` or `strong`) right; stack rows in `.cn-divide`.
- `.progress-track`: 7px, 999px, crust, `--neu-inset-soft`. The `span` fill reads `--progress-fill` and eases its width over twice `--t-slow`. `.is-lg` is 12px.
- `.data-table`: the class scopes all table styling. Header cells: `--cell-pad`, head fill, label role, overlay-2. Body cells: `--cell-pad`, 500 at `--cell-font-size`, subtext-1, tabular. `.cell-name` holds a 600 name over a meta line.
- Row hover presses the row: a mauve 6% wash plus a vertical gradient on each cell, dark at the top 5px and lit at the bottom 4px. The edge colors are registered with `@property` so they fade in. `tr[aria-selected="true"]` takes `--wash` and a deeper press.
- `th[aria-sort] > button`: a reset button with a chevron. The chevron hides while unsorted and flips for ascending.
- `.data-table.is-sticky-head`: header cells stick to the nearest scroll container, with the rule drawn as an inset shadow. Give the `.table-scroll` wrapper a `max-height` so it scrolls vertically and the header can pin.
- `.table-scroll`: scrolls a wide table sideways inside its wrapper. A table in it with no `td[data-label]` stays a table on phones.
- `td.cell-select`: a row-select checkbox cell. In phone mode it floats to the row's end.
- `.ranked-row`: a rank mark, a 600 name and a trailing value, with the same press.
- `.legend` and `.legend-item`: a wrapping key. Each item draws a 10px swatch in its `--tone`, with a sentence-case label in the meta role.
- `.kv`: a `dl` grid, keys in a column that fits them, values in text. Stacks at 520px.

### Overlays

All overlays float on `--shadow-pop`, never on neu depth.

- `.popover`: absolute, `min(390px, 100vw - 32px)`, card radius, surface-1 border. Header and footer pad 12px 16px; the footer is divider-only.
- `dialog.modal`: centered, `min(520px, 100vw - 32px)`, panel radius, surface-1 border. `.is-wide` is 760px. Its header is a band.
- `dialog.drawer`: pinned right, `min(420px, 100vw - 40px)`, full height, a left hairline, square corners.
- `showModal()` and `close()` are the whole dialog API. `::backdrop` is the scrim: crust at 80% with a 2px blur.
- `.toast-stack`: fixed 24px from the right and bottom, up to 380px wide. Toasts append at the bottom. At rest only the newest visible toast is in flow; the next two sit behind it at -12px and .96 and at -22px and .92, and older ones hide. Hover or focus fans the pile into a column. Depth counts visible toasts only.
- `.toast`: a row with a content column (`b` title over a `span` or `p`) and trailing controls. Card radius, surface-1 border, base fill, meta role. The package ships no toast JavaScript; the showcase has a Preact reference.
- Deprecated: `div.modal` and `div.drawer` inside a `.cn-scrim`, toggled with `hidden`.

Overlay motion:

- Popover fades and drops 4px over `--t-fast`. Toast fades and slides 16px from the right over `--t-base`.
- Modal fades, rises 8px and scales from .98 over `--t-base`. Drawer slides in over `--t-slow`. The backdrop fades with them.
- Every exit takes the ease-in over `--t-exit`.
- Popovers and toasts enter with `@starting-style` and exit through `[hidden]`, which keeps `display` and drops `visibility`. Dialogs use discrete `display` and `overlay` transitions. Where a browser lacks them, a dialog appears in place.

### Page

- `.page-main`: the page column, `min(var(--page-width, 1440px), 100% - 2 * var(--page-gutter))`, centered, `--page-pad` above and below. `.is-narrow` is 860px and `.is-reading` 740px.
- `.topbar`: sticky, `--band-h` plus 4px, `--page-gutter` inline, base at 91% with a 14px blur, a hairline and `--shadow-cast`. A three-column grid. Where `animation-timeline: scroll()` works, the cast fades in over the first 60px of scroll. `.topbar nav` is a row of ghost buttons. `.is-split` is two regions, brand left and actions right. `.is-compact` is a 52px app strip, `--band-h` (44px) at compact density.
- `.wordmark`: the name at 16px 700 with display tracking; `em` is the mauve half. A `.mark` before it is the brand tile (28px). `.is-lg` is 20px with a 34px tile. `.is-sm` is the footer brand at 13px: a 16px mauve glyph, the name, a mauve `b` suffix set .25em off the name, and an optional overlay-2 note in a `span`.
- `.page-footer`: same width as the column, at least 72px, a surface-0 top rule, overlay-2 text.
- `.display-title`: an alias of `.cn-display`. Both set `margin: 0`. `.lede`: the lede role, max 690px, 24px above and below.
- `.app-shell`: a column at least the viewport tall; its `main` absorbs the slack so the footer sits at the bottom. `.is-fixed` makes the shell exactly the viewport and turns off the root's `scrollbar-gutter`.
- `.deck`: hash-routed views. The `:target` child shows, the first child is the default, and a deep link shows the view that contains it.
- `.live-dot`: a 7px green dot with a 4px halo, pulsing every 1.5s.
- Deprecated: `.eyebrow`. Delete it; a kicker above a display title repeats the lede.

## Responsive

Three breakpoints. Each removes decoration, never content.

- **1060px**: the tilted panel flattens to `--neu-raised`, the topbar goes to two columns, and `.nav-secondary` hides.
- **760px**: the topbar is 60px (48px compact). Its nav scrolls sideways, and a split bar's actions wrap onto more rows. The footer stacks. The lede drops to 14px. Panel footers wrap. `.panel.is-shell` sheds its chrome. A `.data-table` becomes rows unless it sits in `.table-scroll` with no `td[data-label]`: the header hides, each `td[data-label]` puts its label in a 120px left column with the value beside it, a cell without a label spans the row, hairlines split rows, and the press moves to the row. `.cn-grid-3/4` go to two columns.
- **520px**: the segmented control stacks. Stat values drop to 16px (20px on `.is-lg`). The accordion stack tightens and its meta wraps under the title. `.kv` stacks. Every `.cn-grid-*` goes to one column.

## Verification

`pnpm lint` runs `scripts/lint.mjs` on the four CSS files and fails on:

- a custom property that references itself
- a raw duration in `transition`, `transition-duration` or `transition-delay` (only zero and the reduced-motion .01ms pass)
- a raw px value in a gap, padding or margin in recipes or utilities, other than 0 and ±1px

Reviewers also check:

1. Every `box-shadow` is a neu token, `--shadow-pop/cast/mark`, the hard offset (full, half, the +1px link hover, the fixed 10px and 3px), the tilted composite, the focus ring over an inset, the white gloss at .16, the cast hairline, a 13% halo ring (radio, live dot), the avatar ground ring, the switch glow, the switch and sticky-header 1px inset rings, or `--hard-extra`.
2. Every color is a Mocha hex from tokens, `currentColor`, `transparent`, `color-mix(in srgb, …)` of tokens, the white at .16 or .1, or the crust and surface-1 rgb values the neu tokens and the row press use. Data-URI glyphs use palette hexes. Mask gradients are exempt.
3. Every radius is a `--cn-radius-*` token, 999px, 50%, 0, or a parent radius minus 1px.
4. Mono follows the ground rule. `text-transform: uppercase` appears only on `.cn-microlabel` and the deprecated eyebrows.
5. Every transform or box-shadow transition names a curve. No transition uses `ease`, `linear` or `ease-in-out`.
6. The `:focus-visible` outline is never removed, only made transparent where a ring replaces it. `::selection` stays.
7. Each file parses alone and through `index.css`. Nothing depends on `!important` except `[hidden]`, `.cn-hidden`, and the reduced-motion and forced-colors blocks.
8. No `overflow: hidden` for band corners, no `title=`, no purpose-named classes.

### Showcase

`showcase/` is a Preact and Vite site that imports `../css/index.css`
directly and deploys `dist/` as Cloudflare Workers static assets. It is the
visual reference: every recipe and state appears at least once, and every
page uses the current names. `src/nav.ts` registers routes, sidebar order
and titles. Specimens sit on `--base`. Close buttons draw a 14px stroke
glyph, never a text character. Run it with
`pnpm --dir showcase install && pnpm --dir showcase dev`; `pnpm --dir
showcase build` must pass.

## Deprecated names

Every alias below still renders through 0.4.x and is removed in 0.5.0.
`rg "deprecated, removed in 0.5.0" css` finds each one in the CSS. The
[migration table](./CHANGELOG.md#migrating-to-040) maps each to its
replacement.

`.btn-flat`, `.btn-icon`, `.btn-dashed`, `.metric`, `.stat-row`,
`.stat-strip`, `.panel-heading`, `.chip-tone`, `.mark-solid`, `.table-neu`,
`.footer-neu`, `.footer-brand`, `.is-error`, `.cn-display-sm`, `.eyebrow`,
`.cn-eyebrow`, `.cn-*-22`, `.cn-*-28`, `.cn-scrim` with div modals and
drawers, `data-density="dense"`, `--hard-offset-color`, `--pane-radius`,
Tailwind `micro` and `input`.
