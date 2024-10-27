"use server";

import { routes } from "@/config/routes";
import { generateRandomString } from "@/utils/generateRandomString";
import { adminProcedure, handleServerError } from "@/utils/zsa";
import { prisma } from "@repo/db";
import * as argon2 from "argon2";
import { getTranslations } from "next-intl/server";
import { revalidatePath } from "next/cache";
import { Resend } from "resend";
import { ZSAError } from "zsa";
import { AddUserEmail } from "./AddUserEmail";
import { schema } from "./addUserConfig";

const resend = new Resend(process.env.RESEND_API_KEY);

export const addUserAction = adminProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .onSuccess(async () => {
    revalidatePath(routes.administration);
  })
  .handler(async ({ input }) => {
    const t = await getTranslations("Administration");
    const { email, role } = input;

    try {
      const userExists = await prisma.user.findUnique({ where: { email } });
      if (userExists) throw new ZSAError("CONFLICT", t("form.error.userExists"));

      const generatedPassword = generateRandomString(10);
      const password = await argon2.hash(generatedPassword);

      const { id: userId } = await prisma.user.create({
        data: {
          email,
          role,
          password,
        },
      });

      const { error } = await resend.emails.send({
        from: "info@todayweb.sk",
        to: email,
        subject: t("addUser.email.subject"),
        react: <AddUserEmail email={email} password={generatedPassword} />,
      });

      if (error) await prisma.user.delete({ where: { id: userId } });
    } catch (error) {
      await handleServerError(error);
    }
  });
