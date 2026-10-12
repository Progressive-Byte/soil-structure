import { Container } from "@/components/ui/Container";
import { Skeleton } from "@/components/ui/Skeleton";

export default function VacancyDetailLoading() {
  return (
    <>
      <section className="bg-bone pt-10 md:pt-14" role="status" aria-label="Loading career details" aria-busy="true">
        <Container>
          <span className="sr-only">Loading career details…</span>
          <div className="flex gap-2">
            <Skeleton className="h-3 w-10" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-14" />
            <Skeleton className="h-3 w-3" />
            <Skeleton className="h-3 w-24" />
          </div>

          <div className="mt-6 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <div className="w-full max-w-4xl">
              <Skeleton className="h-4 w-36" />
              <Skeleton className="mt-4 h-12 w-full max-w-xl md:h-16" />
              <Skeleton className="mt-4 h-5 w-full max-w-2xl" />
              <Skeleton className="mt-2 h-5 w-2/3 max-w-xl" />
            </div>
            <Skeleton className="h-12 w-40" />
          </div>

          <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {Array.from({ length: 4 }, (_, index) => (
              <div key={index} className="bg-white p-5">
                <Skeleton className="h-3 w-24" />
                <Skeleton className="mt-2 h-5 w-32" />
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-bone py-14 md:py-20">
        <Container>
          <div className="space-y-4">
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-5/6" />
            <Skeleton className="mt-8 h-7 w-2/5" />
            <Skeleton className="h-5 w-full" />
            <Skeleton className="h-5 w-11/12" />
            <Skeleton className="h-5 w-3/4" />
          </div>
        </Container>
      </section>

      <section className="bg-bone pt-4 pb-16 md:pb-24">
        <Container>
          <div className="rounded-card bg-lime px-6 py-12 md:px-12 md:py-16">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
              <Skeleton className="h-16 w-full max-w-2xl" />
              <Skeleton className="h-12 w-40" />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
