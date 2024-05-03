"use client";

import RoomCard from "./room-card";
import { type RoomWithMembersCount } from "@/types";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { formatRooms } from "../utils";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

type Props = {
  rooms: RoomWithMembersCount[];
  userId?: string;
  myRooms?: boolean;
};

const List = ({ rooms: roomsProp, userId, myRooms = false }: Props) => {
  const [rooms, setRooms] = useState<RoomWithMembersCount[]>(roomsProp);

  useEffect(() => {
    const roomCreatedCallback = (data: RoomWithMembersCount) => {
      const canUpdate =
        (myRooms && data.createdById === userId) ||
        (!myRooms && data.createdById !== userId);

      if (canUpdate) {
        const formattedRoom = formatRooms([data]);
        setRooms((prev) => [...prev, ...formattedRoom]);
      }
    };

    const roomDeletedCallback = (roomId: string) => {
      setRooms((prev) => prev.filter((room) => room.id !== roomId));
      toast({
        title: "Success!",
        description: "Room deleted successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    };

    const channel = pusherClient.subscribe("rooms");
    channel.bind("room:created", roomCreatedCallback);
    channel.bind("room:deleted", roomDeletedCallback);

    return () => {
      channel.unsubscribe();
      channel.unbind("room:created", roomCreatedCallback);
      channel.unbind("room:deleted", roomDeletedCallback);
    };
  }, []);

  return (
    <ul className="flex flex-col gap-4 p-0">
      {rooms?.map((room) => (
        <li key={room.id}>
          <RoomCard
            key={room.id}
            {...room}
            isOwner={room.createdById === userId}
          />
        </li>
      ))}
    </ul>
  );
};

export default List;
