import { createRootRouteWithContext, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import ErrorComponent from "@/components/error-component";
import type { RouterContext } from "@/types/router-context";

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
  errorComponent: () => {
    return <ErrorComponent />;
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
