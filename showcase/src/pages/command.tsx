import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const MARKUP = `<div class="command">
  <code class="command-text"><span class="command-prompt">$</span>npx salt scan .</code>
  <button type="button" class="btn-icon command-copy" aria-label="Copy command">
    <svg class="copy-glyph" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="6" y="6" width="9" height="9" rx="2"/><path d="M12 6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/></svg>
    <svg class="done-glyph" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 9.5 3.5 3.5L14 6"/></svg>
  </button>
</div>`;

const JS = `// one delegated listener; the recipe swaps the glyph and tints on .is-copied
document.addEventListener("click", (e) => {
  const btn = e.target.closest(".command-copy");
  if (!btn) return;
  const cmd = btn.closest(".command");
  navigator.clipboard.writeText(cmd.querySelector(".command-text").textContent.replace(/^\\$\\s*/, "")).then(() => {
    cmd.classList.add("is-copied");
    setTimeout(() => cmd.classList.remove("is-copied"), 1400);
  });
});`;

function Command({ text, full }: { text: string; full?: boolean }) {
  const [copied, setCopied] = useState(false);
  function copy() {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1400); };
    if (navigator.clipboard?.writeText) navigator.clipboard.writeText(text).then(done, () => {});
    else done();
  }
  return (
    <div class={`command${full ? " is-full" : ""}${copied ? " is-copied" : ""}`}>
      <code class="command-text"><span class="command-prompt">$</span>{text}</code>
      <button type="button" class="btn-icon command-copy" aria-label="Copy command" onClick={copy}>
        <svg class="copy-glyph" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round"><rect x="6" y="6" width="9" height="9" rx="2" /><path d="M12 6V4a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2" /></svg>
        <svg class="done-glyph" viewBox="0 0 18 18" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m4 9.5 3.5 3.5L14 6" /></svg>
      </button>
    </div>
  );
}

export default function CommandPage() {
  return (
    <Doc
      title="Command"
      lede="A copyable command line: a carved crust well, one command in mono, a prompt glyph, and a trailing icon button that copies it and goes green for a moment."
    >
      <Demo title="The command" classes="command · command-text · command-prompt · command-copy">
        <Command text="npx catppuccin-neu-sync public/styles" />
      </Demo>

      <p class="cn-copy">
        Mono is earned here: it is a command. The well is the terminal's
        stuff, carved with the full inset and filled with the crust mix, so it
        reads as something you reach into and take. The copy control is the
        icon button with <code class="cn-code">--tone</code> set to mauve, the
        page's one accent; the recipe never uses a worded "Copy" button beside
        a command, because the command is the thing being read.
      </p>

      <Demo title="Full width" classes="command is-full">
        <div style="width:100%">
          <Command text="pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.3.0" full />
        </div>
      </Demo>

      <Props
        title="Contract"
        rows={[
          { name: ".command", values: "div", notes: "min(480px, 100%) wide, 48px tall, 13px radius, crust-mix fill on --neu-inset." },
          { name: ".command.is-full", values: "modifier", notes: "Fills its container." },
          { name: ".command.is-wrap", values: "modifier", notes: "A long statement wraps instead of scrolling; the text becomes a block so inline spans inside it keep their whitespace." },
          { name: ".command-text", values: "code", notes: "650 13px mono, tabular, scrolls sideways without a scrollbar when the command is longer than the well." },
          { name: ".command-prompt", values: "span", notes: "The $ in mauve, unselectable so a copy never carries it." },
          { name: ".command-copy", values: "button.btn-icon", notes: "Both glyphs in the markup; .copy-glyph shows at rest, .done-glyph while the command is .is-copied." },
          { name: ".is-copied", values: "state on .command", notes: "Set by the consumer for the moment after a copy; the control goes green." },
        ]}
      />

      <CodeBlock title="Markup" code={MARKUP} />
      <CodeBlock title="The copy (consumer code)" code={JS} />
    </Doc>
  );
}
