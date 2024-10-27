"use server";

import { routes } from "@/config/routes";
import { adminProcedure, handleServerError } from "@/utils/zsa";
import { prisma } from "@repo/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { schema } from "./update-user-config";

export const updateUserAction = adminProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .onSuccess(async () => {
    revalidatePath(routes.administration);
  })
  .handler(async ({ input }) => {
    const { id, email, role } = input;

    try {
      await prisma.user.update({
        data: {
          email,
          role,
        },
        where: { id },
      });
    } catch (error) {
      await handleServerError(error);
    }
  });
