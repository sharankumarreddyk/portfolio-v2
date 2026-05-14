"use client";

import { experiences } from "@/lib/data";
import SectionHeader from "./SectionHeader";
import Reveal from "./Reveal";

export default function Experience() {
  return (
    <section
      id="experience"
      className="relative border-t border-[color:var(--color-line)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <SectionHeader
          number="04"
          eyebrow="experience"
          title="A short story, written in commits."
          description="From a commerce-foundation kid to a full-stack engineer shipping production code in TypeScript and Python every day. The arc, briefly."
        />

        <div className="relative mt-20">
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
