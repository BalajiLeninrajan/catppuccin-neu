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
      lede="A copyable command line: a carved well, one command in mono, a prompt glyph, and an icon button that copies it and turns green for a moment."
    >
      <Demo title="The command" classes="command · command-text · command-prompt · command-copy">
        <Command text="npx catppuccin-neu-sync public/styles" />
      </Demo>

      <p class="cn-copy">
        The text is mono because it is a command. The well shares the
        terminal's full inset and crust-mix fill. The copy control is the icon
        button with <code class="cn-code">--tone</code> set to mauve. Use the
        icon, not a worded "Copy" button, so the command stays the thing the
        reader sees first.
      </p>

      <Demo title="Full width" classes="command is-full">
        <div style="width:100%">
          <Command text="pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.4.0" full />
        </div>
      </Demo>

      <Props
        title="Contract"
        rows={[
          { name: ".command", values: "div", notes: "min(480px, 100%) wide, 50px tall at every density, the card radius (12px), crust-mix fill on --neu-inset." },
          { name: ".command.is-full", values: "modifier", notes: "Fills its container." },
          { name: ".command.is-wrap", values: "modifier", notes: "A long statement wraps instead of scrolling; the text becomes a block so inline spans inside it keep their whitespace." },
          { name: ".command-text", values: "code", notes: "Mono 500 13px, tabular. Scrolls sideways with no scrollbar when the command is longer than the well." },
          { name: ".command-prompt", values: "span", notes: "The $ in mauve, unselectable so a copy never carries it." },
          { name: ".command-copy", values: "button.btn.is-icon", notes: "Both glyphs in the markup; .copy-glyph shows at rest, .done-glyph while the command is .is-copied." },
          { name: ".is-copied", values: "state on .command", notes: "Set by the consumer for a moment after a copy. The control turns green." },
        ]}
      />

      <CodeBlock title="Markup" code={MARKUP} />
      <CodeBlock title="The copy (consumer code)" code={JS} />
    </Doc>
  );
}
