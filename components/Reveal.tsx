"use client";

import { useEffect, useRef, useState } from "react";

type Direction = "up" | "left" | "right" | "scale" | "blur";

type Props = {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  direction?: Direction;
  duration?: number;
  repeat?: boolean;
};

function offTransform(direction: Direction, y: number): string {
  switch (direction) {
    case "left":
      return "translate3d(-48px, 0, 0)";
    case "right":
      return "translate3d(48px, 0, 0)";
    case "scale":
      return "scale(0.92)";
    case "blur":
      return "translate3d(0, 16px, 0)";
    case "up":
    default:
      return `translate3d(0, ${y}px, 0)`;
  }
}

export default function Reveal({
  children,
  className = "",
  delay = 0,
  y = 28,
  direction = "up",
  duration = 900,
  repeat = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);
  const [settled, setSettled] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(true);
            if (!repeat) obs.disconnect();
          } else if (repeat) {
            setActive(false);
            setSettled(false);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [repeat]);

  useEffect(() => {
    if (!active) return;
    const settleAfter = Math.round(duration * 1.2) + delay + 100;
    const t = setTimeout(() => setSettled(true), settleAfter);
    return () => clearTimeout(t);
  }, [active, delay, duration]);

  const off = offTransform(direction, y);
  const isBlur = direction === "blur";

  return (
    <div
      ref={ref}
      className={className}
      style={{
        opacity: active ? 1 : 0,
        transform: active ? "translate3d(0,0,0) scale(1)" : off,
        filter: isBlur ? (active ? "blur(0)" : "blur(8px)") : undefined,
        transition: settled
          ? undefined
          : `opacity ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform ${Math.round(duration * 1.1)}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms${
              isBlur
                ? `, filter ${duration}ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`
                : ""
            }`,
        willChange: settled ? undefined : "opacity, transform",
      }}
    >
      {children}
    </div>
  );
}
