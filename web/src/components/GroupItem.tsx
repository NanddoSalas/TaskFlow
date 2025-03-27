import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Grip, MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useBearStore } from '../bearState';
import { Task } from '../types';
import { classNames } from '../utils';
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
  index: number;
}

export const GroupItem: React.FC<GroupItemProps> = ({
  boardId,
  groupId,
  index,
}) => {
  const { group, taskIds } = useBearStore((state) => state.groups[groupId]);
  const openDialog = useBearStore((state) => state.openDialog);

  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({ boardId, index, group }),
        onDragStart: () => {
          setIsDragging(true);
        },
        onDrop: () => {
          setIsDragging(false);
        },
      }),

      dropTargetForElements({
        element,
        getData: () => ({ boardId, index, group }),
        canDrop: ({ source }) => {
          if ('task' in source.data) {
            const t = source.data.task as Task;

            if (t.groupId === group.id) return false;
          }

          return source.element !== element;
        },
        onDragEnter: () => {
          setIsDropTarget(true);
        },
        onDragLeave: () => {
          setIsDropTarget(false);
        },
        onDrop: ({ source, self, location }) => {
          setIsDropTarget(false);

          if ('task' in location.current.dropTargets[0].data) return;

          console.log(source.data, self.data);
        },
      }),
    );
  }, [boardId, index, group]);

  return (
    <div
      className={classNames(
        'flex flex-col gap-4 p-4',
        'border shadow-sm rounded-xl',
        'bg-neutral-50 w-88 min-w-88 h-fit',
        isDragging ? 'opacity-50' : '',
        isDropTarget ? 'border-neutral-700' : '',
      )}
      ref={ref}
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
            <DropdownMenuItem
              onClick={() =>
                openDialog('update', 'group', {
                  boardId,
                  groupId,
                  taskId: null,
                })
              }
            >
              <Pen />
              <span>Rename</span>
            </DropdownMenuItem>

            <DropdownMenuItem
              onClick={() =>
                openDialog('delete', 'group', {
                  boardId,
                  groupId,
                  taskId: null,
                })
              }
            >
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {taskIds?.map((taskId, index) => (
        <TaskItem
          key={taskId}
          boardId={boardId}
          groupId={groupId}
          taskId={taskId}
          index={index}
        />
      ))}

      <NewTaskButton boardId={boardId} groupId={groupId} />
    </div>
  );
};
