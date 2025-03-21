import { Plus } from 'lucide-react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';
import { GroupItem } from './GroupItem';

interface BoardProps {
  id: number;
}

export const Board: React.FC<BoardProps> = ({ id }) => {
  const groupIds = useBearStore((state) => state.boards[id].groupIds);

  const handleNewGroup = () => {
    // todo: implement function
    alert('new group');
  };

  // todo: fetch groups and tasks

  return (
    <div className="flex flex-1 gap-4">
      {groupIds?.map((groupId) => (
        <GroupItem key={groupId} id={groupId} />
      ))}

      {/* todo: disable new group button if fetching */}
      <div
        className={classNames(
          'flex flex-col gap-4 p-4 w-88 min-w-88 h-[120px]',
          'border hover:shadow-sm rounded-xl',
          'hover:bg-neutral-50 group hover:cursor-pointer',
        )}
        onClick={handleNewGroup}
      >
        <div className="flex gap-1 m-auto opacity-50 group-hover:opacity-100">
          <Plus />
          <span className="font-semibold">New Group</span>
        </div>
      </div>
    </div>
  );
};
