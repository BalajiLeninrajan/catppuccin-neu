import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function AccentCardPage() {
  return (
    <Doc
      title="Accent card"
      lede="A card on a plate in its accent. The plate is the only place the accent shows. The border, the name and the numbers stay neutral."
    >
      <Demo title="Teams, each in its own accent" classes="accent-card  (set --accent from the record)">
        <div class="sc-grid" style="width:100%">
          {TEAMS.map((team) => (
            <div class="accent-card" style={accentStyle(team.accent)} key={team.name}>
              <p class="cn-name" style="margin:0">{team.name}</p>
              <p class="cn-meta" style="margin:4px 0 0">{team.meta}</p>
            </div>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        The accent belongs to the team, not to its place in the grid. Store it
        on the record, or derive it from a stable id, and read it wherever the
        team appears. Payments is teal here, in the table's ranked rows and on
        the density page. Sorting or filtering the grid never recolors a card.
      </p>

      <Demo title="Linked card" classes="a > .accent-card">
        <a
          href="#"
          style="display:block;width:min(340px,100%)"
          onClick={(e) => e.preventDefault()}
        >
          <div class="accent-card" style={accentStyle(PAYMENTS.accent)}>
            <p class="cn-name" style="margin:0">{PAYMENTS.name}</p>
            <p class="cn-meta" style="margin:4px 0 0">{PAYMENTS.meta}</p>
          </div>
        </a>
      </Demo>

      <p class="cn-copy">
        Wrap the card in a plain <code class="cn-code">&lt;a&gt;</code>. Hover
        lifts the card 1px off its plate and the plate grows 1px. Active
        half-slides it onto the plate, the same press as every button. The
        wrapper is the link, never the card itself.
      </p>

      <Demo title="With a stat and a progress bar" classes="accent-card > .stat.is-lg + .progress-track">
        <div class="accent-card" style={`${accentStyle(PAYMENTS.accent)};width:min(340px,100%)`}>
          <div class="stat is-lg" style="padding:0">
            <span>{PAYMENTS.name} revenue</span>
            <strong>{PAYMENTS.revenue}</strong>
          </div>
          <div class="progress-track" style="margin-top:12px">
            <span style="width:72%" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Inside the card the hero value is text-colored, so the accent is not
        repeated on the plate and the number. A data mark such as the
        progress fill keeps the accent. Controls inside the card rest on their
        own plate, not the card's.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: "--accent",
            values: "a hex from the record",
            default: "var(--mauve)",
            notes:
              "Set inline from data. Read by the plate, .mark, .avatar, .cn-value-lg, the progress fill and the terminal caret.",
          },
          {
            name: ".accent-card",
            values: "recipe",
            notes:
              "Base fill, --edge hairline, and the hard offset in --plate (accent 50% into surface-0). No other shadow.",
          },
          {
            name: "a > .accent-card",
            values: "hover / active",
            notes: "Hover: translate(-1px, -1px) and the plate grows 1px. Active: the half-slide onto the plate.",
          },
          {
            name: ".stat.is-lg / .cn-value-lg inside",
            values: "text color",
            notes: "The plate carries the accent, so the value does not.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<!-- --accent comes from the team record -->
<a href="/teams/payments" style="display: block">
  <div class="accent-card" style="--accent: #94e2d5">
    <p class="cn-name">Payments</p>
    <p class="cn-meta">12 members · 4 open invoices</p>
  </div>
</a>`}
      />
    </Doc>
  );
}
