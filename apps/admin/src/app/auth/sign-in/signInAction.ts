"use server";

import { routes } from "@/config/routes";
import { createSession, generateSessionToken, setSessionTokenCookie } from "@/utils/auth";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { signInSchema } from "./signInSchema";

export type FormState = {
  error?: string;
};

export const signInAction = async (_: unknown, data: FormData): Promise<FormState> => {
  const tForm = await getTranslations("Form");
  const tAuth = await getTranslations("Auth");

  const formData = Object.fromEntries(data);
  const parsed = signInSchema(tAuth).safeParse(formData);

  if (!parsed.success) return { error: tForm("wrongInput") };

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: tForm("serverError") };

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) return { error: tForm("serverError") };

    const token = generateSessionToken();
    createSession(token, user?.id);
    setSessionTokenCookie(token, new Date(new Date().getTime() + 30 * 60000));
  } catch (e) {
    console.error("error", e);
    return { error: tForm("serverError") };
  }

  redirect(routes.home);
};
