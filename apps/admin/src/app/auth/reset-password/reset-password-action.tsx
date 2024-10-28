"use server";

import { routes } from "@/config/routes";
import { addHours } from "@/utils/date";
import { handleServerError, publicProcedure } from "@/utils/zsa";
import { prisma } from "@repo/db";
import { getTranslations } from "next-intl/server";
import { Resend } from "resend";
import { ResetPasswordEmail } from "./ResetPasswordEmail";
import { schema } from "./reset-password-config";

const resend = new Resend(process.env.RESEND_API_KEY);

export const resetPasswordAction = publicProcedure
  .createServerAction()
  .input(async () => schema(await getTranslations()))
  .handler(async ({ input }) => {
    const t = await getTranslations("Auth");
    const { email } = input;

    try {
      const userExists = await prisma.user.findUnique({
        where: { email },
      });

      if (!userExists) return;

      const passwordResetToken = crypto.randomUUID();
      const passwordResetTokenExpiresAt = addHours(new Date(), 1);
      const callbackUrl = `${process.env.BASE_URL}${routes.resetPasswordCallback}?token=${passwordResetToken}`;

      await prisma.user.update({
        data: { passwordResetToken, passwordResetTokenExpiresAt },
        where: { email },
      });

      await resend.emails.send({
        from: process.env.RESEND_EMAIL as string,
        to: email,
        subject: t("passwordReset.email.subject"),
        react: <ResetPasswordEmail url={callbackUrl} />,
      });
    } catch (error) {
      await handleServerError(error);
    }
  });
