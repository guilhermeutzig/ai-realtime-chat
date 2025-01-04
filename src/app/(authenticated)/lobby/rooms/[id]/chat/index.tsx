"use client";

import { Button } from "@/components/ui/button";
import { type ExtendedRoomMessage } from "@/types";
import { useEffect, useMemo, useRef, useState } from "react";
import { sendMessage } from "../actions";
import { toast } from "@/components/ui/use-toast";
import { pusherClient } from "@/lib/pusher";
import dayjs from "dayjs";
import { DatePattern, formatDate } from "@/lib/date";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  roomMessages: ExtendedRoomMessage[];
  roomId: string;
};

const Chat = ({ roomMessages: roomMessagesProp, roomId }: Props) => {
  const [roomMessages, setRoomMessages] =
    useState<ExtendedRoomMessage[]>(roomMessagesProp);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const chatMaxHeight = wrapperRef?.current?.clientHeight ?? 400;

  useEffect(() => {
    const roomMessageCallback = (message: ExtendedRoomMessage) => {
      setRoomMessages((prev) => [...prev, message]);
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
      setLoading(false);
      return toast({
        title: "Error",
        description: newMessage.error,
      });
    }

    setLoading(false);
    setMessage("");
  };

  const groupedMessages = useMemo(() => {
    return roomMessages.reduce(
      (groups, message) => {
        const date = dayjs(message.createdAt);
        const today = dayjs();
        const yesterday = today.subtract(1, "day");

        let dateKey = date.format(DatePattern.WrittenDate);

        if (date.isSame(today, "day")) {
          dateKey = "Today";
        } else if (date.isSame(yesterday, "day")) {
          dateKey = "Yesterday";
        }

        if (!groups[dateKey]) {
          groups[dateKey] = [];
        }
        groups[dateKey].push(message);
        return groups;
      },
      {} as Record<string, ExtendedRoomMessage[]>,
    );
  }, [roomMessages]);

  return (
    <div
      ref={wrapperRef}
      className="grid grid-rows-[auto_max-content] flex-col gap-4 text-white"
    >
      {roomMessages.length === 0 ? (
        <p>No messages yet</p>
      ) : (
        <>
          {Object.entries(groupedMessages).map(([dateKey, messages]) => (
            <div
              className={cn(
                "relative flex flex-col gap-4 overflow-y-auto",
                `max-h-[${chatMaxHeight}px]`,
              )}
              key={dateKey}
            >
              <h2 className="text-uppercase button-2 sticky left-0 top-0 z-10 grid grid-cols-[max-content_auto] items-center gap-2 bg-background p-1">
                {dateKey}
                <span className="h-[2px] bg-border"></span>
              </h2>
              <div className="flex flex-col gap-2">
                {messages.map((message) => (
                  <div
                    className="grid grid-cols-[max-content_auto] items-start gap-2 rounded-sm bg-background-light p-3"
                    key={message.id}
                  >
                    <Avatar className="h-[32px] w-[32px]">
                      <AvatarImage src={message.user?.image ?? ""} />
                      <AvatarFallback>
                        {message.user?.name?.[0] ?? ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-2">
                      <div className="mt-[-4px] flex items-center gap-2">
                        <p className="subtitle-1 m-0 text-alternate">
                          {message.user?.name}
                        </p>
                        <p className="caption m-0 text-light">
                          {formatDate(message.createdAt, DatePattern.Time)}
                        </p>
                      </div>
                      <p className="body-1 m-0">{message.message}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </>
      )}
      <form
        onSubmit={handleSubmit}
        className="relative grid grid-cols-[auto_max-content] items-center gap-2 rounded-md border-2 border-border p-3"
      >
        <Input
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="body-1 rounded-none border-none bg-none p-0 text-white ring-0 placeholder:text-secondary-foreground focus-visible:ring-0"
        />
        <Button
          className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full p-2"
          type="submit"
          disabled={loading}
        >
          <ChevronDown className="rotate-180" />
        </Button>
      </form>
    </div>
  );
};

export default Chat;
