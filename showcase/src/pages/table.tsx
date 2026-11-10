import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";
import { TONE_GLYPH } from "../lib/glyphs";

interface Row {
  name: string;
  email: string;
  plan: string;
  /* A status .cn-tone-*, so the tag takes its status ladder; its glyph
     comes from TONE_GLYPH. */
  tone: "success" | "warning" | "danger";
  status: string;
  amount: number;
  renews: string;
}

const ROWS: Row[] = [
  { name: "Maya Okafor", email: "maya@example.com", plan: "Enterprise", tone: "success", status: "Active", amount: 1240, renews: "Sep 01" },
  { name: "Jonah Reyes", email: "jonah@example.com", plan: "Pro", tone: "success", status: "Active", amount: 96, renews: "Sep 04" },
  { name: "Priya Raman", email: "priya@example.com", plan: "Pro", tone: "warning", status: "Trial ends", amount: 0, renews: "Sep 12" },
  { name: "Theo Lindqvist", email: "theo@example.com", plan: "Starter", tone: "danger", status: "Past due", amount: 24, renews: "Aug 19" },
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

/* Sortable table. aria-sort is the style hook. */
function SubscriptionsTable() {
  const [sort, setSort] = useState<{ key: SortKey; dir: Dir }>({ key: "amount", dir: "descending" });

  const rows = [...ROWS].sort((a, b) => {
    const d = sort.key === "amount" ? a.amount - b.amount : a.name.localeCompare(b.name);
    return sort.dir === "ascending" ? d : -d;
  });
  const sortBy = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === "ascending" ? "descending" : "ascending" }));
  const ariaSort = (key: SortKey) => (sort.key === key ? sort.dir : "none");

  return (
    <table class="data-table">
      <thead>
        <tr>
          <th scope="col" aria-sort={ariaSort("name")}>
            <button type="button" onClick={() => sortBy("name")}>Customer</button>
          </th>
          <th scope="col">Plan</th>
          <th scope="col">Status</th>
          <th scope="col" aria-sort={ariaSort("amount")}>
            <button type="button" onClick={() => sortBy("amount")}>Amount</button>
          </th>
          <th scope="col">Renews</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const Glyph = TONE_GLYPH[r.tone];
          return (
            <tr key={r.email}>
              <td class="cell-name">
                <strong>{r.name}</strong>
                <small>{r.email}</small>
              </td>
              <td data-label="Plan">{r.plan}</td>
              <td data-label="Status">
                <span class={`tag cn-tone-${r.tone}`}>
                  <Glyph />
                  {r.status}
                </span>
              </td>
              <td data-label="Amount"><strong>{money(r.amount)}</strong></td>
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
      lede="An opt-in class on a plain <table>. Bare tables stay untouched."
    >
      <Demo
        title="Sortable"
        classes="data-table · th[aria-sort] > button · td.cell-name · td[data-label]"
      >
        <div style="width:100%">
          <SubscriptionsTable />
        </div>
      </Demo>

      <p class="cn-copy">
        A sortable column is a <code class="cn-code-inline">button</code> inside <code class="cn-code-inline">th[aria-sort]</code>. Set <code class="cn-code-inline">aria-sort</code> to <code class="cn-code-inline">ascending</code>, <code class="cn-code-inline">descending</code> or <code class="cn-code-inline">none</code>.
      </p>

      <p class="cn-copy">
        At 760px and below each row becomes a stack of label and value lines. Give every data cell a <code class="cn-code-inline">data-label</code>. A cell without one, such as the name, spans the row.
      </p>

      <Demo
        title="A scrolling table"
        classes="table-scroll > data-table.is-sticky-head"
      >
        <div class="panel" style="width:100%">
          <div class="table-scroll" style="max-height:240px" tabIndex={0} role="region" aria-label="Events">
            <table class="data-table is-sticky-head">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Event</th>
                  <th scope="col">Subject</th>
                  <th scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.map(([time, event, subject, amount]) => (
                  <tr key={time}>
                    <td><code class="cn-code-inline">{time}</code></td>
                    <td><code class="cn-code-inline">{event}</code></td>
                    <td>{subject}</td>
                    <td>{amount === "·" ? amount : <strong>{amount}</strong>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Inside <code class="cn-code-inline">.table-scroll</code>, a table with no <code class="cn-code-inline">data-label</code> cells stays a table at every width and scrolls sideways. Give the wrapper a <code class="cn-code-inline">max-height</code> so the sticky head can pin.
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

      <Props
        title="Classes"
        rows={[
          { name: ".data-table", values: "on <table>", notes: "Scopes all table styling." },
          { name: ".cell-name", values: "on <td>", notes: "strong is the primary line, small the line under it." },
          { name: "td strong", values: "a key figure", notes: "Heavier, in the full text color." },
          { name: "th[aria-sort] > button", values: "ascending / descending / none", notes: "A sort control with a direction chevron." },
          { name: "td[data-label]", values: "attribute", notes: "The line label at 760px and below." },
          { name: ".table-scroll", values: "wrapper", notes: "Keeps a table with no data-label cells a table on phones." },
          { name: ".data-table.is-sticky-head", values: "modifier", notes: "Pins the header. The wrapper needs a max-height." },
          { name: ".ranked-row", values: "mark + strong + b", notes: "A rank mark, a name and a trailing value." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<table class="data-table">
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending"><button type="button">Customer</button></th>
      <th scope="col">Status</th>
      <th scope="col" aria-sort="none"><button type="button">Amount</button></th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td class="cell-name">
        <strong>Maya Okafor</strong>
        <small>maya@example.com</small>
      </td>
      <td data-label="Status">
        <span class="tag cn-tone-success"><svg aria-hidden="true">…</svg>Active</span>
      </td>
      <td data-label="Amount"><strong>$1,240.00</strong></td>
    </tr>
  </tbody>
</table>

<!-- no data-label cells: stays a table on phones and scrolls.
     max-height lets the sticky head pin. -->
<div class="table-scroll" style="max-height: 24rem" tabindex="0" role="region" aria-label="Invoices">
  <table class="data-table is-sticky-head">…</table>
</div>`}
      />
    </Doc>
  );
}
