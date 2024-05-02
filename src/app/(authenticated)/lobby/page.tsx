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

export default async function Home() {
  const session = await getServerAuthSession();

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between gap-2">
          <div>
            <CardTitle>Welcome to the Lobby</CardTitle>
            <CardDescription>
              Feel free to explore and interact!
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">
              Signed in as{" "}
              <span className="font-semibold text-white">
                {session?.user?.name}
              </span>
            </span>
            <GoogleSignInButton signedIn={!!session} />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center justify-center gap-4">
          <p className="flex flex-col text-center text-2xl text-white">
            <Link
              href="/profile"
              title="Click here to edit your profile"
              className="text-blue-500 hover:underline"
            >
              Edit profile
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
