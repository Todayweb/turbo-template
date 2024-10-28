"use server";

import { routes } from "@/config/routes";
import { createSession, generateToken, setSessionTokenCookie } from "@/utils/auth";
import { handleServerError, publicProcedure } from "@/utils/zsa";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { ZSAError } from "zsa";
import { schema } from "./sign-in-config";

export const signInAction = publicProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .onSuccess(async () => {
    redirect(routes.home);
  })
  .handler(async ({ input }) => {
    const t = await getTranslations("Form");
    const { email, password } = input;

    try {
      const user = await prisma.user.findUnique({ where: { email } });
      if (!user) throw new ZSAError("NOT_FOUND", t("serverError"));

      const isValidPassword = await argon2.verify(user.password, password);
      if (!isValidPassword) throw new ZSAError("NOT_FOUND", t("serverError"));

      const token = generateToken();
      await createSession(token, user.id);
      setSessionTokenCookie(token, new Date(new Date().getTime() + 30 * 60000));
    } catch (error) {
      await handleServerError(error);
    }
  });
