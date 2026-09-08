import { PageHeader } from "@/components/sections/PageHeader";
import { Section } from "@/components/ui/Section";
import { CardSkeleton } from "@/components/ui/Skeleton";

export default function ProjectsLoading() {
  return (
    <>
      <PageHeader eyebrow="Selected work" title="Different ground. Different answers." />
      <Section>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </div>
      </Section>
    </>
  );
}
