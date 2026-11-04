/* ── Example: invoice detail ───────────────────────────────────────────────
   A composed detail screen built only from package classes, no sc- chrome.
   A split header with one primary, a secondary and a menu button wired by
   catppuccin-neu/js, the facts in a .kv, line items in a .data-table, an
   activity list, and a banner because the invoice is past due. The banner
   is the one past-due signal, so the header carries no status tag. The
   breadcrumbs, the header and the banner form one region, 24px apart.
   Regions sit 48px apart in reading order: that region, the line items as
   the lead panel, then the facts and activity on the page grid. No
   tilted panel: every panel here holds a table, a list or the record's
   facts.                                                                */

import { useEffect, useRef } from "preact/hooks";
import { menu } from "../../../js/index.js";

const noNav = (e: Event) => e.preventDefault();

const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

const MoreIcon = () => (
  <svg {...STROKE}>
    <path d="M5 12h.01M12 12h.01M19 12h.01" />
  </svg>
);
const DownloadIcon = () => (
  <svg {...STROKE}>
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);
const CopyIcon = () => (
  <svg {...STROKE}>
    <rect x="8" y="8" width="13" height="13" rx="2" />
    <path d="M4 16a2 2 0 0 1-1-1.7V4a2 2 0 0 1 2-2h10a2 2 0 0 1 1.7 1" />
  </svg>
);
const VoidIcon = () => (
  <svg {...STROKE}>
    <circle cx="12" cy="12" r="9" />
    <path d="m5.6 5.6 12.8 12.8" />
  </svg>
);

/* Amounts in cents, so the sums are exact. */
const LINES = [
  { item: "Team plan", detail: "14 seats, Sep 01 to Sep 30", qty: 14, unit: 3200 },
  { item: "Additional storage", detail: "500 GB block", qty: 1, unit: 6000 },
  { item: "Onboarding workshop", detail: "Half day, remote", qty: 1, unit: 75000 },
  { item: "Priority support", detail: "September", qty: 1, unit: 12000 },
];
const SUBTOTAL = LINES.reduce((sum, l) => sum + l.qty * l.unit, 0);
const TAX = Math.round(SUBTOTAL * 0.13);
const TOTAL = SUBTOTAL + TAX;
const money = (cents: number) =>
  `$${(cents / 100).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;

const ACTIVITY = [
  { what: "Reminder sent", who: "Automatic, to ap@lumenlabs.test", when: "Sep 22" },
  { what: "Marked past due", who: "One day after the due date", when: "Sep 16" },
  { what: "Viewed by the customer", who: "Opened from the invoice email", when: "Sep 03" },
  { what: "Sent", who: "Tomas Silva, to ap@lumenlabs.test", when: "Sep 01" },
  { what: "Created", who: "Tomas Silva, from the September run", when: "Sep 01" },
];

/* The menu button: menu() owns aria-expanded and the popover's hidden, so
   this markup never re-renders. */
function MoreMenu() {
  const trigger = useRef<HTMLButtonElement>(null);
  useEffect(() => menu(trigger.current!), []);
  return (
    <div style="position:relative">
      <button
        ref={trigger}
        type="button"
        class="btn btn-ghost is-icon"
        id="inv-more"
        aria-label="More actions"
        aria-haspopup="menu"
        aria-controls="inv-more-menu"
      >
        <MoreIcon />
      </button>
      <div
        id="inv-more-menu"
        class="popover menu"
        role="menu"
        aria-labelledby="inv-more"
        hidden
        style="top:calc(100% + 8px);right:0"
      >
        <button type="button" role="menuitem" tabIndex={-1}>
          <DownloadIcon />
          Download PDF
        </button>
        <button type="button" role="menuitem" tabIndex={-1}>
          <CopyIcon />
          Duplicate
        </button>
        <hr role="separator" />
        <button type="button" role="menuitem" tabIndex={-1} class="is-danger">
          <VoidIcon />
          Void invoice
        </button>
      </div>
    </div>
  );
}

export default function InvoiceExample() {
  return (
    <div class="cn-stack cn-gap-48 page-enter">
      <div class="cn-stack cn-gap-24">
        <nav class="breadcrumbs" aria-label="Breadcrumb">
          <ol>
            <li><a href="#" onClick={noNav}>Billing</a></li>
            <li><a href="#" onClick={noNav}>Invoices</a></li>
            <li><span aria-current="page">INV-2066</span></li>
          </ol>
        </nav>

        <header class="cn-split">
          <div class="cn-stack cn-gap-12">
            <h1 class="cn-display is-sm">INV-2066</h1>
            <p class="cn-meta cn-m-0">
              Lumen Labs · issued Sep 01, 2026 · due Sep 15, 2026
            </p>
          </div>
          <div class="cn-row cn-wrap">
            <button type="button" class="btn btn-secondary">Send reminder</button>
            <button type="button" class="btn btn-primary">Record payment</button>
            <MoreMenu />
          </div>
        </header>

        <div class="banner cn-tone-danger">
          {money(TOTAL)} is 13 days past due. A reminder went out on Sep 22,
          and the next one goes out on Sep 29.
        </div>
      </div>

      <section class="panel is-lead" aria-labelledby="inv-lines">
        <div class="panel-header">
          <h2 id="inv-lines">Line items</h2>
          <span class="chip">{LINES.length} items</span>
        </div>
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Item</th>
              <th scope="col" class="is-num">Qty</th>
              <th scope="col" class="is-num">Unit price</th>
              <th scope="col" class="is-num">Amount</th>
            </tr>
          </thead>
          <tbody>
            {LINES.map((l) => (
              <tr key={l.item}>
                <td class="cell-name">
                  <strong>{l.item}</strong>
                  <br />
                  <small>{l.detail}</small>
                </td>
                <td class="is-num" data-label="Qty">{l.qty}</td>
                <td class="is-num" data-label="Unit price">{money(l.unit)}</td>
                <td class="is-num" data-label="Amount">{money(l.qty * l.unit)}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div class="panel-body cn-row cn-end">
          <div style="width:min(320px,100%)">
            <div class="cn-divide">
              <div class="stat is-inline cn-py-8">
                <span>Subtotal</span>
                <b>{money(SUBTOTAL)}</b>
              </div>
              <div class="stat is-inline cn-py-8">
                <span>HST, 13%</span>
                <b>{money(TAX)}</b>
              </div>
              <div class="stat is-inline cn-py-8">
                <span>Paid</span>
                <b>{money(0)}</b>
              </div>
            </div>
            <div class="stat is-inline is-total">
              <span>Total due</span>
              <b>{money(TOTAL)}</b>
            </div>
          </div>
        </div>
      </section>

      <div class="cn-grid-12">
        <section class="panel cn-span-7" aria-labelledby="inv-facts">
          <div class="panel-header">
            <h2 id="inv-facts">Details</h2>
          </div>
          <div class="panel-body">
            <dl class="kv">
              <dt>Customer</dt>
              <dd>Lumen Labs</dd>
              <dt>Billing contact</dt>
              <dd>ap@lumenlabs.test</dd>
              <dt>Purchase order</dt>
              <dd>PO-88412</dd>
              <dt>Terms</dt>
              <dd>Net 14</dd>
              <dt>Currency</dt>
              <dd>CAD, Canadian dollar</dd>
              <dt>Team</dt>
              <dd>Payments</dd>
              <dt>Payment method</dt>
              <dd>Bank transfer</dd>
              <dt>Created by</dt>
              <dd>Tomas Silva</dd>
            </dl>
          </div>
        </section>

        <section class="panel cn-span-5" aria-labelledby="inv-activity">
          <div class="panel-header">
            <h2 id="inv-activity">Activity</h2>
          </div>
          <div class="panel-body">
            <ol class="cn-list-none cn-divide">
              {ACTIVITY.slice(0, 3).map((a) => (
                <li key={a.what + a.when} class="cn-row cn-between cn-top cn-gap-16 cn-py-12 cn-m-0">
                  <span class="cn-stack cn-gap-4 cn-grow">
                    <span class="cn-name">{a.what}</span>
                    <span class="cn-meta">{a.who}</span>
                  </span>
                  <span class="cn-meta cn-nowrap">{a.when}</span>
                </li>
              ))}
            </ol>
            <button type="button" class="btn-text cn-mt-12">Show all {ACTIVITY.length}</button>
          </div>
        </section>
      </div>
    </div>
  );
}
