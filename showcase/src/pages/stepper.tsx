import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const PHASES = ["Draft", "Review", "Approve", "Send"];

export default function StepperPage() {
  const [current, setCurrent] = useState(1);

  return (
    <Doc
      title="Stepper"
      lede="A track of phase chips for a multi-step flow."
    >
      <Demo title="The three states" classes="stepper › .is-done / [aria-current='step'] / (rest)" row>
        <div class="stepper">
          <span class="is-done">Done</span>
          <span aria-current="step">Current</span>
          <span>Upcoming</span>
        </div>
      </Demo>

      <p class="cn-copy">
        Mark the current phase with <code class="cn-code-inline">aria-current="step"</code> and completed phases with <code class="cn-code-inline">.is-done</code>.
      </p>

      <Demo title="Click a phase to move the flow" classes="stepper">
        <div class="stepper">
          {PHASES.map((label, i) => (
            <button
              key={label}
              type="button"
              class={i < current ? "is-done" : ""}
              aria-current={i === current ? "step" : undefined}
              style="border: 0; cursor: pointer"
              onClick={() => setCurrent(i)}
            >
              {label}
            </button>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Use spans for a read-only track, and buttons when finished phases can be revisited.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div class="stepper">
  <span class="is-done">Draft</span>
  <span class="is-done">Review</span>
  <span aria-current="step">Approve</span>
  <span>Send</span>
</div>`}
      />

      <Props
        title="Classes"
        rows={[
          { name: ".stepper", values: "wrapper", notes: "Styles every direct child as a pill." },
          { name: "[aria-current=\"step\"]", values: "or .active", notes: "The current phase." },
          { name: ".is-done", values: "on a child", notes: "A completed phase." },
          { name: "child element", values: "span, button or a", notes: "Buttons or links when phases can be revisited." },
        ]}
      />
    </Doc>
  );
}
