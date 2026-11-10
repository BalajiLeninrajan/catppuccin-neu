import type { ComponentChildren } from "preact";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* One model, lowest first. Height is distance from the ground; the light
   is above and to the top left. */
const HEIGHTS = [
  { height: "Below the ground", tokens: "--neu-inset or --neu-inset-soft, transparent or --cn-surface-sunken, --cn-well-ring", who: "Fields, wells, skeletons, tabs, the switch plate, stepper pills, engaged states, the disabled primary." },
  { height: "The ground", tokens: "--cn-surface-page", who: "The page, the topbar, stat bands, static chips. Every other height is measured from it." },
  { height: "Raised, soft foot", tokens: "--cn-surface-raised, --edge, --neu-ink, --neu-raised, or --neu-raised-soft with --cn-lit-edge, or --neu-lifted with --edge-strong", who: "Panels, the selected tab, the one lead panel. A panel inside a panel takes --neu-raised-soft with the lit edge." },
  { height: "Raised, hard plate", tokens: "--hard-offset in --plate or --neu-ink, --hard-extra, or --cn-plate-tilt with --cn-lit-edge", who: "Secondary buttons, segmented options, link and button chips, accent cards. The primary stands on its own mauve plate. The one tilted panel, holding prose, upright under prefers-contrast: more on the same plate." },
  { height: "Floating", tokens: "--cn-surface-overlay, --shadow-pop, --edge-strong", who: "Popovers, menus, dialogs, drawers, toasts, tooltips." },
];

/* The height specimens share one footprint so only the depth differs. */
/* Three columns, or one under 520px. The min track is a third of the row
   over 520px and the full row under it, so auto-fit never lands on two. */
const THREE_UP =
  "display:grid;gap:var(--cn-grid-gap);grid-template-columns:repeat(auto-fit,minmax(clamp(calc((100% - 2 * var(--cn-grid-gap)) / 3 - 1px),calc((520px - 100%) * 999),100%),1fr))";
const SPEC_BOX = "width:100%;height:88px;display:grid;place-items:center;padding:12px;text-align:center";

/* A tokens cell: each token is its own unbreakable code, joined by plain
   words, so a line only breaks between tokens. */
const JOINERS = /(, or |, | or | with | in | over )/;
function Tokens({ text }: { text: string }) {
  return (
    <>
      {text.split(JOINERS).map((part, i) =>
        i % 2 ? part : /^--|\(/.test(part) ? <code class="cn-code-inline cn-nowrap" key={i}>{part}</code> : part,
      )}
    </>
  );
}


function Height({ name, cls, note, children }: { name: string; cls: string; note: string; children?: ComponentChildren }) {
  return (
    <figure class="cn-stack cn-gap-16 cn-m-0" style="align-content:start;text-align:center">
      {children}
      <figcaption class="cn-stack cn-gap-4">
        <span class="cn-name">{name}</span>
        <code class="cn-code-meta">{cls}</code>
        <span class="cn-meta">{note}</span>
      </figcaption>
    </figure>
  );
}

/* A depth specimen: a cube wearing one shadow utility. */
interface CubeProps {
  cls: string;
  bg?: string;
  label?: string;
  size?: number;
  style?: string;
}

/* A raised cube takes the raised fill, base; a carved one takes the page
   ground. Only the shadow utility differs. */
function Cube({ cls, bg = "cn-bg-raised", label, size = 128, style = "" }: CubeProps) {
  return (
    <div style="display:grid;gap:12px;justify-items:center">
      <div
        class={`${bg} cn-r-card ${cls}`}
        style={`width:${size}px;height:${size}px;${style}`}
      />
      <code class="cn-code-meta">
        {label ?? cls}
      </code>
    </div>
  );
}

export default function DepthPage() {
  return (
    <Doc
      title="Depth"
      lede="Every elevation is one of a small set of shadows, lit from one light at the top left. Height above the page separates surfaces; a hairline only cuts their edge."
    >
      <h2 class="cn-title">One model</h2>
      <Demo title="Four heights and the foot ladder, on the page" why="One light, and why no component writes its own shadow" classes="well · (the ground) · panel · cn-bg-raised cn-edge cn-hard · panel is-tilted · panel is-lead · cn-bg-overlay cn-pop">
        {/* Two groups. The first holds a carve, the ground and a plain
            panel on its soft foot. The second holds the rest of the foot
            ladder in order, the 4px plate, the 6px tilt and the 9px lead,
            then the float. The first holds three, so it keeps three
            columns until its box is under 520px and then drops to one,
            never leaving one specimen alone on a row. The second sits on
            four columns and folds to two. */}
        <div class="cn-stack cn-gap-32" style="width:100%">
          <div style={THREE_UP}>
            <Height name="Below the ground" cls=".well" note="One dark wall from the top left, the sunken fill and a quiet even ring.">
              <div class="well cn-meta" style={SPEC_BOX}>Search invoices</div>
            </Height>
            <Height name="The ground" cls="--cn-surface-page" note="Mantle and nothing else.">
              <div class="cn-meta" style={SPEC_BOX}>Invoice #1042</div>
            </Height>
            <Height name="Raised, soft foot" cls=".panel" note="The base fill, a hairline on the top and left, 3px of ink and a cast.">
              <div class="panel cn-meta" style={SPEC_BOX}>Revenue</div>
            </Height>
          </div>
          <div class="cn-grid-4">
            <Height name="Raised, hard plate" cls=".cn-hard" note="A 4px block of ink replaces the cast.">
              <div class="cn-bg-raised cn-edge cn-hard cn-r-card cn-meta" style={SPEC_BOX}>Export</div>
            </Height>
            <Height name="The 6px plate, tipped" cls=".is-tilted" note="The one tilted aside, turned 1.2deg with its text.">
              <div class="panel is-tilted cn-meta" style={SPEC_BOX}>This month</div>
            </Height>
            <Height name="The lead's 9px foot" cls=".is-lead" note="A resting panel on the deepest foot.">
              <div class="panel is-lead cn-meta" style={SPEC_BOX}>Invoices</div>
            </Height>
            <Height name="Floating" cls=".cn-pop" note="The overlay fill, no contact edge, the pop shadow.">
              <div class="cn-bg-overlay cn-pop cn-r-card cn-meta" style={`${SPEC_BOX};border:1px solid var(--edge-strong)`}>Invoice sent</div>
            </Height>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Every depth on the page is one of four heights: below the ground,
        the ground, raised and floating, under the one light. A raised
        surface stands on one of two feet. A soft foot means a panel
        resting on the page, and a hard plate means a clickable, an accent
        card or the one tilted aside. The foot ladder sets how tall it
        stands, counted in full ink under the bottom edge: panel 3px,
        plate 4px, tilt 6px, lead 9px. The ink is capped near 1.14:1 on
        the page, so at 1x the ladder reads as three sizes: short, 6px and
        9px. The panel and the plate share the short one and differ by
        kind, soft with a cast or hard with none. The lead panel and the
        tilted panel are steps on the ladder, so neither is a height of
        its own. No static label is raised: a chip on a span is a flat outlined
        label. The avatar is the one small static thing on the soft raise.
      </p>

      <p class="cn-copy">
        The light source never moves. The dark shadow falls bottom right. A
        raised surface marks its lit side with a 1px top edge. A carve is
        darkness only: one dark wall from the top left, and nothing on its
        bottom and right walls, because a light line there reads as a
        bevel. No component
        composes its own{" "}
        <code class="cn-code-inline">box-shadow</code>; it picks one of the tokens
        on this page. The page is{" "}
        <code class="cn-code-inline">--cn-surface-page</code>, mantle, and
        raised and plated surfaces take{" "}
        <code class="cn-code-inline">--cn-surface-raised</code>, base, one fill
        step above it, close enough that the shadows still read. A panel
        shows its height with three signals: that fill step, the hairline
        on its top and left, and the dark foot on its bottom and right,
        never a fill lighter than base. Only
        overlays, which float free of the page, take a lighter step.
      </p>

      <Demo title="Heights, lowest first" why="Hairlines, the lit edge and the fixed light">
        <div style="width:100%">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Height</th>
                <th scope="col">Tokens</th>
                <th scope="col">Who</th>
              </tr>
            </thead>
            <tbody>
              {HEIGHTS.map((h) => (
                <tr key={h.height}>
                  <td class="cell-name"><strong>{h.height}</strong></td>
                  <td data-label="Tokens"><Tokens text={h.tokens} /></td>
                  <td data-label="Who">{h.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <p class="cn-copy">
        A raised or floating surface keeps a hairline,{" "}
        <code class="cn-code-inline">--edge</code> or{" "}
        <code class="cn-code-inline">--edge-strong</code>. It is the
        surface's cut edge, not a border standing in for depth. A panel
        draws it on its top and left only; its right and bottom border
        sides are <code class="cn-code-inline">--neu-ink</code> and belong
        to the foot. Carved surfaces have no lip. A resting field takes{" "}
        <code class="cn-code-inline">--cn-field-ring</code>, a quiet even
        hairline of surface-2 at 85%. The tabs carve and a disabled field
        take the quieter{" "}
        <code class="cn-code-inline">--cn-carve-ring</code>, surface-1. Both
        are the same on all four sides. A well's{" "}
        <code class="cn-code-inline">--cn-well-ring</code> is the quietest
        of the three, surface-0 at 1.5:1 on the well's crust fill, since
        the sunken fill alone is 1.07:1 under the page.{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> closes all three
        into a full even ring, and a hovered field closes its ring in{" "}
        <code class="cn-code-inline">--control-edge</code>. An engaged state is
        carved too, with an{" "}
        <code class="cn-code-inline">--engaged-edge</code> rim.
      </p>

      <p class="cn-copy">
        A raised surface also carries{" "}
        <code class="cn-code-inline">--cn-lit-edge</code>, a 1px line of
        surface-2 at 45% inside its top rim where the light catches it. It is the only light-side cue on a raised surface, and
        the last layer of{" "}
        <code class="cn-code-inline">--neu-raised</code> and the default{" "}
        <code class="cn-code-inline">--hard-extra</code> of every plated recipe:
        the secondary button, segmented options and the accent card. The
        primary replaces it with its own white rim. The lead panel keeps the
        same lit edge: bright lines are never a depth cue, so{" "}
        <code class="cn-code-inline">--neu-lifted</code> ranks it by darkness
        instead.
      </p>

      <p class="cn-copy">
        The light is physical, not logical. Every shadow, plate, carve and fill
        ramp answers the one light at the top left, so in a right-to-left
        page a plate still falls down and to the right. Layout mirrors under{" "}
        <code class="cn-code-inline">dir="rtl"</code>; the light does not.
      </p>

      <Demo title='The same plates under dir="rtl"' classes='dir="rtl" · btn btn-secondary · panel'>
        <div dir="rtl" class="cn-row cn-gap-24 cn-wrap">
          <button type="button" class="btn btn-secondary">حفظ</button>
          <div class="panel panel-body">
            <span class="cn-meta">الفواتير المفتوحة: 12</span>
          </div>
        </div>
      </Demo>

      <h2 class="cn-title">The shadows</h2>

      <Demo
        title="Four of the five neu shadows"
        classes="cn-bg-raised cn-r-card cn-raised | cn-raised-soft | cn-bg-page cn-inset | cn-inset-soft"
        why="How the shadow ink and each layer were chosen"
        row
      >
        <Cube cls="cn-raised" />
        <div style="display:grid;gap:12px;justify-items:center">
          <span class="avatar" aria-hidden="true">AK</span>
          <code class="cn-code-meta">
            cn-raised-soft
          </code>
        </div>
        <Cube cls="cn-inset" bg="cn-bg-page" />
        <div style="display:grid;gap:12px;justify-items:center">
          <span style="display:flex;gap:10px;align-items:center">
            <input class="checkbox" type="checkbox" aria-label="inset-soft specimen" />
            <span class="stepper">
              <span>Draft</span>
            </span>
          </span>
          <code class="cn-code-meta">
            cn-inset-soft
          </code>
        </div>
      </Demo>

      <p class="cn-copy">
        Two directions, two strengths. <code class="cn-code-inline">cn-raised</code>{" "}
        lifts a surface off the page; <code class="cn-code-inline">cn-inset</code>{" "}
        presses one into it. Each has a soft partner with smaller offset and
        blur at reduced strength. Panels and cards take the regular shadows;
        avatars, the selected tab, nested panels and held states take the
        soft ones, which is why the soft pair is shown on an avatar and a
        checkbox: on a 128px cube
        it is nearly the strong pair, and the specimen would argue against
        the token it documents.
      </p>

      <p class="cn-copy">
        A shadow has to be darker than the darkest surface it falls on. A
        panel's shadow falls on the mantle page, and crust is barely darker
        than mantle. So the shadows use crust taken halfway to black,{" "}
        <code class="cn-code-inline">rgb(8 8 14)</code>:{" "}
        <code class="cn-code-inline">--neu-shade</code> at .72 for the cast,{" "}
        <code class="cn-code-inline">--neu-contact</code>, the full ink,
        for a 2px edge where the surface meets the
        ground, <code class="cn-code-inline">--neu-near</code> at .8 for a
        3px 4px 6px shadow that lays a 4 to 6px dark foot along the
        bottom and right edges, and <code class="cn-code-inline">--neu-dark</code> at
        .8 for a carve's dark wall, because a well's wall falls on whatever
        holds it.
        The raised token draws the foot as one shape, contact, near shadow
        and cast, under the lit top edge. <code class="cn-code-inline">--neu-lifted</code>, for
        the one lead panel, spends its extra darkness on the bottom and
        right only: a 6px 8px contact in the full ink, an 8px 14px 16px near
        shadow and an 18px 28px 48px cast. Even black is close to the
        page, so a longer cast barely shows; the fill step separates the
        panel and the deeper foot ranks it. A panel's right and bottom
        border sides are the same ink, so they are the last 1px of its
        foot on the ladder. The utilities table has the ink's
        ratios. Compact density drops the
        plate to 2px and the plain contact to 1px, so a plain panel stays
        under a plated control. Nothing darkens or brightens a panel's top and left, because a dark line all
        round reads as a heavier outline, not as height, and a bright one as a bevel. The soft raise
        keeps contact and a short cast, so every raise answers the light
        the same way: no raise draws a top-left highlight outside its edge.
        A carve's wall is one layer,{" "}
        <code class="cn-code-inline">--neu-dark</code> at 3px 3px 8px, or
        crust halfway to black at .5 and 2px 2px 5px for the soft carve.{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> deepens the
        cast to .86, the carve to .88 and the near shadow to .9, and stands
        the tilted panel upright on its 6px plate, since rotated text
        renders soft.
      </p>

      <CodeBlock
        title="The neu tokens (tokens.css)"
        code={`/* The shadow base: crust taken halfway to black */
--neu-shade:   rgb(8 8 14 / .72);   /* the cast */
--neu-ink:     rgb(8 8 14);         /* the default plate */
--neu-contact: var(--neu-ink);      /* the hard edge where a surface meets the ground */
--neu-near:    rgb(8 8 14 / .8);    /* the dark foot just past the contact */
--neu-dark:    rgb(8 8 14 / .8);    /* a carve's dark wall */

--neu-raised:      2px 2px 0 var(--neu-contact), 3px 4px 6px var(--neu-near), 10px 12px 24px var(--neu-shade), var(--cn-lit-edge);
--neu-lifted:      6px 8px 0 var(--neu-contact), 8px 14px 16px var(--neu-near), 18px 28px 48px var(--neu-shade), var(--cn-lit-edge);
--neu-raised-soft: 1px 1px 0 var(--neu-contact), 3px 4px 9px rgb(8 8 14 / .5);
--neu-inset:       inset 3px 3px 8px var(--neu-dark);
--neu-inset-soft:  inset 2px 2px 5px rgb(8 8 14 / .5);

/* The lit top rim of a raised surface */
--cn-lit-edge: inset 0 1px color-mix(in srgb, var(--surface-2) 45%, transparent);

/* Overlays: a long cast and a tighter one on the same base */
--shadow-pop: 0 24px 70px rgb(8 8 14 / .8), 0 8px 24px rgb(8 8 14 / .45);`}
      />

      <Demo
        title="Raised surface"
        classes="cn-bg-raised cn-r-panel cn-raised"
      >
        <div
          class="cn-bg-raised cn-r-panel cn-raised"
          style="padding:24px;max-width:420px;display:grid;gap:8px"
        >
          <span class="cn-label">Team activity</span>
          <span class="cn-value">1,284</span>
          <span class="cn-meta">messages this week · 12 members</span>
        </div>
      </Demo>

      <Demo title="A panel inside a panel" why="Why the inner panel takes the soft raise" classes="panel > panel  (the inner one takes --neu-raised-soft and the lit edge)">
        <div class="panel" style="max-width:520px;width:100%">
          <header class="panel-header">
            <h2>Billing</h2>
          </header>
          <div class="panel-body cn-stack cn-gap-16">
            <span class="cn-copy">Pro plan, billed monthly to the workspace owner.</span>
            <div class="panel panel-body cn-stack cn-gap-4">
              <span class="cn-label">Next invoice</span>
              <span class="cn-value">$1,240</span>
              <span class="cn-meta">Due Sep 1 · Visa ending 4242</span>
            </div>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        A panel inside a panel rests on its parent, so{" "}
        <code class="cn-code-inline">.panel .panel</code> swaps in{" "}
        <code class="cn-code-inline">--neu-raised-soft</code> and keeps the
        lit edge, which with the hairline shows where it ends on a fill that
        matches its parent's. The full cast
        would claim a height the inner panel does not have. Raised is a rank,
        so a region holds at most three raised panels; the{" "}
        <a href="/layout">Layout</a> page has the rule.
      </p>

      <Demo title="Promoted shadows" classes="cn-pop | cn-cast | cn-mark-drop" why="What each promoted shadow is for">
        <div
          class="cn-bg-page cn-cast cn-r-control"
          style="height:54px;display:flex;align-items:center;gap:14px;padding:0 18px"
        >
          <span class="cn-label">Dashboard</span>
          <span class="cn-meta">Last synced 2 min ago</span>
        </div>
        <div style="display:flex;flex-wrap:wrap;gap:28px;align-items:center">
          <div
            class="cn-bg-overlay cn-r-card cn-pop"
            style="padding:16px 20px;display:grid;gap:6px;border:1px solid var(--edge-strong)"
          >
            <span class="cn-name">Invoice sent</span>
            <span class="cn-meta">#2041 · acme.co · just now</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="mark">B</span>
            <span class="mark" style="--accent:#94e2d5">
              7
            </span>
            <span class="cn-meta">mark · cn-mark-drop</span>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">cn-pop</code> is the float for overlays:
        popovers, modals, drawers, toasts. It is two layers on the same{" "}
        <code class="cn-code-inline">rgb(8 8 14)</code> base, a long cast and a
        tighter one, so a float reads at 1x. Pair it with{" "}
        <code class="cn-code-inline">cn-bg-overlay</code> and an{" "}
        <code class="cn-code-inline">--edge-strong</code> hairline. Never combine it with neu
        shadows; an overlay is above the surface, not carved from it.{" "}
        <code class="cn-code-inline">cn-cast</code> is the topbar's downward cast plus
        its lit hairline. <code class="cn-code-inline">cn-mark-drop</code> is the
        mini-drop under small solid marks; the{" "}
        <code class="cn-code-inline">mark</code> recipe carries it already.
      </p>

      <Demo
        title="The hard offset family"
        classes="cn-hard-sm | cn-hard | cn-hard-lg"
        why="How the plate is drawn and re-keyed"
        row
      >
        <Cube cls="cn-hard-sm cn-edge" label="cn-hard-sm" />
        <Cube cls="cn-hard cn-edge" label="cn-hard" />
        <Cube cls="cn-hard-lg cn-edge" label="cn-hard-lg" />
        <Cube
          cls="cn-hard cn-edge"
          label="--plate"
          style="--plate:#cba6f7"
        />
      </Demo>

      <p class="cn-copy">
        The hard offset is a solid, blur-free shadow, stacked in steps of
        about 1px out to its offset so the corners join into the side of a
        block. It is available to any
        clickable control and the default on primary and secondary buttons. It
        reads <code class="cn-code-inline">--plate</code>, the shadow ink by default, so a
        control can re-key it inline.{" "}
        <code class="cn-code-inline">cn-hard-lg</code> is a fixed 10px offset.
        The tilted hero card takes its own 6px plate,{" "}
        <code class="cn-code-inline">--cn-plate-tilt</code>, under{" "}
        <code class="cn-code-inline">--cn-lit-edge</code> and with no raised
        shadow, so it answers the light as a hard block without outweighing
        the data beside it.{" "}
        <code class="cn-code-inline">cn-hard-sm</code> is a fixed 3px offset for small
        pieces.
      </p>

      <Demo
        title="Press these"
        classes="cn-pressable | cn-hard cn-pressable-slide | cn-engaged"
        why="Two presses and the engaged state"
        row
      >
        <button
          type="button"
          class="btn cn-bg-raised cn-text-text cn-edge cn-raised-soft cn-pressable"
        >
          Save changes
        </button>
        <button
          type="button"
          class="btn cn-bg-raised cn-text-text cn-edge cn-hard cn-pressable-slide"
        >
          Export invoices
        </button>
        <button
          type="button"
          class="btn cn-bg-raised cn-text-text cn-edge cn-engaged"
        >
          Notifications on
        </button>
      </Demo>

      <p class="cn-copy">
        Two presses, one state. <code class="cn-code-inline">cn-pressable</code> is
        the soft-control press. It lifts 1px on hover and sinks to{" "}
        <code class="cn-code-inline">cn-inset-soft</code> while held.{" "}
        <code class="cn-code-inline">cn-pressable-slide</code> is the half-slide,
        legal only with <code class="cn-code-inline">cn-hard</code>. The control
        slides halfway onto its own offset shadow, which shrinks from 4px to
        2px to meet it. <code class="cn-code-inline">cn-engaged</code> is the
        engaged state, for a chosen or toggled option: pressed in on the mauve wash, inside an{" "}
        <code class="cn-code-inline">--engaged-edge</code> rim. The wash is
        mauve 20% into base, a step past the ghost hover, and
        the rim clears the non-text floor on it, so a chosen option outweighs the raised
        ones beside it. The rim colors a border, so give
        the element one, here <code class="cn-code-inline">cn-edge</code>.
      </p>

      <Demo
        title="Radius roles"
        classes="cn-r-panel / cn-r-card / cn-r-control / cn-r-mark / cn-r-chip / cn-r-pill / cn-r-round"
        why="Radii are named by role"
        row
      >
        {[
          ["panel", "16px"],
          ["card", "12px"],
          ["control", "8px"],
          ["mark", "8px"],
          ["chip", "4px"],
          ["pill", "999px"],
          ["round", "50%"],
        ].map(([role, value]) => (
          <div key={role} style="display:grid;gap:10px;justify-items:center">
            <div
              class={`cn-bg-base cn-raised-soft cn-r-${role}`}
              style="width:64px;height:64px"
            />
            <code class="cn-code-meta">
              cn-r-{role}
            </code>
            <span class="cn-meta">{value}</span>
          </div>
        ))}
      </Demo>

      <p class="cn-copy">
        Radii are role-named; no utility takes a numeric value.{" "}
        <code class="cn-code-inline">cn-r-panel</code> reads{" "}
        <code class="cn-code-inline">--cn-radius-panel</code>, which compact density
        sets to the card radius.
      </p>

      <CodeBlock
        title="Composing depth"
        code={`<!-- A raised card: the base fill, lifted by its shadow -->
<div class="cn-bg-raised cn-r-card cn-raised">…</div>

<!-- A hard-offset control with the half-slide press -->
<button class="btn cn-bg-raised cn-edge cn-hard cn-pressable-slide">
  Export invoices
</button>

<!-- Re-key the offset per instance -->
<button class="btn cn-bg-raised cn-edge cn-hard cn-pressable-slide"
        style="--plate: #cba6f7">
  Upgrade plan
</button>`}
      />

      <details class="accordion">
        <summary>Depth utilities</summary>
        <div class="fold">
          <div>
      <Props
        rows={[
          {
            name: ".cn-raised",
            values: "var(--neu-raised)",
            notes: "Panels and cards, on --cn-surface-raised. The standard lift off the page: contact, near shadow, cast and the lit top edge.",
          },
          {
            name: ".cn-raised-soft",
            values: "var(--neu-raised-soft)",
            notes: "Smaller offset and blur at reduced strength. Avatars, the selected tab, a panel inside a panel.",
          },
          {
            name: ".cn-inset",
            values: "var(--neu-inset)",
            notes: "Wells and engaged states, pressed into the ground.",
          },
          {
            name: ".cn-inset-soft",
            values: "var(--neu-inset-soft)",
            notes: "Inputs, held presses, disabled controls.",
          },
          {
            name: ".cn-pop",
            values: "var(--shadow-pop)",
            notes: "Overlays only, on --cn-surface-overlay. A long cast and a tighter one. Never combined with neu shadows.",
          },
          {
            name: ".cn-cast",
            values: "var(--shadow-cast) + lit hairline",
            notes: "The topbar's downward cast.",
          },
          {
            name: ".cn-mark-drop",
            values: "var(--shadow-mark)",
            notes: "Mini-drop for small solid marks; .mark has it built in.",
          },
          {
            name: ".cn-hard",
            values: "--cn-plate: var(--plate) at 1/4, 1/2, 3/4 and all of --hard-offset",
            notes: "The flat graphic note; any clickable control may take it. The utility draws the plate only; the plated recipes add --hard-extra over it.",
          },
          {
            name: ".cn-hard-lg",
            values: "--cn-plate-lg: var(--plate) in 1px steps to 10px",
            notes: "A fixed large offset. The tilted panel takes the 6px --cn-plate-tilt instead.",
          },
          {
            name: ".cn-hard-sm",
            values: "--cn-plate-sm: var(--plate) in 1px steps to 3px",
            notes: "A fixed small offset.",
          },
          {
            name: ".cn-flat",
            values: "box-shadow: none",
            notes:
              "Clears the shadow. Utilities sit in a later layer than recipes, so it also clears a recipe's shadow on the same element.",
          },
          {
            name: "--cn-lit-edge",
            values: "inset 0 1px, surface-2 at 45%",
            contrast: "1.5:1 on the base fill",
            notes: "The lit top rim. Part of --neu-raised, --neu-lifted and the default --hard-extra on plated recipes.",
          },
          {
            name: "--hard-extra",
            values: "shadow layers",
            default: "var(--cn-lit-edge)",
            notes: "Drawn over a recipe's plate. The primary sets its gloss here: a white rim at .3 and crust 22% along the bottom 2px.",
          },
          {
            name: "--plate",
            values: "any token or color-mix",
            default: "var(--neu-ink)",
            contrast: "Ink 1.22:1 under base, 1.14:1 under the page · crust 1.14:1 under base, 1.07:1 under the page",
            notes: "Contract prop read by the whole hard family. Unset, the plate is the shadow ink, crust halfway to black, which is also a panel's contact edge and its right and bottom border sides.",
          },
          {
            name: "--hard-offset",
            values: "length",
            default: "4px",
            notes: "3px at cozy density, 2px at compact. The press slides half the offset.",
          },
          {
            name: ".cn-pressable",
            values: "hover -1px · active +1px and inset-soft",
            notes: "The soft-control press.",
          },
          {
            name: ".cn-pressable-slide",
            values: "hover -1,-1 · active half the offset, plate shrinks to match",
            notes: "The half-slide. Legal only with .cn-hard.",
          },
          {
            name: ".cn-engaged",
            values: "inset, the mauve wash, the --engaged-edge rim, 1px sink",
            contrast: "Wash 1.52:1 on base, past the 1.40:1 hover · rim 3.5:1 on the wash",
            notes: "The engaged state, for a chosen or toggled option. It sets border-color, so compose it on an element with a border. Under forced colors the rim draws in Highlight.",
          },
        ]}
      />
          </div>
        </div>
      </details>
    </Doc>
  );
}
