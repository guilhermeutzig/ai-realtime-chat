import { type RoomWithMembersCount } from "@/types";
import { type User, type Room } from "@prisma/client";

interface ExtendedRoom extends Room {
  createdBy?: User;
  members?: User[];
}

export const formatRooms = (rooms: ExtendedRoom[]): RoomWithMembersCount[] => {
  return rooms.map((room) => ({
    id: room.id,
    name: room.name,
    createdBy: room.createdBy,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    createdById: room.createdById,
    maxMembers: room.maxMembers,
    description: room.description,
    membersCount: room.members?.length ?? 0,
  }));
};
