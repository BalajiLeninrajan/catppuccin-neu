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
      lede="One base class and four variants. Primary and secondary rest on a plate and half-slide onto it when pressed. Ghost and icon buttons sink into a soft inset."
    >
      <p class="cn-copy">
        Compose the base class with a variant: <code class="cn-code-inline">class="btn btn-primary"</code>. Labels are
        always sans. Heights come from the density knobs, so every variant shrinks together under{" "}
        <code class="cn-code-inline">data-density="cozy"</code> (38px) or{" "}
        <code class="cn-code-inline">data-density="compact"</code> (28px).
      </p>

      <Demo title="Primary, live and disabled" classes="btn btn-primary · btn btn-primary[disabled]" row>
        <button class="btn btn-primary">Create invoice</button>
        <button class="btn btn-primary" disabled>
          Create invoice
        </button>
      </Demo>

      <p class="cn-copy">
        One primary action per view. Its plate is mauve mixed into surface-0, the one button plate that is not crust.
        The fill is a mauve ramp lit from the top left, with film grain rising from the bottom right, and a
        white rim runs along its top edge. Set <code class="cn-code-inline">--grain: 0</code> to drop the grain.
      </p>

      <p class="cn-copy">
        A disabled primary, through <code class="cn-code-inline">disabled</code> or{" "}
        <code class="cn-code-inline">aria-disabled="true"</code>, goes flat and sinks. It loses the plate, ramp,
        grain and gloss, and takes the <code class="cn-code-inline">--cn-surface-sunken</code> fill inside a plain{" "}
        <code class="cn-code-inline">--edge</code> border, with its label in{" "}
        <code class="cn-code-inline">--cn-fg-disabled</code>, overlay-1 at 4.9:1 on that fill. It stays at full opacity. A dimmed plate reads as a
        second primary beside the live one, and a sunken slot never outshines a live secondary. A disabled
        switch, checkbox or radio drops to the same <code class="cn-code-inline">--edge</code>. A busy primary keeps its fill. Every other variant drops to{" "}
        <code class="cn-code-inline">--disabled-opacity</code> (.6) and keeps its rest shadow.
      </p>

      <Demo title="Secondary" classes="btn btn-secondary" row>
        <button class="btn btn-secondary">Export report</button>
        <button class="btn btn-secondary" disabled>
          Export report
        </button>
      </Demo>

      <p class="cn-copy">
        The secondary rests on <code class="cn-code-inline">--cn-surface-raised</code>,
        one step lighter than the page, with a hairline and the crust plate.
        Hover warms the border toward mauve and lifts the fill to{" "}
        <code class="cn-code-inline">--cn-surface-overlay</code>. The resting
        hairline is decoration: the label identifies the button, so the edge
        does not need 3:1. Warmed on hover it is 4.1:1 on base and 3.2:1 on
        the overlay fill it lifts to.
      </p>

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
        A small ghost button is the toolbar toggle. It has no chrome at rest.
        On hover it takes <code class="cn-code-inline">--hover</code> and an{" "}
        <code class="cn-code-inline">--edge</code> hairline, so its bounds show
        before the click. With{" "}
        <code class="cn-code-inline">aria-pressed="true"</code>, <code class="cn-code-inline">aria-current</code> or{" "}
        <code class="cn-code-inline">aria-expanded="true"</code> (a trigger whose{" "}
        <a href="/menu">menu</a> is open) it takes the engaged state: pressed in on the
        mauve wash, inside an <code class="cn-code-inline">--engaged-edge</code> rim. The wash is mauve 20% into
        base, 1.52:1, a step past the 1.24:1 hover, so the fill and the rim both tell a toggled button from a
        hovered one.
        An engaged ghost keeps its wash and rim under the pointer, so hovering
        a toggled button never makes it look untoggled.
      </p>

      <Demo title="Danger ghost" classes="btn btn-ghost is-danger" row>
        <button class="btn btn-ghost is-danger">
          <TrashIcon />
          Delete workspace
        </button>
        <button class="btn btn-ghost is-danger is-sm">Remove member</button>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.is-danger</code> turns a ghost button red and gives it a red wash on hover. Use it
        for a destructive action in a toolbar, a menu or a dialog footer. It is not a second primary.
      </p>

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
        Set <code class="cn-code-inline">aria-busy="true"</code> while the action runs. The label goes clear so the
        button keeps its width, a spinner turns in its place, and clicks stop. The button stays focusable and
        keeps its name, so a screen reader still knows what is running. Pair it with{" "}
        <code class="cn-code-inline">aria-disabled="true"</code>, not <code class="cn-code-inline">disabled</code>, which would
        drop focus mid-action. Click either button to see it.
      </p>

      <Demo title="Unavailable with a reason" classes='btn [aria-disabled="true"] [data-tip]' row>
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
        <code class="cn-code-inline">aria-disabled="true"</code> looks the same as{" "}
        <code class="cn-code-inline">disabled</code> but the button stays focusable, so a{" "}
        <code class="cn-code-inline">data-tip</code> on it can say why the action is unavailable. The bubble stays out
        of the accessible name, so point <code class="cn-code-inline">aria-describedby</code> at the same words. Your
        click handler ignores it. Use <code class="cn-code-inline">disabled</code> when there is nothing to explain.
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
        <code class="cn-code-inline">--tone</code>. Set it with a <code class="cn-code-inline">.cn-tone-*</code> class so
        destructive and informational actions read differently. Always give them an{" "}
        <code class="cn-code-inline">aria-label</code>.
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

      <p class="cn-copy">
        Small is the toolbar height (<code class="cn-code-inline">--control-h-sm</code>) with 13px type. Large is the
        one hero action: the control height plus 12px, with 16px type. A view holds at most one{" "}
        <code class="cn-code-inline">.is-lg</code>, so the large icon button gets its own specimen. An svg inside a
        button is sized by the button: 16px by default, 14px in small, 18px in large and 20px in a large icon
        button. Never size it by hand.
      </p>

      <Demo title="Dashed" classes="btn btn-ghost is-dashed">
        <button class="btn btn-ghost is-dashed" style="width: 100%">
          + Add team member
        </button>
      </Demo>

      <p class="cn-copy">
        The one control with a dashed border. Use it as an open slot: a drop zone, a placeholder row, an
        optional extra. On hover the border and label turn mauve. Dashed means an open slot and nothing else, so
        disabled controls never take it: the sunken primary, disabled checkboxes and radios, and the disabled
        switch drop to a plain <code class="cn-code-inline">--edge</code>.
      </p>

      <h2 class="cn-label">The half-slide</h2>
      <p class="cn-copy">
        Hard-offset controls slide instead of sinking. At rest the control casts{" "}
        <code class="cn-code-inline">4px 4px 0</code> in <code class="cn-code-inline">--plate</code>. Hover lifts it{" "}
        <code class="cn-code-inline">translate(-1px, -1px)</code>, away from the plate. Active moves it{" "}
        <code class="cn-code-inline">translate(2px, 2px)</code> while the plate shrinks to{" "}
        <code class="cn-code-inline">2px 2px 0</code> to meet it. The control covers half the distance and the plate
        covers the rest.
      </p>

      <Demo
        title="Composed on a custom element"
        classes="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-raised"
        row
      >
        <button
          class="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-raised cn-text-text cn-ui cn-row cn-gap-8 cn-px-16 cn-py-12"
          style="cursor: pointer"
        >
          <span class="cn-value">12</span>
          <span class="cn-label">open tickets</span>
        </button>
      </Demo>

      <p class="cn-copy">
        Any clickable element can take the press. Compose <code class="cn-code-inline">.cn-hard</code> for the plate with{" "}
        <code class="cn-code-inline">.cn-pressable-slide</code> for the motion. Use the slide only with the hard offset.
        Soft-shadowed controls use <code class="cn-code-inline">.cn-pressable</code>, which sinks to an inset instead.
      </p>

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
<span id="upgrade-tip" hidden>Connect a payment method first</span>

<!-- the half-slide on a custom element -->
<button class="cn-hard cn-pressable-slide cn-edge cn-r-control cn-bg-raised">
  12 open tickets
</button>`}
      />

      <Props
        title="Variants and knobs"
        rows={[
          { name: ".btn", values: "base class", notes: "Height --control-h, 16px inline padding, the control radius (8px), sans 600 14px. Compose with one variant." },
          { name: ".btn-primary", notes: "Mauve ramp under grain, crust text, mauve-mix plate and a white top rim. Hover moves the ramp to pink. Disabled, it sinks: --cn-surface-sunken inside a plain --edge, --cn-fg-disabled label, no plate, ramp, grain, gloss or dimming. One per view." },
          { name: ".btn-secondary", notes: "--cn-surface-raised fill, --edge hairline, crust plate. Hover warms the border to mauve at --cn-step-strong and lifts the fill to --cn-surface-overlay. The default for clickables." },
          { name: ".btn-ghost", values: '[aria-pressed="true"] / [aria-current] / [aria-expanded="true"]', notes: "Transparent until hovered, then --hover and an --edge hairline. Toggled, current or holding an open menu, it takes the engaged state: --wash, --neu-inset and the --engaged-edge rim, which hover leaves in place." },
          { name: ".btn-ghost.is-danger", notes: "Red label, red wash on hover. Destructive actions." },
          { name: ".btn-ghost.is-dashed", notes: "A dashed surface-1 border on the card radius. An open slot, the only meaning of dashed; mauve on hover." },
          { name: ".btn.is-icon", values: ".cn-tone-* · .is-lg", notes: "Square at --control-h-sm (34px), or --control-h in large. Tints toward --tone on hover. Needs aria-label." },
          { name: ".btn-text", notes: "Inline mauve text button at 13px 600; pink on hover. Held, it moves 1px." },
          { name: ".is-sm / .is-lg", values: "on .btn", notes: "Toolbar height with 13px type, or the hero action at --control-h + 12px with the body size, 16px. One .is-lg per view." },
          { name: "svg", values: "inside any button", notes: "Sized by the button: 16px, 14 in small, 18 in large, 20 in a large icon button, 13 in text." },
          { name: ":disabled", notes: "--disabled-opacity (.6) and a not-allowed cursor. Keeps the variant's rest shadow. The primary sinks instead of dimming. Drops focus." },
          { name: '[aria-disabled="true"]', values: "on .btn", notes: "Looks the same as :disabled, sunken primary included, but stays focusable, so a [data-tip] can say why. No hover lift or press. Your handler ignores the click." },
          { name: '[aria-busy="true"]', values: "on .btn", notes: "Hides the label and keeps the width, turns a 16px spinner (14px in small), stops clicks, stays focusable. Pair with aria-disabled." },
          { name: "--disabled-opacity", default: ".6", notes: "Keeps a disabled ghost label, --cn-fg-body at .6, at 4.2:1 on base. The primary does not read it; it sinks. .7 under prefers-contrast: more." },
          { name: "--grain", default: ".22", notes: "Grain strength on the primary and every other solid accent fill. 0 turns it off." },
          { name: "--plate", default: "var(--crust)", notes: "The plate's color, read by the secondary button, segmented options and .cn-hard." },
          { name: "--hard-extra", default: "var(--cn-lit-edge)", notes: "Layers drawn over the plate. The secondary keeps the lit top edge; the primary replaces it with its gloss." },
          { name: "--control-h", default: "46px (2.875rem)", notes: 'Rem, so the button grows with the browser font size. 38px under data-density="cozy", 28px under data-density="compact".' },
        ]}
      />
    </Doc>
  );
}
