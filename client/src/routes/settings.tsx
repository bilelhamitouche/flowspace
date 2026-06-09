import {
  createFileRoute,
  Link,
  Outlet,
  useRouterState,
} from "@tanstack/react-router";

export const Route = createFileRoute("/settings")({
  component: RouteComponent,
});

function RouteComponent() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });
  return (
    <div className="container flex justify-center items-center p-20 mx-auto w-full max-w-7xl h-full">
      <nav className="flex flex-col gap-2 p-4 font-medium w-xs">
        <Link
          to="/settings/account"
          className={`p-2 ${pathname === "/settings/account" && "bg-primary text-background hover:bg-primary/80"} hover:bg-accent`}
        >
          Account
        </Link>
        <Link
          to="/settings/billing"
          className={`p-2 ${pathname === "/settings/billing" && "bg-primary text-background hover:bg-primary/80"} hover:bg-accent`}
        >
          Billing
        </Link>
        <Link
          to="/settings/appearance"
          className={`p-2 ${pathname === "/settings/appearance" && "bg-primary text-background hover:bg-primary/80"} hover:bg-accent`}
        >
          Appearance
        </Link>
      </nav>
      <main className="flex justify-center items-center w-full h-full">
        <Outlet />
      </main>
    </div>
  );
}
