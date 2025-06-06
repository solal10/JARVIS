import nodemailer from 'nodemailer';
import { config } from 'dotenv';
import { readFileSync } from 'fs';

// Charger les variables d'environnement depuis /etc/jarvis/.env
config({ path: '/etc/jarvis/.env' });

interface EmailData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'mail.infomaniak.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

export async function sendEmail(data: EmailData) {
  const { name, email, subject, message } = data;

  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || 'contact@jarvis-monaco.com',
      replyTo: email,
      subject: `[Contact JARVIS] ${subject}`,
      text: message,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #0053A4;">Nouveau message de contact</h2>
          <p><strong>Nom :</strong> ${name}</p>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 20px; background-color: #f5f5f5; border-radius: 5px;">
            <p style="white-space: pre-wrap;">${message}</p>
          </div>
          <div style="margin-top: 20px; padding-top: 20px; border-top: 1px solid #eee; color: #666;">
            <p>Message envoyé depuis le formulaire de contact de JARVIS Monaco</p>
          </div>
        </div>
      `,
    });

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
