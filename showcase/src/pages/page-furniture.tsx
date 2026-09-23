import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const headerSnippet = `<header>
  <h1 class="cn-display">Revenue, <em>last 90 days</em></h1>
  <p class="lede">
    412 invoices, 38 payouts and 6 adjustments, grouped by team.
    Figures settle nightly at 02:00 UTC.
  </p>
</header>`;

const shellSnippet = `<body class="app-shell">
  <header class="topbar">…</header>
  <main class="page-main">…</main>
  <footer class="page-footer">…</footer>
</body>

<!-- a different column for one page -->
<main class="page-main" style="--page-width: 980px">…</main>

<!-- an app that owns the viewport: panes scroll, the page does not -->
<body class="app-shell is-fixed">…</body>`;

const NAV = ["Dashboard", "Invoices", "Teams"];

function GearIcon() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true">
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" />
    </svg>
  );
}

export default function PageFurniturePage() {
  const [current, setCurrent] = useState("Dashboard");

  return (
    <Doc
      title="Page furniture"
      lede="The pieces that frame a page: the header, the topbar, the page column, the footer and the live dot."
    >
      <p class="cn-copy">
        The furniture recipes never style bare elements.{" "}
        <code class="cn-code">.topbar</code> goes on a{" "}
        <code class="cn-code">header</code>,{" "}
        <code class="cn-code">.page-main</code> on{" "}
        <code class="cn-code">main</code> and{" "}
        <code class="cn-code">.page-footer</code> on a{" "}
        <code class="cn-code">footer</code>.
      </p>

      <Demo title="Page header" classes="cn-display · lede">
        <header>
          <h1 class="cn-display">
            Revenue, <em>last 90 days</em>
          </h1>
          <p class="lede">
            412 invoices, 38 payouts and 6 adjustments, grouped by team. Figures settle nightly at 02:00 UTC.
          </p>
        </header>
      </Demo>

      <p class="cn-copy">
        A page header is a display title and a lede. The title names the
        page. The lede says what is on it, with numbers where there are
        numbers. Nothing sits above the title: a kicker there repeats the
        lede. An <code class="cn-code">em</code> inside the title turns mauve
        and upright. <code class="cn-code">.display-title</code> is an alias
        of <code class="cn-code">.cn-display</code>. Both zero the heading's
        margin, and <code class="cn-code">.lede</code> is the lede role with
        its own margins.
      </p>

      <CodeBlock title="Header markup" code={headerSnippet} />

      <Demo title="Topbar" classes=".topbar">
        <header class="topbar">
          <span class="cn-title">Ledger</span>
          <nav class="nav-secondary" aria-label="Primary">
            {NAV.map((item) => (
              <button
                key={item}
                type="button"
                class="btn btn-ghost is-sm"
                aria-current={current === item ? "page" : undefined}
                onClick={() => setCurrent(item)}
              >
                {item}
              </button>
            ))}
          </nav>
          <div class="cn-row cn-end">
            <span class="chip">
              <span class="live-dot" aria-hidden="true"></span> Synced
            </span>
            <button type="button" class="btn is-icon" aria-label="Open settings" data-tip="Settings">
              <GearIcon />
            </button>
          </div>
        </header>
      </Demo>

      <p class="cn-copy">
        The topbar is sticky, translucent over a 14px blur, and casts{" "}
        <code class="cn-code">--shadow-cast</code> with a lit hairline. Its
        grid is 1fr, auto, 1fr, so the center nav stays centered. The nav is a
        row of small ghost buttons; the current page takes{" "}
        <code class="cn-code">aria-current</code> and the engaged state. At
        1060px the grid drops to two columns and anything with{" "}
        <code class="cn-code">.nav-secondary</code> hides. At 760px the bar
        tightens and a nav that outgrows it scrolls sideways inside the bar.
      </p>

      <Demo title="Split topbar with a wordmark" classes="topbar is-split · wordmark > mark">
        <header class="topbar is-split">
          <a class="wordmark" href="#" onClick={(e) => e.preventDefault()}>
            <span class="mark" aria-hidden="true">L</span>Ledg<em>er</em>
          </a>
          <div class="cn-row">
            <span class="chip"><span class="live-dot" aria-hidden="true"></span> Synced</span>
            <button type="button" class="btn btn-ghost is-sm">Docs</button>
            <button type="button" class="btn btn-secondary is-sm">Sign in</button>
          </div>
        </header>
      </Demo>

      <p class="cn-copy">
        A page with no center nav takes <code class="cn-code">is-split</code>:
        brand left, actions right. At 760px the action row wraps onto more
        rows, right-aligned, so no action hides.{" "}
        <code class="cn-code">is-compact</code> is the 52px app strip, 44px
        at compact density. A{" "}
        <code class="cn-code">.mark</code> before the wordmark's name is the
        brand tile, and <code class="cn-code">.wordmark.is-lg</code> is the
        20px hero size.
      </p>

      <Demo title="Footer" classes=".page-footer · .wordmark.is-sm">
        <footer class="page-footer">
          <span class="wordmark is-sm">
            <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="8" r="6" /></svg>
            Ledger <b>Console</b>
            <span>build 4.2.1</span>
          </span>
          <p>Deployed 24 Aug 2026</p>
          <span class="chip">v4.2.1</span>
        </footer>
      </Demo>

      <p class="cn-copy">
        The footer is a hairline rule and metadata, with no depth or fill. It
        follows the page column's <code class="cn-code">--page-width</code>,
        so it lines up with the content above it, and stacks at 760px.{" "}
        <code class="cn-code">.wordmark.is-sm</code> is its brand: a glyph in
        mauve, the name, and an optional note.
      </p>

      <CodeBlock title="The page shell" code={shellSnippet} />

      <p class="cn-copy">
        <code class="cn-code">.page-main</code> is the column: 1440px, or the
        viewport less a <code class="cn-code">--page-gutter</code> on each
        side, centered, with <code class="cn-code">--page-pad</code> above and
        below. <code class="cn-code">is-narrow</code> is 860px,{" "}
        <code class="cn-code">is-reading</code> 740px, and{" "}
        <code class="cn-code">--page-width</code> sets anything else.{" "}
        <code class="cn-code">.app-shell</code> fills the viewport and pushes
        the footer to the bottom.
      </p>

      <Demo title="Live dot" classes=".live-dot" row>
        <span class="live-dot" aria-hidden="true"></span>
        <span class="cn-meta sc-row">
          <span class="live-dot" aria-hidden="true"></span> 12 teammates online
        </span>
        <span class="chip">
          <span class="live-dot" aria-hidden="true"></span> All systems operational
        </span>
      </Demo>

      <p class="cn-copy">
        The live dot is decoration. Pair it with text and keep it{" "}
        <code class="cn-code">aria-hidden</code>. Under reduced motion the
        pulse stops on its first frame.
      </p>

      <Props
        title="Furniture reference"
        rows={[
          {
            name: ".cn-display / .display-title",
            values: "h1",
            notes: "700, clamp(36px, 4.6vw, 56px), -0.03em, balanced. em turns mauve. Margin zeroed. .display-title is an alias.",
          },
          {
            name: ".cn-display.is-sm",
            values: "h1",
            notes: "The page-title size: clamp(26px, 3.4vw, 36px).",
          },
          {
            name: ".lede / .cn-lede",
            values: "p",
            notes: "16px/1.6 subtext-1, max-width 690px. .lede adds 24px block margins and drops to 14px at 760px.",
          },
          {
            name: ".topbar",
            values: "sticky header · .is-split · .is-compact",
            notes: "Translucent base, blur, --shadow-cast with a lit hairline. 1fr/auto/1fr grid; is-split is two columns; is-compact is 52px, 44px compact. .nav-secondary hides at 1060px.",
          },
          {
            name: ".wordmark",
            values: "text · > .mark · .is-lg · .is-sm",
            notes: "700 16px, -0.03em, em in mauve. A .mark before the name is the brand tile (28px, 34 in is-lg, 20 in is-sm). is-lg is 20px; is-sm is the footer brand.",
          },
          {
            name: ".page-main",
            values: ".is-narrow / .is-reading / --page-width",
            notes: "min(--page-width, 100% - 2 × --page-gutter), centered, --page-pad block padding. 860 / 740 / any.",
          },
          {
            name: "--page-gutter / --page-pad",
            values: "tokens",
            notes: "clamp(12px, 3vw, 32px) inline and clamp(24px, 4vw, 48px) block. The topbar reads the same gutter.",
          },
          {
            name: ".page-footer",
            values: "page footer",
            notes: "Hairline top rule, --page-width, quiet meta. Stacks at 760px; nothing hides.",
          },
          {
            name: ".app-shell",
            values: "page root · .is-fixed",
            notes: "A viewport-tall column whose main takes the slack. is-fixed makes the shell exactly the viewport and drops the root scrollbar gutter.",
          },
          {
            name: ".live-dot",
            values: "7px pulse dot",
            default: "green",
            notes: "currentColor fill and halo; recolor with a .cn-text-* utility. Keep aria-hidden.",
          },
        ]}
      />
    </Doc>
  );
}
