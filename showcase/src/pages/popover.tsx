import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

/* Live anchored popover, toggled from its trigger. */
function AnchoredDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div style="position:relative; min-height:300px; width:min(390px, 100%);">
      <button
        type="button"
        class="btn btn-secondary"
        aria-expanded={open}
        aria-haspopup="dialog"
        onClick={() => setOpen(!open)}
      >
        Notifications
      </button>
      {/* Stays mounted; toggling hidden plays the exit transition. */}
        <div class="popover" hidden={!open} role="dialog" aria-label="Notifications" style="top:60px; left:0;">
          <header class="cn-bg-head" style="display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px;">
            <span class="cn-label">Notifications</span>
            <span class="chip-tone cn-tone-mauve">3 new</span>
          </header>
          <div style="display:flex; flex-direction:column;">
            <div class="cn-copy" style="padding:12px 16px; display:flex; flex-direction:column; gap:3px;">
              <span class="cn-name">Priya assigned you an invoice</span>
              <span class="cn-meta">Billing · 2m ago</span>
            </div>
            <div class="cn-copy" style="padding:12px 16px; display:flex; flex-direction:column; gap:3px;">
              <span class="cn-name">Dashboard export finished</span>
              <span class="cn-meta">Reports · 18m ago</span>
            </div>
            <div class="cn-copy" style="padding:12px 16px; display:flex; flex-direction:column; gap:3px;">
              <span class="cn-name">Sam joined the Design team</span>
              <span class="cn-meta">Teams · 1h ago</span>
            </div>
          </div>
          <footer style="display:flex; justify-content:flex-end; padding:10px 16px; border-top:1px solid color-mix(in srgb, var(--surface-1) 40%, transparent);">
            <button type="button" class="btn-text" onClick={() => setOpen(false)}>
              Mark all as read
            </button>
          </footer>
        </div>
    </div>
  );
}

/* Static open specimen, pinned open for inspection. */
function AnatomyDemo() {
  return (
    <div style="position:relative; min-height:230px; width:min(390px, 100%);">
      <div class="popover" style="top:0; left:0;">
        <header class="cn-bg-head" style="display:flex; align-items:center; justify-content:space-between; gap:12px; padding:12px 16px;">
          <span class="cn-label">Filter results</span>
          <span class="chip">12 columns</span>
        </header>
        <div style="padding:16px; display:flex; flex-direction:column; gap:12px;">
          <div class="field">
            <label for="pop-status">Status</label>
            <select id="pop-status">
              <option>Any status</option>
              <option>Paid</option>
              <option>Overdue</option>
            </select>
          </div>
          <div class="sc-row">
            <span class="chip-tone cn-tone-green">Paid</span>
            <span class="chip-tone cn-tone-peach">Pending</span>
            <span class="chip-tone cn-tone-red">Overdue</span>
          </div>
        </div>
        <footer style="display:flex; justify-content:space-between; gap:10px; padding:10px 16px; border-top:1px solid color-mix(in srgb, var(--surface-1) 40%, transparent);">
          <button type="button" class="btn-text">Reset</button>
          <button type="button" class="btn-text">Apply</button>
        </footer>
      </div>
    </div>
  );
}

export default function PopoverPage() {
  return (
    <Doc
      title="Popover"
      lede="An anchored floating panel for menus and filters. Popovers float on the pop shadow; overlays never use neumorphic depth."
    >
      <p class="cn-copy">
        Give the anchor <code class="cn-code">position: relative</code> and drop the popover
        inside it. Filled first and last children inherit the corner radius. Never clip
        with <code class="cn-code">overflow: hidden</code>; it clips the shadow too.
      </p>

      <Demo title="Anchored, click to open" classes="popover">
        <AnchoredDemo />
      </Demo>

      <Demo title="Anatomy, pinned open" classes="popover">
        <AnatomyDemo />
      </Demo>

      <Props
        title="Contract"
        rows={[
          {
            name: ".popover",
            values: "child of a position: relative anchor",
            default: "—",
            notes: "width min(390px, 100vw − 32px); z-index 80; floats on --shadow-pop.",
          },
          {
            name: ".popover > :first-child",
            values: "any filled band",
            default: "—",
            notes: "Top corners follow the 13px parent radius (12px inner).",
          },
          {
            name: ".popover > :last-child",
            values: "any filled band",
            default: "—",
            notes: "Bottom corners mirror the same treatment.",
          },
          {
            name: ".cn-bg-head",
            values: "header band fill",
            default: "—",
            notes: "Recessed band mix, same fill as panel headings.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div style="position: relative">
  <button class="btn btn-secondary" aria-expanded="true">Notifications</button>
  <div class="popover" role="dialog" aria-label="Notifications">
    <header class="cn-bg-head">…</header>
    <div>…rows…</div>
    <footer>…divider-top, no fill…</footer>
  </div>
</div>`}
      />
    </Doc>
  );
}
