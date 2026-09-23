import { Fragment } from "preact";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const DETAILS = [
  ["Workspace", "Northwind Ops"],
  ["Region", "us-east-1"],
  ["Plan", "Pro · annual"],
  ["Seats", "86 of 120"],
  ["Billing contact", "owner@northwind.example"],
  ["Created", "Mar 14, 2025"],
];

export default function KeyValuePage() {
  return (
    <Doc
      title="Key-value list"
      lede="A dl grid for the details of one record. Keys sit in a column as wide as the longest key; values take the rest."
    >
      <Demo title="In a panel" classes="dl.kv">
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-header">
            <h2>Workspace details</h2>
          </div>
          <div class="panel-body">
            <dl class="kv">
              {DETAILS.map(([k, v]) => (
                <Fragment key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </Fragment>
              ))}
            </dl>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Use <code class="cn-code">.kv</code> when the reader looks up one
        value at a time: a record's settings, a deploy's metadata, an
        invoice's header. Keys are labels in overlay-2. Values are text with
        tabular numerals, and a long value wraps inside its column. At 520px
        and below each key sits over its value.
      </p>

      <p class="cn-copy">
        For label and value pairs that compare down a list, such as a plan
        summary, use <code class="cn-code">.stat.is-inline</code> rows
        instead, which put the value at the far right.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".kv", values: "dl", notes: "Grid: max-content keys, minmax(0, 1fr) values, 8px by 16px gap, 13px text." },
          { name: "dt", values: "key", notes: "600 12px in overlay-2." },
          { name: "dd", values: "value", notes: "Text color, tabular numerals, wraps anywhere." },
          { name: "at 520px", values: "responsive", notes: "One column: key over value, 8px between pairs." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<dl class="kv">
  <dt>Region</dt>
  <dd>us-east-1</dd>
  <dt>Seats</dt>
  <dd>86 of 120</dd>
</dl>`}
      />
    </Doc>
  );
}
