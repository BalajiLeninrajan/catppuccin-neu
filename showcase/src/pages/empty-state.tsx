import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function EmptyStatePage() {
  return (
    <Doc
      title="Empty state"
      lede="A centered placeholder for a region with nothing to show yet: a short title, one line of guidance, and the action that fills the space."
    >
      <Demo title="Glyph, title, description, action" classes="empty-state">
        <div class="empty-state">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
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
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
            <circle cx="9" cy="8" r="3.5" />
            <path d="M2.5 20a6.5 6.5 0 0 1 13 0M16 4.5a3.5 3.5 0 0 1 0 7M21.5 20a6.5 6.5 0 0 0-4.5-6.2" />
          </svg>
          <strong>No teammates in this workspace</strong>
          <span>Invite people to start assigning work and sharing dashboards.</span>
          <button type="button" class="btn btn-ghost is-dashed">+ Invite a teammate</button>
        </div>
      </Demo>

      <p class="cn-copy">
        Use <code class="cn-code-inline">.btn-secondary</code> for the ordinary create step and <code class="cn-code-inline">.btn-ghost.is-dashed</code> when the action is an open slot. Keep <code class="cn-code-inline">.btn-primary</code> for an empty state that is the page's one job.
      </p>

      <Props
        title="Classes"
        rows={[
          { name: ".empty-state", values: "div inside any region", notes: "A centered column with a height floor." },
          { name: ".empty-state.is-fill", values: "modifier", notes: "Fills the pane or drawer it sits in." },
          { name: "svg", values: "first child", notes: "An optional glyph in a round carve." },
          { name: "strong", notes: "The title." },
          { name: "span", notes: "The supporting line." },
          { name: "action", values: ".btn or .btn-text", notes: "One action only." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="empty-state">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">…</svg>
  <strong>No invoices yet</strong>
  <span>Invoices you create or import will show up here.</span>
  <button class="btn btn-secondary">New invoice</button>
</div>`}
      />
    </Doc>
  );
}
