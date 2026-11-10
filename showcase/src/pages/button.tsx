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
      <Demo
        lead
        title="Primary, live and disabled"
        classes="btn btn-primary · btn btn-primary[disabled]"
        why="How the primary is built and why it sinks when disabled"
        row
      >
        <button class="btn btn-primary">Create invoice</button>
        <button class="btn btn-primary" disabled>
          Create invoice
        </button>
      </Demo>

      <p class="cn-copy">
        Compose the base class with a variant: <code class="cn-code-inline">class="btn btn-primary"</code>.
        Heights come from the density knobs, so every variant shrinks together under cozy or compact density.
      </p>

      <p class="cn-copy">
        One primary action per view. The fill is a mauve ramp under film grain, on a mauve-tinted plate.
        Set <code class="cn-code-inline">--grain: 0</code> to drop the grain.
      </p>

      <p class="cn-copy">
        A disabled primary, through <code class="cn-code-inline">disabled</code> or{" "}
        <code class="cn-code-inline">aria-disabled="true"</code>, loses its plate, ramp, grain and gloss and sinks
        into the sunken fill at full opacity. A disabled secondary dims and goes flat on the same fill. The other
        variants dim. A busy primary keeps its fill.
      </p>

      <Demo title="Secondary" classes="btn btn-secondary" why="What the secondary rests on" row>
        <button class="btn btn-secondary">Export report</button>
        <button class="btn btn-secondary" disabled>
          Export report
        </button>
      </Demo>

      <p class="cn-copy">
        The secondary rests on the base fill with a hairline, the lit top edge and the ink plate. Hover
        warms the border toward mauve and deepens the plate a pixel.
      </p>

      <Demo title="Ghost" classes="btn btn-ghost" why="The ghost hairline and hover" row>
        <button class="btn btn-ghost">Dismiss</button>
        <button class="btn btn-ghost" disabled>
          Dismiss
        </button>
      </Demo>

      <p class="cn-copy">
        A ghost has no fill and no plate. It rests on an{" "}
        <code class="cn-code-inline">--edge-soft</code> hairline. Hover adds{" "}
        <code class="cn-code-inline">--hover</code> and steps the hairline up to{" "}
        <code class="cn-code-inline">--edge</code>. In a topbar nav and as an icon button it has no hairline at
        rest.
      </p>

      <Demo
        title="Ghost toggles"
        classes="btn btn-ghost is-sm  [aria-pressed]"
        why="How a toggled ghost differs from a hovered one"
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
        A small ghost button is the toolbar toggle. With{" "}
        <code class="cn-code-inline">aria-pressed="true"</code>, <code class="cn-code-inline">aria-current</code> or{" "}
        <code class="cn-code-inline">aria-expanded="true"</code> (a trigger whose{" "}
        <a href="/menu">menu</a> is open) it takes the engaged state: pressed in on the mauve wash, inside a
        mauve rim. Hover leaves the wash and rim in place.
      </p>

      <Demo title="Danger ghost" classes="btn btn-ghost is-danger" why="When to use the danger ghost" row>
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

      <Demo title="Busy" classes='btn btn-primary [aria-busy="true"]' why="What busy changes and what it keeps" row>
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
        keeps its name. Pair it with <code class="cn-code-inline">aria-disabled="true"</code>, not{" "}
        <code class="cn-code-inline">disabled</code>, which would drop focus mid-action. Click either button to see it.
      </p>

      <Demo
        title="Unavailable with a reason"
        classes='btn [aria-disabled="true"] [data-tip]'
        why="aria-disabled or disabled"
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
        <code class="cn-code-inline">aria-disabled="true"</code> looks the same as{" "}
        <code class="cn-code-inline">disabled</code> but the button stays focusable, so a{" "}
        <code class="cn-code-inline">data-tip</code> on it can say why the action is unavailable. The bubble stays out
        of the accessible name, so point <code class="cn-code-inline">aria-describedby</code> at the same words. Your
        click handler ignores it. Use <code class="cn-code-inline">disabled</code> when there is nothing to explain.
      </p>

      <Demo title="Text" classes="btn-text" row>
        <button class="btn-text">View all members</button>
      </Demo>

      <Demo title="Icon" classes="btn is-icon" why="Glyph color, tone and the label an icon needs" row>
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
        Icon buttons are square at the small control height and flat until hovered. The glyph rests in the
        muted text color and tints toward <code class="cn-code-inline">--tone</code> on hover. Set the tone with a{" "}
        <code class="cn-code-inline">.cn-tone-*</code> class. Always give an icon button an{" "}
        <code class="cn-code-inline">aria-label</code>.
      </p>

      <Demo title="Sizes" classes="btn is-sm · btn · btn is-lg" row>
        <button class="btn btn-secondary is-sm">Small</button>
        <button class="btn btn-secondary">Default</button>
        <button class="btn btn-primary is-lg">Large</button>
      </Demo>

      <Demo title="Icon sizes" classes="btn is-icon · btn is-icon is-lg" why="What each size is for" row>
        <button class="btn is-icon" aria-label="Settings"><GearIcon /></button>
        <button class="btn is-icon is-lg" aria-label="Settings"><GearIcon /></button>
      </Demo>

      <p class="cn-copy">
        Small is the toolbar height (<code class="cn-code-inline">--control-h-sm</code>) with 14px type. Large is the
        one hero action: the control height plus 12px, with 16px type. A view holds at most one{" "}
        <code class="cn-code-inline">.is-lg</code>. The button sizes an svg inside it: 16px by default, 14px in
        small, 18px in large and 20px in a large icon button.
      </p>

      <Demo title="Dashed" classes="btn btn-ghost is-dashed" why="Dashed means an open slot">
        <button class="btn btn-ghost is-dashed" style="width: 100%">
          + Add team member
        </button>
      </Demo>

      <p class="cn-copy">
        The one control with a dashed border. Use it as an open slot: a drop zone, a placeholder row, an
        optional extra. On hover the border and label turn mauve. Disabled controls never take a dashed border.
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
        why="How the half-slide moves and where to use it"
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
          { name: ".btn-primary", contrast: "Disabled label 5.1:1 on the sunken fill", notes: "Mauve ramp under grain, crust text, mauve-mix plate and a white top rim. Hover moves the ramp to pink. Disabled, it sinks into --cn-surface-sunken under the soft carve with a --cn-fg-disabled label. One per view." },
          { name: ".btn-secondary", contrast: "Hover border 4.1:1 on base", notes: "--cn-surface-raised fill, --edge hairline, the lit top edge and the --neu-ink plate. Hover warms the border to mauve and deepens the plate 1px. The default for clickables." },
          { name: ".btn-ghost", values: '[aria-pressed="true"] / [aria-current] / [aria-expanded="true"]', contrast: "Resting hairline 1.22:1 on a panel, 1.24:1 on the page · hover fill 1.40:1 · engaged wash 1.63:1", notes: "No fill and no plate. Rests on an --edge-soft hairline, except in a topbar nav and as an icon button. Hover adds --hover and steps the hairline to --edge. Toggled, current or holding an open menu, it takes --wash, --neu-inset and the --engaged-edge rim." },
          { name: ".btn-ghost.is-danger", notes: "Red label, red wash on hover. Destructive actions." },
          { name: ".btn-ghost.is-dashed", notes: "A dashed surface-1 border on the card radius. An open slot, the only meaning of dashed; mauve on hover." },
          { name: ".btn.is-icon", values: ".cn-tone-* · .is-lg", contrast: "Resting glyph 7.4:1 on base", notes: "Square at --control-h-sm (34px), or --control-h in large. The glyph rests in --cn-fg-muted (subtext-0) and tints toward --tone on hover. Needs aria-label." },
          { name: ".btn-text", notes: "Inline mauve text button at 14px 600 with no padding, so it sits flush with the content edge; pink on hover. Held, it moves 1px." },
          { name: ".is-sm / .is-lg", values: "on .btn", notes: "Toolbar height with the label size, 14px, or the hero action at --control-h + 12px with the body size, 16px. One .is-lg per view." },
          { name: "svg", values: "inside any button", notes: "Sized by the button: 16px, 14 in small, 18 in large, 20 in a large icon button, 13 in text." },
          { name: ":disabled", notes: "--disabled-opacity (.7) and a not-allowed cursor. No plate. The primary sinks instead of dimming. Drops focus." },
          { name: '[aria-disabled="true"]', values: "on .btn", notes: "Looks the same as :disabled but stays focusable, so a [data-tip] can say why. No hover lift or press. Your handler ignores the click." },
          { name: '[aria-busy="true"]', values: "on .btn", notes: "Hides the label and keeps the width, turns a 16px spinner (14px in small), stops clicks, stays focusable. Pair with aria-disabled." },
          { name: "--disabled-opacity", default: ".7", contrast: "Disabled ghost label 5.2:1 on base · disabled chip label 4.8:1 on its sunken fill", notes: "Dims a disabled label. The primary does not read it. .8 under prefers-contrast: more." },
          { name: "--grain", default: ".22", notes: "Grain strength on the primary and every other solid accent fill. 0 turns it off." },
          { name: "--plate", default: "var(--neu-ink)", notes: "The plate's color, read by the secondary button, segmented options and .cn-hard." },
          { name: "--hard-extra", default: "var(--cn-lit-edge)", notes: "Layers drawn over the plate. The secondary keeps the lit top edge; the primary replaces it with its gloss." },
          { name: "--control-h", default: "46px (2.875rem)", notes: 'Rem, so the button grows with the browser font size. 38px under data-density="cozy", 28px under data-density="compact".' },
        ]}
      />
    </Doc>
  );
}
