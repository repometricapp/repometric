"use client";

import { useDashboard } from "@/features/dashboard/hooks/useDashboard";
import Sidebar from "@/features/dashboard/Sidebar";
import DashboardHeader from "@/features/dashboard/DashboardHeader";
import DashboardMetrics from "@/features/dashboard/DashboardMetrics";
import RepoTable from "@/features/dashboard/RepoTable";
import PipelineChart from "@/features/dashboard/PipelineChart";
import AlertList from "@/features/dashboard/AlertList";
import { Skeleton } from "@/shared/components/ui/skeleton";

export default function DashboardPage() {
  const { data, loading, selectedOrgId, setSelectedOrgId, metrics, alerts, lastSync } =
    useDashboard();

  if (loading || !data) {
    return <DashboardSkeleton />;
  }

  const { userName, orgName, orgOptions, repos, pipelineSeries } = data;
  const activeRepos = repos.length;
  const openPrsTotal = repos.reduce((sum, repo) => sum + repo.openPrs, 0);

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

function DashboardSkeleton() {
  return (
    <main className="flex min-h-screen w-full bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <div className="w-64 border-r border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="mt-4 h-6 w-48" />
      </div>
      <div className="flex-1 overflow-y-auto bg-slate-50 p-6 dark:bg-background-dark sm:p-8">
        <div className="mx-auto max-w-[1400px] space-y-8">
          <Skeleton className="h-16 w-full" />
          <div className="grid grid-cols-4 gap-6">
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-32 w-full" />
          </div>
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-9">
              <Skeleton className="h-96 w-full" />
            </div>
            <div className="col-span-3 space-y-6">
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-48 w-full" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
