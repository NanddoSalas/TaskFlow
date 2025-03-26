import { Plus } from 'lucide-react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';

interface NewTaskButtonProps {
  boardId: number;
  groupId: number;
}

export const NewTaskButton: React.FC<NewTaskButtonProps> = ({
  boardId,
  groupId,
}) => {
  const openDialog = useBearStore((state) => state.openDialog);

  return (
    <div
      className={classNames(
        'flex gap-1 p-2 justify-center rounded-xl border opacity-75',
        'hover:bg-card hover:cursor-pointer hover:shadow-sm hover:opacity-100',
      )}
      onClick={() =>
        openDialog('create', 'task', { boardId, groupId, taskId: null })
      }
    >
      <Plus />
      <span>New Task</span>
    </div>
  );
};
