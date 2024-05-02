import RoomList from "@/components/room-list";
import CreateRoom from "./create-room";
import { getRooms, getUserRooms } from "../actions";
import { getServerAuthSession } from "@/server/auth";

const Rooms = async () => {
  const rooms = await getRooms();
  const myRooms = await getUserRooms();
  const session = await getServerAuthSession();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-semibold">My Rooms</h2>
        </div>
        <RoomList userId={session?.user?.id} rooms={myRooms} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-semibold">Rooms</h2>
          <CreateRoom />
        </div>
        <RoomList userId={session?.user?.id} rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
