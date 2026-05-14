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
  coverKind: "jahopp" | "sisp" | "kubeai";
  isPublic: boolean;
  link?: string;
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "jahopp-ai",
    client: "Indpro · Jahopp",
    title: "AI course generation that survives real users",
    year: "2025 — present",
    role: "Lead engineer · AI service",
    oneLiner:
      "Multi-service AI learning platform — built the course-generation pipeline, RAG ingestion, image relevance scoring, and per-company token quotas.",
    aside:
      "Spent way too long tuning the image-relevance threshold. Worth it.",
    problem:
      "AI-generated courses were producing cover images that were technically valid but contextually off — a 'cooking' lesson getting a chef hat icon when learners wanted a kitchen scene. Confidence floors were too permissive and the cover-image acceptance rate was hurting course quality scores.",
    approach:
      "Built an image-relevance scoring layer on top of the LLM output. Raised the confidence floor from 0.4 → 0.6 and introduced 'intelligently select best uploaded image as cover' fallback. Wrapped scanned PDFs in an OCR pipeline (Tesseract, replacing PaddleOCR for compatibility). Introduced per-company token quotas with fail-open behaviour so service degradation never blocks paying customers.",
    tradeoff:
      "Tighter relevance floor filters some valid images. Accepted — better to surface the upload picker than to ship an off-brand cover. Token quotas trade strict cost control for never-block UX; we drain pending writes on the way down.",
    result:
      "Cover-image acceptance rate up meaningfully. Quota system handles per-company daily limits with bypass for in-progress resumes. 270+ PRs over the life of the AI service; service ships to production weekly.",
    stack: [
      "Python",
      "FastAPI",
      "OpenAI · gpt-image-2",
      "Qdrant",
      "Tesseract OCR",
      "RAG",
    ],
    stats: [
      { k: "270+", v: "PRs merged" },
      { k: "0.6", v: "confidence floor" },
      { k: "Daily", v: "ship cadence" },
    ],
    coverKind: "jahopp",
    isPublic: false,
  },
  {
    slug: "sisp-sweden",
    client: "Indpro · SISP Sweden",
    title: "Startup-ecosystem analytics, rebuilt on ESNA",
    year: "2025 — 2026",
    role: "Full-stack · data + web",
    oneLiner:
      "Public-facing analytics surface for the Swedish startup ecosystem. Migrated taxonomy, hardened performance, shipped 20+ materialized views.",
    aside:
      "Felt like rewiring a building while people were still inside it.",
    problem:
      "The platform's industry classification was inherited from Crunchbase taxonomy — proprietary, expensive, and a poor fit for Swedish public-sector reporting. KPI views were slow enough to trigger Sentry timeouts on /scaleups and /industries.",
    approach:
      "Cut the dependency: migrated web's industry + focus-area views from Crunchbase to ESNA (the Swedish public taxonomy) in a single zero-downtime PR. Materialized the six slowest KPI/chart views to fix the Sentry-tracked p95 regressions. Added defensive safety nets for blank Explore-Categories grids and capped year axes at closed fiscal years.",
    tradeoff:
      "Materialized views mean stale data during refresh windows — accepted because the views are aggregate/historical, and we control refresh cadence.",
    result:
      "Industries page renders without the long-tail timeout that was paging Sentry. Capital-distribution-concentration views ship under 200ms. Materialized views now back: investments redesign, focus-area unicorn count, scaleup growth-trajectory cohorts.",
    stack: [
      "Next.js",
      "Supabase",
      "PostgreSQL",
      "Materialized Views",
      "Vercel",
      "Sentry",
    ],
    stats: [
      { k: "20+", v: "materialized views" },
      { k: "0", v: "downtime on migrate" },
      { k: "Sentry", v: "p95 regressions cleared" },
    ],
    coverKind: "sisp",
    isPublic: false,
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
