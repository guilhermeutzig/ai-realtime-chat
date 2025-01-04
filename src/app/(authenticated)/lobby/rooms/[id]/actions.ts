"use server";

import { api } from "@/trpc/server";
import { formatRoom, formatRoomMembers, formatRoomMessages } from "./utils";
import { type Room } from "@prisma/client";
import { formatRooms } from "@/app/(authenticated)/lobby/utils";
import { type ExtendedRoomMessage } from "@/types";

export const getRoom = async (id: string) => {
  const room = await api.room.getRoom({ id });
  return formatRoom(room as Room);
};

export const getRoomMembers = async (id: string) => {
  const members = await api.room.getRoomMembers({ id });
  return formatRoomMembers(members!);
};

export const getJoinedRooms = async () => {
  const rooms = await api.room.getJoinedRooms();
  return formatRooms(rooms as Room[]);
};

export const getRoomMessages = async (id: string) => {
  const messages = await api.room.getRoomMessages({ id });
  return formatRoomMessages(messages as ExtendedRoomMessage[]);
};

export const sendMessage = async (id: string, message: string) => {
  if (!id || !message) return { error: "All fields are required" };

  const newMessage = await api.room.sendMessage({
    id,
    message,
  });

  return newMessage;
};
