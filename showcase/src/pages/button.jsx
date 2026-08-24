import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc.jsx";

/* Small inline glyphs for the icon-button specimens. */
const GearIcon = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
    <circle cx="9" cy="9" r="2.7" />
    <path d="M9 1.6v2.5M9 13.9v2.5M1.6 9h2.5M13.9 9h2.5M3.8 3.8l1.8 1.8M12.4 12.4l1.8 1.8M14.2 3.8l-1.8 1.8M5.6 12.4l-1.8 1.8" />
  </svg>
);

const BellIcon = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 12.5V8a5 5 0 0 1 10 0v4.5l1.5 1.5h-13Z" />
    <path d="M7.5 14a1.5 1.5 0 0 0 3 0" />
  </svg>
);

const TrashIcon = () => (
  <svg viewBox="0 0 18 18" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
    <path d="M3 5h12M7 5V3.5h4V5M5 5l.8 9.5h6.4L13 5M7.5 8v4M10.5 8v4" />
  </svg>
);

export default function ButtonPage() {
  const [muted, setMuted] = useState(false);
  const [compact, setCompact] = useState(true);

  return (
    <Doc
      title="Button"
      lede="Seven button styles, one press. Clickable controls default to the hard offset shadow and the half-slide: the control rides down onto its own shadow instead of sinking into the page."
    >
      <p class="cn-copy">
        Compose the base class with a variant: <code class="cn-code">class="btn btn-primary"</code>. Labels are
        always sans; heights come from the density knobs, so every variant shrinks together under{" "}
        <code class="cn-code">data-density="compact"</code>. Hover and press the live specimens below — every state
        is driven by the shipped CSS, nothing is simulated.
      </p>

      <Demo title="Primary — solid accent, hard offset" classes="btn btn-primary" row>
        <button class="btn btn-primary">Create invoice</button>
        <button class="btn btn-primary" disabled>
          Create invoice
        </button>
      </Demo>

      <p class="cn-copy">
        One primary action per view. The offset is the one non-crust hard shadow in the system — mauve pressed into
        the surface — and softening it is a violation of the depth canon. Disabled controls drop to 35% opacity and
        a soft inset.
      </p>

      <Demo title="Secondary — the canon default for clickables" classes="btn btn-secondary" row>
        <button class="btn btn-secondary">Export report</button>
        <button class="btn btn-secondary" disabled>
          Export report
        </button>
      </Demo>

      <Demo title="Ghost — chrome-free until hovered" classes="btn btn-ghost" row>
        <button class="btn btn-ghost">Dismiss</button>
        <button class="btn btn-ghost" disabled>
          Dismiss
        </button>
      </Demo>

      <Demo title="Flat — toolbar toggle, engages in place (click to toggle)" classes="btn-flat" row>
        <button class="btn-flat" aria-pressed={muted} onClick={() => setMuted(!muted)}>
          Mute thread
        </button>
        <button class="btn-flat" aria-pressed={compact} onClick={() => setCompact(!compact)}>
          Compact rows
        </button>
        <button class="btn-flat" disabled>
          Pin column
        </button>
      </Demo>

      <p class="cn-copy">
        The flat button is the toolbar workhorse: no chrome at rest, a surface wash on hover, and the engaged
        treatment — pressed in, mauve-keyed, borderless — when <code class="cn-code">aria-pressed="true"</code> or{" "}
        <code class="cn-code">.active</code> is set.
      </p>

      <Demo title="Text — inline, no chrome" classes="btn-text" row>
        <button class="btn-text">View all members</button>
      </Demo>

      <Demo title="Icon — tints toward its --tone on hover" classes="btn-icon" row>
        <button class="btn-icon" aria-label="Settings">
          <GearIcon />
        </button>
        <button class="btn-icon cn-tone-blue" aria-label="Notifications">
          <BellIcon />
        </button>
        <button class="btn-icon cn-tone-red" aria-label="Delete row">
          <TrashIcon />
        </button>
        <button class="btn-icon" aria-label="Settings" disabled>
          <GearIcon />
        </button>
      </Demo>

      <p class="cn-copy">
        Icon buttons are flat until hovered, then tint toward <code class="cn-code">--tone</code> — set it with a{" "}
        <code class="cn-code">.cn-tone-*</code> class so destructive and informational actions read differently.
        Always give them an <code class="cn-code">aria-label</code>.
      </p>

      <Demo title="Dashed — the open slot" classes="btn-dashed">
        <button class="btn-dashed" style="width: 100%">
          + Add team member
        </button>
      </Demo>

      <p class="cn-copy">
        The dashed button is the only dashed border in the system: a low-emphasis open slot for drop zones,
        placeholder rows, and optional extras. It fills toward mauve on hover instead of sliding.
      </p>

      <h2 class="cn-label">The half-slide</h2>
      <p class="cn-copy">
        Hard-offset controls never sink — they slide. At rest the control casts{" "}
        <code class="cn-code">4px 4px 0</code> in <code class="cn-code">--hard-offset-color</code>. Hover lifts it{" "}
        <code class="cn-code">translate(-1px, -1px)</code>, away from the shadow. Active slides it{" "}
        <code class="cn-code">translate(2px, 2px)</code> — halfway onto the shadow — while the shadow shrinks to{" "}
        <code class="cn-code">2px 2px 0</code> to meet it. The control covers half the distance, the shadow covers
        the rest, and the whole move reads as a flat object being pushed onto the page.
      </p>

      <Demo
        title="Composed on a custom element — cn-hard + cn-pressable-slide"
        classes="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-base"
        row
      >
        <button
          class="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-base cn-text-text"
          style="padding: 14px 20px; cursor: pointer; font: 700 13px var(--sans); display: inline-flex; align-items: center; gap: 8px"
        >
          <span class="cn-value" style="font-size: 15px">
            12
          </span>
          <span class="cn-microlabel">open tickets</span>
        </button>
      </Demo>

      <p class="cn-copy">
        Any clickable element may take the press: compose <code class="cn-code">.cn-hard</code> (the offset) with{" "}
        <code class="cn-code">.cn-pressable-slide</code> (the motion). The slide utility is legal only alongside the
        hard offset — soft-shadowed controls use <code class="cn-code">.cn-pressable</code>, which sinks to an inset
        instead.
      </p>

      <CodeBlock
        title="Markup"
        code={`<button class="btn btn-primary">Create invoice</button>
<button class="btn btn-secondary">Export report</button>
<button class="btn-flat" aria-pressed="true">Compact rows</button>
<button class="btn-icon cn-tone-red" aria-label="Delete row">…svg…</button>

<!-- the half-slide on a custom element -->
<button class="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-base">
  12 open tickets
</button>`}
      />

      <Props
        title="Variants & knobs"
        rows={[
          { name: ".btn", values: "base class", notes: "Height var(--control-h), radius 10px, sans label. Compose with one variant." },
          { name: ".btn-primary", notes: "Solid mauve, crust text, mauve-mix hard offset. One per view." },
          { name: ".btn-secondary", notes: "Base ground, hairline edge, crust hard offset — the canon default." },
          { name: ".btn-ghost", notes: "Transparent until hovered; surface wash on hover." },
          { name: ".btn-flat", values: '.active / [aria-pressed="true"]', notes: "Toolbar toggle; engaged state presses in with the mauve wash." },
          { name: ".btn-text", notes: "Inline mauve text button; pink on hover." },
          { name: ".btn-icon", values: ".cn-tone-*", notes: "32px square; tints toward --tone on hover. Needs aria-label." },
          { name: ".btn-dashed", notes: "The only dashed border. Open slot; fills toward mauve on hover, no slide." },
          { name: ":disabled", notes: ".35 opacity, soft inset, not-allowed cursor on .btn variants." },
          { name: "--hard-offset-color", default: "var(--crust)", notes: "The hard offset's color; read by .cn-hard and the half-slide." },
          { name: "--control-h", default: "46px", notes: "30px under data-density=\"compact\"." },
        ]}
      />
    </Doc>
  );
}
