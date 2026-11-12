import { Doc, Demo, Props, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function TypographyPage() {
  return (
    <Doc
      title="Typography"
      lede="Inter for every role but code, JetBrains Mono for code, and one class per role."
    >
      <Demo title="cn-display" classes="cn-display">
        <h1 class="cn-display">
          Every team, <em>one dashboard</em>
        </h1>
      </Demo>

      <Demo title="cn-display is-sm" classes="cn-display is-sm">
        <h1 class="cn-display is-sm">
          Invoices, <em>settled</em>
        </h1>
      </Demo>

      <p class="cn-copy">
        An <code class="cn-code-inline">&lt;em&gt;</code> inside a display
        title or a wordmark renders mauve and upright. Anywhere else it is
        plain italic.
      </p>

      <Demo title="cn-title" classes="cn-title">
        <h2 class="cn-title">Workspace settings</h2>
      </Demo>

      <Demo title="cn-name" classes="cn-name">
        <span class="cn-name">Ada Larsen</span>
      </Demo>

      <Demo title="cn-lede" classes="cn-lede">
        <p class="cn-lede">
          Every message, invoice and approval goes through one inbox. Your team
          sees the same state you do as soon as it changes.
        </p>
      </Demo>

      <Demo title="cn-copy" classes="cn-copy">
        <p class="cn-copy">
          Members inherit the workspace default role. Change a member's role
          from the team page; the change applies on their next sign-in.
        </p>
      </Demo>

      <Demo title="cn-ui" classes="cn-ui">
        <span class="cn-ui">Export as CSV</span>
      </Demo>

      <Demo title="cn-label" classes="cn-label">
        <span class="cn-label">Billing period</span>
      </Demo>

      <Demo title="cn-microlabel" classes="cn-microlabel">
        <span class="cn-microlabel">Last synced 2 min ago</span>
      </Demo>

      <p class="cn-copy">
        The microlabel labels a fact, such as a timestamp or a unit. It never
        heads a section.
      </p>

      <Demo title="cn-value" classes="cn-value">
        <span class="cn-value">1,284</span>
      </Demo>

      <Demo title="cn-value-lg" classes="cn-value-lg">
        <div class="sc-row">
          <span class="cn-value-lg">$42,180</span>
          <span class="cn-value-lg" style={accentStyle(PAYMENTS.accent)}>
            {PAYMENTS.revenue}
          </span>
        </div>
      </Demo>

      <p class="cn-copy">
        The large value takes <code class="cn-code-inline">--accent</code>,
        so the second figure is in Payments' color.
      </p>

      <Demo title="cn-meta" classes="cn-meta">
        <span class="cn-meta">Updated Aug 24, 2026 · 14 members · v3.2.1</span>
      </Demo>

      <Demo title="Bare headings" classes="h1 → display-sm · h2 → heading · h3 → title · h4 → name">
        <div class="cn-stack cn-gap-12">
          <h1 class="cn-m-0">Invoices, settled</h1>
          <h2 class="cn-m-0">Quarterly billing summary</h2>
          <h3 class="cn-m-0">Workspace settings</h3>
          <h4 class="cn-m-0">Ada Larsen</h4>
        </div>
      </Demo>

      <p class="cn-copy">
        A heading with no class still takes a role, at zero specificity, so
        any class on it wins. An <code class="cn-code-inline">h2</code> or{" "}
        <code class="cn-code-inline">h3</code> in a panel, modal or drawer
        header takes the title role.
      </p>

      <Demo title="cn-code" classes="cn-code">
        <code class="cn-code">pnpm add github:BalajiLeninrajan/catppuccin-neu#v2.0.1</code>
      </Demo>

      <Demo title="cn-code-inline" classes="cn-code-inline">
        <p class="cn-copy" style="margin:0">
          Set <code class="cn-code-inline">data-density="compact"</code> on the
          wrapper, or run <code class="cn-code-inline">pnpm sync ./public</code>{" "}
          to copy the CSS.
        </p>
      </Demo>

      <Demo title="cn-code-meta" classes="cn-code-meta">
        <div class="cn-stack cn-gap-4">
          <span class="cn-name">Deploy bot</span>
          <span class="cn-code-meta">svc_8f2a91c4 · us-east-1</span>
        </div>
      </Demo>

      <p class="cn-copy">
        Sizes are rem, so the reader's browser font size scales every role.
        The px below are at the 16px default.
      </p>

      <Props
        title="Role reference"
        rows={[
          { name: ".cn-display", values: "700 · 36 to 56px / 1.08", notes: "Hero headline. .is-sm is the page-title size, 30 to 40px." },
          { name: ".cn-title", values: "600 · 20px / 1.3", notes: "Section and card headings." },
          { name: ".cn-name", values: "600 · 14px / 1.25", notes: "A person, a team, a file. The ui role in the text color." },
          { name: ".cn-lede", values: "400 · 18px / 1.6", notes: "Intro paragraph, at most 68ch wide." },
          { name: ".cn-copy", values: "400 · 16px / 1.6", notes: "Body prose. 15px at compact density." },
          { name: ".cn-ui", values: "600 · 14px / 1.25", notes: "Control text outside a recipe." },
          { name: ".cn-label", values: "500 · 14px / 1.25", notes: "Field and section labels, in sentence case." },
          { name: ".cn-microlabel", values: "500 · 12px / 1.25 · uppercase", notes: "A fact's label. The only uppercase role." },
          { name: ".cn-value", values: "600 · 24px · tabular", notes: "Stat numbers." },
          { name: ".cn-value-lg", values: "600 · 26 to 36px · tabular", notes: "A large stat in --accent. Text-colored inside an accent card." },
          { name: ".cn-meta", values: "400 · 14px / 1.5 · tabular", notes: "Timestamps, counts, versions." },
          { name: ".cn-code", values: "mono · 500 · 13px / 1.6", notes: "Machine literals, CLI strings." },
          { name: ".cn-code-inline", values: "mono · 500 · 0.92em", notes: "Code inside prose." },
          { name: ".cn-code-meta", values: "mono · 500 · 13px", notes: "An id, a path or a hash under a name." },
        ]}
      />
    </Doc>
  );
}
