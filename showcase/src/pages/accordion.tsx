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

const REVIEWS: Array<[string, string, string, boolean]> = [
  [
    "Q3 infrastructure review",
    "Sep 2025",
    "Capacity held through the sale window. Two regions ran hot; both have headroom orders filed.",
    true,
  ],
  [
    "Q2 infrastructure review",
    "Jun 2025",
    "Quiet quarter. One certificate rotation incident, resolved inside the error budget.",
    false,
  ],
  [
    "Q1 infrastructure review",
    "Mar 2025",
    "Baseline quarter for the new fleet; numbers here seed the yearly comparison.",
    false,
  ],
];

const CYCLES: Array<[string, string, boolean]> = [
  ["Monthly billing", "One invoice per workspace on the 1st.", true],
  ["Annual billing", "Two months free, invoiced in January.", false],
  ["Invoice billing", "Net 30 terms for teams over 50 seats.", false],
];

export default function AccordionPage() {
  return (
    <Doc
      title="Accordion"
      lede="Stacked disclosure rows on native details and summary. No script."
    >
      <Demo title="Accordion" classes="details.accordion > summary + .fold">
        <div style="width:min(640px,100%)">
          {ITEMS.map(([title, body, open]) => (
            <details class="accordion" key={title} open={open}>
              <summary>{title}</summary>
              <div class="fold">
                <div>
                  <p class="cn-copy">{body}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Demo>

      <Demo
        title="Trailing meta, stacked in a panel"
        classes="panel accordion-stack · summary > b + .cn-meta"
      >
        <div class="panel accordion-stack" style="width:min(640px,100%)">
          {REVIEWS.map(([title, meta, body, open]) => (
            <details class="accordion" key={title} open={open}>
              <summary>
                <b>{title}</b>
                <span class="cn-meta">{meta}</span>
              </summary>
              <div class="fold">
                {/* Bare p: the copy voice is a tokens-reset given. */}
                <div>
                  <p>{body}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Wrap the title in <code class="cn-code-inline">b</code> or <code class="cn-code-inline">p</code> and the meta rides against the chevron.
      </p>

      <Demo
        title="Exclusive group, details sharing a name"
        classes='details.accordion[name="billing-cycle"]'
      >
        <div style="width:min(640px,100%)">
          {CYCLES.map(([title, body, open]) => (
            <details class="accordion" name="billing-cycle" key={title} open={open}>
              <summary>{title}</summary>
              <div class="fold">
                <div>
                  <p class="cn-copy">{body}</p>
                </div>
              </div>
            </details>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Give every <code class="cn-code-inline">details</code> in a group the same <code class="cn-code-inline">name</code>. Opening one closes the rest.
      </p>

      <CodeBlock
        title="Markup"
        code={`<details class="accordion" name="faq" open>
  <summary><b>How does billing work?</b><span class="cn-meta">Billing</span></summary>
  <div class="fold">
    <div>
      <p>Plans bill monthly per workspace.</p>
    </div>
  </div>
</details>`}
      />

      <Props
        title="Classes"
        rows={[
          { name: "details.accordion", values: "one disclosure row", notes: "[open] is the open state." },
          { name: "[name]", values: "shared group name", notes: "Makes the group exclusive." },
          { name: "summary", values: "title, or b + .cn-meta", notes: "The whole row is the hit target." },
          { name: ".fold", values: "one wrapper element inside", notes: "Animates open and closed." },
          { name: ".accordion-stack", values: "on a .panel", notes: "Pads the group." },
          { name: "[data-open]", values: "state alias", notes: "The open treatment on a div, for a framework that owns the state." },
        ]}
      />

      <h2 class="cn-title">Label form</h2>
      <p class="cn-copy">
        A <code class="cn-code-inline">div.accordion</code> holding a label with a hidden checkbox, or radios sharing a name, takes the same fold. Screen readers announce it as a checkbox. It needs two listeners that details does not.
      </p>

      <CodeBlock
        title="Label markup"
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

      <CodeBlock
        title="Enter key"
        code={`document.addEventListener("keydown", (e) => {
  const t = e.target;
  if (e.key === "Enter" && t.matches(".accordion input")) t.click();
});`}
      />

      <CodeBlock
        title="Closable radios"
        code={`let held = null;
const arm = (e) => {
  const r = e.target.closest?.(".accordion > label")?.querySelector("input[type=radio]");
  held = r?.checked ? r : null;
};
document.addEventListener("pointerdown", arm, true);
document.addEventListener("keydown", arm, true);
document.addEventListener("click", (e) => {
  const t = e.target;
  if (!t.matches(".accordion input[type=radio]")) return;
  if (t === held) t.checked = false;
  held = null;
});`}
      />
    </Doc>
  );
}
