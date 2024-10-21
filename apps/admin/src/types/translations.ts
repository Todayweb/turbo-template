import type { NestedKeyOf } from "next-intl";
import type en from "../../messages/en.json";

export type Messages = typeof en;

export type ZodTranslations = unknown;
export type ZodTranslationsSection<T extends keyof Messages> = (
  key: NestedKeyOf<Pick<Messages, T>[T]>,
) => string;
