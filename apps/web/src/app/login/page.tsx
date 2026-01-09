"use client";

import { useEffect } from "react";
import { GithubIcon } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { getGitHubAuthUrl } from "@/features/auth/actions";

export default function LoginPage() {
  const handleLogin = async () => {
    const { url } = await getGitHubAuthUrl();
    window.location.href = url;
  };

  useEffect(() => {
    const url = new URL(window.location.href);
    const error = url.searchParams.get("error");
    if (error === "access_denied") {
      // Handle the access denied error, e.g., show a message to the user
      console.error("GitHub login was denied by the user.");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="rounded-lg border border-slate-200 bg-white p-8 text-center shadow-lg dark:border-slate-800 dark:bg-slate-900">
        <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100">
          RepoMetric
        </h1>
        <p className="mt-2 text-lg text-slate-600 dark:text-slate-400">
          GitHub Repository Analytics Dashboard
        </p>
        <Button
          className="mt-6 flex items-center justify-center gap-2"
          onClick={handleLogin}
          size="lg"
          variant="primary"
        >
          <GithubIcon size={20} />
          <span>Sign in with GitHub</span>
        </Button>
      </div>
      <footer className="absolute bottom-4 text-sm text-slate-500">
        &copy; {new Date().getFullYear()} RepoMetric. All rights reserved.
      </footer>
    </main>
  );
}
