import { Doc, Demo, Props, CodeBlock, TONES, TEAMS, accentStyle } from "../lib/doc";
import { TONE_GLYPH, NEEDS_GLYPH } from "../lib/glyphs";

/* Small inline glyphs (24-unit grid, stroke = currentColor). Decorative:
   always paired with a text label, always aria-hidden. */
function ClockGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  );
}

function UsersGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3.5" />
      <path d="M3.5 20c.6-3.2 2.8-5 5.5-5s4.9 1.8 5.5 5" />
      <path d="M15.5 5.2a3.5 3.5 0 0 1 0 5.6" />
      <path d="M17.5 15.3c1.6.8 2.7 2.4 3 4.7" />
    </svg>
  );
}

function BoltGlyph() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="14"
      height="14"
      fill="none"
      stroke="currentColor"
      stroke-width="2"
      stroke-linecap="round"
      stroke-linejoin="round"
      aria-hidden="true"
    >
      <path d="M13 3 5 13.5h6L11 21l8-10.5h-6L13 3z" />
    </svg>
  );
}

const TONE_LABELS = {
  red: "Overdue",
  green: "Paid",
  peach: "On hold",
  yellow: "Due soon",
  blue: "Synced",
  mauve: "Beta",
};

export default function ChipPage() {
  return (
    <Doc
      title="Chip"
      lede="Two small metadata marks. The outlined .chip holds facts such as counts and versions. The carved .tag holds a semantic state through --tone. Both stay on one line."
    >
      <Demo title="Chip" classes="chip" row>
        <span class="chip">v2.4.1</span>
        <span class="chip">12 members</span>
        <span class="chip">Updated 4m ago</span>
      </Demo>

      <Demo title="With glyph" why="Glyphs and the accessible name" classes="chip" row>
        <span class="chip">
          <ClockGlyph />
          Updated 4m ago
        </span>
        <span class="chip">
          <UsersGlyph />
          12 members
        </span>
        <span class="chip">
          <BoltGlyph />
          Auto-renew on
        </span>
      </Demo>

      <p class="cn-copy">
        A chip keeps its label at every width. Mark the glyph{" "}
        <code class="cn-code-inline">aria-hidden="true"</code> so the label is the
        accessible name. For an icon-only chip, add{" "}
        <code class="cn-code-inline">.is-glyph</code> and keep the label in the
        markup or in an <code class="cn-code-inline">aria-label</code> with{" "}
        <code class="cn-code-inline">role="img"</code>.
      </p>

      <Demo title="Links and buttons" why="Why a clickable chip stands on a plate" classes="a.chip · button.chip" row>
        <a class="chip" href="#" onClick={(e) => e.preventDefault()}>
          v2.4.1 release notes
        </a>
        <button type="button" class="chip">
          <UsersGlyph />
          12 members
        </button>
        <button type="button" class="chip">
          <ClockGlyph />
          Last 30 days
        </button>
      </Demo>

      <p class="cn-copy">
        A chip that is an <code class="cn-code-inline">a</code> or a{" "}
        <code class="cn-code-inline">button</code> is a
        clickable, so it stands on the ink plate under the lit top edge,
        like every clickable. A static chip on a span is a flat outlined
        label with no shadow, so nothing about it says press. Raise and
        plate mean clickable, and the plate tells the two apart at rest. On
        hover a clickable chip lifts 1px, its label turns{" "}
        <code class="cn-code-inline">--cn-fg</code> and its border takes{" "}
        <code class="cn-code-inline">--control-edge</code>. Held, it slides
        half the offset onto its plate and springs back on release. Keep it to a link or an action on one fact; a choice between
        options is a segmented control or tabs.
      </p>

      <Demo title="Icon-only" classes="chip is-glyph" row>
        <span class="chip is-glyph" role="img" aria-label="Auto-renew on">
          <BoltGlyph />
        </span>
        <span class="chip is-glyph" role="img" aria-label="12 members">
          <UsersGlyph />
        </span>
      </Demo>

      <Demo title="Status tags: the glyph comes from CSS" why="Where the status glyph comes from" classes="tag cn-tone-danger · -warning · -success · -info > word" row>
        <span class="tag cn-tone-danger">Overdue</span>
        <span class="tag cn-tone-success">Paid</span>
        <span class="tag cn-tone-warning">Due soon</span>
        <span class="tag cn-tone-info">Synced</span>
      </Demo>

      <p class="cn-copy">
        A tag with <code class="cn-code-inline">.cn-tone-danger</code>,{" "}
        <code class="cn-code-inline">-warning</code>,{" "}
        <code class="cn-code-inline">-success</code> or{" "}
        <code class="cn-code-inline">-info</code> and no svg child draws the
        matching glyph itself, from <code class="cn-code-inline">--cn-glyph-*</code>{" "}
        through a mask in its tone. The markup above holds only the word. The
        glyph is a background, so a screen reader never hears it. Bring an svg
        to use a different shape; the CSS glyph steps aside.
      </p>

      <Demo title="Solid tag: the one urgent status" why="When a tag takes the solid fill" classes="tag cn-tone-danger is-solid" row>
        <span class="tag cn-tone-danger is-solid">Overdue</span>
        <span class="tag cn-tone-warning">Due soon</span>
        <span class="tag cn-tone-success">Paid</span>
        <span class="tag is-quiet">Pending</span>
      </Demo>

      <p class="cn-copy">
        Mocha's accents share one lightness, so washed tags differ by hue
        alone. <code class="cn-code-inline">.is-solid</code> fills the tag
        with its tone and sets the word and glyph in crust, 8.1:1 on red, so
        the one urgent status in a view outranks the rest by lightness too.
        It is a status mark, not a control: no plate, no gloss and no raise,
        and it never takes mauve. Keep it to one status per view, and keep a
        solid danger tag out of the band or row that holds the primary: red
        and mauve are close, so it belongs in a status column. A row's
        default or in-progress state, such as Pending, takes{" "}
        <code class="cn-code-inline">.tag.is-quiet</code>: muted text on the
        sunken fill, darker than the panel, with no tone. The column keeps
        one shape, and every toned tag still outranks it.
      </p>

      <Demo title="Status tag with its own svg" classes="tag cn-tone-success > svg + word" row>
        <span class="tag cn-tone-success">
          <TONE_GLYPH.mauve />
          Paid on schedule
        </span>
      </Demo>

      <Demo title="Palette tags: a glyph on red and yellow" classes="tag cn-tone-{red, green, peach, yellow, blue, mauve} > (svg) + word" row>
        {TONES.map((tone) => {
          const Glyph = TONE_GLYPH[tone];
          return (
            <span key={tone} class={`tag cn-tone-${tone}`}>
              {NEEDS_GLYPH.has(tone) ? <Glyph /> : null}
              {TONE_LABELS[tone]}
            </span>
          );
        })}
      </Demo>

      <Demo title="Palette tags: a glyph on every tone" why="Why the word states the status" classes="tag cn-tone-{tone} > svg + word" row>
        {TONES.map((tone) => {
          const Glyph = TONE_GLYPH[tone];
          return (
            <span key={tone} class={`tag cn-tone-${tone}`}>
              <Glyph />
              {TONE_LABELS[tone]}
            </span>
          );
        })}
      </Demo>

      <p class="cn-copy">
        A tone never carries meaning alone. Red, peach and pink sit close in
        lightness, so the word in the tag
        states the status: "Overdue", not a red dot. A danger or warning tag
        also leads with a glyph, because those are the two tones a reader must
        not miss. The palette tones, <code class="cn-code-inline">.cn-tone-red</code>{" "}
        and the rest, draw no glyph, so a red or yellow tag brings an svg.
        Other tones may take one; in a column of tags, give every tag a glyph
        so the words line up. The svg goes first, at the 12px the recipe sets,
        with <code class="cn-code-inline">aria-hidden="true"</code>; the word stays
        the name.
      </p>

      <Demo title="Marks" why="What a mark is for" classes='mark  (set --accent from the record)' row>
        {TEAMS.map((team) => (
          <span class="sc-row" key={team.name}>
            <span class="mark" style={accentStyle(team.accent)} aria-hidden="true">
              {team.name[0]}
            </span>
            <span class="cn-name">{team.name}</span>
          </span>
        ))}
      </Demo>

      <p class="cn-copy">
        <code class="cn-code-inline">.mark</code> is the 28px identity square for a
        team tile, a rank or the logo. Set <code class="cn-code-inline">--accent</code>{" "}
        inline from the record it stands for, so the same team gets the same
        square everywhere.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: ".chip",
            values: "span, a, or button",
            notes: "Outlined pill on --cn-surface-raised with the --edge outline. Flat when static: no shadow and no lit edge. No wrapping; keep labels short.",
          },
          {
            name: ":is(a, button).chip",
            values: ":hover · :active · :disabled · [aria-disabled]",
            notes: "Stands on the hard offset in --plate under --cn-lit-edge. Hover: lifts 1px, --cn-fg label and a --control-edge border. Held: the half-slide onto the plate in --t-press, back on the spring. Disabled: --disabled-opacity, no plate or lit edge, an --edge-soft outline, no lift or press.",
          },
          {
            name: ".chip svg",
            values: "one leading glyph",
            notes: "14px. Decorative: aria-hidden, and the label text carries the name.",
          },
          {
            name: ".chip.is-glyph",
            values: "modifier",
            notes: "Icon-only at any width: 8px padding, 16px svg, label hidden with font-size 0. Keep an accessible name.",
          },
          {
            name: ".tag",
            values: "span",
            notes: "Status tag: 4px padding, the chip radius, label role. A shallow carve in --tone-wash with no outline: --neu-inset-soft, darkness only, no lip. The wash mixes from --tone, or the status ladder under a status .cn-tone-*. Tone text on it is 5.7:1 (red) to 9.4:1 (yellow) on a panel, and higher on the page. Always holds a word that states the status.",
          },
          {
            name: ".tag.is-solid",
            values: "modifier",
            contrast: "Crust on the fill 8.1:1 (red) to 14.8:1 (yellow)",
            notes: "The one urgent status in a view. The tone fills the tag and the word and glyph take --cn-fg-on-accent. No carve, plate, gloss, grain or raise, so it reads as a mark and not a button. A status tone only, never mauve.",
          },
          {
            name: ".tag.is-quiet",
            values: "modifier",
            contrast: "Muted text on crust 8.4:1",
            notes: "A row's default or in-progress state, such as Pending. No tone: --cn-fg-muted on --cn-surface-sunken, darker than a panel, under the tag's soft carve. No outline and no light edge. Draws no glyph; may bring a 12px svg.",
          },
          {
            name: ".tag svg",
            values: "one leading glyph",
            notes: "12px, first in the tag, aria-hidden. Replaces the CSS glyph on a status tone. Needed on .cn-tone-red and -yellow, which draw none; optional on other palette tones.",
          },
          {
            name: ".tag::before",
            values: "status glyph",
            notes: "On .cn-tone-danger, -warning, -success or -info with no svg child: a 12px --cn-glyph-* mask in currentColor. Forced colors paint it CanvasText.",
          },
          {
            name: "--tone",
            values: ".cn-tone-danger / -warning / -success / -info · .cn-tone-red / -green / -peach / -yellow / -blue / -mauve",
            default: "var(--cn-info)",
            notes: "Semantic color. Set it with a tone utility or inline.",
          },
          {
            name: ".mark",
            values: "28px square",
            default: "--accent: var(--mauve)",
            notes: "Accent ramp under grain, crust glyph at 14px 600, --shadow-mark, tabular numerals. Set --accent inline per record.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<span class="chip">v2.4.1</span>

<span class="chip">
  <svg aria-hidden="true"><!-- glyph --></svg>
  12 members
</span>

<!-- a status tone draws its own glyph -->
<span class="tag cn-tone-danger">Overdue</span>

<!-- a default or in-progress state takes no tone -->
<span class="tag is-quiet">Pending</span>

<!-- a palette tone brings one; red and yellow must -->
<span class="tag cn-tone-red">
  <svg aria-hidden="true"><!-- cross glyph --></svg>
  Overdue
</span>

<span class="mark" style="--accent: #94e2d5">P</span>`}
      />
    </Doc>
  );
}
