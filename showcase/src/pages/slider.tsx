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
        <label for={id} class={`cn-label${disabled ? " cn-fg-faint" : ""}`}>
          {label}
        </label>
        <output for={id} class="cn-ui cn-fg cn-tabular">
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
        Put <code class="cn-code-inline">.slider</code> on an{" "}
        <code class="cn-code-inline">input type="range"</code>. The track is the
        progress track's carve: 7px, crust, on the soft inset. The thumb is a
        20px raised round on <code class="cn-code-inline">--cn-surface-raised</code>{" "}
        with the soft raise and the lit top edge, inside a 1px{" "}
        <code class="cn-code-inline">--control-edge</code>: overlay-1, 4.4:1
        on the page and on a raised fill, and 3.5:1 on an overlay, so the
        thumb clears 3:1 wherever the slider sits. On hover its edge warms to{" "}
        <code class="cn-code-inline">--engaged-edge</code>, and held it shrinks
        to .92 and springs back on release.
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
        Firefox paints the fill natively. Other engines cannot, so the
        recipe fills the track with a gradient that stops at{" "}
        <code class="cn-code-inline">--value</code>. Keep it in step with one{" "}
        <code class="cn-code-inline">input</code> listener, as below. A disabled
        slider drops to <code class="cn-code-inline">--disabled-opacity</code>{" "}
        with a not-allowed cursor; give its label the disabled color yourself.
        The demo uses <code class="cn-code-inline">.cn-fg-faint</code>, which
        is overlay-1 like <code class="cn-code-inline">--cn-fg-disabled</code>{" "}
        and moves with it under <code class="cn-code-inline">prefers-contrast</code>.
      </p>

      <h2 class="cn-title">Accessibility</h2>
      <p class="cn-copy">
        A native range input brings its own keys: Left and Down step down,
        Right and Up step up, Page Up and Page Down take bigger steps, and
        Home and End go to the ends. Pair it with a visible{" "}
        <code class="cn-code-inline">label</code> and an{" "}
        <code class="cn-code-inline">output for</code> that shows the value in
        words. When the number alone is not the value a reader needs, set{" "}
        <code class="cn-code-inline">aria-valuetext</code> to the same words,
        such as "30 days". Point{" "}
        <code class="cn-code-inline">aria-describedby</code> at any help text.
        Keep the slider out of a <code class="cn-code-inline">.field</code>: the
        field recipe styles every <code class="cn-code-inline">input</code> in it
        as a carved well.
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

      <p class="cn-copy">
        <code class="cn-code-inline">slider(input)</code> in the optional{" "}
        <a href="/behavior">behavior module</a> does the same for one slider,
        and <code class="cn-code-inline">init()</code> wires every{" "}
        <code class="cn-code-inline">input[type="range"].slider</code> on the page.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".slider", values: 'input[type="range"]', notes: "Full width, 24px tall, no native chrome." },
          { name: "track", values: "::-webkit-slider-runnable-track / ::-moz-range-track", notes: "7px, pill radius, crust under --neu-inset-soft. Filled with --cn-interactive up to --value." },
          { name: "thumb", values: "::-webkit-slider-thumb / ::-moz-range-thumb", notes: "20px round, 1px --control-edge border (overlay-1; overlay-2 under prefers-contrast), --cn-surface-raised, --neu-raised-soft and --cn-lit-edge. Hover edge --engaged-edge; held, scale .92 on the press timing, back on the spring." },
          { name: "--value", values: "0% to 100%", default: "0%", notes: "Where the fill stops outside Firefox. Set it from an input listener, or with slider() from catppuccin-neu/js." },
          { name: ":disabled", values: "on the input", notes: "--disabled-opacity (.6) and a not-allowed cursor." },
        ]}
      />
    </Doc>
  );
}
