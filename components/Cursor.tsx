"use client";

import { useEffect, useRef, useState } from "react";

const LERP = 0.18;
const IDLE_THRESHOLD = 0.5;

export default function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState(false);
  const [visible, setVisible] = useState(false);
  const hoverRef = useRef(false);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const rafRef = useRef(0);

  useEffect(() => {
    hoverRef.current = hover;
  }, [hover]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const isFine = window.matchMedia(
      "(hover: hover) and (pointer: fine)"
    ).matches;
    if (!isFine) return;

    setVisible(true);

    const handleMove = (e: MouseEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${e.clientX - 3}px, ${e.clientY - 3}px, 0)`;
      }
      startRaf();
    };

    const handleOver = (e: MouseEvent) => {
      const t = e.target as HTMLElement | null;
      if (!t) return;
      const interactive = t.closest(
        "a, button, [role='button'], input, textarea, select, [data-cursor='hover'], [data-magnetic='true']"
      );
      setHover(!!interactive);
    };

    const handleLeave = () => setHover(false);

    const tick = () => {
      const dx = pos.current.x - ring.current.x;
      const dy = pos.current.y - ring.current.y;
      ring.current.x += dx * LERP;
      ring.current.y += dy * LERP;

      if (ringRef.current) {
        const size = hoverRef.current ? 56 : 28;
        ringRef.current.style.transform = `translate3d(${ring.current.x - size / 2}px, ${ring.current.y - size / 2}px, 0)`;
      }

      if (Math.abs(dx) > IDLE_THRESHOLD || Math.abs(dy) > IDLE_THRESHOLD) {
        rafRef.current = requestAnimationFrame(tick);
      } else {
        rafRef.current = 0;
      }
    };

    const startRaf = () => {
      if (!rafRef.current) {
        rafRef.current = requestAnimationFrame(tick);
      }
    };

    window.addEventListener("mousemove", handleMove, { passive: true });
    window.addEventListener("mouseover", handleOver);
    document.body.addEventListener("mouseleave", handleLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseover", handleOver);
      document.body.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      <div
        ref={ringRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[200] rounded-full border transition-[width,height,border-color,background-color] duration-300 ease-out"
        style={{
          width: hover ? 56 : 28,
          height: hover ? 56 : 28,
          borderColor: hover
            ? "var(--color-accent)"
            : "color-mix(in oklab, var(--color-fg) 35%, transparent)",
          backgroundColor: hover ? "rgba(197,255,61,0.12)" : "transparent",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[201] h-1.5 w-1.5 rounded-full transition-colors duration-200 ease-out"
        style={{
          background: hover ? "var(--color-accent)" : "var(--color-fg)",
        }}
      />
    </>
  );
}
