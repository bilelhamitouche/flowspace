import WorkspaceAnalytics from "@/components/workspace-analytics";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspaces/$workspaceId/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <WorkspaceAnalytics />;
}
