import { useEffect, useState } from 'react';
import { useBearStore } from '../bearState';
import { useRequest } from '../hooks/useRequest';
import { Board } from '../types';
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

interface BoardFormDialogProps {
  open: boolean;
  onOpenChange: () => void;
  boardId?: number;
  selectBoard?: boolean;
}

export const BoardFormDialog: React.FC<BoardFormDialogProps> = ({
  open,
  onOpenChange,
  boardId,
  selectBoard,
}) => {
  const [name, setName] = useState('');
  const request = useRequest();
  const addBoard = useBearStore((state) => state.addBoard);
  const updateBoard = useBearStore((state) => state.updateBoard);

  const handleCreateBoard = async () => {
    onOpenChange();

    try {
      const board = await request<Board>('post', '/boards', {
        name: String(name).trim(),
      });

      addBoard(board, selectBoard);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateBoard = async () => {
    onOpenChange();

    try {
      await request<Board>('patch', `/boards/${boardId}`, {
        name: String(name).trim(),
      });

      updateBoard(boardId!, name);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (open) {
      setName('');
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{boardId ? 'Remane Board' : 'New Board'}</DialogTitle>

          <DialogDescription>
            {boardId
              ? 'Update your board’s name to keep it relevant and organized!'
              : 'Give your new board a name and start organizing your tasks effortlessly!'}
          </DialogDescription>
        </DialogHeader>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="name" className="text-right">
            Name
          </Label>

          <Input
            id="name"
            className="col-span-3"
            value={name}
            onChange={(e) => {
              const value = e.target.value.replace(/[^a-zA-Z0-9 ]/g, '');

              if (/^\s/.test(value)) {
                return;
              }

              setName(value);
            }}
          />
        </div>

        <DialogFooter>
          <Button
            onClick={boardId ? handleUpdateBoard : handleCreateBoard}
            disabled={name === ''}
          >
            {boardId ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
