import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function SelectionPage() {
  return (
    <Doc
      title="Selection"
      lede="Checkbox, radio, and switch. Each is a restyled native input, so forms, keyboard, and focus behavior come for free."
    >
      <p class="cn-copy">
        Wrap control and text in <code class="cn-code">label.choice</code>. The
        whole label is the hit target, and{" "}
        <code class="cn-code">.choice:has(:disabled)</code> fades the pair when
        the input is disabled, no extra class needed.
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

      <p class="cn-copy">
        The checkbox and radio are edged wells that fill when selected; at
        20px the carve alone is invisible, so these keep a hairline. The
        checkbox floods mauve behind a scaled-in check, the radio presses a
        mauve dot into its center.
      </p>

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
        Group radios in a <code class="cn-code">fieldset</code> under one{" "}
        <code class="cn-code">name</code>. Style the legend like a{" "}
        <code class="cn-code">.field</code> label,{" "}
        <code class="cn-code">.cn-label</code> is that same role.
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

      <p class="cn-copy">
        The switch is a rocker light switch. A carved bezel holds a two-ended
        paddle, I on top, O on the bottom, and the active end sits pressed in.
        Checking presses I in and lights it mauve; O pops out.
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
</label>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".choice",
            values: "label",
            notes:
              "Inline flex row, 10px gap, sans 500 13px. Wraps control plus text so the text toggles the input.",
          },
          {
            name: ".checkbox",
            values: 'input[type="checkbox"]',
            notes:
              "20px square well, 4px radius. Checked fills mauve and scales in a crust check.",
          },
          {
            name: ".radio",
            values: 'input[type="radio"]',
            notes:
              "20px round well. Checked deepens the inset and presses in a 9px mauve dot.",
          },
          {
            name: ".switch",
            values: 'input[type="checkbox"]',
            notes:
              "30x46 bezel, 8px radius. Two paddle halves; the active end presses in, and the I end glows mauve when checked.",
          },
          {
            name: ".choice:has(:disabled)",
            notes:
              "Opacity .5 and not-allowed cursor on the whole label. No extra class.",
          },
        ]}
      />
    </Doc>
  );
}
