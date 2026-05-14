import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `/now — ${profile.name}`,
  description: `What ${profile.shortName} is focused on right now.`,
};

const focus = [
  {
    label: "Shipping",
    items: [
      "Jahopp AI — per-company token quotas and learning-journey progress",
      "SISP Sweden — materialized-view rollout for /scaleups & /industries",
      "kubeai-ops — pulling root-cause v2 into a clean public release",
    ],
  },
  {
    label: "Learning",
    items: [
      "Building agentic workflows that survive contact with real users",
      "Operational excellence on K8s — autoscaling, observability, rollback drills",
      "More design — typography, motion, the boring premium details",
    ],
  },
  {
    label: "Reading",
    items: [
      "Distributed-systems papers (Kleppmann, Hellerstein)",
      "Whatever Vercel's design team writes",
      "Bengaluru on long walks",
    ],
  },
];

export default function NowPage() {
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
          <span className="num-tag text-[color:var(--color-accent-ink)]">/now</span>
        </div>

        <h1 className="display text-balance text-5xl leading-[0.95] sm:text-6xl">
          What I&rsquo;m focused on{" "}
          <span className="text-[color:var(--color-accent-ink)]">right now.</span>
        </h1>
        <p className="mt-6 max-w-xl text-[color:var(--color-muted)]">
          Inspired by Derek Sivers&rsquo; /now page idea. A snapshot, not a
          résumé — updated when things change, not on a schedule.
        </p>

        <div className="mt-16 flex flex-col gap-12">
          {focus.map((block) => (
            <section key={block.label}>
              <div className="num-tag text-[color:var(--color-accent-ink)]">
                {block.label}
              </div>
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
            {new Date().toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}{" "}
            · Bengaluru
          </div>
        </div>
      </div>
    </main>
  );
}
