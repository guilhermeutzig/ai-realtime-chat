import { type User, type Room, type RoomMessage } from "@prisma/client";

export interface ExtendedRoom extends Room {
  createdBy?: User;
  createdById: string;
  members?: User[];
  membersCount?: number;
  joined?: boolean;
}

export interface ExtendedRoomMessage extends RoomMessage {
  user?: User;
}
