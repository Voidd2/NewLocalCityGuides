export const LEIDEN_GUIDE = {
  id: "leiden-guide",
  basePriceCents: 1699,
  extraDevicePriceCents: 100,
} as const;

export function formatGuidePrice(locale: string, cents: number = LEIDEN_GUIDE.basePriceCents): string {
  const language = locale === "en" ? "en-NL" : locale === "de" ? "de-DE" : "nl-NL";
  return new Intl.NumberFormat(language, { style: "currency", currency: "EUR" }).format(cents / 100);
}
