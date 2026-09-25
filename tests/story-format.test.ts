import { describe, expect, it } from "vitest";
import { buildStorySummary, condenseStorySections, parseStoryText } from "../src/lib/story-format";

describe("story formatting", () => {
  it("recognises single-line titles and groups prose into readable paragraphs", () => {
    const parsed = parseStoryText(`Een titel
Dit is de eerste zin met voldoende uitleg. Dit is de tweede zin.
Dit is een volgende regel die bij dezelfde alinea hoort.
Een nieuw hoofdstuk
Hier begint het tweede hoofdstuk met opnieuw een duidelijke uitleg.`);

    expect(parsed.sections).toHaveLength(2);
    expect(parsed.sections[0].heading).toBe("Een titel");
    expect(parsed.sections[0].paragraphs[0]).toContain("volgende regel");
    expect(parsed.sections[1].heading).toBe("Een nieuw hoofdstuk");
  });

  it("supports markdown headings, facts, sources and summaries", () => {
    const parsed = parseStoryText(`## De plek
Dit is een lange eerste zin die de essentie van deze historische plek helder samenvat. Extra uitleg volgt.
AANVULLENDE FEITEN
* Een controleerbaar feit
BRONNEN
Een betrouwbare bron`);

    expect(parsed.sections[0].heading).toBe("De plek");
    expect(parsed.facts).toEqual(["Een controleerbaar feit"]);
    expect(parsed.sources).toEqual(["Een betrouwbare bron"]);
    expect(buildStorySummary(parsed)[0]).toContain("essentie");
  });

  it("keeps a story within a readable word and section limit without accordions", () => {
    const parsed = parseStoryText(Array.from({ length: 8 }, (_, index) =>
      `Hoofdstuk ${index + 1}\n${"Dit is historische uitleg met een volledige zin. ".repeat(20)}`,
    ).join("\n"));
    const condensed = condenseStorySections(parsed, 120, 3);
    const wordCount = condensed.flatMap((section) => section.paragraphs).join(" ").split(/\s+/).filter(Boolean).length;

    expect(condensed.length).toBeLessThanOrEqual(3);
    expect(wordCount).toBeLessThanOrEqual(120);
    expect(condensed.every((section) => Boolean(section.heading))).toBe(true);
  });
});
