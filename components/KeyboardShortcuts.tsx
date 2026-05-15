"use client";

import { useEffect } from "react";

const NAV_MAP: Record<string, string> = {
  h: "top",
  w: "work",
  p: "projects",
  s: "skills",
  e: "experience",
  a: "about",
  c: "contact",
};

export default function KeyboardShortcuts() {
  useEffect(() => {
    let gPressed = false;
    let resetTimer: ReturnType<typeof setTimeout> | undefined;

    const reset = () => {
      gPressed = false;
      if (resetTimer) clearTimeout(resetTimer);
    };

    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;

      const k = e.key.toLowerCase();

      if (k === "t" && !gPressed) {
        e.preventDefault();
        const current =
          document.documentElement.getAttribute("data-theme") || "dark";
        const next = current === "dark" ? "light" : "dark";
        document.documentElement.setAttribute("data-theme", next);
        try {
          localStorage.setItem("theme", next);
        } catch {}
        return;
      }

      if (k === "g") {
        e.preventDefault();
        gPressed = true;
        if (resetTimer) clearTimeout(resetTimer);
        resetTimer = setTimeout(reset, 1200);
        return;
      }

      if (gPressed && NAV_MAP[k]) {
        e.preventDefault();
        reset();
        const el = document.getElementById(NAV_MAP[k]);
        if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    };

    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
      if (resetTimer) clearTimeout(resetTimer);
    };
  }, []);

  return null;
}
