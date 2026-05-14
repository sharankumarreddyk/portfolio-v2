import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "404 — page not found",
  description: "Whatever you were looking for, it isn't here.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-screen flex-col items-center justify-center overflow-hidden px-6 py-32 text-center sm:px-10">
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="num-tag mb-6 text-[color:var(--color-accent-ink)]">
        404 · page not found
      </div>

      <h1
        className="display text-balance leading-[0.92]"
        style={{ fontSize: "clamp(3rem, 12vw, 9rem)" }}
      >
        Lost a commit
        <span
          aria-hidden
          className="ml-[0.1em] inline-block h-[0.16em] w-[0.16em] translate-y-[-0.04em] rounded-full align-baseline"
          style={{ background: "var(--color-accent)" }}
        />
      </h1>

      <p className="serif mt-8 max-w-md text-lg text-[color:var(--color-muted)] sm:text-xl">
        Whatever you were looking for isn&rsquo;t at this URL. Probably my
        fault — a renamed slug, a deleted draft, something half-shipped.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-line)] px-5 py-3 text-sm tracking-tight transition-colors hover:border-[color:var(--color-accent)]"
        >
          <svg
            className="h-3 w-3 transition-transform group-hover:-translate-x-1"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M13 8 L3 8 M7 4 L3 8 L7 12" />
          </svg>
          Back to home
        </Link>
        <Link
          href="/now"
          className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm tracking-tight text-black"
        >
          What I&rsquo;m up to →
        </Link>
      </div>

      <div className="num-tag mt-16 text-[color:var(--color-muted)]">
        if you think this 404 is a bug, ping{" "}
        <a
          href="mailto:reddysharankumar@gmail.com?subject=404%20on%20sharan.dev"
          className="underline decoration-[color:var(--color-dim)] underline-offset-4 hover:text-[color:var(--color-accent-ink)] hover:decoration-[color:var(--color-accent)]"
        >
          reddysharankumar@gmail.com
        </a>
      </div>
    </main>
  );
}
