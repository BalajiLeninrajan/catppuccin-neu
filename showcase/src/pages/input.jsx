import { Doc, Demo, Props, CodeBlock } from "../lib/doc.jsx";

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
  <input class="input" type="search" placeholder="Search invoices" />
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

export default function InputPage() {
  return (
    <Doc
      title="Input & Field"
      lede="Text inputs, selects, and textareas are borderless and carved from whatever surface they sit on: the background stays transparent, and the inner shadow alone presses the well into the parent ground."
    >
      <p class="cn-copy">
        Raised surfaces keep a hairline because their lit edge needs support.
        Inset surfaces don't: the shadow already separates the well from the
        ground, so a border or a fill would only add noise. An input never
        paints its own background — on a panel it is carved from the panel, on
        the page it is carved from the page, which is what makes the depth read
        as depth. There is no 1px stroke at rest, and focus doesn't swap one in — the
        mauve ring layers <em>over</em> the inset, so the field never shifts or
        reflows when it takes focus. Labels are small uppercase sans; values
        are sans with tabular numerals, so amounts and dates align in forms
        the same way they do in tables.
      </p>

      <Demo title="Field — label + input" classes="field">
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

      <Demo title="Bare input" classes="input">
        <div class="sc-grid">
          <input
            class="input"
            type="text"
            placeholder="Invoice reference — e.g. INV-2041"
          />
        </div>
        <p class="cn-copy">
          Outside a <code class="cn-code">.field</code>, put{" "}
          <code class="cn-code">.input</code> on the element itself. Same well,
          same height, no label column.
        </p>
      </Demo>

      <Demo title="Select" classes="field">
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
        <p class="cn-copy">
          Selects share the input well. The native chrome is stripped
          (<code class="cn-code">appearance: none</code>) so the recessed
          surface stays consistent across controls.
        </p>
      </Demo>

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
        <p class="cn-copy">
          The hero variant: 58px tall, 13px radius, 15px type. One per page —
          it marks the primary act of entry, like naming the thing you're about
          to create.
        </p>
      </Demo>

      <Demo title="Icon input" classes="input-icon">
        <div class="sc-grid">
          <div class="input-icon">
            <MagnifierIcon />
            <input class="input" type="search" placeholder="Search invoices" />
          </div>
        </div>
        <p class="cn-copy">
          <code class="cn-code">.input-icon</code> is a positioning wrapper: it
          absolutely places a leading 18px icon and pads the input to clear it.
          The icon sits in <code class="cn-code">--overlay-1</code> and ignores
          pointer events, so clicks land in the field.
        </p>
      </Demo>

      <Demo title="Focus — ring over inset" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" placeholder="Click or tab into me" />
        </div>
        <p class="cn-copy">
          Focus adds a 2px mauve ring layered over the unchanged inset shadow.
          No border appears, nothing moves — the well simply lights up. The
          global <code class="cn-code">:focus-visible</code> outline is never
          removed.
        </p>
      </Demo>

      <Demo title="Disabled" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" value="ACME-2041 (locked)" disabled />
        </div>
        <p class="cn-copy">
          Disable with the native attribute. The well stays put; the browser
          dims the value and blocks input. Don't fake it with classes.
        </p>
      </Demo>

      <Props
        title="Classes & knobs"
        rows={[
          {
            name: ".field",
            values: "wrapper around label + input/select/textarea",
            notes:
              "Styles its label (uppercase micro-sans) and any native control inside it.",
          },
          {
            name: ".input",
            values: "on a bare input",
            notes:
              "The borderless inset well. Sans, 13px, tabular numerals for amounts and dates.",
          },
          {
            name: ".input-lg",
            values: "compose with .input",
            notes: "58px hero variant, 13px radius. One per page.",
          },
          {
            name: ".input-icon",
            values: "wrapper around svg + input",
            notes:
              "Absolutely positions a leading 18px icon; pads the input to 44px on the left.",
          },
          {
            name: "--input-h",
            values: "length",
            default: "42px",
            notes: "Density knob; compact density sets 30px.",
          },
        ]}
      />

      <CodeBlock title="Markup" code={FIELD_SNIPPET} />
    </Doc>
  );
}
