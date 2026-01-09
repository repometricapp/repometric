type MetricTone = "orange" | "sky" | "emerald" | "violet";

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  direction: "up" | "down" | "flat";
  footnote: string;
  tone?: MetricTone;
};

const toneStyles: Record<MetricTone, string> = {
  orange: "via-amber-500/20",
  sky: "via-blue-500/20",
  emerald: "via-emerald-500/20",
  violet: "via-purple-500/20"
};

export default function MetricCard({
  label,
  value,
  delta,
  footnote,
  tone = "sky"
}: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border border-slate-200 bg-white p-6 text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="mb-4 flex items-start justify-between">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-text-muted">
          {label}
        </span>
        <span className="flex items-center gap-1 text-[9px] font-bold text-green-500">
          <span className="h-1 w-1 animate-pulse rounded-full bg-green-500"></span>
          {delta}
        </span>
      </div>
      <div className="text-4xl font-bold leading-tight">{value}</div>
      <p className="mt-1 text-[11px] text-slate-400 dark:text-text-muted">{footnote}</p>
      <div
        className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent ${toneStyles[tone]} to-transparent`}
      />
    </div>
  );
}
