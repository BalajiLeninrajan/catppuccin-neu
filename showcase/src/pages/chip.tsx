import { Doc, Demo, Props, CodeBlock, TONES } from "../lib/doc";

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
      lede="Two small metadata marks. The outlined .chip carries facts like counts and versions; the tinted .chip-tone carries semantic states through --tone. Both stay on one line."
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
        Below 760px a chip with an <code class="cn-code">svg</code> glyph
        collapses to icon-only: the label is hidden with{" "}
        <code class="cn-code">font-size: 0</code> and the glyph scales up to
        16px. Keep the label in the markup, it stays the chip's accessible name
        after the collapse. Mark the glyph{" "}
        <code class="cn-code">aria-hidden="true"</code>, and never ship a chip
        whose only content is the svg.
      </p>

      <Demo title="Chip tones" classes="chip-tone cn-tone-{tone}" row>
        {TONES.map((tone) => (
          <span key={tone} class={`chip-tone cn-tone-${tone}`}>
            {TONE_LABELS[tone]}
          </span>
        ))}
      </Demo>

      <Props
        title="Contract"
        rows={[
          {
            name: ".chip",
            values: "span, a, or button",
            notes:
              "Outlined pill on --base with raised-soft depth. White-space: nowrap, keep labels short.",
          },
          {
            name: ".chip svg",
            values: "one leading glyph",
            notes:
              "14px at rest, 16px icon-only below 760px. Decorative: aria-hidden, label text carries the name.",
          },
          {
            name: ".chip-tone",
            values: "span",
            notes:
              "Tinted uppercase tag, 4px radius. Tint and hairline edge both derive from --tone.",
          },
          {
            name: "--tone",
            values: ".cn-tone-red / -green / -peach / -yellow / -blue / -mauve",
            default: "var(--peach)",
            notes: "Semantic color contract prop; set via a tone utility or inline.",
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

<span class="chip-tone cn-tone-green">Paid</span>`}
      />
    </Doc>
  );
}
