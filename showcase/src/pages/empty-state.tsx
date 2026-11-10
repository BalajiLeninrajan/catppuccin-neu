import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function EmptyStatePage() {
  return (
    <Doc
      title="Empty state"
      lede="A centered placeholder for a region with nothing to show yet: a short title, one line of guidance, and the action that fills the space."
    >
      <p class="cn-copy">
        <code class="cn-code-inline">.empty-state</code> is a centered flex column
        with a floor from <code class="cn-code-inline">--empty-h</code> (260px, 120px
        compact), so an empty list or panel body keeps its height.
      </p>

      <Demo lead title="Glyph, title, description, action" why="What the recipe styles" classes="empty-state">
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

      <p class="cn-copy">
        The recipe
        styles three children. An <code class="cn-code-inline">svg</code> before the
        title sits in a 56px round carve on the soft inset.{" "}
        <code class="cn-code-inline">strong</code> is the title,{" "}
        <code class="cn-code-inline">span</code> the supporting line, and anything
        else joins the 8px stack. A button adds 16px above itself, so the action
        stands 24px under the copy.
      </p>

      <Demo title="With a dashed action" why="Which action button to use" classes="empty-state">
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
        Use <code class="cn-code-inline">.btn .btn-secondary</code> for the ordinary
        create step and <code class="cn-code-inline">.btn .btn-ghost .is-dashed</code>{" "}
        when the action is itself an open slot. Reserve{" "}
        <code class="cn-code-inline">.btn-primary</code> for an empty state that is
        the page's one job, like a first-run screen.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".empty-state",
            values: "div inside any region",
            notes:
              "Centered flex column, 8px gap, --empty-h min-height, --cn-fg-muted (subtext-0) text.",
          },
          {
            name: ".empty-state.is-fill",
            values: "modifier",
            notes: "Fills the pane or drawer it sits in: height 100%, no floor, 16px padding, 4px gap.",
          },
          {
            name: "svg",
            notes:
              "Optional glyph, first child. A 56px round carve on --neu-inset-soft, 16px padding, overlay-1 stroke.",
          },
          {
            name: "strong",
            notes: "The title. The body size, 16px, in --cn-fg.",
          },
          {
            name: "span",
            notes: "The supporting line. 14px, the meta size, in the muted color.",
          },
          {
            name: "action",
            values: ".btn-secondary / .btn-ghost.is-dashed / .btn-primary",
            notes:
              "Optional. One action only, a .btn or .btn-text. It adds 16px above itself, so it stands 24px under the copy; 12px in .is-fill.",
          },
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
