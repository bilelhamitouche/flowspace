import { currentUserOptions } from "@/api/queries/auth";
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
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <WorkspacesSidebar />
      <Outlet />
    </SidebarProvider>
  );
}
