import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

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
  <main class="page-main">…</main>
  <footer class="footer-neu">…</footer>
</body>

/* a different column for one page: */
<main class="page-main" style="--page-width: 980px">…</main>`;

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
      lede="The pieces that frame a page: the topbar, the footer rule, the eyebrow-title-lede header stack, the live dot, and the shell wash."
    >
      <p class="cn-copy">
        The furniture recipes never style bare elements. <code class="cn-code">.topbar</code> goes on
        a <code class="cn-code">header</code>, <code class="cn-code">.footer-neu</code> on
        a <code class="cn-code">footer</code>. The package leaves <code class="cn-code">main</code> alone;
        apply the main-column width pattern in your own CSS.
      </p>

      <Demo title="Page header" classes="eyebrow · display-title · lede">
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
        The header stack is the one place display type appears. The three classes are aliases
        of <code class="cn-code">.cn-eyebrow</code>, <code class="cn-code">.cn-display</code>,
        and <code class="cn-code">.cn-lede</code>. Either name works.
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
            <button type="button" class="btn-icon" data-tip="Settings">
              <GearIcon />
              <span class="cn-sr-only">Open settings</span>
            </button>
          </div>
        </header>
      </Demo>

      <p class="cn-copy">
        The topbar is sticky, translucent over a 14px blur, and casts <code class="cn-code">--shadow-cast</code>{" "}
        with a lit hairline. Its grid is 1fr / auto / 1fr, so the center nav stays centered. At 1060px the grid
        collapses to two columns and anything tagged <code class="cn-code">.nav-secondary</code> hides; at 760px
        the bar tightens and chips inside it go icon-only.
      </p>

      <Demo title="Split topbar with a wordmark" classes="topbar is-split · wordmark > mark-solid">
        <header class="topbar is-split">
          <a class="wordmark" href="#"><span class="mark-solid" aria-hidden="true">L</span>Ledg<em>er</em></a>
          <div class="cn-row">
            <span class="chip"><span class="live-dot" aria-hidden="true"></span> Synced</span>
            <button type="button" class="btn btn-secondary is-sm">Sign in</button>
          </div>
        </header>
      </Demo>

      <p class="cn-copy">
        A page with no center nav takes <code class="cn-code">is-split</code>: brand left, actions right,
        nothing centered by accident. <code class="cn-code">is-compact</code> is the 52px app strip. The
        wordmark is a flex row, so a <code class="cn-code">.mark-solid</code> before the name is the brand
        tile, and <code class="cn-code">is-lg</code> is the 22px hero size.
      </p>

      <Demo title="Footer" classes=".footer-neu · .footer-brand">
        <footer class="footer-neu">
          <span class="footer-brand"><svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><circle cx="8" cy="8" r="6" /></svg>Ledger <b>Console</b><span>build 4.2.1</span></span>
          <p>Deployed 24 Aug 2026</p>
          <span class="chip">v4.2.1</span>
        </footer>
      </Demo>

      <p class="cn-copy">
        The footer is a hairline rule and metadata. No depth, no fill. It follows the page column's{" "}
        <code class="cn-code">--page-width</code>, so it lines up with the content above it, and stacks at
        760px. <code class="cn-code">.footer-brand</code> is its brand slot: a glyph in mauve, the name,
        an optional note.
      </p>

      <CodeBlock
        title="The page shell"
        code={`<body class="app-shell">
  <header class="topbar is-split">…</header>
  <main class="page-main is-narrow">…</main>
  <footer class="footer-neu">…</footer>
</body>`}
      />

      <p class="cn-copy">
        <code class="cn-code">.page-main</code> is the column: 1440px or the viewport minus 40, centered,
        with the vertical padding. <code class="cn-code">is-narrow</code> is 860px,{" "}
        <code class="cn-code">is-reading</code> 740px, <code class="cn-code">--page-width</code> anything
        else. <code class="cn-code">.app-shell</code> fills the viewport and pushes the footer to the bottom.
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
        The live dot is presentational. Pair it with text and keep it{" "}
        <code class="cn-code">aria-hidden</code>. Under reduced motion the pulse stops on the first frame.
      </p>

      <p class="cn-copy">
        Two more pieces have no specimen here. <code class="cn-code">.app-shell</code> goes on the page root,
        usually <code class="cn-code">body</code>, and lays a faint mauve bloom over the top-left
        of <code class="cn-code">--base</code>. This site's own shell wears it.{" "}
        <code class="cn-code">.cn-scrim</code> is the fixed, blurred crust backdrop that modals and drawers
        sit on. See those pages for it in action.
      </p>

      <CodeBlock title="Page shell, re-keyed" code={shellSnippet} />

      <Props
        title="Furniture reference"
        rows={[
          {
            name: ".topbar",
            values: "sticky header · .is-split · .is-compact",
            notes: "Translucent base, blur, --shadow-cast + lit hairline. 1fr/auto/1fr grid; is-split is 1fr/auto; is-compact is 52px. .nav-secondary hides ≤1060px.",
          },
          {
            name: ".wordmark",
            values: "text · > .mark-solid · .is-lg",
            notes: "800 16px, tight tracking, em in mauve. Flex row: a mark-solid before the name is the brand tile (28px, 34 in is-lg). is-lg is 22px.",
          },
          {
            name: ".page-main",
            values: ".is-narrow / .is-reading / --page-width",
            notes: "The page column: min(--page-width, 100% - 40px), centered, clamp(24px, 4vw, 46px) vertical padding. 860 / 740 / any.",
          },
          {
            name: ".footer-neu",
            values: "page footer · .footer-brand",
            notes: "Hairline top rule, --page-width, quiet meta; stacks ≤760px. footer-brand: glyph in mauve, name, optional note. Middle paragraph drops ≤520px.",
          },
          {
            name: ".panel-body",
            values: "content band",
            notes: "20px 22px inside a panel. The panel ships no padding so tables fill it; prose goes in a body.",
          },
          {
            name: ".eyebrow",
            values: "alias of .cn-eyebrow",
            notes: "Uppercase mauve kicker; flex with 8px gap for a leading mark.",
          },
          {
            name: ".display-title",
            values: "alias of .cn-display",
            notes: "clamp(36px to 56px), weight 760, -0.03em; <em> renders mauve. Steps to 38/34px at 760/520px.",
          },
          {
            name: ".lede",
            values: "alias of .cn-lede",
            notes: "16px/1.65 subtext, max-width 690px.",
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
            notes: "Radial accent bloom at top-left over --base.",
          },
          {
            name: ".cn-scrim",
            values: "fixed overlay backdrop",
            notes: "Crust at 80% with a 2px blur, z-index 70. Modals and drawers render inside it.",
          },
        ]}
      />
    </Doc>
  );
}
