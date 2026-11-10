import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const PERIODS = [
  { id: "monthly", label: "Monthly", hint: "pay as you go" },
  { id: "quarterly", label: "Quarterly", hint: "save 10%" },
  { id: "yearly", label: "Yearly", hint: "save 20%" },
];

const PLANS = [
  { id: "starter", label: "Starter", hint: "1 workspace · 3 seats · community support" },
  { id: "team", label: "Team", hint: "Unlimited workspaces · 20 seats · shared dashboards" },
  { id: "business", label: "Business", hint: "SSO · audit log · priority support" },
];

export default function SegmentedPage() {
  const [period, setPeriod] = useState("monthly");
  const [plan, setPlan] = useState("team");

  return (
    <Doc
      title="Segmented"
      lede="A row of mutually exclusive options."
    >
      <Demo title="Button form" classes='segmented › button[aria-pressed="true"]'>
        <div class="segmented" role="group" aria-label="Billing period">
          {PERIODS.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-pressed={period === p.id}
              onClick={() => setPeriod(p.id)}
            >
              <b>{p.label}</b>
              <small>{p.hint}</small>
            </button>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Mark the selection with <code class="cn-code-inline">aria-pressed="true"</code> on a button, or <code class="cn-code-inline">.active</code> on a label.
      </p>

      <Demo title="Radio form" classes="segmented › label.active > input.cn-sr-only">
        <div class="segmented">
          {PERIODS.map((p) => (
            <label key={p.id} class={period === p.id ? "active" : ""}>
              <input
                type="radio"
                name="billing-period"
                class="cn-sr-only"
                checked={period === p.id}
                onChange={() => setPeriod(p.id)}
              />
              <b>{p.label}</b>
              <small>{p.hint}</small>
            </label>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Inside a form, wrap a radio in each label and hide it with <code class="cn-code-inline">.cn-sr-only</code>. The value submits natively and arrow keys move the selection.
      </p>

      <Demo title="A disabled option" classes="segmented › button[disabled]">
        <div class="segmented" role="group" aria-label="Export format">
          <button type="button" aria-pressed="true">
            <b>CSV</b>
            <small>every plan</small>
          </button>
          <button type="button" aria-pressed="false">
            <b>JSON</b>
            <small>every plan</small>
          </button>
          <button type="button" aria-pressed="false" disabled>
            <b>Parquet</b>
            <small>Business only</small>
          </button>
        </div>
      </Demo>

      <Demo title="Stacked" classes="segmented is-stacked">
        <div class="segmented is-stacked" style="width: min(420px, 100%)">
          {PLANS.map((p) => (
            <label key={p.id} class={plan === p.id ? "active" : ""}>
              <input
                type="radio"
                name="workspace-plan"
                class="cn-sr-only"
                checked={plan === p.id}
                onChange={() => setPlan(p.id)}
              />
              <b>{p.label}</b>
              <small>{p.hint}</small>
            </label>
          ))}
        </div>
      </Demo>

      <CodeBlock
        title="Markup"
        code={`<!-- button form -->
<div class="segmented" role="group" aria-label="Billing period">
  <button type="button" aria-pressed="true">
    <b>Monthly</b> <small>pay as you go</small>
  </button>
  <button type="button"><b>Yearly</b> <small>save 20%</small></button>
</div>

<!-- radio form (submits natively, arrow-key navigation) -->
<div class="segmented is-stacked">
  <label class="active">
    <input type="radio" name="plan" class="cn-sr-only" checked />
    <b>Team</b> <small>Unlimited workspaces · 20 seats</small>
  </label>
  <label>
    <input type="radio" name="plan" class="cn-sr-only" />
    <b>Business</b> <small>SSO · audit log</small>
  </label>
</div>`}
      />

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".segmented", values: "wrapper", notes: "Styles every direct child, buttons or labels." },
          { name: "[aria-pressed=\"true\"] / [aria-checked=\"true\"] / .active", values: "on a child", notes: "The selection." },
          { name: ":disabled", values: "on a button", notes: "Dims and loses the plate." },
          { name: ".is-stacked", values: "modifier", notes: "A vertical list for options with a description." },
          { name: "<b> / <small>", values: "inside a child", notes: "The option title and a hint line." },
          { name: "--plate", default: "var(--neu-ink)", notes: "The plate under each unselected option." },
        ]}
      />
    </Doc>
  );
}
