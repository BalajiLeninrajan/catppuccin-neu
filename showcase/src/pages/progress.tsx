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
      lede="A borderless inset track with a fill in --accent. The fill inherits the track's radius, so nothing needs overflow clipping."
    >
      <Demo title="Live tracks" classes="progress-track > span">
        <div style="width:min(460px,100%);display:flex;flex-direction:column;gap:18px">
          {values.map((v, i) => (
            <div key={LABELS[i]}>
              <div class="stat is-inline" style="margin-bottom:8px">
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
        its new width over .64s and slows into the value. Pair each track
        with a <code class="cn-code">.stat.is-inline</code> for the label and
        value above it.
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
        The fill is <code class="cn-code">--accent</code>, mauve by default.
        On an accent card the bar takes the card's accent, because a progress
        fill is a data mark.
      </p>

      <Demo title="Large" classes="progress-track is-lg">
        <div style="width:min(460px,100%)">
          <div class="progress-track is-lg">
            <span style="width:58%" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.is-lg</code> makes the track 12px tall, for the
        one bar a page is about: a quota, an upload, a plan limit.
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
        gradient built from tokens. A green success meter or a peach quota
        warning stays on the palette without touching the recipe.
      </p>

      <Props
        title="Progress classes"
        rows={[
          {
            name: ".progress-track",
            values: "track",
            notes:
              "7px tall, pill radius, crust ground, soft inset. No border: the inset defines it.",
          },
          {
            name: ".progress-track > span",
            values: "width: 0 to 100%",
            default: "width: 0",
            notes:
              "Block fill; inherits the track radius; fills with var(--progress-fill), then var(--accent); width transitions over .64s on --ease-out.",
          },
          {
            name: ".progress-track.is-lg",
            values: "modifier",
            notes: "12px tall.",
          },
          {
            name: "--progress-fill",
            values: "token color or token gradient",
            default: "var(--accent)",
            notes:
              "Set on the track or a wrapper to re-key the fill per instance.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="stat is-inline">
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
