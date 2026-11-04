import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const SHELL = `<body class="app-shell">
  <header class="topbar is-split">…</header>
  <main class="page-main is-narrow">…</main>
  <footer class="page-footer">…</footer>
</body>`;

const COMPOSE = `<!-- a utility on an element beats the recipe on that element -->
<div class="well cn-bg-well cn-p-16">…</div>
<button class="btn btn-secondary cn-raised-soft">Soft</button>
<div class="panel cn-stack cn-gap-12 cn-p-24">…</div>`;

export default function LayoutPage() {
  return (
    <Doc
      title="Layout"
      lede="A few layout primitives, one spacing scale, and a page column. Utilities sit above recipes in the cascade, so a gap or a padding on a component is a class, not a stylesheet."
    >
      <p class="cn-copy">
        The package's layers are tokens, then recipes, then utilities. A{" "}
        <code class="cn-code-inline">cn-*</code> class on an element always beats the
        recipe on that element, the same order Tailwind uses. The spacing
        scale is six tokens, <code class="cn-code-inline">--space-1</code> to{" "}
        <code class="cn-code-inline">--space-6</code>: 4, 8, 12, 16, 24 and 32. The
        recipes use only these inside components. Two more,{" "}
        <code class="cn-code-inline">--space-7</code> (48) and{" "}
        <code class="cn-code-inline">--space-8</code> (64), set the rhythm between
        panels and page regions, never inside them.
      </p>

      <CodeBlock title="A utility over a recipe" code={COMPOSE} />

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
        Grids collapse on the system's own breakpoints: three and four columns
        to two at 760px, everything to one at 520px. The cells are{" "}
        <code class="cn-code-inline">minmax(0, 1fr)</code>, so a long word never
        widens a column.
      </p>

      <Demo title="Grids inside a container" classes="cn-container > cn-grid-3">
        <div class="cn-container" style="width:min(420px,100%)">
          <div class="cn-grid-3">
            <div class="panel panel-body"><span class="cn-label">One</span></div>
            <div class="panel panel-body"><span class="cn-label">Two</span></div>
            <div class="panel panel-body"><span class="cn-label">Three</span></div>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Inside a <code class="cn-code-inline">.cn-container</code> the grids answer
        the container's width instead of the viewport's, at the same 760 and
        520 steps. This container is 420px wide, so its three-column grid
        folds to one on a wide screen. Use it for a grid in a sidebar, a
        drawer or a narrow pane.
      </p>

      <p class="cn-copy">
        Component folds answer the container too. The stat grid and the panel
        footer fold at 760px, and the segmented control, stat values, the
        accordion meta and <code class="cn-code-inline">.kv</code> at 520px, so
        a component in a narrow pane folds as it would on a phone. Page
        chrome and the table's row mode still follow the viewport.
      </p>

      <Demo title="A four-stat grid in a 380px container" classes="cn-container > panel > stat-grid">
        <div class="cn-container" style="width:min(380px,100%)">
          <section class="panel" aria-labelledby="lo-pane">
            <div class="panel-header">
              <h2 id="lo-pane">This month</h2>
            </div>
            <div class="panel-body">
              <div class="stat-grid">
                <div class="stat"><span>Collected</span><strong>$126,940</strong></div>
                <div class="stat"><span>Outstanding</span><strong>$13,422</strong></div>
                <div class="stat"><span>Invoices</span><strong>214</strong></div>
                <div class="stat"><span>Teams</span><strong>32</strong></div>
              </div>
            </div>
          </section>
        </div>
      </Demo>

      <p class="cn-copy">
        The grid sets four across, but the container is under 520px, so it
        holds two across and the values drop to the lede size, 18px. Outside
        a container the same grid keeps four columns until the viewport
        reaches 760px.
      </p>

      <h2 class="cn-title">The page grid</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">.cn-grid-12</code> is twelve columns 24px
        apart, for the panels of one page region. A child spans with{" "}
        <code class="cn-code-inline">.cn-span-3</code>,{" "}
        <code class="cn-code-inline">-4</code>,{" "}
        <code class="cn-code-inline">-5</code>,{" "}
        <code class="cn-code-inline">-6</code>,{" "}
        <code class="cn-code-inline">-7</code>,{" "}
        <code class="cn-code-inline">-8</code>,{" "}
        <code class="cn-code-inline">-9</code> or{" "}
        <code class="cn-code-inline">-12</code>. Pairs that add to twelve,
        such as 7 and 5 or 8 and 4, give a wide panel and a narrow one; three
        4s give equal thirds. At 760px and below, or inside a{" "}
        <code class="cn-code-inline">.cn-container</code> that narrow, every
        span takes the full row, in source order.
      </p>

      <Demo title="7 and 5, 8 and 4, three 4s" classes="cn-grid-12 > cn-span-7 + cn-span-5">
        <div class="cn-stack cn-gap-24" style="width:100%">
          <div class="cn-grid-12">
            <div class="panel panel-body cn-span-7"><span class="cn-label">cn-span-7</span></div>
            <div class="panel panel-body cn-span-5"><span class="cn-label">cn-span-5</span></div>
          </div>
          <div class="cn-grid-12">
            <div class="panel panel-body cn-span-8"><span class="cn-label">cn-span-8</span></div>
            <div class="panel panel-body cn-span-4"><span class="cn-label">cn-span-4</span></div>
          </div>
          <div class="cn-grid-12">
            <div class="panel panel-body cn-span-4"><span class="cn-label">cn-span-4</span></div>
            <div class="panel panel-body cn-span-4"><span class="cn-label">cn-span-4</span></div>
            <div class="panel panel-body cn-span-4"><span class="cn-label">cn-span-4</span></div>
          </div>
        </div>
      </Demo>

      <h2 class="cn-title">Composition</h2>
      <p class="cn-copy">
        A view is built from three gaps and the page grid, so pages line up
        with each other. Regions of a view, such as the header, a band of
        figures, a row of panels or a table, sit{" "}
        <code class="cn-code-inline">--space-7</code> (48px) apart. Panels
        inside a region sit <code class="cn-code-inline">--space-5</code>{" "}
        (24px) apart, which is the page grid's gap. Content inside a panel
        takes <code class="cn-code-inline">--body-pad</code>.
      </p>

      <p class="cn-copy">
        A region holds at most three raised panels. More items go in one
        panel, a ruled stat grid on the ground or a table, so raised stays a
        rank and not a texture. A panel inside a panel takes the soft raise,
        because it rests on its parent.
      </p>

      <p class="cn-copy">
        A view reads in one order: the title and its one primary action, the
        figures, the lead panel, then the rest. The tilted aside never comes
        before the data it comments on, so on a 7 and 5 row the data takes
        the 7 and comes first in the source, and the aside takes the 5. At
        760px the row stacks in that order, data above aside. The{" "}
        <a href="/examples/dashboard">dashboard example</a> is built this way.
      </p>

      <Demo title="A view in reading order, regions 48px apart" classes="cn-stack cn-gap-48 · stat-grid is-ruled · cn-grid-12 · panel is-lead">
        <div class="cn-stack cn-gap-48" style="width:100%">
          <div class="cn-split">
            <div class="cn-stack cn-gap-4">
              <span class="cn-label">1 · Title and primary</span>
              <span class="cn-title">Billing, September</span>
            </div>
            <button type="button" class="btn btn-primary is-sm">New invoice</button>
          </div>
          <div class="cn-stack cn-gap-12">
            <span class="cn-label">2 · Figures</span>
            <div class="stat-grid is-ruled" style="--stat-cols:3">
              <div class="stat"><span>Collected</span><strong>$126,940</strong></div>
              <div class="stat"><span>Outstanding</span><strong>$13,422</strong></div>
              <div class="stat"><span>Past due</span><strong>$5,806</strong></div>
            </div>
          </div>
          <div class="panel is-lead panel-body cn-stack cn-gap-4">
            <span class="cn-label">3 · Lead panel</span>
            <span class="cn-meta">panel is-lead, the table the view is about</span>
          </div>
          <div class="cn-grid-12">
            <div class="panel panel-body cn-span-7 cn-stack cn-gap-4">
              <span class="cn-label">4 · The rest</span>
              <span class="cn-meta">cn-span-7, first in the source</span>
            </div>
            <div class="panel panel-body cn-span-5 cn-stack cn-gap-4">
              <span class="cn-label">5 · The aside</span>
              <span class="cn-meta">cn-span-5, after the data it comments on; tilted in a real view</span>
            </div>
          </div>
        </div>
      </Demo>

      <CodeBlock
        title="The skeleton of a view"
        code={`<main class="page-main cn-stack cn-gap-48">
  <header class="cn-split">…title… <button class="btn btn-primary">…</button></header>
  <section class="stat-grid is-ruled" aria-label="Key figures">…</section>
  <section class="panel is-lead">…the table…</section>
  <div class="cn-grid-12">
    <section class="panel cn-span-7">…the chart…</section>
    <aside class="panel is-tilted cn-span-5">…what it means…</aside>
  </div>
</main>`}
      />

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

      <h2 class="cn-title">Split, measure and side</h2>
      <p class="cn-copy">
        Three primitives cover the layouts pages kept writing by hand.{" "}
        <code class="cn-code-inline">.cn-split</code> pushes two groups to opposite
        ends of a row, 12px apart vertically and 16px horizontally. The first
        group takes the slack, and when the two no longer fit side by side the
        second wraps under the first. It is the page or panel header with
        actions.
      </p>

      <Demo title="A header that wraps its actions" classes="cn-split">
        <div class="cn-split" style="width:100%">
          <div class="cn-stack cn-gap-4">
            <span class="cn-title">Northwind workspace</span>
            <span class="cn-meta">14 members · created Mar 02, 2026</span>
          </div>
          <div class="cn-row">
            <button type="button" class="btn btn-secondary is-sm">Invite</button>
            <button type="button" class="btn btn-ghost is-sm">Archive</button>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.cn-measure</code> is a column at{" "}
        <code class="cn-code-inline">--cn-measure</code> (68ch), centered in its
        parent. Use it for a block of prose inside a wide page.{" "}
        <code class="cn-code-inline">.cn-mx-auto</code> centers any box with a
        width of its own and sets nothing else. It is the one horizontal
        margin utility; every other horizontal space comes from a gap.
      </p>

      <Demo title="A centered reading column and a centered box" classes="cn-measure · cn-fit cn-mx-auto">
        <div class="cn-stack cn-gap-16" style="width:100%">
          <p class="cn-copy cn-measure cn-mb-0">
            Invoices close at the end of each billing period. Anything issued
            after the cutoff moves to the next statement, and the summary email
            goes out the following morning with every open balance listed.
          </p>
          <div class="panel panel-body cn-fit cn-mx-auto">
            <span class="cn-meta">Centered with cn-fit cn-mx-auto</span>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.cn-with-side</code> puts a side of{" "}
        <code class="cn-code-inline">--side-w</code> (16rem by default) beside
        content that takes the rest, 24px apart. The side is the first child.
        When the content would drop under 60% of the row, the two stack. There
        is no breakpoint, so it works inside a panel, a drawer or a page, at
        whatever width its container has.
      </p>

      <Demo title="A side beside fluid content" classes='cn-with-side  style="--side-w: 12rem"'>
        <div class="cn-with-side" style="width:100%;--side-w:12rem">
          <nav class="cn-stack cn-gap-8" aria-label="Settings sections">
            <span class="cn-microlabel">Workspace</span>
            <a class="btn btn-ghost is-sm" href="#" aria-current="page" onClick={(e) => e.preventDefault()}>General</a>
            <a class="btn btn-ghost is-sm" href="#" onClick={(e) => e.preventDefault()}>Members</a>
            <a class="btn btn-ghost is-sm" href="#" onClick={(e) => e.preventDefault()}>Billing</a>
          </nav>
          <div class="panel panel-body cn-stack cn-gap-8">
            <span class="cn-title">General</span>
            <p class="cn-copy cn-m-0">
              The workspace name shows on invoices and in every email the
              workspace sends.
            </p>
          </div>
        </div>
      </Demo>

      <CodeBlock
        title="The three together"
        code={`<header class="cn-split">
  <div>…title and meta…</div>
  <div class="cn-row">…actions…</div>
</header>

<div class="cn-with-side" style="--side-w: 14rem">
  <nav>…</nav>
  <main>…</main>
</div>

<p class="cn-copy cn-measure">…</p>`}
      />

      <CodeBlock title="The page shell" code={SHELL} />

      <p class="cn-copy">
        <code class="cn-code-inline">.page-main</code> is the column every page had
        been writing by hand: <code class="cn-code-inline">--cn-width-page</code>{" "}
        (1440px), or the viewport less a{" "}
        <code class="cn-code-inline">--page-gutter</code> on each side, centered, with{" "}
        <code class="cn-code-inline">--page-pad</code> above and below. The topbar
        reads the same gutter, so the brand lines up with the column edge. <code class="cn-code-inline">is-narrow</code> is{" "}
        <code class="cn-code-inline">--cn-width-narrow</code> (860px),{" "}
        <code class="cn-code-inline">is-reading</code> is{" "}
        <code class="cn-code-inline">--cn-width-reading</code> (740px), and{" "}
        <code class="cn-code-inline">--page-width</code> sets any other. The footer
        follows the same width. <code class="cn-code-inline">.app-shell</code> fills
        the viewport and pushes the footer to the bottom.{" "}
        <code class="cn-code-inline">.app-shell.is-fixed</code> is for an app that
        owns the viewport: the shell is exactly the viewport height and the
        root drops its reserved scrollbar gutter.
      </p>

      <h2 class="cn-title">Widths and the measure</h2>
      <p class="cn-copy">
        Page widths are tokens, so a consumer column can match the package's
        without copying a number. <code class="cn-code-inline">--cn-measure</code>{" "}
        is the longest line of running prose, 68ch, which{" "}
        <a href="/prose">.cn-prose</a> sets on itself. This site's content
        column is 860px, the narrow width.
      </p>

      <Props
        title="Width tokens"
        rows={[
          { name: "--cn-width-page", default: "1440px", notes: ".page-main and .page-footer." },
          { name: "--cn-width-narrow", default: "860px", notes: ".page-main.is-narrow: forms and settings." },
          { name: "--cn-width-reading", default: "740px", notes: ".page-main.is-reading: long prose, with the lede at 20px." },
          { name: "--cn-measure", default: "68ch", notes: "The longest line .cn-prose sets." },
          { name: "--page-width", values: "any length", notes: "Re-keys one page's column and footer. Unset on :root, so the column falls back to --cn-width-page." },
        ]}
      />

      <h2 class="cn-title">Writing direction</h2>
      <p class="cn-copy">
        Recipes use logical properties:{" "}
        <code class="cn-code-inline">padding-inline-start</code>,{" "}
        <code class="cn-code-inline">margin-inline-end</code>,{" "}
        <code class="cn-code-inline">border-inline-start</code> and{" "}
        <code class="cn-code-inline">text-align: start</code>. Under{" "}
        <code class="cn-code-inline">dir="rtl"</code> spacing, rules and
        alignment follow the text: the sidebar rule moves to the other side,
        a blockquote's rule moves with it and the breadcrumb chevron flips.
        Positions, transforms and the switch travel are still physical. The
        utilities are named by side (<code class="cn-code-inline">.cn-text-left</code>,{" "}
        <code class="cn-code-inline">.cn-auto-l</code>) and do not flip.{" "}
        <code class="cn-code-inline">.cn-mx-auto</code>,{" "}
        <code class="cn-code-inline">.cn-measure</code> and{" "}
        <code class="cn-code-inline">.cn-with-side</code> are logical, so they
        follow the text.
      </p>

      <Props
        title="Primitives"
        rows={[
          { name: ".cn-row", values: "flex, centered, gap 8", notes: "Add cn-between, cn-center, cn-end, cn-top, cn-baseline, cn-wrap." },
          { name: ".cn-stack", values: "grid, gap 12", notes: "A column of things. cn-gap-* changes the rhythm." },
          { name: ".cn-cluster", values: "flex, wrap, gap 8", notes: "Chips, tags, buttons that wrap." },
          { name: ".cn-split", values: "wrapping flex, gap 12 by 16", notes: "Two groups at opposite ends; the first takes the slack, and the second wraps under it when they no longer fit. A header with actions." },
          { name: ".cn-measure", values: "max-inline-size --cn-measure", notes: "A centered column at 68ch for prose inside a wide page." },
          { name: ".cn-with-side", values: "--side-w", default: "16rem", notes: "The first child is the side, the last takes the rest, gap 24. They stack when the content would drop under 60% of the row." },
          { name: ".cn-grid-2 / -3 / -4", values: "equal columns, gap 16", notes: "Collapse at 760 and 520." },
          { name: ".cn-grid-12", values: "twelve columns, gap 24", notes: "The page grid for one region's panels. Children span with .cn-span-*." },
          { name: ".cn-span-3 / 4 / 5 / 6 / 7 / 8 / 9 / 12", values: "children of .cn-grid-12", notes: "Columns to span. Each takes the full row at 760px and below, or inside a .cn-container that narrow." },
          { name: ".cn-container", values: "container-type: inline-size", notes: "Grids and component folds inside it answer its width, not the viewport's: the stat grid and panel footer at 760, the segmented control, stats, accordion meta and .kv at 520." },
          { name: ".cn-grow / .cn-fixed / .cn-min-0", values: "flex children", notes: "grow is flex 1 with min-width 0, the one that truncates." },
          { name: ".cn-w-full / .cn-fit / .cn-block / .cn-auto-l / .cn-mx-auto", values: "sizing", notes: "auto-l pushes an item to the far end of a row; mx-auto centers a box that has its own width." },
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
          { name: ".cn-gap-{4,8,12,16,24,32}", values: "gap", notes: "On any row, stack, cluster or grid." },
          { name: ".cn-p-{0,4,8,12,16,24,32}", values: "padding", notes: "cn-px-* and cn-py-* for one axis (8 and up)." },
          { name: ".cn-mt-* / .cn-mb-* / .cn-m-0", values: "margin", notes: "Same scale plus 0. .cn-mx-auto is the one horizontal margin; other horizontal space comes from gaps." },
          { name: ".cn-gap-48 / -64", values: "--space-7 / --space-8", notes: "Section rhythm between panels and page regions." },
          { name: ".cn-mt-48 / -64 · .cn-mb-48 / -64", values: "--space-7 / --space-8", notes: "Space above or below a section." },
          { name: ".cn-py-48 / -64", values: "--space-7 / --space-8", notes: "Block padding on a page band." },
          { name: ".panel-body", values: "recipe", notes: "--body-pad (24px, 16px 24px cozy, 12px 16px compact); the panel's content band. Compose cn-p-* to change it." },
          { name: ".cn-icon-sm / .cn-icon / .cn-icon-lg", values: "13 / 16 / 20px", notes: "Inline svg anywhere a button or chip isn't already sizing it." },
        ]}
      />
    </Doc>
  );
}
