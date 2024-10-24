"use server";

import { routes } from "@/config/routes";
import { adminProcedure, handleServerError } from "@/utils/zsa";
import { Role } from "@prisma/client";
import { prisma } from "@repo/db";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export const updateUserAction = adminProcedure
  .createServerAction()
  .input(
    z.object({
      id: z.string(),
      email: z.string().email(),
      role: z.nativeEnum(Role),
    }),
  )
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
