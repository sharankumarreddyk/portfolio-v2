import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";

export const metadata: Metadata = {
  title: `Writing — ${profile.name}`,
  description: `Essays and notes by ${profile.shortName}.`,
};

type Post = {
  slug: string;
  title: string;
  date: string;
  description: string;
  status: "draft" | "soon" | "published";
};

const POSTS: Post[] = [
  {
    slug: "boring-tech-still-wins",
    title: "Boring tech still wins (and why I keep choosing Postgres)",
    date: "soon",
    description:
      "The argument for picking the unsexy stack you already understand over the new shiny one. Notes from three years of shipping at a Swedish product company.",
    status: "soon",
  },
  {
    slug: "image-relevance-floor",
    title: "What raising an AI relevance floor from 0.4 to 0.6 actually did",
    date: "soon",
    description:
      "A tuning story from the Jahopp image-relevance pipeline. The cost of false positives, the cost of false negatives, and why the right answer wasn't either.",
    status: "soon",
  },
  {
    slug: "polyglot-by-taste",
    title: "Polyglot by taste, not by resume",
    date: "soon",
    description:
      "On working in TypeScript, Python, and SQL in the same week — and why the language doesn't matter as much as the shape of the problem.",
    status: "soon",
  },
];

export default function WritingPage() {
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
          <span className="num-tag">/writing</span>
        </div>

        <h1 className="display text-balance text-5xl leading-[0.95] sm:text-6xl">
          Things I&rsquo;m{" "}
          <span className="text-[color:var(--color-fg)]">drafting.</span>
        </h1>
        <p className="serif mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-muted)]">
          I write slowly. These are the essays in my drafts folder — pieces I
          keep coming back to. When they&rsquo;re ready, they&rsquo;ll be
          here.
        </p>

        <ol className="mt-16 flex flex-col">
          {POSTS.map((post, i) => (
            <li
              key={post.slug}
              className="group border-t border-[color:var(--color-line)] py-7 transition-colors hover:bg-[color:var(--color-card)]/30"
            >
              <div className="flex items-baseline gap-4">
                <span className="num-tag w-7 shrink-0">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex-1">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h2 className="text-xl text-[color:var(--color-fg)] sm:text-2xl">
                      {post.title}
                    </h2>
                    <span className="num-tag">
                      {post.status === "soon"
                        ? "drafting"
                        : post.date}
                    </span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[color:var(--color-muted)] sm:text-base">
                    {post.description}
                  </p>
                </div>
              </div>
            </li>
          ))}
          <li className="border-t border-[color:var(--color-line)]" />
        </ol>

        <div className="mt-16 flex items-baseline gap-3 text-[color:var(--color-muted)]">
          <span className="num-tag">elsewhere</span>
          <a
            href="https://github.com/sharankumarreddyk"
            target="_blank"
            rel="noreferrer"
            className="text-sm underline decoration-[color:var(--color-line)] underline-offset-4 hover:text-[color:var(--color-fg)] hover:decoration-[color:var(--color-accent)]"
          >
            GitHub — code as the long form
          </a>
        </div>
      </div>
    </main>
  );
}
