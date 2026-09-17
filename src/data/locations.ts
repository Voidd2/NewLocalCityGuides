export interface LocationData {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  mainTheme: string;
  categories: string[];
  image: string;
}

export const locations: LocationData[] = [
  {
    id: "L001",
    slug: "de-burcht",
    name: "De Burcht van Leiden",
    shortDescription: "De oudste kern van Leiden, een middeleeuwse motteheuvel waar het allemaal begon.",
    mainTheme: "Origins of the city",
    categories: ["origins", "fortification"],
    image: "10020 - foto van De Burcht motteheuvel met trappen",
  },
  {
    id: "L002",
    slug: "vismarkt",
    name: "Vismarkt",
    shortDescription: "Waar Leiden eeuwenlang zijn vis kocht en verkocht. Nu een levendig plein.",
    mainTheme: "Everyday work and food",
    categories: ["trade", "market"],
    image: "10021 - foto van Vismarkt plein Leiden",
  },
  {
    id: "L003",
    slug: "koornbrug",
    name: "Koornbrug",
    shortDescription: "De enige overdekte brug van Nederland, waar eeuwenlang graan werd verhandeld.",
    mainTheme: "Grain and trade",
    categories: ["trade", "architecture"],
    image: "10022 - foto van Koornbrug met overdekte galerij",
  },
  {
    id: "L004",
    slug: "blauwe-steen",
    name: "De Blauwe Steen",
    shortDescription: "Een onopvallende steen in het wegdek die het centrum van het middeleeuwse Leiden markeert.",
    mainTheme: "Medieval justice",
    categories: ["medieval", "justice"],
    image: "10023 - foto van De Blauwe Steen in het wegdek",
  },
  {
    id: "L005",
    slug: "gravensteen",
    name: "Gravensteen",
    shortDescription: "Van grafelijke gevangenis tot universiteitsgebouw. Eeuwen van macht en recht.",
    mainTheme: "Justice and punishment",
    categories: ["justice", "power"],
    image: "10024 - foto van Gravensteen gevel",
  },
  {
    id: "L006",
    slug: "pieterskerk",
    name: "Pieterskerk",
    shortDescription: "Vijf eeuwen Leidse geschiedenis onder een dak. Hier liggen Pilgrims en professoren.",
    mainTheme: "Religion and civic memory",
    categories: ["religion", "burial"],
    image: "10025 - foto van Pieterskerk interieur of exterieur",
  },
  {
    id: "L007",
    slug: "pilgrims-quarter",
    name: "Pilgrimswijk & Engelse Poort",
    shortDescription: "Hier woonden de Pilgrim Fathers elf jaar voordat ze naar Amerika vertrokken.",
    mainTheme: "The Pilgrims' eleven years in Leiden",
    categories: ["migration", "religion"],
    image: "10026 - foto van Engelse Poort / William Brewster steeg",
  },
  {
    id: "L008",
    slug: "jean-pesijnhofje",
    name: "Jean Pesijnhofje",
    shortDescription: "Een van Leidens 35 hofjes. Gesticht uit verdriet, gebouwd op liefdadigheid.",
    mainTheme: "Charity and community",
    categories: ["charity", "social-history"],
    image: "10027 - foto van Jean Pesijnhofje binnenplaats",
  },
  {
    id: "L009",
    slug: "buskruitramp-1807",
    name: "Buskruitramp 1807",
    shortDescription: "Op 12 januari 1807 explodeerde een kruitschip. 151 doden, een hele wijk verwoest.",
    mainTheme: "A city centre erased in one second",
    categories: ["disaster"],
    image: "10028 - foto van Van der Werffpark (locatie explosie)",
  },
  {
    id: "L010",
    slug: "hortus-botanicus",
    name: "Hortus Botanicus",
    shortDescription: "De oudste botanische tuin van Nederland. Hier begon de Nederlandse tulpenhandel.",
    mainTheme: "Plants, science and empire",
    categories: ["science", "botany"],
    image: "10029 - foto van Hortus Botanicus Leiden tuin",
  },
  {
    id: "L011",
    slug: "weddesteeg",
    name: "Weddesteeg",
    shortDescription: "Hier werd Rembrandt van Rijn geboren in 1606. Het huis is er niet meer.",
    mainTheme: "Origins of a painter",
    categories: ["art", "rembrandt"],
    image: "10030 - foto van Weddesteeg met Rembrandt muurschildering",
  },
  {
    id: "L012",
    slug: "leidens-ontzet",
    name: "Leidens Ontzet",
    shortDescription: "Op 3 oktober 1574 werd Leiden bevrijd van de Spaanse belegering. Dat viert de stad nog steeds.",
    mainTheme: "Starvation turned into celebration",
    categories: ["siege", "tradition"],
    image: "10031 - foto van 3 Oktober festiviteiten of haring en wittebrood",
  },
  {
    id: "L013",
    slug: "wevershuis",
    name: "Museum Het Leids Wevershuis",
    shortDescription: "Stap binnen in het leven van een weversgezin uit de Gouden Eeuw.",
    mainTheme: "Cloth industry at family scale",
    categories: ["textiles", "labour"],
    image: "10032 - foto van Wevershuis interieur met weefgetouw",
  },
  {
    id: "L014",
    slug: "cleveringa-1940",
    name: "Cleveringa 1940",
    shortDescription: "Op 26 november 1940 sprak professor Cleveringa zich uit tegen het ontslag van Joodse collega's.",
    mainTheme: "One man, one lecture, one decision",
    categories: ["wwii", "resistance"],
    image: "10033 - foto van Academiegebouw Leiden",
  },
];

export function getLocationById(id: string): LocationData | undefined {
  return locations.find((l) => l.id === id);
}

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((l) => l.slug === slug);
}
