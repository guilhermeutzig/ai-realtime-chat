import { type RoomWithMembersCount } from "@/types";

const RoomCard = ({
  name,
  createdById,
  createdAt,
  membersCount,
  maxMembers,
  description,
}: RoomWithMembersCount) => {
  return (
    <button className="flex w-full flex-col items-start gap-2 rounded-lg border bg-card p-3 text-left text-sm transition-all hover:bg-accent">
      <div className="flex w-full flex-col gap-1">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="font-semibold">{name}</div>
          </div>
          <div className="ml-auto text-xs text-foreground">
            {membersCount}/{maxMembers}
          </div>
        </div>
        <div className="text-xs font-medium">Owner: {createdById}</div>
        <div className="text-xs font-medium">{String(createdAt)}</div>
      </div>
      <div className="line-clamp-2 text-xs text-secondary-foreground">
        {description}
      </div>
    </button>
  );
};

export default RoomCard;
