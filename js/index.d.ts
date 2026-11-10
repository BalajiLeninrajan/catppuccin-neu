/** Removes the listeners a wiring call added. */
export type Cleanup = () => void;
/** Roving tabs with selection that follows focus; toggles each tab's aria-controls panel and, on a .tabs carve, slides the selected pill. */
export function tabs(list: HTMLElement): Cleanup;
/** Menu button: the trigger needs aria-haspopup="menu" and aria-controls naming a [role="menu"]. */
export function menu(trigger: HTMLElement): Cleanup;
/** Listbox with aria-activedescendant: arrows, Home and End move the active option; Enter (or Space) selects it and fires "cn-select". With `combobox`, the input opens, drives and closes the listbox. */
export function listbox(list: HTMLElement, options?: { combobox?: HTMLInputElement | null }): Cleanup;
/** Keeps --value in step with an input[type="range"].slider. */
export function slider(input: HTMLInputElement): Cleanup;
/** Escape hides a showing [data-tip] until the pointer or focus leaves it. */
export function tooltips(doc?: Document): Cleanup;
/** Appends a toast to a .toast-stack and dismisses it after `timeout` ms (0 keeps it). */
export function toast(
  stack: HTMLElement,
  options?: { title?: string; body?: string; timeout?: number; closeLabel?: string },
): { el: HTMLDivElement; dismiss: () => void };
/** Wires every tablist, menu button, listbox, combobox and slider under root, plus the tooltip Escape. */
export function init(root?: Document | HTMLElement): Cleanup;
