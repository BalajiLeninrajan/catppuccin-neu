import { useEffect, useRef } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { tabs, menu, slider, toast } from "../../../js/index.js";

const importSnippet = `import { init } from "catppuccin-neu/js";

const cleanup = init();  // every tablist, menu button and slider, plus tooltips
// later, on unmount or a route change
cleanup();`;

const oneAtATimeSnippet = `import { tabs, menu, slider, tooltips, toast } from "catppuccin-neu/js";

const offTabs = tabs(document.querySelector('[role="tablist"]'));
const offMenu = menu(document.querySelector("#actions"));
const offSlider = slider(document.querySelector("#terms"));
const offTips = tooltips();

const stack = document.querySelector(".toast-stack");
toast(stack, { title: "Invoice sent", body: "Northwind will get it in a minute." });`;

const markupSnippet = `<!-- tabs(): each tab names its panel; only the selected panel shows -->
<div class="tabs" role="tablist" aria-label="Invoice views">
  <button role="tab" aria-selected="true" aria-controls="p-open">Open</button>
  <button role="tab" aria-selected="false" aria-controls="p-paid">Paid</button>
</div>
<div role="tabpanel" id="p-open">…</div>
<div role="tabpanel" id="p-paid" hidden>…</div>

<!-- menu(): the trigger names a hidden .menu -->
<div style="position: relative">
  <button class="btn btn-ghost" id="actions" aria-haspopup="menu"
          aria-controls="actions-menu">Invoice actions</button>
  <div class="popover menu" id="actions-menu" role="menu"
       aria-labelledby="actions" hidden>
    <button role="menuitem" tabindex="-1">Rename</button>
    <button role="menuitemcheckbox" tabindex="-1" aria-checked="false">Show archived</button>
  </div>
</div>

<!-- slider() -->
<input type="range" class="slider" min="0" max="60" step="5" value="30">

<!-- toast(): the stack is a live region -->
<div class="toast-stack" role="region" aria-live="polite" aria-label="Notifications"></div>`;

/* The real module, wired from refs. The markup below is static, so Preact
   never re-renders it and the module owns its ARIA state. */
function LiveDemo() {
  const list = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const range = useRef<HTMLInputElement>(null);
  const stack = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const off = [tabs(list.current!), menu(trigger.current!), slider(range.current!)];
    return () => off.forEach((f) => f());
  }, []);

  return (
    <div class="cn-stack cn-gap-24" style="width:min(520px,100%)">
      <div class="cn-stack cn-gap-12">
        <div ref={list} class="tabs cn-fit" role="tablist" aria-label="Invoice views">
          <button type="button" role="tab" id="bh-tab-open" aria-selected="true" aria-controls="bh-panel-open">
            Open
          </button>
          <button type="button" role="tab" id="bh-tab-paid" aria-selected="false" aria-controls="bh-panel-paid">
            Paid
          </button>
          <button type="button" role="tab" id="bh-tab-void" aria-selected="false" disabled>
            Void
          </button>
        </div>
        <div role="tabpanel" id="bh-panel-open" aria-labelledby="bh-tab-open" tabIndex={0} class="cn-copy">
          12 open invoices, $18,420 outstanding.
        </div>
        <div role="tabpanel" id="bh-panel-paid" aria-labelledby="bh-tab-paid" tabIndex={0} class="cn-copy" hidden>
          31 invoices paid this month.
        </div>
      </div>

      <div class="cn-row cn-gap-16 cn-wrap cn-top">
        <div style="position:relative;min-height:220px;width:min(240px,100%)">
          <button
            ref={trigger}
            type="button"
            class="btn btn-ghost"
            id="bh-trigger"
            aria-haspopup="menu"
            aria-controls="bh-menu"
          >
            Invoice actions
          </button>
          <div id="bh-menu" class="popover menu" role="menu" aria-labelledby="bh-trigger" hidden style="top:54px;left:0">
            <button type="button" role="menuitem" tabIndex={-1}>Rename</button>
            <button type="button" role="menuitem" tabIndex={-1}>Duplicate</button>
            <button type="button" role="menuitem" tabIndex={-1} disabled>Export as PDF</button>
            <hr role="separator" />
            <button type="button" role="menuitemcheckbox" tabIndex={-1} aria-checked="false">
              Show archived
            </button>
          </div>
        </div>

        <div class="cn-stack cn-gap-8 cn-grow">
          <label class="cn-label" for="bh-range">Reminder after</label>
          <input
            ref={range}
            id="bh-range"
            type="range"
            class="slider"
            min="0"
            max="60"
            step="5"
            value="30"
            aria-describedby="bh-range-help"
          />
          <span id="bh-range-help" class="cn-meta">Days past the due date.</span>
          <div>
            <button
              type="button"
              class="btn btn-secondary is-sm"
              onClick={() => toast(stack.current!, { title: "Reminder scheduled", body: "Northwind gets a reminder if the invoice stays open." })}
            >
              Show a toast
            </button>
          </div>
        </div>
      </div>

      <div ref={stack} class="toast-stack" role="region" aria-live="polite" aria-label="Behavior demo notifications" />
    </div>
  );
}

export default function BehaviorPage() {
  return (
    <Doc
      title="Behavior"
      lede="An optional module, catppuccin-neu/js, that keeps ARIA state and the keyboard model in step for tabs, menus, sliders, tooltips and toasts. The CSS never needs it to look right."
    >
      <p class="cn-copy">
        The recipes style ARIA state: a tab with{" "}
        <code class="cn-code-inline">aria-selected="true"</code> rises, a trigger
        with <code class="cn-code-inline">aria-expanded="true"</code> wears the
        engaged state. CSS cannot set that state or answer the arrow keys.
        The module does, following the WAI-ARIA patterns, with no framework
        and no dependencies. Every function returns a cleanup that removes
        what it added. An app with its own widget library skips it; the
        showcase's other demos are Preact and do their own wiring.
      </p>

      <CodeBlock title="Wire everything" code={importSnippet} />

      <p class="cn-copy">
        <code class="cn-code-inline">init(root)</code> finds every{" "}
        <code class="cn-code-inline">[role="tablist"]</code>, every trigger with{" "}
        <code class="cn-code-inline">aria-haspopup="menu"</code> and{" "}
        <code class="cn-code-inline">aria-controls</code>, and every{" "}
        <code class="cn-code-inline">input[type="range"].slider</code> under{" "}
        <code class="cn-code-inline">root</code>, which defaults to the document,
        and installs <code class="cn-code-inline">tooltips()</code>. It wires what
        is in the page when it runs. Call it again, or wire the new widget
        directly, for markup that renders later.
      </p>

      <Demo title="The module, live" classes='import { tabs, menu, slider, toast } from "catppuccin-neu/js"'>
        <LiveDemo />
      </Demo>

      <p class="cn-copy">
        Focus the selected tab and use the arrow keys; the disabled tab is
        skipped. Open the menu with a click, Enter, Space or ArrowDown, and
        close it with Escape to see focus return to the trigger. Show
        archived toggles and keeps the menu open. Show a toast, then drag it
        to the right: past 80px, or on a quick flick, it dismisses.
      </p>

      <Props
        title="Functions"
        rows={[
          {
            name: "tabs(tablist)",
            values: '[role="tablist"]',
            notes: "Left, Right, Home and End move focus and select, so selection follows focus. Mirrored in right-to-left text. Only the selected tab is in the tab order, and each tab's aria-controls panel shows only while it is selected. Fires cn-select on the tablist with the tab in event.detail. On a .tabs carve it measures the selected tab into --cn-tab-x and --cn-tab-w and sets data-cn-indicator, so the raised pill slides.",
          },
          {
            name: "menu(trigger)",
            values: 'aria-haspopup="menu" + aria-controls',
            notes: "For a trigger naming a hidden .menu[role=\"menu\"]. Click, Enter, Space or ArrowDown opens on the first item, ArrowUp on the last. Arrows, Home and End move. Escape closes and returns focus. Tab or a press outside closes without moving focus. A menuitemcheckbox toggles aria-checked and stays open. Sets aria-expanded on the trigger.",
          },
          {
            name: "slider(input)",
            values: 'input[type="range"].slider',
            notes: "Keeps --value, where the fill stops, in step with the range.",
          },
          {
            name: "tooltips(doc?)",
            values: "document",
            notes: "Escape hides a showing [data-tip] until the pointer or focus leaves it (WCAG 1.4.13). Install once per document.",
          },
          {
            name: "toast(stack, options)",
            values: "{ title, body, timeout, closeLabel }",
            default: "timeout 7000",
            notes: "Appends a .toast with a dismiss button to a .toast-stack. The timeout pauses while the pointer or focus is in the stack; 0 keeps the toast until dismissed. A drag toward the end edge follows the pointer and dismisses past 80px or on a flick; short of that the toast springs back. The exit runs through [hidden], then the node is removed. Returns { el, dismiss }.",
          },
          {
            name: "init(root?)",
            values: "Document or element",
            default: "document",
            notes: "All of the above under root. Returns one cleanup.",
          },
        ]}
      />

      <p class="cn-copy">
        Disabled items, through <code class="cn-code-inline">disabled</code> or{" "}
        <code class="cn-code-inline">aria-disabled="true"</code>, are skipped by
        every widget. Focus return, the outside press and Escape behave the
        same in each one.
      </p>

      <CodeBlock title="One widget at a time" code={oneAtATimeSnippet} />

      <CodeBlock title="The markup each one expects" code={markupSnippet} />

      <p class="cn-copy">
        The module adds behavior, not names. Labels, roles and{" "}
        <code class="cn-code-inline">aria-controls</code> links are still your
        markup; the <a href="/accessibility">Accessibility</a> page lists what
        each component needs.
      </p>
    </Doc>
  );
}
