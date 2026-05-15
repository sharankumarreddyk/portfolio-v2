"use client";

import { useEffect, useState } from "react";
import { experiences, type Experience as ExperienceType } from "@/lib/data";
import Reveal from "./Reveal";

function yearsMonths(iso: string): string {
  const start = new Date(iso);
  const now = new Date();
  const months =
    (now.getFullYear() - start.getFullYear()) * 12 +
    (now.getMonth() - start.getMonth());
  const y = Math.floor(months / 12);
  const m = months % 12;
  if (y === 0) return `${m}m`;
  if (m === 0) return `${y}y`;
  return `${y}y ${m}m`;
}

const TYPE_COLORS: Record<string, string> = {
  Intern: "var(--color-muted)",
  Contract: "var(--color-fg)",
  "Full-time": "var(--color-accent)",
};

export default function Experience() {
  const first = experiences[0];
  const startISO = first.startISO ?? "2024-10-01";
  const [years, setYears] = useState<string>(() => yearsMonths(startISO));

  useEffect(() => {
    setYears(yearsMonths(startISO));
  }, [startISO]);

  return (
    <section
      id="experience"
      className="relative border-t border-[color:var(--color-line)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        {/* Editorial header — flat, no card */}
        <div className="grid items-end gap-8 lg:grid-cols-[1fr_auto] lg:gap-12">
          <Reveal>
            <div>
              <div className="flex items-center gap-4">
                <span className="num-tag">04</span>
                <span className="h-px w-12 bg-[color:var(--color-line)]" />
                <span className="num-tag">experience</span>
              </div>
              <h2
                className="display mt-6 text-balance leading-[0.95]"
                style={{ fontSize: "clamp(2rem, 4.6vw, 3.6rem)" }}
              >
                A short story, written in commits.
              </h2>
              <p className="mt-4 max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
                From a commerce-foundation kid to a full-stack engineer
                shipping production code every day. The arc, briefly.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="flex items-baseline gap-3">
              <div
                className="display text-5xl leading-none text-[color:var(--color-fg)] sm:text-6xl"
                suppressHydrationWarning
              >
                {years}
              </div>
              <div className="num-tag">in industry</div>
            </div>
          </Reveal>
        </div>

        {/* Editorial timeline — flat, rule-line dividers, no cards */}
        <div className="mt-16 border-t border-[color:var(--color-line)]">
          {experiences.map((exp, i) => (
            <Reveal
              key={exp.company + i}
              delay={i * 100}
              direction="left"
              duration={1000}
            >
              <article className="group grid gap-6 border-b border-[color:var(--color-line)] py-10 sm:grid-cols-[200px_1fr_auto] sm:gap-10 sm:py-12">
                {/* Period column */}
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-3">
                    <span
                      className="h-1.5 w-1.5 rounded-full"
                      style={{
                        background:
                          i === 0
                            ? "var(--color-accent)"
                            : "var(--color-dim)",
                      }}
                    />
                    <span className="num-tag">{exp.period}</span>
                  </div>
                  {exp.location ? (
                    <span className="pl-5 text-xs text-[color:var(--color-muted)]">
                      {exp.location}
                    </span>
                  ) : null}
                </div>

                {/* Body column */}
                <div className="flex flex-col gap-5">
                  <div>
                    <h3
                      className="display text-balance leading-[1.05]"
                      style={{ fontSize: "clamp(1.6rem, 3vw, 2.4rem)" }}
                    >
                      {exp.role}
                    </h3>
                    <div className="mt-1 text-base text-[color:var(--color-muted)]">
                      {exp.company}
                    </div>
                  </div>

                  {exp.progression ? <Progression exp={exp} /> : null}

                  {exp.points.length ? (
                    <ul className="flex flex-col gap-2.5">
                      {exp.points.map((p, k) => (
                        <li
                          key={k}
                          className="flex gap-3 text-sm leading-relaxed text-[color:var(--color-muted)] sm:text-base"
                        >
                          <span
                            aria-hidden
                            className="mt-2.5 h-px w-3 shrink-0 bg-[color:var(--color-line)]"
                          />
                          {p}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>

                {/* Stat column — editorial, anchored to top of row */}
                <div className="border-t border-[color:var(--color-line)] pt-4 sm:self-start sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
                  <div className="display text-3xl leading-none text-[color:var(--color-fg)] sm:text-4xl">
                    {exp.stat.k}
                  </div>
                  <div className="num-tag mt-2 max-w-[160px]">{exp.stat.v}</div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Progression({ exp }: { exp: ExperienceType }) {
  if (!exp.progression) return null;
  return (
    <div className="border-l border-[color:var(--color-line)] pl-5">
      <div className="num-tag mb-4">role progression</div>
      <ol className="flex flex-col gap-3">
        {exp.progression.map((step, i) => {
          const color = TYPE_COLORS[step.type] ?? "var(--color-muted)";
          return (
            <li
              key={i}
              className="grid gap-3 sm:grid-cols-[150px_1fr_auto] sm:items-center"
            >
              <div className="flex items-center gap-3">
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 shrink-0 rounded-full"
                  style={{ background: color }}
                />
                <span className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-muted)]">
                  {step.period}
                </span>
              </div>
              <div className="text-sm text-[color:var(--color-fg)] sm:text-[15px]">
                {step.title}
              </div>
              <div className="flex items-center gap-2 sm:justify-end">
                <span
                  className="rounded-full border px-2.5 py-0.5 text-[10px] uppercase tracking-widest"
                  style={{
                    color: color,
                    borderColor: step.current
                      ? "var(--color-accent)"
                      : "var(--color-line)",
                    background: step.current
                      ? "rgba(197,255,61,0.06)"
                      : "transparent",
                  }}
                >
                  {step.type}
                </span>
                {step.current ? (
                  <span aria-hidden className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]" />
                  </span>
                ) : null}
              </div>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
