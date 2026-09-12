import { cookies } from "next/headers";
import { createHmac, timingSafeEqual } from "crypto";

const COOKIE_NAME = "sip_admin_session";
const SESSION_MAX_AGE = 60 * 60 * 24 * 7;

function getSecret(): string {
  const secret = process.env.ADMIN_PASSWORD;
  if (!secret) throw new Error("ADMIN_PASSWORD не задан в .env");
  return secret;
}

function sign(value: string): string {
  return createHmac("sha256", getSecret()).update(value).digest("hex");
}

export function createSessionToken(): string {
  const issuedAt = Date.now().toString();
  return `${issuedAt}.${sign(issuedAt)}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [issuedAt, signature] = token.split(".");
  if (!issuedAt || !signature) return false;

  const expected = sign(issuedAt);
  if (expected.length !== signature.length) return false;

  try {
    if (!timingSafeEqual(Buffer.from(expected), Buffer.from(signature))) {
      return false;
    }
  } catch {
    return false;
  }

  const age = (Date.now() - Number(issuedAt)) / 1000;
  return age <= SESSION_MAX_AGE;
}

export async function isAuthenticated(): Promise<boolean> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export async function setSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, createSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: SESSION_MAX_AGE,
    path: "/",
  });
}

export async function clearSessionCookie() {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_NAME);
}

export function checkPassword(input: string): boolean {
  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  if (input.length !== expected.length) return false;
  try {
    return timingSafeEqual(Buffer.from(input), Buffer.from(expected));
  } catch {
    return false;
  }
}