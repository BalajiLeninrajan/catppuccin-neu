import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { WarningGlyph } from "../lib/glyphs";

const LABELS = ["Storage used", "Seats filled", "Profile complete"];

export default function ProgressPage() {
  const [values, setValues] = useState([64, 38, 86]);

  function randomize() {
    setValues(values.map(() => Math.round(4 + Math.random() * 92)));
  }

  return (
    <Doc
      title="Progress"
      lede="An inset track with a fill in the --accent ramp."
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
        Set the fill width inline from data. Pair each track with a <code class="cn-code-inline">.stat.is-inline</code> for the label and the value.
      </p>

      <Demo title="Large" classes="progress-track is-lg">
        <div style="width:min(460px,100%)">
          <div class="progress-track is-lg">
            <span style="width:58%" />
          </div>
        </div>
      </Demo>

      <Demo title="Custom fill · --progress-fill" classes="progress-track">
        <div class="cn-stack cn-gap-16" style="width:min(460px,100%)">
          <div class="cn-stack cn-gap-8">
            <div class="stat is-inline">
              <span>Invoices reconciled</span>
              <b>82%</b>
            </div>
            <div class="progress-track" style="--progress-fill: var(--cn-success)">
              <span style="width:82%" />
            </div>
          </div>
          <div class="cn-stack cn-gap-8">
            <div class="stat is-inline">
              <span>API quota, near the limit</span>
              <b>91%</b>
            </div>
            <div class="progress-track" style="--progress-fill: var(--cn-warning)">
              <span style="width:91%" />
            </div>
            <div class="cn-row cn-between">
              <span class="tag cn-tone-warning">
                <WarningGlyph />
                Near the limit
              </span>
              <span class="cn-meta">Resets Oct 01</span>
            </div>
          </div>
          <div class="cn-stack cn-gap-8">
            <div class="stat is-inline">
              <span>Export</span>
              <b>64%</b>
            </div>
            <div
              class="progress-track"
              style="--progress-fill: linear-gradient(90deg, var(--blue), var(--teal))"
            >
              <span style="width:64%" />
            </div>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code-inline">--progress-fill</code> on the track to re-key one fill. The fill color never states the status alone. The label and the value beside the bar do.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".progress-track", values: "track", notes: "An inset pill." },
          { name: ".progress-track > span", values: "width: 0 to 100%", default: "width: 0", notes: "The fill. Set its width inline." },
          { name: ".progress-track.is-lg", values: "modifier", notes: "12px tall, for the one bar a page is about." },
          { name: "--progress-fill", values: "a color or a gradient", default: "the accent ramp", notes: "Re-keys the fill for one track." },
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
