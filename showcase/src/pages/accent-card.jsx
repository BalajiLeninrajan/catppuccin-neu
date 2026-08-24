import { Doc, Demo, Props, CodeBlock, ACCENTS } from "../lib/doc.jsx";

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
      lede="A softly raised card keyed by one contract property, --accent. The spine, hairline border, and corner gradient all read the same color, so re-keying a card is one inline style — assign a hex from your data and every cue follows."
    >
      <Demo title="The accent cycle" classes="accent-card  (set --accent inline)">
        <div class="sc-grid" style="width:100%">
          {AREAS.map((area, i) => (
            <div
              class="accent-card"
              style={`--accent:${ACCENTS[i].color}`}
              key={area.name}
            >
              <p class="cn-microlabel" style="margin:0 0 8px">Team</p>
              <p class="cn-name" style="margin:0">{area.name}</p>
              <p class="cn-meta" style="margin:6px 0 0">{area.meta}</p>
            </div>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        The cycle order is documented in tokens.css: mauve, teal, yellow,
        blue, peach, pink. Assign colors positionally from data — sixth item
        wraps back to mauve — and never pick per-item colors by hand.
      </p>

      <Demo title="Linked card — hover lifts, click presses in" classes="a > .accent-card">
        <a
          href="#"
          style="display:block;width:min(340px,100%);text-decoration:none;color:inherit"
          onClick={(e) => e.preventDefault()}
        >
          <div class="accent-card" style="--accent:#94e2d5">
            <p class="cn-microlabel" style="margin:0 0 8px">Dashboard</p>
            <p class="cn-name" style="margin:0">Quarterly revenue</p>
            <p class="cn-meta" style="margin:6px 0 0">Updated 14 minutes ago</p>
          </div>
        </a>
      </Demo>

      <p class="cn-copy">
        Wrap the card in a plain <code class="cn-code">&lt;a&gt;</code> and the
        recipe handles the states: hover lifts to the full raised shadow and
        strengthens the accent border; active presses the card into a soft
        inset. The card itself never becomes a link — the wrapper does.
      </p>

      <Demo title="The spine alone" classes="cn-spine  (utility)">
        <div
          class="cn-spine well"
          style="--accent:#89b4fa;width:min(420px,100%);padding:16px 16px 16px 24px"
        >
          <p class="cn-name" style="margin:0">Renewal reminder</p>
          <p class="cn-meta" style="margin:6px 0 0">
            The Pro plan renews on the 1st. 3 seats are unused.
          </p>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.cn-spine</code> is the standalone identity cue —
        a 4px left bar in <code class="cn-code">var(--accent)</code> you can
        put on any surface. The accent card ships with it built in; use the
        utility when you want the cue without the card chrome.
      </p>

      <Demo title="Accent utilities" row classes="cn-text-accent / cn-edge-accent / cn-tint-accent">
        <span class="cn-value-lg" style="--accent:#fab387">$12,480</span>
        <span
          class="cn-edge-accent cn-r-control"
          style="--accent:#f5c2e7;padding:10px 14px"
        >
          <span class="cn-meta">accent-keyed edge</span>
        </span>
        <span
          class="cn-tint-accent cn-r-card"
          style="--accent:#94e2d5;padding:14px 18px"
        >
          <span class="cn-meta">accent-keyed tint</span>
        </span>
      </Demo>

      <Props
        title="Contract"
        rows={[
          {
            name: "--accent",
            values: "any cycle hex",
            default: "var(--mauve)",
            notes:
              "Set inline from data. Read by the spine, border, gradient, mark-solid, cn-value-lg, and the terminal caret.",
          },
          {
            name: ".accent-card",
            values: "recipe",
            notes:
              "Raised-soft card, accent hairline, 135° accent gradient into mantle, built-in spine.",
          },
          {
            name: "a > .accent-card",
            values: "hover / active",
            notes: "Hover: lift + neu-raised. Active: translateY(1px) + inset-soft.",
          },
          {
            name: ".cn-spine",
            values: "utility",
            notes: "4px accent bar, inset 12px from top and bottom. Needs position: relative (included).",
          },
          {
            name: ".cn-text-accent / .cn-tint-accent / .cn-edge-accent",
            values: "utilities",
            notes: "Single-purpose accent color, background gradient, and hairline.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<a href="/teams/payments" class="card-link">
  <div class="accent-card" style="--accent: #94e2d5">
    <p class="cn-microlabel">Team</p>
    <p class="cn-name">Payments</p>
    <p class="cn-meta">12 members · 4 open invoices</p>
  </div>
</a>`}
      />
    </Doc>
  );
}
