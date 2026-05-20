import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function Hero() {
  return (
    <section className="container flex flex-col gap-20 items-center p-8 py-20 mx-auto max-w-7xl">
      <div className="flex flex-col gap-6 items-center">
        <h2 className="flex flex-col gap-2 text-4xl font-bold text-center md:gap-3 md:text-5xl lg:gap-4 lg:text-6xl text-primary">
          <span>Manage Your Projects</span>
          <span> and Stay Organized</span>
        </h2>
        <p className="mx-auto max-w-2xl text-lg font-medium text-center md:text-xl text-shadow-foreground">
          Collaborate with your team, manage tasks, and keep every project
          moving forward from one organized workspace.
        </p>
        <div className="flex gap-4">
          <Button asChild>
            <Link to="/auth/register">Get Started</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/auth/register">Get Started</Link>
          </Button>
        </div>
      </div>
      <div className="w-full max-w-5xl border border-muted/80 perspective-near">
        <img src="/preview.png" alt="preview image" />
      </div>
    </section>
  );
}
