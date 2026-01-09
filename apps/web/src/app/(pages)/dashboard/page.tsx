import AlertList from "@/components/dashboard/AlertList";
import MetricCard from "@/components/dashboard/MetricCard";
import PipelineChart from "@/components/dashboard/PipelineChart";
import RepoTable from "@/components/dashboard/RepoTable";
import Sidebar from "@/components/dashboard/Sidebar";
import UserActions from "@/components/dashboard/UserActions";
import { Button } from "@/components/ui/Button";
import { getDashboardData } from "@/lib/github";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import type { ComponentProps } from "react";

function formatDuration(seconds: number) {
  if (seconds <= 0) {
    return "--";
  }
  const minutes = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (minutes <= 0) {
    return `${secs}s`;
  }
  return `${minutes}m ${secs}s`;
}

export default async function DemoPage() {
  const token = cookies().get("repometric_token")?.value;

  if (!token) {
    redirect("/login");
  }

  const { userName, orgName, repos, pipelineSeries } =
    await getDashboardData(token);

  const activeRepos = repos.length;
  const passingRepos = repos.filter((repo) => repo.pipeline === "Passing").length;
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
    minute: "2-digit"
  });

  const metrics: ComponentProps<typeof MetricCard>[] = [
    {
      label: "Active repos",
      value: activeRepos.toString(),
      delta: "Live",
      direction: "flat",
      footnote: "Connected repositories detected",
      tone: "sky"
    },
    {
      label: "Pipeline success",
      value: pipelineSuccess,
      delta: "Live",
      direction: "flat",
      footnote: "Passing workflows across repos",
      tone: "emerald"
    },
    {
      label: "Avg runtime",
      value: formatDuration(avgRuntimeSeconds),
      delta: "Live",
      direction: "flat",
      footnote: "Average recent workflow duration",
      tone: "orange"
    },
    {
      label: "Open PRs",
      value: openPrsTotal.toString(),
      delta: "Live",
      direction: "flat",
      footnote: "Open pull requests across repos",
      tone: "violet"
    }
  ];

  const alerts = repos
    .flatMap((repo) => {
      const entries: {
        title: string;
        description: string;
        severity: "critical" | "warning" | "info";
        repo: string;
      }[] = [];
      if (repo.pipeline === "Failing") {
        entries.push({
          title: "Workflow failures detected",
          description: "Latest workflow run failed. Review logs.",
          severity: "critical",
          repo: repo.name
        });
      }
      if (repo.openPrs >= 6) {
        entries.push({
          title: "PR review backlog",
          description: `${repo.openPrs} open pull requests awaiting review.`,
          severity: "warning",
          repo: repo.name
        });
      }
      if (repo.actionsMinutes >= 180) {
        entries.push({
          title: "High Actions usage",
          description: `${repo.actionsMinutes} minutes consumed in latest runs.`,
          severity: "info",
          repo: repo.name
        });
      }
      return entries;
    })
    .slice(0, 3);

  return (
    <main className="flex min-h-screen w-full bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <Sidebar orgName={orgName} repoCount={activeRepos} openPrs={openPrsTotal} />
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-background-dark sm:p-8">
        <div className="mx-auto max-w-[1400px] space-y-8">
          <header className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 dark:border-border-dark md:flex-row md:items-end">
            <div className="space-y-1">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-text-muted">
                Overview
              </p>
              <h1 className="text-3xl font-bold tracking-tight">
                Organization health overview
              </h1>
              <p className="text-sm text-slate-500 dark:text-text-muted">
                Signals from GitHub actions, pull requests, and repository activity
                in one dashboard.
              </p>
            </div>
            <div className="flex items-center gap-4">
              <div className="hidden gap-6 border-r border-slate-200 pr-6 text-right dark:border-border-dark lg:flex">
                <div>
                  <p className="text-[9px] font-bold uppercase text-slate-400 dark:text-text-muted">
                    Org
                  </p>
                  <p className="text-xs font-semibold">{orgName}</p>
                </div>
                <div>
                  <p className="text-[9px] font-bold uppercase text-slate-400 dark:text-text-muted">
                    Last sync
                  </p>
                  <p className="text-xs font-semibold">{lastSync}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button className="rounded bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-orange-600">
                  Sync now
                </Button>
                <UserActions name={userName} />
              </div>
            </div>
          </header>

          <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {metrics.map((metric) => (
              <MetricCard key={metric.label} {...metric} />
            ))}
          </section>

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
