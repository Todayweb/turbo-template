import { Role } from "@prisma/client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof useAddUserSchema>>;

export const useAddUserSchema = () => {
  const t = useTranslations("Administration");

  return z.object({
    email: z.string().email(t("addUser.form.email.error")),
    role: z.nativeEnum(Role),
  });
};
