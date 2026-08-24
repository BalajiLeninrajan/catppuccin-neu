import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, ACCENTS } from "../lib/doc.jsx";

const COMPACT_CODE = `<section data-density="compact">
  <button class="btn btn-primary">Save changes</button>
  <input class="input" placeholder="Search settings" />
</section>`;

const ACCENT_CARDS = [
  { label: "Revenue", value: "48,210" },
  { label: "Messages", value: "1,284" },
  { label: "Invoices", value: "312" },
  { label: "Members", value: "57" },
  { label: "Uptime", value: "99.98" },
  { label: "Storage", value: "1.2 TB" },
];

const TONE_TAGS = [
  ["red", "overdue"],
  ["green", "paid"],
  ["peach", "pending"],
  ["yellow", "draft"],
  ["blue", "synced"],
  ["mauve", "archived"],
];

export default function DensityPage() {
  const [compact, setCompact] = useState(false);

  return (
    <Doc
      title="Density & contract props"
      lede="Every recipe reads a handful of custom properties. Four density knobs resize the whole system at once; three contract props re-key individual components from data."
    >
      <section>
        <h2 class="cn-title">Density knobs</h2>
        <p class="cn-copy">
          Control heights and the panel radius come from four properties on{" "}
          <code class="cn-code">:root</code>. Setting{" "}
          <code class="cn-code">data-density="compact"</code> on any element
          re-tunes them for that subtree — it is also the only way 12px enters
          the radius scale. Pair compact regions with{" "}
          <code class="cn-code">.cn-hard-sm</code> where you compose the hard
          offset by hand.
        </p>
      </section>

      <Props
        title="The knobs"
        rows={[
          {
            name: "--control-h",
            values: "46px · 30px compact",
            default: "46px",
            notes: "Primary/secondary button height; segmented options add 12px on top.",
          },
          {
            name: "--control-h-sm",
            values: "34px · 24px compact",
            default: "34px",
            notes: "Small controls (btn-flat and toolbar-scale pieces).",
          },
          {
            name: "--input-h",
            values: "42px · 30px compact",
            default: "42px",
            notes: "Inputs, selects, textareas. The 58px input-lg hero opts out.",
          },
          {
            name: "--pane-radius",
            values: "16px · 12px compact",
            default: "16px",
            notes: "Panel-scale radius; panel heading/footer bands follow it minus 1px.",
          },
        ]}
      />

      <Demo title="Live density toggle" classes='data-density="compact"'>
        <button
          type="button"
          class="btn-flat"
          aria-pressed={compact}
          onClick={() => setCompact(!compact)}
        >
          compact density — {compact ? "on" : "off"}
        </button>
        <div class="sc-grid" data-density={compact ? "compact" : null}>
          <div class="sc-row">
            <button type="button" class="btn btn-primary">New invoice</button>
            <button type="button" class="btn btn-secondary">Export</button>
          </div>
          <div class="field">
            <label>Team name</label>
            <input class="input" placeholder="Acme Operations" />
          </div>
          <div class="segmented">
            <button type="button">
              <b>Monthly</b>
              <small>Billed every month</small>
            </button>
            <button type="button" class="active">
              <b>Yearly</b>
              <small>Two months free</small>
            </button>
          </div>
          <div class="panel">
            <div class="panel-heading">
              <span class="cn-label">Billing settings</span>
              <span class="chip-tone cn-tone-green">active</span>
            </div>
            <div class="panel-footer">
              <button type="button" class="btn btn-ghost">Cancel</button>
              <button type="button" class="btn btn-primary">Save</button>
            </div>
          </div>
        </div>
      </Demo>

      <CodeBlock title="Usage" code={COMPACT_CODE} />

      <section>
        <h2 class="cn-title">Contract props</h2>
        <p class="cn-copy">
          Three properties are the documented extension points every recipe
          reads. Set them inline (or on a wrapper) to re-key a whole subtree —
          no recipe ever needs a variant class for color.
        </p>
      </section>

      <Props
        title="The contract"
        rows={[
          {
            name: "--accent",
            values: "the accent cycle: #cba6f7 #94e2d5 #f9e2af #89b4fa #fab387 #f5c2e7",
            default: "var(--mauve)",
            notes:
              "Per-instance accent. Read by accent-card (border, gradient, spine), mark-solid, cn-value-lg, the terminal caret, and cn-text-accent / cn-tint-accent / cn-edge-accent / cn-spine.",
          },
          {
            name: "--tone",
            values: "set via .cn-tone-{red,green,peach,yellow,blue,mauve}",
            default: "var(--peach)",
            notes:
              "Semantic tint. Read by chip-tone, banner, cn-tint, cn-text-tone, cn-edge-tone, and the btn-icon hover.",
          },
          {
            name: "--hard-offset-color",
            values: "any Mocha token",
            default: "var(--crust)",
            notes:
              "Colors the hard offset shadow on btn-secondary, segmented options, and the cn-hard family. Primary buttons override it with a mauve mix.",
          },
        ]}
      />

      <Demo title="--accent — one prop keys the whole card" classes='style="--accent:#94e2d5"'>
        <div class="sc-grid">
          {ACCENTS.map((a, i) => (
            <div class="accent-card" style={`--accent:${a.color}`} key={a.name}>
              <div class="metric is-hero">
                <span>{ACCENT_CARDS[i].label}</span>
                <strong>{ACCENT_CARDS[i].value}</strong>
                <span>accent: {a.name}</span>
              </div>
            </div>
          ))}
        </div>
      </Demo>

      <Demo title="--tone — semantic tint via the tone setters" classes="chip-tone cn-tone-green">
        <div class="sc-row">
          {TONE_TAGS.map(([tone, label]) => (
            <span class={`chip-tone cn-tone-${tone}`} key={tone}>{label}</span>
          ))}
        </div>
        <div class="banner cn-tone-blue">
          Scheduled maintenance on Sunday 02:00–03:00 UTC. Dashboards stay
          read-only while it runs.
        </div>
      </Demo>

      <Demo title="--hard-offset-color — recolor the offset" classes='style="--hard-offset-color:var(--mauve)"' row>
        <button type="button" class="btn btn-secondary">Default (crust)</button>
        <button type="button" class="btn btn-secondary" style="--hard-offset-color:var(--mauve)">
          Mauve offset
        </button>
        <button type="button" class="btn btn-secondary" style="--hard-offset-color:var(--surface-0)">
          Surface offset
        </button>
      </Demo>
    </Doc>
  );
}
