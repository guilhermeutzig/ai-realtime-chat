"use client";

import RoomCard from "./room-card";
import { type RoomWithMembersCount } from "@/types";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { formatRooms } from "../utils";

type Props = {
  rooms: RoomWithMembersCount[];
  userId?: string;
};

const List = ({ rooms: roomsProp, userId }: Props) => {
  const [rooms, setRooms] = useState<RoomWithMembersCount[]>(roomsProp);

  useEffect(() => {
    const channel = pusherClient.subscribe("rooms");
    channel.bind("room:created", (data: RoomWithMembersCount) => {
      const formattedRoom = formatRooms([data]);
      setRooms((prev) => [...prev, ...formattedRoom]);
    });

    return () => {
      channel.unsubscribe();
      channel.unbind("room:created");
    };
  }, []);

  const handleDelete = (roomId: string) => {
    setRooms((prev) => prev.filter((room) => room.id !== roomId));
  };

  return (
    <ul className="flex flex-col gap-4 p-0">
      {rooms?.map((room) => (
        <li key={room.id}>
          <RoomCard
            key={room.id}
            {...room}
            isOwner={room.createdById === userId}
            onDelete={handleDelete}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
