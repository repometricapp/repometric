type TrendDirection = "up" | "down" | "flat";

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  direction: TrendDirection;
  footnote: string;
};

const trendStyles: Record<TrendDirection, string> = {
  up: "text-emerald-300",
  down: "text-rose-300",
  flat: "text-slate-300"
};

function TrendArrow({ direction }: { direction: TrendDirection }) {
  if (direction === "flat") {
    return <span className="text-xs">--</span>;
  }

  return (
    <svg
      className="h-3 w-3"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {direction === "up" ? (
        <>
          <path d="M6 14l6-6 6 6" />
          <path d="M12 8v10" />
        </>
      ) : (
        <>
          <path d="M6 10l6 6 6-6" />
          <path d="M12 6v10" />
        </>
      )}
    </svg>
  );
}

export default function MetricCard({
  label,
  value,
  delta,
  direction,
  footnote
}: MetricCardProps) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</p>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendStyles[direction]}`}>
          <TrendArrow direction={direction} />
          <span>{delta}</span>
        </div>
      </div>
      <div className="mt-4 text-3xl font-semibold text-white">{value}</div>
      <p className="mt-2 text-xs text-white/60">{footnote}</p>
    </div>
  );
}
