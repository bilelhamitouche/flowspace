import PricingCard from "./pricing-card";

export default function Pricing() {
  return (
    <section
      id="pricing"
      className="container flex flex-col gap-8 items-center p-8 py-20 mx-auto max-w-7xl"
    >
      <div className="flex flex-col gap-2 items-center max-w-2xl">
        <p className="text-lg font-medium uppercase text-primary">
          Our Pricing
        </p>
        <h2 className="text-2xl font-semibold text-center md:text-3xl">
          Pricing that works from day one
        </h2>
        <p className="text-base font-medium text-center md:text-lg text-foreground/60">
          No overthinking—just a clear plan with the features you need to
          launch, manage, and scale.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-8 justify-center w-full md:grid-cols-2 md:w-2xl">
        <PricingCard
          title="Free"
          price={0}
          features={[
            "✓ Up to 3 boards",
            "✓ Up to 3 members",
            "✓ Unlimited tasks",
            "✓ Task comments",
            "✓ Drag & drop workflows",
          ]}
        />
        <PricingCard
          title="Pro"
          price={15}
          features={[
            "✓ Unlimited boards",
            "✓ Unlimited members",
            "✓ Advanced permissions",
            "✓ Activity history",
            "✓ File uploads",
            "✓ Productivity insights",
          ]}
        />
      </div>
    </section>
  );
}
