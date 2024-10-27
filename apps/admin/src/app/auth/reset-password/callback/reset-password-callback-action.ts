"use server";

import { routes } from "@/config/routes";
import { handleServerError, publicProcedure } from "@/utils/zsa";
import { prisma } from "@repo/db";
import { getTranslations } from "next-intl/server";
import { redirect } from "next/navigation";
import { schema } from "./reset-password-callback-config";

export const resetPasswordCallbackAction = publicProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .handler(async ({ input }) => {
    const t = await getTranslations("Auth");
    const { password, token } = input;

    if (!token) redirect(routes.resetPassword);

    try {
      const id = "1";
      await prisma.user.update({ data: { password }, where: { id } });
    } catch (error) {
      await handleServerError(error);
    }
  });
