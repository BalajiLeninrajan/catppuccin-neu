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
        The glyph, tint and edge derive from the{" "}
        <code class="cn-code-inline">--tone</code> contract prop, so a single{" "}
        <code class="cn-code-inline">.cn-tone-*</code> utility switches the whole
        band.
      </p>

      <Demo
        lead
        title="Status tones: the glyph comes from CSS"
        classes="banner cn-tone-danger · -warning · -success · -info > text"
        why="How one tone class sets the tint, the edge and the glyph"
      >
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
        The message itself is{" "}
        <code class="cn-code-inline">--cn-fg-body</code>, so a sentence stays
        text-colored like every other sentence. A
        status tone also swaps in its ladder and its glyph. A status tint
        is its role at 6%, a step past the 4% a palette tone gets, so the
        band shows its tone before its glyph. Unlike most inset surfaces, the banner keeps its hairline border.
        The tint needs the edge to hold its shape on a dark ground.
      </p>

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

      <Demo
        title="Without a glyph, on a quiet tone"
        classes="banner cn-tone-{blue, green, peach, mauve} > text"
        why="Why the words state the status, and when a glyph is needed"
      >
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
        The svg goes first, at the 16px the recipe sets. The recipe sets the
        svg's color to the tone, so stroke it with{" "}
        <code class="cn-code-inline">currentColor</code>,
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
            contrast: "Status tint 1.10:1 (red) to 1.16:1 (yellow) on a panel · body text on it 8.0:1 or better on a panel, 6.2:1 on an overlay",
            notes:
              "Tint band: --cn-fg-body text at the ui size, 14px at 400, 12px 16px padding, a --tint background and a --tone-border edge, inset-soft depth, the card radius (12px). A palette tone's tint is the tone at 4%, --cn-step-tint, and its edge the tone 25% into surface-0. A status tone takes its ladder's stops, with the tint at 6%, --cn-step-status-tint. Its words state the status.",
          },
          {
            name: ".banner svg",
            values: "one leading glyph",
            notes:
              "16px, first in the banner, color set to --tone, currentColor stroke, aria-hidden. Seated by the flex gap, no extra wrapper. Replaces the CSS glyph on a status tone. Needed on .cn-tone-red and -yellow, which draw none.",
          },
          {
            name: ".banner::before",
            values: "status glyph",
            notes: "On .cn-tone-danger, -warning, -success or -info with no svg child: a 16px --cn-glyph-* mask in --tone.",
          },
          {
            name: "--tone",
            values: ".cn-tone-danger / -warning / -success / -info · .cn-tone-red / -green / -peach / -yellow / -blue / -mauve",
            default: "var(--cn-info)",
            notes: "One prop drives the glyph, tint and edge together. The message stays --cn-fg-body.",
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
