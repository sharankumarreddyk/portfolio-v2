"use client";

import Link from "next/link";
import { profile } from "@/lib/data";

const SITEMAP = [
  { label: "Index", href: "/#top" },
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/#projects" },
  { label: "Skills", href: "/#skills" },
  { label: "Experience", href: "/#experience" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

const ELSEWHERE = [
  { label: "GitHub", href: profile.github },
  { label: "LinkedIn", href: profile.linkedin },
  { label: "Email", href: `mailto:${profile.email}` },
  { label: "Lab", href: "/lab" },
  { label: "Now", href: "/now" },
  { label: "Writing", href: "/writing" },
];

const BUILT_WITH = [
  "Next.js 15",
  "Tailwind v4",
  "TypeScript",
  "Lenis",
  "Vercel",
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-6 py-12 sm:px-10 sm:py-14">
      <div className="mx-auto max-w-[1500px]">
        {/* Top — signoff + status */}
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:gap-12">
          <div className="flex flex-col gap-5">
            <p className="serif text-2xl leading-snug text-[color:var(--color-fg)] sm:text-3xl">
              Built in Bengaluru, mostly at 2am, with too much coffee.{" "}
              <span className="text-[color:var(--color-muted)]">— Sharan</span>
            </p>
            <div className="flex items-center gap-2 text-[color:var(--color-muted)]">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-50" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
              </span>
              <span className="num-tag">
                still shipping · last commit just now-ish
              </span>
            </div>
          </div>

          {/* Sitemap */}
          <div>
            <div className="num-tag mb-3">sitemap</div>
            <ul className="flex flex-col gap-1.5 text-sm text-[color:var(--color-muted)]">
              {SITEMAP.map((s) => (
                <li key={s.href}>
                  <Link
                    href={s.href}
                    className="transition-colors hover:text-[color:var(--color-fg)]"
                  >
                    {s.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Elsewhere */}
          <div>
            <div className="num-tag mb-3">elsewhere</div>
            <ul className="flex flex-col gap-1.5 text-sm text-[color:var(--color-muted)]">
              {ELSEWHERE.map((e) => (
                <li key={e.href}>
                  <a
                    href={e.href}
                    target={e.href.startsWith("http") ? "_blank" : undefined}
                    rel={e.href.startsWith("http") ? "noreferrer" : undefined}
                    className="transition-colors hover:text-[color:var(--color-fg)]"
                  >
                    {e.label}
                    {e.href.startsWith("http") ? " ↗" : ""}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Built with */}
          <div>
            <div className="num-tag mb-3">built with</div>
            <ul className="flex flex-col gap-1.5 text-sm text-[color:var(--color-muted)]">
              {BUILT_WITH.map((b) => (
                <li key={b}>{b}</li>
              ))}
              <li>
                <a
                  href="https://github.com/sharankumarreddyk/portfolio-v2"
                  target="_blank"
                  rel="noreferrer"
                  className="transition-colors hover:text-[color:var(--color-fg)]"
                >
                  source ↗
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom rule + meta */}
        <div className="mt-12 flex flex-wrap items-baseline justify-between gap-4 border-t border-[color:var(--color-line)] pt-6 text-xs text-[color:var(--color-muted)]">
          <span className="num-tag">© {year} · sharan kumar reddy</span>
          <a
            href="#top"
            className="flex items-center gap-2 transition-colors hover:text-[color:var(--color-fg)]"
          >
            <span className="num-tag">back to top</span>
            <svg
              className="h-3 w-3"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <path d="M8 14 L8 2 M3 7 L8 2 L13 7" />
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
}
