import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuSkeleton,
} from "./ui/sidebar";
import { Skeleton } from "./ui/skeleton";

export default function SidebarSkeleton() {
  return (
    <Sidebar>
      <SidebarHeader>
        <Skeleton className="w-full h-8" />
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          {Array.from({ length: 5 }).map((_, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuSkeleton />
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <div className="flex gap-4 items-center p-2 w-full">
          <Skeleton className="w-12 h-10 rounded-full" />
          <div className="flex flex-col gap-2 items-start w-full">
            <Skeleton className="w-full h-4 rounded-full" />
            <Skeleton className="w-full h-4 rounded-full" />
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
