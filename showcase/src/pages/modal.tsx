import { useEffect, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

function ModalDemo() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" class="btn btn-primary" onClick={() => setOpen(true)}>
        Invite a teammate
      </button>
      {/* Stays mounted; toggling hidden plays the exit transition. */}
        <div class="cn-scrim" hidden={!open} onClick={close}>
          <div
            class="modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="invite-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <h2 id="invite-title" class="cn-title" style="margin:0;">
                Invite a teammate
              </h2>
              <button type="button" class="btn-icon" aria-label="Close" onClick={close}>
                ✕
              </button>
            </header>
            <div style="padding:22px; display:flex; flex-direction:column; gap:16px;">
              <p class="cn-copy" style="margin:0;">
                They get access to every dashboard in this workspace. You can adjust
                their role from Settings later.
              </p>
              <div class="field">
                <label for="invite-email">Email address</label>
                <input id="invite-email" type="email" placeholder="name@company.com" />
              </div>
              <div class="field">
                <label for="invite-role">Role</label>
                <select id="invite-role">
                  <option>Member</option>
                  <option>Admin</option>
                  <option>Viewer</option>
                </select>
              </div>
            </div>
            <footer class="panel-footer">
              <button type="button" class="btn btn-ghost" onClick={close}>
                Cancel
              </button>
              <button type="button" class="btn btn-primary" onClick={close}>
                Send invite
              </button>
            </footer>
          </div>
        </div>
    </>
  );
}

export default function ModalPage() {
  return (
    <Doc
      title="Modal"
      lede="A centered dialog inside the scrim. It closes on Escape or a scrim click."
    >
      <p class="cn-copy">
        The modal is a child of <code class="cn-code">.cn-scrim</code> and centers itself in
        the viewport. No positioning wrapper is needed. Radius tracks{" "}
        <code class="cn-code">--pane-radius</code>, so compact density tightens the corners.
      </p>

      <p class="cn-copy">
        The exit animates only if the scrim stays mounted and{" "}
        <code class="cn-code">hidden</code> is toggled; unmounting gets the
        entrance only.
      </p>

      <Demo title="Live demo" classes="cn-scrim > modal">
        <ModalDemo />
      </Demo>

      <Props
        title="Contract"
        rows={[
          {
            name: ".cn-scrim",
            values: "fixed inset overlay",
            default: "·",
            notes: "Crust wash at 74% with a 6px blur; z-index 70.",
          },
          {
            name: ".modal",
            values: "child of .cn-scrim",
            default: "·",
            notes: "width min(520px, 100vw − 32px); max-height 100dvh − 48px; z-index 80; --shadow-pop.",
          },
          {
            name: ".modal > header",
            values: "title + close control",
            default: "·",
            notes: "Recessed head band; top corners follow --pane-radius − 1px.",
          },
          {
            name: ".modal > footer:last-child",
            values: "action row",
            default: "·",
            notes: "Compose with .panel-footer. No fill; the divider line separates it.",
          },
          {
            name: "--pane-radius",
            values: "16px / 12px",
            default: "16px",
            notes: "12px arrives only via data-density=\"compact\".",
          },
          {
            name: "[hidden]",
            values: "exit state",
            default: "·",
            notes: "Toggle on the mounted scrim to play the exit; unmounting gets the entrance only.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<!-- keep it mounted; toggle hidden to animate the exit -->
<div class="cn-scrim" hidden>
  <div class="modal" role="dialog" aria-modal="true" aria-labelledby="t">
    <header>
      <h2 id="t" class="cn-title">Invite a teammate</h2>
      <button class="btn-icon" aria-label="Close">✕</button>
    </header>
    <div>…body…</div>
    <footer class="panel-footer">
      <button class="btn btn-ghost">Cancel</button>
      <button class="btn btn-primary">Send invite</button>
    </footer>
  </div>
</div>`}
      />
    </Doc>
  );
}
