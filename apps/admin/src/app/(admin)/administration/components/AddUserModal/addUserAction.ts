"use server";

import { routes } from "@/config/routes";
import { generateRandomString } from "@/utils/generateRandomString";
import { adminProcedure, handleServerError } from "@/utils/zsa";
import { Role } from "@prisma/client";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError } from "zsa";

export const addUserAction = adminProcedure
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
    const tAdministration = await getTranslations("Administration");
    const { email, role } = input;

    try {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) throw new ZSAError("CONFLICT", tAdministration("form.error.userExists"));

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
      await handleServerError(error);
    }
  });
