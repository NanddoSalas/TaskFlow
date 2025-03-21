import { type LucideIcon } from 'lucide-react';
import * as React from 'react';

import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

interface NavLinksProps
  extends React.ComponentPropsWithoutRef<typeof SidebarGroup> {
  items: {
    title: string;
    url: string;
    icon: LucideIcon;
  }[];
}

export const NavLinks: React.FC<NavLinksProps> = ({ items, ...props }) => {
  return (
    <SidebarGroup {...props}>
      <SidebarGroupContent>
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild size="sm">
                <a href={item.url} target="_blank">
                  <item.icon />

                  <span>{item.title}</span>
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  );
};
