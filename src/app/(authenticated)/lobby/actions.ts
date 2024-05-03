"use server";

import { api } from "@/trpc/server";
import { type RoomWithMembersCount } from "@/types";

export const getRooms = async (): Promise<RoomWithMembersCount[]> => {
  const rooms = await api.room.getAllRoomsWithMembersCount();

  if (!rooms) return [];

  const formattedRooms: RoomWithMembersCount[] = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    createdBy: room.createdBy,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    createdById: room.createdById,
    maxMembers: room.maxMembers,
    description: room.description,
    membersCount: room.members.length,
  }));

  return formattedRooms;
};

export const getUserRooms = async (): Promise<RoomWithMembersCount[]> => {
  const rooms = await api.room.getUserRooms();

  if (!rooms) return [];

  const formattedRooms: RoomWithMembersCount[] = rooms.map((room) => ({
    id: room.id,
    name: room.name,
    createdAt: room.createdAt,
    updatedAt: room.updatedAt,
    createdById: room.createdById,
    maxMembers: room.maxMembers,
    description: room.description,
    membersCount: room.members.length,
  }));

  return formattedRooms;
};
