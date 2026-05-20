import { router } from "@/lib/router";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { GlobeOff } from "lucide-react";

export default function ErrorComponent(error: Error) {
  return (
    <div className="flex flex-col gap-4 justify-center items-center w-full h-screen">
      <GlobeOff className="size-15 text-primary" />
      <h2 className="text-3xl font-medium text-primary">{error.message}</h2>
      <div className="flex gap-2 items-center">
        <Button onClick={() => router.invalidate()}>Retry</Button>
        <Button variant="outline">
          <Link to="/">Go Back Home</Link>
        </Button>
      </div>
    </div>
  );
}
