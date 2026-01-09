"use client";

type SidebarProps = {
  orgName: string;
  repoCount: number;
  openPrs: number;
};

const navItems = [
  { label: "Overview", active: true },
  { label: "Repositories", active: false },
  { label: "Pipelines", active: false },
  { label: "Issues & PRs", active: false },
  { label: "Usage", active: false },
  { label: "Settings", active: false }
];

export default function Sidebar({ orgName, repoCount, openPrs }: SidebarProps) {
  return (
    <aside className="hidden w-full max-w-[260px] flex-col gap-6 lg:flex">
      <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-white/50">RepoMetric</p>
        <h2 className="mt-3 text-xl font-semibold text-white">{orgName}</h2>
        <p className="mt-2 text-xs text-white/60">GitHub org observability</p>
      </div>

      <nav className="rounded-3xl border border-white/10 bg-white/5 p-4 shadow-glow backdrop-blur">
        <p className="px-3 pb-3 text-xs uppercase tracking-[0.3em] text-white/40">
          Navigation
        </p>
        <div className="space-y-1">
          {navItems.map((item) => (
            <button
              key={item.label}
              type="button"
              className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-sm transition ${
                item.active
                  ? "bg-white/10 text-white"
                  : "text-white/70 hover:bg-white/5 hover:text-white"
              }`}
            >
              <span>{item.label}</span>
              {item.active ? (
                <span className="rounded-full bg-orange-500/20 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-orange-200">
                  Live
                </span>
              ) : null}
            </button>
          ))}
        </div>
      </nav>

      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-glow backdrop-blur">
        <p className="text-xs uppercase tracking-[0.3em] text-white/40">Quick stats</p>
        <div className="mt-4 space-y-3 text-sm text-white/70">
          <div className="flex items-center justify-between">
            <span>Connected repos</span>
            <span className="font-semibold text-white">{repoCount}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Open PRs</span>
            <span className="font-semibold text-white">{openPrs}</span>
          </div>
          <div className="flex items-center justify-between">
            <span>Sync window</span>
            <span className="font-semibold text-white">30 days</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
