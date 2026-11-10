import { useRef } from "preact/hooks";
import type { ComponentChildren } from "preact";
import { Doc, Demo, Props, CodeBlock } from "../lib/doc";

const CloseIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" aria-hidden="true">
    <path d="M6 6l12 12M18 6 6 18" />
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
      lede="A centered dialog on the native <dialog> element, opened with showModal()."
    >
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

      <p class="cn-copy">
        The platform gives the top layer, the focus trap, Escape and the scrim. Add one listener if a backdrop click should close it.
      </p>

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

      <Props
        title="Classes"
        rows={[
          { name: "dialog.modal", values: "showModal() / close()", notes: "520px wide at most." },
          { name: ".modal.is-wide", values: "modifier", notes: "760px, for a table or a two-column form." },
          { name: ".modal > header", values: "title and close control", notes: "The shared band." },
          { name: ".modal > footer.panel-footer", values: "action row", notes: "No fill." },
          { name: "::backdrop", values: "the scrim", notes: "Drawn by the recipe." },
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
