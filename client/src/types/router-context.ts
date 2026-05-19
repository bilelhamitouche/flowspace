import type { QueryClient } from "@tanstack/react-query";
import type { AuthState } from "./auth";
import type { User } from "./user";

export interface RouterContext {
  queryClient: QueryClient;
  authStatus: AuthState;
  user: User | null;
}
