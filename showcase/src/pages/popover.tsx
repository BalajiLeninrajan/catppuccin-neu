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
          <header class="cn-bg-head">
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
          <footer>
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
        <header class="cn-bg-head">
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
        <footer>
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
      title="Popover & tooltip"
      lede="An anchored floating panel for menus and filters. Popovers float on the pop shadow; overlays never use neumorphic depth."
    >
      <p class="cn-copy">
        Give the anchor <code class="cn-code">position: relative</code> and drop the popover
        inside it. Filled first and last children inherit the corner radius. Never clip
        with <code class="cn-code">overflow: hidden</code>; it clips the shadow too. The
        recipe lays out <code class="cn-code">header</code> and{" "}
        <code class="cn-code">footer</code> bands; compose{" "}
        <code class="cn-code">.cn-bg-head</code> on the header for the fill.
      </p>

      <p class="cn-copy">
        The exit animates only if the element stays mounted and{" "}
        <code class="cn-code">hidden</code> is toggled; unmounting gets the
        entrance only.
      </p>

      <Demo title="Anchored, click to open" classes="popover">
        <AnchoredDemo />
      </Demo>

      <Demo title="Anatomy, pinned open" classes="popover">
        <AnatomyDemo />
      </Demo>

      <Demo title="Tooltip" classes="[data-tip]" row>
        <button type="button" class="btn btn-secondary" data-tip="Duplicates the dashboard with its filters">
          Duplicate
        </button>
        <button type="button" class="btn-icon" aria-label="Archive" data-tip="Archive this view">
          ⌫
        </button>
      </Demo>

      <p class="cn-copy">
        Put the text in <code class="cn-code">data-tip</code>, not{" "}
        <code class="cn-code">title</code>. The bubble shows on hover and
        keyboard focus and caps at 240px. Icon-only controls still need{" "}
        <code class="cn-code">aria-label</code>; the tooltip is visual, not the
        accessible name.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".popover",
            values: "child of a position: relative anchor",
            default: "·",
            notes: "width min(390px, 100vw − 32px); z-index 80; floats on --shadow-pop.",
          },
          {
            name: ".popover > :first-child",
            values: "any filled band",
            default: "·",
            notes: "Top corners follow the 13px parent radius (12px inner).",
          },
          {
            name: ".popover > :last-child",
            values: "any filled band",
            default: "·",
            notes: "Bottom corners mirror the same treatment.",
          },
          {
            name: "[data-tip]",
            values: "any focusable element",
            default: "·",
            notes: "Popover-styled bubble above the element on hover/focus; max-width 240px. Use instead of title=.",
          },
          {
            name: ".cn-bg-head",
            values: "header band fill",
            default: "·",
            notes: "Recessed band mix, same fill as panel headings.",
          },
          {
            name: ".popover > header / > footer",
            values: "band elements",
            default: "·",
            notes: "Recipe-owned flex bands. Footer is divider only, actions right-aligned.",
          },
          {
            name: "[hidden]",
            values: "exit state",
            default: "·",
            notes: "Toggle on a mounted popover to play the exit; unmounting gets the entrance only.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div style="position: relative">
  <button class="btn btn-secondary" aria-expanded="false">Notifications</button>
  <!-- keep it mounted; toggle hidden to animate the exit -->
  <div class="popover" hidden role="dialog" aria-label="Notifications">
    <header class="cn-bg-head">…</header>
    <div>…rows…</div>
    <footer>…divider-top, no fill…</footer>
  </div>
</div>`}
      />
    </Doc>
  );
}
