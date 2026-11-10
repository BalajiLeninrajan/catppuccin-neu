/* Status glyphs for tags and banners (24-unit grid, stroke =
   currentColor). No width or height: .tag > svg sets 12px and .banner > svg
   16px. A .tag or .banner with .cn-tone-danger, -warning, -success or -info
   and no svg child already draws the matching glyph from --cn-glyph-* in
   CSS, so these are for the palette tones (.cn-tone-red and the rest),
   which draw none, and for a status that wants a different shape. A child
   svg replaces the CSS glyph. A danger or warning tag or banner always
   leads with a glyph; other tones may. The glyph goes first and is
   aria-hidden; the word beside it states the status. */

import type { JSX } from "preact";

const STROKE = {
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": 2.2,
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  "aria-hidden": "true",
} as const;

/* Danger: a circle with a cross. */
export const DangerGlyph = () => (
  <svg {...STROKE}>
    <circle cx="12" cy="12" r="9" />
    <path d="m9 9 6 6M15 9l-6 6" />
  </svg>
);

/* Warning: a triangle with a bang. */
export const WarningGlyph = () => (
  <svg {...STROKE}>
    <path d="M12 3.5 21 19H3l9-15.5z" />
    <path d="M12 10v4M12 16.8h.01" />
  </svg>
);

/* Success: a circle with a check. */
export const SuccessGlyph = () => (
  <svg {...STROKE}>
    <circle cx="12" cy="12" r="9" />
    <path d="m8.5 12.2 2.4 2.4 4.6-5" />
  </svg>
);

/* Info: a circle with an i. */
export const InfoGlyph = () => (
  <svg {...STROKE}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 11v5M12 7.5h.01" />
  </svg>
);

/* Pending: a clock. */
export const PendingGlyph = () => (
  <svg {...STROKE}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 2" />
  </svg>
);

/* Scheduled: a calendar. */
export const ScheduledGlyph = () => (
  <svg {...STROKE}>
    <rect x="4" y="5" width="16" height="15" rx="2" />
    <path d="M4 10h16M9 3v4M15 3v4" />
  </svg>
);

/* The tones whose tags and banners must lead with a glyph. The status
   names get theirs from CSS; the palette hues need an svg. */
export const NEEDS_GLYPH = new Set(["red", "yellow", "danger", "warning"]);

/* One glyph per .cn-tone-* hue, in the order of TONES. */
export const TONE_GLYPH: Record<string, () => JSX.Element> = {
  red: DangerGlyph,
  green: SuccessGlyph,
  peach: PendingGlyph,
  yellow: WarningGlyph,
  blue: InfoGlyph,
  mauve: ScheduledGlyph,
  danger: DangerGlyph,
  warning: WarningGlyph,
  success: SuccessGlyph,
  info: InfoGlyph,
};
