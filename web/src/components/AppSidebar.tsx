import { Github } from 'lucide-react';
import * as React from 'react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from '@/components/ui/sidebar';
import { NavActions } from './NavActions';
import { NavBoards } from './NavBoards';
import { NavLinks } from './NavLinks';
import { NavLogo } from './NavLogo';
import { NavUser } from './NavUser';

export const AppSidebar: React.FC<React.ComponentProps<typeof Sidebar>> = ({
  ...props
}) => (
  <Sidebar variant="inset" {...props}>
    <SidebarHeader>
      <NavLogo />
    </SidebarHeader>

    <SidebarContent>
      <NavActions />

      <NavBoards />

      <NavLinks
        className="mt-auto"
        items={[
          {
            title: 'Source Code',
            url: 'https://github.com/NanddoSalas/TaskFlow',
            icon: Github,
          },
        ]}
      />
    </SidebarContent>

    <SidebarFooter>
      <NavUser />
    </SidebarFooter>
  </Sidebar>
);
