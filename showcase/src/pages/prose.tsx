import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const noNav = (e: Event) => e.preventDefault();

export default function ProsePage() {
  return (
    <Doc
      title="Prose & skip link"
      lede="An article set from bare elements, and the link that lets a keyboard reader skip the navigation to reach it."
    >
      <h2 class="cn-title">Prose</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">.cn-prose</code> is the one recipe that styles
        bare elements, and only inside itself. Put it on the element that holds
        rendered Markdown or CMS content, where you cannot add a class to each
        heading and list.
      </p>

      <Demo title="A help article" classes="cn-prose">
        <article class="cn-prose">
          <h2>Sending invoices on a schedule</h2>
          <p>
            A schedule sends the same invoice on a fixed day each month. Use it
            for retainers and seat-based plans, where the amount only changes
            when the team does.
          </p>
          <h3>Before you start</h3>
          <ul>
            <li>Add a billing contact to the customer.</li>
            <li>
              Set a default currency in <strong>Workspace settings</strong>.
            </li>
            <li>Connect a payment method, so the invoice carries a pay link.</li>
          </ul>
          <h3>Create the schedule</h3>
          <ol>
            <li>Open the invoice and choose Repeat.</li>
            <li>
              Pick the day of the month. Days after the 28th fall back to the
              last day of shorter months.
            </li>
            <li>
              Save. The next send date shows under the invoice number, for
              example <code>INV-2041 · next Oct 01</code>.
            </li>
          </ol>
          <blockquote>
            A schedule copies the line items when it sends, not when you save
            it. Edit the source invoice and the next send picks up the change.
          </blockquote>
          <h4>Pausing a schedule</h4>
          <p>
            Pause from the invoice menu. A paused schedule keeps its history,
            and resuming it sends on the next scheduled day, never at once.
            The <a href="#" onClick={noNav}>scheduling API</a> exposes the same
            pause as <code>schedule.paused = true</code>.
          </p>
          <hr />
          <p>
            Questions about a specific invoice go to the billing contact on the
            customer record, not to support.
          </p>
        </article>
      </Demo>

      <p class="cn-copy">
        Text sets in the body role at <code class="cn-code-inline">--cn-measure</code>{" "}
        (68ch) with 16px between blocks. <code class="cn-code-inline">h2</code> is
        the heading role with 48px above, <code class="cn-code-inline">h3</code> the
        title role with 32px and <code class="cn-code-inline">h4</code> the name
        role with 24px. Any heading keeps 12px under it, so it groups with the
        text it introduces. Inline <code class="cn-code-inline">code</code> is mono
        at .92em in <code class="cn-code-inline">--cn-fg-soft</code>, the same voice
        as <code class="cn-code-inline">.cn-code-inline</code>. A{" "}
        <code class="cn-code-inline">blockquote</code> hangs on a 2px{" "}
        <code class="cn-code-inline">--edge-strong</code> rule at its inline start,
        so it flips in right-to-left text. <code class="cn-code-inline">hr</code> is
        an <code class="cn-code-inline">--edge-soft</code> rule with 32px on each
        side. Lists and links keep the base rules: 20px indent, overlay-1
        markers and the 40% underline. Body copy is 16px at the default
        density and 15px at compact.
      </p>

      <h2 class="cn-title">Skip link</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">.cn-skip-link</code> is the first focusable
        element on a page. It waits above the viewport. When it takes keyboard
        focus it slides in at the top inline-start corner on the overlay fill
        with <code class="cn-code-inline">--shadow-pop</code>, over whatever sits
        there. This site has one: reload the page and press Tab.
      </p>

      <Demo title="As it looks while focused" classes="cn-skip-link" row>
        <a
          class="cn-skip-link"
          href="#main"
          style="position:static;translate:none"
          tabIndex={-1}
        >
          Skip to content
        </a>
      </Demo>

      <p class="cn-copy">
        The specimen above is pinned in place with an inline style so it shows
        at rest; the real one stays off screen until it is focused. Point its{" "}
        <code class="cn-code-inline">href</code> at the{" "}
        <code class="cn-code-inline">main</code> element's id, and give{" "}
        <code class="cn-code-inline">main</code>{" "}
        <code class="cn-code-inline">tabindex="-1"</code>, so following the link
        moves focus as well as scroll. The next Tab then lands on the first
        control in the content.
      </p>

      <CodeBlock
        title="Markup"
        code={`<body class="app-shell">
  <a class="cn-skip-link" href="#main">Skip to content</a>
  <header class="topbar">…</header>
  <main id="main" tabindex="-1" class="page-main is-reading">
    <article class="cn-prose">
      <h2>Sending invoices on a schedule</h2>
      <p>…</p>
      <ul><li>…</li></ul>
      <blockquote>…</blockquote>
      <hr>
    </article>
  </main>
</body>`}
      />

      <Props
        title="Contract"
        rows={[
          { name: ".cn-prose", values: "on an article", notes: "max-inline-size --cn-measure (68ch), the body role in --cn-fg-body. Direct children get 16px between them; the first gets none." },
          { name: "> h2 / > h3 / > h4", values: "headings", notes: "Heading role with 48px above, title role with 32px, name role with 24px, all --cn-fg. 12px to the next block." },
          { name: "code", values: "not inside pre", notes: "Mono at .92em in --cn-fg-soft, ligatures off." },
          { name: "> blockquote", values: "a quote", notes: "16px inline-start padding, --cn-fg-soft, a 2px --edge-strong border-inline-start." },
          { name: "> hr", values: "a break", notes: "An --edge-soft top rule with 32px block margins." },
          { name: "strong", values: "emphasis", notes: "--cn-fg at 600." },
          { name: "--cn-measure", default: "68ch", notes: "The longest line .cn-prose sets." },
          { name: ".cn-skip-link", values: "a, the first focusable element", notes: "Fixed 12px from the top and inline start, z-index 100. Overlay fill, --edge-strong hairline, --shadow-pop, the ui role. Rests above the viewport; :focus-visible slides it in over --t-fast." },
        ]}
      />
    </Doc>
  );
}
