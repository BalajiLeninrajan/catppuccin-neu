import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import { Doc, Demo, Props } from "../lib/doc";

/* data-contrast="more" on the root element applies the prefers-contrast
   step without the OS setting. The toggle sets it for the whole site, so
   it stays on across pages until switched off. */
function ContrastToggle() {
  const [on, setOn] = useState(() => typeof document !== "undefined" && document.documentElement.dataset.contrast === "more");
  const flip = () => {
    const next = !on;
    if (next) document.documentElement.dataset.contrast = "more";
    else delete document.documentElement.dataset.contrast;
    setOn(next);
  };
  return (
    <button type="button" class="btn btn-secondary" aria-pressed={on} onClick={flip}>
      {on ? "More contrast is on" : "Turn on more contrast"}
    </button>
  );
}

interface ContrastRow {
  role: string;
  palette: string;
  swatch: string;
  ratio: string;
  apca: string;
  use: string;
}

/* Curated captures from showcase/a11y-shots/forced-colors/, cropped to
   the demo stage. Regenerate them after a test:a11y run when a forced
   colors rule changes. */
const FORCED_SHOTS: [string, string, number][] = [
  ["/forced-colors/controls.png", "Under forced colors, a live primary and a disabled primary. Both draw a system-color edge; the disabled label is GrayText.", 150],
  ["/forced-colors/fields.png", "Under forced colors, two labeled fields. Each carved field draws a CanvasText edge in place of its shadow.", 180],
  ["/forced-colors/engaged.png", "Under forced colors, a segmented control. The chosen option draws a Highlight rim; the others keep a plain edge.", 160],
];

/* WCAG ratios and APCA 0.0.98G Lc on base (#1e1e2e), the raised fill
   panels take, and on the overlay fill, in that order. The mantle page is
   darker than base, so every role reads higher there. pnpm lint computes
   the same numbers from the tokens. */
const CONTRAST: ContrastRow[] = [
  { role: "--cn-fg", palette: "text", swatch: "var(--cn-fg)", ratio: "11.3 · 9.0", apca: "80 · 77", use: "Headings, names, values." },
  { role: "--cn-fg-soft", palette: "subtext-1, an alias of --cn-fg-body", swatch: "var(--cn-fg-soft)", ratio: "9.3 · 7.3", apca: "68 · 65", use: "Ledes, table cells, code, .cn-label and field labels." },
  { role: "--cn-fg-body", palette: "subtext-1", swatch: "var(--cn-fg-body)", ratio: "9.3 · 7.3", apca: "68 · 65", use: "Running text." },
  { role: "--cn-fg-muted", palette: "subtext-0", swatch: "var(--cn-fg-muted)", ratio: "7.4 · 5.8", apca: "56 · 53", use: "Meta, help, table heads. subtext-1 under prefers-contrast." },
  { role: "--cn-fg-placeholder", palette: "overlay-2", swatch: "var(--cn-fg-placeholder)", ratio: "5.8 · 4.6", apca: "46 · 42", use: "Placeholders. The floor for readable text. subtext-0 under prefers-contrast." },
  { role: "--cn-fg-faint", palette: "overlay-1", swatch: "var(--cn-fg-faint)", ratio: "4.4 · 3.5", apca: "35 · 32", use: "Decorative icons. Not for text a reader needs." },
  { role: "--cn-fg-disabled", palette: "overlay-1", swatch: "var(--cn-fg-disabled)", ratio: "4.4 · 3.5", apca: "35 · 32", use: "Disabled field text and labels. Exempt from the text floor. overlay-2 under prefers-contrast." },
  { role: "--cn-interactive", palette: "mauve", swatch: "var(--cn-interactive)", ratio: "8.1 · 6.4", apca: "61 · 57", use: "Links, the primary, checked controls." },
  { role: "--cn-focus", palette: "text", swatch: "var(--cn-focus)", ratio: "11.3 · 9.0", apca: "80 · 77", use: "The focus ring. The one bright neutral no state uses." },
  { role: "--cn-fg-on-accent", palette: "crust on mauve", swatch: "var(--cn-interactive)", ratio: "9.2 on mauve · 12.3 on pink", apca: "64 · 79", use: "Text and glyphs on a solid accent fill: the primary label, the checkbox tick, a mark. Measured on the fill and its hover." },
  { role: "--cn-danger", palette: "red", swatch: "var(--cn-danger)", ratio: "7.1 · 5.6", apca: "55 · 51", use: "Errors, overdue, destructive actions." },
  { role: "--cn-warning", palette: "yellow", swatch: "var(--cn-warning)", ratio: "12.9 · 10.2", apca: "88 · 85", use: "Warnings: due soon, expiring, outside the domain." },
  { role: "--cn-success", palette: "green", swatch: "var(--cn-success)", ratio: "11.0 · 8.7", apca: "78 · 75", use: "Paid, live, positive deltas." },
  { role: "--cn-info", palette: "blue", swatch: "var(--cn-info)", ratio: "7.8 · 6.1", apca: "59 · 56", use: "Drafts, syncing, neutral status." },
];

interface EdgeRow {
  edge: string;
  palette: string;
  swatch: string;
  ratio: string;
  against: string;
}

/* Non-text contrast (WCAG 1.4.11): the edges that identify a control or
   its state. */
const NON_TEXT: EdgeRow[] = [
  { edge: "Hovered field ring, --cn-field-hover-ring", palette: "overlay-1", swatch: "var(--control-edge)", ratio: "4.4:1 · 3.5:1", against: "A panel (4.8:1 on the page) · the overlay fill" },
  { edge: "Resting field ring under prefers-contrast: more, --cn-field-ring", palette: "overlay-2", swatch: "var(--overlay-2)", ratio: "5.8:1 · 4.6:1", against: "A panel (6.2:1 on the page) · the overlay fill" },
  { edge: "Checkbox, radio, switch plate, off paddle and slider thumb edges, --control-edge", palette: "overlay-1", swatch: "var(--control-edge)", ratio: "4.4:1 · 3.5:1", against: "A panel (4.8:1 on the page) · the overlay fill" },
  { edge: "Focus ring, --cn-focus", palette: "text", swatch: "var(--cn-focus)", ratio: "11.3:1 · 9.0:1", against: "A panel (12.1:1 on the page) · the overlay fill" },
  { edge: "Secondary button border, warmed on hover", palette: "mauve 50% into surface-1", swatch: "color-mix(in srgb, var(--cn-interactive) var(--cn-step-strong), var(--surface-1))", ratio: "4.1:1 · 3.2:1", against: "Base · the overlay fill it lifts to" },
];

/* Surfaces and lines: the lift, not text contrast. Ratios are on base,
   the panel fill, unless the row names the page. */
const SURFACES: Array<[string, string, string, string]> = [
  ["--cn-surface-page", "mantle", "the ground", "The body, the app shell, the topbar, stat bands."],
  ["--cn-surface-raised", "base", "1.07:1 on the page", "Panels, plated controls, chips, the selected tab."],
  ["--cn-surface-overlay", "surface-0 90% into base", "1.27:1 (1.36:1 on the page)", "Popovers, menus, dialogs, drawers, toasts, tooltips, the skip link."],
  ["--cn-surface-sunken", "crust", "1.14:1 under base (1.07:1 under the page)", "Wells, the mono wells, stepper pills, skeletons, the switch plate."],
  ["--wash", "mauve 23% into base", "1.63:1","The engaged state, a step past the hover."],
  ["--engaged-edge", "mauve 70% over the ground", "4.7:1 (3.3:1 on its wash)", "The rim of every engaged state."],
  ["--hover", "surface-1 60% over the ground", "1.40:1 (1.23:1 on an overlay)", "The ghost, menu, pagination and sidebar hover."],
  ["--edge", "surface-2 70% over the ground", "1.85:1 (1.92:1 on the page, 1.6:1 on an overlay)", "The hairline of panels and controls. overlay-0 under prefers-contrast: more, 3.4:1."],
  ["--edge-strong", "surface-2", "2.5:1 (1.9:1 on an overlay)", "The hairline of the lead panel, overlays and drawers. overlay-1 under prefers-contrast: more, 4.4:1."],
];

const COMPONENTS: Array<[string, string]> = [
  ["Icon button", 'Give it an aria-label. The icon is aria-hidden="true", and a tooltip never names it.'],
  ["Toast stack", 'Mark it role="region" aria-live="polite" with an aria-label, such as "Notifications".'],
  ["Busy button", 'Set aria-busy="true" with aria-disabled="true" while the action runs. Keep focus on it; never switch to disabled.'],
  ["Modal and drawer", "Open with showModal(). It traps focus, answers Escape and returns focus to the trigger."],
  ["Tooltip", 'The bubble is never part of the accessible name. Carry the same words in aria-describedby, or in aria-label on an icon button. A fact never lives only in a tooltip. Escape dismisses it through tooltips() in catppuccin-neu/js, or the listener on the Popover page.'],
  ["Avatar", 'Give an initials avatar role="img" and the person\'s name in aria-label.'],
  ["Accordion", "Use details and summary. Enter, Space and the disclosure role come with it."],
  ["Tabs", 'role="tablist" with an aria-label, role="tab" with aria-selected and aria-controls, role="tabpanel" with aria-labelledby. Keep a roving tabindex and wire Left, Right, Home and End, or call tabs() from catppuccin-neu/js.'],
  ["Menu", 'The trigger takes aria-haspopup="menu" and aria-expanded. Rows take tabindex="-1". Wire ArrowUp, ArrowDown, Home, End and Escape, and return focus to the trigger on close, or call menu() from catppuccin-neu/js.'],
  ["Slider", "Pair it with a visible label and an output. Set aria-valuetext when the number alone is not the value. Keep --value in step from an input listener, or call slider() from catppuccin-neu/js."],
  ["Pagination and breadcrumbs", 'A nav with an aria-label. The current page or crumb carries aria-current="page". Give chevron-only targets an aria-label.'],
  ["Scrolling well or table", 'A .scroll-well or .table-scroll that scrolls needs tabindex="0", role="region" and an aria-label, so a keyboard can scroll it.'],
  ["Skip link", 'Make .cn-skip-link the first focusable element, point it at main, and give main tabindex="-1" so focus follows.'],
  ["Table", "Give header cells th with scope. A sortable column carries aria-sort on its th."],
  ["Validation", "Set aria-invalid on the field and aria-describedby pointing at the field's small."],
  ["Read-only field", "Use the readonly attribute, not disabled, for a fixed value. It stays focusable and copyable, and focus still rings it."],
  ["Choice group in error", 'Set aria-invalid="true" on the fieldset, or on each checkbox or radio, so every unchecked box takes the danger edge. Point aria-describedby at the small that says what to fix.'],
  ["Status tag or banner", "Write the status as a word. A tone never carries meaning alone. A status tone draws its glyph from CSS; a red or yellow palette tone needs an aria-hidden svg first."],
];

/* What a screen reader should speak for each widget, from its roles and
   states. Expected, not observed: nobody has run the pass yet. */
const ANNOUNCE: Array<[string, string, string]> = [
  ["Tabs", "Focus on a tab", 'Its name, "tab", "selected" and its position, such as "2 of 3". The first tab reached also speaks the tablist\'s aria-label. A disabled tab is skipped and never spoken.'],
  ["Tabs", "Tab into the panel", 'The panel\'s name, taken from its tab through aria-labelledby, and "tab panel".'],
  ["Menu", "Focus on the trigger", 'Its name, "menu button" and "collapsed".'],
  ["Menu", "Opening it", '"Expanded" or "menu", then the first item: its name, "menu item" and its position, such as "1 of 4". A menuitemcheckbox adds "checked" or "not checked", and speaks the new state when toggled.'],
  ["Menu", "Escape", 'Focus returns, so the trigger speaks again with "collapsed".'],
  ["Listbox", "Focus, then each arrow key", 'The aria-label and "list box", then the active option: its name, "selected" when aria-selected is true, and its position. Focus never leaves the listbox.'],
  ["Combobox", "Focus on the input", 'Its label, "combo box", "collapsed" and its value.'],
  ["Combobox", "ArrowDown, then a pick", '"Expanded", then the active option\'s name and position. After the pick, "collapsed" and the new value.'],
  ["Toast", "A toast lands", 'Its title and body, once, after the current sentence. Focus does not move. Its button speaks "Dismiss" and "button". A dismissal is silent.'],
  ["Dialog", "showModal()", 'The dialog\'s name, from aria-labelledby, and "dialog", then the control that takes focus. The page behind cannot be reached.'],
  ["Dialog", "Closing it", "Focus returns to the control that opened it, which speaks again."],
];

/* WCAG 2.2 criteria the package touches. "How it is checked" is honest
   about what runs: lint, axe on the docs, a documented rule, the JS
   module, or a person. */
const WCAG: Array<[string, string, string, string]> = [
  ["1.4.1 Use of color", "A", "Every status tag and banner holds a word, and a status tone draws a glyph. Links carry an underline. An invalid field draws a ring in the tone and leads its help text with a glyph. Chart marks keep a value beside them.", "Documented rule. Your markup supplies the word. axe checks that links in docs text stand apart from it."],
  ["1.4.3 Contrast (minimum)", "AA", "Text roles hold 4.5:1 or more on the page, raised and overlay fills, in both contrast modes. Running text holds 7:1. Disabled text is exempt and still sits at 3.5:1 or more.", "Lint computes it from the tokens. axe checks the rendered text on every docs page."],
  ["1.4.4 Resize text", "AA", "Type sizes and control heights are rem, and display sizes clamp between rem bounds, so the browser font size and zoom scale every role.", "The browser check loads every docs page at 700px, the 1400px desktop at 200% zoom, and fails on sideways scroll or clipped text. Check the browser font size by hand."],
  ["1.4.10 Reflow", "AA", "The body holds a 320px minimum. Breakpoints at 1060, 760 and 520px fold the sidebar, grids and tables into one column. Code wells scroll sideways, which the criterion allows.", "The browser check fails any docs page that scrolls sideways at 390px or at 320px."],
  ["1.4.11 Non-text contrast", "AA", "A resting field is identified by its label and its carve, so it needs no 3:1 edge; hover rings it at 4.4:1 and focus at 11.3:1. The control edge, the slider thumb, the focus ring and the engaged rim hold 3:1 on every ground.", "Lint computes it from the tokens."],
  ["1.4.12 Text spacing", "AA", "The tightest roles lead at 1.25, and controls set a minimum height, not a fixed one, so a spacing override grows the box instead of clipping it.", "The browser check applies the 1.4.12 override on every docs page and fails on any box that clips its text."],
  ["1.4.13 Content on hover or focus", "AA", "Escape dismisses a tooltip, and it stays while the pointer is on its control or the bubble, or focus is inside it. On leave it lingers for --t-slow, so the pointer can cross onto the bubble.", "JS module: tooltips(), or the listener on the Popover page."],
  ["2.1.1 Keyboard", "A", "Buttons, fields, details, dialog and range inputs work from the keyboard natively. Tabs and menus need the arrow-key model.", "JS module: one import of catppuccin-neu/js/auto, or tabs(), menu() and init(). axe checks that every docs scroller takes focus."],
  ["2.4.7 Focus visible", "AA", "Every focusable element draws a 2px --cn-focus ring, text, 3px off its edge. No recipe removes it.", "Lint fails on outline: none and computes the ring's contrast."],
  ["2.4.11 Focus not obscured (minimum)", "AA", "A page that holds a .topbar gets scroll-padding-top on the root: the bar's minimum height plus 12px. Rows and controls under a sticky table head take a scroll-margin-top. The folded sidebar bar sets the same padding from its closed height. A topbar that wraps taller than its minimum is not covered.", "Documented rule. For a taller bar, set scroll-padding-top on html to the bar's height plus the 5px focus ring."],
  ["2.5.8 Target size (minimum)", "AA", "The smallest control is the compact small control, max(24px, 1.625rem): 26px at the default size and never under 24px. A 20px checkbox, radio or the switch counts once wrapped in .choice, which makes the label row the target.", "Documented rule. Wrap choices in .choice. axe checks target size on every docs page."],
  ["2.5.5 Target size (enhanced)", "AAA", "Under pointer: coarse every control is 44px or taller at every density.", "Documented rule."],
  ["2.3.3 Animation from interactions", "AAA", "Under reduced motion presses, slides and the page entrance land at once and overlays fade in place. Spinners keep a slow turn.", "The browser check reloads every docs page under reduced motion and fails on any transition or animation longer than 1ms, overlay fades and spinners excepted."],
];

function Swatch({ color }: { color: string }) {
  return (
    <span
      class="cn-r-chip cn-edge-soft"
      aria-hidden="true"
      style={`display:inline-block;width:16px;height:16px;vertical-align:middle;background:${color}`}
    />
  );
}

interface TableProps {
  head: string[];
  rows: ComponentChildren[][];
}

/* A plain data-table; each cell's data-label is its column head. */
function Table({ head, rows }: TableProps) {
  return (
    <table class="data-table">
      <thead>
        <tr>
          {head.map((h) => (
            <th key={h} scope="col">{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((c, j) => (
              <td key={j} data-label={head[j]}>{c}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function AccessibilityPage() {
  return (
    <Doc
      title="Accessibility"
      lede="What the system handles on its own, and what each component needs from your markup. Ratios are measured on base unless a table names another ground."
    >
      <h2 class="cn-title">Contrast</h2>
      <p class="cn-copy">
        Text reads a semantic role, not a palette name.
      </p>

      <Demo lead title="Semantic roles on a panel and an overlay" why="How the text roles were set, and why a tone never works alone">
        <div style="width:100%">
          <Table
            head={["Swatch", "Role", "Palette", "WCAG, a panel · overlay", "APCA Lc, a panel · overlay", "Use"]}
            rows={CONTRAST.map((r) => [
              <Swatch color={r.swatch} />,
              <code class="cn-code-inline">{r.role}</code>,
              r.palette,
              <span class="cn-tabular">{r.ratio}</span>,
              <span class="cn-tabular">{r.apca}</span>,
              r.use,
            ])}
          />
        </div>
      </Demo>

      <p class="cn-copy">
        Labels are{" "}
        <code class="cn-code-inline">--cn-fg-soft</code>. Meta, help and table
        heads are <code class="cn-code-inline">--cn-fg-muted</code>. Readable
        text stops at <code class="cn-code-inline">--cn-fg-placeholder</code>,
        which only placeholders use. The two roles under it are for icons and
        disabled states. The page is darker than a panel, so text there reads
        a little higher than the table's panel column.
      </p>

      <p class="cn-copy">
        The text roles also answer APCA lightness contrast, written Lc. Muted
        text holds meta and help, never running copy. A placeholder is never the only copy of
        a fact.
      </p>

      <p class="cn-copy">
        The status roles pass as text, but red, peach and pink sit close in
        lightness, and yellow and green merge for a red-green color-blind
        reader. A tone never carries meaning alone (WCAG 1.4.1). The word in
        the tag or banner states the status. Danger and warning also lead
        with a glyph. The glyph is{" "}
        <code class="cn-code-inline">aria-hidden</code>, and the word is what a
        screen reader hears. An svg that replaces a status glyph must keep a
        shape distinct from the other three.
      </p>

      <p class="cn-copy">
        A tag or banner with <code class="cn-code-inline">.cn-tone-danger</code>,{" "}
        <code class="cn-code-inline">-warning</code>,{" "}
        <code class="cn-code-inline">-success</code> or{" "}
        <code class="cn-code-inline">-info</code> draws its glyph in CSS when the
        markup holds no svg. The palette tones draw none, so a red or yellow
        tag brings an <code class="cn-code-inline">aria-hidden</code> svg.
      </p>

      <Demo title="The word states the status; the glyph comes from CSS" classes="tag cn-tone-danger · -warning · -success · -info" row>
        <span class="tag cn-tone-danger">Past due</span>
        <span class="tag cn-tone-success">Paid</span>
        <span class="tag cn-tone-warning">Due soon</span>
        <span class="tag cn-tone-info">Draft</span>
      </Demo>

      <h2 class="cn-title">Non-text contrast</h2>
      <p class="cn-copy">
        A control's bounds need 3:1 only when they are the one way to find
        the control. Buttons and fields rest on a hairline under 3:1. A label
        identifies each, so give every field a visible label. Hover closes a
        1px <code class="cn-code-inline">--control-edge</code> ring and focus
        draws the 2px focus ring, both above 3:1. Checkboxes, radios and
        switches carry a full{" "}
        <code class="cn-code-inline">--control-edge</code> at rest. Under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> the edge
        and disabled text move to overlay-2, and a resting field closes into
        a full overlay-2 ring.
      </p>

      <Demo title="Edges that identify a control" why="Which edges need 3:1 and which do not">
        <div style="width:100%">
          <Table
            head={["Swatch", "Edge", "Palette", "Ratio", "Against"]}
            rows={NON_TEXT.map((r) => [
              <Swatch color={r.swatch} />,
              r.edge,
              r.palette,
              <span class="cn-tabular">{r.ratio}</span>,
              r.against,
            ])}
          />
        </div>
      </Demo>

      <h2 class="cn-title">Surfaces</h2>
      <p class="cn-copy">
        The page is mantle. Panels and plated controls are base, one fill
        step above it. Every ratio here is quoted on the panel. Only the
        overlay fill sits lighter than base. An engaged state is a wash a
        step past the hover, inside a mauve rim that clears 3:1 on that wash.
      </p>

      <Demo title="Fills and lines" why="How a surface shows its bounds">
        <div style="width:100%">
          <Table
            head={["Swatch", "Token", "Mix", "Ratio", "Use"]}
            rows={SURFACES.map(([token, mix, ratio, use]) => [
              <Swatch color={`var(${token})`} />,
              <code class="cn-code-inline">{token}</code>,
              mix,
              <span class="cn-tabular">{ratio}</span>,
              use,
            ])}
          />
        </div>
      </Demo>

      <h2 class="cn-title">Links</h2>
      <p class="cn-copy">
        Mauve against body text is 1.1:1, so color alone cannot mark a link in
        prose. A link carries a 1px underline at 40% that goes solid on hover.
        Links inside a <code class="cn-code-inline">nav</code> are chrome and drop
        the underline.
      </p>

      <Demo title="A link in running text" why="Why links are underlined">
        <p class="cn-copy" style="margin:0">
          The March invoice is ready. <a href="#" onClick={(e) => e.preventDefault()}>Download the PDF</a> or
          forward it to your finance team.
        </p>
      </Demo>

      <h2 class="cn-title">Focus</h2>
      <p class="cn-copy">
        Focus is a 2px ring in <code class="cn-code-inline">--cn-focus</code>,
        the one bright neutral no state uses. It eases out from the element's
        edge to a 3px offset. The system never removes it. Fields take the
        same outline on any focus, pointer or keyboard.
      </p>

      <h2 class="cn-title">Type</h2>
      <p class="cn-copy">
        Every size is rem, so the reader's browser font-size setting scales
        every role. The microlabel is the one 12px role at the 16px default.
        Labels and meta are 14px. Body copy is 16px, and 15px at compact density.
      </p>

      <h2 class="cn-title">Touch</h2>
      <p class="cn-copy">
        Under <code class="cn-code-inline">(pointer: coarse)</code> controls are at
        least 44px tall at every density. A touch screen keeps{" "}
        <code class="cn-code-inline">:hover</code> after a tap, so hover lifts are off
        there and only the press runs.
      </p>

      <h2 class="cn-title">Reader preferences</h2>
      <p class="cn-copy">
        The system answers four more media queries with no work on your
        side. The contrast step also runs from{" "}
        <code class="cn-code-inline">data-contrast="more"</code> on the root
        element. Offer it as a toggle. This one sets it for the whole site.
      </p>

      <Demo title="More contrast, without the OS setting" why="Why the contrast step also has a toggle" classes='html[data-contrast="more"]'>
        <ContrastToggle />
      </Demo>

      <Props
        title="Preference queries"
        rows={[
          {
            name: "prefers-contrast: more",
            values: 'or data-contrast="more"',
            notes: "Text steps up one palette stop. The raised and carved shadows deepen. Disabled text and control edges move to overlay-2. Panel hairlines move to overlay-0, so a panel shows a 3:1 boundary. A resting field and the tabs carve close into a full overlay-2 ring, link underlines go solid, and grain goes off. The tilted panel stands upright.",
          },
          {
            name: "prefers-reduced-motion: reduce",
            notes: "Presses, slides and the page entrance land at once. Popovers, toasts, dialogs, drawers and tooltips fade in place at --t-fast with no travel. The spinner and a busy button keep a slow 2.4s spin. Skeletons hold still.",
          },
          {
            name: "prefers-reduced-transparency: reduce",
            notes: "The topbar and the folded sidebar go opaque. The scrim stops blurring and darkens to crust at 88%.",
          },
          {
            name: "forced-colors: active",
            notes: "Focus draws in Highlight. Carved fields, wells, stepper pills, the tabs carve, the progress track, the checkbox, radio and switch draw a CanvasText edge. Engaged states and the selected tab draw a Highlight rim, and a selected table row a Highlight outline. Checked and indeterminate states fill with Highlight. The grain hides.",
          },
        ]}
      />

      <p class="cn-copy">
        Under forced colors, from the{" "}
        <code class="cn-code-inline">test:a11y</code> run in Chromium's
        emulation. Every control keeps a system-color edge.
      </p>

      <div class="cn-stack cn-gap-16">
        {FORCED_SHOTS.map(([src, alt, h]) => (
          <img key={src} src={src} alt={alt} width={870} height={h} loading="lazy" style="max-width:100%;height:auto" />
        ))}
      </div>

      <h2 class="cn-title">Per component</h2>
      <p class="cn-copy">
        CSS cannot add names, roles or focus handling. These are yours.
        Tabs, menus, listboxes and comboboxes are required to have a
        keyboard model: one import of{" "}
        <code class="cn-code-inline">catppuccin-neu/js/auto</code> from the{" "}
        <a href="/behavior">behavior module</a>, or your own widget library.
      </p>

      <Demo title="What your markup does" why="What CSS cannot do for you">
        <div style="width:100%">
          <Table head={["Component", "What you do"]} rows={COMPONENTS.map(([c, d]) => [c, d])} />
        </div>
      </Demo>

      <h2 class="cn-title">Expected announcements</h2>
      <p class="cn-copy">
        What a screen reader should speak for each widget when the markup
        follows the table above. These follow from the roles and states.
        Nobody has confirmed them with a screen reader yet, and readers
        differ in wording and order.
      </p>

      <Demo title="What a reader should speak" why="Expected, not yet confirmed with a screen reader">
        <div style="width:100%">
          <Table head={["Widget", "When", "Expected speech"]} rows={ANNOUNCE.map(([w, when, says]) => [w, when, says])} />
        </div>
      </Demo>

      <h2 class="cn-title">Checked by lint</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">pnpm lint</code> computes every ratio on
        this page from the tokens, in the default values and under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code>. It fails
        the build when a pairing drops under its floor, when a ratio in a
        token comment drifts from the computed value, and when the{" "}
        <code class="cn-code-inline">data-contrast</code> block drifts from the
        media block. The text roles get a second check in APCA.
      </p>

      <Props
        title="Floors"
        rows={[
          { name: "--cn-fg, --cn-fg-soft, --cn-fg-body", values: "7:1", notes: "On the page, raised, overlay, recessed and sunken fills." },
          { name: "--cn-fg-muted", values: "5.5:1", notes: "On the page, raised, overlay, recessed and sunken fills." },
          { name: "--cn-fg-placeholder", values: "4.5:1", notes: "On the page, raised, overlay, recessed and sunken fills." },
          { name: "status roles, links", values: "4.5:1", notes: "On the page, raised and overlay fills, and each status role on its own tint." },
          { name: "field hover ring, control edge, focus ring, engaged rim", values: "3:1", notes: "On the page, raised and overlay fills. The control edge covers the slider thumb. The rim also on --wash." },
          { name: "resting field ring", values: "3:1", notes: "Under prefers-contrast: more only. By default the ring is a quiet hairline with a 2:1 design floor." },
          { name: "--edge, --edge-strong, --cn-lit-edge", values: "1.8, 2.4, 1.4:1 · 1.5, 1.9, 1.3:1", notes: "Design floors on the page and raised fills · the overlay fill. Not WCAG obligations." },
          { name: "--neu-inset, --neu-inset-soft", values: "dark only", notes: "Every layer is darker than the page, a panel and a well, so no carve draws a light lip." },
          { name: "--cn-fg-on-accent", values: "4.5:1", notes: "On the primary and its hover." },
          { name: "--cn-fg", values: "APCA Lc 75", notes: "On the page, raised and overlay fills." },
          { name: "--cn-fg-soft, --cn-fg-body", values: "APCA Lc 60", notes: "On the page, raised and overlay fills. APCA's level for content text." },
          { name: "--cn-fg-muted", values: "APCA Lc 50", notes: "On the page, raised and overlay fills. Labels and meta, never running copy." },
          { name: "--cn-fg-placeholder", values: "APCA Lc 40", notes: "On the page, raised and overlay fills. Never the only copy of a fact." },
        ]}
      />

      <h2 class="cn-title">Checked in the browser</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">pnpm --dir showcase test:a11y</code> builds
        this site and opens every page in Chromium at 1400 by 900. It runs
        axe-core with the wcag2a, wcag2aa, wcag21aa and wcag22aa rules, by
        default and under prefers-contrast: more. It applies the WCAG 1.4.12
        text-spacing override and fails on clipped text. Under forced colors
        it saves a screenshot for review and fails if the first focused
        control does not ring in Highlight. Under reduced motion it fails on
        any transition or animation longer than 1ms, overlay fades and
        spinners excepted. At 700px, the desktop at 200% zoom, it fails on
        sideways scroll or clipped text, and at 390px and 320px on sideways
        scroll. It fails when any element holds more than three raised
        panels, or an example view holds more than one primary, tilted panel
        or lead panel.
      </p>
      <p class="cn-copy">
        It also diffs the Depth page and the dashboard and invoice examples
        against committed baselines, and checks that the page entrance, a
        modal, a toast, the tab pill and a held primary run on their duration
        tokens.
      </p>

      <p class="cn-copy">
        It checks each page as it loads. Menus, dialogs, drawers, toasts and
        tooltips stay closed, and hover and focus states are not drawn. No one
        has tested the docs or the package with a screen reader, and axe
        finds only part of what WCAG asks. It checks these docs, not your
        markup.
      </p>

      <h2 class="cn-title">WCAG 2.2</h2>
      <p class="cn-copy">
        What the package does for each AA criterion it can affect, and how
        that is checked. Two AAA criteria are listed because the package
        answers them too. Names, roles and states come from your markup.
      </p>

      <Demo title="Criteria the package touches" why="How to read this table">
        <div style="width:100%">
          <Table
            head={["Criterion", "Level", "What the package does", "How it is checked"]}
            rows={WCAG.map(([c, level, does, how]) => [c, level, does, how])}
          />
        </div>
      </Demo>

      <h2 class="cn-title">Dark only</h2>
      <p class="cn-copy">
        The system is dark by design. It sets{" "}
        <code class="cn-code-inline">color-scheme: dark</code>, so native scrollbars
        and form controls match, and it does not answer{" "}
        <code class="cn-code-inline">prefers-color-scheme: light</code>.
      </p>
      <p class="cn-copy">
        Light text on a dark ground blooms for readers with astigmatism, so
        body text is subtext-1 rather than white, body weight is 400, leading
        is 1.6, and <code class="cn-code-inline">prefers-contrast: more</code>{" "}
        lifts every text role a stop.
      </p>
    </Doc>
  );
}
