import { useEffect, useRef, useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const INVOICES = ["INV-2041 · Northwind", "INV-2042 · Lumen Labs", "INV-2043 · Harbor & Co"];

/* A parent checkbox over three children. Some checked sets the parent
   indeterminate; clicking the parent checks or clears them all. */
function MixedDemo() {
  const [picked, setPicked] = useState([true, false, false]);
  const parent = useRef<HTMLInputElement>(null);
  const count = picked.filter(Boolean).length;
  const all = count === picked.length;

  useEffect(() => {
    if (parent.current) parent.current.indeterminate = count > 0 && !all;
  }, [count, all]);

  return (
    <div class="cn-stack cn-gap-12">
      <label class="choice">
        <input
          ref={parent}
          type="checkbox"
          class="checkbox"
          checked={all}
          onChange={() => setPicked(picked.map(() => !all))}
        />
        Select all invoices
      </label>
      <div class="cn-stack cn-gap-12" style="padding-left:28px">
        {INVOICES.map((name, i) => (
          <label class="choice" key={name}>
            <input
              type="checkbox"
              class="checkbox"
              checked={picked[i]}
              onChange={() => setPicked(picked.map((v, j) => (j === i ? !v : v)))}
            />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function SelectionPage() {
  return (
    <Doc
      title="Selection"
      lede="Checkbox, radio, and switch. Each is a restyled native input, so forms, keyboard, and focus behavior come for free."
    >
      <p class="cn-copy">
        Wrap control and text in <code class="cn-code-inline">label.choice</code>.
        These three are native inputs and need no script.
      </p>

      <Demo lead title="Checkbox" classes="label.choice > input.checkbox" why="The label, the hit target and the disabled state" row>
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
        The whole label is the hit target. When the input is disabled the
        control dims to <code class="cn-code-inline">--disabled-opacity</code>{" "}
        and the label text takes{" "}
        <code class="cn-code-inline">--cn-fg-disabled</code>, with no extra class.
      </p>

      <Demo title="Mixed" classes="input.checkbox:indeterminate" why="How to set the mixed state">
        <MixedDemo />
      </Demo>

      <p class="cn-copy">
        A parent row whose children are partly checked shows the mauve fill
        with a dash. There is no attribute for it. Set{" "}
        <code class="cn-code-inline">el.indeterminate = true</code> from script.
        A custom control keeps{" "}
        <code class="cn-code-inline">aria-checked="mixed"</code> instead.
      </p>


      <Demo title="Radio group" classes="fieldset > label.choice > input.radio" why="Grouping and the legend">
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
        Group radios in a <code class="cn-code-inline">fieldset</code> under one{" "}
        <code class="cn-code-inline">name</code>. Style the legend like a{" "}
        <code class="cn-code-inline">.field</code> label,{" "}
        <code class="cn-code-inline">.cn-label</code> is that same role.
      </p>

      <Demo title="Switch" classes="label.choice > input.switch" why="How the rocker shows off and on" row>
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
        The switch is a rocker paddle on a carved plate. The plate takes{" "}
        <code class="cn-code-inline">--cn-surface-sunken</code> and the paddle{" "}
        <code class="cn-code-inline">--cn-surface-raised</code>. Checking slides
        the paddle across, flips its tilt, lights it mauve with a glow and
        sets a crust bar at its center, so on reads by a mark as well as by
        color and position.
      </p>

      <Demo
        title="Disabled next to off"
        classes="input.switch:disabled · input.checkbox:disabled · input.radio:disabled"
        why="Why disabled never looks like off"
        row
      >
        <label class="choice">
          <input type="checkbox" class="switch" />
          Off
        </label>
        <label class="choice">
          <input type="checkbox" class="switch" disabled />
          Disabled
        </label>
        <label class="choice">
          <input type="checkbox" class="checkbox" disabled />
          Disabled
        </label>
        <label class="choice">
          <input type="radio" class="radio" name="disabled-radio" disabled />
          Disabled
        </label>
      </Demo>

      <p class="cn-copy">
        A disabled switch lies flat: the paddle loses its tilt and its raise,
        and the plate loses its sunken fill. An off switch still tilts and
        keeps its <code class="cn-code-inline">--control-edge</code>. A
        disabled checkbox and radio drop to{" "}
        <code class="cn-code-inline">--edge</code>. All three dim to{" "}
        <code class="cn-code-inline">--disabled-opacity</code>.
      </p>

      <Demo title="Error" classes='fieldset[aria-invalid="true"] + small[id]' why="Where to set the error and its message">
        <fieldset
          class="cn-stack cn-gap-12"
          style="margin:0;padding:0;border:0"
          aria-invalid="true"
          aria-describedby="demo-notify-msg"
        >
          <legend class="cn-label cn-tone-danger cn-text-tone" style="margin-bottom:var(--space-3)">
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
          <small id="demo-notify-msg" class="cn-meta cn-tone-danger cn-text-tone">
            Choose at least one recipient.
          </small>
        </fieldset>
      </Demo>

      <p class="cn-copy">
        Set <code class="cn-code-inline">aria-invalid="true"</code> on a
        checkbox or radio, or on the{" "}
        <code class="cn-code-inline">fieldset</code> that holds them. Each
        unchecked box takes a <code class="cn-code-inline">--cn-danger</code>{" "}
        edge. Put the message in a{" "}
        <code class="cn-code-inline">small</code> and point{" "}
        <code class="cn-code-inline">aria-describedby</code> at it. The red
        legend and message here are utilities.
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

      <h2 class="cn-title">Accessibility</h2>
      <p class="cn-copy">
        A checkbox, radio or switch is a native input and needs no script. A{" "}
        <a href="/input">listbox or combobox</a> is a custom widget and needs
        a keyboard model: <code class="cn-code-inline">listbox()</code> from{" "}
        <code class="cn-code-inline">catppuccin-neu/js</code>, or your own
        widget library.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".choice",
            values: "label",
            notes:
              "Inline flex row, 8px gap, sans 500 14px in --cn-fg-soft. Wraps control and text so the text toggles the input.",
          },
          {
            name: ".checkbox",
            values: 'input[type="checkbox"]',
            contrast: "Edge 4.4:1 on a panel, 4.8:1 on the page, 3.5:1 on an overlay",
            notes:
              "20px square well, 4px radius, a --control-edge border, overlay-1. Checked fills mauve and the crust check lands on the spring.",
          },
          {
            name: ".checkbox:indeterminate",
            values: "el.indeterminate = true",
            notes:
              "The checked mauve fill with a crust dash. Set from script on a parent whose children are partly checked.",
          },
          {
            name: ".radio",
            values: 'input[type="radio"]',
            notes:
              "20px round well with the same --control-edge border. Checked deepens the inset and presses in a 9px mauve dot.",
          },
          {
            name: ".switch",
            values: 'input[type="checkbox"]',
            contrast: "Plate fill 1.14:1 under a panel, 1.07:1 under the page · edges 4.4:1 on a panel",
            notes:
              "50 by 28px plate on the --cn-surface-sunken fill under --neu-inset. The paddle rests on --cn-surface-raised, tilted 16deg. Checked, it slides 23px on the spring, flips its tilt, takes the mauve ramp with a crust bar at its center and glows.",
          },
          {
            name: ":disabled",
            values: "on the input",
            notes:
              "Each control dims to --disabled-opacity (.7). Checkbox and radio edges drop to --edge. The switch paddle lies flat with no tilt and no raise.",
          },
          {
            name: ".choice:has(:disabled)",
            notes:
              "The label text takes --cn-fg-disabled and a not-allowed cursor. No extra class.",
          },
          {
            name: '[aria-invalid="true"]',
            values: "on a checkbox, a radio, or their fieldset",
            notes:
              "Edges each unchecked box in --cn-danger. Put the message in a small linked by aria-describedby.",
          },
        ]}
      />
    </Doc>
  );
}
