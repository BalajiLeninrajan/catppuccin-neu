import { useEffect, useRef, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const MESSAGES = [
  { title: "Event created", desc: "Sunday, December 3 at 9:00 AM" },
  { title: "Settings saved", desc: "Northwind Ops picks up the change now." },
  { title: "Message archived", desc: "Find it under Archive whenever you need it." },
  { title: "Teammates added", desc: "3 people joined the Design workspace." },
];

interface ToastItem {
  id: number;
  title: string;
  desc: string;
  leaving: boolean;
}

/* Swipe to dismiss, the same rule as toast() in catppuccin-neu/js: a toast
   follows a sideways drag toward the end edge and goes past 80px or on a
   quick flick; short of that it springs back. Drag state lives on the
   element, so a re-render mid-drag keeps it. */
const drags = new WeakMap<HTMLElement, { id: number; x0: number; t0: number; dx: number; end: number }>();

function swipe(onDismiss: () => void) {
  return {
    onPointerDown(e: PointerEvent) {
      const el = e.currentTarget as HTMLElement;
      if (e.button !== 0 || (e.target as Element).closest("button, a, input")) return;
      const end = getComputedStyle(el).direction === "rtl" ? -1 : 1;
      drags.set(el, { id: e.pointerId, x0: e.clientX, t0: e.timeStamp, dx: 0, end });
      el.setPointerCapture(e.pointerId);
      el.style.transition = "none";
    },
    onPointerMove(e: PointerEvent) {
      const el = e.currentTarget as HTMLElement;
      const d = drags.get(el);
      if (!d || d.id !== e.pointerId) return;
      d.dx = Math.max(0, (e.clientX - d.x0) * d.end);
      el.style.translate = `${d.dx * d.end}px 0`;
      el.style.opacity = String(Math.max(0, 1 - d.dx / 240));
    },
    onPointerUp: release,
    onPointerCancel: release,
  };
  function release(e: PointerEvent) {
    const el = e.currentTarget as HTMLElement;
    const d = drags.get(el);
    if (!d || d.id !== e.pointerId) return;
    drags.delete(el);
    el.style.transition = "";
    const flick = d.dx / Math.max(1, e.timeStamp - d.t0) > 0.6;
    if (d.dx > 80 || (flick && d.dx > 24)) return onDismiss();
    el.style.translate = "";
    el.style.opacity = "";
  }
}

function ToastSpawner() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const msgRef = useRef(0);
  // Per-toast timer bookkeeping so hover can pause and dismissal can cancel.
  const timers = useRef(new Map<number, { handle: number; endsAt: number; remaining: number }>());
  const leavingRef = useRef(new Set<number>());

  const DURATION = 7000;
  const EXIT_MS = 280; // covers the fade and the fanned row collapse
  const CAP = 5;

  function schedule(id: number, ms: number) {
    const handle = window.setTimeout(() => dismiss(id), ms);
    timers.current.set(id, { handle, endsAt: Date.now() + ms, remaining: ms });
  }

  function spawn() {
    const id = ++idRef.current;
    const { title, desc } = MESSAGES[msgRef.current++ % MESSAGES.length];
    setToasts((t) => [...t, { id, title, desc, leaving: false }]);
    schedule(id, DURATION);
  }

  // Cancel the timer, guard double dismissal, play the exit, then unmount.
  function dismiss(id: number) {
    if (leavingRef.current.has(id)) return;
    leavingRef.current.add(id);
    const timer = timers.current.get(id);
    if (timer) {
      clearTimeout(timer.handle);
      timers.current.delete(id);
    }
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    window.setTimeout(() => {
      leavingRef.current.delete(id);
      setToasts((t) => t.filter((x) => x.id !== id));
    }, EXIT_MS);
  }

  // Reading the stack pauses every timer; leaving resumes the remainder.
  function pause() {
    for (const timer of timers.current.values()) {
      clearTimeout(timer.handle);
      timer.remaining = Math.max(0, timer.endsAt - Date.now());
    }
  }
  function resume() {
    for (const [id, timer] of timers.current) {
      schedule(id, Math.max(timer.remaining, 600));
    }
  }

  // The pile hides the fourth and older; cap the DOM at five live toasts.
  useEffect(() => {
    const live = toasts.filter((t) => !t.leaving);
    if (live.length > CAP) dismiss(live[0].id);
  }, [toasts]);

  useEffect(() => {
    const held = timers.current;
    return () => {
      for (const timer of held.values()) clearTimeout(timer.handle);
    };
  }, []);

  return (
    <>
      <button type="button" class="btn btn-primary" onClick={spawn}>
        Spawn a toast
      </button>
      {/* Always mounted: a live region must exist before content lands in it. */}
      <div
        class="toast-stack"
        role="region"
        aria-live="polite"
        aria-label="Notifications"
        onMouseEnter={pause}
        onMouseLeave={resume}
        onFocusIn={pause}
        onFocusOut={resume}
      >
        {toasts.map((t) => (
          <div key={t.id} class="toast" hidden={t.leaving} role="status" {...swipe(() => dismiss(t.id))}>
            <div>
              <b>{t.title}</b>
              <span>{t.desc}</span>
            </div>
            <button
              type="button"
              class="btn is-icon"
              aria-label="Dismiss"
              onClick={() => dismiss(t.id)}
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
            </button>
          </div>
        ))}
      </div>
    </>
  );
}

export default function ToastPage() {
  return (
    <Doc
      title="Toast"
      lede="A transient confirmation in a fixed corner stack. The recipe is the look and the motion; the behavior is yours."
    >
      <p class="cn-copy">
        A <code class="cn-code-inline">.toast-stack</code> holds{" "}
        <code class="cn-code-inline">.toast</code> items; spawn a few to see
        the pile.
      </p>

      <Demo title="Spawner, auto-dismisses after 7s" classes="toast-stack toast">
        <ToastSpawner />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.toast-stack</code> is the viewport, fixed to
        the bottom-right corner. Append new toasts at the bottom.{" "}
        <code class="cn-code-inline">.toast</code> is one item: a content column with a{" "}
        <code class="cn-code-inline">b</code> title over a span or p description, then trailing
        controls: a <code class="cn-code-inline">.btn-text</code> action, a{" "}
        <code class="cn-code-inline">.btn.is-icon</code> close, or both. The border is{" "}
        <code class="cn-code-inline">--edge-strong</code>, the neutral surface-2 overlay hairline; the toast
        carries no accent color.
      </p>

      <p class="cn-copy">
        Give the stack <code class="cn-code-inline">role="region"</code>,{" "}
        <code class="cn-code-inline">aria-live="polite"</code> and an{" "}
        <code class="cn-code-inline">aria-label</code> such as "Notifications". The
        live region announces each arrival, and the label lets a screen
        reader jump to the stack by name. The demo's stack carries all three.
      </p>

      <p class="cn-copy">
        The stack collapses: the newest toast sits on top, up to two older
        ones peek behind it, scaled back, and the fourth and older hide until
        the stack thins. Hover or keyboard focus fans the stack out into the
        column.
      </p>

      <p class="cn-copy">
        Dismissing a toast from the middle needs no extra rule. Collapsed,
        depth counts visible toasts only, so the pile re-steps on its
        translate and scale. Fanned, the leaving toast collapses its height
        and margin as it fades, so the toasts above it ride down instead of
        jumping.
      </p>

      <p class="cn-copy">
        Toasts fade in and slide 16px from the right edge. The exit animates only if
        the toast stays mounted and <code class="cn-code-inline">hidden</code> is toggled;
        unmount it after the transition. Unmounting directly gets the entrance only.
        Auto-dismiss after a few seconds and keep a manual dismiss for anything a
        reader might want to keep.
      </p>

      <p class="cn-copy">
        A toast can also be swiped away. Drag it toward the end edge, right
        in a left-to-right page, and it follows the pointer and fades. Past
        80px, or on a quick flick, it dismisses; short of that it springs
        back. The recipe sets <code class="cn-code-inline">touch-action: pan-y</code>,
        so a vertical drag still scrolls the page and only a sideways one
        moves the toast. Buttons and links inside the toast never start a
        swipe. The close button stays, because a swipe is a shortcut, not
        the only way out.
      </p>

      <Demo title="At rest, one item outside its stack" row>
        <div class="toast" role="status">
          <div>
            <b>Event created</b>
            <span>Sunday, December 3 at 9:00 AM</span>
          </div>
          <button type="button" class="btn is-icon" aria-label="Dismiss">
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
          </button>
        </div>
        <div class="toast" role="status">
          <div>
            <b>Message archived</b>
            <span>Find it under Archive whenever you need it.</span>
          </div>
          <button type="button" class="btn-text">Undo</button>
        </div>
      </Demo>

      <p class="cn-copy">
        The CSS draws the toast and the pile; spawning, timers and dismissal
        need script. The optional <a href="/behavior">behavior module</a> has{" "}
        <code class="cn-code-inline">toast(stack, {"{ title, body, timeout }"})</code>,
        which appends a toast with a dismiss button, pauses its timeout while
        the pointer or focus is in the stack, dismisses on a swipe toward the
        end edge, exits through{" "}
        <code class="cn-code-inline">[hidden]</code> and then removes the node. In a
        framework, write the same logic in its terms. This page runs the
        Preact reference below: per-toast timers that manual dismissal
        cancels, hover or focus on the stack pausing every timer and resuming
        the remainder, a cap of five live toasts, the same swipe, and the
        hidden-then-unmount exit.
      </p>

      <CodeBlock
        title="Without a framework"
        code={`import { toast } from "catppuccin-neu/js";

const stack = document.querySelector(".toast-stack");
const { dismiss } = toast(stack, {
  title: "Invoice sent",
  body: "Northwind will get it in a minute.",
  timeout: 7000, // 0 keeps it until dismissed
});`}
      />

      <CodeBlock
        title="Reference behavior (Preact, condensed)"
        code={`const timers = useRef(new Map()); // id -> { handle, endsAt, remaining }

function schedule(id, ms) {
  const handle = setTimeout(() => dismiss(id), ms);
  timers.current.set(id, { handle, endsAt: Date.now() + ms, remaining: ms });
}

function spawn(item) {
  setToasts((t) => [...t, { ...item, leaving: false }]);
  schedule(item.id, 7000);
}

function dismiss(id) {
  if (leaving.current.has(id)) return;      // guard double dismissal
  leaving.current.add(id);
  clearTimeout(timers.current.get(id)?.handle);
  timers.current.delete(id);
  setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
  setTimeout(() => remove(id), 280);        // covers fade + row collapse
}

// on the stack: onMouseEnter/onFocusIn -> pause, onMouseLeave/onFocusOut -> resume
function pause() {
  for (const t of timers.current.values()) {
    clearTimeout(t.handle);
    t.remaining = Math.max(0, t.endsAt - Date.now());
  }
}
function resume() {
  for (const [id, t] of timers.current) schedule(id, Math.max(t.remaining, 600));
}`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".toast-stack",
            values: "the viewport",
            default: "·",
            notes:
              "Fixed 24px from the right and bottom, z-index 90, column flex aligned to the end, 8px gap, min(380px, 100vw - 48px) wide. Mark it role=\"region\" aria-live=\"polite\" with an aria-label; append at the bottom.",
          },
          {
            name: "stack states",
            values: "collapsed / fanned",
            default: "collapsed",
            notes:
              "Newest on top, two older peeking behind, older hidden. :hover or :focus-within on the stack fans the column out.",
          },
          {
            name: ".toast",
            values: "one stack item",
            default: "·",
            notes:
              "Flex row on --cn-surface-overlay with the --edge-strong border (surface-2, no accent); floats on --shadow-pop; the card radius (12px). The meta role.",
          },
          {
            name: "b + span/p",
            values: "title and description",
            default: "·",
            notes:
              "The content column. b is the block title in the name role; the span or p after it is the description in --cn-fg-body.",
          },
          {
            name: ".btn-text / .btn.is-icon",
            values: "trailing controls",
            default: "·",
            notes:
              "One action, an icon close with an aria-label, or both. They sit at the end of the row.",
          },
          {
            name: "[hidden]",
            values: "exit state",
            default: "·",
            notes:
              "Toggle on a mounted toast to play the exit (--t-exit, .14s), then unmount. Unmounting directly gets the entrance only.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="toast-stack" role="region" aria-live="polite" aria-label="Notifications">
  <div class="toast" role="status">
    <div>
      <b>Event created</b>
      <span>Sunday, December 3 at 9:00 AM</span>
    </div>
    <button class="btn is-icon" aria-label="Dismiss"><svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg></button>
  </div>

  <!-- dismissing: toggle hidden to play the exit, then remove -->
  <div class="toast" hidden role="status">…</div>
</div>`}
      />
    </Doc>
  );
}
