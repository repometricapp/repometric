import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { exchangeCodeForToken } from "@/lib/auth";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get("code");
  const state = searchParams.get("state");
  const storedState = cookies().get("repometric_oauth_state")?.value;

  if (!code || !state || !storedState || state !== storedState) {
    return NextResponse.json(
      { error: "Invalid OAuth state" },
      { status: 400 }
    );
  }

  try {
    const token = await exchangeCodeForToken(code);
    const response = NextResponse.redirect(new URL("/", request.url));

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
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "OAuth failed" },
      { status: 500 }
    );
  }
}
