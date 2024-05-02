import RoomCard from "./_components/room-card";
import { type RoomWithMembersCount } from "@/types";

type Props = {
  rooms: RoomWithMembersCount[];
  userId?: string;
};

const RoomList = async ({ rooms, userId }: Props) => {
  return (
    <ul className="flex flex-col gap-4 p-0">
      {rooms.map((room) => (
        <li key={room.id}>
          <RoomCard
            key={room.id}
            isOwner={room.createdById === userId}
            {...room}
          />
        </li>
      ))}
    </ul>
  );
};

export default RoomList;
