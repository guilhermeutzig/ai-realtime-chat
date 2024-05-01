import { getServerAuthSession } from "@/server/auth";
import GoogleSignInButton from "@/components/google-sign-in";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Lobby
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <p className="flex flex-col text-center text-2xl text-white">
              <span>Logged in as {session?.user?.name}</span>
              <Link
                href="/profile"
                title="Click here to edit your profile"
                className="text-blue-500 hover:underline"
              >
                Edit profile
              </Link>
            </p>
            <GoogleSignInButton signedIn={!!session} />
          </div>
        </div>
      </div>
    </main>
  );
}
