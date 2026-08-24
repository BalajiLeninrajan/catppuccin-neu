import { Doc, Demo, Props, CodeBlock, ACCENTS } from "../lib/doc";

const PEOPLE = [
  { initials: "NR", name: "Nadia Rahman" },
  { initials: "TS", name: "Tomas Silva" },
  { initials: "AK", name: "Aya Kato" },
  { initials: "JL", name: "Jon Lindqvist" },
  { initials: "MD", name: "Mara Diaz" },
  { initials: "EO", name: "Efe Okafor" },
];

export default function AvatarPage() {
  return (
    <Doc
      title="Avatar"
      lede="An initials round keyed by --accent. The tint, hairline border, and text all derive from the one property."
    >
      <Demo title="The accent cycle" classes="avatar  (set --accent inline)" row>
        {PEOPLE.map((p, i) => (
          <span
            key={p.initials}
            class="avatar"
            style={`--accent:${ACCENTS[i].color}`}
            title={p.name}
          >
            {p.initials}
          </span>
        ))}
      </Demo>

      <p class="cn-copy">
        Assign accents from data, index into the cycle by user id or list
        position, so a person keeps the same color everywhere. An image
        variant exists too, put an <code class="cn-code">img</code> inside and
        it covers the round, the tint stays behind it as the loading ground.
      </p>

      <Demo title="Large" classes="avatar is-lg" row>
        <span class="avatar is-lg" style="--accent:#94e2d5" title="Tomas Silva">
          TS
        </span>
        <span class="avatar is-lg" style="--accent:#f5c2e7" title="Efe Okafor">
          EO
        </span>
      </Demo>

      <Demo title="Stack" classes="avatar-stack > .avatar">
        <div class="avatar-stack">
          <span class="avatar" style="--accent:#cba6f7" title="Nadia Rahman">
            NR
          </span>
          <span class="avatar" style="--accent:#94e2d5" title="Tomas Silva">
            TS
          </span>
          <span class="avatar" style="--accent:#f9e2af" title="Aya Kato">
            AK
          </span>
          <span class="avatar" style="--accent:#89b4fa" title="Jon Lindqvist">
            JL
          </span>
        </div>
      </Demo>

      <p class="cn-copy">
        In a stack each avatar rings itself with 2px of the page ground, so
        the overlap reads as separate rounds instead of a blob.
      </p>

      <CodeBlock
        title="Markup"
        code={`<span class="avatar" style="--accent:#cba6f7" title="Nadia Rahman">NR</span>

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
            notes:
              "32px round, sans 700 11px. Accent text, 14% accent tint over mantle, 38% accent hairline.",
          },
          {
            name: ".is-lg",
            notes: "44px round, 14px initials.",
          },
          {
            name: ".avatar-stack",
            notes:
              "Inline flex. Each avatar after the first overlaps -8px, every avatar adds a 2px --base ring.",
          },
          {
            name: "--accent",
            values: "any accent hex from the cycle",
            default: "var(--mauve)",
            notes: "Set inline from data. Keys tint, border, and initials at once.",
          },
        ]}
      />
    </Doc>
  );
}
