import { Plus } from 'lucide-react';
import { useState } from 'react';
import { classNames } from '../utils';
import { TaskFormDialog } from './TaskFormDialog';

export const NewTaskButton = () => {
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);

  return (
    <>
      <TaskFormDialog
        open={isTaskFormOpen}
        onOpenChange={() => setIsTaskFormOpen(false)}
      />

      {/* todo: disable new task button if fetching */}
      <div
        className={classNames(
          'flex gap-1 p-2 justify-center rounded-xl border opacity-75',
          'hover:bg-card hover:cursor-pointer hover:shadow-sm hover:opacity-100',
        )}
        onClick={() => setIsTaskFormOpen(true)}
      >
        <Plus />
        <span>New Task</span>
      </div>
    </>
  );
};
