import { useRef, useState } from "preact/hooks";
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

  function spawn() {
    const id = ++idRef.current;
    const { title, desc } = MESSAGES[msgRef.current++ % MESSAGES.length];
    setToasts((t) => [...t, { id, title, desc, leaving: false }]);
    setTimeout(() => dismiss(id), 3600);
  }

  // Two-phase: hidden plays the exit transition, then the element unmounts.
  function dismiss(id: number) {
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 300);
  }

  return (
    <>
      <button type="button" class="btn btn-primary" onClick={spawn}>
        Spawn a toast
      </button>
      {toasts.length > 0 && (
        <div class="toast-stack" aria-live="polite">
          {toasts.map((t) => (
            <div key={t.id} class="toast" hidden={t.leaving} role="status">
              <div>
                <b>{t.title}</b>
                <span>{t.desc}</span>
              </div>
              <button
                type="button"
                class="btn-icon"
                aria-label="Dismiss"
                onClick={() => dismiss(t.id)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}
    </>
  );
}

export default function ToastPage() {
  return (
    <Doc
      title="Toast"
      lede="A transient confirmation in a fixed corner stack. The stack is the recipe now; the consumer owns the timing."
    >
      <p class="cn-copy">
        Two classes. <code class="cn-code">.toast-stack</code> is the viewport, fixed to
        the bottom-right corner; mark it <code class="cn-code">aria-live="polite"</code>{" "}
        so arrivals are announced, and append new toasts at the bottom.{" "}
        <code class="cn-code">.toast</code> is one item: a content column with a{" "}
        <code class="cn-code">b</code> title over a span or p description, then trailing
        controls, a <code class="cn-code">.btn-text</code> action and/or a{" "}
        <code class="cn-code">.btn-icon</code> close. The border is the neutral
        surface-1 hairline; the toast carries no accent color.
      </p>

      <p class="cn-copy">
        The stack collapses: the newest toast sits on top, up to two older
        ones peek behind it, scaled back, and the fourth and older hide until
        the stack thins. Hover or keyboard focus fans the stack out into the
        column.
      </p>

      <p class="cn-copy">
        Toasts fade in, rising 6px. The exit animates only if
        the toast stays mounted and <code class="cn-code">hidden</code> is toggled;
        unmount it after the transition. Unmounting directly gets the entrance only.
        Auto-dismiss after a few seconds and keep a manual dismiss for anything a
        reader might want to keep.
      </p>

      <Demo title="Spawner, auto-dismisses after 3.6s" classes="toast-stack toast">
        <ToastSpawner />
      </Demo>

      <Demo title="At rest, one item outside its stack" row>
        <div class="toast" role="status">
          <div>
            <b>Event created</b>
            <span>Sunday, December 3 at 9:00 AM</span>
          </div>
          <button type="button" class="btn-icon" aria-label="Dismiss">
            ✕
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
        title="Contract"
        rows={[
          {
            name: ".toast-stack",
            values: "the viewport",
            default: "—",
            notes:
              "Fixed 20px from the right and bottom, z-index 90, column flex aligned to the end, 10px gap, min(380px, calc(100vw - 40px)) wide. Mark it aria-live=\"polite\"; append at the bottom.",
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
            default: "—",
            notes:
              "Flex row on base with the neutral surface-1 border (no accent); floats on --shadow-pop; 13px radius.",
          },
          {
            name: "b + span/p",
            values: "title and description",
            default: "—",
            notes:
              "The content column. b is the block title; the span or p after it is the muted description.",
          },
          {
            name: ".btn-text / .btn-icon",
            values: "trailing controls",
            default: "—",
            notes:
              "One action and/or an icon close with an aria-label. They sit at the end of the row.",
          },
          {
            name: "[hidden]",
            values: "exit state",
            default: "—",
            notes:
              "Toggle on a mounted toast to fade it back down (.2s), then unmount. Unmounting directly gets the entrance only.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="toast-stack" aria-live="polite">
  <div class="toast" role="status">
    <div>
      <b>Event created</b>
      <span>Sunday, December 3 at 9:00 AM</span>
    </div>
    <button class="btn-icon" aria-label="Dismiss">✕</button>
  </div>

  <!-- dismissing: toggle hidden to play the exit, then remove -->
  <div class="toast" hidden role="status">…</div>
</div>`}
      />
    </Doc>
  );
}
