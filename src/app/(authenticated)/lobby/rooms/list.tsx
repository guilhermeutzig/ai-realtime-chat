"use client";

import RoomCard from "./room-card";
import { type ExtendedRoom } from "@/types";

type Props = {
  rooms: ExtendedRoom[];
  userId?: string;
};

const List = ({ rooms, userId }: Props) => {
  return (
    <ul className="flex flex-col gap-4 p-0">
      {rooms?.map((room) => (
        <li key={room.id}>
          <RoomCard
            key={room.id}
            {...room}
            isOwner={room.createdBy?.id === userId}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
