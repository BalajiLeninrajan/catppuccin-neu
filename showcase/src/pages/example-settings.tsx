/* Example: billing settings. A form built only from package classes. One
   primary in the footer and no tilted panel. The billing email shows an
   error. */

import { useState } from "preact/hooks";

const noNav = (e: Event) => e.preventDefault();

/* Late fees start this many days after the due date; 0 turns them off. */
const graceText = (v: number) => (v === 0 ? "No late fee" : `${v} days`);

export default function SettingsExample() {
  const [grace, setGrace] = useState(10);
  const [renew, setRenew] = useState(true);
  const [receipts, setReceipts] = useState(true);

  return (
    <div class="cn-stack cn-gap-32 page-enter">
      <header class="cn-stack cn-gap-12">
        <h1 class="cn-display is-sm">Billing settings</h1>
        <p class="cn-lede cn-m-0 cn-mt-12">
          How Northwind Ops invoices its customers and pays for its own plan.
          Changes apply to the next invoice, not to ones already sent.
        </p>
        <p class="cn-meta cn-m-0">Last saved Sep 24 by Nadia Rahman</p>
      </header>

      <form class="cn-stack cn-gap-24" onSubmit={noNav} noValidate>
        <section class="panel" aria-labelledby="set-workspace">
          <div class="panel-header">
            <h2 id="set-workspace">Workspace</h2>
          </div>
          <div class="panel-body cn-grid-2">
            <div class="field">
              <label for="set-name">Legal name</label>
              <input id="set-name" type="text" value="Northwind Operations Ltd." aria-describedby="set-name-help" />
              <small id="set-name-help">Printed at the top of every invoice.</small>
            </div>
            <div class="field">
              <label for="set-id">Workspace ID</label>
              <input id="set-id" type="text" value="ws_8f2a91c4" readonly aria-describedby="set-id-help" />
              <small id="set-id-help">Quote this when you contact support.</small>
            </div>
            <div class="field">
              <label for="set-email">Billing email</label>
              <input
                id="set-email"
                type="email"
                value="billing@northwind"
                aria-invalid="true"
                aria-describedby="set-email-msg"
              />
              <small id="set-email-msg">Enter a full address, such as billing@northwind.com.</small>
            </div>
            <div class="field">
              <label for="set-currency">Currency</label>
              <select id="set-currency">
                <option>CAD, Canadian dollar</option>
                <option>USD, US dollar</option>
                <option>EUR, Euro</option>
              </select>
            </div>
          </div>
        </section>

        <section class="panel" aria-labelledby="set-invoices">
          <div class="panel-header">
            <h2 id="set-invoices">Invoices</h2>
          </div>
          <div class="panel-body cn-stack cn-gap-24">
            <fieldset class="cn-stack cn-gap-12 cn-m-0 cn-p-0" style="border:0">
              <legend class="cn-label cn-mb-12">Payment reminders</legend>
              <label class="choice">
                <input type="radio" class="radio" name="set-remind" />
                Three days before the due date
              </label>
              <label class="choice">
                <input type="radio" class="radio" name="set-remind" checked />
                On the due date, then weekly
              </label>
              <label class="choice">
                <input type="radio" class="radio" name="set-remind" />
                Never
              </label>
            </fieldset>

            <div class="cn-stack cn-gap-8">
              <div class="cn-row cn-between cn-baseline">
                <label for="set-grace" class="cn-label">Late fee grace period</label>
                <output for="set-grace" class="cn-ui cn-text-text cn-tabular">{graceText(grace)}</output>
              </div>
              <input
                id="set-grace"
                type="range"
                class="slider"
                min={0}
                max={30}
                value={grace}
                aria-valuetext={graceText(grace)}
                aria-describedby="set-grace-help"
                style={`--value:${(grace / 30) * 100}%`}
                onInput={(e) => setGrace(Number((e.currentTarget as HTMLInputElement).value))}
              />
              <small id="set-grace-help" class="cn-meta">
                A 1.5% fee is added this many days after the due date.
              </small>
            </div>

            <div class="cn-divide">
              <label class="choice cn-w-full cn-between cn-py-12">
                <span class="cn-stack cn-gap-4">
                  <span class="cn-name">Email receipts</span>
                  <span class="cn-meta">Send the customer a receipt when an invoice is paid.</span>
                </span>
                <input type="checkbox" class="switch" checked={receipts} onChange={() => setReceipts(!receipts)} />
              </label>
              <label class="choice cn-w-full cn-between cn-py-12">
                <span class="cn-stack cn-gap-4">
                  <span class="cn-name">Auto-renew the plan</span>
                  <span class="cn-meta">Team plan, 14 seats. Renews Oct 01 at $480 a month.</span>
                </span>
                <input type="checkbox" class="switch" checked={renew} onChange={() => setRenew(!renew)} />
              </label>
            </div>
          </div>
        </section>

        <section class="panel" aria-labelledby="set-danger">
          <div class="panel-header">
            <h2 id="set-danger">Danger zone</h2>
          </div>
          <div class="panel-body cn-row cn-between cn-wrap cn-gap-16">
            <div class="cn-stack cn-gap-4 cn-grow">
              <span class="cn-name">Delete this workspace</span>
              <span class="cn-meta">
                Removes 412 invoices, 38 customers and 14 members. This cannot be undone.
              </span>
            </div>
            <button type="button" class="btn btn-ghost is-danger">Delete workspace</button>
          </div>
        </section>

        <footer class="panel-footer cn-px-0 cn-end">
          <div class="cn-row">
            <button type="button" class="btn btn-ghost">Discard</button>
            <button type="submit" class="btn btn-primary">Save changes</button>
          </div>
        </footer>
      </form>
    </div>
  );
}
