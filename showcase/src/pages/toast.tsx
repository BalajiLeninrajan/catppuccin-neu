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

function ToastSpawner() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const msgRef = useRef(0);
  // Per-toast timer bookkeeping so hover can pause and dismissal can cancel.
  const timers = useRef(new Map<number, { handle: number; endsAt: number; remaining: number }>());
  const leavingRef = useRef(new Set<number>());

  const DURATION = 7000;
  const EXIT_MS = 280; // covers the exit
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

  // Cap the stack at five live toasts.
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
          <div key={t.id} class="toast" hidden={t.leaving} role="status">
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
      lede="A short confirmation in a fixed corner stack. Spawning, timers and dismissal need your script."
    >
      <Demo title="Spawner, auto-dismisses after 7s" classes="toast-stack toast">
        <ToastSpawner />
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.toast-stack</code> is the fixed viewport. Give it <code class="cn-code-inline">role="region"</code>, <code class="cn-code-inline">aria-live="polite"</code> and an <code class="cn-code-inline">aria-label</code>, and append new toasts at the bottom.
      </p>

      <p class="cn-copy">
        Set <code class="cn-code-inline">hidden</code> on a mounted toast to play its exit, then remove it. Pause the dismiss timer while the pointer or focus is in the stack.
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

      <Props
        title="Classes"
        rows={[
          { name: ".toast-stack", values: "the viewport", notes: "Fixed to the bottom corner at the end edge." },
          { name: ".toast", values: "one item", notes: "A b title over a span or p, then trailing controls." },
          { name: ".btn-text / .btn.is-icon", values: "trailing controls", notes: "One action, a close with an aria-label, or both." },
          { name: "[hidden]", values: "exit state", notes: "Plays the exit on a mounted toast." },
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
