import { Doc, Demo, Props, CodeBlock, TEAMS, accentStyle } from "../lib/doc";

const PAYMENTS = TEAMS[0];

export default function TypographyPage() {
  return (
    <Doc
      title="Typography"
      lede="IBM Plex Sans for every role but code, JetBrains Mono for code. Four weights, one type scale, and a class per role. Pick the role, not the face."
    >
      <p class="cn-copy">
        Each role is four tokens, <code class="cn-code-inline">--cn-type-&lt;role&gt;-size</code>,{" "}
        <code class="cn-code-inline">-weight</code>, <code class="cn-code-inline">-leading</code> and{" "}
        <code class="cn-code-inline">-tracking</code>, and one class that reads them.
      </p>

      <Demo lead title="cn-display · 700 · clamp(36px, 5.44px + 5.88vw, 56px)/1.08 · -0.02em · balance" classes="cn-display" why="How a role is built">
        <h1 class="cn-display">
          Every team, <em>one dashboard</em>
        </h1>
      </Demo>

      <Demo title="cn-display is-sm · 700 · clamp(30px, 14.72px + 2.94vw, 40px)/1.08 · -0.02em" classes="cn-display is-sm" why="How the display sizes scale, and what em does">
        <h1 class="cn-display is-sm">
          Invoices, <em>settled</em>
        </h1>
      </Demo>

      <p class="cn-copy">
        Both display sizes grow from 520px and reach their maximum at 860px,
        the narrow page width. On desktop widths the ratio holds: display is
        2x the 28px heading and display-sm 1.43x.
      </p>

      <p class="cn-copy">
        An <code class="cn-code-inline">&lt;em&gt;</code> inside a display title or a
        wordmark renders mauve and upright. Everywhere else a bare{" "}
        <em>em</em> is plain emphasis: italic, in the surrounding color.
      </p>

      <Demo title="cn-heading · 700 · 28px/1.25 · -0.02em · balance" why="When to use the heading" classes="cn-heading">
        <h2 class="cn-heading">Quarterly billing summary</h2>
      </Demo>

      <p class="cn-copy">
        The heading sits between the page title and the section title. Use it
        for the top-level sections of a long page. Tailwind calls it{" "}
        <code class="cn-code-inline">text-heading</code>.
      </p>

      <Demo title="cn-title · 600 · 20px/1.3 · -0.01em" classes="cn-title">
        <h2 class="cn-title">Workspace settings</h2>
      </Demo>

      <Demo title="cn-name · the ui role in text · 600 · 14px/1.25" classes="cn-name">
        <span class="cn-name">Ada Larsen</span>
      </Demo>

      <Demo title="cn-lede · 18px/1.6 · subtext-1 · max 68ch" classes="cn-lede">
        <p class="cn-lede">
          Every message, invoice and approval goes through one inbox. Your team
          sees the same state you do as soon as it changes.
        </p>
      </Demo>

      <Demo title="cn-copy · 16px/1.6 · subtext-1" classes="cn-copy">
        <p class="cn-copy">
          Members inherit the workspace default role. Change a member's role
          from the team page; the change applies on their next sign-in.
        </p>
      </Demo>

      <Demo title="cn-ui · 600 · 14px/1.25" classes="cn-ui">
        <span class="cn-ui">Export as CSV</span>
      </Demo>

      <Demo title="cn-label · 500 · 14px/1.25 · subtext-1" classes="cn-label">
        <span class="cn-label">Billing period</span>
      </Demo>

      <Demo title="cn-microlabel · 500 · 12px/1.25 · +0.08em · uppercase · subtext-0" why="What a microlabel may label" classes="cn-microlabel">
        <span class="cn-microlabel">Last synced 2 min ago</span>
      </Demo>

      <p class="cn-copy">
        The microlabel labels a fact, such as a timestamp or a unit. It never
        heads a section; a section heading is{" "}
        <code class="cn-code-inline">.cn-heading</code>,{" "}
        <code class="cn-code-inline">.cn-title</code> or{" "}
        <code class="cn-code-inline">.cn-label</code>.
      </p>

      <Demo title="cn-value · 600 · 24px · -0.02em · tabular-nums" classes="cn-value">
        <span class="cn-value">1,284</span>
      </Demo>

      <Demo title="cn-value-lg · 600 · clamp(26px, 10.72px + 2.94vw, 36px) · -0.025em · colored by --accent" why="Where the large value gets its color" classes="cn-value-lg">
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

      <Demo title="cn-meta · 400 · 14px/1.5 · tabular-nums · subtext-0" classes="cn-meta">
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

      <h2 class="cn-title">Weights, sizes and tracking</h2>
      <p class="cn-copy">
        The weights are 400, 500, 600 and 700. 700 is for the display and
        the heading, and the wordmark reads the display weight. The title is 600, so a panel title never outweighs the
        page heading. Names, titles and buttons (<code class="cn-code-inline">.btn</code>) are 600.
        Chrome, the label and the microlabel, is 500, and meta is 400. The
        label is 14px at 500 in subtext-1 and meta is 14px at 400 in
        subtext-0, so they share a size and differ by weight and ink. 600 marks
        what a reader acts on. A band or a row holds one small size plus the
        microlabel, and one 600: a stat is a 14px label, a 24px value and a 14px note,
        and a table row is 14px cells under a 14px head, with the name its
        one 600 and a key figure at 500 in the text color. A key beside its value, in a <code class="cn-code-inline">.kv</code> list or an inline stat row, is 400 against the value's 500. Breadcrumbs and resting page numbers are 500, so the current one at 600 is a weight step. The large steps run 20, 24, 28 and 36px: title, value,
        heading and value-lg, so a stat value outweighs the panel title above
        it, and the large value is 1.5 times the value beside it. At 36px it stays 4px under the page title at every width. At 520px both step down: the value to 18px and the band title to
        16px. Tracking is 0 through 18px, -0.01em at 20px and -0.02em from
        24px up: the value, the heading and both display sizes. value-lg
        alone is -0.025em, since it sets figures. Words at 700 stop at
        -0.02em, because at -0.03em Plex Sans closes "tt" and "ng" until
        they touch. Numeric roles keep{" "}
        <code class="cn-code-inline">tabular-nums</code> on the sans face, so figures align in
        columns without mono. Only the microlabel and the stacked stat label are uppercase.
      </p>

      <p class="cn-copy">
        The face is IBM Plex Sans because it has a voice of its own: angled
        terminals and engineered figures that read as a tool, not a default,
        beside JetBrains Mono. It stays clear at 13 and 14px on a dark ground
        and has true tabular figures, so a dense table keeps its columns.
        Link it from Google Fonts at 400 to 700 with its italic; the{" "}
        <a href="/">introduction</a> has the tag. Until it loads, text sets in{" "}
        <code class="cn-code-inline">IBM Plex Sans Fallback</code>, a local
        Arial sized to Plex's metrics, so the swap does not reflow the page.
        Paragraphs and list items wrap with{" "}
        <code class="cn-code-inline">text-wrap: pretty</code>, which keeps a
        lone word off the last line. The display and heading roles balance instead.
      </p>

      <p class="cn-copy">
        Every size is rem, so the reader's browser font-size setting scales
        every role. The px on this page are at the 16px default. The
        microlabel is the one 12px role. The label, meta and ui are all
        14px, at 500, 400 and 600. Mono code is 13px, which matches Plex
        Sans at 14px in x-height, and compact density sets table heads and
        cells at 13px. The
        name is the ui role in <code class="cn-code-inline">--cn-fg</code>:
        its tokens alias the ui tokens, so it is the same 14px at 600, set
        apart by its color. Body copy is 16px, and
        compact density steps it to 15px. Display titles set at 1.08 leading.
        The micro, label and ui roles lead at 1.25, so a label that wraps, or
        a reader's text-spacing override, never runs one line into the
        next.
        Inside <code class="cn-code-inline">.page-main.is-reading</code> the lede
        sets at 20px for long prose.
      </p>

      <h2 class="cn-title">Bare headings</h2>
      <p class="cn-copy">
        A heading with no class still takes a role. The rules sit at zero
        specificity, so any recipe or utility on the element wins:{" "}
        <code class="cn-code-inline">h1</code> is the small display,{" "}
        <code class="cn-code-inline">h2</code> the heading,{" "}
        <code class="cn-code-inline">h3</code> the title and{" "}
        <code class="cn-code-inline">h4</code> the name. All four are{" "}
        <code class="cn-code-inline">--cn-fg</code>. An{" "}
        <code class="cn-code-inline">h2</code> or{" "}
        <code class="cn-code-inline">h3</code> in a panel, modal or drawer
        header is the title role at{" "}
        <code class="cn-code-inline">--band-title-size</code> instead: 20px at
        default and cozy density and 14px at compact. The lead panel's title
        takes <code class="cn-code-inline">--lead-title-size</code> at the
        heading weight: 28px at default and cozy, and 20px at compact and at
        655px and under, where display-sm drops under 34px.
        At 520px both step
        down to the body size, 16px, so a stat value still outweighs them. A class still sets
        the size where the outline level and the look differ, as in{" "}
        <code class="cn-code-inline">&lt;h2 class="cn-title"&gt;</code> for
        the section titles on this site.
      </p>

      <Demo title="h1 · h2 · h3 · h4, no classes" why="What a bare heading takes" classes="h1 → display-sm · h2 → heading · h3 → title · h4 → name">
        <div class="cn-stack cn-gap-12">
          <h1 class="cn-m-0">Invoices, settled</h1>
          <h2 class="cn-m-0">Quarterly billing summary</h2>
          <h3 class="cn-m-0">Workspace settings</h3>
          <h4 class="cn-m-0">Ada Larsen</h4>
        </div>
      </Demo>

      <h2 class="cn-title">Mono</h2>
      <p class="cn-copy">
        Mono ships in two places: the code roles (<code class="cn-code-inline">.cn-code</code>,{" "}
        <code class="cn-code-inline">.cn-code-inline</code>, <code class="cn-code-inline">.cn-code-meta</code>) and the three
        code wells (<code class="cn-code-inline">.terminal</code>, <code class="cn-code-inline">.codeblock</code>,{" "}
        <code class="cn-code-inline">.command</code>). Two recipes also carry mono inside them: inline{" "}
        <code class="cn-code-inline">code</code> in <a href="/prose">.cn-prose</a> and the shortcut{" "}
        <code class="cn-code-inline">kbd</code> in a <a href="/menu">.menu</a>. Everything else is sans. A consumer may set a short machine
        string in mono elsewhere; prose, headings and controls stay sans.
        Mono surfaces turn ligatures off, so <code class="cn-code-inline">=&gt;</code>{" "}
        stays two characters.
      </p>

      <Demo title="cn-code · 500 · 13px/1.6 · mono" why="Where mono is used" classes="cn-code">
        <code class="cn-code">pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.5.0</code>
      </Demo>

      <Demo title="cn-code-inline · mono · .92em · 500 · subtext-1" why="Why inline code has no chip" classes="cn-code-inline">
        <p class="cn-copy" style="margin:0">
          Set <code class="cn-code-inline">data-density="compact"</code> on the
          wrapper, or run <code class="cn-code-inline">pnpm sync ./public</code>{" "}
          to copy the CSS.
        </p>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.cn-code-inline</code> is the quiet form for
        code inside prose: mono at 0.92em in{" "}
        <code class="cn-code-inline">--cn-fg-soft</code> (subtext-1), with no
        chip. That is the body color too, so it reads as part of the sentence
        and the mono face alone marks it.
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
          { name: ".cn-display", values: "sans", default: "700 · clamp(36px, 5.44px + 5.88vw, 56px)/1.08 · -0.02em", notes: "Hero headline; balanced. .is-sm is the page-title size. .display-title is the same type." },
          { name: ".cn-heading", values: "sans", default: "700 · 28px/1.25 · -0.02em", notes: "Top-level sections of a long page; balanced. Tailwind text-heading." },
          { name: ".cn-title", values: "sans", default: "600 · 20px/1.3 · -0.01em", notes: "Section and card headings. A bare h3 takes it, and so does a header band's h2 or h3 at --band-title-size." },
          { name: ".cn-name", values: "sans", default: "600 · 14px/1.25 · text", notes: "The ui role in --cn-fg. Its tokens alias the ui tokens; proper names are set apart by full-strength color." },
          { name: ".cn-lede", values: "sans", default: "400 · 18px/1.6 · subtext-1", notes: "Intro paragraph; max-width --cn-measure (68ch). 20px in .page-main.is-reading. .lede is the recipe form." },
          { name: ".cn-copy", values: "sans", default: "400 · 16px/1.6 · subtext-1", notes: "Body prose in --cn-fg-body, the same role as body. 15px at compact density." },
          { name: ".cn-ui", values: "sans", default: "600 · 14px/1.25", notes: "Control text outside a recipe." },
          { name: ".cn-label", values: "sans", default: "500 · 14px/1.25 · subtext-1", notes: "Field and section labels; sentence case. --cn-fg-soft, a stop above meta." },
          { name: ".cn-microlabel", values: "sans", default: "500 · 12px/1.25 · +0.08em · uppercase · subtext-0", notes: "A fact's label. The only uppercase role and the only 12px one." },
          { name: ".cn-value", values: "sans", default: "600 · 24px/1 · -0.02em · tabular", notes: "Stat numbers." },
          { name: ".cn-value-lg", values: "sans", default: "600 · clamp(26px, 10.72px + 2.94vw, 36px)/1 · -0.025em · tabular", notes: "Large stat in var(--accent); text inside an accent card. 36px from 860px up, 4px under the page title at every width. Opt out with a color utility." },
          { name: ".cn-meta", values: "sans", default: "400 · 14px/1.5 · tabular · subtext-0", notes: "Timestamps, counts, versions. The label's size, a weight under its 500 and a stop dimmer, --cn-fg-muted." },
          { name: ".cn-code", values: "mono", default: "500 · 13px/1.6 · tabular", notes: "Machine literals, CLI strings." },
          { name: ".cn-code-inline", values: "mono", default: "500 · 0.92em · subtext-1", notes: "Code inside prose, in --cn-fg-soft." },
          { name: ".cn-code-meta", values: "mono", default: "500 · 13px/1 · subtext-0", notes: "A model id, a path or a hash under a name." },
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
