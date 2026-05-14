"use client";

import { useMemo, useState } from "react";
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
}: {
  weeks: Week[];
  totalContributions: number;
}) {
  const [hover, setHover] = useState<{
    c: number;
    d: string;
    x: number;
    y: number;
  } | null>(null);

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
        <div className="hidden items-center gap-2 sm:flex">
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
      </div>

      <div
        className="relative overflow-x-auto pb-2"
        onMouseLeave={() => setHover(null)}
      >
        <div className="relative inline-flex select-none gap-[3px]">
          {weeks.map((w, wi) => (
            <div
              key={wi}
              className="flex flex-col gap-[3px]"
            >
              {w.d.map((d, di) => {
                const lvl = levelFor(d.c);
                return (
                  <button
                    key={`${wi}-${di}`}
                    type="button"
                    aria-label={`${d.c} contributions on ${d.d}`}
                    onMouseEnter={(e) => {
                      const r = (
                        e.currentTarget as HTMLButtonElement
                      ).getBoundingClientRect();
                      setHover({
                        c: d.c,
                        d: d.d,
                        x: r.left + r.width / 2,
                        y: r.top,
                      });
                    }}
                    className="h-3 w-3 rounded-[2px] transition-transform duration-150 hover:scale-[1.4]"
                    style={{ background: SCALE[lvl] }}
                  />
                );
              })}
            </div>
          ))}
        </div>

        <div className="mt-2 flex gap-[3px]">
          {weeks.map((_, wi) => {
            const mark = monthMarks[wi];
            return (
              <div
                key={wi}
                className="w-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]"
              >
                {mark ? MONTH_LABELS[mark.m] : ""}
              </div>
            );
          })}
        </div>
      </div>

      {hover ? (
        <div
          aria-hidden
          className="pointer-events-none fixed z-[180] -translate-x-1/2 -translate-y-full rounded-md border border-[color:var(--color-line)] bg-[color:var(--color-card)] px-2.5 py-1.5 text-[11px] shadow-xl"
          style={{ left: hover.x, top: hover.y - 6 }}
        >
          <span className="font-mono text-[color:var(--color-accent-ink)]">
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
      ) : null}

      <div className="sr-only">
        {totalContributions} contributions over the last {totalDays} days.
      </div>
    </div>
  );
}
