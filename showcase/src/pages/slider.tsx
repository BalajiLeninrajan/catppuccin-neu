import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* --value is the fill's stop as a percentage of the range. */
const pct = (v: number, min: number, max: number) => `${((v - min) / (max - min)) * 100}%`;

interface SliderRowProps {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  initial: number;
  format: (v: number) => string;
  help?: string;
  disabled?: boolean;
}

/* A label and an output over the slider. The input listener keeps
   --value in step, so the fill follows the thumb outside Firefox. */
function SliderRow({ id, label, min, max, step = 1, initial, format, help, disabled }: SliderRowProps) {
  const [value, setValue] = useState(initial);
  const helpId = help ? `${id}-help` : undefined;
  return (
    <div class="cn-stack cn-gap-8" style="width:min(420px,100%)">
      <div class="cn-row cn-between cn-baseline">
        <label for={id} class="cn-label" style={disabled ? "color:var(--cn-fg-faint)" : undefined}>
          {label}
        </label>
        <output for={id} class="cn-ui cn-tabular" style="color:var(--cn-fg)">
          {format(value)}
        </output>
      </div>
      <input
        id={id}
        type="range"
        class="slider"
        min={min}
        max={max}
        step={step}
        value={value}
        disabled={disabled}
        aria-valuetext={format(value)}
        aria-describedby={helpId}
        style={`--value:${pct(value, min, max)}`}
        onInput={(e) => setValue(Number((e.currentTarget as HTMLInputElement).value))}
      />
      {help ? (
        <small id={helpId} class="cn-meta">
          {help}
        </small>
      ) : null}
    </div>
  );
}

export default function SliderPage() {
  return (
    <Doc
      title="Slider"
      lede="A range input on a carved track. The fill runs mauve up to a raised round thumb."
    >
      <p class="cn-copy">
        Put <code class="cn-code-inline">.slider</code> on an <code class="cn-code-inline">input type="range"</code>.
      </p>

      <Demo title="With a label and an output" classes='input[type="range"].slider[style="--value: …"] + output'>
        <SliderRow
          id="slider-terms"
          label="Payment terms"
          min={0}
          max={60}
          step={5}
          initial={30}
          format={(v) => (v === 0 ? "Due on receipt" : `${v} days`)}
          help="New invoices are due this many days after they are issued."
        />
        <SliderRow
          id="slider-quota"
          label="Storage alert threshold"
          min={50}
          max={100}
          initial={80}
          format={(v) => `${v}%`}
        />
      </Demo>

      <Demo title="Disabled" classes="slider:disabled">
        <SliderRow
          id="slider-seats"
          label="Seats on the plan"
          min={1}
          max={50}
          initial={14}
          format={(v) => `${v} seats`}
          help="Only the workspace owner can change the seat count."
          disabled
        />
      </Demo>

      <p class="cn-copy">
        Firefox paints the fill natively. Other engines fill up to <code class="cn-code-inline">--value</code>, so keep it in step with the <code class="cn-code-inline">input</code> listener below.
      </p>

      <p class="cn-copy">
        Pair the slider with a visible <code class="cn-code-inline">label</code> and an <code class="cn-code-inline">output</code>. Set <code class="cn-code-inline">aria-valuetext</code> when the number alone is not the value, such as "30 days". Keep it out of a <code class="cn-code-inline">.field</code>, which styles every <code class="cn-code-inline">input</code> inside as a well.
      </p>

      <CodeBlock
        title="Markup"
        code={`<label class="cn-label" for="terms">Payment terms</label>
<output class="cn-ui" for="terms">30 days</output>
<input id="terms" type="range" class="slider" min="0" max="60" step="5"
       value="30" aria-valuetext="30 days" style="--value: 50%">`}
      />

      <CodeBlock
        title="Keep --value in step (consumer code)"
        code={`document.addEventListener("input", (e) => {
  const s = e.target;
  if (!s.matches?.(".slider")) return;
  const pct = ((s.value - s.min) / (s.max - s.min)) * 100;
  s.style.setProperty("--value", pct + "%");
});`}
      />

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".slider", values: "input[type=\"range\"]", notes: "A carved track with a raised round thumb." },
          { name: "--value", values: "0% to 100%", default: "0%", notes: "Where the fill stops outside Firefox." },
          { name: ":disabled", values: "on the input", notes: "Dims the slider." },
        ]}
      />
    </Doc>
  );
}
