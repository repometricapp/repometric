"use client";

import { useEffect } from "react";
import { logger } from "@/libs/logger";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  useEffect(() => {
    logger.error("Dashboard error:", error);
  }, [error]);

  return (
    <main className="flex min-h-screen w-full flex-col items-center justify-center bg-background-light text-slate-900 dark:bg-background-dark dark:text-slate-100">
      <p className="mb-4">Something went wrong.</p>
      <button
        onClick={() => reset()}
        className="rounded bg-primary px-4 py-2 text-white"
      >
        Try again
      </button>
    </main>
  );
}
