import { Plus } from 'lucide-react';
import { useEffect } from 'react';
import { useBearStore } from '../hooks/useBearStore';
import { useRequest } from '../hooks/useRequest';
import { Group, Task } from '../types';
import { classNames } from '../utils';
import { GroupItem } from './GroupItem';
import { Skeleton } from './ui/skeleton';

interface BoardProps {
  id: number;
}

export const Board: React.FC<BoardProps> = ({ id }) => {
  const groupIds = useBearStore((state) => state.boards[id]?.groupIds);
  const setGroupsAndTasks = useBearStore((state) => state.setGroupsAndTasks);
  const openDialog = useBearStore((state) => state.openDialog);
  const request = useRequest();

  useEffect(() => {
    const fun = async () => {
      const groups = await request<Group[]>('get', `/boards/${id}/groups`);
      const tasks = await request<Task[]>('get', `/boards/${id}/tasks`);

      setGroupsAndTasks(id, groups, tasks);
    };

    if (groupIds === null) {
      fun().catch((err) => {
        console.log(err);
      });
    }
  }, [id]);

  return (
    <div className="flex flex-1 gap-4">
      {groupIds === null ? (
        <>
          <Skeleton className="w-88 min-w-88 rounded-xl h-128" />
          <Skeleton className="w-88 min-w-88 rounded-xl h-64" />
          <Skeleton className="w-88 min-w-88 rounded-xl h-72" />
        </>
      ) : (
        groupIds.map((groupId, index) => (
          <GroupItem
            key={groupId}
            boardId={id}
            groupId={groupId}
            index={index}
          />
        ))
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
          groupIds === null
            ? () => {}
            : () =>
                openDialog('create', 'group', {
                  boardId: id,
                  groupId: null,
                  taskId: null,
                })
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
  );
};
