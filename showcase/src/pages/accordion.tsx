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
      lede="Stacked disclosure rows on a label and a hidden checkbox. No JS."
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
        The whole label is the hit target; Space toggles the focused input.
        Use radios sharing a <code class="cn-code">name</code> when only one
        item may be open.
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
              "48px min-height row. The hidden input stays keyboard-reachable; its focus ring draws on the label.",
          },
          {
            name: ".fold",
            values: "one wrapper element inside",
            default: "—",
            notes: "Animates open and closed, .3s. Put the body inside one wrapper element.",
          },
          {
            name: "screen readers",
            values: "checkbox semantics",
            default: "—",
            notes: "Announced as a checkbox, not a disclosure button.",
          },
        ]}
      />
    </Doc>
  );
}
