import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { PlusIcon } from 'lucide-react';
import { NavActionItem } from './NavActionItem';

export const NavActions: React.FC = () => {
  const handleNewBoard = () => {
    // todo: implement function
    alert('new board');
  };

  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Actions</SidebarGroupLabel>

      <SidebarMenu>
        <NavActionItem
          name="New Board"
          icon={PlusIcon}
          onClick={handleNewBoard}
        />
      </SidebarMenu>
    </SidebarGroup>
  );
};
