import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { AppSidebar } from '../components/AppSidebar';
import { AppSidebarInset } from '../components/AppSidebarInset';
import { Board } from '../components/Board';
import { BoardFormDialog } from '../components/BoardFormDialog';
import { DeleteBoardDialog } from '../components/DeleteBoardDialog';
import { DeleteGroupDialog } from '../components/DeleteGroupDialog';
import { GroupFormDialog } from '../components/GroupFormDialog';
import { Home } from '../components/Home';
import { TaskFormDialog } from '../components/TaskFormDialog';
import { SidebarProvider } from '../components/ui/sidebar';
import { useBearStore } from '../hooks/useBearStore';
import { useRequest } from '../hooks/useRequest';
import { Board as BoardType } from '../types';

export const DashboardScreen = () => {
  const selectedBoard = useBearStore((state) => state.selectedBoard);
  const selectBoard = useBearStore((state) => state.selectBoard);
  const setBoards = useBearStore((state) => state.setBoards);
  const dialog = useBearStore((state) => state.dialog);
  const closeDialog = useBearStore((state) => state.closeDialog);
  const request = useRequest();

  useHotkeys('esc', () => selectBoard(null));

  useEffect(() => {
    request<BoardType[]>('get', '/boards')
      .then((boards) => {
        setBoards(boards);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <BoardFormDialog
        open={
          dialog.isOpen &&
          dialog.action === 'create' &&
          dialog.target === 'board'
        }
        onOpenChange={closeDialog}
      />

      <BoardFormDialog
        open={
          dialog.isOpen &&
          dialog.action === 'update' &&
          dialog.target === 'board'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
      />

      <DeleteBoardDialog
        open={
          dialog.isOpen &&
          dialog.action === 'delete' &&
          dialog.target === 'board'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
      />

      <GroupFormDialog
        open={
          dialog.isOpen &&
          dialog.action === 'create' &&
          dialog.target === 'group'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
      />

      <GroupFormDialog
        open={
          dialog.isOpen &&
          dialog.action === 'update' &&
          dialog.target === 'group'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
        groupId={dialog.groupId!}
      />

      <DeleteGroupDialog
        open={
          dialog.isOpen &&
          dialog.action === 'delete' &&
          dialog.target === 'group'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
        groupId={dialog.groupId!}
      />

      <TaskFormDialog
        open={
          dialog.isOpen &&
          dialog.action === 'create' &&
          dialog.target === 'task'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
        groupId={dialog.groupId!}
      />

      <TaskFormDialog
        open={
          dialog.isOpen &&
          dialog.action === 'update' &&
          dialog.target === 'task'
        }
        onOpenChange={closeDialog}
        boardId={dialog.boardId!}
        groupId={dialog.groupId!}
        taskId={dialog.taskId!}
      />

      <SidebarProvider>
        <AppSidebar />

        <AppSidebarInset>
          {selectedBoard === null ? <Home /> : <Board id={selectedBoard} />}
        </AppSidebarInset>
      </SidebarProvider>
    </>
  );
};
