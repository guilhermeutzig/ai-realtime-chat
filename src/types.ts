import { type User, type Room } from "@prisma/client";

export interface ExtendedRoom extends Room {
  createdBy?: User;
  createdById: string;
  members?: User[];
  membersCount?: number;
  joined?: boolean;
}
