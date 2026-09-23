"use client";

import { useEffect, useState } from "react";
import { InputField, SelectField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { getServices } from "@/lib/data/services";
import { PROJECT_CATEGORIES, PROJECT_STATUSES } from "@/lib/data/projects";
import type { Project, ProjectStatus, Service } from "@/types";
import { adminFetch } from "../../../_lib/adminApi";

export type ProjectFormValues = {
  title: string;
  slug: string;
  sector: string;
  status: ProjectStatus;
  summary: string;
  description: string;
  location: string;
  year: string;
  client: string;
  services: string[];
  coverImage: { src: string; alt: string };
  gallery: { src: string; alt: string }[];
  stats: { label: string; value: string }[];
  featured: boolean;
  order: number;
};

const emptyValues: ProjectFormValues = {
  title: "",
  slug: "",
  sector: "",
  status: "ongoing",
  summary: "",
  description: "",
  location: "",
  year: "",
  client: "",
  services: [],
  coverImage: { src: "", alt: "" },
  gallery: [],
  stats: [],
  featured: false,
  order: 0,
};

function slugify(input: string) {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

const inputClasses =
  "w-full rounded-lg border border-line bg-bone-50 px-4 py-3 text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

type ProjectFormProps = {
  initial?: Project;
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  submitLabel: string;
  /** Display-order value to pre-fill when creating a new project (ignored when editing). */
  defaultOrder?: number;
};

/** Shared create/edit form for the Projects admin panel. */
export function ProjectForm({ initial, onSubmit, submitLabel, defaultOrder }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>(() =>
    initial
      ? {
          title: initial.title,
          slug: initial.slug,
          sector: initial.sector,
          status: initial.status ?? "completed",
          summary: initial.summary,
          description: initial.description,
          location: initial.location,
          year: initial.year,
          client: initial.client,
          services: initial.services,
          coverImage: { src: initial.coverImage.src, alt: initial.coverImage.alt },
          gallery: initial.gallery.map((g) => ({ src: g.src, alt: g.alt })),
          stats: initial.stats,
          featured: initial.featured,
          order: initial.order,
        }
      : { ...emptyValues, order: defaultOrder ?? emptyValues.order },
  );
  // Starts false even when editing — the slug keeps following the title
  // until the admin manually edits the slug field themselves.
  const [slugTouched, setSlugTouched] = useState(false);
  const [services, setServices] = useState<Service[]>([]);
  const [sectors, setSectors] = useState<string[]>([]);
  const [sectorMenuOpen, setSectorMenuOpen] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

  // Presets first, then any custom categories already used on other projects (deduped case-insensitively).
  const allSectors = [...PROJECT_CATEGORIES, ...sectors].filter(
    (s, i, list) => list.findIndex((x) => x.toLowerCase() === s.toLowerCase()) === i,
  );
  const typedSector = values.sector.trim().toLowerCase();
  const isKnownSector = allSectors.some((s) => s.toLowerCase() === typedSector);
  // Show the full list when empty or when an existing option is already chosen (so it can be
  // switched); only narrow it down while the admin is typing something new.
  const sectorSuggestions =
    !typedSector || isKnownSector
      ? allSectors
      : allSectors.filter((s) => s.toLowerCase().includes(typedSector));

  useEffect(() => {
    getServices().then(setServices);
    adminFetch<{ sectors: string[] }>("/admin/projects/sectors")
      .then((d) => setSectors(d.sectors))
      .catch(() => {});
  }, []);

  function updateField<K extends keyof ProjectFormValues>(key: K, value: ProjectFormValues[K]) {
    setValues((v) => ({ ...v, [key]: value }));
  }

  function handleTitleChange(title: string) {
    setValues((v) => ({ ...v, title, slug: slugTouched ? v.slug : slugify(title) }));
  }

  function toggleService(slug: string) {
    setValues((v) => ({
      ...v,
      services: v.services.includes(slug)
        ? v.services.filter((s) => s !== slug)
        : [...v.services, slug],
    }));
  }

  async function uploadFile(file: File): Promise<string> {
    const formData = new FormData();
    formData.append("file", file);
    const { url } = await adminFetch<{ url: string }>("/upload", { method: "POST", body: formData });
    return url;
  }

  async function handleCoverUpload(file: File | undefined) {
    if (!file) return;
    setUploading("cover");
    try {
      const url = await uploadFile(file);
      setValues((v) => ({ ...v, coverImage: { ...v.coverImage, src: url } }));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  async function handleGalleryUpload(index: number, file: File | undefined) {
    if (!file) return;
    setUploading(`gallery-${index}`);
    try {
      const url = await uploadFile(file);
      setValues((v) => {
        const gallery = [...v.gallery];
        gallery[index] = { ...gallery[index], src: url };
        return { ...v, gallery };
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      setUploading(null);
    }
  }

  function removeCoverImage() {
    setValues((v) => ({ ...v, coverImage: { src: "", alt: "" } }));
  }

  function addGalleryRow() {
    setValues((v) => ({ ...v, gallery: [...v.gallery, { src: "", alt: "" }] }));
  }
  function removeGalleryRow(index: number) {
    setValues((v) => ({ ...v, gallery: v.gallery.filter((_, i) => i !== index) }));
  }
  function addStatRow() {
    setValues((v) => ({ ...v, stats: [...v.stats, { label: "", value: "" }] }));
  }
  function removeStatRow(index: number) {
    setValues((v) => ({ ...v, stats: v.stats.filter((_, i) => i !== index) }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);
    if (!values.coverImage.src) {
      setError("Please upload a cover image.");
      return;
    }
    setSubmitting(true);
    try {
      await onSubmit(values);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-8">
      {error && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Title"
          name="title"
          required
          value={values.title}
          onChange={(e) => handleTitleChange(e.target.value)}
        />
        <InputField
          label="Slug"
          name="slug"
          required
          value={values.slug}
          onChange={(e) => {
            setSlugTouched(true);
            updateField("slug", slugify(e.target.value));
          }}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="relative flex flex-col gap-2">
          <label htmlFor="sector" className="text-eyebrow font-semibold uppercase text-muted">
            Sector / category<span className="ml-0.5 text-lime-700" aria-hidden="true">*</span>
          </label>
          <div className="relative">
            <input
              id="sector"
              name="sector"
              required
              autoComplete="off"
              role="combobox"
              aria-expanded={sectorMenuOpen}
              aria-controls="sector-options"
              placeholder="Pick a category or type a new one"
              value={values.sector}
              onChange={(e) => {
                updateField("sector", e.target.value);
                setSectorMenuOpen(true);
              }}
              onFocus={() => setSectorMenuOpen(true)}
              // Delay so a click on a suggestion below registers before the blur closes the menu.
              onBlur={() => setTimeout(() => setSectorMenuOpen(false), 150)}
              onKeyDown={(e) => e.key === "Escape" && setSectorMenuOpen(false)}
              className={`${inputClasses} pr-10`}
            />
            <button
              type="button"
              tabIndex={-1}
              aria-label="Show categories"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => setSectorMenuOpen((open) => !open)}
              className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted hover:text-ink"
            >
              <svg
                viewBox="0 0 16 16"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
                className={`h-4 w-4 transition-transform ${sectorMenuOpen ? "rotate-180" : ""}`}
              >
                <path d="M4 6l4 4 4-4" />
              </svg>
            </button>
          </div>
          {sectorMenuOpen && (sectorSuggestions.length > 0 || typedSector) && (
            <ul
              id="sector-options"
              role="listbox"
              className="absolute top-full z-10 mt-1 max-h-64 w-full overflow-y-auto rounded-lg border border-line bg-bone-50 py-1 shadow-card"
            >
              {sectorSuggestions.map((s) => {
                const selected = s.toLowerCase() === typedSector;
                return (
                  <li key={s} role="option" aria-selected={selected}>
                    <button
                      type="button"
                      onMouseDown={(e) => e.preventDefault()}
                      onClick={() => {
                        updateField("sector", s);
                        setSectorMenuOpen(false);
                      }}
                      className={`flex w-full items-center justify-between px-4 py-2 text-left text-sm hover:bg-bone-200 ${
                        selected ? "font-semibold text-ink" : "text-ink"
                      }`}
                    >
                      {s}
                      {selected && <span aria-hidden="true">✓</span>}
                    </button>
                  </li>
                );
              })}
              {typedSector && !isKnownSector && (
                <li className="border-t border-line px-4 py-2 text-xs text-muted">
                  Saving will add &ldquo;{values.sector.trim()}&rdquo; as a new category.
                </li>
              )}
            </ul>
          )}
        </div>
        <SelectField
          label="Status"
          name="status"
          required
          options={PROJECT_STATUSES}
          value={values.status}
          onChange={(e) => updateField("status", e.target.value as ProjectStatus)}
        />
        <InputField
          label="Location"
          name="location"
          value={values.location}
          onChange={(e) => updateField("location", e.target.value)}
        />
        <InputField
          label="Year"
          name="year"
          value={values.year}
          onChange={(e) => updateField("year", e.target.value)}
        />
        <InputField
          label="Client"
          name="client"
          value={values.client}
          onChange={(e) => updateField("client", e.target.value)}
        />
      </div>

      <TextareaField
        label="Summary"
        name="summary"
        required
        rows={2}
        value={values.summary}
        onChange={(e) => updateField("summary", e.target.value)}
      />
      <TextareaField
        label="Description"
        name="description"
        required
        rows={6}
        value={values.description}
        onChange={(e) => updateField("description", e.target.value)}
      />

      <div>
        <p className="text-sm font-semibold text-ink">Services delivered</p>
        <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2">
          {services.map((service) => (
            <label key={service.slug} className="flex items-center gap-2 text-sm text-muted">
              <input
                type="checkbox"
                checked={values.services.includes(service.slug)}
                onChange={() => toggleService(service.slug)}
                className="h-4 w-4 rounded border-line text-ink focus-visible:ring-lime-600"
              />
              {service.title}
            </label>
          ))}
        </div>
      </div>

      <div className="rounded-card border border-line bg-bone-50 p-6">
        <p className="text-sm font-semibold text-ink">
          Cover image<span className="ml-0.5 text-lime-600">*</span>
        </p>
        <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-start">
          {values.coverImage.src && (
            <div className="relative h-32 w-48 flex-none">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={values.coverImage.src} alt="" className="h-full w-full rounded-lg object-cover" />
              <button
                type="button"
                onClick={removeCoverImage}
                aria-label="Remove cover image"
                className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-sm font-medium leading-none text-bone hover:bg-red-700"
              >
                ×
              </button>
            </div>
          )}
          <div className="flex-1 space-y-3">
            <input
              type="file"
              accept="image/jpeg,image/png,image/webp"
              onChange={(e) => handleCoverUpload(e.target.files?.[0])}
            />
            {uploading === "cover" && <p className="text-sm text-muted">Uploading…</p>}
            <InputField
              label="Alt text"
              name="coverAlt"
              required
              value={values.coverImage.alt}
              onChange={(e) =>
                setValues((v) => ({ ...v, coverImage: { ...v.coverImage, alt: e.target.value } }))
              }
            />
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">
            Gallery images{values.gallery.length > 0 && ` (${values.gallery.length})`}
          </p>
          <Button type="button" variant="outline" size="sm" onClick={addGalleryRow}>
            Add image
          </Button>
        </div>
        {values.gallery.length === 0 ? (
          <p className="mt-4 rounded-card border border-dashed border-line px-4 py-6 text-center text-sm text-muted">
            No gallery images yet.
          </p>
        ) : (
          <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {values.gallery.map((image, index) => (
              <div
                key={index}
                className="relative flex flex-col gap-2 rounded-card border border-line bg-bone-50 p-3"
              >
                <button
                  type="button"
                  onClick={() => removeGalleryRow(index)}
                  aria-label="Remove image"
                  className="absolute right-2 top-2 z-10 flex h-6 w-6 items-center justify-center rounded-full bg-ink/70 text-sm font-medium leading-none text-bone hover:bg-red-700"
                >
                  ×
                </button>
                <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-bone-200">
                  {image.src ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img src={image.src} alt="" className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center text-xs text-muted-light">
                      No image
                    </div>
                  )}
                </div>
                <label className="inline-flex cursor-pointer items-center justify-center rounded-lg border border-line px-3 py-1.5 text-xs font-medium text-ink hover:bg-bone-200">
                  {image.src ? "Replace image" : "Choose file"}
                  <input
                    type="file"
                    accept="image/jpeg,image/png,image/webp"
                    onChange={(e) => handleGalleryUpload(index, e.target.files?.[0])}
                    className="hidden"
                  />
                </label>
                {uploading === `gallery-${index}` && <p className="text-xs text-muted">Uploading…</p>}
                <input
                  aria-label={`Alt text for gallery image ${index + 1}`}
                  placeholder="Alt text"
                  value={image.alt}
                  onChange={(e) => {
                    setValues((v) => {
                      const gallery = [...v.gallery];
                      gallery[index] = { ...gallery[index], alt: e.target.value };
                      return { ...v, gallery };
                    });
                  }}
                  className="w-full rounded-lg border border-line bg-white px-3 py-2 text-sm text-ink placeholder:text-muted-light focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600"
                />
              </div>
            ))}
          </div>
        )}
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Project facts (stats)</p>
          <Button type="button" variant="outline" size="sm" onClick={addStatRow}>
            Add stat
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {values.stats.map((stat, index) => (
            <div key={index} className="flex items-center gap-3">
              <input
                aria-label="Stat label"
                placeholder="Label (e.g. New beds)"
                value={stat.label}
                onChange={(e) => {
                  setValues((v) => {
                    const stats = [...v.stats];
                    stats[index] = { ...stats[index], label: e.target.value };
                    return { ...v, stats };
                  });
                }}
                className="flex-1 rounded-lg border border-line bg-bone-50 px-3 py-2 text-sm text-ink"
              />
              <input
                aria-label="Stat value"
                placeholder="Value (e.g. 120)"
                value={stat.value}
                onChange={(e) => {
                  setValues((v) => {
                    const stats = [...v.stats];
                    stats[index] = { ...stats[index], value: e.target.value };
                    return { ...v, stats };
                  });
                }}
                className="flex-1 rounded-lg border border-line bg-bone-50 px-3 py-2 text-sm text-ink"
              />
              <button
                type="button"
                onClick={() => removeStatRow(index)}
                className="text-sm font-medium text-red-700 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <label className="flex items-center gap-2 text-sm font-semibold text-ink">
          <input
            type="checkbox"
            checked={values.featured}
            onChange={(e) => updateField("featured", e.target.checked)}
            className="h-4 w-4 rounded border-line text-ink focus-visible:ring-lime-600"
          />
          Featured on homepage
        </label>
        <InputField
          label="Display order"
          name="order"
          type="number"
          value={values.order}
          onChange={(e) => updateField("order", Number(e.target.value))}
        />
      </div>

      <div>
        <Button type="submit" variant="lime" size="lg" disabled={submitting || uploading !== null}>
          {submitting ? "Saving…" : submitLabel}
        </Button>
      </div>
    </form>
  );
}
