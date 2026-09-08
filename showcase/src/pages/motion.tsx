import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const tokensSnippet = `:root {
  --ease-out:    cubic-bezier(.16, 1, .3, 1);   /* answering the pointer, arriving */
  --ease-in:     cubic-bezier(.7, 0, .84, 0);   /* leaving */
  --ease-spring: cubic-bezier(.3, 1.4, .4, 1);  /* returning; overshoots about a pixel */
  --t-fast: .16s; --t-base: .22s; --t-slow: .32s;
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
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
  }
}`;

/* Remount the block on demand so the enter animation replays. */
function PageEnterDemo() {
  const [key, setKey] = useState(0);

  return (
    <div class="sc-row" style="align-items:center; gap:16px; flex-wrap:wrap">
      <div key={key} class="page-enter" style="display:grid;gap:10px;width:min(320px,100%)">
        <div class="panel" style="padding:12px 16px"><div class="stat-row"><span>Active teams</span><b>48</b></div></div>
        <div class="panel" style="padding:12px 16px"><div class="stat-row"><span>Open invoices</span><b>12</b></div></div>
        <div class="panel" style="padding:12px 16px"><div class="stat-row"><span>Messages today</span><b>1,204</b></div></div>
        <p class="cn-meta" style="margin:0">.34s on --ease-out, 7px rise, 40ms apart.</p>
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
      lede="Two curves, a spring, three durations, five keyframes, one overlay contract, and a mandatory reduced-motion collapse. Motion here is small and mechanical. The one thing that overshoots is a press coming back up, by about a pixel."
    >
      <h2 class="cn-label">Motion tokens</h2>

      <p class="cn-copy">
        Every transition in the package rides one of three curves. Anything
        answering the pointer or arriving takes{" "}
        <code class="cn-code">--ease-out</code>: it covers most of its travel
        early and lands. Anything leaving takes{" "}
        <code class="cn-code">--ease-in</code>. Anything returning takes{" "}
        <code class="cn-code">--ease-spring</code>, which overshoots by about
        a pixel, the difference between a picture of a button and a button.
        Presses go down on the fast-out in .08s and come back on the spring;
        overlays leave on the ease-in in .14s. Nothing rides the browser
        default curve.
      </p>

      <CodeBlock title="The tokens (tokens.css)" code={tokensSnippet} />

      <Demo title="Page entrance" classes=".page-enter">
        <PageEnterDemo />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.page-enter</code> runs the{" "}
        <code class="cn-code">enter</code> keyframe on each of its children,
        40ms apart (the sixth and later share the .2s delay), so the page
        assembles instead of arriving as one slab. The fill is{" "}
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
            notes: "Used by .page-enter > * (.34s --ease-out, once, staggered 40ms). Fill backwards only.",
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
        Durations are tiered by what moves. Controls answer fast; larger
        structure takes longer. Pick from these, nothing in between.
      </p>

      <Props
        title="Tiers"
        rows={[
          {
            name: ".08s",
            values: "the down-press",
            notes: "Buttons, segments, pressables, the accent card, checkbox and radio, on --ease-out. Up comes back over --t-fast on --ease-spring.",
          },
          {
            name: ".14s",
            values: "exits",
            notes: "Every overlay leaving, on --ease-in.",
          },
          {
            name: "--t-fast (.16s)",
            values: "controls",
            notes: "Buttons, inputs, chips, segments, popovers, tooltips, table rows, links: transform and box-shadow on the spring, color fades plain.",
          },
          {
            name: "--t-base (.22s)",
            values: "modal, scrim, toast",
            notes: "Entrances on --ease-out. The checkbox's check lands in .22s on the spring; the switch paddle in .24s.",
          },
          {
            name: "--t-slow (.32s)",
            values: "drawer",
            notes: "The drawer's slide; the widest travel among overlays.",
          },
          {
            name: ".3s",
            values: "fold",
            notes: "The accordion fold: grid-template-rows 0fr to 1fr on --ease-out, plus the trailing visibility flip.",
          },
          {
            name: ".4s then .16s",
            values: "tooltip",
            notes: "Waits .4s so a pointer crossing a toolbar doesn't fire a row of them, then fades and rises 2px. Leaves at once.",
          },
          {
            name: ".6s",
            values: "progress",
            notes: "The progress fill's width on --ease-out, decelerating into the value.",
          },
        ]}
      />

      <h2 class="cn-label">Overlay motion contract</h2>

      <p class="cn-copy">
        Every overlay enters via <code class="cn-code">@starting-style</code>{" "}
        and exits via the <code class="cn-code">hidden</code> attribute. The
        exit does not rely on display transitions:{" "}
        <code class="cn-code">[hidden]</code> keeps the element's display and
        drops <code class="cn-code">visibility</code> instead, which
        transitions discretely everywhere, so the overlay stays visible for
        the whole exit and flips only at the end. A hidden overlay is
        invisible, unfocusable, and inert to pointers. Entrances take{" "}
        <code class="cn-code">--ease-out</code>, so the overlay covers most of
        its travel early and lands in the last stretch; exits take{" "}
        <code class="cn-code">--ease-in</code> in .14s, so a dismissed thing
        is gone before the hand moves.
      </p>

      <Props
        title="Per-overlay motion"
        rows={[
          {
            name: ".popover",
            values: "--t-fast",
            notes: "Fades and drops 4px from above.",
          },
          {
            name: ".modal",
            values: "--t-base",
            notes: "Fades, rises 8px, and scales from .98.",
          },
          {
            name: ".drawer",
            values: "--t-slow",
            notes: "Slides in from past the right edge; no fade.",
          },
          {
            name: ".toast",
            values: "--t-base",
            notes: "Fades and slides 16px in from the right edge it lives on.",
          },
          {
            name: ".cn-scrim",
            values: "--t-base",
            notes: "Fades opacity and backdrop blur. A modal or drawer inside it rides the scrim's exit.",
          },
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
        The reduced-motion block is mandatory and collapses everything:
        animations run once at .01ms, transitions finish in .01ms, and
        scroll-behavior goes auto. The pulse stops on its first frame, the
        drawer appears in place, the fold snaps open.
      </p>

      <CodeBlock title="Reduced motion (tokens.css)" code={reducedMotionSnippet} />

      <h2 class="cn-label">Visibility utilities</h2>

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
