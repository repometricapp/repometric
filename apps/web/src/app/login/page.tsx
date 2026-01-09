'use client';

export default function LoginPage() {
  return (
    <>
      {/* Animated Grid Background */}
      <div className="pointer-events-none fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-50 via-white to-blue-50 dark:from-gray-900 dark:via-black dark:to-gray-900"></div>
        <div 
          className="absolute inset-0 animate-grid opacity-30 dark:opacity-40"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(0 0 0 / 0.15) 1px, transparent 1px), linear-gradient(to bottom, rgb(0 0 0 / 0.15) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        ></div>
        <div 
          className="absolute inset-0 animate-grid opacity-20 dark:opacity-30"
          style={{
            backgroundImage: `linear-gradient(to right, rgb(249 115 22 / 0.2) 2px, transparent 2px), linear-gradient(to bottom, rgb(249 115 22 / 0.2) 2px, transparent 2px)`,
            backgroundSize: '120px 120px',
            animationDuration: '30s'
          }}
        ></div>
      </div>

      <main className="relative flex w-full max-w-4xl flex-col items-center px-6 py-12 text-center md:py-20">
        {/* Hero Title */}
        <h1 className="mb-6 max-w-3xl font-display text-4xl font-bold leading-tight tracking-tight text-gray-900 dark:text-white md:text-6xl">
          RepoMetric turns GitHub signals into{" "}
          <span className="bg-gradient-to-r from-primary to-orange-400 bg-clip-text text-transparent">
            decisions.
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-12 max-w-2xl text-lg leading-relaxed text-text-muted-light dark:text-text-muted-dark md:text-xl">
          Track pipeline performance, repo health, and engineering momentum with a
          single dashboard built for teams that move fast.
        </p>

        {/* Sign In Card */}
        <div className="relative w-full max-w-md rounded-2xl border border-border-light bg-white p-8 shadow-xl dark:border-border-dark dark:bg-card-dark dark:shadow-none">
          {/* OAuth Badge */}
          <div className="absolute right-6 top-6">
            <span className="rounded border border-green-200 bg-green-100 px-2 py-0.5 text-[10px] font-bold text-green-700 dark:border-green-800 dark:bg-green-900/30 dark:text-green-400">
              OAuth
            </span>
          </div>

          {/* Card Header */}
          <div className="mb-6 text-left">
            <h2 className="mb-2 font-display text-2xl font-bold text-gray-900 dark:text-white">
              Sign in to RepoMetric
            </h2>
            <p className="text-sm leading-relaxed text-text-muted-light dark:text-text-muted-dark">
              Connect your GitHub orgs and keep an eye on engineering health.
            </p>
          </div>

          {/* GitHub Sign In Button */}
          <a
            href="/api/auth/login"
            className="flex w-full transform items-center justify-center gap-3 rounded-lg bg-primary px-4 py-3 font-semibold text-white shadow-md transition-all duration-200 hover:scale-[1.02] hover:bg-primary-hover hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 dark:focus:ring-offset-background-dark"
          >
            <svg className="h-5 w-5 fill-current" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"></path>
            </svg>
            Continue with GitHub
          </a>

          {/* Privacy Notice */}
          <div className="mt-6 rounded-lg border border-gray-100 bg-gray-50 p-4 dark:border-gray-800/50 dark:bg-black/30">
            <p className="text-center text-xs leading-relaxed text-text-muted-light dark:text-text-muted-dark">
              We only request read access to organization metadata. You can revoke
              access at any time from GitHub settings.
            </p>
          </div>
        </div>
      </main>
    </>
  );
}
