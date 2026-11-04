/** Removes the listeners a wiring call added. */
export type Cleanup = () => void;
/** Roving tabs with selection that follows focus; toggles each tab's aria-controls panel. */
export function tabs(list: HTMLElement): Cleanup;
/** Menu button: the trigger needs aria-haspopup="menu" and aria-controls naming a [role="menu"]. */
export function menu(trigger: HTMLElement): Cleanup;
/** Keeps --value in step with an input[type="range"].slider. */
export function slider(input: HTMLInputElement): Cleanup;
/** Escape hides a showing [data-tip] until the pointer or focus leaves it. */
export function tooltips(doc?: Document): Cleanup;
/** Appends a toast to a .toast-stack and dismisses it after `timeout` ms (0 keeps it). */
export function toast(
  stack: HTMLElement,
  options?: { title?: string; body?: string; timeout?: number; closeLabel?: string },
): { el: HTMLDivElement; dismiss: () => void };
/** Wires every tablist, menu button and slider under root, plus the tooltip Escape. */
export function init(root?: Document | HTMLElement): Cleanup;
