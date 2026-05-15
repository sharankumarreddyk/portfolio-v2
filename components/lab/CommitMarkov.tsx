"use client";

import { useMemo, useState } from "react";
import { recentCommits } from "@/lib/github-data";

// Seed corpus — real recent commit messages from his GitHub data
const SEED = [
  ...recentCommits.map((c) => c.msg),
  "feat: add quiz retake limit messaging with localization support",
  "feat: enhance image fetching logic for lesson topics",
  "feat: implement per-company token quota system in user service",
  "fix: handle misconfigured badge rules with no target value",
  "feat: company status hook to invalidate sessions for deactivated companies",
  "feat: implement server-side search and pagination for roles and documents",
  "feat: enhance CV export and profile retrieval with template resolution",
  "feat: add storage limit functionality for companies and related endpoints",
  "fix: include daily token limit in /users/me company fields",
  "feat: add new hooks for company status and authentication",
  "feat: optimize entity fetching and search reset logic in AssignmentRuleAddEditModal",
  "fix: bump image-fetch timeout to prevent lost images",
  "feat: switch image generation default to gpt-image-2",
  "feat: bypass quota gate on resume requests so in-progress courses complete",
  "feat: per-company AI token quota on user service",
];

function buildChain(corpus: string[]): Map<string, string[]> {
  const chain = new Map<string, string[]>();
  for (const msg of corpus) {
    const words = msg.split(/\s+/).filter(Boolean);
    for (let i = 0; i < words.length - 1; i++) {
      const key = words[i].toLowerCase();
      const next = words[i + 1];
      const arr = chain.get(key) ?? [];
      arr.push(next);
      chain.set(key, arr);
    }
  }
  return chain;
}

function generate(chain: Map<string, string[]>, maxLen = 12): string {
  const starts = ["feat:", "fix:", "chore:", "refactor:", "feat:", "fix:"];
  const seed = starts[Math.floor(Math.random() * starts.length)];
  const out = [seed];
  let current = seed.toLowerCase();
  while (out.length < maxLen) {
    const next = chain.get(current);
    if (!next || !next.length) break;
    const pick = next[Math.floor(Math.random() * next.length)];
    out.push(pick);
    current = pick.toLowerCase();
    if (pick.endsWith(".") && out.length > 4) break;
  }
  return out.join(" ");
}

export default function CommitMarkov() {
  const chain = useMemo(() => buildChain(SEED), []);
  const [output, setOutput] = useState<string[]>(() =>
    Array.from({ length: 3 }, () => generate(chain))
  );

  const roll = () => {
    setOutput(Array.from({ length: 3 }, () => generate(chain)));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)]">
      <header className="flex items-baseline justify-between border-b border-[color:var(--color-line)] px-5 py-3">
        <div>
          <div className="num-tag text-[color:var(--color-accent-ink)]">
            02 · markov
          </div>
          <div className="mt-1 text-sm text-[color:var(--color-fg)]">
            Commit messages, trained on my real ones.
          </div>
        </div>
        <button
          type="button"
          onClick={roll}
          className="inline-flex items-center gap-2 rounded-full border border-[color:var(--color-line)] px-3 py-1 text-[11px] uppercase tracking-widest transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)]"
        >
          <span aria-hidden>↺</span> roll
        </button>
      </header>

      <ul className="flex flex-col gap-3 p-5">
        {output.map((line, i) => (
          <li
            key={`${i}-${line}`}
            className="font-mono text-[12px] leading-snug text-[color:var(--color-fg)]"
            style={{
              opacity: 0,
              animation: `markovIn 500ms cubic-bezier(0.22,1,0.36,1) ${i * 80}ms forwards`,
            }}
          >
            <span className="text-[color:var(--color-muted)]">{`>`}</span>{" "}
            {line}
          </li>
        ))}
      </ul>

      <div className="mt-auto border-t border-[color:var(--color-line)] px-5 py-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
        word-pair chain · {SEED.length} seed commits
      </div>

      <style>{`
        @keyframes markovIn {
          from { opacity: 0; transform: translateY(4px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  );
}
