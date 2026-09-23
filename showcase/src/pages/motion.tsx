import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const tokensSnippet = `:root {
  --ease-out:    cubic-bezier(.16, 1, .3, 1);   /* answering the pointer, arriving */
  --ease-in:     cubic-bezier(.7, 0, .84, 0);   /* leaving */
  --ease-spring: cubic-bezier(.3, 1.4, .4, 1);  /* returning; overshoots about a pixel */
  --t-press: .08s;  /* a press going down */
  --t-exit:  .14s;  /* an overlay leaving */
  --t-fast:  .16s;  /* controls */
  --t-base:  .22s;  /* modals, toasts, checks */
  --t-slow:  .32s;  /* drawers, folds, page entrance */
}`;

const keyframesSnippet = `@keyframes enter { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
@keyframes spin  { to { transform: rotate(360deg); } }
@keyframes pulse { 50% { opacity: .45; box-shadow: 0 0 0 7px transparent; } }
@keyframes blink { 50% { opacity: 0; } }
@keyframes cast  { from { box-shadow: 0 0 0 transparent; border-bottom-color: transparent; } }`;

const reducedMotionSnippet = `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
  /* A frozen spinner reads as a broken ring, so it keeps a slow spin. */
  .spinner {
    animation-duration: 2.4s !important;
    animation-iteration-count: infinite !important;
  }
}`;

/* Remount the block on demand so the enter animation replays. */
function PageEnterDemo() {
  const [key, setKey] = useState(0);

  return (
    <div class="sc-row" style="align-items:center; gap:16px; flex-wrap:wrap">
      <div key={key} class="page-enter" style="display:grid;gap:10px;width:min(320px,100%)">
        <div class="panel cn-px-16 cn-py-12"><div class="stat is-inline"><span>Active teams</span><b>48</b></div></div>
        <div class="panel cn-px-16 cn-py-12"><div class="stat is-inline"><span>Open invoices</span><b>12</b></div></div>
        <div class="panel cn-px-16 cn-py-12"><div class="stat is-inline"><span>Messages today</span><b>1,204</b></div></div>
        <p class="cn-meta" style="margin:0">--t-slow (.32s) on --ease-out, 7px rise, 40ms apart.</p>
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
      lede="Two curves, a spring, five durations and five keyframes, plus a required reduced-motion block. Motion is small and mechanical. The only overshoot is a press coming back up, by about a pixel."
    >
      <h2 class="cn-label">Motion tokens</h2>

      <p class="cn-copy">
        Every transition in the package rides one of three curves. Anything
        answering the pointer or arriving takes{" "}
        <code class="cn-code">--ease-out</code>: it covers most of its travel
        early and lands. Anything leaving takes{" "}
        <code class="cn-code">--ease-in</code>. Anything returning takes{" "}
        <code class="cn-code">--ease-spring</code>, which overshoots by about
        a pixel. Presses go down on the fast-out over{" "}
        <code class="cn-code">--t-press</code> and come back on the spring.
        Overlays leave on the ease-in over <code class="cn-code">--t-exit</code>.
        Every transition names a duration token, and every transform or
        shadow transition names a curve.
      </p>

      <CodeBlock title="The tokens (tokens.css)" code={tokensSnippet} />

      <Demo title="Page entrance" classes=".page-enter">
        <PageEnterDemo />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.page-enter</code> runs the{" "}
        <code class="cn-code">enter</code> keyframe on each of its children,
        40ms apart. The sixth child and later share the .2s delay. The fill is{" "}
        <code class="cn-code">backwards</code> only: the from-state holds
        through a child's delay and nothing is held after, so no element
        stays a containing block for fixed descendants (scrims, modals,
        drawers, toasts).
      </p>

      <Demo title="Loops" classes="animation: spin | pulse | blink" row>
        <span class="chip">
          <span class="spinner" aria-hidden="true"></span>
          Syncing
        </span>
        <span class="cn-meta sc-row">
          <span class="live-dot" aria-hidden="true"></span> live-dot, pulse
        </span>
        <span
          class="cn-code"
          style="display:inline-block; width:6px; height:14px; background: var(--mauve); animation: blink .75s steps(2) infinite"
          aria-hidden="true"
        ></span>
      </Demo>

      <p class="cn-copy">
        All five keyframes live in tokens.css, so any recipe or consumer rule
        can reference them by name. <code class="cn-code">enter</code> drives{" "}
        <code class="cn-code">.page-enter</code>,{" "}
        <code class="cn-code">pulse</code> drives{" "}
        <code class="cn-code">.live-dot</code>,{" "}
        <code class="cn-code">blink</code> drives the terminal caret,{" "}
        <code class="cn-code">spin</code> drives <code class="cn-code">.spinner</code>,
        and <code class="cn-code">cast</code> drives the topbar's shadow on a
        scroll timeline where the browser supports one: nothing is under the
        bar at the top of the page, so the cast fades in over the first 60px.
      </p>

      <CodeBlock title="The keyframes (tokens.css)" code={keyframesSnippet} />

      <Props
        title="Keyframes"
        rows={[
          {
            name: "enter",
            values: "opacity 0 → 1, translateY(7px) → none",
            notes: "Used by .page-enter > * (--t-slow on --ease-out, once, 40ms apart). Fill backwards only.",
          },
          {
            name: "spin",
            values: "rotate to 360deg",
            notes: "Used by .spinner: a 16px accent-keyed ring, .8s linear infinite.",
          },
          {
            name: "pulse",
            values: "opacity dips to .45, halo collapses at 50%",
            notes: "Used by .live-dot (1.5s ease-in-out infinite).",
          },
          {
            name: "blink",
            values: "opacity 0 at 50%",
            notes: "Used by .terminal .caret (.75s steps(2) infinite).",
          },
          {
            name: "cast",
            values: "box-shadow and border-bottom-color from transparent",
            notes: "Used by .topbar under @supports (animation-timeline: scroll()): linear, both, range 0 to 60px.",
          },
        ]}
      />

      <h2 class="cn-label">Durations</h2>

      <p class="cn-copy">
        Five duration tokens, tiered by what moves. Controls answer fast and
        larger structure takes longer. Keyframe loops keep literal durations.
        The lint fails on any other literal in a transition.
      </p>

      <Props
        title="Tiers"
        rows={[
          { name: "--t-press (.08s)", values: "the down-press", notes: "Buttons, segments, pressables, the accent card, checkbox and radio, on --ease-out. Up comes back over --t-fast on --ease-spring." },
          { name: "--t-exit (.14s)", values: "exits", notes: "Every overlay leaving, on --ease-in." },
          { name: "--t-fast (.16s)", values: "controls", notes: "Buttons, inputs, chips, popovers, tooltips, table rows, links. Transform and box-shadow on the spring or the fast-out; color fades plain." },
          { name: "--t-base (.22s)", values: "modal, backdrop, toast", notes: "Entrances on --ease-out. The checkbox tick lands on the spring and the switch paddle travels in the same time." },
          { name: "--t-slow (.32s)", values: "drawer, fold, page entrance", notes: "The drawer slide, the accordion fold and .page-enter." },
          { name: "--t-slow + --t-press (.4s)", values: "tooltip delay", notes: "A pointer crossing a toolbar does not fire a row of tooltips. It leaves at once." },
          { name: "--t-slow × 2 (.64s)", values: "progress", notes: "The progress fill's width on --ease-out, slowing into the value." },
        ]}
      />

      <h2 class="cn-label">Overlay motion contract</h2>

      <p class="cn-copy">
        Entrances take <code class="cn-code">--ease-out</code> and exits take{" "}
        <code class="cn-code">--ease-in</code> over{" "}
        <code class="cn-code">--t-exit</code>. Modals and drawers are native{" "}
        <code class="cn-code">&lt;dialog&gt;</code> elements, so they enter
        through <code class="cn-code">@starting-style</code> and leave through
        discrete display and overlay transitions. Popovers and toasts stay
        mounted and toggle the <code class="cn-code">hidden</code> attribute.
        Their <code class="cn-code">[hidden]</code> rule keeps display and
        drops visibility, which transitions discretely everywhere, so the exit
        plays and the hidden overlay is invisible and inert.
      </p>

      <Props
        title="Per-overlay motion"
        rows={[
          { name: ".popover", values: "--t-fast", notes: "Fades and drops 4px from above." },
          { name: "dialog.modal", values: "--t-base", notes: "Fades, rises 8px and scales from .98." },
          { name: "dialog.drawer", values: "--t-slow", notes: "Slides in from past the right edge; no fade." },
          { name: "::backdrop", values: "--t-base", notes: "Fades with its dialog. The 2px blur stays." },
          { name: ".toast", values: "--t-base", notes: "Fades and slides 16px in from the right edge it lives on." },
        ]}
      />

      <p class="cn-copy">
        Each overlay page carries its own row of this table next to its
        specimens; see{" "}
        <a class="btn-text" href="/popover">
          Popover &amp; tooltip
        </a>
        ,{" "}
        <a class="btn-text" href="/modal">
          Modal
        </a>
        , and{" "}
        <a class="btn-text" href="/drawer">
          Drawer
        </a>
        .
      </p>

      <h2 class="cn-label">Reduced motion</h2>

      <p class="cn-copy">
        The reduced-motion block ships in tokens.css. Animations run once at
        .01ms with no delay, transitions finish in .01ms, and scroll-behavior
        goes auto. The pulse stops on its first frame, the drawer appears in
        place and the fold snaps open. The spinner keeps a slow 2.4s spin,
        because a frozen ring reads as broken.
      </p>

      <CodeBlock title="Reduced motion (tokens.css)" code={reducedMotionSnippet} />

      <h2 class="cn-label">Visibility</h2>

      <p class="cn-copy">
        The tokens reset sets <code class="cn-code">[hidden]</code> to{" "}
        <code class="cn-code">display: none !important</code>, so a hidden
        element stays hidden even when a recipe or utility sets its display.
        Two cases are left out: <code class="cn-code">hidden="until-found"</code>,
        which must stay searchable, and the overlays that animate out
        (popover, toast and the deprecated div modal, drawer and scrim),
        which keep their own <code class="cn-code">[hidden]</code> rules.
      </p>

      <p class="cn-copy">
        <code class="cn-code">.cn-sr-only</code> clips content out of the
        visual layout but leaves it in the accessibility tree; use it to label
        icon-only controls. <code class="cn-code">.cn-hidden</code> is{" "}
        <code class="cn-code">display: none !important</code>, gone from
        layout and assistive tech alike. Never compose{" "}
        <code class="cn-code">.cn-hidden</code> onto an overlay: it wins over
        the <code class="cn-code">[hidden]</code> display keep and skips the
        exit animation.
      </p>

      <Props
        title="Visibility"
        rows={[
          {
            name: ".cn-sr-only",
            values: "clip pattern",
            notes: "Visually hidden, still announced. Clipped, not hidden.",
          },
          {
            name: ".cn-hidden",
            values: "display: none !important",
            notes: "Removed from layout and the accessibility tree. Skips overlay exit animations; use the hidden attribute there instead.",
          },
        ]}
      />
    </Doc>
  );
}
