import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const tokensSnippet = `:root {
  --ease-out:    cubic-bezier(.16, 1, .3, 1);   /* answering the pointer, arriving */
  --ease-in:     cubic-bezier(.7, 0, .84, 0);   /* leaving */
  --ease-spring: cubic-bezier(.3, 1.4, .4, 1);  /* returning; the fallback */
  --t-press: .08s;  /* a press going down */
  --t-exit:  .14s;  /* an overlay leaving */
  --t-fast:  .16s;  /* controls */
  --t-base:  .22s;  /* modals, toasts, checks */
  --t-slow:  .32s;  /* drawers, folds, page entrance */
}

/* Where linear() works, the spring is a damped spring with one 8% overshoot */
@supports (transition-timing-function: linear(0, 1)) {
  :root {
    --ease-spring: linear(0, .047, .161, .31, .47, .623, .757, .868, .954, 1.015, 1.054,
      1.076, 1.083, 1.081, 1.073, 1.061, 1.047, 1.034, 1.023, 1.013, 1.005, 1, .996, .994, 1);
  }
}`;

const viewTransitionSnippet = `/* your stylesheet: opt in to cross-document route changes */
@view-transition { navigation: auto; }

/* the package already times the root cross-fade and the cn-morph
   groups (tokens.css), and cuts both under reduced motion */
::view-transition-old(root), ::view-transition-new(root) {
  animation-duration: var(--t-base);
  animation-timing-function: var(--ease-out);
}`;

const morphSnippet = `<!-- the same two names on every route: they morph instead of cross-fading -->
<section class="panel is-lead cn-morph">…</section>
<button class="btn btn-primary cn-morph">New invoice</button>`;

const keyframesSnippet = `@keyframes enter { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }
@keyframes spin  { to { transform: rotate(360deg); } }
@keyframes pulse { 50% { opacity: .45; box-shadow: 0 0 0 7px transparent; } }
@keyframes blink { 50% { opacity: 0; } }
@keyframes breathe { to { opacity: .7; } }
@keyframes cast  { from { box-shadow: 0 0 0 transparent; border-bottom-color: transparent; } }`;

const reducedMotionSnippet = `@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: .01ms !important;
    animation-delay: 0s !important;
    animation-iteration-count: 1 !important;
    transition-duration: .01ms !important;
    transition-delay: 0s !important;
  }
  :is(.popover, .toast, dialog.modal, dialog.drawer), [data-tip]::after { transition-duration: var(--t-fast) !important; }
  /* The universal selector does not reach view-transition pseudo-elements,
     so route cross-fades and morphs are cut here by name. */
  ::view-transition-group(*), ::view-transition-old(*), ::view-transition-new(*) { animation-duration: .01ms !important; animation-delay: 0s !important; }
  /* A frozen spinner reads as a broken ring, so it keeps a slow spin, and
     a busy button keeps its spinner turning. */
  .spinner, .btn[aria-busy="true"]::after {
    animation-duration: 2.4s !important;
    animation-iteration-count: infinite !important;
  }
  /* The skeleton holds still at its midpoint instead of pulsing. */
  .skeleton { animation: none !important; opacity: .85; }
}`;

const arriveSnippet = `/* tokens.css: no stagger, the whole set arrives at once */
.cn-arrive { transition: opacity var(--t-fast) var(--ease-out), translate var(--t-fast) var(--ease-out); }
@starting-style { .cn-arrive { opacity: 0; translate: 0 2px; } }

<!-- a row a live list inserts -->
<tr class="cn-arrive">…</tr>

<!-- content that replaces a skeleton -->
<div class="cn-arrive">…loaded panel body…</div>`;

const INVOICES = [
  ["Invoice #1043", "$1,240"],
  ["Invoice #1044", "$318"],
  ["Invoice #1045", "$2,905"],
  ["Invoice #1046", "$76"],
  ["Invoice #1047", "$4,410"],
];

/* A live list: each insert arrives with .cn-arrive; a remove leaves at once. */
function ArriveDemo() {
  const [rows, setRows] = useState<number[]>([]);
  const next = rows.length ? Math.max(...rows) + 1 : 0;
  return (
    <div class="sc-row cn-gap-16 cn-top">
      <div class="well cn-px-16 cn-py-8" style="width:min(320px,100%);min-height:64px">
        {rows.length ? (
          <div class="cn-divide">
            {rows.map((i) => (
              <div key={i} class="stat is-inline cn-arrive">
                <span>{INVOICES[i % INVOICES.length][0]}</span>
                <b>{INVOICES[i % INVOICES.length][1]}</b>
              </div>
            ))}
          </div>
        ) : (
          <p class="cn-meta cn-m-0">No new invoices.</p>
        )}
      </div>
      <div class="cn-stack cn-gap-8">
        <button type="button" class="btn btn-secondary" onClick={() => setRows([next, ...rows])}>
          Insert a row
        </button>
        <button type="button" class="btn btn-ghost" disabled={!rows.length} onClick={() => setRows(rows.slice(1))}>
          Remove a row
        </button>
      </div>
    </div>
  );
}

/* Every curve and duration side by side: identical blocks, each moving
   24px, all fired by one button. Curves run over --t-slow so the shapes
   differ visibly; durations run on --ease-out. */
const CURVES = ["--ease-out", "--ease-in", "--ease-spring"];
const DURATIONS = [["--t-press", ".08s"], ["--t-exit", ".14s"], ["--t-fast", ".16s"], ["--t-base", ".22s"], ["--t-slow", ".32s"]];

function Track({ label, note, transition, moved }: { label: string; note: string; transition: string; moved: boolean }) {
  return (
    <div class="sc-row cn-gap-16">
      <code class="cn-code-inline" style="min-width:13ch">{label}</code>
      <div class="well" style="width:56px;padding:4px">
        <span style={`display:block;width:16px;height:16px;border-radius:4px;background:var(--cn-fg-soft);transition:${transition};translate:${moved ? "24px" : "0"} 0`} />
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
      lede="Two curves, a spring, five durations and six keyframes, with a reduced-motion block in the tokens. Motion is small and mechanical, and only the spring overshoots."
    >
      <h2 class="cn-label">Motion tokens</h2>

      <p class="cn-copy">
        Every transition in the package rides one of three curves and names
        one of five durations.
      </p>

      <Demo title="Curves and durations" why="Which curve and duration to pick" classes="--ease-out · --ease-in · --ease-spring · --t-*">
        <CurvesDemo />
      </Demo>

      <p class="cn-copy">
        Each block travels 24px. The three curves run over{" "}
        <code class="cn-code-inline">--t-slow</code> so their shapes read: the
        fast-out lands early, the ease-in starts late, and the spring passes
        its mark and settles. The five durations run on the fast-out.
      </p>

      <p class="cn-copy">
        Replay toggles the blocks, so press it again while they are still
        travelling: each block turns back from where it is, not from its
        start. Every state change in the package is a transition, so a press
        released early or a toggle flipped back retargets mid-flight. Only
        page-enter and the loops are keyframes, and those restart.
      </p>

      <p class="cn-copy">
        Anything answering the pointer or arriving takes{" "}
        <code class="cn-code-inline">--ease-out</code>: it covers most of its travel
        early and lands. Anything leaving takes{" "}
        <code class="cn-code-inline">--ease-in</code>. Anything returning takes{" "}
        <code class="cn-code-inline">--ease-spring</code>. Where the browser
        supports <code class="cn-code-inline">linear()</code> easing, the spring
        is a damped spring sampled into 25 stops: it passes its target once,
        by 8%, and settles. Elsewhere it falls back to{" "}
        <code class="cn-code-inline">cubic-bezier(.3, 1.4, .4, 1)</code>, a
        single bump. On a 2px press the overshoot is a fraction of a pixel;
        on the switch paddle's 23px travel it is a visible bounce. Presses go
        down on the fast-out over{" "}
        <code class="cn-code-inline">--t-press</code> and come back on the spring.
        Overlays leave on the ease-in over <code class="cn-code-inline">--t-exit</code>.
        Every transition names a duration token, and every transform or
        shadow transition names a curve.
      </p>

      <CodeBlock title="The tokens (tokens.css)" code={tokensSnippet} />

      <Demo title="Page entrance" why="How the stagger works" classes=".page-enter">
        <PageEnterDemo />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.page-enter</code> runs the{" "}
        <code class="cn-code-inline">enter</code> keyframe on each of its children,
        40ms apart. The sixth child and later share the .2s delay. The fill is{" "}
        <code class="cn-code-inline">backwards</code> only: the from-state holds
        through a child's delay and nothing is held after, so no element
        stays a containing block for fixed descendants (scrims, modals,
        drawers, toasts).
      </p>

      <Demo title="Loops" why="The six keyframes" classes="spin · pulse · blink · breathe" row>
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
        <div style="width:160px" aria-hidden="true">
          <span class="skeleton is-text" />
          <span class="skeleton is-text" />
        </div>
      </Demo>

      <p class="cn-copy">
        All six keyframes live in tokens.css, so any recipe or consumer rule
        can reference them by name. <code class="cn-code-inline">enter</code> drives{" "}
        <code class="cn-code-inline">.page-enter</code>,{" "}
        <code class="cn-code-inline">spin</code> drives{" "}
        <code class="cn-code-inline">.spinner</code> and the busy button,{" "}
        <code class="cn-code-inline">pulse</code> drives{" "}
        <code class="cn-code-inline">.live-dot</code>,{" "}
        <code class="cn-code-inline">blink</code> drives the terminal caret,{" "}
        <code class="cn-code-inline">breathe</code> drives{" "}
        <code class="cn-code-inline">.skeleton</code>, and{" "}
        <code class="cn-code-inline">cast</code> drives the topbar's shadow on a
        scroll timeline where the browser supports one. Nothing is under the
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
            notes: "Used by .spinner, a 16px accent-keyed ring, and the busy button's spinner: .8s linear infinite.",
          },
          {
            name: "pulse",
            values: "opacity dips to .45, halo collapses at 50%",
            notes: "Used by .live-dot: 1.5s on --ease-out, infinite.",
          },
          {
            name: "blink",
            values: "opacity 0 at 50%",
            notes: "Used by .terminal .caret (.75s steps(2) infinite).",
          },
          {
            name: "breathe",
            values: "opacity to .5",
            notes: "Used by .skeleton: 1.6s on --ease-in, infinite, alternate.",
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
          { name: "--t-fast (.16s)", values: "controls, arriving data", notes: "Buttons, inputs, chips, popovers, tooltips, table rows, links, and .cn-arrive. Transform and box-shadow on the spring or the fast-out; color fades plain." },
          { name: "--t-base (.22s)", values: "modal, backdrop, toast", notes: "Entrances on --ease-out. The checkbox tick lands on the spring and the switch paddle travels in the same time." },
          { name: "--t-slow (.32s)", values: "drawer, fold, page entrance", notes: "The drawer slide, the accordion fold and .page-enter." },
          { name: "--t-slow + --t-press (.4s)", values: "tooltip delay", notes: "A pointer crossing a toolbar does not fire a row of tooltips. On leave it lingers for --t-slow so the pointer can reach the bubble." },
          { name: "--t-slow × 2 (.64s)", values: "progress", notes: "The progress fill's width on --ease-out, slowing into the value." },
        ]}
      />

      <h2 class="cn-label">Overlay motion contract</h2>

      <p class="cn-copy">
        Entrances take <code class="cn-code-inline">--ease-out</code> and exits take{" "}
        <code class="cn-code-inline">--ease-in</code> over{" "}
        <code class="cn-code-inline">--t-exit</code>. Modals and drawers are native{" "}
        <code class="cn-code-inline">&lt;dialog&gt;</code> elements, so they enter
        through <code class="cn-code-inline">@starting-style</code> and leave through
        discrete display and overlay transitions. Popovers and toasts stay
        mounted and toggle the <code class="cn-code-inline">hidden</code> attribute.
        Their <code class="cn-code-inline">[hidden]</code> rule keeps display and
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
        <a href="/popover">
          Popover &amp; tooltip
        </a>
        ,{" "}
        <a href="/modal">
          Modal
        </a>
        , and{" "}
        <a href="/drawer">
          Drawer
        </a>
        .
      </p>

      <h2 class="cn-label">Data changes</h2>

      <p class="cn-copy">
        Data moves less than chrome. A reader is comparing numbers, and
        travel pulls the eye off them.
      </p>

      <Props
        title="When data changes"
        rows={[
          { name: "progress", values: "--t-slow × 2, --ease-out", notes: "The bar eases to its new width and slows into the value." },
          { name: "a changed number", values: "swaps in place", notes: "Values are tabular, so the width holds. Never count up or tween a figure." },
          { name: ".cn-arrive", values: "--t-fast, --ease-out", notes: "Content that replaces a skeleton, and a row a live list inserts: a fade and a 2px settle. The whole set arrives at once." },
          { name: "a removed row", values: "leaves at once", notes: "A dismissed toast or a closed overlay is the only exit that animates." },
          { name: "a reorder the reader asked for", values: "cuts", notes: "A sort, a filter or a new page swaps with no motion." },
          { name: "a tab change", values: "cuts; the pill slides", notes: "The reader asked for it, so the tab panel cuts. Only the selected tab's pill slides, over --t-fast on the ease-out." },
          { name: "a filter that empties a table", values: "cuts", notes: "The table cuts to the .empty-state with no .cn-arrive." },
          { name: "a reorder from elsewhere", values: "--t-base, --ease-out", notes: "May use a view transition with a view-transition-name per row." },
          { name: "a layout the reader opened", values: "follows the reader", notes: "A panel that grows because the reader opened something moves with them. The accordion's height transition is the model." },
          { name: "a layout that shifts on its own", values: "--t-base, view transition", notes: "A column appears or a banner lands above content: name the moving regions with view-transition-name and run a view transition, so nothing jumps under the pointer." },
          { name: "width or height on a box of text", values: "never animates", notes: "Text reflows on every frame of a size tween. Use a view transition, or the accordion's grid-template-rows fold." },
          { name: ".page-enter", values: "the one stagger", notes: "A view's first render only. Five steps 40ms apart, then the rest together, so no reveal runs past .2s plus --t-slow." },
        ]}
      />

      <p class="cn-copy">
        Three of these rules run live on their own pages: the progress fill
        on{" "}
        <a href="/progress">
          Progress
        </a>
        , a number swapping in place on{" "}
        <a href="/bar-chart">
          Bar chart
        </a>
        , and a sort that cuts on{" "}
        <a href="/table">
          Table
        </a>
        .
      </p>

      <Demo title="A live list" why="How data changes move" classes="cn-arrive">
        <ArriveDemo />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.cn-arrive</code> enters through{" "}
        <code class="cn-code-inline">@starting-style</code>, so it runs once when
        the element first renders and never again on an update. Put it on
        the inserted row or the loaded block, not on the list around it.
        Under reduced motion it lands at once, like every other data change.
      </p>

      <p class="cn-copy">
        A change of layout follows the same split as a reorder. When the
        reader opens something and a panel grows, the motion answers them;
        the accordion fold is the model. When the layout shifts on its own,
        such as a column appearing or a banner landing above the content,
        give the moving regions a{" "}
        <code class="cn-code-inline">view-transition-name</code> and wrap the
        change in <code class="cn-code-inline">document.startViewTransition()</code>{" "}
        at <code class="cn-code-inline">--t-base</code>, so nothing jumps under the
        pointer. Never animate width or height on a box that holds text.
      </p>

      <CodeBlock
        title="A banner that lands above content"
        code={`/* name the regions that move */
#sync-banner { view-transition-name: sync-banner; }
#invoices    { view-transition-name: invoices; }
::view-transition-group(*) { animation-duration: var(--t-base); animation-timing-function: var(--ease-out); }

/* then make the change inside a transition */
document.startViewTransition(() => showBanner());`}
      />

      <CodeBlock title=".cn-arrive (tokens.css)" code={arriveSnippet} />

      <h2 class="cn-label">Route changes</h2>

      <p class="cn-copy">
        A multi-page site can opt in to a cross-fade between pages with{" "}
        <code class="cn-code-inline">@view-transition {"{ navigation: auto; }"}</code>{" "}
        in its own CSS. The package does not opt in for you. It times the
        root cross-fade and the <code class="cn-code-inline">.cn-morph</code>{" "}
        groups, both at <code class="cn-code-inline">--t-base</code> on{" "}
        <code class="cn-code-inline">--ease-out</code>. Under reduced motion
        every view-transition animation runs in .01ms, so the page swaps at
        once. The reduced-motion block names the view-transition
        pseudo-elements, because the universal selector does not reach them. A single-page
        app changes routes in script, so it calls{" "}
        <code class="cn-code-inline">document.startViewTransition</code> around
        the route change instead, behind a check that the browser has it. This
        site wraps every in-app link that way.
      </p>

      <p class="cn-copy">
        A consumer may also morph what both pages share. Add{" "}
        <code class="cn-code-inline">.cn-morph</code> to the lead panel and to
        the page's one primary on every route. It names them{" "}
        <code class="cn-code-inline">cn-lead</code> and{" "}
        <code class="cn-code-inline">cn-primary</code>, so they morph from one
        page to the next instead of cross-fading, on the same{" "}
        <code class="cn-code-inline">--t-base</code> and ease-out. It is a
        class, not a rule on every primary: two elements with one{" "}
        <code class="cn-code-inline">view-transition-name</code> abort the
        whole transition, so put it on one primary per page. To see it, go
        from the <a href="/examples/dashboard">dashboard example</a> to the{" "}
        <a href="/examples/invoice">invoice example</a>: the lead panel and
        the primary move and resize into place.
      </p>

      <CodeBlock title="Opting in" code={viewTransitionSnippet} />

      <CodeBlock title="Morphing the lead and the primary" code={morphSnippet} />

      <h2 class="cn-label">Reduced motion</h2>

      <p class="cn-copy">
        Reduced motion removes movement, not feedback. The block ships in
        tokens.css. Animations run once at .01ms with no delay, transitions
        finish in .01ms with no delay, and scroll-behavior goes auto, so
        presses, slides, the fold and the page entrance land at once. The
        live dot stops on its first frame.
      </p>

      <p class="cn-copy">
        Three things keep moving. Popovers, toasts, dialogs, drawers and
        tooltips still fade over <code class="cn-code-inline">--t-fast</code>,
        in place: recipes.css drops their travel and scale, so a drawer fades
        instead of sliding. The spinner and a busy button keep a slow 2.4s
        spin, because a frozen ring reads as broken. The skeleton holds still at
        .75 opacity, the midpoint of its breath, instead of breathing.
      </p>

      <CodeBlock title="Reduced motion (tokens.css)" code={reducedMotionSnippet} />

      <h2 class="cn-label">Visibility</h2>

      <p class="cn-copy">
        The tokens reset sets <code class="cn-code-inline">[hidden]</code> to{" "}
        <code class="cn-code-inline">display: none !important</code>, so a hidden
        element stays hidden even when a recipe or utility sets its display.
        Two cases are left out: <code class="cn-code-inline">hidden="until-found"</code>,
        which must stay searchable, and the overlays that animate out
        (popover and toast),
        which keep their own <code class="cn-code-inline">[hidden]</code> rules.
        A consumer element that animates out through{" "}
        <code class="cn-code-inline">[hidden]</code> opts out with{" "}
        <code class="cn-code-inline">data-cn-animate-hidden</code>.
      </p>

      <p class="cn-copy">
        <code class="cn-code-inline">.cn-sr-only</code> clips content out of the
        visual layout but leaves it in the accessibility tree; use it to label
        icon-only controls. <code class="cn-code-inline">.cn-hidden</code> is{" "}
        <code class="cn-code-inline">display: none !important</code>, gone from
        layout and assistive tech alike. Never compose{" "}
        <code class="cn-code-inline">.cn-hidden</code> onto an overlay: it wins over
        the <code class="cn-code-inline">[hidden]</code> display keep and skips the
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
