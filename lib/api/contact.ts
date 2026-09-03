import type { ContactFormData, FormResult } from "@/types";
import { API_BASE } from "@/lib/data/_client";

/**
 * Validate the contact form. Pure function so it can run on the server (in the
 * server action below) and, if needed, be reused on the client.
 */
export function validateContactForm(data: ContactFormData): FormResult["errors"] {
  const errors: NonNullable<FormResult["errors"]> = {};

  if (!data.name?.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!data.email?.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!data.message?.trim()) {
    errors.message = "Please tell us a little about your project.";
  } else if (data.message.trim().length < 10) {
    errors.message = "Please add a bit more detail (10+ characters).";
  }

  return Object.keys(errors).length ? errors : undefined;
}

/**
 * Single submission handler for the contact form. Validates client-side first
 * to short-circuit obviously-bad input, then posts to the Express API's
 * `/contact` route (server/routes/contact.js), which re-validates and sends
 * the message on via SMTP. This is the ONLY place the form talks to the
 * backend — the form component does not need to change when the endpoint
 * changes.
 */
export async function submitContactForm(data: ContactFormData): Promise<FormResult> {
  const errors = validateContactForm(data);
  if (errors) {
    return { ok: false, message: "Please correct the highlighted fields.", errors };
  }

  try {
    const res = await fetch(`${API_BASE}/contact`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const body = await res.json().catch(() => null);

    if (!res.ok) {
      return {
        ok: false,
        message: body?.message ?? "Something went wrong. Please try again.",
        errors: body?.errors,
      };
    }

    return {
      ok: true,
      message: body?.message ?? "Thanks — your message has been received. We'll be in touch shortly.",
    };
  } catch {
    return {
      ok: false,
      message: "Couldn't reach the server. Please check your connection and try again.",
    };
  }
}
