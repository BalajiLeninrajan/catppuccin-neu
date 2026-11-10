import { useEffect, useRef, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { moveFocus } from "../lib/roving";

const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

const PencilIcon = () => (
  <svg {...STROKE}>
    <path d="M4 20h4L19 9l-4-4L4 16v4zM13.5 6.5l4 4" />
  </svg>
);
const CopyIcon = () => (
  <svg {...STROKE}>
    <rect x="8" y="8" width="12" height="12" rx="2" />
    <path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2" />
  </svg>
);
const DownloadIcon = () => (
  <svg {...STROKE}>
    <path d="M12 4v11M7 10l5 5 5-5M5 20h14" />
  </svg>
);
const TrashIcon = () => (
  <svg {...STROKE}>
    <path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" />
  </svg>
);
const ChevronIcon = () => (
  <svg {...STROKE}>
    <path d="m6 9 6 6 6-6" />
  </svg>
);

/* A menu button: the ghost trigger takes aria-expanded="true" while the
   menu is open, which is also its engaged state. */
function MenuDemo() {
  const [open, setOpen] = useState(false);
  const [archived, setArchived] = useState(true);
  const [compact, setCompact] = useState(false);
  const trigger = useRef<HTMLButtonElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const wrap = useRef<HTMLDivElement>(null);
  /* Which item takes focus when the menu opens: first, or last for ArrowUp. */
  const focusOnOpen = useRef<"first" | "last">("first");

  const items = () => [...(menu.current?.querySelectorAll<HTMLElement>('[role^="menuitem"]') ?? [])];

  function close(returnFocus = true) {
    setOpen(false);
    if (returnFocus) trigger.current?.focus();
  }

  /* Focus the first or last enabled item once the menu is visible. */
  useEffect(() => {
    if (!open) return;
    const pool = items().filter((el) => !(el as HTMLButtonElement).disabled);
    (focusOnOpen.current === "last" ? pool[pool.length - 1] : pool[0])?.focus();
  }, [open]);

  /* A press outside closes the menu without stealing focus back. */
  useEffect(() => {
    if (!open) return;
    const away = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) close(false);
    };
    document.addEventListener("pointerdown", away);
    return () => document.removeEventListener("pointerdown", away);
  }, [open]);

  function onTriggerKey(e: KeyboardEvent) {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      focusOnOpen.current = e.key === "ArrowUp" ? "last" : "first";
      setOpen(true);
    }
  }

  function onMenuKey(e: KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "Tab") {
      close(false);
      return;
    }
    moveFocus(e, items(), "vertical");
  }

  /* An action closes the menu; a checkbox item toggles and stays open. */
  const act = () => close();

  return (
    <div ref={wrap} style="position:relative;width:min(320px,100%)">
      <button
        ref={trigger}
        type="button"
        class="btn btn-ghost"
        id="menu-trigger"
        aria-haspopup="menu"
        aria-expanded={open ? "true" : "false"}
        aria-controls="menu-invoice"
        onClick={() => {
          focusOnOpen.current = "first";
          setOpen(!open);
        }}
        onKeyDown={onTriggerKey}
      >
        Invoice actions
        <ChevronIcon />
      </button>
      <div
        ref={menu}
        id="menu-invoice"
        class="popover menu"
        role="menu"
        aria-labelledby="menu-trigger"
        hidden={!open}
        style="top:54px;left:0"
        onKeyDown={onMenuKey}
      >
        <MenuRows
          archived={archived}
          compact={compact}
          onArchived={() => setArchived(!archived)}
          onCompact={() => setCompact(!compact)}
          onAct={act}
        />
      </div>
    </div>
  );
}

interface MenuRowsProps {
  archived: boolean;
  compact: boolean;
  onArchived?: () => void;
  onCompact?: () => void;
  onAct?: () => void;
}

/* Every row kind once: icons, shortcuts, a disabled row, a labeled group
   of checkbox rows, separators and a danger row. */
function MenuRows({ archived, compact, onArchived, onCompact, onAct }: MenuRowsProps) {
  return (
    <>
      <button type="button" role="menuitem" tabIndex={-1} aria-keyshortcuts="R" onClick={onAct}>
        <PencilIcon />
        Rename
        <kbd>R</kbd>
      </button>
      <button type="button" role="menuitem" tabIndex={-1} aria-keyshortcuts="Control+D" onClick={onAct}>
        <CopyIcon />
        Duplicate
        <kbd>Ctrl D</kbd>
      </button>
      <button type="button" role="menuitem" tabIndex={-1} disabled>
        <DownloadIcon />
        Export as PDF
      </button>
      <hr role="separator" />
      <p class="cn-microlabel cn-m-0" aria-hidden="true">View</p>
      <button
        type="button"
        role="menuitemcheckbox"
        tabIndex={-1}
        aria-checked={archived ? "true" : "false"}
        onClick={onArchived}
      >
        Show archived
      </button>
      <button
        type="button"
        role="menuitemcheckbox"
        tabIndex={-1}
        aria-checked={compact ? "true" : "false"}
        onClick={onCompact}
      >
        Compact rows
      </button>
      <hr role="separator" />
      <button type="button" role="menuitem" tabIndex={-1} class="is-danger" onClick={onAct}>
        <TrashIcon />
        Delete invoice
      </button>
    </>
  );
}

/* Pinned open for inspection: the trigger in its engaged state over the
   open menu. Not wired; the live demo below has the keys. The menu sits in
   normal flow under the trigger, so the stage takes the menu's height. */
function PinnedDemo() {
  return (
    <div class="cn-stack cn-gap-8" style="justify-items:start;width:min(320px,100%)">
      <button type="button" class="btn btn-ghost" aria-haspopup="menu" aria-expanded="true" tabIndex={-1}>
        Invoice actions
        <ChevronIcon />
      </button>
      <div class="popover menu" role="menu" aria-label="Invoice actions, pinned specimen" style="position:relative;z-index:auto">
        <MenuRows archived compact={false} />
      </div>
    </div>
  );
}

export default function MenuPage() {
  return (
    <Doc
      title="Menu"
      lede="A list of actions in a popover, opened from a button. Rows share the ghost hover, so the pointer and the arrow keys light the same row."
    >
      <p class="cn-copy">
        Add <code class="cn-code-inline">.menu</code> to a{" "}
        <code class="cn-code-inline">.popover</code> and give it{" "}
        <code class="cn-code-inline">role="menu"</code>.
      </p>

      <Demo
        title="Anatomy, pinned open"
        classes='btn btn-ghost[aria-expanded="true"] · popover menu[role="menu"]'
        why="Markup, size and surface"
      >
        <PinnedDemo />
      </Demo>

      <p class="cn-copy">
        The menu sizes to its
        rows, at least 200px and at most 320px wide, on the overlay fill with
        the <code class="cn-code-inline">--edge-strong</code> hairline and{" "}
        <code class="cn-code-inline">--shadow-pop</code>. It opens and leaves
        with the popover motion.
      </p>

      <Demo
        title="Menu button, click or press ArrowDown"
        classes='btn btn-ghost[aria-haspopup="menu"] · popover menu[hidden]'
        why="The trigger's engaged state and how the menu opens"
      >
        <MenuDemo />
      </Demo>

      <p class="cn-copy">
        The trigger is a ghost button. While the menu is open it carries{" "}
        <code class="cn-code-inline">aria-expanded="true"</code>, and the ghost
        recipe reads that as the engaged state: pressed in on the mauve wash
        inside the <code class="cn-code-inline">--engaged-edge</code> rim. Open
        the menu with a click, Enter, Space or ArrowDown. ArrowUp opens it on
        the last row.
      </p>

      <h2 class="cn-title">Rows</h2>
      <p class="cn-copy">
        Every <code class="cn-code-inline">[role^="menuitem"]</code> child is a
        row at <code class="cn-code-inline">--control-h-sm</code>, 14px at 500 in{" "}
        <code class="cn-code-inline">--cn-fg-soft</code>. Hover and keyboard focus
        both paint <code class="cn-code-inline">--hover</code> and lift the label
        to <code class="cn-code-inline">--cn-fg</code>. Keyboard focus also draws
        the 2px <code class="cn-code-inline">--cn-focus</code> ring, inset 2px so the rows above and below
        never clip it. The pointer gets the wash alone, so a reader using the
        arrow keys always sees which row Enter will run. A leading svg sits at 16px
        in <code class="cn-code-inline">--cn-fg-faint</code>. Once any row has
        one, rows without an svg and the group labels indent to the icon
        column, so every label starts on one line. A trailing{" "}
        <code class="cn-code-inline">kbd</code> is the shortcut, in mono at the
        code size, 13px; mirror it in <code class="cn-code-inline">aria-keyshortcuts</code>.
        A <code class="cn-code-inline">menuitemcheckbox</code> with{" "}
        <code class="cn-code-inline">aria-checked="true"</code> draws a mauve check
        at the row's end. <code class="cn-code-inline">.is-danger</code> is red with
        a red wash. A disabled row drops to{" "}
        <code class="cn-code-inline">--disabled-opacity</code> and keeps no hover.
      </p>

      <p class="cn-copy">
        <code class="cn-code-inline">hr role="separator"</code> is an{" "}
        <code class="cn-code-inline">--edge-soft</code> rule with 4px above and
        below. A <code class="cn-code-inline">.cn-microlabel</code> heads a group
        of rows. It labels a fact about the rows under it, here that they
        change the view, and it is the one uppercase voice in the menu.
      </p>

      <h2 class="cn-title">Accessibility</h2>
      <p class="cn-copy">
        The CSS needs no script to look right, but a menu is required to
        have a keyboard model: <code class="cn-code-inline">menu()</code>{" "}
        from <code class="cn-code-inline">catppuccin-neu/js</code>, or your
        own widget library.
        Give the trigger <code class="cn-code-inline">aria-haspopup="menu"</code>,{" "}
        <code class="cn-code-inline">aria-expanded</code> and{" "}
        <code class="cn-code-inline">aria-controls</code>, and label the menu
        with <code class="cn-code-inline">aria-labelledby</code> pointing at the
        trigger. Rows take <code class="cn-code-inline">tabindex="-1"</code>: the
        menu is one stop, and the arrow keys move inside it. When it opens,
        focus goes to the first enabled row. ArrowDown and ArrowUp move and
        wrap, Home and End go to the ends, and disabled rows are skipped.
        Escape closes the menu and returns focus to the trigger. Tab closes it
        and moves on. A press outside closes it in place. A{" "}
        <code class="cn-code-inline">role="menu"</code> may only hold rows,
        groups and separators, so mark the group label{" "}
        <code class="cn-code-inline">aria-hidden="true"</code> and keep each row's
        name complete without it.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div style="position: relative">
  <button class="btn btn-ghost" id="actions" aria-haspopup="menu"
          aria-expanded="false" aria-controls="actions-menu">Invoice actions</button>
  <div class="popover menu" id="actions-menu" role="menu"
       aria-labelledby="actions" hidden>
    <button role="menuitem" tabindex="-1" aria-keyshortcuts="R">
      <svg aria-hidden="true">…</svg>Rename<kbd>R</kbd>
    </button>
    <button role="menuitem" tabindex="-1" disabled>Export as PDF</button>
    <hr role="separator">
    <p class="cn-microlabel" aria-hidden="true">View</p>
    <button role="menuitemcheckbox" tabindex="-1" aria-checked="true">Show archived</button>
    <hr role="separator">
    <button role="menuitem" tabindex="-1" class="is-danger">Delete invoice</button>
  </div>
</div>`}
      />

      <CodeBlock
        title="Keys (consumer code)"
        code={`menu.addEventListener("keydown", (e) => {
  if (e.key === "Escape") { close(); trigger.focus(); return; }
  if (e.key === "Tab") { close(); return; }
  const rows = [...menu.querySelectorAll('[role^="menuitem"]:not(:disabled)')];
  const at = rows.indexOf(document.activeElement);
  const to = { ArrowDown: at + 1, ArrowUp: at - 1, Home: 0, End: rows.length - 1 }[e.key];
  if (to === undefined) return;
  e.preventDefault();
  rows[(to + rows.length) % rows.length].focus();
});`}
      />

      <p class="cn-copy">
        Or call <code class="cn-code-inline">menu(trigger)</code> from the{" "}
        <a href="/behavior">behavior module</a>,{" "}
        <code class="cn-code-inline">catppuccin-neu/js</code>. It reads{" "}
        <code class="cn-code-inline">aria-controls</code> to find the menu and
        wires all of the above: opening, the arrow keys, Escape and Tab, the
        outside press, <code class="cn-code-inline">aria-expanded</code>, and a{" "}
        <code class="cn-code-inline">menuitemcheckbox</code> that toggles and
        stays open. The demo on this page is Preact and does its own wiring.
      </p>

      <Props
        title="Contract"
        rows={[
          { name: ".popover.menu", values: '[role="menu"]', notes: "Width auto, min 200px, max min(320px, 100vw - 32px), 4px padding. The popover fill, hairline, shadow and motion. Required to have a keyboard model: menu() from catppuccin-neu/js or your own." },
          { name: '.menu > [role^="menuitem"]', values: "button or a", notes: "--control-h-sm row, 12px inline padding, the control radius, 500 14px in --cn-fg-soft. Hover and :focus-visible share --hover and --cn-fg; :focus-visible adds the 2px --cn-focus ring at a -2px offset." },
          { name: "> svg", values: "leading glyph", notes: "16px in --cn-fg-faint, aria-hidden. Once any row has one, iconless rows and group labels indent 36px, to the icon column's text edge." },
          { name: "> kbd", values: "trailing shortcut", notes: "Pushed to the end, mono 500 13px in --cn-fg-muted. Mirror it in aria-keyshortcuts." },
          { name: '[aria-checked="true"]', values: "menuitemcheckbox / menuitemradio", notes: "A 14px mauve check at the row's end." },
          { name: ".is-danger", values: "on a row", notes: "--cn-danger label, a red wash at --cn-step-wash on hover and focus." },
          { name: ':disabled / [aria-disabled="true"]', values: "on a row", notes: "--disabled-opacity, not-allowed, no hover fill." },
          { name: 'hr[role="separator"]', values: "between groups", notes: "An --edge-soft rule, 4px above and below." },
          { name: ".cn-microlabel", values: "group label", notes: "Padded to line up with the row labels, at the icon column when the menu has icons. aria-hidden inside role=menu." },
          { name: 'btn-ghost[aria-expanded="true"]', values: "the trigger", notes: "The engaged state while the menu is open: --wash, --neu-inset, the --engaged-edge rim." },
        ]}
      />
    </Doc>
  );
}
