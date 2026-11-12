import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* Each swatch and segment reads --series. */
const STATUS = [
  { label: "Paid", tone: "cn-success", count: 312 },
  { label: "Overdue", tone: "cn-danger", count: 18 },
  { label: "Draft", tone: "cn-info", count: 26 },
  { label: "Pending", tone: "peach", count: 64 },
];

const TOTAL = STATUS.reduce((n, s) => n + s.count, 0);

export default function LegendPage() {
  return (
    <Doc
      title="Legend"
      lede="A chart key: one swatch and one label per series."
    >
      <Demo title="A key under a stacked bar" classes="legend > legend-item[style=--series]">
        <div class="cn-stack cn-gap-12" style="width:min(520px,100%)">
          <div
            style="display:flex;height:12px;gap:2px"
            role="img"
            aria-label={STATUS.map((s) => `${s.label} ${s.count}`).join(", ")}
          >
            {/* The ends round themselves, so the bar needs no clipping. */}
            {STATUS.map((s, i) => (
              <span
                key={s.label}
                style={`--series:var(--${s.tone});flex:${s.count} 0 0;background:var(--series);border-radius:${i === 0 ? "999px 0 0 999px" : i === STATUS.length - 1 ? "0 999px 999px 0" : "0"}`}
              />
            ))}
          </div>
          <ul class="legend">
            {STATUS.map((s) => (
              <li key={s.label} class="legend-item" style={`--series:var(--${s.tone})`}>
                {s.label} · {s.count}
              </li>
            ))}
          </ul>
          <span class="cn-meta">{TOTAL} invoices this quarter</span>
        </div>
      </Demo>

      <p class="cn-copy">
        Each item sets its color with <code class="cn-code-inline">--series</code> inline, and the mark in the chart reads the same property.
      </p>

      <p class="cn-copy">
        Set <code class="cn-code-inline">--series</code> to a status role such as <code class="cn-code-inline">--cn-success</code> where one exists, and to a palette tone where none does. Leave it unset for items with an identity, such as teams, and the swatch takes <code class="cn-code-inline">--accent</code>.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".legend", values: "ul", notes: "A wrapping row with no bullets." },
          { name: ".legend-item", values: "li", notes: "A swatch in --series, then the label." },
          { name: "--series", values: "a color", default: "var(--accent)", notes: "The swatch color. Match it to the mark in the chart. An item that sets --tone and no --series uses --tone." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<ul class="legend">
  <li class="legend-item" style="--series: var(--cn-success)">Paid · 312</li>
  <li class="legend-item" style="--series: var(--cn-danger)">Overdue · 18</li>
  <li class="legend-item" style="--series: var(--cn-info)">Draft · 26</li>
  <li class="legend-item" style="--series: var(--peach)">Pending · 64</li>
</ul>`}
      />
    </Doc>
  );
}
