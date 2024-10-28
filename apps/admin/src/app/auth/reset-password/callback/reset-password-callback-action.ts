"use server";

import { handleServerError, publicProcedure } from "@/utils/zsa";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { ZSAError } from "zsa";
import { schema } from "./reset-password-callback-config";

export const resetPasswordCallbackAction = publicProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .handler(async ({ input }) => {
    const tForm = await getTranslations("Form");
    const tAuth = await getTranslations("Auth");

    const { password, token } = input;

    if (!token) throw new ZSAError("INTERNAL_SERVER_ERROR", tForm("serverError"));

    try {
      const user = await prisma.user.findUnique({ where: { passwordResetToken: token } });

      if (!user || !user?.passwordResetTokenExpiresAt)
        throw new ZSAError("FORBIDDEN", tAuth("passwordReset.token.notValid"));

      if (Date.now() >= user.passwordResetTokenExpiresAt.getTime())
        throw new ZSAError("FORBIDDEN", tAuth("passwordReset.token.notValid"));

      const hashedPassword = await argon2.hash(password);

      await prisma.user.update({
        data: {
          password: hashedPassword,
          passwordResetToken: null,
          passwordResetTokenExpiresAt: null,
        },
        where: { passwordResetToken: token },
      });
    } catch (error) {
      await handleServerError(error);
    }
  });
