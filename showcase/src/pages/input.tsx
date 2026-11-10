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

export default function InputPage() {
  return (
    <Doc
      title="Input & field"
      lede="Text inputs, selects and textareas are wells carved into whatever they sit on."
    >
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
      </Demo>

      <p class="cn-copy">
        Inside <code class="cn-code-inline">.field</code> the native control needs no class. Outside one, put <code class="cn-code-inline">.input</code> on the element and give it an <code class="cn-code-inline">aria-label</code>.
      </p>

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

      <Demo title="Icon input" classes="input-icon">
        <div class="sc-grid">
          <div class="input-icon">
            <MagnifierIcon />
            <input class="input" type="search" placeholder="Search invoices" aria-label="Search invoices" />
          </div>
        </div>
      </Demo>

      <Demo
        title="Validation"
        classes='field > [aria-invalid="true"]'
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
        </div>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code-inline">aria-invalid="true"</code> on the control and point <code class="cn-code-inline">aria-describedby</code> at its <code class="cn-code-inline">small</code>, so the message is read with the field.
      </p>

      <Demo title="Disabled" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" value="ACME-2041 (locked)" aria-label="Account code" disabled />
        </div>
      </Demo>

      <Demo title="Read-only" classes="field > input[readonly]">
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
        Use <code class="cn-code-inline">readonly</code> for a fixed value the reader can copy, and <code class="cn-code-inline">disabled</code> for one that is unavailable.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".field", values: "wrapper around a label and a control", notes: "Styles the label, the control and a small under it." },
          { name: ".input", values: "on a bare control", notes: "The same well with no label column." },
          { name: ".input-icon", values: "wrapper around an svg and an input", notes: "A leading 18px icon." },
          { name: "[aria-invalid=\"true\"]", values: "on the control", notes: "A red ring and wash. The small leads with a glyph." },
          { name: "[readonly]", values: "on an input or textarea", notes: "No carve, a rule underneath. Still takes focus." },
          { name: ":disabled", values: "on the control", notes: "A shallow carve and dimmed text." },
          { name: ".field small", values: "helper or message line", notes: "Link it with aria-describedby." },
          { name: "--control-h", values: "length", default: "46px", notes: "28px under data-density=\"compact\"." },
        ]}
      />

      <CodeBlock title="Markup" code={FIELD_SNIPPET} />
    </Doc>
  );
}
