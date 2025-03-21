import { Grip, MoreHorizontal, Pen, Plus, Trash2 } from 'lucide-react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';
import { TaskItem } from './TaskItem';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface GroupItemProps {
  id: number;
}

export const GroupItem: React.FC<GroupItemProps> = ({ id }) => {
  const { group, taskIds } = useBearStore((state) => state.groups[id]);

  const handleEdit = () => {
    // todo: implement function
    alert(`edit ${group.name}`);
  };

  const handleDelete = () => {
    // todo: implement function
    alert(`delete ${group.name}`);
  };

  const handleNewTask = () => {
    // todo: implement function
    alert('new task');
  };

  return (
    <div
      className={classNames(
        'flex flex-col gap-4 p-4',
        'border shadow-sm rounded-xl',
        'bg-neutral-50 w-88 min-w-88 h-fit',
      )}
    >
      <div className="flex justify-between">
        <Button
          variant="ghost"
          size="icon"
          className={'size-7 hover:cursor-grab'}
        >
          <Grip />
        </Button>

        <span className="font-semibold">{group.name}</span>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className={'size-7 hover:cursor-pointer'}
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-32">
            <DropdownMenuItem onClick={handleEdit}>
              <Pen />
              <span>Rename</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {taskIds?.map((taskId) => (
        <TaskItem key={taskId} id={taskId} />
      ))}

      {/* todo: disable new task button if fetching */}
      <div
        className={classNames(
          'flex gap-1 p-2 justify-center rounded-xl border opacity-75',
          'hover:bg-card hover:cursor-pointer hover:shadow-sm hover:opacity-100',
        )}
        onClick={handleNewTask}
      >
        <Plus />
        <span>New Task</span>
      </div>
    </div>
  );
};
