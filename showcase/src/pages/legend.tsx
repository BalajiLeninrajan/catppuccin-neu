import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* Green never touches peach, and red never touches peach. Overdue is
   hatched, so it stands apart from green Paid without color. Each swatch
   and segment reads --series. */
const STATUS = [
  { label: "Paid", tone: "cn-success", count: 312 },
  { label: "Overdue", tone: "cn-danger", count: 18, hatched: true },
  { label: "Draft", tone: "cn-info", count: 26 },
  { label: "Pending", tone: "peach", count: 64 },
];

/* The stripes .is-hatched draws on a .bar or .legend-item swatch, for the
   plain span segments of the stacked bar. */
const HATCH = "repeating-linear-gradient(135deg, color-mix(in srgb, var(--base) 45%, transparent) 0 2px, transparent 2px 5px)";

const TOTAL = STATUS.reduce((n, s) => n + s.count, 0);

export default function LegendPage() {
  return (
    <Doc
      title="Legend"
      lede="A chart key: one swatch and one label per series. The swatch takes the item's --series, so the key and the chart read the same property."
    >
      <Demo lead title="A key under a stacked bar" why="How a legend keys to its chart" classes="legend > legend-item[style=--series] · legend-item.is-hatched">
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
                style={`--series:var(--${s.tone});flex:${s.count} 0 0;background:${s.hatched ? `${HATCH}, ` : ""}var(--series);border-radius:${i === 0 ? "999px 0 0 999px" : i === STATUS.length - 1 ? "0 999px 999px 0" : "0"}`}
              />
            ))}
          </div>
          <ul class="legend">
            {STATUS.map((s) => (
              <li key={s.label} class={`legend-item${s.hatched ? " is-hatched" : ""}`} style={`--series:var(--${s.tone})`}>
                {s.label} · {s.count}
              </li>
            ))}
          </ul>
          <span class="cn-meta">{TOTAL} invoices this quarter</span>
        </div>
      </Demo>

      <p class="cn-copy">
        Each item sets its color with <code class="cn-code-inline">--series</code>{" "}
        inline, and the mark in the chart reads the same property. Labels are
        sentence case at the meta size. The list wraps onto more lines when
        it runs out of room. A value after the label is optional; put it in
        the label text. The order is on purpose. Peach and red are one warm
        family, so blue Draft sits between them. Green and peach blur
        together for a red-green deficiency, so they never touch. Green Paid
        does touch red Overdue, so Overdue is hatched.
      </p>

      <p class="cn-copy">
        Status hues carry meaning, so a legend keyed by them suits a status
        breakdown. Set <code class="cn-code-inline">--series</code> to the
        status role where one exists, such as{" "}
        <code class="cn-code-inline">--cn-success</code>, and to a palette
        tone where none does, such as peach for Pending. For a chart's series, set{" "}
        <code class="cn-code-inline">--series</code> inline to{" "}
        <code class="cn-code-inline">--cn-series-1</code>,{" "}
        <code class="cn-code-inline">-2</code> and on, in order. The order
        runs teal, yellow, blue, peach, pink and mauve, so mauve, the
        interactive color, shows only in a chart of six. For series
        that are items with an identity, such as teams, key the swatch by the
        item's own accent instead: leave{" "}
        <code class="cn-code-inline">--series</code> unset and the swatch takes{" "}
        <code class="cn-code-inline">--accent</code>. The swatch never stands alone: the label
        names the series, and a value can follow it. The{" "}
        <a href="/colors">Colors</a> page lists the series order, and the{" "}
        <a href="/bar-chart">Bar chart</a> page pairs a legend with grouped
        bars.
      </p>

      <p class="cn-copy">
        <code class="cn-code-inline">.is-hatched</code> on a legend item
        stripes its swatch, the second key for a series that must stand
        apart without color. Put the same class on the series' bars, so the
        key and the mark match.
      </p>

      <Demo title="A hatched series" classes="legend-item.is-hatched" row>
        <ul class="legend">
          <li class="legend-item" style="--series:var(--cn-series-1)">Email</li>
          <li class="legend-item is-hatched" style="--series:var(--cn-series-2)">Chat</li>
          <li class="legend-item" style="--series:var(--cn-series-3)">SMS</li>
        </ul>
      </Demo>

      <Props
        title="Contract"
        rows={[
          { name: ".legend", values: "ul", notes: "Wrapping flex row, 8px by 16px gap, no bullets." },
          { name: ".legend-item", values: "li", notes: "A 10px swatch in --series, then the label in --cn-fg-body at the meta role, 400 14px." },
          { name: "--series", values: "inline token color", default: "var(--accent)", notes: "The swatch color: a --cn-series-* for a series, a status role for a status, or a palette tone for a status with no role. Match it to the series' mark in the chart." },
          { name: ".is-hatched", values: "on .legend-item", notes: "Diagonal stripes over the swatch, base at 45%, 2px on and 3px off. The matching .bar takes the same class." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<ul class="legend">
  <li class="legend-item" style="--series: var(--cn-success)">Paid · 312</li>
  <li class="legend-item is-hatched" style="--series: var(--cn-danger)">Overdue · 18</li>
  <li class="legend-item" style="--series: var(--cn-info)">Draft · 26</li>
  <li class="legend-item" style="--series: var(--peach)">Pending · 64</li>
</ul>`}
      />
    </Doc>
  );
}
