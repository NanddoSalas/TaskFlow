import { Grip, MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';
import { DeleteGroupDialog } from './DeleteGroupDialog';
import { GroupFormDialog } from './GroupFormDialog';
import { NewTaskButton } from './NewTaskButton';
import { TaskItem } from './TaskItem';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface GroupItemProps {
  boardId: number;
  groupId: number;
}

export const GroupItem: React.FC<GroupItemProps> = ({ boardId, groupId }) => {
  const { group, taskIds } = useBearStore((state) => state.groups[groupId]);

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isGroupFormOpen, setIsGroupFormOpen] = useState(false);

  return (
    <>
      <DeleteGroupDialog
        open={isConfirmationOpen}
        onOpenChange={() => setIsConfirmationOpen(false)}
        boardId={boardId}
        groupId={groupId}
      />

      <GroupFormDialog
        open={isGroupFormOpen}
        onOpenChange={() => setIsGroupFormOpen(false)}
        boardId={boardId}
        groupId={groupId}
      />

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
              <DropdownMenuItem onClick={() => setIsGroupFormOpen(true)}>
                <Pen />
                <span>Rename</span>
              </DropdownMenuItem>

              <DropdownMenuItem onClick={() => setIsConfirmationOpen(true)}>
                <Trash2 />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {taskIds?.map((taskId) => (
          <TaskItem
            key={taskId}
            boardId={boardId}
            groupId={groupId}
            taskId={taskId}
          />
        ))}

        <NewTaskButton boardId={boardId} groupId={groupId} />
      </div>
    </>
  );
};
