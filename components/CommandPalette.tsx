"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { navLinks, profile, projects, skillGroups } from "@/lib/data";
import { caseStudies } from "@/lib/case-studies";

type Action = {
  id: string;
  label: string;
  hint?: string;
  keywords?: string[];
  group: "navigate" | "case" | "project" | "skill" | "act" | "open" | "theme";
  run: () => void;
};

function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const [cursor, setCursor] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  const close = useCallback(() => {
    setOpen(false);
    setQ("");
    setCursor(0);
  }, []);

  const setTheme = useCallback((t: "dark" | "light") => {
    document.documentElement.setAttribute("data-theme", t);
    try {
      localStorage.setItem("theme", t);
    } catch {}
  }, []);

  const copyEmail = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = profile.email;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
  }, []);

  const actions: Action[] = [
    ...navLinks.map((l) => ({
      id: `nav-${l.href}`,
      label: `Jump to ${l.label}`,
      hint: l.number,
      keywords: ["section", l.label.toLowerCase()],
      group: "navigate" as const,
      run: () => scrollToId(l.href.replace("#", "")),
    })),
    ...caseStudies.map((cs) => ({
      id: `case-${cs.slug}`,
      label: `Case study · ${cs.client}`,
      hint: cs.title,
      keywords: [
        "case",
        "study",
        cs.slug,
        cs.client.toLowerCase(),
        ...cs.stack.map((s) => s.toLowerCase()),
      ],
      group: "case" as const,
      run: () => scrollToId("work"),
    })),
    ...projects.map((p) => ({
      id: `project-${p.name}`,
      label: `Project · ${p.name}`,
      hint: p.tags.slice(0, 2).join(" · "),
      keywords: [
        "project",
        p.name.toLowerCase(),
        ...p.tags.map((t) => t.toLowerCase()),
      ],
      group: "project" as const,
      run: () => {
        scrollToId("projects");
        setTimeout(() => window.open(p.url, "_blank", "noopener"), 200);
      },
    })),
    ...skillGroups.flatMap((g) =>
      g.items.map((item) => ({
        id: `skill-${g.label}-${item}`,
        label: `Skill · ${item}`,
        hint: g.label.toLowerCase(),
        keywords: [
          "skill",
          item.toLowerCase(),
          g.label.toLowerCase(),
        ],
        group: "skill" as const,
        run: () => scrollToId("skills"),
      }))
    ),
    {
      id: "act-copy-email",
      label: "Copy email address",
      hint: profile.email,
      keywords: ["mail", "contact"],
      group: "act",
      run: copyEmail,
    },
    {
      id: "act-mail",
      label: "Send email",
      hint: profile.email,
      keywords: ["mailto", "contact"],
      group: "act",
      run: () => (window.location.href = `mailto:${profile.email}`),
    },
    {
      id: "open-github",
      label: "Open GitHub",
      hint: "@sharankumarreddyk",
      keywords: ["repo", "code"],
      group: "open",
      run: () => window.open(profile.github, "_blank", "noopener"),
    },
    {
      id: "open-linkedin",
      label: "Open LinkedIn",
      keywords: ["linkedin", "profile"],
      group: "open",
      run: () => window.open(profile.linkedin, "_blank", "noopener"),
    },
    {
      id: "open-now",
      label: "Visit /now",
      hint: "what i'm focused on",
      keywords: ["now", "current"],
      group: "open",
      run: () => (window.location.href = "/now"),
    },
    {
      id: "theme-dark",
      label: "Theme: Dark",
      hint: "near-black + lime",
      keywords: ["mode", "color"],
      group: "theme",
      run: () => setTheme("dark"),
    },
    {
      id: "theme-light",
      label: "Theme: Light",
      hint: "cream + forest",
      keywords: ["mode", "color"],
      group: "theme",
      run: () => setTheme("light"),
    },
  ];

  const filtered = q
    ? actions.filter((a) => {
        const hay = `${a.label} ${a.hint ?? ""} ${(a.keywords ?? []).join(" ")} ${a.group}`.toLowerCase();
        return hay.includes(q.toLowerCase());
      })
    : actions;

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      } else if (e.key === "Escape" && open) {
        e.preventDefault();
        close();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, close]);

  useEffect(() => {
    if (open) {
      const t = setTimeout(() => inputRef.current?.focus(), 20);
      return () => clearTimeout(t);
    }
  }, [open]);

  useEffect(() => {
    setCursor(0);
  }, [q]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setCursor((c) => Math.min(filtered.length - 1, c + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setCursor((c) => Math.max(0, c - 1));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const a = filtered[cursor];
      if (a) {
        a.run();
        close();
      }
    }
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="fixed bottom-6 right-6 z-[155] hidden items-center gap-2 rounded-full border border-[color:var(--color-line)] bg-[color:var(--color-card)]/90 px-4 py-2 text-xs text-[color:var(--color-muted)] shadow-xl backdrop-blur transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)] md:inline-flex"
      >
        <svg
          className="h-3 w-3"
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
        >
          <circle cx="7" cy="7" r="4.5" />
          <path d="M11 11 L14 14" />
        </svg>
        Quick nav
        <span className="ml-1 rounded border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--color-muted)]">
          ⌘K
        </span>
      </button>

      <div
        aria-hidden={!open}
        className={`fixed inset-0 z-[210] flex items-start justify-center px-4 pt-[14vh] transition-opacity duration-200 ${
          open ? "" : "pointer-events-none opacity-0"
        }`}
      >
        <button
          aria-label="Close command palette"
          onClick={close}
          tabIndex={open ? 0 : -1}
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        />
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
          className={`relative w-full max-w-xl overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] shadow-2xl transition-[transform,opacity] duration-200 ${
            open ? "scale-100 opacity-100" : "scale-[0.97] opacity-0"
          }`}
        >
          <div className="flex items-center gap-3 border-b border-[color:var(--color-line)] px-5">
            <svg
              className="h-4 w-4 text-[color:var(--color-muted)]"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.4"
            >
              <circle cx="7" cy="7" r="4.5" />
              <path d="M11 11 L14 14" />
            </svg>
            <input
              ref={inputRef}
              value={q}
              onChange={(e) => setQ(e.target.value)}
              onKeyDown={onInputKey}
              placeholder="Type a command or jump to a section…"
              className="w-full bg-transparent py-4 text-base outline-none placeholder:text-[color:var(--color-dim)]"
            />
            <kbd className="rounded border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--color-muted)]">
              esc
            </kbd>
          </div>

          <ul className="max-h-[60vh] overflow-y-auto p-2">
            {filtered.length === 0 ? (
              <li className="px-4 py-8 text-center text-sm text-[color:var(--color-muted)]">
                No matches.
              </li>
            ) : (
              filtered.map((a, i) => {
                const isActive = i === cursor;
                return (
                  <li key={a.id}>
                    <button
                      type="button"
                      onMouseEnter={() => setCursor(i)}
                      onClick={() => {
                        a.run();
                        close();
                      }}
                      className={`flex w-full items-center justify-between gap-4 rounded-lg px-3 py-3 text-left text-sm transition-colors ${
                        isActive
                          ? "bg-[color:var(--color-bg)] text-[color:var(--color-fg)]"
                          : "text-[color:var(--color-muted)]"
                      }`}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          className={`h-1.5 w-1.5 rounded-full transition-colors ${
                            isActive
                              ? "bg-[color:var(--color-accent)]"
                              : "bg-[color:var(--color-dim)]"
                          }`}
                        />
                        <span>{a.label}</span>
                      </span>
                      {a.hint ? (
                        <span className="font-mono text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
                          {a.hint}
                        </span>
                      ) : null}
                    </button>
                  </li>
                );
              })
            )}
          </ul>

          <div className="flex items-center justify-between gap-2 border-t border-[color:var(--color-line)] px-4 py-2.5 text-[10px] uppercase tracking-wider text-[color:var(--color-muted)]">
            <span className="flex items-center gap-3">
              <Kbd>↑↓</Kbd>
              navigate
              <Kbd>↵</Kbd>
              select
            </span>
            <span>{filtered.length} results</span>
          </div>
        </div>
      </div>
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="rounded border border-[color:var(--color-line)] bg-[color:var(--color-bg)] px-1.5 py-0.5 font-mono text-[10px] text-[color:var(--color-muted)]">
      {children}
    </kbd>
  );
}
