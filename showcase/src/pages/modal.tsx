import { useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const CloseIcon = () => (
  <svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" aria-hidden="true">
    <path d="M3.5 3.5l9 9M12.5 3.5l-9 9" />
  </svg>
);

interface ModalDemoProps {
  trigger: string;
  triggerClass: string;
  title: string;
  wide?: boolean;
  action: string;
  children: ComponentChildren;
}

/* A native dialog: showModal() opens it, Escape and a backdrop click close it. */
function ModalDemo({ trigger, triggerClass, title, wide, action, children }: ModalDemoProps) {
  const ref = useRef<HTMLDialogElement>(null);
  const close = () => ref.current?.close();
  const id = `modal-${title.toLowerCase().replace(/\W+/g, "-")}`;

  return (
    <>
      <button type="button" class={triggerClass} onClick={() => ref.current?.showModal()}>
        {trigger}
      </button>
      <dialog
        ref={ref}
        class={`modal${wide ? " is-wide" : ""}`}
        aria-labelledby={id}
        onClick={(e) => e.target === ref.current && close()}
      >
        <header>
          <h2 id={id} class="cn-title" style="margin:0">
            {title}
          </h2>
          <button type="button" class="btn is-icon" aria-label="Close" onClick={close}>
            <CloseIcon />
          </button>
        </header>
        <div class="panel-body cn-stack cn-gap-16">{children}</div>
        <footer class="panel-footer">
          <button type="button" class="btn btn-ghost" onClick={close}>
            Cancel
          </button>
          <button type="button" class="btn btn-primary" onClick={close}>
            {action}
          </button>
        </footer>
      </dialog>
    </>
  );
}

const MEMBERS = [
  ["Maya Okafor", "Admin", "Aug 02"],
  ["Jonah Reyes", "Member", "Aug 14"],
  ["Priya Raman", "Viewer", "Sep 01"],
];

export default function ModalPage() {
  return (
    <Doc
      title="Modal"
      lede="A centered dialog on the native <dialog> element. showModal() opens it in the top layer, traps focus and draws the scrim. Escape closes it."
    >
      <p class="cn-copy">
        Put <code class="cn-code">.modal</code> on a{" "}
        <code class="cn-code">&lt;dialog&gt;</code>. The platform gives you the
        top layer, focus trapping, Escape, and{" "}
        <code class="cn-code">::backdrop</code>, which the recipe draws as the
        blurred crust scrim. The modal fades in, rises 8px and scales up from
        .98. It leaves on the ease-in in .14s. Add one listener if a backdrop
        click should close it.
      </p>

      <Demo title="Live demo" classes="dialog.modal">
        <ModalDemo trigger="Invite a teammate" triggerClass="btn btn-primary" title="Invite a teammate" action="Send invite">
          <p class="cn-copy" style="margin:0">
            They get access to every dashboard in this workspace. You can change
            their role from Settings later.
          </p>
          <div class="field">
            <label for="invite-email">Email address</label>
            <input id="invite-email" type="email" placeholder="name@company.com" />
          </div>
          <div class="field">
            <label for="invite-role">Role</label>
            <select id="invite-role">
              <option>Member</option>
              <option>Admin</option>
              <option>Viewer</option>
            </select>
          </div>
        </ModalDemo>
      </Demo>

      <Demo title="Wide" classes="dialog.modal.is-wide">
        <ModalDemo trigger="Review members" triggerClass="btn btn-secondary" title="Review members" action="Save roles" wide>
          <table class="data-table">
            <thead>
              <tr>
                <th>Member</th>
                <th>Role</th>
                <th>Joined</th>
              </tr>
            </thead>
            <tbody>
              {MEMBERS.map(([name, role, joined]) => (
                <tr key={name}>
                  <td class="cell-name">
                    <strong>{name}</strong>
                  </td>
                  <td data-label="Role">{role}</td>
                  <td data-label="Joined">{joined}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalDemo>
      </Demo>

      <p class="cn-copy">
        <code class="cn-code">.is-wide</code> is 760px, for a table or a
        two-column form. Both widths leave 16px of viewport on each side.
      </p>

      <Props
        title="Contract"
        rows={[
          {
            name: "dialog.modal",
            values: "showModal() / close()",
            default: "·",
            notes: "width min(520px, 100vw - 32px); max-height 100dvh - 48px; --shadow-pop. Radius is --cn-radius-panel.",
          },
          {
            name: ".modal.is-wide",
            values: "modifier",
            default: "·",
            notes: "width min(760px, 100vw - 32px).",
          },
          {
            name: ".modal > header",
            values: "title and close control",
            default: "·",
            notes: "The shared band: --band-h tall, --band-pad, recessed fill. Top corners follow the panel radius minus 1px.",
          },
          {
            name: ".modal > footer.panel-footer",
            values: "action row",
            default: "·",
            notes: "No fill; the divider separates it.",
          },
          {
            name: "::backdrop",
            values: "the scrim",
            default: "·",
            notes: "Crust at 80% with a 2px blur. Fades with the dialog.",
          },
          {
            name: "motion",
            values: "--t-base in, --t-exit out",
            default: "·",
            notes: "Rides discrete display and overlay transitions. Where a browser lacks them, the dialog appears and disappears in place.",
          },
        ]}
      />

      <CodeBlock
        title="Markup"
        code={`<dialog class="modal" aria-labelledby="t">
  <header>
    <h2 id="t" class="cn-title">Invite a teammate</h2>
    <button class="btn is-icon" aria-label="Close">…svg…</button>
  </header>
  <div class="panel-body">…</div>
  <footer class="panel-footer">
    <button class="btn btn-ghost">Cancel</button>
    <button class="btn btn-primary">Send invite</button>
  </footer>
</dialog>`}
      />

      <CodeBlock
        title="Open, close, and close on a backdrop click"
        code={`const dialog = document.querySelector("dialog.modal");
openButton.addEventListener("click", () => dialog.showModal());
dialog.addEventListener("click", (e) => {
  if (e.target === dialog) dialog.close();
});`}
      />
    </Doc>
  );
}
