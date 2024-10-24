import { Role } from "@prisma/client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof useSchema>>;

export const useSchema = () => {
  const t = useTranslations("Administration");

  return z.object({
    email: z.string().email(t("addUser.form.email.error")),
    role: z.nativeEnum(Role),
  });
};

export const defaultValues: FormValues = {
  email: "",
  role: "admin",
};
