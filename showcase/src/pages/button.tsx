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
  const [busy, setBusy] = useState<string | null>(null);

  /* Busy for 1.6s, then the label comes back. */
  function run(id: string) {
    if (busy) return;
    setBusy(id);
    setTimeout(() => setBusy(null), 1600);
  }

  return (
    <Doc
      title="Button"
      lede="One base class and four variants."
    >
      <Demo
        title="Primary, live and disabled"
        classes="btn btn-primary · btn btn-primary[disabled]"
        row
      >
        <button class="btn btn-primary">Create invoice</button>
        <button class="btn btn-primary" disabled>
          Create invoice
        </button>
      </Demo>

      <p class="cn-copy">
        Compose <code class="cn-code-inline">.btn</code> with one variant. A view has one primary.
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

      <Demo
        title="Ghost toggles"
        classes="btn btn-ghost is-sm  [aria-pressed]"
        row
      >
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
        A ghost with <code class="cn-code-inline">aria-pressed="true"</code>, <code class="cn-code-inline">aria-current</code> or <code class="cn-code-inline">aria-expanded="true"</code> takes the engaged state.
      </p>

      <Demo title="Danger ghost" classes="btn btn-ghost is-danger" row>
        <button class="btn btn-ghost is-danger">
          <TrashIcon />
          Delete workspace
        </button>
        <button class="btn btn-ghost is-danger is-sm">Remove member</button>
      </Demo>

      <Demo title="Busy" classes='btn btn-primary [aria-busy="true"]' row>
        <button
          class="btn btn-primary"
          aria-busy={busy === "save" ? "true" : undefined}
          aria-disabled={busy === "save" ? "true" : undefined}
          onClick={() => run("save")}
        >
          Save changes
        </button>
        <button
          class="btn btn-secondary"
          aria-busy={busy === "export" ? "true" : undefined}
          aria-disabled={busy === "export" ? "true" : undefined}
          onClick={() => run("export")}
        >
          Export report
        </button>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code-inline">aria-busy="true"</code> while the action runs. Pair it with <code class="cn-code-inline">aria-disabled="true"</code>, not <code class="cn-code-inline">disabled</code>, so the button keeps focus.
      </p>

      <Demo
        title="Unavailable with a reason"
        classes='btn [aria-disabled="true"] [data-tip]'
        row
      >
        <button
          class="btn btn-primary"
          aria-disabled="true"
          data-tip="Add a line item first"
          aria-describedby="tip-send"
        >
          Send invoice
        </button>
        <span id="tip-send" hidden>
          Add a line item first
        </span>
        <button
          class="btn btn-secondary"
          aria-disabled="true"
          data-tip="Connect a payment method first"
          aria-describedby="tip-upgrade"
        >
          Upgrade plan
        </button>
        <span id="tip-upgrade" hidden>
          Connect a payment method first
        </span>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">aria-disabled="true"</code> looks disabled but stays focusable, so a <code class="cn-code-inline">data-tip</code> can say why. Point <code class="cn-code-inline">aria-describedby</code> at the same words.
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
        An icon button needs an <code class="cn-code-inline">aria-label</code>.
      </p>

      <Demo title="Sizes" classes="btn is-sm · btn · btn is-lg" row>
        <button class="btn btn-secondary is-sm">Small</button>
        <button class="btn btn-secondary">Default</button>
        <button class="btn btn-primary is-lg">Large</button>
      </Demo>

      <Demo title="Icon sizes" classes="btn is-icon · btn is-icon is-lg" row>
        <button class="btn is-icon" aria-label="Settings"><GearIcon /></button>
        <button class="btn is-icon is-lg" aria-label="Settings"><GearIcon /></button>
      </Demo>

      <Demo title="Dashed" classes="btn btn-ghost is-dashed">
        <button class="btn btn-ghost is-dashed" style="width: 100%">
          + Add team member
        </button>
      </Demo>

      <CodeBlock
        title="Markup"
        code={`<button class="btn btn-primary">Create invoice</button>
<button class="btn btn-secondary">Export report</button>
<button class="btn btn-ghost is-sm" aria-pressed="true">Compact rows</button>
<button class="btn btn-ghost is-danger">Delete workspace</button>
<button class="btn is-icon cn-tone-red" aria-label="Delete row">…svg…</button>
<button class="btn btn-ghost is-dashed">+ Add team member</button>
<button class="btn btn-primary" aria-busy="true" aria-disabled="true">Save changes</button>
<button class="btn btn-secondary" aria-disabled="true"
        data-tip="Connect a payment method first" aria-describedby="upgrade-tip">Upgrade plan</button>
<span id="upgrade-tip" hidden>Connect a payment method first</span>`}
      />

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".btn", values: "base class", notes: "Compose with one variant." },
          { name: ".btn-primary", notes: "The main action. One per view." },
          { name: ".btn-secondary", notes: "The default for anything clickable." },
          { name: ".btn-ghost", values: "[aria-pressed=\"true\"] / [aria-current] / [aria-expanded=\"true\"]", notes: "No fill and no plate. Engaged when pressed, current or expanded." },
          { name: ".btn-ghost.is-danger", notes: "A destructive action." },
          { name: ".btn-ghost.is-dashed", notes: "An open slot, such as an add row." },
          { name: ".btn.is-icon", values: ".cn-tone-* · .is-lg", notes: "Square, glyph only. Needs aria-label." },
          { name: ".btn-text", notes: "Inline text button with no padding." },
          { name: ".is-sm / .is-lg", values: "on .btn", notes: "Toolbar size, and the one hero action." },
          { name: ":disabled", notes: "Dims and loses the plate. Drops focus." },
          { name: "[aria-disabled=\"true\"]", values: "on .btn", notes: "Looks disabled, stays focusable." },
          { name: "[aria-busy=\"true\"]", values: "on .btn", notes: "A spinner replaces the label. The width holds." },
          { name: "--grain", default: ".22", notes: "Grain on solid accent fills. 0 turns it off." },
          { name: "--plate", default: "var(--neu-ink)", notes: "The plate color." },
          { name: "--control-h", default: "46px", notes: "28px under data-density=\"compact\"." },
        ]}
      />
    </Doc>
  );
}
