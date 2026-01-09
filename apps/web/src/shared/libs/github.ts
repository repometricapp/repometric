type GitHubRepo = {
  name: string;
  full_name: string;
  html_url: string;
  private: boolean;
  open_issues_count: number;
  pushed_at: string | null;
  updated_at: string;
};

type GitHubUser = {
  login: string;
  name: string | null;
};

type GitHubOrg = {
  login: string;
};

type WorkflowRun = {
  run_started_at: string | null;
  updated_at: string | null;
  status: string | null;
  conclusion: string | null;
};

type WorkflowRunsResponse = {
  workflow_runs: WorkflowRun[];
};

export type RepoHealth = "healthy" | "watch" | "risk";

export type RepoSummary = {
  name: string;
  isPrivate: boolean;
  repoUrl: string;
  health: RepoHealth;
  pipeline: string;
  avgRuntime: string;
  avgSeconds: number;
  openIssues: number;
  openPrs: number;
  actionsMinutes: number;
  lastCommit: string;
  lastCommitAt: number;
};

export type OrgOption = {
  id: string;
  label: string;
  type: "org" | "personal";
};

export type DashboardData = {
  userName: string;
  orgName: string;
  orgOptions: OrgOption[];
  selectedOrgId: string;
  repos: RepoSummary[];
  pipelineSeries: { label: string; minutes: number; successRate: number }[];
};

const API_BASE = "https://api.github.com";

async function githubFetch<T>(path: string, token: string): Promise<T> {
  const response = await fetch(`${API_BASE}${path}`, {
    headers: {
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28"
    },
    cache: "no-store"
  });

  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status}`);
  }

  return (await response.json()) as T;
}

async function getOpenPullsCount(owner: string, repo: string, token: string) {
  const response = await fetch(
    `${API_BASE}/repos/${owner}/${repo}/pulls?state=open&per_page=1`,
    {
      headers: {
        Accept: "application/vnd.github+json",
        Authorization: `Bearer ${token}`,
        "X-GitHub-Api-Version": "2022-11-28"
      },
      cache: "no-store"
    }
  );

  if (!response.ok) {
    return 0;
  }

  const link = response.headers.get("link");
  if (!link) {
    const data = (await response.json()) as unknown[];
    return data.length;
  }

  const match = link.match(/&page=(\d+)>; rel="last"/);
  if (!match) {
    const data = (await response.json()) as unknown[];
    return data.length;
  }

  return Number.parseInt(match[1], 10);
}

function formatDuration(seconds: number) {
  const minutes = Math.max(Math.round(seconds / 60), 0);
  const mins = Math.floor(minutes);
  const secs = Math.round(seconds % 60);
  if (mins <= 0) {
    return `${secs}s`;
  }
  return `${mins}m ${secs}s`;
}

function formatRelativeTime(iso: string | null) {
  if (!iso) {
    return "unknown";
  }
  const diffMs = Date.now() - new Date(iso).getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 60) {
    return `${diffMins} minutes ago`;
  }
  const diffHours = Math.floor(diffMins / 60);
  if (diffHours < 24) {
    return `${diffHours} hours ago`;
  }
  const diffDays = Math.floor(diffHours / 24);
  return `${diffDays} days ago`;
}

function mapPipelineStatus(run: WorkflowRun | undefined) {
  if (!run) {
    return "No runs";
  }
  if (run.status !== "completed") {
    return "Running";
  }
  if (run.conclusion === "success") {
    return "Passing";
  }
  if (run.conclusion === "failure" || run.conclusion === "cancelled") {
    return "Failing";
  }
  return "Flaky";
}

function mapHealth(pipeline: string, openIssues: number) {
  if (pipeline === "Failing" || openIssues >= 12) {
    return "risk";
  }
  if (pipeline === "Flaky" || openIssues >= 6) {
    return "watch";
  }
  return "healthy";
}

export async function getDashboardData(
  token: string,
  selectedOrgId?: string
): Promise<DashboardData> {
  const user = await githubFetch<GitHubUser>("/user", token);
  const orgs = await githubFetch<GitHubOrg[]>("/user/orgs?per_page=50", token);

  const orgOptions: OrgOption[] = [
    { id: "__personal", label: `${user.login} (Personal)`, type: "personal" },
    ...orgs.map((org) => ({ id: org.login, label: org.login, type: "org" }))
  ];

  const fallbackOrgId = orgs[0]?.login ?? "__personal";
  const resolvedOrgId = orgOptions.some((option) => option.id === selectedOrgId)
    ? selectedOrgId!
    : fallbackOrgId;
  const isPersonal = resolvedOrgId === "__personal";
  const orgName =
    orgOptions.find((option) => option.id === resolvedOrgId)?.label ?? resolvedOrgId;

  const repos = !isPersonal
    ? await githubFetch<GitHubRepo[]>(
        `/orgs/${resolvedOrgId}/repos?per_page=50&sort=updated`,
        token
      )
    : await githubFetch<GitHubRepo[]>(
        "/user/repos?affiliation=owner&per_page=50&sort=updated",
        token
      );

  const selectedRepos = repos.slice(0, 12);
  let pipelineSeries: { label: string; minutes: number; successRate: number }[] = [];

  const repoSummaries = await Promise.all(
    selectedRepos.map(async (repo, index) => {
      const [owner, repoName] = repo.full_name.split("/");
      const [runs, openPrs] = await Promise.all([
        githubFetch<WorkflowRunsResponse>(
          `/repos/${owner}/${repoName}/actions/runs?per_page=5`,
          token
        ),
        getOpenPullsCount(owner, repoName, token)
      ]);

      if (pipelineSeries.length === 0 && runs.workflow_runs.length > 0) {
        pipelineSeries = runs.workflow_runs.slice(0, 5).map((run, runIndex) => {
          const startedAt = run.run_started_at
            ? new Date(run.run_started_at)
            : null;
          const label = startedAt
            ? startedAt.toLocaleDateString("en-US", { weekday: "short" })
            : `Run ${runIndex + 1}`;
          const durationSeconds =
            run.run_started_at && run.updated_at
              ? (new Date(run.updated_at).getTime() -
                  new Date(run.run_started_at).getTime()) /
                1000
              : 0;
          const minutes = Math.max(Math.round(durationSeconds / 60), 0);
          const successRate = run.conclusion === "success" ? 100 : 0;
          return { label, minutes, successRate };
        });
      }

      const latestRun = runs.workflow_runs[0];
      const durations = runs.workflow_runs
        .map((run) => {
          if (!run.run_started_at || !run.updated_at) {
            return 0;
          }
          return (
            (new Date(run.updated_at).getTime() -
              new Date(run.run_started_at).getTime()) /
            1000
          );
        })
        .filter((value) => value > 0);

      const avgSeconds =
        durations.length > 0
          ? durations.reduce((sum, value) => sum + value, 0) / durations.length
          : 0;

      const actionsMinutes = Math.round(
        durations.reduce((sum, value) => sum + value, 0) / 60
      );

      const openIssues = Math.max(repo.open_issues_count - openPrs, 0);
      const pipeline = mapPipelineStatus(latestRun);
      const avgRuntime = avgSeconds > 0 ? formatDuration(avgSeconds) : "--";

      const lastCommitAt = repo.pushed_at ?? repo.updated_at;

      return {
        name: repo.name,
        isPrivate: repo.private,
        repoUrl: repo.html_url,
        health: mapHealth(pipeline, openIssues),
        pipeline,
        avgRuntime,
        avgSeconds,
        openIssues,
        openPrs,
        actionsMinutes,
        lastCommit: formatRelativeTime(lastCommitAt),
        lastCommitAt: lastCommitAt ? new Date(lastCommitAt).getTime() : 0
      };
    })
  );

  return {
    userName: user.name ?? user.login,
    orgName,
    orgOptions,
    selectedOrgId: resolvedOrgId,
    repos: repoSummaries,
    pipelineSeries
  };
}
