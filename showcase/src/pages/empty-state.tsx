import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function EmptyStatePage() {
  return (
    <Doc
      title="Empty state"
      lede="A centered placeholder for a region with nothing to show yet: a short title, one line of guidance, and the action that fills the space."
    >
      <p class="cn-copy">
        <code class="cn-code">.empty-state</code> is a centered flex column
        with a 260px floor, so an empty list or panel body keeps its height.
        The recipe styles three children directly. An{" "}
        <code class="cn-code">svg</code> before the title sits on a 56px
        carved plate, the same material as every input on the page, so the
        emptiness reads as a place instead of a void.{" "}
        <code class="cn-code">strong</code> is the title,{" "}
        <code class="cn-code">span</code> the supporting line, and anything
        else joins the 10px stack.
      </p>

      <Demo title="Glyph, title, description, action" classes="empty-state">
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z" />
            <path d="M14 3v5h5M9 13h6M9 17h4" />
          </svg>
          <strong>No invoices yet</strong>
          <span>Invoices you create or import will show up here.</span>
          <button type="button" class="btn btn-secondary">
            New invoice
          </button>
        </div>
      </Demo>

      <Demo title="With a dashed action" classes="empty-state">
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
          </svg>
          <strong>No teammates in this workspace</strong>
          <span>Invite people to start assigning work and sharing dashboards.</span>
          <button type="button" class="btn-dashed">+ Invite a teammate</button>
        </div>
      </Demo>

      <p class="cn-copy">
        Use <code class="cn-code">.btn .btn-secondary</code> for the ordinary
        create step and <code class="cn-code">.btn-dashed</code> when the
        action is itself an open slot. Reserve{" "}
        <code class="cn-code">.btn-primary</code> for an empty state that is
        the page's one job, like a first-run screen.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".empty-state",
            values: "div inside any region",
            notes:
              "Centered flex column, 10px gap, 260px min-height, overlay-1 base color.",
          },
          {
            name: ".empty-state.is-fill",
            values: "modifier",
            notes: "Fills the pane or drawer it sits in: height 100%, no 260px floor, 16px padding, 6px gap.",
          },
          {
            name: "svg",
            notes:
              "Optional glyph, first child. 56px round plate on --neu-inset-soft, 16px padding, overlay-1 stroke.",
          },
          {
            name: "strong",
            notes: "The title. 15px, full text color.",
          },
          {
            name: "span",
            notes: "The supporting line. 12px, inherits the muted color.",
          },
          {
            name: "action",
            values: ".btn .btn-secondary / .btn-dashed / .btn .btn-primary",
            notes:
              "Optional. One action only; it joins the stack below the copy.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="empty-state">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true">…</svg>
  <strong>No invoices yet</strong>
  <span>Invoices you create or import will show up here.</span>
  <button class="btn btn-secondary">New invoice</button>
</div>`}
      />
    </Doc>
  );
}
