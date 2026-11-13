import nodemailer from "nodemailer";
import { FIELDS, HONEYPOT, MESSAGES, validate, type Values } from "@/lib/contact-form";

/**
 * Receives the contact form and forwards it by email via SMTP.
 *
 * Environment variables (Vercel → Project → Settings → Environment Variables):
 *   SMTP_HOST, SMTP_PORT (465 = SSL, 587 = STARTTLS), SMTP_USER, SMTP_PASS
 *   CONTACT_TO   recipient (default: info@janavogelfotografie.de)
 *   CONTACT_FROM sender address (default: SMTP_USER)
 */
export async function POST(request: Request) {
  let parsed: unknown;
  try {
    parsed = await request.json();
  } catch {
    return Response.json({ error: MESSAGES.error }, { status: 400 });
  }
  if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
    return Response.json({ error: MESSAGES.error }, { status: 400 });
  }
  const body = parsed as { values?: Values; [HONEYPOT]?: string };

  // Bots fill the hidden field – pretend success and drop the message.
  if (body[HONEYPOT]) return Response.json({ ok: true });

  const values: Values = {};
  for (const f of FIELDS) {
    const v = body.values?.[f.name];
    values[f.name] = Array.isArray(v) ? v.map(String).slice(0, 20) : String(v ?? "").slice(0, 5000);
  }
  const errors = validate(values);
  if (Object.keys(errors).length) return Response.json({ errors }, { status: 422 });

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;
  const to = process.env.CONTACT_TO || "info@janavogelfotografie.de";
  const rows = FIELDS.map((f) => {
    const v = values[f.name];
    return [f.label.replace(/:\s*$/, "").trim(), Array.isArray(v) ? v.join(", ") : v] as const;
  }).filter(([, v]) => v && v !== "@");

  const text = rows.map(([k, v]) => `${k}:\n${v}\n`).join("\n");
  const html = `<table cellpadding="6" style="font-family:Arial,sans-serif;font-size:14px;border-collapse:collapse">${rows
    .map(
      ([k, v]) =>
        `<tr><td style="vertical-align:top;font-weight:bold;border-bottom:1px solid #eee">${escapeHtml(k)}</td><td style="border-bottom:1px solid #eee">${escapeHtml(v).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")}</table>`;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    if (process.env.NODE_ENV !== "production") {
      console.log("[kontakt] SMTP nicht konfiguriert – Nachricht nur geloggt:\n" + text);
      return Response.json({ ok: true });
    }
    console.error("[kontakt] SMTP_HOST/SMTP_USER/SMTP_PASS fehlen");
    return Response.json({ error: MESSAGES.error }, { status: 500 });
  }

  const port = Number(SMTP_PORT || 465);
  const transport = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure: port === 465,
    auth: { user: SMTP_USER, pass: SMTP_PASS },
  });

  try {
    await transport.sendMail({
      from: { name: "Website Kontaktformular", address: process.env.CONTACT_FROM || SMTP_USER },
      to,
      replyTo: String(values["e-mail"]),
      subject: `Neue Anfrage von ${values.name} (${values["fr-was-interessiert-ihr-euch"]})`,
      text,
      html,
    });
  } catch (e) {
    console.error("[kontakt] Versand fehlgeschlagen", e);
    return Response.json({ error: MESSAGES.error }, { status: 502 });
  }
  return Response.json({ ok: true });
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);
}
