import { apiFetch } from "@/lib/utils";
import type { User } from "@/types/user";
import { queryOptions } from "@tanstack/react-query";

export const currentUserOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: async (): Promise<User> => {
      return apiFetch("/api/auth/me");
    },
  });
