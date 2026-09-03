const nodemailer = require("nodemailer");

// Single shared transporter, built from env (a Mailtrap sandbox in dev — see
// .env.example — or real SMTP in prod). Lazily created so a missing SMTP_*
// config only breaks contact-form submission, not server startup.
let transporter = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 2525,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return transporter;
}

module.exports = { getTransporter };
