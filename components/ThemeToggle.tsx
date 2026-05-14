"use client";

import { useEffect, useState } from "react";

type Theme = "dark" | "light";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const current = (document.documentElement.getAttribute("data-theme") ||
      "dark") as Theme;
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    try {
      localStorage.setItem("theme", next);
    } catch {}
  };

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      data-magnetic="true"
      className="grid h-9 w-9 place-items-center rounded-full border border-[color:var(--color-line)] text-[color:var(--color-muted)] transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)]"
    >
      <span
        className="relative block h-3.5 w-3.5"
        style={{ opacity: mounted ? 1 : 0 }}
      >
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="absolute inset-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: theme === "dark" ? 1 : 0,
            transform: theme === "dark" ? "rotate(0)" : "rotate(60deg)",
          }}
        >
          <path d="M12 9.5 A5 5 0 1 1 6.5 4 A4 4 0 0 0 12 9.5 Z" />
        </svg>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          className="absolute inset-0 transition-[transform,opacity] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]"
          style={{
            opacity: theme === "light" ? 1 : 0,
            transform: theme === "light" ? "rotate(0)" : "rotate(-60deg)",
          }}
        >
          <circle cx="8" cy="8" r="2.6" />
          <path d="M8 1 L8 3 M8 13 L8 15 M1 8 L3 8 M13 8 L15 8 M3 3 L4.5 4.5 M11.5 11.5 L13 13 M3 13 L4.5 11.5 M11.5 4.5 L13 3" />
        </svg>
      </span>
    </button>
  );
}
