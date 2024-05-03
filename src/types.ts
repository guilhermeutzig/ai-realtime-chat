import { type User, type Room } from "@prisma/client";

export interface RoomWithMembersCount extends Room {
  membersCount?: number;
  createdBy?: User;
}
