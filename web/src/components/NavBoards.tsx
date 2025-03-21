import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { useBearStore } from '../bearState';
import { NavBoardItem } from './NavBoardItem';

export const NavBoards: React.FC = () => {
  const boardIds = useBearStore((state) => state.boardIds);

  // todo: fetch boards

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Boards</SidebarGroupLabel>

      <SidebarMenu>
        {boardIds ? (
          boardIds.map((id) => <NavBoardItem id={id} />)
        ) : (
          // todo: implement a loading skeleton
          <div></div>
        )}
      </SidebarMenu>
    </SidebarGroup>
  );
};
