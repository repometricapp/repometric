"use server";

import {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_OAUTH_REDIRECT_URI,
  GITHUB_OAUTH_SCOPES,
} from "@/shared/libs/config";
import { NEXT_PUBLIC_APP_URL } from "@/shared/libs/env.public";
import { logger } from "@/shared/libs/logger";

export async function getGitHubAuthUrl() {
  const redirectUri =
    GITHUB_OAUTH_REDIRECT_URI || `${NEXT_PUBLIC_APP_URL}/api/auth/callback`;
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: GITHUB_CLIENT_ID,
    redirect_uri: redirectUri,
    scope: GITHUB_OAUTH_SCOPES,
    state,
    allow_signup: "true",
  });

  return {
    url: `https://github.com/login/oauth/authorize?${params.toString()}`,
    state,
  };
}

export async function exchangeCodeForToken(code: string) {
  const redirectUri =
    GITHUB_OAUTH_REDIRECT_URI || `${NEXT_PUBLIC_APP_URL}/api/auth/callback`;

  try {
    const response = await fetch(
      "https://github.com/login/oauth/access_token",
      {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          client_id: GITHUB_CLIENT_ID,
          client_secret: GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: redirectUri,
        }),
      }
    );

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
  } catch (error) {
    logger.error("Failed to exchange code for token:", error);
    throw new Error("Failed to exchange code for token");
  }
}
