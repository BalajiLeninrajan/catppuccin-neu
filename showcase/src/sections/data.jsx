/* Data — entity cards, metric tiles, stat strips, progress, tables, ranked
   rows. Specimens use system recipes/utilities only; the scoped style below
   is layout-only (full-width wrappers inside the flex stage). */
import { useState } from "preact/hooks";
import { Section, Specimen, ENTITIES } from "../lib/specimen.jsx";

/* One entrant per entity color, in cycle order (mauve → pink). */
const ENTRANTS = [
  { horse: "Midnight Ledger", driver: "B. Rajan", starts: 22, mile: "1:51.2" },
  { horse: "Saltwater Taffy", driver: "M. Okafor", starts: 18, mile: "1:52.0" },
  { horse: "Gale Force Gigi", driver: "A. Novak", starts: 31, mile: "1:51.8" },
  { horse: "Blue Ribbon Bandit", driver: "S. Petty", starts: 14, mile: "1:52.6" },
  { horse: "Copper Commotion", driver: "J. Tan", starts: 26, mile: "1:51.4" },
  { horse: "Pink Slip Promise", driver: "R. Iyer", starts: 9, mile: "1:53.1" },
];

const SUITES = ["mmlu-pro", "gsm-hard", "arc-challenge"];

const RESULTS = [
  { fin: "1", horse: "Midnight Ledger", sub: "B. Rajan · post 4", time: "1:51.2", odds: "5/2", margin: "—", tone: "green", status: "won" },
  { fin: "2", horse: "Copper Commotion", sub: "J. Tan · post 6", time: "1:51.4", odds: "7/2", margin: "1¾L", tone: "blue", status: "placed" },
  { fin: "3", horse: "Gale Force Gigi", sub: "A. Novak · post 2", time: "1:51.9", odds: "12/1", margin: "3½L", tone: "peach", status: "show" },
  { fin: "4", horse: "Blue Ribbon Bandit", sub: "S. Petty · post 5", time: "1:52.6", odds: "9/5", margin: "6¼L", tone: "yellow", status: "broke" },
  { fin: "—", horse: "Pink Slip Promise", sub: "R. Iyer · post 1", time: "—", odds: "—", margin: "—", tone: "red", status: "scratched" },
];

/* Enough log to overflow the capped terminal — the scroll-well proof. */
const BENCH_LOG = `$ salt bench --suite cold-start --runs 12 --warmup 3
[00:00.000] host m3-max · darwin 25.3 · node 22.11
[00:00.412] warmup 1/3 … 2.61 s
[00:03.180] warmup 2/3 … 2.44 s
[00:05.702] warmup 3/3 … 2.41 s
[00:08.114] run 01 … 2.39 s
[00:10.581] run 02 … 2.42 s
[00:13.020] run 03 … 2.36 s
[00:15.447] run 04 … 2.40 s
[00:17.902] run 05 … 2.38 s
[00:20.334] run 06 … 2.41 s
[00:22.769] run 07 … 2.37 s
[00:25.198] run 08 … 2.39 s
[00:27.640] run 09 … 2.43 s
[00:30.072] run 10 … 2.38 s
[00:32.501] run 11 … 2.36 s
[00:34.933] run 12 … 2.40 s
[00:35.001] mean 2.39 s · p95 2.43 s · Δ vs run 44: −1.2%
`;

const SPRINTERS = [
  { name: "Nia Okafor", meta: "en · 60s · acc 98.9%", wpm: 128, accent: "var(--yellow)" },
  { name: "Sam Petty", meta: "en · 60s · acc 97.2%", wpm: 121, accent: "var(--lavender)" },
  { name: "Priya Iyer", meta: "en · 60s · acc 99.1%", wpm: 117, accent: "var(--peach)" },
  { name: "Jonas Tan", meta: "en · 60s · acc 96.8%", wpm: 112, accent: null },
  { name: "Ada Novak", meta: "en · 60s · acc 98.0%", wpm: 109, accent: null },
];

export default function Data() {
  const [runs, setRuns] = useState([82, 64, 91]);

  const rerun = () =>
    setRuns(SUITES.map(() => Math.round(12 + Math.random() * 86)));

  return (
    <Section
      id="data"
      title="Data"
      blurb="Identity keyed by --entity-color, every numeral mono with tabular-nums."
    >
      <style>{`
        #data .sc-stage [data-fill] { width: 100%; }
        #data .sc-stage .stat-row + .progress-track { margin-top: 8px; }
      `}</style>

      <Specimen
        title="Entity card — spine, gradient, and accent metric across the six-color cycle"
        classes="entity-card"
      >
        <div class="sc-grid" data-fill>
          {ENTITIES.map((e, i) => {
            const h = ENTRANTS[i];
            return (
              <div class="entity-card" style={{ "--entity-color": e.color }}>
                <div class="cn-microlabel">
                  pacer · post 0{i + 1} · {e.name}
                </div>
                <div class="cn-name">{h.horse}</div>
                <p class="cn-meta">
                  {h.driver} · {h.starts} starts
                </p>
                <div class="metric is-hero">
                  <span>best mile</span>
                  <strong>{h.mile}</strong>
                </div>
              </div>
            );
          })}
        </div>
      </Specimen>

      <Specimen
        title="Entity card as a link — wrap in an <a>: hover lifts to full raised, click presses in"
        classes="a > .entity-card"
      >
        <div class="sc-grid" data-fill>
          {ENTITIES.slice(0, 3).map((e, i) => {
            const h = ENTRANTS[i];
            return (
              <a
                href="#data"
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <div class="entity-card" style={{ "--entity-color": e.color }}>
                  <div class="cn-microlabel">
                    open profile · {e.name}
                  </div>
                  <div class="cn-name">{h.horse}</div>
                  <p class="cn-meta">
                    {h.driver} · best mile {h.mile}
                  </p>
                </div>
              </a>
            );
          })}
        </div>
      </Specimen>

      <Specimen
        title="Terminal — the deepest well; .caret blinks at the tail"
        classes="terminal · terminal .caret"
      >
        <div data-fill>
          <div class="terminal">
            <pre style={{ maxHeight: "170px" }}>
              {BENCH_LOG}
              <span class="caret" />
            </pre>
          </div>
        </div>
        <p class="cn-meta">
          the caret takes --entity-color · the pre scrolls inside its own well
        </p>
      </Specimen>

      <Specimen
        title="Scroll well — .scroll-well recolors the scrollbar of any scrolling surface"
        classes="well · scroll-well"
      >
        <div
          class="well scroll-well cn-copy"
          data-fill
          style={{ maxHeight: "140px", overflowY: "auto", padding: "14px 16px" }}
        >
          <p>
            Rulebook §4 — qualifying. A horse qualifies for the feature card by
            posting a mile inside the track standard on two separate heats
            within thirty days of the draw.
          </p>
          <p>
            Standards tighten one second for stakes cards. Provisional drivers
            add two seconds of allowance. Broken gaits void the mile regardless
            of the posted time.
          </p>
          <p>
            Appeals go to the presiding judge before the card is drawn; the
            judge's ruling stands for the meet.
          </p>
        </div>
        <p class="cn-meta">scrollbar-color from .scroll-well — surface-2 thumb on transparent</p>
      </Specimen>

      <Specimen
        title="Empty state — quiet center, real next step"
        classes="empty-state"
      >
        <div class="empty-state" data-fill>
          <strong>No qualifiers yet</strong>
          <span>
            Heat 9 entries open Friday — times post here the moment the clock
            stops.
          </span>
          <button type="button" class="btn btn-secondary">
            Add an entry
          </button>
        </div>
      </Specimen>

      <Specimen
        title="Metric tiles — micro-label over an oversized tabular number; .is-hero takes the entity color"
        classes="metric is-hero"
      >
        <div class="metric">
          <span>words typed</span>
          <strong>12,480</strong>
        </div>
        <div class="metric">
          <span>avg wpm</span>
          <strong>92</strong>
        </div>
        <div class="metric">
          <span>accuracy</span>
          <strong>97.4%</strong>
        </div>
        <div class="metric is-hero" style={{ "--entity-color": "var(--teal)" }}>
          <span>best run</span>
          <strong>118 wpm</strong>
        </div>
      </Specimen>

      <Specimen
        title="Stat strip — .stat-row baselines separated by hairlines"
        classes="stat-strip"
      >
        <div class="stat-strip" data-fill>
          <div class="stat-row">
            <span>exams graded</span>
            <b>38 / 52</b>
          </div>
          <div class="stat-row">
            <span>median score</span>
            <b>84</b>
          </div>
          <div class="stat-row">
            <span>pass rate</span>
            <b>91%</b>
          </div>
          <div class="stat-row">
            <span>flagged for review</span>
            <b>3</b>
          </div>
        </div>
      </Specimen>

      <Specimen
        title="Progress — inset track, accent-gradient fill, .35s width transition"
        classes="progress-track"
      >
        <div class="stat-strip" data-fill>
          {SUITES.map((suite, i) => (
            <div>
              <div class="stat-row">
                <span>{suite}</span>
                <b>{runs[i]}%</b>
              </div>
              <div class="progress-track">
                <span style={{ width: `${runs[i]}%` }} />
              </div>
            </div>
          ))}
        </div>
        <button type="button" class="btn btn-secondary" onClick={rerun}>
          Re-run suites
        </button>
      </Specimen>

      <Specimen
        title="Table — .table-neu with .cell-name; td[data-label] collapses to labeled cards at ≤760px"
        classes="table-neu"
      >
        <table class="table-neu">
          <thead>
            <tr>
              <th>fin</th>
              <th>horse</th>
              <th>time</th>
              <th>odds</th>
              <th>margin</th>
              <th>status</th>
            </tr>
          </thead>
          <tbody>
            {RESULTS.map((r) => (
              <tr>
                <td data-label="fin">{r.fin}</td>
                <td class="cell-name" data-label="horse">
                  <strong>{r.horse}</strong>
                  <br />
                  <small>{r.sub}</small>
                </td>
                <td data-label="time">{r.time}</td>
                <td data-label="odds">{r.odds}</td>
                <td data-label="margin">{r.margin}</td>
                <td data-label="status">
                  <span class={`chip-tone cn-tone-${r.tone}`}>{r.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Specimen>

      <Specimen
        title="Ranked row — rank mark (--accent), sans name, trailing mono value"
        classes="ranked-row"
      >
        <div data-fill>
          {SPRINTERS.map((s, i) => (
            <div class="ranked-row">
              <span
                class="mark-solid"
                style={s.accent ? { "--accent": s.accent } : null}
              >
                {i + 1}
              </span>
              <strong>{s.name}</strong>
              <span class="cn-meta">{s.meta}</span>
              <b>{s.wpm} wpm</b>
            </div>
          ))}
        </div>
      </Specimen>
    </Section>
  );
}
