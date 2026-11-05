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
      lede="Text inputs, selects and textareas are carved wells. The background stays transparent and one dark inner wall presses the well into the parent ground. Hover and focus ring it."
    >
      <p class="cn-copy">
        An input never paints its own background, so it is carved from
        whatever it sits on.
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

      <p class="cn-copy">
        Focus adds no border: the outline stands off the carve, so the field
        never shifts or reflows on focus. Labels are small sentence-case sans.
        Values are sans with tabular numerals, so amounts and dates align in
        forms the same way they do in tables.
      </p>

      <h2 class="cn-title">The carve at rest</h2>
      <p class="cn-copy">
        A carve is darkness only. The field's wall falls from the top left and
        its bottom and right walls fade into the ground with no light lip,
        because a bright line there reads as a bevel. At rest a field has no
        edge: its label above and the dark well under the label identify it.
        Once the reader reaches for it the bounds show, as a full ring on hover
        and the focus ring on focus. Always give a field a visible label; a
        field in a table cell has none, so it takes the{" "}
        <a href="/table">inline edit</a> instead.
      </p>

      <Demo title="On the page and on a panel" classes="--cn-field-ring · --cn-field-hover-ring">
        <div class="sc-grid" style="width:100%">
          <input class="input" type="text" placeholder="On base" aria-label="Field on base" />
          <div class="panel panel-body">
            <input class="input" type="text" placeholder="On a panel" aria-label="Field on a panel" />
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        A placeholder sits on the floor for readable text, help text a stop
        above it and the label a stop above that. The value is full text
        color, so a filled field never reads as an empty one. A placeholder is
        an example, never the only copy of an instruction.
      </p>

      <Demo title="Bare input" classes="input">
        <div class="sc-grid">
          <input
            class="input"
            type="text"
            placeholder="Invoice reference, e.g. INV-2041"
          />
        </div>
        <p class="cn-copy">
          Outside a <code class="cn-code-inline">.field</code>, put{" "}
          <code class="cn-code-inline">.input</code> on the element itself. Same well,
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
          on the overlay fill. A hovered option takes{" "}
          <code class="cn-code-inline">--hover</code>, like a menu row, and the
          checked option sits on <code class="cn-code-inline">--wash</code> with a mauve
          checkmark. An option under keyboard focus also draws the 2px
          focus ring, inset 2px, the same indicator as a menu row.
          Elsewhere the OS picker stays.
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
          The hero variant: 58px tall, the card radius, 18px type. One per page.
        </p>
      </Demo>

      <Demo title="Icon input" classes="input-icon">
        <div class="sc-grid">
          <div class="input-icon">
            <MagnifierIcon />
            <input class="input" type="search" placeholder="Search invoices" aria-label="Search invoices" />
          </div>
        </div>
        <p class="cn-copy">
          <code class="cn-code-inline">.input-icon</code> is a positioning wrapper: it
          absolutely places a leading 18px icon and pads the input to clear it.
          The icon sits in <code class="cn-code-inline">--cn-fg-faint</code> (overlay-1) and ignores
          pointer events, so clicks land in the field.
        </p>
      </Demo>

      <Demo title="Focus" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" placeholder="Click or tab into me" aria-label="Focus demo" />
        </div>
        <p class="cn-copy">
          Focus is the global outline: 2px of{" "}
          <code class="cn-code-inline">--cn-focus</code> (text) standing 3px
          off the carve, over the unchanged inset. Fields take it on{" "}
          <code class="cn-code-inline">:focus</code>, so a click shows it as well
          as a tab, since typing follows either way. No border appears and
          nothing moves. Focus differs from the engaged rim by hue and by
          shape: a neutral 2px ring off the edge against 1px of mauve on it.
        </p>
      </Demo>

      <Demo title="Validation" classes='field > [aria-invalid="true"] / field is-warning'>
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
        <p class="cn-copy">
          Error state keys on <code class="cn-code-inline">aria-invalid="true"</code>{" "}
          on the control, so the attribute screen readers announce is also
          the style hook. A warning uses <code class="cn-code-inline">.is-warning</code>{" "}
          on the field. Either state sets <code class="cn-code-inline">--tone</code>,
          washes the well in it at 4%, and draws a full 1px ring in the tone
          at rest,{" "}
          <code class="cn-code-inline">inset 0 0 0 1px var(--tone)</code>, so
          the field itself changes. The carve stays. The message is a
          sentence, so it moves up to body text, and only its leading glyph
          takes the tone, as on a banner: the crossed circle of{" "}
          <code class="cn-code-inline">--cn-glyph-danger</code> or the
          triangle of <code class="cn-code-inline">--cn-glyph-warning</code>,
          drawn in CSS and never read aloud, so the two states differ by shape
          as well as by hue. An error is red; a warning is yellow,{" "}
          <code class="cn-code-inline">--cn-warning</code>. Focus keeps the
          text-colored outline over the ring. Point{" "}
          <code class="cn-code-inline">aria-describedby</code> from the control
          at its <code class="cn-code-inline">small</code>, so the message is
          read with the field.
        </p>
      </Demo>

      <Demo title="Disabled" classes="input">
        <div class="sc-grid">
          <input class="input" type="text" value="ACME-2041 (locked)" aria-label="Account code" disabled />
        </div>
        <p class="cn-copy">
          Use the native attribute. The carve nearly fills in to the soft
          inset, hover draws no ring, and the text and label drop to{" "}
          <code class="cn-code-inline">--cn-fg-disabled</code> (overlay-1, 4.4:1 on the
          page and on a panel). There is
          no opacity on top. The browser only blocks input.
        </p>
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
        <p class="cn-copy">
          A <code class="cn-code-inline">readonly</code> field holds a value
          the reader can select and copy but not change. It reads as printed
          text: no carve and no fill, square corners, and an{" "}
          <code class="cn-code-inline">--edge</code> rule underneath, with the
          value in <code class="cn-code-inline">--cn-fg-soft</code>. Only an
          editable field looks cut in. It still takes focus, and focus still
          rings it at the control radius, like every other field. Use <code class="cn-code-inline">disabled</code>{" "}
          for a value that is unavailable, and{" "}
          <code class="cn-code-inline">readonly</code> for one that is fixed.
        </p>
      </Demo>

      <Props
        title="Classes & knobs"
        rows={[
          {
            name: ".field",
            values: "wrapper around label + input/select/textarea",
            notes:
              "Styles its label (small sentence-case sans in --cn-fg-soft, subtext-1, 9.3:1 on base) and any native control inside it.",
          },
          {
            name: ".input",
            values: "on a bare input",
            notes:
              "The carved well: one dark wall, --neu-inset (inset 3px 3px 8px of crust halfway to black), no edge at rest, a --control-edge ring on hover. Sans 500 14px in --cn-fg, tabular numerals for amounts and dates.",
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
            name: '[aria-invalid="true"] / .is-warning',
            values: "on the control / on .field or a bare .input",
            notes:
              "Red (--cn-danger) or yellow (--cn-warning). The well takes the tone at --cn-step-tint (4%) and a 1px ring in the tone at rest, inset 0 0 0 1px var(--tone), which hover keeps. The carve stays. The label keeps --cn-fg-soft; the small moves up to --cn-fg-body and leads with --cn-glyph-danger or --cn-glyph-warning in the tone. Focus keeps the --cn-focus outline. Disabled text and label take the disabled color over the tone.",
          },
          {
            name: "[readonly]",
            values: "on an input or textarea",
            notes: "Printed text: transparent, no carve, square corners, a 1px --edge rule underneath, the value in --cn-fg-soft. Focus still rings it, at the control radius.",
          },
          {
            name: ":disabled",
            values: "on the control",
            notes: "--cn-fg-disabled text, placeholder and label (overlay-1, 4.4:1 on base; overlay-2 under prefers-contrast), --neu-inset-soft, no opacity.",
          },
          {
            name: ":focus",
            values: "on the control",
            notes: "The global outline, 2px --cn-focus at a 3px offset, on pointer and keyboard focus: 11.3:1 on base. No box-shadow ring.",
          },
          {
            name: "--cn-field-ring",
            values: "box-shadow",
            default: "inset 0 0 0 1px transparent",
            notes: "The resting ring. Paints nothing by default, so a resting field is its carve and its label. A full overlay-2 ring under prefers-contrast: more, 5.8:1 on base and raised, 4.6:1 on an overlay.",
          },
          {
            name: "--cn-field-hover-ring",
            values: "box-shadow",
            default: "inset 0 0 0 1px var(--control-edge)",
            notes: "Swapped in for --cn-field-ring on hover, not on a disabled field: overlay-1, 4.4:1 on base and raised, 3.5:1 on an overlay. A validation ring and a read-only rule keep their own shadow.",
          },
          {
            name: "::placeholder",
            values: "--cn-fg-placeholder",
            notes: "overlay-2: 5.8:1 on base and raised, 4.6:1 on an overlay. subtext-0 under prefers-contrast: more. --cn-fg-disabled on a disabled field.",
          },
          {
            name: ".field small",
            values: "helper or message line",
            notes: "The meta role under the control in --cn-fg-muted (subtext-0, 7.4:1 on base). In an error or warning it moves up to --cn-fg-body and leads with the 12px glyph in the tone. Link it with aria-describedby.",
          },
          {
            name: "--control-h",
            values: "length",
            default: "46px (2.875rem)",
            notes: "Height of inputs, selects and buttons. It is rem, so a larger browser font size grows the field with its text. Cozy density sets 38px, compact 28px.",
          },
        ]}
      />

      <CodeBlock title="Markup" code={FIELD_SNIPPET} />
    </Doc>
  );
}
