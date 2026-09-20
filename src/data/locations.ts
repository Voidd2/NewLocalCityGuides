export interface LocationData {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  mainTheme: string;
  categories: string[];
  image: string | null;
}

export const locations: LocationData[] = [
  {
    id: "L001",
    slug: "de-burcht",
    name: "De Burcht van Leiden",
    shortDescription: "De oudste kern van Leiden, een middeleeuwse motteheuvel waar het allemaal begon.",
    mainTheme: "Origins of the city",
    categories: ["origins", "fortification"],
    image: "/images/locations/10020-de-burcht-leiden.jpg",
  },
  {
    id: "L002",
    slug: "vismarkt",
    name: "Vismarkt",
    shortDescription: "Waar Leiden eeuwenlang zijn vis kocht en verkocht. Nu een levendig plein.",
    mainTheme: "Everyday work and food",
    categories: ["trade", "market"],
    image: "/images/locations/10021-vismarkt-leiden.jpg",
  },
  {
    id: "L003",
    slug: "koornbrug",
    name: "Koornbrug",
    shortDescription: "De enige overdekte brug van Nederland, waar eeuwenlang graan werd verhandeld.",
    mainTheme: "Grain and trade",
    categories: ["trade", "architecture"],
    image: "/images/locations/10022-koornbrug-leiden.jpg",
  },
  {
    id: "L004",
    slug: "blauwe-steen",
    name: "De Blauwe Steen",
    shortDescription: "Een onopvallende steen in het wegdek die het centrum van het middeleeuwse Leiden markeert.",
    mainTheme: "Medieval justice",
    categories: ["medieval", "justice"],
    image: null,
  },
  {
    id: "L005",
    slug: "gravensteen",
    name: "Gravensteen",
    shortDescription: "Van grafelijke gevangenis tot universiteitsgebouw. Eeuwen van macht en recht.",
    mainTheme: "Justice and punishment",
    categories: ["justice", "power"],
    image: "/images/locations/10024-gravensteen-leiden.jpg",
  },
  {
    id: "L006",
    slug: "pieterskerk",
    name: "Pieterskerk",
    shortDescription: "Vijf eeuwen Leidse geschiedenis onder een dak. Hier liggen Pilgrims en professoren.",
    mainTheme: "Religion and civic memory",
    categories: ["religion", "burial"],
    image: "/images/locations/10025-pieterskerk-leiden.jpg",
  },
  {
    id: "L007",
    slug: "pilgrims-quarter",
    name: "Pilgrimswijk & Engelse Poort",
    shortDescription: "Hier woonden de Pilgrim Fathers elf jaar voordat ze naar Amerika vertrokken.",
    mainTheme: "The Pilgrims' eleven years in Leiden",
    categories: ["migration", "religion"],
    image: null,
  },
  {
    id: "L008",
    slug: "jean-pesijnhofje",
    name: "Jean Pesijnhofje",
    shortDescription: "Een van Leidens 35 hofjes. Gesticht uit verdriet, gebouwd op liefdadigheid.",
    mainTheme: "Charity and community",
    categories: ["charity", "social-history"],
    image: "/images/locations/10027-jean-pesijnhofje.jpg",
  },
  {
    id: "L009",
    slug: "buskruitramp-1807",
    name: "Buskruitramp 1807",
    shortDescription: "Op 12 januari 1807 explodeerde een kruitschip. 151 doden, een hele wijk verwoest.",
    mainTheme: "A city centre erased in one second",
    categories: ["disaster"],
    image: null,
  },
  {
    id: "L010",
    slug: "hortus-botanicus",
    name: "Hortus Botanicus",
    shortDescription: "De oudste botanische tuin van Nederland. Hier begon de Nederlandse tulpenhandel.",
    mainTheme: "Plants, science and empire",
    categories: ["science", "botany"],
    image: "/images/locations/10029-hortus-botanicus-leiden.jpg",
  },
  {
    id: "L011",
    slug: "weddesteeg",
    name: "Weddesteeg",
    shortDescription: "Hier werd Rembrandt van Rijn geboren in 1606. Het huis is er niet meer.",
    mainTheme: "Origins of a painter",
    categories: ["art", "rembrandt"],
    image: null,
  },
  {
    id: "L012",
    slug: "leidens-ontzet",
    name: "Leidens Ontzet",
    shortDescription: "Op 3 oktober 1574 werd Leiden bevrijd van de Spaanse belegering. Dat viert de stad nog steeds.",
    mainTheme: "Starvation turned into celebration",
    categories: ["siege", "tradition"],
    image: null,
  },
  {
    id: "L013",
    slug: "wevershuis",
    name: "Museum Het Leids Wevershuis",
    shortDescription: "Stap binnen in het leven van een weversgezin uit de Gouden Eeuw.",
    mainTheme: "Cloth industry at family scale",
    categories: ["textiles", "labour"],
    image: null,
  },
  {
    id: "L014",
    slug: "cleveringa-1940",
    name: "Cleveringa 1940",
    shortDescription: "Op 26 november 1940 sprak professor Cleveringa zich uit tegen het ontslag van Joodse collega's.",
    mainTheme: "One man, one lecture, one decision",
    categories: ["wwii", "resistance"],
    image: "/images/locations/10033-academiegebouw-leiden.jpg",
  },
];

export function getLocationById(id: string): LocationData | undefined {
  return locations.find((l) => l.id === id);
}

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}
