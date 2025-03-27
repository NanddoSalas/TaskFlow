import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { useBearStore } from '../hooks/useBearStore';
import { NavBoardItem } from './NavBoardItem';
import { Skeleton } from './ui/skeleton';

export const NavBoards: React.FC = () => {
  const boardIds = useBearStore((state) => state.boardIds);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Boards</SidebarGroupLabel>

      <SidebarMenu>
        {boardIds ? (
          boardIds.map((id) => <NavBoardItem id={id} key={id} />)
        ) : (
          <div className="flex gap-3 w-full flex-col">
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
            <Skeleton className="h-6 w-full" />
          </div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
