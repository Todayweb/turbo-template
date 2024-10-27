import { TFn } from "@/types/translations";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof schema>>;

export const schema = (t: TFn) =>
  z.object({
    email: z.string().email(t("Auth.passwordReset.form.password.error")),
  });

export const defaultValues: FormValues = {
  email: "",
};
