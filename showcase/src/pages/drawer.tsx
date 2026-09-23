import { useRef, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* A native dialog: showModal() opens it, Escape and a backdrop click close it. */
function DrawerDemo() {
  const ref = useRef<HTMLDialogElement>(null);
  const [digest, setDigest] = useState(true);
  const close = () => ref.current?.close();

  return (
    <>
      <button type="button" class="btn btn-secondary" onClick={() => ref.current?.showModal()}>
        Workspace settings
      </button>
      <dialog
        ref={ref}
        class="drawer"
        aria-labelledby="drawer-title"
        onClick={(e) => e.target === ref.current && close()}
      >
        <header>
          <h2 id="drawer-title" class="cn-title" style="margin:0">
            Workspace settings
          </h2>
          <button type="button" class="btn is-icon" aria-label="Close" onClick={close}>
            <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true"><path d="M3.5 3.5l9 9M12.5 3.5l-9 9" /></svg>
          </button>
        </header>
        <div class="panel-body cn-stack cn-gap-16">
          <div class="field">
            <label for="ws-name">Workspace name</label>
            <input id="ws-name" type="text" value="Northwind Ops" />
          </div>
          <div class="field">
            <label for="ws-tz">Timezone</label>
            <select id="ws-tz">
              <option>UTC</option>
              <option>America/Toronto</option>
              <option>Europe/Berlin</option>
            </select>
          </div>
          <div class="cn-stack cn-gap-8">
            <span class="cn-label">Invoice reminders</span>
            <div class="segmented is-stacked" role="group" aria-label="Invoice reminders">
              <button type="button" aria-pressed={digest} onClick={() => setDigest(true)}>
                <span>
                  <b>Weekly digest</b>
                  <br />
                  <small>One summary every Monday</small>
                </span>
              </button>
              <button type="button" aria-pressed={!digest} onClick={() => setDigest(false)}>
                <span>
                  <b>Every event</b>
                  <br />
                  <small>A message per invoice</small>
                </span>
              </button>
            </div>
          </div>
          <div class="banner cn-tone-blue">
            Changes apply to all 14 members of this workspace.
          </div>
        </div>
        <footer class="panel-footer" style="margin-top:auto; justify-content:flex-end">
          <button type="button" class="btn btn-ghost" onClick={close}>
            Discard
          </button>
          <button type="button" class="btn btn-primary" onClick={close}>
            Save changes
          </button>
        </footer>
      </dialog>
    </>
  );
}

export default function DrawerPage() {
  return (
    <Doc
      title="Drawer"
      lede="A side sheet pinned to the right edge, for settings, detail views and forms that outgrow a modal. It is a native <dialog>, so the platform handles focus, Escape and the scrim."
    >
      <p class="cn-copy">
        Put <code class="cn-code">.drawer</code> on a{" "}
        <code class="cn-code">&lt;dialog&gt;</code> and open it with{" "}
        <code class="cn-code">showModal()</code>. The sheet is the full
        viewport height with square corners and one hairline on the left. Its{" "}
        <code class="cn-code">header</code> is the shared band, filled and
        square. The footer is <code class="cn-code">.panel-footer</code>: no
        fill, divider only. The sheet is a flex column that scrolls as a
        whole; push the footer down with{" "}
        <code class="cn-code">margin-top: auto</code>.
      </p>

      <Demo title="Live demo" classes="dialog.drawer">
        <DrawerDemo />
      </Demo>

      <p class="cn-copy">
        The drawer slides in from past the right edge over{" "}
        <code class="cn-code">--t-slow</code> (.32s) and leaves on the ease-in
        in .14s. The backdrop fades with it.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: "dialog.drawer",
            values: "showModal() / close()",
            default: "·",
            notes: "width min(420px, 100vw - 40px); full height; right-pinned flex column; --shadow-pop.",
          },
          {
            name: ".drawer > header",
            values: "title and close control",
            default: "·",
            notes: "The shared band: --band-h tall, --band-pad, recessed fill, square corners.",
          },
          {
            name: "footer band",
            values: ".panel-footer",
            default: "·",
            notes: "No fill; the divider separates it. margin-top: auto pins it down.",
          },
          {
            name: "border-left",
            values: "1px solid var(--surface-1)",
            default: "·",
            notes: "The one hairline. The pop shadow does the rest.",
          },
          {
            name: "::backdrop",
            values: "the scrim",
            default: "·",
            notes: "Crust at 80% with a 2px blur.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<dialog class="drawer" aria-labelledby="t">
  <header>
    <h2 id="t" class="cn-title">Workspace settings</h2>
    <button class="btn is-icon" aria-label="Close">…svg…</button>
  </header>
  <div class="panel-body">…form…</div>
  <footer class="panel-footer" style="margin-top: auto">
    <button class="btn btn-ghost">Discard</button>
    <button class="btn btn-primary">Save changes</button>
  </footer>
</dialog>`}
      />
    </Doc>
  );
}
