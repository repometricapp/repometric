type RepoHealth = "healthy" | "watch" | "risk";

type RepoRow = {
  name: string;
  isPrivate: boolean;
  health: RepoHealth;
  pipeline: string;
  avgRuntime: string;
  openIssues: number;
  openPrs: number;
  actionsMinutes: number;
  lastCommit: string;
};

const healthStyles: Record<RepoHealth, string> = {
  healthy:
    "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400",
  watch:
    "bg-amber-500/10 text-amber-500 dark:bg-amber-500/10 dark:text-amber-400",
  risk: "bg-red-500/10 text-red-500 dark:bg-red-500/10 dark:text-red-400"
};

const visibilityStyles = {
  private: "bg-slate-200 text-slate-700 dark:bg-white/10 dark:text-slate-200",
  public: "bg-emerald-500/10 text-emerald-500 dark:bg-emerald-500/10 dark:text-emerald-400"
};

export default function RepoTable({
  repos,
  totalRepos
}: {
  repos: RepoRow[];
  totalRepos?: number;
}) {
  const repoCount = totalRepos ?? repos.length;
  return (
    <div className="rounded-lg border border-slate-200 bg-white text-slate-900 dark:border-border-dark dark:bg-card-dark dark:text-slate-100">
      <div className="flex items-center justify-between border-b border-slate-200 px-6 py-4 dark:border-border-dark">
        <h3 className="text-sm font-bold">Repository health</h3>
        <span className="rounded bg-slate-100 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-slate-500 dark:bg-white/5 dark:text-text-muted">
          {repoCount} repos
        </span>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[980px] w-full text-left text-[11px]">
          <thead>
            <tr className="border-b border-slate-200 text-slate-400 dark:border-border-dark dark:text-text-muted">
              <th className="px-6 py-3 font-semibold uppercase tracking-widest">Repository</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Visibility</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Health</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Pipeline</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Avg runtime</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Issues</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">PRs</th>
              <th className="px-4 py-3 font-semibold uppercase tracking-widest">Actions</th>
              <th className="px-6 py-3 text-right font-semibold uppercase tracking-widest">
                Last commit
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-border-dark">
            {repos.map((repo) => (
              <tr
                key={repo.name}
                className="transition-colors hover:bg-slate-50 dark:hover:bg-white/5"
              >
                <td className="px-6 py-2.5 font-bold text-slate-800 dark:text-slate-200">
                  {repo.name}
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${
                      repo.isPrivate ? visibilityStyles.private : visibilityStyles.public
                    }`}
                  >
                    {repo.isPrivate ? "Private" : "Public"}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[9px] font-bold uppercase ${healthStyles[repo.health]}`}
                  >
                    {repo.health}
                  </span>
                </td>
                <td className="px-4 py-2.5 text-slate-500 dark:text-text-muted">
                  {repo.pipeline}
                </td>
                <td className="px-4 py-2.5 font-mono">{repo.avgRuntime}</td>
                <td className="px-4 py-2.5">{repo.openIssues}</td>
                <td className="px-4 py-2.5">{repo.openPrs}</td>
                <td className="px-4 py-2.5">{repo.actionsMinutes}m</td>
                <td className="px-6 py-2.5 text-right text-slate-400 dark:text-text-muted">
                  {repo.lastCommit}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
