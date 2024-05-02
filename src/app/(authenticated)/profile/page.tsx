import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <Card>
      <CardHeader>
        <CardTitle>Profile</CardTitle>
        <CardDescription>You can edit your nickname here.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center gap-24">
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
          <form className="flex max-w-[20rem] flex-col items-center gap-2">
            <label htmlFor="name" className="text-white">
              Name:
            </label>
            <Input
              id="name"
              type="text"
              defaultValue={session?.user?.name ?? ""}
              placeholder="John Doe"
            />

            <Button type="submit">Save Changes</Button>
            <Link href="/lobby">Back to Lobby</Link>
          </form>
        </div>
      </CardContent>
    </Card>
  );
}
