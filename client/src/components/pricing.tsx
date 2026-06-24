import PricingCard from "./pricing-card";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="container flex flex-col gap-8 items-center p-8 py-20 mx-auto max-w-7xl"
    >
      <div className="space-y-4 text-center">
        <h3 className="text-3xl font-medium md:text-4xl font-heading">
          Pricing
        </h3>
        <p className="text-base font-medium md:text-xl text-foreground/70">
          Choose the pricing plan that fits you the best
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 w-full md:grid-cols-3">
        <PricingCard
          name="Free"
          price={0}
          features={[
            "3 Workspaces",
            "5 boards per workspace",
            "Unlimited tasks",
          ]}
        />
        <PricingCard
          name="Pro"
          price={15}
          features={[
            "15 Workspaces",
            "20 boards per workspace",
            "Unlimited tasks",
          ]}
        />
        <PricingCard
          name="Enterprise"
          price={25}
          features={[
            "Unlimited Workspaces",
            "Unlimited boards per workspace",
            "Unlimited tasks",
          ]}
        />
      </div>
    </section>
  );
}
