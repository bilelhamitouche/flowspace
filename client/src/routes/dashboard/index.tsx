import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/dashboard/")({
  component: RouteComponent,
});

function RouteComponent() {
  return <div className="p-4 text-xl text-blue-700">FlowSpace</div>;
}
