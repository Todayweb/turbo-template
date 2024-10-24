import { Role } from "@prisma/client";
import { useTranslations } from "next-intl";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof useSchema>>;

export const useSchema = () => {
  const t = useTranslations("Administration");

  return z.object({
    id: z.string(),
    email: z.string().min(1, t("form.email.error.required")).email(t("form.email.error.format")),
    role: z.nativeEnum(Role),
  });
};

export const defaultValues: FormValues = {
  id: "",
  email: "",
  role: "admin",
};
