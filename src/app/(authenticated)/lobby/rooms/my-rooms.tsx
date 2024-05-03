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

const MyRooms = ({ rooms: roomsProp, userId }: Props) => {
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

  return (
    <ul className="flex flex-col gap-4 p-0">
      {rooms?.map((room) => (
        <li key={room.id}>
          <RoomCard
            key={room.id}
            isOwner={room.createdById === userId}
            {...room}
          />
        </li>
      ))}
    </ul>
  );
};

export default MyRooms;
