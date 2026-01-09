import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function Home() {
  const token = cookies().get("repometric_token")?.value;

  if (token) {
    redirect("/demo");
  }

  redirect("/login");
}
