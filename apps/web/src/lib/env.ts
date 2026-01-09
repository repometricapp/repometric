function getRequiredEnv(name: string): string {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

export const GITHUB_CLIENT_ID = getRequiredEnv("GITHUB_CLIENT_ID");
export const GITHUB_CLIENT_SECRET = getRequiredEnv("GITHUB_CLIENT_SECRET");
export const NEXT_PUBLIC_APP_URL =
  process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
export const GITHUB_OAUTH_REDIRECT_URI = process.env.GITHUB_OAUTH_REDIRECT_URI;
export const GITHUB_OAUTH_SCOPES =
  process.env.GITHUB_OAUTH_SCOPES || "read:org repo";
