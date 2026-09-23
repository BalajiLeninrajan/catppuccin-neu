import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function TypographyPage() {
  return (
    <Doc
      title="Typography"
      lede="Inter for every role but code, JetBrains Mono for code. Four weights, one type scale, and a class per role. Pick the role, not the face."
    >
      <p class="cn-copy">
        Each role is four tokens, <code class="cn-code">--cn-type-&lt;role&gt;-size</code>,{" "}
        <code class="cn-code">-weight</code>, <code class="cn-code">-leading</code> and{" "}
        <code class="cn-code">-tracking</code>, and one class that reads them. The weights are 400, 500, 600 and
        700. Numeric roles keep <code class="cn-code">tabular-nums</code> on the sans face, so figures align in
        columns without mono. Only the microlabel is uppercase.
      </p>

      <Demo title="cn-display · 700 · clamp(36px, 4.6vw, 56px) · -0.03em · balance" classes="cn-display">
        <h1 class="cn-display">
          Every team, <em>one dashboard</em>
        </h1>
      </Demo>

      <Demo title="cn-display is-sm · 700 · clamp(26px, 3.4vw, 36px) · -0.03em" classes="cn-display is-sm">
        <h1 class="cn-display is-sm">
          Invoices, <em>settled</em>
        </h1>
      </Demo>

      <p class="cn-copy">
        An <code class="cn-code">&lt;em&gt;</code> inside a display title or a
        wordmark renders mauve and upright. Everywhere else a bare{" "}
        <em>em</em> is plain emphasis: italic, in the surrounding color.
      </p>

      <Demo title="cn-title · 700 · 20px/1.3 · -0.03em" classes="cn-title">
        <h2 class="cn-title">Workspace settings</h2>
      </Demo>

      <Demo title="cn-name · 700 · 13px/1.3 · text" classes="cn-name">
        <span class="cn-name">Ada Larsen</span>
      </Demo>

      <Demo title="cn-lede · 16px/1.6 · subtext-1 · max 690px" classes="cn-lede">
        <p class="cn-lede">
          Every message, invoice and approval goes through one inbox. Your team
          sees the same state you do as soon as it changes.
        </p>
      </Demo>

      <Demo title="cn-copy · 14px/1.6 · subtext-0" classes="cn-copy">
        <p class="cn-copy">
          Members inherit the workspace default role. Change a member's role
          from the team page; the change applies on their next sign-in.
        </p>
      </Demo>

      <Demo title="cn-ui · 600 · 13px/1" classes="cn-ui">
        <span class="cn-ui">Export as CSV</span>
      </Demo>

      <Demo title="cn-label · 600 · 12px · overlay-2" classes="cn-label">
        <span class="cn-label">Billing period</span>
      </Demo>

      <Demo title="cn-microlabel · 700 · 10px · +0.08em · uppercase · overlay-2" classes="cn-microlabel">
        <span class="cn-microlabel">Last synced 2 min ago</span>
      </Demo>

      <p class="cn-copy">
        The microlabel labels a fact, such as a timestamp or a unit. It never
        heads a section; a section heading is <code class="cn-code">.cn-title</code>{" "}
        or <code class="cn-code">.cn-label</code>.
      </p>

      <Demo title="cn-value · 600 · 20px · -0.03em · tabular-nums" classes="cn-value">
        <span class="cn-value">1,284</span>
      </Demo>

      <Demo title="cn-value-lg · 600 · 28px · -0.03em · colored by --accent" classes="cn-value-lg">
        <div class="sc-row">
          <span class="cn-value-lg">$42,180</span>
          <span class="cn-value-lg" style={accentStyle(PAYMENTS.accent)}>
            {PAYMENTS.revenue}
          </span>
        </div>
      </Demo>

      <p class="cn-copy">
        The second figure is Payments' revenue, so it takes Payments' accent.
        Inside an accent card the large value is text-colored instead.
      </p>

      <Demo title="cn-meta · 500 · 12px/1.5 · tabular-nums · overlay-2" classes="cn-meta">
        <span class="cn-meta">Updated Aug 24, 2026 · 14 members · v3.2.1</span>
      </Demo>

      <Demo title="Tabular numerals" classes="cn-value / cn-meta">
        <div style="display:grid; grid-template-columns:auto auto; gap: 8px 32px; justify-items:end;">
          <span class="cn-meta">January</span>
          <span class="cn-value">1,041.20</span>
          <span class="cn-meta">February</span>
          <span class="cn-value">986.75</span>
          <span class="cn-meta">March</span>
          <span class="cn-value">1,118.00</span>
        </div>
      </Demo>

      <h2 class="cn-title">Mono</h2>
      <p class="cn-copy">
        Mono ships in two places: the code roles (<code class="cn-code">.cn-code</code>,{" "}
        <code class="cn-code">.cn-code-inline</code>, <code class="cn-code">.cn-code-meta</code>) and the three
        code wells (<code class="cn-code">.terminal</code>, <code class="cn-code">.codeblock</code>,{" "}
        <code class="cn-code">.command</code>). Everything else is sans. A consumer may set a short machine
        string in mono elsewhere; prose, headings and controls stay sans.
      </p>

      <Demo title="cn-code · 500 · 12px/1.6 · mono" classes="cn-code">
        <code class="cn-code">pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.4.0</code>
      </Demo>

      <Demo title="cn-code-inline · mono · text ink · 500 · scales with its line" classes="cn-code-inline">
        <p class="cn-copy" style="margin:0">
          Set <code class="cn-code-inline">data-density="compact"</code> on the
          wrapper, or run <code class="cn-code-inline">pnpm sync ./public</code>{" "}
          to copy the CSS.
        </p>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.cn-code-inline</code> is the quiet form for
        code inside prose: mono at 0.92em in the text color, with no chip, so
        it reads as part of the sentence.
      </p>

      <Demo title="cn-code-meta · the mono secondary line" classes="cn-code-meta">
        <div class="cn-stack cn-gap-4">
          <span class="cn-name">Deploy bot</span>
          <span class="cn-code-meta">svc_8f2a91c4 · us-east-1</span>
        </div>
      </Demo>

      <Props
        title="Role reference"
        rows={[
          { name: ".cn-display", values: "sans", default: "700 · clamp(36px, 4.6vw, 56px)/1 · -0.03em", notes: "Hero headline; balanced. .is-sm is the page-title size. .display-title is the same type." },
          { name: ".cn-title", values: "sans", default: "700 · 20px/1.3 · -0.03em", notes: "Section and card headings." },
          { name: ".cn-name", values: "sans", default: "700 · 13px/1.3 · text", notes: "Proper names at body scale, full-strength color." },
          { name: ".cn-lede", values: "sans", default: "400 · 16px/1.6 · subtext-1", notes: "Intro paragraph; max-width 690px. .lede is the recipe form." },
          { name: ".cn-copy", values: "sans", default: "400 · 14px/1.6 · subtext-0", notes: "Body prose." },
          { name: ".cn-ui", values: "sans", default: "600 · 13px/1", notes: "Control text outside a recipe." },
          { name: ".cn-label", values: "sans", default: "600 · 12px/1 · overlay-2", notes: "Field and section labels; sentence case." },
          { name: ".cn-microlabel", values: "sans", default: "700 · 10px/1 · +0.08em · uppercase · overlay-2", notes: "A fact's label. The only uppercase role." },
          { name: ".cn-value", values: "sans", default: "600 · 20px/1 · -0.03em · tabular", notes: "Stat numbers." },
          { name: ".cn-value-lg", values: "sans", default: "600 · 28px/1 · -0.03em · tabular", notes: "Large stat in var(--accent); text inside an accent card. Opt out with a color utility." },
          { name: ".cn-meta", values: "sans", default: "500 · 12px/1.5 · tabular · overlay-2", notes: "Timestamps, counts, versions." },
          { name: ".cn-code", values: "mono", default: "500 · 12px/1.6 · tabular", notes: "Machine literals, CLI strings." },
          { name: ".cn-code-inline", values: "mono", default: "500 · 0.92em · text", notes: "Code inside prose." },
          { name: ".cn-code-meta", values: "mono", default: "500 · 12px/1 · overlay-2", notes: "A model id, a path or a hash under a name." },
        ]}
      />

      <CodeBlock
        title="A stat composed from roles"
        code={`<div class="cn-stack cn-gap-4">
  <span class="cn-label">Monthly revenue</span>
  <span class="cn-value-lg">$42,180</span>
  <span class="cn-meta">Updated Aug 24 · +4.2% on July</span>
</div>`}
      />
    </Doc>
  );
}
