import { NextResponse } from "next/server";

function clearAuthCookie() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("repometric_token");
  return response;
}

export async function POST() {
  return clearAuthCookie();
}

export async function GET() {
  return clearAuthCookie();
}
