import { localSpots, type LocalSpot } from "@/data/local-spots";

export type SupportedLocale = "nl" | "en" | "de";

const spotById = (id: string): LocalSpot => {
  const spot = localSpots.find((item) => item.id === id);
  if (!spot) throw new Error(`Missing Schaapsvishandel spot: ${id}`);
  return spot;
};

export function getActiveSchaapsvisSpot(now: Date = new Date()): LocalSpot {
  const day = now.getDay();
  if (day === 3) return spotById("S031");
  if (day === 6) return spotById("S032");
  return spotById("S030");
}

export function getSchaapsvisRouteCopy(locale: SupportedLocale, now: Date = new Date()) {
  const spot = getActiveSchaapsvisSpot(now);
  const isMarket = spot.id === "S031" || spot.id === "S032";
  const descriptions = {
    nl: isMarket
      ? "Vandaag staat de familie Schaap op de markt. De route loopt langs de viskar voor verse kibbeling, haring en visbroodjes."
      : "Vandaag is er geen woensdag- of zaterdagmarkt. De route wijst daarom naar de vaste viswinkel van de familie Schaap aan de Herenstraat 48.",
    en: isMarket
      ? "The Schaap family is at the market today. The route passes the fish cart for fresh kibbeling, herring and fish sandwiches."
      : "There is no Wednesday or Saturday market today, so the route points to the Schaap family's permanent shop at Herenstraat 48.",
    de: isMarket
      ? "Die Familie Schaap steht heute auf dem Markt. Die Route führt am Fischwagen mit frischem Kibbeling, Hering und Fischbrötchen vorbei."
      : "Heute ist kein Mittwochs- oder Samstagsmarkt. Die Route führt deshalb zum festen Fischgeschäft der Familie Schaap in der Herenstraat 48.",
  };

  return { spot, description: descriptions[locale], isMarket };
}
