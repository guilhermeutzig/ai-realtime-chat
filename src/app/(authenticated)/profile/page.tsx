import { Input } from "@/components/ui/input";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          Profile
        </h1>
        <div className="flex flex-col items-center gap-2">
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex flex-col items-center text-center text-2xl text-white">
              <Image
                src={session?.user?.image ?? ""}
                alt="Profile Picture"
                className="h-24 w-24 rounded-full"
                width={96}
                height={96}
              />
              <span>{session?.user?.name}</span>
            </div>
            <form className="flex flex-col items-center gap-2">
              <label htmlFor="name" className="text-white">
                Name:
              </label>
              <Input
                id="name"
                type="text"
                defaultValue={session?.user?.name ?? ""}
                placeholder="John Doe"
              />

              <button
                type="submit"
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
