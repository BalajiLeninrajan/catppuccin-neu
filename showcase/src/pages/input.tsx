import { useEffect, useRef } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";
import { listbox } from "../../../js/index.js";

const FIELD_SNIPPET = `<div class="field">
  <label for="ws-name">Workspace name</label>
  <input id="ws-name" type="text" placeholder="Acme Operations" />
</div>

<div class="input-icon">
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor"
       stroke-width="2" stroke-linecap="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.9-3.9" />
  </svg>
  <input class="input" type="search" placeholder="Search invoices" aria-label="Search invoices" />
</div>`;

function MagnifierIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.9-3.9" />
    </svg>
  );
}

const TEAMS = ["Payments", "Analytics", "Messaging", "Storage", "Identity", "Support"];

/* A combobox and a standalone listbox, both wired by listbox() from the
   behavior module. The combobox list is a .popover under the field; the
   standalone list sits in a .well carve. */
function Pickers() {
  const combo = useRef<HTMLInputElement>(null);
  const comboList = useRef<HTMLDivElement>(null);
  const list = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const offs = [listbox(list.current!)];
    if (combo.current && comboList.current) offs.push(listbox(comboList.current, { combobox: combo.current }));
    return () => offs.forEach((off) => off());
  }, []);
  return (
    <div class="sc-grid" style="width:100%">
      <div class="field" style="position:relative">
        <label for="demo-combo">Owning team</label>
        <input
          ref={combo}
          id="demo-combo"
          type="text"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded="false"
          aria-controls="demo-combo-list"
          placeholder="Pick a team"
        />
        <div
          ref={comboList}
          id="demo-combo-list"
          class="popover listbox"
          role="listbox"
          aria-label="Teams"
          hidden
          style="top:100%;inset-inline-start:0;margin-top:var(--space-2)"
        >
          {TEAMS.map((t) => <div key={t} role="option" aria-selected="false">{t}</div>)}
        </div>
      </div>
      <div class="cn-stack cn-gap-8">
        <span class="cn-label" id="demo-list-label">Notify teams</span>
        <div ref={list} class="listbox well" role="listbox" tabindex={0} aria-labelledby="demo-list-label" aria-multiselectable="true">
          {TEAMS.slice(0, 4).map((t, i) => (
            <div key={t} role="option" aria-selected={i === 1 ? "true" : "false"} aria-disabled={i === 3 ? "true" : undefined}>{t}</div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function InputPage() {
  return (
    <Doc
      title="Input & field"
      lede="Text inputs, selects and textareas are carved wells. The background stays transparent and one dark inner wall presses the well into the parent ground. Hover and focus ring it."
    >
      <p class="cn-copy">
        An input never paints its own background, so it is carved from
        whatever it sits on.
      </p>

      <Demo lead title="Field" classes="field" why="Why focus adds no border, and how values are set">
        <div class="sc-grid">
          <div class="field">
            <label for="demo-ws-name">Workspace name</label>
            <input
              id="demo-ws-name"
              type="text"
              placeholder="Acme Operations"
            />
          </div>
          <div class="field">
            <label for="demo-billing">Billing email</label>
            <input
              id="demo-billing"
              type="email"
              placeholder="billing@acme.test"
            />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        Focus adds no border, so the field never shifts on focus. Values are
        sans with tabular numerals, so amounts and dates align as they do in
        tables.
      </p>

      <h2 class="cn-title">The carve at rest</h2>
      <p class="cn-copy">
        A carve is one dark wall from the top left, with no light lip. At
        rest a field also has a quiet even hairline on all four sides. Hover
        closes a full ring and focus draws the focus ring. The table below
        has the ratios. Always give a field a visible label. A field in a
        table cell has none, so it takes the{" "}
        <a href="/table">inline edit</a> instead.
      </p>

      <Demo
        title="On the page and on a panel"
        classes="--cn-field-ring · --cn-field-hover-ring"
        why="The resting ring and the text ladder inside a field"
      >
        <div class="sc-grid" style="width:100%">
          <input class="input" type="text" placeholder="On the page" aria-label="Field on the page" />
          <div class="panel panel-body">
            <input class="input" type="text" placeholder="On a panel" aria-label="Field on a panel" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        A placeholder sits on the floor for readable text, help text a stop
        above it and the label a stop above that. The value is full text
        color. A placeholder is an example, never the only copy of an
        instruction.
      </p>

      <Demo title="Bare input" classes="input" why="When to use .input without .field">
        <div class="sc-grid">
          <input
            class="input"
            type="text"
            placeholder="Invoice reference, e.g. INV-2041"
          />
        </div>
      </Demo>

      <p class="cn-copy">
          Outside a <code class="cn-code-inline">.field</code>, put{" "}
          <code class="cn-code-inline">.input</code> on the element itself. Same well,
          same height, no label column.
        </p>

      <Demo title="Select" classes="field" why="Where the option list is styled">
        <div class="sc-grid">
          <div class="field">
            <label for="demo-role">Team role</label>
            <select id="demo-role">
              <option>Admin</option>
              <option>Member</option>
              <option>Billing only</option>
              <option>Read only</option>
            </select>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
          Selects share the input well. Where the browser supports customizable
          selects (Chrome 135+), the option list renders as a system popover
          on the overlay fill, with menu-row states and a mauve checkmark on
          the checked option. Elsewhere the OS picker stays.
        </p>

      <Demo
        title="Combobox and listbox"
        classes='input[role="combobox"] · listbox popover · listbox well'
        why="Markup, row states and the keyboard model they need"
      >
        <Pickers />
      </Demo>

      <p class="cn-copy">
          A combobox is a text field with{" "}
          <code class="cn-code-inline">role="combobox"</code>. It opens a{" "}
          <code class="cn-code-inline">.listbox</code> on a{" "}
          <code class="cn-code-inline">.popover</code>. A standalone listbox
          sits in a <code class="cn-code-inline">.well</code> carve. Rows take{" "}
          <code class="cn-code-inline">--hover</code> under the pointer and on
          the active row, and <code class="cn-code-inline">--wash</code> with a
          mauve check when selected. Focus stays on the field or the list, and{" "}
          <code class="cn-code-inline">aria-activedescendant</code> names the
          active row. Both need a keyboard model:{" "}
          <code class="cn-code-inline">listbox()</code> from the{" "}
          <a href="/behavior">behavior module</a>, or your own widget library.
        </p>

      <Demo
        title="Date and file"
        classes='input[type="date"] · input[type="file"]'
        why="How the date glyph and the file button are styled"
      >
        <div class="sc-grid" style="width:100%">
          <div class="field">
            <label for="demo-due">Due date</label>
            <input id="demo-due" type="date" value="2026-10-12" />
          </div>
          <div class="field">
            <label for="demo-file">Purchase order</label>
            <input id="demo-file" type="file" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
          A date field takes the carve and its states as they are. A file
          field holds a small secondary-shaped button inside the carve, and
          the field's hover, focus, disabled and invalid states cover the
          whole field.
        </p>

      <Demo title="Textarea" classes="field">
        <div class="field">
          <label for="demo-note">Message</label>
          <textarea
            id="demo-note"
            placeholder="Add a note for the team…"
          ></textarea>
        </div>
      </Demo>

      <Demo title="Large input" classes="input input-lg">
        <input
          class="input input-lg"
          type="text"
          placeholder="Name your new dashboard"
        />
      </Demo>

      <Demo title="Icon input" classes="input-icon" why="How the icon is placed">
        <div class="sc-grid">
          <div class="input-icon">
            <MagnifierIcon />
            <input class="input" type="search" placeholder="Search invoices" aria-label="Search invoices" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
          <code class="cn-code-inline">.input-icon</code> places a leading 18px
          icon and pads the input to clear it. The icon ignores pointer
          events, so clicks land in the field.
        </p>

      <Demo title="Focus" classes="input" why="How focus shows">
        <div class="sc-grid">
          <input class="input" type="text" placeholder="Click or tab into me" aria-label="Focus demo" />
        </div>
      </Demo>

      <p class="cn-copy">
          Focus is the global outline: 2px of{" "}
          <code class="cn-code-inline">--cn-focus</code> standing 3px off the
          carve. Fields take it on <code class="cn-code-inline">:focus</code>,
          so a click shows it as well as a tab. Nothing moves.
        </p>

      <Demo
        title="Validation"
        classes='field > [aria-invalid="true"] / field is-warning'
        why="What an error or warning changes, and how to wire the message"
      >
        <div class="sc-grid">
          <div class="field">
            <label for="demo-bad-email">Billing email</label>
            <input
              id="demo-bad-email"
              type="email"
              value="billing@acme"
              aria-invalid="true"
              aria-describedby="demo-bad-email-msg"
            />
            <small id="demo-bad-email-msg">Enter a full email address.</small>
          </div>
          <div class="field is-warning">
            <label for="demo-ext-email">Invite</label>
            <input
              id="demo-ext-email"
              type="email"
              value="sam@other.co"
              aria-describedby="demo-ext-email-msg"
            />
            <small id="demo-ext-email-msg">Outside your workspace domain.</small>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
          Error state keys on <code class="cn-code-inline">aria-invalid="true"</code>{" "}
          on the control. A warning uses <code class="cn-code-inline">.is-warning</code>{" "}
          on the field. Either state sets <code class="cn-code-inline">--tone</code>,
          washes the well in it and draws a full 1px ring in the tone at
          rest. The message moves up to body text and leads with a glyph in
          the tone, drawn in CSS: a crossed circle for an error, a triangle
          for a warning. Point{" "}
          <code class="cn-code-inline">aria-describedby</code> from the control
          at its <code class="cn-code-inline">small</code>, so the message is
          read with the field.
        </p>

      <Demo title="Disabled" classes="input" why="What a disabled field keeps">
        <div class="sc-grid">
          <input class="input" type="text" value="ACME-2041 (locked)" aria-label="Account code" disabled />
        </div>
      </Demo>

      <p class="cn-copy">
          Use the native attribute. The carve goes shallow under the quieter{" "}
          <code class="cn-code-inline">--cn-carve-ring</code>, hover draws no
          ring, and the text and label drop to{" "}
          <code class="cn-code-inline">--cn-fg-disabled</code>. There is no
          opacity on top.
        </p>

      <Demo title="Read-only" classes="field > input[readonly]" why="Read-only or disabled">
        <div class="sc-grid">
          <div class="field">
            <label for="demo-ws-id">Workspace ID</label>
            <input id="demo-ws-id" type="text" value="ws_8f2a91c4" readonly />
          </div>
          <div class="field">
            <label for="demo-ws-plan">Plan</label>
            <input id="demo-ws-plan" type="text" value="Pro, billed yearly" readonly />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
          A <code class="cn-code-inline">readonly</code> field holds a value
          the reader can select and copy but not change. It has no carve and
          no fill, only an <code class="cn-code-inline">--edge</code> rule
          underneath. It still takes focus. Use{" "}
          <code class="cn-code-inline">disabled</code> for a value that is
          unavailable, and <code class="cn-code-inline">readonly</code> for one
          that is fixed.
        </p>

      <Props
        title="Classes & knobs"
        rows={[
          {
            name: ".field",
            values: "wrapper around label + input/select/textarea",
            contrast: "Label 9.3:1 on base",
            notes: "Styles its label and any native control inside it.",
          },
          {
            name: ".input",
            values: "on a bare input",
            notes:
              "The carved well: --neu-inset, an even hairline at rest, a --control-edge ring on hover. Sans 500 14px in --cn-fg with tabular numerals. Under pointer: coarse the text is 16px, so iOS Safari does not zoom the page on focus.",
          },
          {
            name: ".input-lg",
            values: "compose with .input",
            notes: "58px hero variant, 18px type. One per page.",
          },
          {
            name: ".input-icon",
            values: "wrapper around svg + input",
            notes:
              "Absolutely positions a leading 18px icon; pads the input to 44px on the left.",
          },
          {
            name: '.listbox / [role="combobox"]',
            values: "custom widgets",
            notes: "The CSS styles the rows from ARIA state. Both need a keyboard model: listbox() from catppuccin-neu/js, or your own widget library.",
          },
          {
            name: '[aria-invalid="true"] / .is-warning',
            values: "on the control / on .field or a bare .input",
            notes:
              "Red (--cn-danger) or yellow (--cn-warning). The well takes the tone at --cn-step-tint and a 1px ring in the tone. The small moves up to --cn-fg-body and leads with --cn-glyph-danger or --cn-glyph-warning. Focus keeps the --cn-focus outline.",
          },
          {
            name: "[readonly]",
            values: "on an input or textarea",
            notes: "Transparent, no carve, square corners, a 1px --edge rule underneath, the value in --cn-fg-soft. Focus still rings it.",
          },
          {
            name: ":disabled",
            values: "on the control",
            contrast: "Text 4.4:1 on a panel, 4.8:1 on the page · ring 1.8:1 on a panel",
            notes: "--cn-fg-disabled text, placeholder and label, --cn-carve-ring over --neu-inset-soft, no hover ring, no opacity. WCAG 1.4.3 exempts inactive controls.",
          },
          {
            name: ":focus",
            values: "on the control",
            contrast: "11.3:1 on base",
            notes: "The global outline, 2px --cn-focus at a 3px offset, on pointer and keyboard focus.",
          },
          {
            name: "--cn-field-ring",
            values: "box-shadow",
            default: "inset 0 0 0 1px, surface-2 at 85%",
            contrast: "2.1:1 on a panel, 2.2:1 on the page · more contrast: 5.8:1 on a panel, 4.6:1 on an overlay",
            notes: "The resting ring of every live field, table-cell fields included. Hover, focus and prefers-contrast: more pass 3:1. A full overlay-2 ring under prefers-contrast: more.",
          },
          {
            name: "--cn-field-ring-overlay",
            values: "box-shadow",
            default: "inset 0 0 0 1px, overlay-0 at 75%",
            contrast: "2.1:1 on an overlay · more contrast: 4.6:1",
            notes: "The resting ring inside .popover, .modal and .drawer, which set --cn-field-ring to it. A .panel or .well inside an overlay sets --cn-field-ring back to --cn-field-ring-page.",
          },
          {
            name: "--cn-carve-ring",
            values: "box-shadow",
            default: "inset 0 0 0 1px var(--surface-1)",
            contrast: "1.8:1 on a panel, 1.9:1 on the page, 1.4:1 on an overlay",
            notes: "The quieter hairline of a disabled field and the tabs carve.",
          },
          {
            name: "--cn-field-hover-ring",
            values: "box-shadow",
            default: "inset 0 0 0 1px var(--control-edge)",
            contrast: "4.4:1 on a panel, 4.8:1 on the page, 3.5:1 on an overlay",
            notes: "Swapped in for --cn-field-ring on hover, not on a disabled or focused field. A validation ring and a read-only rule keep their own shadow.",
          },
          {
            name: "::placeholder",
            values: "--cn-fg-placeholder",
            contrast: "5.8:1 on a panel, 6.2:1 on the page, 4.6:1 on an overlay",
            notes: "overlay-2. subtext-0 under prefers-contrast: more. --cn-fg-disabled on a disabled field.",
          },
          {
            name: ".field small",
            values: "helper or message line",
            contrast: "7.4:1 on base",
            notes: "The meta role under the control in --cn-fg-muted. In an error or warning it moves up to --cn-fg-body and leads with the 12px glyph in the tone. Link it with aria-describedby.",
          },
          {
            name: "--control-h",
            values: "length",
            default: "46px (2.875rem)",
            notes: "Height of inputs, selects and buttons, in rem. Cozy density sets 38px, compact 28px.",
          },
        ]}
      />

      <CodeBlock title="Markup" code={FIELD_SNIPPET} />
    </Doc>
  );
}
