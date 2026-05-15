"use client";

import { useEffect, useState } from "react";
import { navLinks } from "@/lib/data";

export default function SectionDrift() {
  const [active, setActive] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.5);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const inView = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (inView[0]) setActive(inView[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  const link = navLinks.find((l) => l.href === `#${active}`);
  if (!link || link.label === "Index") return null;

  return (
    <div
      aria-hidden
      className={`pointer-events-none fixed bottom-6 left-6 z-[145] hidden items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card)]/90 px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-muted)] shadow-xl backdrop-blur transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] md:inline-flex ${
        visible
          ? "translate-y-0 opacity-100"
          : "translate-y-3 opacity-0"
      }`}
    >
      <span
        className="h-1.5 w-1.5 rounded-full bg-[color:var(--color-accent)]"
      />
      <span className="text-[color:var(--color-accent-ink)]">
        {link.number}
      </span>
      <span>·</span>
      <span className="text-[color:var(--color-fg)]">{link.label}</span>
    </div>
  );
}
