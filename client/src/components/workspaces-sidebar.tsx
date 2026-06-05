import { Link, useParams } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import type { Project } from "@/types/project";
import UserAvatar from "./user-avatar";
import { Suspense } from "react";
import WorkspaceSwitcher from "./workspace-switcher";
import { Home, ListTodo, Settings } from "lucide-react";
import WorkspaceSwitcherSkeleton from "./workspace-switcher-skeleton";
import { useQuery } from "@tanstack/react-query";
import { workspaceProjectsOptions } from "@/api/queries/workspaces";

export default function WorkspacesSidebar() {
  const params = useParams({
    from: "/workspaces/$workspaceId",
  });
  const { data: projects } = useQuery(
    workspaceProjectsOptions(params.workspaceId),
  );
  return (
    <Sidebar>
      <SidebarHeader>
        <Suspense fallback={<WorkspaceSwitcherSkeleton />}>
          <WorkspaceSwitcher />
        </Suspense>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/workspaces/$workspaceId"
                params={{ workspaceId: params.workspaceId }}
              >
                <Home />
                Home
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link
                to="/workspaces/$workspaceId/tasks"
                params={{ workspaceId: params.workspaceId }}
              >
                <ListTodo />
                My Tasks
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <Link to="/settings/account">
                <Settings />
                Settings
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SidebarGroup>
          <SidebarGroupLabel>Projects</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {projects?.map((project: Project) => (
                <SidebarMenuItem key={project.id}>
                  <SidebarMenuButton asChild>
                    <Link
                      to="/workspaces/$workspaceId/projects/$projectId"
                      params={{
                        workspaceId: project.workspaceId,
                        projectId: project.id,
                      }}
                    >
                      {project.name}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<div>loading...</div>}>
          <UserAvatar />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
