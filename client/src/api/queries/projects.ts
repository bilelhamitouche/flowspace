import { apiFetch } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";

export const projectsOptions = () =>
  queryOptions({
    queryKey: ["projects"],
    queryFn: () => apiFetch(`/api/projects/`),
  });

export const projectOptions = (id: string) =>
  queryOptions({
    queryKey: ["projects", id],
    queryFn: () => apiFetch(`/api/projects/${id}`),
  });
