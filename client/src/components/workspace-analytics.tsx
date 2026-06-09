import { useParams } from "@tanstack/react-router";

export default function WorkspaceAnalytics() {
  const params = useParams({
    strict: false,
  });
  return (
    <div className="p-4">
      <h2 className="text-xl font-medium">
        Workspace {params.workspaceId} Analytics
      </h2>
    </div>
  );
}
