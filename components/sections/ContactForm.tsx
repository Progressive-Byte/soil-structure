"use client";

import { useState } from "react";
import { InputField, TextareaField, SelectField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "@/lib/api/contact";
import type { ContactFormData, FormResult } from "@/types";

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  company: "",
  phone: "",
  projectType: "",
  message: "",
};

const serviceOptions = [
  "Structural Design",
  "Geotechnical Design",
  "Water Resources Engineering",
  "Environmental Engineering",
  "Mechanical / Piping Engineering",
  "Electrical Engineering",
  "Architectural Design",
  "Project & Construction Management",
  "Quality Assurance & Control",
  "Other / Not sure yet",
];

/**
 * Contact form UI + client-side validation. Submissions are routed through the
 * single handler in /lib/api/contact.ts, which posts to the Express /contact API.
 */
export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [result, setResult] = useState<FormResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      setForm((prev) => ({ ...prev, [field]: e.target.value }));
    };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setResult(null);
    const res = await submitContactForm(form);
    setResult(res);
    setSubmitting(false);
    if (res.ok) setForm(emptyForm);
  }

  if (result?.ok) {
    return (
      <div role="status" className="rounded-2xl border border-line bg-white p-8 text-center">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-lime">
          <svg viewBox="0 0 24 24" className="h-6 w-6 text-ink" fill="none" stroke="currentColor" strokeWidth={2.5} aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <p className="mt-4 font-heading text-lg font-bold text-ink">Message sent</p>
        <p className="mt-2 text-muted">{result.message}</p>
        <div className="mt-6">
          <Button variant="outline" onClick={() => setResult(null)}>
            Send another message
          </Button>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {result && !result.ok && !result.errors && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-800">
          {result.message}
        </p>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Full name"
          name="name"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          error={result?.errors?.name}
        />
        <InputField
          label="Organisation"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={update("company")}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Email"
          name="email"
          type="email"
          required
          autoComplete="email"
          value={form.email}
          onChange={update("email")}
          error={result?.errors?.email}
        />
        <InputField
          label="Phone"
          name="phone"
          type="tel"
          autoComplete="tel"
          value={form.phone}
          onChange={update("phone")}
        />
      </div>

      <SelectField
        label="Service required"
        name="projectType"
        placeholder="Select a service…"
        options={serviceOptions}
        value={form.projectType}
        onChange={update("projectType")}
      />

      <TextareaField
        label="Project details"
        name="message"
        required
        rows={5}
        placeholder="Tell us about your site, structure or schedule…"
        value={form.message}
        onChange={update("message")}
        error={result?.errors?.message}
      />

      <div>
        <button
          type="submit"
          disabled={submitting}
          className="inline-flex items-center justify-center rounded-pill bg-ink px-7 py-3.5 text-sm font-semibold text-lime transition-colors duration-200 hover:bg-ink-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-lime-600 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {submitting ? "Sending…" : "Send Message"}
        </button>
      </div>
    </form>
  );
}
