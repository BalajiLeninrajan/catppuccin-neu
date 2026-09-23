import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

const LOG = `$ app deploy --env production
  reading config          ok
  building assets         1.24s
  bundling client         0.82s
  uploading 214 files     3.02s
  provisioning routes     0.41s
  warming cache           0.18s
  running smoke checks    ok
deployed v2.4.1 to production
$ app logs --tail
12:04:11 GET /invoices            200  14ms
12:04:12 POST /messages           201  22ms
12:04:14 GET /teams/payments      200   9ms
12:04:15 GET /dashboard           200  31ms
$ `;

export default function TerminalPage() {
  return (
    <Doc
      title="Terminal"
      lede="A carved log surface in mono. It shares its radius, fill and type with the code block and the command."
    >
      <Demo title="Log surface with caret" classes="terminal / terminal .caret">
        <div class="terminal" style="width:min(560px,100%);height:230px">
          <pre class="scroll-well">
            {LOG}
            <span class="caret" />
          </pre>
        </div>
      </Demo>

      <p class="cn-copy">
        The <code class="cn-code">&lt;pre&gt;</code> fills the surface and
        scrolls on overflow; add <code class="cn-code">.scroll-well</code> so
        the scrollbar thumb matches the dark ground. Text wraps via{" "}
        <code class="cn-code">white-space: pre-wrap</code> and{" "}
        <code class="cn-code">overflow-wrap: anywhere</code>; there is no
        horizontal scroll.
      </p>

      <Demo title="Accent-keyed caret" classes="terminal  (caret reads --accent)">
        <div
          class="terminal"
          style={`${accentStyle(PAYMENTS.accent)};width:min(560px,100%)`}
        >
          <pre>
            {"$ app status --team payments\nall services healthy\n$ "}
            <span class="caret" />
          </pre>
        </div>
      </Demo>

      <p class="cn-copy">
        The blinking caret is a plain <code class="cn-code">span.caret</code>{" "}
        filled with <code class="cn-code">var(--accent)</code>, mauve by
        default. A terminal that belongs to one team takes that team's
        accent, here Payments' teal. The blink stops under reduced motion.
      </p>

      <Demo title="Inside a panel" classes="panel > terminal">
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-header">
            <h2>Deploy log</h2>
            <span class="chip">
              <span class="live-dot" /> streaming
            </span>
          </div>
          <div class="panel-body">
            <div class="terminal" style="height:150px">
              <pre class="scroll-well">
                {LOG}
                <span class="caret" />
              </pre>
            </div>
          </div>
        </div>
      </Demo>

      <p class="cn-copy">
        A raised panel around the carved terminal is the strongest depth
        contrast the system allows. Use it when the log is the point of the
        page.
      </p>

      <Props
        title="Terminal classes"
        rows={[
          {
            name: ".terminal",
            values: "surface",
            notes:
              "The shared recess fill, full neu-inset, the card radius (12px), no border. Column flex; the pre stretches.",
          },
          {
            name: ".terminal pre",
            values: "content",
            notes:
              "Mono 500 12px/1.6, --well-pad padding. Wraps; scrolls on overflow.",
          },
          {
            name: ".terminal .caret",
            values: "cursor",
            default: "--accent: var(--mauve)",
            notes: "6 by 14px block, accent fill, .75s step blink.",
          },
          {
            name: ".scroll-well",
            values: "on the pre",
            notes: "Dark-well scrollbar-color when the log scrolls.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="terminal" style="height: 230px">
  <pre class="scroll-well">$ app deploy --env production
deployed v2.4.1 to production
$ <span class="caret"></span></pre>
</div>`}
      />
    </Doc>
  );
}
