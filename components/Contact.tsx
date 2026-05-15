"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import Reveal from "./Reveal";

export default function Contact() {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return;
    const t = setTimeout(() => setCopied(false), 2200);
    return () => clearTimeout(t);
  }, [copied]);

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
    }
  };

  return (
    <section
      id="contact"
      className="section-tint-cool relative overflow-hidden border-t border-[color:var(--color-line)] py-24 sm:py-32"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 left-1/2 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full blur-[140px]"
        style={{ background: "rgba(197,255,61,0.12)" }}
      />

      <div className="mx-auto max-w-[1600px] px-6 sm:px-10">
        <div className="mb-12 flex items-center gap-4">
          <span className="num-tag">06</span>
          <span className="h-px w-12 bg-[color:var(--color-line)]" />
          <span className="num-tag">contact</span>
        </div>

        <Reveal>
          <p className="num-tag mb-6">want to chat?</p>
        </Reveal>

        <a
          href={`mailto:${profile.email}`}
          data-magnetic="true"
          className="group block"
        >
          <Reveal delay={120}>
            <h2 className="display inline-flex flex-wrap items-center gap-3 text-balance text-[12vw] leading-[0.9] sm:gap-6 sm:text-[9.5vw] lg:text-[7.6vw]">
              <span>Let&rsquo;s talk</span>
              <span
                aria-hidden
                className="inline-flex h-[0.85em] w-[0.85em] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[color:var(--color-accent)] text-black transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:h-[0.9em] sm:w-[0.9em]"
              >
                <svg
                  className="h-[0.34em] w-[0.34em] transition-transform duration-500 ease-out group-hover:translate-x-[0.06em] group-hover:-translate-y-[0.06em]"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M5 19 L19 5 M9 5 L19 5 L19 15" />
                </svg>
              </span>
            </h2>
          </Reveal>
        </a>

        <Reveal delay={220}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${profile.email}`}
              className="break-all text-base text-[color:var(--color-muted)] underline decoration-[color:var(--color-dim)] underline-offset-[8px] transition-colors hover:text-[color:var(--color-accent-ink)] hover:decoration-[color:var(--color-accent)] sm:text-2xl sm:underline-offset-[10px] lg:text-3xl"
            >
              {profile.email}
            </a>
            <button
              type="button"
              onClick={onCopy}
              aria-label="Copy email address"
              aria-describedby="email-copy-status"
              data-magnetic="true"
              className="ml-1 inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-4 py-2 text-xs tracking-wide text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)]"
            >
              {copied ? (
                <>
                  <svg
                    className="h-3 w-3 text-[color:var(--color-accent-ink)]"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M3 8 L7 12 L13 4" />
                  </svg>
                  COPIED
                </>
              ) : (
                <>
                  <svg
                    className="h-3 w-3"
                    viewBox="0 0 16 16"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.4"
                  >
                    <rect x="5" y="5" width="9" height="9" rx="1" />
                    <path d="M2 11 L2 2 L11 2" />
                  </svg>
                  COPY
                </>
              )}
            </button>
            <a
              href="/cv.pdf"
              download="sharan-kumar-reddy-cv.pdf"
              data-magnetic="true"
              className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-4 py-2 text-xs tracking-wide text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)]"
            >
              <svg
                className="h-3 w-3"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.4"
              >
                <path d="M8 2 L8 11 M4 8 L8 12 L12 8 M2 14 L14 14" />
              </svg>
              DOWNLOAD CV
            </a>
            <span
              id="email-copy-status"
              role="status"
              aria-live="polite"
              className="sr-only"
            >
              {copied ? `Email copied: ${profile.email}` : ""}
            </span>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-10 border-t border-[color:var(--color-line)] pt-10 sm:grid-cols-3">
          <Reveal>
            <ContactBlock label="elsewhere">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[color:var(--color-accent-ink)]"
              >
                GitHub ↗
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="block hover:text-[color:var(--color-accent-ink)]"
              >
                LinkedIn ↗
              </a>
            </ContactBlock>
          </Reveal>

          <Reveal delay={80}>
            <ContactBlock label="based in">
              <p>{profile.location}</p>
              <p className="text-[color:var(--color-muted)]">UTC +5:30</p>
            </ContactBlock>
          </Reveal>

          <Reveal delay={160}>
            <ContactBlock label="open to">
              <p>Product engineering roles</p>
              <p>Senior / full-stack / AI</p>
              <p className="text-[color:var(--color-muted)]">Remote · Hybrid</p>
            </ContactBlock>
          </Reveal>
        </div>
      </div>

      <div
        aria-live="polite"
        className={`pointer-events-none fixed bottom-8 left-1/2 z-[180] -translate-x-1/2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          copied
            ? "translate-y-0 opacity-100"
            : "pointer-events-none translate-y-4 opacity-0"
        }`}
      >
        <div className="flex items-center gap-3 rounded-full border border-[color:var(--color-accent)] bg-[color:var(--color-bg)]/95 px-5 py-2.5 text-sm shadow-2xl backdrop-blur">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ background: "var(--color-accent)" }}
          />
          Email copied — {profile.email}
        </div>
      </div>
    </section>
  );
}

function ContactBlock({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <div className="num-tag mb-3">{label}</div>
      <div className="flex flex-col gap-1.5 text-lg">{children}</div>
    </div>
  );
}
