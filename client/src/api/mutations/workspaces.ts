import { apiFetch } from "@/lib/utils";
import { useMutation } from "@tanstack/react-query";

export const useCreateWorkspaceMutation = () =>
  useMutation({
    mutationKey: ["workspace"],
    mutationFn: (data: CreateWorkspaceData) =>
      apiFetch("/api/workspaces", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });
