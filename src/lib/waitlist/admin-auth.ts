import { createHmac, randomBytes, timingSafeEqual } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const ADMIN_SESSION_COOKIE = "admin_session";
const LEGACY_ADMIN_COOKIE = "admin_token";
const SESSION_TTL_SEC = 60 * 60 * 8;

function getAdminSecret(): string | null {
  const secret = process.env.ADMIN_SECRET;
  return secret && secret.length >= 16 ? secret : null;
}

function sign(payload: string, secret: string): string {
  return createHmac("sha256", secret).update(payload).digest("base64url");
}

function safeEqualString(a: string, b: string): boolean {
  const digestA = createHmac("sha256", "admin-compare").update(a).digest();
  const digestB = createHmac("sha256", "admin-compare").update(b).digest();
  return timingSafeEqual(digestA, digestB);
}

export function isPasswordValid(password: string): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;
  return safeEqualString(password, secret);
}

export function isAdminConfigured(): boolean {
  return Boolean(getAdminSecret());
}

export function createAdminSessionToken(): string | null {
  const secret = getAdminSecret();
  if (!secret) return null;

  const exp = Math.floor(Date.now() / 1000) + SESSION_TTL_SEC;
  const nonce = randomBytes(16).toString("base64url");
  const payload = `${exp}.${nonce}`;
  return `${payload}.${sign(payload, secret)}`;
}

export function verifyAdminSessionToken(token: string): boolean {
  const secret = getAdminSecret();
  if (!secret) return false;

  const parts = token.split(".");
  if (parts.length !== 3) return false;

  const [expStr, nonce, signature] = parts;
  if (!expStr || !nonce || !signature) return false;

  const payload = `${expStr}.${nonce}`;
  const expected = sign(payload, secret);

  if (!safeEqualString(signature, expected)) return false;

  const exp = Number(expStr);
  if (!Number.isFinite(exp) || exp < Math.floor(Date.now() / 1000)) {
    return false;
  }

  return true;
}

export function isAdminAuthorized(request: NextRequest): boolean {
  const header = request.headers.get("authorization");
  if (header?.startsWith("Bearer ")) {
    return verifyAdminSessionToken(header.slice(7));
  }

  const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
  return cookie ? verifyAdminSessionToken(cookie) : false;
}

export function setAdminSessionCookie(response: NextResponse, token: string): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_TTL_SEC,
  });
  // Clear legacy cookie that stored the raw secret
  response.cookies.set(LEGACY_ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}

export function clearAdminSessionCookie(response: NextResponse): void {
  response.cookies.set(ADMIN_SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
  response.cookies.set(LEGACY_ADMIN_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });
}
