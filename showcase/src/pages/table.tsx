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
          <th scope="col"><span class="cn-sr-only">Select</span></th>
          <th scope="col" aria-sort={ariaSort("name")}>
            <button type="button" onClick={() => sortBy("name")}>Customer</button>
          </th>
          <th scope="col">Plan</th>
          <th scope="col">Status</th>
          <th scope="col" class="is-num" aria-sort={ariaSort("amount")}>
            <button type="button" onClick={() => sortBy("amount")}>Amount</button>
          </th>
          <th scope="col">Renews</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => {
          const on = selected.includes(r.name);
          const Glyph = TONE_GLYPH[r.tone];
          return (
            <tr key={r.email} aria-selected={on ? "true" : undefined}>
              <td class="cell-select">
                <input type="checkbox" class="checkbox" checked={on} onChange={() => toggle(r.name)} aria-label={`Select ${r.name}`} />
              </td>
              <td class="cell-name">
                <strong>{r.name}</strong>
                <small>{r.email}</small>
              </td>
              <td data-label="Plan">{r.plan}</td>
              <td class="is-trail" data-label="Status">
                <span class={`tag cn-tone-${r.tone}`}>
                  <Glyph />
                  {r.status}
                </span>
              </td>
              <td class="is-num is-trail" data-label="Amount"><strong>{money(r.amount)}</strong></td>
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
      <Demo
        title="Sortable, selectable"
        classes='data-table · th[aria-sort] > button · tr[aria-selected="true"] · .is-num'
        why="Sorting, selection, cell weights and numeric columns"
      >
        <div style="width:100%">
          <SubscriptionsTable />
        </div>
      </Demo>

      <p class="cn-copy">
        A sortable column is a <code class="cn-code-inline">button</code> inside{" "}
        <code class="cn-code-inline">th[aria-sort]</code>. The chevron shows the
        direction and hides while the column is unsorted. The button gets the
        focus ring, and screen readers announce the sort from the attribute.
        A selected row takes <code class="cn-code-inline">aria-selected="true"</code>:
        the engaged wash with a deeper press. Hovering a row presses it in, a
        dark top edge drawn as a gradient on each cell so the row has no
        seams, with no lit edge below, on mauve at{" "}
        <code class="cn-code-inline">--cn-step-row</code> (16%), level with
        the ghost hover, a step past the open accordion and a step under a
        selected row.
      </p>

      <p class="cn-copy">
        <code class="cn-code-inline">.cell-name</code> marks the name column:{" "}
        <code class="cn-code-inline">&lt;strong&gt;</code> is the primary line at 600,{" "}
        <code class="cn-code-inline">&lt;small&gt;</code> the secondary under it. Each
        is a block, so the cell needs no <code class="cn-code-inline">&lt;br&gt;</code>. Other cells
        are 400 at <code class="cn-code-inline">--cell-font-size</code>, 14px by
        default and 13px compact, and the head follows the same knob at 500. Wrap a key figure, such as an amount, in{" "}
        <code class="cn-code-inline">&lt;strong&gt;</code> and it takes 500 in{" "}
        <code class="cn-code-inline">--cn-fg</code>, so the number a reader
        scans for is marked by ink and right alignment and the name stays
        the row's one 600. Status goes in a{" "}
        <code class="cn-code-inline">.tag</code> whose word states it, such as
        "Past due". Past due and trial-ending tags are danger and warning, so
        they lead with a glyph; the column gives every tag one, so the words
        line up.
      </p>

      <p class="cn-copy">
        Put <code class="cn-code-inline">.is-num</code> on the{" "}
        <code class="cn-code-inline">th</code> and every{" "}
        <code class="cn-code-inline">td</code> of a numeric column, like Amount
        above. Figures align on the right edge, so digits of the same place
        stack. A sortable numeric header reverses its button, so the label
        sits flush right with the figures and the chevron moves to its inner
        side.
      </p>

      <h2 class="cn-title">Phone mode</h2>
      <p class="cn-copy">
        At 760px and below the header row drops and each row becomes a stack
        of label and value lines, split by hairlines. Give every data cell a{" "}
        <code class="cn-code-inline">data-label</code>; it becomes the line's label.
        Labels hold a 120px column and values flow beside them. A cell without
        the attribute, such as the name, spans the row. A{" "}
        <code class="cn-code-inline">td.cell-select</code> checkbox rides at the row's
        end. Mark the cells a reader scans for with{" "}
        <code class="cn-code-inline">td.is-trail</code>, such as the amount and
        the status: they leave the stack and ride beside the name, the last
        one on the title line and the one before it under it, so the figure
        is not buried at the bottom of the card. Narrow this window to see
        the table above switch.
      </p>

      <Demo
        title="Opting out: a scrolling table"
        classes="table-scroll > data-table.is-sticky-head"
        why="When a table should scroll instead of stacking"
      >
        <div class="panel" style="width:100%">
          <div class="table-scroll" style="max-height:240px" tabIndex={0} role="region" aria-label="Events">
            <table class="data-table is-sticky-head">
              <thead>
                <tr>
                  <th scope="col">Time</th>
                  <th scope="col">Event</th>
                  <th scope="col">Subject</th>
                  <th scope="col" class="is-num">Amount</th>
                </tr>
              </thead>
              <tbody>
                {EVENTS.map(([time, event, subject, amount]) => (
                  <tr key={time}>
                    <td><code class="cn-code-inline">{time}</code></td>
                    <td><code class="cn-code-inline">{event}</code></td>
                    <td>{subject}</td>
                    <td class="is-num">{amount === "·" ? amount : <strong>{amount}</strong>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Inside <code class="cn-code-inline">.table-scroll</code>, a table with no{" "}
        <code class="cn-code-inline">data-label</code> cells stays a table at every
        width and scrolls sideways inside its wrapper. A labeled table still
        becomes rows. Use it
        for logs and wide numeric grids, where comparing down a column
        matters more than reading one row. <code class="cn-code-inline">.is-sticky-head</code>{" "}
        pins the header to the top of the nearest scroll container. The
        wrapper only scrolls vertically when it has a height limit, so give
        it a <code class="cn-code-inline">max-height</code>. The header rule is an
        inset shadow, because a collapsed border would scroll away.
      </p>

      <Demo
        title="Inline edit: a field in a cell"
        classes='table-scroll > data-table > td > input[aria-labelledby]'
        why="How a cell field gets its name and its bounds"
      >
        <div class="panel" style="width:min(560px,100%)">
          <div class="table-scroll">
            <table class="data-table">
              <thead>
                <tr>
                  <th scope="col" id="seat-team">Team</th>
                  <th scope="col" id="seat-count" class="is-num">Seats</th>
                  <th scope="col" id="seat-owner">Billing contact</th>
                </tr>
              </thead>
              <tbody>
                {[["Payments", "14", "maya@example.com"], ["Support", "9", "jonah@example.com"], ["Identity", "6", ""]].map(([team, seats, owner], i) => (
                  <tr key={team}>
                    <td id={`seat-row-${i}`}>{team}</td>
                    <td class="is-num">
                      <input class="input" type="number" inputMode="numeric" value={seats} aria-labelledby={`seat-count seat-row-${i}`} style="max-width:6rem;text-align:end" />
                    </td>
                    <td>
                      <input class="input" type="email" value={owner} placeholder="name@example.com" aria-labelledby={`seat-owner seat-row-${i}`} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        An <code class="cn-code-inline">.input</code> in a cell is the inline
        edit: the small control height and the soft carve, so the row keeps
        its rhythm. A cell field has no label above it, so it takes its name
        from the column header and the row through{" "}
        <code class="cn-code-inline">aria-labelledby</code>, and like any
        resting field it keeps a quiet even hairline, so an empty one still
        shows where it is. Hover and focus ring it like any field.
      </p>

      <Demo title="Ranked rows" classes="ranked-row / panel > ranked-row:last-child" why="What the mark's number and color mean">
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
        <code class="cn-code-inline">.ranked-row</code> is the ordered-list line: a
        rank mark, a name, a trailing value. The number is the rank; the
        mark's color is the team's own accent, so it does not change when the
        ranking does. A ranked row ending a panel keeps its hover fill inside
        the rounded corners.
      </p>

      <Props
        title="Table classes"
        rows={[
          { name: ".data-table", values: "on <table>", contrast: "Header rule 1.85:1 on a panel · row rules 1.3:1", notes: "Scopes all table styling. Sans tabular body at 400 and --cell-font-size (14px, 13px compact), a --cn-surface-band header at 500 and the same size over an --edge rule, surface-0 rules between rows. A tag, a chip, a small button or a text button in a cell follows --cell-font-size. Cell padding is --cell-pad." },
          { name: "td strong", values: "a key figure", notes: "An amount or another figure a reader scans for: 500 in --cn-fg, one weight step and one ink stop over the 400 cells. The .cell-name is the row's one 600." },
          { name: ".is-num", values: "on th and td", notes: "Right-aligns a numeric column. On a sortable header the button reverses, so the label meets the right edge and the chevron sits on its inner side." },
          { name: ".cell-name", values: "on <td>", notes: "strong is the 600 primary line; small is the quiet secondary line under it. Both are blocks, so no <br>." },
          { name: "th[aria-sort] > button", values: "ascending / descending / none", notes: "Sort control with a direction chevron and a focus ring. The chevron hides while unsorted." },
          { name: 'tr[aria-selected="true"]', values: "state", notes: "The wash and a deeper press. Pair it with a checkbox or a grid role." },
          { name: "tbody tr:hover", values: "state", contrast: "Fill 1.39:1 on a panel, level with the 1.40:1 hover, past the open accordion's 1.08:1, 1.10:1 under a selected row · cell text 6.7:1 and muted text 5.3:1 on it, over the 4.5:1 a hovered row holds; the 7:1 and 5.5:1 floors are for text at rest", notes: "The row presses in: a dark top edge on each cell, no lit bottom edge, and mauve at --cn-step-row (16%) into base, a step under a selected row." },
          { name: "td .input", values: "inline edit", notes: "--control-h-sm, 12px inline padding, the control radius and --neu-inset-soft. At rest it takes --cn-field-ring over the soft carve, like any field. Name it with aria-labelledby pointing at the column header and the row's name cell." },
          { name: "td[data-label]", values: "attribute", notes: "The line's label in phone mode at 760px and below." },
          { name: "td.cell-select", values: "on <td>", notes: "A row-select checkbox cell. In phone mode it floats to the row's end instead of taking a line." },
          { name: "td.is-trail", values: "on <td>", notes: "Phone mode only: the cell leaves the label stack and rides beside the name. The last trailing cell sits on the title line, the one before it under it. Keep its data-label for the desktop header." },
          { name: ".table-scroll", values: "wrapper", notes: "Opts a table with no data-label cells out of phone mode. The table scrolls sideways inside it. Panel corner rules reach through it." },
          { name: ".data-table.is-sticky-head", values: "modifier", notes: "Header pinned to the top of the scroll container, ruled with an inset shadow. The wrapper needs a max-height to scroll vertically." },
          { name: ".ranked-row", values: "mark + strong + b", notes: "Flex row, hairline divider, same hover press. The .mark shrinks to a 22px key at 14px. b right-aligns the value." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<table class="data-table">
  <thead>
    <tr>
      <th scope="col" aria-sort="ascending"><button type="button">Customer</button></th>
      <th scope="col">Status</th>
      <th scope="col" class="is-num" aria-sort="none"><button type="button">Amount</button></th>
    </tr>
  </thead>
  <tbody>
    <tr aria-selected="true">
      <td class="cell-name">
        <strong>Maya Okafor</strong>
        <small>maya@example.com</small>
      </td>
      <td data-label="Status"><span class="tag cn-tone-success">Active</span></td>
      <td class="is-num" data-label="Amount">$1,240.00</td>
    </tr>
    <tr>
      <td class="cell-name"><strong>Theo Lindqvist</strong><small>theo@example.com</small></td>
      <!-- danger and warning tags lead with a glyph -->
      <td data-label="Status">
        <span class="tag cn-tone-danger"><svg aria-hidden="true">…</svg>Past due</span>
      </td>
      <td class="is-num" data-label="Amount">$24.00</td>
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
