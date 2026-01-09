const DEFAULT_SCOPES = "read:org repo";

function getRequiredEnv(name: string) {
  const value = process.env[name];
  if (!value) {
    throw new Error(`Missing env var: ${name}`);
  }
  return value;
}

export function getGitHubAuthUrl() {
  const clientId = getRequiredEnv("GITHUB_CLIENT_ID");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri =
    process.env.GITHUB_OAUTH_REDIRECT_URI || `${appUrl}/api/auth/callback`;
  const scope = process.env.GITHUB_OAUTH_SCOPES || DEFAULT_SCOPES;
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: clientId,
    redirect_uri: redirectUri,
    scope,
    state,
    allow_signup: "true"
  });

  return {
    url: `https://github.com/login/oauth/authorize?${params.toString()}`,
    state
  };
}

export async function exchangeCodeForToken(code: string) {
  const clientId = getRequiredEnv("GITHUB_CLIENT_ID");
  const clientSecret = getRequiredEnv("GITHUB_CLIENT_SECRET");
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
  const redirectUri =
    process.env.GITHUB_OAUTH_REDIRECT_URI || `${appUrl}/api/auth/callback`;

  const response = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code,
      redirect_uri: redirectUri
    })
  });

  if (!response.ok) {
    throw new Error("GitHub token exchange failed");
  }

  const payload = (await response.json()) as {
    access_token?: string;
    error?: string;
    error_description?: string;
  };

  if (payload.error || !payload.access_token) {
    throw new Error(payload.error_description || "OAuth token missing");
  }

  return payload.access_token;
}
