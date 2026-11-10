import { Doc, Demo, Props, CodeBlock, PEOPLE, accentStyle } from "../lib/doc";

const TOMAS = PEOPLE[1];
const EFE = PEOPLE[5];

export default function AvatarPage() {
  return (
    <Doc
      title="Avatar"
      lede="An initials round keyed by --accent. The tint, the hairline border and the initials all come from that one property."
    >
      <Demo title="People, each in their own accent" why="Where an avatar's accent comes from" classes="avatar  (set --accent from the record)" row>
        {PEOPLE.map((p) => (
          <span key={p.initials} class="avatar" style={accentStyle(p.accent)} role="img" aria-label={p.name} data-tip={p.name}>
            {p.initials}
          </span>
        ))}
      </Demo>

      <p class="cn-copy">
        Take the accent from the person: store it on the user record or
        derive it from the user id. Never from list position, or a person
        changes color when the list sorts. For an image, put an{" "}
        <code class="cn-code-inline">img</code> inside and it covers the round. The
        tint stays behind it while it loads.
      </p>

      <Demo title="Large" classes="avatar is-lg" row>
        <span class="avatar is-lg" style={accentStyle(TOMAS.accent)} role="img" aria-label={TOMAS.name} data-tip={TOMAS.name}>
          {TOMAS.initials}
        </span>
        <span class="avatar is-lg" style={accentStyle(EFE.accent)} role="img" aria-label={EFE.name} data-tip={EFE.name}>
          {EFE.initials}
        </span>
      </Demo>

      <Demo title="Stack" why="The stack ring and the accessible name" classes="avatar-stack > .avatar · --ring-ground: var(--cn-surface-page)">
        <div class="avatar-stack" style="--ring-ground:var(--cn-surface-page)">
          {PEOPLE.slice(0, 4).map((p) => (
            <span key={p.initials} class="avatar" style={accentStyle(p.accent)} role="img" aria-label={p.name} data-tip={p.name}>
              {p.initials}
            </span>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        In a stack each avatar draws a 2px ring in the page ground, so
        overlapping rounds stay separate.
      </p>

      <p class="cn-copy">
        Initials are not a name. Give an initials avatar{" "}
        <code class="cn-code-inline">role="img"</code> and the person's name in{" "}
        <code class="cn-code-inline">aria-label</code>. A{" "}
        <code class="cn-code-inline">data-tip</code> with the same name shows it
        on hover, but the bubble is never part of the accessible name.
      </p>

      <CodeBlock
        title="Markup"
        code={`<span class="avatar" style="--accent:#cba6f7" role="img"
      aria-label="Nadia Rahman" data-tip="Nadia Rahman">NR</span>

<span class="avatar is-lg" style="--accent:#94e2d5">TS</span>

<!-- image variant -->
<span class="avatar"><img src="nadia.jpg" alt="Nadia Rahman" /></span>

<div class="avatar-stack">
  <span class="avatar" style="--accent:#cba6f7">NR</span>
  <span class="avatar" style="--accent:#94e2d5">TS</span>
</div>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".avatar",
            values: "initials text or one img",
            notes: "32px round, sans 600 13px. Accent initials, the accent at --cn-step-fill (14%) over mantle, and an --cn-step-edge (40%) accent hairline into surface-0.",
          },
          {
            name: ".is-lg",
            notes: "44px round, 16px initials.",
          },
          {
            name: ".avatar-stack",
            notes: "Inline flex. Each avatar after the first overlaps by 8px, and every avatar adds a 2px ring.",
          },
          {
            name: "--ring-ground",
            values: "color",
            default: "var(--base)",
            notes: "The ring color, base by default, the panel fill. Set it to the surface behind the stack, such as var(--cn-surface-page) on the page, as in the demo above.",
          },
          {
            name: "--accent",
            values: "a hex from the record",
            default: "var(--mauve)",
            notes: "Set inline from data. Keys the tint, the border and the initials.",
          },
        ]}
      />
    </Doc>
  );
}
