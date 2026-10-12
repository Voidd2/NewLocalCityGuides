import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { ENTITLEMENT_COOKIE, LEIDEN_PRODUCT_ID, signEntitlement, verifyEntitlement } from "../src/lib/entitlement-token";
import { LEIDEN_GUIDE, formatGuidePrice } from "../src/lib/product";
import { routes } from "../src/data/routes";
import { routeSummaries } from "../src/data/route-summaries";

const secret = "local-test-secret-with-more-than-thirty-two-characters";
const entitlement = { subject: "visitor@example.test", productId: LEIDEN_PRODUCT_ID, status: "active" as const, expiresAt: Date.now() + 60_000 };

describe("premium access boundary", () => {
  it("accepts only an intact, active server-signed token for the requested product", async () => {
    const token = await signEntitlement(entitlement, secret);
    expect((await verifyEntitlement(token, secret, LEIDEN_PRODUCT_ID))?.subject).toBe(entitlement.subject);
    expect(await verifyEntitlement(token, secret, "another-product")).toBeNull();
    expect(await verifyEntitlement(token + "x", secret, LEIDEN_PRODUCT_ID)).toBeNull();
    expect(await verifyEntitlement(token, undefined, LEIDEN_PRODUCT_ID)).toBeNull();
    expect(await verifyEntitlement(await signEntitlement({ ...entitlement, expiresAt: Date.now() - 1 }, secret), secret, LEIDEN_PRODUCT_ID)).toBeNull();
    expect(ENTITLEMENT_COOKIE).toBe("cws_entitlement");
  });

  it("keeps full stories and curated route order out of client imports", () => {
    for (const path of [
      "src/components/location/LocationExperience.tsx",
      "src/components/custom-route/CustomRouteBuilder.tsx",
    ]) expect(readFileSync(path, "utf8")).not.toContain('from "@/data/stories"');
    for (const path of [
      "src/components/map/MapPage.tsx",
      "src/components/routes/PremiumRouteExperience.tsx",
      "src/components/routes/RoutePickerModal.tsx",
    ]) expect(readFileSync(path, "utf8")).not.toContain('from "@/data/routes"');
  });

  it("uses the approved €16.99 guide price from one configuration", () => {
    expect(LEIDEN_GUIDE.basePriceCents).toBe(1699);
    expect(LEIDEN_GUIDE.extraDevicePriceCents).toBe(100);
    expect(formatGuidePrice("nl")).toContain("16,99");
    expect(formatGuidePrice("en")).toContain("16.99");
  });

  it("keeps public route summaries aligned with authored routes without exposing stop order", () => {
    expect(routeSummaries.map(({ id, stops }) => ({ id, stops }))).toEqual(
      routes.map(({ id, stops }) => ({ id, stops })),
    );
    expect(routeSummaries.every((route) => !("locationIds" in route))).toBe(true);
  });
});
