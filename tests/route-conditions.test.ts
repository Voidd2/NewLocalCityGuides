import { describe, expect, it } from "vitest";
import { routes } from "../src/data/routes";
import { applyDateAwareRoute, getConditionalRouteStops, getLeidenTimeParts, isLeidenMarketOpen, isLeidensOntzetDate } from "../src/data/route-conditions";
import { getActiveSchaapsvisSpot } from "../src/data/schaapsvis";

describe("Leiden date-aware routes", () => {
  it("uses Europe/Amsterdam rather than the device timezone", () => {
    const parts = getLeidenTimeParts(new Date("2026-10-02T22:30:00Z"));
    expect(parts).toMatchObject({ month: 10, day: 3, hour: 0 });
    expect(isLeidensOntzetDate(new Date("2026-10-02T22:30:00Z"))).toBe(true);
  });

  it("swaps Hortus for Leidens Ontzet only on 3 October", () => {
    const base = routes.find((route) => route.id === "buiten-de-stad")!;
    const special = applyDateAwareRoute(base, new Date("2026-10-03T10:00:00Z"));
    expect(special.locationIds).toContain("L012");
    expect(special.locationIds).not.toContain("L010");
    expect(special.activeVariant).toBe("leidens-ontzet");
    expect(applyDateAwareRoute(base, new Date("2026-10-04T10:00:00Z"))).toBe(base);
  });

  it("shows the Nieuwe Rijn stop only during market hours", () => {
    const route = routes.find((item) => item.id === "markt-en-ambacht")!;
    const wednesdayOpen = new Date("2026-09-23T08:00:00Z");
    const wednesdayBeforeOpening = new Date("2026-09-23T05:00:00Z");
    expect(isLeidenMarketOpen(wednesdayOpen)).toBe(true);
    expect(getConditionalRouteStops(route, "nl", wednesdayOpen)[0]).toMatchObject({ id: "C052", name: "Nieuwe Rijn-markt" });
    expect(isLeidenMarketOpen(wednesdayBeforeOpening)).toBe(false);
    expect(getConditionalRouteStops(route, "nl", wednesdayBeforeOpening)).toEqual([]);
  });

  it("keeps Schaapsvishandel market selection in Leiden time", () => {
    expect(getActiveSchaapsvisSpot(new Date("2026-09-22T22:30:00Z")).id).toBe("S031");
    expect(getActiveSchaapsvisSpot(new Date("2026-09-25T22:30:00Z")).id).toBe("S032");
  });
});
