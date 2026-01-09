"use client";

import { Button } from "@/components/ui/Button";
import { OrgOption } from "@/lib/github";
import UserActions from "./UserActions";

type RepositoriesHeaderProps = {
  userName: string;
  orgOptions: OrgOption[];
  selectedOrgId: string;
  onOrgChange: (orgId: string) => void;
  lastSync: string;
  totalRepos: number;
  publicRepos: number;
  privateRepos: number;
};

export default function RepositoriesHeader({
  userName,
  orgOptions,
  selectedOrgId,
  onOrgChange,
  lastSync,
  totalRepos,
  publicRepos,
  privateRepos
}: RepositoriesHeaderProps) {
  return (
    <header className="flex flex-col gap-6 border-b border-slate-200 pb-6 dark:border-border-dark lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-text-muted">
          Repositories
        </p>
        <h1 className="text-3xl font-bold tracking-tight">Repository portfolio</h1>
        <p className="text-sm text-slate-500 dark:text-text-muted">
          Monitor visibility, workflow health, and throughput across every repo.
        </p>
        <div className="flex flex-wrap gap-3 text-[11px] font-semibold uppercase tracking-widest text-slate-400">
          <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-white/5">
            {totalRepos} total
          </span>
          <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400">
            {publicRepos} public
          </span>
          <span className="rounded-full bg-slate-200 px-3 py-1 text-slate-600 dark:bg-white/10 dark:text-slate-200">
            {privateRepos} private
          </span>
        </div>
      </div>
      <div className="flex flex-col items-start gap-4 md:flex-row md:items-center">
        <div className="space-y-1">
          <p className="text-[9px] font-bold uppercase tracking-widest text-slate-400 dark:text-text-muted">
            Monitor
          </p>
          <select
            className="w-full rounded border border-slate-200 bg-white px-3 py-2 text-xs font-semibold text-slate-700 shadow-sm focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 dark:border-border-dark dark:bg-card-dark dark:text-slate-100"
            value={selectedOrgId}
            onChange={(event) => onOrgChange(event.target.value)}
          >
            {orgOptions.map((option) => (
              <option key={option.id} value={option.id}>
                {option.label}
              </option>
            ))}
          </select>
        </div>
        <div className="hidden gap-6 border-r border-slate-200 pr-6 text-right dark:border-border-dark lg:flex">
          <div>
            <p className="text-[9px] font-bold uppercase text-slate-400 dark:text-text-muted">
              Last sync
            </p>
            <p className="text-xs font-semibold">{lastSync}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded bg-primary px-5 py-2 text-sm font-bold text-white hover:bg-orange-600">
            Sync now
          </Button>
          <UserActions name={userName} />
        </div>
      </div>
    </header>
  );
}
