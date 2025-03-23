import { LucideIcon } from 'lucide-react';
import { SidebarMenuButton, SidebarMenuItem } from './ui/sidebar';

interface NavActionItemProps {
  name: string;
  icon: LucideIcon;
  disabled: boolean;
  onClick: () => void;
}

export const NavActionItem: React.FC<NavActionItemProps> = (item) => {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton
        className="hover:cursor-pointer"
        onClick={item.onClick}
        disabled={item.disabled}
      >
        <item.icon />

        <span>{item.name}</span>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
};
