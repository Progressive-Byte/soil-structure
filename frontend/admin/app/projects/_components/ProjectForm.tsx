"use client";

import { useState } from "react";
import { InputField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { adminFetch } from "@/lib/adminApi";
import { SERVICE_OPTIONS } from "@/lib/services";
import type { Project } from "@/lib/types";

export type ProjectFormValues = {
  title: string;
  slug: string;
  sector: string;
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
  sectors: string[];
  onSubmit: (values: ProjectFormValues) => Promise<void>;
  submitLabel: string;
};

/** Shared create/edit form for the Projects admin panel. */
export function ProjectForm({ initial, sectors, onSubmit, submitLabel }: ProjectFormProps) {
  const [values, setValues] = useState<ProjectFormValues>(() =>
    initial
      ? {
          title: initial.title,
          slug: initial.slug,
          sector: initial.sector,
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
      : emptyValues,
  );
  const [slugTouched, setSlugTouched] = useState(Boolean(initial));
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [uploading, setUploading] = useState<string | null>(null);

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
        <div className="flex flex-col gap-2">
          <label htmlFor="sector" className="text-sm font-semibold text-ink">
            Sector / category<span className="ml-0.5 text-lime-600">*</span>
          </label>
          <input
            id="sector"
            name="sector"
            list="sector-options"
            required
            placeholder="e.g. Healthcare"
            value={values.sector}
            onChange={(e) => updateField("sector", e.target.value)}
            className={inputClasses}
          />
          <datalist id="sector-options">
            {sectors.map((s) => (
              <option key={s} value={s} />
            ))}
          </datalist>
        </div>
        <InputField
          label="Location"
          name="location"
          value={values.location}
          onChange={(e) => updateField("location", e.target.value)}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
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
          {SERVICE_OPTIONS.map((service) => (
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
            // eslint-disable-next-line @next/next/no-img-element
            <img src={values.coverImage.src} alt="" className="h-32 w-48 flex-none rounded-lg object-cover" />
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
          <p className="text-sm font-semibold text-ink">Gallery images</p>
          <Button type="button" variant="outline" size="md" onClick={addGalleryRow}>
            Add image
          </Button>
        </div>
        <div className="mt-4 flex flex-col gap-4">
          {values.gallery.map((image, index) => (
            <div
              key={index}
              className="flex flex-col gap-3 rounded-card border border-line bg-bone-50 p-4 sm:flex-row sm:items-start"
            >
              {image.src && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={image.src} alt="" className="h-24 w-36 flex-none rounded-lg object-cover" />
              )}
              <div className="flex-1 space-y-3">
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  onChange={(e) => handleGalleryUpload(index, e.target.files?.[0])}
                />
                {uploading === `gallery-${index}` && <p className="text-sm text-muted">Uploading…</p>}
                <InputField
                  label="Alt text"
                  name={`gallery-alt-${index}`}
                  value={image.alt}
                  onChange={(e) => {
                    setValues((v) => {
                      const gallery = [...v.gallery];
                      gallery[index] = { ...gallery[index], alt: e.target.value };
                      return { ...v, gallery };
                    });
                  }}
                />
              </div>
              <button
                type="button"
                onClick={() => removeGalleryRow(index)}
                className="text-sm font-medium text-red-700 hover:underline"
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <p className="text-sm font-semibold text-ink">Project facts (stats)</p>
          <Button type="button" variant="outline" size="md" onClick={addStatRow}>
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
