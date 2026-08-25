import { Doc, Demo, CodeBlock } from "../lib/doc";

const LAYER_CODE = `@layer cn.tokens, cn.utilities, cn.recipes;
@import "./tokens.css" layer(cn.tokens);
@import "./utilities.css" layer(cn.utilities);
@import "./recipes.css" layer(cn.recipes);`;

const INSTALL_CODE = `pnpm add github:BalajiLeninrajan/catppuccin-neu#v0.1.1`;

const IMPORT_CODE = `/* your entry stylesheet */
@import "catppuccin-neu/css/index.css";`;

const FONTS_CODE = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&family=JetBrains+Mono:wght@100..800&display=swap" rel="stylesheet">`;

const SYNC_CODE = `# copies tokens.css, utilities.css, recipes.css, index.css into public/styles
node node_modules/catppuccin-neu/scripts/sync.mjs public/styles

# or via the package bin
pnpm exec catppuccin-neu-sync public/styles`;

const LINKS_CODE = `<link rel="stylesheet" href="/styles/tokens.css">
<link rel="stylesheet" href="/styles/utilities.css">
<link rel="stylesheet" href="/styles/recipes.css">`;

const TAILWIND_CODE = `// tailwind.config.cjs (Tailwind v3)
module.exports = {
  presets: [require("catppuccin-neu/tailwind/preset.cjs")],
};

/* Tailwind v4 */
@import "catppuccin-neu/tailwind/theme.css";`;

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
          lift off the page with a soft shadow pair; inputs, wells, and
          selected states press in with an inset. Clickable controls carry a
          flat hard-offset shadow and press with a half-slide onto it. Type is
          Inter everywhere, JetBrains Mono for code. Mauve is the one accent;
          everything else is a semantic tint passed through a custom property.
        </p>
      </section>

      <Demo title="First look" row classes="btn btn-primary">
        <button type="button" class="btn btn-primary">New invoice</button>
        <button type="button" class="btn btn-secondary">Export</button>
        <span class="chip"><span class="live-dot" /> 3 online</span>
        <span class="chip-tone cn-tone-green">paid</span>
      </Demo>

      <section>
        <h2 class="cn-title">Three layers, one import</h2>
        <p class="cn-copy">
          The package is three cascade layers.{" "}
          <code class="cn-code">cn.tokens</code> holds the palette, shadows,
          contract properties, and reset. <code class="cn-code">cn.utilities</code>{" "}
          holds single-purpose <code class="cn-code">cn-*</code> classes with
          blessed values only. <code class="cn-code">cn.recipes</code> holds
          full components. Your own CSS stays unlayered, so it always wins;
          overrides never need <code class="cn-code">!important</code>.
        </p>
        <CodeBlock title="css/index.css, the entry point" code={LAYER_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Install</h2>
        <p class="cn-copy">
          The package is a git dependency; there is no CDN build. Add it,
          import the one entry point, and link the two font families on every
          public page.
        </p>
        <CodeBlock title="Add the dependency" code={INSTALL_CODE} />
        <CodeBlock title="Import the CSS" code={IMPORT_CODE} />
        <CodeBlock title="Fonts (index.html)" code={FONTS_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Zero-build sites</h2>
        <p class="cn-copy">
          No bundler? <code class="cn-code">scripts/sync.mjs</code> vendors the
          CSS files into any directory you point it at. Node 18+, no
          dependencies. The three files also work as plain{" "}
          <code class="cn-code">&lt;link&gt;</code> tags loaded in order:
          tokens, utilities, recipes.
        </p>
        <CodeBlock title="Vendor the CSS" code={SYNC_CODE} />
        <CodeBlock title="Link in order" code={LINKS_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Tailwind</h2>
        <p class="cn-copy">
          A Tailwind preset maps the system onto theme keys: palette colors
          plus <code class="cn-code">accent</code> and{" "}
          <code class="cn-code">tone</code>, font stacks, role-named radii, the
          shadow set, and control heights. Components still come from the CSS
          recipes; the preset carries no plugin logic.
        </p>
        <CodeBlock title="Preset (v3) / theme (v4)" code={TAILWIND_CODE} />
      </section>
    </Doc>
  );
}
