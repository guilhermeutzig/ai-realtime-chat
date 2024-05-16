"use server";

import { api } from "@/trpc/server";

export const editProfile = async (newName: string) => {
  await api.room.editProfile({ name: newName });
};
