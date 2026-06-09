import Board from "@/components/board";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/workspaces/$workspaceId/projects/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <Board
      project={{
        workspaceId: "3",
        createdAt: new Date(),
        name: "Hello",
        updatedAt: new Date(),
        id: "2",
      }}
    />
  );
}
