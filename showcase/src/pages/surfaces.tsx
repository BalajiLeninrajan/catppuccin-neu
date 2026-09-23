import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const ACTIVITY = [
  ["Invoice #1042 issued", "Today"],
  ["Member added to Support", "Today"],
  ["Plan upgraded to Pro", "Yesterday"],
  ["Invoice #1041 settled", "Yesterday"],
  ["Workspace renamed", "Mon"],
  ["Two seats added", "Mon"],
  ["Invoice #1040 settled", "Sun"],
  ["Notification rules updated", "Sat"],
];

export default function SurfacesPage() {
  return (
    <Doc
      title="Surfaces"
      lede="Two containers: the raised panel and the inset well. A panel lifts content off the page. A well presses it in, with no border."
    >
      <Demo title="Panel with header, body and footer" classes="panel / panel-header / panel-body / panel-footer">
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-header">
            <h2>Billing settings</h2>
            <span class="chip">3 seats</span>
          </div>
          <div class="panel-body">
            <p class="cn-copy" style="margin:0">
              Invoices are issued on the first of each month and sent to the
              workspace owner. Change the billing contact to change where
              receipts go.
            </p>
          </div>
          <div class="panel-footer">
            <span class="cn-meta">Last updated 2 days ago</span>
            <button class="btn btn-primary">Save changes</button>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        The header and footer are bands. Their height and padding come from{" "}
        <code class="cn-code">--band-h</code> and{" "}
        <code class="cn-code">--band-pad</code>, the same rule the modal and
        drawer headers use. A filled band carries its own radius,{" "}
        <code class="cn-code">calc(var(--cn-radius-panel) - 1px)</code> on the
        outer corners. Never fix a band corner with{" "}
        <code class="cn-code">overflow: hidden</code>; that clips anchored
        popovers and hard-offset shadows. The panel has no padding of its own,
        so tables can fill it; put prose and controls in{" "}
        <code class="cn-code">.panel-body</code>.
      </p>

      <Demo title="Header with an action cluster" classes="panel-header > h2 + .band-actions">
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-header">
            <h2>Invoices</h2>
            <div class="band-actions">
              <button class="btn btn-ghost is-sm" aria-pressed="true">Open</button>
              <button class="btn btn-ghost is-sm">Paid</button>
              <button class="btn btn-ghost is-sm">Overdue</button>
              <button class="btn btn-secondary is-sm">Export</button>
            </div>
          </div>
          <div class="panel-body">
            <p class="cn-copy" style="margin:0">12 open invoices, $18,420 outstanding.</p>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.band-actions</code> holds the right side of a
        band. When the actions outgrow the row, the band wraps them under the
        title, and the cluster wraps inside itself. Nothing hides.
      </p>

      <Demo title="Tilted panel" classes="panel is-tilted">
        <div class="panel is-tilted" style="width:min(420px,90%);margin:12px">
          <div class="panel-body">
            <p class="cn-value-lg" style="margin:0">4,218 invoices</p>
            <p class="cn-meta" style="margin:8px 0 0">settled this quarter across 32 teams</p>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.is-tilted</code> is the one rotated surface: a
        1.2° turn with the 10px plate over the neu raise, so the card still
        answers the top-left light. Use it once per page at most, for a
        summary or an aside, never for the page's main data. It flattens to
        the regular raised panel at 1060px.
      </p>

      <Demo title="Well" classes="well">
        <div class="well cn-px-16 cn-py-8" style="width:min(560px,100%)">
          <div class="cn-divide">
            <div class="stat is-inline">
              <span>Notifications</span>
              <b>Enabled</b>
            </div>
            <div class="stat is-inline">
              <span>Weekly digest</span>
              <b>Fridays</b>
            </div>
            <div class="stat is-inline">
              <span>Time zone</span>
              <b>UTC-05:00</b>
            </div>
          </div>
        </div>
      </Demo>

      <Demo title="Scrolling well" classes="well scroll-well">
        <div class="well scroll-well cn-px-16 cn-py-8" style="width:min(560px,100%);max-height:180px;overflow:auto">
          <div class="cn-divide">
            {ACTIVITY.map(([label, when]) => (
              <div class="stat is-inline" key={label}>
                <span>{label}</span>
                <b>{when}</b>
              </div>
            ))}
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        When a well scrolls, add <code class="cn-code">.scroll-well</code>. The
        scrollbar takes the dark-well thumb color, and the bottom edge of the
        well fades out to show there is more.
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
            notes: "The full neu-raised shadow and a hairline edge. Radius from --cn-radius-panel.",
          },
          {
            name: ".panel-header / .panel-footer",
            values: "bands",
            notes: "--band-h tall with --band-pad. The header has the recessed fill; the footer has only the divider. Both wrap.",
          },
          {
            name: ".band-actions",
            values: "action cluster",
            notes: "Pushes right, wraps inside itself, 8px gap.",
          },
          {
            name: ".panel-body",
            values: "content band",
            notes: "--body-pad: 24px, or 12px 16px in compact.",
          },
          {
            name: ".panel.is-tilted",
            values: "one per page",
            notes: "rotate(1.2deg) and a 10px plate over neu-raised. A summary or an aside, not the main data. Flattens at 1060px.",
          },
          {
            name: ".panel.is-shell",
            values: "outermost panel",
            notes: "Drops its border, radius and shadow at 760px so a phone runs edge to edge.",
          },
          {
            name: ".well",
            values: "inset container",
            notes: "No border, transparent ground; the full inner shadow defines it. The card radius (12px).",
          },
          {
            name: ".scroll-well",
            values: "scroll styling",
            notes: "Sets scrollbar-color. With .well it fades the bottom edge as the scroll cue.",
          },
          {
            name: "--cn-radius-panel",
            values: "16px · 12px compact",
            default: "16px",
            notes: 'Compact density sets it to the card radius.',
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="panel">
  <div class="panel-header">
    <h2>Invoices</h2>
    <div class="band-actions">
      <button class="btn btn-ghost is-sm" aria-pressed="true">Open</button>
      <button class="btn btn-secondary is-sm">Export</button>
    </div>
  </div>
  <div class="panel-body">…</div>
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
