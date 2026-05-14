"use client";

import { useEffect, useState } from "react";
import { navLinks, profile } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("top");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
  }, [open]);

  useEffect(() => {
    const ids = navLinks.map((l) => l.href.replace("#", ""));
    const sections = ids
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => !!el);
    if (!sections.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-40% 0px -55% 0px", threshold: [0, 0.25, 0.5, 0.75, 1] }
    );
    sections.forEach((s) => obs.observe(s));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-[150] transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          scrolled
            ? "border-b border-[color:var(--color-line)] bg-[color:var(--color-bg)]/85 backdrop-blur"
            : ""
        }`}
      >
        <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 sm:px-10">
          <a
            href="#top"
            className="group flex items-center gap-2 text-sm font-medium tracking-tight"
          >
            <span className="grid h-7 w-7 place-items-center rounded-full border border-[color:var(--color-accent)] text-[10px] font-semibold text-[color:var(--color-accent-ink)] transition-colors group-hover:bg-[color:var(--color-accent)] group-hover:text-black">
              S
            </span>
            <span>{profile.shortName.toLowerCase()}</span>
          </a>

          <nav className="hidden gap-8 md:flex">
            {navLinks.slice(1).map((link) => {
              const isActive = active === link.href.replace("#", "");
              return (
                <a
                  key={link.href}
                  href={link.href}
                  aria-current={isActive ? "true" : undefined}
                  className={`group relative text-sm tracking-tight transition-colors ${
                    isActive
                      ? "text-[color:var(--color-fg)]"
                      : "text-[color:var(--color-muted)] hover:text-[color:var(--color-fg)]"
                  }`}
                >
                  <span
                    className={`num-tag mr-2 transition-colors ${
                      isActive
                        ? "text-[color:var(--color-accent-ink)]"
                        : "group-hover:text-[color:var(--color-accent-ink)]"
                    }`}
                  >
                    {link.number}
                  </span>
                  {link.label}
                  <span
                    aria-hidden
                    className="absolute -bottom-1 left-0 h-px bg-[color:var(--color-accent)] transition-[width] duration-500 ease-out"
                    style={{ width: isActive ? "100%" : "0%" }}
                  />
                </a>
              );
            })}
          </nav>

          <div className="hidden items-center gap-3 md:flex">
            <a
              href={`mailto:${profile.email}?subject=Hi%20from%20sharan.dev`}
              className="flex items-center gap-2 text-sm tracking-tight"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
              </span>
              open to chats
            </a>
            <ThemeToggle />
          </div>

          <button
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            className="grid h-10 w-10 place-items-center rounded-full border border-[color:var(--color-line)] md:hidden"
          >
            <span className="relative block h-3 w-4">
              <span
                className={`absolute left-0 top-0 block h-px w-full bg-[color:var(--color-fg)] transition-transform duration-300 ${
                  open ? "translate-y-1.5 rotate-45" : ""
                }`}
              />
              <span
                className={`absolute left-0 top-3 block h-px w-full bg-[color:var(--color-fg)] transition-transform duration-300 ${
                  open ? "-translate-y-1.5 -rotate-45" : ""
                }`}
              />
            </span>
          </button>
        </div>
      </header>

      <div
        className={`fixed inset-0 z-[140] flex flex-col bg-[color:var(--color-bg)] px-6 pt-24 transition-[clip-path] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] md:hidden ${
          open ? "" : "pointer-events-none"
        }`}
        style={{
          clipPath: open ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        }}
      >
        <nav className="flex flex-col gap-1">
          {navLinks.slice(1).map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="group flex items-baseline gap-4 border-b border-[color:var(--color-line)] py-5"
              style={{
                transitionDelay: open ? `${i * 60 + 200}ms` : "0ms",
              }}
            >
              <span className="num-tag">{link.number}</span>
              <span className="display text-4xl">{link.label}</span>
            </a>
          ))}
        </nav>
        <div className="mt-auto py-8 text-[color:var(--color-muted)]">
          <div className="num-tag mb-2">say hi</div>
          <a
            href={`mailto:${profile.email}`}
            className="display text-2xl text-[color:var(--color-fg)]"
          >
            {profile.email}
          </a>
        </div>
      </div>
    </>
  );
}
