import { NextResponse } from "next/server";
import { getGitHubAuthUrl } from "@/lib/auth";
import { logger } from "@/lib/logging/logger";

export async function GET() {
  try {
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
  } catch (error) {
    logger.error({
      message: "Error during GitHub authentication redirect",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
