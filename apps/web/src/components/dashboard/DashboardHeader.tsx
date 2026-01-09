"use client";

import { Button } from "@/components/ui/Button";
import UserActions from "./UserActions";

type DashboardHeaderProps = {
  orgName: string;
  userName: string;
  lastSync: string;
};

export default function DashboardHeader({
  orgName,
  userName,
  lastSync,
}: DashboardHeaderProps) {
  return (
    <header className="flex flex-col justify-between gap-6 border-b border-slate-200 pb-6 dark:border-border-dark md:flex-row md:items-end">
      <div className="space-y-1">
        <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 dark:text-text-muted">
          Overview
        </p>
        <h1 className="text-3xl font-bold tracking-tight">
          Organization health overview
        </h1>
        <p className="text-sm text-slate-500 dark:text-text-muted">
          Signals from GitHub actions, pull requests, and repository activity
          in one dashboard.
        </p>
      </div>
      <div className="flex items-center gap-4">
        <div className="hidden gap-6 border-r border-slate-200 pr-6 text-right dark:border-border-dark lg:flex">
          <div>
            <p className="text-[9px] font-bold uppercase text-slate-400 dark:text-text-muted">
              Org
            </p>
            <p className="text-xs font-semibold">{orgName}</p>
          </div>
          <div>
            <p className="text-[9px] font-bold uppercase text-slate-400 dark:text-text-muted">
              Last sync
            </p>
            <p className="text-xs font-semibold">{lastSync}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <Button className="rounded bg-primary px-6 py-2 text-sm font-bold text-white hover:bg-orange-600">
            Sync now
          </Button>
          <UserActions name={userName} />
        </div>
      </div>
    </header>
  );
}
