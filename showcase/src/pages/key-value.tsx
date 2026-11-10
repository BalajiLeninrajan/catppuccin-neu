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
      lede="A dl grid for the details of one record."
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
        Use <code class="cn-code-inline">.kv</code> when the reader looks up one value at a time. At 520px and below each key sits over its value.
      </p>

      <p class="cn-copy">
        For pairs that compare down a list, use <code class="cn-code-inline">.stat.is-inline</code> rows, which put the value at the far end.
      </p>

      <Props
        title="Classes"
        rows={[
          { name: ".kv", values: "dl", notes: "Keys in a column as wide as the longest key." },
          { name: "dt", values: "key", notes: "Muted." },
          { name: "dd", values: "value", notes: "Wraps inside its column." },
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
