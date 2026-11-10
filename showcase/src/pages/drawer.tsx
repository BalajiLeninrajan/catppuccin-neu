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
            <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" /></svg>
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
        Put <code class="cn-code-inline">.drawer</code> on a{" "}
        <code class="cn-code-inline">&lt;dialog&gt;</code> and open it with{" "}
        <code class="cn-code-inline">showModal()</code>.
      </p>

      <Demo lead title="Live demo" why="Markup, layout and motion" classes="dialog.drawer">
        <DrawerDemo />
      </Demo>

      <p class="cn-copy">
        The sheet is the full
        viewport height with square corners and one hairline on the left. Its{" "}
        <code class="cn-code-inline">header</code> is the shared band: it sits on
        the sheet's overlay fill behind an <code class="cn-code-inline">--edge-soft</code>{" "}
        divider. The footer is <code class="cn-code-inline">.panel-footer</code>,
        also on the sheet's fill with a divider above it. The sheet is a flex column that scrolls as a
        whole; push the footer down with{" "}
        <code class="cn-code-inline">margin-top: auto</code>.
      </p>

      <p class="cn-copy">
        The drawer slides in from past the right edge over{" "}
        <code class="cn-code-inline">--t-slow</code> (.32s) and leaves on the ease-in
        in .14s. The backdrop fades with it. Under reduced motion the drawer
        fades in place over <code class="cn-code-inline">--t-fast</code>{" "}
        instead of sliding.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: "dialog.drawer",
            values: "showModal() / close()",
            default: "·",
            notes: "width min(420px, 100vw - 40px); full height; right-pinned flex column; --cn-surface-overlay fill on --shadow-pop. A resting field inside takes --cn-field-ring-overlay, 2.1:1 on the overlay fill.",
          },
          {
            name: ".drawer > header",
            values: "title and close control",
            default: "·",
            notes: "The shared band: --band-h tall, --band-pad, on the sheet's overlay fill with an --edge-soft bottom divider.",
          },
          {
            name: "footer band",
            values: ".panel-footer",
            default: "·",
            notes: "No fill; the divider separates it. margin-top: auto pins it down.",
          },
          {
            name: "border-inline-start",
            values: "1px solid var(--edge-strong)",
            default: "·",
            notes: "The one hairline, surface-2. It follows the writing direction; the drawer itself stays pinned right. The pop shadow does the rest.",
          },
          {
            name: "::backdrop",
            values: "the scrim",
            default: "·",
            notes: "Crust at 80% with a 2px blur. Under reduced transparency the blur goes and the crust deepens to 88%.",
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
