import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig({
  plugins: [preact()],
  resolve: {
    // pnpm symlinks + dev pre-bundling can hand preact-iso its own copy of
    // preact/hooks, which crashes hooks at runtime ("__H" of undefined).
    dedupe: ["preact", "preact/hooks", "preact/compat"],
  },
  optimizeDeps: {
    exclude: ["preact-iso"],
  },
  build: {
    rollupOptions: {
      // posthog-js alone would push the entry chunk past Vite's 500 kB
      // warning; its own chunk also stays cached across showcase deploys.
      output: { manualChunks: { posthog: ["posthog-js"] } },
    },
  },
});
