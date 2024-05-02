import GoogleSignInButton from "@/components/google-sign-in";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import { redirect } from "next/navigation";
import { LogIn } from "lucide-react";

export default async function SignIn() {
  const session = await getServerAuthSession();

  if (session) return redirect("/lobby");

  return (
    <Card className="w-[300px] p-4 text-center">
      <CardHeader>
        <CardTitle className="flex items-center justify-center gap-4">
          Sign In <LogIn />
        </CardTitle>
      </CardHeader>
      <CardContent>
        <GoogleSignInButton />
      </CardContent>
    </Card>
  );
}
