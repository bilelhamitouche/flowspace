import { apiFetch } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";

export const workspacesOptions = queryOptions({
  queryKey: ["workspaces"],
  queryFn: async () => {
    return apiFetch("/api/workspaces");
  },
});
