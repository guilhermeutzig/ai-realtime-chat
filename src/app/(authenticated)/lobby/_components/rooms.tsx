import RoomList from "@/components/room-list";
import CreateRoom from "./create-room";
import { getRooms, getUserRooms } from "../actions";

const Rooms = async () => {
  const rooms = await getRooms();
  const myRooms = await getUserRooms();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-semibold">My Rooms</h2>
        </div>
        <RoomList rooms={myRooms} />
      </div>
      <div>
        <div className="flex items-center justify-between">
          <h2 className="mb-4 text-xl font-semibold">Rooms</h2>
          <CreateRoom />
        </div>
        <RoomList rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
