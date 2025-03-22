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

interface BoardFormDialogProps {
  open: boolean;
  onOpenChange: () => void;
  boardId?: number;
}

export const BoardFormDialog: React.FC<BoardFormDialogProps> = ({
  open,
  onOpenChange,
  boardId,
}) => {
  const [name, setName] = useState('');

  const handleCreateBoard = () => {
    // todo: implement function
    alert(`create board with name ${name}`);
    onOpenChange();
  };

  const handleUpdateBoard = () => {
    // todo: implement function
    alert(`udate board with id ${boardId} with new name ${name}`);
    onOpenChange();
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
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <DialogFooter>
          <Button onClick={boardId ? handleUpdateBoard : handleCreateBoard}>
            {boardId ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
