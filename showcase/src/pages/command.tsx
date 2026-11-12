import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const MARKUP = `<div class="command">
  <code class="command-text"><span class="command-prompt">$</span>npx example init</code>
  <button type="button" class="btn is-icon command-copy" aria-label="Copy command">
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
      <button type="button" class="btn is-icon command-copy" aria-label="Copy command" onClick={copy}>
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
      lede="A copyable command line in a carved well."
    >
      <Demo title="The command" classes="command · command-text · command-prompt · command-copy">
        <Command text="npx catppuccin-neu-sync public/styles" />
      </Demo>

      <Demo title="Full width" classes="command is-full">
        <div style="width:100%">
          <Command text="pnpm add github:BalajiLeninrajan/catppuccin-neu#v2.0.1" full />
        </div>
      </Demo>

      <Props
        title="Classes"
        rows={[
          { name: ".command", values: "div", notes: "A carved well that holds one command." },
          { name: ".command.is-full", values: "modifier", notes: "Fills its container." },
          { name: ".command.is-wrap", values: "modifier", notes: "A long command wraps instead of scrolling." },
          { name: ".command-text", values: "code", notes: "The command." },
          { name: ".command-prompt", values: "span", notes: "The $. A copy never carries it." },
          { name: ".command-copy", values: "button.btn.is-icon", notes: "Holds .copy-glyph and .done-glyph." },
          { name: ".is-copied", values: "state on .command", notes: "Set it for a moment after a copy. The control turns green." },
        ]}
      />

      <CodeBlock title="Markup" code={MARKUP} />
      <CodeBlock title="The copy (consumer code)" code={JS} />
    </Doc>
  );
}
