import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

export default function TypographyPage() {
  return (
    <Doc
      title="Typography"
      lede="Inter carries every role; JetBrains Mono appears only where the content is code. Pick the role, not the face."
    >
      <p class="cn-copy">
        Each role fixes size, weight, tracking, and color in one class. Numeric
        roles keep <code class="cn-code">font-variant-numeric: tabular-nums</code>{" "}
        on the sans face, so figures align in columns without mono.
      </p>

      <Demo
        title="cn-display · 820 · clamp(36px to 56px) · -0.055em · balance"
        classes="cn-display"
      >
        <h1 class="cn-display">
          Every team, <em>one dashboard</em>
        </h1>
      </Demo>

      <Demo
        title="cn-display-sm · 820 · clamp(28px to 42px) · -0.045em"
        classes="cn-display-sm"
      >
        <h1 class="cn-display-sm">
          Invoices, <em>settled</em>
        </h1>
      </Demo>

      <p class="cn-copy">
        An <code class="cn-code">&lt;em&gt;</code> inside either display role
        renders mauve and upright. It is the one inline highlight.
      </p>

      <Demo title="cn-title · 800 · 20px · -0.03em" classes="cn-title">
        <h2 class="cn-title">Workspace settings</h2>
      </Demo>

      <Demo title="cn-name · 700 · 13px/1.3 · text" classes="cn-name">
        <span class="cn-name">Ada Larsen</span>
      </Demo>

      <Demo title="cn-lede · 16px/1.65 · subtext-1 · max 690px" classes="cn-lede">
        <p class="cn-lede">
          Route every message, invoice, and approval through one inbox. Your
          team sees the same state you do, the moment it changes.
        </p>
      </Demo>

      <Demo title="cn-copy · 13px/1.6 · subtext-0" classes="cn-copy">
        <p class="cn-copy">
          Members inherit the workspace default role. Change a member's role
          from the team page; the change applies on their next sign-in.
        </p>
      </Demo>

      <Demo
        title="cn-label · 650 · 11px · +0.04em · uppercase · overlay-2"
        classes="cn-label"
      >
        <span class="cn-label">Billing period</span>
      </Demo>

      <Demo
        title="cn-microlabel · 700 · 10px · +0.08em · uppercase · overlay-1"
        classes="cn-microlabel"
      >
        <span class="cn-microlabel">last synced 2 min ago</span>
      </Demo>

      <Demo
        title="cn-eyebrow · 700 · 11px · +0.08em · uppercase · mauve"
        classes="cn-eyebrow"
      >
        <p class="cn-eyebrow">
          <span class="live-dot" aria-hidden="true"></span>
          Reports · Q3
        </p>
      </Demo>

      <Demo title="cn-value · 650 · 21px · tabular-nums" classes="cn-value">
        <span class="cn-value">1,284</span>
      </Demo>

      <Demo
        title="cn-value-lg · 650 · 28px · tabular-nums · colored by --accent"
        classes="cn-value-lg"
      >
        <div class="sc-row">
          <span class="cn-value-lg">$48,210</span>
          <span class="cn-value-lg" style="--accent: #94e2d5">
            99.98%
          </span>
          <span class="cn-value-lg" style="--accent: #fab387">
            312ms
          </span>
        </div>
      </Demo>

      <Demo
        title="cn-meta · 550 · 11px/1.5 · tabular-nums · overlay-1"
        classes="cn-meta"
      >
        <span class="cn-meta">Updated Aug 24, 2026 · 14 members · v3.2.1</span>
      </Demo>

      <Demo
        title="Tabular numerals"
        classes="cn-value / cn-meta"
      >
        <div style="display:grid; grid-template-columns:auto auto; gap: 6px 28px; justify-items:end;">
          <span class="cn-meta">January</span>
          <span class="cn-value">1,041.20</span>
          <span class="cn-meta">February</span>
          <span class="cn-value">986.75</span>
          <span class="cn-meta">March</span>
          <span class="cn-value">1,118.00</span>
        </div>
      </Demo>

      <Props
        title="Role reference"
        rows={[
          { name: ".cn-display", values: "sans", default: "820 · clamp(36px, 4.6vw, 56px) · -0.055em", notes: "Hero headline; text-wrap: balance; em turns mauve." },
          { name: ".cn-display-sm", values: "sans", default: "820 · clamp(28px, 4vw, 42px) · -0.045em", notes: "Page titles; same em rule." },
          { name: ".cn-title", values: "sans", default: "800 · 20px · -0.03em", notes: "Section and card headings." },
          { name: ".cn-name", values: "sans", default: "700 · 13px/1.3 · text", notes: "Proper names at body scale, full-strength color." },
          { name: ".cn-lede", values: "sans", default: "16px/1.65 · subtext-1", notes: "Intro paragraph; max-width 690px." },
          { name: ".cn-copy", values: "sans", default: "13px/1.6 · subtext-0", notes: "Body prose." },
          { name: ".cn-label", values: "sans", default: "650 · 11px · +0.04em · uppercase", notes: "Field and section labels; overlay-2." },
          { name: ".cn-microlabel", values: "sans", default: "700 · 10px · +0.08em · uppercase", notes: "Smallest metadata; overlay-1." },
          { name: ".cn-eyebrow", values: "sans", default: "700 · 11px · +0.08em · uppercase · mauve", notes: "Kicker above a display; flex with 8px gap." },
          { name: ".cn-value", values: "sans", default: "650 · 21px · tabular-nums", notes: "Stat numbers." },
          { name: ".cn-value-lg", values: "sans", default: "650 · 28px · tabular-nums", notes: "Hero stat; color: var(--accent). Opt out with a color utility." },
          { name: ".cn-meta", values: "sans", default: "550 · 11px/1.5 · tabular-nums", notes: "Timestamps, counts, versions; overlay-1." },
          { name: ".cn-code", values: "mono", default: "500 · 13px/1.6 · tabular-nums", notes: "The one mono role. Code and machine literals only." },
        ]}
      />

      <p class="cn-copy">
        <strong>Mono scarcity.</strong> The mono face has exactly three
        carriers: <code class="cn-code">.cn-code</code> for inline literals,{" "}
        <code class="cn-code">.terminal</code> for log output, and{" "}
        <code class="cn-code">.codeblock</code> for snippets. Everything else
        is sans. If a string is not code, a CLI command, or machine output, it
        does not get mono.
      </p>

      <Demo title="cn-code · inline machine literals" classes="cn-code">
        <p class="cn-copy">
          Set <code class="cn-code">--accent: #94e2d5</code> on the wrapper, or
          run <code class="cn-code">pnpm sync ./public</code> to vendor the CSS.
        </p>
      </Demo>

      <Demo title="terminal · a mono carrier" classes="terminal">
        <div class="terminal" style="width:100%; max-width:560px;">
          <pre>
            {"$ deploy --env production\n"}
            {"→ building assets… done (1.8s)\n"}
            {"→ uploading 42 files… done\n"}
            {"✓ live at app.example.com "}
            <span class="caret" aria-hidden="true"></span>
          </pre>
        </div>
      </Demo>

      <CodeBlock
        title="A stat composed from roles"
        code={`<div>
  <span class="cn-label">Monthly revenue</span>
  <span class="cn-value-lg">$48,210</span>
  <span class="cn-meta">Updated Aug 24 · +4.2% vs July</span>
</div>`}
      />
    </Doc>
  );
}
