"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";

const ROTATING_REPOS = [
  "jahopp-ai",
  "ssn-web",
  "kubeai-ops",
  "jahopp-backend",
  "byggmax-rma",
  "ignite-magic",
  "ssn-database",
];

export default function Loader() {
  const [done, setDone] = useState(false);
  const [count, setCount] = useState(0);
  const [repo, setRepo] = useState(ROTATING_REPOS[0]);

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

    const minMs = 900;
    const maxMs = 2000;

    const tick = (now: number) => {
      const elapsed = now - start;
      const minT = Math.min(1, elapsed / minMs);
      const maxT = Math.min(1, elapsed / maxMs);
      const eased = 1 - Math.pow(1 - minT, 3);
      const target = ready ? Math.max(eased, maxT) : Math.min(eased, 0.92);
      setCount(Math.round(target * 100));

      if (ready && elapsed >= minMs && target >= 1) {
        setTimeout(() => setDone(true), 240);
        return;
      }
      if (elapsed >= maxMs) {
        setCount(100);
        setTimeout(() => setDone(true), 240);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  useEffect(() => {
    if (done) return;
    const i = setInterval(() => {
      setRepo(
        (r) =>
          ROTATING_REPOS[
            (ROTATING_REPOS.indexOf(r) + 1) % ROTATING_REPOS.length
          ]
      );
    }, 240);
    return () => clearInterval(i);
  }, [done]);

  return (
    <div
      aria-hidden="true"
      role="presentation"
      className={`fixed inset-0 z-[300] flex flex-col justify-between gap-6 px-6 py-8 transition-[clip-path,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] sm:px-10 sm:py-10 ${
        done ? "pointer-events-none opacity-0" : ""
      }`}
      style={{
        background: "var(--color-bg)",
        clipPath: done ? "inset(0 0 100% 0)" : "inset(0 0 0 0)",
      }}
    >
      <div className="flex items-baseline justify-between gap-3">
        <div className="flex items-baseline gap-3">
          <span className="num-tag text-[color:var(--color-accent-ink)]">
            ●
          </span>
          <span className="num-tag">warming up</span>
        </div>
        <div className="hidden text-right md:block">
          <div className="num-tag">{profile.name}</div>
          <div className="num-tag">{profile.role.toLowerCase()}</div>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <div className="font-mono text-xs uppercase tracking-widest text-[color:var(--color-muted)]">
          <span
            className="inline-block rounded border border-[color:var(--color-line)] bg-[color:var(--color-card)] px-2 py-0.5 text-[color:var(--color-accent-ink)]"
            style={{
              minWidth: "10ch",
              transition: "opacity 200ms ease",
            }}
          >
            {repo}
          </span>
        </div>

        <div className="flex items-end gap-3">
          <span className="display text-[18vw] leading-none sm:text-[10vw]">
            {String(count).padStart(3, "0")}
          </span>
          <span className="num-tag pb-3">/ 100 · contribs loaded</span>
        </div>

        <div className="h-px w-full bg-[color:var(--color-line)]">
          <div
            className="h-full bg-[color:var(--color-accent)] transition-[width] duration-200"
            style={{ width: `${count}%` }}
          />
        </div>
      </div>
    </div>
  );
}
