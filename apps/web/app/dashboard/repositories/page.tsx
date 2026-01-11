"use client";

import { useMemo, useState } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import RepositoriesHeader from "@/components/dashboard/RepositoriesHeader";
import { Button } from "@/components/ui/Button";
import { useDashboardData } from "@/hooks/useDashboardData";
import { formatDuration } from "@/libs/utils";

const healthStyles = {
  healthy:
    "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
  watch:
    "bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400",
  risk: "bg-red-500/10 text-red-500 dark:bg-red-500/10 dark:text-red-400"
};

const healthOrder = {
  risk: 3,
  watch: 2,
  healthy: 1
};

const pipelineStyles: Record<string, string> = {
  Passing: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
  Failing: "bg-red-500/10 text-red-500 dark:bg-red-500/10 dark:text-red-400",
  Running: "bg-sky-500/10 text-sky-500 dark:bg-sky-500/10 dark:text-sky-400",
  Flaky: "bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400",
  "No runs":
    "bg-slate-200 text-slate-600 dark:bg-white/10 dark:text-slate-200"
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

const pipelineOptions = [
  { value: "all", label: "All pipelines" },
  { value: "Passing", label: "Passing" },
  { value: "Failing", label: "Failing" },
  { value: "Running", label: "Running" },
  { value: "Flaky", label: "Flaky" },
  { value: "No runs", label: "No runs" }
];

export default function RepositoriesPage() {
  const { data, selectedOrgId, setSelectedOrgId } = useDashboardData();
  const [search, setSearch] = useState("");
  const [visibility, setVisibility] = useState("all");
  const [health, setHealth] = useState("all");
  const [pipeline, setPipeline] = useState("all");
  const [sortKey, setSortKey] = useState(sortOptions[0].key);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("desc");

  const filteredRepos = useMemo(() => {
    if (!data) return [];
    return data.repos.filter((repo) => {
      if (search && !repo.name.toLowerCase().includes(search.toLowerCase())) {
        return false;
      }
      if (visibility === "public" && repo.isPrivate) {
        return false;
      }
      if (visibility === "private" && !repo.isPrivate) {
        return false;
      }
      if (health !== "all" && repo.health !== health) {
        return false;
      }
      if (pipeline !== "all" && repo.pipeline !== pipeline) {
        return false;
      }
      return true;
    });
  }, [data, search, visibility, health, pipeline]);

  const sortedRepos = useMemo(() => {
    const copy = [...filteredRepos];
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
  }, [filteredRepos, sortDirection, sortKey]);

  if (!data) {
    return null;
  }

  const { userName, orgName, orgOptions, repos, rateLimit } = data;
  const publicRepos = repos.filter((repo) => !repo.isPrivate).length;
  const privateRepos = repos.filter((repo) => repo.isPrivate).length;
  const openPrsTotal = repos.reduce((sum, repo) => sum + repo.openPrs, 0);

  const lastSync = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  const riskRepos = repos.filter((repo) => repo.health === "risk").length;
  const avgRuntimeSeconds =
    repos.length > 0
      ? repos.reduce((sum, repo) => sum + repo.avgSeconds, 0) / repos.length
      : 0;
  const actionsMinutes = repos.reduce(
    (sum, repo) => sum + repo.actionsMinutes,
    0
  );

  const resetFilters = () => {
    setSearch("");
    setVisibility("all");
    setHealth("all");
    setPipeline("all");
    setSortKey(sortOptions[0].key);
    setSortDirection("desc");
  };

  return (
    <main className="flex min-h-screen w-full bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <Sidebar 
        orgName={orgName} 
        repoCount={repos.length} 
        openPrs={openPrsTotal} 
        rateLimitRemaining={rateLimit.remaining}
        rateLimitTotal={rateLimit.limit}
        rateLimitResetAt={rateLimit.resetAt}
      />
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-background-dark sm:p-8">
        <div className="mx-auto max-w-[1400px] space-y-8">
          <RepositoriesHeader
            userName={userName}
            orgOptions={orgOptions}
            selectedOrgId={selectedOrgId ?? data.selectedOrgId}
            onOrgChange={setSelectedOrgId}
            lastSync={lastSync}
            totalRepos={repos.length}
            publicRepos={publicRepos}
            privateRepos={privateRepos}
          />

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-border-dark dark:bg-card-dark">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                At risk
              </p>
              <p className="mt-2 text-2xl font-bold">{riskRepos}</p>
              <p className="text-xs text-slate-500 dark:text-text-muted">
                Repositories needing attention
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-border-dark dark:bg-card-dark">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                Avg runtime
              </p>
              <p className="mt-2 text-2xl font-bold">
                {formatDuration(avgRuntimeSeconds)}
              </p>
              <p className="text-xs text-slate-500 dark:text-text-muted">
                Rolling average across repos
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-border-dark dark:bg-card-dark">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                Actions usage
              </p>
              <p className="mt-2 text-2xl font-bold">{actionsMinutes}m</p>
              <p className="text-xs text-slate-500 dark:text-text-muted">
                Total minutes last runs
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-5 dark:border-border-dark dark:bg-card-dark">
              <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                Visibility mix
              </p>
              <p className="mt-2 text-2xl font-bold">
                {publicRepos}/{privateRepos}
              </p>
              <p className="text-xs text-slate-500 dark:text-text-muted">
                Public vs private repos
              </p>
            </div>
          </section>

          <section className="rounded-lg border border-slate-200 bg-white p-5 dark:border-border-dark dark:bg-card-dark">
            <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h2 className="text-sm font-bold">Repository controls</h2>
                <p className="text-xs text-slate-500 dark:text-text-muted">
                  Filter and prioritize the repositories you track.
                </p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" className="h-9 px-3 text-xs font-semibold">
                  Export list
                </Button>
                <Button variant="outline" className="h-9 px-3 text-xs font-semibold">
                  Add repository
                </Button>
              </div>
            </div>
            <div className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-6">
              <div className="xl:col-span-2">
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                  Search
                </label>
                <input
                  type="search"
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  placeholder="Filter by repo name"
                  className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
                />
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                  Visibility
                </label>
                <select
                  className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
                  value={visibility}
                  onChange={(event) => setVisibility(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                  Health
                </label>
                <select
                  className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
                  value={health}
                  onChange={(event) => setHealth(event.target.value)}
                >
                  <option value="all">All</option>
                  <option value="healthy">Healthy</option>
                  <option value="watch">Watch</option>
                  <option value="risk">Risk</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                  Pipeline
                </label>
                <select
                  className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
                  value={pipeline}
                  onChange={(event) => setPipeline(event.target.value)}
                >
                  {pipelineOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
                  Sort by
                </label>
                <select
                  className="mt-2 w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
                  value={sortKey}
                  onChange={(event) => setSortKey(event.target.value)}
                >
                  {sortOptions.map((option) => (
                    <option key={option.key} value={option.key}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex items-end gap-2">
                <button
                  type="button"
                  className="flex h-9 w-full items-center justify-center rounded border border-slate-200 bg-slate-50 text-xs font-bold uppercase tracking-widest text-slate-500 shadow-sm transition hover:bg-slate-100 dark:border-border-dark dark:bg-white/5 dark:text-text-muted dark:hover:bg-white/10"
                  onClick={() =>
                    setSortDirection((prev) => (prev === "asc" ? "desc" : "asc"))
                  }
                >
                  {sortDirection === "asc" ? "Asc" : "Desc"}
                </button>
                <button
                  type="button"
                  className="flex h-9 w-full items-center justify-center rounded border border-slate-200 bg-white text-[10px] font-bold uppercase tracking-widest text-slate-400 shadow-sm transition hover:bg-slate-100 dark:border-border-dark dark:bg-white/5 dark:text-text-muted dark:hover:bg-white/10"
                  onClick={resetFilters}
                >
                  Reset
                </button>
              </div>
            </div>
          </section>

          <section className="space-y-4">
            <div className="flex items-center justify-between text-xs text-slate-500 dark:text-text-muted">
              <span>
                Showing {sortedRepos.length} of {repos.length} repositories
              </span>
              <span>Org: {orgName}</span>
            </div>

            {sortedRepos.length === 0 ? (
              <div className="rounded-lg border border-dashed border-slate-200 bg-white p-6 text-center text-sm text-slate-500 dark:border-border-dark dark:bg-card-dark dark:text-text-muted">
                No repositories match your filters.
              </div>
            ) : (
              sortedRepos.map((repo) => (
                <div
                  key={repo.name}
                  className="rounded-lg border border-slate-200 bg-white p-5 shadow-sm transition hover:border-slate-300 dark:border-border-dark dark:bg-card-dark"
                >
                  <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                    <div className="space-y-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <h3 className="text-sm font-bold text-slate-900 dark:text-slate-100">
                          {repo.name}
                        </h3>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                            repo.isPrivate
                              ? visibilityStyles.private
                              : visibilityStyles.public
                          }`}
                        >
                          {repo.isPrivate ? "Private" : "Public"}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                            healthStyles[repo.health]
                          }`}
                        >
                          {repo.health}
                        </span>
                        <span
                          className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                            pipelineStyles[repo.pipeline] ??
                            "bg-slate-100 text-slate-500 dark:bg-white/5 dark:text-text-muted"
                          }`}
                        >
                          {repo.pipeline}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-500 dark:text-text-muted">
                        Last commit {repo.lastCommit}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        className="h-9 px-3 text-xs font-semibold"
                        disabled
                      >
                        Details
                      </Button>
                      <a
                        href={repo.repoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex h-9 items-center justify-center rounded-md border border-slate-200 bg-white px-3 text-xs font-semibold text-slate-700 shadow-sm transition hover:bg-slate-100 dark:border-border-dark dark:bg-card-dark dark:text-slate-100 dark:hover:bg-white/10"
                      >
                        Open in GitHub
                      </a>
                    </div>
                  </div>

                  <div className="mt-4 grid gap-4 text-xs text-slate-500 dark:text-text-muted sm:grid-cols-2 lg:grid-cols-5">
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        Avg runtime
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {repo.avgRuntime}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        Issues
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {repo.openIssues}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        PRs
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {repo.openPrs}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        Actions
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {repo.actionsMinutes}m
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest">
                        Avg seconds
                      </p>
                      <p className="mt-1 text-sm font-semibold text-slate-900 dark:text-slate-100">
                        {Math.round(repo.avgSeconds)}s
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </section>
        </div>
      </div>
    </main>
  );
}
