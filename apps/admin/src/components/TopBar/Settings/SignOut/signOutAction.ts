"use server";

import { routes } from "@/config/routes";
import { deleteSessionTokenCookie, getCurrentSession, invalidateSession } from "@/utils/auth";
import { redirect } from "next/navigation";

export async function signOutAction() {
  const { session } = await getCurrentSession();
  deleteSessionTokenCookie();
  await invalidateSession(session?.id);
  redirect(routes.signIn);
}
