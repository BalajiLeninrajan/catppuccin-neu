import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const ITEMS: Array<[string, string, boolean]> = [
  [
    "How does billing work?",
    "Plans bill monthly per workspace. Upgrades prorate to the day, downgrades apply at the next cycle, and every invoice lands in the billing inbox as a PDF.",
    true,
  ],
  [
    "Can I add more seats mid-cycle?",
    "Yes. New seats activate immediately and the difference shows on the next invoice.",
    false,
  ],
  [
    "What formats do exports support?",
    "CSV and JSON for tables, PNG for charts. Exports include every column the current filter shows.",
    false,
  ],
];

export default function AccordionPage() {
  return (
    <Doc
      title="Accordion"
      lede="Stacked disclosure rows on a label and a hidden checkbox. The fold animates open and closed in every modern browser, no JS."
    >
      <Demo title="Accordion" classes="accordion > label + .fold">
        <div style="width:min(640px,100%)">
          {ITEMS.map(([title, body, open]) => (
            <div class="accordion" key={title}>
              <label>
                <input type="checkbox" checked={open} />
                {title}
              </label>
              <div class="fold">
                <div>
                  <p class="cn-copy">{body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Native <code class="cn-code">details</code> cannot animate its close
        outside Chromium, so the recipe uses a checkbox instead: the fold is a
        grid row transitioning <code class="cn-code">0fr</code> to{" "}
        <code class="cn-code">1fr</code>, which plays everywhere. The whole
        open item sinks into a carved well, title included; closed rows stay
        flat with straight dividers. Opening sinks first, then expands;
        closing contracts first, then releases. Space toggles the focused
        input, and the whole label is the hit target. Use radios sharing a{" "}
        <code class="cn-code">name</code> when only one item may be open.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div class="accordion">
  <label>
    <input type="checkbox" checked />
    How does billing work?
  </label>
  <div class="fold">
    <div>
      <p>Plans bill monthly per workspace.</p>
    </div>
  </div>
</div>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".accordion",
            values: "one disclosure row",
            default: "—",
            notes:
              "Hairline bottom divider. Stack siblings for a group; radios sharing a name make the group exclusive.",
          },
          {
            name: ".accordion > label",
            values: "title + hidden input",
            default: "—",
            notes:
              "48px min-height row, sans 700 13px, chevron as ::after. The input is invisible but keyboard-reachable; its focus ring draws on the label.",
          },
          {
            name: ".fold",
            values: "one wrapper element inside",
            default: "—",
            notes:
              "grid-template-rows 0fr to 1fr, .3s. The inner wrapper needs min-height 0; the recipe sets it.",
          },
          {
            name: "screen readers",
            values: "checkbox semantics",
            default: "—",
            notes:
              "Announced as a checkbox, not a disclosure button. The trade for cross-browser motion without JS.",
          },
        ]}
      />
    </Doc>
  );
}
