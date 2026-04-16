export type Contribution = {
  title: string;
  url: string;
  state: "merged" | "closed" | "open";
  createdAt: string;
};

export type RepoContributions = {
  repo: string;
  repoUrl: string;
  ownerAvatar: string;
  stars: number;
  prs: Contribution[];
};

type GitHubSearchItem = {
  title: string;
  html_url: string;
  state: string;
  created_at: string;
  pull_request?: {
    merged_at: string | null;
  };
  repository_url: string;
};

type GitHubSearchResponse = {
  items: GitHubSearchItem[];
};

const GITHUB_USERNAME = process.env.NEXT_PUBLIC_GITHUB_USERNAME;

export async function fetchExternalContributions(): Promise<
  RepoContributions[]
> {
  try {
    const res = await fetch(
      `https://api.github.com/search/issues?q=author:${GITHUB_USERNAME}+type:pr&per_page=100`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 86400 },
      },
    );

    if (!res.ok) return [];

    const data: GitHubSearchResponse = await res.json();

    const grouped = new Map<string, RepoContributions>();

    for (const item of data.items) {
      const repoFullName = item.repository_url.replace(
        "https://api.github.com/repos/",
        "",
      );
      const [owner] = repoFullName.split("/");

      if (owner === GITHUB_USERNAME) continue;

      const state: Contribution["state"] = item.pull_request?.merged_at
        ? "merged"
        : item.state === "open"
          ? "open"
          : "closed";

      if (state === "closed") continue;

      const pr: Contribution = {
        title: item.title,
        url: item.html_url,
        state,
        createdAt: item.created_at,
      };

      if (!grouped.has(repoFullName)) {
        grouped.set(repoFullName, {
          repo: repoFullName,
          repoUrl: `https://github.com/${repoFullName}`,
          ownerAvatar: `https://github.com/${owner}.png`,
          stars: 0,
          prs: [],
        });
      }

      grouped.get(repoFullName)!.prs.push(pr);
    }

    const repos = Array.from(grouped.values());
    await Promise.all(
      repos.map(async (repo) => {
        try {
          const res = await fetch(`https://api.github.com/repos/${repo.repo}`, {
            headers: { Accept: "application/vnd.github.v3+json" },
            next: { revalidate: 86400 },
          });
          if (res.ok) {
            const data = await res.json();
            repo.stars = data.stargazers_count ?? 0;
          }
        } catch {
          // stars default to 0
        }
      }),
    );

    return repos;
  } catch {
    return [];
  }
}
