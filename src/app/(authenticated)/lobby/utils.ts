import { type ExtendedRoom } from "@/types";

export const formatRooms = (rooms: ExtendedRoom[]): ExtendedRoom[] => {
  return rooms.map((room) => ({
    id: room.id,
    name: room.name,
    createdBy: room.createdBy,
    createdById: room.createdById,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    maxMembers: room.maxMembers,
    description: room.description,
    membersCount: room.members?.length ?? 0,
    joined: room.joined,
  }));
};
