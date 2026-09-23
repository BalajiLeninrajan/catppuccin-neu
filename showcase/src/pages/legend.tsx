import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const STATUS = [
  { label: "Paid", tone: "green", count: 312 },
  { label: "Pending", tone: "peach", count: 64 },
  { label: "Overdue", tone: "red", count: 18 },
  { label: "Draft", tone: "blue", count: 26 },
];

const TOTAL = STATUS.reduce((n, s) => n + s.count, 0);

export default function LegendPage() {
  return (
    <Doc
      title="Legend"
      lede="A chart key: one swatch and one label per series. The swatch takes the item's --tone, so the key and the chart read the same property."
    >
      <Demo title="A key under a stacked bar" classes="legend > legend-item.cn-tone-*">
        <div class="cn-stack cn-gap-12" style="width:min(520px,100%)">
          <div
            class="cn-r-pill"
            style="display:flex;height:12px;gap:2px;overflow:hidden"
            role="img"
            aria-label={STATUS.map((s) => `${s.label} ${s.count}`).join(", ")}
          >
            {STATUS.map((s) => (
              <span
                key={s.label}
                class={`cn-tone-${s.tone}`}
                style={`flex:${s.count} 0 0;background:var(--tone)`}
              />
            ))}
          </div>
          <ul class="legend">
            {STATUS.map((s) => (
              <li key={s.label} class={`legend-item cn-tone-${s.tone}`}>
                {s.label} · {s.count}
              </li>
            ))}
          </ul>
          <span class="cn-meta">{TOTAL} invoices this quarter</span>
        </div>
      </Demo>

      <p class="cn-copy">
        Each item sets its tone with a <code class="cn-code">.cn-tone-*</code>{" "}
        class, and the mark in the chart reads the same class. Labels are
        sentence case at the meta size. The list wraps onto more lines when
        it runs out of room. A value after the label is optional; put it in
        the label text.
      </p>

      <p class="cn-copy">
        Tones carry meaning, so a legend keyed by tone suits a status
        breakdown. For series that are items, such as teams, key the swatch
        by the item's own accent: set <code class="cn-code">--tone</code>{" "}
        inline to that accent.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".legend", values: "ul", notes: "Wrapping flex row, 8px by 16px gap, no bullets." },
          { name: ".legend-item", values: "li", notes: "A 10px swatch in --tone, then the label in subtext-0 at 500 12px." },
          { name: "--tone", values: ".cn-tone-* or inline", default: "var(--peach)", notes: "The swatch color. Match it to the series' mark in the chart." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<ul class="legend">
  <li class="legend-item cn-tone-green">Paid · 312</li>
  <li class="legend-item cn-tone-peach">Pending · 64</li>
  <li class="legend-item cn-tone-red">Overdue · 18</li>
</ul>`}
      />
    </Doc>
  );
}
