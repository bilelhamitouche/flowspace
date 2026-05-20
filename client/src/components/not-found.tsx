import { Link } from "@tanstack/react-router";
import { Button } from "./ui/button";

export default function NotFoundComponent() {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen text-primary">
      <h2 className="text-7xl font-semibold">404</h2>
      <h2 className="text-xl font-medium">Page Not Found</h2>
      <Button>
        <Link to="/">Go Back to Home</Link>
      </Button>
    </div>
  );
}
