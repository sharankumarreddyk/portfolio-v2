"use client";

import { useEffect, useState } from "react";

const TARGET = "sharan";

export default function EasterEgg() {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    let buffer = "";
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const k = e.key.toLowerCase();
      if (k.length !== 1 || !/[a-z]/.test(k)) return;

      buffer = (buffer + k).slice(-TARGET.length);
      if (resetTimer) clearTimeout(resetTimer);
      resetTimer = setTimeout(() => {
        buffer = "";
      }, 1500);

      if (buffer === TARGET) {
        buffer = "";
        setShown(true);
        setTimeout(() => setShown(false), 2600);
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);

  if (!shown) return null;

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[220] flex items-center justify-center"
    >
      <div
        className="pointer-events-auto flex flex-col items-center gap-3 rounded-2xl border border-[color:var(--color-accent)] bg-[color:var(--color-card)]/95 px-8 py-6 text-center shadow-2xl backdrop-blur"
        style={{
          animation:
            "eggPop 0.5s cubic-bezier(0.16, 1, 0.3, 1), eggOut 0.4s cubic-bezier(0.22, 1, 0.36, 1) 2.2s forwards",
        }}
      >
        <div className="flex items-center gap-2 text-[color:var(--color-accent-ink)]">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
          </span>
          <span className="num-tag">you found it</span>
        </div>
        <p className="serif text-lg leading-snug text-[color:var(--color-fg)] sm:text-xl">
          Hi there. Thanks for paying attention.
        </p>
        <p className="text-xs text-[color:var(--color-muted)]">
          (Yes, I type my own name to test things too.)
        </p>
      </div>

      <style>{`
        @keyframes eggPop {
          0% { transform: scale(0.85) translateY(8px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }
        @keyframes eggOut {
          0% { transform: scale(1) translateY(0); opacity: 1; }
          100% { transform: scale(0.96) translateY(-6px); opacity: 0; }
        }
      `}</style>
    </div>
  );
}
