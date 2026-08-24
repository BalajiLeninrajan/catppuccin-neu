import { Doc, Demo, Props, CodeBlock, TONES } from "../lib/doc";

/* Decorative leading glyphs — 16px, stroke = currentColor, aria-hidden.
   The banner text carries the meaning; the glyph only echoes the tone. */
function InfoGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5" />
      <path d="M12 7.5h.01" />
    </svg>
  );
}

function CheckGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="m8.5 12.2 2.4 2.4 4.6-5" />
    </svg>
  );
}

function AlertGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3.5 21 19H3l9-15.5z" />
      <path d="M12 10v4" />
      <path d="M12 16.8h.01" />
    </svg>
  );
}

const TONE_COPY = {
  red: "Payment failed — update the card on file to keep this workspace active.",
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
      lede="An inline message band with a semantic tint — no card chrome, just the tone's wash, its hairline edge, and a soft inset. It sits in the content flow wherever the message applies."
    >
      <p class="cn-copy">
        The banner reads its color from the{" "}
        <code class="cn-code">--tone</code> contract prop: text, tint, and edge
        all derive from the one value, so a single{" "}
        <code class="cn-code">.cn-tone-*</code> utility switches the whole
        band. Unlike most inset surfaces, the tinted band keeps its hairline
        border — the tint needs the edge to hold its shape on the base ground.
      </p>

      <Demo title="Six tones" classes="banner cn-tone-{tone}">
        {TONES.map((tone) => (
          <div key={tone} class={`banner cn-tone-${tone}`}>
            {TONE_COPY[tone]}
          </div>
        ))}
      </Demo>

      <Demo title="With leading glyph" classes="banner cn-tone-{tone}">
        <div class="banner cn-tone-green">
          <CheckGlyph />
          Invoice #1042 was sent and marked as paid.
        </div>
        <div class="banner cn-tone-red">
          <AlertGlyph />
          Payment failed — update the card on file to keep this workspace
          active.
        </div>
        <div class="banner cn-tone-blue">
          <InfoGlyph />A newer version of this report is available.
        </div>
      </Demo>

      <p class="cn-copy">
        The glyph is optional and purely decorative — the banner's flex row
        seats it before the text with the built-in gap. Keep it at 16px, stroke
        it with <code class="cn-code">currentColor</code> so it inherits the
        tone, and mark it <code class="cn-code">aria-hidden="true"</code>. For
        messages that arrive dynamically, put{" "}
        <code class="cn-code">role="status"</code> (or{" "}
        <code class="cn-code">role="alert"</code> for the red tone) on the
        banner itself.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".banner",
            values: "div (or a status/alert region)",
            notes:
              "Tint band: --tone text, 7% tint background, 25% tone edge, inset-soft depth. 10px radius.",
          },
          {
            name: ".banner svg",
            values: "one optional leading glyph",
            notes:
              "16px, currentColor stroke, aria-hidden. Seated by the flex gap — no extra wrapper.",
          },
          {
            name: "--tone",
            values: ".cn-tone-red / -green / -peach / -yellow / -blue / -mauve",
            default: "var(--peach)",
            notes: "One prop drives text, tint, and edge together.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="banner cn-tone-green" role="status">
  Invoice #1042 was sent and marked as paid.
</div>

<div class="banner cn-tone-red" role="alert">
  <svg aria-hidden="true"><!-- glyph --></svg>
  Payment failed — update the card on file.
</div>`}
      />
    </Doc>
  );
}
