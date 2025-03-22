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

interface GroupFormDialogProps {
  open: boolean;
  onOpenChange: () => void;
  groupId?: number;
}

export const GroupFormDialog: React.FC<GroupFormDialogProps> = ({
  open,
  onOpenChange,
  groupId,
}) => {
  const [name, setName] = useState('');

  const handleCreateGroup = () => {
    // todo: implement function
    alert(`create group with name ${name}`);
    onOpenChange();
  };

  const handleUpdateGroup = () => {
    // todo: implement function
    alert(`udate group with id ${groupId} with new name ${name}`);
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
          <DialogTitle>{groupId ? 'Rename Group' : 'New Group'}</DialogTitle>

          <DialogDescription>
            {groupId
              ? 'Rename your group to better reflect its tasks and purpose!'
              : 'Name your group to start organizing related tasks in one place!'}
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
          <Button onClick={groupId ? handleUpdateGroup : handleCreateGroup}>
            {groupId ? 'Save' : 'Create'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
