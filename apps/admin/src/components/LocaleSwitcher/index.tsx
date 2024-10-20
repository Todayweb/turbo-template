"use client";

import { type Locale, locales } from "@/i18n/config";
import { createFormData } from "@/utils/form";
import { Select } from "antd";
import { useLocale, useTranslations } from "next-intl";
import { useFormState } from "react-dom";
import { localeAction } from "./localeAction";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");
  const [_, formAction] = useFormState(localeAction, null);

  const locale = useLocale();

  const onChange = (locale: string) => formAction(createFormData({ locale }));

  const options: { label: string; value: string }[] = locales.map((locale) => ({
    label: t(locale as Locale),
    value: locale,
  }));

  return <Select defaultValue={locale} onChange={onChange} options={options} className="w-full" />;
}
