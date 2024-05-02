"use client";

import { Button } from "@/components/ui/button";
import { signIn, signOut } from "next-auth/react";

type Props = {
  signedIn?: boolean;
};

const GoogleSignInButton = ({ signedIn }: Props) => {
  if (signedIn) {
    return <Button onClick={() => signOut()}>Sign out</Button>;
  }

  return (
    <Button
      className="w-max-content"
      size={signedIn ? "sm" : "lg"}
      onClick={() => signIn("google")}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignInButton;
