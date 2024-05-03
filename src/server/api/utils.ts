export const returnedRoomFields = {
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
};
