import { Doc, Demo, Props, CodeBlock, TONES } from "../lib/doc";
import { TONE_GLYPH } from "../lib/glyphs";

const TONE_COPY = {
  red: "Payment failed. Update the card on file to keep this workspace active.",
  green: "Invoice #1042 was sent and marked as paid.",
  peach: "Your trial ends in 3 days. Pick a plan to keep your data.",
  yellow: "Two teammates haven't accepted their invites yet.",
  blue: "A newer version of this report is available.",
  mauve: "Scheduled sends are now on for everyone in this team.",
};

export default function BannerPage() {
  return (
    <Doc
      title="Banner"
      lede="An inline message band in a tone, placed in the flow where the message applies."
    >
      <p class="cn-copy">
        One <code class="cn-code-inline">.cn-tone-*</code> utility sets <code class="cn-code-inline">--tone</code>, which drives the glyph color, the tint and the edge.
      </p>

      <Demo title="Tones with a leading glyph" classes="banner cn-tone-{tone} > svg + text">
        {TONES.map((tone) => {
          const Glyph = TONE_GLYPH[tone];
          return (
            <div key={tone} class={`banner cn-tone-${tone}`}>
              <Glyph />
              {TONE_COPY[tone]}
            </div>
          );
        })}
      </Demo>

      <Demo
        title="Without a glyph, on a quiet tone"
        classes="banner cn-tone-{blue, green, peach, mauve} > text"
      >
        <div class="banner cn-tone-blue">
          A newer version of this report is available. Open it from the
          report list.
        </div>
      </Demo>

      <p class="cn-copy">
        A tone never carries meaning alone, so the words state the status. A red or yellow banner brings an svg, first, with <code class="cn-code-inline">aria-hidden="true"</code>. For a message that arrives later, add <code class="cn-code-inline">role="status"</code>, or <code class="cn-code-inline">role="alert"</code> for an error.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".banner", values: "div", notes: "An inline message band in --tone." },
          { name: ".banner svg", values: "one leading glyph", notes: "Takes the tone. aria-hidden." },
          { name: "--tone", values: ".cn-tone-danger / -warning / -success / -info · .cn-tone-red / -green / -peach / -yellow / -blue / -mauve", default: "var(--cn-info)", notes: "Set it with a tone utility or inline." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="banner cn-tone-success" role="status">
  Invoice #1042 was sent and marked as paid.
</div>

<div class="banner cn-tone-danger" role="alert">
  <svg aria-hidden="true"><!-- cross glyph --></svg>
  Payment failed. Update the card on file.
</div>`}
      />
    </Doc>
  );
}
