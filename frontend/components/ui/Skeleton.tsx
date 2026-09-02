import { cn } from "@/lib/utils";

/** Pulsing placeholder block used in loading states. */
export function Skeleton({ className }: { className?: string }) {
  return <div className={cn("animate-pulse rounded-lg bg-ink/5", className)} />;
}

/** A card-shaped skeleton (image + two text lines) for grid loading states. */
export function CardSkeleton() {
  return (
    <div>
      <Skeleton className="aspect-[4/3] w-full rounded-image" />
      <Skeleton className="mt-4 h-4 w-24" />
      <Skeleton className="mt-3 h-5 w-3/4" />
    </div>
  );
}
