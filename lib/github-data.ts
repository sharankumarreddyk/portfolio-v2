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
  { owner: "indpro-blr", name: "jahopp-ai", commits: 45, label: "AI service" },
  {
    owner: "indpro-blr",
    name: "jahopp-backend",
    commits: 39,
    label: "platform API",
  },
  { owner: "sisp-sweden", name: "ssn-web", commits: 26, label: "analytics web" },
  {
    owner: "sisp-sweden",
    name: "ssn-database",
    commits: 21,
    label: "data layer",
  },
  {
    owner: "indpro-blr",
    name: "jahopp-admin",
    commits: 23,
    label: "admin app",
  },
  {
    owner: "sisp-sweden",
    name: "ignite-magic-2.0",
    commits: 20,
    label: "matching",
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
    repo: "indpro-blr/jahopp-ai",
    msg: "fix: bump image-fetch timeout 30s → 90s to prevent lost images",
  },
  {
    date: "2026-05-13T11:17:26+05:30",
    repo: "indpro-blr/jahopp-backend",
    msg: "feat: company status + auth hooks",
  },
  {
    date: "2026-05-12T17:52:37+05:30",
    repo: "indpro-blr/jahopp-ai",
    msg: "feat: switch image generation default to gpt-image-2",
  },
  {
    date: "2026-05-12T16:24:30+05:30",
    repo: "indpro-blr/jahopp-ai",
    msg: "feat: bypass quota gate on resume requests so in-progress courses complete",
  },
  {
    date: "2026-05-11T15:19:24+05:30",
    repo: "indpro-blr/jahopp-backend",
    msg: "feat: per-company AI token quota on user service",
  },
];

export const stats = {
  contributions12mo: totalContributions,
  activeRepos: 7,
  productsShipped: 6,
  prsLast30d: 50,
  languages: ["TypeScript", "Python", "JavaScript", "SQL"],
  primaryOrg: "indpro-blr",
};

export const lastShipped = recentCommits[0];

export type Stats = typeof stats;
