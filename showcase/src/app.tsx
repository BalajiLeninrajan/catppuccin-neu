import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import posthog from "posthog-js";
import { GROUPS, PAGES } from "./nav";
import { Doc } from "./lib/doc";

function Wordmark() {
  return (
    <a class="wordmark" href="/">
      <span class="mark" aria-hidden="true">cn</span>
      catppuccin<em>·</em>neu
    </a>
  );
}

/* Below 1060px the nav folds behind the Menu toggle. */
function Sidebar() {
  const { path } = useLocation();
  const [open, setOpen] = useState(false);

  useEffect(() => setOpen(false), [path]);

  /* A deep link can land on a page whose link sits below the fold. */
  useEffect(() => {
    document.querySelector('#sc-nav a[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [path]);

  return (
    <aside class={`sc-sidebar${open ? " is-open" : ""}`}>
      <div class="sc-sidebar-head">
        <Wordmark />
        <button
          type="button"
          class="btn btn-ghost is-sm sc-sidebar-toggle"
          aria-expanded={open}
          aria-controls="sc-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      <nav id="sc-nav" class="sc-sidebar-body" aria-label="Documentation">
        {GROUPS.map((group) => (
          <div key={group}>
            <p class="cn-microlabel">{group}</p>
            {PAGES.filter((p) => p.group === group).map((p) => (
              <a key={p.path} href={p.path} aria-current={path === p.path ? "page" : undefined}>
                {p.title}
              </a>
            ))}
          </div>
        ))}
      </nav>
    </aside>
  );
}

function NotFound() {
  return (
    <Doc title="Not found" lede="No page lives at this path.">
      <p class="cn-copy">
        <a class="btn-text" href="/">
          Back to the introduction
        </a>
      </p>
    </Doc>
  );
}

/* The examples take a wider column than the docs. */
function Content() {
  const { path } = useLocation();
  return (
    <div class={`sc-content${path.startsWith("/examples/") ? " is-wide" : ""}`}>
      <main id="main" tabIndex={-1} class="sc-measure">
        <Router onRouteChange={() => window.scrollTo(0, 0)}>
          {PAGES.map((p) => (
            <Route key={p.path} path={p.path} component={p.component} />
          ))}
          <Route default component={NotFound} />
        </Router>
      </main>
      <footer class="page-footer">
        <span>catppuccin·neu</span>
        <p>Made with 💜 in Waterloo</p>
        <a
          class="btn-text"
          href="https://github.com/BalajiLeninrajan/catppuccin-neu"
          target="_blank"
          rel="noreferrer"
          onClick={() =>
            posthog.capture("outbound_link", { destination: "github", location: "footer" })
          }
        >
          GitHub
        </a>
      </footer>
    </div>
  );
}

export function App() {
  return (
    <LocationProvider>
      <a class="cn-skip-link" href="#main">
        Skip to content
      </a>
      <div class="app-shell sc-shell">
        <Sidebar />
        <Content />
      </div>
    </LocationProvider>
  );
}
