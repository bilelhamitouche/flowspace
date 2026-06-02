import { Link, useMatches } from "@tanstack/react-router";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import type { Project } from "@/types/project";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Plus } from "lucide-react";
import type { Workspace } from "@/types/workspace";
import UserAvatar from "./user-avatar";
import { Suspense } from "react";

export default function WorkspacesSidebar() {
  const matches = useMatches();
  const workspaceMatches = matches.find(
    (match) => match.routeId === "/workspaces/$workspaceId",
  );
  const data = workspaceMatches?.loaderData;
  return (
    <Sidebar>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size="lg"
                  className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
                ></SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="rounded-lg w-(--radix-dropdown-menu-trigger-width) min-w-56"
                align="start"
                side="right"
                sideOffset={4}
              >
                <DropdownMenuLabel className="text-xs text-muted-foreground">
                  Teams
                </DropdownMenuLabel>
                {data?.workspaces.map((workspace: Workspace) => (
                  <DropdownMenuItem key={workspace.id} className="gap-2 p-2">
                    {workspace.name}
                  </DropdownMenuItem>
                ))}
                <DropdownMenuSeparator />
                <DropdownMenuItem className="gap-2 p-2">
                  <div className="flex justify-center items-center bg-transparent rounded-md border size-6">
                    <Plus className="size-4" />
                  </div>
                  <div className="font-medium text-muted-foreground">
                    Add team
                  </div>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="p-2">
        <SidebarMenu>
          {data?.projects.map((project: Project) => (
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
      </SidebarContent>
      <SidebarFooter>
        <Suspense fallback={<div>loading...</div>}>
          <UserAvatar />
        </Suspense>
      </SidebarFooter>
    </Sidebar>
  );
}
