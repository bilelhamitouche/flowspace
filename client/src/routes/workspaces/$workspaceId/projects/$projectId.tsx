import { projectOptions } from "@/api/queries/projects";
import Board from "@/components/board";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute(
  "/workspaces/$workspaceId/projects/$projectId",
)({
  component: RouteComponent,
  loader: async ({ context, params }) => {
    const project = await context.queryClient.fetchQuery(
      projectOptions(params.projectId),
    );
    return project;
  },
});

function RouteComponent() {
  const project = Route.useLoaderData();
  return (
    <div className="space-y-8 w-full h-full">
      <h2 className="text-xl font-medium">{project.name}</h2>
      <Board project={project} />
    </div>
  );
}
