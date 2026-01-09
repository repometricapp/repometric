import { NextResponse } from "next/server";
import { logger } from "@/lib/logging/logger";

function clearAuthCookie() {
  try {
    const response = NextResponse.json({ ok: true });
    response.cookies.delete("repometric_token");
    return response;
  } catch (error) {
    logger.error({
      message: "Error clearing authentication cookie",
      error: error instanceof Error ? error.message : "Unknown error",
    });
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST() {
  return clearAuthCookie();
}

export async function GET() {
  return clearAuthCookie();
}
