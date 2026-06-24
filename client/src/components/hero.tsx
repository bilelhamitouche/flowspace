import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="container p-8 py-20 mx-auto max-w-7xl">
      <div className="flex flex-col gap-4 items-start">
        <h2 className="text-4xl font-medium md:text-5xl lg:text-7xl font-heading">
          <span>Project Management</span>
          <div className="flex gap-3 items-center">
            <span className="text-primary">that gets out</span>
            <span>of your way</span>
          </div>
        </h2>
        <p className="max-w-xl text-base md:text-lg text-foreground/70">
          Flowspace is a beautifully calm board, list and timeline workspace for
          teams who would rather ship than schedule another sync.
        </p>
        <div className="flex gap-4 items-center">
          <Button className="px-10 rounded-full" size="xl">
            Get Started
          </Button>
          <Button
            variant="outline"
            className="px-10 rounded-full"
            size="xl"
            children={<Link to="/about">Learn More</Link>}
          />
        </div>
      </div>
    </section>
  );
}
