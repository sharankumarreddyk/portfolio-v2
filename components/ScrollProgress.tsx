"use client";

import { useEffect, useRef } from "react";

export default function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let raf = 0;
    let scheduled = false;
    let lastP = -1;
    let scrollable = 1;

    const measure = () => {
      scrollable = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight
      );
    };

    const update = () => {
      scheduled = false;
      const p = Math.min(1, Math.max(0, window.scrollY / scrollable));
      if (Math.abs(p - lastP) < 0.001) return;
      lastP = p;
      if (barRef.current) {
        barRef.current.style.transform = `scaleX(${p.toFixed(4)})`;
      }
    };

    const onScroll = () => {
      if (scheduled) return;
      scheduled = true;
      raf = requestAnimationFrame(update);
    };

    const onResize = () => {
      measure();
      update();
    };

    measure();
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    // Re-measure after late mounts / async content
    const reMeasure = setTimeout(() => {
      measure();
      update();
    }, 800);

    return () => {
      clearTimeout(reMeasure);
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[155] h-[2px]"
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-[color:var(--color-accent)] will-change-transform"
        style={{ transform: "scaleX(0)" }}
      />
    </div>
  );
}
