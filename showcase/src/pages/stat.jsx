import { Doc, Demo, Props, CodeBlock } from "../lib/doc.jsx";

export default function StatPage() {
  return (
    <Doc
      title="Stat"
      lede="Three shapes for numbers: the metric tile (micro-label over an oversized tabular figure), the hero metric (accent-colored, one per view), and the stat row — a label/value baseline pair that stacks into a hairline-separated strip."
    >
      <Demo title="Metric tiles" row classes="metric">
        <div class="metric">
          <span>Active teams</span>
          <strong>48</strong>
        </div>
        <div class="metric">
          <span>Open invoices</span>
          <strong>12</strong>
        </div>
        <div class="metric">
          <span>Messages today</span>
          <strong>1,204</strong>
        </div>
        <div class="metric">
          <span>Storage used</span>
          <strong>1.2 TB</strong>
        </div>
      </Demo>

      <Demo title="Hero metric — accent-keyed" row classes="metric is-hero  (reads --accent)">
        <div class="metric is-hero">
          <span>Monthly revenue</span>
          <strong>$42,180</strong>
        </div>
        <div class="metric is-hero" style="--accent:#94e2d5">
          <span>Uptime</span>
          <strong>99.98%</strong>
        </div>
        <div class="metric is-hero" style="--accent:#fab387">
          <span>Seats filled</span>
          <strong>86 / 120</strong>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.is-hero</code> steps the figure up to 28px and
        colors it with <code class="cn-code">var(--accent)</code> — mauve by
        default, or whatever the surrounding card assigned. One hero per
        surface; everything else stays a plain metric. All figures are sans
        with <code class="cn-code">tabular-nums</code>, so columns of numbers
        line up.
      </p>

      <Demo title="Stat strip" classes="stat-strip > stat-row">
        <div class="stat-strip" style="width:min(420px,100%)">
          <div class="stat-row">
            <span>Plan</span>
            <b>Pro · annual</b>
          </div>
          <div class="stat-row">
            <span>Seats</span>
            <b>86 of 120</b>
          </div>
          <div class="stat-row">
            <span>Next invoice</span>
            <b>Sep 1 · $1,240</b>
          </div>
          <div class="stat-row">
            <span>Billing contact</span>
            <b>owner@example.com</b>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Rows sit on the page ground — no card required. Each row is a
        baseline-aligned pair: uppercase micro-label left, tabular value
        right. The strip adds the hairline separators between rows. Drop the
        strip into a well or panel body when it needs containment.
      </p>

      <Props
        title="Stat classes"
        rows={[
          {
            name: ".metric",
            values: "tile",
            notes: "Micro-label <span> over a 21px tabular <strong>. No chrome of its own.",
          },
          {
            name: ".metric.is-hero",
            values: "hero tile",
            default: "--accent: var(--mauve)",
            notes: "28px figure in the accent color. Steps down to 22px at ≤520px.",
          },
          {
            name: ".stat-row",
            values: "label/value pair",
            notes: "Baseline-aligned; label overlay-1, value subtext-1 tabular.",
          },
          {
            name: ".stat-strip",
            values: "row stack",
            notes: "Vertical stack; hairline separator between consecutive rows.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="metric is-hero" style="--accent: #94e2d5">
  <span>Uptime</span>
  <strong>99.98%</strong>
</div>

<div class="stat-strip">
  <div class="stat-row"><span>Plan</span><b>Pro · annual</b></div>
  <div class="stat-row"><span>Seats</span><b>86 of 120</b></div>
</div>`}
      />
    </Doc>
  );
}
