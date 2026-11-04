import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

/* Revenue per team for two months, in dollars. Each team keeps its accent. */
const MONTHS = ["Aug", "Sep"] as const;
const REVENUE: Record<string, [number, number]> = {
  Payments: [44820, 48210],
  Analytics: [33410, 31876],
  Messaging: [15930, 18455],
  Storage: [12100, 12730],
  Identity: [11560, 10388],
  Support: [8240, 9102],
};
const REVENUE_MAX = 50000;

/* Two series over four months: messages by channel, in thousands. */
const CHANNELS = ["Email", "Chat"];
const MESSAGES = [
  { month: "May", values: [4.2, 2.8] },
  { month: "Jun", values: [4.6, 3.5] },
  { month: "Jul", values: [3.9, 4.4] },
  { month: "Aug", values: [4.1, 5.2] },
];
const MESSAGES_MAX = 6;

const pct = (v: number, max: number) => `${((v / max) * 100).toFixed(1)}%`;

export default function BarChartPage() {
  const [month, setMonth] = useState(1);

  return (
    <Doc
      title="Bar chart"
      lede="Horizontal bars with a label column and the value printed beside each bar. The number is always text, so the bar's color is never the only key."
    >
      <Demo title="One bar per row, keyed by identity" classes='bar-chart > span + bar-group > bar[style="--value; --accent"]'>
        <div class="cn-stack cn-gap-16" style="width:min(560px,100%)">
          <div class="segmented" role="group" aria-label="Month" style="width:min(240px,100%)">
            {MONTHS.map((m, i) => (
              <button key={m} type="button" aria-pressed={i === month} onClick={() => setMonth(i)}>
                <b>{m}</b>
              </button>
            ))}
          </div>
          <figure class="cn-stack cn-gap-12 cn-m-0">
            <figcaption class="cn-name">Revenue by team, {MONTHS[month]}</figcaption>
            <div class="bar-chart">
              {TEAMS.map((t) => [
                <span key={`${t.name}-l`}>{t.name}</span>,
                <div key={`${t.name}-g`} class="bar-group">
                  <div
                    class="bar"
                    style={`--value:${pct(REVENUE[t.name][month], REVENUE_MAX)};${accentStyle(t.accent)}`}
                  >
                    ${REVENUE[t.name][month].toLocaleString("en-US")}
                  </div>
                </div>,
              ])}
            </div>
          </figure>
        </div>
      </Demo>

      <p class="cn-copy">
        The chart is a two-column grid: labels in a column that fits them,
        bars in the rest. A label is any direct child that is not a{" "}
        <code class="cn-code-inline">.bar-group</code>, set in the meta role in{" "}
        <code class="cn-code-inline">--cn-fg-muted</code>. Each{" "}
        <code class="cn-code-inline">.bar</code> draws its bar from{" "}
        <code class="cn-code-inline">--value</code>, the share of the track,
        and holds its value as text. The bar takes at most 80% of the track,
        so the longest value still fits beside it. Switch the month: bars ease
        to the new value over twice <code class="cn-code-inline">--t-slow</code>,
        like a progress fill.
      </p>

      <p class="cn-copy">
        Teams have an identity, so each bar leaves{" "}
        <code class="cn-code-inline">--series</code> unset and falls back to the
        team's own <code class="cn-code-inline">--accent</code>. Payments is teal
        here as it is everywhere else. Set <code class="cn-code-inline">--value</code>{" "}
        from data. The recipe does not scale it, so pick the maximum yourself
        and keep it fixed while the data changes, or a bar that stayed the
        same would appear to move.
      </p>

      <Demo title="Grouped series with a legend" classes="legend + bar-chart > bar-group > bar × 2">
        <figure class="cn-stack cn-gap-16 cn-m-0" style="width:min(560px,100%)">
          <figcaption class="cn-name">Messages by channel, in thousands</figcaption>
          <ul class="legend">
            {CHANNELS.map((c, i) => (
              <li key={c} class="legend-item" style={`--series:var(--cn-series-${i + 1})`}>
                {c}
              </li>
            ))}
          </ul>
          <div class="bar-chart">
            {MESSAGES.map((m) => [
              <span key={`${m.month}-l`}>{m.month}</span>,
              <div key={`${m.month}-g`} class="bar-group">
                {m.values.map((v, i) => (
                  <div
                    key={CHANNELS[i]}
                    class="bar"
                    style={`--value:${pct(v, MESSAGES_MAX)};--series:var(--cn-series-${i + 1})`}
                  >
                    {v.toFixed(1)}
                    <span class="cn-sr-only"> {CHANNELS[i]}</span>
                  </div>
                ))}
              </div>,
            ])}
          </div>
        </figure>
      </Demo>

      <p class="cn-copy">
        A <code class="cn-code-inline">.bar-group</code> stacks its bars 4px
        apart, one per series. Series without an identity take{" "}
        <code class="cn-code-inline">--cn-series-1</code>,{" "}
        <code class="cn-code-inline">-2</code> and on, in order, and a{" "}
        <a href="/legend">legend</a> above the chart names them. Sighted
        readers match a bar to its series by position and color, so give each
        value a visually hidden series name for screen readers.
      </p>

      <Demo title="A hatched series" classes="bar.is-hatched · legend-item.is-hatched">
        <figure class="cn-stack cn-gap-16 cn-m-0" style="width:min(560px,100%)">
          <figcaption class="cn-name">Messages by channel, in thousands</figcaption>
          <ul class="legend">
            {CHANNELS.map((c, i) => (
              <li key={c} class={`legend-item${i === 1 ? " is-hatched" : ""}`} style={`--series:var(--cn-series-${i + 1})`}>
                {c}
              </li>
            ))}
          </ul>
          <div class="bar-chart">
            {MESSAGES.map((m) => [
              <span key={`${m.month}-l`}>{m.month}</span>,
              <div key={`${m.month}-g`} class="bar-group">
                {m.values.map((v, i) => (
                  <div
                    key={CHANNELS[i]}
                    class={`bar${i === 1 ? " is-hatched" : ""}`}
                    style={`--value:${pct(v, MESSAGES_MAX)};--series:var(--cn-series-${i + 1})`}
                  >
                    {v.toFixed(1)}
                    <span class="cn-sr-only"> {CHANNELS[i]}</span>
                  </div>
                ))}
              </div>,
            ])}
          </div>
        </figure>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.is-hatched</code> stripes a bar and its
        legend swatch, a second key besides hue, for a series that must stand
        apart without color. Hatch the same series in the bars and in the
        legend, so the key matches the mark.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".bar-chart", values: "div", notes: "Grid: a max-content label column and a minmax(0, 1fr) bar column, 12px by 16px gap, rows centered." },
          { name: ".bar-chart > :not(.bar-group)", values: "label", notes: "The meta role, 500 13px, in --cn-fg-muted." },
          { name: ".bar-group", values: "div", notes: "One row's bars, stacked 4px apart. Holds one .bar or several." },
          { name: ".bar", values: "div", notes: "A row: an 8px bar on the chip radius in --series, then the value as text in the meta role, --cn-fg-soft, tabular." },
          { name: "--value", values: "percentage", default: "0%", notes: "The bar's share of the track. The bar is --value × 80% of the track wide. Set it from data." },
          { name: "--series", values: "token color", default: "var(--accent)", notes: "The bar color: --cn-series-* for series, a status role for a status, or a palette tone for a status with no role. Leave it unset and the bar takes the record's --accent." },
          { name: ".is-hatched", values: "on .bar", notes: "Diagonal stripes over the bar, base at 45%, 2px on and 3px off. The series' .legend-item takes the same class." },
          { name: "transition", values: "inline-size", notes: "Twice --t-slow on the ease-out, so a new value slides in. Instant under reduced motion." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<ul class="legend">
  <li class="legend-item" style="--series: var(--cn-series-1)">Email</li>
  <li class="legend-item" style="--series: var(--cn-series-2)">Chat</li>
</ul>
<div class="bar-chart">
  <span>May</span>
  <div class="bar-group">
    <div class="bar" style="--value: 70%; --series: var(--cn-series-1)">
      4.2<span class="cn-sr-only"> Email</span>
    </div>
    <div class="bar" style="--value: 46.7%; --series: var(--cn-series-2)">
      2.8<span class="cn-sr-only"> Chat</span>
    </div>
  </div>
</div>`}
      />
    </Doc>
  );
}
