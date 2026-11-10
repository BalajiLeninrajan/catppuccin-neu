/* Example: billing dashboard. A screen built only from package classes:
   one primary, four stats, the invoice table and one tilted aside. */

import { useState } from "preact/hooks";
import type { JSX } from "preact";
import { DangerGlyph, WarningGlyph, SuccessGlyph, PendingGlyph } from "../lib/glyphs";

type Status = "paid" | "pending" | "due" | "overdue";

const STATUS: Record<Status, { label: string; tone: string; Glyph: () => JSX.Element }> = {
  paid: { label: "Paid", tone: "cn-tone-green", Glyph: SuccessGlyph },
  pending: { label: "Pending", tone: "", Glyph: PendingGlyph },
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

/* 42 invoices, one a day, newest first, on 14-day terms. Status follows
   from the due date. One recent invoice is on 3-day terms and unpaid, so
   the first page holds an Overdue row. */
const SHORT_TERMS = 4;
const INVOICES: Invoice[] = Array.from({ length: 42 }, (_, i) => {
  const issued = TODAY - i * DAY;
  const due = issued + (i === SHORT_TERMS ? 3 : 14) * DAY;
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
    <section class="panel" aria-labelledby="dash-invoices">
      <div class="panel-header">
        <h2 id="dash-invoices">Invoices</h2>
        <div class="band-actions">
          <button type="button" class="btn btn-secondary is-sm">Export CSV</button>
        </div>
      </div>
      <div class="panel-body">
        <div class="segmented cn-fit" role="group" aria-label="Invoice status">
          {VIEWS.map((v, i) => (
            <button key={v.id} type="button" aria-pressed={i === view ? "true" : "false"} onClick={() => select(i)}>
              {v.label}
            </button>
          ))}
        </div>
      </div>
      <table class="data-table">
        <thead>
          <tr>
            <th scope="col">Invoice</th>
            <th scope="col">Team</th>
            <th scope="col">Issued</th>
            <th scope="col">Due</th>
            <th scope="col">Status</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {shown.map((inv) => {
            const s = STATUS[inv.status];
            return (
              <tr key={inv.id}>
                <td class="cell-name">
                  <strong>{inv.id}</strong>
                  <small>{inv.customer}</small>
                </td>
                <td data-label="Team">{inv.team}</td>
                <td data-label="Issued">{inv.issued}</td>
                <td data-label="Due">{inv.due}</td>
                <td data-label="Status">
                  <span class={`tag ${s.tone}`}>
                    <s.Glyph />
                    {s.label}
                  </span>
                </td>
                <td data-label="Amount" class="cn-tabular"><strong>{money(inv.amount)}</strong></td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div class="panel-footer">
        <span class="cn-meta">
          {first} to {Math.min(page * PER_PAGE, rows.length)} of {rows.length}
        </span>
        <div class="cn-row">
          <button type="button" class="btn btn-ghost is-sm" disabled={page === 1} onClick={() => setPage(page - 1)}>
            Previous
          </button>
          <button type="button" class="btn btn-ghost is-sm" disabled={page === pages} onClick={() => setPage(page + 1)}>
            Next
          </button>
        </div>
      </div>
    </section>
  );
}

export default function DashboardExample() {
  return (
    <div class="cn-stack cn-gap-32 page-enter">
      {/* The primary comes after the title and lede, so it wraps below them on a phone. */}
      <header class="cn-row cn-between cn-top cn-wrap cn-gap-24">
        <div class="cn-stack cn-gap-24">
          <h1 class="cn-display">Billing, September</h1>
          <p class="cn-lede cn-m-0">
            {INVOICES.length} invoices from the last six weeks, across 6 teams.
            Collections settle nightly at 02:00 UTC, so these figures are from
            this morning's run.
          </p>
        </div>
        <button type="button" class="btn btn-primary">New invoice</button>
      </header>

      <section class="cn-grid-4" aria-label="Key figures">
        {/* Text-colored, so mauve stays on the primary. */}
        <div class="stat is-lg">
          <span>Collected this month</span>
          <strong class="cn-text-text">$126,940</strong>
          <p>+8.2% on August</p>
        </div>
        <div class="stat">
          <span>Outstanding</span>
          <strong>{whole(total(OPEN))}</strong>
          <p>{OPEN.length} open invoices</p>
        </div>
        <div class="stat">
          <span>Past due</span>
          <strong>{whole(total(LATE))}</strong>
          <p>
            <span class="tag cn-tone-danger">
              <DangerGlyph />
              {LATE.length} overdue
            </span>
          </p>
        </div>
        <div class="stat">
          <span>Average days to pay</span>
          <strong>18</strong>
          <p>3 days faster than Q2</p>
        </div>
      </section>

      <InvoiceTable />

      <div class="cn-grid-2">
        <aside class="panel is-tilted" aria-labelledby="dash-summary">
          <div class="panel-body cn-stack cn-gap-12">
            <h2 id="dash-summary" class="cn-name cn-m-0">Where September stands</h2>
            <p class="cn-copy cn-m-0">
              Card carried the month, up $12.5k on August to $74.5k. Bank
              transfers slipped $3.8k, their first drop since June, so nearly
              all of the gain rests on one method.
            </p>
            <a class="btn-text" href="#" onClick={(e) => e.preventDefault()}>
              Read the month-end report
            </a>
          </div>
        </aside>
        <section class="cn-stack cn-gap-8" aria-labelledby="dash-refunds">
          <h2 id="dash-refunds" class="cn-name cn-m-0">Payments this month</h2>
          <div class="cn-divide">
            <div class="stat is-inline">
              <span>Refunded in 4 payments</span>
              <b>$1,120</b>
            </div>
            <div class="stat is-inline">
              <span>Failed, $2,340 to retry</span>
              <b>3</b>
            </div>
            <div class="stat is-inline">
              <span>Paid in full</span>
              <b>{INVOICES.filter((inv) => inv.status === "paid").length} of {INVOICES.length}</b>
            </div>
            <div class="stat is-inline">
              <span>Partially paid</span>
              <b>2 of {INVOICES.length}</b>
            </div>
            <div class="stat is-inline">
              <span>Disputed</span>
              <b>1 of {INVOICES.length}</b>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
