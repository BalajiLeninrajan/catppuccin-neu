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
      lede="A row of mutually exclusive options. Options carry the hard offset at rest, half-slide while held, and press in once selected."
    >
      <p class="cn-copy">
        The recipe styles every direct child of <code class="cn-code">.segmented</code>, so the same class works on
        a row of buttons or a group of labels wrapping visually hidden radios. Mark the selection with{" "}
        <code class="cn-code">aria-pressed="true"</code> on a button, or{" "}
        <code class="cn-code">.active</code> on a label. The selected option sits pressed in with the mauve wash and
        never slides.
      </p>

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
        Use buttons for switches the app reacts to at once. Set{" "}
        <code class="cn-code">aria-pressed</code> from your state; it is both the announced state and the style
        hook.
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
        Inside a form, wrap a radio in each option's label and hide it with{" "}
        <code class="cn-code">.cn-sr-only</code>. The value submits natively and arrow keys move the selection.
        When the hidden input takes keyboard focus, the recipe draws a mauve outline around the whole label.
      </p>

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

      <p class="cn-copy">
        <code class="cn-code">.is-stacked</code> turns the grid vertical with roomier rows and a larger{" "}
        <code class="cn-code">&lt;b&gt;</code>, for options that need a description. Below 520px the default row
        form stacks on its own.
      </p>

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
        title="Variants & knobs"
        rows={[
          { name: ".segmented", notes: "Equal-width column grid, 8px gap. Styles every direct child, buttons or labels." },
          { name: '.segmented > [aria-pressed="true"] / [aria-checked="true"] / .active', notes: "The selection. Pressed in, mauve wash, borderless; <b> turns mauve." },
          { name: "svg inside an option", notes: "16px, sized by the recipe." },
          { name: ".is-stacked", notes: "Vertical list, 12px gap, taller rows, 16px <b>. For described options." },
          { name: "<b> / <small>", notes: "Option title (sans 700) and a quiet hint line inside each option." },
          { name: ".cn-sr-only", notes: "Hides the radio in the label form; label:has(input:focus-visible) draws the focus outline." },
          { name: "--control-h", default: "46px", notes: "Option min-height is the knob + 12px (58px); stacked is the knob + 24px." },
          { name: "--plate", default: "var(--crust)", notes: "The plate under every unselected option." },
        ]}
      />
    </Doc>
  );
}
