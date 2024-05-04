import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";
import { pusherServer } from "@/lib/pusher";
import { returnedRoomFields } from "../utils";

export const roomRouter = createTRPCRouter({
  getAllRooms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.room.findMany();
  }),

  getAllRoomsWithMembersCount: protectedProcedure
    .input(z.object({ searchedRoom: z.string().optional() }))
    .query(async ({ ctx, input }) => {
      return await ctx.db.room.findMany({
        where: {
          name: {
            contains: input.searchedRoom,
            mode: "insensitive",
          },
          NOT: {
            createdById: ctx.session.user.id,
          },
        },
        select: returnedRoomFields,
      });
    }),

  getUserRooms: protectedProcedure
    .input(z.object({ searchedRoom: z.string().optional() }))
    .query(({ ctx, input }) => {
      return ctx.db.room.findMany({
        where: {
          name: {
            contains: input.searchedRoom,
            mode: "insensitive",
          },
          createdBy: {
            id: ctx.session.user.id,
          },
        },
        select: returnedRoomFields,
      });
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
        });

        await prisma.room.update({
          where: { id: room.id },
          data: { members: { connect: { id: ctx.session.user.id } } },
        });

        return room;
      });

      await pusherServer.trigger("rooms", "room:created", newRoom);
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

  addMemberToRoom: protectedProcedure
    .input(z.object({ userId: z.string().min(1), roomId: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.update({
        where: { id: input.roomId },
        data: { members: { connect: { id: input.userId } } },
      });
    }),

  getLatest: protectedProcedure.query(({ ctx }) => {
    return ctx.db.room.findFirst({
      orderBy: { createdAt: "desc" },
      where: { createdBy: { id: ctx.session.user.id } },
    });
  }),
});
