import type { ComponentChildren } from "preact";
import { Doc, Demo, Props } from "../lib/doc";

/* Three columns, or one under 520px. The min track is a third of the row
   over 520px and the full row under it, so auto-fit never lands on two. */
const THREE_UP =
  "display:grid;gap:var(--cn-grid-gap);grid-template-columns:repeat(auto-fit,minmax(clamp(calc((100% - 2 * var(--cn-grid-gap)) / 3 - 1px),calc((520px - 100%) * 999),100%),1fr))";
const SPEC_BOX = "width:100%;height:88px;display:grid;place-items:center;padding:12px;text-align:center";

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

/* A cube on the panel fill, wearing one shadow utility. */
function Cube({ cls, label, style = "" }: { cls: string; label?: string; style?: string }) {
  return (
    <div style="display:grid;gap:12px;justify-items:center">
      <div class={`cn-bg-base cn-r-card ${cls}`} style={`width:128px;height:128px;${style}`} />
      <code class="cn-code-meta">{label ?? cls}</code>
    </div>
  );
}

export default function DepthPage() {
  return (
    <Doc
      title="Depth"
      lede="Every elevation is one of a small set of shadows, lit from one light at the top left."
    >
      <Demo title="Four heights, on the page" classes="well · (the ground) · panel · cn-bg-base cn-edge cn-hard · panel is-tilted">
        <div class="cn-stack cn-gap-32" style="width:100%">
          <div style={THREE_UP}>
            <Height name="Below the ground" cls=".well" note="One dark wall from the top left, the sunken fill and a quiet even ring.">
              <div class="well cn-meta" style={SPEC_BOX}>Search invoices</div>
            </Height>
            <Height name="The ground" cls="--cn-surface-page" note="Mantle and nothing else.">
              <div class="cn-meta" style={SPEC_BOX}>Invoice #1042</div>
            </Height>
            <Height name="Raised, soft foot" cls=".panel" note="The base fill, a hairline, 1px of ink and a cast.">
              <div class="panel cn-meta" style={SPEC_BOX}>Revenue</div>
            </Height>
          </div>
          <div style={THREE_UP}>
            <Height name="Raised, hard plate" cls=".cn-hard" note="A 4px block of ink replaces the cast.">
              <div class="cn-bg-base cn-edge cn-hard cn-r-card cn-meta" style={SPEC_BOX}>Export</div>
            </Height>
            <Height name="The same plate, tipped" cls=".is-tilted" note="The one tilted aside, turned 1.2deg with its text on the 4px plate.">
              <div class="panel is-tilted cn-meta" style={SPEC_BOX}>This month</div>
            </Height>
            <Height name="Floating" cls="--shadow-pop" note="The overlay fill, no contact edge, the pop shadow.">
              <div class="cn-r-card cn-meta" style={`${SPEC_BOX};border:1px solid var(--edge-strong);background:var(--cn-surface-overlay);box-shadow:var(--shadow-pop)`}>Invoice sent</div>
            </Height>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        A soft foot means a panel resting on the page. A hard plate means
        something you can click, an accent card or the one tilted aside.
      </p>

      <Demo
        title="The neu shadows"
        classes="cn-bg-base cn-r-card cn-raised | cn-raised-soft | well (cn-bg-well, cn-inset) | --neu-inset-soft"
        row
      >
        <Cube cls="cn-raised" />
        <div style="display:grid;gap:12px;justify-items:center">
          <span class="avatar" aria-hidden="true">AK</span>
          <code class="cn-code-meta">
            cn-raised-soft
          </code>
        </div>
        <div style="display:grid;gap:12px;justify-items:center">
          <div class="well cn-r-card" style="width:128px;height:128px" />
          <code class="cn-code-meta">
            cn-inset
          </code>
        </div>
        <div style="display:grid;gap:12px;justify-items:center">
          <span style="display:flex;gap:10px;align-items:center">
            <input class="checkbox" type="checkbox" aria-label="inset-soft specimen" />
            <span class="stepper">
              <span>Draft</span>
            </span>
          </span>
          <code class="cn-code-meta">
            --neu-inset-soft
          </code>
        </div>
      </Demo>

      <p class="cn-copy">
        No component writes its own{" "}
        <code class="cn-code-inline">box-shadow</code>. It picks a token from
        the table below.
      </p>

      <Demo title="A panel inside a panel" classes="panel > panel">
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
        The inner panel rests on its parent, so it takes{" "}
        <code class="cn-code-inline">--neu-raised-soft</code> and a lit top
        edge.
      </p>

      <Demo title="The hard plate" classes='cn-hard · style="--plate:#cba6f7"' row>
        <Cube cls="cn-hard cn-edge" label="cn-hard" />
        <Cube cls="cn-hard cn-edge" label="--plate" style="--plate:#cba6f7" />
      </Demo>

      <Demo title="Press these" classes="cn-pressable | cn-hard cn-pressable-slide | cn-engaged" row>
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
        <code class="cn-code-inline">cn-pressable-slide</code> needs{" "}
        <code class="cn-code-inline">cn-hard</code>: the control slides
        halfway onto its own plate.{" "}
        <code class="cn-code-inline">cn-engaged</code> colors a border, so
        give the element one.
      </p>

      <Demo title="Radius roles" classes="cn-r-panel / cn-r-card / cn-r-control / cn-r-chip / cn-r-pill / cn-r-round" row>
        {[
          ["panel", "16px"],
          ["card", "12px"],
          ["control", "8px"],
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

      <Props
        title="Shadow tokens and utilities"
        rows={[
          { name: "--neu-raised", values: ".cn-raised", notes: "Panels and cards: a contact edge, a dark foot and a cast." },
          { name: "--neu-raised-soft", values: ".cn-raised-soft", notes: "Avatars and a panel inside a panel." },
          { name: "--neu-inset", values: ".cn-inset", notes: "Wells and engaged states." },
          { name: "--neu-inset-soft", notes: "Fields, held presses, stepper pills." },
          { name: "--shadow-pop", notes: "Overlays only. Pair it with --cn-surface-overlay and an --edge-strong border." },
          { name: "--edge / --edge-soft / --edge-strong", notes: "The hairline of a raised surface, an inner separator, the hairline of an overlay." },
          { name: ".cn-hard", notes: "The hard plate, for anything you can click." },
          { name: "--plate", values: "any color", default: "the shadow ink", notes: "The plate's color. Set it inline to re-key one control." },
          { name: "--hard-offset", values: "length", default: "4px", notes: "The plate's distance. 2px at compact density." },
          { name: ".cn-pressable", notes: "Lifts 1px on hover and sinks while held." },
          { name: ".cn-pressable-slide", notes: "The half-slide press. Only with .cn-hard." },
          { name: ".cn-engaged", notes: "A chosen or toggled option: pressed in on the mauve wash, inside a mauve rim." },
          { name: ".cn-r-{panel,card,control,chip,pill,round}", notes: "Radii by role. Compact density sets the panel radius to the card's." },
        ]}
      />
    </Doc>
  );
}
