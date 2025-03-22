import { MoreHorizontal, Pen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useBearStore } from '../bearState';
import { classNames } from '../utils';
import { BoardFormDialog } from './BoardFormDialog';
import { DeleteBoardDialog } from './DeleteBoardDialog';
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

  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);

  const isSelected = selectedBoard === id;

  const handleClick = () => selectBoard(id);

  return (
    <>
      <DeleteBoardDialog
        open={isConfirmationOpen}
        onOpenChange={() => setIsConfirmationOpen(false)}
        boardId={id}
      />

      <BoardFormDialog
        open={isBoardFormOpen}
        onOpenChange={() => setIsBoardFormOpen(false)}
        boardId={id}
      />

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
            <DropdownMenuItem onClick={() => setIsBoardFormOpen(true)}>
              <Pen className="text-muted-foreground" />

              <span>Rename</span>
            </DropdownMenuItem>

            <DropdownMenuItem onClick={() => setIsConfirmationOpen(true)}>
              <Trash2 className="text-muted-foreground" />

              <span>Delete</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </>
  );
};
