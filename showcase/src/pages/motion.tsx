import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const keyframesSnippet = `@keyframes enter { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
@keyframes spin  { to { transform: rotate(360deg); } }
@keyframes pulse { 50% { opacity: .45; box-shadow: 0 0 0 7px transparent; } }
@keyframes blink { 50% { opacity: 0; } }`;

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
      <div key={key} class="page-enter panel" style="padding:16px 20px">
        <span class="cn-label">page-enter</span>
        <p class="cn-meta" style="margin:6px 0 0">
          .34s ease, 7px rise, fade in.
        </p>
      </div>
      <button type="button" class="btn" onClick={() => setKey((k) => k + 1)}>
        Replay
      </button>
    </div>
  );
}

function SpinGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="16"
      height="16"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
      style="animation: spin .9s linear infinite"
    >
      <path d="M12 3a9 9 0 1 1-6.4 2.6" />
    </svg>
  );
}

export default function MotionPage() {
  return (
    <Doc
      title="Motion"
      lede="Four keyframes, three transition tiers, one overlay contract, and a mandatory reduced-motion collapse. Motion here is small and mechanical; nothing bounces."
    >
      <Demo title="Page entrance" classes=".page-enter">
        <PageEnterDemo />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.page-enter</code> runs the{" "}
        <code class="cn-code">enter</code> keyframe once and deliberately sets
        no fill mode: a held transform would make the element a containing
        block for every fixed descendant (scrims, modals, drawers, toasts)
        forever.
      </p>

      <Demo title="Loops" classes="animation: spin | pulse | blink" row>
        <span class="chip">
          <SpinGlyph />
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
        All four keyframes live in tokens.css, so any recipe or consumer rule
        can reference them by name. <code class="cn-code">enter</code> drives{" "}
        <code class="cn-code">.page-enter</code>,{" "}
        <code class="cn-code">pulse</code> drives{" "}
        <code class="cn-code">.live-dot</code>,{" "}
        <code class="cn-code">blink</code> drives the terminal caret, and{" "}
        <code class="cn-code">spin</code> is there for your own spinners.
      </p>

      <CodeBlock title="The keyframes (tokens.css)" code={keyframesSnippet} />

      <Props
        title="Keyframes"
        rows={[
          {
            name: "enter",
            values: "opacity 0 → 1, translateY(7px) → none",
            notes: "Used by .page-enter (.34s ease, once). No fill mode.",
          },
          {
            name: "spin",
            values: "rotate to 360deg",
            notes: "For spinners; pair with linear timing and infinite.",
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
        ]}
      />

      <h2 class="cn-label">Transition tiers</h2>

      <p class="cn-copy">
        Durations are tiered by what moves. Controls answer fast; larger
        structure takes longer. Pick from these four, nothing in between.
      </p>

      <Props
        title="Tiers"
        rows={[
          {
            name: ".16s to .2s",
            values: "controls",
            notes: "Buttons, inputs, chips, segments, popovers, tooltips: transform, background, border-color, box-shadow, color.",
          },
          {
            name: ".26s",
            values: "drawer",
            notes: "The drawer's slide; the widest travel among overlays.",
          },
          {
            name: ".3s",
            values: "fold",
            notes: "The accordion fold: grid-template-rows 0fr to 1fr, plus the trailing visibility flip.",
          },
          {
            name: ".35s",
            values: "progress",
            notes: "The progress fill's width, so value jumps read as movement.",
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
        invisible, unfocusable, and inert to pointers.
      </p>

      <Props
        title="Per-overlay motion"
        rows={[
          {
            name: ".popover",
            values: ".16s",
            notes: "Fades and drops 4px from above.",
          },
          {
            name: ".modal",
            values: ".2s",
            notes: "Fades, rises 8px, and scales from .98.",
          },
          {
            name: ".drawer",
            values: ".26s",
            notes: "Slides in from past the right edge; no fade.",
          },
          {
            name: ".toast",
            values: ".2s",
            notes: "Fades and rises 6px.",
          },
          {
            name: ".cn-scrim",
            values: ".2s",
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
