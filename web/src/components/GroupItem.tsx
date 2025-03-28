import { combine } from '@atlaskit/pragmatic-drag-and-drop/combine';
import {
  draggable,
  dropTargetForElements,
} from '@atlaskit/pragmatic-drag-and-drop/element/adapter';
import { Grip, MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { useBearStore } from '../hooks/useBearStore';
import { useRequest } from '../hooks/useRequest';
import { GroupPayload, TaskPayload } from '../types';
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
  const moveGroupToGroup = useBearStore((state) => state.moveGroupToGroup);
  const moveTaskToGroup = useBearStore((state) => state.moveTaskToGroup);
  const request = useRequest();

  const ref = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isDropTarget, setIsDropTarget] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    return combine(
      draggable({
        element,
        getInitialData: () => ({ boardId, groupId, index }),
        onDragStart: () => {
          setIsDragging(true);
        },
        onDrop: () => {
          setIsDragging(false);
        },
      }),

      dropTargetForElements({
        element,
        getData: () => ({ boardId, groupId, index }),
        canDrop: ({ source }) => {
          if ('taskId' in source.data) {
            if (source.data.groupId === groupId) return false;
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

          if ('taskId' in location.current.dropTargets[0].data) return;

          if ('taskId' in source.data) {
            const newPosition = moveTaskToGroup(
              source.data as unknown as TaskPayload,
              self.data as unknown as GroupPayload,
            );

            request(
              'patch',
              `/boards/${self.data.boardId}/groups/${source.data.groupId}/tasks/${source.data.taskId}`,
              {
                position: newPosition,
                groupId: self.data.groupId,
              },
            ).catch((err) => console.log(err));
          } else {
            const newPosition = moveGroupToGroup(
              source.data as unknown as GroupPayload,
              self.data as unknown as GroupPayload,
            );

            request(
              'patch',
              `/boards/${source.data.boardId}/groups/${source.data.groupId}`,
              {
                position: newPosition,
              },
            ).catch((err) => console.log(err));
          }
        },
      }),
    );
  }, [boardId, groupId, index, moveTaskToGroup, moveGroupToGroup, request]);

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
