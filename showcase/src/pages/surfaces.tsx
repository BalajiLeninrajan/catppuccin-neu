import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* The surface ladder, from the page up and then down into the carves. */
const LADDER = [
  { token: "--cn-surface-page", util: "cn-bg-page", mix: "mantle", contrast: "", use: "The ground: the body, the app shell, the topbar, stat bands." },
  { token: "--cn-surface-raised", util: "cn-bg-raised", mix: "base", contrast: "1.07:1 on the page", use: "Panels, the tilted panel, secondary buttons, segmented options, chips, accent cards, the selected tab, the slider thumb, the switch paddle." },
  { token: "--cn-surface-overlay", util: "cn-bg-overlay", mix: "surface-0 90% into base", contrast: "1.27:1 on base", use: "Popovers, menus, dialogs, drawers, toasts, tooltips, the skip link, the secondary hover." },
  { token: "--cn-surface-recessed", util: "cn-bg-recessed", mix: "crust 80% into mantle", contrast: "1.05:1 under the page, 1.13:1 under base", use: "The sidebar." },
  { token: "--cn-surface-band", util: "cn-bg-head", mix: "crust 50% over transparent, one step under its parent", contrast: "1.08:1 under base", use: "Table heads." },
  { token: "--cn-surface-sunken", util: "cn-bg-well", mix: "crust", contrast: "1.07:1 under the page, 1.14:1 under base", use: "Wells, the mono wells, stepper pills, skeletons, the switch plate." },
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
      lede="A ladder of six fills, and two containers built on it. The raised panel lifts content off the mantle page. The inset well presses it in."
    >
      <h2 class="cn-title">The surface ladder</h2>
      <Demo
        lead
        title="Six fills"
        classes="cn-bg-page / cn-bg-raised / cn-bg-overlay / cn-bg-recessed / cn-bg-head / cn-bg-well"
        why="Why nothing raised is lighter than base"
      >
        {/* A fixed 176px track fits the longest token, so the six swatches
            sit at an even pitch and still wrap on a narrow screen. */}
        <div style="width:100%;display:grid;grid-template-columns:repeat(auto-fill,176px);gap:var(--space-4)">
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
        </div>
      </Demo>

      <p class="cn-copy">
        Recipes read these six fills, never a raw ground.
        The page is mantle. Panels and plated controls sit on base, one fill
        step above it, and lift by that step, their contact edge, their
        cast and their hairline. Nothing raised is
        lighter than base: overlays float free of the page, so they alone
        take a lighter step. Wells, skeletons and the sidebar go the other
        way, darker than the page, with crust as the darker step.
      </p>

      <p class="cn-copy">
        The overlay stops where it does because a lighter step would drop
        the placeholder role under the text floor. Body text and
        placeholders hold their floors on it, and a hovered field rings in
        overlay-1, which clears the non-text floor on the page, in a panel
        and on the overlay. The table below has each step's ratio, and
        the <a href="/input">input</a> page has the ring's.
      </p>

      <Props
        title="Surface tokens"
        rows={LADDER.map((l) => ({ name: l.token, values: l.mix, default: l.util ? `.${l.util}` : undefined, contrast: l.contrast || undefined, notes: l.use }))}
      />

      <p class="cn-copy">
        Tailwind maps all six as{" "}
        <code class="cn-code-inline">bg-surface-page</code>,{" "}
        <code class="cn-code-inline">bg-surface-raised</code> and the rest. The{" "}
        <a href="/depth">Depth</a> page orders every elevation and the token
        each one uses.
      </p>

      <h2 class="cn-title">Panel</h2>
      <Demo
        title="Panel with header, body and footer"
        classes="panel / panel-header / panel-body / panel-footer"
        why="How a panel is built, and how many a region holds"
      >
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
        under <code class="cn-code-inline">--neu-raised</code>. Its top and left
        border sides are the <code class="cn-code-inline">--edge</code> hairline.
        Its right and bottom sides are <code class="cn-code-inline">--neu-ink</code>,
        so on the side away from the light the fill meets the ink with no
        lighter line between them, and the border joins the 1px contact edge
        as a 2px foot. Nothing on the top or left is brightened. The
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
        takes <code class="cn-code-inline">--neu-raised-soft</code> and adds
        the lit edge, which a plain panel does not carry. A region of
        a view holds at most three raised panels. More items go in one panel,
        a ruled stat grid on the ground or a table, so raised stays a rank
        and not a texture.
      </p>

      <Demo
        title="Header with an action cluster"
        classes="panel-header > h2 + .band-actions"
        why="What happens when the actions outgrow the band"
      >
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

      <Demo title="Tilted panel" classes="panel is-tilted" why="Where the tilted panel belongs and where it flattens">
        <div class="panel is-tilted" style="width:min(420px,90%);margin:12px">
          <div class="panel-body">
            <p class="cn-value-lg" style="margin:0">4,218 invoices</p>
            <p class="cn-meta" style="margin:8px 0 0">settled this quarter across 32 teams</p>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.is-tilted</code> is the one rotated surface: a
        1.2° turn on the 4px plate of a clickable under the lit top edge. The plate replaces
        the raised shadow, as it does under a button, so the card answers
        the top-left light with a hard block and no soft cast. Use it once per view at most, for a
        summary or an aside in prose, never for the page's main data, and
        never on a panel holding a table, a form or ruled rows, because
        rotated rules drift against the text on them. Its heading takes the
        name role, no larger than the panel titles beside it, so the tilt
        does the lifting and the type does not. It takes{" "}
        <code class="cn-code-inline">align-self: start</code>, so in a grid it
        keeps its content height instead of stretching to the row and showing
        an empty tail under the turn. It flattens to the regular raised panel
        at 1060px. Under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> it stands
        upright and keeps its plate, because rotated text renders soft.
        The{" "}
        <a href="/#ornament-budget">ornament budget</a> lists the other
        once-per-view pieces.
      </p>

      <h2 class="cn-title">Lead panel</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">.panel.is-lead</code> marks the panel a
        view is about, such as the invoice table on a billing dashboard. It
        takes the base fill like every panel, with the brighter{" "}
        <code class="cn-code-inline">--edge-strong</code> hairline, solid
        surface-2, on its top and left, and stands on{" "}
        <code class="cn-code-inline">--neu-lifted</code>: a hard dark foot on
        the bottom and right, 9px deep and 7px wide with its ink border
        sides, where a button's plate is 4px and a plain panel's foot 2px,
        and a longer cast. It is a resting panel with a deeper foot, not a
        height of its own. It keeps the lit edge and draws no outline all
        round, because neither a bright line nor a heavier outline reads as
        height. Its band title takes{" "}
        <code class="cn-code-inline">--lead-title-size</code> at the heading
        weight, 28px at default density where other panels use 20px, and
        20px at 655px and under. Its header band is{" "}
        <code class="cn-code-inline">--lead-band-h</code> tall, 72px where a
        plain band is 64px, and{" "}
        <code class="cn-code-inline">--lead-pad</code> gives its header, body
        and footer 32px of room where a plain panel has 24px; both step down
        with density. A cast barely shows on a dark page, so the deeper foot,
        the title and the room carry the rank. It adds height, a larger title
        and room, not an ornament: no plate, tilt or color. Use one per view at most.
        The tilted aside comments on the data; the lead panel holds it.
      </p>

      <Demo title="A lead panel beside a raised one" classes="panel is-lead" why="How the lead panel outranks its neighbors">
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

      <Demo title="Scrolling well" classes="well scroll-well" why="The scroll cue, and why a well has no border">
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
        wells and stepper pills use, crust, the darkest Mocha stop: 1.07:1
        under the page and 1.14:1 under a panel. So it sits below the ground and never
        reads as an outlined panel. The carve finishes it with one dark wall
        from the top left and no border or light lip.{" "}
        <code class="cn-code-inline">--cn-well-ring</code> is a quiet even
        hairline over the carve, halfway between surface-0 and surface-1,
        1.7:1 on the fill and the same
        on all four sides, so a well keeps its shape on a dim display.{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> closes it
        into a surface-2 ring.
      </p>

      <Props
        title="Surface classes"
        rows={[
          {
            name: ".panel",
            values: "raised container",
            contrast: "Fill 1.07:1 on the page · --edge 1.85:1 on the fill · fill against the ink sides 1.22:1",
            notes: "--cn-surface-raised fill (base, a step above the page), --neu-raised (contact, near shadow and cast, with no lit edge), an --edge hairline on the top and left and --neu-ink border sides on the right and bottom, a 2px foot with the contact. All four sides return to the hairline under prefers-contrast: more. Radius from --cn-radius-panel. Inside another panel it takes --neu-raised-soft and adds the lit edge. At most three per region.",
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
            notes: "rotate(1.2deg) on the clickable's plate, --cn-plate (4px, 3px cozy, 2px compact), under the lit edge with no raised shadow, align-self: start so a grid row never stretches it. A summary or an aside in prose at 15px, never a table, a form or ruled rows; its heading in the name role. Flattens at 1060px and stands upright under prefers-contrast: more.",
          },
          {
            name: ".panel.is-lead",
            values: "one per view",
            contrast: "--edge-strong 2.5:1 on the fill",
            notes: "The panel the view is about. The base fill with the --edge-strong hairline on the top and left and --neu-ink border sides on the right and bottom, on --neu-lifted with its deeper foot, 9px deep and 7px wide, and its longer cast, a --lead-band-h header band, --lead-pad around its body and in its bands, and a band title at --lead-title-size at the heading weight, so it outranks its neighbors by height, by its title and by its room. No ornament.",
          },
          {
            name: ".panel.is-shell",
            values: "outermost panel",
            notes: "Drops its border, radius and shadow at 760px so a phone runs edge to edge.",
          },
          {
            name: ".well",
            values: "inset container",
            notes: "No border, the --cn-surface-sunken fill; the full inner shadow finishes it under --cn-well-ring, an even hairline halfway between surface-0 and surface-1 that prefers-contrast: more lifts to surface-2. The card radius (12px).",
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
