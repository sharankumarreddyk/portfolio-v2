"use client";

import { skillGroups, type SkillGroup } from "@/lib/data";
import Reveal from "./Reveal";

type Glyph = "frontend" | "backend" | "ai" | "data" | "devops";

const META: Record<
  string,
  { glyph: Glyph; primary: string; tagline: string }
> = {
  Frontend: {
    glyph: "frontend",
    primary: "TypeScript · Next.js",
    tagline: "where my hands live",
  },
  Backend: {
    glyph: "backend",
    primary: "Node · FastAPI",
    tagline: "the part that can't lie",
  },
  "AI & Data": {
    glyph: "ai",
    primary: "OpenAI · Qdrant · RAG",
    tagline: "the magic and the bugs",
  },
  "Data & Storage": {
    glyph: "data",
    primary: "Postgres · Supabase",
    tagline: "Postgres if I can, always",
  },
  "DevOps & Cloud": {
    glyph: "devops",
    primary: "Docker · K8s · AWS",
    tagline: "code to prod, no drama",
  },
};

export default function Skills() {
  const [frontend, backend, ai, storage, devops] = skillGroups;

  return (
    <section
      id="skills"
      className="relative border-t border-[color:var(--color-line)] py-20 sm:py-28"
    >
      <div className="mx-auto max-w-[1500px] px-6 sm:px-10">
        <Reveal>
          <div className="flex items-center gap-4">
            <span className="num-tag text-[color:var(--color-accent-ink)]">
              03
            </span>
            <span className="h-px w-12 bg-[color:var(--color-line)]" />
            <span className="num-tag">skills</span>
          </div>
        </Reveal>

        <div className="mt-6 grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <Reveal delay={60}>
            <h2
              className="display text-balance leading-[0.95]"
              style={{ fontSize: "clamp(1.9rem, 4.4vw, 3.4rem)" }}
            >
              The toolkit{" "}
              <span className="text-[color:var(--color-accent-ink)]">
                I reach for.
              </span>
            </h2>
          </Reveal>
          <Reveal delay={140}>
            <p className="max-w-md text-sm text-[color:var(--color-muted)] sm:text-base">
              The actual tools in current rotation. Not a checklist of
              everything I&rsquo;ve touched — just what my hands are on this
              week. Sized by where I spend most of my time.
            </p>
          </Reveal>
        </div>

        <Reveal delay={180}>
          <DailyDrivers />
        </Reveal>

        <div className="mt-8 grid gap-3 lg:grid-cols-3 lg:gap-4">
          <Reveal delay={60} className="lg:col-span-2">
            <Card group={frontend} hero />
          </Reveal>
          <Reveal delay={140}>
            <Card group={backend} />
          </Reveal>
          <Reveal delay={220}>
            <Card group={ai} />
          </Reveal>
          <Reveal delay={300}>
            <Card group={storage} />
          </Reveal>
          <Reveal delay={380}>
            <Card group={devops} />
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function DailyDrivers() {
  const stack = [
    { label: "Web", value: "TypeScript · Next.js" },
    { label: "AI", value: "Python · OpenAI · Qdrant" },
    { label: "Data", value: "PostgreSQL · Supabase" },
    { label: "Ship", value: "Docker · AWS · Vercel" },
  ];
  return (
    <div className="mt-10 flex flex-wrap items-stretch gap-px overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-line)]">
      <div className="flex items-center gap-3 bg-[color:var(--color-card)] px-5 py-4">
        <span className="relative flex h-2 w-2">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[color:var(--color-accent)] opacity-60" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-[color:var(--color-accent)]" />
        </span>
        <span className="num-tag text-[color:var(--color-accent-ink)]">
          daily drivers
        </span>
      </div>
      {stack.map((s) => (
        <div
          key={s.label}
          className="flex flex-1 min-w-[180px] flex-col gap-1 bg-[color:var(--color-card)] px-5 py-4"
        >
          <span className="num-tag">{s.label}</span>
          <span className="text-sm tracking-tight text-[color:var(--color-fg)] sm:text-[15px]">
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}

function Card({ group, hero = false }: { group: SkillGroup; hero?: boolean }) {
  const meta = META[group.label];
  const primaryTokens = meta.primary
    .toLowerCase()
    .split(/\s*·\s*/)
    .map((t) => t.trim());

  return (
    <article
      data-cursor="hover"
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] transition-colors duration-500 hover:border-[color:var(--color-accent)]"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(circle at 80% 0%, rgba(197,255,61,0.08), transparent 55%)",
        }}
      />

      <div className="flex items-start justify-between gap-4 p-5 sm:p-6">
        <div className="flex items-start gap-4">
          <Glyph kind={meta.glyph} large={hero} />
          <div>
            <div className="flex items-baseline gap-3">
              <span className="num-tag text-[color:var(--color-accent-ink)]">
                {group.number}
              </span>
              <h3
                className="display leading-[1.05]"
                style={{
                  fontSize: hero
                    ? "clamp(1.7rem, 2.8vw, 2.3rem)"
                    : "clamp(1.3rem, 1.9vw, 1.65rem)",
                }}
              >
                {group.label}
              </h3>
            </div>
            <p className="mt-1 text-[12px] text-[color:var(--color-muted)]">
              {meta.tagline}
            </p>
          </div>
        </div>
        <div className="text-right">
          <div className="display text-2xl leading-none text-[color:var(--color-fg)] sm:text-3xl">
            {String(group.items.length).padStart(2, "0")}
          </div>
          <div className="num-tag mt-1">tools</div>
        </div>
      </div>

      <ul className="flex flex-wrap gap-1.5 px-5 pb-5 sm:px-6 sm:pb-6">
        {group.items.map((item) => {
          const primary = primaryTokens.some((tok) =>
            item.toLowerCase().includes(tok)
          );
          return (
            <li
              key={item}
              className={`rounded-full border px-3 py-1.5 text-[12px] transition-colors ${
                primary
                  ? "border-[color:var(--color-accent)] bg-[color:var(--color-accent)]/10 text-[color:var(--color-fg)]"
                  : "border-[color:var(--color-line)] bg-[color:var(--color-bg)] text-[color:var(--color-fg)] hover:border-[color:var(--color-accent)]"
              }`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </article>
  );
}

function Glyph({ kind, large }: { kind: Glyph; large: boolean }) {
  const size = large ? 40 : 32;
  const stroke = "var(--color-accent-ink)";
  return (
    <span
      aria-hidden
      className="relative grid shrink-0 place-items-center rounded-lg border border-[color:var(--color-line)] bg-[color:var(--color-bg)]"
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 24 24"
        width={size * 0.55}
        height={size * 0.55}
        fill="none"
        stroke={stroke}
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        {kind === "frontend" ? (
          <>
            <rect x="3" y="4" width="18" height="14" rx="1.5" />
            <path d="M3 8 L21 8" />
            <circle cx="6" cy="6" r="0.6" fill={stroke} />
            <circle cx="8" cy="6" r="0.6" fill={stroke} />
          </>
        ) : null}
        {kind === "backend" ? (
          <>
            <ellipse cx="12" cy="6" rx="7" ry="2.5" />
            <path d="M5 6 L5 18 C 5 19.4 8 20.5 12 20.5 C 16 20.5 19 19.4 19 18 L 19 6" />
            <path d="M5 12 C 5 13.4 8 14.5 12 14.5 C 16 14.5 19 13.4 19 12" />
          </>
        ) : null}
        {kind === "ai" ? (
          <>
            <path d="M12 3 L12 7" />
            <path d="M12 17 L12 21" />
            <path d="M3 12 L7 12" />
            <path d="M17 12 L21 12" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="12" cy="12" r="1.4" fill={stroke} />
          </>
        ) : null}
        {kind === "data" ? (
          <>
            <rect x="4" y="4" width="16" height="6" rx="1" />
            <rect x="4" y="14" width="16" height="6" rx="1" />
            <circle cx="7" cy="7" r="0.6" fill={stroke} />
            <circle cx="7" cy="17" r="0.6" fill={stroke} />
            <path d="M11 7 L17 7" />
            <path d="M11 17 L17 17" />
          </>
        ) : null}
        {kind === "devops" ? (
          <>
            <path d="M12 3 L20 7 L20 17 L12 21 L4 17 L4 7 Z" />
            <path d="M12 3 L12 21" />
            <path d="M4 7 L20 17" />
            <path d="M20 7 L4 17" />
          </>
        ) : null}
      </svg>
    </span>
  );
}
