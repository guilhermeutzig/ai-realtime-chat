"use client";

import RoomCard from "./room-card";
import { type RoomWithMembersCount } from "@/types";
import { useEffect, useState } from "react";
import { pusherClient } from "@/lib/pusher";
import { formatRooms } from "../utils";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Filters from "./filters";
import CreateRoom from "./create-room";
import { getAllRooms, getUserRooms } from "../actions";
import { logError } from "@/lib/logger";

type Props = {
  rooms: RoomWithMembersCount[];
  userId?: string;
  myRooms?: boolean;
};

const List = ({ rooms: roomsProp, userId, myRooms = false }: Props) => {
  const [rooms, setRooms] = useState<RoomWithMembersCount[]>(roomsProp);

  const searchRoomCallback = async (search: string) => {
    const newRooms = myRooms ? getUserRooms(search) : getAllRooms(search);
    await newRooms
      .then((rooms) => {
        setRooms(rooms);
      })
      .catch((error: Error) => {
        logError(error);
        toast({
          title: "Error!",
          description: "An error occurred while searching for rooms.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      });
  };

  useEffect(() => {
    const roomCreatedCallback = (data: RoomWithMembersCount) => {
      const isCreator = data.createdById === userId;
      const canUpdate = myRooms ? isCreator : !isCreator;

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
    <>
      <div className="mb-4 flex items-center justify-between">
        <Filters onSearch={searchRoomCallback} />
        {myRooms && <CreateRoom />}
      </div>
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
    </>
  );
};

export default List;
