"use client";

import List from "./list";
import { type Session } from "next-auth";
import { type ExtendedRoom } from "@/types";
import { useEffect, useState } from "react";
import { getRooms } from "../actions";
import { logError } from "@/lib/logger";
import { toast } from "@/components/ui/use-toast";
import Filters from "./filters";
import { ToastAction } from "@/components/ui/toast";
import { formatRooms } from "../utils";
import { pusherClient } from "@/lib/pusher";
import CreateRoom from "./create-room";

type Props = {
  myRooms: ExtendedRoom[];
  rooms: ExtendedRoom[];
  session: Session | null;
};

const Rooms = ({ myRooms: myRoomsProp, rooms: roomsProp, session }: Props) => {
  const [rooms, setRooms] = useState<ExtendedRoom[]>(roomsProp);
  const [myRooms, setMyRooms] = useState<ExtendedRoom[]>(myRoomsProp);

  useEffect(() => {
    const roomCreatedCallback = (room: ExtendedRoom) => {
      const isCreator = room.createdBy?.id === session?.user?.id;
      const setNewRoom = isCreator ? setMyRooms : setRooms;
      const formattedRoom = formatRooms([room]);

      setNewRoom((prev) => [...prev, ...formattedRoom]);
      toast({
        title: "Success!",
        description: "Room created successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    };

    const roomDeletedCallback = (roomId: string) => {
      setMyRooms((prev) => prev.filter((room) => room.id !== roomId));
      toast({
        title: "Success!",
        description: "Room deleted successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    };

    const roomJoinedCallback = (room: ExtendedRoom) => {
      const isCreator = room.createdBy?.id === session?.user?.id;
      const setNewRoom = isCreator ? setMyRooms : setRooms;
      const formattedRoom = formatRooms([room])[0];

      setNewRoom((prev) =>
        prev.map((room) =>
          room.id === formattedRoom.id ? formattedRoom : room,
        ),
      );
      toast({
        title: "Success!",
        description: "Room joined successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    };

    const roomLeftCallback = (room: ExtendedRoom) => {
      const isCreator = room.createdBy?.id === session?.user?.id;
      const setNewRoom = isCreator ? setMyRooms : setRooms;
      const formattedRoom = formatRooms([room])[0];

      setNewRoom((prev) =>
        prev.map((room) =>
          room.id === formattedRoom.id ? formattedRoom : room,
        ),
      );
      toast({
        title: "Success!",
        description: "Room left successfully.",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
    };

    const channel = pusherClient.subscribe("rooms");
    channel.bind("room:created", roomCreatedCallback);
    channel.bind("room:deleted", roomDeletedCallback);
    channel.bind("room:joined", roomJoinedCallback);
    channel.bind("room:left", roomLeftCallback);

    return () => {
      channel.unsubscribe();
      channel.unbind("room:created", roomCreatedCallback);
      channel.unbind("room:deleted", roomDeletedCallback);
      channel.unbind("room:joined", roomJoinedCallback);
      channel.unbind("room:left", roomLeftCallback);
    };
  }, []);

  const searchRoomCallback = async (search: string) => {
    const newRooms = getRooms(search);
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

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="mb-4 text-xl font-semibold">My Rooms</h2>
        <div className="mb-4 flex items-center justify-between">
          <CreateRoom />
        </div>
        <List userId={session?.user?.id} rooms={myRooms} />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">Rooms</h2>
        <div className="mb-4 flex items-center justify-between">
          <Filters onSearch={searchRoomCallback} />
        </div>
        <List userId={session?.user?.id} rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
