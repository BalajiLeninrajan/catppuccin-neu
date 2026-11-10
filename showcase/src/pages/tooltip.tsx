import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function TooltipPage() {
  return (
    <Doc
      title="Tooltip"
      lede="A text bubble on hover and keyboard focus, set with data-tip."
    >

      <Demo title="Tooltip" classes="[data-tip] + aria-describedby · btn.is-icon[data-tip] + aria-label" row>
        <button
          type="button"
          class="btn btn-secondary"
          data-tip="Duplicates the dashboard with its filters"
          aria-describedby="tip-duplicate"
        >
          Duplicate
        </button>
        <span id="tip-duplicate" hidden>
          Duplicates the dashboard with its filters
        </span>
        <button type="button" class="btn is-icon" aria-label="Archive this view" data-tip="Archive this view">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
            aria-hidden="true"
          >
            <rect x="3" y="4" width="18" height="5" rx="1" />
            <path d="M5 9v10h14V9M10 13h4" />
          </svg>
        </button>
      </Demo>

      <p class="cn-copy">
        Put the text in <code class="cn-code-inline">data-tip</code>, not <code class="cn-code-inline">title</code>.
      </p>

      <p class="cn-copy">
        A screen reader does not read the bubble. On a labeled control, point <code class="cn-code-inline">aria-describedby</code> at an element that holds the same words. On an icon button, put them in <code class="cn-code-inline">aria-label</code>.
      </p>

      <p class="cn-copy">
        CSS alone does not hide a tip on Escape, which WCAG 1.4.13 asks for. Add the listener below. A touch screen has no hover, so a tooltip is never the only place a fact lives.
      </p>

      <CodeBlock
        title="Escape listener"
        code={`const undismiss = (e) => {
  const el = e.target.closest?.("[data-tip-dismissed]");
  if (el && !el.contains(e.relatedTarget)) el.removeAttribute("data-tip-dismissed");
};
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document.querySelectorAll("[data-tip]:is(:hover, :focus-visible, :has(:focus-visible))")
    .forEach((el) => el.setAttribute("data-tip-dismissed", ""));
});
document.addEventListener("pointerleave", undismiss, true);
document.addEventListener("focusout", undismiss, true);`}
      />

      <Props
        title="Attributes"
        rows={[
          { name: "[data-tip]", values: "any focusable element", notes: "A bubble above the element. Use it instead of title." },
          { name: "[data-tip-dismissed]", values: "set by the Escape listener", notes: "Hides the bubble." },
        ]}
      />
    </Doc>
  );
}
