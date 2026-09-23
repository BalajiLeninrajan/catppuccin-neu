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
        <code class="cn-code">.is-lg</code> steps the figure up to 28px and
        colors it with <code class="cn-code">var(--accent)</code>, mauve by
        default. When the number belongs to one item, such as a team, set that
        item's accent. Use one large stat per surface. On an accent card the
        figure stays text-colored, because the plate already shows the accent.
        Every figure is sans with <code class="cn-code">tabular-nums</code>, so
        columns of numbers line up.
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
        An inline row puts the label left and the value right on one
        baseline. Stack rows in a <code class="cn-code">.cn-divide</code> for
        hairlines between them; each row then gets 8px above and below. The
        rows need no card. Put the stack in a well or a panel body when it
        needs a frame.
      </p>

      <Props
        title="Stat classes"
        rows={[
          {
            name: ".stat",
            values: "tile",
            notes: "A 12px label <span> over a 20px tabular <strong>. No chrome of its own.",
          },
          {
            name: ".stat.is-lg",
            values: "large tile",
            default: "--accent: var(--mauve)",
            notes: "28px figure in the accent. Text-colored inside an accent card. Steps down to 20px at 520px.",
          },
          {
            name: ".stat.is-inline",
            values: "label and value row",
            notes: "Baseline-aligned. Label overlay-2; value (b or strong) subtext-1, tabular.",
          },
          {
            name: ".cn-divide > .stat.is-inline",
            values: "row stack",
            notes: "Hairline between rows, 8px block padding on each.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="stat is-lg" style="--accent: #94e2d5">
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
