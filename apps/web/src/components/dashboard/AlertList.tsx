type AlertSeverity = "critical" | "warning" | "info";

type AlertItem = {
  title: string;
  description: string;
  severity: AlertSeverity;
  repo: string;
};

const severityStyles: Record<AlertSeverity, string> = {
  critical: "border-red-500/40 bg-red-500/10 text-red-200",
  warning: "border-amber-400/40 bg-amber-400/10 text-amber-100",
  info: "border-sky-400/40 bg-sky-400/10 text-sky-100"
};

export default function AlertList({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="font-display text-lg font-semibold text-white">Live alerts</h3>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs uppercase tracking-[0.2em] text-white/50">
          Last 24h
        </span>
      </div>
      <div className="space-y-3">
        {alerts.length === 0 ? (
          <div className="rounded-xl border border-white/10 bg-black/20 px-4 py-6 text-center text-sm text-white/60">
            No alerts right now. Repos look stable.
          </div>
        ) : (
          alerts.map((alert) => (
            <div
              key={`${alert.repo}-${alert.title}`}
              className={`rounded-xl border px-4 py-3 ${severityStyles[alert.severity]}`}
            >
              <div className="flex items-center justify-between text-sm font-semibold">
                <span>{alert.title}</span>
                <span className="text-xs uppercase tracking-[0.2em] text-white/60">
                  {alert.repo}
                </span>
              </div>
              <p className="mt-1 text-xs text-white/70">{alert.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
