import type { NestedKeyOf } from "next-intl";

export type ZodTranslations = unknown;
export type ZodTranslationsSection<T extends keyof IntlMessages> = (
  key: NestedKeyOf<Pick<IntlMessages, T>[T]>,
) => string;
