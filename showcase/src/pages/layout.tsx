import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const SHELL = `<body class="app-shell">
  <header class="topbar is-split">…</header>
  <main class="page-main is-narrow">…</main>
  <footer class="footer-neu">…</footer>
</body>`;

const COMPOSE = `<!-- a utility on an element beats the recipe on that element -->
<div class="well cn-bg-well cn-p-16">…</div>
<button class="btn btn-secondary cn-raised-soft">Soft</button>
<div class="panel cn-stack cn-gap-12 cn-p-22">…</div>`;

export default function LayoutPage() {
  return (
    <Doc
      title="Layout"
      lede="Three primitives, one spacing scale, and a page column. Utilities sit above recipes in the cascade, so a gap or a padding on a component is a class, not a stylesheet."
    >
      <p class="cn-copy">
        The package's layers are tokens, then recipes, then utilities. A{" "}
        <code class="cn-code">cn-*</code> class on an element always beats the
        recipe on that element, the same order Tailwind uses. The scale is the
        six values the recipes already use, 4, 8, 12, 16, 22 and 28, and no
        utility takes a number outside it.
      </p>

      <CodeBlock title="Composition" code={COMPOSE} />

      <Demo title="Row, stack, cluster" classes="cn-row · cn-stack · cn-cluster">
        <div class="cn-stack cn-gap-16" style="width:min(520px,100%)">
          <div class="cn-row cn-between">
            <span class="cn-name">A row, space between</span>
            <button type="button" class="btn btn-secondary is-sm">Action</button>
          </div>
          <div class="cn-stack cn-gap-8">
            <span class="cn-label">A stack</span>
            <div class="stat-row"><span>Active teams</span><b>48</b></div>
            <div class="stat-row"><span>Open invoices</span><b>12</b></div>
          </div>
          <div class="cn-cluster">
            <span class="chip-tone cn-tone-green">paid</span>
            <span class="chip-tone cn-tone-peach">trial</span>
            <span class="chip-tone cn-tone-blue">info</span>
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
        Grids collapse on the system's own breakpoints: three and four columns
        to two at 760px, everything to one at 520px. The cells are{" "}
        <code class="cn-code">minmax(0, 1fr)</code>, so a long word never
        widens a column.
      </p>

      <Demo title="Divided rows" classes="cn-divide">
        <div class="panel cn-divide" style="width:min(420px,100%)">
          <div class="cn-row cn-between cn-px-16 cn-py-12"><span class="cn-name">Maya Okafor</span><span class="cn-code-meta">gpt-5.2</span></div>
          <div class="cn-row cn-between cn-px-16 cn-py-12"><span class="cn-name">Jonah Reyes</span><span class="cn-code-meta">claude-opus-5</span></div>
          <div class="cn-row cn-between cn-px-16 cn-py-12"><span class="cn-name">Priya Raman</span><span class="cn-code-meta">gemini-3-pro</span></div>
        </div>
      </Demo>

      <Demo title="Truncation" classes="cn-truncate">
        <div class="cn-stack cn-gap-4" style="width:220px">
          <span class="cn-name cn-truncate">A name that is longer than the column it sits in</span>
          <span class="cn-code-meta cn-truncate">anthropic/claude-opus-5-20260901-preview</span>
        </div>
      </Demo>

      <CodeBlock title="The page shell" code={SHELL} />

      <p class="cn-copy">
        <code class="cn-code">.page-main</code> is the column every page had
        been writing by hand: 1440px or the viewport minus 40, centered, with
        the vertical padding. <code class="cn-code">is-narrow</code> is 860px,{" "}
        <code class="cn-code">is-reading</code> 740px, and{" "}
        <code class="cn-code">--page-width</code> sets any other. The footer
        follows the same width. <code class="cn-code">.app-shell</code> fills
        the viewport and pushes the footer to the bottom.
      </p>

      <Props
        title="Primitives"
        rows={[
          { name: ".cn-row", values: "flex, centered, gap 8", notes: "Add cn-between, cn-center, cn-end, cn-top, cn-baseline, cn-wrap." },
          { name: ".cn-stack", values: "grid, gap 12", notes: "A column of things. cn-gap-* changes the rhythm." },
          { name: ".cn-cluster", values: "flex, wrap, gap 8", notes: "Chips, tags, buttons that wrap." },
          { name: ".cn-grid-2 / -3 / -4", values: "equal columns, gap 14", notes: "Collapse at 760 and 520." },
          { name: ".cn-grow / .cn-fixed / .cn-min-0", values: "flex children", notes: "grow is flex 1 with min-width 0, the one that truncates." },
          { name: ".cn-w-full / .cn-fit / .cn-block / .cn-auto-l", values: "sizing", notes: "auto-l pushes an item to the far end of a row." },
          { name: ".cn-divide", values: "children", notes: "surface-0 hairline between siblings, none on the first." },
          { name: ".cn-truncate / .cn-nowrap / .cn-tabular", values: "text", notes: "Truncate needs a bounded width: cn-grow or cn-min-0 on the parent." },
          { name: ".cn-text-center / -right / -left", values: "text", notes: "Alignment. Center a confirmation, right-align a number column." },
          { name: ".cn-list-none", values: "ul, ol", notes: "No marker, no margin, no padding: a list used as layout." },
          { name: ".cn-scroll-x", values: "any box", notes: "Scrolls sideways inside itself with the system scrollbar color; the page never scrolls sideways." },
          { name: ".cn-sticky-top", values: "any child of a scroll box", notes: "position sticky, top 0, z-index 2. Table headers, pane toolbars." },
          { name: "cn-microlabel cn-text-*", values: "composition", notes: "The type roles pin a color; the color utilities come later and win. A tracked label in the accent is two classes, not a restated role." },
        ]}
      />

      <Props
        title="Spacing scale"
        rows={[
          { name: ".cn-gap-{4,8,12,16,22,28}", values: "gap", notes: "On any row, stack, cluster or grid." },
          { name: ".cn-p-{0,4,8,12,16,22,28}", values: "padding", notes: "cn-px-* and cn-py-* for one axis (8 and up)." },
          { name: ".cn-mt-* / .cn-mb-* / .cn-m-0", values: "margin", notes: "Same scale plus 0. There is no cn-mx: center with the page column or a grid." },
          { name: ".panel-body", values: "recipe", notes: "20px 22px; the panel's content band. Compose cn-p-* to change it." },
          { name: ".cn-icon-sm / .cn-icon / .cn-icon-lg", values: "13 / 16 / 20px", notes: "Inline svg anywhere a button or chip isn't already sizing it." },
        ]}
      />
    </Doc>
  );
}
