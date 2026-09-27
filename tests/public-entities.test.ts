import { describe, expect, it } from "vitest";
import { publicEntities, publicEntityPath } from "../src/data/public-entities";
import { localSpots } from "../src/data/local-spots";

describe("public entity SEO registry", () => {
  it("creates a unique human-readable path for every entity", () => {
    const paths = publicEntities.map(publicEntityPath);
    expect(paths).toHaveLength(84);
    expect(new Set(paths).size).toBe(paths.length);
    expect(paths.every((path) => /^\/leiden\/(museums|attractions|markets|local)\/[a-z0-9-]+$/.test(path))).toBe(true);
  });

  it("keeps temporary events and Schaapsvishandel duplicates out of the generic registry", () => {
    const eventIds = new Set(localSpots.filter((spot) => spot.category === "evenement").map((spot) => spot.id));
    expect(publicEntities.some((entity) => entity.name.toLowerCase().includes("schaapsvishandel"))).toBe(false);
    expect(publicEntities.some((entity) => entity.sourceKind === "spot" && eventIds.has(entity.sourceId))).toBe(false);
  });

  it("provides useful localized copy and concise metadata", () => {
    for (const entity of publicEntities) {
      for (const locale of ["nl", "en", "de"] as const) {
        expect(entity.intro[locale].length).toBeGreaterThan(30);
        expect(entity.whyVisit[locale].length).toBeGreaterThan(50);
        expect(entity.metaDescription[locale].length).toBeLessThanOrEqual(155);
      }
    }
  });

  it("marks only the five planned MVP video locations", () => {
    const ids = publicEntities.filter((entity) => entity.videoPlanned).map((entity) => entity.sourceId).sort();
    expect(ids).toEqual(["L001", "L003", "L006", "L009", "L010"]);
  });
});
