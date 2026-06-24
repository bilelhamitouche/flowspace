import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
} from "./ui/sidebar";
import UserAvatar from "./user-avatar";
import WorkspaceSwitcher from "./workspace-switcher";

export default function DashboardSidebar() {
  return (
    <Sidebar className="bg-background">
      <SidebarHeader>
        <WorkspaceSwitcher />
      </SidebarHeader>
      <SidebarContent></SidebarContent>
      <SidebarFooter>
        <UserAvatar />
      </SidebarFooter>
    </Sidebar>
  );
}
