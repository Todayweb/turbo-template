import { routes } from "@/config/routes";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { cache } from "react";
import { SessionEnsured, SessionOptional, validateSessionToken } from "./sessions";

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

export const getEnsuredSession = cache(async (): Promise<SessionEnsured> => {
  const token = cookies().get("session")?.value ?? null;
  if (token === null) redirect(routes.signIn);
  const { session, user } = await validateSessionToken(token);
  if (!session) redirect(routes.signIn);
  return { session, user };
});

export const getCurrentSession = cache(async (): Promise<SessionOptional> => {
  const token = cookies().get("session")?.value ?? null;
  if (token === null) return { session: null, user: null };
  return await validateSessionToken(token);
});
