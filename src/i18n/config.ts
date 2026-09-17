export const locales = ["nl", "en", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "nl";
