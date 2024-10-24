"use client";

import { Locale, locales } from "@/i18n/config";
import { Flex, Select, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useServerAction } from "zsa-react";
import { localeAction } from "./localeAction";

export default function LocaleSwitcher() {
  const t = useTranslations("Settings");
  const locale = useLocale();
  const { execute } = useServerAction(localeAction);

  const onChange = (locale: string) => execute({ locale: locale as Locale });

  const options: { label: string; value: string }[] = locales.map((locale) => ({
    label: t(`locale.${locale}`),
    value: locale,
  }));

  return (
    <Flex vertical gap="small">
      <Typography.Text strong>{t("locale.label")}</Typography.Text>
      <Select defaultValue={locale} onChange={onChange} options={options} className="w-full" />
    </Flex>
  );
}
