"use server";

import { getServerAuthSession } from "@/server/auth";
import { api } from "@/trpc/server";

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

export const deleteAllRooms = async () => {
  await api.room.deleteAllRooms();
};
