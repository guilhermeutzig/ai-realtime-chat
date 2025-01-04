import Logo from "@/../public/logo.svg";
import styles from "./page.module.css";
import Rooms from "./rooms";
import { getServerAuthSession } from "@/server/auth";
import { getRooms } from "./actions";
import { ProfileMenu } from "@/components/profile-menu";

const Lobby = async () => {
  const session = await getServerAuthSession();
  const rooms = await getRooms();

  const allRooms = rooms.filter(
    (room) => room.createdBy?.id !== session?.user?.id,
  );
  const myRooms = rooms.filter(
    (room) => room.createdBy?.id === session?.user?.id,
  );

  return (
    <main className={styles.main}>
      <ProfileMenu session={session} />
      <div className={styles.container}>
        <Logo />
        <h4 className={styles.subtitle}>
          Try a new way to learn. Feel free to explore and interact!
        </h4>
        <Rooms myRooms={myRooms} rooms={allRooms} session={session} />
      </div>
    </main>
  );
};

export default Lobby;
