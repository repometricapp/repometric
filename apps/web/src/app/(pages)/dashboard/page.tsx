import AlertList from "@/components/dashboard/AlertList";
import MetricCard from "@/components/dashboard/MetricCard";
import PipelineChart from "@/components/dashboard/PipelineChart";
import RepoTable from "@/components/dashboard/RepoTable";
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
      footnote: "Connected repositories detected"
    },
    {
      label: "Pipeline success",
      value: pipelineSuccess,
      delta: "Live",
      direction: "flat",
      footnote: "Passing workflows across repos"
    },
    {
      label: "Avg runtime",
      value: formatDuration(avgRuntimeSeconds),
      delta: "Live",
      direction: "flat",
      footnote: "Average recent workflow duration"
    },
    {
      label: "Open PRs",
      value: openPrsTotal.toString(),
      delta: "Live",
      direction: "flat",
      footnote: "Open pull requests across repos"
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
    <main className="relative min-h-screen w-full overflow-x-hidden overflow-y-visible bg-background-dark px-4 py-10 text-white sm:px-6 md:px-8 md:py-12">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-black"></div>
        <div className="absolute -left-40 -top-40 h-96 w-96 rounded-full bg-sky-500/10 blur-[120px]"></div>
        <div className="absolute right-0 top-20 h-80 w-80 rounded-full bg-orange-500/10 blur-[120px]"></div>
        <div className="absolute inset-0 bg-grid opacity-30"></div>
      </div>

      <div className="relative mx-auto w-full max-w-6xl space-y-8">
        <header className="flex flex-col gap-6 rounded-3xl border border-white/10 bg-white/5 p-7 shadow-glow backdrop-blur md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-white/50">RepoMetric</p>
            <h1 className="mt-3 font-display text-3xl font-semibold">
              Organization health overview
            </h1>
            <p className="mt-2 max-w-xl text-sm text-white/60">
              Signals from GitHub actions, pull requests, and repository activity
              in one dashboard.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Org</p>
              <p className="font-semibold text-white">{orgName}</p>
            </div>
            <div className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm">
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                Last sync
              </p>
              <p className="font-semibold text-white">{lastSync}</p>
            </div>
            <Button className="h-12 rounded-xl px-6 text-sm font-semibold">
              Sync now
            </Button>
            <UserActions name={userName} />
          </div>
        </header>

        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.label} {...metric} />
          ))}
        </section>

        <section className="grid gap-6 xl:grid-cols-[2fr_1fr]">
          <RepoTable repos={repos} totalRepos={activeRepos} />
          <div className="space-y-6">
            <PipelineChart data={pipelineSeries} />
            <AlertList alerts={alerts} />
          </div>
        </section>
      </div>
    </main>
  );
}
