import GoogleSignInButton from "@/components/google-sign-in";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect("/lobby");

  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
        <CardDescription>Sign in to access the chat</CardDescription>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
      </CardContent>
    </Card>
  );
}
