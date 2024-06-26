import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function Page() {
  const session = await getServerAuthSession();

  if (!session) return redirect("/sign-in");

  return redirect("/lobby");
}
