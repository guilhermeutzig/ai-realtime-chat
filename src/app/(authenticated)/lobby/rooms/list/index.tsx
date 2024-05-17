"use client";

import RoomCard from "../room-card";
import { type ExtendedRoom } from "@/types";
import styles from "./index.module.css";

type Props = {
  rooms: ExtendedRoom[];
  userId?: string;
};

const List = ({ rooms, userId }: Props) => {
  return (
    <ul className={styles.list}>
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
