import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

/* Twelve weeks of one measure per row. Points run oldest to newest. */
const COLLECTED = [41, 44, 43, 48, 52, 50, 55, 58, 54, 61, 66, 74.5];
const WEEKLY: Record<string, number[]> = {
  Payments: [12, 13, 12, 14, 15, 15, 16, 17, 16, 18, 19, 21],
  Analytics: [9, 9, 10, 9, 8, 8, 9, 8, 7, 8, 7, 7],
  Messaging: [4, 5, 5, 6, 6, 7, 6, 7, 8, 8, 9, 9],
};

const W = 96;
const H = 24;
const PAD = 3;

/* Scales a series into the 96x24 box, with 3 units of room top and
   bottom so the stroke and the end dot never clip. */
function points(values: number[]) {
  const lo = Math.min(...values);
  const hi = Math.max(...values);
  const span = hi - lo || 1;
  return values.map((v, i) => [
    (i / (values.length - 1)) * W,
    PAD + (1 - (v - lo) / span) * (H - PAD * 2),
  ]);
}

function Spark({ values, label, style }: { values: number[]; label: string; style?: string }) {
  const pts = points(values);
  const [x, y] = pts[pts.length - 1];
  return (
    <span class="sparkline" style={style}>
      <svg viewBox={`0 0 ${W} ${H}`} aria-hidden="true">
        <polyline points={pts.map((p) => p.map((n) => n.toFixed(1)).join(",")).join(" ")} />
        <circle cx={x.toFixed(1)} cy={y.toFixed(1)} r="2.5" />
      </svg>
      <span>{label}</span>
    </span>
  );
}

export default function SparklinePage() {
  return (
    <Doc
      title="Sparkline"
      lede="One measure over time, as a small line beside its latest value. The value is text, so the line's color is never the only key."
    >
      <Demo title="One series" classes='sparkline[style="--series"] > svg (polyline, circle) + span'>
        <div class="cn-stack cn-gap-8">
          <span class="cn-label">Collected per week, last 12 weeks</span>
          <Spark values={COLLECTED} label="$74.5k this week" style="--series:var(--cn-series-1)" />
        </div>
      </Demo>

      <p class="cn-copy">
        A <code class="cn-code-inline">.sparkline</code> is an inline row: an
        svg line, 96 by 24, and its value in the meta role in{" "}
        <code class="cn-code-inline">--cn-fg-soft</code>, tabular. The line is
        a 2px stroke with round caps and joins in{" "}
        <code class="cn-code-inline">--series</code>, or the record's{" "}
        <code class="cn-code-inline">--accent</code> when that is unset. An
        optional circle marks the latest point. The stroke does not scale
        with the box, so it stays 2px at any size. The svg is{" "}
        <code class="cn-code-inline">aria-hidden</code>: the text beside it
        carries the value, and a label above it says what the line measures.
      </p>

      <Demo title="Keyed by identity, in a table" classes="data-table > td > sparkline">
        <div style="width:min(560px,100%)">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Team</th>
                <th scope="col">Invoices per week, 12 weeks</th>
              </tr>
            </thead>
            <tbody>
              {TEAMS.slice(0, 3).map((t) => {
                const values = WEEKLY[t.name];
                return (
                  <tr key={t.name}>
                    <td class="cell-name"><strong>{t.name}</strong></td>
                    <td data-label="Invoices per week">
                      <Spark values={values} label={`${values[values.length - 1]} this week`} style={accentStyle(t.accent)} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Demo>

      <p class="cn-copy">
        Teams have an identity, so each line leaves{" "}
        <code class="cn-code-inline">--series</code> unset and takes the
        team's own <code class="cn-code-inline">--accent</code>, as their bars
        do. Each line scales to its own range, so it shows the shape of one
        series, not a comparison between rows. Compare rows with a{" "}
        <a href="/bar-chart">bar chart</a>, which shares one scale.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".sparkline", values: "span", notes: "Inline flex row, 8px gap. The value text is the meta role, --cn-fg-soft, tabular." },
          { name: ".sparkline > svg", values: "svg", notes: "A fixed 96x24 box. aria-hidden; the text beside it holds the value." },
          { name: "polyline, path", values: "in the svg", notes: "No fill, a 2px stroke in --series or --accent, round caps and joins, non-scaling." },
          { name: "circle", values: "in the svg", notes: "Optional. The latest point, filled in the same color." },
          { name: "--series", values: "token color", default: "var(--accent)", notes: "The line color: --cn-series-* for a series, or unset for the record's --accent." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<span class="sparkline" style="--series: var(--cn-series-1)">
  <svg viewBox="0 0 96 24" aria-hidden="true">
    <polyline points="0,21 8.7,18.4 …  96,3" />
    <circle cx="96" cy="3" r="2.5" />
  </svg>
  <span>$74.5k this week</span>
</span>`}
      />
    </Doc>
  );
}
