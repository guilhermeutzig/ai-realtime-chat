import GoogleSignInButton from "@/components/google-sign-in";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect("/lobby");

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          AI <span className="text-[hsl(280,100%,70%)]">Real-time</span> Chat
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <GoogleSignInButton />
          </div>
        </div>
      </div>
    </main>
  );
}
