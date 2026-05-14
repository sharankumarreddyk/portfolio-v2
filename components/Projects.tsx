"use client";

import { projects } from "@/lib/data";
import ProjectCover from "./ProjectCover";
import Reveal from "./Reveal";

export default function Projects() {
  return (
    <section
      id="projects"
      className="relative border-t border-[color:var(--color-line)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              02
            </span>
            <span className="h-px w-12 bg-[color:var(--color-line)]" />
            <span className="num-tag">side projects</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <div className="mt-6 flex flex-wrap items-end justify-between gap-6">
            <h2
              className="display text-balance leading-[0.95]"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)" }}
            >
              Built on{" "}
              <span className="text-[color:var(--color-accent-ink)]">
                weekends.
              </span>
            </h2>
            <p className="max-w-md text-sm text-[color:var(--color-muted)] sm:text-base">
              Smaller things — full-stack apps, infra experiments,
              first-principles rebuilds. Public where it makes sense.
            </p>
          </div>
        </Reveal>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p, i) => (
            <Reveal key={p.name} delay={i * 70}>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                data-cursor="hover"
                className="group relative flex h-full flex-col overflow-hidden rounded-xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] transition-colors duration-500 hover:border-[color:var(--color-accent)]"
              >
                <div className="relative aspect-[5/4] overflow-hidden">
                  <div className="absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.06]">
                    <ProjectCover kind={p.cover} className="h-full w-full" />
                  </div>
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(197,255,61,0.18), transparent 55%)",
                    }}
                  />
                  <div className="absolute right-3 top-3">
                    <span className="grid h-8 w-8 place-items-center rounded-full border border-[color:var(--color-line)] bg-black/60 backdrop-blur">
                      <svg
                        className="h-3 w-3 -translate-x-0.5 translate-y-0.5 transition-transform duration-500 ease-out group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.4"
                      >
                        <path d="M3 13 L13 3 M5 3 L13 3 L13 11" />
                      </svg>
                    </span>
                  </div>
                </div>

                <div className="flex flex-1 flex-col gap-2 p-5">
                  <h3 className="display text-xl sm:text-2xl">{p.name}</h3>
                  <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
                    {p.description}
                  </p>
                  <ul className="mt-auto flex flex-wrap gap-1.5 pt-3">
                    {p.tags.map((t) => (
                      <li
                        key={t}
                        className="rounded-full border border-[color:var(--color-line)] px-2.5 py-1 text-[11px] text-[color:var(--color-muted)]"
                      >
                        {t}
                      </li>
                    ))}
                  </ul>
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
