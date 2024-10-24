import { useTranslations } from "next-intl";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof useSchema>>;

export const useSchema = () => {
  const t = useTranslations("Auth");

  return z.object({
    email: z.string().email(t("signIn.form.email.error")),
    password: z.string().min(1, t("signIn.form.password.error")),
  });
};

export const defaultValues: FormValues = {
  email: "",
  password: "",
};
