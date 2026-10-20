import { describe, expect, it } from "vitest";
import { getFeaturedSpots, getVisibleSpots } from "../src/data/local-spots";

describe("seasonal discovery spots", () => {
  it("hides Leidens Ontzet outside its visibility window, including from featured cards", () => {
    const outsideWindow = new Date("2026-10-20T12:00:00Z");
    expect(getVisibleSpots(outsideWindow).some((spot) => spot.id === "S070")).toBe(false);
    expect(getFeaturedSpots(outsideWindow).some((spot) => spot.id === "S070")).toBe(false);
  });

  it("shows Leidens Ontzet during its visibility window", () => {
    const beforeTheEvent = new Date("2026-09-20T12:00:00Z");
    expect(getVisibleSpots(beforeTheEvent).some((spot) => spot.id === "S070")).toBe(true);
    expect(getFeaturedSpots(beforeTheEvent).some((spot) => spot.id === "S070")).toBe(true);
  });
});
