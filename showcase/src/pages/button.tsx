import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

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
      lede="One base class and four variants. Primary and secondary rest on a plate and half-slide onto it when pressed. Ghost and icon buttons sink into a soft inset."
    >
      <p class="cn-copy">
        Compose the base class with a variant: <code class="cn-code">class="btn btn-primary"</code>. Labels are
        always sans. Heights come from the density knobs, so every variant shrinks together under{" "}
        <code class="cn-code">data-density="compact"</code>.
      </p>

      <Demo title="Primary" classes="btn btn-primary" row>
        <button class="btn btn-primary">Create invoice</button>
        <button class="btn btn-primary" disabled>
          Create invoice
        </button>
      </Demo>

      <p class="cn-copy">
        One primary action per view. Its plate is mauve mixed into surface-0, the one plate that is not crust,
        and a 1px gloss sits on its top-left edge. A disabled button drops to{" "}
        <code class="cn-code">--disabled-opacity</code> (.5) and keeps its variant's rest shadow.
      </p>

      <Demo title="Secondary" classes="btn btn-secondary" row>
        <button class="btn btn-secondary">Export report</button>
        <button class="btn btn-secondary" disabled>
          Export report
        </button>
      </Demo>

      <Demo title="Ghost" classes="btn btn-ghost" row>
        <button class="btn btn-ghost">Dismiss</button>
        <button class="btn btn-ghost" disabled>
          Dismiss
        </button>
      </Demo>

      <Demo title="Ghost toggles" classes="btn btn-ghost is-sm  [aria-pressed]" row>
        <button class="btn btn-ghost is-sm" aria-pressed={muted} onClick={() => setMuted(!muted)}>
          Mute thread
        </button>
        <button class="btn btn-ghost is-sm" aria-pressed={compact} onClick={() => setCompact(!compact)}>
          Compact rows
        </button>
        <button class="btn btn-ghost is-sm" disabled>
          Pin column
        </button>
      </Demo>

      <p class="cn-copy">
        A small ghost button is the toolbar toggle. It has no chrome at rest and a surface wash on hover. With{" "}
        <code class="cn-code">aria-pressed="true"</code> or <code class="cn-code">aria-current</code> it takes the
        engaged state: pressed in, on the mauve wash, with no border.
      </p>

      <Demo title="Danger ghost" classes="btn btn-ghost is-danger" row>
        <button class="btn btn-ghost is-danger">
          <TrashIcon />
          Delete workspace
        </button>
        <button class="btn btn-ghost is-danger is-sm">Remove member</button>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.is-danger</code> turns a ghost button red and gives it a red wash on hover. Use it
        for a destructive action in a toolbar, a menu or a dialog footer. It is not a second primary.
      </p>

      <Demo title="Text" classes="btn-text" row>
        <button class="btn-text">View all members</button>
      </Demo>

      <Demo title="Icon" classes="btn is-icon" row>
        <button class="btn is-icon" aria-label="Settings">
          <GearIcon />
        </button>
        <button class="btn is-icon cn-tone-blue" aria-label="Notifications">
          <BellIcon />
        </button>
        <button class="btn is-icon cn-tone-red" aria-label="Delete row">
          <TrashIcon />
        </button>
        <button class="btn is-icon" aria-label="Settings" disabled>
          <GearIcon />
        </button>
      </Demo>

      <p class="cn-copy">
        Icon buttons are square at the small control height and flat until hovered. On hover they tint toward{" "}
        <code class="cn-code">--tone</code>. Set it with a <code class="cn-code">.cn-tone-*</code> class so
        destructive and informational actions read differently. Always give them an{" "}
        <code class="cn-code">aria-label</code>.
      </p>

      <Demo title="Sizes" classes="btn is-sm · btn · btn is-lg · btn is-icon is-lg" row>
        <button class="btn btn-secondary is-sm">Small</button>
        <button class="btn btn-secondary">Default</button>
        <button class="btn btn-primary is-lg">Large</button>
        <button class="btn is-icon" aria-label="Settings"><GearIcon /></button>
        <button class="btn is-icon is-lg" aria-label="Settings"><GearIcon /></button>
      </Demo>

      <p class="cn-copy">
        Small is the toolbar height (<code class="cn-code">--control-h-sm</code>). Large is the one hero action:
        the control height plus 12px. An svg inside a button is sized by the button: 16px by default, 14px in
        small and 18px in large. Never size it by hand.
      </p>

      <Demo title="Dashed" classes="btn btn-ghost is-dashed">
        <button class="btn btn-ghost is-dashed" style="width: 100%">
          + Add team member
        </button>
      </Demo>

      <p class="cn-copy">
        The only dashed border in the system. Use it as an open slot: a drop zone, a placeholder row, an optional
        extra. On hover the border and label turn mauve.
      </p>

      <h2 class="cn-label">The half-slide</h2>
      <p class="cn-copy">
        Hard-offset controls slide instead of sinking. At rest the control casts{" "}
        <code class="cn-code">4px 4px 0</code> in <code class="cn-code">--plate</code>. Hover lifts it{" "}
        <code class="cn-code">translate(-1px, -1px)</code>, away from the plate. Active moves it{" "}
        <code class="cn-code">translate(2px, 2px)</code> while the plate shrinks to{" "}
        <code class="cn-code">2px 2px 0</code> to meet it. The control covers half the distance and the plate
        covers the rest.
      </p>

      <Demo
        title="Composed on a custom element"
        classes="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-base"
        row
      >
        <button
          class="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-base cn-text-text cn-ui cn-row cn-gap-8 cn-px-16 cn-py-12"
          style="cursor: pointer"
        >
          <span class="cn-value">12</span>
          <span class="cn-label">open tickets</span>
        </button>
      </Demo>

      <p class="cn-copy">
        Any clickable element can take the press. Compose <code class="cn-code">.cn-hard</code> for the plate with{" "}
        <code class="cn-code">.cn-pressable-slide</code> for the motion. Use the slide only with the hard offset.
        Soft-shadowed controls use <code class="cn-code">.cn-pressable</code>, which sinks to an inset instead.
      </p>

      <CodeBlock
        title="Markup"
        code={`<button class="btn btn-primary">Create invoice</button>
<button class="btn btn-secondary">Export report</button>
<button class="btn btn-ghost is-sm" aria-pressed="true">Compact rows</button>
<button class="btn btn-ghost is-danger">Delete workspace</button>
<button class="btn is-icon cn-tone-red" aria-label="Delete row">…svg…</button>
<button class="btn btn-ghost is-dashed">+ Add team member</button>

<!-- the half-slide on a custom element -->
<button class="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-base">
  12 open tickets
</button>`}
      />

      <Props
        title="Variants and knobs"
        rows={[
          { name: ".btn", values: "base class", notes: "Height --control-h, the control radius (8px), sans 700 13px. Compose with one variant." },
          { name: ".btn-primary", notes: "Solid mauve, crust text, mauve-mix plate and a 1px gloss. One per view." },
          { name: ".btn-secondary", notes: "Base ground, hairline edge, crust plate. The default for clickables." },
          { name: ".btn-ghost", values: '[aria-pressed="true"] / [aria-current]', notes: "Transparent until hovered. Toggled or current, it takes the engaged state." },
          { name: ".btn-ghost.is-danger", notes: "Red label, red wash on hover. Destructive actions." },
          { name: ".btn-ghost.is-dashed", notes: "The only dashed border. An open slot; mauve on hover." },
          { name: ".btn.is-icon", values: ".cn-tone-* · .is-lg", notes: "Square at --control-h-sm (34px), or --control-h in large. Tints toward --tone on hover. Needs aria-label." },
          { name: ".btn-text", notes: "Inline mauve text button; pink on hover." },
          { name: ".is-sm / .is-lg", values: "on .btn", notes: "Toolbar height with 12px type, or the hero action at --control-h + 12px with 14px type." },
          { name: "svg", values: "inside any button", notes: "Sized by the button: 16px, 14 in small, 18 in large, 20 in a large icon button, 13 in text." },
          { name: ":disabled", notes: "--disabled-opacity (.5) and a not-allowed cursor. Keeps the variant's rest shadow." },
          { name: "--plate", default: "var(--crust)", notes: "The plate's color, read by the secondary button, segmented options and .cn-hard." },
          { name: "--control-h", default: "46px", notes: '28px under data-density="compact".' },
        ]}
      />
    </Doc>
  );
}
