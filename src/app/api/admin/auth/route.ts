import {
  clearAdminSessionCookie,
  createAdminSessionToken,
  isAdminAuthorized,
  isAdminConfigured,
  isPasswordValid,
  setAdminSessionCookie,
} from "@/lib/waitlist/admin-auth";
import { getClientIp } from "@/lib/security/client-ip";
import { rateLimit } from "@/lib/security/rate-limit";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  return NextResponse.json({ authenticated: isAdminAuthorized(request) });
}

export async function POST(request: NextRequest) {
  if (!isAdminConfigured()) {
    return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
  }

  const ip = getClientIp(request);
  const limited = rateLimit(`admin-login:${ip}`, 5, 15 * 60 * 1000);
  if (!limited.ok) {
    return NextResponse.json(
      { error: "Too many login attempts. Please try again later." },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      }
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const password =
    body && typeof body === "object" && "password" in body && typeof body.password === "string"
      ? body.password
      : "";

  if (!isPasswordValid(password)) {
    return NextResponse.json({ error: "Invalid password." }, { status: 401 });
  }

  const token = createAdminSessionToken();
  if (!token) {
    return NextResponse.json({ error: "Admin is not configured." }, { status: 503 });
  }

  const response = NextResponse.json({ success: true });
  setAdminSessionCookie(response, token);
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ success: true });
  clearAdminSessionCookie(response);
  return response;
}
