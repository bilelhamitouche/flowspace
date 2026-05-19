import { apiFetch } from "@/lib/utils";
import { queryOptions } from "@tanstack/react-query";

export const currentUserOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: () => apiFetch("/api/auth/me"),
  });
