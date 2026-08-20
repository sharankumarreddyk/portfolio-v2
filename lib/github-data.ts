import raw from "./heatmap.json";

export type Day = { c: number; d: string };
export type Week = { d: Day[] };

export const totalContributions: number = raw.totalContributions;
export const weeks: Week[] = raw.weeks;

export type TopRepo = {
  name: string;
  owner: string;
  commits: number;
  label: string;
};

export const topRepos: TopRepo[] = [
  {
    owner: "sharankumarreddyk",
    name: "cluster-canary",
    commits: 45,
    label: "K8s failure ML",
  },
  {
    owner: "sharankumarreddyk",
    name: "openwrist",
    commits: 39,
    label: "watch firmware",
  },
  {
    owner: "sharankumarreddyk",
    name: "kubeai-ops",
    commits: 26,
    label: "AI incident response",
  },
  {
    owner: "sharankumarreddyk",
    name: "AI-Skills",
    commits: 21,
    label: "AI experiments",
  },
  {
    owner: "sharankumarreddyk",
    name: "RestaurantOS",
    commits: 20,
    label: "full-stack",
  },
  {
    owner: "sharankumarreddyk",
    name: "openwrist-ios",
    commits: 18,
    label: "companion app",
  },
];

export type RecentCommit = {
  date: string;
  repo: string;
  msg: string;
};

export const recentCommits: RecentCommit[] = [
  {
    date: "2026-05-13T15:18:17+05:30",
    repo: "sharankumarreddyk/cluster-canary",
    msg: "feat: leakage guard on rolling-window features before training",
  },
  {
    date: "2026-05-13T11:17:26+05:30",
    repo: "sharankumarreddyk/openwrist",
    msg: "feat: ANCS notification source + caller ID parsing over BLE",
  },
  {
    date: "2026-05-12T17:52:37+05:30",
    repo: "sharankumarreddyk/cluster-canary",
    msg: "perf: trim BentoML gRPC sidecar to p95 < 50ms",
  },
  {
    date: "2026-05-12T16:24:30+05:30",
    repo: "sharankumarreddyk/openwrist",
    msg: "feat: CTS time sync + AMS music control on the watch face",
  },
  {
    date: "2026-05-11T15:19:24+05:30",
    repo: "sharankumarreddyk/kubeai-ops",
    msg: "feat: RBAC-gated auto-remediation for known CrashLoop patterns",
  },
];

export const stats = {
  contributions12mo: totalContributions,
  activeRepos: 7,
  productsShipped: 6,
  prsLast30d: 50,
  languages: ["TypeScript", "Python", "C", "SQL"],
  primaryOrg: "sharankumarreddyk",
};

export const lastShipped = recentCommits[0];

export type Stats = typeof stats;
