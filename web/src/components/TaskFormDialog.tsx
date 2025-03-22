import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';

interface TaskFormDialogProps {
  open: boolean;
  onOpenChange: () => void;
  taskId?: number;
}

export const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
  open,
  onOpenChange,
  taskId,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleCreateTask = () => {
    // todo: implement function
    alert(`create task with title${title} description ${description}`);
    onOpenChange();
  };

  const handleUpdateTask = () => {
    // todo: implement function
    alert(
      `update task with id ${taskId} title${title} description ${description}`,
    );
    onOpenChange();
  };

  useEffect(() => {
    if (open) {
      setTitle('');
      setDescription('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{taskId ? 'Edit Task' : 'Crate Task'}</DialogTitle>

          <DialogDescription>
            {taskId
              ? 'Edit the title or description to keep your task up to date!'
              : 'Add a title and a brief description to define your task and keep things clear!'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="title" className="text-right">
            Title
          </Label>

          <Input
            id="title"
            className="col-span-3"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="description" className="text-right">
            Description
          </Label>

          <Textarea
            id="description"
            className="col-span-3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button onClick={taskId ? handleUpdateTask : handleCreateTask}>
            {taskId ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
