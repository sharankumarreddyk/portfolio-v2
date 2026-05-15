"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

const FACTS = [
  "First production deploy: October 2024. Number of times prod has broken since: definitely more than zero.",
  "Started shipping commerce as MEC/CMA, pivoted to code during BCA. Best wrong turn I've ever taken.",
  "Most-edited line of my code this year? Probably a CASE WHEN in a Postgres view.",
  "Bengaluru is 4.5h ahead of Stockholm. Most standups land at 12:30 IST. The coffee helps.",
  "This site has 0 fake commits, 0 stock photos, and 1 hand-tuned image-relevance threshold.",
  "The contribution heatmap above runs through 371 cells. I've personally re-rendered all of them.",
  "I read commit messages the way some people read novels.",
  "If a project hasn't shipped to prod, it doesn't exist on this site.",
  "Built with Next.js 15 + Tailwind v4. No CMS. No analytics. Just files.",
  "On weekends I debug Kubernetes pods on my own cluster. For fun, apparently.",
  "Three years ago I was learning what a closure was. Now I write them in TypeScript and Python on the same day.",
  "kubeai-ops started as a 2am rabbit hole. It still is, mostly.",
];

const MIN_DWELL = 650;
const MAX_DWELL = 1600;

function isInternalNavigation(a: HTMLAnchorElement): boolean {
  if (a.target && a.target !== "_self") return false;
  if (a.hasAttribute("download")) return false;
  const href = a.getAttribute("href");
  if (!href) return false;
  if (href.startsWith("http")) return false;
  if (href.startsWith("mailto:")) return false;
  if (href.startsWith("tel:")) return false;
  if (href.startsWith("#")) return false;
  try {
    const url = new URL(href, window.location.origin);
    if (url.origin !== window.location.origin) return false;
    // Same page navigation (anchor-only) — skip loader
    if (
      url.pathname === window.location.pathname &&
      (url.hash || url.search === window.location.search)
    )
      return false;
    return true;
  } catch {
    return false;
  }
}

export default function RouteTransition() {
  const pathname = usePathname();
  const [showing, setShowing] = useState(false);
  const [fact, setFact] = useState(FACTS[0]);
  const startedAt = useRef(0);
  const initial = useRef(true);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      if (e.button !== 0) return;
      const a = (e.target as HTMLElement | null)?.closest("a");
      if (!a) return;
      if (!isInternalNavigation(a as HTMLAnchorElement)) return;

      startedAt.current = performance.now();
      setFact(FACTS[Math.floor(Math.random() * FACTS.length)]);
      setShowing(true);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // Hide after pathname change + minimum dwell so the fact is readable
  useEffect(() => {
    if (initial.current) {
      initial.current = false;
      return;
    }
    if (!showing) return;
    const elapsed = performance.now() - startedAt.current;
    const wait = Math.max(0, MIN_DWELL - elapsed);
    const t = setTimeout(() => setShowing(false), wait);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  // Safety: never block longer than MAX_DWELL even if route never resolves
  useEffect(() => {
    if (!showing) return;
    const t = setTimeout(() => setShowing(false), MAX_DWELL);
    return () => clearTimeout(t);
  }, [showing]);

  // Lock body scroll while showing
  useEffect(() => {
    if (showing) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [showing]);

  return (
    <div
      aria-hidden={!showing}
      role="status"
      aria-live="polite"
      className={`pointer-events-none fixed inset-0 z-[280] flex flex-col items-center justify-center gap-8 bg-[color:var(--color-bg)] px-6 transition-[clip-path,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
        showing ? "" : "opacity-0"
      }`}
      style={{
        clipPath: showing ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
      }}
    >
      <div className="flex items-center gap-3 text-[color:var(--color-muted)]">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
        </span>
        <span className="num-tag text-[color:var(--color-accent-ink)]">
          loading · sharan kumar reddy
        </span>
      </div>

      <p
        className="serif max-w-2xl text-balance text-center leading-[1.2] text-[color:var(--color-fg)]"
        style={{ fontSize: "clamp(1.3rem, 3.4vw, 2.4rem)" }}
      >
        &ldquo;{fact}&rdquo;
      </p>

      <div className="flex h-px w-48 overflow-hidden rounded-full bg-[color:var(--color-line)]">
        <div
          className="h-full bg-[color:var(--color-accent)]"
          style={{
            animation: showing
              ? "rt-progress 700ms cubic-bezier(0.4, 0, 0.6, 1) forwards"
              : "none",
          }}
        />
      </div>

      <div className="num-tag">while you read · the page renders</div>

      <style>{`
        @keyframes rt-progress {
          from { width: 0%; }
          to { width: 100%; }
        }
      `}</style>
    </div>
  );
}
