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
  /* Enter toggles a focused accordion input (Space works natively). */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement;
      if (e.key === "Enter" && t.matches?.(".accordion input")) {
        (t as HTMLInputElement).click();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, []);

  /* A checked accordion radio unchecks on its next click, so an exclusive
     group can close fully. The press arms the radio that was already
     checked (capture, so it runs before the Enter listener's click); the
     click that follows clears it. */
  useEffect(() => {
    let held: HTMLInputElement | null = null;
    const radio = (el: EventTarget | null) =>
      (el as HTMLElement | null)?.closest?.(".accordion > label")?.querySelector<HTMLInputElement>("input[type=radio]") ?? null;
    const arm = (r: HTMLInputElement | null) => {
      held = r?.checked ? r : null;
    };
    const onPress = (e: Event) => arm(radio(e.target));
    const onClick = (e: Event) => {
      const t = e.target as HTMLInputElement;
      if (!t.matches?.(".accordion input[type=radio]")) return;
      if (t === held) t.checked = false;
      held = null;
    };
    document.addEventListener("pointerdown", onPress, true);
    document.addEventListener("keydown", onPress, true);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("pointerdown", onPress, true);
      document.removeEventListener("keydown", onPress, true);
      document.removeEventListener("click", onClick);
    };
  }, []);

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
            <p>Made with 💜 in Waterloo</p>
            <a
              class="btn-text"
              href="https://github.com/BalajiLeninrajan/catppuccin-neu"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </footer>
        </div>
      </div>
    </LocationProvider>
  );
}
