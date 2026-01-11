"use client";

type RepoConsumption = {
  name: string;
  minutes: number;
};

export default function TopConsumersChart({ repos }: { repos: RepoConsumption[] }) {
  if (repos.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Top CI/CD Consumers</h3>
            <p className="text-[10px] text-slate-400 dark:text-text-muted">
              No usage data available
            </p>
          </div>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
            TOP 5
          </span>
        </div>
        <div className="rounded border border-slate-200 bg-slate-50 p-4 text-[11px] text-slate-500 dark:border-border-dark dark:bg-white/5 dark:text-text-muted">
          No Actions minutes consumed yet.
        </div>
      </div>
    );
  }

  const maxMinutes = Math.max(...repos.map((r) => r.minutes), 1);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Top CI/CD Consumers</h3>
          <p className="text-[10px] text-slate-400 dark:text-text-muted">
            Actions minutes consumed
          </p>
        </div>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
          TOP {repos.length}
        </span>
      </div>

      <div className="space-y-3">
        {repos.map((repo, index) => {
          const percentage = (repo.minutes / maxMinutes) * 100;
          return (
            <div key={repo.name} className="space-y-1.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="flex h-5 w-5 items-center justify-center rounded bg-slate-100 text-[9px] font-bold text-slate-600 dark:bg-white/5 dark:text-slate-400">
                    {index + 1}
                  </span>
                  <span className="truncate text-xs font-medium" title={repo.name}>
                    {repo.name}
                  </span>
                </div>
                <span className="text-xs font-bold tabular-nums">
                  {repo.minutes}m
                </span>
              </div>
              <div className="ml-7 h-1.5 overflow-hidden rounded-full bg-slate-100 dark:bg-slate-800">
                <div
                  className={`h-full transition-all ${
                    index === 0
                      ? 'bg-violet-500'
                      : index === 1
                      ? 'bg-blue-500'
                      : index === 2
                      ? 'bg-sky-500'
                      : 'bg-slate-400'
                  }`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
