import { createWaitlistSignup } from "@/lib/waitlist/repository";
import { isWaitlistConfigured } from "@/lib/waitlist/supabase";
import { validateWaitlistPayload } from "@/lib/waitlist/validate";
import { getClientIp } from "@/lib/security/client-ip";
import { rateLimit } from "@/lib/security/rate-limit";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  if (!isWaitlistConfigured()) {
    return NextResponse.json(
      { error: "Waitlist is not configured yet. Please try again later." },
      { status: 503 }
    );
  }

  const ip = getClientIp(request);
  const limited = rateLimit(`waitlist:${ip}`, 8, 60 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many submissions. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      }
    );
  }

  try {
    const body = await request.json();
    const payload = validateWaitlistPayload(body);

    const signup = await createWaitlistSignup({
      email: payload.email,
      firstName: payload.firstName,
      answers: payload.answers,
      source: payload.source,
    });

    return NextResponse.json({
      success: true,
      id: signup.id,
      message: "You're on the waitlist.",
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "";

    // Silent success for bots that fill the honeypot
    if (message === "HONEYPOT") {
      return NextResponse.json({
        success: true,
        message: "You're on the waitlist.",
      });
    }

    if (message.includes("already been submitted")) {
      return NextResponse.json({ error: message }, { status: 409 });
    }

    if (
      message.includes("required") ||
      message.includes("valid email") ||
      message.includes("too long") ||
      message.includes("invalid option") ||
      message.includes("too many") ||
      message.includes("Invalid request")
    ) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    console.error("Waitlist signup failed:", error);
    return NextResponse.json(
      { error: "Unable to process your request. Please try again." },
      { status: 400 }
    );
  }
}
