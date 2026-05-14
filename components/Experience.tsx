"use client";

import { useEffect, useState } from "react";
import { experiences, type Experience as ExperienceType } from "@/lib/data";
import SectionHeader from "./SectionHeader";
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
  Contract: "var(--color-accent-ink)",
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
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <SectionHeader
            number="04"
            eyebrow="experience"
            title="A short story, written in commits."
            description="From a commerce-foundation kid to a full-stack engineer shipping production code in TypeScript and Python every day. The arc, briefly."
          />
          <Reveal delay={200}>
            <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] px-5 py-4">
              <div
                className="display text-3xl leading-none text-[color:var(--color-fg)] sm:text-4xl"
                suppressHydrationWarning
              >
                {years}
              </div>
              <div className="num-tag mt-2">in industry</div>
            </div>
          </Reveal>
        </div>

        <div className="relative mt-14">
          <div
            aria-hidden
            className="absolute left-3 top-2 h-[calc(100%-4rem)] w-px bg-[color:var(--color-line)] sm:left-4"
          />

          <ul className="flex flex-col gap-16">
            {experiences.map((exp, i) => (
              <Reveal key={exp.company + i} delay={i * 90}>
                <li className="group relative grid gap-6 pl-12 sm:grid-cols-[180px_1fr] sm:pl-14">
                  <span
                    aria-hidden
                    className="absolute left-0 top-2 grid h-7 w-7 place-items-center rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-bg)] transition-colors group-hover:border-[color:var(--color-accent)] sm:h-8 sm:w-8"
                  >
                    <span
                      className="h-2 w-2 rounded-full transition-colors"
                      style={{
                        background:
                          i === 0
                            ? "var(--color-accent)"
                            : "var(--color-dim)",
                      }}
                    />
                  </span>

                  <div className="flex flex-col gap-1">
                    <span className="num-tag">{exp.period}</span>
                    {exp.location ? (
                      <span className="text-xs text-[color:var(--color-muted)]">
                        {exp.location}
                      </span>
                    ) : null}
                  </div>

                  <div>
                    <h3 className="display text-3xl sm:text-4xl">
                      {exp.role}
                    </h3>
                    <div className="mt-1 text-base text-[color:var(--color-muted)]">
                      {exp.company}
                    </div>

                    {exp.progression ? <Progression exp={exp} /> : null}

                    <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_220px]">
                      {exp.points.length ? (
                        <ul className="flex flex-col gap-2.5 text-[color:var(--color-muted)]">
                          {exp.points.map((p, k) => (
                            <li
                              key={k}
                              className="flex gap-3 text-sm leading-relaxed sm:text-base"
                            >
                              <span
                                aria-hidden
                                className="mt-2.5 h-px w-3 shrink-0 bg-[color:var(--color-accent)]"
                              />
                              {p}
                            </li>
                          ))}
                        </ul>
                      ) : null}

                      <div className="flex shrink-0 lg:justify-end">
                        <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] px-5 py-4">
                          <div className="display text-3xl leading-none text-[color:var(--color-fg)] sm:text-4xl">
                            {exp.stat.k}
                          </div>
                          <div className="num-tag mt-2">{exp.stat.v}</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

function Progression({ exp }: { exp: ExperienceType }) {
  if (!exp.progression) return null;
  return (
    <div className="mt-6 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-5">
      <div className="num-tag mb-4 text-[color:var(--color-accent-ink)]">
        role progression
      </div>
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
