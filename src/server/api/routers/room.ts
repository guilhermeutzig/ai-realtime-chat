import { z } from "zod";

import { createTRPCRouter, protectedProcedure } from "@/server/api/trpc";

export const roomRouter = createTRPCRouter({
  getAllRooms: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.room.findMany();
  }),

  getAllRoomsWithMembersCount: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.db.room.findMany({
      select: {
        id: true,
        name: true,
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

  deleteAllRooms: protectedProcedure.mutation(async ({ ctx }) => {
    return ctx.db.room.deleteMany();
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
