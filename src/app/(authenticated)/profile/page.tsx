import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { getServerAuthSession } from "@/server/auth";
import Image from "next/image";
import EditProfileForm from "./form";

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
          <EditProfileForm />
        </div>
      </CardContent>
    </Card>
  );
}
