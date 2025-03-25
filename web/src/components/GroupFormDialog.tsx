import { useEffect, useState } from 'react';
import { useBearStore } from '../bearState';
import { useRequest } from '../hooks/useRequest';
import { Group } from '../types';
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
  boardId: number;
  groupId?: number;
}

export const GroupFormDialog: React.FC<GroupFormDialogProps> = ({
  open,
  onOpenChange,
  boardId,
  groupId,
}) => {
  const [name, setName] = useState('');
  const request = useRequest();
  const addGroup = useBearStore((state) => state.addGroup);
  const updateGroup = useBearStore((state) => state.updateGroup);

  const handleCreateGroup = async () => {
    onOpenChange();

    try {
      const group = await request<Group>('post', `/boards/${boardId}/groups`, {
        name,
      });

      addGroup(boardId!, group);
    } catch (err) {
      console.log(err);
    }
  };

  const handleUpdateGroup = async () => {
    onOpenChange();

    try {
      await request<Group>('patch', `/boards/${boardId}/groups/${groupId}`, {
        name,
      });

      updateGroup(groupId!, name);
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
