import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";

export type TFn =
  | ReturnType<typeof useTranslations<never>>
  | Awaited<ReturnType<typeof getTranslations<never>>>;
