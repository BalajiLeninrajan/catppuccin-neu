import { Doc, Demo, Props, CodeBlock, ACCENTS } from "../lib/doc.jsx";

const headerSnippet = `<header>
  <p class="eyebrow">Quarterly report</p>
  <h1 class="display-title">Revenue, <em>at a glance</em>.</h1>
  <p class="lede">
    Every invoice, payout, and adjustment from the last ninety days,
    rolled into one page you can actually read.
  </p>
</header>`;

const shellSnippet = `<body class="app-shell">
  <header class="topbar">…</header>
  <main>…</main>
  <footer class="footer-neu">…</footer>
</body>

/* main is never styled by the package — apply the width pattern yourself: */
main {
  width: min(1440px, calc(100% - 40px));
  min-width: 0;
  margin: 0 auto;
  position: relative;
  z-index: 1;
}`;

const srOnlySnippet = `<button class="btn-icon" type="button">
  <svg …></svg>
  <span class="cn-sr-only">Open settings</span>
</button>`;

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export default function PageFurniturePage() {
  return (
    <Doc
      title="Page furniture"
      lede="The pieces that frame every page: the sticky topbar, the footer rule, the eyebrow-title-lede header stack, solid marks, the live dot, and the ambient shell wash. None of it is a component you configure — it is the chrome a page wears."
    >
      <p class="cn-copy">
        The furniture recipes never style bare elements. <code class="cn-code">.topbar</code> goes on
        a <code class="cn-code">header</code>, <code class="cn-code">.footer-neu</code> on
        a <code class="cn-code">footer</code>, and the main column is a documented pattern you apply in your own
        CSS — the package leaves <code class="cn-code">main</code> alone.
      </p>

      <Demo title="Page header — eyebrow, display title, lede" classes="eyebrow · display-title · lede">
        <header>
          <p class="eyebrow">Quarterly report</p>
          <h1 class="display-title">
            Revenue, <em>at a glance</em>.
          </h1>
          <p class="lede">
            Every invoice, payout, and adjustment from the last ninety days, rolled into one page you can
            actually read.
          </p>
        </header>
      </Demo>

      <p class="cn-copy">
        The header stack is the one place display type appears. The eyebrow sits above in uppercase mauve,
        the title takes an <code class="cn-code">em</code> for its accented phrase, and the lede caps its own
        measure at 690px. These three are aliases of the type
        roles <code class="cn-code">.cn-eyebrow</code>, <code class="cn-code">.cn-display</code>,
        and <code class="cn-code">.cn-lede</code>, kept so base-layer markup keeps working — new code can use
        either name.
      </p>

      <CodeBlock title="Header markup" code={headerSnippet} />

      <Demo title="Topbar" classes=".topbar">
        <header class="topbar">
          <span class="cn-title">Ledger</span>
          <nav class="nav-secondary sc-row" aria-label="Primary">
            <button type="button" class="btn-flat active" aria-pressed="true">
              Dashboard
            </button>
            <button type="button" class="btn-flat">Invoices</button>
            <button type="button" class="btn-flat">Teams</button>
          </nav>
          <div class="sc-row" style="justify-content:flex-end">
            <span class="chip">
              <span class="live-dot" aria-hidden="true"></span> Synced
            </span>
            <button type="button" class="btn-icon" title="Settings">
              <GearIcon />
              <span class="cn-sr-only">Open settings</span>
            </button>
          </div>
        </header>
      </Demo>

      <p class="cn-copy">
        The topbar is sticky, translucent over a 14px blur, and casts <code class="cn-code">--shadow-cast</code>{" "}
        with a lit hairline — the one surface that floats without being an overlay. Its grid is
        1fr / auto / 1fr, so the center nav stays centered regardless of what the ends hold. At 1060px the grid
        collapses to two columns and anything tagged <code class="cn-code">.nav-secondary</code> hides; at 760px
        the bar tightens and chips inside it go icon-only.
      </p>

      <Demo title="Footer" classes=".footer-neu">
        <footer class="footer-neu">
          <span>Ledger Console</span>
          <p>Build 4.2.1 · deployed 24 Aug 2026</p>
          <span class="chip">v4.2.1</span>
        </footer>
      </Demo>

      <p class="cn-copy">
        The footer is a hairline rule and quiet metadata — no depth, no fill. It shares the main column's width
        pattern, so it lines up with the content above it. On small phones the middle paragraph drops and only
        the wordmark and trailing mark remain.
      </p>

      <Demo title="Solid marks — the accent cycle" classes='mark-solid — set style="--accent:#…"' row>
        {ACCENTS.map((a, i) => (
          <span class="mark-solid" style={`--accent:${a.color}`}>
            {i + 1}
          </span>
        ))}
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.mark-solid</code> is the 28px identity square: step numbers, ranks, the logo
        tile. It fills with <code class="cn-code">var(--accent)</code>, sits on the mark mini-drop shadow, and
        keeps its numeral tabular. Re-key it per instance by setting <code class="cn-code">--accent</code>{" "}
        inline from your data.
      </p>

      <Demo title="Live dot" classes=".live-dot" row>
        <span class="live-dot" aria-hidden="true"></span>
        <span class="cn-meta sc-row">
          <span class="live-dot" aria-hidden="true"></span> 12 teammates online
        </span>
        <span class="chip cn-tone-green">
          <span class="live-dot" aria-hidden="true"></span> All systems operational
        </span>
      </Demo>

      <p class="cn-copy">
        The live dot pulses green through its halo to say "this number is current". It is presentational — pair
        it with text, and keep it <code class="cn-code">aria-hidden</code>. Under reduced motion the pulse
        stops on the first frame.
      </p>

      <p class="cn-copy">
        Two more pieces of furniture have no specimen here. <code class="cn-code">.app-shell</code> goes on the
        page root (usually <code class="cn-code">body</code>) and lays an almost-invisible mauve bloom over the
        top-left of <code class="cn-code">--base</code> — ambient light, not a gradient hero; this site's own
        shell wears it. <code class="cn-code">.cn-scrim</code> is the fixed, blurred crust backdrop that modals
        and drawers sit on — see those pages for it in action.
      </p>

      <CodeBlock title="Page shell + main column pattern" code={shellSnippet} />

      <Demo title="Screen-reader-only label" classes="cn-sr-only">
        <button type="button" class="btn-icon" title="Settings">
          <GearIcon />
          <span class="cn-sr-only">Open settings</span>
        </button>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.cn-sr-only</code> clips content out of the visual layout while leaving it in the
        accessibility tree — the icon button above still announces "Open settings". Its blunt
        sibling <code class="cn-code">.cn-hidden</code> is <code class="cn-code">display: none !important</code>:
        gone from layout and from assistive tech alike. Use sr-only to relabel, hidden to remove.
      </p>

      <CodeBlock title="Accessible icon button" code={srOnlySnippet} />

      <Props
        title="Furniture reference"
        rows={[
          {
            name: ".topbar",
            values: "sticky header",
            notes: "Translucent base, blur, --shadow-cast + lit hairline. 1fr/auto/1fr grid; .nav-secondary hides ≤1060px.",
          },
          {
            name: ".footer-neu",
            values: "page footer",
            notes: "Hairline top rule, main-column width, quiet meta. Middle paragraph drops ≤520px.",
          },
          {
            name: ".eyebrow",
            values: "alias of .cn-eyebrow",
            notes: "Uppercase mauve kicker; flex with 8px gap for a leading mark.",
          },
          {
            name: ".display-title",
            values: "alias of .cn-display",
            notes: "clamp(38–64px), weight 820; <em> renders mauve. Steps to 38/34px at 760/520px.",
          },
          {
            name: ".lede",
            values: "alias of .cn-lede",
            notes: "16px/1.65 subtext, max-width 690px.",
          },
          {
            name: ".mark-solid",
            values: "28px square",
            default: "--accent: var(--mauve)",
            notes: "Solid accent fill, --shadow-mark, tabular numeral. Set --accent inline per instance.",
          },
          {
            name: ".live-dot",
            values: "7px pulse dot",
            default: "green",
            notes: "currentColor fill + halo; recolor via a .cn-text-* utility. Keep aria-hidden.",
          },
          {
            name: ".app-shell",
            values: "page root wash",
            notes: "Radial accent bloom at top-left over --base. Ambient, not decorative.",
          },
          {
            name: ".cn-scrim",
            values: "fixed overlay backdrop",
            notes: "Blurred crust at 74%, z-index 70. Modals and drawers render inside it.",
          },
          {
            name: ".cn-sr-only",
            values: "clip pattern",
            notes: "Visually hidden, still announced. Label icon-only controls with it.",
          },
          {
            name: ".cn-hidden",
            values: "display: none !important",
            notes: "Removed from layout and the accessibility tree.",
          },
        ]}
      />
    </Doc>
  );
}
