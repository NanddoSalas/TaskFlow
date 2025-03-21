import { Command } from 'lucide-react';
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

export const NavLogo = () => (
  <SidebarMenu>
    <SidebarMenuItem>
      <SidebarMenuButton size="lg" asChild isActive>
        <div>
          <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
            <Command className="size-4" />
          </div>

          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-medium">TaskFlow</span>
            <span className="truncate text-xs">A Task Management App</span>
          </div>
        </div>
      </SidebarMenuButton>
    </SidebarMenuItem>
  </SidebarMenu>
);
