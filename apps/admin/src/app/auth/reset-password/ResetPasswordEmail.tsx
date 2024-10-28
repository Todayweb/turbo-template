import { getLocale, getTranslations } from "next-intl/server";

type Props = {
  url: string;
};

export const ResetPasswordEmail = async ({ url }: Props) => {
  const t = await getTranslations("Auth");
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <p>{t("passwordReset.email.message")}</p>
      <a target="_blank" rel="noreferrer" href={url}>
        {t("passwordReset.email.link")}
      </a>
    </html>
  );
};
