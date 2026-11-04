import { useState } from "preact/hooks";
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

const CopyGlyph = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" aria-hidden="true">
    <rect x="6" y="6" width="9" height="9" rx="2" />
    <path d="M12 6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" />
  </svg>
);
const DoneGlyph = () => (
  <svg viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="m4 9.5 3.5 3.5L14 6" />
  </svg>
);

/* The copy control holds .is-copied for a moment after a copy, which
   turns it green; the glyph swaps to a check while it does. */
function CopyableBlock() {
  const [copied, setCopied] = useState(false);

  function copy(e: MouseEvent) {
    const block = (e.currentTarget as HTMLElement).closest(".codeblock");
    const text = block?.querySelector("pre")?.innerText ?? "";
    navigator.clipboard?.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    });
  }

  return (
    <div class="codeblock" style="width:min(560px,100%)">
      <pre>npx catppuccin-neu-sync public/styles</pre>
      <button
        type="button"
        class={`btn is-icon${copied ? " is-copied" : ""}`}
        aria-label={copied ? "Copied" : "Copy"}
        onClick={copy}
      >
        {copied ? <DoneGlyph /> : <CopyGlyph />}
      </button>
    </div>
  );
}

export default function CodeblockPage() {
  return (
    <Doc
      title="Code block"
      lede="A carved well for snippets, in mono 500 13px on a 1.6 line height. It shares its radius, fill, lip and type with the terminal and the command."
    >
      <Demo title="Code block" classes="codeblock > pre">
        <div class="codeblock" style="width:min(560px,100%)">
          <pre>{SHELL_SNIPPET}</pre>
        </div>
      </Demo>

      <Demo title="With a copy control" classes="codeblock > btn is-icon · .is-copied">
        <CopyableBlock />
      </Demo>

      <p class="cn-copy">
        Put a <code class="cn-code-inline">.btn.is-icon</code> as a direct child. The
        recipe pins it to the corner and pads the code clear of it. Copying is
        one delegated listener. Hold <code class="cn-code-inline">.is-copied</code>{" "}
        on the button for a moment after the copy and it turns green, the
        same signal as the <a href="/command">command</a>'s copy control.
      </p>

      <CodeBlock
        title="Copy listener"
        code={`document.addEventListener("click", (e) => {
  const btn = e.target.closest(".codeblock > .btn.is-icon");
  if (!btn) return;
  const text = btn.closest(".codeblock").querySelector("pre").innerText;
  navigator.clipboard.writeText(text).then(() => {
    btn.classList.add("is-copied");
    setTimeout(() => btn.classList.remove("is-copied"), 1200);
  });
});`}
      />

      <Demo title="Numbered lines" classes="codeblock is-numbered">
        <div class="codeblock is-numbered" style="width:min(560px,100%)">
          <pre>
            <span>$ pnpm install</span>
            <span>$ pnpm build</span>
            <span>dist/index.html   2.1 kB</span>
            <span>dist/assets/app.js  41.7 kB</span>
          </pre>
        </div>
      </Demo>

      <p class="cn-copy">
        Add <code class="cn-code-inline">.is-numbered</code> and wrap each line in its
        own element inside the <code class="cn-code-inline">pre</code>.
      </p>

      <Demo title="Syntax colors" classes="codeblock + .tok-*">
        <div class="codeblock" style="width:min(560px,100%)">
          <pre><span class="tok-keyword">const</span> <span class="tok-fn">total</span> = seats * <span class="tok-number">12</span>;{"\n"}<span class="tok-keyword">if</span> (total &gt; <span class="tok-number">40</span>) notify(<span class="tok-string">"#billing"</span>); <span class="tok-comment">// monthly</span></pre>
        </div>
      </Demo>

      <p class="cn-copy">
        Ligatures are off in every mono well and in{" "}
        <code class="cn-code-inline">.cn-code</code>, so{" "}
        <code class="cn-code-inline">=&gt;</code>, <code class="cn-code-inline">!=</code> and{" "}
        <code class="cn-code-inline">&gt;=</code> stay two characters. Code reads and
        copies as typed.
      </p>

      <Demo title="No ligatures" classes="font-variant-ligatures: none">
        <div class="codeblock" style="width:min(560px,100%)">
          <pre><span class="tok-keyword">const</span> <span class="tok-fn">due</span> = (inv) =&gt; inv.days &gt;= <span class="tok-number">30</span> &amp;&amp; inv.status !== <span class="tok-string">"paid"</span>;</pre>
        </div>
      </Demo>

      <p class="cn-copy">
        The five <code class="cn-code-inline">.tok-*</code> classes work in any code
        block, numbered or not. Producing the spans is a tokenizer's job
        (shiki, prism, or your build); the system only supplies the palette.
      </p>

      <Demo title="Long lines wrap" classes="codeblock > pre">
        <div class="codeblock" style="width:min(560px,100%)">
          <pre>{WRAP_SNIPPET}</pre>
        </div>
      </Demo>

      <p class="cn-copy">
        The <code class="cn-code-inline">pre</code> sets{" "}
        <code class="cn-code-inline">white-space: pre-wrap</code> and{" "}
        <code class="cn-code-inline">overflow-wrap: anywhere</code>, so long commands
        break at the well edge instead of forcing a horizontal scroll.
      </p>

      <Demo
        title="Scrolling"
        classes="codeblock scroll-well  (max-height + overflow-y)"
      >
        <div
          class="codeblock scroll-well"
          style="width:min(560px,100%);max-height:140px;overflow-y:auto"
          tabIndex={0}
          role="region"
          aria-label="Build log"
        >
          <pre>{LONG_SNIPPET}</pre>
        </div>
      </Demo>

      <p class="cn-copy">
        For long content, cap the well with a{" "}
        <code class="cn-code-inline">max-height</code> and{" "}
        <code class="cn-code-inline">overflow-y: auto</code>, and compose{" "}
        <code class="cn-code-inline">.scroll-well</code> for the quiet scrollbar.
        Give the scroller <code class="cn-code-inline">tabindex="0"</code>, a
        region role and an aria-label, so a keyboard can scroll it.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div class="codeblock">
  <pre>$ pnpm build</pre>
</div>

<!-- capped and scrolling -->
<div class="codeblock scroll-well" style="max-height: 140px; overflow-y: auto"
     tabindex="0" role="region" aria-label="Build log">
  <pre>...</pre>
</div>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".codeblock",
            notes:
              "Inset well at the card radius (12px), --well-pad padding (12px 16px), the --cn-surface-sunken fill, --neu-inset with --cn-well-lip. Mono 500 13px/1.6 in --cn-fg-soft with ligatures off.",
          },
          {
            name: ".is-numbered",
            values: "one element per line inside the pre",
            notes: "A 3ch right-aligned gutter in --cn-fg-placeholder, so it scales with the font.",
          },
          {
            name: ".tok-keyword / -string / -number / -fn / -comment",
            values: "spans from your tokenizer",
            notes: "blue / green / peach / mauve / --cn-fg-muted (subtext-0) italic.",
          },
          {
            name: ".codeblock > .btn.is-icon",
            values: "optional copy control",
            notes:
              "Pinned to the corner, 26px; the block pads right to clear it. Wire with the copy listener.",
          },
          {
            name: ".codeblock > .btn.is-icon.is-copied",
            values: "state on the copy control",
            notes: "Turns the control green (--cn-success) while the consumer holds it.",
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
