import { getTranslations } from "next-intl/server";
import { ZSAError, createServerActionProcedure } from "zsa";
import { getCurrentSession } from "./auth";

export const authedProcedure = createServerActionProcedure().handler(async () => {
  const t = await getTranslations("Form");
  try {
    const { user, session } = await getCurrentSession();
    if (!session) throw new ZSAError("NOT_AUTHORIZED", t("unauthorized"));
    return { user };
  } catch {
    throw new ZSAError("NOT_AUTHORIZED", t("unauthorized"));
  }
});

export const isAdminProcedure = createServerActionProcedure(authedProcedure).handler(
  async ({ ctx: { user } }) => {
    const t = await getTranslations("Form");
    if (user.role !== "admin") throw new ZSAError("NOT_AUTHORIZED", t("unauthorized"));
    return { user };
  },
);

export const handleServerError = async (error: unknown) => {
  const t = await getTranslations("Form");
  if (error instanceof ZSAError) throw error;
  throw new ZSAError("INTERNAL_SERVER_ERROR", t("serverError"));
};
