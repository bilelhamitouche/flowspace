import ErrorComponent from "@/components/error";
import NotFoundComponent from "@/components/not-found";
import type { RouterContext } from "@/types/router-context";
import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  notFoundComponent: () => {
    return NotFoundComponent();
  },
  errorComponent: ({ error }) => {
    return ErrorComponent(error);
  },
});

export function RootComponent() {
  return (
    <>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </>
  );
}
