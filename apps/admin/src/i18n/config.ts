export type Locale = (typeof locales)[number];

export const locales = ["sk", "en"] as const;
export const defaultLocale: Locale = "sk";
