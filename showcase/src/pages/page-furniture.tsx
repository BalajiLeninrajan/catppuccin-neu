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
        <code class="cn-code-inline">.topbar</code> goes on a <code class="cn-code-inline">header</code>, <code class="cn-code-inline">.page-main</code> on <code class="cn-code-inline">main</code> and <code class="cn-code-inline">.page-footer</code> on a <code class="cn-code-inline">footer</code>. Make a <code class="cn-code-inline">.cn-skip-link</code> to <code class="cn-code-inline">main</code> the first focusable element on the page.
      </p>

      <CodeBlock title="Header markup" code={headerSnippet} />

      <Demo title="Topbar" classes=".topbar">
        <header class="topbar">
          <span class="cn-title">Ledger</span>
          <nav aria-label="Primary">
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
        The current page takes <code class="cn-code-inline">aria-current</code>. Under <code class="cn-code-inline">prefers-reduced-transparency: reduce</code> the bar goes opaque.
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
        <code class="cn-code-inline">is-split</code> puts the brand at the start and the actions at the end. <code class="cn-code-inline">is-compact</code> is the short app strip.
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

      <CodeBlock title="The page shell" code={shellSnippet} />

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
        Pair the dot with a word that states the status and keep it <code class="cn-code-inline">aria-hidden</code>.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".cn-display / .display-title", values: "h1", notes: "The page title. An em inside turns mauve." },
          { name: ".lede", values: "p", notes: "The lede with its own margins." },
          { name: ".topbar", values: ".is-split · .is-compact", notes: "A sticky header. Three columns, or two with is-split." },
          { name: ".wordmark", values: "> .mark · .is-lg · .is-sm", notes: "The brand text. An em inside turns mauve." },
          { name: ".page-main", values: ".is-narrow · .is-reading", notes: "The centered page column." },
          { name: "--page-width", values: "length", default: "1440px", notes: "Sets the column width for one page." },
          { name: ".page-footer", values: "footer", notes: "A hairline rule and metadata." },
          { name: ".app-shell", values: ".is-fixed", notes: "A viewport-tall column. is-fixed keeps the page from scrolling." },
          { name: ".cn-skip-link", values: "a", notes: "Hidden until focused." },
          { name: ".live-dot", values: "span", notes: "A pulsing dot in currentColor." },
        ]}
      />
    </Doc>
  );
}
