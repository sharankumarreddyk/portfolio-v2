"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import type { Week } from "@/lib/github-data";
import CountUp from "./CountUp";

const SCALE = [
  "color-mix(in oklab, var(--color-line) 100%, transparent)",
  "color-mix(in oklab, var(--color-accent) 22%, var(--color-card))",
  "color-mix(in oklab, var(--color-accent) 42%, var(--color-card))",
  "color-mix(in oklab, var(--color-accent) 68%, var(--color-card))",
  "var(--color-accent)",
];

function levelFor(c: number) {
  if (c === 0) return 0;
  if (c < 4) return 1;
  if (c < 9) return 2;
  if (c < 18) return 3;
  return 4;
}

const MONTH_LABELS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function CommitHeatmap({
  weeks,
  totalContributions,
  variant = "default",
}: {
  weeks: Week[];
  totalContributions: number;
  variant?: "default" | "signature";
}) {
  const signature = variant === "signature";
  const cell = signature ? "h-3.5 w-3.5 sm:h-4 sm:w-4" : "h-3 w-3";
  const gap = signature ? "gap-[4px]" : "gap-[3px]";

  const [hover, setHover] = useState<{
    c: number;
    d: string;
    x: number;
    y: number;
  } | null>(null);

  const trackRef = useRef<HTMLDivElement>(null);
  const [drawn, setDrawn] = useState(false);

  useEffect(() => {
    const el = trackRef.current;
    if (!el) return;
    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) {
      setDrawn(true);
      return;
    }
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setDrawn(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const monthMarks = useMemo(() => {
    const seen = new Set<number>();
    return weeks.map((w, i) => {
      const first = w.d[0];
      if (!first) return null;
      const m = new Date(first.d).getUTCMonth();
      if (!seen.has(m) && i !== 0) {
        seen.add(m);
        return { i, m };
      }
      return null;
    });
  }, [weeks]);

  const totalDays = useMemo(
    () => weeks.reduce((acc, w) => acc + w.d.length, 0),
    [weeks]
  );

  return (
    <div className="relative">
      {!signature ? (
        <div className="mb-3 flex items-end justify-between gap-4 text-[color:var(--color-muted)]">
          <div>
            <div className="num-tag">contribution graph · 12 months</div>
            <div className="display mt-2 text-2xl text-[color:var(--color-fg)] sm:text-3xl">
              <CountUp value={totalContributions} />{" "}
              <span className="text-[color:var(--color-muted)]">
                contributions
              </span>
            </div>
          </div>
          <Legend />
        </div>
      ) : null}

      <div
        ref={trackRef}
        className="relative overflow-x-auto pb-2"
        onMouseLeave={() => setHover(null)}
        style={
          signature
            ? {
                maskImage:
                  "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, black 0%, black 92%, transparent 100%)",
              }
            : undefined
        }
      >
        <div className={`relative inline-flex select-none ${gap}`}>
          {weeks.map((w, wi) => {
            const colDelay = wi * (signature ? 22 : 14);
            return (
              <div key={wi} className={`flex flex-col ${gap}`}>
                {w.d.map((d, di) => {
                  const lvl = levelFor(d.c);
                  const cellDelay = colDelay + di * 6;
                  return (
                    <a
                      key={`${wi}-${di}`}
                      href={`https://github.com/sharankumarreddyk?tab=overview&from=${d.d}&to=${d.d}`}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`${d.c} contributions on ${d.d} · open on GitHub`}
                      onMouseEnter={(e) => {
                        const r = (
                          e.currentTarget as HTMLAnchorElement
                        ).getBoundingClientRect();
                        setHover({
                          c: d.c,
                          d: d.d,
                          x: r.left + r.width / 2,
                          y: r.top,
                        });
                      }}
                      className={`${cell} block rounded-[2px] transition-transform duration-150 ease-out hover:scale-[1.6]`}
                      style={
                        drawn
                          ? { background: SCALE[lvl] }
                          : {
                              background: SCALE[lvl],
                              opacity: 0,
                              transform: "scale(0.3)",
                              transition: `opacity 320ms cubic-bezier(0.22,1,0.36,1) ${cellDelay}ms, transform 420ms cubic-bezier(0.16,1,0.3,1) ${cellDelay}ms`,
                            }
                      }
                    />
                  );
                })}
              </div>
            );
          })}
        </div>

        <div className={`mt-2 flex ${gap}`}>
          {weeks.map((_, wi) => {
            const mark = monthMarks[wi];
            return (
              <div
                key={wi}
                className={`${signature ? "w-3.5 sm:w-4" : "w-3"} text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]`}
              >
                {mark ? MONTH_LABELS[mark.m] : ""}
              </div>
            );
          })}
        </div>
      </div>

      {signature ? (
        <div className="mt-4 hidden items-center justify-end sm:flex">
          <Legend />
        </div>
      ) : null}

      {hover ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[180] flex -translate-x-1/2 -translate-y-full flex-col gap-0.5 rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-card)] px-2.5 py-1.5 text-[11px] shadow-xl"
          style={{ left: hover.x, top: hover.y - 6 }}
        >
          <div>
            <span className="font-mono text-[color:var(--color-fg)]">
              {hover.c}
            </span>{" "}
            contributions on{" "}
            <span className="text-[color:var(--color-muted)]">
              {new Date(hover.d).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </span>
          </div>
          <div className="font-mono text-[9px] uppercase tracking-widest text-[color:var(--color-accent-ink)]">
            click → see this day on GitHub ↗
          </div>
        </div>
      ) : null}

      <div className="sr-only">
        {totalContributions} contributions over the last {totalDays} days.
      </div>
    </div>
  );
}

function Legend() {
  return (
    <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
      <span className="text-[10px] tracking-widest">LESS</span>
      {SCALE.map((c, i) => (
        <span
          key={i}
          className="h-3 w-3 rounded-[2px]"
          style={{ background: c }}
        />
      ))}
      <span className="text-[10px] tracking-widest">MORE</span>
    </div>
  );
}
