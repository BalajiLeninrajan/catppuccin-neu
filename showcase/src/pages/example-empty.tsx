/* ── Example: empty project ───────────────────────────────────────────────
   A first-run screen built only from package classes, no sc- chrome. The
   one job is to connect a source, so the empty state holds the one
   primary and its panel is the lead panel. A first-run screen may put the
   primary there instead of in the header. The page grid takes an 8 and a
   4: the lead panel and the overview first, the checklist beside them, and
   skeletons stand where the data will land. The sample-data toggle swaps
   them for content that arrives with .cn-arrive.                        */

import { useState } from "preact/hooks";

const STEPS = [
  { id: "create", label: "Create the project", hint: "Done when you named it." },
  { id: "source", label: "Connect a data source", hint: "A database, a warehouse or a CSV upload." },
  { id: "invite", label: "Invite a teammate", hint: "Viewers see dashboards; editors change them." },
  { id: "sample", label: "Explore the sample data", hint: "Fills the overview until a source syncs." },
];

const STATS = [
  { label: "Events today", value: "12,480" },
  { label: "Active users", value: "1,206" },
  { label: "Median session", value: "4m 12s" },
  { label: "Error rate", value: "0.4%" },
];

const EVENTS = [
  { event: "checkout.completed", user: "user_8812", source: "Web", time: "09:42" },
  { event: "invoice.viewed", user: "user_1290", source: "Email", time: "09:40" },
  { event: "report.exported", user: "user_0457", source: "Web", time: "09:31" },
  { event: "seat.added", user: "user_3306", source: "API", time: "09:18" },
];

const PlugIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M12 22v-5M9 8V2M15 8V2" />
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8z" />
  </svg>
);

function OverviewSkeleton() {
  return (
    <div class="panel-body cn-stack cn-gap-24">
      <div class="stat-grid">
        {STATS.map((s) => (
          <div key={s.label} class="cn-stack cn-gap-8">
            <span class="skeleton is-text" style="width:60%" aria-hidden="true" />
            <span class="skeleton" style="height:28px;width:70%" aria-hidden="true" />
          </div>
        ))}
      </div>
      <div class="cn-stack cn-gap-12">
        {EVENTS.map((e) => (
          <div key={e.event} class="cn-row cn-gap-16">
            <span class="skeleton is-text cn-grow" aria-hidden="true" />
            <span class="skeleton is-text" style="width:20%" aria-hidden="true" />
          </div>
        ))}
      </div>
    </div>
  );
}

/* The whole set arrives at once: the stats and the table take .cn-arrive in
   the same render, with no stagger between rows. */
function OverviewLoaded() {
  return (
    <>
      <div class="panel-body cn-arrive">
        <div class="stat-grid">
          {STATS.map((s) => (
            <div key={s.label} class="stat">
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </div>
          ))}
        </div>
      </div>
      <table class="data-table cn-arrive">
        <thead>
          <tr>
            <th scope="col">Event</th>
            <th scope="col">User</th>
            <th scope="col">Source</th>
            <th scope="col" class="is-num">Time</th>
          </tr>
        </thead>
        <tbody>
          {EVENTS.map((e) => (
            <tr key={e.event}>
              <td>{e.event}</td>
              <td data-label="User">{e.user}</td>
              <td data-label="Source">{e.source}</td>
              <td class="is-num" data-label="Time">{e.time}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}

export default function EmptyProjectExample() {
  const [sample, setSample] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({ create: true });
  const checked = (id: string) => (id === "sample" ? sample : !!done[id]);
  const count = STEPS.filter((s) => checked(s.id)).length;

  return (
    <div class="cn-stack cn-gap-48 page-enter">
      <header class="cn-split">
        <div class="cn-stack cn-gap-12">
          <h1 class="cn-display is-sm">Harbor analytics</h1>
          <p class="cn-meta cn-m-0">Created today by Aya Kato · 1 member · no sources yet</p>
        </div>
        <div class="cn-row cn-wrap">
          <button
            type="button"
            class="btn btn-ghost"
            aria-pressed={sample ? "true" : "false"}
            onClick={() => setSample(!sample)}
          >
            Sample data
          </button>
          <button type="button" class="btn btn-secondary">Invite teammates</button>
        </div>
      </header>

      <div class="cn-grid-12">
        <div class="cn-span-8 cn-stack cn-gap-24">
          <section class="panel is-lead" aria-labelledby="ep-sources">
            <div class="panel-header">
              <h2 id="ep-sources">Sources</h2>
            </div>
            <div class="panel-body">
              <div class="empty-state">
                <PlugIcon />
                <strong>No sources connected</strong>
                <span>Connect a database, a warehouse or a CSV upload. The first sync takes a few minutes.</span>
                <button type="button" class="btn btn-primary">Connect a source</button>
              </div>
            </div>
          </section>

          <section class="panel" aria-labelledby="ep-overview" aria-busy={sample ? "false" : "true"}>
            <div class="panel-header">
              <h2 id="ep-overview">Overview</h2>
              <span class="chip">{sample ? "Sample data" : "Waiting for a sync"}</span>
            </div>
            {sample ? <OverviewLoaded /> : <OverviewSkeleton />}
          </section>
        </div>
        <section class="panel cn-span-4" style="align-self:start" aria-labelledby="ep-steps">
          <div class="panel-header">
            <h2 id="ep-steps">Get started</h2>
          </div>
          <div class="panel-body cn-stack cn-gap-24">
            <div class="cn-stack cn-gap-8">
              <div class="stat is-inline">
                <span>Progress</span>
                <b>{count} of {STEPS.length}</b>
              </div>
              <div class="progress-track" aria-hidden="true">
                <span style={`width:${(count / STEPS.length) * 100}%`} />
              </div>
            </div>
            <fieldset class="cn-stack cn-gap-16 cn-m-0 cn-p-0" style="border:0">
              <legend class="cn-sr-only">Setup steps</legend>
              {STEPS.map((s) => (
                <label key={s.id} class="choice cn-top">
                  <input
                    type="checkbox"
                    class="checkbox"
                    checked={checked(s.id)}
                    onChange={() => (s.id === "sample" ? setSample(!sample) : setDone({ ...done, [s.id]: !done[s.id] }))}
                  />
                  <span class="cn-stack cn-gap-4">
                    <span>{s.label}</span>
                    <span class="cn-meta">{s.hint}</span>
                  </span>
                </label>
              ))}
            </fieldset>
          </div>
        </section>

      </div>
    </div>
  );
}
