"use client";

import { Button } from "@/components/ui/button";
import { type ExtendedRoomMessage } from "@/types";
import { useEffect, useState } from "react";
import { sendMessage } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { Textarea } from "@/components/ui/textarea";
import { pusherClient } from "@/lib/pusher";

type Props = {
  roomMessages: ExtendedRoomMessage[];
  roomId: string;
};

const Chat = ({ roomMessages: roomMessagesProp, roomId }: Props) => {
  const [roomMessages, setRoomMessages] =
    useState<ExtendedRoomMessage[]>(roomMessagesProp);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const roomMessageCallback = (message: ExtendedRoomMessage) => {
      setRoomMessages((prev) => [...prev, message]);
    };

    const channel = pusherClient.subscribe(`room-${roomId}`);
    channel.bind("room:message", roomMessageCallback);

    return () => {
      channel.unsubscribe();
      channel.unbind("room:message", roomMessageCallback);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    const newMessage = await sendMessage(roomId, message);

    if ("error" in newMessage) {
      toast({
        title: "Error",
        description: newMessage.error,
      });
    }

    setLoading(false);
  };

  return (
    <div className="flex flex-col gap-4 text-white">
      <h1>Chat</h1>
      {roomMessages.length === 0 && <p>No messages yet</p>}
      {roomMessages.map((message) => (
        <div key={message.id}>
          <p>{message.message}</p>
          <p>{message.user?.name}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button className="p-2" type="submit" disabled={loading}>
          Send
        </Button>
      </form>
    </div>
  );
};

export default Chat;
