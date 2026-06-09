import { apiFetch } from "@/lib/utils";
import type { Project } from "@/types/project";
import type { Workspace } from "@/types/workspace";
import { queryOptions } from "@tanstack/react-query";

export const workspacesOptions = () =>
  queryOptions({
    queryKey: ["workspaces"],
    queryFn: (): Promise<Workspace[]> => {
      return apiFetch(`/api/workspaces`);
    },
  });

export const workspaceOptions = (id: string) =>
  queryOptions({
    queryKey: ["workspaces", id],
    queryFn: (): Promise<Workspace> => {
      return apiFetch(`/api/workspaces/${id}`);
    },
  });

export const workspaceProjectsOptions = (workspaceId: string) =>
  queryOptions({
    queryKey: ["projects", workspaceId],
    queryFn: (): Promise<Project[]> => {
      return apiFetch(`/api/workspaces/${workspaceId}/projects`);
    },
  });

export const workspaceAnalyticsOptions = (id: string) =>
  queryOptions({
    queryKey: ["workspaces", "analytics", id],
    queryFn: () => {
      return apiFetch(`/api/workspaces/${id}/analytics`);
    },
  });
