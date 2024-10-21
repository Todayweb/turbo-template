import type { ZodTranslations, ZodTranslationsSection } from "@/types/translations";
import { z } from "zod";

export const signInSchema = (translations: ZodTranslations) => {
  const t = translations as ZodTranslationsSection<"Auth">;

  return z.object({
    email: z.string().email(t("signIn.form.email.error")),
    password: z.string().min(1, t("signIn.form.password.error")),
  });
};
