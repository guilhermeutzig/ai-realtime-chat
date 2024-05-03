import RoomList from "@/app/(authenticated)/lobby/room-list";
import CreateRoom from "./create-room";
import { getRooms, getUserRooms } from "./actions";
import { getServerAuthSession } from "@/server/auth";
import Filters from "./filters";

const Rooms = async () => {
  const rooms = await getRooms();
  const myRooms = await getUserRooms();
  const session = await getServerAuthSession();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="mb-4 flex flex-col gap-4">
          <h2 className="text-xl font-semibold">My Rooms</h2>
          <CreateRoom />
        </div>
        <RoomList userId={session?.user?.id} rooms={myRooms} />
      </div>
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Rooms</h2>
        </div>
        <Filters />
        <RoomList userId={session?.user?.id} rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
