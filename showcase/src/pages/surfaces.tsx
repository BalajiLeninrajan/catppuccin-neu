import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* The surface ladder, from the page up and then down into the carves. */
const LADDER = [
  { token: "--cn-surface-page", util: "cn-bg-base", mix: "base", use: "The ground." },
  { token: "--cn-surface-raised", util: "cn-bg-raised", mix: "base, the page color", use: "Panels, secondary buttons, segmented options, chips, accent cards, the selected tab, the slider thumb, the switch paddle." },
  { token: "--cn-surface-overlay", util: "cn-bg-overlay", mix: "surface-0 90% into base · 1.27:1", use: "Popovers, menus, dialogs, drawers, toasts, tooltips, the skip link, the secondary hover." },
  { token: "--cn-surface-recessed", util: "cn-bg-recessed", mix: "mantle 55% into base", use: "The sidebar." },
  { token: "--cn-surface-band", util: "cn-bg-head", mix: "crust 30% over transparent, one step under its parent", use: "Table heads, skeletons." },
  { token: "--cn-surface-sunken", util: "cn-bg-well", mix: "crust 38% into mantle", use: "Wells, the mono wells, stepper pills." },
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
      lede="A ladder of six fills, and two containers built on it. The raised panel lifts content off the page by its edges and shadow, on the page's own color. The inset well presses it in, with no border."
    >
      <h2 class="cn-title">The surface ladder</h2>
      <p class="cn-copy">
        Panels and plated controls sit on the page color. A raised surface
        lifts by its contact edge, its cast, its lit top edge and its
        hairline, never by a lighter fill. Overlays float free of the page,
        so they take the one lighter step. Table heads and carved fills go
        the other way, darker than the page. Recipes read these six tokens,
        never a raw ground. The ratios are against the page.
      </p>

      <p class="cn-copy">
        The overlay stops at 1.27:1 because a lighter step would drop the
        placeholder role under 4.5:1. Body text stays above 7:1 and
        placeholders above 4.5:1 on it. The field lip is overlay-1, so it
        clears 3:1 everywhere: 4.4:1 on the page and in a panel, which share
        a color, and 3.5:1 on the overlay. An empty field inside a panel or a
        dialog keeps its edge.
      </p>

      <Demo title="Six fills" classes="cn-bg-base / cn-bg-raised / cn-bg-overlay / cn-bg-recessed / cn-bg-head / cn-bg-well" row>
        {LADDER.map((l) => (
          <div key={l.token} class="cn-stack cn-gap-8" style="justify-items:center">
            <div
              class={`${l.util} cn-edge-soft cn-r-card`}
              style={`width:96px;height:64px${l.util ? "" : `;background:var(${l.token})`}`}
            />
            <code class="cn-code-meta">{l.token}</code>
            <span class="cn-meta">{l.util ? `.${l.util}` : "no utility"}</span>
          </div>
        ))}
      </Demo>

      <Props
        title="Surface tokens"
        rows={LADDER.map((l) => ({ name: l.token, values: l.mix, default: l.util ? `.${l.util}` : undefined, notes: l.use }))}
      />

      <p class="cn-copy">
        Tailwind maps all six as{" "}
        <code class="cn-code-inline">bg-surface-page</code>,{" "}
        <code class="cn-code-inline">bg-surface-raised</code> and the rest. The{" "}
        <a href="/depth">Depth</a> page orders every elevation and the token
        each one uses.
      </p>

      <h2 class="cn-title">Panel</h2>
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
        The panel fills with <code class="cn-code-inline">--cn-surface-raised</code>{" "}
        under <code class="cn-code-inline">--neu-raised</code> and a hairline. The
        header and footer are bands on the panel's own fill, each parted from
        the body by an <code class="cn-code-inline">--edge-soft</code> divider. A
        darker header would sink below the surface it titles, so the title's
        weight anchors it instead. Their height and padding come from{" "}
        <code class="cn-code-inline">--band-h</code> and{" "}
        <code class="cn-code-inline">--band-pad</code>, the same rule the modal and
        drawer headers use. A filled child at a panel edge, such as a table
        head, carries its own radius,{" "}
        <code class="cn-code-inline">calc(var(--cn-radius-panel) - 1px)</code> on the
        outer corners. Never fix a corner with{" "}
        <code class="cn-code-inline">overflow: hidden</code>; that clips anchored
        popovers and hard-offset shadows. The panel has no padding of its own,
        so tables can fill it; put prose and controls in{" "}
        <code class="cn-code-inline">.panel-body</code>.
      </p>

      <p class="cn-copy">
        A panel inside a panel rests on its parent, not on the page, so it
        takes <code class="cn-code-inline">--neu-raised-soft</code> and keeps
        the lit edge. A region of
        a view holds at most three raised panels. More items go in one panel,
        a ruled stat grid on the ground or a table, so raised stays a rank
        and not a texture.
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
        <code class="cn-code-inline">.band-actions</code> holds the right side of a
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
        <code class="cn-code-inline">.is-tilted</code> is the one rotated surface: a
        1.2° turn with the 10px plate over the neu raise, so the card still
        answers the top-left light. Use it once per view at most, for a
        summary or an aside, never for the page's main data, and never on a
        panel holding a table or a form. It takes{" "}
        <code class="cn-code-inline">align-self: start</code>, so in a grid it
        keeps its content height instead of stretching to the row and showing
        an empty tail under the turn. It flattens to the regular raised panel
        at 1060px. Under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> it stands
        upright and keeps its 10px plate, because rotated text renders soft.
        The{" "}
        <a href="/#ornament-budget">ornament budget</a> lists the other
        once-per-view pieces.
      </p>

      <h2 class="cn-title">Lead panel</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">.panel.is-lead</code> marks the panel a
        view is about, such as the invoice table on a billing dashboard. It
        sits on the page color like every panel, inside the bright{" "}
        <code class="cn-code-inline">--edge-strong</code> hairline, solid
        surface-2 at 2.5:1 against a panel's 1.6:1, and stands on{" "}
        <code class="cn-code-inline">--neu-lifted</code>: a longer cast under
        a bright overlay-0 top rim at 3.4:1. Its band title takes{" "}
        <code class="cn-code-inline">--lead-title-size</code> at the heading
        weight, 28px at default density where other panels use 20px. A cast barely shows on a
        dark page, so the two edges and the title carry the rank. It adds
        height and a larger title, not an ornament: no plate, tilt or color. Use one per view at most.
        The tilted aside comments on the data; the lead panel holds it.
      </p>

      <Demo title="A lead panel beside a raised one" classes="panel is-lead">
        <div class="cn-grid-12" style="width:100%">
          <section class="panel is-lead cn-span-8" aria-labelledby="sf-lead">
            <div class="panel-header">
              <h2 id="sf-lead">Open invoices</h2>
              <span class="chip">12 open</span>
            </div>
            <div class="panel-body">
              <p class="cn-copy cn-m-0">$18,420 outstanding across 6 teams. The oldest is 26 days past due.</p>
            </div>
          </section>
          <section class="panel cn-span-4" aria-labelledby="sf-plain">
            <div class="panel-header">
              <h2 id="sf-plain">Payouts</h2>
            </div>
            <div class="panel-body">
              <p class="cn-copy cn-m-0">Next on Oct 01.</p>
            </div>
          </section>
        </div>
      </Demo>

      <h2 class="cn-title">Well</h2>

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
        When a well scrolls, add <code class="cn-code-inline">.scroll-well</code>. The
        scrollbar takes the dark-well thumb color, and the bottom edge of the
        well fades out to show there is more.
      </p>

      <p class="cn-copy">
        The well takes the{" "}
        <code class="cn-code-inline">--cn-surface-sunken</code> fill the code
        wells and stepper pills use, so it sits below the ground and never
        reads as an outlined panel. The carve and{" "}
        <code class="cn-code-inline">--cn-well-lip</code>, a 1px solid surface-2
        line, 2.5:1 on the page, on the bottom and right inner walls, finish
        it without a border and stay softer than a field's 4.4:1 lip.
      </p>

      <Props
        title="Surface classes"
        rows={[
          {
            name: ".panel",
            values: "raised container",
            notes: "--cn-surface-raised fill (the page color), --neu-raised (contact, near shadow, cast and the lit top edge) and an --edge hairline. Radius from --cn-radius-panel. Inside another panel it takes --neu-raised-soft and keeps the lit edge. At most three per region.",
          },
          {
            name: ".panel-header / .panel-footer",
            values: "bands",
            notes: "--band-h tall with --band-pad, on the panel's fill. The header has a bottom divider and the footer a top one. A band holding .band-actions wraps; panel footers also wrap at 760px.",
          },
          {
            name: ".band-actions",
            values: "action cluster",
            notes: "Pushes right, wraps inside itself, 8px gap.",
          },
          {
            name: ".panel-body",
            values: "content band",
            notes: "--body-pad: 24px, 16px 24px at cozy density, 12px 16px at compact.",
          },
          {
            name: ".panel.is-tilted",
            values: "one per view",
            notes: "rotate(1.2deg) and a 10px plate over neu-raised, align-self: start so a grid row never stretches it. A summary or an aside, never a table or a form. Flattens at 1060px and stands upright under prefers-contrast: more.",
          },
          {
            name: ".panel.is-lead",
            values: "one per view",
            notes: "The panel the view is about. The page color inside the bright --edge-strong hairline, on --neu-lifted with its bright overlay-0 rim, and a band title at --lead-title-size at the heading weight, so it outranks its neighbors by height and by its title. No ornament.",
          },
          {
            name: ".panel.is-shell",
            values: "outermost panel",
            notes: "Drops its border, radius and shadow at 760px so a phone runs edge to edge.",
          },
          {
            name: ".well",
            values: "inset container",
            notes: "No border, the --cn-surface-sunken fill; the full inner shadow and --cn-well-lip finish it. The card radius (12px).",
          },
          {
            name: ".scroll-well",
            values: "scroll styling",
            notes: "Sets scrollbar-color. With .well it fades the bottom edge as the scroll cue.",
          },
          {
            name: "--cn-radius-panel",
            values: "16px · 16px cozy · 12px compact",
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

<div class="well scroll-well" style="max-height: 180px; overflow: auto"
     tabindex="0" role="region" aria-label="Recent activity">…</div>`}
      />
    </Doc>
  );
}
