import { Doc, Demo, CodeBlock } from "../lib/doc";

const LAYER_CODE = `@layer cn.tokens, cn.recipes, cn.utilities;
@import "./tokens.css" layer(cn.tokens);
@import "./recipes.css" layer(cn.recipes);
@import "./utilities.css" layer(cn.utilities);`;

const CDN_CODE = `<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/BalajiLeninrajan/catppuccin-neu@v2.0.0/css/index.css">`;

const INSTALL_CODE = `pnpm add github:BalajiLeninrajan/catppuccin-neu#v2.0.0`;

const IMPORT_CODE = `/* your entry stylesheet */
@import "catppuccin-neu/css/index.css";`;

const FONTS_CODE = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=JetBrains+Mono:ital,wght@0,100..800;1,100..800&display=swap" rel="stylesheet">`;

export default function IntroductionPage() {
  return (
    <Doc
      title="Introduction"
      lede="catppuccin-neu is a dark-only design system in plain CSS: Catppuccin Mocha color, a mauve primary, hard plates under everything you can click, carved fields and one tilted panel per view."
    >
      <Demo title="First look" row classes="btn btn-primary">
        <button type="button" class="btn btn-primary">New invoice</button>
        <button type="button" class="btn btn-secondary">Export</button>
        <span class="chip"><span class="live-dot" aria-hidden="true" /> 3 online</span>
        <span class="tag cn-tone-green">Paid</span>
      </Demo>

      <p class="cn-copy">
        The page is mantle and panels sit one fill step above it on base. The
        light comes from the top left, so every shadow falls down and to the
        right.
      </p>

      <section>
        <h2 class="cn-title">Install</h2>
        <p class="cn-copy">
          A hand-written page links the CDN. Pin a full tag, and link{" "}
          <code class="cn-code-inline">index.css</code> so the three files
          keep their layers.
        </p>
        <CodeBlock title="CDN (no build)" code={CDN_CODE} />
        <p class="cn-copy">
          A project with a bundler takes the git dependency and imports the
          one entry point.
        </p>
        <CodeBlock title="Add the dependency" code={INSTALL_CODE} />
        <CodeBlock title="Import the CSS" code={IMPORT_CODE} />
        <p class="cn-copy">
          The package ships no font files. Link Inter and JetBrains
          Mono on every page.
        </p>
        <CodeBlock title="Fonts (index.html)" code={FONTS_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Three layers, one import</h2>
        <p class="cn-copy">
          <code class="cn-code-inline">cn.tokens</code> holds the palette,
          the shadows and the reset. <code class="cn-code-inline">cn.recipes</code>{" "}
          holds the components. <code class="cn-code-inline">cn.utilities</code>{" "}
          holds the <code class="cn-code-inline">cn-*</code> classes and sits
          last, so <code class="cn-code-inline">panel cn-p-16</code> pads the
          panel. Your own CSS stays unlayered and wins without{" "}
          <code class="cn-code-inline">!important</code>.
        </p>
        <CodeBlock title="css/index.css, the entry point" code={LAYER_CODE} />
      </section>

      <section>
        <h2 class="cn-title">Where to go next</h2>
        <p class="cn-copy">
          The Foundation pages cover <a href="/colors">color</a>,{" "}
          <a href="/typography">type</a>, <a href="/depth">depth</a> and{" "}
          <a href="/layout">layout</a>. Each component page lists its classes
          under the demo. The <a href="/examples/dashboard">dashboard</a> and{" "}
          <a href="/examples/settings">settings</a> examples are built from
          package classes alone.
        </p>
      </section>
    </Doc>
  );
}
