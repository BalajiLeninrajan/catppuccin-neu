import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function StatPage() {
  return (
    <Doc
      title="Stat"
      lede="One recipe for numbers in three sizes: the stat tile, the large stat and the inline row."
    >
      <Demo title="Stat tiles" row classes="stat">
        <div class="stat">
          <span>Active teams</span>
          <strong>48</strong>
        </div>
        <div class="stat">
          <span>Open invoices</span>
          <strong>12</strong>
        </div>
        <div class="stat">
          <span>Messages today</span>
          <strong>1,204</strong>
        </div>
        <div class="stat">
          <span>Storage used</span>
          <strong>1.2 TB</strong>
        </div>
      </Demo>

      <Demo title="Large stat" row classes="stat is-lg  (reads --accent)">
        <div class="stat is-lg">
          <span>Monthly revenue</span>
          <strong>$42,180</strong>
        </div>
        <div class="stat is-lg" style={accentStyle(PAYMENTS.accent)}>
          <span>{PAYMENTS.name} revenue</span>
          <strong>{PAYMENTS.revenue}</strong>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.is-lg</code> colors the figure with <code class="cn-code-inline">--accent</code>, mauve by default. Use one large stat per surface.
      </p>

      <Demo title="Inline rows" classes="cn-divide > stat is-inline">
        <div class="cn-divide" style="width:min(420px,100%)">
          <div class="stat is-inline">
            <span>Plan</span>
            <b>Pro · annual</b>
          </div>
          <div class="stat is-inline">
            <span>Seats</span>
            <b>86 of 120</b>
          </div>
          <div class="stat is-inline">
            <span>Next invoice</span>
            <b>Sep 1 · $1,240</b>
          </div>
          <div class="stat is-inline">
            <span>Billing contact</span>
            <b>owner@example.com</b>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Stack inline rows in a <code class="cn-code-inline">.cn-divide</code> for hairlines between them.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".stat", values: "tile", notes: "A label span over a strong value." },
          { name: ".stat > p", values: "optional note", notes: "A line under the value." },
          { name: ".stat.is-lg", values: "large tile", default: "--accent: var(--mauve)", notes: "A larger figure in the accent. Text-colored inside an accent card." },
          { name: ".stat.is-inline", values: "label and value row", notes: "The label at the start, a b or strong at the end." },
          { name: ".cn-divide > .stat.is-inline", values: "row stack", notes: "Hairlines between rows." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="cn-grid-4">
  <div class="stat"><span>Active teams</span><strong>48</strong></div>
  <div class="stat"><span>Open invoices</span><strong>12</strong></div>
  <div class="stat"><span>Messages today</span><strong>1,204</strong></div>
  <div class="stat"><span>Storage used</span><strong>1.2 TB</strong></div>
</div>

<div class="stat is-lg" style="--accent: #94e2d5">
  <span>Payments revenue</span>
  <strong>$48,210</strong>
</div>

<div class="cn-divide">
  <div class="stat is-inline"><span>Plan</span><b>Pro · annual</b></div>
  <div class="stat is-inline"><span>Seats</span><b>86 of 120</b></div>
</div>`}
      />
    </Doc>
  );
}
