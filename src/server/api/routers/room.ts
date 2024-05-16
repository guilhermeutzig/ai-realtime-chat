import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { pusherServer } from "@/lib/pusher";
import { roomSelectFields } from "../utils";

export const roomRouter = createTRPCRouter({
  getRooms: protectedProcedure
    .input(z.object({ searchedRoom: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      const rooms = await ctx.db.room.findMany({
        where: {
          name: {
            contains: input.searchedRoom,
            mode: "insensitive",
          },
        },
        select: roomSelectFields,
      });

      const userJoinedRoomIds = await ctx.db.room.findMany({
        where: {
          id: {
            in: rooms.map((room) => room.id),
          },
          members: {
            some: {
              id: ctx.session.user.id,
            },
          },
        },
        select: {
          id: true,
        },
      });

      const roomIdsWithUser = userJoinedRoomIds.map((room) => room.id);

      return rooms.map((room) => ({
        ...room,
        joined: roomIdsWithUser.includes(room.id),
      }));
    }),

  createRoom: protectedProcedure
    .input(
      z.object({
        name: z.string().min(1),
        description: z.string().min(1),
        maxMembers: z.number().min(1),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const newRoom = await ctx.db.$transaction(async (prisma) => {
        const room = await prisma.room.create({
          data: {
            name: input.name,
            description: input.description,
            maxMembers: input.maxMembers,
            createdBy: { connect: { id: ctx.session.user.id } },
          },
          select: roomSelectFields,
        });

        await prisma.room.update({
          where: { id: room.id },
          data: { members: { connect: { id: ctx.session.user.id } } },
        });

        return room;
      });

      const room = await ctx.db.room.findUnique({
        where: { id: newRoom.id },
        select: roomSelectFields,
      });

      await pusherServer.trigger("rooms", "room:created", room);
      return newRoom;
    }),

  deleteRoom: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const deletedRoom = await ctx.db.room.delete({
        where: { id: input.id },
      });

      await pusherServer.trigger("rooms", "room:deleted", deletedRoom.id);
      return deletedRoom;
    }),

  joinRoom: protectedProcedure
    .input(z.object({ roomId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.db.room.findUnique({
        where: { id: input.roomId },
        select: {
          members: true,
          maxMembers: true,
        },
      });

      if (!room) {
        throw new Error("Room not found");
      }

      if (room.members.length >= room.maxMembers) {
        throw new Error("Room is full");
      }

      const joinedRoom = await ctx.db.room.update({
        where: { id: input.roomId },
        data: { members: { connect: { id: ctx.session.user.id } } },
        select: roomSelectFields,
      });

      await pusherServer.trigger("rooms", "room:joined", {
        ...joinedRoom,
        joined: ctx.session.user.id !== joinedRoom.createdBy.id,
      });

      return {
        ...joinedRoom,
        joined: ctx.session.user.id !== joinedRoom.createdBy.id,
      };
    }),

  leaveRoom: protectedProcedure
    .input(z.object({ roomId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      const room = await ctx.db.room.update({
        where: { id: input.roomId },
        data: { members: { disconnect: { id: ctx.session.user.id } } },
        select: roomSelectFields,
      });

      await pusherServer.trigger("rooms", "room:left", room);

      return room;
    }),

  editProfile: protectedProcedure
    .input(z.object({ name: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return await ctx.db.user.update({
        where: { id: ctx.session.user.id },
        data: { name: input.name },
      });
    }),
});
