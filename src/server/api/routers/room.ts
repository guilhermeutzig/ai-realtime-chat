import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

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
        select: {
          id: true,
          name: true,
          createdBy: true,
          createdById: true,
          createdAt: true,
          updatedAt: true,
          maxMembers: true,
          description: true,
          members: {
            select: {
              _count: true,
            },
          },
        },
      });
    }),

  getUserRooms: protectedProcedure.query(({ ctx }) => {
    return ctx.db.room.findMany({
      where: {
        createdBy: {
          id: ctx.session.user.id,
        },
      },
      select: {
        id: true,
        name: true,
        createdBy: true,
        createdById: true,
        createdAt: true,
        updatedAt: true,
        maxMembers: true,
        description: true,
        members: {
          select: {
            _count: true,
          },
        },
      },
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
      return ctx.db.room.create({
        data: {
          name: input.name,
          description: input.description,
          maxMembers: input.maxMembers,
          createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),

  deleteRoom: protectedProcedure
    .input(z.object({ id: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.room.delete({ where: { id: input.id } });
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
