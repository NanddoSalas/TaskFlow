import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { PlusIcon } from 'lucide-react';
import { useBearStore } from '../hooks/useBearStore';
import { NavActionItem } from './NavActionItem';

export const NavActions: React.FC = () => {
  const boardIds = useBearStore((state) => state.boardIds);
  const openDialog = useBearStore((state) => state.openDialog);

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Actions</SidebarGroupLabel>

      <SidebarMenu>
        <NavActionItem
          name="New Board"
          icon={PlusIcon}
          onClick={() =>
            openDialog('create', 'board', {
              boardId: null,
              groupId: null,
              taskId: null,
            })
          }
          disabled={boardIds === null}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};
