import { Doc, Props, CodeBlock } from "../lib/doc";

const RG = `rg -n "btn-flat|btn-icon|btn-dashed|\\bmetric\\b|stat-row|stat-strip|footer-brand|footer-neu|panel-heading|chip-tone|mark-solid|table-neu|is-error|cn-display-sm|eyebrow|cn-scrim|-(22|28)\\b|dense|hard-offset-color|pane-radius|input-h|\\b(min-h|h|w|p[xytrbl]?|m[xytrbl]?|gap(-[xy])?)-input\\b|text-micro\\b"`;

export default function MigrationPage() {
  return (
    <Doc
      title="Migrating to 0.4"
      lede="0.4.0 renames a set of classes, tokens and Tailwind keys. Every old name still works through 0.4.x as a deprecated alias and is removed in 0.5.0, except --input-h, which is gone now."
    >
      <p class="cn-copy">
        The aliases render the same as before, so upgrading changes nothing
        until you rename. Search the codebase for the old names, swap each
        one for the name in the right column, then check the page. The CSS
        marks every alias with a <code class="cn-code">deprecated, removed in 0.5.0</code>{" "}
        comment.
      </p>

      <CodeBlock title="Find the old names" code={RG} />

      <Props
        title="Classes"
        rows={[
          { name: ".btn-flat", values: ".btn.btn-ghost.is-sm", notes: "The toggle state keys on aria-pressed or aria-current. The .active class works on the alias only." },
          { name: ".btn-icon", values: ".btn.is-icon", notes: ".is-lg carries over. The alias's 28px .is-sm has no new form; use compact density." },
          { name: ".btn-dashed", values: ".btn.btn-ghost.is-dashed", notes: "The new form is inline, 46px and 700. For the old full-width 62px slot add .cn-w-full and .is-lg (58px)." },
          { name: ".metric", values: ".stat", default: "·" },
          { name: ".metric.is-hero", values: ".stat.is-lg", default: "·" },
          { name: ".metric.is-value-first", values: "none", notes: "Drop it. Label over value is the one order." },
          { name: ".stat-row", values: ".stat.is-inline", notes: "The value is a b or a strong." },
          { name: ".stat-strip", values: ".cn-divide", notes: "Wrap .stat.is-inline rows in .cn-divide." },
          { name: ".panel-heading", values: ".panel-header", notes: "The same band as .modal > header and .drawer > header." },
          { name: ".chip-tone", values: ".tag", default: "·" },
          { name: ".mark-solid", values: ".mark", default: "·" },
          { name: ".table-neu", values: ".data-table", default: "·" },
          { name: ".footer-neu", values: ".page-footer", default: "·" },
          { name: ".footer-brand", values: ".wordmark.is-sm", notes: "A b suffix after the name keeps a .25em space." },
          { name: ".field.is-error / .input.is-error", values: '[aria-invalid="true"]', notes: "Put the attribute on the control. .is-warning is unchanged." },
          { name: ".cn-display-sm", values: ".cn-display.is-sm", default: "·" },
          { name: ".eyebrow / .cn-eyebrow", values: "none", notes: "Delete it. A kicker above a display title repeats the lede." },
          { name: ".cn-{gap,p,px,py,mt,mb}-22", values: "-24", notes: "The spacing scale is 4, 8, 12, 16, 24, 32. The alias already renders 24." },
          { name: ".cn-{gap,p,px,py,mt,mb}-28", values: "-32", notes: "The alias already renders 32." },
          { name: "div.modal / div.drawer in .cn-scrim", values: "dialog.modal / dialog.drawer", notes: "Open with showModal(), close with close(). ::backdrop is the scrim. Drop the scrim div and the hidden toggle." },
        ]}
      />

      <Props
        title="Attributes and tokens"
        rows={[
          { name: 'data-density="dense"', values: 'data-density="compact"', notes: "Compact now has the old dense values: 28px controls, 24px small controls, a 2px plate." },
          { name: "--hard-offset-color", values: "--plate", notes: "The old name still feeds the plate as a fallback." },
          { name: "--pane-radius", values: "--cn-radius-panel", default: "·" },
          { name: "--input-h", values: "--control-h", notes: "Removed, not aliased. Inputs are the control height, 46px or 28px compact." },
        ]}
      />

      <Props
        title="Tailwind keys"
        rows={[
          { name: "text-micro", values: "text-microlabel", default: "·" },
          { name: "h-input / min-h-input / spacing input", values: "h-control / min-h-control", default: "·" },
        ]}
      />

      <h2 class="cn-title">Behavior that changed</h2>
      <p class="cn-copy">
        These have no alias. They change how a page looks after the upgrade,
        before any rename.
      </p>

      <Props
        title="Changes"
        rows={[
          { name: "em", notes: "A bare em is plain italic in the surrounding color. The mauve upright em is only inside .cn-display, .display-title and .wordmark. Use span.cn-text-mauve for accent text elsewhere." },
          { name: "var(--tint)", notes: "Declared only on .cn-tint, .tag, .banner, .input and field controls. A rule elsewhere that reads it resolves to nothing; add .cn-tint or declare --tint locally." },
          { name: "Inputs", notes: "46px, up from 42px; 28px compact, down from 30px. Textareas 92px, up from 84px. Re-check rows that align an input with a fixed-height neighbor." },
          { name: "[hidden]", notes: "display: none !important in the first layer, so no later rule can show it. An element that animates out through [hidden] takes data-cn-animate-hidden." },
          { name: ".display-title / .cn-display", notes: "Both zero the heading margin." },
          { name: "Readable text", notes: "Labels, meta, table heads and help text moved from overlay-1 to overlay-2." },
          { name: "Type", notes: "Four weights (400, 500, 600, 700) and one size scale. .cn-display runs 36 to 56px at 700." },
          { name: "Spacing and radius", notes: "Recipes snap to 4, 8, 12, 16, 24, 32 and the radii 16, 12, 8, 4. Band heights are 64px." },
          { name: "Accent card", notes: "The plate is the only depth; the soft raise and the hover border are gone. The value inside is text-colored." },
          { name: "Table", notes: "Cells are 500. At 760px rows become label and value lines instead of bordered cards. A table in .table-scroll with no data-label cells stays a table." },
          { name: "Phones", notes: "Nothing hides: chip labels, the footer paragraph and accordion meta stay. A panel-footer primary button is no longer full width." },
          { name: "Disabled", notes: "Buttons, fields and choices use --disabled-opacity (.5). Buttons keep the variant's rest shadow." },
          { name: "Page column", notes: ".page-main and the topbar share --page-gutter, up to 32px. .page-main has no z-index." },
          { name: "Accents", notes: "The accent cycle by list position is gone from the docs. Take an item's accent from its identity." },
        ]}
      />
    </Doc>
  );
}
