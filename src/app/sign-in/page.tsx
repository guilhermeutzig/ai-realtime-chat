import GoogleSignInButton from "@/components/google-sign-in";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect("/lobby");

  return (
    <Card className="w-[300px] p-4 text-center">
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
      </CardContent>
    </Card>
  );
}
