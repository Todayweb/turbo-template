"use server";

import { locales } from "@/i18n/config";
import { setUserLocale } from "@/utils/locale";
import { handleServerError, publicProcedure } from "@/utils/zsa";
import { z } from "zod";

const schema = z.object({
  locale: z.enum(locales),
});

export const localeAction = publicProcedure
  .createServerAction()
  .input(schema)
  .handler(async ({ input }) => {
    const { locale } = input;

    try {
      await setUserLocale(locale);
    } catch (error) {
      await handleServerError(error);
    }
  });
