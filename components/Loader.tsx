"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setCount(100);
      setDone(true);
      return;
    }

    const start = performance.now();
    let raf = 0;
    let ready = false;

    const fontsPromise =
      typeof document !== "undefined" && "fonts" in document
        ? document.fonts.ready.catch(() => undefined)
        : Promise.resolve();

    fontsPromise.then(() => {
      ready = true;
    });

    const minMs = 700;
    const maxMs = 1800;

    const tick = (now: number) => {
      const elapsed = now - start;
      const minT = Math.min(1, elapsed / minMs);
      const maxT = Math.min(1, elapsed / maxMs);
      const eased = 1 - Math.pow(1 - minT, 3);
      const target = ready ? Math.max(eased, maxT) : Math.min(eased, 0.92);
      setCount(Math.round(target * 100));

      if (ready && elapsed >= minMs && target >= 1) {
        setTimeout(() => setDone(true), 220);
        return;
      }
      if (elapsed >= maxMs) {
        setCount(100);
        setTimeout(() => setDone(true), 220);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`fixed inset-0 z-[300] flex items-end justify-between gap-6 px-6 py-8 transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 sm:py-10 ${
        done ? "pointer-events-none opacity-0" : ""
      }`}
      style={{
        background: "var(--color-bg)",
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
      }}
    >
      <div className="flex items-baseline gap-3">
        <span className="num-tag text-[color:var(--color-accent-ink)]">●</span>
        <span className="num-tag">warming up</span>
      </div>

      <div className="flex items-end gap-3">
        <span className="display text-[18vw] leading-none sm:text-[10vw]">
          {String(count).padStart(3, "0")}
        </span>
        <span className="num-tag pb-3">/ 100</span>
      </div>

      <div className="hidden text-right md:block">
        <div className="num-tag">{profile.name}</div>
        <div className="num-tag">{profile.role.toLowerCase()}</div>
      </div>
    </div>
  );
}
