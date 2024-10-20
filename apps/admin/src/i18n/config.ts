export type Locale = (typeof locales)[number];

export const locales = ["en", "sk"] as const;
export const defaultLocale: Locale = "en";
