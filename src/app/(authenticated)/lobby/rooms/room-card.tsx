"use client";

import { daysFromNow } from "@/lib/date";
import { type RoomWithMembersCount } from "@/types";
import { deleteRoom } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { AlertDialog } from "@/components/alert-dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface Props extends RoomWithMembersCount {
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
}: Props) => {
  const [loading, setLoading] = useState<boolean>(false);

  const handleDeleteRoom = async () => {
    setLoading(true);
    await deleteRoom(id)
      .then(() => {
        toast({
          title: "Success!",
          description: "Room deleted successfully.",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
      })
      .catch((error) => {
        // logError(error);
        alert(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="flex w-full flex-col items-start gap-2 rounded-lg border bg-card p-3 text-left text-sm transition-all hover:bg-accent">
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
    </div>
  );
};

export default RoomCard;
