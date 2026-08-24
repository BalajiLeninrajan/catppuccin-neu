import { Doc, Demo, Props, CodeBlock, TONES, ACCENTS } from "../lib/doc";

/* The full Mocha set, grouped by role. name → token, hex, one-line role note. */
const GROUNDS = [
  { name: "crust", hex: "#11111b", note: "Deepest ground — scrims, hard offsets, text on accent fills." },
  { name: "mantle", hex: "#181825", note: "Recessed bands — panel headings, wells, table heads." },
  { name: "base", hex: "#1e1e2e", note: "The page ground. Every component sits on it." },
  { name: "surface-0", hex: "#313244", note: "Row separators and the quietest border mixes." },
  { name: "surface-1", hex: "#45475a", note: "Dashed borders, soft edges, the lift highlight." },
  { name: "surface-2", hex: "#585b70", note: "Strongest edge mix; scrollbar thumbs." },
];

const NEUTRAL_TEXT = [
  { name: "overlay-0", hex: "#6c7086", note: "Faintest text — disabled hints, placeholders." },
  { name: "overlay-1", hex: "#7f849c", note: "Metadata and microlabels." },
  { name: "overlay-2", hex: "#9399b2", note: "Labels and captions." },
  { name: "subtext-0", hex: "#a6adc8", note: "Body copy." },
  { name: "subtext-1", hex: "#bac2de", note: "Ledes and emphasized copy." },
  { name: "text", hex: "#cdd6f4", note: "Headings and primary content." },
];

const HUES = [
  { name: "rosewater", hex: "#f5e0dc", note: "Warm highlight. Rarely used." },
  { name: "pink", hex: "#f5c2e7", note: "Primary-button hover; in the accent cycle." },
  { name: "mauve", hex: "#cba6f7", note: "The accent — focus, selection, engaged states." },
  { name: "red", hex: "#f38ba8", note: "Danger and destructive actions." },
  { name: "peach", hex: "#fab387", note: "Warnings and attention; the default --tone." },
  { name: "yellow", hex: "#f9e2af", note: "Caution and pending states." },
  { name: "green", hex: "#a6e3a1", note: "Success, live indicators, positive deltas." },
  { name: "teal", hex: "#94e2d5", note: "In the accent cycle." },
  { name: "sky", hex: "#89dceb", note: "Reserved for data-visualization ramps." },
  { name: "blue", hex: "#89b4fa", note: "Informational status and links." },
  { name: "lavender", hex: "#b4befe", note: "Quiet accent text." },
];

const TONE_LABELS = {
  red: "Overdue",
  green: "Paid",
  peach: "Pending",
  yellow: "Due soon",
  blue: "Draft",
  mauve: "Scheduled",
};

const RAMP = ["text", "subtext-1", "subtext-0", "overlay-2", "overlay-1", "overlay-0"];

interface SwatchProps {
  name: string;
  hex: string;
  note: string;
}

function Swatch({ name, hex, note }: SwatchProps) {
  return (
    <div style="display:grid;gap:7px;align-content:start">
      <div class="cn-r-mark cn-edge-soft" style={`height:52px;background:var(--${name})`} />
      <span class="cn-name">{name}</span>
      <code class="cn-code cn-text-overlay-2">{hex}</code>
      <span class="cn-meta">{note}</span>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <Doc
      title="Colors"
      lede="Catppuccin Mocha, verbatim — 23 tokens, no substitute hexes. Twelve neutrals carry the grounds and the text ramp; eleven hues carry meaning. Everything else on this page is a color-mix of these."
    >
      <p class="cn-copy">
        Components never reach for raw hex values. They read tokens directly, or
        one of the two contract properties: <code class="cn-code">--tone</code>{" "}
        for semantic tinting and <code class="cn-code">--accent</code> for
        per-instance identity.
      </p>

      <Demo title="Grounds & surfaces">
        <div class="sc-grid">
          {GROUNDS.map((t) => (
            <Swatch key={t.name} {...t} />
          ))}
        </div>
      </Demo>

      <Demo title="Neutral text">
        <div class="sc-grid">
          {NEUTRAL_TEXT.map((t) => (
            <Swatch key={t.name} {...t} />
          ))}
        </div>
      </Demo>

      <Demo title="Hues">
        <div class="sc-grid">
          {HUES.map((t) => (
            <Swatch key={t.name} {...t} />
          ))}
        </div>
      </Demo>

      <h2 class="cn-title">Semantic assignments</h2>
      <p class="cn-copy">
        Five hues have fixed meanings. Set them through the{" "}
        <code class="cn-code">.cn-tone-*</code> utilities — they write{" "}
        <code class="cn-code">--tone</code> and nothing else, so chips, banners,
        and tinted edges re-key as a group.
      </p>

      <Props
        title="Tone setters"
        rows={[
          { name: ".cn-tone-green", values: "#a6e3a1", notes: "Success — paid, live, positive deltas." },
          { name: ".cn-tone-red", values: "#f38ba8", notes: "Danger — errors, overdue, destructive actions." },
          { name: ".cn-tone-peach", values: "#fab387", notes: "Warning — attention needed. The default --tone." },
          { name: ".cn-tone-yellow", values: "#f9e2af", notes: "Caution — pending review, expiring soon." },
          { name: ".cn-tone-blue", values: "#89b4fa", notes: "Info — drafts, syncing, neutral status." },
          { name: ".cn-tone-mauve", values: "#cba6f7", notes: "Brand accent as a tone — scheduled, selected." },
        ]}
      />

      <Demo title="Tones in use" classes="chip-tone cn-tone-green" row>
        {TONES.map((tone) => (
          <span key={tone} class={`chip-tone cn-tone-${tone}`}>
            {TONE_LABELS[tone]}
          </span>
        ))}
      </Demo>

      <h2 class="cn-title">The accent cycle</h2>
      <p class="cn-copy">
        <code class="cn-code">--accent</code> is the per-instance identity color
        — the one property read by accent cards, spines, solid marks, hero
        values, and the <code class="cn-code">cn-*-accent</code> utilities.
        Assign it inline from data, cycling through six hues in this order.
      </p>

      <Demo title="--accent swatches" classes='style="--accent:#94e2d5"' row>
        {ACCENTS.map((a, i) => (
          <div
            key={a.name}
            style={`--accent:${a.color};display:grid;gap:6px;justify-items:center`}
          >
            <span class="mark-solid">{i + 1}</span>
            <span class="cn-meta">{a.name}</span>
            <code class="cn-code cn-text-accent">{a.color}</code>
          </div>
        ))}
      </Demo>

      <CodeBlock
        title="Assigning an accent"
        code={`<article class="accent-card" style="--accent:#94e2d5">
  <span class="mark-solid">2</span>
  <h3 class="cn-name">Billing team</h3>
  <span class="cn-value-lg">48</span>
</article>`}
      />

      <h2 class="cn-title">The tint recipe</h2>
      <p class="cn-copy">
        Tinted surfaces are never opaque hue fills. Every tint is a{" "}
        <code class="cn-code">color-mix(in srgb, …)</code> of its tone at a
        blessed strength: state backgrounds mix 7–10% into the ground, edges mix
        25–45% (tinted surfaces keep their hairline), and the faintest
        hover/selected washes mix 4–5%.
      </p>

      <CodeBlock
        title="Blessed percentages"
        code={`/* State background — 7–10% tone into transparent or the ground */
background: color-mix(in srgb, var(--tone) 8%, transparent);

/* Edge — 25–45% tone; the tint keeps its hairline */
border: 1px solid color-mix(in srgb, var(--tone) 45%, transparent);
border: 1px solid color-mix(in srgb, var(--tone) 25%, var(--surface-0));

/* Wash — 4–5% for the quietest hover and selected grounds */
background: color-mix(in srgb, var(--mauve) 5%, var(--base));`}
      />

      <Demo title="Tints at recipe strength" classes="banner cn-tone-green">
        <div class="banner cn-tone-green">
          All 14 invoices reconciled. Next sync runs at 02:00.
        </div>
        <div class="banner cn-tone-red">
          Payment method expired — settings need an update before renewal.
        </div>
      </Demo>

      <h2 class="cn-title">Text color utilities</h2>
      <p class="cn-copy">
        The neutral ramp maps one-to-one onto{" "}
        <code class="cn-code">.cn-text-*</code> utilities, brightest to
        faintest. Palette hues get the same treatment
        (<code class="cn-code">.cn-text-mauve</code>,{" "}
        <code class="cn-code">.cn-text-green</code>, …), plus{" "}
        <code class="cn-code">.cn-text-accent</code> and{" "}
        <code class="cn-code">.cn-text-tone</code> for the contract properties.
      </p>

      <Demo title="Text ramp" classes="cn-text-text … cn-text-overlay-0">
        {RAMP.map((step) => (
          <p key={step} class={`cn-copy cn-text-${step}`} style="margin:0">
            <code class="cn-code">cn-text-{step}</code> — Monthly report ready:
            412 messages triaged across 6 teams.
          </p>
        ))}
      </Demo>
    </Doc>
  );
}
