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

/* Route changes from a link click run inside document.startViewTransition
   where the browser has it, so the root cross-fades and the .cn-morph lead
   panel and primary morph between the two examples. The listener sits on
   the document, so a link's own onClick runs first and preact-iso's
   window listener runs after; it applies preact-iso's checks, stops the
   event short of that listener and hands the route change to the
   transition. Browsers without the API keep the plain swap. */
function ViewTransitions() {
  const { route } = useLocation();

  useEffect(() => {
    if (!("startViewTransition" in document)) return;
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.button !== 0 || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
      const link = e.composedPath().find((el): el is HTMLAnchorElement => el instanceof HTMLAnchorElement && !!el.href);
      if (!link || link.origin !== location.origin || link.download || !/^(_?self)?$/i.test(link.target)) return;
      if (/^#/.test(link.getAttribute("href") ?? "")) return;
      const url = link.href.replace(location.origin, "");
      if (url === location.pathname + location.search) return;
      e.preventDefault();
      e.stopPropagation();
      document.startViewTransition(() => {
        route(url);
        /* Preact renders on a microtask; resolve after it so the new
           route is in the DOM when the browser takes the new snapshot. */
        return new Promise<void>((resolve) => setTimeout(resolve));
      });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [route]);

  return null;
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
      <ViewTransitions />
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
