import { TFn } from "@/types/translations";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof schema>>;

export const schema = (t: TFn) => {
  return z.object({
    email: z.string().email(t("Auth.signIn.form.email.error")),
    password: z.string().min(1, t("Auth.signIn.form.password.error")),
  });
};

export const defaultValues: FormValues = {
  email: "",
  password: "",
};
