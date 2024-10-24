"use server";

import { routes } from "@/config/routes";
import { getCurrentSession } from "@/utils/auth";
import { generateRandomString } from "@/utils/generateRandomString";
import { Role } from "@prisma/client";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError, createServerActionProcedure } from "zsa";

const authedProcedure = createServerActionProcedure().handler(async () => {
  const t = await getTranslations("Form");
  try {
    const { user, session } = await getCurrentSession();
    if (!session) throw new ZSAError("NOT_AUTHORIZED", t("unauthorized"));

    return { user };
  } catch {
    throw new ZSAError("NOT_AUTHORIZED", t("unauthorized"));
  }
});

const isAdminProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx: { user } }) => {
    const t = await getTranslations("Form");
    if (user.role !== "admin") throw new ZSAError("NOT_AUTHORIZED", t("unauthorized"));
    return { user };
  },
);

export const addUserAction = isAdminProcedure
  .createServerAction()
  .input(
    z.object({
      email: z.string().email(),
      role: z.nativeEnum(Role),
    }),
  )
  .onSuccess(async () => {
    revalidatePath(routes.administration);
  })
  .handler(async ({ input }) => {
    const tForm = await getTranslations("Form");
    const tAdministration = await getTranslations("Administration");

    const { email, role } = input;

    const userExists = await prisma.user.findUnique({ where: { email } });
    if (userExists)
      throw new ZSAError("CONFLICT", tAdministration("addUser.form.error.userExists"));

    try {
      const generatedPassword = generateRandomString(10);
      const password = await argon2.hash(generatedPassword);

      await prisma.user.create({
        data: {
          email,
          role,
          password,
        },
      });
    } catch (error) {
      console.log("error", error);
      throw new ZSAError("INTERNAL_SERVER_ERROR", tForm("serverError"));
    }
  });
