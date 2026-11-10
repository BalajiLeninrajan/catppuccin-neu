import { Doc, Demo, Props, CodeBlock, TONES, TEAMS, accentStyle } from "../lib/doc";
import { TONE_GLYPH } from "../lib/glyphs";

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
  peach: "On hold",
  yellow: "Due soon",
  blue: "Synced",
  mauve: "Beta",
};

export default function ChipPage() {
  return (
    <Doc
      title="Chip"
      lede="The outlined .chip holds a fact such as a count or a version. The carved .tag holds a status through --tone."
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
        Mark the glyph <code class="cn-code-inline">aria-hidden="true"</code>. The label is the accessible name.
      </p>

      <Demo title="Links and buttons" classes="a.chip · button.chip" row>
        <a class="chip" href="#" onClick={(e) => e.preventDefault()}>
          v2.4.1 release notes
        </a>
        <button type="button" class="chip">
          <UsersGlyph />
          12 members
        </button>
        <button type="button" class="chip">
          <ClockGlyph />
          Last 30 days
        </button>
      </Demo>

      <p class="cn-copy">
        A chip on an <code class="cn-code-inline">a</code> or a <code class="cn-code-inline">button</code> stands on a plate and presses. Use it for a link or an action on one fact.
      </p>

      <Demo title="Status tag" classes="tag cn-tone-success > svg + word" row>
        <span class="tag cn-tone-success">
          <TONE_GLYPH.mauve />
          Paid on schedule
        </span>
      </Demo>

      <Demo title="Palette tags" classes="tag cn-tone-{tone} > svg + word" row>
        {TONES.map((tone) => {
          const Glyph = TONE_GLYPH[tone];
          return (
            <span key={tone} class={`tag cn-tone-${tone}`}>
              <Glyph />
              {TONE_LABELS[tone]}
            </span>
          );
        })}
      </Demo>

      <p class="cn-copy">
        A tone never carries meaning alone. The word states the status, and the svg goes first with <code class="cn-code-inline">aria-hidden="true"</code>.
      </p>

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
        Set <code class="cn-code-inline">--accent</code> inline from the record the mark stands for.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".chip", values: "span, a or button", notes: "An outlined pill for one fact. One line." },
          { name: ":is(a, button).chip", values: ":disabled", notes: "Stands on a plate and presses." },
          { name: ".tag", values: "span", notes: "A carved status label in --tone. Always holds a word." },
          { name: ".chip svg / .tag svg", values: "one leading glyph", notes: "Decorative, aria-hidden." },
          { name: "--tone", values: ".cn-tone-danger / -warning / -success / -info · .cn-tone-red / -green / -peach / -yellow / -blue / -mauve", default: "var(--cn-info)", notes: "Set it with a tone utility or inline." },
          { name: ".mark", values: "28px square", default: "--accent: var(--mauve)", notes: "An identity square. Set --accent per record." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<span class="chip">v2.4.1</span>

<span class="chip">
  <svg aria-hidden="true"><!-- glyph --></svg>
  12 members
</span>

<span class="tag cn-tone-danger">
  <svg aria-hidden="true"><!-- cross glyph --></svg>
  Overdue
</span>

<span class="mark" style="--accent: #94e2d5">P</span>`}
      />
    </Doc>
  );
}
