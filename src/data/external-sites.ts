export const externalSites = {
  schaapsvishandel: "https://www.schaapsvishandel.nl/",
} as const;

export function getSchaapsvishandelUrl(locale: string): string {
  const language = locale === "de" ? "de" : locale === "en" ? "en" : "nl";
  return `${externalSites.schaapsvishandel}${language}`;
}
