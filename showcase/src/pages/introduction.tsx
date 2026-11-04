import { Doc, Demo, CodeBlock } from "../lib/doc";

const LAYER_CODE = `@layer cn.tokens, cn.recipes, cn.utilities;
@import "./tokens.css" layer(cn.tokens);
@import "./recipes.css" layer(cn.recipes);
@import "./utilities.css" layer(cn.utilities);`;

const CDN_CODE = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v0.4.1/css/index.css">`;

const INSTALL_CODE = `pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.4.1`;

const IMPORT_CODE = `/* your entry stylesheet */
@import "catppuccin-neu/css/index.css";`;

const FONTS_CODE = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:opsz,wght@14..32,100..900&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet">`;

const SYNC_CODE = `# copies tokens.css, utilities.css, recipes.css, index.css into public/styles
node node_modules/catppuccin-neu/scripts/sync.mjs public/styles

# or via the package bin
pnpm exec catppuccin-neu-sync public/styles`;

const LINKS_CODE = `<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/recipes.css">
<link rel="stylesheet" href="/styles/utilities.css">`;

const TAILWIND_CODE = `// tailwind.config.cjs (Tailwind v3)
module.exports = {
  presets: [require("catppuccin-neu/tailwind/preset.cjs")],
};

/* Tailwind v4: the package first, so its layers are declared before
   Tailwind's and a utility on an element beats the recipe on it. */
@import "catppuccin-neu/css/index.css";
@import "catppuccin-neu/tailwind/theme.css";
@import "tailwindcss";`;

/* A Lucide-style download glyph: 24-unit grid, stroke 2, round caps.
   No width or height, so each recipe sizes it. */
const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <path d="m7 10 5 5 5-5" />
    <path d="M12 15V3" />
  </svg>
);

export default function IntroductionPage() {
  return (
    <Doc
      title="Introduction"
      lede="catppuccin-neu is a dark-only design system: Catppuccin Mocha color, neumorphic depth from a fixed top-left light source, one mauve accent. It ships as four plain CSS files."
    >
      <section>
        <h2 class="cn-title">The idea</h2>
        <p class="cn-copy">
          Surfaces get their definition from depth, not strokes. Raised panels
          sit one step lighter than the page and lift off it on a cast shadow
          with a lit top edge; inputs, wells, and
          selected states press in with an inset. Clickable controls carry a
          flat hard-offset shadow and press with a half-slide onto it. Type is
          Inter everywhere, JetBrains Mono for code. Mauve is the one accent;
          everything else is a semantic tint passed through a custom property.
        </p>
        <p class="cn-copy">
          The ornaments are one idea. Each is a physical object under the one
          top-left light. A carve sits below the ground, a plate is the side of
          a block standing on it, and the tilt lifts one card off it. The
          switch rocker is a wall switch in a carved plate. The gloss and the
          fill ramp are that light on a solid fill, grain is the fill's tooth,
          and the spring is the block settling back.
        </p>
      </section>

      <section>
        <h2 class="cn-title">Dark only</h2>
        <p class="cn-copy">
          The package sets <code class="cn-code-inline">color-scheme: dark</code>{" "}
          and does not answer{" "}
          <code class="cn-code-inline">prefers-color-scheme: light</code>. Light
          text on a dark ground blooms for readers with astigmatism, so the
          system holds the fixes that fit dark mode. Body text is subtext-1,
          not white. Body weight is 400 and leading is 1.6. Under{" "}
          <code class="cn-code-inline">prefers-contrast: more</code> every text
          role moves one stop lighter.
        </p>
      </section>

      <Demo title="First look" row classes="btn btn-primary">
        <button type="button" class="btn btn-primary">New invoice</button>
        <button type="button" class="btn btn-secondary">Export</button>
        <span class="chip"><span class="live-dot" aria-hidden="true" /> 3 online</span>
        <span class="tag cn-tone-green">Paid</span>
      </Demo>

      <section>
        <h2 class="cn-title">Three layers, one import</h2>
        <p class="cn-copy">
          The package is three cascade layers.{" "}
          <code class="cn-code-inline">cn.tokens</code> holds the palette, shadows,
          contract properties, and reset. <code class="cn-code-inline">cn.recipes</code>{" "}
          holds full components. <code class="cn-code-inline">cn.utilities</code>{" "}
          holds single-purpose <code class="cn-code-inline">cn-*</code> classes with
          token values only, and sits above the recipes, so a utility on an
          element always beats the recipe on that element:{" "}
          <code class="cn-code-inline">well cn-bg-well</code> fills the well. Your own
          CSS stays unlayered, so it always wins; overrides never need{" "}
          <code class="cn-code-inline">!important</code>.
        </p>
        <CodeBlock title="css/index.css, the entry point" code={LAYER_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Install</h2>
        <p class="cn-copy">
          A hand-written page with no <code class="cn-code-inline">package.json</code>{" "}
          links the CDN: jsDelivr serves the repo's tags straight from GitHub.
          Pin a full tag. <code class="cn-code-inline">@main</code> and truncated
          ranges float and re-cache every 12 hours. Link{" "}
          <code class="cn-code-inline">index.css</code> rather than the three files,
          so the relative imports keep their layer wrappers.
        </p>
        <CodeBlock title="CDN (no build)" code={CDN_CODE} />
        <p class="cn-copy">
          Anything with a bundler takes the git dependency instead, so the
          version pin lives in one file rather than in every{" "}
          <code class="cn-code-inline">&lt;head&gt;</code>. Add it, import the one
          entry point, and link the two font families on every public page.
          Link Inter with its optical-size axis; the root sets{" "}
          <code class="cn-code-inline">font-optical-sizing: auto</code> and reads it.
        </p>
        <CodeBlock title="Add the dependency" code={INSTALL_CODE} />
        <CodeBlock title="Import the CSS" code={IMPORT_CODE} />
        <CodeBlock title="Fonts (index.html)" code={FONTS_CODE} />
        <p class="cn-copy">
          Script is optional. The CSS reads ARIA state and looks right without
          it. For the keyboard model of tabs, menus, sliders, tooltips and
          toasts, <code class="cn-code-inline">import {"{ init }"} from "catppuccin-neu/js"</code>{" "}
          and call it once. The <a href="/behavior">Behavior</a> page covers it.
        </p>
      </section>

      <section>
        <h2 class="cn-title">Zero-build sites</h2>
        <p class="cn-copy">
          Building a static site? <code class="cn-code-inline">scripts/sync.mjs</code>{" "}
          copies the CSS files into any directory you point it at. Run it in a
          pre-build hook and gitignore the output. Node 18+, no dependencies.
          The three files also work as plain{" "}
          <code class="cn-code-inline">&lt;link&gt;</code> tags loaded in order:
          tokens, recipes, utilities.
        </p>
        <CodeBlock title="Sync the CSS" code={SYNC_CODE} />
        <CodeBlock title="Link in order" code={LINKS_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Tailwind</h2>
        <p class="cn-copy">
          A Tailwind preset maps the system onto theme keys: palette colors,
          the semantic roles (<code class="cn-code-inline">text-fg-muted</code>,{" "}
          <code class="cn-code-inline">ring-focus</code>,{" "}
          <code class="cn-code-inline">bg-surface-raised</code> and the rest),{" "}
          <code class="cn-code-inline">accent</code> and{" "}
          <code class="cn-code-inline">tone</code>, the type roles{" "}
          (<code class="cn-code-inline">text-label</code>,{" "}
          <code class="cn-code-inline">text-heading</code> and the rest), font stacks,
          the data series and ramps (<code class="cn-code-inline">bg-series-1</code>{" "}
          to <code class="cn-code-inline">-6</code>,{" "}
          <code class="cn-code-inline">bg-ramp-1</code> to{" "}
          <code class="cn-code-inline">-5</code>,{" "}
          <code class="cn-code-inline">bg-diverge-1</code> to{" "}
          <code class="cn-code-inline">-5</code>), role-named radii, the shadow
          set, control heights and the motion durations. Components still come from the CSS recipes; the preset
          carries no plugin logic.
        </p>
        <CodeBlock title="Preset (v3) / theme (v4)" code={TAILWIND_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Icons</h2>
        <p class="cn-copy">
          The package ships no icon set, but every recipe that holds an icon
          sizes it. Use one stroke family throughout: a 24-unit grid, round
          caps and joins, a stroke of 2 to 2.2,{" "}
          <code class="cn-code-inline">currentColor</code> and no fills.{" "}
          <a href="https://lucide.dev/" target="_blank" rel="noreferrer">Lucide</a>{" "}
          matches it and is the default choice. The status glyphs the CSS
          draws use the same stroke.
        </p>
        <p class="cn-copy">
          Recipes set 12px in a tag, 13px in a text button, 14px in a chip or
          a small button, 16px in a button, a banner or a menu row, and 18 to
          20px in a large button or a large icon button. Leave width and
          height off the svg and let the recipe size it. An icon beside a word
          is <code class="cn-code-inline">aria-hidden</code>. An icon alone needs
          an accessible name on its control.
        </p>
      </section>

      <Demo title="One stroke family at recipe sizes" row classes="btn btn-secondary > svg · btn is-icon[aria-label] · chip > svg">
        <button type="button" class="btn btn-secondary">
          <DownloadIcon />
          Export
        </button>
        <button type="button" class="btn btn-secondary is-sm">
          <DownloadIcon />
          Export
        </button>
        <button type="button" class="btn btn-ghost is-icon" aria-label="Download statement">
          <DownloadIcon />
        </button>
        <span class="chip">
          <DownloadIcon />
          PDF
        </span>
      </Demo>

      <section id="ornament-budget">
        <h2 class="cn-title">Ornament budget</h2>
        <p class="cn-copy">
          The ornaments are the system's identity, and they only read as
          ornaments when they are rare. A view holds:
        </p>
        <ul class="cn-copy">
          <li>one tilted panel, holding a summary or an aside, never a table or a form;</li>
          <li>one primary button;</li>
          <li>at most one <code class="cn-code-inline">.is-lg</code> control;</li>
          <li>one ornament per element.</li>
        </ul>
        <p class="cn-copy">
          <code class="cn-code-inline">.is-lg</code> here means a hero control: a
          large button or <code class="cn-code-inline">.input-lg</code>. A large
          stat or a large avatar does not count. Each ornament also has one
          home. Grain sits only on solid accent fills. Blur sits only on the
          topbar, the folded sidebar and the scrim. Plates sit only under
          things a reader can click and under accent cards.
        </p>
        <p class="cn-copy">
          The four <a href="/examples/dashboard">Examples</a> pages, a
          dashboard, a settings screen, an invoice detail and an empty
          project, are built from package classes alone and stay inside this
          budget.
        </p>
      </section>
    </Doc>
  );
}
