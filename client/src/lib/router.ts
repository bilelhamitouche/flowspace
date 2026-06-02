import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "../routeTree.gen";
import type { AuthState } from "@/types/auth";

export const queryClient = new QueryClient();

let authStatus: AuthState = "Unauthenticated";

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    authStatus: authStatus,
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});
