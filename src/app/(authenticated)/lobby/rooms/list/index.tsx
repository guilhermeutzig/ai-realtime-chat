"use client";

import RoomCard from "../room-card";
import { type ExtendedRoom } from "@/types";
import styles from "./index.module.css";
import { TriangleAlert } from "lucide-react";

type Props = {
  rooms: ExtendedRoom[];
  userId?: string;
};

const List = ({ rooms, userId }: Props) => {
  if (rooms?.length === 0) {
    return (
      <div className={styles.empty}>
        <TriangleAlert className={styles.emptyIcon} />
        <p>No rooms found</p>
      </div>
    );
  }

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
