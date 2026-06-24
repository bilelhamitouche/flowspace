import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";

interface PricingCardProps {
  name: string;
  price: number;
  features: string[];
}

export default function PricingCard({
  name,
  price,
  features,
}: PricingCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl font-medium font-heading">
          {name}
        </CardTitle>
        <p className="text-5xl font-bold">{price}$</p>
        <p className="text-base font-regular text-foreground/70">
          Per user / month
        </p>
      </CardHeader>
      <CardContent>
        <ul className="flex flex-col gap-2 items-start p-2 px-4 list-disc">
          {features.map((feature, index) => (
            <li key={index} className="text-base">
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
      <CardFooter>
        <Button size="xl" className="w-full text-base rounded-full">
          Choose this plan
        </Button>
      </CardFooter>
    </Card>
  );
}
