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
  const handleDelete = () => {
    // todo: implement function
    alert(`delete board with id ${boardId}`);
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
