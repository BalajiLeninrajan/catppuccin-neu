/* ── roving focus ───────────────────────────────────────────────────────────
   Keyboard helpers for the composite widgets the package styles but does
   not script: tabs and menus. Each returns the index it moved to, or -1
   when the key is not one it handles. Disabled items are skipped.        */

/* The enabled items of a composite, in DOM order. */
function enabled(items: HTMLElement[]) {
  return items.filter(
    (el) => !(el as HTMLButtonElement).disabled && el.getAttribute("aria-disabled") !== "true",
  );
}

/* Moves focus among `items` for Home, End and the two arrow keys of one
   axis. Returns the index (in `items`) of the newly focused item. */
export function moveFocus(
  e: KeyboardEvent,
  items: HTMLElement[],
  axis: "horizontal" | "vertical",
): number {
  const prev = axis === "horizontal" ? "ArrowLeft" : "ArrowUp";
  const next = axis === "horizontal" ? "ArrowRight" : "ArrowDown";
  const pool = enabled(items);
  if (pool.length === 0) return -1;
  const at = pool.indexOf(document.activeElement as HTMLElement);
  let to: number;
  switch (e.key) {
    case next:
      to = at < 0 ? 0 : (at + 1) % pool.length;
      break;
    case prev:
      to = at < 0 ? pool.length - 1 : (at - 1 + pool.length) % pool.length;
      break;
    case "Home":
      to = 0;
      break;
    case "End":
      to = pool.length - 1;
      break;
    default:
      return -1;
  }
  e.preventDefault();
  pool[to].focus();
  return items.indexOf(pool[to]);
}

/* Tabs: Left, Right, Home and End move focus and select the tab, so
   selection follows focus. Wire it to the tablist's onKeyDown. */
export function tabsKeydown(e: KeyboardEvent, select: (index: number) => void) {
  const list = e.currentTarget as HTMLElement;
  const tabs = [...list.querySelectorAll<HTMLElement>('[role="tab"]')];
  const i = moveFocus(e, tabs, "horizontal");
  if (i >= 0) select(i);
}
