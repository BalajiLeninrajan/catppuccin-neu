import { useEffect, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc.jsx";

function DrawerDemo() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <button type="button" class="btn btn-secondary" onClick={() => setOpen(true)}>
        Workspace settings
      </button>
      {open && (
        <div class="cn-scrim" onClick={close}>
          <aside
            class="drawer"
            role="dialog"
            aria-modal="true"
            aria-labelledby="drawer-title"
            onClick={(e) => e.stopPropagation()}
          >
            <header class="cn-bg-head" style="display:flex; align-items:center; justify-content:space-between; gap:16px; min-height:62px; padding:14px 22px;">
              <h2 id="drawer-title" class="cn-title" style="margin:0;">
                Workspace settings
              </h2>
              <button type="button" class="btn-icon" aria-label="Close" onClick={close}>
                ✕
              </button>
            </header>
            <div style="padding:22px; display:flex; flex-direction:column; gap:18px;">
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
              <div>
                <span class="cn-label" style="display:block; margin-bottom:8px;">
                  Invoice reminders
                </span>
                <div class="segmented is-stacked" role="radiogroup" aria-label="Invoice reminders">
                  <button type="button" class="active">
                    <span>
                      <b>Weekly digest</b>
                      <br />
                      <small>One summary every Monday</small>
                    </span>
                  </button>
                  <button type="button">
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
            <footer class="cn-bg-head" style="margin-top:auto; display:flex; justify-content:flex-end; gap:10px; padding:14px 22px;">
              <button type="button" class="btn btn-ghost" onClick={close}>
                Discard
              </button>
              <button type="button" class="btn btn-primary" onClick={close}>
                Save changes
              </button>
            </footer>
          </aside>
        </div>
      )}
    </>
  );
}

export default function DrawerPage() {
  return (
    <Doc
      title="Drawer"
      lede="A side sheet pinned to the right edge — for settings, detail views, and longer forms that outgrow a modal. It floats on the pop shadow above the scrim."
    >
      <p class="cn-copy">
        The drawer spans the full viewport height with square corners, so header and footer
        bands need no radius treatment — compose them from{" "}
        <code class="cn-code">.cn-bg-head</code>. The sheet is a flex column that scrolls
        as a whole; push the footer down with <code class="cn-code">margin-top: auto</code>.
        Pair it with <code class="cn-code">.cn-scrim</code> and close on Escape or a scrim
        click, exactly like the modal.
      </p>

      <Demo title="Live — Escape or the scrim closes it" classes="cn-scrim > drawer">
        <DrawerDemo />
      </Demo>

      <Props
        title="Contract"
        rows={[
          {
            name: ".drawer",
            values: "child of .cn-scrim",
            default: "—",
            notes: "width min(420px, 100vw − 40px); right-pinned flex column; z-index 80; --shadow-pop.",
          },
          {
            name: ".cn-scrim",
            values: "fixed inset overlay",
            default: "—",
            notes: "Crust wash + blur behind the sheet; z-index 70.",
          },
          {
            name: "header / footer bands",
            values: ".cn-bg-head",
            default: "—",
            notes: "Square corners — no radius rules needed, unlike panel and modal bands.",
          },
          {
            name: "border-left",
            values: "1px solid var(--surface-1)",
            default: "—",
            notes: "The one hairline; the pop shadow does the rest of the separation.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="cn-scrim">
  <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="t">
    <header class="cn-bg-head">
      <h2 id="t" class="cn-title">Workspace settings</h2>
      <button class="btn-icon" aria-label="Close">✕</button>
    </header>
    <div>…form…</div>
    <footer class="cn-bg-head" style="margin-top: auto">
      <button class="btn btn-ghost">Discard</button>
      <button class="btn btn-primary">Save changes</button>
    </footer>
  </aside>
</div>`}
      />
    </Doc>
  );
}
