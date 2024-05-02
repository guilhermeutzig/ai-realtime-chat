import { getServerAuthSession } from "@/server/auth";
import GoogleSignInButton from "@/components/google-sign-in";
import Link from "next/link";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import Rooms from "./_components/rooms";

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <Card className="w-[900px]">
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Welcome to the Lobby</CardTitle>
            <CardDescription>
              Feel free to explore and interact!
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-secondary-foreground">
              Signed in as{" "}
              <span className="font-semibold text-white">
                {session?.user?.name}
              </span>
            </span>
            <div className="flex items-center justify-between gap-2">
              <Link
                href="/profile"
                title="Click here to edit your profile"
                className="text-blue-500 hover:underline"
              >
                Edit profile
              </Link>
              <GoogleSignInButton signedIn={!!session} />
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Rooms />
      </CardContent>
    </Card>
  );
}
