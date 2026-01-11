"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type SidebarProps = {
  orgName: string;
  repoCount: number;
  openPrs: number;
  rateLimitRemaining: number;
  rateLimitTotal: number;
  rateLimitResetAt: string;
};

const navItems = [
  { label: "Overview", href: "/dashboard" },
  { label: "Repositories", href: "/dashboard/repositories" },
  { label: "Pipelines" },
  { label: "Issues & PRs" },
  { label: "Usage" },
  { label: "Settings" }
];

export default function Sidebar({ orgName, repoCount, openPrs, rateLimitRemaining, rateLimitTotal, rateLimitResetAt }: SidebarProps) {
  const pathname = usePathname();
  
  const formatResetTime = (isoString: string) => {
    const resetDate = new Date(isoString);
    const now = new Date();
    const diffMs = resetDate.getTime() - now.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 60) {
      return `${diffMins}m`;
    }
    const diffHours = Math.floor(diffMins / 60);
    return `${diffHours}h`;
  };
  
  return (
    <aside className="sticky top-0 hidden h-screen w-64 flex-col border-r border-slate-200 bg-white text-slate-900 dark:border-border-dark dark:bg-background-dark dark:text-slate-100 lg:flex">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="space-y-1">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
            RepoMetric
          </p>
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded border border-slate-200 bg-slate-100 dark:border-border-dark dark:bg-card-dark">
              <span className="text-sm font-bold text-primary">RM</span>
            </div>
            <div>
              <div className="text-lg font-bold leading-tight">{orgName}</div>
              <p className="text-[10px] text-slate-500 dark:text-text-muted">
                GitHub org observability
              </p>
            </div>
          </div>
        </div>

        <nav className="mt-8 space-y-1">
        <p className="mb-3 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
          Navigation
        </p>
        {navItems.map((item) => (
          (() => {
            const isActive =
              item.href &&
              (pathname === item.href ||
                (item.href !== "/dashboard" && pathname.startsWith(item.href)));
            const classes = `flex w-full items-center justify-between rounded px-3 py-2 text-sm font-medium transition ${
              isActive
                ? "bg-slate-100 text-slate-900 dark:bg-white/5 dark:text-white"
                : "text-slate-500 hover:text-slate-900 dark:text-text-muted dark:hover:text-white"
            }`;

            if (item.href) {
              return (
                <Link key={item.label} href={item.href} className={classes}>
                  <span>{item.label}</span>
                  {isActive ? (
                    <span className="rounded bg-primary/20 px-1.5 py-0.5 text-[9px] font-bold uppercase text-primary">
                      Live
                    </span>
                  ) : null}
                </Link>
              );
            }

            return (
              <button
                key={item.label}
                type="button"
                className={`${classes} cursor-not-allowed opacity-60`}
                disabled
              >
                <span>{item.label}</span>
              </button>
            );
          })()
        ))}
      </nav>
      </div>

      <div className="flex-shrink-0 border-t border-slate-200 p-6 text-xs dark:border-border-dark">
        <p className="mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
          Quick stats
        </p>
        <div className="space-y-3">
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-text-muted">Sync window</span>
            <span className="font-bold">30 days</span>
          </div>
          <div className="space-y-1.5">
            <div className="flex justify-between">
              <span className="text-slate-500 dark:text-text-muted">Rate limit</span>
              <span className="font-bold">{rateLimitRemaining}/{rateLimitTotal}</span>
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className={`h-full transition-all ${
                      (rateLimitRemaining / rateLimitTotal) * 100 > 50
                        ? 'bg-emerald-500'
                        : (rateLimitRemaining / rateLimitTotal) * 100 > 20
                        ? 'bg-orange-500'
                        : 'bg-red-500'
                    }`}
                    style={{ width: `${(rateLimitRemaining / rateLimitTotal) * 100}%` }}
                  />
                </div>
                <span className="text-[10px] font-medium text-slate-500 dark:text-text-muted">
                  {Math.round((rateLimitRemaining / rateLimitTotal) * 100)}%
                </span>
              </div>
            </div>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-500 dark:text-text-muted">Reset in</span>
            <span className="font-bold">{formatResetTime(rateLimitResetAt)}</span>
          </div>
        </div>
      </div>
    </aside>
  );
}
