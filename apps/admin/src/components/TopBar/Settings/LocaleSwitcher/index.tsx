"use client";

import { type Locale, locales } from "@/i18n/config";
import { createFormData } from "@/utils/form";
import { Select, Typography } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import { localeAction } from "./localeAction";

export default function LocaleSwitcher() {
  const t = useTranslations("Settings");
  const [_, formAction] = useFormState(localeAction, null);

  const locale = useLocale();

  const onChange = (locale: string) => formAction(createFormData({ locale }));

  const options: { label: string; value: string }[] = locales.map((locale) => ({
    label: t(`locale.${locale as Locale}`),
    value: locale,
  }));

  return (
    <div className="flex flex-col gap-1">
      <Typography.Text strong>{t("label")}</Typography.Text>
      <Select defaultValue={locale} onChange={onChange} options={options} className="w-full" />
    </div>
  );
}
