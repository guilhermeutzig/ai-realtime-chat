"use client";

import { Button } from "@/components/ui/button";
import { DialogHeader } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useState, type FormEvent } from "react";
import { createRoom } from "@/app/(authenticated)/lobby/actions";
import { toast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { logError } from "@/lib/logger";

const CreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    await createRoom(formData)
      .then((res) => {
        if ("error" in res) {
          return toast({
            title: "Error!",
            description: res.error,
            action: <ToastAction altText="Close">Close</ToastAction>,
          });
        }

        setOpen(false);
      })
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

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default" className="max-w-max">
          Create Room
        </Button>
      </DialogTrigger>
      <DialogContent className="text-white sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create room</DialogTitle>
          <DialogDescription>
            Fill the information below to create a public room.
          </DialogDescription>
        </DialogHeader>
        <form className="grid gap-6 py-4" onSubmit={handleSubmit}>
          <div className="grid gap-2">
            <Label htmlFor="name">Room name</Label>
            <Input
              id="name"
              name="name"
              placeholder="John Doe"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Max users</Label>
            <Input
              id="number"
              name="maxMembers"
              type="number"
              placeholder="10"
              className="col-span-3"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Here we talk about..."
              className="col-span-3"
            />
          </div>
          <Button type="submit" disabled={loading}>
            Save changes
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRoom;
