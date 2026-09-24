import type { Locale } from "../i18n/config";
import type { RouteData } from "./routes";
import { localSpots } from "./local-spots";

export interface LeidenTimeParts {
  weekday: "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun";
  month: number;
  day: number;
  hour: number;
}

export interface ConditionalRouteStop {
  id: "C052";
  name: string;
  description: string;
  coords: { lat: number; lng: number };
  category: string;
}

export function getLeidenTimeParts(now: Date = new Date()): LeidenTimeParts {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Europe/Amsterdam",
    weekday: "short",
    month: "numeric",
    day: "numeric",
    hour: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);
  const value = (type: Intl.DateTimeFormatPartTypes) => parts.find((part) => part.type === type)?.value ?? "";
  return {
    weekday: value("weekday") as LeidenTimeParts["weekday"],
    month: Number(value("month")),
    day: Number(value("day")),
    hour: Number(value("hour")),
  };
}

export function isLeidensOntzetDate(now: Date = new Date()): boolean {
  const { month, day } = getLeidenTimeParts(now);
  return month === 10 && day === 3;
}

export function isLeidenMarketOpen(now: Date = new Date()): boolean {
  const { weekday, hour } = getLeidenTimeParts(now);
  return (weekday === "Wed" || weekday === "Sat") && hour >= 8 && hour < 17;
}

export function applyDateAwareRoute(route: RouteData, now: Date = new Date()): RouteData {
  if (route.dateVariant !== "leidens-ontzet" || !isLeidensOntzetDate(now)) return route;
  const locationIds = route.locationIds.map((id) => id === "L010" ? "L012" : id);
  return {
    ...route,
    title: `${route.title} – 3 Oktober`,
    subtitle: "Speciale route voor Leidens Ontzet",
    description: "Op 3 oktober maakt de Hortus-stop plaats voor Leidens Ontzet. Zo sluit de route aan op de viering en het verhaal van het beleg en de bevrijding van Leiden.",
    tags: [...new Set([...route.tags, "3 Oktober", "Leidens Ontzet"])],
    locationIds,
    stops: locationIds.length,
    activeVariant: "leidens-ontzet",
  };
}

export function getConditionalRouteStops(
  route: RouteData | undefined,
  locale: Locale,
  now: Date = new Date(),
): ConditionalRouteStop[] {
  if (!route?.conditionalStops?.includes("nieuwe-rijn-market") || !isLeidenMarketOpen(now)) return [];
  const verifiedMarketPoint = localSpots.find((spot) => spot.id === "S031")?.coords;
  if (!verifiedMarketPoint) return [];
  const copy = {
    nl: { name: "Nieuwe Rijn-markt", description: "De markt is nu geopend. Loop langs de kramen aan de Nieuwe Rijn en ontdek hoe handel op en rond het water nog steeds deel is van de stad." },
    en: { name: "Nieuwe Rijn market", description: "The market is open now. Walk past the stalls on Nieuwe Rijn and see how trade around the water remains part of the city." },
    de: { name: "Markt an der Nieuwe Rijn", description: "Der Markt ist jetzt geöffnet. Entdecke die Stände an der Nieuwe Rijn und erlebe, wie der Handel am Wasser bis heute zur Stadt gehört." },
  }[locale];
  return [{ id: "C052", name: copy.name, description: copy.description, coords: verifiedMarketPoint, category: "markt" }];
}
