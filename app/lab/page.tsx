import type { Metadata } from "next";
import Link from "next/link";
import { profile } from "@/lib/data";
import RepoGraph from "@/components/lab/RepoGraph";
import CommitMarkov from "@/components/lab/CommitMarkov";
import ColorPalette from "@/components/lab/ColorPalette";

export const metadata: Metadata = {
  title: `Lab — ${profile.name}`,
  description: `Tiny in-page experiments by ${profile.shortName}. Things I built to learn one specific web skill.`,
};

export default function LabPage() {
  return (
    <main className="min-h-screen px-6 py-32 sm:px-10 sm:py-40">
      <div className="mx-auto max-w-[1500px]">
        <div className="mb-12 flex items-center gap-4">
          <Link
            href="/"
            className="num-tag flex items-center gap-2 transition-colors hover:text-[color:var(--color-fg)]"
          >
            <span>← back</span>
          </Link>
          <span className="h-px w-12 bg-[color:var(--color-line)]" />
          <span className="num-tag">/lab</span>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <h1
              className="display text-balance leading-[0.95]"
              style={{ fontSize: "clamp(2.4rem, 6vw, 4.8rem)" }}
            >
              Things I built to{" "}
              <span className="text-[color:var(--color-fg)]">
                learn one thing.
              </span>
            </h1>
            <p className="serif mt-6 max-w-xl text-lg leading-relaxed text-[color:var(--color-muted)] sm:text-xl">
              Each tile is a tiny, self-contained web experiment. They&rsquo;re
              not products. They each prove I can do one specific thing — and
              when I forget how, I come back here.
            </p>
          </div>
          <div className="flex flex-col gap-1 sm:items-end">
            <span className="num-tag">03 experiments live</span>
            <span className="num-tag">all client-side · no auth · no backend</span>
          </div>
        </div>

        {/* The grid */}
        <div className="mt-16 grid gap-4 lg:grid-cols-2 lg:gap-5">
          {/* Left column: graph spans both rows */}
          <div className="lg:row-span-2">
            <RepoGraph />
            <p className="serif mt-4 text-base text-[color:var(--color-muted)]">
              SVG · custom force simulation (no D3). Repos as nodes, edges
              between repos sharing a language. Drag a node to perturb — the
              physics finds a new equilibrium in ~60 frames.
            </p>
          </div>

          <CommitMarkov />
          <ColorPalette />
        </div>

        <p className="serif mt-8 max-w-2xl text-base text-[color:var(--color-muted)]">
          Two more notes: a Markov chain trained on my own commit messages
          (generates new ones — fun to see how distinctive a developer&rsquo;s
          commit voice gets), and a canvas-based color extractor (drop any
          image, watch it reduce to its dominant palette via histogram
          quantization).
        </p>

        {/* Footer block */}
        <div className="mt-16 border-t border-[color:var(--color-line)] pt-8">
          <div className="num-tag mb-3">what each one demonstrates</div>
          <ul className="grid gap-4 text-sm text-[color:var(--color-muted)] sm:grid-cols-3">
            <li>
              <span className="text-[color:var(--color-fg)]">01 · graph</span>
              <br />
              SVG · physics · pointer events · React state-driven animation
            </li>
            <li>
              <span className="text-[color:var(--color-fg)]">02 · markov</span>
              <br />
              data structures · client-side generation · stateless React
            </li>
            <li>
              <span className="text-[color:var(--color-fg)]">03 · palette</span>
              <br />
              File API · Canvas · ImageData · drag-and-drop · color quantization
            </li>
          </ul>
        </div>
      </div>
    </main>
  );
}
