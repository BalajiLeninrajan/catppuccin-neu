import { Doc, Demo, Props, CodeBlock, TONES, TEAMS, ACCENT, accentStyle } from "../lib/doc";

/* Data series in chart order, the sequential ramp for one measure, and the
   diverging ramp for a measure with a meaningful zero. */
const SERIES = ["teal", "yellow", "mauve", "peach", "blue 70%", "pink 70%"];
const RAMP_STOPS = [20, 40, 60, 80, 100];
const DIVERGE_STOPS = ["red", "red 50%", "zero", "blue 50%", "blue"];

/* Two series over four months: messages by channel, in thousands. */
const CHANNELS = [
  { name: "Email", series: 1 },
  { name: "Chat", series: 2 },
];
const MONTHS = [
  { month: "May", values: [4.2, 2.8] },
  { month: "Jun", values: [4.6, 3.5] },
  { month: "Jul", values: [3.9, 4.4] },
  { month: "Aug", values: [4.1, 5.2] },
];
const MAX = 6;

/* One measure on the ramp: invoices settled per weekday, in the low-to-high
   order the ramp encodes. */
const WEEKDAYS = [
  { day: "Mon", count: 14, step: 2 },
  { day: "Tue", count: 22, step: 3 },
  { day: "Wed", count: 31, step: 5 },
  { day: "Thu", count: 27, step: 4 },
  { day: "Fri", count: 9, step: 1 },
];
/* A measure with a zero: signups against the prior week, per weekday.
   Below zero runs red, above runs blue, no change sits on surface-1. */
const CHANGES = [
  { day: "Mon", change: "+7%", step: 4 },
  { day: "Tue", change: "−6%", step: 2 },
  { day: "Wed", change: "0%", step: 3 },
  { day: "Thu", change: "+21%", step: 5 },
  { day: "Fri", change: "−18%", step: 1 },
];
import { TONE_GLYPH, NEEDS_GLYPH } from "../lib/glyphs";

/* The full Mocha set, grouped by role. name → token, hex, one-line role note. */
const GROUNDS = [
  { name: "crust", hex: "#11111b", note: "Deepest ground: scrims, the default plate, the progress track, text on accent fills." },
  { name: "mantle", hex: "#181825", note: "The page ground, --cn-surface-page. Crust mixes into it for the sunken and recessed surfaces." },
  { name: "base", hex: "#1e1e2e", note: "The raised fill, --cn-surface-raised: panels and plated controls, one step above the page." },
  { name: "surface-0", hex: "#313244", note: "Row separators. Mixed into base for the overlay surface; raised surfaces stay on base." },
  { name: "surface-1", hex: "#45475a", note: "--edge-soft at 38% and the hover wash at 40%, dashed open slots and the resting ring of a table-cell field." },
  { name: "surface-2", hex: "#585b70", note: "--edge-strong solid, the lead panel and overlay hairline. The --edge hairline at 70%, the lit top edge of raised surfaces at 45%, the well ring under prefers-contrast, scrollbar thumbs." },
];

const NEUTRAL_TEXT = [
  { name: "overlay-0", hex: "#6c7086", note: "--edge under prefers-contrast: more, 3.4:1 on base, so a panel shows a 3:1 boundary. Not for text." },
  { name: "overlay-1", hex: "#7f849c", note: "A hovered field's ring, --edge-strong under prefers-contrast: more, unchecked control edges, the slider thumb edge, disabled text, decorative icons and list markers. Not for readable text." },
  { name: "overlay-2", hex: "#9399b2", note: "Placeholders, --cn-fg-placeholder. The faintest readable text." },
  { name: "subtext-0", hex: "#a6adc8", note: "Meta, help and table heads, --cn-fg-muted." },
  { name: "subtext-1", hex: "#bac2de", note: "Body copy, ledes, table cells and code." },
  { name: "text", hex: "#cdd6f4", note: "Headings and primary content. The focus ring, --cn-focus." },
];

const HUES = [
  { name: "rosewater", hex: "#f5e0dc", note: "Record identity only, beyond the six series." },
  { name: "flamingo", hex: "#f2cdcd", note: "Record identity only, beyond the six series." },
  { name: "pink", hex: "#f5c2e7", note: "The hover of links and the primary. 70% into base, the sixth data series." },
  { name: "mauve", hex: "#cba6f7", note: "The interactive color: links, the primary, checked and engaged states. The third data series." },
  { name: "red", hex: "#f38ba8", note: "Danger and destructive actions, --cn-danger." },
  { name: "maroon", hex: "#eba0ac", note: "Record identity only, beyond the six series." },
  { name: "peach", hex: "#fab387", note: "The fourth data series." },
  { name: "yellow", hex: "#f9e2af", note: "The warning role, --cn-warning: due soon, expiring. The second data series." },
  { name: "green", hex: "#a6e3a1", note: "Success, live indicators, positive deltas, --cn-success." },
  { name: "teal", hex: "#94e2d5", note: "The first data series." },
  { name: "sky", hex: "#89dceb", note: "Record identity only, beyond the six series." },
  { name: "sapphire", hex: "#74c7ec", note: "Record identity only, beyond the six series." },
  { name: "blue", hex: "#89b4fa", note: "Informational status, --cn-info. 70% into base, the fifth data series." },
  { name: "lavender", hex: "#b4befe", note: "Record identity only, beyond the six series." },
];

/* Every hue's one job, from the SPEC's palette table. */
const HUE_JOBS: Array<[string[], string]> = [
  [["mauve"], "Interaction: links, the primary, checked and engaged states. Series 3."],
  [["pink"], "The interactive hover. Series 6."],
  [["red"], "Danger."],
  [["yellow"], "Warning. Series 2."],
  [["green"], "Success."],
  [["blue"], "Info. Series 5."],
  [["teal"], "Series 1."],
  [["peach"], "Series 4."],
  [["rosewater", "flamingo", "maroon", "sky", "sapphire", "lavender"], "Record identity only: an --accent for a team, project or person beyond the six series. Never status or interaction."],
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
      <div class="cn-r-mark cn-edge-soft" style={`height:52px;background:var(--${name})`} />
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
      lede="Catppuccin Mocha, verbatim: all 26 colors, no substitute hexes. Twelve neutrals carry the grounds and the text ramp. Fourteen hues carry status, interaction and identity."
    >
      <p class="cn-copy">
        Components read the{" "}
        <a href="https://catppuccin.com/" target="_blank" rel="noreferrer">
          Catppuccin
        </a>{" "}
        Mocha tokens below and never a raw hex value.
      </p>

      <Demo title="Grounds & surfaces" why="Tokens, never raw hexes">
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

      <Demo title="Hues" why="The two contract properties">
        <div class="sc-grid">
          {HUES.map((t) => (
            <Swatch key={t.name} {...t} />
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        A component reads a token directly, or one of the two contract
        properties: <code class="cn-code-inline">--tone</code> for semantic
        tinting and <code class="cn-code-inline">--accent</code> for
        per-instance identity.
      </p>

      <h2 class="cn-title">Every hue has a job</h2>
      <p class="cn-copy">
        No hue is free decoration. Each one does one thing, so a color on the
        page always means the same thing. Six hues sit outside the six data
        series and carry no status: use them only as a record's{" "}
        <code class="cn-code-inline">--accent</code> when a seventh team or
        project needs its own color.
      </p>

      <Demo title="Hue jobs" why="Why each hue has one job">
        <div style="width:100%">
          <table class="data-table">
            <thead>
              <tr>
                <th scope="col">Hue</th>
                <th scope="col">Job</th>
              </tr>
            </thead>
            <tbody>
              {HUE_JOBS.map(([hues, job]) => (
                <tr key={hues[0]}>
                  <td data-label="Hue">
                    <span class="cn-cluster">
                      {hues.map((h) => (
                        <span key={h} class="cn-row cn-gap-8">
                          <span
                            class="cn-r-chip cn-edge-soft"
                            aria-hidden="true"
                            style={`display:inline-block;width:14px;height:14px;background:var(--${h})`}
                          />
                          {h}
                        </span>
                      ))}
                    </span>
                  </td>
                  <td data-label="Job">{job}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Demo>

      <h2 class="cn-title">Semantic roles</h2>
      <p class="cn-copy">
        Recipes read a role for each job instead of a palette name. Every role
        is a Mocha color above. Because recipes read the roles, the{" "}
        <code class="cn-code-inline">prefers-contrast: more</code> block can re-key
        them in one place and every component follows. The{" "}
        <a href="/accessibility">Accessibility</a> page lists the ratio of
        each on base.
      </p>

      <Props
        title="Role tokens"
        rows={[
          { name: "--cn-fg", values: "text", notes: "Headings, names, values." },
          { name: "--cn-fg-soft", values: "var(--cn-fg-body)", notes: "Ledes, table cells, code, .cn-label and field labels. A job alias of body: Mocha has no stop between subtext-1 and text, so the two share a value and soft follows body under prefers-contrast: more." },
          { name: "--cn-fg-body", values: "subtext-1", notes: "Running text: body, .cn-copy, .cn-prose. text under prefers-contrast." },
          { name: "--cn-fg-muted", values: "subtext-0", notes: "Meta, help, table heads. subtext-1 under prefers-contrast." },
          { name: "--cn-fg-placeholder", values: "overlay-2", notes: "Placeholders. The floor for readable text. subtext-0 under prefers-contrast." },
          { name: "--cn-fg-faint", values: "overlay-1", contrast: "4.4:1 on base", notes: "Decorative icons. Icon buttons rest in --cn-fg-muted. overlay-2 under prefers-contrast." },
          { name: "--cn-fg-disabled", values: "overlay-1", notes: "Disabled text, 4.4:1 on base. --control-edge, the unchecked edge and slider thumb edge, is overlay-1 too. Both move to overlay-2 under prefers-contrast." },
          { name: "--cn-fg-on-accent", values: "crust", notes: "Text and glyphs on a solid accent fill: 9.2:1 on mauve." },
          { name: "--cn-interactive", values: "mauve", notes: "Links, the primary, checked controls." },
          { name: "--cn-interactive-hover", values: "pink", notes: "Their hover." },
          { name: "--cn-focus", values: "text", notes: "The focus ring, 11.3:1 on base. The one bright neutral no state uses, so focus differs from the mauve engaged rim by hue as well as shape." },
          { name: "--cn-danger", values: "red", notes: "Errors, overdue, destructive actions." },
          { name: "--cn-warning", values: "yellow", notes: "Due soon, expiring, outside the domain. 1.8:1 from red, where peach is 1.3:1." },
          { name: "--cn-success", values: "green", notes: "Paid, live, positive deltas." },
          { name: "--cn-info", values: "blue", notes: "Drafts, syncing, neutral status." },
        ]}
      />

      <Demo title="Text by role" why="Role utilities and prefers-contrast" classes="cn-fg · cn-fg-soft · cn-fg-body · cn-fg-muted · cn-fg-placeholder">
        {["fg", "fg-soft", "fg-body", "fg-muted", "fg-placeholder"].map((role) => (
          <p key={role} class={`cn-copy cn-${role}`} style="margin:0">
            <code class="cn-code-inline">cn-{role}</code> · Invoice #1042 paid by
            Northwind on Aug 24.
          </p>
        ))}
      </Demo>

      <p class="cn-copy">
        The <code class="cn-code-inline">.cn-fg-*</code> utilities follow{" "}
        <code class="cn-code-inline">prefers-contrast</code>; the{" "}
        <code class="cn-code-inline">.cn-text-*</code> palette utilities below do
        not. <code class="cn-code-inline">.cn-fg-faint</code> sits
        under the text floor, so the demo leaves it out. Use it for icons and
        text a reader can do without.{" "}
        <code class="cn-code-inline">.cn-tone-danger</code>,{" "}
        <code class="cn-code-inline">-warning</code>,{" "}
        <code class="cn-code-inline">-success</code> and{" "}
        <code class="cn-code-inline">-info</code> set{" "}
        <code class="cn-code-inline">--tone</code> from the status roles, swap
        in that role's ladder and bring its glyph. A tone never carries
        meaning alone, because red, peach and pink sit close in lightness. The
        word in the tag or banner states the status. Danger and warning also
        lead with a glyph, because they are the tones a reader must not miss.
        A status tag or banner with no svg of its own draws its glyph from
        CSS, so the markup below holds only the word.
      </p>

      <Demo title="Tones by role" classes="tag cn-tone-danger · -warning · -success · -info  (the glyph comes from CSS)" row>
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

      <h2 class="cn-title">Status ladders</h2>
      <p class="cn-copy">
        Each status role has four named stops, one per job. Tags, banners,
        invalid fields and the icon-button hover read them through{" "}
        <code class="cn-code-inline">--tint</code>,{" "}
        <code class="cn-code-inline">--tone-wash</code>,{" "}
        <code class="cn-code-inline">--tone-edge</code> and{" "}
        <code class="cn-code-inline">--tone-border</code>. By default those four
        mix the element's own <code class="cn-code-inline">--tone</code> at the
        shared steps. The four status setters swap in their role's ladder
        instead, so one hue's stop can be tuned without moving the mix steps
        for every other hue. The palette setters set{" "}
        <code class="cn-code-inline">--tone</code> only.
      </p>

      <Props
        title="Ladder stops"
        rows={[
          { name: "--cn-{role}-tint", values: "role 6% into transparent", default: "--tint", notes: "The status banner ground, at --cn-step-status-tint. An invalid field's well stays at 4%." },
          { name: "--cn-{role}-wash", values: "role 12% into transparent", default: "--tone-wash", notes: "The tag ground and the icon-button hover. The danger ghost and the danger menu item read --cn-danger-wash directly." },
          { name: "--cn-{role}-edge", values: "role 40% into transparent", default: "--tone-edge", notes: "The icon-button hover edge." },
          { name: "--cn-{role}-border", values: "role 25% into surface-0", default: "--tone-border", notes: "The banner edge and .cn-edge-tone." },
        ]}
      />

      <p class="cn-copy">
        <code class="cn-code-inline">{"{role}"}</code> is danger, warning,
        success or info, so <code class="cn-code-inline">--cn-danger-wash</code>{" "}
        is red at 12%. The default column names the property a recipe reads.
      </p>

      <CodeBlock
        title="Tuning one stop"
        code={`/* Warning's yellow is light; give its banner a stronger edge */
:root {
  --cn-warning-border: color-mix(in srgb, var(--cn-warning) 35%, var(--surface-0));
}

<span class="tag cn-tone-warning">Due soon</span>  <!-- reads --cn-warning-wash -->
<div class="banner cn-tone-warning">Card expires in 6 days.</div>  <!-- reads --cn-warning-border -->`}
      />

      <h2 class="cn-title">Semantic assignments</h2>
      <p class="cn-copy">
        Six hues have fixed meanings. Set them through the{" "}
        <code class="cn-code-inline">.cn-tone-*</code> palette utilities. They
        write <code class="cn-code-inline">--tone</code> and nothing else, so
        tags, banners and tinted edges re-key as a group. They draw no glyph:
        a red or yellow tag brings its own svg.
      </p>

      <Props
        title="Tone setters"
        rows={[
          { name: ".cn-tone-green", values: "#a6e3a1", notes: "Success: paid, live, positive deltas." },
          { name: ".cn-tone-red", values: "#f38ba8", notes: "Danger: errors, overdue, destructive actions." },
          { name: ".cn-tone-peach", values: "#fab387", notes: "A held or paused state. Peach is warm: never beside a red, yellow or pink tag." },
          { name: ".cn-tone-yellow", values: "#f9e2af", notes: "Warning: due soon, expiring. The same hue as .cn-tone-warning." },
          { name: ".cn-tone-blue", values: "#89b4fa", notes: "Info: drafts, syncing, neutral status." },
          { name: ".cn-tone-mauve", values: "#cba6f7", notes: "Brand accent as a tone: scheduled, selected." },
        ]}
      />

      <Demo title="Tones in use" classes="tag cn-tone-green" row>
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
        <code class="cn-code-inline">--accent</code> is the color of one thing: a
        team, a person, a project. Accent cards, marks, avatars, hero values
        and the <code class="cn-code-inline">cn-*-accent</code> utilities read it.
        Store the accent on the record, or derive it from a stable id, and
        set it inline wherever the record renders. It never comes from list
        position, so sorting or filtering never recolors an item. The six
        accents are the six data series below: teal, yellow, mauve, peach,
        blue and pink. A seventh record takes one of the six identity hues
        (rosewater, flamingo, maroon, sky, sapphire or lavender), which
        never mean status or interaction. Here Billing takes sapphire, which
        sits beside peach and away from blue, its cool pair.
      </p>

      <Demo title="Six accents, one per team, and a seventh team on an identity hue" why="What --accent is for" classes='style="--accent:#94e2d5"  (from the record)' row>
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
        code={`// stored on the team record
{ id: "payments", name: "Payments", accent: "#94e2d5" }

<!-- rendered the same wherever Payments appears -->
<article class="accent-card" style="--accent: #94e2d5">
  <span class="mark">P</span>
  <h3 class="cn-name">Payments</h3>
  <p class="cn-meta">12 members</p>
</article>`}
      />

      <h2 class="cn-title">Data series</h2>
      <p class="cn-copy">
        A chart takes <code class="cn-code-inline">--cn-series-1</code> to{" "}
        <code class="cn-code-inline">--cn-series-6</code> in order: teal,
        yellow, mauve, peach, blue and pink. These are the six accents,
        alternating cool and warm so neighbors never share a hue family.
        Series 1 is teal, not mauve, so the biggest bar in a chart never
        reads as the interactive color. Series 5 and 6 are blue and pink 70%
        into base in oklab, 4.3:1 and 5.6:1 on base, a lightness step under
        the rest. At full strength blue collapses into mauve for a protan
        reader and pink into teal for a deutan one. Under a full-severity
        simulation (Machado 2009) every adjacent pair stays above dE 6 in
        OKLab, the closest being series 5 and 6 at 6.2 for a protan reader,
        and series 1 and 5, teal and blue, sit at dE 25 or more. A record with an identity
        keeps its own <code class="cn-code-inline">--accent</code> instead, so
        Payments is teal in every chart, whatever position it plots in.
      </p>

      <p class="cn-copy">
        <code class="cn-code-inline">--cn-ramp-1</code> to{" "}
        <code class="cn-code-inline">--cn-ramp-5</code> is a sequential ramp
        for one measure: mauve mixed into surface-0 in oklab at 20, 40, 60, 80
        and 100%. Oklab keeps the steps even in lightness, and data colors
        are the one place the package mixes outside srgb.{" "}
        <code class="cn-code-inline">--cn-diverge-1</code> to{" "}
        <code class="cn-code-inline">--cn-diverge-5</code> is for a measure with
        a meaningful zero: red, red half into surface-1, surface-1 at zero,
        blue half into surface-1, and blue. Color is never the only key. Every
        series and ramp mark keeps a word or a value next to it, and{" "}
        <code class="cn-code-inline">.is-hatched</code> on a{" "}
        <code class="cn-code-inline">.bar</code> or{" "}
        <code class="cn-code-inline">.legend-item</code> adds stripes for a
        series that must stand apart without color. Tailwind
        calls them <code class="cn-code-inline">series-1</code> to{" "}
        <code class="cn-code-inline">-6</code>,{" "}
        <code class="cn-code-inline">ramp-1</code> to{" "}
        <code class="cn-code-inline">-5</code> and{" "}
        <code class="cn-code-inline">diverge-1</code> to{" "}
        <code class="cn-code-inline">-5</code>.
      </p>

      <p class="cn-copy">
        Mocha's accents sit within 1.8:1 of each other in lightness, so hue
        does the separating. Two hues from one family never sit side by side,
        as neighboring series, adjacent tags or the two ends of a scale. The
        warm family is red, maroon, peach, pink, flamingo and yellow. The cool pairs
        are sky and teal, mauve and lavender, and blue and sapphire. A reader
        with a red-green deficiency loses the warm family first, which is why
        every status tone also carries a word and a shape.
      </p>

      <Demo title="Series and ramps" why="How the series and ramps were picked" classes="--cn-series-1..6 · --cn-ramp-1..5 · --cn-diverge-1..5" row>
        {SERIES.map((name, i) => (
          <div key={name} class="cn-stack cn-gap-8" style="justify-items:center">
            <div class="cn-r-mark" style={`width:48px;height:32px;background:var(--cn-series-${i + 1})`} />
            <code class="cn-code-meta">series-{i + 1}</code>
            <span class="cn-meta">{name}</span>
          </div>
        ))}
        {RAMP_STOPS.map((pct, i) => (
          <div key={pct} class="cn-stack cn-gap-8" style="justify-items:center">
            <div class="cn-r-mark" style={`width:48px;height:32px;background:var(--cn-ramp-${i + 1})`} />
            <code class="cn-code-meta">ramp-{i + 1}</code>
            <span class="cn-meta">{pct}%</span>
          </div>
        ))}
        {DIVERGE_STOPS.map((label, i) => (
          <div key={label} class="cn-stack cn-gap-8" style="justify-items:center">
            <div class="cn-r-mark" style={`width:48px;height:32px;background:var(--cn-diverge-${i + 1})`} />
            <code class="cn-code-meta">diverge-{i + 1}</code>
            <span class="cn-meta">{label}</span>
          </div>
        ))}
      </Demo>

      <Demo title="Two series, values beside the bars" classes="bar-chart · --series: var(--cn-series-1) · var(--cn-series-2)">
        <figure class="cn-stack cn-gap-16 cn-m-0" style="width:min(520px,100%)">
          <figcaption class="cn-name">Messages by channel, in thousands</figcaption>
          <ul class="legend">
            {CHANNELS.map((c) => (
              <li key={c.name} class="legend-item" style={`--series:var(--cn-series-${c.series})`}>
                {c.name}
              </li>
            ))}
          </ul>
          <div class="bar-chart">
            {MONTHS.map((m) => [
              <span key={`${m.month}-label`}>{m.month}</span>,
              <div key={`${m.month}-bars`} class="bar-group">
                {m.values.map((v, i) => (
                  <div
                    key={CHANNELS[i].name}
                    class="bar"
                    style={`--value:${((v / MAX) * 100).toFixed(1)}%;--series:var(--cn-series-${CHANNELS[i].series})`}
                  >
                    {v.toFixed(1)}
                    <span class="cn-sr-only"> {CHANNELS[i].name}</span>
                  </div>
                ))}
              </div>,
            ])}
          </div>
        </figure>
      </Demo>

      <Demo title="One measure on the ramp" classes="background: var(--cn-ramp-1..5)" row>
        {WEEKDAYS.map((d) => (
          <div key={d.day} class="cn-stack cn-gap-8" style="justify-items:center">
            <div
              class="cn-r-control"
              style={`width:56px;height:40px;background:var(--cn-ramp-${d.step})`}
              aria-hidden="true"
            />
            <span class="cn-name">{d.count}</span>
            <span class="cn-meta">{d.day}</span>
          </div>
        ))}
      </Demo>

      <Demo title="Change from zero on the diverging ramp" classes="background: var(--cn-diverge-1..5)" row>
        {CHANGES.map((d) => (
          <div key={d.day} class="cn-stack cn-gap-8" style="justify-items:center">
            <div
              class="cn-r-control"
              style={`width:56px;height:40px;background:var(--cn-diverge-${d.step})`}
              aria-hidden="true"
            />
            <span class="cn-name cn-tabular">{d.change}</span>
            <span class="cn-meta">{d.day}</span>
          </div>
        ))}
      </Demo>

      <Props
        title="Series and ramp tokens"
        rows={[
          { name: "--cn-series-1", values: "teal", notes: "The first series, off mauve so a bar never reads as interactive. Tailwind series-1." },
          { name: "--cn-series-2", values: "yellow", notes: "Tailwind series-2." },
          { name: "--cn-series-3", values: "mauve", notes: "Tailwind series-3." },
          { name: "--cn-series-4", values: "peach", notes: "Tailwind series-4." },
          { name: "--cn-series-5", values: "blue 70% into base, oklab", notes: "4.3:1 on base. Tailwind series-5." },
          { name: "--cn-series-6", values: "pink 70% into base, oklab", notes: "5.6:1 on base. Tailwind series-6." },
          { name: "--cn-ramp-1..5", values: "mauve into surface-0, oklab, 20 to 100%", notes: "One measure, low to high. --cn-ramp-5 is mauve itself. Tailwind ramp-1 to ramp-5." },
          { name: "--cn-diverge-1..5", values: "red, red 50% into surface-1, surface-1, blue 50% into surface-1, blue, oklab", notes: "A measure with a meaningful zero. --cn-diverge-3 is the zero. Tailwind diverge-1 to diverge-5." },
        ]}
      />

      <h2 class="cn-title">Mix steps</h2>
      <p class="cn-copy">
        Tinted surfaces are never opaque hue fills. Every tint is a{" "}
        <code class="cn-code-inline">color-mix(in srgb, …)</code> of a hue into a
        ground or into transparent, at one of nine steps. Every hue tint in
        the recipes reads one of these tokens, so a wash is the same strength
        on every component.
      </p>

      <Props
        title="The steps"
        rows={[
          { name: "--cn-step-tint", values: "4%", notes: "A field in its tone, an untoned --tint, the open accordion row." },
          { name: "--cn-step-status-tint", values: "6%", notes: "The four status tints, so a toned banner or .cn-tint shows its tone before its glyph and body text on it stays 8.0:1 or better on a panel." },
          { name: "--cn-step-row", values: "12%", notes: "Table and ranked row hovers: 1.27:1 for mauve on base, past the 1.24:1 hover and the open carve's 1.08:1, and 1.20:1 under a selected row." },
          { name: "--cn-step-wash", values: "12%", notes: "Tone hover washes, 1.27:1 for mauve on base: the tag ground, the current stepper phase, the dashed, icon and danger ghost hovers, the .cn-tint-accent corner." },
          { name: "--cn-step-engaged", values: "20%", notes: "The engaged wash, --wash: 1.52:1 on base, a step past the 1.24:1 hover. Segmented choices, toggled ghosts, selected rows, the current page." },
          { name: "--cn-step-fill", values: "14%", notes: "Avatar grounds, the radio and live-dot halos, the .mark border and the switch glow." },
          { name: "--cn-step-plate", values: "25%", notes: "The primary's plate, the banner edge, .cn-edge-mauve, .cn-edge-accent and the switch glow while held." },
          { name: "--cn-step-edge", values: "40%", notes: "Hue hairlines: the avatar edge, the icon-button hover edge, the segmented hover." },
          { name: "--cn-step-strong", values: "50%", notes: "The warmed secondary and checked radio borders." },
          { name: "--cn-step-vivid", values: "70%", notes: "Accent-card plates, so six accents stay apart, and --engaged-edge, so the rim clears 3:1." },
        ]}
      />

      <Demo title="The nine steps of mauve into base" row>
        {[
          ["tint", 4],
          ["row", 8],
          ["wash", 12],
          ["engaged", 20],
          ["fill", 14],
          ["plate", 25],
          ["edge", 40],
          ["strong", 50],
          ["vivid", 70],
        ].map(([step, pct]) => (
          <div key={step} class="cn-stack cn-gap-8" style="justify-items:center">
            <div
              class="cn-r-mark cn-edge-soft"
              style={`width:64px;height:40px;background:color-mix(in srgb, var(--mauve) var(--cn-step-${step}), var(--base))`}
            />
            <code class="cn-code-meta">--cn-step-{step}</code>
            <span class="cn-meta">{pct}%</span>
          </div>
        ))}
      </Demo>

      <CodeBlock
        title="The steps in use"
        code={`/* The mix tokens hold the shared expressions; use them, not the mix */
--edge:      color-mix(in srgb, var(--surface-2) 70%, transparent); /* raised-surface hairline: 1.85:1 on base */
--edge-soft: color-mix(in srgb, var(--surface-1) 38%, transparent); /* inner separators */
--edge-strong: var(--surface-2);                                   /* lead panel and overlay hairline: 2.5:1 */
--wash:      color-mix(in srgb, var(--cn-interactive) var(--cn-step-engaged), var(--base)); /* the engaged state: 1.52:1 */
--engaged-edge: color-mix(in srgb, var(--cn-interactive) var(--cn-step-vivid), transparent); /* the engaged rim: 4.7:1 on base, 3.5:1 on its wash */
--hover:     color-mix(in srgb, var(--surface-1) 40%, transparent);  /* the hover wash: 1.24:1 on base, 1.15:1 on overlay */
--cn-well-ring: inset 0 0 0 1px transparent; /* wells and mono wells: a surface-2 ring under prefers-contrast only */

/* The tone stops are declared on each tinted recipe, so they read that
   element's --tone. A status .cn-tone-* swaps in its ladder. */
--tint:        color-mix(in srgb, var(--tone) var(--cn-step-tint), transparent);
--tone-wash:   color-mix(in srgb, var(--tone) var(--cn-step-wash), transparent);
--tone-edge:   color-mix(in srgb, var(--tone) var(--cn-step-edge), transparent);  /* the icon-button hover edge */
--tone-border: color-mix(in srgb, var(--tone) var(--cn-step-plate), var(--surface-0)); /* the banner edge */`}
      />

      <p class="cn-copy">
        Three of the mix tokens are states.{" "}
        <code class="cn-code-inline">--hover</code> is the ghost hover:
        surface-1 at 40% over whatever sits under it, so a menu row on an
        overlay still lights. Ghost buttons, menu rows,
        page targets and sidebar links take it on hover.{" "}
        <code class="cn-code-inline">--wash</code> is the engaged state: mauve
        at <code class="cn-code-inline">--cn-step-engaged</code> (20%) into base,
        a step past the hover, so the fill alone tells a chosen option
        from a hovered one. An engaged state also wears{" "}
        <code class="cn-code-inline">--engaged-edge</code>, a mauve rim at{" "}
        <code class="cn-code-inline">--cn-step-vivid</code> (70%) that clears
        the non-text floor on its own wash, and the full inset. The token
        comments below carry each ratio.
      </p>

      <Demo title="Hover and engaged" why="The hover and engaged mixes" classes="background: var(--hover) · cn-engaged (--wash, --engaged-edge, --neu-inset)" row>
        <div class="cn-r-control cn-px-16 cn-py-12 cn-ui cn-fg" style="background:var(--hover);border:1px solid transparent">--hover</div>
        <div class="cn-r-control cn-px-16 cn-py-12 cn-ui cn-fg cn-edge cn-engaged">.cn-engaged</div>
      </Demo>

      <Demo title="Tints at recipe strength" classes="banner cn-tone-green">
        <div class="banner cn-tone-green">
          <TONE_GLYPH.green />
          All 14 invoices reconciled. Next sync runs at 02:00.
        </div>
        <div class="banner cn-tone-red">
          <TONE_GLYPH.red />
          Payment method expired. Update settings before renewal.
        </div>
      </Demo>

      <h2 class="cn-title">Text color utilities</h2>
      <p class="cn-copy">
        The neutral ramp maps one to one onto{" "}
        <code class="cn-code-inline">.cn-text-*</code> utilities, brightest to
        faintest. Readable text stops at overlay-2, the placeholder color.
        Meta sits a stop above it on subtext-0, and labels
        a stop above that on subtext-1. overlay-1 is for
        decorative icons, a hovered field's ring, control edges
        and disabled text, because it falls under the text floor. The{" "}
        <a href="/accessibility">Accessibility</a> page has each role's
        ratio. No recipe reads
        overlay-0 by default; it is the panel hairline under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code>. Palette hues get the same treatment, like{" "}
        <code class="cn-code-inline">.cn-text-mauve</code>, plus{" "}
        <code class="cn-code-inline">.cn-text-accent</code> and{" "}
        <code class="cn-code-inline">.cn-text-tone</code> for the contract properties.
      </p>

      <Demo title="Readable text ramp" why="Where readable text stops" classes="cn-text-text … cn-text-overlay-2">
        {RAMP.map((step) => (
          <p key={step} class={`cn-copy cn-text-${step}`} style="margin:0">
            <code class="cn-code-inline">cn-text-{step}</code> · Monthly report ready,
            412 messages triaged across 6 teams.
          </p>
        ))}
      </Demo>

      <h2 class="cn-title">Border utilities</h2>
      <p class="cn-copy">
        Each edge utility is a fixed mix. Hairlines belong to raised and
        tinted surfaces; inset surfaces stay borderless.{" "}
        <code class="cn-code-inline">.cn-edge-tone</code> reads{" "}
        <code class="cn-code-inline">--tone</code>;{" "}
        <code class="cn-code-inline">.cn-edge-dashed</code> is the open-slot edge.
        Dashed means an open slot and nothing else. The disabled checkbox,
        radio and switch drop to a plain{" "}
        <code class="cn-code-inline">--edge</code> instead, and the disabled
        primary drops its edge for a carve.
      </p>

      <Demo
        title="Edges" why="Which surfaces take a hairline"
        classes="cn-edge / cn-edge-soft / cn-edge-line / cn-edge-mauve / cn-edge-tone / cn-edge-dashed"
        row
      >
        {["edge", "edge-soft", "edge-line", "edge-mauve", "edge-tone", "edge-dashed"].map(
          (cls) => (
            <span
              key={cls}
              class={`cn-${cls} cn-r-control cn-px-12 cn-py-8`}
            >
              <code class="cn-code-meta">
                cn-{cls}
              </code>
            </span>
          ),
        )}
      </Demo>

      <Props
        title="Edge reference"
        rows={[
          { name: ".cn-edge", values: "surface-2 70%", notes: "Raised-surface hairline, 1.85:1 on base, the raised fill, 1.92:1 on the page and 1.6:1 on an overlay. The cut edge of panels, chips and controls." },
          { name: ".cn-edge-soft", values: "surface-1 38%", notes: "Inner separators." },
          { name: ".cn-edge-line", values: "surface-0", notes: "Row separators, footer rules." },
          { name: ".cn-edge-mauve", values: "mauve at --cn-step-plate (25%)", notes: "Accent-forward edge." },
          { name: ".cn-edge-tone", values: "--tone-border", notes: "Semantic edge: the tone 25% into surface-0, or the status ladder's border. Pair with .cn-tone-*." },
          { name: ".cn-edge-dashed", values: "dashed surface-1", notes: "Open slots. The one dashed utility." },
        ]}
      />

      <h2 class="cn-title">Background utilities</h2>
      <p class="cn-copy">
        The first six follow the surface ladder on the{" "}
        <a href="/surfaces">Surfaces</a> page. <code class="cn-code-inline">.cn-bg-hover</code>{" "}
        is the ghost hover as a fill. Base, mantle and crust are raw palette
        grounds, and <code class="cn-code-inline">.cn-tint</code> reads{" "}
        <code class="cn-code-inline">--tone</code>.
      </p>
      <Demo
        title="Grounds & fills" why="How the fill utilities map to the ladder"
        classes="cn-bg-page / cn-bg-raised / cn-bg-overlay / cn-bg-recessed / cn-bg-head / cn-bg-well / cn-bg-hover / cn-bg-base / cn-bg-mantle / cn-bg-crust / cn-tint"
        row
      >
        {["bg-page", "bg-raised", "bg-overlay", "bg-recessed", "bg-head", "bg-well", "bg-hover", "bg-base", "bg-mantle", "bg-crust", "tint"].map(
          (cls) => (
            <span
              key={cls}
              class={`cn-${cls} cn-edge-soft cn-r-mark cn-p-12`}
            >
              <code class="cn-code-meta">
                cn-{cls}
              </code>
            </span>
          ),
        )}
      </Demo>

      <Props
        title="Background reference"
        rows={[
          { name: ".cn-bg-page", values: "var(--cn-surface-page)", notes: "mantle. The page ground." },
          { name: ".cn-bg-raised", values: "var(--cn-surface-raised)", notes: "base, 1.07:1 on the page. The panel fill; a panel lifts by that step and by its edges and shadow." },
          { name: ".cn-bg-overlay", values: "var(--cn-surface-overlay)", notes: "surface-0 90% into base, 1.27:1 on base. The popover, dialog and toast fill." },
          { name: ".cn-bg-recessed", values: "var(--cn-surface-recessed)", notes: "crust 50% into mantle, a step under the page. The sidebar fill." },
          { name: ".cn-bg-hover", values: "var(--hover)", notes: "surface-1 40% over the ground, 1.24:1 on base. The ghost hover as a fill." },
          { name: ".cn-bg-head", values: "var(--cn-surface-band)", notes: "crust 30% over transparent, one step under its parent. Table heads." },
          { name: ".cn-bg-well", values: "var(--cn-surface-sunken)", notes: "crust 70% into mantle, under the page and a panel. The well and skeleton fill; .well already carries it." },
          { name: ".cn-bg-base", values: "var(--base)", notes: "Raw base, the same color as the raised fill." },
          { name: ".cn-bg-mantle", values: "var(--mantle)", notes: "Raw mantle." },
          { name: ".cn-bg-crust", values: "var(--crust)", notes: "Deepest fill." },
          { name: ".cn-tint", values: "tone 4% into transparent, 6% on a status tone", notes: "Semantic wash; pair with .cn-tone-*. A palette tone tints at --cn-step-tint and a status tone at --cn-step-status-tint." },
        ]}
      />
    </Doc>
  );
}
