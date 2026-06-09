import {
  workspaceOptions,
  workspaceProjectsOptions,
} from "@/api/queries/workspaces";
import NotFoundComponent from "@/components/not-found";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/workspaces/$workspaceId")({
  component: RouteComponent,
  notFoundComponent: NotFoundComponent,
  loader: async ({ context, params }) => {
    await context.queryClient.ensureQueryData(
      workspaceOptions(params.workspaceId),
    );
    await context.queryClient.ensureQueryData(
      workspaceProjectsOptions(params.workspaceId),
    );
  },
});

function RouteComponent() {
  return <Outlet />;
}
