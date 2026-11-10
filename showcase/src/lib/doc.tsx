/* The page kit: Doc, Demo, Props, CodeBlock and the demo records. Pages put
   package markup inside <Demo>; the kit owns the sc- chrome. */

import type { ComponentChildren } from "preact";
import { useState } from "preact/hooks";
import posthog from "posthog-js";

/* Ordered so no two warm hues sit side by side. */
export const TONES = ["red", "green", "peach", "blue", "yellow", "mauve"] as const;

export type Tone = (typeof TONES)[number];

/* Accent hexes by name. */
export const ACCENT = {
  teal: "#94e2d5",
  yellow: "#f9e2af",
  blue: "#89b4fa",
  peach: "#fab387",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  sapphire: "#74c7ec",
} as const;

export type AccentName = keyof typeof ACCENT;

/* Demo records. Each keeps one accent on every page that shows it. */
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

/* Click-to-copy code line. */
function CopyLine({ text, block }: CopyLineProps) {
  const [copied, setCopied] = useState(false);

  function copy() {
    const done = () => {
      posthog.capture("copy_command", {
        page: location.pathname,
        button: block ? "code_block" : "class_line",
      });
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
      class={`cn-code sc-snippet${block ? " sc-snippet-block" : ""}${copied ? " is-copied" : ""}`}
      onClick={copy}
    >
      {block ? <pre>{text}</pre> : <span>{text}</span>}
      <span class="btn-text sc-snippet-hint" aria-live="polite">
        {copied ? "Copied" : "Copy"}
      </span>
    </button>
  );
}

/** Doc: the page wrapper, one per page. */
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
 * Demo: a captioned specimen on the page ground.
 * props: {
 *   title?: string,     // caption above the stage
 *   classes?: string,   // class string shown in a copyable line below
 *   row?: boolean,      // lay children out as a wrapping row; the stage shrinks to them
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
    <figure class={`sc-demo${row ? " sc-demo-fit" : ""}`}>
      {title ? <figcaption class="cn-label">{title}</figcaption> : null}
      <div class={`sc-demo-stage${row ? " sc-demo-row" : ""}`}>{children}</div>
      {classes ? <CopyLine text={classes} /> : null}
    </figure>
  );
}

/**
 * Props: a table of classes, modifiers and custom properties.
 * rows: Array<{ name: string, values?: string, default?: string, notes?: string }>
 * Values and Default show only when a row fills them.
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
  const hasValues = rows.some((r) => r.values);
  const hasDefault = rows.some((r) => r.default);
  return (
    <section class="sc-props">
      {title ? <h2 class="cn-label">{title}</h2> : null}
      <div class="sc-props-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              {hasValues ? <th>Values</th> : null}
              {hasDefault ? <th>Default</th> : null}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td data-label="Name" class="cell-name">
                  {/* A single token never breaks at its hyphens. */}
                  <code class={`cn-code-inline${/\s/.test(r.name) ? "" : " cn-nowrap"}`}>{r.name}</code>
                </td>
                {hasValues ? <td data-label="Values">{r.values ?? "·"}</td> : null}
                {hasDefault ? <td data-label="Default">{r.default ?? "·"}</td> : null}
                <td data-label="Notes">{r.notes ?? ""}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

/** CodeBlock: a copyable multi-line snippet. */
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
