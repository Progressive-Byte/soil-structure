"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import RichTextEditor from "./RichTextEditor";

export type VacancyValues = {
  title: string;
  slug: string;
  number: string;
  department: string;
  location: string;
  employmentType: string;
  experience: string;
  summary: string;
  description: string;
  responsibilities: string[];
  requirements: string[];
  preferredQualifications: string[];
  benefits: string[];
  featured: boolean;
  status: "open" | "closed";
  order: number;
};

const blank: VacancyValues = {
  title: "",
  slug: "",
  number: "01",
  department: "",
  location: "Dhaka, Bangladesh",
  employmentType: "Full-time",
  experience: "",
  summary: "",
  description: "",
  responsibilities: [],
  requirements: [],
  preferredQualifications: [],
  benefits: [],
  featured: false,
  status: "open",
  order: 0,
};

const field =
  "w-full rounded-lg border border-line bg-bone-50 px-4 py-3 text-sm text-ink focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";
const summaryField =
  "w-full h-36 rounded-lg border border-line bg-bone-50 px-4 py-3 text-sm text-ink focus-visible:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600";

export function VacancyForm({
  initial,
  onSubmit,
  label,
}: {
  initial?: Partial<VacancyValues>;
  onSubmit: (v: VacancyValues) => Promise<void>;
  label: string;
}) {
  const [v, setV] = useState<VacancyValues>({ ...blank, ...initial });
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  function set<K extends keyof VacancyValues>(
    key: K,
    value: VacancyValues[K],
  ) {
    setV((old) => ({ ...old, [key]: value }));
  }

  function list(
    key:
      | "responsibilities"
      | "requirements"
      | "preferredQualifications"
      | "benefits",
    value: string,
  ) {
    set(
      key,
      value
        .split("\n")
        .map((x) => x.trim())
        .filter(Boolean),
    );
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");

    const descriptionText = v.description
      .replace(/<[^>]*>/g, " ")
      .replace(/&nbsp;|&#160;/gi, " ")
      .trim();
    if (!descriptionText) {
      setError("Please add job details before saving.");
      return;
    }

    setBusy(true);

    try {
      await onSubmit(v);
    } catch (e) {
      setError(
        e instanceof Error ? e.message : "Unable to save vacancy",
      );
      setBusy(false);
    }
  }

  return (
    <form
      onSubmit={submit}
      className="flex max-w-4xl flex-col gap-6 rounded-card border border-line bg-bone-50 p-6 sm:p-8"
    >
      {error && (
        <p
          role="alert"
          className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        {(
          [
            ["title", "Job title"],
            ["department", "Department"],
            ["location", "Location"],
            // ["employmentType", "Employment type"],
            // ["experience", "Experience (In Years)"],
          ] as const
        ).map(([key, label]) => (
          <label
            key={key}
            className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-muted"
          >
            {label}

            <input
              required={key === "title" || key === "department"}
              value={v[key]}
              onChange={(e) => set(key, e.target.value as never)}
              className={field}
            />
          </label>
        ))}
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Employment type

          <select
            value={v.employmentType}
            required
            onChange={(e) =>
              set("employmentType", e.target.value as "Full-time" | "Part-time")
            }
            className={field}
          >
            <option value="Full-time">Full Time</option>
            <option value="Part-time">Part Time</option>
          </select>
        </label>
      </div>


      <div className="grid gap-5 sm:grid-cols-3">
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Experience (In Years)

          <select
            value={v.experience}
            onChange={(e) => set("experience", e.target.value)}
            className={field}
          >
            <option value="">Select Experience</option>

            <option value="1">1 Year</option>
            <option value="2">2 Years</option>
            <option value="3">3 Years</option>
            <option value="4">4 Years</option>
            <option value="5">5 Years</option>
            <option value="6">6 Years</option>
            <option value="7">7 Years</option>
            <option value="8">8 Years</option>
            <option value="9">9 Years</option>
            <option value="10+">10+ Years</option>
          </select>
        </label>
      </div>

      <label className="flex flex-col gap-2 text-xs  font-semibold uppercase tracking-wide text-muted">
        Short summary (Card)

        <textarea
          required
          rows={2}
          value={v.summary}
          onChange={(e) => set("summary", e.target.value)}
          className={summaryField}
        />
      </label>

      <div className="flex flex-col gap-2">
        <label
          htmlFor="job-description"
          className="text-xs font-semibold uppercase tracking-wide text-muted"
        >
          Job details
        </label>
        <RichTextEditor
          value={v.description}
          onChange={(value) => set("description", value)}
        />
        <p className="text-xs font-normal normal-case tracking-normal text-muted">
          Use headings, lists, quotes, and links to format the vacancy details.
        </p>
      </div>

      {/* {(
        [
          ["responsibilities", "Responsibilities"],
          ["requirements", "Requirements"],
          ["preferredQualifications", "Preferred qualifications"],
          ["benefits", "Benefits"],
        ] as const
      ).map(([key, label]) => (
        <label
          key={key}
          className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-muted"
        >
          {label}

          <textarea
            rows={4}
            placeholder="One item per line"
            value={v[key].join("\n")}
            onChange={(e) => list(key, e.target.value)}
            className={field}
          />
        </label>
      ))} */}

      <div className="grid gap-5 sm:grid-cols-3">
        <label className="flex flex-col gap-2 text-xs font-semibold uppercase tracking-wide text-muted">
          Status

          <select
            value={v.status}
            onChange={(e) =>
              set("status", e.target.value as "open" | "closed")
            }
            className={field}
          >
            <option value="open">Open</option>
            <option value="closed">Closed</option>
          </select>
        </label>
      </div>

      <div>
        <Button type="submit" variant="lime" disabled={busy}>
          {busy ? "Saving…" : label}
        </Button>
      </div>
    </form>
  );
}
