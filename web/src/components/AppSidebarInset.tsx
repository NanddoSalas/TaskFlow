import { Separator } from '@radix-ui/react-separator';
import { ReactNode } from 'react';
import { useBearStore } from '../hooks/useBearStore';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
} from './ui/breadcrumb';
import { ScrollArea, ScrollBar } from './ui/scroll-area';
import { SidebarInset, SidebarTrigger } from './ui/sidebar';

interface AppSidebarInsetProps {
  children: ReactNode;
}

export const AppSidebarInset: React.FC<AppSidebarInsetProps> = ({
  children,
}) => {
  const selectedBoard = useBearStore((state) => state.selectedBoard);
  const placeholder = useBearStore((state) =>
    selectedBoard
      ? state.boards[selectedBoard]?.board.name
      : 'No board selected',
  );

  return (
    <SidebarInset className="overflow-x-hidden">
      <header className="flex h-16 shrink-0 items-center gap-2">
        <div className="flex items-center gap-2 px-4">
          <SidebarTrigger className="-ml-1 hover:cursor-pointer" />

          <Separator orientation="vertical" className="mr-2 h-4" />

          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbPage>{placeholder}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
        </div>
      </header>

      <ScrollArea className="flex flex-1 flex-col gap-4 m-4 mt-0">
        {children}
        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </SidebarInset>
  );
};
