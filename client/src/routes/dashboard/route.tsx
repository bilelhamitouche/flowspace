import { currentUserOptions } from "@/api/queries/auth";
import DashboardSidebar from "@/components/dashboard-sidebar";
import { SidebarProvider } from "@/components/ui/sidebar";
import {
  createFileRoute,
  isRedirect,
  Outlet,
  redirect,
} from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard")({
  beforeLoad: async ({ context }) => {
    try {
      const user = await context.queryClient.fetchQuery(currentUserOptions());
      if (!user.id) {
        throw redirect({ to: "/auth/login" });
      }
    } catch (err) {
      if (isRedirect(err)) throw err;
      throw redirect({ to: "/auth/login" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <SidebarProvider>
      <DashboardSidebar />
      <main className="p-4">
        <Outlet />
      </main>
    </SidebarProvider>
  );
}
