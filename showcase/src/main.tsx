import { render } from "preact";
import posthog from "posthog-js";
import "../../css/index.css";
import "./showcase.css";
import { App } from "./app";

posthog.init(import.meta.env.VITE_PUBLIC_POSTHOG_KEY, {
  api_host: import.meta.env.VITE_PUBLIC_POSTHOG_HOST,
  defaults: "2026-05-30",
  cookieless_mode: "always",
});

/* Escape dismisses a showing [data-tip]; leaving the element clears it. */
const clearTip = (e: PointerEvent | FocusEvent) => {
  const el = (e.target as Element | null)?.closest?.("[data-tip-dismissed]");
  if (el && !el.contains(e.relatedTarget as Node | null)) el.removeAttribute("data-tip-dismissed");
};
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;
  document
    .querySelectorAll("[data-tip]:is(:hover, :focus-visible, :has(:focus-visible))")
    .forEach((el) => el.setAttribute("data-tip-dismissed", ""));
});
document.addEventListener("pointerleave", clearTip, true);
document.addEventListener("focusout", clearTip, true);

render(<App />, document.getElementById("app")!);
