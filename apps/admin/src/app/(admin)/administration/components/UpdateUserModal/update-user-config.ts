import { TFn } from "@/types/translations";
import { Role } from "@prisma/client";
import { z } from "zod";

export type FormValues = z.output<ReturnType<typeof schema>>;

export const schema = (t: TFn) => {
  return z.object({
    id: z.string(),
    email: z
      .string()
      .min(1, t("Administration.form.email.error.required"))
      .email(t("Administration.form.email.error.format")),
    role: z.nativeEnum(Role),
  });
};

export const defaultValues: FormValues = {
  id: "",
  email: "",
  role: "admin",
};
