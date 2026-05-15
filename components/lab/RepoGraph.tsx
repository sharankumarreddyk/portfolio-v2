"use client";

import { useEffect, useRef, useState } from "react";
import { topRepos } from "@/lib/github-data";

type Node = {
  id: string;
  label: string;
  group: number;
  size: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  pinned: boolean;
};

type Edge = {
  source: string;
  target: string;
};

const REPO_LANG: Record<string, string> = {
  "jahopp-ai": "Python",
  "jahopp-backend": "TypeScript",
  "jahopp-admin": "TypeScript",
  "jahopp-web": "Svelte",
  "ssn-web": "TypeScript",
  "ssn-database": "SQL",
  "ignite-magic-2.0": "TypeScript",
  "Jahopp-AI-Qdrant-DB": "Python",
};

const LANG_GROUPS: Record<string, number> = {
  TypeScript: 0,
  Python: 1,
  Svelte: 2,
  SQL: 3,
};

const GROUP_COLOR = ["#C5FF3D", "#7BC3FF", "#FF8B4A", "#B894FF"];

export default function RepoGraph() {
  const svgRef = useRef<SVGSVGElement>(null);
  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  const [dragId, setDragId] = useState<string | null>(null);

  // Build graph once
  useEffect(() => {
    const ns: Node[] = topRepos.map((r, i) => {
      const lang = REPO_LANG[r.name] ?? "TypeScript";
      const group = LANG_GROUPS[lang] ?? 0;
      const angle = (i / topRepos.length) * Math.PI * 2;
      return {
        id: r.name,
        label: r.name,
        group,
        size: 18 + Math.sqrt(r.commits) * 3,
        x: 250 + Math.cos(angle) * 100,
        y: 200 + Math.sin(angle) * 100,
        vx: 0,
        vy: 0,
        pinned: false,
      };
    });
    setNodes(ns);

    const es: Edge[] = [];
    for (let i = 0; i < ns.length; i++) {
      for (let j = i + 1; j < ns.length; j++) {
        if (ns[i].group === ns[j].group) {
          es.push({ source: ns[i].id, target: ns[j].id });
        }
      }
    }
    setEdges(es);
  }, []);

  // Force simulation
  useEffect(() => {
    if (!nodes.length) return;
    let raf = 0;
    let running = true;

    const step = () => {
      if (!running) return;
      setNodes((prev) => {
        const next = prev.map((n) => ({ ...n }));
        const w = 500;
        const h = 400;

        // Apply forces
        for (let i = 0; i < next.length; i++) {
          const a = next[i];
          if (a.pinned) continue;

          // Center attraction
          a.vx += (w / 2 - a.x) * 0.001;
          a.vy += (h / 2 - a.y) * 0.001;

          // Node repulsion
          for (let j = 0; j < next.length; j++) {
            if (i === j) continue;
            const b = next[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const dist = Math.max(Math.hypot(dx, dy), 1);
            const force = 600 / (dist * dist);
            a.vx += (dx / dist) * force;
            a.vy += (dy / dist) * force;
          }

          // Edge spring force
          edges.forEach((e) => {
            if (e.source === a.id || e.target === a.id) {
              const other = next.find(
                (n) => n.id === (e.source === a.id ? e.target : e.source)
              );
              if (!other) return;
              const dx = other.x - a.x;
              const dy = other.y - a.y;
              const dist = Math.hypot(dx, dy);
              const target = 110;
              const k = 0.02;
              a.vx += (dx / dist) * (dist - target) * k;
              a.vy += (dy / dist) * (dist - target) * k;
            }
          });

          // Damping
          a.vx *= 0.82;
          a.vy *= 0.82;

          a.x += a.vx;
          a.y += a.vy;

          // Bounds
          a.x = Math.max(a.size, Math.min(w - a.size, a.x));
          a.y = Math.max(a.size, Math.min(h - a.size, a.y));
        }
        return next;
      });
      raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [edges.length]);

  const onPointerDown = (e: React.PointerEvent, id: string) => {
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    setDragId(id);
    setNodes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, pinned: true, vx: 0, vy: 0 } : n))
    );
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragId || !svgRef.current) return;
    const rect = svgRef.current.getBoundingClientRect();
    const scaleX = 500 / rect.width;
    const scaleY = 400 / rect.height;
    const x = (e.clientX - rect.left) * scaleX;
    const y = (e.clientY - rect.top) * scaleY;
    setNodes((prev) =>
      prev.map((n) =>
        n.id === dragId ? { ...n, x, y, vx: 0, vy: 0 } : n
      )
    );
  };

  const onPointerUp = () => {
    if (!dragId) return;
    setNodes((prev) =>
      prev.map((n) => (n.id === dragId ? { ...n, pinned: false } : n))
    );
    setDragId(null);
  };

  const nodeById = (id: string) => nodes.find((n) => n.id === id);

  return (
    <div className="overflow-hidden rounded-2xl border border-[color:var(--color-line)] bg-[color:var(--color-card)]">
      <header className="flex items-baseline justify-between border-b border-[color:var(--color-line)] px-5 py-3">
        <div>
          <div className="num-tag text-[color:var(--color-accent-ink)]">
            01 · graph
          </div>
          <div className="mt-1 text-sm text-[color:var(--color-fg)]">
            Drag a node — physics finds equilibrium.
          </div>
        </div>
        <div className="hidden gap-3 text-[10px] uppercase tracking-widest text-[color:var(--color-muted)] sm:flex">
          {Object.entries(LANG_GROUPS).map(([lang, g]) => (
            <span key={lang} className="flex items-center gap-1.5">
              <span
                className="h-2 w-2 rounded-full"
                style={{ background: GROUP_COLOR[g] }}
              />
              {lang}
            </span>
          ))}
        </div>
      </header>

      <svg
        ref={svgRef}
        viewBox="0 0 500 400"
        className="aspect-[5/4] w-full cursor-grab touch-none select-none active:cursor-grabbing"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        {/* Edges */}
        {edges.map((e, i) => {
          const a = nodeById(e.source);
          const b = nodeById(e.target);
          if (!a || !b) return null;
          return (
            <line
              key={i}
              x1={a.x}
              y1={a.y}
              x2={b.x}
              y2={b.y}
              stroke="var(--color-line)"
              strokeWidth="0.8"
            />
          );
        })}

        {/* Nodes */}
        {nodes.map((n) => (
          <g
            key={n.id}
            transform={`translate(${n.x},${n.y})`}
            onPointerDown={(e) => onPointerDown(e, n.id)}
            className="cursor-grab active:cursor-grabbing"
          >
            <circle
              r={n.size}
              fill="var(--color-bg)"
              stroke={GROUP_COLOR[n.group]}
              strokeWidth="1.5"
            />
            <circle r={n.size - 4} fill={GROUP_COLOR[n.group]} opacity="0.12" />
            <text
              y="3"
              textAnchor="middle"
              fill="var(--color-fg)"
              style={{ fontFamily: "var(--font-mono)", fontSize: 9 }}
            >
              {n.label.length > 12 ? n.label.slice(0, 10) + "…" : n.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
