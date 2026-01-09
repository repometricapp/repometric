type PipelinePoint = {
  label: string;
  minutes: number;
  successRate: number;
};

export default function PipelineChart({ data }: { data: PipelinePoint[] }) {
  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="font-display text-lg font-semibold text-white">
              Latest workflow runs
            </h3>
            <p className="text-xs text-white/60">No workflow data available</p>
          </div>
          <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs uppercase tracking-[0.2em] text-white/50">
            Last 5
          </span>
        </div>
        <div className="mt-6 rounded-xl border border-white/10 bg-black/20 p-6 text-sm text-white/60">
          Connect a repository with GitHub Actions to see runtime trends.
        </div>
      </div>
    );
  }

  const maxMinutes = Math.max(...data.map((point) => point.minutes), 1);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">
            Latest workflow runs
          </h3>
          <p className="text-xs text-white/60">Duration per run (minutes)</p>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs uppercase tracking-[0.2em] text-white/50">
          Last 5
        </span>
      </div>

      <div className="mt-6 flex h-40 items-end gap-3">
        {data.map((point) => (
          <div key={point.label} className="flex flex-1 flex-col items-center gap-2">
            <div className="relative w-full flex-1">
              <div
                className="absolute bottom-0 w-full rounded-xl bg-gradient-to-t from-orange-500/70 via-orange-400/60 to-sky-400/60"
                style={{ height: `${(point.minutes / maxMinutes) * 100}%` }}
              />
            </div>
            <div className="text-[11px] uppercase tracking-[0.2em] text-white/60">
              {point.label}
            </div>
            <div className="text-xs font-semibold text-white">
              {point.minutes}m
              <span className="ml-2 text-[10px] text-emerald-300">
                {point.successRate}%
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
