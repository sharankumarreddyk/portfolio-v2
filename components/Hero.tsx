"use client";

import { useEffect, useRef, useState } from "react";
import { profile } from "@/lib/data";
import type { GitHubLiveData } from "@/lib/github";
import CommitHeatmap from "./CommitHeatmap";
import Magnetic from "./Magnetic";
import Reveal from "./Reveal";
import Squiggle from "./Squiggle";
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
      className="relative isolate overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20"
    >
      <div
        aria-hidden
        className="grid-bg pointer-events-none absolute inset-0 -z-10 opacity-50"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-40 -top-32 -z-10 h-[520px] w-[520px] rounded-full opacity-[0.10] blur-[120px]"
        style={{ background: "var(--color-accent)" }}
      />

      <div className="mx-auto w-full max-w-[1500px] px-6 sm:px-10">
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
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              not job-hunting · open to interesting chats
            </span>
            <span className="num-tag">·</span>
            <span className="num-tag" suppressHydrationWarning>
              last commit {lastAgo}
            </span>
          </div>
          <span className="num-tag">
            <span ref={timeRef}>—</span> · bengaluru
          </span>
        </header>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p
              className="serif mb-3 text-xl text-[color:var(--color-muted)] sm:text-2xl"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(10px)",
                transition:
                  "opacity 0.8s ease 0.05s, transform 0.8s cubic-bezier(0.22,1,0.36,1) 0.05s",
              }}
            >
              Hi — I&rsquo;m
            </p>
            <h1
              className="display relative text-balance leading-[0.92]"
              style={{
                fontSize: "clamp(3rem, 8.4vw, 6.6rem)",
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(20px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.15s",
              }}
            >
              <span className="relative inline-block">
                Sharan Kumar Reddy
                <Squiggle
                  className="absolute -bottom-2 left-0 h-[0.18em] w-full sm:-bottom-3"
                  delay={900}
                />
              </span>
            </h1>
            <p
              className="num-tag mt-6 flex items-center gap-3"
              style={{
                opacity: mounted ? 1 : 0,
                transition: "opacity 0.8s ease 0.45s",
              }}
            >
              software engineer
              <span className="h-px w-6 bg-[color:var(--color-line)]" />
              indpro
              <span className="h-px w-6 bg-[color:var(--color-line)]" />
              bengaluru
            </p>
            <p
              className="mt-8 max-w-xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg"
              style={{
                opacity: mounted ? 1 : 0,
                transform: mounted ? "translateY(0)" : "translateY(16px)",
                transition:
                  "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.55s",
              }}
            >
              I write TypeScript and Python for a Swedish company called{" "}
              <span className="text-[color:var(--color-fg)]">Indpro</span> —
              mostly building AI tooling, web apps, and the boring infra in
              between.{" "}
              <span className="serif text-[color:var(--color-fg)]">
                The graph below isn&rsquo;t a brag — it&rsquo;s what doing the
                job looks like.
              </span>
            </p>
          </div>

          <div
            className="flex shrink-0 flex-wrap items-center gap-3 self-end"
            style={{
              opacity: mounted ? 1 : 0,
              transform: mounted ? "translateY(0)" : "translateY(12px)",
              transition:
                "opacity 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s, transform 0.9s cubic-bezier(0.22,1,0.36,1) 0.65s",
            }}
          >
            <a
              href="#work"
              data-magnetic="true"
              className="group inline-flex items-center gap-3 rounded-full border border-[color:var(--color-line)] px-5 py-3 text-sm tracking-tight transition-colors hover:border-[color:var(--color-accent)]"
            >
              View case studies
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
                className="inline-flex items-center gap-2 rounded-full bg-[color:var(--color-accent)] px-5 py-3 text-sm tracking-tight text-black"
              >
                Say hi
                <span aria-hidden>↗</span>
              </a>
            </Magnetic>
          </div>
        </div>

        <div className="mt-14 grid gap-6 lg:grid-cols-[2fr_1fr] lg:gap-8">
          <div className="lg:sticky lg:top-28">
            <Reveal y={60} repeat>
              <section
                aria-label="GitHub activity"
                className="flex flex-col rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-6 sm:p-7"
              >
                <CommitHeatmap
                  weeks={github.weeks}
                  totalContributions={github.totalContributions}
                />
                <dl className="mt-6 grid grid-cols-3 gap-6 border-t border-[color:var(--color-line)] pt-5">
                  <StatBlock v="contributions · 12 mo">
                    <CountUp value={stats.contributions12mo} />
                  </StatBlock>
                  <StatBlock v="active repos">
                    <CountUp value={stats.activeRepos} suffix="+" />
                  </StatBlock>
                  <StatBlock v="PRs merged · 30 d">
                    <CountUp value={stats.prsLast30d} suffix="+" />
                  </StatBlock>
                </dl>
              </section>
            </Reveal>
          </div>

          <Reveal delay={140} y={60} repeat>
            <aside
              aria-label="Active rotation"
              className="flex h-full flex-col gap-6 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-6 sm:p-7"
            >
              <div>
                <div className="num-tag text-[color:var(--color-accent-ink)]">
                  active rotation
                </div>
                <ul className="mt-4 flex flex-col gap-3">
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
                        <div className="mt-1.5 h-1 w-full overflow-hidden rounded-full bg-[color:var(--color-bg)]">
                          <div
                            className="h-full rounded-full bg-[color:var(--color-accent)] transition-[width] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)]"
                            style={{
                              width: mounted ? `${w.toFixed(1)}%` : "0%",
                              transitionDelay: `${0.5 + i * 0.08}s`,
                            }}
                          />
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div>
                <div className="num-tag text-[color:var(--color-accent-ink)]">
                  latest commits
                </div>
                <ol className="mt-4 flex flex-col gap-3">
                  {recentCommits.slice(0, 4).map((c, i) => {
                    const lang = langFor(c.repo);
                    return (
                      <li
                        key={i}
                        className="flex flex-col gap-1 border-l border-[color:var(--color-line)] pl-3 text-xs"
                      >
                        <span className="flex items-center gap-2 font-mono text-[10px] text-[color:var(--color-muted)]">
                          {lang ? (
                            <span
                              className="rounded-sm border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 py-px text-[9px] uppercase tracking-wider text-[color:var(--color-accent-ink)]"
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
            </aside>
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
