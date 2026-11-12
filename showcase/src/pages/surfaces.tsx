import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* The four fills, from the page up and then down into the well. */
const LADDER = [
  { token: "--cn-surface-page", mix: "mantle", use: "The page, the app shell, the topbar." },
  { token: "--cn-surface-raised", mix: "base", use: "Panels, buttons, chips, accent cards." },
  { token: "--cn-surface-overlay", mix: "surface-0 90% into base", use: "Toasts, tooltips, the select list. Dialogs and drawers take the raised fill." },
  { token: "--cn-surface-sunken", mix: "crust", use: "Wells, code wells, stepper pills." },
];

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
      lede="The raised panel lifts content off the mantle page. The inset well presses it in."
    >
      <Demo title="Four fills" classes="--cn-surface-page / -raised / -overlay / -sunken">
        <div style="width:100%;display:grid;grid-template-columns:repeat(auto-fill,176px);gap:var(--space-4)">
          {LADDER.map((l) => (
            <div key={l.token} class="cn-stack cn-gap-8" style="justify-items:center">
              <div class="cn-edge-soft cn-r-card" style={`width:96px;height:64px;background:var(${l.token})`} />
              <code class="cn-code-meta">{l.token}</code>
            </div>
          ))}
        </div>
      </Demo>

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
        The panel has no padding of its own, so a table can fill it. Never
        set <code class="cn-code-inline">overflow: hidden</code> on a panel:
        it clips tooltips and plates.
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

      <Demo title="Tilted panel" classes="panel is-tilted">
        <div class="panel is-tilted" style="width:min(420px,90%);margin:12px">
          <div class="panel-body">
            <p class="cn-value-lg" style="margin:0">4,218 invoices</p>
            <p class="cn-meta" style="margin:8px 0 0">settled this quarter across 32 teams</p>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Use the tilted panel once per view at most, for a summary or an
        aside. Never put a table or a form in it.
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
        <div
          class="well scroll-well cn-px-16 cn-py-8"
          style="width:min(560px,100%);max-height:180px;overflow:auto"
          tabIndex={0}
          role="region"
          aria-label="Recent activity"
        >
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
        A well that scrolls needs{" "}
        <code class="cn-code-inline">tabindex="0"</code>,{" "}
        <code class="cn-code-inline">role="region"</code> and an{" "}
        <code class="cn-code-inline">aria-label</code>, so a keyboard can
        scroll it.
      </p>

      <Props
        title="Surface classes"
        rows={[
          { name: ".panel", notes: "The raised container. Inside another panel it takes the soft shadow." },
          { name: ".panel-header / .panel-footer", notes: "Bands with a divider. An h2 or h3 in the header takes the title role." },
          { name: ".band-actions", notes: "The right side of a band. It wraps under the title when it outgrows the row." },
          { name: ".panel-body", notes: "The padded content band." },
          { name: ".panel.is-tilted", values: "one per view", notes: "Turned 1.2deg on a hard plate. Flat at 1060px and below, upright under prefers-contrast: more." },
          { name: ".panel.is-shell", notes: "An outermost panel that drops its border and shadow at 760px, so a phone runs edge to edge." },
          { name: ".well", notes: "The inset container, at the card radius." },
          { name: ".scroll-well", notes: "Styles the scrollbar. With .well it fades the bottom edge as a scroll cue." },
          ...LADDER.map((l) => ({ name: l.token, values: l.mix, notes: l.use })),
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
</div>`}
      />
    </Doc>
  );
}
