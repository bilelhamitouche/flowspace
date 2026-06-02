import { Skeleton } from "./ui/skeleton";

export default function UserAvatarSkeleton() {
  return (
    <div className="flex gap-2 justify-between items-center w-full">
      <Skeleton className="rounded-full size-12" />
      <div className="flex flex-col gap-1 items-start">
        <Skeleton className="w-full h-4" />
        <Skeleton className="w-full h-4" />
      </div>
    </div>
  );
}
