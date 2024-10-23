"use server";

import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { generateRandomString } from "@/utils/generateRandomString";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { addUserSchema } from "./addUserSchema";

export type FormState = {
  error?: string;
};

export const addUserAction = async (_: unknown, data: FormData): Promise<FormState> => {
  const tForm = await getTranslations("Form");
  const tAdministration = await getTranslations("Administration");

  const { user } = await getCurrentSession();
  if (user?.role !== "admin") return { error: tForm("unauthorized") };

  const formData = Object.fromEntries(data);
  const parsed = addUserSchema(tAdministration).safeParse(formData);
  if (!parsed.success) return { error: tForm("wrongInput") };

  const { email, role } = parsed.data;

  try {
    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists) return { error: tAdministration("addUser.form.error.userExists") };

    const generatedPassword = generateRandomString(10);
    const password = await argon2.hash(generatedPassword);

    await prisma.user.create({
      data: {
        email,
        role,
        password,
      },
    });

    // TODO send email with password to created user
  } catch (e) {
    console.error("error", e);
    return { error: tForm("serverError") };
  }

  revalidatePath(routes.administration);

  return { error: undefined };
};
