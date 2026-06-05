import { createRoot } from "react-dom/client";
import { RouterProvider } from "@tanstack/react-router";
import { queryClient, router } from "./lib/router";
import { TooltipProvider } from "./components/ui/tooltip";
import "./index.css";
import { Toaster } from "./components/ui/sonner";
import { QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <RouterProvider router={router} />
        <Toaster richColors closeButton position="top-right" />
      </TooltipProvider>
    </QueryClientProvider>
  </StrictMode>,
);
