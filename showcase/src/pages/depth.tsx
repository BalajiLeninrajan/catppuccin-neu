import type { ComponentChildren } from "preact";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* One model, lowest first. Height is distance from the ground; the light
   is above and to the top left. */
const HEIGHTS = [
  { height: "Below the ground", draws: "A carve: the dark wall top left, the lit lip bottom right. No hairline.", tokens: "--neu-inset or --neu-inset-soft, transparent or --cn-surface-sunken", who: "Fields, wells, tabs, the switch plate, stepper pills, skeletons, engaged states." },
  { height: "The ground", draws: "Nothing.", tokens: "--cn-surface-page", who: "The page. Every other height is measured from it." },
  { height: "Resting on it", draws: "The raised fill, the lit top edge, the contact edge, a soft cast.", tokens: "--cn-surface-raised, --neu-raised or --neu-raised-soft", who: "Panels, chips. A panel inside a panel takes --neu-raised-soft." },
  { height: "Resting higher", draws: "The same raised fill and lit top edge, the strong hairline, a longer cast.", tokens: "--cn-surface-raised, --neu-lifted, --edge-strong", who: "The one lead panel. It keeps the raised fill, so raised controls inside it still sit a step lighter." },
  { height: "Standing on a plate", draws: "The raised fill and lit top edge over a hard offset, the plate's side.", tokens: "--hard-offset in --plate, --hard-extra", who: "Secondary buttons, segmented options, accent cards. The primary stands on its own mauve plate." },
  { height: "Lifted off it", draws: "The plate's side grows to 10px and the card tips 1.2deg.", tokens: "a 10px plate over --neu-raised, rotate(1.2deg)", who: "The one tilted panel. Never a table or a form. Upright under prefers-contrast: more, on the same plate." },
  { height: "Floating", draws: "The overlay fill, no contact edge, the two-layer pop shadow.", tokens: "--cn-surface-overlay, --shadow-pop, --edge-strong", who: "Popovers, menus, dialogs, drawers, toasts, tooltips." },
];

/* The height specimens share one footprint so only the depth differs. */
const SPEC_BOX = "width:100%;height:88px;display:grid;place-items:center;padding:12px;text-align:center";

function Height({ name, cls, children }: { name: string; cls: string; children?: ComponentChildren }) {
  return (
    <figure class="cn-stack cn-gap-16 cn-m-0" style="align-content:start;text-align:center">
      {children}
      <figcaption class="cn-stack cn-gap-4">
        <span class="cn-name">{name}</span>
        <code class="cn-code-meta">{cls}</code>
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

/* Raised and plated cubes take the raised fill; carved ones stay on base. */
function Cube({ cls, bg = "cn-bg-raised", label, size = 96, style = "" }: CubeProps) {
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
      <p class="cn-copy">
        The light source never moves. The dark shadow falls bottom right. A
        raised surface marks its lit side with a 1px top edge, and a carve
        with a lit lip on its bottom and right inner walls. No component
        composes its own{" "}
        <code class="cn-code-inline">box-shadow</code>; it picks one of the tokens
        below. Neumorphic depth only reads when a surface sits close to the
        page color. Carved specimens here sit on{" "}
        <code class="cn-code-inline">--base</code>; raised and plated ones take{" "}
        <code class="cn-code-inline">--cn-surface-raised</code>, one step lighter at
        1.21:1, so the lift reads before the shadow does.
      </p>

      <h2 class="cn-title">One model</h2>
      <p class="cn-copy">
        Every depth on the page is a height above or below the ground, under
        the one light. Pick the height for a new surface and its fill and
        shadow follow from the row.
      </p>

      <Demo title="Heights, lowest first">
        <div style="width:100%">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Height</th>
                <th scope="col">What draws it</th>
                <th scope="col">Tokens</th>
                <th scope="col">Who</th>
              </tr>
            </thead>
            <tbody>
              {HEIGHTS.map((h) => (
                <tr key={h.height}>
                  <td class="cell-name"><strong>{h.height}</strong></td>
                  <td data-label="What draws it">{h.draws}</td>
                  <td data-label="Tokens"><code class="cn-code-inline">{h.tokens}</code></td>
                  <td data-label="Who">{h.who}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <Demo title="One specimen per height, on the page" classes="well · (the ground) · panel · cn-bg-raised cn-edge cn-hard · panel is-tilted · cn-bg-overlay cn-pop">
        <div style="width:100%;display:grid;grid-template-columns:repeat(auto-fit,minmax(104px,1fr));gap:24px 20px">
          <Height name="Below the ground" cls=".well">
            <div class="well cn-meta" style={SPEC_BOX}>Search invoices</div>
          </Height>
          <Height name="The ground" cls="--base">
            <div class="cn-meta" style={SPEC_BOX}>Invoice #1042</div>
          </Height>
          <Height name="Resting on it" cls=".panel">
            <div class="panel cn-meta" style={SPEC_BOX}>Revenue</div>
          </Height>
          <Height name="Standing on a plate" cls=".cn-hard">
            <div class="cn-bg-raised cn-edge cn-hard cn-r-card cn-meta" style={SPEC_BOX}>Export</div>
          </Height>
          <Height name="Lifted off it" cls=".is-tilted">
            <div class="panel is-tilted cn-meta" style={SPEC_BOX}>This month</div>
          </Height>
          <Height name="Floating" cls=".cn-pop">
            <div class="cn-bg-overlay cn-pop cn-r-card cn-meta" style={`${SPEC_BOX};border:1px solid var(--edge-strong)`}>Invoice sent</div>
          </Height>
        </div>
      </Demo>

      <p class="cn-copy">
        A raised or floating surface keeps a hairline,{" "}
        <code class="cn-code-inline">--edge</code> or{" "}
        <code class="cn-code-inline">--edge-strong</code>. It is the
        surface's cut edge, not a border standing in for depth. Carved
        surfaces have none: a field carries{" "}
        <code class="cn-code-inline">--cn-field-ring</code> and a well{" "}
        <code class="cn-code-inline">--cn-well-lip</code>, the lit lip on the
        bottom and right inner walls. An engaged state is carved too, with an{" "}
        <code class="cn-code-inline">--engaged-edge</code> rim.
      </p>

      <p class="cn-copy">
        A raised surface also carries{" "}
        <code class="cn-code-inline">--cn-lit-edge</code>, a 1px line of
        surface-2 at 80% inside its top rim where the light catches it. It is
        the only light-side cue on a raised surface, and the last layer of{" "}
        <code class="cn-code-inline">--neu-raised</code> and the default{" "}
        <code class="cn-code-inline">--hard-extra</code> of every plated recipe:
        the secondary button, segmented options and the accent card. The
        primary replaces it with its own white rim.
      </p>

      <p class="cn-copy">
        The light is physical, not logical. Every shadow, plate, lip and fill
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
        classes="cn-bg-raised cn-r-card cn-raised | cn-raised-soft | cn-bg-base cn-inset | cn-inset-soft"
        row
      >
        <Cube cls="cn-raised" />
        <div style="display:grid;gap:12px;justify-items:center">
          <span class="chip">v2.4.1</span>
          <code class="cn-code-meta">
            cn-raised-soft
          </code>
        </div>
        <Cube cls="cn-inset" bg="cn-bg-base" />
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
        chips, small controls, and held states take the soft ones, which is
        why the soft pair is shown on a chip and a checkbox: on a 96px cube
        it is nearly the strong pair, and the specimen would argue against
        the token it documents.
      </p>

      <p class="cn-copy">
        A shadow has to be darker than the darkest surface it falls on, and
        crust sits only 1.1:1 under base. So the shadows use crust taken
        halfway to black, <code class="cn-code-inline">rgb(8 8 14)</code>:{" "}
        <code class="cn-code-inline">--neu-shade</code> at .72 for the cast,{" "}
        <code class="cn-code-inline">--neu-contact</code> at .55 for a 1px
        edge where the surface meets the ground, and{" "}
        <code class="cn-code-inline">--neu-dark</code> at .66 for a carve's
        dark wall, because a transparent well's wall falls on the page. The
        raised token has three layers: contact, cast and the lit top edge.{" "}
        <code class="cn-code-inline">--neu-lifted</code> is the same three
        layers with a longer cast, 14px 18px 36px, for the one lead panel.{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> deepens the
        cast to .86 and the contact and carve to .8, and stands the tilted
        panel upright on its 10px plate, since rotated text renders soft.
      </p>

      <CodeBlock
        title="The neu tokens (tokens.css)"
        code={`/* The shadow base: crust taken halfway to black */
--neu-shade:   rgb(8 8 14 / .72);   /* the cast */
--neu-contact: rgb(8 8 14 / .55);   /* the 1px edge where a surface meets the ground */
--neu-dark:    rgb(8 8 14 / .66);   /* a carve's dark wall */

--neu-raised:      1px 1px 0 var(--neu-contact), 10px 12px 24px var(--neu-shade), var(--cn-lit-edge);
--neu-lifted:      1px 1px 0 var(--neu-contact), 14px 18px 36px var(--neu-shade), var(--cn-lit-edge);
--neu-raised-soft: 1px 1px 0 var(--neu-contact), 3px 4px 9px rgb(8 8 14 / .5), -2px -2px 5px rgb(69 71 90 / .16);
--neu-inset:       inset 3px 3px 7px var(--neu-dark), inset -3px -3px 7px rgb(69 71 90 / .24);
--neu-inset-soft:  inset 2px 2px 5px rgb(17 17 27 / .52), inset -2px -2px 4px rgb(69 71 90 / .18);

/* The lit top rim of a raised surface */
--cn-lit-edge: inset 0 1px color-mix(in srgb, var(--surface-2) 80%, transparent);

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

      <Demo title="A panel inside a panel" classes="panel > panel  (the inner one takes --neu-raised-soft)">
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
        <code class="cn-code-inline">--neu-raised-soft</code>. The full cast
        would claim a height the inner panel does not have. Raised is a rank,
        so a region holds at most three raised panels; the{" "}
        <a href="/layout">Layout</a> page has the rule.
      </p>

      <Demo title="Promoted shadows" classes="cn-pop | cn-cast | cn-mark-drop">
        <div
          class="cn-bg-base cn-cast cn-r-control"
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
        The hard offset is a solid, blur-free shadow, available to any
        clickable control and the default on primary and secondary buttons. It
        reads <code class="cn-code-inline">--plate</code>, crust by default, so a
        control can re-key it inline.{" "}
        <code class="cn-code-inline">cn-hard-lg</code> belongs to the tilted hero
        card, which layers it over <code class="cn-code-inline">--neu-raised</code>{" "}
        so the hero still answers the light.{" "}
        <code class="cn-code-inline">cn-hard-sm</code> is a fixed 3px offset for small
        pieces.
      </p>

      <Demo
        title="Press these"
        classes="cn-pressable | cn-hard cn-pressable-slide | cn-engaged"
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
        mauve 20% into base, 1.52:1, a step past the 1.24:1 ghost hover, and
        the rim holds 3.5:1 on it, so a chosen option outweighs the raised
        ones beside it. The rim colors a border, so give
        the element one, here <code class="cn-code-inline">cn-edge</code>.
      </p>

      <Demo
        title="Radius roles"
        classes="cn-r-panel / cn-r-card / cn-r-control / cn-r-mark / cn-r-chip / cn-r-pill / cn-r-round"
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
        code={`<!-- A raised card: the lighter fill and the lift -->
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

      <Props
        title="Depth utilities"
        rows={[
          {
            name: ".cn-raised",
            values: "var(--neu-raised)",
            notes: "Panels and cards, on --cn-surface-raised. The standard lift off the page: contact, cast and the lit top edge.",
          },
          {
            name: ".cn-raised-soft",
            values: "var(--neu-raised-soft)",
            notes: "Smaller offset and blur at reduced strength. Chips, small controls, a panel inside a panel.",
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
            values: "--hard-offset --hard-offset 0 var(--plate)",
            notes: "The flat graphic note; any clickable control may take it. The utility draws the plate only; the plated recipes add --hard-extra over it.",
          },
          {
            name: ".cn-hard-lg",
            values: "10px 10px 0 var(--plate)",
            notes: "Tilted hero card.",
          },
          {
            name: ".cn-hard-sm",
            values: "3px 3px 0 var(--plate)",
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
            values: "inset 0 1px, surface-2 at 80%",
            notes: "The lit top rim. Part of --neu-raised and the default --hard-extra on plated recipes.",
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
            default: "var(--crust)",
            notes: "Contract prop read by the whole hard family.",
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
            notes: "The engaged state, for a chosen or toggled option. It sets border-color, so compose it on an element with a border. Under forced colors the rim draws in Highlight.",
          },
        ]}
      />
    </Doc>
  );
}
