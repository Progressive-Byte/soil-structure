type EmptyStateProps = {
  title: string;
  description?: string;
};

/** Neutral placeholder shown when a list has no items to display. */
export function EmptyState({ title, description }: EmptyStateProps) {
  return (
    <div className="rounded-card border border-dashed border-line bg-bone-50 px-6 py-16 text-center">
      <p className="font-heading text-lg font-bold text-ink">{title}</p>
      {description && <p className="mx-auto mt-2 max-w-md text-muted">{description}</p>}
    </div>
  );
}
