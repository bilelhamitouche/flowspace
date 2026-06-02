import Faqs from "@/components/faqs";
import Features from "@/components/features";
import Footer from "@/components/footer";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import Pricing from "@/components/pricing";
import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.authStatus === "Authenticated") {
      throw redirect({ to: "/workspaces" });
    }
  },
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
