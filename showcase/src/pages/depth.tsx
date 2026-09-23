import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* A depth specimen: a base-ground cube wearing one shadow utility. */
interface CubeProps {
  cls: string;
  label?: string;
  size?: number;
  style?: string;
}

function Cube({ cls, label, size = 96, style = "" }: CubeProps) {
  return (
    <div style="display:grid;gap:12px;justify-items:center">
      <div
        class={`cn-bg-base cn-r-card ${cls}`}
        style={`width:${size}px;height:${size}px;${style}`}
      />
      <code class="cn-code cn-text-overlay-2" style="font-size:11px">
        {label ?? cls}
      </code>
    </div>
  );
}

export default function DepthPage() {
  return (
    <Doc
      title="Depth"
      lede="Every elevation is one of a small set of shadows, all lit from a single top-left light source. Depth, not borders, separates surfaces."
    >
      <p class="cn-copy">
        The light source never moves. The dark shadow falls bottom-right, the
        lift highlight comes from the top-left. No component composes its own{" "}
        <code class="cn-code">box-shadow</code>; it picks one of the utilities
        below. Neumorphic depth only reads when a surface shares its background
        with the page, so every specimen here sits directly on{" "}
        <code class="cn-code">--base</code>.
      </p>

      <Demo
        title="The four elevations"
        classes="cn-bg-base cn-r-card cn-raised | cn-raised-soft | cn-inset | cn-inset-soft"
        row
      >
        <Cube cls="cn-raised" />
        <div style="display:grid;gap:12px;justify-items:center">
          <span class="chip">v2.4.1</span>
          <code class="cn-code cn-text-overlay-2" style="font-size:11px">
            cn-raised-soft
          </code>
        </div>
        <Cube cls="cn-inset" />
        <div style="display:grid;gap:12px;justify-items:center">
          <span style="display:flex;gap:10px;align-items:center">
            <input class="checkbox" type="checkbox" aria-label="inset-soft specimen" />
            <span class="stepper">
              <span>Draft</span>
            </span>
          </span>
          <code class="cn-code cn-text-overlay-2" style="font-size:11px">
            cn-inset-soft
          </code>
        </div>
      </Demo>

      <p class="cn-copy">
        Two directions, two strengths. <code class="cn-code">cn-raised</code>{" "}
        lifts a surface off the page; <code class="cn-code">cn-inset</code>{" "}
        presses one into it. Each has a soft partner with smaller offset and
        blur at reduced strength. Panels and cards take the regular shadows;
        chips, small controls, and held states take the soft ones, which is
        why the soft pair is shown on a chip and a checkbox: on a 96px cube
        it is nearly the strong pair, and the specimen would argue against
        the token it documents.
      </p>

      <Demo
        title="Raised surface"
        classes="cn-bg-base cn-r-panel cn-raised"
      >
        <div
          class="cn-bg-base cn-r-panel cn-raised"
          style="padding:24px;max-width:420px;display:grid;gap:8px"
        >
          <span class="cn-label">Team activity</span>
          <span class="cn-value">1,284</span>
          <span class="cn-meta">messages this week · 12 members</span>
        </div>
      </Demo>

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
            class="cn-bg-base cn-edge cn-r-card cn-pop"
            style="padding:16px 20px;display:grid;gap:6px"
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
        <code class="cn-code">cn-pop</code> is the float for overlays:
        popovers, modals, drawers, toasts. Never combine it with neu shadows;
        an overlay is above the surface, not carved from it.{" "}
        <code class="cn-code">cn-cast</code> is the topbar's downward cast plus
        its lit hairline. <code class="cn-code">cn-mark-drop</code> is the
        mini-drop under small solid marks; the{" "}
        <code class="cn-code">mark</code> recipe carries it already.
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
        reads <code class="cn-code">--plate</code>, crust by default, so a
        control can re-key it inline.{" "}
        <code class="cn-code">cn-hard-lg</code> belongs to the tilted hero
        card, which layers it over <code class="cn-code">--neu-raised</code>{" "}
        so the hero still answers the light.{" "}
        <code class="cn-code">cn-hard-sm</code> is a fixed 3px offset for small
        pieces.
      </p>

      <Demo
        title="Press these"
        classes="cn-pressable | cn-hard cn-pressable-slide | cn-engaged"
        row
      >
        <button
          type="button"
          class="btn cn-bg-base cn-text-text cn-edge cn-raised-soft cn-pressable"
        >
          Save changes
        </button>
        <button
          type="button"
          class="btn cn-bg-base cn-text-text cn-edge cn-hard cn-pressable-slide"
        >
          Export invoices
        </button>
        <button
          type="button"
          class="btn cn-bg-base cn-text-text cn-edge cn-engaged"
        >
          Notifications on
        </button>
      </Demo>

      <p class="cn-copy">
        Two presses, one state. <code class="cn-code">cn-pressable</code> is
        the soft-control press. It lifts 1px on hover and sinks to{" "}
        <code class="cn-code">cn-inset-soft</code> while held.{" "}
        <code class="cn-code">cn-pressable-slide</code> is the half-slide,
        legal only with <code class="cn-code">cn-hard</code>. The control
        slides halfway onto its own offset shadow, which shrinks from 4px to
        2px to meet it. <code class="cn-code">cn-engaged</code> is the
        selected state, pressed in, mauve-tinted, and borderless.
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
            <code class="cn-code cn-text-overlay-2" style="font-size:11px">
              cn-r-{role}
            </code>
            <span class="cn-meta">{value}</span>
          </div>
        ))}
      </Demo>

      <p class="cn-copy">
        Radii are role-named; no utility takes a numeric value.{" "}
        <code class="cn-code">cn-r-panel</code> reads{" "}
        <code class="cn-code">--cn-radius-panel</code>, which compact density
        sets to the card radius.
      </p>

      <CodeBlock
        title="Composing depth"
        code={`<!-- A raised card, carved from the page ground -->
<div class="cn-bg-base cn-r-card cn-raised">…</div>

<!-- A hard-offset control with the half-slide press -->
<button class="btn cn-bg-base cn-edge cn-hard cn-pressable-slide">
  Export invoices
</button>

<!-- Re-key the offset per instance -->
<button class="btn cn-bg-base cn-edge cn-hard cn-pressable-slide"
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
            notes: "Panels and cards. The standard lift off the page.",
          },
          {
            name: ".cn-raised-soft",
            values: "var(--neu-raised-soft)",
            notes: "Smaller offset and blur at reduced strength. Chips, small controls.",
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
            notes: "Overlays only. Never combined with neu shadows.",
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
            notes: "The flat graphic note; any clickable control may take it.",
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
              "Opt out for utility-composed shadows. Cannot override a recipe shadow: the recipes layer wins. Softening a recipe needs an unlayered consumer rule.",
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
            notes: "2px under compact density. The press slides half the offset.",
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
            values: "inset, the mauve wash, 1px sink",
            notes: "Selected/toggled state; borderless by design.",
          },
        ]}
      />
    </Doc>
  );
}
