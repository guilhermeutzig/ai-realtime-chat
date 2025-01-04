"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { type User } from "@prisma/client";
import { Users } from "lucide-react";
import { use } from "react";

type Props = {
  membersPromise: Promise<User[]>;
  userId: string;
};

const Members = ({ membersPromise, userId }: Props) => {
  const members = use(membersPromise);

  return (
    <div className="flex flex-col gap-4">
      <header className="flex items-center gap-2">
        <Users className="h-[24px] w-[24px] text-primary" />
        <h1 className="section-title-2 font-normal text-white">
          MEMBERS ({members?.length ?? 1})
        </h1>
      </header>
      <div className="flex flex-col gap-3">
        {members.map((member) => (
          <div key={member.id} className="flex items-center gap-2 text-white  ">
            <Avatar className="h-[32px] w-[32px]">
              <AvatarImage src={member.image ?? ""} />
              <AvatarFallback>{member.name?.[0] ?? ""}</AvatarFallback>
            </Avatar>
            <p className="subtitle-2 m-0 text-white">
              {member.name} {member.id === userId && "(me)"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Members;
