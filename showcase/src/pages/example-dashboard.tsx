/* ── Example: billing dashboard ────────────────────────────────────────────
   A composed screen built only from package classes, no sc- chrome. It
   follows the SPEC's Composition section: regions 48px apart, in reading
   order. The title and its one primary, the key figures ruled on the page
   ground, the invoice table as the lead panel at cozy density, then the
   chart and the one tilted aside on the page grid, the chart first. A
   short panel stacks under the aside so the two columns end near the
   same line.                                                             */

import { useState } from "preact/hooks";
import type { JSX } from "preact";
import { tabsKeydown } from "../lib/roving";
import { Pager } from "../lib/pager";
import { DangerGlyph, WarningGlyph, SuccessGlyph, PendingGlyph } from "../lib/glyphs";

type Status = "paid" | "pending" | "due" | "overdue";

const STATUS: Record<Status, { label: string; tone: string; Glyph: () => JSX.Element }> = {
  paid: { label: "Paid", tone: "cn-tone-success", Glyph: SuccessGlyph },
  /* Blue, a cool tone, so a pending tag never sits beside the yellow
     due-soon tag in another warm hue. Due soon may sit above Overdue:
     status tags carry a word and a glyph, so the SPEC exempts them from
     the warm-family adjacency rule. */
  pending: { label: "Pending", tone: "cn-tone-info", Glyph: PendingGlyph },
  due: { label: "Due soon", tone: "cn-tone-warning", Glyph: WarningGlyph },
  overdue: { label: "Overdue", tone: "cn-tone-danger", Glyph: DangerGlyph },
};

interface Invoice {
  id: string;
  customer: string;
  team: string;
  issued: string;
  due: string;
  status: Status;
  amount: number;
}

const CUSTOMERS = ["Northwind", "Lumen Labs", "Harbor & Co", "Bluefin", "Kestrel Health", "Orchard Supply", "Tidewater", "Acme Operations"];
const TEAM_NAMES = ["Payments", "Analytics", "Messaging", "Storage", "Identity", "Support"];
const AMOUNTS = [1240, 96, 4820, 310, 2275, 18450, 640, 1180, 7200, 425, 3390, 960];

/* The screen is drawn as of the morning of Sep 28. */
const TODAY = Date.UTC(2026, 8, 28);
const DAY = 864e5;
const shortDate = (t: number) =>
  new Date(t).toLocaleDateString("en-US", { month: "short", day: "2-digit", timeZone: "UTC" });

/* 42 invoices, one a day, newest first, on 14-day terms. Recent ones are
   mostly open and older ones mostly paid; status follows from the due date,
   so every tab and page is stable. */
const INVOICES: Invoice[] = Array.from({ length: 42 }, (_, i) => {
  const issued = TODAY - i * DAY;
  const due = issued + 14 * DAY;
  const unpaid = i < 10 ? i % 3 !== 2 : i % 9 === 4;
  const status: Status = !unpaid ? "paid" : due < TODAY ? "overdue" : due - TODAY <= 5 * DAY ? "due" : "pending";
  return {
    id: `INV-${2083 - i}`,
    customer: CUSTOMERS[(i * 3) % CUSTOMERS.length],
    team: TEAM_NAMES[(i * 5) % TEAM_NAMES.length],
    issued: shortDate(issued),
    due: shortDate(due),
    status,
    amount: AMOUNTS[(i * 7) % AMOUNTS.length] + (i % 5) * 15,
  };
});

const OPEN = INVOICES.filter((inv) => inv.status !== "paid");
const LATE = INVOICES.filter((inv) => inv.status === "overdue");
const total = (list: Invoice[]) => list.reduce((sum, inv) => sum + inv.amount, 0);
const whole = (n: number) => `$${n.toLocaleString("en-US")}`;

const VIEWS = [
  { id: "all", label: "All", match: (_: Invoice) => true },
  { id: "open", label: "Open", match: (inv: Invoice) => inv.status !== "paid" },
  { id: "overdue", label: "Overdue", match: (inv: Invoice) => inv.status === "overdue" },
  { id: "paid", label: "Paid", match: (inv: Invoice) => inv.status === "paid" },
];

const PER_PAGE = 6;
const money = (n: number) => `$${n.toLocaleString("en-US", { minimumFractionDigits: 2 })}`;

/* Collected by payment method over four months, in thousands of dollars. */
const METHODS = ["Card", "Bank transfer", "Wallet"];
const COLLECTED = [
  { month: "Jun", values: [62.4, 38.1, 9.8] },
  { month: "Jul", values: [70.2, 41.5, 12.6] },
  { month: "Aug", values: [62.0, 43.1, 12.2] },
  { month: "Sep", values: [74.5, 39.3, 13.1] },
];
const CHART_MAX = 80;

function InvoiceTable() {
  const [view, setView] = useState(0);
  const [page, setPage] = useState(1);
  const rows = INVOICES.filter(VIEWS[view].match);
  const pages = Math.max(1, Math.ceil(rows.length / PER_PAGE));
  const shown = rows.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const first = rows.length ? (page - 1) * PER_PAGE + 1 : 0;

  function select(i: number) {
    setView(i);
    setPage(1);
  }

  return (
    <section class="panel is-lead" data-density="cozy" aria-labelledby="dash-invoices">
      <div class="panel-header">
        <h2 id="dash-invoices">Invoices</h2>
        <div class="band-actions">
          <button type="button" class="btn btn-secondary is-sm">Export CSV</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="tabs" role="tablist" aria-label="Invoice status" onKeyDown={(e) => tabsKeydown(e, select)}>
          {VIEWS.map((v, i) => (
            <button
              key={v.id}
              type="button"
              role="tab"
              id={`dash-tab-${v.id}`}
              aria-controls="dash-invoice-panel"
              aria-selected={i === view ? "true" : "false"}
              tabIndex={i === view ? 0 : -1}
              onClick={() => select(i)}
            >
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <div role="tabpanel" id="dash-invoice-panel" aria-labelledby={`dash-tab-${VIEWS[view].id}`}>
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Invoice</th>
              <th scope="col">Team</th>
              <th scope="col">Issued</th>
              <th scope="col">Due</th>
              <th scope="col">Status</th>
              <th scope="col" class="is-num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {shown.map((inv) => {
              const s = STATUS[inv.status];
              return (
                <tr key={inv.id}>
                  <td class="cell-name">
                    <strong>{inv.id}</strong>
                    <br />
                    <small>{inv.customer}</small>
                  </td>
                  <td data-label="Team">{inv.team}</td>
                  <td data-label="Issued">{inv.issued}</td>
                  <td data-label="Due">{inv.due}</td>
                  <td class="is-trail" data-label="Status">
                    <span class={`tag ${s.tone}`}>
                      <s.Glyph />
                      {s.label}
                    </span>
                  </td>
                  <td class="is-num is-trail" data-label="Amount">{money(inv.amount)}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div class="panel-footer">
        <span class="cn-meta">
          {first} to {Math.min(page * PER_PAGE, rows.length)} of {rows.length}
        </span>
        <Pager current={page} total={pages} label="Invoice pages" onPage={setPage} />
      </div>
    </section>
  );
}

export default function DashboardExample() {
  return (
    <div class="cn-stack cn-gap-48 page-enter">
      <header class="cn-row cn-between cn-top cn-wrap cn-gap-24">
        <div class="cn-stack cn-gap-12 cn-grow">
          <h1 class="cn-display is-sm">
            Billing, <em>September</em>
          </h1>
          <p class="cn-lede cn-m-0 cn-mt-12">
            {INVOICES.length} invoices from the last six weeks, across 6 teams.
            Collections settle nightly at 02:00 UTC, so these figures are from
            this morning's run.
          </p>
        </div>
        <button type="button" class="btn btn-primary">New invoice</button>
      </header>

      <section class="stat-grid is-ruled" aria-label="Key figures">
        <div class="stat">
          <span>Collected this month</span>
          <strong>$126,940</strong>
          <p class="cn-meta cn-m-0">+8.2% on August</p>
        </div>
        <div class="stat">
          <span>Outstanding</span>
          <strong>{whole(total(OPEN))}</strong>
          <p class="cn-meta cn-m-0">{OPEN.length} open invoices</p>
        </div>
        {/* The one figure that needs action carries the danger signal; the
            other three stay neutral. */}
        <div class="stat cn-tone-danger">
          <span>Past due</span>
          <strong>{whole(total(LATE))}</strong>
          <p class="cn-meta cn-m-0">
            <span class="tag cn-tone-danger">{LATE.length} overdue</span>
          </p>
        </div>
        <div class="stat">
          <span>Average days to pay</span>
          <strong>18</strong>
          <p class="cn-meta cn-m-0">3 days faster than Q2</p>
        </div>
      </section>

      <InvoiceTable />

      <div class="cn-grid-12">
        <section class="panel cn-span-7" aria-labelledby="dash-chart">
          <div class="panel-header">
            <h2 id="dash-chart">Collected by method</h2>
            <span class="chip">Last 4 months</span>
          </div>
          <figure class="panel-body cn-stack cn-gap-16 cn-m-0">
            <figcaption class="cn-sr-only">Collected by payment method, in thousands of dollars</figcaption>
            <ul class="legend">
              {METHODS.map((m, i) => (
                <li key={m} class="legend-item" style={`--series:var(--cn-series-${i + 1})`}>
                  {m}
                </li>
              ))}
            </ul>
            <div class="bar-chart">
              {COLLECTED.map((row) => [
                <span key={`${row.month}-m`}>{row.month}</span>,
                <div key={`${row.month}-b`} class="bar-group">
                  {row.values.map((v, i) => (
                    <div
                      key={METHODS[i]}
                      class="bar"
                      style={`--value:${((v / CHART_MAX) * 100).toFixed(1)}%;--series:var(--cn-series-${i + 1})`}
                    >
                      ${v.toFixed(1)}k
                      <span class="cn-sr-only"> {METHODS[i]}</span>
                    </div>
                  ))}
                </div>,
              ])}
            </div>
          </figure>
        </section>
        <div class="cn-stack cn-gap-24 cn-span-5">
        <aside class="panel is-tilted" aria-labelledby="dash-summary">
          <div class="panel-body cn-stack cn-gap-12">
            <h2 id="dash-summary" class="cn-title cn-m-0">Where September stands</h2>
            <p class="cn-copy cn-m-0">Ahead of August, mostly on card.</p>
            <div class="cn-divide">
              <div class="stat is-inline cn-py-8">
                <span>Paid in full</span>
                <b>{INVOICES.filter((inv) => inv.status === "paid").length} of {INVOICES.length}</b>
              </div>
              <div class="stat is-inline cn-py-8">
                <span>Disputes open</span>
                <b>None</b>
              </div>
              <div class="stat is-inline cn-py-8">
                <span>Next payout</span>
                <b>Oct 01</b>
              </div>
            </div>
            <a class="btn-text" href="#" onClick={(e) => e.preventDefault()}>
              Read the month-end report
            </a>
          </div>
        </aside>
        <section class="panel" aria-labelledby="dash-refunds">
          <div class="panel-body cn-stack cn-gap-16">
            <h2 id="dash-refunds" class="cn-title cn-m-0">Refunds and failures</h2>
            <div class="stat-grid" style="--stat-cols:2">
              <div class="stat">
                <span>Refunded</span>
                <strong>$1,120</strong>
              </div>
              <div class="stat">
                <span>Failed payments</span>
                <strong>3</strong>
              </div>
            </div>
          </div>
        </section>
        </div>
      </div>
    </div>
  );
}
