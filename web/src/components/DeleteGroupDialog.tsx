import { useBearStore } from '../hooks/useBearStore';
import { useRequest } from '../hooks/useRequest';
import { ConfirmationDialog } from './ConfirmationDialog';

interface DeleteGroupDialogProps {
  open: boolean;
  onOpenChange: () => void;
  boardId: number;
  groupId: number;
}

export const DeleteGroupDialog: React.FC<DeleteGroupDialogProps> = ({
  open,
  onOpenChange,
  boardId,
  groupId,
}) => {
  const deleteGroup = useBearStore((state) => state.deleteGroup);
  const request = useRequest();

  const handleDelete = async () => {
    deleteGroup(boardId, groupId);

    try {
      await request('delete', `/boards/${boardId}/groups/${groupId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfirmationDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete all the tasks in this group from our servers."
      open={open}
      onOpenChange={onOpenChange}
      onContinue={handleDelete}
    />
  );
};
