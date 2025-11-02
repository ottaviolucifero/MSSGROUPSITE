// Vercel/Serverless style handler for contact form
import 'dotenv/config';
import nodemailer from 'nodemailer';

function json(res, status, body) {
  res.statusCode = status;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(body));
}

function allowOnlyPost(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    json(res, 405, { ok: false, error: 'Method Not Allowed' });
    return false;
  }
  return true;
}

async function parseBody(req) {
  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const raw = Buffer.concat(chunks).toString('utf8');
  try {
    return JSON.parse(raw || '{}');
  } catch {
    return {};
  }
}

function isValidEmail(email) {
  return /.+@.+\..+/.test(email);
}

export default async function handler(req, res) {
  if (!allowOnlyPost(req, res)) return;

  const body = await parseBody(req);
  const { fullname, email, message, _hp } = body || {};

  if (_hp) return json(res, 200, { ok: true }); // honeypot

  if (!fullname || !email || !message || !isValidEmail(email)) {
    return json(res, 400, { ok: false, error: 'Invalid input' });
  }

  const SMTP_HOST = process.env.SMTP_HOST || 'smtps.aruba.it';
  const SMTP_PORT = Number(process.env.SMTP_PORT || 465);
  const SMTP_SECURE = process.env.SMTP_SECURE ? process.env.SMTP_SECURE === 'true' : true;
  const SMTP_USER = process.env.SMTP_USER || 'noreply@msstn.net';
  const SMTP_PASS = process.env.SMTP_PASS || '';

  const TO_EMAIL = process.env.TO_EMAIL || 'lucifero@msstn.net';
  const FROM_EMAIL = process.env.FROM_EMAIL || 'noreply@msstn.net';
  const SUBJECT_PREFIX = process.env.SUBJECT_PREFIX || '[Sito MSS] Nuova richiesta contatto';

  try {
    const transporter = nodemailer.createTransport({
      host: SMTP_HOST,
      port: SMTP_PORT,
      secure: SMTP_SECURE,
      auth: { user: SMTP_USER, pass: SMTP_PASS },
    });

    const html = `
      <h3>Nuovo messaggio dal form contatti</h3>
      <p><strong>Nome:</strong> ${fullname}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Messaggio:</strong></p>
      <p>${String(message).replace(/\n/g, '<br/>')}</p>
    `;

    await transporter.sendMail({
      from: FROM_EMAIL,
      to: TO_EMAIL,
      subject: `${SUBJECT_PREFIX} - ${fullname}`,
      replyTo: email,
      text: `Nome: ${fullname}\nEmail: ${email}\n\nMessaggio:\n${message}`,
      html,
    });

    return json(res, 200, { ok: true });
  } catch (err) {
    return json(res, 500, { ok: false, error: 'Email send failed' });
  }
}
