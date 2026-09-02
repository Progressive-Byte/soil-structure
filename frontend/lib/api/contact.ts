import type { ContactFormData, FormResult } from "@/types";

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
 * Single submission handler for the contact form.
 *
 * TODO(backend): Replace the mocked success below with a real call to the
 * Node.js API, e.g.:
 *
 *   const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/contact`, {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify(data),
 *   });
 *   if (!res.ok) return { ok: false, message: "Something went wrong. Please try again." };
 *
 * This is the ONLY place the form talks to a backend — the form component does
 * not need to change when the endpoint is wired up.
 */
export async function submitContactForm(data: ContactFormData): Promise<FormResult> {
  const errors = validateContactForm(data);
  if (errors) {
    return { ok: false, message: "Please correct the highlighted fields.", errors };
  }

  // Simulate network latency so loading states are exercised in the static phase.
  await new Promise((resolve) => setTimeout(resolve, 600));

  // TODO(backend): send `data` to the real endpoint here.
  return {
    ok: true,
    message: "Thanks — your message has been received. We'll be in touch shortly.",
  };
}
