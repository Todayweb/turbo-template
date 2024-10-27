import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  email: string;
  password: string;
};

export const AddUserEmail = async ({ email, password }: Props) => {
  const t = await getTranslations("Administration");
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <p>{t("addUser.email.message", { email, password })}</p>
      <a target="_blank" rel="noreferrer" href={process.env.BASE_URL}>
        {t("addUser.email.link")}
      </a>
    </html>
  );
};
