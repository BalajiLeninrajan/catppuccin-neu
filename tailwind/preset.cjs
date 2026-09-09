/* ── catppuccin-neu — Tailwind v3 preset ────────────────────────────────────
   Maps the token vocabulary into Tailwind's theme so utilities like
   bg-mantle, text-overlay-1, shadow-neu-raised, and rounded-panel resolve
   to the same custom properties the CSS files use. Requires css/tokens.css
   (or css/index.css) to be loaded — the preset carries no values of its own
   beyond the fixed radii. No plugin logic; recipes come from the CSS files.

   usage: // tailwind.config.cjs
          module.exports = { presets: [require("catppuccin-neu/tailwind/preset.cjs")], … };
*/

module.exports = {
  theme: {
    extend: {
      colors: {
        crust: "var(--crust)",
        mantle: "var(--mantle)",
        base: "var(--base)",
        "surface-0": "var(--surface-0)",
        "surface-1": "var(--surface-1)",
        "surface-2": "var(--surface-2)",
        "overlay-0": "var(--overlay-0)",
        "overlay-1": "var(--overlay-1)",
        "overlay-2": "var(--overlay-2)",
        "subtext-0": "var(--subtext-0)",
        "subtext-1": "var(--subtext-1)",
        text: "var(--text)",
        rosewater: "var(--rosewater)",
        pink: "var(--pink)",
        mauve: "var(--mauve)",
        red: "var(--red)",
        peach: "var(--peach)",
        yellow: "var(--yellow)",
        green: "var(--green)",
        teal: "var(--teal)",
        sky: "var(--sky)",
        blue: "var(--blue)",
        lavender: "var(--lavender)",
        /* Contract properties */
        accent: "var(--accent)",
        tone: "var(--tone)",
        /* Mix tokens — border-edge, border-edge-soft, bg-tint, bg-wash */
        edge: "var(--edge)",
        "edge-soft": "var(--edge-soft)",
        tint: "var(--tint)",
        wash: "var(--wash)",
      },
      /* Motion tokens — ease-out / ease-in / ease-spring, duration-fast/base/slow */
      transitionTimingFunction: {
        out: "var(--ease-out)",
        in: "var(--ease-in)",
        spring: "var(--ease-spring)",
      },
      transitionDuration: {
        fast: "var(--t-fast)",
        base: "var(--t-base)",
        slow: "var(--t-slow)",
      },
      /* No spacing extension. Tailwind's default scale already holds the
         system's six values: 4px = 1, 8px = 2, 12px = 3, 16px = 4,
         22px = 5.5, 28px = 7. (v0.2.0 shipped pixel-named keys, which
         overrode Tailwind's own 4/8/12/16/28 and shrank every gap-4 on
         upgrade; removed in v0.2.1.) */
      /* Type roles — text-label, text-meta, text-name, text-title, text-display */
      fontSize: {
        micro: ["10px", { lineHeight: "1", letterSpacing: ".08em", fontWeight: "700" }],
        label: ["12px", { lineHeight: "1", letterSpacing: ".01em", fontWeight: "650" }],
        meta: ["12px", { lineHeight: "1.5", fontWeight: "550" }],
        name: ["13px", { lineHeight: "1.3", fontWeight: "700" }],
        title: ["20px", { letterSpacing: "-.03em", fontWeight: "800" }],
        display: ["clamp(32px, 4vw, 46px)", { lineHeight: ".98", letterSpacing: "-.03em", fontWeight: "760" }],
      },
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "sans-serif",
        ],
        mono: [
          "JetBrainsMono Nerd Font",
          "JetBrainsMono Nerd Font Mono",
          "JetBrains Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      /* Role-named radii — the blessed scale. */
      borderRadius: {
        panel: "var(--pane-radius)",
        card: "13px",
        control: "10px",
        mark: "8px",
        chip: "4px",
      },
      /* Depth — the four neu tokens, the promoted floats, the hard offsets. */
      boxShadow: {
        "neu-raised": "var(--neu-raised)",
        "neu-raised-soft": "var(--neu-raised-soft)",
        "neu-inset": "var(--neu-inset)",
        "neu-inset-soft": "var(--neu-inset-soft)",
        pop: "var(--shadow-pop)",
        cast: "var(--shadow-cast)",
        hard: "var(--hard-offset) var(--hard-offset) 0 var(--hard-offset-color)",
        "hard-lg": "10px 10px 0 var(--hard-offset-color)",
        "hard-sm": "3px 3px 0 var(--hard-offset-color)",
        mark: "var(--shadow-mark)",
      },
      /* Density knobs */
      height: {
        control: "var(--control-h)",
        input: "var(--input-h)",
      },
      minHeight: {
        control: "var(--control-h)",
        input: "var(--input-h)",
      },
    },
  },
};
