/* catppuccin-neu behavior, wired by loading this file:

     <script type="module" src=".../js/auto.js"></script>
     import "catppuccin-neu/js/auto";

   It wires every tablist, menu button, listbox, combobox and slider in the
   document once the DOM is parsed, installs the tooltip Escape, and then
   watches the document: a widget added later is wired when it lands, and
   one that leaves has its listeners removed. Each element is wired once.
   Use init() from ./index.js when the app wants to choose the moment or
   own the cleanup, and do not load both for the same markup. */

import { tabs, menu, listbox, slider, tooltips } from "./index.js";

const wired = new Map();     /* element -> its cleanup */
const driver = new WeakMap(); /* listbox -> the combobox that drives it */

function scan() {
  for (const [el, off] of wired) if (!el.isConnected) { off(); wired.delete(el); }
  const wire = (el, off) => { wired.get(el)?.(); wired.set(el, off); };
  const fresh = (sel) => [...document.querySelectorAll(sel)].filter((el) => !wired.has(el));
  for (const el of fresh('[role="tablist"]')) wire(el, tabs(el));
  for (const el of fresh('input[type="range"].slider')) wire(el, slider(el));
  /* A trigger waits until the popup it names is in the page. */
  for (const el of fresh('[aria-haspopup="menu"][aria-controls]')) {
    if (document.getElementById(el.getAttribute("aria-controls"))) wire(el, menu(el));
  }
  /* A combobox drives the listbox it names, and takes it over if the
     listbox landed first and was wired alone. */
  for (const el of document.querySelectorAll('[role="combobox"][aria-controls]')) {
    const list = document.getElementById(el.getAttribute("aria-controls"));
    if (list?.getAttribute("role") !== "listbox") continue;
    if (wired.has(list) && driver.get(list) === el) continue;
    wire(list, listbox(list, { combobox: el }));
    driver.set(list, el);
  }
  for (const el of fresh('[role="listbox"]')) wire(el, listbox(el));
}

function start() {
  tooltips();
  scan();
  /* One scan per frame, however many nodes a render adds. */
  let queued = false;
  new MutationObserver(() => {
    if (queued) return;
    queued = true;
    requestAnimationFrame(() => { queued = false; scan(); });
  }).observe(document.documentElement, { childList: true, subtree: true });
}

if (typeof document !== "undefined") {
  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start, { once: true });
  else start();
}
