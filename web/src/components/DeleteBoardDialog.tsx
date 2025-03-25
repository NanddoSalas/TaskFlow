import { useBearStore } from '../bearState';
import { useRequest } from '../hooks/useRequest';
import { ConfirmationDialog } from './ConfirmationDialog';

interface DeleteBoardDialogProps {
  open: boolean;
  onOpenChange: () => void;
  boardId: number;
}

export const DeleteBoardDialog: React.FC<DeleteBoardDialogProps> = ({
  open,
  onOpenChange,
  boardId,
}) => {
  const deleteBoard = useBearStore((state) => state.deleteBoard);
  const request = useRequest();

  const handleDelete = async () => {
    deleteBoard(boardId);

    try {
      await request('delete', `/boards/${boardId}`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <ConfirmationDialog
      title="Are you absolutely sure?"
      description="This action cannot be undone. This will permanently delete all the groups and tasks in this board from our servers."
      open={open}
      onOpenChange={onOpenChange}
      onContinue={handleDelete}
    />
  );
};
