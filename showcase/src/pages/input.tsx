import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

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
      lede="Text inputs, selects, and textareas are borderless. The background stays transparent; the inner shadow alone presses the well into the parent ground."
    >
      <p class="cn-copy">
        An input never paints its own background. On a panel it is carved from
        the panel, on the page from the page. There is no stroke at rest, and
        focus doesn't add one; the mauve ring layers over the inset, so the
        field never shifts or reflows on focus. Labels are small sentence-case
        sans. Values are sans with tabular numerals, so amounts and dates
        align in forms the same way they do in tables.
      </p>

      <Demo title="Field" classes="field">
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
            placeholder="Invoice reference, e.g. INV-2041"
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
          Selects share the input well. Where the browser supports customizable
          selects (Chrome 135+), the option list renders as a system popover
          with mauve hover and checkmark. Elsewhere the OS picker stays.
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
          The hero variant: 58px tall, 13px radius, 15px type. One per page.
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

      <Demo title="Focus" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" placeholder="Click or tab into me" />
        </div>
        <p class="cn-copy">
          Focus adds a 2px mauve ring over the unchanged inset shadow. No
          border appears, nothing moves. Fields suppress the global{" "}
          <code class="cn-code">:focus-visible</code> outline; the ring is the
          focus indicator. Everywhere else the global outline stands.
        </p>
      </Demo>

      <Demo title="Validation" classes="field is-error / field is-warning">
        <div class="sc-grid">
          <div class="field is-error">
            <label for="demo-bad-email">Billing email</label>
            <input
              id="demo-bad-email"
              type="email"
              value="billing@acme"
              aria-invalid="true"
            />
            <small>Enter a full email address.</small>
          </div>
          <div class="field is-warning">
            <label for="demo-ext-email">Invite</label>
            <input id="demo-ext-email" type="email" value="sam@other.co" />
            <small>Outside your workspace domain.</small>
          </div>
        </div>
        <p class="cn-copy">
          The state class sets <code class="cn-code">--tone</code> and rings
          the well; label and message tint with it. The ring stays through
          focus. Set <code class="cn-code">aria-invalid</code> alongside{" "}
          <code class="cn-code">.is-error</code>.
        </p>
      </Demo>

      <Demo title="Disabled" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" value="ACME-2041 (locked)" disabled />
        </div>
        <p class="cn-copy">
          Use the native attribute. The field flattens to the soft inset with
          authored dimming: opacity .6, text at overlay-0. The browser only
          blocks input.
        </p>
      </Demo>

      <Props
        title="Classes & knobs"
        rows={[
          {
            name: ".field",
            values: "wrapper around label + input/select/textarea",
            notes:
              "Styles its label (small sentence-case sans) and any native control inside it.",
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
            name: ".is-error / .is-warning",
            values: "on .field or a bare .input",
            notes:
              "Red or peach tone ring over the inset; label and small tint. Disabled wins over both.",
          },
          {
            name: ".field small",
            values: "helper or message line",
            notes: "11px under the control; overlay-1, tinted by the state.",
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
