import { describe, expect, it } from "vitest";
import { validateAffiliateConfig } from "../scripts/check-affiliate-links.mjs";

const validLink = {
  id: "hortus-entry-nl",
  targetType: "spot",
  targetId: "S010",
  label: "Hortus ticket",
  locale: "nl",
  url: "https://www.getyourguide.nl/example-t123456/?partner_id=W9KB6MF&currency=EUR&travel_agent=1&cmp=share_to_earn",
  status: "verified",
  checkedAt: "2026-09-28",
};

describe("affiliate-link validation", () => {
  it("accepts an empty prepared intake file", () => {
    expect(validateAffiliateConfig({ partnerId: "W9KB6MF", links: [] })).toEqual([]);
  });

  it("accepts an exact manually checked activity", () => {
    expect(validateAffiliateConfig({ partnerId: "W9KB6MF", links: [validLink] })).toEqual([]);
  });

  it("rejects generic city links and missing tracking", () => {
    const errors = validateAffiliateConfig({
      partnerId: "W9KB6MF",
      links: [{ ...validLink, url: "https://www.getyourguide.com/leiden-l1076/", status: "draft", checkedAt: null }],
    });
    expect(errors.join(" ")).toMatch(/exact activity/);
    expect(errors.join(" ")).toMatch(/partner_id/);
  });

  it("requires a manual check date for verified links", () => {
    const errors = validateAffiliateConfig({ partnerId: "W9KB6MF", links: [{ ...validLink, checkedAt: null }] });
    expect(errors.join(" ")).toMatch(/checkedAt/);
  });
});
