"use server";

import { getServerAuthSession } from "@/server/auth";
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

export const createRoom = async (formData: FormData) => {
  const session = await getServerAuthSession();

  if (!session) return { error: "You must be logged in" };

  const name = formData.get("name");
  const description = formData.get("description");
  const maxMembers = formData.get("maxMembers");

  if (!name || !description || !maxMembers)
    return { error: "All fields are required" };

  const newRoom = await api.room.createRoom({
    name: String(name),
    description: String(description),
    maxMembers: Number(maxMembers),
  });

  await api.room.addMemberToRoom({
    roomId: newRoom.id,
    userId: session.user.id,
  });

  return newRoom;
};

export const deleteRoom = async (id: string) => {
  await api.room.deleteRoom({ id });
};
