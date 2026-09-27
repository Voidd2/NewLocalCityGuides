import { describe, expect, it } from "vitest";
import { externalSites, getSchaapsvishandelUrl } from "../src/data/external-sites";
import { localSpots } from "../src/data/local-spots";

describe("Schaapsvishandel cross-site links", () => {
  it("uses the canonical www domain and matching language pages", () => {
    expect(externalSites.schaapsvishandel).toBe("https://www.schaapsvishandel.nl/");
    expect(getSchaapsvishandelUrl("nl")).toBe("https://www.schaapsvishandel.nl/nl");
    expect(getSchaapsvishandelUrl("en")).toBe("https://www.schaapsvishandel.nl/en");
    expect(getSchaapsvishandelUrl("de")).toBe("https://www.schaapsvishandel.nl/de");
  });

  it("links every Schaapsvishandel shop and market record to the official site", () => {
    const schaapsvisSpots = localSpots.filter((spot) => ["S030", "S031", "S032"].includes(spot.id));
    expect(schaapsvisSpots).toHaveLength(3);
    expect(schaapsvisSpots.every((spot) => spot.website === externalSites.schaapsvishandel)).toBe(true);
  });
});
