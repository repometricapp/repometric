import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForToken } from "@/libs/auth";
import { logger } from "@/libs/logging/logger";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = cookies().get("repometric_oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    logger.warn({
      message: "Invalid OAuth state",
      receivedState: state,
      storedState: storedState,
    });
    return NextResponse.json(
      { error: "Invalid OAuth state" },
      { status: 400 }
    );
  }

  try {
    const token = await exchangeCodeForToken(code);
    const response = NextResponse.redirect(new URL("/dashboard", request.url));

    response.cookies.set("repometric_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24
    });

    response.cookies.delete("repometric_oauth_state");

    return response;
  } catch (error) {
    logger.error({
      message: "Failed to exchange OAuth code for token",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json(
      { error: "OAuth failed" },
      { status: 500 }
    );
  }
}
