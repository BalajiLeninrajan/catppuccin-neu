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
      lede="A carved log surface in mono."
    >
      <Demo title="Log surface with caret" classes="terminal / terminal .caret">
        <div class="terminal" style="width:min(560px,100%);height:230px">
          <pre class="scroll-well" tabIndex={0} role="region" aria-label="Deploy log">
            {LOG}
            <span class="caret" />
          </pre>
        </div>
      </Demo>

      <p class="cn-copy">
        Add <code class="cn-code-inline">.scroll-well</code> to the <code class="cn-code-inline">pre</code> so the scrollbar matches the dark ground.
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
        The caret takes <code class="cn-code-inline">--accent</code>, mauve by default.
      </p>

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".terminal", values: "surface", notes: "A carved well. The pre fills it, wraps and scrolls." },
          { name: ".terminal .caret", values: "span", default: "--accent: var(--mauve)", notes: "A blinking block cursor." },
          { name: ".scroll-well", values: "on the pre", notes: "The quiet scrollbar." },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<div class="terminal" style="height: 230px">
  <pre class="scroll-well" tabindex="0" role="region" aria-label="Deploy log">$ app deploy --env production
deployed v2.4.1 to production
$ <span class="caret"></span></pre>
</div>`}
      />
    </Doc>
  );
}
