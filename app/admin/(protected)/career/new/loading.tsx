import { AdminFormSkeleton } from "../../../_components/AdminSkeletons";
import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div>
      <Skeleton className="h-5 w-32" />
      <Skeleton className="mt-4 h-8 w-48" />
      <div className="mt-8">
        <AdminFormSkeleton vacancy />
      </div>
    </div>
  );
}
