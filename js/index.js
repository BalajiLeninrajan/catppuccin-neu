/* catppuccin-neu behavior: optional, framework-free.

   The CSS styles tabs, menus, tooltips, sliders and toasts from ARIA state.
   This module keeps that state and the keyboard model in step, so an app
   that does not bring its own widgets gets the WAI-ARIA patterns for free.
   Every function returns a cleanup that removes what it added.

     import { init } from "catppuccin-neu/js";
     init();               // wires everything under document

   Or wire one widget at a time with tabs(), menu(), slider(), tooltips()
   and toast(). */

const ENABLED = (el) => !el.disabled && el.getAttribute("aria-disabled") !== "true";

/* Moves focus among items for Home, End and one axis of arrows. Returns
   the newly focused item, or null when the key is not one it handles. */
function rove(e, items, axis) {
  const prev = axis === "horizontal" ? "ArrowLeft" : "ArrowUp";
  const next = axis === "horizontal" ? "ArrowRight" : "ArrowDown";
  const pool = items.filter(ENABLED);
  if (!pool.length) return null;
  const rtl = axis === "horizontal" && getComputedStyle(e.currentTarget).direction === "rtl";
  const at = pool.indexOf(document.activeElement);
  let to;
  switch (e.key) {
    case rtl ? prev : next: to = at < 0 ? 0 : (at + 1) % pool.length; break;
    case rtl ? next : prev: to = at < 0 ? pool.length - 1 : (at - 1 + pool.length) % pool.length; break;
    case "Home": to = 0; break;
    case "End": to = pool.length - 1; break;
    default: return null;
  }
  e.preventDefault();
  pool[to].focus();
  return pool[to];
}

/* Tabs: a [role="tablist"] of [role="tab"] buttons, each with
   aria-controls naming its [role="tabpanel"]. Arrows, Home and End move
   focus and select, so selection follows focus. Only the selected tab
   is in the tab order, and only its panel shows. Fires "cn-select" on
   the tablist with the tab in event.detail. On a .tabs carve it also
   measures the selected tab into --cn-tab-x and --cn-tab-w and sets
   data-cn-indicator, so the raised pill slides to the new tab. */
export function tabs(list) {
  const all = () => [...list.querySelectorAll('[role="tab"]')];
  const pill = list.classList.contains("tabs");
  const place = () => {
    const tab = all().find((t) => t.getAttribute("aria-selected") === "true");
    if (!tab) { list.removeAttribute("data-cn-indicator"); return; }
    /* .tabs is positioned, so offsetLeft reads from its padding edge and
       ignores scroll and transforms. Set before the attribute, so the
       first pill lands without a slide. */
    list.style.setProperty("--cn-tab-x", `${tab.offsetLeft}px`);
    list.style.setProperty("--cn-tab-w", `${tab.offsetWidth}px`);
    list.setAttribute("data-cn-indicator", "");
  };
  /* Fonts loading or a label changing moves the tabs, so the pill follows. */
  const watch = pill && typeof ResizeObserver === "function" ? new ResizeObserver(place) : null;
  if (watch) { watch.observe(list); all().forEach((t) => watch.observe(t)); }
  const select = (tab) => {
    for (const t of all()) {
      const on = t === tab;
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
      const panel = t.getAttribute("aria-controls") && document.getElementById(t.getAttribute("aria-controls"));
      if (panel) panel.hidden = !on;
    }
    if (pill) place();
    list.dispatchEvent(new CustomEvent("cn-select", { detail: tab, bubbles: true }));
  };
  const current = all().find((t) => t.getAttribute("aria-selected") === "true") ?? all().find(ENABLED);
  if (current) select(current);
  const onKey = (e) => { const t = rove(e, all(), "horizontal"); if (t) select(t); };
  const onClick = (e) => { const t = e.target.closest('[role="tab"]'); if (t && list.contains(t) && ENABLED(t)) select(t); };
  list.addEventListener("keydown", onKey);
  list.addEventListener("click", onClick);
  return () => {
    list.removeEventListener("keydown", onKey);
    list.removeEventListener("click", onClick);
    if (pill) {
      watch?.disconnect();
      list.removeAttribute("data-cn-indicator");
      list.style.removeProperty("--cn-tab-x");
      list.style.removeProperty("--cn-tab-w");
    }
  };
}

/* Menu button: a trigger with aria-haspopup="menu" and aria-controls
   naming a .menu[role="menu"] that starts hidden. Click, Enter, Space or
   ArrowDown opens on the first item, ArrowUp on the last. Arrows, Home
   and End move; Escape closes and returns focus to the trigger; Tab or a
   press outside closes without stealing focus. A menuitemcheckbox
   toggles aria-checked and stays open; any other item closes. The
   trigger's aria-expanded is its engaged state. */
export function menu(trigger) {
  const pop = document.getElementById(trigger.getAttribute("aria-controls"));
  if (!pop) return () => {};
  const items = () => [...pop.querySelectorAll('[role^="menuitem"]')];
  const isOpen = () => !pop.hidden;
  const open = (where = "first") => {
    pop.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
    const pool = items().filter(ENABLED);
    (where === "last" ? pool.at(-1) : pool[0])?.focus();
    document.addEventListener("pointerdown", away, true);
  };
  const close = (refocus = true) => {
    pop.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    document.removeEventListener("pointerdown", away, true);
    if (refocus) trigger.focus();
  };
  const away = (e) => { if (!pop.contains(e.target) && !trigger.contains(e.target)) close(false); };
  const onTrigger = () => (isOpen() ? close() : open());
  const onTriggerKey = (e) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") { e.preventDefault(); open(e.key === "ArrowUp" ? "last" : "first"); }
  };
  const onMenuKey = (e) => {
    if (e.key === "Escape") { e.preventDefault(); close(); return; }
    if (e.key === "Tab") { close(false); return; }
    rove(e, items(), "vertical");
  };
  const onMenuClick = (e) => {
    const item = e.target.closest('[role^="menuitem"]');
    if (!item || !ENABLED(item)) return;
    if (item.getAttribute("role") === "menuitemcheckbox") {
      item.setAttribute("aria-checked", item.getAttribute("aria-checked") === "true" ? "false" : "true");
      return;
    }
    close();
  };
  pop.hidden = true;
  trigger.setAttribute("aria-expanded", "false");
  trigger.addEventListener("click", onTrigger);
  trigger.addEventListener("keydown", onTriggerKey);
  pop.addEventListener("keydown", onMenuKey);
  pop.addEventListener("click", onMenuClick);
  return () => {
    document.removeEventListener("pointerdown", away, true);
    trigger.removeEventListener("click", onTrigger);
    trigger.removeEventListener("keydown", onTriggerKey);
    pop.removeEventListener("keydown", onMenuKey);
    pop.removeEventListener("click", onMenuClick);
  };
}

/* Slider: keeps --value, the fill's stop, in step with an
   input[type="range"].slider. */
export function slider(input) {
  const sync = () => {
    const min = +input.min || 0, max = input.max === "" ? 100 : +input.max;
    input.style.setProperty("--value", `${((+input.value - min) / (max - min || 1)) * 100}%`);
  };
  sync();
  input.addEventListener("input", sync);
  return () => input.removeEventListener("input", sync);
}

/* Tooltips: Escape hides any showing [data-tip] (WCAG 1.4.13) until the
   pointer or focus leaves it. Install once per document. */
export function tooltips(doc = document) {
  const onKey = (e) => {
    if (e.key !== "Escape") return;
    doc.querySelectorAll("[data-tip]:is(:hover, :focus-visible, :has(:focus-visible))")
      .forEach((el) => el.setAttribute("data-tip-dismissed", ""));
  };
  const clear = (e) => {
    const el = e.target?.closest?.("[data-tip-dismissed]");
    if (el && !el.contains(e.relatedTarget)) el.removeAttribute("data-tip-dismissed");
  };
  doc.addEventListener("keydown", onKey);
  doc.addEventListener("pointerleave", clear, true);
  doc.addEventListener("focusout", clear, true);
  return () => {
    doc.removeEventListener("keydown", onKey);
    doc.removeEventListener("pointerleave", clear, true);
    doc.removeEventListener("focusout", clear, true);
  };
}

/* Toast: appends a .toast to a .toast-stack (give the stack role="region",
   aria-live="polite" and an aria-label). It dismisses after `timeout` ms,
   paused while the pointer or focus is in the stack; 0 keeps it until
   dismissed. A swipe toward the end edge dismisses it too. The exit runs
   through [hidden], then the node goes. Returns
   { el, dismiss }. */
export function toast(stack, { title, body = "", timeout = 7000, closeLabel = "Dismiss" } = {}) {
  const el = document.createElement("div");
  el.className = "toast";
  el.setAttribute("role", "status");
  const text = document.createElement("div");
  const b = document.createElement("b");
  b.textContent = title ?? "";
  text.append(b);
  if (body) { const p = document.createElement("span"); p.textContent = body; text.append(p); }
  const close = document.createElement("button");
  close.type = "button";
  close.className = "btn is-icon";
  close.setAttribute("aria-label", closeLabel);
  close.innerHTML = '<svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18"/></svg>';
  el.append(text, close);
  stack.append(el);

  /* The timer runs only while neither the pointer nor focus is in the
     stack. Each input keeps its own flag, so leaving with one while the
     other stays inside never restarts it, and every change clears the old
     timer before it sets a new one. */
  let left = timeout, started = 0, timer = 0;
  let pointerInside = stack.matches(":hover");
  let focusInside = stack.contains(document.activeElement);
  const sync = () => {
    if (!timeout) return;
    if (timer) { clearTimeout(timer); timer = 0; left -= Date.now() - started; }
    if (!pointerInside && !focusInside) { started = Date.now(); timer = setTimeout(dismiss, Math.max(0, left)); }
  };
  const hold = (e) => {
    if (e.type === "pointerenter") pointerInside = true;
    else if (e.type === "pointerleave") pointerInside = false;
    else if (e.type === "focusin") focusInside = true;
    else focusInside = stack.contains(e.relatedTarget);
    sync();
  };
  function dismiss() {
    clearTimeout(timer);
    timer = 0;
    stack.removeEventListener("pointerenter", hold);
    stack.removeEventListener("pointerleave", hold);
    stack.removeEventListener("focusin", hold);
    stack.removeEventListener("focusout", hold);
    el.hidden = true;
    const exit = parseFloat(getComputedStyle(el).transitionDuration) * 1000 || 0;
    setTimeout(() => el.remove(), exit + 50);
  }
  close.addEventListener("click", dismiss);

  /* Swipe: a toast follows a horizontal drag toward the end edge and goes
     past 80px or on a quick flick; short of that it springs back. */
  let x0 = 0, t0 = 0, dx = 0, id = null;
  const end = getComputedStyle(stack).direction === "rtl" ? -1 : 1;
  el.addEventListener("pointerdown", (e) => {
    if (e.button !== 0 || e.target.closest("button, a, input")) return;
    id = e.pointerId; x0 = e.clientX; t0 = e.timeStamp; dx = 0;
    try { el.setPointerCapture(id); } catch {}
    el.style.transition = "none";
  });
  el.addEventListener("pointermove", (e) => {
    if (e.pointerId !== id) return;
    dx = Math.max(0, (e.clientX - x0) * end);
    el.style.translate = `${dx * end}px 0`;
    el.style.opacity = String(Math.max(0, 1 - dx / 240));
  });
  const release = (e) => {
    if (e.pointerId !== id) return;
    id = null;
    el.style.transition = "";
    const flick = dx / Math.max(1, e.timeStamp - t0) > .6;
    /* Clear the drag's inline values either way, so a dismissal exits
       through the [hidden] rule from where the drag left the toast. */
    el.style.translate = "";
    el.style.opacity = "";
    if (dx > 80 || (flick && dx > 24)) dismiss();
  };
  el.addEventListener("pointerup", release);
  el.addEventListener("pointercancel", release);

  stack.addEventListener("pointerenter", hold);
  stack.addEventListener("pointerleave", hold);
  stack.addEventListener("focusin", hold);
  stack.addEventListener("focusout", hold);
  sync();
  return { el, dismiss };
}

/* Wires every widget under root: tablists, menu buttons, sliders, and the
   tooltip Escape. Returns one cleanup for all of them. */
export function init(root = document) {
  const off = [];
  root.querySelectorAll('[role="tablist"]').forEach((el) => off.push(tabs(el)));
  root.querySelectorAll('[aria-haspopup="menu"][aria-controls]').forEach((el) => off.push(menu(el)));
  root.querySelectorAll('input[type="range"].slider').forEach((el) => off.push(slider(el)));
  off.push(tooltips(root.ownerDocument ?? root));
  return () => off.forEach((f) => f());
}
