/* ── shared specimen helpers ────────────────────────────────────────────────
   Every section renders through these. Section files must not reinvent the
   panel/well/copy-line chrome — compose <Section> + <Specimen> and put pure
   system markup (cn-* utilities + recipes) inside the stage.               */

import { useState } from "preact/hooks";

/* Semantic tones, in the canonical order (matches .cn-tone-* setters). */
export const TONES = ["red", "green", "peach", "yellow", "blue", "mauve"];

/* The entity color cycle from SPEC (mauve, teal, yellow, blue, peach, pink). */
export const ENTITIES = [
  { name: "mauve", color: "#cba6f7" },
  { name: "teal", color: "#94e2d5" },
  { name: "yellow", color: "#f9e2af" },
  { name: "blue", color: "#89b4fa" },
  { name: "peach", color: "#fab387" },
  { name: "pink", color: "#f5c2e7" },
];

/**
 * Section wrapper — one per showcase section, the anchor target for the
 * topbar nav. Renders a `.panel` with a heading band and a padded body.
 *
 * props: { id: string, title: string, blurb?: string, children }
 */
export function Section({ id, title, blurb, children }) {
  return (
    <section id={id} class="panel sc-section">
      <div class="panel-heading">
        <h2 class="cn-title">{title}</h2>
        {blurb ? <p class="cn-copy">{blurb}</p> : null}
      </div>
      <div class="sc-section-body">{children}</div>
    </section>
  );
}

/**
 * Specimen — a captioned demo stage. Children render inside a `.well`
 * (inset stage); `classes` is shown beneath in a click-to-copy `.cn-code`
 * line with brief "copied" feedback.
 *
 * props: { title?: string, classes?: string, children }
 */
export function Specimen({ title, classes, children }) {
  const [copied, setCopied] = useState(false);

  function copy() {
    if (!classes) return;
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(classes).then(done, () => {});
    }
  }

  return (
    <figure class="sc-specimen">
      {title ? <figcaption class="cn-label">{title}</figcaption> : null}
      <div class="well sc-stage">{children}</div>
      {classes ? (
        <button
          type="button"
          class={`cn-code cn-edge-dashed cn-r-chip sc-copy${copied ? " is-copied" : ""}`}
          onClick={copy}
          title="Copy class string"
        >
          <span>{classes}</span>
          <span class="cn-microlabel sc-copy-hint" aria-live="polite">
            {copied ? "copied" : "copy"}
          </span>
        </button>
      ) : null}
    </figure>
  );
}

/**
 * ToneRow — render-prop helper: calls `children(tone)` once per semantic
 * tone name ("red" | "green" | "peach" | "yellow" | "blue" | "mauve") and
 * lays the results out in a wrapping row.
 *
 * props: { children: (tone: string) => JSX, tones?: string[] }
 */
export function ToneRow({ children, tones = TONES }) {
  return <div class="sc-row">{tones.map((tone) => children(tone))}</div>;
}

/**
 * EntityRow — render-prop helper: calls `children(color, name, index)` once
 * per entry of the six-color entity cycle and lays the results out in a
 * wrapping row. `color` is the hex to assign to `--entity-color` inline.
 *
 * props: { children: (color: string, name: string, index: number) => JSX,
 *          entities?: { name: string, color: string }[] }
 */
export function EntityRow({ children, entities = ENTITIES }) {
  return (
    <div class="sc-row">
      {entities.map((e, i) => children(e.color, e.name, i))}
    </div>
  );
}
