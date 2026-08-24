import { Doc, Demo, Props, CodeBlock } from "../lib/doc.jsx";

const ROWS = [
  {
    name: "Maya Okafor",
    email: "maya@example.com",
    plan: "Enterprise",
    tone: "cn-tone-green",
    status: "Active",
    amount: "$1,240.00",
    renews: "Sep 01",
  },
  {
    name: "Jonah Reyes",
    email: "jonah@example.com",
    plan: "Pro",
    tone: "cn-tone-green",
    status: "Active",
    amount: "$96.00",
    renews: "Sep 04",
  },
  {
    name: "Priya Raman",
    email: "priya@example.com",
    plan: "Pro",
    tone: "cn-tone-yellow",
    status: "Trial",
    amount: "$0.00",
    renews: "Sep 12",
  },
  {
    name: "Theo Lindqvist",
    email: "theo@example.com",
    plan: "Starter",
    tone: "cn-tone-red",
    status: "Past due",
    amount: "$24.00",
    renews: "Aug 19",
  },
];

export default function TablePage() {
  return (
    <Doc
      title="Table"
      lede="An opt-in class on a plain <table> — the recipe scopes every bit of table styling, so bare tables elsewhere stay untouched. Sans throughout, tabular numerals, a mantle header band, and rows that press in on hover."
    >
      <Demo title="Subscriptions" classes="table-neu / cell-name / td[data-label]">
        <div style="width:100%;overflow-x:auto">
          <table class="table-neu">
            <thead>
              <tr>
                <th>Customer</th>
                <th>Plan</th>
                <th>Status</th>
                <th>Amount</th>
                <th>Renews</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.email}>
                  <td data-label="Customer" class="cell-name">
                    <strong>{r.name}</strong>
                    <br />
                    <small>{r.email}</small>
                  </td>
                  <td data-label="Plan">{r.plan}</td>
                  <td data-label="Status">
                    <span class={`chip-tone ${r.tone}`}>{r.status}</span>
                  </td>
                  <td data-label="Amount">{r.amount}</td>
                  <td data-label="Renews">{r.renews}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.cell-name</code> marks the emphasized column:
        a full-strength <code class="cn-code">&lt;strong&gt;</code> primary
        line over a quiet <code class="cn-code">&lt;small&gt;</code> secondary
        line. Status tags are ordinary{" "}
        <code class="cn-code">.chip-tone</code> chips keyed by the{" "}
        <code class="cn-code">.cn-tone-*</code> setters.
      </p>

      <Demo title="Filling a panel" classes="panel > table-neu">
        <div class="panel" style="width:min(560px,100%)">
          <table class="table-neu">
            <thead>
              <tr>
                <th>Invoice</th>
                <th>Amount</th>
                <th>Issued</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td data-label="Invoice" class="cell-name">
                  <strong>#1042</strong>
                </td>
                <td data-label="Amount">$1,240.00</td>
                <td data-label="Issued">Aug 01</td>
              </tr>
              <tr>
                <td data-label="Invoice" class="cell-name">
                  <strong>#1041</strong>
                </td>
                <td data-label="Amount">$1,180.00</td>
                <td data-label="Issued">Jul 01</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Demo>

      <p class="cn-copy">
        When a table is a panel's first child, the header band's outer corners
        follow the panel radius automatically — the same band-corner contract
        as panel headings, with no overflow clipping involved.
      </p>

      <p class="cn-copy">
        <b class="cn-text-text">Mobile collapse.</b> Give every data cell a{" "}
        <code class="cn-code">data-label</code> attribute. At ≤760px the header
        row drops, each row becomes a mantle card on a three-column grid, and
        each cell grows its own micro-label from the attribute. Cells without
        the attribute still stack, but unlabeled — the attribute is the
        contract. Resize this page to watch it happen.
      </p>

      <Props
        title="Table classes"
        rows={[
          {
            name: ".table-neu",
            values: "on <table>",
            notes:
              "Scopes all table styling. Sans + tabular-nums body, mantle-mix header, hairline row separators.",
          },
          {
            name: "tbody tr:hover",
            values: "state",
            notes: "Row presses in: mauve 5% wash + soft inset shadow.",
          },
          {
            name: ".cell-name",
            values: "on <td>",
            notes: "strong = full-strength primary line; small = quiet secondary line.",
          },
          {
            name: "td[data-label]",
            values: "attribute contract",
            notes: "Becomes the cell's micro-label in the ≤760px card collapse.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<table class="table-neu">
  <thead>
    <tr><th>Customer</th><th>Status</th><th>Amount</th></tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Customer" class="cell-name">
        <strong>Maya Okafor</strong><br />
        <small>maya@example.com</small>
      </td>
      <td data-label="Status">
        <span class="chip-tone cn-tone-green">Active</span>
      </td>
      <td data-label="Amount">$1,240.00</td>
    </tr>
  </tbody>
</table>`}
      />
    </Doc>
  );
}
