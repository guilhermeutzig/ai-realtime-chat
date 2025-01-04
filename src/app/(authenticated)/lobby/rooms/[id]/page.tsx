import { getServerAuthSession } from "@/server/auth";
import { notFound } from "next/navigation";
import { getJoinedRooms, getRoom } from "./actions";
import Navigation from "./navigation";

type Props = {
  params: {
    id: string;
  };
};

const Lobby = async ({ params }: Props) => {
  if (!params.id) return notFound();

  const session = await getServerAuthSession();
  const room = await getRoom(params.id);
  const joinedRooms = await getJoinedRooms();
  const sortedRooms = joinedRooms.sort(
    (a, b) => a.createdAt.getTime() - b.createdAt.getTime(),
  );

  return (
    <Navigation
      room={room}
      otherRooms={sortedRooms.filter((r) => r.id !== room.id)}
      session={session}
    />
  );
};

export default Lobby;
