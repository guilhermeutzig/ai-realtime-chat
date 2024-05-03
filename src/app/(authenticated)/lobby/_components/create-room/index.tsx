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
import {
  createRoom,
  deleteAllRooms,
} from "@/app/(authenticated)/lobby/actions";

const CreateRoom = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    const formData = new FormData(event.currentTarget);

    try {
      await createRoom(formData);
      setOpen(false);
      return alert("Success!");
    } catch (error) {
      return alert(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteRooms = async () => {
    try {
      await deleteAllRooms();
      return alert("Success!");
    } catch (error) {
      return alert(error);
    }
  };

  return (
    <>
      <button
        onClick={handleDeleteRooms}
        className="rounded-md border bg-card px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent"
      >
        Delete rooms
      </button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <button className=" rounded-md border bg-card px-2.5 py-0.5 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-accent">
            Create Room
          </button>
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
    </>
  );
};

export default CreateRoom;
