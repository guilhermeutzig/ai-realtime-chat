"use server";

import { api } from "@/trpc/server";
import { formatRoom, formatRoomMembers } from "./utils";
import { type Room } from "@prisma/client";
import { formatRooms } from "@/app/(authenticated)/lobby/utils";

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
