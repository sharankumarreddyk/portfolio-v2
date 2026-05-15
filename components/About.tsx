"use client";

import { useEffect, useState } from "react";
import { profile } from "@/lib/data";
import type { GitHubLiveData } from "@/lib/github";
import Reveal from "./Reveal";

function formatLatestDeploy(iso: string | undefined) {
  if (!iso) return "—";
  try {
    return new Date(iso)
      .toLocaleTimeString("en-US", {
        timeZone: "Asia/Kolkata",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      .toLowerCase()
      .replace(/\s/g, "");
  } catch {
    return "—";
  }
}

export default function About({ github }: { github: GitHubLiveData }) {
  const latestCommit = github.recentCommits[0];
  const [deployTime, setDeployTime] = useState<string>(() =>
    formatLatestDeploy(latestCommit?.date)
  );

  useEffect(() => {
    setDeployTime(formatLatestDeploy(latestCommit?.date));
  }, [latestCommit?.date]);

  return (
    <section
      id="about"
      className="relative border-t border-[color:var(--color-line)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-tag">05</span>
            <span className="h-px w-12 bg-[color:var(--color-line)]" />
            <span className="num-tag">about</span>
          </div>
        </Reveal>

        {/* Horizontal split: monogram on left, bio on right, vertical rule between */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[auto_1fr] lg:gap-0">
          <div className="lg:pr-12">
            <Monogram />
          </div>

          <div className="flex flex-col gap-7 lg:border-l lg:border-[color:var(--color-line)] lg:pl-12">
            <Reveal direction="right" duration={1100}>
              <p
                className="serif text-balance leading-[1.15] text-[color:var(--color-fg)]"
                style={{ fontSize: "clamp(1.5rem, 3.2vw, 2.4rem)" }}
              >
                I came to software a little late. Commerce kid first —
                pivoted to code somewhere between Master Minds and MS Ramaiah,
                taught myself the rest in the gaps between classes.
              </p>
            </Reveal>

            <Reveal delay={120}>
              <p className="max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
                Now I work at {profile.company} — a Swedish product company
                with a Bangalore office. Day to day, I&rsquo;m in TypeScript
                (web), Python (AI services), and SQL (everywhere it leaks).
                I like writing the unglamorous code that makes the demo
                possible.
              </p>
            </Reveal>

            <Reveal delay={200}>
              <p className="max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
                On weekends I build small things to learn — most recently{" "}
                <a
                  href="https://github.com/sharankumarreddyk/kubeai-ops"
                  target="_blank"
                  rel="noreferrer"
                  className="text-[color:var(--color-fg)] underline decoration-[color:var(--color-line)] underline-offset-[5px] transition-colors hover:decoration-[color:var(--color-accent)]"
                >
                  kubeai-ops
                </a>
                , an open-source incident-response loop for Kubernetes that
                started as a weekend rabbit hole.
              </p>
            </Reveal>

            <Reveal delay={260}>
              <p className="serif max-w-2xl text-base leading-relaxed text-[color:var(--color-muted)] sm:text-lg">
                Not job-hunting right now — but always curious about hard
                product problems and the people building them.
              </p>
            </Reveal>

            {/* Editorial stats — no card, just rule-divided inline data */}
            <Reveal delay={320}>
              <div className="mt-2 grid grid-cols-1 gap-px overflow-hidden border-y border-[color:var(--color-line)] bg-[color:var(--color-line)] xs:grid-cols-3 sm:grid-cols-3">
                <Stat k="2024" v="shipping at indpro since" />
                <Stat
                  k={deployTime}
                  v="latest commit"
                  hydrationSafe
                />
                <Stat k="BLR" v="utc +5:30" />
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({
  k,
  v,
  hydrationSafe = false,
}: {
  k: string;
  v: string;
  hydrationSafe?: boolean;
}) {
  return (
    <div className="bg-[color:var(--color-bg)] px-5 py-5 sm:px-6 sm:py-6">
      <div
        className="display text-2xl text-[color:var(--color-fg)] sm:text-3xl"
        suppressHydrationWarning={hydrationSafe}
      >
        {k}
      </div>
      <div className="num-tag mt-2">{v}</div>
    </div>
  );
}

function Monogram() {
  return (
    <Reveal>
      <div
        className="group relative mx-auto aspect-square w-[80vw] max-w-[260px] shrink-0 overflow-hidden rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card)] sm:mx-0 sm:w-[280px] sm:max-w-none lg:w-[300px]"
      >
        <div
          aria-hidden
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, rgba(197,255,61,0.18), transparent 55%), radial-gradient(circle at 70% 70%, rgba(197,255,61,0.06), transparent 60%)",
          }}
        />
        <svg viewBox="0 0 200 200" className="absolute inset-0" aria-hidden>
          <defs>
            <pattern
              id="dots"
              x="0"
              y="0"
              width="6"
              height="6"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="1" cy="1" r="0.6" fill="rgba(245,245,245,0.08)" />
            </pattern>
          </defs>
          <rect width="200" height="200" fill="url(#dots)" />
        </svg>

        <svg
          viewBox="0 0 200 200"
          className="absolute inset-0 animate-[spin_28s_linear_infinite]"
          aria-hidden
        >
          <defs>
            <path
              id="ringPath"
              d="M 100 100 m -86 0 a 86 86 0 1 1 172 0 a 86 86 0 1 1 -172 0"
            />
          </defs>
          <text
            fill="rgba(245,245,245,0.45)"
            style={{
              fontFamily: "var(--font-mono)",
              fontSize: "9px",
              letterSpacing: "0.32em",
            }}
          >
            <textPath href="#ringPath">
              SHARAN · KUMAR · REDDY · SOFTWARE ENGINEER · INDPRO ·
            </textPath>
          </text>
        </svg>

        <div className="absolute inset-0 grid place-items-center">
          <div className="display text-[88px] leading-none text-[color:var(--color-fg)] transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110 sm:text-[100px]">
            <span>S</span>
            <span className="text-[color:var(--color-accent)]">K</span>
            <span>R</span>
          </div>
        </div>

        <div
          aria-hidden
          className="absolute inset-0 rounded-full border border-[color:var(--color-accent)] opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        />
      </div>
    </Reveal>
  );
}
