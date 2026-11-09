import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function StatPage() {
  return (
    <Doc
      title="Stat"
      lede="One recipe for numbers in three sizes: the stat tile, the large stat and the inline row, plus a grid that lays tiles out in a row."
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

      <Demo title="Stat grid" classes="stat-grid > stat">
        <div class="stat-grid" style="width:100%">
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
        </div>
      </Demo>

      <Demo title="Three across" classes='stat-grid style="--stat-cols: 3"'>
        <div class="stat-grid" style="width:100%;--stat-cols:3">
          <div class="stat">
            <span>Invoices sent</span>
            <strong>312</strong>
          </div>
          <div class="stat">
            <span>Paid on time</span>
            <strong>94%</strong>
          </div>
          <div class="stat">
            <span>Overdue</span>
            <strong>7</strong>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.stat-grid</code> lays stats out four across
        with a 16px gap. Set <code class="cn-code-inline">--stat-cols</code> for
        another count. At 760px and below it goes to two across, whatever{" "}
        <code class="cn-code-inline">--stat-cols</code> says, and it stays at two
        on the narrowest phone. A column of single figures spends the height a
        reader scrolls for, so the grid never drops to one.
      </p>

      <Demo title="Ruled, on the page ground" classes="stat-grid is-ruled > stat">
        <section class="stat-grid is-ruled" style="width:100%" aria-label="Key figures">
          <div class="stat">
            <span>Collected this month</span>
            <strong>$126,940</strong>
            <p class="cn-meta cn-m-0">+8.2% on August</p>
          </div>
          <div class="stat">
            <span>Outstanding</span>
            <strong>$13,422</strong>
            <p class="cn-meta cn-m-0">11 open invoices</p>
          </div>
          <div class="stat">
            <span>Past due</span>
            <strong>$5,806</strong>
            <p class="cn-meta cn-m-0">3 invoices</p>
          </div>
          <div class="stat">
            <span>Average days to pay</span>
            <strong>18</strong>
            <p class="cn-meta cn-m-0">3 faster than Q2</p>
          </div>
        </section>
      </Demo>

      <p class="cn-copy">
        A row of key figures often sits straight on the page, under the title
        and before any panel. <code class="cn-code-inline">.is-ruled</code>{" "}
        hangs each stat from a 2px <code class="cn-code-inline">--cn-stat-rule</code>,
        equal to <code class="cn-code-inline">--edge</code>, 1.92:1 on the mantle page, on its start side,
        with 16px between the rule and the label, so the row reads as one
        band without a panel around it. The rule follows the writing
        direction. Inside a panel, use the plain grid.
      </p>

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
        <code class="cn-code-inline">.is-lg</code> steps the figure up to 32px and
        colors it with <code class="cn-code-inline">var(--accent)</code>, mauve by
        default. When the number belongs to one item, such as a team, set that
        item's accent. Use one large stat per surface. On an accent card the
        figure stays text-colored, because the plate already shows the accent.
        Every figure is sans with <code class="cn-code-inline">tabular-nums</code>, so
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
        baseline. Stack rows in a <code class="cn-code-inline">.cn-divide</code> for
        hairlines between them; each row then gets 8px above and below. The
        rows need no card. Put the stack in a well or a panel body when it
        needs a frame.
      </p>

      <Demo title="A summary total" classes="cn-divide > stat is-inline · stat is-inline is-total">
        <div style="width:min(320px,100%)">
          <div class="cn-divide">
            <div class="stat is-inline">
              <span>Subtotal</span>
              <b>$1,097.35</b>
            </div>
            <div class="stat is-inline">
              <span>HST, 13%</span>
              <b>$142.65</b>
            </div>
          </div>
          <div class="stat is-inline is-total">
            <span>Total due</span>
            <b>$1,240.00</b>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        The row a list adds up to takes{" "}
        <code class="cn-code-inline">.is-total</code>. Put it after the{" "}
        <code class="cn-code-inline">.cn-divide</code> list, not inside it. Its
        label is the name role and its value the value role, 24px at 600, both
        in <code class="cn-code-inline">--cn-fg</code>, under an{" "}
        <code class="cn-code-inline">--edge</code> rule with 12px above and
        below the rule. It stays text-colored: only the hero value takes the
        accent.
      </p>

      <Props
        title="Stat classes"
        rows={[
          {
            name: ".stat",
            values: "tile",
            notes: "A 13px label <span> at 500 in --cn-fg-muted over a 24px tabular <strong>. No chrome of its own. Steps down to 18px at 520px.",
          },
          {
            name: ".stat.is-lg",
            values: "large tile",
            default: "--accent: var(--mauve)",
            notes: "32px figure in the accent. Text-colored inside an accent card, and with .cn-fg on its strong when the view's mauve primary shares the band. Steps down to 24px at 520px.",
          },
          {
            name: ".stat-grid",
            values: "wrapper around .stat tiles",
            default: "--stat-cols: 4",
            notes: "Equal columns, 16px gap. Two across at 760px and below; never one. In a .panel-body an unruled grid's stats take no padding of their own, so they line up with the header title.",
          },
          {
            name: ".stat-grid.is-ruled",
            values: "stats on the page ground",
            notes: "Each stat hangs from a 2px --cn-stat-rule (equal to --edge, 1.92:1 on the page; surface-2 under prefers-contrast: more) on its inline-start side, 16px in, with 4px block padding. For a figures band outside any panel.",
          },
          {
            name: ".stat.is-inline",
            values: "label and value row",
            notes: "Baseline-aligned, the label role. Label in --cn-fg-muted (subtext-0); value (b or strong) in --cn-fg-soft (subtext-1), tabular.",
          },
          {
            name: ".cn-divide > .stat.is-inline",
            values: "row stack",
            notes: "Hairline between rows, 8px block padding on each.",
          },
          {
            name: ".stat.is-inline.is-total",
            values: "summary total row",
            notes: "After the divided rows. Name-role label and value-role figure, both --cn-fg, under a 1px --edge rule with 12px above and below.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="stat-grid">
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
