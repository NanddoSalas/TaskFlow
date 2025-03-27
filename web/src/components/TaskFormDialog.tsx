import { useEffect, useState } from 'react';
import { useBearStore } from '../hooks/useBearStore';
import { useRequest } from '../hooks/useRequest';
import { Task } from '../types';
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
  boardId: number;
  groupId: number;
  taskId?: number;
}

export const TaskFormDialog: React.FC<TaskFormDialogProps> = ({
  open,
  onOpenChange,
  boardId,
  groupId,
  taskId,
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const request = useRequest();
  const addTask = useBearStore((state) => state.addTask);
  const updateTask = useBearStore((state) => state.updateTask);

  const handleCreateTask = async () => {
    onOpenChange();

    try {
      const task = await request<Task>(
        'post',
        `/boards/${boardId}/groups/${groupId}/tasks`,
        {
          title: String(title).trim(),
          description: String(description).trim(),
        },
      );

      addTask(groupId, task);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateTask = async () => {
    onOpenChange();

    try {
      await request<Task>(
        'patch',
        `/boards/${boardId}/groups/${groupId}/tasks/${taskId}`,
        { title, description },
      );

      updateTask(taskId!, title, description);
    } catch (err) {
      console.log(err);
    }
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
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

              if (/^\s/.test(value)) {
                return;
              }

              setTitle(value);
            }}
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
            onChange={(e) => {
              const value = e.target.value;

              if (/^\s/.test(value)) {
                return;
              }

              setDescription(value);
            }}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={taskId ? handleUpdateTask : handleCreateTask}
            disabled={title === ''}
          >
            {taskId ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
