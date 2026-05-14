"use client";

import { caseStudies, type CaseStudy } from "@/lib/case-studies";
import Reveal from "./Reveal";
import CaseCover from "./CaseCover";

export default function CaseStudies() {
  return (
    <section
      id="work"
      className="relative border-t border-[color:var(--color-line)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              01
            </span>
            <span className="h-px w-12 bg-[color:var(--color-line)]" />
            <span className="num-tag">case studies</span>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <h2
            className="display mt-6 max-w-3xl text-balance leading-[0.95]"
            style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
          >
            Three real systems I built — problem, approach,{" "}
            <span className="text-[color:var(--color-accent-ink)]">
              what shipped.
            </span>
          </h2>
        </Reveal>

        <div className="mt-16 flex flex-col gap-20 sm:gap-28">
          {caseStudies.map((cs, i) => (
            <Reveal key={cs.slug} delay={i * 80}>
              <CaseStudyBlock cs={cs} index={i} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function CaseStudyBlock({ cs, index }: { cs: CaseStudy; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article className="relative grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className={`flex flex-col gap-6 ${flip ? "lg:order-2" : ""}`}>
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="num-tag text-[color:var(--color-accent-ink)]">
            0{index + 1} / 03
          </span>
          <span className="num-tag">{cs.client.toLowerCase()}</span>
          <span className="num-tag">·</span>
          <span className="num-tag">{cs.year}</span>
          {cs.isPublic ? (
            <span className="rounded-full border border-[color:var(--color-accent)] px-2 py-0.5 text-[10px] uppercase tracking-widest text-[color:var(--color-accent-ink)]">
              public
            </span>
          ) : null}
        </div>

        <h3
          className="display text-balance leading-[0.98]"
          style={{ fontSize: "clamp(1.9rem, 3.6vw, 3rem)" }}
        >
          {cs.title}
        </h3>

        <p className="text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
          {cs.oneLiner}
        </p>
        {cs.aside ? (
          <p className="serif text-[15px] leading-relaxed text-[color:var(--color-fg)] sm:text-base">
            &mdash; {cs.aside}
          </p>
        ) : null}

        <dl className="grid grid-cols-3 gap-4 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-5">
          {cs.stats.map((s) => (
            <div key={s.k}>
              <dt className="num-tag mb-1.5">{s.v}</dt>
              <dd className="display text-xl leading-none text-[color:var(--color-fg)] sm:text-2xl">
                {s.k}
              </dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-5 sm:grid-cols-3">
          <Block label="Problem" body={cs.problem} />
          <Block label="Approach" body={cs.approach} />
          <Block
            label={cs.tradeoff ? "Tradeoff" : "Result"}
            body={cs.tradeoff || cs.result}
          />
        </div>

        {cs.tradeoff ? (
          <div className="border-l-2 border-[color:var(--color-accent)] pl-5">
            <div className="num-tag text-[color:var(--color-accent-ink)]">
              result
            </div>
            <p className="mt-2 text-base leading-relaxed text-[color:var(--color-fg)]">
              {cs.result}
            </p>
          </div>
        ) : null}

        <div className="flex flex-wrap items-center gap-3 pt-2">
          <ul className="flex flex-wrap gap-1.5">
            {cs.stack.map((t) => (
              <li
                key={t}
                className="rounded-full border border-[color:var(--color-line)] px-2.5 py-1 text-[11px] text-[color:var(--color-muted)]"
              >
                {t}
              </li>
            ))}
          </ul>
          {cs.link ? (
            <a
              href={cs.link}
              target="_blank"
              rel="noreferrer"
              className="ml-auto inline-flex items-center gap-2 text-sm text-[color:var(--color-fg)] underline decoration-[color:var(--color-dim)] underline-offset-4 transition-colors hover:decoration-[color:var(--color-accent)]"
            >
              Open repo
              <span aria-hidden>↗</span>
            </a>
          ) : null}
        </div>
      </div>

      <div className={`relative ${flip ? "lg:order-1" : ""}`}>
        <div className="sticky top-28 overflow-hidden rounded-3xl border border-[color:var(--color-line)] bg-[color:var(--color-card)]">
          <CaseCover kind={cs.coverKind} />
        </div>
      </div>
    </article>
  );
}

function Block({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <div className="num-tag mb-2 text-[color:var(--color-accent-ink)]">
        {label}
      </div>
      <p className="text-sm leading-relaxed text-[color:var(--color-muted)]">
        {body}
      </p>
    </div>
  );
}
