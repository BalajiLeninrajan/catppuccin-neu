import { useState } from "preact/hooks";
import { Doc, Demo, Props, CodeBlock, PEOPLE, TEAMS, accentStyle } from "../lib/doc";

const NADIA = PEOPLE[0];
const PAYMENTS = TEAMS[0];

/* One member row and one stat card, either loading or loaded. */
function LoadingDemo() {
  const [loading, setLoading] = useState(true);

  return (
    <div class="cn-stack cn-gap-16" style="width:min(420px,100%)">
      <div class="panel panel-body cn-stack cn-gap-24" aria-busy={loading ? "true" : "false"}>
        {loading ? (
          <div class="cn-row cn-gap-12">
            <span class="skeleton is-round" aria-hidden="true" />
            <div class="cn-grow">
              <span class="skeleton is-text" aria-hidden="true" />
              <span class="skeleton is-text" aria-hidden="true" />
            </div>
          </div>
        ) : (
          <div class="cn-row cn-gap-12 cn-arrive">
            <span class="avatar" style={accentStyle(NADIA.accent)} role="img" aria-label={NADIA.name}>
              {NADIA.initials}
            </span>
            <div class="cn-stack cn-gap-4 cn-grow">
              <span class="cn-name">{NADIA.name}</span>
              <span class="cn-meta">Billing admin · joined Mar 2025</span>
            </div>
          </div>
        )}

        {loading ? (
          <div class="cn-stack cn-gap-8">
            <span class="skeleton is-text" style="width:40%" aria-hidden="true" />
            <span class="skeleton" style="height:28px;width:60%" aria-hidden="true" />
          </div>
        ) : (
          <div class="stat is-lg cn-arrive" style={accentStyle(PAYMENTS.accent)}>
            <span>Payments revenue</span>
            <strong>{PAYMENTS.revenue}</strong>
          </div>
        )}
      </div>
      <div>
        <button type="button" class="btn btn-secondary" onClick={() => setLoading(!loading)}>
          {loading ? "Show content" : "Show skeleton"}
        </button>
      </div>
    </div>
  );
}

export default function SkeletonPage() {
  return (
    <Doc
      title="Skeleton"
      lede="A carved placeholder where content is loading. It takes the well carve, below the ground, and breathes until the content arrives."
    >
      <Demo lead title="Loading a member row and a stat" why="Sizing, ARIA and the arrival" classes="skeleton · skeleton is-text · skeleton is-round">
        <LoadingDemo />
      </Demo>

      <p class="cn-copy">
        Size each skeleton to the content it stands in for, so nothing jumps
        when the content lands. <code class="cn-code-inline">.is-text</code> is one
        line of body copy, 1em tall. Consecutive lines sit 8px apart, and the
        last of several is 62% wide, the way a paragraph ends short.{" "}
        <code class="cn-code-inline">.is-round</code> is a 32px circle, the size of
        an avatar. A bare <code class="cn-code-inline">.skeleton</code> is a block
        16px tall; set its height and width inline.
      </p>

      <p class="cn-copy">
        Mark the loading region <code class="cn-code-inline">aria-busy="true"</code>{" "}
        so assistive tech waits for it, and give every skeleton{" "}
        <code class="cn-code-inline">aria-hidden="true"</code>. Under reduced motion
        the skeleton holds still at .85 opacity, the midpoint of its breath.
      </p>

      <p class="cn-copy">
        Put <code class="cn-code-inline">.cn-arrive</code> on the content that
        replaces a skeleton. It fades in and settles 2px over{" "}
        <code class="cn-code-inline">--t-fast</code>, and the whole set arrives at
        once, with no stagger. The demo above does this; toggle it to see the
        swap. The <a href="/motion">Motion</a> page covers the other data
        changes.
      </p>

      <CodeBlock
        title="Markup"
        code={`<div class="panel panel-body" aria-busy="true">
  <div class="cn-row cn-gap-12">
    <span class="skeleton is-round" aria-hidden="true"></span>
    <div class="cn-grow">
      <span class="skeleton is-text" aria-hidden="true"></span>
      <span class="skeleton is-text" aria-hidden="true"></span>
    </div>
  </div>
</div>

<!-- loaded: the same region, content arriving -->
<div class="panel panel-body" aria-busy="false">
  <div class="cn-row cn-gap-12 cn-arrive">…member row…</div>
</div>`}
      />

      <Props
        title="Contract"
        rows={[
          {
            name: ".skeleton",
            values: "block",
            notes: "16px min-height, the control radius, the well carve: the --cn-surface-sunken fill, 1.14:1 under a panel and 1.07:1 under the page, under --neu-inset, darkness only with no ring. Breathes to .7 opacity over 1.6s, so at its faintest it still sits 1.10:1 under a panel.",
          },
          {
            name: ".skeleton.is-text",
            values: "one line",
            notes: "1em tall with the chip radius. 8px between consecutive lines; the last of several is 62% wide.",
          },
          {
            name: ".skeleton.is-round",
            values: "avatar",
            notes: "A 32px circle.",
          },
          {
            name: '[aria-busy="true"]',
            values: "the loading region",
            notes: "Set it while loading and clear it when the content lands.",
          },
          {
            name: '[aria-hidden="true"]',
            values: "each skeleton",
            notes: "Skeletons carry no content, so assistive tech skips them.",
          },
          {
            name: ".cn-arrive",
            values: "on the loaded content",
            notes: "A fade and a 2px settle over --t-fast as the content replaces the skeleton. No stagger.",
          },
          {
            name: "prefers-reduced-motion",
            values: "reduce",
            notes: "The animation stops and the skeleton holds still at .85 opacity.",
          },
        ]}
      />
    </Doc>
  );
}
