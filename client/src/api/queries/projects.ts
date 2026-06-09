import { apiFetch } from "@/lib/utils";
import type { Project } from "@/types/project";
import { queryOptions } from "@tanstack/react-query";

export const projectsOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: (): Promise<Project[]> => {
      return apiFetch(`/api/projects/`);
    },
  });

export const projectOptions = (id: string) =>
  queryOptions({
    queryKey: ["projects", id],
    queryFn: (): Promise<Project> => {
      return apiFetch(`/api/projects/${id}`);
    },
  });
