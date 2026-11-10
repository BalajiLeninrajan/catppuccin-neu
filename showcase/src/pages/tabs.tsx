import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { tabsKeydown } from "../lib/roving";

const ChartIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />
  </svg>
);

interface TabDef {
  id: string;
  label: string;
  icon?: boolean;
  disabled?: boolean;
  body: string;
}

const VIEWS: TabDef[] = [
  { id: "overview", label: "Overview", body: "42 invoices this month. 31 are paid, 7 are open and 4 are past due." },
  { id: "usage", label: "Usage", icon: true, body: "1.2 TB stored and 8,410 API calls today, 64% of the plan quota." },
  { id: "members", label: "Members", body: "14 members across 3 teams. 2 invites are waiting to be accepted." },
  { id: "audit", label: "Audit log", disabled: true, body: "" },
];

/* A tablist with a roving tabindex: only the selected tab is in the tab
   order, and Left, Right, Home and End move between the others. */
function TabsDemo({ name }: { name: string }) {
  const [current, setCurrent] = useState(0);
  return (
    <div class="cn-stack cn-gap-16" style="width:100%">
      <div class="tabs cn-fit" role="tablist" aria-label="Workspace views" onKeyDown={(e) => tabsKeydown(e, setCurrent)}>
        {VIEWS.map((v, i) => (
          <button
            key={v.id}
            type="button"
            role="tab"
            id={`${name}-tab-${v.id}`}
            aria-controls={`${name}-panel-${v.id}`}
            aria-selected={i === current ? "true" : "false"}
            tabIndex={i === current ? 0 : -1}
            disabled={v.disabled}
            onClick={() => setCurrent(i)}
          >
            {v.icon ? <ChartIcon /> : null}
            {v.label}
          </button>
        ))}
      </div>
      {VIEWS.filter((v) => !v.disabled).map((v) => {
        const i = VIEWS.indexOf(v);
        return (
          <div
            key={v.id}
            role="tabpanel"
            id={`${name}-panel-${v.id}`}
            aria-labelledby={`${name}-tab-${v.id}`}
            tabIndex={0}
            hidden={i !== current}
            class="cn-copy cn-r-control"
          >
            {v.body}
          </div>
        );
      })}
    </div>
  );
}

/* A static specimen of each state, outside a tablist's behavior. */
function StatesDemo() {
  return (
    <div class="tabs" role="tablist" aria-label="Tab states">
      <button type="button" role="tab" aria-selected="true" tabIndex={0}>Selected</button>
      <button type="button" role="tab" aria-selected="false" tabIndex={-1}>Rest</button>
      <button type="button" role="tab" aria-selected="false" tabIndex={-1}>
        <ChartIcon />
        With icon
      </button>
      <button type="button" role="tab" aria-selected="false" tabIndex={-1} disabled>Disabled</button>
    </div>
  );
}

export default function TabsPage() {
  return (
    <Doc
      title="Tabs"
      lede="Views of one region. The tabs sit in a shallow carve, and the selected tab rises out of it on the raised fill."
    >
      <p class="cn-copy">
        Tabs are the reverse of the{" "}
        <a href="/segmented">segmented control</a>.
      </p>

      <Demo
        title="Tabs with panels"
        classes='tabs[role="tablist"] > [role="tab"][aria-selected="true"]'
        why="Why the selected tab rises, and the keys it answers"
      >
        <TabsDemo name="views" />
      </Demo>

      <p class="cn-copy">
        A segmented choice is a
        setting, so the chosen option presses in. A tab is a view, so the
        chosen tab lifts toward the reader on{" "}
        <code class="cn-code-inline">--cn-surface-raised</code> with the soft raise,
        the lit top edge and the{" "}
        <code class="cn-code-inline">--engaged-edge</code> mauve rim. The
        raised fill is base: a step above the carve on the mantle page, and
        the same as the carve inside a panel, so the rim is
        what marks the choice. The carve under them is{" "}
        <code class="cn-code-inline">--neu-inset-soft</code>, a dark wall from
        the top left with no light lip, and{" "}
        <code class="cn-code-inline">--cn-carve-ring</code>, a quiet even
        surface-1 hairline a step under a resting field's, since a tablist
        is not an input waiting for text. The carve's bounds show on the
        page and on a panel. It closes into an overlay-2
        ring under{" "}
        <code class="cn-code-inline">prefers-contrast: more</code>.
      </p>

      <p class="cn-copy">
        Click a tab, or focus the selected one and use the arrow keys. Focus
        and selection move together. Home and End jump to the first and last
        tab, and the disabled tab is skipped.
      </p>

      <Demo title="Every state" classes="[aria-selected] · > svg · :disabled" why="Colors, sizes and overflow" row>
        <StatesDemo />
      </Demo>

      <p class="cn-copy">
        Unselected tabs are <code class="cn-code-inline">--cn-fg-muted</code>{" "}
        (subtext-0) and turn <code class="cn-code-inline">--cn-fg</code> on hover. An
        svg leads at 16px. A disabled tab drops to{" "}
        <code class="cn-code-inline">--disabled-opacity</code>. Tabs are{" "}
        <code class="cn-code-inline">--control-h-sm</code> tall, so they shrink
        with <code class="cn-code-inline">data-density="cozy"</code> (28px) and{" "}
        <code class="cn-code-inline">data-density="compact"</code> (26px, never under 24px). A row
        longer than its container scrolls sideways inside the carve.
      </p>

      <h2 class="cn-title">Accessibility</h2>
      <p class="cn-copy">
        The CSS needs no script to look right, but tabs are required to
        have a keyboard model: <code class="cn-code-inline">tabs()</code>{" "}
        from <code class="cn-code-inline">catppuccin-neu/js</code>, or your
        own widget library. Give the carve{" "}
        <code class="cn-code-inline">role="tablist"</code> and an{" "}
        <code class="cn-code-inline">aria-label</code>. Each tab is a{" "}
        <code class="cn-code-inline">button</code> with{" "}
        <code class="cn-code-inline">role="tab"</code>,{" "}
        <code class="cn-code-inline">aria-selected</code> and{" "}
        <code class="cn-code-inline">aria-controls</code> pointing at its panel.
        Each panel has <code class="cn-code-inline">role="tabpanel"</code>,{" "}
        <code class="cn-code-inline">aria-labelledby</code> pointing back, and{" "}
        <code class="cn-code-inline">tabindex="0"</code> when it holds no
        focusable content. Keep a roving tabindex: the selected tab is{" "}
        <code class="cn-code-inline">tabindex="0"</code> and the rest are{" "}
        <code class="cn-code-inline">-1</code>, so Tab moves from the tablist
        straight into the panel. Left and Right move between tabs, Home and End
        go to the ends. Under forced colors the selected tab draws a Highlight
        rim and the carve a CanvasText edge.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div class="tabs" role="tablist" aria-label="Workspace views">
  <button role="tab" id="t-overview" aria-controls="p-overview"
          aria-selected="true" tabindex="0">Overview</button>
  <button role="tab" id="t-usage" aria-controls="p-usage"
          aria-selected="false" tabindex="-1">
    <svg aria-hidden="true">…</svg>Usage
  </button>
  <button role="tab" aria-selected="false" tabindex="-1" disabled>Audit log</button>
</div>
<div role="tabpanel" id="p-overview" aria-labelledby="t-overview" tabindex="0">…</div>
<div role="tabpanel" id="p-usage" aria-labelledby="t-usage" tabindex="0" hidden>…</div>`}
      />

      <CodeBlock
        title="Arrow keys (consumer code)"
        code={`tablist.addEventListener("keydown", (e) => {
  const tabs = [...tablist.querySelectorAll('[role="tab"]:not(:disabled)')];
  const at = tabs.indexOf(document.activeElement);
  const to = { ArrowRight: at + 1, ArrowLeft: at - 1, Home: 0, End: tabs.length - 1 }[e.key];
  if (to === undefined || at < 0) return;
  e.preventDefault();
  const tab = tabs[(to + tabs.length) % tabs.length];
  tab.focus();
  select(tab); // set aria-selected, tabindex and the panel's hidden
});`}
      />

      <p class="cn-copy">
        To skip writing this, call <code class="cn-code-inline">tabs(tablist)</code>{" "}
        from the <a href="/behavior">behavior module</a>,{" "}
        <code class="cn-code-inline">catppuccin-neu/js</code>. It keeps the roving
        tabindex, the arrow keys mirrored in right-to-left text, and each
        panel's <code class="cn-code-inline">hidden</code> in step, and fires{" "}
        <code class="cn-code-inline">cn-select</code> on the tablist. The demo on
        this page is Preact and does its own wiring.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".tabs", values: '[role="tablist"]', contrast: "Carve hairline 1.8:1 on a panel, 1.9:1 on the page", notes: "Inline flex row, 4px padding and gap, the control radius plus 4px. --neu-inset-soft and --cn-carve-ring, an even surface-1 hairline. Scrolls sideways with no scrollbar when it overflows. Required to have a keyboard model: tabs() from catppuccin-neu/js or your own." },
          { name: '.tabs > [role="tab"]', values: "button", contrast: "Resting label 7.4:1 on base", notes: "--control-h-sm tall, 16px inline padding, the ui role (600 14px) in --cn-fg-muted, a transparent border. Hover turns the label --cn-fg." },
          { name: '[aria-selected="true"]', values: "on a tab", contrast: "Rim 4.7:1 on base", notes: "Rises out of the carve: --cn-surface-raised fill, the --engaged-edge rim, --neu-raised-soft and --cn-lit-edge, label in --cn-fg. A tab is a view, so it rises; a segmented choice is a setting, so it presses in. With tabs() wired, the fill is one .tabs::before pill that slides to the selected tab over --t-fast on the ease-out." },
          { name: '[role="tab"] > svg', values: "one leading glyph", notes: "16px, aria-hidden. The label stays the name." },
          { name: ":disabled", values: "on a tab", notes: "--disabled-opacity (.6) and a not-allowed cursor. Skip it in the arrow-key order." },
          { name: '[role="tabpanel"]', values: "consumer markup", notes: "No recipe. Toggle hidden on the panels that are not selected." },
        ]}
      />
    </Doc>
  );
}
