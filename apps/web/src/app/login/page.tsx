'use client';

export default function LoginPage() {
  return (
    <main className="flex w-full max-w-4xl flex-col items-center px-6 py-12 text-center md:py-20">
      <div className="mb-8">
        <span className="inline-flex items-center rounded-full border border-gray-300 bg-gray-200 px-3 py-1 text-xs font-medium uppercase tracking-wide text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
          <span className="mr-2 h-2 w-2 rounded-full bg-primary"></span>
          GitHub Observability
        </span>
      </div>
      <h1 className="mb-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl">
        RepoMetric turns GitHub signals into{" "}
        <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
          decisions.
        </span>
      </h1>
      <p className="mb-12 max-w-2xl text-lg leading-relaxed text-text-muted-light dark:text-text-muted-dark md:text-xl">
        Track pipeline performance, repo health, and engineering momentum with a
        single dashboard built for teams that move fast.
      </p>
      <div className="mb-12 grid w-full max-w-3xl grid-cols-1 gap-6 md:grid-cols-2">
        <div className="group relative overflow-hidden rounded-2xl border border-border-light bg-card-light p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:border-border-dark dark:bg-card-dark dark:hover:border-primary/50 dark:hover:shadow-glow">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <svg
              className="h-16 w-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              ></path>
            </svg>
          </div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
            Coverage
          </h3>
          <p className="font-display text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-white">
            CI/CD, issues, PRs
          </p>
        </div>
        <div className="group relative overflow-hidden rounded-2xl border border-border-light bg-card-light p-6 text-left transition-all duration-300 hover:border-primary/50 hover:shadow-lg dark:border-border-dark dark:bg-card-dark dark:hover:border-primary/50 dark:hover:shadow-glow">
          <div className="absolute right-0 top-0 p-4 opacity-10 transition-opacity group-hover:opacity-20">
            <svg
              className="h-16 w-16 text-primary"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
              ></path>
            </svg>
          </div>
          <h3 className="mb-2 text-xs font-bold uppercase tracking-wider text-text-muted-light dark:text-text-muted-dark">
            Insight
          </h3>
          <p className="font-display text-xl font-semibold text-gray-900 transition-colors group-hover:text-primary dark:text-white">
            Latency, risk, costs
          </p>
        </div>
      </div>
      <div className="relative w-full max-w-md rounded-2xl border border-border-light bg-white p-8 shadow-xl dark:border-border-dark dark:bg-card-dark dark:shadow-none">
        <div className="absolute right-6 top-6">
          <span className="rounded border border-green-200 bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
            OAuth
          </span>
        </div>
        <div className="mb-6 text-left">
          <h2 className="mb-2 font-display text-2xl font-bold text-gray-900 dark:text-white">
            Sign in to RepoMetric
          </h2>
          <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
            Connect your GitHub orgs and keep an eye on engineering health.
          </p>
        </div>
        <div className="space-y-4">
          <a
            href="/api/auth/login"
            className="flex w-full transform items-center justify-center gap-3 rounded-lg bg-primary px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-primary-hover hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
            Continue with GitHub
          </a>
          <button
            className="w-full rounded-lg border border-border-light bg-transparent px-4 py-3 font-medium text-gray-700 transition-colors duration-200 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:border-border-dark dark:text-gray-300 dark:hover:bg-gray-800 dark:focus:ring-gray-600 dark:focus:ring-offset-background-dark"
            onClick={() => window.location.href = '/demo'}
          >
            View sample dashboard
          </button>
        </div>
        <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800/50 dark:bg-black/30">
          <p className="text-center text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">
            We only request read access to organization metadata. You can revoke
            access at any time from GitHub settings.
          </p>
        </div>
      </div>
      <div className="fixed bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"></div>
      <div className="pointer-events-none fixed left-1/2 top-0 z-[-1] h-40 w-1/2 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]"></div>
    </main>
  );
}
