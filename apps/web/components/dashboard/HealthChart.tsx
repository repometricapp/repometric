"use client";

type HealthData = {
  healthy: number;
  watch: number;
  risk: number;
};

export default function HealthChart({ data }: { data: HealthData }) {
  const total = data.healthy + data.watch + data.risk;

  if (total === 0) {
    return (
      <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Repository Health</h3>
            <p className="text-[10px] text-slate-400 dark:text-text-muted">
              No repositories found
            </p>
          </div>
          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
            OVERVIEW
          </span>
        </div>
        <div className="rounded border border-slate-200 bg-slate-50 p-4 text-[11px] text-slate-500 dark:border-border-dark dark:bg-white/5 dark:text-text-muted">
          Connect repositories to see health distribution.
        </div>
      </div>
    );
  }

  const healthyPercent = (data.healthy / total) * 100;
  const watchPercent = (data.watch / total) * 100;
  const riskPercent = (data.risk / total) * 100;

  // SVG donut chart using stroke-dasharray
  const radius = 45;
  const circumference = 2 * Math.PI * radius;
  const healthyLength = (healthyPercent / 100) * circumference;
  const watchLength = (watchPercent / 100) * circumference;
  const riskLength = (riskPercent / 100) * circumference;

  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-bold">Repository Health</h3>
          <p className="text-[10px] text-slate-400 dark:text-text-muted">
            Organization overview
          </p>
        </div>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
          {total} REPOS
        </span>
      </div>

      <div className="flex items-center justify-center">
        <svg width="120" height="120" viewBox="0 0 120 120" className="transform -rotate-90">
          {/* Background circle */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="currentColor"
            strokeWidth="18"
            className="text-slate-100 dark:text-slate-800"
          />
          
          {/* Healthy segment */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#10b981"
            strokeWidth="18"
            strokeDasharray={`${healthyLength} ${circumference}`}
            strokeDashoffset="0"
            strokeLinecap="round"
          />
          
          {/* Watch segment */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#f59e0b"
            strokeWidth="18"
            strokeDasharray={`${watchLength} ${circumference}`}
            strokeDashoffset={-healthyLength}
            strokeLinecap="round"
          />
          
          {/* Risk segment */}
          <circle
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            stroke="#ef4444"
            strokeWidth="18"
            strokeDasharray={`${riskLength} ${circumference}`}
            strokeDashoffset={-(healthyLength + watchLength)}
            strokeLinecap="round"
          />
        </svg>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Healthy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">{data.healthy}</span>
            <span className="text-[10px] text-slate-400 dark:text-text-muted">
              {healthyPercent.toFixed(0)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Watch</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">{data.watch}</span>
            <span className="text-[10px] text-slate-400 dark:text-text-muted">
              {watchPercent.toFixed(0)}%
            </span>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="h-2.5 w-2.5 rounded-full bg-red-500" />
            <span className="text-xs text-slate-600 dark:text-slate-400">Risk</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold">{data.risk}</span>
            <span className="text-[10px] text-slate-400 dark:text-text-muted">
              {riskPercent.toFixed(0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
