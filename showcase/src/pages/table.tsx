import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

interface Row {
  name: string;
  email: string;
  plan: string;
  tone: string;
  status: string;
  amount: number;
  renews: string;
}

const ROWS: Row[] = [
  { name: "Maya Okafor", email: "maya@example.com", plan: "Enterprise", tone: "cn-tone-green", status: "Active", amount: 1240, renews: "Sep 01" },
  { name: "Jonah Reyes", email: "jonah@example.com", plan: "Pro", tone: "cn-tone-green", status: "Active", amount: 96, renews: "Sep 04" },
  { name: "Priya Raman", email: "priya@example.com", plan: "Pro", tone: "cn-tone-yellow", status: "Trial", amount: 0, renews: "Sep 12" },
  { name: "Theo Lindqvist", email: "theo@example.com", plan: "Starter", tone: "cn-tone-red", status: "Past due", amount: 24, renews: "Aug 19" },
];

const EVENTS = [
  ["02:14:07", "invoice.paid", "#1042", "$1,240.00"],
  ["02:13:51", "seat.added", "Support", "·"],
  ["02:12:30", "invoice.issued", "#1043", "$96.00"],
  ["02:11:02", "payout.sent", "po_81f2", "$8,410.00"],
  ["02:09:47", "invoice.overdue", "#1038", "$24.00"],
  ["02:08:15", "plan.changed", "Analytics", "·"],
  ["02:06:40", "invoice.paid", "#1039", "$1,180.00"],
  ["02:05:12", "seat.removed", "Storage", "·"],
];

const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

type SortKey = "name" | "amount";
type Dir = "ascending" | "descending";

/* Sortable, selectable table. aria-sort and aria-selected are the style hooks. */
function SubscriptionsTable() {
  const [sort, setSort] = useState<{ key: SortKey; dir: Dir }>({ key: "amount", dir: "descending" });
  const [selected, setSelected] = useState<string[]>(["Jonah Reyes"]);

  const rows = [...ROWS].sort((a, b) => {
    const d = sort.key === "amount" ? a.amount - b.amount : a.name.localeCompare(b.name);
    return sort.dir === "ascending" ? d : -d;
  });
  const sortBy = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === "ascending" ? "descending" : "ascending" }));
  const ariaSort = (key: SortKey) => (sort.key === key ? sort.dir : "none");
  const toggle = (name: string) =>
    setSelected((s) => (s.includes(name) ? s.filter((n) => n !== name) : [...s, name]));

  return (
    <table class="data-table">
      <thead>
        <tr>
          <th><span class="cn-sr-only">Select</span></th>
          <th aria-sort={ariaSort("name")}>
            <button type="button" onClick={() => sortBy("name")}>Customer</button>
          </th>
          <th>Plan</th>
          <th>Status</th>
          <th aria-sort={ariaSort("amount")}>
            <button type="button" onClick={() => sortBy("amount")}>Amount</button>
          </th>
          <th>Renews</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const on = selected.includes(r.name);
          return (
            <tr key={r.email} aria-selected={on ? "true" : undefined}>
              <td class="cell-select">
                <input type="checkbox" class="checkbox" checked={on} onChange={() => toggle(r.name)} aria-label={`Select ${r.name}`} />
              </td>
              <td class="cell-name">
                <strong>{r.name}</strong>
                <br />
                <small>{r.email}</small>
              </td>
              <td data-label="Plan">{r.plan}</td>
              <td data-label="Status">
                <span class={`tag ${r.tone}`}>{r.status}</span>
              </td>
              <td data-label="Amount">{money(r.amount)}</td>
              <td data-label="Renews">{r.renews}</td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default function TablePage() {
  return (
    <Doc
      title="Table"
      lede="An opt-in class on a plain <table>. The recipe scopes all table styling, so bare tables elsewhere stay untouched."
    >
      <Demo title="Sortable, selectable" classes='data-table · th[aria-sort] > button · tr[aria-selected="true"]'>
        <div style="width:100%">
          <SubscriptionsTable />
        </div>
      </Demo>

      <p class="cn-copy">
        A sortable column is a <code class="cn-code">button</code> inside{" "}
        <code class="cn-code">th[aria-sort]</code>. The chevron shows the
        direction and hides while the column is unsorted. The button gets the
        focus ring, and screen readers announce the sort from the attribute.
        A selected row takes <code class="cn-code">aria-selected="true"</code>:
        the mauve wash with a deeper press. Hovering a row presses it in, drawn
        as a gradient on each cell so the row has no seams.
      </p>

      <p class="cn-copy">
        <code class="cn-code">.cell-name</code> marks the name column:{" "}
        <code class="cn-code">&lt;strong&gt;</code> is the primary line at 600,{" "}
        <code class="cn-code">&lt;small&gt;</code> the secondary. Other cells
        are 500. Status goes in a <code class="cn-code">.tag</code>.
      </p>

      <h2 class="cn-title">Phone mode</h2>
      <p class="cn-copy">
        At 760px and below the header row drops and each row becomes a stack
        of label and value lines, split by hairlines. Give every data cell a{" "}
        <code class="cn-code">data-label</code>; it becomes the line's label.
        Labels hold a 120px column and values flow beside them. A cell without
        the attribute, such as the name, spans the row. A{" "}
        <code class="cn-code">td.cell-select</code> checkbox rides at the row's
        end. Narrow this window to see the table above switch.
      </p>

      <Demo title="Opting out: a scrolling table" classes="table-scroll > data-table.is-sticky-head">
        <div class="panel" style="width:100%">
          <div class="table-scroll" style="max-height:240px">
            <table class="data-table is-sticky-head">
              <thead>
                <tr>
                  <th>Time</th>
                  <th>Event</th>
                  <th>Subject</th>
                  <th>Amount</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.map(([time, event, subject, amount]) => (
                  <tr key={time}>
                    <td><code class="cn-code-inline">{time}</code></td>
                    <td><code class="cn-code-inline">{event}</code></td>
                    <td>{subject}</td>
                    <td>{amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Inside <code class="cn-code">.table-scroll</code>, a table with no{" "}
        <code class="cn-code">data-label</code> cells stays a table at every
        width and scrolls sideways inside its wrapper. A labeled table still
        becomes rows. Use it
        for logs and wide numeric grids, where comparing down a column
        matters more than reading one row. <code class="cn-code">.is-sticky-head</code>{" "}
        pins the header to the top of the nearest scroll container. The
        wrapper only scrolls vertically when it has a height limit, so give
        it a <code class="cn-code">max-height</code>. The header rule is an
        inset shadow, because a collapsed border would scroll away.
      </p>

      <Demo title="Ranked rows" classes="ranked-row / panel > ranked-row:last-child">
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-header">
            <h2>Top teams</h2>
            <span class="chip">Q3</span>
          </div>
          {TEAMS.slice(0, 4).map((team, i) => (
            <div class="ranked-row" key={team.name}>
              <span class="mark" style={accentStyle(team.accent)}>
                {i + 1}
              </span>
              <strong>{team.name}</strong>
              <b>{team.revenue}</b>
            </div>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.ranked-row</code> is the ordered-list line: a
        rank mark, a name, a trailing value. The number is the rank; the
        mark's color is the team's own accent, so it does not change when the
        ranking does. A ranked row ending a panel keeps its hover fill inside
        the rounded corners.
      </p>

      <Props
        title="Table classes"
        rows={[
          { name: ".data-table", values: "on <table>", notes: "Scopes all table styling. Sans tabular body at 500, recessed header, hairline rows. Cell padding is --cell-pad." },
          { name: ".cell-name", values: "on <td>", notes: "strong is the 600 primary line; small is the quiet secondary line." },
          { name: "th[aria-sort] > button", values: "ascending / descending / none", notes: "Sort control with a direction chevron and a focus ring. The chevron hides while unsorted." },
          { name: 'tr[aria-selected="true"]', values: "state", notes: "The wash and a deeper press. Pair it with a checkbox or a grid role." },
          { name: "tbody tr:hover", values: "state", notes: "The row presses in: a gradient edge on each cell and a 6% mauve wash." },
          { name: "td[data-label]", values: "attribute", notes: "The line's label in phone mode at 760px and below." },
          { name: "td.cell-select", values: "on <td>", notes: "A row-select checkbox cell. In phone mode it floats to the row's end instead of taking a line." },
          { name: ".table-scroll", values: "wrapper", notes: "Opts a table with no data-label cells out of phone mode. The table scrolls sideways inside it. Panel corner rules reach through it." },
          { name: ".data-table.is-sticky-head", values: "modifier", notes: "Header pinned to the top of the scroll container, ruled with an inset shadow. The wrapper needs a max-height to scroll vertically." },
          { name: ".ranked-row", values: "mark + strong + b", notes: "Flex row, hairline divider, same hover press. b right-aligns the value." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<table class="data-table">
  <thead>
    <tr>
      <th aria-sort="ascending"><button type="button">Customer</button></th>
      <th>Status</th>
      <th aria-sort="none"><button type="button">Amount</button></th>
    </tr>
  </thead>
  <tbody>
    <tr aria-selected="true">
      <td class="cell-name">
        <strong>Maya Okafor</strong><br />
        <small>maya@example.com</small>
      </td>
      <td data-label="Status"><span class="tag cn-tone-green">Active</span></td>
      <td data-label="Amount">$1,240.00</td>
    </tr>
  </tbody>
</table>

<!-- no data-label cells: stays a table on phones and scrolls.
     max-height lets the sticky head pin. -->
<div class="table-scroll" style="max-height: 24rem">
  <table class="data-table is-sticky-head">…</table>
</div>`}
      />
    </Doc>
  );
}
