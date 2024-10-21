import { cookies } from "next/headers";
import { cache } from "react";
import { type SessionValidationResult, validateSessionToken } from "./sessions";

export const setSessionTokenCookie = (token: string, expiresAt: Date) => {
  cookies().set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
};

export const deleteSessionTokenCookie = () => {
  cookies().set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
};

export const getCurrentSession = cache(async (): Promise<SessionValidationResult> => {
  const token = cookies().get("session")?.value ?? null;
  if (token === null) {
    return { session: null, user: null };
  }
  const result = await validateSessionToken(token);
  return result;
});
