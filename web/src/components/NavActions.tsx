import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { PlusIcon } from 'lucide-react';
import { useState } from 'react';
import { useBearStore } from '../bearState';
import { BoardFormDialog } from './BoardFormDialog';
import { NavActionItem } from './NavActionItem';

export const NavActions: React.FC = () => {
  const [isBoardFormOpen, setIsBoardFormOpen] = useState(false);
  const boardIds = useBearStore((state) => state.boardIds);

  return (
    <>
      <BoardFormDialog
        open={isBoardFormOpen}
        onOpenChange={() => setIsBoardFormOpen(false)}
      />

      <SidebarGroup className="group-data-[collapsible=icon]:hidden">
        <SidebarGroupLabel>Actions</SidebarGroupLabel>

        <SidebarMenu>
          <NavActionItem
            name="New Board"
            icon={PlusIcon}
            onClick={() => setIsBoardFormOpen(true)}
            disabled={boardIds === null}
          />
        </SidebarMenu>
      </SidebarGroup>
    </>
  );
};
