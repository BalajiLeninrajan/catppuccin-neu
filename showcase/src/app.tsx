import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import posthog from "posthog-js";
import { GROUPS, PAGES } from "./nav";
import { Doc } from "./lib/doc";

function Wordmark() {
  return (
    <a class="wordmark" href="/">
      catppuccin<em>·</em>neu
    </a>
  );
}

/* The package sidebar. The current page wears the engaged state through
   aria-current; below 1060px the nav folds behind the Menu toggle. */
function Sidebar() {
  const { path } = useLocation();
  const [open, setOpen] = useState(false);

  /* Close the folded nav whenever the route changes. */
  useEffect(() => setOpen(false), [path]);

  return (
    <aside class={`sidebar${open ? " is-open" : ""}`}>
      <div class="sidebar-head">
        <Wordmark />
        <button
          type="button"
          class="btn btn-ghost is-sm sidebar-toggle"
          aria-expanded={open}
          aria-controls="sc-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      <nav id="sc-nav" class="sidebar-body sidebar-nav" aria-label="Documentation">
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

export function App() {
  return (
    <LocationProvider>
      {/* The first focusable element: Tab from the top of any page shows it. */}
      <a class="cn-skip-link" href="#main">
        Skip to content
      </a>
      <div class="app-shell has-sidebar">
        <Sidebar />
        <div class="sc-content">
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
      </div>
    </LocationProvider>
  );
}
