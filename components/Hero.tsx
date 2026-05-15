"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import type { GitHubLiveData } from "@/lib/github";
import CommitHeatmap from "./CommitHeatmap";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import CountUp from "./CountUp";

const REPO_LANG: Record<string, string> = {
  "jahopp-ai": "Py",
  "jahopp-backend": "TS",
  "jahopp-admin": "TS",
  "jahopp-web": "Svelte",
  "ssn-web": "TS",
  "ssn-database": "SQL",
  "ignite-magic-2.0": "TS",
  "Jahopp-AI-Qdrant-DB": "Py",
  "byggmax-rma": "TS",
  "kubeai-ops": "Py",
};

function langFor(repoFullName: string): string | null {
  const name = repoFullName.split("/")[1];
  return REPO_LANG[name] ?? null;
}

function formatTimeAgo(iso: string) {
  const then = new Date(iso).getTime();
  const now = Date.now();
  const min = Math.round((now - then) / 60000);
  if (min < 1) return "just now";
  if (min < 60) return `${min}m ago`;
  const h = Math.round(min / 60);
  if (h < 24) return `${h}h ago`;
  const d = Math.round(h / 24);
  return `${d}d ago`;
}

export default function Hero({ github }: { github: GitHubLiveData }) {
  const { topRepos, recentCommits, stats } = github;
  const lastShipped = recentCommits[0];
  const maxRepo = Math.max(...topRepos.map((r) => r.commits), 1);

  const [mounted, setMounted] = useState(false);
  const [lastAgo, setLastAgo] = useState<string>("—");
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 200);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const update = () =>
      setLastAgo(lastShipped ? formatTimeAgo(lastShipped.date) : "—");
    update();
    const i = setInterval(update, 60_000);
    return () => clearInterval(i);
  }, [lastShipped]);

  useEffect(() => {
    const update = () => {
      if (!timeRef.current) return;
      const d = new Date();
      const time = d.toLocaleTimeString("en-GB", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
      });
      timeRef.current.textContent = `${time} IST`;
    };
    update();
    const i = setInterval(update, 30_000);
    return () => clearInterval(i);
  }, []);

  return (
    <section
      id="hero"
      className="relative isolate overflow-hidden pt-24 pb-16 sm:pt-28 sm:pb-20"
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-40"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[520px] w-[520px] rounded-full opacity-[0.08] blur-[140px]"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
        {/* Status row */}
        <header
          className="flex flex-wrap items-baseline justify-between gap-y-3 text-[color:var(--color-muted)]"
          style={{
            opacity: mounted ? 1 : 0,
            transition: "opacity 0.7s ease",
          }}
        >
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
            </span>
            <span className="num-tag">
              <span className="sm:hidden">open to chats</span>
              <span className="hidden sm:inline">
                not job-hunting · open to interesting chats
              </span>
            </span>
            <span className="num-tag hidden sm:inline">·</span>
            <span className="num-tag" suppressHydrationWarning>
              last commit {lastAgo}
            </span>
          </div>
          <span className="num-tag">
            <span ref={timeRef}>—</span> · bengaluru
          </span>
        </header>

        {/* Compressed name + tagline + CTAs */}
        <div className="mt-12 grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-2xl">
            <h1
              className="display text-balance leading-[0.95]"
              style={{
                fontSize: "clamp(2rem, 7vw, 5.2rem)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.1s",
              }}
            >
              Sharan Kumar Reddy
            </h1>
            <p
              className="mt-4 max-w-xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(12px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.3s",
              }}
            >
              <span className="text-[color:var(--color-fg)]">
                Software engineer at Indpro.
              </span>{" "}
              TypeScript on the front, Python where AI lives, a portfolio of
              Swedish products in production.
            </p>
          </div>

          <div
            className="flex flex-wrap items-center gap-3"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.5s",
            }}
          >
            <a
              href="#work"
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-line)] px-5 py-3 text-sm tracking-tight transition-colors hover:border-[color:var(--color-fg)]"
            >
              Case studies
              <svg
                className="h-3 w-3 transition-transform group-hover:translate-x-1"
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M3 8 L13 8 M9 4 L13 8 L9 12" />
              </svg>
            </a>
            <Magnetic strength={0.3} range={120}>
              <a
                href={`mailto:${profile.email}?subject=Hi%20from%20sharan.dev`}
                data-magnetic="true"
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm tracking-tight text-black"
              >
                Say hi
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </div>
        </div>
      </div>

      {/* SIGNATURE — the heatmap as a hero moment */}
      <div
        className="relative mt-16 sm:mt-20"
        style={{
          opacity: mounted ? 1 : 0,
          transform: mounted ? "translateY(0)" : "translateY(28px)",
          transition:
            "opacity 1.1s cubic-bezier(0.22,1,0.36,1) 0.7s, transform 1.1s cubic-bezier(0.22,1,0.36,1) 0.7s",
        }}
      >
        <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
          <div className="mb-6 flex flex-wrap items-end justify-between gap-y-3 border-t border-[color:var(--color-line)] pt-6">
            <div className="flex items-baseline gap-4">
              <span className="num-tag">●</span>
              <span className="num-tag">a year of shipping, in green</span>
            </div>
            <div className="flex items-baseline gap-2">
              <span className="display text-3xl text-[color:var(--color-fg)] sm:text-4xl">
                <CountUp value={stats.contributions12mo} />
              </span>
              <span className="num-tag">contributions · 12 months</span>
            </div>
          </div>

          <CommitHeatmap
            weeks={github.weeks}
            totalContributions={github.totalContributions}
            variant="signature"
          />

          <div className="mt-6 grid grid-cols-3 gap-6 border-t border-[color:var(--color-line)] pt-5">
            <StatBlock v="active repos · last 30 d">
              <CountUp value={stats.activeRepos} suffix="+" />
            </StatBlock>
            <StatBlock v="PRs merged · last 30 d">
              <CountUp value={stats.prsLast30d} suffix="+" />
            </StatBlock>
            <StatBlock v="commit cadence">daily</StatBlock>
          </div>
        </div>
      </div>

      {/* Supporting data — Active rotation + Latest commits */}
      <div className="mx-auto mt-14 w-full max-w-[1500px] px-6 sm:px-10">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-10">
          <Reveal y={40}>
            <div>
              <div className="mb-5 flex items-baseline gap-4 border-b border-[color:var(--color-line)] pb-3">
                <span className="num-tag">active rotation</span>
                <span className="num-tag text-[color:var(--color-muted)]">
                  by recent commit volume
                </span>
              </div>
              <ul className="flex flex-col gap-3.5">
                {topRepos.map((r, i) => {
                  const w = (r.commits / maxRepo) * 100;
                  return (
                    <li key={`${r.owner}/${r.name}`}>
                      <div className="flex items-baseline justify-between gap-3 text-xs">
                        <span className="font-mono text-[color:var(--color-fg)]">
                          {r.name}
                        </span>
                        <span className="font-mono text-[color:var(--color-muted)]">
                          {r.commits}
                        </span>
                      </div>
                      <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[color:var(--color-line)]">
                        <div
                          className="h-full rounded-full bg-[color:var(--color-fg)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                          style={{
                            width: mounted ? `${w.toFixed(1)}%` : "0%",
                            transitionDelay: `${0.9 + i * 0.08}s`,
                          }}
                        />
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </Reveal>

          <Reveal delay={120} y={40}>
            <div>
              <div className="mb-5 flex items-baseline gap-4 border-b border-[color:var(--color-line)] pb-3">
                <span className="num-tag">latest commits</span>
                <span className="num-tag text-[color:var(--color-muted)]">
                  what i was on this week
                </span>
              </div>
              <ol className="flex flex-col gap-4">
                {recentCommits.slice(0, 5).map((c, i) => {
                  const lang = langFor(c.repo);
                  return (
                    <li
                      key={i}
                      className="flex flex-col gap-1 text-sm"
                    >
                      <span className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
                        {lang ? (
                          <span
                            className="rounded-sm border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 py-px text-[9px] tracking-wider text-[color:var(--color-fg)]"
                            aria-label={`language: ${lang}`}
                          >
                            {lang}
                          </span>
                        ) : null}
                        {c.repo.split("/")[1]} · {formatTimeAgo(c.date)}
                      </span>
                      <span className="text-[color:var(--color-fg)]">
                        {c.msg}
                      </span>
                    </li>
                  );
                })}
              </ol>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function StatBlock({
  children,
  v,
}: {
  children: React.ReactNode;
  v: string;
}) {
  return (
    <div>
      <div className="display text-2xl leading-none text-[color:var(--color-fg)] sm:text-3xl">
        {children}
      </div>
      <div className="num-tag mt-2">{v}</div>
    </div>
  );
}
