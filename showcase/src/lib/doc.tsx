/* ── page-building kit ──────────────────────────────────────────────────────
   Every docs page composes these four pieces. Pages put pure system markup
   (cn-* utilities + recipes) inside <Demo>; the kit owns all sc- chrome.

   Per R5, <Demo> renders children DIRECTLY on the page's --base ground.
   No well/mantle stage, so neumorphic depth reads correctly.     */

import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

/* Semantic tones, canonical order (matches the .cn-tone-* setters). */
export const TONES = ["red", "green", "peach", "yellow", "blue", "mauve"] as const;

export type Tone = (typeof TONES)[number];

export interface Accent {
  name: string;
  color: string;
}

/* The accent cycle (R6): assign hex to `--accent` inline from data. */
export const ACCENTS: Accent[] = [
  { name: "mauve", color: "#cba6f7" },
  { name: "teal", color: "#94e2d5" },
  { name: "yellow", color: "#f9e2af" },
  { name: "blue", color: "#89b4fa" },
  { name: "peach", color: "#fab387" },
  { name: "pink", color: "#f5c2e7" },
];

interface CopyLineProps {
  text: string;
  block?: boolean;
}

/* Click-to-copy code line (internal; Demo and CodeBlock render it). */
function CopyLine({ text, block }: CopyLineProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const done = () => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1200);
    };
    if (navigator.clipboard?.writeText) {
      navigator.clipboard.writeText(text).then(done, () => {});
    }
  }

  return (
    <button
      type="button"
      class={`cn-code cn-edge-dashed cn-r-chip sc-snippet${block ? " sc-snippet-block" : ""}${copied ? " is-copied" : ""}`}
      onClick={copy}
      title="Copy"
    >
      {block ? <pre>{text}</pre> : <span>{text}</span>}
      <span class="cn-microlabel sc-snippet-hint" aria-live="polite">
        {copied ? "copied" : "copy"}
      </span>
    </button>
  );
}

/**
 * Doc: the page wrapper. One per page, at the top of the default export.
 * props: { title: string, lede?: string, children }
 */
export interface DocProps {
  title: string;
  lede?: string;
  children?: ComponentChildren;
}

export function Doc({ title, lede, children }: DocProps) {
  return (
    <article class="sc-doc page-enter">
      <header class="sc-doc-header">
        <h1 class="cn-display-sm">{title}</h1>
        {lede ? <p class="cn-lede">{lede}</p> : null}
      </header>
      {children}
    </article>
  );
}

/**
 * Demo: a captioned specimen stage. Children sit directly on --base (R5).
 * props: {
 *   title?: string,     // .cn-label caption above the stage
 *   classes?: string,   // class string shown in a copyable code line below
 *   row?: boolean,      // lay children out as a centered wrapping flex row
 *   children,
 * }
 */
export interface DemoProps {
  title?: string;
  classes?: string;
  row?: boolean;
  children?: ComponentChildren;
}

export function Demo({ title, classes, row, children }: DemoProps) {
  return (
    <figure class="sc-demo">
      {title ? <figcaption class="cn-label">{title}</figcaption> : null}
      <div class={`sc-demo-stage${row ? " sc-demo-row" : ""}`}>{children}</div>
      {classes ? <CopyLine text={classes} /> : null}
    </figure>
  );
}

/**
 * Props: a variants/knobs documentation table (renders .table-neu).
 * props: {
 *   title?: string,
 *   rows: Array<{ name: string, values?: string, default?: string, notes?: string }>,
 * }
 * `name` is the class / custom property / attribute being documented.
 */
export interface PropsRow {
  name: string;
  values?: string;
  default?: string;
  notes?: string;
}

export interface PropsProps {
  title?: string;
  rows: PropsRow[];
}

export function Props({ title, rows }: PropsProps) {
  return (
    <section class="sc-props">
      {title ? <h2 class="cn-label">{title}</h2> : null}
      <div class="sc-props-scroll">
        <table class="table-neu">
          <thead>
            <tr>
              <th>Name</th>
              <th>Values</th>
              <th>Default</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td data-label="Name" class="cell-name">
                  <code class="cn-code">{r.name}</code>
                </td>
                <td data-label="Values">{r.values ?? "·"}</td>
                <td data-label="Default">{r.default ?? "·"}</td>
                <td data-label="Notes">{r.notes ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/**
 * CodeBlock: a copyable multi-line html/CSS snippet.
 * props: { code: string, title?: string }
 */
export interface CodeBlockProps {
  code: string;
  title?: string;
}

export function CodeBlock({ code, title }: CodeBlockProps) {
  return (
    <section class="sc-codeblock">
      {title ? <h2 class="cn-label">{title}</h2> : null}
      <CopyLine text={code} block />
    </section>
  );
}
