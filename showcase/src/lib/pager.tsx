/* ── pager ──────────────────────────────────────────────────────────────────
   A .pagination built from package classes only, shared by the Pagination
   page and the Dashboard example. Pages are buttons because the demos keep
   their state in memory; in an app they are links to ?page=n. The end
   chevrons use aria-disabled, so focus stays on them at the last page.  */

const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

const PrevIcon = () => (
  <svg {...STROKE}>
    <path d="m15 6-6 6 6 6" />
  </svg>
);
const NextIcon = () => (
  <svg {...STROKE}>
    <path d="m9 6 6 6-6 6" />
  </svg>
);

/* Page numbers to show: the ends, the current page and its neighbors, and
   null where a run of two or more is skipped. A gap of one page shows the
   page, since the ellipsis would be as wide as the number. */
export function pageList(current: number, total: number): (number | null)[] {
  const keep = new Set([1, total, current - 1, current, current + 1]);
  const out: (number | null)[] = [];
  for (let p = 1; p <= total; p++) {
    if (keep.has(p) || (keep.has(p - 1) && keep.has(p + 1))) out.push(p);
    else if (out[out.length - 1] !== null) out.push(null);
  }
  return out;
}

interface PagerProps {
  current: number;
  total: number;
  label: string;
  onPage: (page: number) => void;
}

export function Pager({ current, total, label, onPage }: PagerProps) {
  return (
    <nav class="pagination" aria-label={label}>
      <button
        type="button"
        aria-label="Previous page"
        aria-disabled={current === 1 ? "true" : undefined}
        onClick={() => current > 1 && onPage(current - 1)}
      >
        <PrevIcon />
      </button>
      {pageList(current, total).map((p, i) =>
        p === null ? (
          <span key={`gap-${i}`} aria-hidden="true">
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            aria-label={`Page ${p}`}
            aria-current={p === current ? "page" : undefined}
            onClick={() => onPage(p)}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        aria-label="Next page"
        aria-disabled={current === total ? "true" : undefined}
        onClick={() => current < total && onPage(current + 1)}
      >
        <NextIcon />
      </button>
    </nav>
  );
}
