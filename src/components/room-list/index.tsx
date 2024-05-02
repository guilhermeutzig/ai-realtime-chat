import RoomCard from "./_components/room-card";
import { type RoomWithMembersCount } from "@/types";

type Props = {
  rooms: RoomWithMembersCount[];
};

const RoomList = ({ rooms }: Props) => (
  <ul className="flex flex-col gap-4 p-0">
    {rooms.map((room) => (
      <li key={room.id}>
        <RoomCard key={room.id} {...room} />
      </li>
    ))}
  </ul>
);

export default RoomList;
