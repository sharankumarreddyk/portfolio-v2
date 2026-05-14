"use client";

import { profile } from "@/lib/data";

export default function Footer() {
  return (
    <footer className="relative border-t border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-6 py-12 sm:px-10">
      <div className="mx-auto flex max-w-[1600px] flex-col items-start gap-10 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2">
          <span className="num-tag">© {new Date().getFullYear()}</span>
          <p className="serif text-lg leading-snug text-[color:var(--color-fg)] sm:text-xl">
            Built in Bengaluru, mostly at 2am, with too much coffee.{" "}
            <span className="text-[color:var(--color-muted)]">— Sharan</span>
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-6 text-sm text-[color:var(--color-muted)]">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--color-fg)]"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            className="hover:text-[color:var(--color-fg)]"
          >
            LinkedIn
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="hover:text-[color:var(--color-fg)]"
          >
            Email
          </a>
          <a
            href="#top"
            className="flex items-center gap-2 hover:text-[color:var(--color-fg)]"
          >
            Back to top
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
