import { Doc, Demo, Props, CodeBlock, TONES, TEAMS, accentStyle } from "../lib/doc";

/* Small inline glyphs (24-unit grid, stroke = currentColor). Decorative:
   always paired with a text label, always aria-hidden. */
function ClockGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function UsersGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M15.5 5.2a3.5 3.5 0 0 1 0 5.6" />
      <path d="M17.5 15.3c1.6.8 2.7 2.4 3 4.7" />
    </svg>
  );
}

function BoltGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M13 3 5 13.5h6L11 21l8-10.5h-6L13 3z" />
    </svg>
  );
}

const TONE_LABELS = {
  red: "Overdue",
  green: "Paid",
  peach: "Pending",
  yellow: "Draft",
  blue: "Synced",
  mauve: "Beta",
};

export default function ChipPage() {
  return (
    <Doc
      title="Chip"
      lede="Two small metadata marks. The outlined .chip holds facts such as counts and versions. The tinted .tag holds a semantic state through --tone. Both stay on one line."
    >
      <Demo title="Chip" classes="chip" row>
        <span class="chip">v2.4.1</span>
        <span class="chip">12 members</span>
        <span class="chip">Updated 4m ago</span>
      </Demo>

      <Demo title="With glyph" classes="chip" row>
        <span class="chip">
          <ClockGlyph />
          Updated 4m ago
        </span>
        <span class="chip">
          <UsersGlyph />
          12 members
        </span>
        <span class="chip">
          <BoltGlyph />
          Auto-renew on
        </span>
      </Demo>

      <p class="cn-copy">
        A chip keeps its label at every width. Mark the glyph{" "}
        <code class="cn-code">aria-hidden="true"</code> so the label is the
        accessible name. For an icon-only chip, add{" "}
        <code class="cn-code">.is-glyph</code> and keep the label in the
        markup or in an <code class="cn-code">aria-label</code>.
      </p>

      <Demo title="Icon-only" classes="chip is-glyph" row>
        <span class="chip is-glyph" aria-label="Auto-renew on">
          <BoltGlyph />
        </span>
        <span class="chip is-glyph" aria-label="12 members">
          <UsersGlyph />
        </span>
      </Demo>

      <Demo title="Tags" classes="tag cn-tone-{tone}" row>
        {TONES.map((tone) => (
          <span key={tone} class={`tag cn-tone-${tone}`}>
            {TONE_LABELS[tone]}
          </span>
        ))}
      </Demo>

      <Demo title="Marks" classes='mark  (set --accent from the record)' row>
        {TEAMS.map((team) => (
          <span class="sc-row" key={team.name}>
            <span class="mark" style={accentStyle(team.accent)} aria-hidden="true">
              {team.name[0]}
            </span>
            <span class="cn-name">{team.name}</span>
          </span>
        ))}
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.mark</code> is the 28px identity square for a
        team tile, a rank or the logo. Set <code class="cn-code">--accent</code>{" "}
        inline from the record it stands for, so the same team gets the same
        square everywhere.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".chip",
            values: "span, a, or button",
            notes: "Outlined pill on --base with raised-soft depth. No wrapping; keep labels short.",
          },
          {
            name: ".chip svg",
            values: "one leading glyph",
            notes: "14px. Decorative: aria-hidden, and the label text carries the name.",
          },
          {
            name: ".chip.is-glyph",
            values: "modifier",
            notes: "Icon-only at any width: 8px padding, 16px svg, label hidden with font-size 0. Keep an accessible name.",
          },
          {
            name: ".tag",
            values: "span",
            notes: "Tinted status tag, 4px radius. The tint and the hairline edge both come from --tone.",
          },
          {
            name: "--tone",
            values: ".cn-tone-red / -green / -peach / -yellow / -blue / -mauve",
            default: "var(--peach)",
            notes: "Semantic color. Set it with a tone utility or inline.",
          },
          {
            name: ".mark",
            values: "28px square",
            default: "--accent: var(--mauve)",
            notes: "Solid accent fill, --shadow-mark, tabular numerals. Set --accent inline per record.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<span class="chip">v2.4.1</span>

<span class="chip">
  <svg aria-hidden="true"><!-- glyph --></svg>
  12 members
</span>

<span class="tag cn-tone-green">Paid</span>

<span class="mark" style="--accent: #94e2d5">P</span>`}
      />
    </Doc>
  );
}
