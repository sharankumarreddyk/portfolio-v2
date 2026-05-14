"use client";

import Reveal from "./Reveal";

type Props = {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
};

export default function SectionHeader({
  number,
  eyebrow,
  title,
  description,
}: Props) {
  return (
    <div className="grid items-end gap-8 lg:grid-cols-[1fr_2fr]">
      <Reveal>
        <div className="flex items-center gap-4">
          <span className="num-tag text-[color:var(--color-accent-ink)]">
            {number}
          </span>
          <span className="h-px w-12 bg-[color:var(--color-line)]" />
          <span className="num-tag">{eyebrow}</span>
        </div>
      </Reveal>
      <div>
        <Reveal delay={80}>
          <h2 className="display text-balance text-5xl sm:text-6xl lg:text-7xl">
            {title}
          </h2>
        </Reveal>
        {description ? (
          <Reveal delay={180}>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
              {description}
            </p>
          </Reveal>
        ) : null}
      </div>
    </div>
  );
}
