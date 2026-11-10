import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function AccentCardPage() {
  return (
    <Doc
      title="Accent card"
      lede="A card on a plate in its accent."
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
        Store the accent on the record, so sorting or filtering never recolors a card.
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
        Wrap the card in a plain <code class="cn-code-inline">&lt;a&gt;</code>. The wrapper is the link, never the card.
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

      <Props
        title="Classes and tokens"
        rows={[
          { name: "--accent", values: "a hex from the record", default: "var(--mauve)", notes: "Set inline from data. The plate and the data marks read it." },
          { name: ".accent-card", notes: "Text inside stays neutral. A progress fill, an avatar and a .mark keep the accent." },
          { name: "a > .accent-card", notes: "Lifts on hover, slides onto the plate when pressed." },
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
