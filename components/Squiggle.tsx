"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  className?: string;
  color?: string;
  thickness?: number;
  delay?: number;
};

export default function Squiggle({
  className = "",
  color = "var(--color-accent)",
  thickness = 2.5,
  delay = 0,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setActive(true);
            obs.disconnect();
          }
        });
      },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox="0 0 600 24"
      preserveAspectRatio="none"
      className={className}
      aria-hidden
    >
      <path
        d="M 8 14 C 60 6, 120 18, 178 11 S 290 4, 348 13 S 460 18, 518 10 S 588 14, 592 12"
        stroke={color}
        strokeWidth={thickness}
        strokeLinecap="round"
        fill="none"
        style={{
          strokeDasharray: 700,
          strokeDashoffset: active ? 0 : 700,
          transition: `stroke-dashoffset 1.4s cubic-bezier(0.65, 0, 0.35, 1) ${delay}ms`,
        }}
      />
    </svg>
  );
}
