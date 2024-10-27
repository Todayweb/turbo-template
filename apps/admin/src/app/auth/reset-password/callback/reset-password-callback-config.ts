import { TFn } from "@/types/translations";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof schema>>;

export const schema = (t: TFn) =>
  z
    .object({
      password: z.string().min(1, t("Auth.passwordReset.form.password.error")),
      passwordConfirm: z.string().min(1, t("Auth.passwordReset.form.passwordConfirm.error.match")),
      token: z.string().optional(),
    })
    .refine((data) => data.password === data.passwordConfirm, {
      message: "Auth.passwordReset.form.passwordConfirm.error.match",
      path: ["passwordConfirm"],
    });

export const defaultValues: FormValues = {
  password: "",
  passwordConfirm: "",
  token: undefined,
};
