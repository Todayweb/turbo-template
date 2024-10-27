"use server";

import { handleServerError, publicProcedure } from "@/utils/zsa";
import { getTranslations } from "next-intl/server";
import { schema } from "./reset-password-config";

export const resetPasswordAction = publicProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .handler(async ({ input }) => {
    const t = await getTranslations("Auth");
    const { email } = input;

    try {
      return { email };
    } catch (error) {
      await handleServerError(error);
    }
  });
