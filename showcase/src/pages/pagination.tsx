import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { Pager } from "../lib/pager";

const noNav = (e: Event) => e.preventDefault();

export default function PaginationPage() {
  const [page, setPage] = useState(6);
  const [short, setShort] = useState(1);

  return (
    <Doc
      title="Pagination & breadcrumbs"
      lede="Two ways to show where a reader is in a sequence. Pagination moves through pages of one list. Breadcrumbs show the path from the top of the app down to this page."
    >
      <h2 class="cn-title">Pagination</h2>

      <Demo lead title="A long list" classes='nav.pagination > button[aria-current="page"] · span (gap)' row>
        <Pager current={page} total={12} label="Invoice pages" onPage={setPage} />
      </Demo>

      <Demo title="First page of three" why="Targets, the current page and the ends" classes='pagination > [aria-disabled="true"]' row>
        <Pager current={short} total={3} label="Member pages" onPage={setShort} />
      </Demo>

      <p class="cn-copy">
        Each page is a square ghost target at{" "}
        <code class="cn-code-inline">--control-h-sm</code> with tabular figures,
        so every two-digit page is the same width. The current page carries{" "}
        <code class="cn-code-inline">aria-current="page"</code> and takes the
        engaged state. A <code class="cn-code-inline">span</code> is the gap
        between runs. Previous and Next hold a 16px chevron. At the ends they
        take <code class="cn-code-inline">aria-disabled="true"</code>, which
        dims them and keeps them focusable.
      </p>

      <h2 class="cn-title">Breadcrumbs</h2>

      <Demo title="Path to the current page" why="How crumbs are styled" classes='nav.breadcrumbs > ol > li · [aria-current="page"]' row>
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="#" onClick={noNav}>Northwind Ops</a></li>
            <li><a href="#" onClick={noNav}>Billing</a></li>
            <li><a href="#" onClick={noNav}>Invoices</a></li>
            <li><span aria-current="page">INV-2041</span></li>
          </ol>
        </nav>
      </Demo>

      <p class="cn-copy">
        Crumb links carry no underline, because they sit in a{" "}
        <code class="cn-code-inline">nav</code>. A 12px chevron sits between
        crumbs and flips in right-to-left text. The last crumb is the page
        itself: <code class="cn-code-inline">aria-current="page"</code>, at 600,
        and not a link.
      </p>

      <h2 class="cn-title">Accessibility</h2>
      <p class="cn-copy">
        Both are a <code class="cn-code-inline">nav</code> landmark, so give each
        an <code class="cn-code-inline">aria-label</code> ("Invoice pages",
        "Breadcrumb"). In an app, pages are links to{" "}
        <code class="cn-code-inline">?page=n</code>, so back and forward work.
        Give a page target an{" "}
        <code class="cn-code-inline">aria-label</code> such as "Page 4", and the
        chevron targets "Previous page" and "Next page". Mark the gap{" "}
        <code class="cn-code-inline">aria-hidden="true"</code>.
      </p>

      <CodeBlock
        title="Markup"
        code={`<nav class="pagination" aria-label="Invoice pages">
  <a href="?page=5" aria-label="Previous page"><svg aria-hidden="true">…</svg></a>
  <a href="?page=1" aria-label="Page 1">1</a>
  <span aria-hidden="true">…</span>
  <a href="?page=5" aria-label="Page 5">5</a>
  <a href="?page=6" aria-label="Page 6" aria-current="page">6</a>
  <a href="?page=7" aria-label="Page 7">7</a>
  <span aria-hidden="true">…</span>
  <a href="?page=12" aria-label="Page 12">12</a>
  <a href="?page=7" aria-label="Next page"><svg aria-hidden="true">…</svg></a>
</nav>

<nav class="breadcrumbs" aria-label="Breadcrumb">
  <ol>
    <li><a href="/">Northwind Ops</a></li>
    <li><a href="/billing">Billing</a></li>
    <li><span aria-current="page">INV-2041</span></li>
  </ol>
</nav>`}
      />

      <Props
        title="Contract"
        rows={[
          { name: ".pagination", values: "nav", notes: "Wrapping flex row, 4px gap." },
          { name: ".pagination > a / button / span", values: "page targets", notes: "Square at --control-h-sm (min-width and height), 8px inline padding, the control radius, 14px at 500 with tabular figures in --cn-fg-body. Hover --hover." },
          { name: '[aria-current="page"]', values: "the current page", notes: "The engaged state: 1px sink, --wash, --neu-inset, the --engaged-edge rim, --cn-fg at 600." },
          { name: ".pagination > span", values: "the gap", notes: "--cn-fg-muted, no hover." },
          { name: ':disabled / [aria-disabled="true"]', values: "on a target", notes: "--disabled-opacity, not-allowed, no hover fill." },
          { name: "> svg", values: "in a target", notes: "16px." },
          { name: ".breadcrumbs", values: "nav > ol > li", notes: "Wrapping flex list, 8px gap, no markers. Each li is 14px at 500 in --cn-fg-muted." },
          { name: ".breadcrumbs a", values: "a crumb", notes: "--cn-fg-body, --cn-fg on hover." },
          { name: "li + li::before", values: "the separator", notes: "A 12px chevron in --cn-fg-faint. Mirrored under :dir(rtl)." },
          { name: '.breadcrumbs [aria-current="page"]', values: "the last crumb", notes: "--cn-fg at 600." },
        ]}
      />
    </Doc>
  );
}
