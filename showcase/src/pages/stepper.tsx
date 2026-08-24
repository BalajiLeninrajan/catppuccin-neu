import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const PHASES = ["Draft", "Review", "Approve", "Send"];

export default function StepperPage() {
  const [current, setCurrent] = useState(1);

  return (
    <Doc
      title="Stepper"
      lede="A track of phase chips for multi-step flows. Upcoming sits recessed, the current phase tints mauve, completed phases turn green."
    >
      <p class="cn-copy">
        The recipe styles every direct child of <code class="cn-code">.stepper</code> as a borderless inset pill.
        Mark the current phase with <code class="cn-code">aria-current="step"</code> or{" "}
        <code class="cn-code">.active</code>, and completed phases with <code class="cn-code">.is-done</code>.
        Everything else reads as upcoming.
      </p>

      <Demo title="The three states" classes="stepper › .is-done / [aria-current='step'] / (rest)" row>
        <div class="stepper">
          <span class="is-done">Done</span>
          <span aria-current="step">Current</span>
          <span>Upcoming</span>
        </div>
      </Demo>

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
        Every phase before the current one is <code class="cn-code">.is-done</code>. Chips are plain spans in a
        read-only track; make them buttons when finished phases should be revisitable, as above.
      </p>

      <Demo title="Start and end of a flow" classes="stepper">
        <div class="stepper">
          <span aria-current="step">Details</span>
          <span>Members</span>
          <span>Permissions</span>
        </div>
        <div class="stepper">
          <span class="is-done">Details</span>
          <span class="is-done">Members</span>
          <span class="is-done" aria-current="step">
            Permissions
          </span>
        </div>
      </Demo>

      <p class="cn-copy">
        On the last step, keep <code class="cn-code">aria-current="step"</code> alongside{" "}
        <code class="cn-code">.is-done</code> once the phase completes. The mauve tint still marks position while
        the green text marks completion. The track wraps on narrow screens; it never scrolls.
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
        title="States"
        rows={[
          { name: ".stepper", notes: "Wrapping flex track, 7px gap. Styles every direct child as an inset pill." },
          { name: "(rest)", default: "upcoming", notes: "Recessed well ground, soft inset, overlay text." },
          { name: '[aria-current="step"]', values: "or .active", notes: "Current phase. Mauve text on a mauve 8% tint; prefer the ARIA attribute." },
          { name: ".is-done", notes: "Completed phase: green text, same recessed ground." },
          { name: "child element", values: "span | button | a", notes: "Spans for read-only tracks; buttons/links when phases are revisitable." },
        ]}
      />
    </Doc>
  );
}
