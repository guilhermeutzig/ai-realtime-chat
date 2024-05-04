"use server";

import { api } from "@/trpc/server";
import { type RoomWithMembersCount } from "@/types";
import { formatRooms } from "./utils";
import { type Room } from "@prisma/client";

export const getAllRooms = async (
  searchedRoom = "",
): Promise<RoomWithMembersCount[]> => {
  const rooms = await api.room.getAllRooms({
    searchedRoom,
  });

  return formatRooms(rooms as Room[]);
};

export const getUserRooms = async (
  searchedRoom = "",
): Promise<RoomWithMembersCount[]> => {
  const rooms = await api.room.getUserRooms({ searchedRoom });
  return formatRooms(rooms as Room[]);
};

export const createRoom = async (formData: FormData) => {
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

  return newRoom;
};

export const deleteRoom = async (id: string) => {
  await api.room.deleteRoom({ id });
};
