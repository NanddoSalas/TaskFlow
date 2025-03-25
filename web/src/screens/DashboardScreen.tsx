import { useEffect } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { useBearStore } from '../bearState';
import { AppSidebar } from '../components/AppSidebar';
import { AppSidebarInset } from '../components/AppSidebarInset';
import { Board } from '../components/Board';
import { Home } from '../components/Home';
import { SidebarProvider } from '../components/ui/sidebar';
import { useRequest } from '../hooks/useRequest';
import { Board as BoardType } from '../types';

export const DashboardScreen = () => {
  const selectedBoard = useBearStore((state) => state.selectedBoard);
  const selectBoard = useBearStore((state) => state.selectBoard);
  const setBoards = useBearStore((state) => state.setBoards);
  const request = useRequest();

  // todo: fix esc hot key, should be disabled when a dialog is open
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
    <SidebarProvider>
      <AppSidebar />

      <AppSidebarInset>
        {selectedBoard === null ? <Home /> : <Board id={selectedBoard} />}
      </AppSidebarInset>
    </SidebarProvider>
  );
};
