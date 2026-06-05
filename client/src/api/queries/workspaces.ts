import { apiFetch } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";

export const workspacesOptions = () =>
  queryOptions({
    queryKey: ["workspaces"],
    queryFn: () => apiFetch(`/api/workspaces`),
  });

export const workspaceOptions = (id: string) =>
  queryOptions({
    queryKey: ["workspaces", id],
    queryFn: () => apiFetch(`/api/workspaces/${id}`),
  });

export const workspaceProjectsOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ["projects", workspaceId],
    queryFn: () => apiFetch(`/api/workspaces/${workspaceId}/projects`),
  });

export const workspaceAnalyticsOptions = (id: string) =>
  queryOptions({
    queryKey: ["workspaces", "analytics", id],
    queryFn: () => apiFetch(`/api/workspaces/${id}/analytics`),
  });
