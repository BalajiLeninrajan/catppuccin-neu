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
        The recipe styles two children directly.{" "}
        <code class="cn-code">strong</code> is the title,{" "}
        <code class="cn-code">span</code> the supporting line, and anything
        else joins the 10px stack. Keep the copy to one idea: what's missing,
        and the single next step.
      </p>

      <Demo title="Title, description, action" classes="empty-state">
        <div class="empty-state">
          <strong>No invoices yet</strong>
          <span>Invoices you create or import will show up here.</span>
          <button type="button" class="btn btn-secondary">
            New invoice
          </button>
        </div>
      </Demo>

      <Demo title="With a dashed action" classes="empty-state">
        <div class="empty-state">
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
  <strong>No invoices yet</strong>
  <span>Invoices you create or import will show up here.</span>
  <button class="btn btn-secondary">New invoice</button>
</div>`}
      />
    </Doc>
  );
}
