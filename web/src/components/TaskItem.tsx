import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useBearStore } from '../bearState';
import { useRequest } from '../hooks/useRequest';
import { Task } from '../types';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TaskItemProps {
  boardId: number;
  groupId: number;
  taskId: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  boardId,
  groupId,
  taskId,
}) => {
  const task = useBearStore((state) => state.tasks[taskId]);
  const request = useRequest();
  const deleteTask = useBearStore((state) => state.deleteTask);
  const openDialog = useBearStore((state) => state.openDialog);

  const handleDelete = async () => {
    try {
      await request<Task>(
        'delete',
        `/boards/${boardId}/groups/${groupId}/tasks/${taskId}`,
      );

      deleteTask(groupId, taskId);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Card
      key={task.id}
      className="py-4 hover:bg-neutral-100  hover:cursor-grab group"
      onClick={() => openDialog('update', 'task', { boardId, groupId, taskId })}
    >
      <CardHeader className="px-4 relative">
        <CardTitle>{task.title}</CardTitle>

        <CardDescription>{task.description}</CardDescription>

        <DropdownMenu>
          <DropdownMenuTrigger
            asChild
            className="absolute right-0 mr-4 opacity-0 group-hover:opacity-100"
          >
            <Button
              size={'icon'}
              className="size-7 hover:bg-neutral-200 hover:cursor-pointer"
              variant={'ghost'}
            >
              <MoreHorizontal />
            </Button>
          </DropdownMenuTrigger>

          <DropdownMenuContent className="w-32">
            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                openDialog('update', 'task', { boardId, groupId, taskId });
              }}
            >
              <Pen />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={(e) => {
                e.stopPropagation();
                handleDelete();
              }}
            >
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
};
