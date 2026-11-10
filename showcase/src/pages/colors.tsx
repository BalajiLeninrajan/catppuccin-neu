import { Doc, Demo, Props, CodeBlock, TONES, TEAMS, ACCENT, accentStyle } from "../lib/doc";
import { TONE_GLYPH, NEEDS_GLYPH } from "../lib/glyphs";

/* The full Mocha set: token name, hex, the job it does here. */
const GROUNDS = [
  { name: "crust", hex: "#11111b", note: "Wells, scrims, the progress track, text on accent fills." },
  { name: "mantle", hex: "#181825", note: "The page." },
  { name: "base", hex: "#1e1e2e", note: "Panels and plated controls, one step above the page." },
  { name: "surface-0", hex: "#313244", note: "Row separators. Mixed into base for overlays." },
  { name: "surface-1", hex: "#45475a", note: "Inner separators, the hover wash, dashed open slots." },
  { name: "surface-2", hex: "#585b70", note: "Hairlines and scrollbar thumbs." },
];

const NEUTRAL_TEXT = [
  { name: "overlay-0", hex: "#6c7086", note: "Hairlines under prefers-contrast: more. Not for text." },
  { name: "overlay-1", hex: "#7f849c", note: "Control edges, disabled text, decorative icons." },
  { name: "overlay-2", hex: "#9399b2", note: "Placeholders. The faintest readable text." },
  { name: "subtext-0", hex: "#a6adc8", note: "Meta, help and table heads." },
  { name: "subtext-1", hex: "#bac2de", note: "Body copy, ledes, table cells and code." },
  { name: "text", hex: "#cdd6f4", note: "Headings, names and values. The focus ring." },
];

const IDENTITY = "Record identity only, as an --accent.";
const HUES = [
  { name: "rosewater", hex: "#f5e0dc", note: IDENTITY },
  { name: "flamingo", hex: "#f2cdcd", note: IDENTITY },
  { name: "pink", hex: "#f5c2e7", note: "The hover of links and the primary." },
  { name: "mauve", hex: "#cba6f7", note: "The primary, links, checked and engaged states." },
  { name: "red", hex: "#f38ba8", note: "Danger and destructive actions." },
  { name: "maroon", hex: "#eba0ac", note: IDENTITY },
  { name: "peach", hex: "#fab387", note: "A held or paused state." },
  { name: "yellow", hex: "#f9e2af", note: "Warning: due soon, expiring." },
  { name: "green", hex: "#a6e3a1", note: "Success, live indicators, positive deltas." },
  { name: "teal", hex: "#94e2d5", note: IDENTITY },
  { name: "sky", hex: "#89dceb", note: IDENTITY },
  { name: "sapphire", hex: "#74c7ec", note: IDENTITY },
  { name: "blue", hex: "#89b4fa", note: "Informational status." },
  { name: "lavender", hex: "#b4befe", note: IDENTITY },
];

const TONE_LABELS = {
  red: "Overdue",
  green: "Paid",
  peach: "On hold",
  yellow: "Due soon",
  blue: "Draft",
  mauve: "Scheduled",
};

const RAMP = ["text", "subtext-1", "subtext-0", "overlay-2"];

interface SwatchProps {
  name: string;
  hex: string;
  note: string;
}

function Swatch({ name, hex, note }: SwatchProps) {
  return (
    <div class="cn-stack cn-gap-8" style="align-content:start">
      <div class="cn-r-control cn-edge-soft" style={`height:52px;background:var(--${name})`} />
      <span class="cn-name">{name}</span>
      <code class="cn-code-meta">{hex}</code>
      <span class="cn-meta">{note}</span>
    </div>
  );
}

export default function ColorsPage() {
  return (
    <Doc
      title="Colors"
      lede="Catppuccin Mocha, verbatim: all 26 colors, each a token named after its Catppuccin name, such as var(--mauve)."
    >
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

      <h2 class="cn-title">Semantic roles</h2>
      <p class="cn-copy">
        Recipes read a role, not a palette name. Under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> each text
        role moves one stop lighter. Ratios are on base, the panel fill.
      </p>

      <Props
        title="Role tokens"
        rows={[
          { name: "--cn-fg", values: "text · 11.3:1", notes: "Headings, names, values." },
          { name: "--cn-fg-body", values: "subtext-1 · 9.3:1", notes: "Running text, labels, table cells." },
          { name: "--cn-fg-muted", values: "subtext-0 · 7.4:1", notes: "Meta, help, table heads." },
          { name: "--cn-fg-placeholder", values: "overlay-2 · 5.8:1", notes: "Placeholders. The floor for readable text." },
          { name: "--cn-fg-on-accent", values: "crust · 9.2:1 on mauve", notes: "Text on a solid accent fill." },
          { name: "--cn-interactive", values: "mauve · 8.1:1", notes: "Links, the primary, checked controls." },
          { name: "--cn-interactive-hover", values: "pink", notes: "Their hover." },
          { name: "--cn-focus", values: "text · 11.3:1", notes: "The focus ring." },
          { name: "--cn-danger", values: "red · 7.1:1", notes: "Errors, overdue, destructive actions." },
          { name: "--cn-warning", values: "yellow · 12.9:1", notes: "Due soon, expiring." },
          { name: "--cn-success", values: "green · 11.0:1", notes: "Paid, live, positive deltas." },
          { name: "--cn-info", values: "blue · 7.8:1", notes: "Drafts, syncing, neutral status." },
        ]}
      />

      <h2 class="cn-title">Tones</h2>
      <p class="cn-copy">
        A <code class="cn-code-inline">.cn-tone-*</code> class sets{" "}
        <code class="cn-code-inline">--tone</code>, and tags, banners and
        tints read it. A tone never carries meaning alone, so write the
        status as a word.
      </p>

      <Demo title="Tones by role" classes="tag cn-tone-danger · -warning · -success · -info" row>
        {([
          ["danger", "Overdue"],
          ["success", "Paid"],
          ["warning", "Due soon"],
          ["info", "Draft"],
        ] as const).map(([role, label]) => (
          <span key={role} class={`tag cn-tone-${role}`}>
            {label}
          </span>
        ))}
      </Demo>

      <Demo title="Tones by hue" classes="tag cn-tone-green" row>
        {TONES.map((tone) => {
          const Glyph = TONE_GLYPH[tone];
          return (
            <span key={tone} class={`tag cn-tone-${tone}`}>
              {NEEDS_GLYPH.has(tone) ? <Glyph /> : null}
              {TONE_LABELS[tone]}
            </span>
          );
        })}
      </Demo>

      <h2 class="cn-title">Accent by identity</h2>
      <p class="cn-copy">
        <code class="cn-code-inline">--accent</code> is the color of one
        thing: a team, a person, a project. Store it on the record and set it
        inline, so sorting or filtering never recolors an item.
      </p>

      <Demo title="One accent per team" classes='style="--accent:#94e2d5"  (from the record)' row>
        {[...TEAMS, { name: "Billing", accent: "sapphire" as const }].map((team) => (
          <div
            key={team.name}
            class="cn-stack cn-gap-8"
            style={`${accentStyle(team.accent)};justify-items:center`}
          >
            <span class="mark" aria-hidden="true">{team.name[0]}</span>
            <span class="cn-name">{team.name}</span>
            <code class="cn-code-meta">
              {team.accent} {ACCENT[team.accent]}
            </code>
          </div>
        ))}
      </Demo>

      <CodeBlock
        title="Assigning an accent"
        code={`<!-- the hex comes from the team record -->
<article class="accent-card" style="--accent: #94e2d5">
  <span class="mark">P</span>
  <h3 class="cn-name">Payments</h3>
  <p class="cn-meta">12 members</p>
</article>`}
      />

      <h2 class="cn-title">Color utilities</h2>

      <Demo title="Readable text ramp" classes="cn-text-text … cn-text-overlay-2">
        {RAMP.map((step) => (
          <p key={step} class={`cn-copy cn-text-${step}`} style="margin:0">
            <code class="cn-code-inline">cn-text-{step}</code> · Monthly report ready,
            412 messages triaged across 6 teams.
          </p>
        ))}
      </Demo>

      <Demo title="Edges" classes="cn-edge / cn-edge-soft / cn-edge-dashed" row>
        {["edge", "edge-soft", "edge-dashed"].map((cls) => (
          <span key={cls} class={`cn-${cls} cn-r-control cn-px-12 cn-py-8`}>
            <code class="cn-code-meta">cn-{cls}</code>
          </span>
        ))}
      </Demo>

      <Demo title="Grounds & fills" classes="cn-bg-base / cn-bg-mantle / cn-bg-well / cn-tint" row>
        {["bg-base", "bg-mantle", "bg-well", "tint"].map((cls) => (
          <span key={cls} class={`cn-${cls} cn-edge-soft cn-r-control cn-p-12`}>
            <code class="cn-code-meta">cn-{cls}</code>
          </span>
        ))}
      </Demo>

      <Props
        title="Utility reference"
        rows={[
          { name: ".cn-text-{text,subtext-1,subtext-0,overlay-2}", notes: "The readable ramp, brightest first." },
          { name: ".cn-text-{overlay-1,overlay-0}", notes: "Icons and disabled text only." },
          { name: ".cn-text-{mauve,red,green}", notes: "A palette hue as text." },
          { name: ".cn-text-accent", notes: "Reads --accent." },
          { name: ".cn-tone-{danger,warning,success,info}", notes: "Sets --tone from a status role." },
          { name: ".cn-tone-{red,green,peach,yellow,blue,mauve}", notes: "Sets --tone from a hue." },
          { name: ".cn-tint", notes: "The tone at 4% as a fill. Pair with .cn-tone-*." },
          { name: ".cn-bg-base / .cn-bg-mantle / .cn-bg-well", notes: "The panel fill, the page and the well fill." },
          { name: ".cn-edge", notes: "The hairline of panels, chips and controls." },
          { name: ".cn-edge-soft", notes: "Inner separators." },
          { name: ".cn-edge-dashed", notes: "An open slot. The only meaning of dashed." },
        ]}
      />
    </Doc>
  );
}
