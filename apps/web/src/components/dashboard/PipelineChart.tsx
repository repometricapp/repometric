type PipelinePoint = {
  label: string;
  minutes: number;
  successRate: number;
};

export default function PipelineChart({ data }: { data: PipelinePoint[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Latest workflow runs</h3>
            <p className="text-[10px] text-slate-400 dark:text-text-muted">
              No workflow data available
            </p>
          </div>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
            LAST 5
          </span>
        </div>
        <div className="rounded border border-slate-200 bg-slate-50 p-4 text-[11px] text-slate-500 dark:border-border-dark dark:bg-white/5 dark:text-text-muted">
          Connect a repository with GitHub Actions to see runtime trends.
        </div>
      </div>
    );
  }

  const maxMinutes = Math.max(...data.map((point) => point.minutes), 1);

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Latest workflow runs</h3>
          <p className="text-[10px] text-slate-400 dark:text-text-muted">
            Duration per run (minutes)
          </p>
        </div>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
          LAST 5
        </span>
      </div>

      <div className="mb-4 flex h-24 items-end justify-between px-2">
        {data.map((point) => (
          <div key={point.label} className="group flex flex-col items-center gap-2">
            <div
              className="w-2 rounded-t bg-green-500/40 transition-all group-hover:bg-green-500"
              style={{ height: `${(point.minutes / maxMinutes) * 96 + 8}%` }}
            />
            <span className="text-[8px] font-mono text-slate-400 dark:text-text-muted">
              {point.minutes}m
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-between px-1 text-[8px] font-bold text-slate-400 dark:text-text-muted">
        {data.map((point) => (
          <span
            key={`${point.label}-rate`}
            className={point.successRate >= 80 ? "text-green-500" : undefined}
          >
            {point.label} {point.successRate}%
          </span>
        ))}
      </div>
    </div>
  );
}
