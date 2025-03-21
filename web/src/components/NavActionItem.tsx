import { LucideIcon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface NavActionItemProps {
  name: string;
  icon: LucideIcon;
  onClick: () => void;
}

export const NavActionItem: React.FC<NavActionItemProps> = (item) => {
  return (
    <SidebarMenuItem onClick={item.onClick}>
      <SidebarMenuButton className="hover:cursor-pointer">
        <item.icon />

        <span>{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
