import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "@/routeTree.gen";
import { currentUserOptions } from "@/api/queries/auth";

export const queryClient = new QueryClient();

const user = await queryClient.fetchQuery(currentUserOptions());

export const router = createRouter({
  routeTree,
  context: {
    queryClient,
    isAuthenticated: Boolean(user.id),
  },
  defaultPreload: "intent",
  defaultPreloadStaleTime: 0,
  scrollRestoration: true,
});
