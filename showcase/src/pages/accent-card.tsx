import { Doc, Demo, Props, CodeBlock, ACCENTS } from "../lib/doc";

const AREAS = [
  { name: "Payments", meta: "12 members · 4 open invoices" },
  { name: "Analytics", meta: "6 members · 3 dashboards" },
  { name: "Messaging", meta: "18 members · 92 threads" },
  { name: "Storage", meta: "4 members · 1.2 TB used" },
  { name: "Identity", meta: "9 members · 2 policies" },
  { name: "Support", meta: "14 members · 7 queues" },
];

export default function AccentCardPage() {
  return (
    <Doc
      title="Accent card"
      lede="A raised card on a plate in its accent. The plate is the hard offset, so the card presses like every other control, and nothing is painted on the card itself."
    >
      <Demo title="The accent cycle" classes="accent-card  (set --accent inline)">
        <div class="sc-grid" style="width:100%">
          {AREAS.map((area, i) => (
            <div
              class="accent-card"
              style={`--accent:${ACCENTS[i].color}`}
              key={area.name}
            >
              <p class="cn-name" style="margin:0">{area.name}</p>
              <p class="cn-meta" style="margin:4px 0 0">{area.meta}</p>
            </div>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        The cycle order lives in tokens.css: mauve, teal, yellow, blue, peach,
        pink. Assign colors positionally from data, wrapping after six. Never
        pick per-item colors by hand. The card carries a name and a meta line;
        no eyebrow. The plate is the identity, and six plates in a grid read as
        a set.
      </p>

      <Demo title="Linked card" classes="a > .accent-card">
        <a
          href="#"
          style="display:block;width:min(340px,100%)"
          onClick={(e) => e.preventDefault()}
        >
          <div class="accent-card" style="--accent:#94e2d5">
            <p class="cn-name" style="margin:0">Quarterly revenue</p>
            <p class="cn-meta" style="margin:4px 0 0">Updated 14 minutes ago</p>
          </div>
        </a>
      </Demo>

      <p class="cn-copy">
        Wrap the card in a plain <code class="cn-code">&lt;a&gt;</code>. Hover
        lifts the card off its plate and strengthens the accent border; active
        half-slides it onto the plate, the same press as every button. The
        wrapper is the link, never the card itself.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: "--accent",
            values: "any cycle hex",
            default: "var(--mauve)",
            notes:
              "Set inline from data. Read by the plate, the border, mark-solid, avatar, cn-value-lg, and the terminal caret.",
          },
          {
            name: ".accent-card",
            values: "recipe",
            notes:
              "Base fill, accent hairline, the hard offset in --plate (accent 50% into surface-0) over raised-soft. No spine, no gradient.",
          },
          {
            name: "a > .accent-card",
            values: "hover / active",
            notes: "Hover: translate(-1px,-1px), plate grows 1px, stronger edge. Active: the half-slide onto the plate.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<a href="/teams/payments" style="display: block">
  <!-- the wrapper inherits color and sheds the underline via the recipe -->
  <div class="accent-card" style="--accent: #94e2d5">
    <p class="cn-name">Payments</p>
    <p class="cn-meta">12 members · 4 open invoices</p>
  </div>
</a>`}
      />
    </Doc>
  );
}
