"use client";

import { useEffect, useRef } from "react";

type Props = {
  children: React.ReactNode;
  strength?: number;
  range?: number;
  className?: string;
};

export default function Magnetic({
  children,
  strength = 0.32,
  range = 110,
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const el = ref.current;
    if (!el) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReduced) return;

    let raf = 0;
    let tx = 0;
    let ty = 0;
    let targetX = 0;
    let targetY = 0;
    let active = false;

    const tick = () => {
      tx += (targetX - tx) * 0.18;
      ty += (targetY - ty) * 0.18;
      el.style.transform = `translate3d(${tx.toFixed(2)}px, ${ty.toFixed(2)}px, 0)`;
      if (
        Math.abs(tx - targetX) > 0.05 ||
        Math.abs(ty - targetY) > 0.05 ||
        active
      ) {
        raf = requestAnimationFrame(tick);
      } else {
        raf = 0;
      }
    };

    const startRaf = () => {
      if (!raf) raf = requestAnimationFrame(tick);
    };

    const onMove = (e: MouseEvent) => {
      const r = el.getBoundingClientRect();
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = e.clientX - cx;
      const dy = e.clientY - cy;
      const dist = Math.hypot(dx, dy);
      if (dist < range) {
        active = true;
        targetX = dx * strength;
        targetY = dy * strength;
      } else if (active) {
        active = false;
        targetX = 0;
        targetY = 0;
      }
      startRaf();
    };

    const onLeave = () => {
      active = false;
      targetX = 0;
      targetY = 0;
      startRaf();
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, [strength, range]);

  return (
    <span
      ref={ref}
      className={`inline-block will-change-transform ${className}`}
    >
      {children}
    </span>
  );
}
