import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";
import { TONE_GLYPH, NEEDS_GLYPH } from "../lib/glyphs";

const COMPACT_CODE = `<section data-density="cozy">
  <!-- 38px controls, 52px bands, 8px 12px table cells -->
  <button class="btn btn-primary">Save changes</button>
  <input class="input" placeholder="Search settings" />
</section>

<section data-density="compact">
  <!-- 28px controls, 44px bands, the card radius on panels -->
  <button class="btn btn-secondary">Export</button>
</section>`;

const TONE_TAGS = [
  ["red", "Overdue"],
  ["green", "Paid"],
  ["peach", "Disputed"],
  ["blue", "Synced"],
  ["yellow", "Due soon"],
  ["mauve", "Archived"],
];

/* The SPEC's density table: knob, default, cozy, compact, what it sets. */
const KNOBS: Array<[string, string, string, string, string]> = [
  ["--control-h", "46px (2.875rem)", "38px", "28px", "Buttons, inputs, selects. Segmented options add 12px."],
  ["--control-h-sm", "34px (2.125rem)", "28px", "26px, never under 24px", "Small buttons, icon buttons, tabs, menu rows, page targets."],
  ["--hard-offset", "4px", "3px", "2px", "The plate's distance. The press slides half of it."],
  ["--cn-radius-panel", "16px", "16px", "12px", "Panels and modals. A table head at a panel edge follows it minus 1px."],
  ["--band-h", "64px", "52px", "44px", "Panel, modal and drawer header bands. The topbar is this plus 4px."],
  ["--band-pad", "12px 24px", "8px 24px", "8px 16px", "Band padding."],
  ["--band-title-size", "20px", "20px", "14px", "An h2 or h3 in a header band."],
  ["--lead-title-size", "28px", "28px", "20px", "The lead panel's band title, at the heading weight. 20px at 655px and under, where display-sm drops under 34px."],
  ["--lead-band-h", "72px", "60px", "48px", "The lead panel's header band, taller than --band-h."],
  ["--lead-pad", "32px", "24px", "16px", "The lead panel's header and footer inline padding, its body padding and a filling table's outer columns."],
  ["--body-pad", "24px", "16px 24px", "12px 16px", ".panel-body padding."],
  ["--cell-pad", "12px 16px", "8px 12px", "4px 8px", "Table cells."],
  ["--cell-font-size", "14px", "14px", "13px", "Table head and body text."],
  ["--cn-type-body-size", "16px", "16px", "15px", "The body role: body, .cn-copy and .cn-prose."],
  ["--chip-pad", "8px 12px", "4px 12px", "4px 8px", ".chip padding."],
  ["--well-pad", "12px 16px", "12px 16px", "8px 12px", "Code block and terminal padding."],
  ["--empty-h", "260px", "180px", "120px", "The empty-state floor."],
];

const DENSITIES = [
  { id: null, label: "Default" },
  { id: "cozy", label: "Cozy" },
  { id: "compact", label: "Compact" },
] as const;

export default function DensityPage() {
  const [density, setDensity] = useState<"cozy" | "compact" | null>(null);

  return (
    <Doc
      title="Density and contract props"
      lede="Every recipe reads a handful of custom properties. The density knobs resize the whole system at once. The contract props re-key single components from data."
    >
      <section>
        <h2 class="cn-title">Density knobs</h2>
        <p class="cn-copy">
          Control heights, band sizes and cell padding come from properties on{" "}
          <code class="cn-code-inline">:root</code>.
        </p>
      </section>

      <Demo lead title="The knobs at each density" why="How to set density, and what ignores it">
        <div style="width:100%">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Knob</th>
                <th scope="col">Default</th>
                <th scope="col">Cozy</th>
                <th scope="col">Compact</th>
                <th scope="col">Sets</th>
              </tr>
            </thead>
            <tbody>
              {KNOBS.map(([name, def, cozy, compact, sets]) => (
                <tr key={name}>
                  <td data-label="Knob" class="cell-name">
                    <code class="cn-code-inline">{name}</code>
                  </td>
                  <td data-label="Default">{def}</td>
                  <td data-label="Cozy">{cozy}</td>
                  <td data-label="Compact">{compact}</td>
                  <td data-label="Sets">{sets}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code-inline">data-density="cozy"</code> or{" "}
        <code class="cn-code-inline">data-density="compact"</code> on any element
        to retune them for that subtree. Cozy is for desktop data tools
        that want more rows on screen: 38px controls, a 3px plate, 52px
        bands and 8px by 12px table cells, with the band title, the body
        size and the panel radius left alone. Compact is the dense strip for
        readouts: 28px controls, a 2px plate, the card radius on panels,
        44px bands and tighter table cells, chips and code wells. Control
        heights are rem (46px is 2.875rem), so a reader who raises the
        browser font size gets taller controls along with larger labels.
      </p>

      <p class="cn-copy">
        Some sizes ignore density: the checkbox and radio (20px), the switch
        (50 by 28px), the avatar (32px, or 44px with{" "}
        <code class="cn-code-inline">.is-lg</code>), the mark (28px) and the
        command's copy control (34px). Wrap a checkbox, radio or switch in{" "}
        <code class="cn-code-inline">.choice</code> so the label row is the
        target. Under <code class="cn-code-inline">pointer: coarse</code>,{" "}
        <code class="cn-code-inline">--control-h</code> is 46px and{" "}
        <code class="cn-code-inline">--control-h-sm</code> 44px at every
        density.
      </p>

      <Demo title="Live density switch" classes='data-density="cozy" · data-density="compact"'>
        <div class="cn-row cn-wrap" role="group" aria-label="Density">
          {DENSITIES.map((d) => (
            <button
              key={d.label}
              type="button"
              class="btn btn-ghost is-sm"
              aria-pressed={density === d.id}
              onClick={() => setDensity(d.id)}
            >
              {d.label}
            </button>
          ))}
        </div>
        <div class="sc-grid" data-density={density}>
          <div class="sc-row">
            <button type="button" class="btn btn-primary">New invoice</button>
            <button type="button" class="btn btn-secondary">Export</button>
          </div>
          <div class="field">
            <label for="density-team">Team name</label>
            <input id="density-team" class="input" placeholder="Acme Operations" />
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
            <table class="data-table">
              <thead>
                <tr>
                  <th scope="col">Invoice</th>
                  <th scope="col" class="is-num">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Invoice">INV-2083</td>
                  <td data-label="Amount" class="is-num">$1,240.00</td>
                </tr>
                <tr>
                  <td data-label="Invoice">INV-2082</td>
                  <td data-label="Amount" class="is-num">$1,195.00</td>
                </tr>
              </tbody>
            </table>
            <div class="panel-footer">
              <button type="button" class="btn btn-ghost">Cancel</button>
              <button type="button" class="btn btn-secondary">Save</button>
            </div>
          </div>
        </div>
      </Demo>

      <CodeBlock title="Usage" code={COMPACT_CODE} />

      <section>
        <h2 class="cn-title">Contract props</h2>
        <p class="cn-copy">
          Three properties carry color and are read by most recipes. Set
          them inline or on a wrapper to re-key a subtree. No recipe needs a
          variant class for color. The rest of the contract follows them.
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
              "The color of one item. Read by the accent-card plate, .mark, .avatar, .cn-value-lg, the progress fill, the terminal caret, the cn-*-accent utilities, and a .bar or .legend-item with no --series.",
          },
          {
            name: "--series",
            values: "inline, a --cn-series-*, a status role, or a palette tone for a status with no role",
            default: "unset, so var(--accent)",
            notes: "The color of a .bar and its .legend-item swatch.",
          },
          {
            name: "--tone",
            values: "set with .cn-tone-{red,green,peach,yellow,blue,mauve}",
            default: "var(--cn-info)",
            notes: "Semantic tint. Read by .tag, .banner, field validation, .cn-tint, .cn-text-tone, .cn-edge-tone and the icon-button hover.",
          },
          {
            name: "--plate",
            values: "any Mocha token or mix",
            default: "var(--neu-ink)",
            notes:
              "The plate under the secondary button, segmented options and the cn-hard family. The primary button and the accent card set their own. Undeclared on :root; recipes read var(--plate, var(--neu-ink)), the shadow ink at 1.22:1 under base.",
          },
        ]}
      />

      <Props
        title="The rest of the contract"
        rows={[
          { name: "--hard-offset", default: "4px", notes: "The plate's distance; 3px cozy, 2px compact." },
          { name: "--page-gutter", default: "clamp(12px, 3vw, 32px)", notes: "Inline gutter of the page column, the footer and the topbar." },
          { name: "--page-pad", default: "clamp(24px, 4vw, 48px)", notes: "Block padding of the page column." },
          { name: "--page-width", default: "unset", notes: "Width of the page column and footer; falls back to --cn-width-page (1440px)." },
          { name: "--progress-fill", default: "the accent ramp", notes: "The progress fill: any token color or gradient." },
          { name: "--grain", default: ".22", notes: "Grain strength on solid accent fills; 0 turns it off." },
          { name: "--ring-ground", default: "var(--base)", notes: "The ring between stacked avatars: the panel fill by default. Set it to the surface behind the stack, var(--mantle) on the page." },
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
          {TONE_TAGS.map(([tone, label]) => {
            const Glyph = TONE_GLYPH[tone];
            return (
              <span class={`tag cn-tone-${tone}`} key={tone}>
                {NEEDS_GLYPH.has(tone) ? <Glyph /> : null}
                {label}
              </span>
            );
          })}
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
