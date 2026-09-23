import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const COMPACT_CODE = `<section data-density="compact">
  <button class="btn btn-primary">Save changes</button>
  <input class="input" placeholder="Search settings" />
</section>`;

const TONE_TAGS = [
  ["red", "Overdue"],
  ["green", "Paid"],
  ["peach", "Pending"],
  ["yellow", "Draft"],
  ["blue", "Synced"],
  ["mauve", "Archived"],
];

export default function DensityPage() {
  const [compact, setCompact] = useState(false);

  return (
    <Doc
      title="Density and contract props"
      lede="Every recipe reads a handful of custom properties. The density knobs resize the whole system at once. Three contract props re-key single components from data."
    >
      <section>
        <h2 class="cn-title">Density knobs</h2>
        <p class="cn-copy">
          Control heights, band sizes and cell padding come from properties on{" "}
          <code class="cn-code">:root</code>. Set{" "}
          <code class="cn-code">data-density="compact"</code> on any element
          to retune them for that subtree. Compact is for dense apps and
          readouts: 28px controls, a 2px plate, the card radius on panels,
          44px bands and tighter table cells, chips and code wells.
        </p>
      </section>

      <Props
        title="The knobs"
        rows={[
          { name: "--control-h", values: "46px · 28px compact", default: "46px", notes: "Buttons, inputs, selects. Segmented options add 12px." },
          { name: "--control-h-sm", values: "34px · 24px compact", default: "34px", notes: "Small buttons, icon buttons and toolbar pieces." },
          { name: "--hard-offset", values: "4px · 2px compact", default: "4px", notes: "The plate's distance. The press slides half of it." },
          { name: "--cn-radius-panel", values: "16px · 12px compact", default: "16px", notes: "Panels and modals. Header bands follow it minus 1px." },
          { name: "--band-h", values: "64px · 44px compact", default: "64px", notes: "Panel, modal and drawer header bands. The topbar is this plus 4px." },
          { name: "--band-pad", values: "12px 24px · 8px 16px", default: "12px 24px", notes: "Band padding." },
          { name: "--band-title-size", values: "20px · 14px", default: "20px", notes: "An h2 inside a panel header." },
          { name: "--body-pad", values: "24px · 12px 16px", default: "24px", notes: ".panel-body padding." },
          { name: "--cell-pad", values: "12px 16px · 4px 8px", default: "12px 16px", notes: "Table cells." },
          { name: "--cell-font-size", values: "13px · 12px", default: "13px", notes: "Table body text." },
          { name: "--chip-pad", values: "8px 12px · 4px 8px", default: "8px 12px", notes: ".chip padding." },
          { name: "--well-pad", values: "12px 16px · 8px 12px", default: "12px 16px", notes: "Code block and terminal padding." },
          { name: "--empty-h", values: "260px · 120px", default: "260px", notes: "The empty-state floor." },
        ]}
      />

      <p class="cn-copy">
        Three controls keep one size at every density: the checkbox and
        radio (20px), the switch (50 by 28px), and the avatar (32px, or 44px
        with <code class="cn-code">.is-lg</code>).
      </p>

      <Demo title="Live density toggle" classes='data-density="compact"'>
        <button
          type="button"
          class="btn btn-ghost is-sm"
          aria-pressed={compact}
          onClick={() => setCompact(!compact)}
        >
          Compact density: {compact ? "on" : "off"}
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
            <button type="button" aria-pressed="true">
              <b>Yearly</b>
              <small>Two months free</small>
            </button>
          </div>
          <div class="panel">
            <div class="panel-header">
              <h2>Billing settings</h2>
              <span class="tag cn-tone-green">Active</span>
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
          Three properties are the extension points every recipe reads. Set
          them inline or on a wrapper to re-key a subtree. No recipe needs a
          variant class for color.
        </p>
      </section>

      <Props
        title="The contract"
        rows={[
          {
            name: "--accent",
            values: "a hex stored on the record",
            default: "var(--mauve)",
            notes:
              "The color of one item. Read by the accent-card plate, .mark, .avatar, .cn-value-lg, the progress fill, the terminal caret and the cn-*-accent utilities.",
          },
          {
            name: "--tone",
            values: "set with .cn-tone-{red,green,peach,yellow,blue,mauve}",
            default: "var(--peach)",
            notes: "Semantic tint. Read by .tag, .banner, field validation, .cn-tint, .cn-text-tone, .cn-edge-tone and the icon-button hover.",
          },
          {
            name: "--plate",
            values: "any Mocha token or mix",
            default: "var(--crust)",
            notes:
              "The plate under the secondary button, segmented options and the cn-hard family. The primary button and the accent card set their own.",
          },
        ]}
      />

      <Demo title="--accent" classes='style="--accent:#94e2d5"  (from the record)'>
        <div class="sc-grid">
          {TEAMS.map((team) => (
            <div class="accent-card" style={accentStyle(team.accent)} key={team.name}>
              <div class="stat is-lg" style="padding:0">
                <span>{team.name}</span>
                <strong>{team.revenue}</strong>
              </div>
            </div>
          ))}
        </div>
      </Demo>

      <Demo title="--tone" classes="tag cn-tone-green">
        <div class="sc-row">
          {TONE_TAGS.map(([tone, label]) => (
            <span class={`tag cn-tone-${tone}`} key={tone}>{label}</span>
          ))}
        </div>
        <div class="banner cn-tone-blue">
          Scheduled maintenance on Sunday from 02:00 to 03:00 UTC. Dashboards
          stay read-only while it runs.
        </div>
      </Demo>

      <Demo title="--plate" classes='style="--plate:var(--mauve)"' row>
        <button type="button" class="btn btn-secondary">Default (crust)</button>
        <button type="button" class="btn btn-secondary" style="--plate:var(--mauve)">
          Mauve plate
        </button>
        <button type="button" class="btn btn-secondary" style="--plate:var(--surface-0)">
          Surface plate
        </button>
      </Demo>
    </Doc>
  );
}
