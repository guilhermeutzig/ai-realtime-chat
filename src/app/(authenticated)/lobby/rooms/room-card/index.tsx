"use client";

import { type ExtendedRoom } from "@/types";
import { deleteRoom, joinRoom, leaveRoom } from "../../actions";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { logError } from "@/lib/logger";
import { AudioLines, Users } from "lucide-react";
import styles from "./index.module.css";
import { cn } from "@/lib/utils";
import { DatePattern, formatDate } from "@/lib/date";

interface Props extends ExtendedRoom {
  isOwner: boolean;
}

const RoomCard = ({
  id,
  name,
  createdAt,
  createdBy,
  membersCount,
  maxMembers,
  description,
  isOwner,
  joined,
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteRoom = async () => {
    setLoading(true);
    await deleteRoom(id)
      .catch((error: Error) => {
        logError(error);
        toast({
          title: "Error!",
          description: "An error occurred while searching for rooms.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleJoinRoom = async () => {
    setLoading(true);
    await joinRoom(id)
      .catch((error: Error) => {
        logError(error);
        toast({
          title: "Error!",
          description: "An error occurred while joining the room.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const handleLeaveRoom = async () => {
    setLoading(true);
    await leaveRoom(id)
      .catch((error: Error) => {
        logError(error);
        toast({
          title: "Error!",
          description: "An error occurred while leaving the room.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles["first-row"]}>
        <h6 className="headline-6">{name}</h6>
        <div className={styles.icons}>
          <Users />
          <AudioLines />
        </div>
        <span className="body-1">
          {membersCount}/{maxMembers}
        </span>
      </div>
      <p>{description}</p>
      <div className={cn(styles["second-row"], "subtitle-2")}>
        <p className="subtitle-2">{createdBy?.name}</p>
        <time className="caption">
          {formatDate(createdAt, DatePattern.DateTime)}
        </time>
      </div>

      <div className={styles.buttons}>
        {!joined && (
          <button disabled={loading} onClick={handleJoinRoom}>
            Join
          </button>
        )}
        {joined && !isOwner && (
          <button disabled={loading} onClick={handleLeaveRoom}>
            Leave
          </button>
        )}
        {isOwner && (
          <button disabled={loading} onClick={handleDeleteRoom}>
            Delete
          </button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
