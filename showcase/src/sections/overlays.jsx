/* Overlays — popover, modal, drawer, toast. All float on --shadow-pop,
   never on the neu tokens: overlays hover above the surface instead of
   being carved from it. Plain Preact state, no dependencies. */

import { useEffect, useRef, useState } from "preact/hooks";
import { Section, Specimen } from "../lib/specimen.jsx";

const TOAST_MESSAGES = [
  "run #4822 finished — mean 2.38 s (−1.2%)",
  "heat 7 results posted — photo finish reviewed",
  "word list synced — 1,204 entries",
  "exam 12 graded — 14 attempts scored",
];

export default function Overlays() {
  const [popOpen, setPopOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [toasts, setToasts] = useState([]);
  const nextToastId = useRef(1);
  const nextToastMsg = useRef(0);

  /* Esc closes whichever overlay is open. */
  useEffect(() => {
    if (!(popOpen || modalOpen || drawerOpen)) return;
    const onKey = (e) => {
      if (e.key === "Escape") {
        setPopOpen(false);
        setModalOpen(false);
        setDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [popOpen, modalOpen, drawerOpen]);

  function spawnToast(msg) {
    const id = nextToastId.current++;
    setToasts((t) => [...t, { id, msg }]);
    setTimeout(() => {
      setToasts((t) => t.filter((x) => x.id !== id));
    }, 3600);
  }

  function spawnNextToast() {
    const msg = TOAST_MESSAGES[nextToastMsg.current % TOAST_MESSAGES.length];
    nextToastMsg.current++;
    spawnToast(msg);
  }

  function confirmScratch() {
    setModalOpen(false);
    spawnToast("Dusty Meadow scratched from heat 7");
  }

  return (
    <Section
      id="overlays"
      title="Overlays"
      blurb="Everything that floats rides --shadow-pop — a deep plain drop, never a neu token. Popovers anchor, modals and drawers sit in a .cn-scrim, toasts stack in a fixed corner."
    >
      {/* ── Popover ── */}
      <Specimen title="Popover — anchored menu" classes="popover">
        <div style={{ position: "relative" }}>
          <button
            type="button"
            class="btn btn-secondary"
            aria-expanded={popOpen}
            aria-haspopup="dialog"
            onClick={() => setPopOpen((v) => !v)}
          >
            Run #4821 detail
          </button>
          {popOpen ? (
            <div
              class="popover"
              role="dialog"
              aria-label="Run 4821 detail"
              style={{ top: "calc(100% + 10px)", left: 0 }}
            >
              <div
                class="cn-bg-head"
                style={{
                  padding: "12px 16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: "10px",
                }}
              >
                <span class="cn-label">run #4821 — varchar bench</span>
                <span class="chip-tone cn-tone-green">pass</span>
              </div>
              <div class="stat-strip" style={{ padding: "6px 16px 12px" }}>
                <div class="stat-row">
                  <span>mean</span>
                  <b>2.41 s</b>
                </div>
                <div class="stat-row">
                  <span>p95</span>
                  <b>3.08 s</b>
                </div>
                <div class="stat-row">
                  <span>samples</span>
                  <b>200</b>
                </div>
                <div class="stat-row">
                  <span>host</span>
                  <b>m3-max / darwin</b>
                </div>
              </div>
            </div>
          ) : null}
        </div>
        <p class="cn-meta">
          position: absolute against a relative anchor · z-index 80 · Esc closes
        </p>
      </Specimen>

      {/* ── Modal ── */}
      <Specimen title="Modal — centered in .cn-scrim" classes="modal">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => setModalOpen(true)}
        >
          Scratch entry…
        </button>
        <p class="cn-meta">
          child of .cn-scrim (blurred crust wash) · recessed header band · Esc or
          scrim click closes
        </p>
        {modalOpen ? (
          <div
            class="cn-scrim"
            onClick={(e) => {
              if (e.target === e.currentTarget) setModalOpen(false);
            }}
          >
            <div
              class="modal"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ov-modal-title"
            >
              <header>
                <span id="ov-modal-title" class="cn-title">
                  Scratch entry
                </span>
                <button
                  type="button"
                  class="btn-icon"
                  aria-label="Close dialog"
                  onClick={() => setModalOpen(false)}
                >
                  ✕
                </button>
              </header>
              <div style={{ padding: "18px 22px", display: "grid", gap: "14px" }}>
                <p class="cn-copy">
                  Remove <strong>Dusty Meadow</strong> (gate 4) from heat 7 of
                  the Twilight Trot? All wagers on this entry are refunded and
                  the morning line recalculates.
                </p>
                <div class="banner cn-tone-peach">
                  Scratching after the draw locks the remaining gate order —
                  entries 5–8 will not move up.
                </div>
              </div>
              <div class="panel-footer">
                <button
                  type="button"
                  class="btn btn-ghost"
                  onClick={() => setModalOpen(false)}
                >
                  Keep entry
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={confirmScratch}
                >
                  Scratch entry
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Specimen>

      {/* ── Drawer ── */}
      <Specimen title="Drawer — right-edge side sheet" classes="drawer">
        <button
          type="button"
          class="btn btn-secondary"
          onClick={() => setDrawerOpen(true)}
        >
          Review attempt #38
        </button>
        <p class="cn-meta">
          pinned to the right edge above the scrim · full-height column · Esc or
          scrim click closes
        </p>
        {drawerOpen ? (
          <div
            class="cn-scrim"
            onClick={(e) => {
              if (e.target === e.currentTarget) setDrawerOpen(false);
            }}
          >
            <div
              class="drawer"
              role="dialog"
              aria-modal="true"
              aria-labelledby="ov-drawer-title"
            >
              <div class="panel-heading">
                <div style={{ display: "grid", gap: "6px" }}>
                  <span class="cn-microlabel">skill-issue · systems exam</span>
                  <span id="ov-drawer-title" class="cn-title">
                    Attempt #38
                  </span>
                </div>
                <button
                  type="button"
                  class="btn-icon"
                  aria-label="Close drawer"
                  onClick={() => setDrawerOpen(false)}
                >
                  ✕
                </button>
              </div>
              <div
                style={{
                  flex: "1",
                  padding: "18px 22px",
                  display: "grid",
                  gap: "16px",
                  alignContent: "start",
                }}
              >
                <div class="sc-row">
                  <span class="chip-tone cn-tone-green">passed</span>
                  <span class="chip">graded 2026-08-21</span>
                  <span class="chip">v2.3 rubric</span>
                </div>
                <div class="stat-strip">
                  <div class="stat-row">
                    <span>score</span>
                    <b>87 / 100</b>
                  </div>
                  <div class="stat-row">
                    <span>duration</span>
                    <b>42:17</b>
                  </div>
                  <div class="stat-row">
                    <span>percentile</span>
                    <b>p91</b>
                  </div>
                  <div class="stat-row">
                    <span>missed</span>
                    <b>4 of 40</b>
                  </div>
                </div>
                <div style={{ display: "grid", gap: "8px" }}>
                  <div class="stat-row">
                    <span>rubric coverage</span>
                    <b>87%</b>
                  </div>
                  <div class="progress-track">
                    <span style={{ width: "87%" }} />
                  </div>
                </div>
                <p class="cn-copy">
                  Strongest on concurrency and cache coherence; the four misses
                  cluster in the virtual-memory section. A retake unlocks after
                  the 48-hour cooldown.
                </p>
              </div>
              <div class="panel-footer">
                <button
                  type="button"
                  class="btn btn-ghost"
                  onClick={() => setDrawerOpen(false)}
                >
                  Close
                </button>
                <button
                  type="button"
                  class="btn btn-primary"
                  onClick={() => {
                    setDrawerOpen(false);
                    spawnToast("retake scheduled — exam 12, attempt #39");
                  }}
                >
                  Schedule retake
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </Specimen>

      {/* ── Toast ── */}
      <Specimen title="Toast — fixed-corner stack, auto-dismiss" classes="toast">
        <button type="button" class="btn btn-secondary" onClick={spawnNextToast}>
          Spawn toast
        </button>
        <p class="cn-meta">
          the consumer owns the fixed stack · each toast dismisses itself after
          3.6 s
        </p>
      </Specimen>

      {/* Toast stack — fixed corner, owned by this section. */}
      {toasts.length > 0 ? (
        <div
          style={{
            position: "fixed",
            right: "18px",
            bottom: "18px",
            zIndex: 90,
            display: "grid",
            gap: "10px",
            justifyItems: "end",
          }}
          role="status"
          aria-live="polite"
        >
          {toasts.map((t) => (
            <div class="toast page-enter" key={t.id}>
              <span class="live-dot" />
              {t.msg}
            </div>
          ))}
        </div>
      ) : null}
    </Section>
  );
}
