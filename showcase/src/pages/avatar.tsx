import { Doc, Demo, Props, CodeBlock, PEOPLE, accentStyle } from "../lib/doc";

export default function AvatarPage() {
  return (
    <Doc
      title="Avatar"
      lede="An initials round. The tint, the border and the initials all come from --accent."
    >
      <Demo title="People, each in their own accent" classes="avatar  (set --accent from the record)" row>
        {PEOPLE.map((p) => (
          <span key={p.initials} class="avatar" style={accentStyle(p.accent)} role="img" aria-label={p.name} data-tip={p.name}>
            {p.initials}
          </span>
        ))}
      </Demo>

      <p class="cn-copy">
        Take the accent from the person's record, never from list position. An <code class="cn-code-inline">img</code> inside covers the round.
      </p>

      <Demo title="Stack" classes="avatar-stack > .avatar · --ring-ground: var(--cn-surface-page)">
        <div class="avatar-stack" style="--ring-ground:var(--cn-surface-page)">
          {PEOPLE.slice(0, 4).map((p) => (
            <span key={p.initials} class="avatar" style={accentStyle(p.accent)} role="img" aria-label={p.name} data-tip={p.name}>
              {p.initials}
            </span>
          ))}
        </div>
      </Demo>

      <p class="cn-copy">
        Give an initials avatar <code class="cn-code-inline">role="img"</code> and the person's name in <code class="cn-code-inline">aria-label</code>.
      </p>

      <CodeBlock
        title="Markup"
        code={`<span class="avatar" style="--accent:#cba6f7" role="img"
      aria-label="Nadia Rahman" data-tip="Nadia Rahman">NR</span>

<!-- image variant -->
<span class="avatar"><img src="nadia.jpg" alt="Nadia Rahman" /></span>

<div class="avatar-stack">
  <span class="avatar" style="--accent:#cba6f7">NR</span>
  <span class="avatar" style="--accent:#94e2d5">TS</span>
</div>`}
      />

      <Props
        title="Classes and tokens"
        rows={[
          { name: ".avatar", values: "initials text or one img", notes: "A 32px round." },
          { name: ".avatar-stack", values: "wrapper", notes: "Overlapping avatars, each with a ring." },
          { name: "--ring-ground", values: "color", default: "var(--base)", notes: "The ring color. Set it to the surface behind the stack." },
          { name: "--accent", values: "a hex from the record", default: "var(--mauve)", notes: "Set inline from data." },
        ]}
      />
    </Doc>
  );
}
