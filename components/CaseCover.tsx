"use client";

type Kind = "jahopp" | "sisp" | "kubeai";

export default function CaseCover({ kind }: { kind: Kind }) {
  return (
    <div className="relative aspect-[5/4] w-full">
      <BrowserFrame>
        {kind === "jahopp" ? <JahoppUI /> : null}
        {kind === "sisp" ? <SispUI /> : null}
        {kind === "kubeai" ? <KubeaiUI /> : null}
      </BrowserFrame>
    </div>
  );
}

function BrowserFrame({
  children,
  domain = "app.jahopp.com",
}: {
  children: React.ReactNode;
  domain?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0d0d0d]">
      <div className="flex items-center gap-2 border-b border-white/[0.06] px-4 py-2.5">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
          <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
        </div>
        <div className="ml-3 flex-1 rounded-md bg-white/[0.04] px-3 py-1 text-[10px] text-white/40">
          {domain}
        </div>
      </div>
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ----------------------------- JAHOPP ----------------------------- */
function JahoppUI() {
  return (
    <div className="flex h-full">
      <aside className="hidden w-44 shrink-0 flex-col gap-1 border-r border-white/[0.06] bg-white/[0.015] p-4 lg:flex">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/80">
          <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF3D]" />
          Jahopp
        </div>
        {[
          { l: "Dashboard", a: false },
          { l: "Courses", a: true },
          { l: "Learning journey", a: false },
          { l: "Quiz", a: false },
          { l: "Reports", a: false },
          { l: "Admin", a: false },
        ].map((it) => (
          <div
            key={it.l}
            className={`rounded px-2 py-1.5 text-[11px] ${
              it.a
                ? "bg-[#C5FF3D]/12 text-[#C5FF3D]"
                : "text-white/45"
            }`}
            style={{
              background: it.a ? "rgba(197,255,61,0.12)" : "transparent",
            }}
          >
            {it.l}
          </div>
        ))}
      </aside>

      <div className="flex-1 overflow-hidden p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              AI course generation
            </div>
            <div className="mt-1 text-base font-medium text-white sm:text-lg">
              Introduction to Workplace Safety
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#C5FF3D]/40 bg-[#C5FF3D]/8 px-2.5 py-1 text-[10px] text-[#C5FF3D]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C5FF3D]" />
            generating · 67%
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { t: "Cover", st: "scored 0.74", on: true },
            { t: "Outline", st: "12 lessons", on: true },
            { t: "Quiz", st: "queued", on: false },
          ].map((c) => (
            <div
              key={c.t}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
            >
              <div className="flex items-center justify-between">
                <div className="text-[10px] uppercase tracking-widest text-white/40">
                  {c.t}
                </div>
                <span
                  className="h-1.5 w-1.5 rounded-full"
                  style={{
                    background: c.on ? "#C5FF3D" : "rgba(255,255,255,0.18)",
                  }}
                />
              </div>
              <div className="mt-1.5 text-[11px] text-white/70">{c.st}</div>
            </div>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[
            { l: "Hazards on site", c: "rgba(197,255,61,0.85)" },
            { l: "PPE basics", c: "rgba(197,255,61,0.55)" },
            { l: "Emergency response", c: "rgba(197,255,61,0.35)" },
            { l: "Compliance overview", c: "rgba(197,255,61,0.20)" },
          ].map((l) => (
            <div
              key={l.l}
              className="flex items-center gap-2 rounded-md bg-white/[0.02] px-2.5 py-1.5"
            >
              <span
                className="h-2 w-2 rounded-sm"
                style={{ background: l.c }}
              />
              <span className="text-[11px] text-white/75">{l.l}</span>
              <span className="ml-auto text-[10px] text-white/35">·</span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.06] bg-black/30 p-2.5 font-mono text-[10px] leading-[1.5] text-white/55">
          <div>
            <span className="text-white/35">[ai.relevance]</span>{" "}
            <span className="text-[#C5FF3D]">score=0.74</span>{" "}
            <span className="text-white/50">≥ floor 0.60 — cover accepted</span>
          </div>
          <div>
            <span className="text-white/35">[ocr]</span> scanned-pdf-3.pdf · 12
            pages · 3.4s
          </div>
          <div>
            <span className="text-white/35">[quota]</span>{" "}
            <span className="text-[#C5FF3D]">indpro</span> · 42,318 / 120,000
            tokens today
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- SISP ----------------------------- */
function SispUI() {
  const bars = [22, 38, 31, 54, 47, 68, 60, 82, 74, 96, 88, 110];
  const maxB = Math.max(...bars);
  const line = "16,86 30,72 44,80 58,58 72,66 86,42 100,52 114,30 128,40 142,18 156,28 170,8";
  return (
    <div className="flex h-full">
      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-baseline justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              startup ecosystem · sweden
            </div>
            <div className="mt-1 text-base font-medium text-white sm:text-lg">
              Scaleups · growth trajectories
            </div>
          </div>
          <div className="hidden gap-1 sm:flex">
            {["2010", "2015", "2020", "2024"].map((y, i) => (
              <span
                key={y}
                className={`rounded-full border px-2 py-0.5 text-[10px] ${
                  i === 3
                    ? "border-[#C5FF3D] bg-[#C5FF3D]/12 text-[#C5FF3D]"
                    : "border-white/[0.08] text-white/45"
                }`}
              >
                {y}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { k: "8,412", v: "active startups" },
            { k: "286", v: "scaleups · 24" },
            { k: "12", v: "unicorns · ESNA" },
          ].map((s) => (
            <div
              key={s.v}
              className="rounded-lg border border-white/[0.06] bg-white/[0.02] p-2.5"
            >
              <div className="text-lg font-medium text-white">{s.k}</div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-white/40">
                {s.v}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.06] bg-black/30 p-3">
          <div className="mb-2 flex items-baseline justify-between text-[10px]">
            <span className="text-white/45">capital · per year</span>
            <span className="text-[#C5FF3D]">v_chart_v1 (mat.)</span>
          </div>
          <svg viewBox="0 0 180 110" className="h-24 w-full">
            <g>
              {bars.map((h, i) => (
                <rect
                  key={i}
                  x={6 + i * 14}
                  y={100 - h * 0.78}
                  width={8}
                  height={h * 0.78}
                  rx={1}
                  fill={`rgba(197,255,61,${0.18 + (i / bars.length) * 0.7})`}
                />
              ))}
            </g>
            <polyline
              points={line}
              stroke="#C5FF3D"
              strokeWidth="1.2"
              fill="none"
            />
            {line.split(" ").map((pt, i) => {
              const [x, y] = pt.split(",");
              return (
                <circle
                  key={i}
                  cx={x}
                  cy={y}
                  r="1.6"
                  fill="#fff"
                />
              );
            })}
          </svg>
          <div className="mt-1 flex justify-between text-[9px] text-white/35">
            <span>Jan</span>
            <span>Apr</span>
            <span>Jul</span>
            <span>Oct</span>
            <span>Dec</span>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-2 gap-2.5">
          {[
            { l: "Fintech", b: 86 },
            { l: "Healthtech", b: 64 },
            { l: "Climate", b: 48 },
            { l: "B2B SaaS", b: 92 },
          ].map((row) => (
            <div
              key={row.l}
              className="rounded-md bg-white/[0.02] px-2.5 py-1.5"
            >
              <div className="flex items-baseline justify-between text-[11px]">
                <span className="text-white/75">{row.l}</span>
                <span className="text-white/35">{row.b}</span>
              </div>
              <div className="mt-1 h-1 w-full overflow-hidden rounded-full bg-white/[0.04]">
                <div
                  className="h-full rounded-full bg-[#C5FF3D]"
                  style={{ width: `${(row.b / 100) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- KUBEAI ----------------------------- */
function KubeaiUI() {
  return (
    <div className="flex h-full">
      <aside className="hidden w-40 shrink-0 flex-col gap-1 border-r border-white/[0.06] bg-white/[0.015] p-4 lg:flex">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/80">
          <span className="grid h-4 w-4 place-items-center rounded-sm bg-[#C5FF3D]/15 text-[8px] font-bold text-[#C5FF3D]">
            K
          </span>
          kubeai-ops
        </div>
        {[
          { l: "Clusters", a: false },
          { l: "Incidents", a: true },
          { l: "Root cause", a: false },
          { l: "ChatOps", a: false },
          { l: "Policies", a: false },
        ].map((it) => (
          <div
            key={it.l}
            className={`rounded px-2 py-1.5 text-[11px] ${
              it.a ? "text-[#C5FF3D]" : "text-white/45"
            }`}
            style={{
              background: it.a ? "rgba(197,255,61,0.12)" : "transparent",
            }}
          >
            {it.l}
          </div>
        ))}
      </aside>

      <div className="flex-1 p-5 sm:p-6">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-[10px] uppercase tracking-widest text-white/40">
              cluster · prod-eu-west
            </div>
            <div className="mt-1 text-base font-medium text-white sm:text-lg">
              CrashLoopBackOff · payment-svc
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-orange-400/40 bg-orange-400/8 px-2.5 py-1 text-[10px] text-orange-300">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-orange-400" />
            P1 · firing 4m
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-[#C5FF3D]/30 bg-[#C5FF3D]/4 p-3">
          <div className="flex items-baseline justify-between">
            <div className="text-[10px] uppercase tracking-widest text-[#C5FF3D]">
              root cause · multi-llm consensus
            </div>
            <div className="text-[10px] text-white/40">2/3 agree</div>
          </div>
          <p className="mt-2 text-xs leading-relaxed text-white/80">
            OOM after 3rd pod restart. Memory limit{" "}
            <span className="text-[#C5FF3D]">256Mi</span> too tight for
            request payload p99. Suggested fix: raise limit to{" "}
            <span className="text-[#C5FF3D]">512Mi</span> + investigate
            unbounded JSON in /webhooks.
          </p>
          <div className="mt-3 flex gap-2">
            <button
              type="button"
              className="rounded-md bg-[#C5FF3D] px-2.5 py-1 text-[10px] font-medium text-black"
            >
              Auto-remediate
            </button>
            <button
              type="button"
              className="rounded-md border border-white/[0.08] px-2.5 py-1 text-[10px] text-white/65"
            >
              Open in Slack
            </button>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-2.5">
          {[
            { l: "GPT-4o", c: "matched" },
            { l: "Anthropic", c: "matched" },
            { l: "Llama 3", c: "different" },
          ].map((m) => (
            <div
              key={m.l}
              className="rounded-md bg-white/[0.02] p-2.5"
            >
              <div className="text-[10px] uppercase tracking-widest text-white/40">
                {m.l}
              </div>
              <div
                className="mt-1 text-[11px]"
                style={{
                  color:
                    m.c === "matched"
                      ? "#C5FF3D"
                      : "rgba(255,255,255,0.5)",
                }}
              >
                {m.c}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.06] bg-black/30 p-2.5 font-mono text-[10px] leading-[1.5] text-white/55">
          <div>
            <span className="text-white/35">[detect]</span> CrashLoopBackOff
            payment-svc · ns=prod · 4m
          </div>
          <div>
            <span className="text-white/35">[analyze]</span> 3 LLMs · 1.8s
            consensus
          </div>
          <div>
            <span className="text-[#C5FF3D]">[remediate]</span> memory limit
            256Mi → 512Mi · rollout/patch
          </div>
        </div>
      </div>
    </div>
  );
}
