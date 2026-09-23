/* ── page-building kit ──────────────────────────────────────────────────────
   Every docs page composes these four pieces. Pages put pure system markup
   (cn-* utilities + recipes) inside <Demo>; the kit owns all sc- chrome.

   <Demo> renders children directly on the page's --base ground, with no
   well or mantle stage, so neumorphic depth reads correctly.             */

import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";

/* Semantic tones, in the order of the .cn-tone-* setters. */
export const TONES = ["red", "green", "peach", "yellow", "blue", "mauve"] as const;

export type Tone = (typeof TONES)[number];

/* Accent hexes by name. */
export const ACCENT = {
  mauve: "#cba6f7",
  teal: "#94e2d5",
  yellow: "#f9e2af",
  blue: "#89b4fa",
  peach: "#fab387",
  pink: "#f5c2e7",
} as const;

export type AccentName = keyof typeof ACCENT;

/* Demo records. Each one stores its accent with the rest of its data, so a
   team or a person wears the same color on every page that shows it. */
export interface Team {
  name: string;
  accent: AccentName;
  meta: string;
  revenue: string;
}

export const TEAMS: Team[] = [
  { name: "Payments", accent: "teal", meta: "12 members · 4 open invoices", revenue: "$48,210" },
  { name: "Analytics", accent: "blue", meta: "6 members · 3 dashboards", revenue: "$31,876" },
  { name: "Messaging", accent: "pink", meta: "18 members · 92 threads", revenue: "$18,455" },
  { name: "Storage", accent: "yellow", meta: "4 members · 1.2 TB used", revenue: "$12,730" },
  { name: "Identity", accent: "mauve", meta: "9 members · 2 policies", revenue: "$10,388" },
  { name: "Support", accent: "peach", meta: "14 members · 7 queues", revenue: "$9,102" },
];

export interface Person {
  initials: string;
  name: string;
  accent: AccentName;
}

export const PEOPLE: Person[] = [
  { initials: "NR", name: "Nadia Rahman", accent: "mauve" },
  { initials: "TS", name: "Tomas Silva", accent: "teal" },
  { initials: "AK", name: "Aya Kato", accent: "yellow" },
  { initials: "JL", name: "Jon Lindqvist", accent: "blue" },
  { initials: "MD", name: "Mara Diaz", accent: "peach" },
  { initials: "EO", name: "Efe Okafor", accent: "pink" },
];

/* Inline style for a record's accent. */
export const accentStyle = (a: AccentName) => `--accent:${ACCENT[a]}`;

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
        <h1 class="cn-display is-sm">{title}</h1>
        {lede ? <p class="cn-lede">{lede}</p> : null}
      </header>
      {children}
    </article>
  );
}

/**
 * Demo: a captioned specimen stage. Children sit directly on --base.
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
 * Props: a variants/knobs documentation table (renders .data-table).
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
        <table class="data-table">
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
