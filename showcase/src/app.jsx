import Foundation from "./sections/foundation.jsx";
import Controls from "./sections/controls.jsx";
import Forms from "./sections/forms.jsx";
import Marks from "./sections/marks.jsx";
import Data from "./sections/data.jsx";
import Overlays from "./sections/overlays.jsx";
import Playground from "./sections/playground.jsx";

/* Section registry — id doubles as the anchor target and nav href. */
const SECTIONS = [
  { id: "foundation", label: "Foundation", Component: Foundation },
  { id: "controls", label: "Controls", Component: Controls },
  { id: "forms", label: "Forms", Component: Forms },
  { id: "marks", label: "Marks", Component: Marks },
  { id: "data", label: "Data", Component: Data },
  { id: "overlays", label: "Overlays", Component: Overlays },
  { id: "playground", label: "Playground", Component: Playground },
];

export function App() {
  return (
    <div class="app-shell">
      <header class="topbar">
        <a class="sc-wordmark" href="#top">
          catppuccin<em>·</em>neu
        </a>
        <nav class="sc-nav" aria-label="Sections">
          {SECTIONS.map((s) => (
            <a key={s.id} href={`#${s.id}`}>
              {s.label}
            </a>
          ))}
        </nav>
      </header>
      <main id="top" class="sc-main">
        {/* Hero — the one rotated, hard-shadowed card (.panel.is-tilted),
            flattened at ≤1060px. Header type uses the skill-compat aliases
            (.eyebrow / .display-title / .lede) so the twins render too. */}
        <section class="panel is-tilted sc-hero" aria-label="About this showcase">
          <p class="eyebrow">
            <span class="live-dot" /> catppuccin-neu · visual-regression reference
          </p>
          <h1 class="display-title">
            One system, <em>five</em> fleets.
          </h1>
          <p class="lede">
            Benchmarks, exams, races, and word drills all render from the same
            Mocha tokens, the same four neu shadows, and one mauve accent.
            Every utility and recipe state below appears at least once — this
            page is what backports are checked against.
          </p>
          <div class="sc-row">
            <span class="chip">tokens · utilities · recipes</span>
            <span class="chip">radii 16 / 13 / 10 / 8 / 4 / 999 / 50%</span>
            <span class="chip-tone cn-tone-mauve">canon</span>
          </div>
        </section>
        {SECTIONS.map(({ id, Component }) => (
          <Component key={id} />
        ))}
      </main>
      <footer class="footer-neu">
        <span>catppuccin·neu</span>
        <p>
          Mocha only · four neu shadows + three promoted · mauve is the one
          accent · mono for machines, sans for humans
        </p>
        <span>consenStat · harness-racer · salt · skill-issue · varchar</span>
      </footer>
    </div>
  );
}
