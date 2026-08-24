import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const SHELL_SNIPPET = `$ pnpm install
$ pnpm build
dist/index.html   2.1 kB
dist/assets/app.js  41.7 kB`;

const WRAP_SNIPPET = `curl -s https://api.example.com/v1/workspaces/ws_8f2a91c4/exports?format=csv&range=2026-01..2026-06&include=invoices,seats,usage -H "Authorization: Bearer sk_live_51NxT..."`;

const LONG_SNIPPET = `# deploy.log
[10:41:02] build started
[10:41:09] tsc: 0 errors
[10:41:14] vite: 18 modules transformed
[10:41:15] dist/index.html   2.1 kB
[10:41:15] dist/assets/app.js  41.7 kB
[10:41:16] upload: 6 files
[10:41:19] cache: purged 2 routes
[10:41:20] health: 200 in 84 ms
[10:41:20] deploy live at v2.4.1
[10:41:21] notified #releases`;

export default function CodeblockPage() {
  return (
    <Doc
      title="Code block"
      lede="A carved well for snippets. Mono 500 12px on a 1.75 line height, and besides the terminal this is the only surface that sets the mono face."
    >
      <Demo title="Code block" classes="codeblock > pre">
        <div class="codeblock" style="width:min(560px,100%)">
          <pre>{SHELL_SNIPPET}</pre>
        </div>
      </Demo>

      <Demo title="Numbered lines" classes="codeblock is-numbered">
        <div class="codeblock is-numbered" style="width:min(560px,100%)">
          <pre>
            <span><span class="tok-keyword">const</span> <span class="tok-fn">total</span> = seats * <span class="tok-number">12</span>;</span>
            <span><span class="tok-keyword">if</span> (total &gt; <span class="tok-number">40</span>) notify(<span class="tok-string">"#billing"</span>);</span>
            <span><span class="tok-comment">// invoices send on the 1st</span></span>
            <span>send(invoice, owner);</span>
          </pre>
        </div>
      </Demo>

      <p class="cn-copy">
        Add <code class="cn-code">.is-numbered</code> and wrap each line in its
        own element inside the <code class="cn-code">pre</code>. CSS counters
        draw the gutter; no JS. The colors come from the five{" "}
        <code class="cn-code">.tok-*</code> classes. Producing those spans is a
        tokenizer's job (shiki, prism, or your build), the system only supplies
        the palette.
      </p>

      <Demo title="Long lines wrap" classes="codeblock > pre">
        <div class="codeblock" style="width:min(560px,100%)">
          <pre>{WRAP_SNIPPET}</pre>
        </div>
      </Demo>

      <p class="cn-copy">
        The <code class="cn-code">pre</code> sets{" "}
        <code class="cn-code">white-space: pre-wrap</code> and{" "}
        <code class="cn-code">overflow-wrap: anywhere</code>, so long commands
        break at the well edge instead of forcing a horizontal scroll.
      </p>

      <Demo
        title="Scrolling"
        classes="codeblock scroll-well  (max-height + overflow-y)"
      >
        <div
          class="codeblock scroll-well"
          style="width:min(560px,100%);max-height:140px;overflow-y:auto"
        >
          <pre>{LONG_SNIPPET}</pre>
        </div>
      </Demo>

      <p class="cn-copy">
        For long content, cap the well with a{" "}
        <code class="cn-code">max-height</code> and{" "}
        <code class="cn-code">overflow-y: auto</code>, and compose{" "}
        <code class="cn-code">.scroll-well</code> for the quiet scrollbar. The
        copy line under each demo on this site is docs chrome, not part of the
        recipe. Copying to the clipboard needs consumer JS.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div class="codeblock">
  <pre>$ pnpm build</pre>
</div>

<!-- capped and scrolling -->
<div class="codeblock scroll-well" style="max-height: 140px; overflow-y: auto">
  <pre>...</pre>
</div>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".codeblock",
            notes:
              "Inset well, 10px radius, 14px 16px padding. Transparent ground, carved from the parent surface.",
          },
          {
            name: ".is-numbered",
            values: "one element per line inside the pre",
            notes: "CSS counters draw a 22px right-aligned overlay-0 gutter.",
          },
          {
            name: ".tok-keyword / -string / -number / -fn / -comment",
            values: "spans from your tokenizer",
            notes: "blue / green / peach / mauve / overlay-0 italic.",
          },
          {
            name: ".codeblock pre",
            notes:
              "Inherits the mono face, pre-wrap plus overflow-wrap: anywhere, zero margin.",
          },
          {
            name: ".scroll-well",
            notes:
              "Composed for scrolling blocks. Pair with max-height and overflow-y: auto inline or in the consumer.",
          },
        ]}
      />
    </Doc>
  );
}
