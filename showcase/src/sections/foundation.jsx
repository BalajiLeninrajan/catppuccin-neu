/* Foundation — palette, type roles, the depth ladder, contract properties.
   Pure system markup: cn-* utilities + recipes, contract props set inline.  */

import { Section, Specimen, ToneRow, EntityRow } from "../lib/specimen.jsx";

/* The 23 Mocha tokens, in ramp order (tokens.css is the source of truth). */
const NEUTRALS = [
  ["crust", "#11111b"],
  ["mantle", "#181825"],
  ["base", "#1e1e2e"],
  ["surface-0", "#313244"],
  ["surface-1", "#45475a"],
  ["surface-2", "#585b70"],
  ["overlay-0", "#6c7086"],
  ["overlay-1", "#7f849c"],
  ["overlay-2", "#9399b2"],
  ["subtext-0", "#a6adc8"],
  ["subtext-1", "#bac2de"],
  ["text", "#cdd6f4"],
];

const ACCENTS = [
  ["rosewater", "#f5e0dc"],
  ["pink", "#f5c2e7"],
  ["mauve", "#cba6f7"],
  ["red", "#f38ba8"],
  ["peach", "#fab387"],
  ["yellow", "#f9e2af"],
  ["green", "#a6e3a1"],
  ["teal", "#94e2d5"],
  ["sky", "#89dceb"],
  ["blue", "#89b4fa"],
  ["lavender", "#b4befe"],
];

function Swatch({ name, hex }) {
  return (
    <div class="sc-row">
      <span
        class="mark-solid"
        style={{ "--accent": `var(--${name})` }}
        title={hex}
        aria-hidden="true"
      ></span>
      <div>
        <div class="cn-label">{name}</div>
        <div class="cn-meta">{hex}</div>
      </div>
    </div>
  );
}

/* Caption + sample tile — .metric is the system's padded label/value column. */
function Role({ name, children }) {
  return (
    <div class="metric">
      <div class="cn-meta">.{name}</div>
      {children}
    </div>
  );
}

function DepthTile({ cls, note }) {
  return (
    <div class={`metric cn-bg-base cn-edge cn-r-card ${cls}`}>
      <span>{cls.replace("cn-", "")}</span>
      <div class="cn-meta">{note}</div>
    </div>
  );
}

/* Radius swatch — a raised square wearing one role-named radius. */
function RadiusTile({ cls, note }) {
  return (
    <div style={{ display: "grid", gap: "7px", justifyItems: "center" }}>
      <span
        class={`cn-bg-base cn-edge cn-raised-soft ${cls}`}
        style={{ width: "64px", height: "64px", display: "block" }}
        aria-hidden="true"
      ></span>
      <span class="cn-meta">
        .{cls} · {note}
      </span>
    </div>
  );
}

/* The full .cn-text-* ramp, dimmest neutral last, then the palette. */
const TEXT_COLORS = [
  "text",
  "subtext-1",
  "subtext-0",
  "overlay-2",
  "overlay-1",
  "overlay-0",
  "mauve",
  "pink",
  "red",
  "green",
  "peach",
  "yellow",
  "blue",
  "teal",
  "lavender",
];

const BG_TILES = [
  ["cn-bg-base", "var(--base)"],
  ["cn-bg-mantle", "var(--mantle)"],
  ["cn-bg-crust", "var(--crust)"],
  ["cn-bg-well", "crust 38% into mantle"],
  ["cn-bg-head", "crust 30% into mantle"],
];

const EDGE_TILES = [
  ["cn-edge", "", "surface-2 40%"],
  ["cn-edge-soft", "", "surface-1 38% · wells"],
  ["cn-edge-line", "", "surface-0 · row rules"],
  ["cn-edge-mauve", "", "mauve 30%"],
  ["cn-edge-tone", "cn-tone-blue", "tone 25% into surface-0"],
  ["cn-edge-entity", "", "entity 28% into surface-0"],
  ["cn-edge-dashed", "", "the only dashed border"],
];

const RADIUS_TILES = [
  ["cn-r-panel", "--pane-radius (16)"],
  ["cn-r-card", "13"],
  ["cn-r-control", "10"],
  ["cn-r-mark", "8"],
  ["cn-r-chip", "4"],
  ["cn-r-pill", "999"],
  ["cn-r-round", "50%"],
];

const CONTRACT_SNIPPET = `:root {
  --entity-color: var(--mauve);      /* per-entity identity; set inline from data */
  --tone: var(--peach);              /* semantic tint for chips/banners */
  --accent: var(--mauve);            /* solid-mark fill */
  --hard-offset-color: var(--crust); /* primary buttons override */

  --control-h: 46px;   --control-h-sm: 34px;
  --input-h: 42px;     --pane-radius: 16px;
}
[data-density="compact"] {
  --control-h: 30px;   --control-h-sm: 24px;
  --input-h: 30px;     --pane-radius: 12px;
}`;

export default function Foundation() {
  return (
    <Section
      id="foundation"
      title="Foundation"
      blurb="The Mocha palette, the type roles, the depth ladder, and the four contract properties every recipe reads."
    >
      <Specimen title="mocha palette · 23 tokens" classes="mark-solid">
        <div>
          <div class="cn-microlabel">neutral ramp · crust → text</div>
          <div class="sc-row">
            {NEUTRALS.map(([name, hex]) => (
              <Swatch key={name} name={name} hex={hex} />
            ))}
          </div>
        </div>
        <div>
          <div class="cn-microlabel">accents · mauve is the one ui accent</div>
          <div class="sc-row">
            {ACCENTS.map(([name, hex]) => (
              <Swatch key={name} name={name} hex={hex} />
            ))}
          </div>
        </div>
      </Specimen>

      <Specimen
        title="type roles · mono — labels, numbers, metadata"
        classes="cn-label · cn-microlabel · cn-value · cn-value-lg · cn-meta · cn-eyebrow · cn-code"
      >
        <Role name="cn-label">
          <div class="cn-label">avg quarter pace</div>
        </Role>
        <Role name="cn-microlabel">
          <div class="cn-microlabel">words per minute</div>
        </Role>
        <Role name="cn-value">
          <div class="cn-value">1:52.4</div>
        </Role>
        <Role name="cn-value-lg">
          <div class="cn-value-lg">128</div>
        </Role>
        <Role name="cn-meta">
          <div class="cn-meta">12 runs · p95 41 ms · seed 7841</div>
        </Role>
        <Role name="cn-eyebrow">
          <div class="cn-eyebrow">heat 03 · final call</div>
        </Role>
        <Role name="cn-code">
          <div class="cn-code">salt bench --runs 12 --warmup 3</div>
        </Role>
      </Specimen>

      <Specimen
        title="type roles · sans — headings, names, prose"
        classes="cn-display · cn-display-sm · cn-title · cn-name · cn-lede · cn-copy"
      >
        <Role name="cn-display">
          <div class="cn-display">
            Race <em>day</em>.
          </div>
        </Role>
        <Role name="cn-display-sm">
          <div class="cn-display-sm">Every word counts.</div>
        </Role>
        <Role name="cn-title">
          <div class="cn-title">Midterm results</div>
        </Role>
        <Role name="cn-name">
          <div class="cn-name">Duchess of Ayr</div>
        </Role>
        <Role name="cn-lede">
          <div class="cn-lede">
            Nine heats on the evening card. Pace projections update the moment
            each quarter time goes up on the board.
          </div>
        </Role>
        <Role name="cn-copy">
          <div class="cn-copy">
            Scratched entries keep their morning-line odds so the audit trail
            stays honest.
          </div>
        </Role>
      </Specimen>

      <Specimen
        title="depth · the four neu tokens — light source top-left"
        classes="cn-raised · cn-raised-soft · cn-raised-lit · cn-inset · cn-inset-soft"
      >
        <DepthTile cls="cn-raised" note="--neu-raised" />
        <DepthTile cls="cn-raised-soft" note="--neu-raised-soft" />
        <DepthTile cls="cn-raised-lit" note="raised + lit edge" />
        <DepthTile cls="cn-inset" note="--neu-inset" />
        <DepthTile cls="cn-inset-soft" note="--neu-inset-soft" />
      </Specimen>

      <Specimen
        title="depth · promoted shadows & the hard family"
        classes="cn-pop · cn-cast · cn-mark-drop · cn-hard · cn-hard-sm · cn-hard-lg · cn-flat"
      >
        <DepthTile cls="cn-pop" note="--shadow-pop · overlays" />
        <DepthTile cls="cn-cast" note="--shadow-cast · topbar" />
        <DepthTile cls="cn-mark-drop" note="--shadow-mark · marks" />
        <DepthTile cls="cn-hard" note="4px 4px 0 offset" />
        <DepthTile cls="cn-hard-sm" note="3px 3px 0 · compact" />
        <DepthTile cls="cn-hard-lg" note="10px 10px 0 · hero" />
        <DepthTile cls="cn-flat" note="box-shadow: none" />
      </Specimen>

      <Specimen
        title="text color utilities · the ramp + the palette"
        classes="cn-text-text … cn-text-lavender · cn-text-tone · cn-text-entity"
      >
        <div class="sc-row">
          {TEXT_COLORS.map((name) => (
            <span key={name} class={`cn-code cn-text-${name}`}>
              .cn-text-{name}
            </span>
          ))}
          <span class="cn-code cn-text-tone cn-tone-green">
            .cn-text-tone
          </span>
          <span
            class="cn-code cn-text-entity"
            style={{ "--entity-color": "var(--teal)" }}
          >
            .cn-text-entity
          </span>
        </div>
      </Specimen>

      <Specimen
        title="background utilities · the surface ladder"
        classes="cn-bg-base · cn-bg-mantle · cn-bg-crust · cn-bg-well · cn-bg-head"
      >
        {BG_TILES.map(([cls, note]) => (
          <div key={cls} class={`metric cn-edge cn-r-card ${cls}`}>
            <span>{cls.replace("cn-", "")}</span>
            <div class="cn-meta">{note}</div>
          </div>
        ))}
      </Specimen>

      <Specimen
        title="border utilities · one solid family, one blessed dash"
        classes="cn-edge · cn-edge-soft · cn-edge-line · cn-edge-mauve · cn-edge-tone · cn-edge-entity · cn-edge-dashed"
      >
        {EDGE_TILES.map(([cls, tone, note]) => (
          <div key={cls} class={`metric cn-bg-base cn-r-card ${cls} ${tone}`}>
            <span>{cls.replace("cn-", "")}</span>
            <div class="cn-meta">{note}</div>
          </div>
        ))}
      </Specimen>

      <Specimen
        title="radius utilities · role-named, no numeric escape hatch"
        classes="cn-r-panel · cn-r-card · cn-r-control · cn-r-mark · cn-r-chip · cn-r-pill · cn-r-round"
      >
        {RADIUS_TILES.map(([cls, note]) => (
          <RadiusTile key={cls} cls={cls} note={note} />
        ))}
      </Specimen>

      <Specimen
        title="cn-engaged · the selected/toggled state on a plain control"
        classes="cn-engaged"
      >
        <button
          type="button"
          class="cn-bg-base cn-edge cn-r-control cn-raised-soft"
          style={{ padding: "12px 18px", cursor: "pointer" }}
        >
          <span class="cn-name">Lane 4 · at rest</span>
        </button>
        <button
          type="button"
          class="cn-bg-base cn-edge cn-r-control cn-engaged"
          style={{ padding: "12px 18px", cursor: "pointer" }}
        >
          <span class="cn-name">Lane 5 · engaged</span>
        </button>
        <p class="cn-copy" style={{ flex: "1 1 320px" }}>
          Sunk one pixel, neu-inset, mauve-keyed border and wash — the one
          settled "selected" treatment. Recipes bake it into segmented options
          and toolbar toggles; the standalone modifier gives it to anything
          else.
        </p>
      </Specimen>

      <Specimen
        title="cn-tint · bare tone tint background"
        classes="cn-tint cn-tone-blue"
      >
        <ToneRow>
          {(tone) => (
            <span
              key={tone}
              class={`cn-code cn-text-tone cn-tint cn-r-chip cn-tone-${tone}`}
              style={{ padding: "6px 10px" }}
            >
              cn-tone-{tone}
            </span>
          )}
        </ToneRow>
      </Specimen>

      <Specimen
        title="cn-sr-only & cn-hidden · the two visibility escape hatches"
        classes="cn-sr-only · cn-hidden"
      >
        <div style={{ display: "grid", gap: "10px" }}>
          <p class="cn-copy">
            <span class="cn-code">.cn-sr-only</span> clips content to a 1px box
            — gone visually, still announced. The live chip below opens with a
            clipped "live —" that only assistive tech reads.{" "}
            <span class="cn-code">.cn-hidden</span> is display:none !important —
            the second chip is in the DOM but fully removed from both trees.
          </p>
          <div class="sc-row">
            <span class="chip">
              <span class="live-dot" />
              <span class="cn-sr-only">live — </span>
              heat 3 running
            </span>
            <span class="chip cn-hidden">scratched · you should not see this</span>
          </div>
        </div>
      </Specimen>

      <Specimen
        title="contract properties · the documented extension points"
        classes="--entity-color · --tone · --accent · --hard-offset-color"
      >
        <p class="cn-copy">
          Every recipe reads these custom properties and nothing else. Set them
          inline (or on a wrapper) to re-key a whole subtree — an entity card,
          a status chip, a whole compact pane.
        </p>
        <div class="terminal">
          <pre>{CONTRACT_SNIPPET}</pre>
        </div>
      </Specimen>

      <Specimen
        title="--entity-color · the six-entity cycle"
        classes="cn-spine cn-tint-entity cn-edge-entity cn-r-card"
      >
        <EntityRow>
          {(color, name) => (
            <div
              key={name}
              class="metric cn-spine cn-tint-entity cn-edge-entity cn-r-card"
              style={{ "--entity-color": color }}
            >
              <span>{name}</span>
              <strong class="cn-text-entity">{color}</strong>
            </div>
          )}
        </EntityRow>
      </Specimen>

      <Specimen title="--tone · semantic tint" classes="chip-tone cn-tone-red">
        <ToneRow>
          {(tone) => (
            <span key={tone} class={`chip-tone cn-tone-${tone}`}>
              {tone}
            </span>
          )}
        </ToneRow>
      </Specimen>

      <Specimen
        title="--accent & --hard-offset-color"
        classes="mark-solid · cn-hard"
      >
        <div class="sc-row">
          {[
            ["1", "var(--mauve)"],
            ["2", "var(--teal)"],
            ["3", "var(--yellow)"],
            ["4", "var(--blue)"],
            ["5", "var(--peach)"],
            ["6", "var(--pink)"],
          ].map(([rank, accent]) => (
            <span key={rank} class="mark-solid" style={{ "--accent": accent }}>
              {rank}
            </span>
          ))}
        </div>
        <div class="metric cn-bg-base cn-edge cn-r-control cn-hard">
          <span>rest offset</span>
          <div class="cn-meta">--hard-offset-color: var(--crust)</div>
        </div>
        <div
          class="metric cn-bg-base cn-edge cn-r-control cn-hard"
          style={{
            "--hard-offset-color":
              "color-mix(in srgb, var(--mauve) 25%, var(--surface-0))",
          }}
        >
          <span>primary's offset</span>
          <div class="cn-meta">mauve 25% into surface-0</div>
        </div>
      </Specimen>

      <Specimen title="density knobs" classes='data-density="compact"'>
        {[
          {
            label: "default density",
            attrs: {},
            meta: "--control-h 46 · --input-h 42 · --pane-radius 16",
          },
          {
            label: "compact density",
            attrs: { "data-density": "compact" },
            meta: "--control-h 30 · --input-h 30 · --pane-radius 12",
          },
        ].map(({ label, attrs, meta }) => (
          <div key={label} class="panel" {...attrs}>
            <div class="metric">
              <span>{label}</span>
              <button type="button" class="btn btn-secondary">
                Log result
              </button>
              <input class="input" value="1:52.4" readOnly />
              <div class="cn-meta">{meta}</div>
            </div>
          </div>
        ))}
      </Specimen>
    </Section>
  );
}
