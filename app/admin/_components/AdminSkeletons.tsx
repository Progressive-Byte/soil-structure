import { Skeleton } from "@/components/ui/Skeleton";

export function AdminTableSkeleton({ columns, rows = 6 }: { columns: number; rows?: number }) {
  return (
    <>
      {Array.from({ length: rows }, (_, row) => (
        <tr key={row} role={row === 0 ? "status" : undefined} aria-label={row === 0 ? "Loading list" : undefined} aria-busy={row === 0 ? true : undefined}>
          {Array.from({ length: columns }, (_, column) => (
            <td key={column} className="px-4 py-4">
              {row === 0 && column === 0 && <span className="sr-only">Loading list…</span>}
              <Skeleton className={`h-4 ${column === 0 ? "w-3/4" : "w-2/3"}`} />
              {column === 0 && <Skeleton className="mt-2 h-3 w-1/3" />}
            </td>
          ))}
        </tr>
      ))}
    </>
  );
}

export function AdminFormSkeleton({ vacancy = false }: { vacancy?: boolean }) {
  return (
    <div
      role="status"
      aria-label="Loading form"
      aria-busy="true"
      className={`flex ${vacancy ? "max-w-4xl flex-col gap-6 rounded-card border border-line bg-bone-50 p-6 sm:p-8" : "max-w-3xl flex-col gap-8"}`}
    >
      <span className="sr-only">Loading form…</span>
      <div className="grid gap-5 sm:grid-cols-2">
        {Array.from({ length: vacancy ? 4 : 6 }, (_, index) => (
          <div key={index} className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-20 w-full rounded-lg" />
      </div>
      {vacancy ? (
        <>
          <div className="space-y-2">
            <Skeleton className="h-3 w-24" />
            <Skeleton className="h-48 w-full rounded-lg" />
          </div>
          <div className="grid gap-5 sm:grid-cols-3">
            <Skeleton className="h-11 w-full rounded-lg" />
          </div>
        </>
      ) : (
        <>
          <Skeleton className="h-36 w-full rounded-card" />
          <Skeleton className="h-11 w-36 rounded-lg" />
        </>
      )}
    </div>
  );
}
