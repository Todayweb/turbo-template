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
  const t = await getTranslations("Form");

  const formData = Object.fromEntries(data);
  const parsed = signInSchema(t).safeParse(formData);

  if (!parsed.success) return { error: t("wrongInput") };

  const { email, password } = parsed.data;

  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return { error: t("serverError") };

    const isValidPassword = await argon2.verify(user.password, password);
    if (!isValidPassword) return { error: t("serverError") };

    const token = generateSessionToken();
    createSession(token, user?.id);
    setSessionTokenCookie(token, new Date(new Date().getTime() + 30 * 60000));
  } catch (e) {
    console.error("error", e);
    return { error: t("serverError") };
  }

  redirect(routes.home);
};
