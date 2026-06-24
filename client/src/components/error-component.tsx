import { GlobeOff } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "@tanstack/react-router";
import { router } from "@/lib/router";

export default function ErrorComponent() {
  return (
    <div className="flex flex-col gap-6 justify-center items-center w-full h-screen">
      <div className="flex flex-col gap-4 items-center font-heading text-destructive">
        <GlobeOff size={50} />
        <h2 className="text-2xl font-medium font-heading">
          OOPS! Something wrong happened
        </h2>
      </div>
      <div className="flex gap-4 items-center">
        <Button
          size="xl"
          className="rounded-full"
          onClick={() => router.invalidate()}
        >
          Retry
        </Button>
        <Button
          nativeButton={false}
          variant="outline"
          size="xl"
          className="rounded-full"
          render={<Link to="/">Go Back Home</Link>}
        />
      </div>
    </div>
  );
}
