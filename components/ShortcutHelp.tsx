"use client";

import { useEffect, useState } from "react";

const SHORTCUTS = [
  {
    group: "Navigate",
    items: [
      { keys: ["g", "h"], label: "Go to top" },
      { keys: ["g", "w"], label: "Go to work" },
      { keys: ["g", "p"], label: "Go to projects" },
      { keys: ["g", "s"], label: "Go to skills" },
      { keys: ["g", "e"], label: "Go to experience" },
      { keys: ["g", "a"], label: "Go to about" },
      { keys: ["g", "c"], label: "Go to contact" },
    ],
  },
  {
    group: "Act",
    items: [
      { keys: ["⌘", "K"], label: "Open command palette" },
      { keys: ["t"], label: "Toggle theme" },
      { keys: ["?"], label: "Show this help" },
      { keys: ["esc"], label: "Close any overlay" },
    ],
  },
  {
    group: "Easter eggs",
    items: [{ keys: ["s", "h", "a", "r", "a", "n"], label: "Hi there 👋" }],
  },
];

export default function ShortcutHelp() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      if (e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "?" || (e.shiftKey && e.key === "/")) {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      aria-hidden={!open}
      className={`fixed inset-0 z-[210] flex items-center justify-center px-4 transition-opacity duration-200 ${
        open ? "" : "pointer-events-none opacity-0"
      }`}
    >
      <button
        aria-label="Close shortcuts"
        onClick={() => setOpen(false)}
        tabIndex={open ? 0 : -1}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label="Keyboard shortcuts"
        className={`relative w-full max-w-lg overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] shadow-2xl transition-[transform,opacity] duration-200 ${
          open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
        }`}
      >
        <div className="flex items-baseline justify-between border-b border-[color:var(--color-line)] px-5 py-3">
          <div className="flex items-center gap-3">
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              ●
            </span>
            <span className="num-tag">keyboard shortcuts</span>
          </div>
          <kbd className="rounded border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--color-muted)]">
            esc
          </kbd>
        </div>

        <div className="flex max-h-[70vh] flex-col gap-6 overflow-y-auto p-5 sm:p-6">
          {SHORTCUTS.map((g) => (
            <section key={g.group}>
              <div className="num-tag mb-3">{g.group}</div>
              <ul className="flex flex-col gap-2.5">
                {g.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-center justify-between gap-4 text-sm"
                  >
                    <span className="text-[color:var(--color-fg)]">
                      {it.label}
                    </span>
                    <span className="flex items-center gap-1">
                      {it.keys.map((k, ki) => (
                        <kbd
                          key={ki}
                          className="inline-flex h-6 min-w-[24px] items-center justify-center rounded border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 font-mono text-[11px] text-[color:var(--color-fg)]"
                        >
                          {k}
                        </kbd>
                      ))}
                    </span>
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="border-t border-[color:var(--color-line)] px-5 py-2.5 text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
          press <kbd className="rounded border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 font-mono">?</kbd> anywhere to open this
        </div>
      </div>
    </div>
  );
}
