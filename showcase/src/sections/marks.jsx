/* Marks — chip, chip-tone, banner, mark-solid, live-dot, eyebrow. */
import { Section, Specimen, ToneRow, EntityRow } from "../lib/specimen.jsx";

/* Chip glyphs — stroke follows currentColor; decorative, the chip text is
   the accessible name (font-size 0 hides it visually, AT still reads it). */
function StopwatchIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <circle cx="8" cy="9" r="5.5" stroke="currentColor" stroke-width="1.5" />
      <path d="M8 6.5V9l1.8 1.4M6.5 1.5h3" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" />
    </svg>
  );
}

function BoltIcon() {
  return (
    <svg viewBox="0 0 16 16" width="16" height="16" fill="none" aria-hidden="true">
      <path d="M8.8 1.5 3.5 9h3.2l-.5 5.5L11.5 7H8.3l.5-5.5Z" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round" />
    </svg>
  );
}

/* Semantic statuses from the fleet's world, one per tone. */
const TONE_STATUS = {
  red: "dnf",
  green: "passed",
  peach: "warm-up",
  yellow: "flagged",
  blue: "queued",
  mauve: "seeded",
};

const TONE_BANNER = {
  red: "Regression — sort/merge p99 up 18% since benchmark run 41.",
  green: "All 24 candidates cleared the written exam. Results posted.",
  peach: "Track resurfacing in progress — Saturday's heats start 40 min late.",
  yellow: "3 words flagged for re-review before round two begins.",
  blue: "Benchmark run 45 queued behind two jobs — est. 12 min.",
  mauve: "New season opens — entity colors reshuffle at the first race.",
};

export default function Marks() {
  return (
    <Section
      id="marks"
      title="Marks"
      blurb="Small identity and status pieces: raised mono chips, tone-tinted tags and banners driven by --tone, the solid accent square keyed by --accent, the pulsing live-dot, and the mono eyebrow."
    >
      <Specimen title="Chip — raised mono pill" classes="chip">
        <span class="chip">v1.4.2</span>
        <span class="chip">heat 3 / 8</span>
        <span class="chip">1,204 words</span>
        <span class="chip">n = 512 runs</span>
        <span class="chip">exam · 40 min</span>
        <span class="chip">
          <span class="live-dot" /> lap 12
        </span>
      </Specimen>

      <Specimen
        title="Chip with glyph — the ≤760px collapse contract: font-size 0 hides the label, the glyph carries it"
        classes="chip · chip > svg"
      >
        <span class="chip" title="Average mile">
          <StopwatchIcon /> 1:52.4 avg mile
        </span>
        <span class="chip" title="Fastest sprint">
          <BoltIcon /> 128 wpm fastest
        </span>
        <p class="cn-meta">
          resize under 760px — the mono label collapses to zero, the 16px glyph
          stays, and the text still reads to assistive tech
        </p>
      </Specimen>

      <Specimen
        title="Chip-tone — semantic tag, tinted via --tone"
        classes="chip-tone cn-tone-green"
      >
        <ToneRow>
          {(tone) => (
            <span class={`chip-tone cn-tone-${tone}`}>{TONE_STATUS[tone]}</span>
          )}
        </ToneRow>
      </Specimen>

      <Specimen
        title="Banner — inline tint band, tinted via --tone"
        classes="banner cn-tone-yellow"
      >
        {Object.keys(TONE_BANNER).map((tone) => (
          <div class={`banner cn-tone-${tone}`}>
            <span class={`chip-tone cn-tone-${tone}`}>{TONE_STATUS[tone]}</span>
            {TONE_BANNER[tone]}
          </div>
        ))}
      </Specimen>

      <Specimen
        title="Mark-solid — default accent (mauve)"
        classes="mark-solid"
      >
        <span class="mark-solid">1</span>
        <span class="mark-solid">2</span>
        <span class="mark-solid">3</span>
        <span class="mark-solid">Q4</span>
        <span class="cn-meta">finishing order, race 7</span>
      </Specimen>

      <Specimen
        title="Mark-solid — custom --accent (entity cycle)"
        classes="mark-solid"
      >
        <EntityRow>
          {(color, name, i) => (
            <span class="mark-solid" style={{ "--accent": color }} title={name}>
              {i + 1}
            </span>
          )}
        </EntityRow>
      </Specimen>

      <Specimen title="Live-dot — pulsing presence marker" classes="live-dot">
        <span class="live-dot" />
        <span class="cn-meta">
          <span class="live-dot" /> heat 3 running — 5 sulkies on track
        </span>
      </Specimen>

      <Specimen title="Eyebrow — mono kicker" classes="cn-eyebrow">
        <span class="cn-eyebrow">benchmark suite · run 44</span>
        <span class="cn-eyebrow">
          <span class="live-dot" /> live — spelling final
        </span>
      </Specimen>
    </Section>
  );
}
