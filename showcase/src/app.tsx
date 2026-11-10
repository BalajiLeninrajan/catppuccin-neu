import { LocationProvider, Router, Route, useLocation } from "preact-iso";
import type { ComponentChildren } from "preact";
import { useState, useEffect } from "preact/hooks";
import posthog from "posthog-js";
import { GROUPS, PAGES } from "./nav";
import { Doc } from "./lib/doc";

/* The brand tile, .mark, leads the name: the package's own fill, ramp,
   grain and gloss, so the chrome carries an ornament no other docs site
   has instead of a bare name. */
function Wordmark() {
  return (
    <a class="wordmark" href="/">
      <span class="mark" aria-hidden="true">cn</span>
      catppuccin<em>·</em>neu
    </a>
  );
}

/* The package sidebar. The current page is marked through aria-current,
   600 and the spine; below 1060px the nav folds behind the Menu toggle. */
function Sidebar() {
  const { path } = useLocation();
  const [open, setOpen] = useState(false);

  /* Close the folded nav whenever the route changes. */
  useEffect(() => setOpen(false), [path]);

  /* Keep the current link in view: a deep link or the pager can land on a
     page whose link sits below the sidebar's fold. "nearest" does nothing
     when the link already shows. */
  useEffect(() => {
    document.querySelector('#sc-nav a[aria-current="page"]')?.scrollIntoView({ block: "nearest" });
  }, [path]);

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

interface TocItem {
  id: string;
  text: string;
  demo: boolean;
}

const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "section";

/* The "On this page" list: every h2 and Demo title in the open page, read
   from the DOM after each render of it. A target without an id gets one
   from its text. `current` is the last target above the top fifth of the
   window. */
function useToc(path: string) {
  const [items, setItems] = useState<TocItem[]>([]);
  const [current, setCurrent] = useState("");

  useEffect(() => {
    const main = document.getElementById("main");
    if (!main) return;

    const scan = () => {
      const used = new Set<string>();
      const next: TocItem[] = [];
      main.querySelectorAll<HTMLElement>(".sc-doc h2, .sc-doc > .sc-demo > figcaption").forEach((el) => {
        /* An h2 inside a stage belongs to the specimen, not to the page. */
        if (el.closest(".sc-demo-stage")) return;
        const demo = el.tagName === "FIGCAPTION";
        const target = demo ? el.parentElement! : el;
        const text = el.textContent ?? "";
        let id = target.id;
        if (!id || used.has(id)) {
          const base = slug(text);
          id = base;
          for (let n = 2; used.has(id); n++) id = `${base}-${n}`;
          target.id = id;
        }
        used.add(id);
        next.push({ id, text, demo });
      });
      const key = (list: TocItem[]) => list.map((t) => `${t.id}\n${t.text}`).join("\n");
      setItems((prev) => (key(prev) === key(next) ? prev : next));
    };

    scan();
    const mo = new MutationObserver(scan);
    mo.observe(main, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, [path]);

  useEffect(() => {
    if (!items.length) return;
    let frame = 0;
    const spy = () => {
      frame = 0;
      let id = items[0].id;
      for (const t of items) {
        const el = document.getElementById(t.id);
        if (el && el.getBoundingClientRect().top <= window.innerHeight / 5) id = t.id;
      }
      setCurrent(id);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(spy);
    };
    spy();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [items]);

  return { items, current };
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

/* The content column. A page with three or more targets gets the "On this
   page" list in a right column from 1280px up; the rest stay centered.
   The examples take the wide column, 1040px against the docs' 860px. */
function Content({ children }: { children: ComponentChildren }) {
  const { path } = useLocation();
  const { items, current } = useToc(path);
  const toc = items.length > 2;
  const wide = path.startsWith("/examples/");

  return (
    <div class={`sc-content${toc ? " has-toc" : ""}${wide ? " is-wide" : ""}`}>
      {children}
      {toc ? (
        <nav class="sc-toc" aria-label="On this page">
          <p class="cn-microlabel">On this page</p>
          {items.map((t) => (
            <a
              key={t.id}
              href={`#${t.id}`}
              class={`cn-meta${t.demo ? " is-demo" : ""}`}
              aria-current={t.id === current ? "location" : undefined}
            >
              {t.text}
            </a>
          ))}
        </nav>
      ) : null}
    </div>
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
        <Content>
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
        </Content>
      </div>
    </LocationProvider>
  );
}
