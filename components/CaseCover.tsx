"use client";

type Kind = "kubeai" | "clustercanary" | "openwrist";

export default function CaseCover({ kind }: { kind: Kind }) {
  return (
    <div className="relative aspect-[5/4] w-full">
      <BrowserFrame>
        {kind === "clustercanary" ? <ClusterCanaryUI /> : null}
        {kind === "openwrist" ? <OpenWristUI /> : null}
        {kind === "kubeai" ? <KubeaiUI /> : null}
      </BrowserFrame>
    </div>
  );
}

function BrowserFrame({
  children,
}: {
  children: React.ReactNode;
  domain?: string;
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#0d0d0d]">
      <div className="relative flex-1 overflow-hidden">{children}</div>
    </div>
  );
}

/* ------------------------- CLUSTER-CANARY ------------------------- */
function ClusterCanaryUI() {
  const pods = [
    { l: "payment-svc-7d4f", p: 0.91, eta: "~18m", risk: true },
    { l: "checkout-api-9b2", p: 0.63, eta: "~26m", risk: true },
    { l: "search-idx-3ac1", p: 0.28, eta: "—", risk: false },
    { l: "auth-gw-5e8d", p: 0.11, eta: "—", risk: false },
  ];
  return (
    <div className="flex h-full">
      <aside className="hidden w-40 shrink-0 flex-col gap-1 border-r border-white/[0.06] bg-white/[0.015] p-4 lg:flex">
        <div className="mb-3 flex items-center gap-2 text-xs font-medium text-white/80">
          <span className="grid h-4 w-4 place-items-center rounded-sm bg-[#C5FF3D]/15 text-[8px] font-bold text-[#C5FF3D]">
            C
          </span>
          cluster-canary
        </div>
        {[
          { l: "Forecast", a: true },
          { l: "Pods", a: false },
          { l: "Features", a: false },
          { l: "Drift", a: false },
          { l: "Retrain", a: false },
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
              failure forecast · prod-eu-west
            </div>
            <div className="mt-1 text-base font-medium text-white sm:text-lg">
              OOMKill predicted · ~18m
            </div>
          </div>
          <div className="flex items-center gap-2 rounded-full border border-[#C5FF3D]/40 bg-[#C5FF3D]/8 px-2.5 py-1 text-[10px] text-[#C5FF3D]">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#C5FF3D]" />
            p95 42ms
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-1.5">
          {pods.map((pod) => (
            <div
              key={pod.l}
              className="flex items-center gap-2.5 rounded-md bg-white/[0.02] px-2.5 py-1.5"
            >
              <span className="w-28 shrink-0 truncate font-mono text-[10px] text-white/70">
                {pod.l}
              </span>
              <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                <div
                  className="h-full rounded-full"
                  style={{
                    width: `${pod.p * 100}%`,
                    background: pod.risk
                      ? "#C5FF3D"
                      : "rgba(255,255,255,0.25)",
                  }}
                />
              </div>
              <span
                className="w-8 shrink-0 text-right font-mono text-[10px]"
                style={{ color: pod.risk ? "#C5FF3D" : "rgba(255,255,255,0.4)" }}
              >
                {pod.p.toFixed(2)}
              </span>
              <span className="w-9 shrink-0 text-right font-mono text-[9px] text-white/35">
                {pod.eta}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-4 rounded-lg border border-[#C5FF3D]/30 bg-[#C5FF3D]/4 p-3">
          <div className="text-[10px] uppercase tracking-widest text-[#C5FF3D]">
            top-3 SHAP features · payment-svc
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {[
              { l: "mem_working_set / limit", w: 0.82 },
              { l: "restart_count Δ5m", w: 0.57 },
              { l: "req_latency_p99 drift", w: 0.41 },
            ].map((f) => (
              <div key={f.l} className="flex items-center gap-2">
                <span className="w-40 shrink-0 font-mono text-[10px] text-white/70">
                  {f.l}
                </span>
                <div className="h-1 flex-1 overflow-hidden rounded-full bg-white/[0.05]">
                  <div
                    className="h-full rounded-full bg-[#C5FF3D]"
                    style={{ width: `${f.w * 100}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 rounded-lg border border-white/[0.06] bg-black/30 p-2.5 font-mono text-[10px] leading-[1.5] text-white/55">
          <div>
            <span className="text-white/35">[predict]</span> payment-svc ·{" "}
            <span className="text-[#C5FF3D]">p=0.91</span> OOMKill · horizon 18m
          </div>
          <div>
            <span className="text-white/35">[serve]</span> bentoml gRPC · p95
            42ms
          </div>
          <div>
            <span className="text-[#C5FF3D]">[route]</span> pagerduty +
            kubeai-ops
          </div>
        </div>
      </div>
    </div>
  );
}

/* ----------------------------- OPENWRIST ----------------------------- */
function OpenWristUI() {
  return (
    <div className="flex h-full items-center justify-center p-5 sm:p-6">
      <div className="flex w-full max-w-[300px] items-center gap-5">
        {/* Watch */}
        <div className="relative shrink-0">
          <div className="h-[150px] w-[122px] rounded-[26px] border border-white/[0.12] bg-black p-3 shadow-[0_0_0_3px_rgba(255,255,255,0.03)]">
            <div className="flex h-full flex-col rounded-[16px] bg-[#080808] p-3">
              <div className="flex items-center justify-between text-[9px] text-white/45">
                <span className="flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#C5FF3D]" />
                  BLE
                </span>
                <span>87%</span>
              </div>
              <div className="mt-2 font-mono text-[28px] leading-none text-white">
                9:41
              </div>
              <div className="text-[9px] uppercase tracking-widest text-white/40">
                Wed · 20 Aug
              </div>
              <div className="mt-auto rounded-lg bg-[#C5FF3D]/10 p-1.5">
                <div className="text-[8px] uppercase tracking-widest text-[#C5FF3D]">
                  Messages
                </div>
                <div className="truncate text-[10px] text-white/80">
                  Mom · Call me when free
                </div>
              </div>
              <div className="mt-1.5 flex items-center justify-between text-[9px] text-white/55">
                <span>👣 6,204</span>
                <span className="text-[#C5FF3D]">♪</span>
              </div>
            </div>
          </div>
          {/* crown */}
          <div className="absolute -right-1 top-10 h-6 w-1.5 rounded-full bg-white/15" />
        </div>

        {/* BLE service log */}
        <div className="flex-1">
          <div className="text-[10px] uppercase tracking-widest text-white/40">
            iPhone · native BLE
          </div>
          <div className="mt-2 flex flex-col gap-1.5">
            {[
              { s: "ANCS", d: "notifications + caller ID" },
              { s: "CTS", d: "current time sync" },
              { s: "AMS", d: "music control" },
            ].map((row) => (
              <div
                key={row.s}
                className="rounded-md bg-white/[0.02] px-2.5 py-1.5"
              >
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[10px] text-[#C5FF3D]">
                    {row.s}
                  </span>
                  <span className="h-1 w-1 rounded-full bg-[#C5FF3D]" />
                  <span className="text-[9px] text-white/35">paired</span>
                </div>
                <div className="mt-0.5 text-[10px] text-white/65">{row.d}</div>
              </div>
            ))}
          </div>
          <div className="mt-2 rounded-md border border-white/[0.06] bg-black/30 px-2.5 py-1.5 font-mono text-[9px] text-white/50">
            no App Store app · ESP32-S3
          </div>
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
