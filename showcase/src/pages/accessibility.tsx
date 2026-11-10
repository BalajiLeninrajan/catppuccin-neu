import { Doc, Props } from "../lib/doc";

/* Hand captures from Chromium DevTools with forced colors emulated. */
const FORCED_SHOTS: [string, string, number][] = [
  ["/forced-colors/controls.png", "Under forced colors, a live primary and a disabled primary. Both draw a system-color edge; the disabled label is GrayText.", 150],
  ["/forced-colors/fields.png", "Under forced colors, two labeled fields. Each carved field draws a CanvasText edge in place of its shadow.", 180],
  ["/forced-colors/engaged.png", "Under forced colors, a segmented control. The chosen option draws a Highlight rim; the others keep a plain edge.", 160],
];

const COMPONENTS: Array<[string, string]> = [
  ["Icon button", 'Give it an aria-label. The icon is aria-hidden="true".'],
  ["Busy button", 'Set aria-busy="true" with aria-disabled="true" while the action runs, so focus stays on it.'],
  ["Field", "Give every field a visible label. For an error, set aria-invalid and point aria-describedby at the field's small."],
  ["Read-only field", "Use readonly, not disabled, for a fixed value. It stays focusable and copyable."],
  ["Checkbox, radio, switch", "Wrap each in .choice so the label row is the target. For a group in error, set aria-invalid on the fieldset."],
  ["Slider", "Pair it with a visible label and an output. Set aria-valuetext when the number alone is not the value."],
  ["Tooltip", "The bubble is not part of the accessible name. Repeat its words in aria-label or aria-describedby."],
  ["Status tag or banner", "Write the status as a word. A tone never carries meaning alone, and a glyph svg is aria-hidden."],
  ["Avatar", 'Give an initials avatar role="img" and the person\'s name in aria-label.'],
  ["Accordion", "Use details and summary. The keys and the disclosure role come with them."],
  ["Table", "Give header cells th with scope. A sortable column carries aria-sort on its th."],
  ["Scrolling well or table", 'A .scroll-well or .table-scroll that scrolls needs tabindex="0", role="region" and an aria-label.'],
  ["Modal and drawer", "Open with showModal(). It traps focus, answers Escape and returns focus to the trigger."],
  ["Toast stack", 'Mark it role="region" aria-live="polite" with an aria-label.'],
  ["Skip link", 'Make .cn-skip-link the first focusable element, point it at main, and give main tabindex="-1".'],
];

export default function AccessibilityPage() {
  return (
    <Doc
      title="Accessibility"
      lede="What the CSS handles on its own, and what each component needs from your markup."
    >
      <Props
        title="What the CSS does"
        rows={[
          { name: "Focus", notes: "Every focusable element draws a 2px ring in the text color, 3px off its edge. No recipe removes it." },
          { name: "Contrast", notes: "Body text holds 7:1 and every readable role 4.5:1 on the page, a panel and an overlay. Colors lists the ratios." },
          { name: "Links", notes: "A link in prose is underlined, so color is not its only mark." },
          { name: "prefers-contrast: more", notes: "Text moves one stop lighter, hairlines and field rings close to 3:1, grain goes off and the tilted panel stands upright." },
          { name: "prefers-reduced-motion: reduce", notes: "Presses, slides and the page entrance land at once. Overlays fade in place and the spinner keeps a slow turn." },
          { name: "prefers-reduced-transparency: reduce", notes: "The topbar goes opaque and the scrim stops blurring." },
          { name: "forced-colors: active", notes: "Focus draws in Highlight. Fields, wells and controls draw a CanvasText edge, and engaged states a Highlight rim." },
          { name: "pointer: coarse", notes: "Every control is at least 44px tall, at either density." },
          { name: "hover: none", notes: "Hover lifts are off, so a tap does not leave a control stuck in its hover." },
          { name: "Type", notes: "Sizes and control heights are rem, so the browser font size scales them." },
          { name: "Reflow", notes: "The layout folds at 1060, 760 and 520px and holds down to 320px." },
        ]}
      />

      <h2 class="cn-title">Forced colors</h2>
      <div class="cn-stack cn-gap-16">
        {FORCED_SHOTS.map(([src, alt, h]) => (
          <img key={src} src={src} alt={alt} width={870} height={h} loading="lazy" style="max-width:100%;height:auto" />
        ))}
      </div>

      <h2 class="cn-title">What your markup does</h2>
      <p class="cn-copy">
        CSS cannot add names, roles or focus handling. These are yours.
      </p>

      <div class="sc-props-scroll">
        <table class="data-table">
          <thead>
            <tr>
              <th scope="col">Component</th>
              <th scope="col">What you do</th>
            </tr>
          </thead>
          <tbody>
            {COMPONENTS.map(([name, what]) => (
              <tr key={name}>
                <td data-label="Component">{name}</td>
                <td data-label="What you do">{what}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p class="cn-copy">
        The docs pass axe in Chromium. Nobody has tested the package with a
        screen reader yet.
      </p>
    </Doc>
  );
}
