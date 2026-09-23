import type { Metadata } from "next";
import type { Locale } from "@/i18n/config";

export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://newlocalcityguide-fawn.vercel.app"
).replace(/\/$/, "");

export const SITE_NAME = "YourLocalCityGuide";
export const DEFAULT_IMAGE = "/images/heroes/10001-leiden-canal-historic-buildings.jpg";

type PageKey =
  | "home"
  | "routes"
  | "map"
  | "discover"
  | "activities"
  | "help"
  | "pricing"
  | "login"
  | "account"
  | "dashboard"
  | "myRoutes"
  | "customRoute"
  | "privacy"
  | "terms";

const pageCopy: Record<Locale, Record<PageKey, { title: string; description: string }>> = {
  nl: {
    home: { title: "Ontdek Leiden op jouw tempo", description: "Zelfgeleide stadstours door Leiden met routes, interactieve verhalen, video's en lokale tips. Ontdek de stad op jouw tempo." },
    routes: { title: "Wandel- en fietsroutes door Leiden", description: "Bekijk samengestelde wandel- en fietsroutes door Leiden, van het historische centrum tot de groene singels." },
    map: { title: "Interactieve kaart van Leiden", description: "Vind historische locaties, musea, markten en lokale plekken op de interactieve kaart van Leiden." },
    discover: { title: "Musea en lokale plekken in Leiden", description: "Ontdek musea, winkels, markten, restaurants en verborgen parels in Leiden." },
    activities: { title: "Activiteiten en bezienswaardigheden in Leiden", description: "Bekijk activiteiten, musea, markten en bezienswaardigheden voor een dag in Leiden." },
    help: { title: "Hulp bij activiteiten in Leiden", description: "Krijg hulp bij het plannen van activiteiten en een bezoek aan Leiden." },
    pricing: { title: "Prijzen voor de Leiden stadsgids", description: "Bekijk de prijzen en inhoud van het Leiden-pakket van YourLocalCityGuide." },
    login: { title: "Inloggen", description: "Log in op YourLocalCityGuide om je routes en stadspakket te openen." },
    account: { title: "Mijn account", description: "Beheer je YourLocalCityGuide-account en toegang." },
    dashboard: { title: "Dashboard", description: "Open je routes, voortgang en stadspakket." },
    myRoutes: { title: "Mijn routes", description: "Bekijk en vervolg je opgeslagen routes door Leiden." },
    customRoute: { title: "Maak je eigen route door Leiden", description: "Kies locaties en stel een persoonlijke route door Leiden samen." },
    privacy: { title: "Privacybeleid", description: "Lees hoe YourLocalCityGuide met persoonsgegevens omgaat." },
    terms: { title: "Gebruiksvoorwaarden", description: "Lees de gebruiksvoorwaarden van YourLocalCityGuide." },
  },
  en: {
    home: { title: "Discover Leiden at your own pace", description: "Self-guided city tours through Leiden with routes, interactive stories, videos and local tips. Explore the city at your own pace." },
    routes: { title: "Walking and cycling routes in Leiden", description: "Browse curated walking and cycling routes through Leiden, from the historic centre to the green canals." },
    map: { title: "Interactive map of Leiden", description: "Find historic locations, museums, markets and local places on the interactive Leiden map." },
    discover: { title: "Museums and local places in Leiden", description: "Discover museums, shops, markets, restaurants and hidden gems in Leiden." },
    activities: { title: "Things to do in Leiden", description: "Find activities, museums, markets and sights for a day in Leiden." },
    help: { title: "Help planning activities in Leiden", description: "Get help planning activities and your visit to Leiden." },
    pricing: { title: "Leiden city guide pricing", description: "View the price and contents of the YourLocalCityGuide Leiden package." },
    login: { title: "Log in", description: "Log in to YourLocalCityGuide to access your routes and city package." },
    account: { title: "My account", description: "Manage your YourLocalCityGuide account and access." },
    dashboard: { title: "Dashboard", description: "Open your routes, progress and city package." },
    myRoutes: { title: "My routes", description: "View and continue your saved routes through Leiden." },
    customRoute: { title: "Build your own Leiden route", description: "Choose locations and create a personal route through Leiden." },
    privacy: { title: "Privacy policy", description: "Learn how YourLocalCityGuide handles personal data." },
    terms: { title: "Terms of use", description: "Read the YourLocalCityGuide terms of use." },
  },
  de: {
    home: { title: "Leiden im eigenen Tempo entdecken", description: "Selbstgeführte Stadttouren durch Leiden mit Routen, interaktiven Geschichten, Videos und lokalen Tipps." },
    routes: { title: "Wander- und Fahrradrouten durch Leiden", description: "Entdecke ausgewählte Wander- und Fahrradrouten durch Leiden, vom historischen Zentrum bis zu den grünen Grachten." },
    map: { title: "Interaktive Karte von Leiden", description: "Finde historische Orte, Museen, Märkte und lokale Plätze auf der interaktiven Leiden-Karte." },
    discover: { title: "Museen und lokale Orte in Leiden", description: "Entdecke Museen, Geschäfte, Märkte, Restaurants und versteckte Schätze in Leiden." },
    activities: { title: "Aktivitäten und Sehenswürdigkeiten in Leiden", description: "Finde Aktivitäten, Museen, Märkte und Sehenswürdigkeiten für einen Tag in Leiden." },
    help: { title: "Hilfe bei Aktivitäten in Leiden", description: "Erhalte Hilfe bei der Planung von Aktivitäten und deinem Besuch in Leiden." },
    pricing: { title: "Preise für den Leiden-Stadtführer", description: "Preise und Inhalte des Leiden-Pakets von YourLocalCityGuide." },
    login: { title: "Anmelden", description: "Melde dich an, um deine Routen und dein Stadtpaket zu öffnen." },
    account: { title: "Mein Konto", description: "Verwalte dein YourLocalCityGuide-Konto und deinen Zugang." },
    dashboard: { title: "Übersicht", description: "Öffne deine Routen, deinen Fortschritt und dein Stadtpaket." },
    myRoutes: { title: "Meine Routen", description: "Sieh dir deine gespeicherten Routen durch Leiden an." },
    customRoute: { title: "Eigene Leiden-Route erstellen", description: "Wähle Orte und erstelle eine persönliche Route durch Leiden." },
    privacy: { title: "Datenschutzerklärung", description: "Erfahre, wie YourLocalCityGuide personenbezogene Daten verarbeitet." },
    terms: { title: "Nutzungsbedingungen", description: "Lies die Nutzungsbedingungen von YourLocalCityGuide." },
  },
};

export function asLocale(locale: string): Locale {
  return locale === "en" || locale === "de" ? locale : "nl";
}

export function localizedUrl(locale: Locale, path = ""): string {
  return `${SITE_URL}/${locale}${path}`;
}

function languageAlternates(path = "") {
  return {
    nl: localizedUrl("nl", path),
    en: localizedUrl("en", path),
    de: localizedUrl("de", path),
    "x-default": localizedUrl("nl", path),
  };
}

export function createPageMetadata(
  localeValue: string,
  key: PageKey,
  path = "",
  options: { index?: boolean; image?: string } = {},
): Metadata {
  const locale = asLocale(localeValue);
  const copy = pageCopy[locale][key];
  const canonical = localizedUrl(locale, path);
  const image = options.image ?? DEFAULT_IMAGE;

  return {
    title: copy.title,
    description: copy.description,
    alternates: {
      canonical,
      languages: languageAlternates(path),
    },
    openGraph: {
      title: copy.title,
      description: copy.description,
      url: canonical,
      siteName: SITE_NAME,
      locale: locale === "nl" ? "nl_NL" : locale === "en" ? "en_GB" : "de_DE",
      type: "website",
      images: [{ url: `${SITE_URL}${image}`, alt: copy.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: copy.title,
      description: copy.description,
      images: [`${SITE_URL}${image}`],
    },
    robots: options.index === false ? { index: false, follow: false } : { index: true, follow: true },
  };
}

export function createDynamicMetadata({
  locale: localeValue,
  title,
  description,
  path,
  image,
  index = false,
}: {
  locale: string;
  title: string;
  description: string;
  path: string;
  image?: string | null;
  index?: boolean;
}): Metadata {
  const locale = asLocale(localeValue);
  const canonical = localizedUrl(locale, path);
  return {
    title,
    description,
    alternates: { canonical, languages: languageAlternates(path) },
    openGraph: {
      title,
      description,
      url: canonical,
      siteName: SITE_NAME,
      type: "website",
      images: [{ url: `${SITE_URL}${image ?? DEFAULT_IMAGE}`, alt: title }],
    },
    robots: index ? { index: true, follow: true } : { index: false, follow: false },
  };
}
