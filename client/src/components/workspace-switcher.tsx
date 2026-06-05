import type { Workspace } from "@/types/workspace";
import { ChevronsUpDown, Plus } from "lucide-react";
import {
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenu,
} from "./ui/dropdown-menu";
import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from "./ui/sidebar";
import { Link, useParams } from "@tanstack/react-router";
import { useSuspenseQuery } from "@tanstack/react-query";
import { workspacesOptions } from "@/api/queries/workspaces";

export default function WorkspaceSwitcher() {
  const { data: workspaces } = useSuspenseQuery(workspacesOptions());
  const params = useParams({
    from: "/workspaces/$workspaceId",
  });
  const currentWorkspace = workspaces?.find(
    (workspace: Workspace) => workspace.id === params.workspaceId,
  );
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground flex justify-between items-center"
            >
              {currentWorkspace.name ?? "Select Workspace"}
              <ChevronsUpDown className="text-muted-foreground" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="rounded-lg w-(--radix-dropdown-menu-trigger-width) min-w-56"
            align="start"
            side="right"
            sideOffset={4}
          >
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspaces
            </DropdownMenuLabel>
            {workspaces.map((workspace: Workspace) => (
              <DropdownMenuItem
                key={workspace.id}
                className="gap-2 p-2 capitalize"
                asChild
              >
                <Link
                  to="/workspaces/$workspaceId"
                  params={{ workspaceId: workspace.id }}
                >
                  {workspace.name}
                </Link>
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem className="gap-2 p-2">
              <div className="flex justify-center items-center bg-transparent rounded-md border size-6">
                <Plus className="size-4" />
              </div>
              <div className="font-medium text-muted-foreground">
                Add workspace
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
