"use client";

export type Application = {
  _id: string;
  vacancy: string;
  vacancyTitle: string;
  name: string;
  email: string;
  phone: string;
  location: string;
  coverLetter: string;
  cvName: string;
  status: "new" | "reviewing" | "shortlisted" | "rejected";
  createdAt: string;
};

const STATUS_OPTIONS: Application["status"][] = [
  "new",
  "reviewing",
  "shortlisted",
  "rejected",
];

const selectClasses =
  "w-full rounded-lg border border-line bg-bone-50 px-4 py-2 text-sm text-ink focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 sm:w-auto";

type ApplicationCardProps = {
  application: Application;
  onStatusChange: (id: string, status: Application["status"]) => void;
  onDownloadCv: (application: Application) => void;
  onDelete: (application: Application) => void;
  confirmingDelete: boolean;
  onConfirmDelete: () => void;
  onCancelDelete: () => void;
};

export function ApplicationCard({
  application,
  onStatusChange,
  onDownloadCv,
  onDelete,
  confirmingDelete,
  onConfirmDelete,
  onCancelDelete,
}: ApplicationCardProps) {
  return (
    <article className="w-full min-w-0 max-w-5xl overflow-hidden rounded-card border border-line bg-bone-50 shadow-card">
      <header className="flex min-w-0 flex-col gap-4 border-b border-line bg-bone px-5 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <div className="flex min-w-0 items-start gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-lime font-heading text-lg font-bold text-ink">
            {application.name.trim().charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="text-eyebrow font-semibold uppercase tracking-wide text-muted">
              {application.vacancyTitle}
            </p>
            <h2 className="mt-1 break-words font-heading text-xl font-bold text-ink">
              {application.name}
            </h2>
            <p className="mt-1 text-xs text-muted">
              Applied {new Date(application.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        <label className="flex shrink-0 items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Status
          <select
            value={application.status}
            onChange={(event) =>
              onStatusChange(
                application._id,
                event.target.value as Application["status"],
              )
            }
            className={selectClasses}
            aria-label={`Status for ${application.name}`}
          >
            {STATUS_OPTIONS.map((status) => (
              <option key={status} value={status}>
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </option>
            ))}
          </select>
        </label>
      </header>

      <div className="min-w-0 p-5 sm:p-6">
        <div className="grid min-w-0 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[
            ["Email", application.email],
            ["Phone", application.phone],
            ["Location", application.location],
          ].map(([label, value]) => (
            <div key={label} className="min-w-0">
              <p className="text-eyebrow font-semibold uppercase tracking-wide text-muted">
                {label}
              </p>
              <p className="mt-1 break-words text-sm text-ink [overflow-wrap:anywhere]">
                {value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-5 rounded-xl border border-line bg-white p-4 sm:p-5">
          <p className="text-eyebrow font-semibold uppercase tracking-wide text-muted">
            Cover letter
          </p>
          <p className="mt-2 whitespace-pre-wrap break-words text-sm leading-6 text-muted-dark [overflow-wrap:anywhere]">
            {application.coverLetter}
          </p>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={() => onDownloadCv(application)}
            className="inline-flex max-w-full items-center gap-2 rounded-pill bg-lime px-4 py-2 text-sm font-semibold text-ink transition-colors hover:bg-lime-400"
          >
            <span className="truncate">Download CV · {application.cvName}</span>
          </button>
          {confirmingDelete ? (
            <div className="flex flex-wrap items-center gap-3 text-sm">
              <span className="text-muted">Delete this application and its CV?</span>
              <button
                type="button"
                onClick={() => onDelete(application)}
                className="font-semibold text-red-700 hover:underline"
              >
                Confirm
              </button>
              <button
                type="button"
                onClick={onCancelDelete}
                className="text-muted hover:underline"
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={onConfirmDelete}
              className="inline-flex items-center rounded-pill border border-red-200 px-4 py-2 text-sm font-semibold text-red-700 transition-colors hover:bg-red-50"
            >
              Delete application
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
