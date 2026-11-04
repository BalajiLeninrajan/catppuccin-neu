import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { DangerGlyph } from "../lib/glyphs";

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
        <div class="popover" hidden={!open} role="dialog" aria-label="Notifications" style="top:60px; left:0; max-width:100%;">
          <header>
            <span class="cn-label">Notifications</span>
            <span class="tag cn-tone-mauve">3 new</span>
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
      <div class="popover" style="top:0; left:0; max-width:100%;">
        <header>
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
            <span class="tag cn-tone-green">Paid</span>
            <span class="tag cn-tone-info">Pending</span>
            <span class="tag cn-tone-red">
              <DangerGlyph />
              Overdue
            </span>
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
      lede="An anchored floating panel for filters and notifications. Popovers float on the pop shadow; overlays never use neumorphic depth."
    >
      <p class="cn-copy">
        Give the anchor <code class="cn-code-inline">position: relative</code> and drop the popover
        inside it. Filled first and last children inherit the corner radius. Never clip
        with <code class="cn-code-inline">overflow: hidden</code>; it clips the shadow too. The
        recipe lays out <code class="cn-code-inline">header</code> and{" "}
        <code class="cn-code-inline">footer</code> bands on the overlay fill. The header takes no darker
        fill, the same rule panel, modal and drawer headers follow, so it never sinks below the surface it
        titles.
      </p>

      <p class="cn-copy">
        A list of actions is a <a href="/menu">menu</a>: the same popover
        with <code class="cn-code-inline">.menu</code> and{" "}
        <code class="cn-code-inline">role="menu"</code>. The exit animates
        only if the element stays mounted and{" "}
        <code class="cn-code-inline">hidden</code> is toggled; unmounting gets the
        entrance only.
      </p>

      <Demo title="Anchored, click to open" classes="popover">
        <AnchoredDemo />
      </Demo>

      <Demo title="Anatomy, pinned open" classes="popover">
        <AnatomyDemo />
      </Demo>

      <Demo title="Tooltip" classes="[data-tip] + aria-describedby · btn.is-icon[data-tip] + aria-label" row>
        <button
          type="button"
          class="btn btn-secondary"
          data-tip="Duplicates the dashboard with its filters"
          aria-describedby="tip-duplicate"
        >
          Duplicate
        </button>
        <span id="tip-duplicate" hidden>
          Duplicates the dashboard with its filters
        </span>
        <button type="button" class="btn is-icon" aria-label="Archive this view" data-tip="Archive this view">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="5" rx="1" />
            <path d="M5 9v10h14V9M10 13h4" />
          </svg>
        </button>
      </Demo>

      <p class="cn-copy">
        Put the text in <code class="cn-code-inline">data-tip</code>, not{" "}
        <code class="cn-code-inline">title</code>. The bubble shows on hover and
        keyboard focus and caps at 240px.
      </p>

      <p class="cn-copy">
        The bubble is generated content with empty alt text,{" "}
        <code class="cn-code-inline">content: attr(data-tip) / ""</code>, so a
        screen reader never folds it into the element's accessible name.
        Carry the same words yourself. On a labeled control, point{" "}
        <code class="cn-code-inline">aria-describedby</code> at an element that
        holds them; a <code class="cn-code-inline">hidden</code> element still
        works as a description. On an icon button, put them in{" "}
        <code class="cn-code-inline">aria-label</code>, because the tip is the
        only words the button has.
      </p>

      <p class="cn-copy">
        Escape hides a showing tooltip. The listener below sets{" "}
        <code class="cn-code-inline">data-tip-dismissed</code> on Escape and clears it
        when the pointer or focus leaves. This site runs it, so hover a
        tooltip above and press Escape. A touch screen has no hover, so a
        tooltip is never the only place a fact lives.{" "}
        <code class="cn-code-inline">tooltips()</code> in the optional{" "}
        <a href="/behavior">behavior module</a> installs the same listener.
      </p>

      <CodeBlock
        title="Escape listener"
        code={`const undismiss = (e) => {
  const el = e.target.closest?.("[data-tip-dismissed]");
  if (el && !el.contains(e.relatedTarget)) el.removeAttribute("data-tip-dismissed");
};
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll("[data-tip]:is(:hover, :focus-visible, :has(:focus-visible))")
    .forEach((el) => el.setAttribute("data-tip-dismissed", ""));
});
document.addEventListener("pointerleave", undismiss, true);
document.addEventListener("focusout", undismiss, true);`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".popover",
            values: "child of a position: relative anchor",
            default: "·",
            notes: "width min(390px, 100vw - 32px); z-index 80; --cn-surface-overlay fill, the --edge-strong (surface-2) border, floats on --shadow-pop. Add .menu for an action list.",
          },
          {
            name: ".popover > :first-child",
            values: "any filled child",
            default: "·",
            notes: "Top corners follow the card radius minus the 1px border (11px).",
          },
          {
            name: ".popover > :last-child",
            values: "any filled child",
            default: "·",
            notes: "Bottom corners mirror the same treatment.",
          },
          {
            name: "[data-tip]",
            values: "any focusable element",
            default: "·",
            notes: "A popover-styled bubble on the overlay fill above the element on hover and focus, after --t-slow + --t-press (.4s). Max width 240px. Its text has empty alt, so carry the words in aria-describedby or aria-label. Use it instead of title=.",
          },
          {
            name: "[data-tip-dismissed]",
            values: "set by the Escape listener",
            default: "·",
            notes: "Hides the bubble at once. The listener clears it when the pointer or focus leaves.",
          },
          {
            name: ".popover > header / > footer",
            values: "band elements",
            default: "·",
            notes: "Recipe-owned flex bands on the overlay fill, 12px 16px padding. Footer has a top divider, actions right-aligned.",
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
    <header>…</header>
    <div>…rows…</div>
    <footer>…divider-top, no fill…</footer>
  </div>
</div>`}
      />
    </Doc>
  );
}
