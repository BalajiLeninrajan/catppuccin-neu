import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

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
      lede="The deepest well in the system. Crust ground, full inset shadow, no border, and the one place the mono face appears outside .cn-code."
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
          style="--accent:#94e2d5;width:min(560px,100%)"
        >
          <pre>
            {"$ app status\nall services healthy\n$ "}
            <span class="caret" />
          </pre>
        </div>
      </Demo>

      <p class="cn-copy">
        The blinking caret is a plain <code class="cn-code">span.caret</code>{" "}
        filled with <code class="cn-code">var(--accent)</code>, mauve by
        default, re-keyed inline like every other accent-aware recipe. The
        blink stops under reduced motion.
      </p>

      <Demo title="Inside a panel" classes="panel > terminal">
        <div class="panel" style="width:min(560px,100%)">
          <div class="panel-heading">
            <h2>Deploy log</h2>
            <span class="chip">
              <span class="live-dot" /> streaming
            </span>
          </div>
          <div style="padding:18px">
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
        A raised panel around the deep-inset terminal is the strongest depth
        contrast the system allows. Use the pairing when the log is the point
        of the page.
      </p>

      <Props
        title="Terminal classes"
        rows={[
          {
            name: ".terminal",
            values: "surface",
            notes:
              "Crust ground, full neu-inset, 10px radius, borderless. Column flex; the pre stretches.",
          },
          {
            name: ".terminal pre",
            values: "content",
            notes:
              "500 11px/1.65 var(--mono). Wraps; scrolls on overflow.",
          },
          {
            name: ".terminal .caret",
            values: "cursor",
            default: "--accent: var(--mauve)",
            notes: "6×14px block, accent fill, .75s step blink.",
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
