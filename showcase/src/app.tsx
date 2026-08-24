import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import { useState, useEffect } from "preact/hooks";
import { GROUPS, PAGES } from "./nav";
import { Doc } from "./lib/doc";

function Wordmark() {
  return (
    <a class="sc-wordmark" href="/">
      catppuccin<em>·</em>neu
    </a>
  );
}

/* Grouped nav links. Active link gets the system's own engaged treatment. */
function NavGroups() {
  const { path } = useLocation();
  return (
    <nav class="sc-nav" aria-label="Documentation">
      {GROUPS.map((group) => (
        <div key={group} class="sc-nav-group">
          <p class="cn-microlabel sc-nav-group-title">{group}</p>
          {PAGES.filter((p) => p.group === group).map((p) => {
            const active = path === p.path;
            return (
              <a
                key={p.path}
                href={p.path}
                class={`sc-nav-link cn-r-control${active ? " cn-engaged is-active" : ""}`}
                aria-current={active ? "page" : undefined}
              >
                {p.title}
              </a>
            );
          })}
        </div>
      ))}
    </nav>
  );
}

/* Fixed left sidebar; collapses to a topbar + disclosure below 900px. */
function Sidebar() {
  const { path } = useLocation();
  const [open, setOpen] = useState(false);

  /* Close the mobile disclosure whenever the route changes. */
  useEffect(() => setOpen(false), [path]);

  return (
    <aside class={`sc-sidebar${open ? " is-open" : ""}`}>
      <div class="sc-sidebar-top">
        <Wordmark />
        <button
          type="button"
          class="btn btn-flat sc-menu-btn"
          aria-expanded={open}
          aria-controls="sc-nav"
          onClick={() => setOpen((v) => !v)}
        >
          Menu
        </button>
      </div>
      <div id="sc-nav" class="sc-sidebar-scroll">
        <NavGroups />
      </div>
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
      <div class="app-shell sc-shell">
        <Sidebar />
        <div class="sc-content">
          <main class="sc-measure">
            <Router onRouteChange={() => window.scrollTo(0, 0)}>
              {PAGES.map((p) => (
                <Route key={p.path} path={p.path} component={p.component} />
              ))}
              <Route default component={NotFound} />
            </Router>
          </main>
          <footer class="footer-neu">
            <span>catppuccin·neu</span>
            <p>
              Mocha only · four neu shadows + three promoted · mauve is the one
              accent · mono is for code
            </p>
            <span>tokens · utilities · recipes</span>
          </footer>
        </div>
      </div>
    </LocationProvider>
  );
}
