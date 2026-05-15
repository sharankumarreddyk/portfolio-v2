"use client";

import { useEffect, useRef, useState } from "react";

type Swatch = { r: number; g: number; b: number; hex: string; pct: number };

function rgbToHex(r: number, g: number, b: number): string {
  return (
    "#" +
    [r, g, b]
      .map((v) => v.toString(16).padStart(2, "0"))
      .join("")
      .toUpperCase()
  );
}

// Quantize into N color buckets using a simple histogram bucket reducer
function extractPalette(
  imageData: ImageData,
  count = 6
): Swatch[] {
  const buckets = new Map<string, { r: number; g: number; b: number; n: number }>();
  const data = imageData.data;
  for (let i = 0; i < data.length; i += 4) {
    const a = data[i + 3];
    if (a < 100) continue;
    // bucket size 32 — reduces 16M colors to 512 buckets
    const r = (data[i] >> 5) << 5;
    const g = (data[i + 1] >> 5) << 5;
    const b = (data[i + 2] >> 5) << 5;
    const key = `${r}-${g}-${b}`;
    const e = buckets.get(key) ?? { r: 0, g: 0, b: 0, n: 0 };
    e.r += data[i];
    e.g += data[i + 1];
    e.b += data[i + 2];
    e.n++;
    buckets.set(key, e);
  }
  const total = Array.from(buckets.values()).reduce((s, e) => s + e.n, 0);
  const arr = Array.from(buckets.values())
    .map((e) => {
      const r = Math.round(e.r / e.n);
      const g = Math.round(e.g / e.n);
      const b = Math.round(e.b / e.n);
      return {
        r,
        g,
        b,
        hex: rgbToHex(r, g, b),
        pct: e.n / total,
      };
    })
    .sort((a, b) => b.pct - a.pct)
    .slice(0, count);
  return arr;
}

const DEFAULT_SOURCE =
  "https://images.unsplash.com/photo-1545079968-1feb95494244?w=400&q=70";

export default function ColorPalette() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [palette, setPalette] = useState<Swatch[]>([]);
  const [src, setSrc] = useState<string>("");
  const [dragOver, setDragOver] = useState(false);
  const [busy, setBusy] = useState(false);

  // Default sample — synthetic gradient generated on canvas (no external image dep)
  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    const w = (c.width = 200);
    const h = (c.height = 150);
    // Synthetic gradient + accent dots = stable, no external fetch
    const grad = ctx.createLinearGradient(0, 0, w, h);
    grad.addColorStop(0, "#1a3d2b");
    grad.addColorStop(0.45, "#c5ff3d");
    grad.addColorStop(0.7, "#3a2750");
    grad.addColorStop(1, "#0d0d0d");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, w, h);
    // Add some random "noise" so palette has variety
    for (let i = 0; i < 80; i++) {
      ctx.fillStyle = `hsl(${Math.random() * 360}, 60%, 50%)`;
      ctx.globalAlpha = 0.3 + Math.random() * 0.3;
      ctx.beginPath();
      ctx.arc(
        Math.random() * w,
        Math.random() * h,
        2 + Math.random() * 4,
        0,
        Math.PI * 2
      );
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    const data = ctx.getImageData(0, 0, w, h);
    setPalette(extractPalette(data, 6));
  }, []);

  const processFile = async (file: File) => {
    if (!file.type.startsWith("image/")) return;
    setBusy(true);
    const url = URL.createObjectURL(file);
    setSrc(url);

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      // Use offscreen canvas — canvasRef may be unmounted once src is set
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d", { willReadFrequently: true });
      if (!ctx) {
        setBusy(false);
        return;
      }
      const ratio = img.width / img.height || 4 / 3;
      const w = (c.width = 320);
      const h = (c.height = Math.max(40, Math.round(w / ratio)));
      ctx.drawImage(img, 0, 0, w, h);
      try {
        const data = ctx.getImageData(0, 0, w, h);
        setPalette(extractPalette(data, 6));
      } catch {
        // CORS-blocked images can't be read; just clear busy
      }
      setBusy(false);
    };
    img.onerror = () => setBusy(false);
    img.src = url;
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)]">
      <header className="flex items-baseline justify-between border-b border-[color:var(--color-line)] px-5 py-3">
        <div>
          <div className="num-tag text-[color:var(--color-accent-ink)]">
            03 · palette
          </div>
          <div className="mt-1 text-sm text-[color:var(--color-fg)]">
            Drop an image — get its dominant colors.
          </div>
        </div>
        <label
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-[color:var(--color-line)] px-3 py-1 text-[11px] uppercase tracking-widest transition-colors hover:border-[color:var(--color-accent)] hover:text-[color:var(--color-fg)]"
        >
          <span aria-hidden>↑</span> upload
          <input
            type="file"
            accept="image/*"
            className="sr-only"
            onChange={(e) => {
              const f = e.target.files?.[0];
              if (f) processFile(f);
            }}
          />
        </label>
      </header>

      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragOver(true);
        }}
        onDragLeave={() => setDragOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragOver(false);
          const f = e.dataTransfer.files?.[0];
          if (f) processFile(f);
        }}
        className={`relative flex flex-1 items-center justify-center p-5 transition-colors ${
          dragOver ? "bg-[color:var(--color-accent)]/5" : ""
        }`}
      >
        <div className="grid w-full max-w-sm grid-cols-[140px_1fr] gap-4 items-center">
          <div className="overflow-hidden rounded-lg border border-[color:var(--color-line)]">
            {src ? (
              <img
                src={src}
                alt="uploaded"
                className="aspect-[4/3] w-full object-cover"
              />
            ) : (
              <canvas ref={canvasRef} className="aspect-[4/3] w-full" />
            )}
          </div>
          <div className="flex flex-col gap-1.5">
            {palette.map((s, i) => (
              <div key={i} className="flex items-center gap-2.5">
                <span
                  className="h-5 w-5 rounded-sm border border-white/10"
                  style={{ background: s.hex }}
                />
                <span className="flex-1 font-mono text-[11px] text-[color:var(--color-fg)]">
                  {s.hex}
                </span>
                <span className="font-mono text-[10px] text-[color:var(--color-muted)]">
                  {Math.round(s.pct * 100)}%
                </span>
              </div>
            ))}
            {busy ? (
              <div className="font-mono text-[10px] text-[color:var(--color-muted)]">
                processing…
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mt-auto border-t border-[color:var(--color-line)] px-5 py-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)]">
        canvas · 512-bucket histogram quantization
      </div>
    </div>
  );
}
