"use client";

import { useMemo, useState } from "react";

type RepoHealth = "healthy" | "watch" | "risk";

type RepoRow = {
  name: string;
  isPrivate: boolean;
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

const healthStyles: Record<RepoHealth, string> = {
  healthy:
    "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
  watch:
    "bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400",
  risk: "bg-red-500/10 text-red-500 dark:bg-red-500/10 dark:text-red-400"
};

const healthOrder: Record<RepoHealth, number> = {
  risk: 3,
  watch: 2,
  healthy: 1
};

const visibilityStyles = {
  private: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200",
  public: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400"
};

const sortOptions = [
  { key: "health", label: "Health" },
  { key: "visibility", label: "Visibility" },
  { key: "avgRuntime", label: "Avg runtime" },
  { key: "actions", label: "Actions" },
  { key: "lastCommit", label: "Last commit" }
];

export default function RepoTable({
  repos,
  totalRepos
}: {
  repos: RepoRow[];
  totalRepos?: number;
}) {
  const repoCount = totalRepos ?? repos.length;
  const [sortKey, setSortKey] = useState(sortOptions[0].key);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const sortedRepos = useMemo(() => {
    const copy = [...repos];
    const direction = sortDirection === "asc" ? 1 : -1;
    copy.sort((a, b) => {
      let value = 0;
      if (sortKey === "health") {
        value = healthOrder[a.health] - healthOrder[b.health];
      } else if (sortKey === "visibility") {
        value = (a.isPrivate ? 1 : 0) - (b.isPrivate ? 1 : 0);
      } else if (sortKey === "avgRuntime") {
        value = a.avgSeconds - b.avgSeconds;
      } else if (sortKey === "actions") {
        value = a.actionsMinutes - b.actionsMinutes;
      } else if (sortKey === "lastCommit") {
        value = a.lastCommitAt - b.lastCommitAt;
      }
      return value * direction;
    });
    return copy;
  }, [repos, sortDirection, sortKey]);

  return (
    <div className="rounded-lg border border-slate-200 bg-white text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-border-dark">
        <h3 className="text-sm font-bold">Repository health</h3>
        <div className="flex items-center gap-3 text-[10px] font-semibold uppercase tracking-widest text-slate-400">
          <label className="flex items-center gap-2">
            <span>Sort by</span>
            <select
              className="rounded border border-slate-200 bg-white px-2 py-1 text-[10px] font-semibold uppercase tracking-widest text-slate-600 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
              value={sortKey}
              onChange={(event) => setSortKey(event.target.value)}
            >
              {sortOptions.map((option) => (
                <option key={option.key} value={option.key}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
          <button
            type="button"
            className="rounded border border-slate-200 bg-slate-50 px-2 py-1 text-[10px] font-bold uppercase tracking-widest text-slate-500 shadow-sm transition hover:bg-slate-100 dark:border-border-dark dark:bg-white/5 dark:text-text-muted dark:hover:bg-white/10"
            onClick={() =>
              setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
            }
          >
            {sortDirection === "asc" ? "Asc" : "Desc"}
          </button>
          <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:bg-white/5 dark:text-text-muted">
            {repoCount} repos
          </span>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 dark:border-border-dark dark:text-text-muted">
              <th className="px-6 py-3 font-semibold uppercase tracking-widest">Repository</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Visibility</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Health</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Pipeline</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Avg runtime</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Issues</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">PRs</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Actions</th>
              <th className="px-6 py-3 text-right font-semibold uppercase tracking-widest">
                Last commit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
            {sortedRepos.map((repo) => (
              <tr
                key={repo.name}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <td className="px-6 py-2.5 font-bold text-slate-800 dark:text-slate-200">
                  {repo.name}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                      repo.isPrivate ? visibilityStyles.private : visibilityStyles.public
                    }`}
                  >
                    {repo.isPrivate ? "Private" : "Public"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${healthStyles[repo.health]}`}
                  >
                    {repo.health}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-500 dark:text-text-muted">
                  {repo.pipeline}
                </td>
                <td className="px-4 py-2.5 font-mono">{repo.avgRuntime}</td>
                <td className="px-4 py-2.5">{repo.openIssues}</td>
                <td className="px-4 py-2.5">{repo.openPrs}</td>
                <td className="px-4 py-2.5">{repo.actionsMinutes}m</td>
                <td className="px-6 py-2.5 text-right text-slate-400 dark:text-text-muted">
                  {repo.lastCommit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
