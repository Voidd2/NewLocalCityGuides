import { describe, expect, it } from "vitest";
import { blogPosts, seoLandings } from "../src/data/seo-content";

const locales = ["nl", "en", "de"] as const;

describe("multilingual SEO content", () => {
  it("has unique landing and article slugs", () => {
    const slugs = [...seoLandings, ...blogPosts].map((entry) => entry.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("contains complete metadata and article copy in every locale", () => {
    for (const entry of [...seoLandings, ...blogPosts]) {
      for (const locale of locales) {
        expect(entry.title[locale].length).toBeGreaterThan(20);
        expect(entry.description[locale].length).toBeGreaterThan(80);
        for (const section of entry.sections) {
          expect(section.heading[locale].length).toBeGreaterThan(8);
          expect(section.paragraphs[locale].join(" ").length).toBeGreaterThan(100);
        }
      }
    }
  });

  it("keeps the Schaapsvishandel market guide in every language", () => {
    const marketPost = blogPosts.find((post) => post.slug === "leiden-market-days-schaapsvishandel");
    expect(marketPost).toBeDefined();
    for (const locale of locales) {
      const content = marketPost!.sections.flatMap((section) => section.paragraphs[locale]).join(" ");
      expect(content).toContain("Schaapsvishandel");
      expect(content).toContain("1938");
    }
  });
});
