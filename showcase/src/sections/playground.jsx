/* Playground — the three contract knobs applied live to one mix of recipes.
   data-density lands on the wrapper as an attribute; --tone and --entity-color
   land on it as inline custom properties, exactly as a consumer would set them. */

import { useState } from "preact/hooks";
import {
  Section,
  Specimen,
  ToneRow,
  EntityRow,
  ENTITIES,
} from "../lib/specimen.jsx";

export default function Playground() {
  const [compact, setCompact] = useState(false);
  const [tone, setTone] = useState("peach");
  const [entity, setEntity] = useState(ENTITIES[1]); // teal — visibly not the default mauve
  const [gait, setGait] = useState("pace");

  const snippet = [
    compact ? 'data-density="compact"' : null,
    `style="--tone: var(--${tone}); --entity-color: ${entity.color}"`,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Section
      id="playground"
      title="Playground"
      blurb="The three contract knobs — data-density, --tone, --entity-color — steer every recipe below. Flip a knob, then copy the resulting attribute/style snippet."
    >
      {/* ── knobs ─────────────────────────────────────────────────────── */}
      <div class="sc-grid">
        <div class="sc-row">
          <span class="cn-label">data-density</span>
          <button
            type="button"
            class="btn-flat"
            aria-pressed={!compact}
            onClick={() => setCompact(false)}
          >
            Comfortable
          </button>
          <button
            type="button"
            class="btn-flat"
            aria-pressed={compact}
            onClick={() => setCompact(true)}
          >
            Compact
          </button>
        </div>

        <div class="sc-row">
          <span class="cn-label">--tone</span>
          <ToneRow>
            {(t) => (
              <button
                type="button"
                class={`chip-tone cn-pressable cn-tone-${t}${
                  tone === t ? " cn-inset" : ""
                }`}
                aria-pressed={tone === t}
                onClick={() => setTone(t)}
              >
                {tone === t ? "● " : ""}
                {t}
              </button>
            )}
          </ToneRow>
        </div>

        <div class="sc-row">
          <span class="cn-label">--entity-color</span>
          <EntityRow>
            {(color, name, i) => (
              <button
                type="button"
                class="mark-solid cn-pressable"
                style={{ "--accent": color }}
                aria-pressed={entity.color === color}
                aria-label={`entity color ${name}`}
                title={name}
                onClick={() => setEntity({ name, color })}
              >
                {entity.color === color ? "✓" : i + 1}
              </button>
            )}
          </EntityRow>
        </div>
      </div>

      {/* ── the live mix — knob values applied to the wrapper ─────────── */}
      <div
        data-density={compact ? "compact" : undefined}
        style={{ "--tone": `var(--${tone})`, "--entity-color": entity.color }}
      >
        <Specimen title="live mix" classes={snippet}>
          <div class="entity-card">
            <span class="cn-name">Meadowlark Motion</span>
            <div class="metric is-hero">
              <span>best mile</span>
              <strong>1:52.4</strong>
            </div>
            <div class="stat-strip">
              <div class="stat-row">
                <span>best quarter</span>
                <b>27.8s</b>
              </div>
              <div class="stat-row">
                <span>starts · wins</span>
                <b>19 · 12</b>
              </div>
            </div>
          </div>

          <div class="well">
            <div class="sc-row">
              <div class="metric">
                <span>field avg</span>
                <strong>1:54.9</strong>
              </div>
              <div class="metric">
                <span>track record</span>
                <strong>1:49.2</strong>
              </div>
              <div class="metric is-hero">
                <span>lane best</span>
                <strong>1:52.4</strong>
              </div>
            </div>
          </div>

          <div class="segmented" role="group" aria-label="race gait">
            <button
              type="button"
              class={gait === "trot" ? "active" : ""}
              onClick={() => setGait("trot")}
            >
              <b>Trot</b>
              <small>diagonal gait</small>
            </button>
            <button
              type="button"
              class={gait === "pace" ? "active" : ""}
              onClick={() => setGait("pace")}
            >
              <b>Pace</b>
              <small>lateral gait</small>
            </button>
          </div>

          <div class="field">
            <label for="pg-target-mile">target mile</label>
            <input id="pg-target-mile" type="text" placeholder="1:55.0" />
          </div>

          <div class="banner">
            <span class="chip-tone">surface</span>
            Track reported damp — pace projections may drift by ±0.6s.
          </div>

          <div class="sc-row">
            <button type="button" class="btn btn-primary">
              Start heat
            </button>
            <button type="button" class="btn btn-secondary">
              Export splits
            </button>
            <button type="button" class="btn btn-ghost">
              Scratch entry
            </button>
          </div>
        </Specimen>
      </div>
    </Section>
  );
}
