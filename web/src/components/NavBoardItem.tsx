import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  SidebarMenuAction,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from './ui/sidebar';

interface NavBoardItemProps {
  id: number;
}

export const NavBoardItem: React.FC<NavBoardItemProps> = ({ id }) => {
  const { isMobile } = useSidebar();
  const board = useBearStore((state) => state.boards[id].board);
  const selectedBoard = useBearStore((state) => state.selectedBoard);
  const selectBoard = useBearStore((store) => store.selectBoard);

  const isSelected = selectedBoard === id;

  const handleClick = () => selectBoard(id);

  const handleRename = () => {
    // todo: implement funcion
    alert(`rename ${id}`);
  };

  const handleDelete = () => {
    // todo: implement funcion
    alert(`delete ${id}`);
  };

  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        asChild
        onClick={isSelected ? () => {} : handleClick}
        isActive={isSelected}
      >
        <a
          href="#"
          key={board.id}
          className={classNames(
            isSelected ? 'hover:cursor-default' : 'hover:cursor-pointer',
          )}
        >
          <span>{board.name}</span>
        </a>
      </SidebarMenuButton>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <SidebarMenuAction showOnHover className={'hover:cursor-pointer'}>
            <MoreHorizontal />
          </SidebarMenuAction>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          className="w-32"
          side={isMobile ? 'bottom' : 'right'}
          align={isMobile ? 'end' : 'start'}
        >
          <DropdownMenuItem onClick={handleRename}>
            <Pen className="text-muted-foreground" />

            <span>Rename</span>
          </DropdownMenuItem>

          <DropdownMenuItem onClick={handleDelete}>
            <Trash2 className="text-muted-foreground" />

            <span>Delete</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </SidebarMenuItem>
  );
};
