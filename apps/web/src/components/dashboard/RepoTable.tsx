type RepoHealth = "healthy" | "watch" | "risk";

type RepoRow = {
  name: string;
  health: RepoHealth;
  pipeline: string;
  avgRuntime: string;
  openIssues: number;
  openPrs: number;
  actionsMinutes: number;
  lastCommit: string;
};

const healthStyles: Record<RepoHealth, string> = {
  healthy: "bg-emerald-500/20 text-emerald-200 border-emerald-400/30",
  watch: "bg-amber-500/20 text-amber-100 border-amber-400/30",
  risk: "bg-rose-500/20 text-rose-200 border-rose-400/30"
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
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-glow backdrop-blur">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-lg font-semibold text-white">Repository health</h3>
          <p className="text-xs text-white/60">
            Status, pipeline runtime, and GitHub activity signals
          </p>
        </div>
        <span className="rounded-full border border-white/10 px-2 py-0.5 text-xs uppercase tracking-[0.2em] text-white/50">
          {repoCount} repos
        </span>
      </div>
      <div className="overflow-hidden rounded-xl border border-white/10">
        <table className="w-full text-left text-sm">
          <thead className="bg-white/5 text-xs uppercase tracking-[0.18em] text-white/50">
            <tr>
              <th className="px-4 py-3">Repository</th>
              <th className="px-4 py-3">Health</th>
              <th className="px-4 py-3">Pipeline</th>
              <th className="px-4 py-3">Avg runtime</th>
              <th className="px-4 py-3">Issues</th>
              <th className="px-4 py-3">PRs</th>
              <th className="px-4 py-3">Actions</th>
              <th className="px-4 py-3">Last commit</th>
            </tr>
          </thead>
          <tbody>
            {repos.map((repo) => (
              <tr key={repo.name} className="border-t border-white/5 text-white/80">
                <td className="px-4 py-4 font-semibold text-white">{repo.name}</td>
                <td className="px-4 py-4">
                  <span
                    className={`rounded-full border px-2 py-1 text-xs font-semibold ${healthStyles[repo.health]}`}
                  >
                    {repo.health}
                  </span>
                </td>
                <td className="px-4 py-4">{repo.pipeline}</td>
                <td className="px-4 py-4">{repo.avgRuntime}</td>
                <td className="px-4 py-4">{repo.openIssues}</td>
                <td className="px-4 py-4">{repo.openPrs}</td>
                <td className="px-4 py-4">{repo.actionsMinutes}m</td>
                <td className="px-4 py-4 text-xs text-white/60">{repo.lastCommit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
