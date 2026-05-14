import { queryOptions } from "@tanstack/react-query";
import type { User } from "@/types/user";

export const currentUserOptions = () =>
  queryOptions({
    queryKey: ["me"],
    queryFn: async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/me`);
      const user = await res.json();
      return user as User;
    },
    staleTime: 1000 * 60 * 5,
  });
