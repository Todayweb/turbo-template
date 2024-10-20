import { useTranslations } from "next-intl";
import LocaleSwitcherSelect from "./LocaleSwitcherSelect";

export default function LocaleSwitcher() {
  const t = useTranslations("LocaleSwitcher");

  return (
    <LocaleSwitcherSelect
      items={[
        {
          value: "en",
          label: t("en"),
        },
        {
          value: "sk",
          label: t("sk"),
        },
      ]}
    />
  );
}
