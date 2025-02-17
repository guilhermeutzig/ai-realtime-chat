import { type ExtendedRoom } from "@/types";
import styles from "./index.module.css";
import { ArrowLeftCircle, Hexagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Tooltip } from "@/components/ui/tooltip";
import ProfileMenu from "@/components/profile-menu";
import { type Session } from "next-auth";
import Link from "next/link";
import Members from "../members";
import { getRoomMembers, getRoomMessages } from "../actions";
import Chat from "../chat";

type Props = {
  room: ExtendedRoom;
  otherRooms: ExtendedRoom[];
  session: Session | null;
};

const Navigation = async ({ room, otherRooms, session }: Props) => {
  const roomMembersPromise = getRoomMembers(room.id);
  const roomMessages = await getRoomMessages(room.id);

  return (
    <nav className={styles.nav}>
      <div className={styles.navLeft}>
        <div className={styles.list}>
          <div className={styles.myRoom}>
            <Hexagon />
          </div>
          <div className={styles.divider} />
          {otherRooms.map((room) => (
            <div className={styles.listItem} key={room.id}>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Link href={`/lobby/rooms/${room.id}`}>
                      <div className={styles.listItem} key={room.id}>
                        <Hexagon />
                      </div>
                    </Link>
                  </TooltipTrigger>
                  <TooltipContent side="right">
                    <p>{room.name}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          ))}
        </div>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button className="flex w-max items-center gap-2 rounded-full p-2">
                <Link href="/lobby">
                  <ArrowLeftCircle />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right">Back to lobby</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
      <div className={styles.rightNav}>
        <div className={styles.navTop}>
          <div>
            <p className="headline-6 m-0 text-white">{room.name}</p>
            <p className="body-2 m-0 text-secondary-foreground">
              {room.description}
            </p>
          </div>
          <ProfileMenu session={session} />
        </div>
        <div className={styles.body}>
          <Chat roomMessages={roomMessages} roomId={room.id} />
          <Members
            membersPromise={roomMembersPromise}
            userId={session?.user.id ?? ""}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
