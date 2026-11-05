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
        The
        whole label is the hit target. When the input is disabled the
        control dims itself to{" "}
        <code class="cn-code-inline">--disabled-opacity</code> (.6) and the
        label text takes <code class="cn-code-inline">--cn-fg-disabled</code>,
        with no extra class. A disabled control dims the same way outside a{" "}
        <code class="cn-code-inline">.choice</code>.
      </p>

      <Demo title="Mixed" classes="input.checkbox:indeterminate">
        <MixedDemo />
      </Demo>

      <p class="cn-copy">
        A parent row whose children are partly checked shows the mauve fill
        with a dash. There is no attribute for it. Set{" "}
        <code class="cn-code-inline">el.indeterminate = true</code> from script
        whenever some but not all children are checked, and clear it when
        none or all are. Clicking the parent checks or clears every child. A
        custom control keeps <code class="cn-code-inline">aria-checked="mixed"</code>{" "}
        instead.
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
        Group radios in a <code class="cn-code-inline">fieldset</code> under one{" "}
        <code class="cn-code-inline">name</code>. Style the legend like a{" "}
        <code class="cn-code-inline">.field</code> label,{" "}
        <code class="cn-code-inline">.cn-label</code> is that same role.
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
        The switch is an abstract light switch: a carved wall plate holds a
        raised rocker paddle on <code class="cn-code-inline">--cn-surface-raised</code>.
        The off paddle carries a 1px{" "}
        <code class="cn-code-inline">--control-edge</code>, overlay-1 at 4.4:1 on
        the page and on a raised fill, and 3.5:1 on an overlay, so it reads
        as a control and not as a disabled one.
        Checking slides the paddle across, flips its tilt, lights it mauve,
        sets a 2 by 8px crust bar at its center, the "I" of a wall switch, and
        gives it a 6px glow of mauve at{" "}
        <code class="cn-code-inline">--cn-step-fill</code> (14%). Held while on,
        the glow blooms to 12px at{" "}
        <code class="cn-code-inline">--cn-step-plate</code> (25%). With the bar,
        on reads by a mark as well as by color and position.
      </p>

      <Demo title="Disabled next to off" classes="input.switch:disabled · input.checkbox:disabled · input.radio:disabled" row>
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
        and paddle and plate drop to the soft{" "}
        <code class="cn-code-inline">--edge</code>. An off switch still tilts,
        stands proud of the plate and keeps its 3:1{" "}
        <code class="cn-code-inline">--control-edge</code>, so the two never
        read as the same control. A disabled checkbox and radio drop to{" "}
        <code class="cn-code-inline">--edge</code> too. None of them is
        dashed, because dashed means an open slot. All three dim to{" "}
        <code class="cn-code-inline">--disabled-opacity</code>.
      </p>

      <Demo title="Error" classes='fieldset[aria-invalid="true"] + small[id]'>
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
        edge; a checked one keeps its fill. Put the message in a{" "}
        <code class="cn-code-inline">small</code> and point{" "}
        <code class="cn-code-inline">aria-describedby</code> at it, so the
        message is read with the group. The red legend and message here are
        utilities; the recipe colors only the boxes.
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
            notes:
              "20px square well, 4px radius, a --control-edge border: overlay-1, 4.4:1 on the page and raised, 3.5:1 on an overlay. Checked fills mauve and the crust check lands on the spring.",
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
            notes:
              "50 by 28px plate, 8px radius, a 1px --control-edge inset ring. The 21 by 22px paddle rests on --cn-surface-raised with its own 1px --control-edge, tilted 16deg. Checked, it slides 23px on the spring, flips its tilt, takes the mauve ramp with a 2 by 8px crust bar at its center and glows 6px at --cn-step-fill; held while on, 12px at --cn-step-plate.",
          },
          {
            name: ":disabled",
            values: "on the input",
            notes:
              "Each control dims to --disabled-opacity (.6). Checkbox and radio edges drop to --edge. The switch paddle lies flat with no tilt and no raise, and paddle and plate drop to --edge, the plate on the soft inset. No dashes.",
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
