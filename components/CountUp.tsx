"use client";

import { useEffect, useRef, useState } from "react";

type Props = {
  value: number;
  duration?: number;
  prefix?: string;
  suffix?: string;
  format?: "comma" | "plain";
  className?: string;
};

export default function CountUp({
  value,
  duration = 1400,
  prefix = "",
  suffix = "",
  format = "comma",
  className = "",
}: Props) {
  const ref = useRef<HTMLSpanElement>(null);
  const [display, setDisplay] = useState(0);
  const playedRef = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting || playedRef.current) return;
          playedRef.current = true;

          const start = performance.now();
          const tick = (now: number) => {
            const t = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - t, 3);
            setDisplay(Math.round(eased * value));
            if (t < 1) requestAnimationFrame(tick);
          };
          requestAnimationFrame(tick);
        });
      },
      { threshold: 0.4 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [value, duration]);

  const formatted =
    format === "comma" ? display.toLocaleString() : String(display);

  return (
    <span ref={ref} className={className} suppressHydrationWarning>
      {prefix}
      {formatted}
      {suffix}
    </span>
  );
}
