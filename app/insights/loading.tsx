import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function InsightsLoading() {
  return (
    <>
      <PageHeader eyebrow="Insights" title="Notes from the ground up." />
      <Section>
        <div className="grid gap-x-8 gap-y-12 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
