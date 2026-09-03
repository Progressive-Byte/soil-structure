"use client";

import { useState } from "react";
import { InputField, TextareaField } from "@/components/ui/Field";
import { Button } from "@/components/ui/Button";
import { submitContactForm } from "@/lib/api/contact";
import type { ContactFormData, FormResult } from "@/types";

const emptyForm: ContactFormData = {
  name: "",
  email: "",
  company: "",
  projectType: "",
  message: "",
};

/**
 * Contact form UI + client-side validation. Submissions are routed through the
 * single handler in /lib/api/contact.ts — this component does not talk to the
 * backend directly, so it doesn't change if the API changes.
 */
export function ContactForm() {
  const [form, setForm] = useState<ContactFormData>(emptyForm);
  const [result, setResult] = useState<FormResult | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const update =
    (field: keyof ContactFormData) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  // Show the success state in place of the form once submitted successfully.
  if (result?.ok) {
    return (
      <div
        role="status"
        className="rounded-card border border-line bg-bone-50 p-8 text-center"
      >
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
          label="Name"
          name="name"
          required
          autoComplete="name"
          value={form.name}
          onChange={update("name")}
          error={result?.errors?.name}
        />
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
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <InputField
          label="Company"
          name="company"
          autoComplete="organization"
          value={form.company}
          onChange={update("company")}
        />
        <InputField
          label="Project type"
          name="projectType"
          list={projectTypes.length ? "project-types" : undefined}
          placeholder="e.g. Higher Education, Healthcare"
          value={form.projectType}
          onChange={update("projectType")}
        />
        {projectTypes.length > 0 && (
          <datalist id="project-types">
            {projectTypes.map((type) => (
              <option key={type} value={type} />
            ))}
          </datalist>
        )}
      </div>

      <TextareaField
        label="About your project"
        name="message"
        required
        placeholder="Tell us about your site and what you're planning to build."
        value={form.message}
        onChange={update("message")}
        error={result?.errors?.message}
      />

      <div>
        <Button type="submit" variant="lime" size="lg" disabled={submitting}>
          {submitting ? "Sending…" : "Send message"}
        </Button>
      </div>
    </form>
  );
}
