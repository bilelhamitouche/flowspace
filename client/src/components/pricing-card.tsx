import { Button } from "./ui/button";

interface PricingCardProps {
  title: string;
  price: number;
  features: string[];
}

export default function PricingCard({
  title,
  price,
  features,
}: PricingCardProps) {
  return (
    <article className="flex flex-col gap-4 items-start p-8 border border-foreground/10">
      <h3 className="text-xl font-semibold">{title}</h3>
      <p>
        <span className="text-3xl font-bold">${price}</span>
        <span className="text-foreground/70">/monthly</span>
      </p>
      <p className="text-lg font-medium">Plan includes:</p>
      <ul className="flex flex-col gap-1 items-start list-none text-foreground/70">
        {features.map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>
      <Button className="mt-auto w-full">Choose this plan</Button>
    </article>
  );
}
