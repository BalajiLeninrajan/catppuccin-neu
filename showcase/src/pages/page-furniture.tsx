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
      lede="The pieces that frame a page: the header, the topbar, the page column, the sidebar, the footer and the live dot."
    >
      <p class="cn-copy">
        The furniture recipes never style bare elements.
      </p>

      <Demo lead title="Page header" why="What goes on which element" classes="cn-display · lede">
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
        <code class="cn-code-inline">.topbar</code> goes on a{" "}
        <code class="cn-code-inline">header</code>,{" "}
        <code class="cn-code-inline">.page-main</code> on{" "}
        <code class="cn-code-inline">main</code> and{" "}
        <code class="cn-code-inline">.page-footer</code> on a{" "}
        <code class="cn-code-inline">footer</code>. The first focusable element
        on the page is a <a href="/prose">skip link</a> to{" "}
        <code class="cn-code-inline">main</code>.
      </p>

      <p class="cn-copy">
        A page header is a display title and a lede. The title names the
        page. The lede says what is on it, with numbers where there are
        numbers. Nothing sits above the title: a kicker there repeats the
        lede. An <code class="cn-code-inline">em</code> inside the title turns mauve
        and upright. <code class="cn-code-inline">.display-title</code> is an alias
        of <code class="cn-code-inline">.cn-display</code>. Both zero the heading's
        margin, and <code class="cn-code-inline">.lede</code> is the lede role with
        its own margins.
      </p>

      <CodeBlock title="Header markup" code={headerSnippet} />

      <Demo title="Topbar" why="How the topbar is laid out" classes=".topbar">
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
            <button type="button" class="btn is-icon" aria-label="Settings" data-tip="Settings">
              <GearIcon />
            </button>
          </div>
        </header>
      </Demo>

      <p class="cn-copy">
        The topbar is sticky, translucent over a 14px blur, and casts{" "}
        <code class="cn-code-inline">--shadow-cast</code> with a lit hairline. Its
        grid is 1fr, auto, 1fr, so the center nav stays centered. The nav is a
        row of small ghost buttons; the current page takes{" "}
        <code class="cn-code-inline">aria-current</code> and the engaged state. At
        1060px the grid drops to two columns and anything with{" "}
        <code class="cn-code-inline">.nav-secondary</code> hides. At 760px the bar
        tightens and a nav that outgrows it scrolls sideways inside the bar.
        Under <code class="cn-code-inline">prefers-reduced-transparency: reduce</code>{" "}
        the bar drops the blur and fills with the opaque page ground, mantle.
      </p>

      <Demo title="Split topbar with a wordmark" why="When to split the topbar" classes="topbar is-split · wordmark > mark">
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
        A page with no center nav takes <code class="cn-code-inline">is-split</code>:
        brand left, actions right. At 760px the action row wraps onto more
        rows, right-aligned, so no action hides.{" "}
        <code class="cn-code-inline">is-compact</code> is the 52px app strip, and
        it follows <code class="cn-code-inline">--band-h</code> down to 44px at
        compact density. A{" "}
        <code class="cn-code-inline">.mark</code> before the wordmark's name is the
        brand tile, and <code class="cn-code-inline">.wordmark.is-lg</code> is the
        20px hero size.
      </p>

      <Demo title="Footer" why="What the footer holds" classes=".page-footer · .wordmark.is-sm">
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
        follows the page column's <code class="cn-code-inline">--page-width</code>,
        so it lines up with the content above it, and stacks at 760px.{" "}
        <code class="cn-code-inline">.wordmark.is-sm</code> is its brand: a glyph in
        mauve, the name, and an optional note.
      </p>

      <CodeBlock title="The page shell" code={shellSnippet} />

      <p class="cn-copy">
        <code class="cn-code-inline">.page-main</code> is the column:{" "}
        <code class="cn-code-inline">--cn-width-page</code> (1440px), or the
        viewport less a <code class="cn-code-inline">--page-gutter</code> on each
        side, centered, with <code class="cn-code-inline">--page-pad</code> above and
        below. <code class="cn-code-inline">is-narrow</code> is{" "}
        <code class="cn-code-inline">--cn-width-narrow</code> (860px),{" "}
        <code class="cn-code-inline">is-reading</code> is{" "}
        <code class="cn-code-inline">--cn-width-reading</code> (740px) with the lede at 20px,
        and{" "}
        <code class="cn-code-inline">--page-width</code> sets anything else.{" "}
        <code class="cn-code-inline">.app-shell</code> fills the viewport and pushes
        the footer to the bottom.
      </p>

      <h2 class="cn-label">Sidebar</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">.app-shell.has-sidebar</code> lays a{" "}
        <code class="cn-code-inline">.sidebar</code> beside the content. This
        site's navigation is one. The sidebar is{" "}
        <code class="cn-code-inline">--sidebar-w</code> (264px) wide, full
        height, sticky, on <code class="cn-code-inline">--cn-surface-recessed</code>,{" "}
        crust 80% into mantle, a step under the page, with an <code class="cn-code-inline">--edge</code> rule, 1.92:1 on the page, and
        scrolls on its own. <code class="cn-code-inline">.sidebar-head</code>{" "}
        holds the wordmark and a <code class="cn-code-inline">.sidebar-toggle</code>;{" "}
        <code class="cn-code-inline">.sidebar-nav</code> stacks groups 24px
        apart, each a microlabel over links at the ui size and 500 in
        --cn-fg-muted, so the links sit under the content they lead to. Hover
        is --cn-fg on the ghost hover, the group that holds the current page
        lifts its microlabel to --cn-fg, and <code class="cn-code-inline">aria-current="page"</code> is a
        position, not a press: 600 in --cn-fg with a 4px mauve spine on its
        start edge, so the nav never reads as a column of pressed buttons.
        The rule sits on the
        sidebar's inline end, so it moves to the other side in right-to-left
        text.
      </p>
      <p class="cn-copy">
        At 1060px and below the sidebar folds into a sticky blurred bar and
        the toggle shows. Your script sets{" "}
        <code class="cn-code-inline">.is-open</code> on the sidebar and{" "}
        <code class="cn-code-inline">aria-expanded</code> on the toggle. The
        body fades in and settles 4px over{" "}
        <code class="cn-code-inline">--t-base</code> on the ease-out, and
        leaves on the ease-in over{" "}
        <code class="cn-code-inline">--t-exit</code>; it lands at once under
        reduced motion. Crossing 1060px does not animate. Under reduced
        transparency the folded bar goes opaque.
      </p>

      <CodeBlock
        title="Sidebar markup"
        code={`<div class="app-shell has-sidebar">
  <aside class="sidebar">
    <div class="sidebar-head">
      <a class="wordmark" href="/">Ledg<em>er</em></a>
      <button class="btn btn-ghost is-sm sidebar-toggle"
              aria-expanded="false" aria-controls="app-nav">Menu</button>
    </div>
    <nav id="app-nav" class="sidebar-body sidebar-nav" aria-label="Main">
      <div>
        <p class="cn-microlabel">Billing</p>
        <a href="/invoices" aria-current="page">Invoices</a>
        <a href="/payouts">Payouts</a>
      </div>
    </nav>
  </aside>
  <main class="page-main">…</main>
</div>`}
      />

      <Demo title="Live dot" why="The live dot is decoration" classes=".live-dot" row>
        <span class="live-dot" aria-hidden="true"></span>
        <span class="cn-meta sc-row">
          <span class="live-dot" aria-hidden="true"></span> 12 teammates online
        </span>
        <span class="chip">
          <span class="live-dot" aria-hidden="true"></span> All systems operational
        </span>
      </Demo>

      <p class="cn-copy">
        The live dot pulses every 1.5s on{" "}
        <code class="cn-code-inline">--ease-out</code>. It is decoration: pair
        it with a word that states the status and keep it{" "}
        <code class="cn-code-inline">aria-hidden</code>. Under reduced motion the
        pulse stops on its first frame.
      </p>

      <Props
        title="Furniture reference"
        rows={[
          {
            name: ".cn-display / .display-title",
            values: "h1",
            notes: "700, clamp(36px, 5.44px + 5.88vw, 56px)/1.08, -0.02em, balanced. em turns mauve. Margin zeroed. .display-title is an alias.",
          },
          {
            name: ".cn-display.is-sm",
            values: "h1",
            notes: "The page-title size: clamp(30px, 14.72px + 2.94vw, 40px).",
          },
          {
            name: ".lede / .cn-lede",
            values: "p",
            notes: "18px/1.6 subtext-1, max-width --cn-measure (68ch); 20px in .page-main.is-reading. .lede adds 24px block margins and drops to the body size (16px) at 760px.",
          },
          {
            name: ".topbar",
            values: "sticky header · .is-split · .is-compact",
            notes: "Base at 91% over a 14px blur, opaque under reduced transparency, --shadow-cast with a lit hairline. 1fr/auto/1fr grid; is-split is two columns; is-compact is 52px, 44px compact. .nav-secondary hides at 1060px.",
          },
          {
            name: ".wordmark",
            values: "text · > .mark · .is-lg · .is-sm",
            notes: "700 18px, -0.02em, em in mauve. A .mark before the name is the brand tile (28px, 34 in is-lg, 20 in is-sm). is-lg is 20px; is-sm is the 14px footer brand.",
          },
          {
            name: ".page-main",
            values: ".is-narrow / .is-reading / --page-width",
            notes: "min(--page-width, 100% - 2 × --page-gutter), centered, --page-pad block padding. --page-width falls back to --cn-width-page (1440px); is-narrow is --cn-width-narrow (860), is-reading --cn-width-reading (740) and also sets the lede at 20px.",
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
            notes: "A 4px halo at --cn-step-wash (12%), pulsing every 1.5s on --ease-out. currentColor fill and halo; recolor with a .cn-text-* utility. Keep aria-hidden.",
          },
        ]}
      />
    </Doc>
  );
}
