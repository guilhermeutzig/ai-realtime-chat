import { type ExtendedRoom } from "@/types";
import { type User } from "@prisma/client";

export const formatRoom = (room: ExtendedRoom): ExtendedRoom => {
  return {
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
  };
};

export const formatRoomMembers = (members: User[]): User[] => {
  return members.map((member) => ({
    id: member.id,
    name: member.name,
    email: member.email,
    emailVerified: member.emailVerified,
    image: member.image,
  }));
};
