"use client";

import List from "./list";
import { type Session } from "next-auth";
import { type ExtendedRoom } from "@/types";
import { useEffect, useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { formatRooms } from "../utils";
import { pusherClient } from "@/lib/pusher";
import { Button } from "@/components/ui/button";
import styles from "./index.module.css";
import CreateRoom from "./create-room";

type Props = {
  myRooms: ExtendedRoom[];
  rooms: ExtendedRoom[];
  session: Session | null;
};

const Rooms = ({ myRooms: myRoomsProp, rooms: roomsProp, session }: Props) => {
  const [selected, setSelected] = useState<"my" | "all">("my");
  const [rooms, setRooms] = useState<ExtendedRoom[]>(roomsProp);
  const [myRooms, setMyRooms] = useState<ExtendedRoom[]>(myRoomsProp);

  useEffect(() => {
    const roomCreatedCallback = (room: ExtendedRoom) => {
      console.log("roomCreatedCallback");
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

    pusherClient.connection.bind(
      "state_change",
      (states: { current: string }) => {
        console.log("Pusher connection status:", states.current);
      },
    );
    pusherClient.connection.bind("error", (error: Error) => {
      console.error("Pusher connection error:", error);
    });

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

  // const searchRoomCallback = async (search: string) => {
  //   const newRooms = getRooms(search);
  //   await newRooms
  //     .then((rooms) => {
  //       setRooms(
  //         rooms.filter((room) => room.createdBy?.id !== session?.user?.id),
  //       );
  //     })
  //     .catch((error: Error) => {
  //       logError(error);
  //       toast({
  //         title: "Error!",
  //         description: "An error occurred while searching for rooms.",
  //         action: <ToastAction altText="Close">Close</ToastAction>,
  //       });
  //     });
  // };

  return (
    <>
      <div className={styles["grid-container"]}>
        <Button
          className={styles.button}
          variant={selected === "my" ? "big-active" : "big"}
          onClick={() => setSelected("my")}
        >
          My rooms
        </Button>
        <Button
          className={styles.button}
          variant={selected === "all" ? "big-active" : "big"}
          onClick={() => setSelected("all")}
        >
          Public rooms
        </Button>
        {selected === "my" && <CreateRoom />}
        {/* <Filters onSearch={searchRoomCallback} /> */}
      </div>
      <List
        userId={session?.user?.id}
        rooms={selected === "my" ? myRooms : rooms}
      />
    </>
  );
};

export default Rooms;
