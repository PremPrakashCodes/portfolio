"use server";

import { Resend } from "resend";
import { z } from "zod";

const resend = new Resend(process.env.RESEND_API_KEY);

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

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
    // Send notification to Prem
    await resend.emails.send({
      from: "Portfolio Contact <contact@premprakash.dev>",
      to: "premprakashsharma.dev@gmail.com",
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, "<br>")}</p>
      `,
    });

    // Send confirmation to user
    await resend.emails.send({
      from: "Prem Prakash Sharma <noreply@premprakash.dev>",
      to: email,
      subject: "Thanks for reaching out!",
      html: `
        <h2>Hi ${name}!</h2>
        <p>Thanks for reaching out. I've received your message and will get back to you as soon as possible.</p>
        <p>Best regards,<br>Prem Prakash Sharma</p>
      `,
    });

    return { success: true };
  } catch {
    return { success: false, error: "Failed to send email. Please try again." };
  }
}
