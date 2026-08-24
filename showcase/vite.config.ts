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
});
