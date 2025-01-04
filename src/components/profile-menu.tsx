"use client";

import { signOut } from "next-auth/react";
import { ChevronDown, LogOut, User } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import React from "react";
import { type Session } from "next-auth";
import Link from "next/link";

type Props = {
  session: Session | null;
};

function ProfileMenu({ session }: Props) {
  if (!session?.user) return;

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="default"
            className="relative flex items-center gap-1 rounded-md border-2 border-border bg-background-light p-2"
          >
            <Avatar className="h-[32px] w-[32px] border-2 border-alternate">
              <AvatarImage
                src={session.user.image ?? ""}
                alt={session.user.name ?? ""}
              />
              <AvatarFallback>
                {session.user.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <ChevronDown className="h-[16px] w-[16px] text-alternate" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="w-56 border-2 border-border bg-background-light text-white"
          align="end"
          forceMount
        >
          <DropdownMenuLabel className="pt-2 font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {session.user.name}
              </p>
              <p className="text-muted-foreground text-xs leading-none">
                {session.user.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="transition-colors duration-200 hover:bg-secondary">
            <Link href="/profile" className="flex w-full items-center gap-2">
              <User className="mr-2 h-4 w-4" />
              <p>Profile</p>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            onClick={() => void signOut()}
            className="cursor-pointer transition-colors duration-200 hover:bg-secondary"
          >
            <LogOut className="mr-2 h-4 w-4" />
            <span>Log out</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ProfileMenu;
