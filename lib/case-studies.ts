export type CaseStudyStat = {
  k: string;
  v: string;
};

export type CaseStudy = {
  slug: string;
  client: string;
  title: string;
  year: string;
  role: string;
  oneLiner: string;
  aside?: string;
  problem: string;
  approach: string;
  tradeoff?: string;
  result: string;
  stack: string[];
  stats: CaseStudyStat[];
  coverKind: "kubeai" | "clustercanary" | "openwrist";
  isPublic: boolean;
  link?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "cluster-canary",
    client: "Open source",
    title: "Predicting Kubernetes failures before they page you",
    year: "2026",
    role: "Sole author · public",
    oneLiner:
      "ML system that predicts OOMKill and CrashLoopBackOff up to 30 minutes ahead — calibrated failure probabilities with SHAP explanations, served as an in-cluster gRPC sidecar.",
    aside:
      "The hard part isn't the model. It's proving the features don't leak the future.",
    problem:
      "Kubernetes tells you a pod is failing only once it already has. By the time OOMKill or CrashLoopBackOff fires, the incident is live and the on-call engineer is reacting, not preventing. The signal to see it coming is in the metrics — memory pressure trends, restart cadence, request-latency drift — but nobody's watching it early enough.",
    approach:
      "Built a forecasting pipeline on pod-level Prometheus metrics: LightGBM for the core classifier, PyTorch for sequence features, Optuna for tuning, SHAP for per-prediction explanations. Strict leakage detection and Great Expectations data checks keep the training set honest. Serving is a BentoML gRPC sidecar tuned for p95 < 50ms, with Evidently drift detection triggering champion/challenger retrains through Prefect. Validated on chaos-mesh synthetic traces and real Alibaba 2018 production data.",
    tradeoff:
      "A 30-minute horizon trades lead time for confidence — predict too early and precision collapses into alert fatigue; too late and there's no time to act. The decision threshold is the real knob: it's calibrated per-cluster, not hardcoded.",
    result:
      "Open source, public on GitHub. Emits calibrated failure probability with the top-3 contributing features, routes to PagerDuty / kubeai-ops for automated response, and retrains itself on drift. Phases 1–5 (data pipeline, features, modeling, serving) code-complete.",
    stack: [
      "Python",
      "LightGBM",
      "PyTorch",
      "BentoML · gRPC",
      "Prefect",
      "Prometheus",
      "Kubernetes",
    ],
    stats: [
      { k: "30m", v: "ahead of failure" },
      { k: "<50ms", v: "p95 inference" },
      { k: "SHAP", v: "top-3 features" },
    ],
    coverKind: "clustercanary",
    isPublic: true,
    link: "https://github.com/sharankumarreddyk/cluster-canary",
  },
  {
    slug: "openwrist",
    client: "Open source",
    title: "An open-source smartwatch that speaks iPhone natively",
    year: "2026",
    role: "Sole author · public",
    oneLiner:
      "ESP32-S3 smartwatch that pairs to an iPhone over BLE using Apple's own ANCS/CTS/AMS services — notifications, calls, time, and music with no App Store app and no paid developer account.",
    aside:
      "Turns out iOS will talk to you for free — if you speak its native BLE dialect.",
    problem:
      "Every hobbyist smartwatch that wants iPhone notifications hits the same wall: Apple's App Store gate and a $99/year developer account just to ship a companion app. Most projects give up and target Android, or fake it with a flaky always-on connection.",
    approach:
      "Skipped the App Store entirely by speaking Apple's native BLE services — ANCS for notifications and caller ID, CTS for time sync, AMS for music control. Firmware is ESP-IDF + ESP-Brookesia + LVGL in C on an ESP32-S3 with touch display, IMU, and BLE. A SwiftUI companion app (CoreBluetooth + HealthKit) layers on step sync, weather, and over-the-air firmware updates — plus TOTP, sleep tracking, and gesture controls.",
    tradeoff:
      "Native BLE services mean zero App Store friction but hard limits — you get exactly the data Apple exposes, no more. The companion app fills the gaps, but the core watch stays useful even with nothing installed.",
    result:
      "Open source (MIT), public on GitHub. Core BLE protocol and portable firmware tested; companion app functional. On-device hardware bring-up pending physical board availability.",
    stack: [
      "C",
      "ESP-IDF",
      "LVGL",
      "SwiftUI",
      "CoreBluetooth",
      "HealthKit",
      "BLE",
    ],
    stats: [
      { k: "BLE", v: "native ANCS/CTS/AMS" },
      { k: "iOS", v: "no App Store app" },
      { k: "MIT", v: "open source" },
    ],
    coverKind: "openwrist",
    isPublic: true,
    link: "https://github.com/sharankumarreddyk/openwrist",
  },
  {
    slug: "kubeai-ops",
    client: "Open source",
    title: "AI incident response for Kubernetes",
    year: "2026",
    role: "Sole author · public",
    oneLiner:
      "Detects K8s issues, runs multi-LLM root-cause analysis, auto-remediates. ChatOps, PagerDuty, RBAC, real-time dashboard.",
    aside:
      "Started as a weekend rabbit hole. Now I run it on my own cluster.",
    problem:
      "Kubernetes incident response is a human-bottleneck job: when a CrashLoopBackOff fires at 3am, the on-call engineer is running through the same root-cause checklist they ran last week. The LLM cost of just asking 'why is this pod failing?' is < $0.01.",
    approach:
      "Built a detection + analysis loop that hooks into cluster events, runs root-cause against multiple LLM providers (GPT, Anthropic, local Ollama for air-gapped clusters), and either auto-remediates known patterns or routes to ChatOps (Slack / Discord / Teams). RBAC-gated auto-remediation, with PagerDuty + Jira integrations and an ML-based pattern-learning layer.",
    tradeoff:
      "LLM cost vs human time saved is non-obvious for low-volume clusters. Ollama path means air-gapped operation but lower analysis quality — explicit tier selection per environment.",
    result:
      "Open source, public on GitHub. Python core + Svelte/TypeScript dashboard + Terraform for cluster install. Designed to plug into existing observability stacks rather than replace them.",
    stack: [
      "Python",
      "Svelte",
      "TypeScript",
      "Terraform",
      "Kubernetes",
      "Multi-LLM",
    ],
    stats: [
      { k: "OSS", v: "public repo" },
      { k: "Multi-LLM", v: "GPT · Anthropic · Ollama" },
      { k: "K8s-native", v: "auto-remediation" },
    ],
    coverKind: "kubeai",
    isPublic: true,
    link: "https://github.com/sharankumarreddyk/kubeai-ops",
  },
];
