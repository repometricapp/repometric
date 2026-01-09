import { getDashboardData } from "@/lib/github";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const token = cookies().get("repometric_token")?.value;

  if (!token) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const data = await getDashboardData(token);
    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch dashboard data" },
      { status: 500 }
    );
  }
}
