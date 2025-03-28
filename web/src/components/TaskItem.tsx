import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useBearStore } from '../hooks/useBearStore';
import { useRequest } from '../hooks/useRequest';
import { Task, TaskPayload } from '../types';
import { classNames } from '../utils';
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
  index: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({
  boardId,
  groupId,
  taskId,
  index,
}) => {
  const task = useBearStore((state) => state.tasks[taskId]);
  const request = useRequest();
  const deleteTask = useBearStore((state) => state.deleteTask);
  const openDialog = useBearStore((state) => state.openDialog);
  const moveTaskToTask = useBearStore((state) => state.moveTaskToTask);

  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);

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

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({ groupId, taskId, index }),
        onDragStart: () => {
          setIsDragging(true);
        },
        onDrop: () => {
          setIsDragging(false);
        },
      }),

      dropTargetForElements({
        element,
        getData: () => ({ groupId, taskId, index }),
        canDrop: ({ source }) => {
          if ('boardId' in source.data) {
            return false;
          }

          return source.element !== element;
        },
        onDragEnter: () => {
          setIsDropTarget(true);
        },
        onDragLeave: () => {
          setIsDropTarget(false);
        },
        onDrop: ({ source, self }) => {
          setIsDropTarget(false);

          const newPosition = moveTaskToTask(
            source.data as unknown as TaskPayload,
            self.data as unknown as TaskPayload,
          );

          // todo: hit api to save new position
        },
      }),
    );
  }, [groupId, taskId, index, moveTaskToTask]);

  return (
    <Card
      key={task.id}
      className={classNames(
        'py-4 hover:bg-neutral-100  hover:cursor-grab group',
        isDragging ? 'opacity-50' : '',
        isDropTarget ? 'opacity-25' : '',
      )}
      onClick={() => openDialog('update', 'task', { boardId, groupId, taskId })}
      ref={ref}
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
