import { getRooms, getUserRooms } from "../actions";
import { getServerAuthSession } from "@/server/auth";
import List from "./list";

const Rooms = async () => {
  const rooms = await getRooms();
  const myRooms = await getUserRooms();
  const session = await getServerAuthSession();

  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <h2 className="mb-4 text-xl font-semibold">My Rooms</h2>
        <List userId={session?.user?.id} rooms={myRooms} myRooms />
      </div>
      <div>
        <h2 className="mb-4 text-xl font-semibold">Rooms</h2>
        <List userId={session?.user?.id} rooms={rooms} />
      </div>
    </div>
  );
};

export default Rooms;
