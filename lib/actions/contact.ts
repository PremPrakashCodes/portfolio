"use server";

import { Resend } from "resend";
import { z } from "zod";
import { contactSchema } from "@/lib/schemas/contact";

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

type ContactResult = {
  success: boolean;
  error?: string;
};

export async function sendContactEmail(
  formData: z.infer<typeof contactSchema>
): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(formData);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }

  const { name, email, message } = parsed.data;

  try {
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeMessage = escapeHtml(message).replace(/\n/g, "<br>");

    await Promise.all([
      resend.emails.send({
        from: "Portfolio Contact <noreply@premprakash.dev>",
        to: "premprakashsharma.dev@gmail.com",
        subject: `New message from ${safeName}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> ${safeEmail}</p>
          <p><strong>Message:</strong></p>
          <p>${safeMessage}</p>
        `,
      }),
      resend.emails.send({
        from: "Prem Prakash Sharma <noreply@premprakash.dev>",
        to: email,
        subject: "Thanks for reaching out!",
        html: `
          <h2>Hi ${safeName}!</h2>
          <p>Thanks for reaching out. I've received your message and will get back to you as soon as possible.</p>
          <p>Best regards,<br>Prem Prakash Sharma</p>
        `,
      }),
    ]);

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
