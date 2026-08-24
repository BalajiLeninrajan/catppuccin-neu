/* Buttons & controls — every .btn-* recipe in rest + disabled (hover/active
   are live), the half-slide press, segmented control (default + stacked),
   stepper, and the cn-hard + cn-pressable-slide modifier pair on a
   non-recipe element. */

import { useState } from "preact/hooks";
import { Section, Specimen } from "../lib/specimen.jsx";

/* Minimal inline glyphs for .btn-icon — stroke follows currentColor. */
function PlusIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M8 3v10M3 8h10" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  );
}

function FlagIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M4 14V2.5M4 2.5h8l-2.2 3L12 8.5H4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M4 4l8 8M12 4l-8 8" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  );
}

const SUITE_PRESETS = [
  { id: "sprint", name: "Sprint", meta: "25 words · 30s" },
  { id: "standard", name: "Standard", meta: "60 words · 2 min" },
  { id: "marathon", name: "Marathon", meta: "240 words · 10 min" },
];

const DISTANCES = [
  { id: "half", name: "Half mile", meta: "0:55 target" },
  { id: "mile", name: "Mile", meta: "1:52 target" },
  { id: "mile-half", name: "Mile & a half", meta: "2:55 target" },
];

const EXAM_MODES = [
  { id: "practice", name: "Practice exam", meta: "Untimed · solutions revealed after each section" },
  { id: "timed", name: "Timed exam", meta: "90 min · sealed until submission" },
  { id: "adaptive", name: "Adaptive drill", meta: "Difficulty follows your rolling accuracy" },
];

export default function Controls() {
  const [flatOn, setFlatOn] = useState(true);
  const [preset, setPreset] = useState("standard");
  const [mode, setMode] = useState("timed");
  const [distance, setDistance] = useState("mile");

  return (
    <Section
      id="controls"
      title="Buttons & controls"
      blurb="Clickable controls default to the hard offset and press on the half-slide: rest casts 4px 4px 0, hover lifts translate(-1px,-1px), active slides translate(2px,2px) while the shadow shrinks to 2px 2px 0 — hover and hold anything below to feel it."
    >
      {/* trivial layout-only helper for the non-recipe tile specimen — no
          shadows, colors, or radii; those come from cn-* utilities */}
      <style>{`
        .demo-press-tile { padding: 14px 20px; display: inline-flex; align-items: center; gap: 10px; cursor: pointer; }
        .demo-full { flex: 1 1 100%; }
      `}</style>

      <Specimen title="Primary — solid mauve, hard offset (fleet-wide, never softened)" classes="btn btn-primary">
        <button type="button" class="btn btn-primary">Run benchmark</button>
        <button type="button" class="btn btn-primary">Start race</button>
        <button type="button" class="btn btn-primary" disabled>Run benchmark</button>
      </Specimen>

      <Specimen title="Secondary — base surface, crust hard offset (the canon default)" classes="btn btn-secondary">
        <button type="button" class="btn btn-secondary">Export split times</button>
        <button type="button" class="btn btn-secondary">Review answers</button>
        <button type="button" class="btn btn-secondary" disabled>Export split times</button>
      </Specimen>

      <Specimen title="Ghost — chrome-free until hovered" classes="btn btn-ghost">
        <button type="button" class="btn btn-ghost">View race log</button>
        <button type="button" class="btn btn-ghost">Skip warm-up</button>
        <button type="button" class="btn btn-ghost" disabled>View race log</button>
      </Specimen>

      <Specimen title="Flat toolbar — engages in when toggled (click the first one)" classes="btn-flat">
        <button
          type="button"
          class="btn-flat"
          aria-pressed={flatOn}
          onClick={() => setFlatOn(!flatOn)}
        >
          Split times
        </button>
        <button type="button" class="btn-flat">Raw WPM</button>
        <button type="button" class="btn-flat">Percentiles</button>
        <button type="button" class="btn-flat" disabled>Heat map</button>
      </Specimen>

      <Specimen title="Text — inline mauve action" classes="btn-text">
        <button type="button" class="btn-text">See all heats</button>
        <button type="button" class="btn-text">Compare with last exam</button>
        <button type="button" class="btn-text" disabled>See all heats</button>
      </Specimen>

      <Specimen title="Icon — flat until hovered, tints toward its --tone (set via cn-tone-*)" classes="btn-icon cn-tone-blue">
        <button type="button" class="btn-icon" title="Add lap">
          <PlusIcon />
        </button>
        <button type="button" class="btn-icon cn-tone-blue" title="Flag heat">
          <FlagIcon />
        </button>
        <button type="button" class="btn-icon cn-tone-red" title="Scratch entry">
          <XIcon />
        </button>
        <button type="button" class="btn-icon" title="Add lap" disabled>
          <PlusIcon />
        </button>
      </Specimen>

      <Specimen title="Add — the dashed affordance (the system's only dashed border)" classes="btn-add">
        <button type="button" class="btn-add">
          <PlusIcon />
          Add word list
        </button>
      </Specimen>

      <Specimen
        title="Segmented — hard offset at rest, half-slide while held, engaged when selected"
        classes="segmented"
      >
        <div class="segmented demo-full" role="group" aria-label="Benchmark preset">
          {SUITE_PRESETS.map((p) => (
            <button
              type="button"
              key={p.id}
              class={preset === p.id ? "active" : ""}
              onClick={() => setPreset(p.id)}
            >
              <span>
                <b>{p.name}</b>
                <br />
                <small class="cn-meta">{p.meta}</small>
              </span>
            </button>
          ))}
        </div>
      </Specimen>

      <Specimen
        title="Segmented, radio form — labels wrap cn-sr-only radios; arrow keys move, focus outlines the option"
        classes="segmented > label > input.cn-sr-only"
      >
        <div class="segmented demo-full" role="radiogroup" aria-label="Race distance">
          {DISTANCES.map((d) => (
            <label key={d.id} class={distance === d.id ? "active" : ""}>
              <input
                type="radio"
                name="race-distance"
                class="cn-sr-only"
                checked={distance === d.id}
                onChange={() => setDistance(d.id)}
              />
              <span>
                <b>{d.name}</b>
                <br />
                <small class="cn-meta">{d.meta}</small>
              </span>
            </label>
          ))}
        </div>
        <p class="cn-copy demo-full">
          Same recipe, native form semantics: the radio is clipped with
          cn-sr-only and the label carries the chrome —{" "}
          <span class="cn-code">.segmented label:has(input:focus-visible)</span>{" "}
          draws the mauve outline when keyboard focus lands inside.
        </p>
      </Specimen>

      <Specimen title="Segmented, stacked — vertical option list with roomier rows" classes="segmented is-stacked">
        <div class="segmented is-stacked demo-full" role="group" aria-label="Exam mode">
          {EXAM_MODES.map((m) => (
            <button
              type="button"
              key={m.id}
              class={mode === m.id ? "active" : ""}
              onClick={() => setMode(m.id)}
            >
              <span>
                <b>{m.name}</b>
                <br />
                <small class="cn-meta">{m.meta}</small>
              </span>
            </button>
          ))}
        </div>
      </Specimen>

      <Specimen title="Stepper — phase track: .is-done, .active (or aria-current), upcoming" classes="stepper">
        <div class="stepper" aria-label="Race phases">
          <span class="is-done">Qualifying</span>
          <span class="is-done">Heats</span>
          <span class="active" aria-current="step">Semifinal</span>
          <span>Final</span>
          <span>Results</span>
        </div>
      </Specimen>

      <Specimen
        title="Modifier pair — cn-hard + cn-pressable-slide give any element the canon press"
        classes="cn-hard cn-pressable-slide"
      >
        <button type="button" class="demo-press-tile cn-bg-base cn-edge cn-r-card cn-hard cn-pressable-slide">
          <span class="cn-name">Heat 4 · Lane 2</span>
          <span class="cn-meta">1:54.2 pace</span>
        </button>
        <button type="button" class="demo-press-tile cn-bg-base cn-edge cn-r-card cn-hard cn-pressable-slide">
          <span class="cn-name">Vocabulary set B</span>
          <span class="cn-meta">88 / 120 mastered</span>
        </button>
        <p class="cn-copy demo-full">
          The pair is legal only together — cn-pressable-slide's active shadow assumes the
          cn-hard rest state. Recipes that want the soft press compose cn-pressable instead.
        </p>
      </Specimen>
    </Section>
  );
}
