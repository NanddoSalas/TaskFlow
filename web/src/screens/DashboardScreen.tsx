import { useHotkeys } from 'react-hotkeys-hook';
import { useBearStore } from '../bearState';
import { AppSidebar } from '../components/AppSidebar';
import { AppSidebarInset } from '../components/AppSidebarInset';
import { Board } from '../components/Board';
import { Home } from '../components/Home';
import { SidebarProvider } from '../components/ui/sidebar';

export const DashboardScreen = () => {
  const selectedBoard = useBearStore((state) => state.selectedBoard);
  const selectBoard = useBearStore((state) => state.selectBoard);

  useHotkeys('esc', () => selectBoard(null));

  return (
    <SidebarProvider>
      <AppSidebar />

      <AppSidebarInset>
        {selectedBoard === null ? <Home /> : <Board id={selectedBoard} />}
      </AppSidebarInset>
    </SidebarProvider>
  );
};
