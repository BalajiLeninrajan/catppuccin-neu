/* ── page-building kit ──────────────────────────────────────────────────────
   Every docs page composes these four pieces. Pages put pure system markup
   (cn-* utilities + recipes) inside <Demo>; the kit owns all sc- chrome.

   <Demo> renders children directly on the page ground, mantle, with no
   well or panel stage, so neumorphic depth reads as it does in an app.

   Demos lead and prose folds. <Doc> collects every p.cn-copy that sits
   right before or right after a <Demo> and renders the run in a closed
   package .accordion under that demo, titled by the demo's `why` prop.
   A paragraph that must stay open goes under an h2 with no demo next to
   it, or takes a second class. Contrast ratios go in a Props row's
   `contrast` field, not in prose.                                          */

import { toChildArray } from "preact";
import type { ComponentChildren, VNode } from "preact";
import { useState } from "preact/hooks";
import posthog from "posthog-js";

/* The palette tones in a row order where no two warm hues sit side by
   side: peach and yellow are split by blue, red and peach by green. */
export const TONES = ["red", "green", "peach", "blue", "yellow", "mauve"] as const;

export type Tone = (typeof TONES)[number];

/* Accent hexes by name, in the data-series order (--cn-series-1..6). */
export const ACCENT = {
  teal: "#94e2d5",
  yellow: "#f9e2af",
  blue: "#89b4fa",
  peach: "#fab387",
  pink: "#f5c2e7",
  mauve: "#cba6f7",
  /* An identity hue, never a series: for a record beyond the six. */
  sapphire: "#74c7ec",
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

/**
 * Doc: the page wrapper. One per page, at the top of the default export.
 * props: { title: string, lede?: string, children }
 */
export interface DocProps {
  title: string;
  lede?: string;
  children?: ComponentChildren;
}

type Child = ReturnType<typeof toChildArray>[number];

const isNode = (c: Child): c is VNode => typeof c === "object" && c !== null;
const isDemo = (c: Child) => isNode(c) && c.type === Demo;
const isCopy = (c: Child) => isNode(c) && c.type === "p" && (c.props as { class?: string }).class === "cn-copy";

/* Moves each run of p.cn-copy beside a Demo into a Why fold under it. A
   run between two demos belongs to the one above it. */
function foldProse(children: ComponentChildren) {
  const kids = toChildArray(children);
  const out: Child[] = [];
  let i = 0;
  while (i < kids.length) {
    const lead: Child[] = [];
    let j = i;
    while (j < kids.length && isCopy(kids[j])) lead.push(kids[j++]);
    if (lead.length && j < kids.length && isDemo(kids[j])) i = j;
    else lead.length = 0;

    const kid = kids[i++];
    out.push(kid);
    if (!isDemo(kid)) continue;

    const run = lead;
    while (i < kids.length && isCopy(kids[i])) run.push(kids[i++]);
    if (run.length) out.push(<Why title={(kid as VNode<DemoProps>).props.why}>{run}</Why>);
  }
  return out;
}

export function Doc({ title, lede, children }: DocProps) {
  return (
    <article class="sc-doc page-enter">
      <header class="sc-doc-header">
        <h1 class="cn-display is-sm">{title}</h1>
        {lede ? <p class="cn-lede">{lede}</p> : null}
      </header>
      {foldProse(children)}
    </article>
  );
}

/**
 * Why: the closed fold under a Demo, the package's own details.accordion.
 * Doc builds it from the prose beside a Demo; a page can also place one.
 * props: { title?: string, children }
 */
export interface WhyProps {
  title?: string;
  children?: ComponentChildren;
}

export function Why({ title, children }: WhyProps) {
  return (
    <details class="accordion sc-why">
      <summary>{title ?? "Why"}</summary>
      <div class="fold">
        <div>{children}</div>
      </div>
    </details>
  );
}

/**
 * Demo: a captioned specimen stage. Children sit directly on the page ground.
 * props: {
 *   title?: string,     // caption above the stage: the label role, 14px at 500 in --cn-fg-muted, so 600 stays with headings and controls
 *   classes?: string,   // class string shown in a copyable code line below
 *   row?: boolean,      // lay children out as a wrapping flex row from the inline start; the stage shrinks to them
 *   why?: string,       // summary of the fold Doc builds from the prose beside this demo
 *   lead?: boolean,     // the first demo on a page, once per page: the stage drops its frame and takes 48px above and below
 *   children,
 * }
 */
export interface DemoProps {
  title?: string;
  classes?: string;
  row?: boolean;
  why?: string;
  lead?: boolean;
  children?: ComponentChildren;
}

export function Demo({ title, classes, row, lead, children }: DemoProps) {
  return (
    <figure class={`sc-demo${row ? " sc-demo-fit" : ""}${lead ? " is-lead" : ""}`}>
      {title ? <figcaption class="cn-label cn-fg-muted">{title}</figcaption> : null}
      <div class={`sc-demo-stage${row ? " sc-demo-row" : ""}`}>{children}</div>
      {classes ? <CopyLine text={classes} /> : null}
    </figure>
  );
}

/**
 * Props: a variants/knobs documentation table (renders .data-table).
 * props: {
 *   title?: string,
 *   rows: Array<{ name: string, values?: string, default?: string, contrast?: string, notes?: string }>,
 * }
 * `name` is the class / custom property / attribute being documented.
 * `contrast` holds measured ratios. The Values, Default and Contrast
 * columns each show only when some row fills them, so no column is all "·".
 */
export interface PropsRow {
  name: string;
  values?: string;
  default?: string;
  contrast?: string;
  notes?: string;
}

export interface PropsProps {
  title?: string;
  rows: PropsRow[];
}

export function Props({ title, rows }: PropsProps) {
  const hasValues = rows.some((r) => r.values);
  const hasDefault = rows.some((r) => r.default);
  const hasContrast = rows.some((r) => r.contrast);
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
              {hasContrast ? <th>Contrast</th> : null}
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.name}>
                <td data-label="Name" class="cell-name">
                  {/* One token never breaks at its hyphens; a selector with
                      spaces may wrap between its parts. */}
                  <code class={`cn-code-inline${/\s/.test(r.name) ? "" : " cn-nowrap"}`}>{r.name}</code>
                </td>
                {hasValues ? <td data-label="Values">{r.values ?? "·"}</td> : null}
                {hasDefault ? <td data-label="Default">{r.default ?? "·"}</td> : null}
                {hasContrast ? <td data-label="Contrast">{r.contrast ?? "·"}</td> : null}
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
