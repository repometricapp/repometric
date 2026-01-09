import { NextResponse } from "next/server";
import { getGitHubAuthUrl } from "@/lib/auth";

export async function GET() {
  const { url, state } = getGitHubAuthUrl();
  const response = NextResponse.redirect(url);

  response.cookies.set("repometric_oauth_state", state, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 10
  });

  return response;
}
