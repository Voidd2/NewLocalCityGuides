import { describe, expect, it } from "vitest";
import { readFileSync, existsSync } from "node:fs";
import nl from "../messages/nl.json";
import en from "../messages/en.json";
import de from "../messages/de.json";
import { getBlogPlaces } from "../src/data/blog-places";
import { blogPosts } from "../src/data/seo-content";
import { validateLogin } from "../src/lib/auth";
import manifest from "../src/app/manifest";

function keys(value: object, prefix = ""): string[] {
  return Object.entries(value).flatMap(([key, item]) => typeof item === "object" && item !== null ? keys(item, prefix + key + ".") : [prefix + key]).sort();
}
describe("CityWalkStories rebrand", () => {
  it("serves generated brand images without a locale redirect", () => {
    const source = readFileSync("src/proxy.ts", "utf8");
    const matcher = JSON.parse(source.match(/matcher:\s*(\[[^\n]+\])/)![1]) as string[];
    const matchesLocaleProxy = (url: string) => new RegExp("^" + matcher[0] + "$").test(url);
    for (const url of ["/icon", "/apple-icon", "/opengraph-image", "/pwa/icon/192", "/favicon.ico"]) {
      expect(matchesLocaleProxy(url), url).toBe(false);
    }
    for (const url of ["/", "/nl", "/en/routes", "/de/blog"]) {
      expect(matchesLocaleProxy(url), url).toBe(true);
    }
  });
  it("keeps all translated message keys aligned", () => {
    expect(keys(en)).toEqual(keys(nl)); expect(keys(de)).toEqual(keys(nl));
    for (const messages of [nl, en, de]) {
      expect(JSON.stringify(messages)).not.toMatch(/YourLocal\s*City\s*Guide/i);
      expect(messages.home.heroHeadline.length).toBeGreaterThan(15);
      expect(messages.footer.brandDescription.length).toBeGreaterThan(30);
    }
  });
  it("gives every blog real existing Leiden locations, photographs and coordinates", () => {
    for (const post of blogPosts) {
      const places = getBlogPlaces(post.slug);
      expect(places.length).toBeGreaterThan(0);
      for (const place of places) {
        expect(existsSync("public" + place.image)).toBe(true);
        expect(place.coords.lat).toBeGreaterThan(52.1);
        expect(place.coords.lat).toBeLessThan(52.2);
        expect(place.coords.lng).toBeGreaterThan(4.4);
        expect(place.href).toMatch(/^\/leiden\//);
      }
    }
  });
  it("preserves the existing account and saved-route storage contracts", () => {
    expect(readFileSync("src/lib/auth-context.tsx", "utf8")).toContain('"ylcg_user"');
    expect(readFileSync("src/lib/saved-routes.ts", "utf8")).toContain('"ylcg_saved_routes"');
    expect(validateLogin("test@yourlocalcityguide.com", "LeidenTest2026!")?.hasPaid).toBe(true);
    expect(validateLogin("free@yourlocalcityguide.com", "FreeUser2026!")?.hasPaid).toBe(false);
    expect(validateLogin("unknown@example.com", "invalid")).toBeNull();
  });
  it("hides the demo-credential panel in production", () => {
    const source = readFileSync("src/components/dashboard/LoginPage.tsx", "utf8");
    expect(source).toContain('process.env.NODE_ENV !== "production" &&');
  });
  it("uses the new brand in the installable app and supplied logo files", () => {
    expect(manifest().name).toBe("CityWalkStories Leiden");
    expect(manifest().theme_color).toBe("#1D2F5F");
    expect(existsSync("public/brand/citywalkstories-logo.svg")).toBe(true);
    expect(readFileSync("src/app/favicon.ico").readUInt16LE(2)).toBe(1);
  });
});
