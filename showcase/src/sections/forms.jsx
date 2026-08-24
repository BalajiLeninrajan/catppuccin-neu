/* Forms — field/label/input recipes: inset wells, mono values, mauve focus ring. */
import { useState } from "preact/hooks";
import { Section, Specimen } from "../lib/specimen.jsx";

const WORDS = [
  "salt",
  "saline",
  "salvo",
  "salvage",
  "psalm",
  "balsam",
  "salamander",
  "salutation",
];

function MagnifierIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.8-3.8" />
    </svg>
  );
}

export default function Forms() {
  const [entrant, setEntrant] = useState("Midnight Ledger");
  const [mile, setMile] = useState("1:52.4");
  const [query, setQuery] = useState("sal");

  const matches = WORDS.filter((w) =>
    w.toLowerCase().includes(query.trim().toLowerCase())
  );

  return (
    <Section
      id="forms"
      title="Forms"
      blurb="Entry sits in an inset well: mono uppercase labels, mono tabular values, and a mauve ring layered over the inset on focus."
    >
      <Specimen title="Field — label + input" classes="field">
        <div class="sc-grid" style={{ flex: "1 1 100%" }}>
          <div class="field">
            <label for="f-entrant">Entrant</label>
            <input
              id="f-entrant"
              type="text"
              value={entrant}
              onInput={(e) => setEntrant(e.currentTarget.value)}
            />
          </div>
          <div class="field">
            <label for="f-mile">Best mile</label>
            <input
              id="f-mile"
              type="text"
              value={mile}
              onInput={(e) => setMile(e.currentTarget.value)}
            />
          </div>
          <div class="field">
            <label for="f-score">Exam score / 100</label>
            <input id="f-score" type="text" placeholder="87" />
          </div>
        </div>
      </Specimen>

      <Specimen title="Standalone input" classes="input">
        <input
          class="input"
          type="text"
          placeholder="qualifying time (mm:ss.t)"
          aria-label="Qualifying time"
          style={{ flex: "1 1 260px", maxWidth: "340px" }}
        />
      </Specimen>

      <Specimen title="Hero input" classes="input input-lg">
        <input
          class="input input-lg"
          type="text"
          placeholder="SELECT p95_ms FROM runs WHERE suite = 'cold-start'"
          aria-label="Benchmark query"
          style={{ flex: "1 1 100%" }}
        />
      </Specimen>

      <Specimen title="Search — wrapper + inline icon" classes="search">
        <div style={{ flex: "1 1 100%", display: "grid", gap: "9px" }}>
          <div class="search">
            <MagnifierIcon />
            <input
              class="input"
              type="search"
              value={query}
              onInput={(e) => setQuery(e.currentTarget.value)}
              placeholder="search the word list"
              aria-label="Search words"
            />
          </div>
          <p class="cn-meta">
            {matches.length} of {WORDS.length} words match
            {matches.length ? ` — ${matches.join(", ")}` : ""}
          </p>
        </div>
      </Specimen>

      <Specimen title="Select" classes="field">
        <div class="sc-grid" style={{ flex: "1 1 100%" }}>
          <div class="field">
            <label for="f-track">Track</label>
            <select id="f-track">
              <option>The Meadowlands</option>
              <option>Mohawk Park</option>
              <option>Red Mile</option>
              <option>Yonkers</option>
            </select>
          </div>
          <div class="field">
            <label for="f-suite">Benchmark suite</label>
            <select id="f-suite">
              <option>cold-start</option>
              <option>steady-state</option>
              <option>burst-write</option>
            </select>
          </div>
        </div>
      </Specimen>

      <Specimen title="Textarea" classes="field">
        <div class="field" style={{ flex: "1 1 100%" }}>
          <label for="f-notes">Steward's notes</label>
          <textarea
            id="f-notes"
            rows={4}
            placeholder="Heat 2 — no. 4 broke stride at the three-quarter pole; inquiry posted, placing stands."
            style={{ height: "auto", minHeight: "104px", paddingBlock: "9px", resize: "vertical" }}
          />
        </div>
      </Specimen>

      <Specimen title="Focus ring" classes="input">
        <input
          class="input"
          type="text"
          placeholder="tab into me"
          aria-label="Focus ring demo"
          style={{ flex: "1 1 220px", maxWidth: "280px" }}
        />
        <p class="cn-copy" style={{ flex: "1 1 320px" }}>
          Focus layers a 2px mauve-mix ring over the neu inset — never replacing
          it — and the global <span class="cn-code">:focus-visible</span> outline
          is left untouched. Tab through the section to see both.
        </p>
      </Specimen>

      <Specimen title="Disabled input" classes="input">
        <input
          class="input"
          type="text"
          disabled
          value="heat 3 — archived 2024-06-12"
          aria-label="Archived heat (disabled)"
          style={{ flex: "1 1 260px", maxWidth: "340px" }}
        />
      </Specimen>
    </Section>
  );
}
