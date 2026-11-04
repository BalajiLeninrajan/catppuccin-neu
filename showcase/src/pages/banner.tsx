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
      lede="An inline message band with a semantic tint. It sits in the content flow wherever the message applies."
    >
      <p class="cn-copy">
        Text, tint, and edge all derive from the{" "}
        <code class="cn-code-inline">--tone</code> contract prop, so a single{" "}
        <code class="cn-code-inline">.cn-tone-*</code> utility switches the whole
        band. A status tone also swaps in its ladder and its glyph. Unlike most inset surfaces, the banner keeps its hairline border.
        The tint needs the edge to hold its shape on the base ground.
      </p>

      <Demo title="Status tones: the glyph comes from CSS" classes="banner cn-tone-danger · -warning · -success · -info > text">
        <div class="banner cn-tone-danger" role="alert">
          Payment failed. Update the card on file to keep this workspace active.
        </div>
        <div class="banner cn-tone-warning">
          Two teammates haven't accepted their invites yet.
        </div>
        <div class="banner cn-tone-success">
          Invoice #1042 was sent and marked as paid.
        </div>
        <div class="banner cn-tone-info">
          A newer version of this report is available.
        </div>
      </Demo>

      <p class="cn-copy">
        A banner with <code class="cn-code-inline">.cn-tone-danger</code>,{" "}
        <code class="cn-code-inline">-warning</code>,{" "}
        <code class="cn-code-inline">-success</code> or{" "}
        <code class="cn-code-inline">-info</code> and no svg child draws the
        matching 16px glyph from <code class="cn-code-inline">--cn-glyph-*</code>{" "}
        through a mask in its tone. These banners hold only text. An svg child
        replaces the CSS glyph when the status wants another shape.
      </p>

      <Demo title="Palette tones with a leading glyph" classes="banner cn-tone-{tone} > svg + text">
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

      <Demo title="Without a glyph, on a quiet tone" classes="banner cn-tone-{blue, green, peach, mauve} > text">
        <div class="banner cn-tone-blue">
          A newer version of this report is available. Open it from the
          report list.
        </div>
      </Demo>

      <p class="cn-copy">
        A tone never carries meaning alone, because red, peach and pink sit
        close in lightness. The words in the banner state the status:
        "Payment failed", not a red band. A danger or warning banner also
        leads with a glyph, because those are the tones a reader must not
        miss. The palette tones draw none, so a red or yellow banner brings
        an svg. Other palette tones may drop it, as in the blue banner above.
        The svg goes first, at the 16px the recipe sets. Stroke it with{" "}
        <code class="cn-code-inline">currentColor</code> so it takes the tone,
        and mark it <code class="cn-code-inline">aria-hidden="true"</code>; the
        text carries the message. For messages
        that arrive dynamically, put <code class="cn-code-inline">role="status"</code>{" "}
        on the banner, or <code class="cn-code-inline">role="alert"</code> for the red
        tone.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".banner",
            values: "div (or a status/alert region)",
            notes:
              "Tint band: --tone text at the meta size, 12px 16px padding, a --tint background and a --tone-border edge, inset-soft depth, the card radius (12px). The tint is the tone at 4% and the edge the tone 25% into surface-0, or the status ladder's stops. Its words state the status.",
          },
          {
            name: ".banner svg",
            values: "one leading glyph",
            notes:
              "16px, first in the banner, currentColor stroke, aria-hidden. Seated by the flex gap, no extra wrapper. Replaces the CSS glyph on a status tone. Needed on .cn-tone-red and -yellow, which draw none.",
          },
          {
            name: ".banner::before",
            values: "status glyph",
            notes: "On .cn-tone-danger, -warning, -success or -info with no svg child: a 16px --cn-glyph-* mask in currentColor.",
          },
          {
            name: "--tone",
            values: ".cn-tone-danger / -warning / -success / -info · .cn-tone-red / -green / -peach / -yellow / -blue / -mauve",
            default: "var(--peach)",
            notes: "One prop drives text, tint, and edge together.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<!-- a status tone draws its glyph -->
<div class="banner cn-tone-success" role="status">
  Invoice #1042 was sent and marked as paid.
</div>

<div class="banner cn-tone-danger" role="alert">
  Payment failed. Update the card on file.
</div>

<!-- a palette tone brings its own; red and yellow must -->
<div class="banner cn-tone-yellow">
  <svg aria-hidden="true"><!-- warning glyph --></svg>
  Two teammates haven't accepted their invites yet.
</div>`}
      />
    </Doc>
  );
}
