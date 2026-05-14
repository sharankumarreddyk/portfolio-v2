"use client";

type Kind =
  | "kubeai"
  | "restaurantos"
  | "aiskills"
  | "collegeerp"
  | "linkbuild"
  | "projects"
  | "gym";

const ACCENT = "#C5FF3D";

export default function ProjectCover({
  kind,
  className = "",
}: {
  kind: Kind;
  className?: string;
}) {
  switch (kind) {
    case "kubeai":
      return (
        <Frame className={className} bg="#06120A">
          {/* Kubernetes hexagons + pulse */}
          <g
            stroke={ACCENT}
            strokeWidth="1.1"
            fill="#0a1810"
            opacity="0.85"
          >
            {[
              [80, 80],
              [150, 80],
              [220, 80],
              [115, 130],
              [185, 130],
              [80, 180],
              [150, 180],
              [220, 180],
            ].map(([x, y], i) => (
              <polygon
                key={i}
                points={hex(x as number, y as number, 22)}
                opacity={i === 3 || i === 4 ? 1 : 0.35}
              />
            ))}
          </g>
          <circle
            cx="150"
            cy="105"
            r="6"
            fill={ACCENT}
          >
            <animate
              attributeName="r"
              from="6"
              to="22"
              dur="2s"
              repeatCount="indefinite"
            />
            <animate
              attributeName="opacity"
              from="0.9"
              to="0"
              dur="2s"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="150" cy="105" r="4" fill={ACCENT} />
        </Frame>
      );

    case "restaurantos":
      return (
        <Frame className={className} bg="#120B08">
          {/* Plate + sectors */}
          <circle
            cx="150"
            cy="120"
            r="78"
            stroke={ACCENT}
            strokeOpacity="0.3"
            strokeWidth="1"
            fill="none"
          />
          <circle
            cx="150"
            cy="120"
            r="64"
            stroke={ACCENT}
            strokeOpacity="0.6"
            strokeWidth="1"
            fill="none"
          />
          <path
            d="M 150 56 A 64 64 0 0 1 207 152"
            stroke={ACCENT}
            strokeWidth="6"
            fill="none"
            strokeLinecap="round"
          />
          <text
            x="150"
            y="118"
            textAnchor="middle"
            fill="#fff"
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 28,
              fontWeight: 500,
            }}
          >
            #42
          </text>
          <text
            x="150"
            y="138"
            textAnchor="middle"
            fill={ACCENT}
            style={{ fontFamily: "ui-monospace", fontSize: 10 }}
          >
            ORDER · KITCHEN
          </text>
        </Frame>
      );

    case "aiskills":
      return (
        <Frame className={className} bg="#0A0E14">
          {/* Wave + tokens */}
          <path
            d="M 0 130 Q 50 90 100 130 T 200 130 T 300 130"
            stroke={ACCENT}
            strokeWidth="1.6"
            fill="none"
          />
          <path
            d="M 0 130 Q 50 90 100 130 T 200 130 T 300 130"
            stroke={ACCENT}
            strokeWidth="3"
            strokeOpacity="0.25"
            fill="none"
          />
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x={20 + i * 26}
              y={50}
              width={18}
              height={6}
              rx={1}
              fill={ACCENT}
              opacity={0.2 + (i / 10) * 0.8}
            />
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <rect
              key={i}
              x={20 + i * 26}
              y={180}
              width={18}
              height={6}
              rx={1}
              fill="#fff"
              opacity={0.05 + (i / 10) * 0.2}
            />
          ))}
        </Frame>
      );

    case "collegeerp":
      return (
        <Frame className={className} bg="#0D0F14">
          {/* Grid of cards */}
          <g>
            {Array.from({ length: 12 }).map((_, i) => {
              const col = i % 4;
              const row = Math.floor(i / 4);
              return (
                <rect
                  key={i}
                  x={28 + col * 64}
                  y={56 + row * 50}
                  width={56}
                  height={42}
                  rx={3}
                  fill="#1a1a1a"
                  stroke={ACCENT}
                  strokeOpacity={i === 5 ? 0.9 : 0.18}
                />
              );
            })}
          </g>
          <text
            x="22"
            y="220"
            fill="#fff"
            opacity="0.5"
            style={{ fontFamily: "ui-monospace", fontSize: 10 }}
          >
            students · faculty · attendance · results
          </text>
        </Frame>
      );

    case "linkbuild":
      return (
        <Frame className={className} bg="#0C0C0C">
          {/* Link chains */}
          <g stroke={ACCENT} strokeWidth="2" fill="none">
            <ellipse cx="80" cy="120" rx="34" ry="18" />
            <ellipse cx="148" cy="120" rx="34" ry="18" opacity="0.6" />
            <ellipse cx="216" cy="120" rx="34" ry="18" opacity="0.3" />
          </g>
          <text
            x="22"
            y="200"
            fill="#fff"
            opacity="0.5"
            style={{ fontFamily: "ui-monospace", fontSize: 10 }}
          >
            python · fastapi · docker
          </text>
        </Frame>
      );

    case "gym":
      return (
        <Frame className={className} bg="#0A0E0A">
          {/* Dumbbell silhouette */}
          <g stroke={ACCENT} fill="none" strokeWidth="2" strokeLinecap="round">
            {/* Left plate stack */}
            <rect x="38" y="98" width="10" height="44" rx="2" fill="#0A0E0A" />
            <rect x="52" y="86" width="14" height="68" rx="2" fill="#0A0E0A" />
            {/* Bar */}
            <line x1="66" y1="120" x2="234" y2="120" strokeWidth="3" />
            {/* Knurling marks */}
            <line x1="120" y1="116" x2="120" y2="124" strokeOpacity="0.6" />
            <line x1="130" y1="116" x2="130" y2="124" strokeOpacity="0.6" />
            <line x1="170" y1="116" x2="170" y2="124" strokeOpacity="0.6" />
            <line x1="180" y1="116" x2="180" y2="124" strokeOpacity="0.6" />
            {/* Right plate stack */}
            <rect x="234" y="86" width="14" height="68" rx="2" fill="#0A0E0A" />
            <rect x="252" y="98" width="10" height="44" rx="2" fill="#0A0E0A" />
          </g>
          {/* Pulse line under */}
          <polyline
            points="20,180 60,180 76,168 92,196 108,170 124,180 280,180"
            stroke={ACCENT}
            strokeWidth="1.4"
            fill="none"
            strokeOpacity="0.7"
          />
          <text
            x="22"
            y="56"
            fill="#fff"
            opacity="0.55"
            style={{
              fontFamily: "ui-monospace",
              fontSize: 10,
              letterSpacing: 1,
            }}
          >
            REPS · SETS · PROGRESS
          </text>
          <text
            x="22"
            y="216"
            fill="#fff"
            opacity="0.5"
            style={{ fontFamily: "ui-monospace", fontSize: 10 }}
          >
            svelte · tailwind · daisyui
          </text>
        </Frame>
      );

    case "projects":
    default:
      return (
        <Frame className={className} bg="#0A0F12">
          <g fill="none" stroke={ACCENT} strokeWidth="1.2">
            <rect x="32" y="60" width="80" height="140" rx="10" />
            <rect x="124" y="40" width="40" height="60" rx="6" />
          </g>
          <circle cx="200" cy="120" r="40" fill={ACCENT} opacity="0.8" />
          <text
            x="22"
            y="218"
            fill="#fff"
            opacity="0.5"
            style={{ fontFamily: "ui-monospace", fontSize: 10 }}
          >
            mobile · ionic · typescript
          </text>
        </Frame>
      );
  }
}

function hex(cx: number, cy: number, r: number) {
  const pts: string[] = [];
  for (let i = 0; i < 6; i++) {
    const a = (Math.PI / 3) * i - Math.PI / 2;
    pts.push(`${cx + r * Math.cos(a)},${cy + r * Math.sin(a)}`);
  }
  return pts.join(" ");
}

function Frame({
  children,
  className = "",
  bg,
}: {
  children: React.ReactNode;
  className?: string;
  bg: string;
}) {
  return (
    <svg
      viewBox="0 0 300 240"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      aria-hidden
    >
      <defs>
        <linearGradient id="frameFade" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(255,255,255,0.04)" />
          <stop offset="100%" stopColor="rgba(0,0,0,0.4)" />
        </linearGradient>
        <pattern
          id="frameDots"
          x="0"
          y="0"
          width="8"
          height="8"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="1" cy="1" r="0.7" fill="rgba(245,245,245,0.06)" />
        </pattern>
      </defs>
      <rect width="300" height="240" fill={bg} />
      <rect width="300" height="240" fill="url(#frameDots)" />
      <rect width="300" height="240" fill="url(#frameFade)" />
      {children}
      <rect
        x="0.5"
        y="0.5"
        width="299"
        height="239"
        fill="none"
        stroke="rgba(245,245,245,0.06)"
      />
    </svg>
  );
}
