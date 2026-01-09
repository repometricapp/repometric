'use client';

export default function Hero() {
  return (
    <>
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
    </>
  );
}
