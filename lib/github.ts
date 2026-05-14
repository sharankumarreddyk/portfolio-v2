import "server-only";

import {
  recentCommits as staticRecent,
  topRepos as staticTopRepos,
  weeks as staticWeeks,
  totalContributions as staticTotal,
  stats as staticStats,
  type TopRepo,
  type RecentCommit,
  type Week,
} from "./github-data";

const USER = "sharankumarreddyk";
export const REVALIDATE_SECONDS = 3600;

export type GitHubLiveData = {
  weeks: Week[];
  totalContributions: number;
  topRepos: TopRepo[];
  recentCommits: RecentCommit[];
  stats: {
    contributions12mo: number;
    activeRepos: number;
    prsLast30d: number;
  };
  source: "live" | "cache";
  fetchedAt: string;
};

const FALLBACK: GitHubLiveData = {
  weeks: staticWeeks,
  totalContributions: staticTotal,
  topRepos: staticTopRepos,
  recentCommits: staticRecent,
  stats: staticStats,
  source: "cache",
  fetchedAt: new Date(0).toISOString(),
};

type GraphQLDay = { contributionCount: number; date: string };
type GraphQLWeek = { contributionDays: GraphQLDay[] };

type SearchCommitItem = {
  repository: { full_name: string };
  commit: { author: { date: string }; message: string };
};

export async function fetchGitHubData(): Promise<GitHubLiveData> {
  const token = process.env.GITHUB_TOKEN;
  if (!token) return FALLBACK;

  try {
    const [calendar, search, prs] = await Promise.allSettled([
      fetchCalendar(token),
      fetchRecentCommits(token),
      fetchMergedPRsLast30Days(token),
    ]);

    const cal =
      calendar.status === "fulfilled" ? calendar.value : null;
    const searchData =
      search.status === "fulfilled" ? search.value : null;
    const prCount =
      prs.status === "fulfilled" ? prs.value : null;

    if (!cal && !searchData) return FALLBACK;

    return {
      weeks: cal?.weeks ?? staticWeeks,
      totalContributions: cal?.total ?? staticTotal,
      topRepos: searchData?.topRepos ?? staticTopRepos,
      recentCommits: searchData?.recentCommits ?? staticRecent,
      stats: {
        contributions12mo: cal?.total ?? staticTotal,
        activeRepos: Math.max(
          searchData?.topRepos.length ?? 0,
          staticStats.activeRepos
        ),
        prsLast30d: prCount ?? staticStats.prsLast30d,
      },
      source: "live",
      fetchedAt: new Date().toISOString(),
    };
  } catch {
    return FALLBACK;
  }
}

async function fetchCalendar(token: string) {
  const r = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: `query {
        user(login: "${USER}") {
          contributionsCollection {
            contributionCalendar {
              totalContributions
              weeks {
                contributionDays { contributionCount date }
              }
            }
          }
        }
      }`,
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  });

  if (!r.ok) throw new Error(`graphql ${r.status}`);
  const j = (await r.json()) as {
    data?: {
      user?: {
        contributionsCollection?: {
          contributionCalendar?: {
            totalContributions: number;
            weeks: GraphQLWeek[];
          };
        };
      };
    };
  };

  const c = j.data?.user?.contributionsCollection?.contributionCalendar;
  if (!c) throw new Error("no calendar");

  return {
    total: c.totalContributions,
    weeks: c.weeks.map((w) => ({
      d: w.contributionDays.map((d) => ({
        c: d.contributionCount,
        d: d.date,
      })),
    })),
  };
}

async function fetchRecentCommits(token: string) {
  const r = await fetch(
    `https://api.github.com/search/commits?q=author:${USER}&sort=author-date&order=desc&per_page=100`,
    {
      headers: {
        Authorization: `bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    }
  );
  if (!r.ok) throw new Error(`search ${r.status}`);

  const j = (await r.json()) as { items?: SearchCommitItem[] };
  const items = j.items ?? [];
  if (!items.length) throw new Error("no items");

  const byRepo = new Map<string, number>();
  for (const it of items) {
    const repo = it.repository.full_name;
    byRepo.set(repo, (byRepo.get(repo) ?? 0) + 1);
  }
  const topRepos: TopRepo[] = Array.from(byRepo.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 6)
    .map(([repo, count]) => {
      const [owner, name] = repo.split("/");
      return { owner, name, commits: count, label: "" };
    });

  const recentCommits: RecentCommit[] = items
    .slice(0, 5)
    .map((it) => ({
      date: it.commit.author.date,
      repo: it.repository.full_name,
      msg: it.commit.message.split("\n")[0],
    }));

  return { topRepos, recentCommits };
}

async function fetchMergedPRsLast30Days(token: string) {
  const since = new Date();
  since.setUTCDate(since.getUTCDate() - 30);
  const q = `author:${USER}+is:pr+is:merged+merged:>=${since.toISOString().slice(0, 10)}`;
  const r = await fetch(
    `https://api.github.com/search/issues?q=${q}&per_page=1`,
    {
      headers: {
        Authorization: `bearer ${token}`,
        Accept: "application/vnd.github+json",
      },
      next: { revalidate: REVALIDATE_SECONDS },
    }
  );
  if (!r.ok) throw new Error(`prs ${r.status}`);
  const j = (await r.json()) as { total_count?: number };
  return j.total_count ?? 0;
}
