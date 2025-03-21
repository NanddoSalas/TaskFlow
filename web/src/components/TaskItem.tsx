import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useBearStore } from '../bearState';
import { Button } from './ui/button';
import { Card, CardDescription, CardHeader, CardTitle } from './ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface TaskItemProps {
  id: number;
}

export const TaskItem: React.FC<TaskItemProps> = ({ id }) => {
  const task = useBearStore((state) => state.tasks[id]);

  const handleClick = () => {
    // todo: implement function
    alert(`click ${task.title}`);
  };

  const handleRename: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    // todo: implement function
    alert(`rename ${task.title}`);
  };

  const handleDelete: React.MouseEventHandler<HTMLDivElement> = (event) => {
    event.stopPropagation();
    // todo: implement function
    alert(`delete ${task.title}`);
  };

  return (
    <Card
      key={task.id}
      className="py-4 hover:bg-neutral-100  hover:cursor-grab group"
      onClick={handleClick}
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
            <DropdownMenuItem onClick={handleRename}>
              <Pen />
              <span>Edit</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={handleDelete}>
              <Trash2 />
              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
    </Card>
  );
};
