import Faqs from "@/components/faqs";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  beforeLoad: ({ context }) => {
    if (context.authStatus === "Authenticated") {
      throw redirect({ to: "/workspaces" });
    }
    if (context.authStatus === "Unauthenticated") {
      throw redirect({ to: "/" });
    }
  },
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Pricing />
      <Faqs />
      <Footer />
    </>
  );
}
