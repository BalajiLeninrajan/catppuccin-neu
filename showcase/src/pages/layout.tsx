import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const SHELL = `<body class="app-shell">
  <a class="cn-skip-link" href="#main">Skip to content</a>
  <header class="topbar is-split">…</header>
  <main id="main" tabindex="-1" class="page-main is-narrow">…</main>
  <footer class="page-footer">…</footer>
</body>`;

export default function LayoutPage() {
  return (
    <Doc
      title="Layout"
      lede="Three layout primitives, one spacing scale and a page column. A cn-* class on an element always beats the recipe on it."
    >
      <Demo title="Row, stack, cluster" classes="cn-row · cn-stack · cn-cluster">
        <div class="cn-stack cn-gap-16" style="width:min(520px,100%)">
          <div class="cn-row cn-between">
            <span class="cn-name">A row, space between</span>
            <button type="button" class="btn btn-secondary is-sm">Action</button>
          </div>
          <div class="cn-stack cn-gap-8">
            <span class="cn-label">A stack</span>
            <div class="stat is-inline"><span>Active teams</span><b>48</b></div>
            <div class="stat is-inline"><span>Open invoices</span><b>12</b></div>
          </div>
          <div class="cn-cluster">
            <span class="tag cn-tone-green">Paid</span>
            <span class="tag cn-tone-peach">Trial</span>
            <span class="tag cn-tone-blue">Synced</span>
            <span class="chip">v2.4.1</span>
          </div>
        </div>
      </Demo>

      <Demo title="Column grids" classes="cn-grid-2 / cn-grid-3 / cn-grid-4">
        <div class="cn-grid-3" style="width:100%">
          <div class="panel panel-body"><span class="cn-label">One</span></div>
          <div class="panel panel-body"><span class="cn-label">Two</span></div>
          <div class="panel panel-body"><span class="cn-label">Three</span></div>
        </div>
      </Demo>

      <p class="cn-copy">
        Three and four columns fold to two at 760px, and every grid folds to
        one at 520px.
      </p>

      <Demo title="Divided rows" classes="cn-divide">
        <div class="panel cn-divide" style="width:min(420px,100%)">
          <div class="cn-row cn-between cn-px-16 cn-py-12"><span class="cn-name">Maya Okafor</span><span class="cn-code-meta">us-east-1</span></div>
          <div class="cn-row cn-between cn-px-16 cn-py-12"><span class="cn-name">Jonah Reyes</span><span class="cn-code-meta">eu-west-2</span></div>
          <div class="cn-row cn-between cn-px-16 cn-py-12"><span class="cn-name">Priya Raman</span><span class="cn-code-meta">ap-south-1</span></div>
        </div>
      </Demo>

      <Demo title="Truncation" classes="cn-truncate">
        <div class="cn-stack cn-gap-4" style="width:220px">
          <span class="cn-name cn-truncate">A name that is longer than the column it sits in</span>
          <span class="cn-code-meta cn-truncate">exports/2026-08/northwind-invoice-statement-final.pdf</span>
        </div>
      </Demo>

      <Props
        title="Primitives"
        rows={[
          { name: ".cn-row", values: "flex, centered, gap 8", notes: "Add cn-between, cn-center, cn-end, cn-top, cn-baseline or cn-wrap." },
          { name: ".cn-stack", values: "grid, gap 12", notes: "A column of things." },
          { name: ".cn-cluster", values: "flex, wrap, gap 8", notes: "Chips, tags and buttons that wrap." },
          { name: ".cn-grid-2 / -3 / -4", values: "equal columns, gap 24", notes: "Fold at 760px and 520px." },
          { name: ".cn-grow / .cn-fixed / .cn-min-0", values: "flex children", notes: "cn-grow is the one that lets a child truncate." },
          { name: ".cn-w-full / .cn-fit / .cn-block / .cn-auto-l", values: "sizing", notes: "cn-auto-l pushes an item to the far end of a row." },
          { name: ".cn-divide", notes: "A hairline between siblings." },
          { name: ".cn-truncate / .cn-nowrap / .cn-tabular", values: "text", notes: "Truncate needs a bounded width." },
          { name: ".cn-text-center / -right / -left", values: "text", notes: "Alignment." },
          { name: ".cn-list-none", values: "ul, ol", notes: "A list used as layout: no marker, margin or padding." },
          { name: ".cn-scroll-x", notes: "Scrolls sideways inside itself." },
          { name: ".cn-sticky-top", notes: "Sticks to the top of its scroll box." },
          { name: ".cn-sr-only", notes: "Hidden on screen, still read aloud. Use it to label an icon-only control." },
          { name: ".cn-hidden", notes: "display: none." },
          { name: ".cn-icon-sm / .cn-icon / .cn-icon-lg", values: "13 / 16 / 20px", notes: "Sizes an svg outside a button or chip." },
        ]}
      />

      <Props
        title="Spacing scale"
        rows={[
          { name: ".cn-gap-{4,8,12,16,24,32}", values: "gap", notes: "On any row, stack, cluster or grid." },
          { name: ".cn-p-{0,8,12,16,24,32}", values: "padding", notes: "Also cn-px-{0,8,12,16,24} and cn-py-{8,12}." },
          { name: ".cn-mt-{0,4,8,12,16,24,32}", values: "margin-top", notes: "Horizontal space comes from gaps." },
          { name: ".cn-mb-{0,8,12,16,24,32}", values: "margin-bottom", notes: "cn-m-0 clears all four sides." },
          { name: "--space-1 … --space-6", values: "4, 8, 12, 16, 24, 32px", notes: "The same scale as tokens." },
        ]}
      />

      <h2 class="cn-title">The page shell</h2>
      <CodeBlock code={SHELL} />

      <p class="cn-copy">
        <code class="cn-code-inline">.app-shell</code> fills the viewport and
        pushes the footer down. <code class="cn-code-inline">.is-fixed</code>{" "}
        makes it exactly the viewport height, for an app that scrolls inside
        itself.
      </p>

      <Props
        title="Page widths"
        rows={[
          { name: ".page-main", default: "1440px", notes: "The centered page column. The footer follows it." },
          { name: ".page-main.is-narrow", default: "860px", notes: "Forms and settings." },
          { name: ".page-main.is-reading", default: "740px", notes: "Long prose." },
          { name: "--page-width", values: "any length", notes: "Sets any other width for one page." },
        ]}
      />
    </Doc>
  );
}
