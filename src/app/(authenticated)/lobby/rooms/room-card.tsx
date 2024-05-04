"use client";

import { daysFromNow } from "@/lib/date";
import { type ExtendedRoom } from "@/types";
import { deleteRoom, joinRoom, leaveRoom } from "../actions";
import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { logError } from "@/lib/logger";

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
    <div className="flex w-full flex-col items-start gap-2 rounded-lg border bg-card p-3 text-left text-sm transition-all">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{name}</div>
          </div>
          <div className="ml-auto text-xs text-foreground">
            {membersCount}/{maxMembers}
          </div>
        </div>
        <div className="text-xs font-medium">{daysFromNow(createdAt)}</div>
        <div className="text-xs font-medium">
          {isOwner ? "You" : createdBy?.name}
        </div>
      </div>
      <div className="line-clamp-2 text-xs text-secondary-foreground">
        {description}
      </div>
      {isOwner && (
        <AlertDialog
          title="Delete Room"
          description={`Are you sure you want to delete room "${name}"?`}
          cancel="Cancel"
          action="Delete"
          onConfirm={handleDeleteRoom}
          button={
            <Button variant="outline" size="sm" disabled={loading}>
              Delete Room
            </Button>
          }
        />
      )}
      <div className="flex w-full justify-end">
        {!isOwner && !joined && (
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={handleJoinRoom}
          >
            Join Room
          </Button>
        )}
        {!isOwner && joined && (
          <Button
            variant="outline"
            size="sm"
            disabled={loading}
            onClick={handleLeaveRoom}
          >
            Leave Room
          </Button>
        )}
      </div>
    </div>
  );
};

export default RoomCard;
