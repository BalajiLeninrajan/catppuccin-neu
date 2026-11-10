import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function SelectionPage() {
  return (
    <Doc
      title="Selection"
      lede="Checkbox, radio and switch. Each is a restyled native input and needs no script."
    >
      <p class="cn-copy">
        Wrap the control and its text in <code class="cn-code-inline">label.choice</code>, so the text toggles the input.
      </p>

      <Demo title="Checkbox" classes="label.choice > input.checkbox" row>
        <label class="choice">
          <input type="checkbox" class="checkbox" checked />
          Email receipts
        </label>
        <label class="choice">
          <input type="checkbox" class="checkbox" />
          Weekly digest
        </label>
        <label class="choice">
          <input type="checkbox" class="checkbox" disabled />
          Usage alerts
        </label>
      </Demo>

      <Demo title="Radio group" classes="fieldset > label.choice > input.radio">
        <fieldset style="margin:0;padding:0;border:0">
          <legend class="cn-label" style="margin-bottom:12px">
            Billing contact
          </legend>
          <div style="display:flex;flex-direction:column;gap:12px">
            <label class="choice">
              <input type="radio" name="billing-contact" class="radio" checked />
              Account owner
            </label>
            <label class="choice">
              <input type="radio" name="billing-contact" class="radio" />
              Finance team
            </label>
            <label class="choice">
              <input type="radio" name="billing-contact" class="radio" />
              Custom address
            </label>
          </div>
        </fieldset>
      </Demo>

      <p class="cn-copy">
        Group radios in a <code class="cn-code-inline">fieldset</code> under one <code class="cn-code-inline">name</code>.
      </p>

      <Demo title="Switch" classes="label.choice > input.switch" row>
        <label class="choice">
          <input type="checkbox" class="switch" />
          Weekly digest
        </label>
        <label class="choice">
          <input type="checkbox" class="switch" checked />
          Auto-renew
        </label>
        <label class="choice">
          <input type="checkbox" class="switch" disabled />
          Legacy exports
        </label>
      </Demo>

      <Demo title="Error" classes='fieldset[aria-invalid="true"] + small[id]'>
        <fieldset
          class="cn-stack cn-gap-12"
          style="margin:0;padding:0;border:0"
          aria-invalid="true"
          aria-describedby="demo-notify-msg"
        >
          <legend class="cn-label" style="margin-bottom:var(--space-3);color:var(--cn-danger)">
            Send invoice alerts to
          </legend>
          <label class="choice">
            <input type="checkbox" class="checkbox" />
            Account owner
          </label>
          <label class="choice">
            <input type="checkbox" class="checkbox" />
            Finance team
          </label>
          <label class="choice">
            <input type="checkbox" class="checkbox" />
            Billing contact
          </label>
          <small id="demo-notify-msg" class="cn-meta" style="color:var(--cn-danger)">
            Choose at least one recipient.
          </small>
        </fieldset>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code-inline">aria-invalid="true"</code> on a checkbox or radio, or on the <code class="cn-code-inline">fieldset</code> that holds them. Point <code class="cn-code-inline">aria-describedby</code> at the message.
      </p>

      <CodeBlock
        title="Markup"
        code={`<label class="choice">
  <input type="checkbox" class="checkbox" checked />
  Email receipts
</label>

<fieldset>
  <legend class="cn-label">Billing contact</legend>
  <label class="choice">
    <input type="radio" name="contact" class="radio" checked />
    Account owner
  </label>
</fieldset>

<label class="choice">
  <input type="checkbox" class="switch" checked />
  Auto-renew
</label>

<fieldset aria-invalid="true" aria-describedby="notify-msg">
  <legend class="cn-label">Send invoice alerts to</legend>
  <label class="choice">
    <input type="checkbox" class="checkbox" />
    Finance team
  </label>
  <small id="notify-msg">Choose at least one recipient.</small>
</fieldset>`}
      />

      <Props
        title="Classes"
        rows={[
          { name: ".choice", values: "label", notes: "Wraps the control and its text." },
          { name: ".checkbox", values: "input[type=\"checkbox\"]", notes: "A square well. Checked fills mauve." },
          { name: ".radio", values: "input[type=\"radio\"]", notes: "A round well. Checked presses in a mauve dot." },
          { name: ".switch", values: "input[type=\"checkbox\"]", notes: "A rocker paddle. Checked slides it across and lights it mauve." },
          { name: ":disabled", values: "on the input", notes: "Dims the control and its label." },
          { name: "[aria-invalid=\"true\"]", values: "on a checkbox, a radio or their fieldset", notes: "A red edge on each unchecked box." },
        ]}
      />
    </Doc>
  );
}
