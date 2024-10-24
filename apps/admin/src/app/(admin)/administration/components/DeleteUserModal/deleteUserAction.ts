"use server";

import { routes } from "@/config/routes";
import { adminProcedure, handleServerError } from "@/utils/zsa";
import { prisma } from "@repo/db";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { ZSAError } from "zsa";

export const deleteUserAction = adminProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
    }),
  )
  .onSuccess(async () => {
    revalidatePath(routes.administration);
  })
  .handler(async ({ input, ctx }) => {
    const t = await getTranslations("Administration");
    const { id } = input;

    try {
      if (id === ctx.user.id) throw new ZSAError("CONFLICT", t("deleteUser.selfDeletionMessage"));
      await prisma.user.delete({ where: { id } });
    } catch (error) {
      await handleServerError(error);
    }
  });
