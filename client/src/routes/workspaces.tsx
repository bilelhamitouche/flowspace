import { currentUserOptions } from "@/api/queries/auth";
import { workspacesOptions } from "@/api/queries/workspaces";
import { SidebarProvider } from "@/components/ui/sidebar";
import WorkspacesSidebar from "@/components/workspaces-sidebar";
import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/workspaces")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(currentUserOptions());
      context.authStatus = user.id ? "Authenticated" : "Unauthenticated";
    } catch (err) {
      if (err.message === "Unauthorized") {
        throw redirect({ to: "/auth/login" });
      } else {
        throw new Error(err.message);
      }
    }
    if (context.authStatus === "Unauthenticated") {
      throw redirect({ to: "/auth/login" });
    }
  },
  loader: async ({ context }) => {
    const [workspaces, user] = await Promise.all([
      await context.queryClient.fetchQuery(workspacesOptions()),
      await context.queryClient.fetchQuery(currentUserOptions()),
    ]);
    if (user.activeWorkspaceId && location.pathname === "/workspaces") {
      throw redirect({
        to: "/workspaces/$workspaceId",
        params: { workspaceId: user.activeWorkspaceId },
      });
    }
    return { workspaces };
  },
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <WorkspacesSidebar />
      <Outlet />
    </SidebarProvider>
  );
}
