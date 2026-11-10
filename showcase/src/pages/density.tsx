import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const COMPACT_CODE = `<section data-density="compact">
  <!-- 28px controls, 44px bands, the card radius on panels -->
  <button class="btn btn-secondary">Export</button>
</section>`;

const DENSITIES = [
  { id: null, label: "Default" },
  { id: "compact", label: "Compact" },
] as const;

export default function DensityPage() {
  const [density, setDensity] = useState<"compact" | null>(null);

  return (
    <Doc
      title="Density and contract props"
      lede="Compact density resizes a whole subtree at once. The contract props re-key one component from data."
    >
      <Demo title="Live density switch" classes='data-density="compact"'>
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
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td data-label="Invoice">INV-2083</td>
                  <td data-label="Amount">$1,240.00</td>
                </tr>
                <tr>
                  <td data-label="Invoice">INV-2082</td>
                  <td data-label="Amount">$1,195.00</td>
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

      <p class="cn-copy">
        Set <code class="cn-code-inline">data-density="compact"</code> on any
        element. Checkboxes, radios, switches and avatars keep their size,
        and on a touch screen every control stays at least 44px tall.
      </p>

      <CodeBlock title="Usage" code={COMPACT_CODE} />

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

      <Props
        title="The contract"
        rows={[
          { name: "--accent", values: "a color stored on the record", default: "mauve", notes: "The color of one item: accent cards, marks, avatars, large values, the progress fill." },
          { name: "--tone", values: "set by .cn-tone-*", default: "blue", notes: "The status tint of a tag, a banner or .cn-tint." },
          { name: "--series", values: "any color", default: "--accent", notes: "The swatch of a .legend-item." },
          { name: "--hard-offset", values: "length", default: "4px", notes: "The plate's distance. 2px at compact density." },
          { name: "--page-width", values: "length", default: "1440px", notes: "The width of the page column and the footer." },
          { name: "--page-gutter", default: "12 to 32px", notes: "The inline gutter of the page column, the footer and the topbar." },
          { name: "--page-pad", default: "24 to 48px", notes: "The block padding of the page column." },
          { name: "--progress-fill", values: "color or gradient", default: "--accent", notes: "The progress fill." },
          { name: "--grain", values: "0 to 1", default: ".22", notes: "Grain strength on solid accent fills. 0 turns it off." },
          { name: "--ring-ground", values: "color", default: "base", notes: "The ring between stacked avatars. Set it to the surface behind the stack." },
        ]}
      />
    </Doc>
  );
}
