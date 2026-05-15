"use client";

import { useState } from "react";

const ACCENT = "#C5FF3D";

type Candidate = {
  score: number;
  hue: number;
  pattern: "stripes" | "dots" | "wave" | "grid" | "solid" | "noise";
  label: string;
};

// Synthetic candidate covers — abstract, no org IP, just gradients + patterns.
const CANDIDATES: Candidate[] = [
  { score: 0.31, hue: 220, pattern: "noise", label: "off-topic" },
  { score: 0.48, hue: 280, pattern: "stripes", label: "stock-photo feel" },
  { score: 0.55, hue: 30, pattern: "dots", label: "borderline" },
  { score: 0.62, hue: 80, pattern: "wave", label: "on-topic, generic" },
  { score: 0.74, hue: 90, pattern: "grid", label: "on-topic, sharp" },
  { score: 0.88, hue: 95, pattern: "solid", label: "ideal cover" },
];

export default function ThresholdSlider() {
  const [t, setT] = useState(0.6);
  const accepted = CANDIDATES.filter((c) => c.score >= t).length;

  return (
    <div className="rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)] p-5 sm:p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <div className="num-tag text-[color:var(--color-accent-ink)]">
            try it · live
          </div>
          <p className="mt-1.5 text-sm leading-snug text-[color:var(--color-fg)]">
            Drag the threshold. See what we used to ship — and what we
            filter now.
          </p>
        </div>
        <div className="text-right">
          <div className="display text-2xl leading-none text-[color:var(--color-fg)] sm:text-3xl">
            {t.toFixed(2)}
          </div>
          <div className="num-tag mt-1">relevance floor</div>
        </div>
      </div>

      {/* Slider */}
      <div className="mt-5">
        <div className="relative">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={t}
            onChange={(e) => setT(Number(e.target.value))}
            aria-label="Relevance threshold"
            className="threshold-range w-full"
            style={
              {
                "--p": `${t * 100}%`,
              } as React.CSSProperties
            }
          />
          {/* Threshold tick at 0.6 (the real production value) */}
          <div
            aria-hidden
            className="pointer-events-none absolute top-1/2 h-3 w-px -translate-y-1/2 bg-[color:var(--color-muted)]"
            style={{ left: "60%" }}
          />
          <div
            aria-hidden
            className="pointer-events-none absolute -top-5 -translate-x-1/2 text-[9px] uppercase tracking-widest text-[color:var(--color-muted)]"
            style={{ left: "60%" }}
          >
            prod = 0.60
          </div>
        </div>
        <div className="mt-2 flex justify-between font-mono text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
          <span>permissive · 0.0</span>
          <span>strict · 1.0</span>
        </div>
      </div>

      {/* Candidates grid */}
      <div className="mt-6 grid grid-cols-3 gap-2.5 sm:grid-cols-6 sm:gap-2">
        {CANDIDATES.map((c, i) => {
          const passes = c.score >= t;
          return (
            <div
              key={i}
              className="relative overflow-hidden rounded-md border transition-[border-color,opacity,filter] duration-300"
              style={{
                borderColor: passes ? ACCENT : "var(--color-line)",
                opacity: passes ? 1 : 0.45,
                filter: passes ? "none" : "saturate(0.2)",
              }}
            >
              <div className="aspect-square w-full">
                <Swatch hue={c.hue} pattern={c.pattern} />
              </div>
              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between bg-black/55 px-1.5 py-1 backdrop-blur">
                <span
                  className="font-mono text-[10px]"
                  style={{
                    color: passes ? ACCENT : "#888",
                    textDecoration: passes ? "none" : "line-through",
                  }}
                >
                  {c.score.toFixed(2)}
                </span>
                <span
                  className="font-mono text-[8px] uppercase tracking-widest"
                  style={{ color: passes ? ACCENT : "#666" }}
                >
                  {passes ? "ACC" : "REJ"}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Result line */}
      <div className="mt-5 flex flex-wrap items-baseline justify-between gap-2 border-t border-[color:var(--color-line)] pt-4">
        <div className="text-sm text-[color:var(--color-muted)]">
          <span className="display text-xl text-[color:var(--color-fg)] sm:text-2xl">
            {accepted}
          </span>{" "}
          / 6 covers accepted at floor{" "}
          <span className="font-mono text-[color:var(--color-fg)]">
            {t.toFixed(2)}
          </span>
        </div>
        <div className="num-tag">
          {t < 0.6
            ? "pre-fix · too many false positives"
            : t === 0.6
              ? "current production threshold"
              : "stricter · fewer false positives, more rejected"}
        </div>
      </div>

      <style>{`
        .threshold-range {
          -webkit-appearance: none;
          appearance: none;
          height: 4px;
          background: linear-gradient(
            to right,
            ${ACCENT} 0%,
            ${ACCENT} var(--p),
            var(--color-line) var(--p),
            var(--color-line) 100%
          );
          border-radius: 999px;
          outline: none;
          cursor: pointer;
        }
        .threshold-range::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: ${ACCENT};
          border: 3px solid var(--color-bg);
          box-shadow: 0 0 0 1px ${ACCENT};
          cursor: grab;
        }
        .threshold-range::-webkit-slider-thumb:active {
          cursor: grabbing;
        }
        .threshold-range::-moz-range-thumb {
          width: 18px;
          height: 18px;
          border-radius: 999px;
          background: ${ACCENT};
          border: 3px solid var(--color-bg);
          box-shadow: 0 0 0 1px ${ACCENT};
          cursor: grab;
        }
        .threshold-range:focus-visible::-webkit-slider-thumb {
          outline: 2px solid ${ACCENT};
          outline-offset: 4px;
        }
      `}</style>
    </div>
  );
}

function Swatch({ hue, pattern }: { hue: number; pattern: string }) {
  const bg = `hsl(${hue}, 30%, 22%)`;
  const accent = `hsl(${hue}, 55%, 55%)`;
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="h-full w-full">
      <defs>
        <pattern id={`p-${hue}-${pattern}`} x="0" y="0" width="10" height="10" patternUnits="userSpaceOnUse">
          {pattern === "stripes" && (
            <line x1="0" y1="0" x2="0" y2="10" stroke={accent} strokeWidth="3" />
          )}
          {pattern === "dots" && (
            <circle cx="3" cy="3" r="1.6" fill={accent} />
          )}
          {pattern === "grid" && (
            <>
              <line x1="0" y1="5" x2="10" y2="5" stroke={accent} strokeWidth="0.6" />
              <line x1="5" y1="0" x2="5" y2="10" stroke={accent} strokeWidth="0.6" />
            </>
          )}
          {pattern === "wave" && (
            <path d="M 0 5 Q 2.5 0 5 5 T 10 5" stroke={accent} strokeWidth="1" fill="none" />
          )}
          {pattern === "noise" && (
            <>
              <circle cx="2" cy="2" r="0.5" fill={accent} opacity="0.5" />
              <circle cx="6" cy="4" r="0.4" fill={accent} opacity="0.7" />
              <circle cx="3" cy="7" r="0.6" fill={accent} opacity="0.4" />
              <circle cx="8" cy="8" r="0.3" fill={accent} opacity="0.6" />
            </>
          )}
        </pattern>
      </defs>
      <rect width="100" height="100" fill={bg} />
      {pattern !== "solid" && (
        <rect width="100" height="100" fill={`url(#p-${hue}-${pattern})`} />
      )}
      {pattern === "solid" && (
        <>
          <rect width="100" height="100" fill={accent} opacity="0.8" />
          <circle cx="50" cy="50" r="20" fill={bg} opacity="0.4" />
        </>
      )}
    </svg>
  );
}
