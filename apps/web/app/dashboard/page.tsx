"use client";

import { useDashboardData } from "@/hooks/useDashboardData";
import Sidebar from "@/components/dashboard/Sidebar";
import DashboardHeader from "@/components/dashboard/DashboardHeader";
import DashboardMetrics from "@/components/dashboard/DashboardMetrics";
import RepoTable from "@/components/dashboard/RepoTable";
import PipelineChart from "@/components/dashboard/PipelineChart";
import AlertList from "@/components/dashboard/AlertList";
import { formatDuration } from "@/libs/utils";
import { MetricCardProps } from "@/components/dashboard/MetricCard";
import { AlertItem } from "@/components/dashboard/AlertList";

export default function DashboardPage() {
  const { data, selectedOrgId, setSelectedOrgId } = useDashboardData();

  if (!data) {
    return null;
  }

  const { userName, orgName, orgOptions, repos, pipelineSeries } = data;

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

  const lastSync = new Date().toLocaleString("en-US", {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const metrics: MetricCardProps[] = [
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

  const alerts: AlertItem[] = repos
    .flatMap((repo) => {
      const entries: AlertItem[] = [];
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

  return (
    <main className="flex min-h-screen w-full bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <Sidebar
        orgName={orgName}
        repoCount={activeRepos}
        openPrs={openPrsTotal}
      />
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-background-dark sm:p-8">
        <div className="mx-auto max-w-[1400px] space-y-8">
          <DashboardHeader
            orgName={orgName}
            userName={userName}
            lastSync={lastSync}
            orgOptions={orgOptions}
            selectedOrgId={selectedOrgId ?? data.selectedOrgId}
            onOrgChange={setSelectedOrgId}
          />

          <DashboardMetrics metrics={metrics} />

          <section className="grid grid-cols-12 gap-6">
            <div className="col-span-12 lg:col-span-9">
              <RepoTable repos={repos} totalRepos={activeRepos} />
            </div>
            <div className="col-span-12 space-y-6 lg:col-span-3">
              <PipelineChart data={pipelineSeries} />
              <AlertList alerts={alerts} />
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
