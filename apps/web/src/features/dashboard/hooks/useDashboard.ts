"use client";

import { useMemo } from "react";
import { useDashboardData } from "@/shared/hooks/useDashboardData";
import { formatDuration } from "@/shared/libs/utils";
import { Repo } from "@/shared/libs/github";

export function useDashboard() {
  const { data, selectedOrgId, setSelectedOrgId, loading } = useDashboardData();

  const metrics = useMemo(() => {
    if (!data) return [];
    const { repos } = data;
    const activeRepos = repos.length;
    const passingRepos = repos.filter(
      (repo) => repo.pipeline === "Passing"
    ).length;
    const pipelineSuccess = activeRepos
      ? `${((passingRepos / activeRepos) * 100).toFixed(1)}%`
      : "--";
    const reposWithRuntime = repos.filter((repo) => repo.avgSeconds > 0);
    const avgRuntimeSeconds =
      reposWithRuntime.length > 0
        ? reposWithRuntime.reduce((sum, repo) => sum + repo.avgSeconds, 0) /
          reposWithRuntime.length
        : 0;
    const openPrsTotal = repos.reduce((sum, repo) => sum + repo.openPrs, 0);

    return [
      {
        label: "Active repos",
        value: activeRepos.toString(),
        delta: "Live",
        direction: "flat",
        footnote: "Connected repositories detected",
        tone: "sky",
      },
      {
        label: "Pipeline success",
        value: pipelineSuccess,
        delta: "Live",
        direction: "flat",
        footnote: "Passing workflows across repos",
        tone: "emerald",
      },
      {
        label: "Avg runtime",
        value: formatDuration(avgRuntimeSeconds),
        delta: "Live",
        direction: "flat",
        footnote: "Average recent workflow duration",
        tone: "orange",
      },
      {
        label: "Open PRs",
        value: openPrsTotal.toString(),
        delta: "Live",
        direction: "flat",
        footnote: "Open pull requests across repos",
        tone: "violet",
      },
    ];
  }, [data]);

  const alerts = useMemo(() => {
    if (!data) return [];
    return data.repos
      .flatMap((repo: Repo) => {
        const entries = [];
        if (repo.pipeline === "Failing") {
          entries.push({
            title: "Workflow failures detected",
            description: "Latest workflow run failed. Review logs.",
            severity: "critical",
            repo: repo.name,
          });
        }
        if (repo.openPrs >= 6) {
          entries.push({
            title: "PR review backlog",
            description: `${repo.openPrs} open pull requests awaiting review.`,
            severity: "warning",
            repo: repo.name,
          });
        }
        if (repo.actionsMinutes >= 180) {
          entries.push({
            title: "High Actions usage",
            description: `${repo.actionsMinutes} minutes consumed in latest runs.`,
            severity: "info",
            repo: repo.name,
          });
        }
        return entries;
      })
      .slice(0, 3);
  }, [data]);

  const lastSync = useMemo(() => {
    return new Date().toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }, []);

  return {
    data,
    loading,
    selectedOrgId,
    setSelectedOrgId,
    metrics,
    alerts,
    lastSync,
  };
}
