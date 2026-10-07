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

render(<App />, document.getElementById("app")!);
