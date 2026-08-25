import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function SurfacesPage() {
  return (
    <Doc
      title="Surfaces"
      lede="Two containers: the raised panel and the inset well. A panel lifts content off the page; a well presses it in, borderless."
    >
      <Demo
        title="Panel with heading and footer"
        classes="panel / panel-heading / panel-footer"
      >
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-heading">
            <h2>Billing settings</h2>
            <span class="chip">3 seats</span>
          </div>
          <div style="padding:22px">
            <p class="cn-copy" style="margin:0">
              Invoices are issued on the first of each month and sent to the
              workspace owner. Update the billing contact below to change where
              receipts are delivered.
            </p>
          </div>
          <div class="panel-footer">
            <span class="cn-meta">Last updated 2 days ago</span>
            <button class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        The heading and footer bands are filled children of a rounded parent,
        so each carries its own radius,{" "}
        <code class="cn-code">calc(var(--pane-radius) - 1px)</code> on the
        outer corners. Never fix a band corner with{" "}
        <code class="cn-code">overflow: hidden</code>; that clips anchored
        popovers and hard-offset shadows.
      </p>

      <Demo title="Tilted hero panel" classes="panel is-tilted">
        <div class="panel is-tilted" style="width:min(420px,90%);margin:12px">
          <div style="padding:26px">
            <p class="cn-eyebrow" style="margin:0 0 10px">This quarter</p>
            <p class="cn-value-lg" style="margin:0">4,218 invoices</p>
            <p class="cn-meta" style="margin:8px 0 0">
              settled across 32 teams
            </p>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.is-tilted</code> is the one rotated,
        hard-shadowed surface, a 1.2° rotate with a 10px hard offset. Use it
        once per page at most; it flattens to the regular raised panel at
        ≤1060px.
      </p>

      <Demo title="Well" classes="well">
        <div class="well" style="width:min(560px,100%);padding:18px">
          <div class="stat-strip">
            <div class="stat-row">
              <span>Notifications</span>
              <b>Enabled</b>
            </div>
            <div class="stat-row">
              <span>Weekly digest</span>
              <b>Fridays</b>
            </div>
            <div class="stat-row">
              <span>Time zone</span>
              <b>UTC−05:00</b>
            </div>
          </div>
        </div>
      </Demo>

      <Demo title="Scrolling well" classes="well scroll-well">
        <div
          class="well scroll-well"
          style="width:min(560px,100%);max-height:180px;overflow:auto;padding:6px 18px"
        >
          <div class="stat-strip">
            {[
              ["Invoice #1042 issued", "Today"],
              ["Member added to Support", "Today"],
              ["Plan upgraded to Pro", "Yesterday"],
              ["Invoice #1041 settled", "Yesterday"],
              ["Workspace renamed", "Mon"],
              ["Two seats added", "Mon"],
              ["Invoice #1040 settled", "Sun"],
              ["Notification rules updated", "Sat"],
            ].map(([label, when]) => (
              <div class="stat-row" key={label}>
                <span>{label}</span>
                <b>{when}</b>
              </div>
            ))}
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        When a well scrolls, add <code class="cn-code">.scroll-well</code>. The
        scrollbar picks up the dark-well thumb color, and the bottom edge of
        the well dissolves to show the overflow.
      </p>

      <p class="cn-copy">
        The well's ground is transparent; the carve alone defines it. Compose{" "}
        <code class="cn-code">.cn-bg-well</code> onto{" "}
        <code class="cn-code">.well</code> for an explicit darker fill.
      </p>

      <Props
        title="Surface classes"
        rows={[
          {
            name: ".panel",
            values: "raised container",
            notes:
              "Full neu-raised shadow, hairline edge. Radius from --pane-radius.",
          },
          {
            name: ".panel-heading / .panel-footer",
            values: "bands",
            notes:
              "Heading has the mantle-mix fill; corners follow the parent radius minus the 1px border. Footer has no fill, only the divider line.",
          },
          {
            name: ".panel.is-tilted",
            values: "hero variant",
            notes: "rotate(1.2deg) + 10px hard offset; flattens at ≤1060px.",
          },
          {
            name: ".panel.is-shell",
            values: "outermost panel",
            notes: "Sheds border, radius, and shadow at ≤760px for full-bleed phones.",
          },
          {
            name: ".well",
            values: "inset container",
            notes:
              "Borderless and transparent; the full inner shadow defines it. 13px radius.",
          },
          {
            name: ".scroll-well",
            values: "scroll styling",
            notes:
              "Sets scrollbar-color; combined with .well it dissolves the bottom edge as the scroll cue.",
          },
          {
            name: "--pane-radius",
            values: "16px | 12px",
            default: "16px",
            notes: "12px arrives only via data-density=\"compact\".",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="panel">
  <div class="panel-heading">
    <h2>Billing settings</h2>
  </div>
  <div style="padding: 22px">…</div>
  <div class="panel-footer">
    <span class="cn-meta">Last updated 2 days ago</span>
    <button class="btn btn-primary">Save changes</button>
  </div>
</div>

<div class="well scroll-well" style="max-height: 180px; overflow: auto">…</div>`}
      />
    </Doc>
  );
}
