import { describe, expect, it } from "vitest";
import { locationMediaManifest } from "../src/data/media-manifest";
import { locations } from "../src/data/locations";

describe("media manifest", () => {
  it("covers every Leiden MVP story location exactly once", () => {
    const ids = locationMediaManifest.map((entry) => entry.locationId);
    expect(ids).toEqual(Array.from({ length: 14 }, (_, index) => `L${String(index + 1).padStart(3, "0")}`));
    expect(new Set(ids).size).toBe(ids.length);
    expect(new Set(locationMediaManifest.map((entry) => entry.slug)).size).toBe(locationMediaManifest.length);
    expect(locationMediaManifest.map((entry) => entry.slug)).toEqual(locations.slice(0, 14).map((location) => location.slug));
  });

  it("marks only the five approved video locations as planned", () => {
    const planned = locationMediaManifest
      .filter((entry) => entry.video.status === "planned")
      .map((entry) => entry.locationId);
    expect(planned).toEqual(["L001", "L003", "L006", "L009", "L010"]);
  });

  it("requires explicit rights and keeps premium delivery identifiers out of public data", () => {
    const serialized = JSON.stringify(locationMediaManifest);
    expect(serialized).not.toMatch(/streamId|videoUid|playbackUrl|cloudflare/i);
    for (const entry of locationMediaManifest) {
      expect(entry.current.rights).toBeTruthy();
      expect(entry.historical.rights).toBeTruthy();
      expect(entry.current.brief.length).toBeGreaterThan(30);
      expect(entry.historical.brief.length).toBeGreaterThan(30);
      expect(entry.video.delivery).toBe("private-after-access-check");
    }
  });

  it("requires complete metadata before a video can be published", () => {
    for (const entry of locationMediaManifest) {
      if (entry.video.status === "filmed" || entry.video.status === "published") {
        expect(entry.video.poster).toMatch(/^\/images\//);
        expect(entry.video.durationSeconds).toBeGreaterThan(0);
      }
      if (entry.video.status === "published") {
        expect(entry.video.previewReady).toBe(true);
        expect(Object.values(entry.video.captions)).toEqual(["ready", "ready", "ready"]);
      }
    }
  });

  it("forbids AI reconstruction for sensitive or well-documented archival stories", () => {
    const forbidden = locationMediaManifest
      .filter((entry) => !entry.historicalAiAllowed)
      .map((entry) => entry.locationId);
    expect(forbidden).toEqual(["L009", "L012", "L014"]);
  });
});
