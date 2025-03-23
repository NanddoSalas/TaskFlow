import { Plus } from 'lucide-react';
import { useState } from 'react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';
import { GroupFormDialog } from './GroupFormDialog';
import { GroupItem } from './GroupItem';
import { Skeleton } from './ui/skeleton';

interface BoardProps {
  id: number;
}

export const Board: React.FC<BoardProps> = ({ id }) => {
  const groupIds = useBearStore((state) => state.boards[id].groupIds);

  const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);

  // todo: fetch groups and tasks

  return (
    <>
      <GroupFormDialog
        open={isGroupFormOpen}
        onOpenChange={() => setIsGroupFormOpen(false)}
      />

      <div className="flex flex-1 gap-4">
        {groupIds === null ? (
          <>
            <Skeleton className="w-88 min-w-88 rounded-xl h-128" />
            <Skeleton className="w-88 min-w-88 rounded-xl h-64" />
            <Skeleton className="w-88 min-w-88 rounded-xl h-72" />
          </>
        ) : (
          groupIds.map((groupId) => <GroupItem key={groupId} id={groupId} />)
        )}

        <div
          className={classNames(
            'flex flex-col gap-4 p-4 w-88 min-w-88 h-[120px]',
            'border rounded-xl',
            groupIds === null
              ? 'opacity-25'
              : 'hover:bg-neutral-50 hover:cursor-pointer hover:shadow-sm group',
          )}
          onClick={
            groupIds === null ? () => {} : () => setIsGroupFormOpen(true)
          }
        >
          <div
            className={classNames(
              'flex gap-1 m-auto',
              groupIds === null ? '' : 'opacity-50 group-hover:opacity-100',
            )}
          >
            <Plus />
            <span className="font-semibold">New Group</span>
          </div>
        </div>
      </div>
    </>
  );
};
