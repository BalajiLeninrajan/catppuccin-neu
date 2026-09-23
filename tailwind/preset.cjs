/* ── catppuccin-neu: Tailwind v3 preset ─────────────────────────────────────
   Maps the token vocabulary into Tailwind's theme so utilities like
   bg-mantle, text-overlay-1, shadow-neu-raised and rounded-panel resolve
   to the same custom properties the CSS files use. Requires css/tokens.css
   (or css/index.css). Values read the tokens, except the font stacks,
   which repeat --sans and --mono. No plugin logic; recipes come from the CSS files.

   usage: // tailwind.config.cjs
          module.exports = { presets: [require("catppuccin-neu/tailwind/preset.cjs")], … };
*/

/* A type role as a fontSize tuple read from its four tokens. */
const role = (name) => [
  `var(--cn-type-${name}-size)`,
  {
    lineHeight: `var(--cn-type-${name}-leading)`,
    letterSpacing: `var(--cn-type-${name}-tracking)`,
    fontWeight: `var(--cn-type-${name}-weight)`,
  },
];
const display = (size) => [
  size,
  {
    lineHeight: "var(--cn-type-display-leading)",
    letterSpacing: "var(--cn-type-display-tracking)",
    fontWeight: "var(--cn-type-display-weight)",
  },
];

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
        /* Mix tokens: border-edge, border-edge-soft, bg-tint, bg-wash, border-control-edge */
        edge: "var(--edge)",
        "edge-soft": "var(--edge-soft)",
        tint: "color-mix(in srgb, var(--tone) 4%, transparent)",
        wash: "var(--wash)",
        "control-edge": "var(--control-edge)",
      },
      /* Motion: ease-out/in/spring, duration-press/exit/fast/base/slow */
      transitionTimingFunction: {
        out: "var(--ease-out)",
        in: "var(--ease-in)",
        spring: "var(--ease-spring)",
      },
      transitionDuration: {
        press: "var(--t-press)",
        exit: "var(--t-exit)",
        fast: "var(--t-fast)",
        base: "var(--t-base)",
        slow: "var(--t-slow)",
      },
      /* Tailwind's default numeric scale already holds --space-1..6:
         1 = 4px, 2 = 8px, 3 = 12px, 4 = 16px, 6 = 24px, 8 = 32px. Only the
         named density and layout knobs are added: h-control, h-band,
         px-gutter and the rest. */
      spacing: {
        control: "var(--control-h)",
        "control-sm": "var(--control-h-sm)",
        band: "var(--band-h)",
        gutter: "var(--page-gutter)",
        "page-pad": "var(--page-pad)",
        input: "var(--control-h)", /* deprecated, removed in 0.5.0: use control */
      },
      /* Type roles: text-microlabel, text-label, text-meta and the rest.
         Each reads its --cn-type-<role>-* tokens. */
      fontSize: {
        microlabel: role("micro"),
        label: role("label"),
        meta: role("meta"),
        ui: role("ui"),
        name: role("name"),
        body: role("body"),
        lede: role("lede"),
        title: role("title"),
        value: role("value"),
        "value-lg": role("value-lg"),
        code: role("code"),
        display: display("var(--cn-type-display-size)"),
        "display-sm": display("var(--cn-type-display-sm-size)"),
        micro: role("micro"), /* deprecated, removed in 0.5.0: use microlabel */
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
          "JetBrains Mono",
          "JetBrainsMono Nerd Font",
          "JetBrainsMono Nerd Font Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Consolas",
          "monospace",
        ],
      },
      /* Role-named radii from the --cn-radius-* tokens. */
      borderRadius: {
        panel: "var(--cn-radius-panel)",
        card: "var(--cn-radius-card)",
        control: "var(--cn-radius-control)",
        mark: "var(--cn-radius-control)",
        chip: "var(--cn-radius-chip)",
      },
      /* Depth: the four neu tokens, the floats and the hard offsets. */
      boxShadow: {
        "neu-raised": "var(--neu-raised)",
        "neu-raised-soft": "var(--neu-raised-soft)",
        "neu-inset": "var(--neu-inset)",
        "neu-inset-soft": "var(--neu-inset-soft)",
        pop: "var(--shadow-pop)",
        cast: "var(--shadow-cast)",
        hard: "var(--hard-offset) var(--hard-offset) 0 var(--plate, var(--hard-offset-color, var(--crust)))",
        "hard-lg": "10px 10px 0 var(--plate, var(--hard-offset-color, var(--crust)))",
        "hard-sm": "3px 3px 0 var(--plate, var(--hard-offset-color, var(--crust)))",
        mark: "var(--shadow-mark)",
      },
      /* Heights also read spacing on Tailwind 3.4; these keep older 3.x working. */
      height: {
        control: "var(--control-h)",
        "control-sm": "var(--control-h-sm)",
        band: "var(--band-h)",
        input: "var(--control-h)", /* deprecated, removed in 0.5.0: use control */
      },
      minHeight: {
        control: "var(--control-h)",
        "control-sm": "var(--control-h-sm)",
        band: "var(--band-h)",
        input: "var(--control-h)", /* deprecated, removed in 0.5.0: use control */
      },
      opacity: {
        disabled: "var(--disabled-opacity)",
      },
    },
  },
};
