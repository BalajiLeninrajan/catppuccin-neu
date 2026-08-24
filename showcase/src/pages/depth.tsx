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
      <code class="cn-code cn-text-overlay-1" style="font-size:11px">
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
        <Cube cls="cn-raised-soft" />
        <Cube cls="cn-inset" />
        <Cube cls="cn-inset-soft" />
      </Demo>

      <p class="cn-copy">
        Two directions, two strengths. <code class="cn-code">cn-raised</code>{" "}
        lifts a surface off the page; <code class="cn-code">cn-inset</code>{" "}
        presses one into it. Each has a soft partner at roughly half the
        offset, blur, and strength. Panels and cards take the regular shadows;
        chips, small controls, and held states take the soft ones.
      </p>

      <Demo
        title="Raised with a lit edge"
        classes="cn-bg-base cn-r-panel cn-raised-lit"
      >
        <div
          class="cn-bg-base cn-r-panel cn-raised-lit"
          style="padding:22px 24px;max-width:420px;display:grid;gap:10px"
        >
          <span class="cn-label">Team activity</span>
          <span class="cn-value">1,284</span>
          <span class="cn-meta">messages this week · 12 members</span>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">cn-raised-lit</code> adds a 1px inner highlight
        along the top-left edge, the side facing the light. Reserve it for
        larger surfaces like panels and hero cards; on small controls the
        extra edge reads as a border.
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
            class="cn-bg-base cn-edge cn-r-card cn-pop"
            style="padding:16px 20px;display:grid;gap:6px"
          >
            <span class="cn-name">Invoice sent</span>
            <span class="cn-meta">#2041 · acme.co · just now</span>
          </div>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="mark-solid">B</span>
            <span class="mark-solid" style="--accent:#94e2d5">
              7
            </span>
            <span class="cn-meta">mark-solid · cn-mark-drop</span>
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
        <code class="cn-code">mark-solid</code> recipe carries it already.
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
          label="--hard-offset-color"
          style="--hard-offset-color:#cba6f7"
        />
      </Demo>

      <p class="cn-copy">
        The hard offset is a solid, blur-free shadow, available to any
        clickable control and the default on primary and secondary buttons. It
        reads <code class="cn-code">--hard-offset-color</code>, crust by
        default, so a control can re-key it inline.{" "}
        <code class="cn-code">cn-hard-lg</code> belongs to the tilted hero
        card; <code class="cn-code">cn-hard-sm</code> pairs with compact
        density.
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
        style="--hard-offset-color: #cba6f7">
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
            notes: "Half the offset, blur, and strength. Chips, small controls.",
          },
          {
            name: ".cn-raised-lit",
            values: "raised + 1px top-left inner highlight",
            notes: "Larger surfaces only; the highlight faces the light.",
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
            notes: "Mini-drop for small solid marks; mark-solid has it built in.",
          },
          {
            name: ".cn-hard",
            values: "4px 4px 0 var(--hard-offset-color)",
            notes: "The flat graphic note; any clickable control may take it.",
          },
          {
            name: ".cn-hard-lg",
            values: "10px 10px 0 var(--hard-offset-color)",
            notes: "Tilted hero card.",
          },
          {
            name: ".cn-hard-sm",
            values: "3px 3px 0 var(--hard-offset-color)",
            notes: "Compact density.",
          },
          {
            name: ".cn-flat",
            values: "box-shadow: none",
            notes: "Opt out. Softens a secondary button to raised-soft, for example.",
          },
          {
            name: "--hard-offset-color",
            values: "any token color-mix",
            default: "var(--crust)",
            notes: "Contract prop read by the whole hard family.",
          },
          {
            name: ".cn-pressable",
            values: "hover −1px · active +1px + inset-soft",
            notes: "The soft-control press.",
          },
          {
            name: ".cn-pressable-slide",
            values: "hover −1,−1 · active +2,+2, shadow → 2px",
            notes: "The half-slide. Legal only with .cn-hard.",
          },
          {
            name: ".cn-engaged",
            values: "inset + mauve 7% tint + 1px sink",
            notes: "Selected/toggled state; borderless by design.",
          },
        ]}
      />
    </Doc>
  );
}
