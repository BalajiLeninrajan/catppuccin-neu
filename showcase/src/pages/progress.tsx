import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const LABELS = ["Storage used", "Seats filled", "Profile complete"];

export default function ProgressPage() {
  const [values, setValues] = useState([64, 38, 86]);

  function randomize() {
    setValues(values.map(() => Math.round(4 + Math.random() * 92)));
  }

  return (
    <Doc
      title="Progress"
      lede="A borderless inset track with an accent-gradient fill. The fill inherits the track's radius, so nothing needs overflow clipping."
    >
      <Demo title="Live tracks" classes="progress-track > span">
        <div style="width:min(460px,100%);display:flex;flex-direction:column;gap:18px">
          {values.map((v, i) => (
            <div key={LABELS[i]}>
              <div class="stat-row" style="margin-bottom:8px">
                <span>{LABELS[i]}</span>
                <b>{v}%</b>
              </div>
              <div class="progress-track">
                <span style={`width:${v}%`} />
              </div>
            </div>
          ))}
          <div>
            <button type="button" class="btn btn-secondary" onClick={randomize}>
              Randomize
            </button>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Width is the only thing you set, inline, from data. The fill eases to
        its new width over .35s. Pair each track with a{" "}
        <code class="cn-code">.stat-row</code> for the label/value line above
        it.
      </p>

      <Demo title="The scale" classes="progress-track">
        <div style="width:min(460px,100%);display:flex;flex-direction:column;gap:14px">
          {[8, 25, 50, 75, 100].map((v) => (
            <div class="progress-track" key={v}>
              <span style={`width:${v}%`} />
            </div>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        The default gradient runs mauve to pink to peach across the fill
        span, so short fills read mostly mauve and only a full track shows
        the whole ramp.
      </p>

      <Demo title="Custom fill · --progress-fill" classes="progress-track">
        <div style="width:min(460px,100%);display:flex;flex-direction:column;gap:14px">
          <div class="progress-track" style="--progress-fill: var(--green)">
            <span style="width:82%" />
          </div>
          <div class="progress-track" style="--progress-fill: var(--peach)">
            <span style="width:46%" />
          </div>
          <div
            class="progress-track"
            style="--progress-fill: linear-gradient(90deg, var(--blue), var(--teal))"
          >
            <span style="width:64%" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code">--progress-fill</code> on the track (or a
        wrapper) to re-key the fill per instance: any token color or a
        gradient built from tokens. Semantic bars — a green success meter, a
        peach quota warning — stay on the palette without touching the
        recipe.
      </p>

      <Props
        title="Progress classes"
        rows={[
          {
            name: ".progress-track",
            values: "track",
            notes:
              "7px tall, pill radius, crust ground, soft inset. Borderless per the depth-replaces-border rule.",
          },
          {
            name: ".progress-track > span",
            values: "width: 0–100%",
            default: "width: 0",
            notes:
              "Block fill; inherits the track radius; fills with var(--progress-fill), defaulting to the mauve→pink→peach gradient; width transitions at .35s.",
          },
          {
            name: "--progress-fill",
            values: "token color or token gradient",
            default: "mauve→pink→peach",
            notes:
              "Set on the track or a wrapper to re-key the fill per instance.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="stat-row">
  <span>Storage used</span>
  <b>64%</b>
</div>
<div class="progress-track">
  <span style="width: 64%"></span>
</div>`}
      />
    </Doc>
  );
}
