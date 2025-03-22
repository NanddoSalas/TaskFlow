import { ConfirmationDialog } from './ConfirmationDialog';

interface DeleteGroupDialogProps {
  open: boolean;
  onOpenChange: () => void;
  boardId: number;
}

export const DeleteGroupDialog: React.FC<DeleteGroupDialogProps> = ({
  open,
  onOpenChange,
  boardId,
}) => {
  const handleDelete = () => {
    // todo: implement function
    alert(`delete group with id ${boardId}`);
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
