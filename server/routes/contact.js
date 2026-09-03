const express = require("express");
const { getTransporter } = require("../config/mailer");

const router = express.Router();

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]),
  );
}

router.post("/", async (req, res) => {
  const { name, email, company, projectType, message } = req.body || {};

  const errors = {};
  if (!name?.trim()) errors.name = "Please enter your name.";
  if (!email?.trim()) errors.email = "Please enter your email.";
  else if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  if (!message?.trim() || message.trim().length < 10) {
    errors.message = "Please add a bit more detail (10+ characters).";
  }
  if (Object.keys(errors).length) {
    return res.status(400).json({ message: "Please correct the highlighted fields.", errors });
  }

  const lines = [
    `Name: ${name}`,
    `Email: ${email}`,
    company?.trim() && `Company: ${company}`,
    projectType?.trim() && `Project type: ${projectType}`,
    "",
    message,
  ].filter(Boolean);

  const htmlRows = [
    ["Name", name],
    ["Email", email],
    company?.trim() && ["Company", company],
    projectType?.trim() && ["Project type", projectType],
  ].filter(Boolean);

  try {
    await getTransporter().sendMail({
      from: process.env.MAIL_FROM || process.env.SMTP_USER,
      to: process.env.CONTACT_TO_EMAIL,
      replyTo: email,
      subject: `New contact form submission from ${name}`,
      text: lines.join("\n"),
      html: `
        <table cellpadding="4" cellspacing="0">
          ${htmlRows.map(([k, v]) => `<tr><td><strong>${k}</strong></td><td>${escapeHtml(v)}</td></tr>`).join("")}
        </table>
        <p><strong>About the project</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, "<br>")}</p>
      `,
    });
    res.json({ message: "Thanks — your message has been received. We'll be in touch shortly." });
  } catch (err) {
    console.error("Failed to send contact form email:", err);
    res.status(502).json({ message: "Something went wrong sending your message. Please try again." });
  }
});

module.exports = router;
