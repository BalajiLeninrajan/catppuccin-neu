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
