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
import UserAvatarSkeleton from "./user-avatar-skeleton";

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
        <UserAvatarSkeleton />
      </SidebarFooter>
    </Sidebar>
  );
}
