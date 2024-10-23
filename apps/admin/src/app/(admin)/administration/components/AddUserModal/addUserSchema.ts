import type { ZodTranslations, ZodTranslationsSection } from "@/types/translations";
import { Role } from "@prisma/client";
import { z } from "zod";

export const addUserSchema = (translations: ZodTranslations) => {
  const t = translations as ZodTranslationsSection<"Administration">;

  return z.object({
    email: z.string().email(t("addUser.form.email.error")),
    role: z.nativeEnum(Role),
  });
};
