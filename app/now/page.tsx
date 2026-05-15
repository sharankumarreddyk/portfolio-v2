import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";
import { fetchGitHubData } from "@/lib/github";

export const metadata: Metadata = {
  title: `/now — ${profile.name}`,
  description: `What ${profile.shortName} is focused on right now.`,
};

export const revalidate = 3600;

// Update this when you actually change the page content.
// Used to render the "last updated" stamp.
const LAST_UPDATED_ISO = "2026-05-15";

const CURRENT_BOOK = {
  title: "Designing Data-Intensive Applications",
  author: "Martin Kleppmann",
  chapter: "Chapter 6 · Partitioning",
  progress: 62,
  startedAt: "2026-04-22",
};

const focus = [
  {
    label: "Shipping",
    items: [
      "Jahopp AI — per-company token quotas, image-relevance scoring, OCR fallbacks",
      "SISP Sweden — materialized-view rollout for /scaleups & /industries",
      "kubeai-ops — pulling root-cause v2 into a clean public release",
    ],
  },
  {
    label: "Learning",
    items: [
      "Agentic workflows that survive contact with real users (not demos)",
      "Operational excellence on K8s — autoscaling, observability, rollback drills",
      "More design — typography, motion, the boring premium details",
    ],
  },
  {
    label: "Reading",
    items: [
      "Designing Data-Intensive Applications (Kleppmann) — chapter 6 on partitioning",
      "Whatever Vercel's design team writes",
      "Bengaluru, on long walks (the city is the text)",
    ],
  },
  {
    label: "Avoiding",
    items: [
      "NextAuth v5 in prod — burned twice, waiting for v6",
      "Anything that asks me to maintain a custom design system",
      "Discord-only product communities (do you ship or do you chat?)",
    ],
  },
];

function timeSince(iso: string): string {
  const now = new Date();
  const then = new Date(iso);
  const days = Math.floor(
    (now.getTime() - then.getTime()) / (1000 * 60 * 60 * 24)
  );
  if (days === 0) return "today";
  if (days === 1) return "yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  if (days < 365) return `${Math.floor(days / 30)} months ago`;
  return `${Math.floor(days / 365)} years ago`;
}

export default async function NowPage() {
  const github = await fetchGitHubData();
  const topRepo = github.topRepos[0];
  const latest = github.recentCommits[0];

  return (
    <main className="min-h-screen px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-2xl">
        <div className="mb-12 flex items-center gap-4">
          <Link
            href="/"
            className="num-tag flex items-center gap-2 transition-colors hover:text-[color:var(--color-fg)]"
          >
            <span>← back</span>
          </Link>
          <span className="h-px w-12 bg-[color:var(--color-line)]" />
          <span className="num-tag">/now</span>
        </div>

        <h1 className="display text-balance text-5xl leading-[0.95] sm:text-6xl">
          What I&rsquo;m focused on{" "}
          <span className="text-[color:var(--color-fg)]">right now.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[color:var(--color-muted)]">
          Inspired by Derek Sivers&rsquo; /now page idea. A snapshot, not a
          résumé — updated when things change, not on a schedule.
        </p>

        {/* Live heartbeat — tied to GitHub */}
        <div className="mt-10 rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-5 sm:p-6">
          <div className="flex items-center gap-3">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
            </span>
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              live · synced from github
            </span>
          </div>
          <dl className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <dt className="num-tag">currently shipping mostly</dt>
              <dd className="mt-1.5 font-mono text-base text-[color:var(--color-fg)]">
                {topRepo ? topRepo.name : "—"}
              </dd>
            </div>
            <div>
              <dt className="num-tag">last commit</dt>
              <dd className="mt-1.5 text-sm leading-snug text-[color:var(--color-fg)]">
                {latest ? latest.msg : "—"}
              </dd>
            </div>
          </dl>
        </div>

        {/* Currently reading — micro widget */}
        <div className="mt-12 overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)]">
          <div className="flex items-baseline justify-between gap-3 border-b border-[color:var(--color-line)] px-5 py-3">
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              currently reading
            </span>
            <span className="num-tag">
              started {new Date(CURRENT_BOOK.startedAt).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
            </span>
          </div>
          <div className="p-5 sm:p-6">
            <p
              className="serif text-balance leading-[1.15] text-[color:var(--color-fg)]"
              style={{ fontSize: "clamp(1.4rem, 3vw, 2rem)" }}
            >
              {CURRENT_BOOK.title}
            </p>
            <p className="mt-2 text-sm text-[color:var(--color-muted)]">
              {CURRENT_BOOK.author} · {CURRENT_BOOK.chapter}
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="h-1 flex-1 overflow-hidden rounded-full bg-[color:var(--color-bg)]">
                <div
                  className="h-full rounded-full bg-[color:var(--color-accent)]"
                  style={{ width: `${CURRENT_BOOK.progress}%` }}
                />
              </div>
              <span className="font-mono text-[11px] text-[color:var(--color-muted)]">
                {CURRENT_BOOK.progress}%
              </span>
            </div>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-12">
          {focus.map((block) => (
            <section key={block.label}>
              <div className="num-tag">{block.label}</div>
              <ul className="mt-4 flex flex-col gap-2.5">
                {block.items.map((it, i) => (
                  <li
                    key={i}
                    className="flex items-baseline gap-3 text-base leading-relaxed"
                  >
                    <span
                      aria-hidden
                      className="mt-2.5 h-px w-3 shrink-0 bg-[color:var(--color-accent)]"
                    />
                    {it}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>

        <div className="mt-20 border-t border-[color:var(--color-line)] pt-8">
          <div className="num-tag mb-2">last updated</div>
          <div className="text-[color:var(--color-muted)]">
            {new Date(LAST_UPDATED_ISO).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            <span className="text-[color:var(--color-fg)]">
              · {timeSince(LAST_UPDATED_ISO)}
            </span>{" "}
            · Bengaluru
          </div>
        </div>
      </div>
    </main>
  );
}
