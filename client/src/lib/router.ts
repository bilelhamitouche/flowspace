import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import { currentUserOptions } from "@/api/queries/auth";
import type { AuthState } from "@/types/auth";
import type { User } from "@/types/user";

export const queryClient = new QueryClient();

let authStatus: AuthState = "Unauthenticated";

let user: User | null = null;

try {
  user = await queryClient.fetchQuery(currentUserOptions());
  if (user?.id) {
    authStatus = "Authenticated";
  }
} catch (err) {
  if (err instanceof TypeError) {
    authStatus = "Offline";
  } else {
    authStatus = "Unauthenticated";
  }
}

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    authStatus: authStatus,
    user: user,
  },
});
