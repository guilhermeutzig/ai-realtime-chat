import { type Room } from "@prisma/client";

export interface RoomWithMembersCount extends Room {
  membersCount: number;
}
