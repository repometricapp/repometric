type TrendDirection = "up" | "down" | "flat";

type MetricTone = "orange" | "sky" | "emerald" | "violet";

type MetricCardProps = {
  label: string;
  value: string;
  delta: string;
  direction: TrendDirection;
  footnote: string;
  tone?: MetricTone;
};

const trendStyles: Record<TrendDirection, string> = {
  up: "text-emerald-300",
  down: "text-rose-300",
  flat: "text-slate-300"
};

const toneStyles: Record<MetricTone, string> = {
  orange: "from-orange-500/40 via-orange-400/20 to-transparent",
  sky: "from-sky-400/40 via-sky-300/20 to-transparent",
  emerald: "from-emerald-400/40 via-emerald-300/20 to-transparent",
  violet: "from-violet-400/40 via-violet-300/20 to-transparent"
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
  footnote,
  tone = "sky"
}: MetricCardProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${toneStyles[tone]}`}
      />
      <div className="flex items-center justify-between">
        <p className="text-xs uppercase tracking-[0.2em] text-white/50">{label}</p>
        <div className={`flex items-center gap-1 text-xs font-semibold ${trendStyles[direction]}`}>
          <TrendArrow direction={direction} />
          <span>{delta}</span>
        </div>
      </div>
      <div className="relative mt-4 text-3xl font-semibold text-white">{value}</div>
      <p className="relative mt-2 text-xs text-white/60">{footnote}</p>
    </div>
  );
}
