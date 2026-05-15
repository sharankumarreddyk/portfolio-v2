"use client";

import Reveal from "./Reveal";

const PRINCIPLES = [
  {
    n: "i",
    line: "I'll ship Postgres + a boring web framework before I learn the new thing.",
  },
  {
    n: "ii",
    line: "I'd rather merge a v1 today than design v2 for six weeks.",
  },
  {
    n: "iii",
    line: "The first commit teaches you what the right commit was.",
  },
  {
    n: "iv",
    line: "If the data layer is wrong, no frontend polish will save the product.",
  },
  {
    n: "v",
    line: "Comment the why, not the what. The code already shows the what.",
  },
];

export default function Principles() {
  return (
    <section
      aria-label="How I work"
      className="relative overflow-hidden border-t border-[color:var(--color-line)] py-24 sm:py-36"
    >
      {/* Decorative oversized "P." mark in the background */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-12 top-0 select-none font-serif italic leading-none text-[color:var(--color-line)] sm:-left-16"
        style={{
          fontFamily: "var(--font-serif)",
          fontSize: "clamp(16rem, 36vw, 36rem)",
          letterSpacing: "-0.08em",
        }}
      >
        P.
      </div>

      <div className="relative mx-auto max-w-[1500px] px-6 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-tag text-[color:var(--color-accent-ink)]">●</span>
            <span className="num-tag">principles · how I work</span>
          </div>
        </Reveal>

        <Reveal delay={80}>
          <p
            className="serif mt-8 max-w-3xl text-balance leading-[1.1] text-[color:var(--color-fg)]"
            style={{ fontSize: "clamp(1.8rem, 4.2vw, 3.4rem)" }}
          >
            Five rules I&rsquo;ve earned by shipping the wrong thing first.
          </p>
        </Reveal>

        <div className="mt-20 flex flex-col gap-16 sm:gap-24">
          {PRINCIPLES.map((p, i) => {
            const isOdd = i % 2 === 1;
            return (
              <Reveal
                key={p.n}
                delay={i * 90}
                direction="blur"
                duration={1100}
              >
                <article
                  className={`grid gap-6 sm:grid-cols-12 sm:items-baseline ${
                    isOdd ? "sm:pl-[15%]" : "sm:pr-[15%]"
                  }`}
                >
                  <div
                    className={`flex items-baseline gap-4 sm:col-span-2 ${
                      isOdd ? "sm:order-2 sm:justify-end" : ""
                    }`}
                  >
                    <span
                      className="serif leading-none text-[color:var(--color-accent-ink)]"
                      style={{
                        fontSize: "clamp(3.5rem, 7vw, 6rem)",
                        letterSpacing: "-0.04em",
                      }}
                    >
                      {p.n}
                    </span>
                    <span
                      aria-hidden
                      className="h-[2px] flex-1 bg-[color:var(--color-line)] sm:flex-none sm:w-16"
                    />
                  </div>
                  <p
                    className={`serif text-balance leading-[1.15] text-[color:var(--color-fg)] sm:col-span-10 ${
                      isOdd ? "sm:order-1" : ""
                    }`}
                    style={{ fontSize: "clamp(1.4rem, 3.2vw, 2.6rem)" }}
                  >
                    {p.line}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
