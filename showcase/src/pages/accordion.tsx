import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function AccordionPage() {
  return (
    <Doc
      title="Accordion"
      lede="Stacked disclosure rows built on native details and summary. No JS, the browser owns open state, keyboard, and toggling."
    >
      <Demo title="Accordion" classes="details.accordion > summary">
        <div style="width:min(560px,100%)">
          <details class="accordion" open>
            <summary>How does billing work?</summary>
            <p class="cn-copy">
              Plans bill monthly per workspace. Upgrades prorate to the day,
              downgrades apply at the next cycle, and every invoice lands in
              the billing inbox as a PDF.
            </p>
          </details>
          <details class="accordion">
            <summary>Can I add more seats mid-cycle?</summary>
            <p class="cn-copy">
              Yes. New seats activate immediately and the difference prorates
              onto the next invoice. Removing a seat frees it at the end of
              the cycle.
            </p>
          </details>
          <details class="accordion">
            <summary>What formats do exports support?</summary>
            <p class="cn-copy">
              CSV and JSON for tables, PDF for statements. Exports over 10k
              rows run in the background and arrive by email.
            </p>
          </details>
        </div>
      </Demo>

      <p class="cn-copy">
        Each row is a bare <code class="cn-code">details</code> with a{" "}
        <code class="cn-code">summary</code> and one body element. Rows share a
        hairline bottom border, and the chevron rotates 180 degrees while
        open. The whole open item sinks into a carved well, title included,
        and sits slightly wider than its closed siblings; the text stays
        aligned because padding compensates the negative margin. In browsers that support{" "}
        <code class="cn-code">interpolate-size</code> (Chrome), the body
        height animates open and closed. Elsewhere it snaps, the{" "}
        <code class="cn-code">@supports</code> block scopes the transition so
        nothing half-animates.
      </p>

      <CodeBlock
        title="Markup"
        code={`<details class="accordion" open>
  <summary>How does billing work?</summary>
  <p>Plans bill monthly per workspace.</p>
</details>
<details class="accordion">
  <summary>Can I add more seats mid-cycle?</summary>
  <p>New seats activate immediately.</p>
</details>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".accordion",
            values: "details",
            notes:
              "One disclosure row, hairline bottom border. Stack siblings for a group, add open to expand one by default.",
          },
          {
            name: ".accordion summary",
            notes:
              "48px min-height row, sans 700 13px, marker hidden, chevron drawn as ::after. Hover turns the title mauve.",
          },
          {
            name: "@supports (interpolate-size: allow-keywords)",
            notes:
              "Gates the height transition on ::details-content, .2s ease. Unsupported browsers open and close instantly.",
          },
        ]}
      />
    </Doc>
  );
}
