import { Plus } from 'lucide-react';
import { useBearStore } from '../hooks/useBearStore';
import { classNames } from '../utils';
import { Button } from './ui/button';

export const Home = () => {
  const openDialog = useBearStore((state) => state.openDialog);

  return (
    <main className="px-6 py-24 sm:py-32 lg:py-48 lg:px-8">
      <div className="text-center">
        <h1
          className={classNames(
            'mt-4 font-semibold text-neutral-500',
            'text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl',
          )}
        >
          Welcome to TaskFlow!
        </h1>

        <p
          className={classNames(
            'mt-6 font-medium text-pretty text-gray-500',
            'text-md md:text-lg lg:text-xl',
          )}
        >
          Get started by creating or selecting a board to organize your tasks.
        </p>

        <div className="mt-10 flex justify-center">
          <Button
            variant="outline"
            size={'lg'}
            onClick={() =>
              openDialog('create', 'board', {
                boardId: null,
                groupId: null,
                taskId: null,
              })
            }
          >
            <Plus />
            Create New Board
          </Button>
        </div>
      </div>
    </main>
  );
};
