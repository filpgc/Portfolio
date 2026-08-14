import {
  EmailTemplate,
  ReceiptEmailTemplate,
} from "@/components/email/EmailTemplate";
import { Resend } from "resend";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      email?: unknown;
      message?: unknown;
      turnstileToken?: unknown;
    };
    const email = typeof body.email === "string" ? body.email.trim() : "";
    const message = typeof body.message === "string" ? body.message.trim() : "";
    const turnstileToken =
      typeof body.turnstileToken === "string" ? body.turnstileToken : "";

    if (
      !EMAIL_PATTERN.test(email) ||
      email.length > 254 ||
      !message ||
      message.length > 5000
    ) {
      return Response.json(
        { error: "Enter a valid email address and message." },
        { status: 400 },
      );
    }

    if (!turnstileToken) {
      return Response.json(
        { error: "Verification expired. Please try again." },
        { status: 400 },
      );
    }

    const verificationResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          secret:
            process.env.NODE_ENV === "development"
              ? "1x0000000000000000000000000000000AA"
              : process.env.TURNSTILE_SECRET_KEY,
          response: turnstileToken,
        }),
      },
    );
    const verification = (await verificationResponse.json()) as {
      success: boolean;
      action?: string;
    };

    if (
      !verification.success ||
      (process.env.NODE_ENV === "production" &&
        verification.action !== "contact")
    ) {
      return Response.json(
        { error: "Verification expired. Please try again." },
        { status: 400 },
      );
    }

    const resend = new Resend(process.env.RESEND_API_KEY);
    const from =
      process.env.RESEND_FROM_EMAIL ??
      "Filippo's portfolio <onboarding@resend.dev>";
    const recipient =
      process.env.RESEND_TO_EMAIL ?? "filippo.piggici@gmail.com";
    const { error } = await resend.batch.send([
      {
        from,
        to: [recipient],
        replyTo: email,
        subject: "New portfolio message",
        react: EmailTemplate({ email, message }),
      },
      {
        from,
        to: [email],
        replyTo: recipient,
        subject: "I received your message",
        react: ReceiptEmailTemplate({ message }),
      },
    ]);

    if (error) {
      throw error;
    }

    return new Response(null, { status: 204 });
  } catch (error) {
    console.error("Failed to send portfolio message", error);
    return Response.json(
      { error: "The message could not be sent. Please try again." },
      { status: 500 },
    );
  }
}
