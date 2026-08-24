import { useRef, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const MESSAGES = [
  "Invoice #1042 sent to Accounts",
  "Settings saved for Northwind Ops",
  "Message archived",
  "3 teammates added to Design",
];

interface ToastItem {
  id: number;
  message: string;
  leaving: boolean;
}

function ToastSpawner() {
  const [toasts, setToasts] = useState<ToastItem[]>([]);
  const idRef = useRef(0);
  const msgRef = useRef(0);

  function spawn() {
    const id = ++idRef.current;
    const message = MESSAGES[msgRef.current++ % MESSAGES.length];
    setToasts((t) => [...t, { id, message, leaving: false }]);
    setTimeout(() => dismiss(id), 3600);
  }

  // Two-phase: hidden plays the exit transition, then the element unmounts.
  function dismiss(id: number) {
    setToasts((t) => t.map((x) => (x.id === id ? { ...x, leaving: true } : x)));
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 260);
  }

  return (
    <>
      <button type="button" class="btn btn-primary" onClick={spawn}>
        Spawn a toast
      </button>
      {toasts.length > 0 && (
        <div
          aria-live="polite"
          style="position:fixed; right:20px; bottom:20px; z-index:90; display:flex; flex-direction:column; align-items:flex-end; gap:10px;"
        >
          {toasts.map((t) => (
            <div key={t.id} class="toast" hidden={t.leaving} role="status">
              <span class="live-dot" aria-hidden="true"></span>
              {t.message}
              <button type="button" class="btn-text" onClick={() => dismiss(t.id)}>
                Dismiss
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
      lede="A transient confirmation in a fixed corner stack. The consumer owns the stack and the timing."
    >
      <p class="cn-copy">
        The recipe styles one item. The stack is yours, a fixed corner container with a
        column gap, marked <code class="cn-code">aria-live="polite"</code> so arrivals are
        announced. Auto-dismiss after a few seconds and offer a manual dismiss for anything
        a reader might want to keep. Keep the copy to one line.
      </p>

      <Demo title="Spawner, auto-dismisses after 3.6s" classes="toast">
        <ToastSpawner />
      </Demo>

      <Demo title="At rest, statically positioned until you stack it" row>
        <div class="toast" role="status">
          <span class="live-dot" aria-hidden="true"></span>
          Invoice #1042 sent to Accounts
        </div>
        <div class="toast" role="status">
          Settings saved
          <button type="button" class="btn-text">Undo</button>
        </div>
      </Demo>

      <Props
        title="Contract"
        rows={[
          {
            name: ".toast",
            values: "one stack item",
            default: "—",
            notes: "Mauve-keyed hairline on base; floats on --shadow-pop; no positioning of its own.",
          },
          {
            name: "stack container",
            values: "consumer-owned",
            default: "—",
            notes: "position: fixed in a corner, column flex with a 10px gap, aria-live=\"polite\".",
          },
          {
            name: ".live-dot",
            values: "optional leading pulse",
            default: "green",
            notes: "Paints with currentColor; recolor via the color property.",
          },
          {
            name: ".btn-text",
            values: "optional trailing action",
            default: "—",
            notes: "Undo / Dismiss; keep it to one action per toast.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="toast-stack" aria-live="polite">
  <!-- .toast-stack is consumer CSS:
       position: fixed; right: 20px; bottom: 20px;
       display: flex; flex-direction: column; gap: 10px; -->
  <div class="toast" role="status">
    <span class="live-dot" aria-hidden="true"></span>
    Invoice #1042 sent to Accounts
    <button class="btn-text">Dismiss</button>
  </div>
</div>`}
      />
    </Doc>
  );
}
