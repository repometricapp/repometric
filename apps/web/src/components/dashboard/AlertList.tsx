type AlertSeverity = "critical" | "warning" | "info";

type AlertItem = {
  title: string;
  description: string;
  severity: AlertSeverity;
  repo: string;
};

const severityStyles: Record<AlertSeverity, string> = {
  critical: "border-red-500/20 bg-red-500/5 text-red-500",
  warning: "border-amber-500/20 bg-amber-500/5 text-amber-500",
  info: "border-sky-500/20 bg-sky-500/5 text-sky-500"
};

export default function AlertList({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-sm font-bold">Live alerts</h3>
        <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-bold text-slate-400 dark:bg-white/5 dark:text-text-muted">
          LAST 24H
        </span>
      </div>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="rounded border border-slate-200 bg-slate-50 px-4 py-6 text-center text-[11px] text-slate-500 dark:border-border-dark dark:bg-white/5 dark:text-text-muted">
            No alerts right now. Repos look stable.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={`${alert.repo}-${alert.title}`}
              className={`rounded border p-3 transition-colors ${severityStyles[alert.severity]}`}
            >
              <div className="mb-1 flex items-start justify-between">
                <span className="text-[10px] font-bold uppercase tracking-tight">
                  {alert.title}
                </span>
              </div>
              <p className="mb-2 text-[11px] font-mono text-slate-600 dark:text-slate-200">
                {alert.repo.toUpperCase()}
              </p>
              <p className="text-[10px] text-slate-500 dark:text-text-muted">
                {alert.description}
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
