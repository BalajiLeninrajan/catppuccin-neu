import { useState } from "preact/hooks";
import { Doc, Demo, Props } from "../lib/doc";

/* Identical blocks, each moving 24px, all fired by one button. Curves run
   over --t-slow so the shapes differ; durations run on --ease-out. */
const CURVES = ["--ease-out", "--ease-in", "--ease-spring"];
const DURATIONS = [["--t-press", ".08s"], ["--t-exit", ".14s"], ["--t-fast", ".16s"], ["--t-base", ".22s"], ["--t-slow", ".32s"]];

function Track({ label, note, transition, moved }: { label: string; note: string; transition: string; moved: boolean }) {
  return (
    <div class="sc-row cn-gap-16">
      <code class="cn-code-inline" style="min-width:13ch">{label}</code>
      <div class="well" style="width:56px;padding:4px">
        <span style={`display:block;width:16px;height:16px;border-radius:4px;background:var(--cn-fg-body);transition:${transition};translate:${moved ? "24px" : "0"} 0`} />
      </div>
      <span class="cn-meta">{note}</span>
    </div>
  );
}

function CurvesDemo() {
  const [moved, setMoved] = useState(false);
  return (
    <div class="sc-row cn-gap-24 cn-top">
      <div class="cn-stack cn-gap-8" aria-hidden="true">
        {CURVES.map((c) => <Track key={c} label={c} note="over --t-slow" transition={`translate var(--t-slow) var(${c})`} moved={moved} />)}
        {DURATIONS.map(([t, v]) => <Track key={t} label={t} note={`${v} on --ease-out`} transition={`translate var(${t}) var(--ease-out)`} moved={moved} />)}
      </div>
      <button type="button" class="btn btn-secondary" onClick={() => setMoved((m) => !m)}>
        Replay
      </button>
    </div>
  );
}

/* Remount the block on demand so the enter animation replays. */
function PageEnterDemo() {
  const [key, setKey] = useState(0);

  return (
    <div class="sc-row cn-gap-16">
      <div key={key} class="page-enter cn-stack" style="width:min(320px,100%)">
        <div class="panel cn-px-16 cn-py-12"><div class="stat is-inline"><span>Active teams</span><b>48</b></div></div>
        <div class="panel cn-px-16 cn-py-12"><div class="stat is-inline"><span>Open invoices</span><b>12</b></div></div>
        <div class="panel cn-px-16 cn-py-12"><div class="stat is-inline"><span>Messages today</span><b>1,204</b></div></div>
        <p class="cn-meta cn-m-0">--t-slow (.32s) on --ease-out, 7px rise, 40ms apart.</p>
      </div>
      <button type="button" class="btn btn-secondary" onClick={() => setKey((k) => k + 1)}>
        Replay
      </button>
    </div>
  );
}

export default function MotionPage() {
  return (
    <Doc
      title="Motion"
      lede="Two curves, a spring and five durations. Motion is small and mechanical, and only the spring overshoots."
    >
      <Demo title="Curves and durations" classes="--ease-out · --ease-in · --ease-spring · --t-*">
        <CurvesDemo />
      </Demo>

      <p class="cn-copy">
        Anything arriving or answering the pointer takes{" "}
        <code class="cn-code-inline">--ease-out</code>, anything leaving takes{" "}
        <code class="cn-code-inline">--ease-in</code>, and anything returning
        takes <code class="cn-code-inline">--ease-spring</code>. A press goes
        down over <code class="cn-code-inline">--t-press</code> and comes
        back on the spring.
      </p>

      <Demo title="Page entrance" classes=".page-enter">
        <PageEnterDemo />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.page-enter</code> staggers its
        children on a view's first render. Nothing else in the package
        staggers.
      </p>

      <Demo title="Loops" classes="spinner · live-dot · caret" row>
        <span class="chip">
          <span class="spinner" aria-hidden="true"></span>
          Syncing
        </span>
        <span class="chip">
          <span class="live-dot" aria-hidden="true"></span>
          Live
        </span>
        <div class="terminal">
          <pre>
            {"$ "}
            <span class="caret" aria-hidden="true" />
          </pre>
        </div>
      </Demo>

      <Props
        title="Motion tokens"
        rows={[
          { name: "--ease-out", values: "cubic-bezier(.16, 1, .3, 1)", notes: "Arriving, and answering the pointer." },
          { name: "--ease-in", values: "cubic-bezier(.7, 0, .84, 0)", notes: "Leaving." },
          { name: "--ease-spring", values: "one 8% overshoot", notes: "Returning: a released press, the checkbox tick, the switch." },
          { name: "--t-press", values: ".08s", notes: "A press going down." },
          { name: "--t-exit", values: ".14s", notes: "An overlay leaving." },
          { name: "--t-fast", values: ".16s", notes: "Controls, tooltips, table rows, links." },
          { name: "--t-base", values: ".22s", notes: "Modals, toasts, the checkbox tick, the switch." },
          { name: "--t-slow", values: ".32s", notes: "Drawers, the accordion fold, the page entrance." },
          { name: ".page-enter", values: "enter", notes: "Children fade and rise 7px, 40ms apart." },
          { name: ".spinner", values: "spin", notes: "A 16px ring in --accent, .8s a turn." },
          { name: ".live-dot", values: "pulse", notes: "A 1.5s pulse." },
          { name: ".terminal .caret", values: "blink", notes: "Two steps, .75s." },
        ]}
      />

      <h2 class="cn-title">Reduced motion</h2>
      <p class="cn-copy">
        Under <code class="cn-code-inline">prefers-reduced-motion: reduce</code>{" "}
        presses, slides, the fold and the page entrance land at once.
        Overlays and tooltips still fade in place over{" "}
        <code class="cn-code-inline">--t-fast</code>, and the spinner keeps a
        slow 2.4s turn so it does not read as broken.
      </p>

      <h2 class="cn-title">Hiding things</h2>
      <p class="cn-copy">
        The <code class="cn-code-inline">hidden</code> attribute is{" "}
        <code class="cn-code-inline">display: none</code>, except on a toast,
        which plays its exit first. To animate your own element out through{" "}
        <code class="cn-code-inline">hidden</code>, add{" "}
        <code class="cn-code-inline">data-cn-animate-hidden</code>.
      </p>
    </Doc>
  );
}
